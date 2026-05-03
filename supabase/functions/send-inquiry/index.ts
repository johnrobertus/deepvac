import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface InquiryPayload {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company: string;
  project?: string;
  chamberType?: string;
  applicationArea?: string;
  timeline?: string;
  message?: string;
  source?: string;
  _website?: string; // honeypot
  turnstileToken?: string;
}

// ===== Questionnaire payload (discriminated variant) =====
interface OtherCheck { checked: boolean; text: string }
interface PortRow { checked: boolean; size: string; qty: string }

interface QuestionnaireData {
  // S1
  company: string; firstName: string; lastName: string; email: string;
  phone?: string; country?: string; application?: string;
  // S2 - DUT
  dutWeight?: string;
  dutTypes?: boolean[]; dutTypeOther?: OtherCheck;
  housing?: boolean[]; housingOther?: OtherCheck;
  // S2 - Chamber
  chamberShape?: string; chamberMaterial?: string;
  internalVolume?: string; internalW?: string; internalH?: string; internalL?: string;
  doorTypes?: boolean[]; ports?: PortRow[];
  viewportsQty?: string; viewportsSize?: string;
  viewportsMaterial?: boolean[]; viewportsMaterialOther?: OtherCheck;
  // S3
  heatDissipation?: string; dutCount?: string; vacuumLevel?: string;
  highVac?: boolean[]; highVacNested?: boolean[];
  foreVac?: boolean[]; gauges?: boolean[];
  rampRate?: string; uniformity?: string; tempMin?: string; tempMax?: string;
  plateDimensions?: string; plateCustom?: string;
  plateTempMin?: string; plateTempMax?: string;
  plateCooling?: boolean[]; plateCoolingOther?: OtherCheck;
  shroudConfig?: string; shroudTempMin?: string; shroudTempMax?: string;
  shroudCooling?: boolean[]; shroudCoolingOther?: OtherCheck;
  sensorTypes?: boolean[]; sensorTypeOther?: OtherCheck;
  measurementChannels?: string;
  // S4
  elecQty?: string; elecVoltage?: string; elecCurrent?: string; elecNotes?: string;
  elecConnector?: boolean[]; elecConnectorOther?: OtherCheck;
  rfTypes?: boolean[]; rfTypeOther?: OtherCheck; rfQty?: string;
  fiberTypes?: boolean[]; fiberTypeOther?: OtherCheck; fiberQty?: string;
  fluidQty?: string; fluidConnection?: string;
  motionTypes?: boolean[]; motionTypeOther?: OtherCheck; motionQty?: string;
  remoteAccess?: string; remoteOptions?: boolean[];
  ai?: string;
  comm?: boolean[]; commOther?: OtherCheck;
  loggingCustom?: boolean; loggingNotes?: string;
  exportFormats?: boolean[];
  alarms?: boolean[];
  // S5
  installStandard?: boolean; installCleanroom?: OtherCheck; installOther?: OtherCheck;
  installSpace?: string;
  power?: boolean[]; powerOther?: OtherCheck; powerMax?: string;
  utilities?: boolean[];
  specialReq?: string;
  delivery?: string; budget?: string; phase?: string;
}

interface QuestionnairePayload {
  kind: "questionnaire";
  source?: string;
  language?: "en" | "de";
  data: QuestionnaireData;
  _website?: string;
  turnstileToken?: string;
  consent?: boolean;
}

type AnyPayload = InquiryPayload | QuestionnairePayload;

// Simple in-memory rate limiter (per isolate lifetime)
const rateLimitMap = new Map<string, { timestamps: number[] }>();

function checkRateLimit(ip: string): { allowed: boolean; reason?: string } {
  const now = Date.now();
  const tenMinAgo = now - 10 * 60 * 1000;
  const dayAgo = now - 24 * 60 * 60 * 1000;

  let entry = rateLimitMap.get(ip);
  if (!entry) {
    entry = { timestamps: [] };
    rateLimitMap.set(ip, entry);
  }

  // Clean old entries
  entry.timestamps = entry.timestamps.filter((t) => t > dayAgo);

  const recentCount = entry.timestamps.filter((t) => t > tenMinAgo).length;
  const dailyCount = entry.timestamps.length;

  if (recentCount >= 5) return { allowed: false, reason: "rate_limit_10min" };
  if (dailyCount >= 20) return { allowed: false, reason: "rate_limit_daily" };

  entry.timestamps.push(now);
  return { allowed: true };
}

function sanitize(str: string | undefined, maxLen = 500): string {
  if (!str) return "";
  return str
    .replace(/[<>]/g, "")
    .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, "")
    .trim()
    .slice(0, maxLen);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) && email.length <= 254;
}

function hashShort(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return hash.toString(36);
}

function hashPayload(data: InquiryPayload): string {
  return hashShort(`${data.firstName}|${data.lastName}|${data.email}|${data.company}|${data.message || ""}`);
}

function hashQuestionnaire(d: QuestionnaireData): string {
  // Stable hash over the most distinguishing fields + a coarse fingerprint of free text.
  const fingerprint = `${d.firstName}|${d.lastName}|${d.email}|${d.company}|${d.specialReq || ""}|${d.installSpace || ""}`;
  return "q-" + hashShort(fingerprint);
}

// Duplicate detection: in-memory recent hashes
const recentHashes = new Map<string, number>();

function isDuplicate(hash: string): boolean {
  const now = Date.now();
  const fiveMinAgo = now - 5 * 60 * 1000;

  // Clean old hashes
  for (const [k, t] of recentHashes) {
    if (t < fiveMinAgo) recentHashes.delete(k);
  }

  if (recentHashes.has(hash)) return true;
  recentHashes.set(hash, now);
  return false;
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
  if (!secret) {
    console.warn("TURNSTILE_SECRET_KEY not configured, skipping verification");
    return true; // graceful degradation
  }

  try {
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({ secret, response: token, remoteip: ip }),
    });
    const result = await res.json();
    return result.success === true;
  } catch (err) {
    console.error("Turnstile verification error:", err);
    return false;
  }
}

async function logInquiry(
  supabaseAdmin: ReturnType<typeof createClient>,
  details: {
    ip_address: string;
    user_agent: string;
    status: string;
    reason: string | null;
    email: string | null;
    payload_hash: string | null;
    source: string | null;
  }
) {
  try {
    await supabaseAdmin.from("inquiry_logs").insert(details);
  } catch (err) {
    console.error("Failed to log inquiry:", err);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("cf-connecting-ip") || "unknown";
  const userAgent = req.headers.get("user-agent") || "unknown";

  const supabaseAdmin = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
  );

  try {
    const raw = (await req.json()) as AnyPayload;

    // ============================================================
    // QUESTIONNAIRE BRANCH (new) — discriminated by kind: "questionnaire"
    // Short-form path below is unchanged.
    // ============================================================
    if ((raw as QuestionnairePayload).kind === "questionnaire") {
      return await handleQuestionnaire(raw as QuestionnairePayload, {
        ip, userAgent, supabaseAdmin,
      });
    }

    // ============================================================
    // SHORT INQUIRY BRANCH (existing — unchanged)
    // ============================================================
    const data = raw as InquiryPayload;
    const payloadHash = hashPayload(data);
    const source = data.source || "website";

    // 1. HONEYPOT CHECK
    if (data._website && data._website.trim().length > 0) {
      await logInquiry(supabaseAdmin, {
        ip_address: ip, user_agent: userAgent,
        status: "blocked", reason: "honeypot",
        email: data.email || null, payload_hash: payloadHash, source,
      });
      // Return fake success to avoid bot detection
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 2. RATE LIMITING
    const rateCheck = checkRateLimit(ip);
    if (!rateCheck.allowed) {
      await logInquiry(supabaseAdmin, {
        ip_address: ip, user_agent: userAgent,
        status: "rate_limited", reason: rateCheck.reason!,
        email: data.email || null, payload_hash: payloadHash, source,
      });
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 3. TURNSTILE VERIFICATION
    if (data.turnstileToken) {
      const valid = await verifyTurnstile(data.turnstileToken, ip);
      if (!valid) {
        await logInquiry(supabaseAdmin, {
          ip_address: ip, user_agent: userAgent,
          status: "blocked", reason: "turnstile_failed",
          email: data.email || null, payload_hash: payloadHash, source,
        });
        return new Response(
          JSON.stringify({ error: "Verification failed. Please try again." }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
    } else {
      const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
      if (secret) {
        console.warn("Turnstile token missing but secret configured — allowing request with warning");
        await logInquiry(supabaseAdmin, {
          ip_address: ip, user_agent: userAgent,
          status: "warning", reason: "turnstile_missing",
          email: data.email || null, payload_hash: payloadHash, source,
        });
      }
    }

    // 4. STRICT VALIDATION
    const firstName = sanitize(data.firstName, 100);
    const lastName = sanitize(data.lastName, 100);
    const email = sanitize(data.email, 254);
    const company = sanitize(data.company, 200);
    const phone = sanitize(data.phone, 50);
    const project = sanitize(data.project, 500);
    const chamberType = sanitize(data.chamberType, 100);
    const applicationArea = sanitize(data.applicationArea, 100);
    const timeline = sanitize(data.timeline, 100);
    const message = sanitize(data.message, 5000);

    if (!firstName || !lastName || !email || !company) {
      await logInquiry(supabaseAdmin, {
        ip_address: ip, user_agent: userAgent,
        status: "blocked", reason: "validation_missing_fields",
        email: email || null, payload_hash: payloadHash, source,
      });
      return new Response(
        JSON.stringify({ error: "Missing required fields." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (!isValidEmail(email)) {
      await logInquiry(supabaseAdmin, {
        ip_address: ip, user_agent: userAgent,
        status: "blocked", reason: "validation_invalid_email",
        email: email, payload_hash: payloadHash, source,
      });
      return new Response(
        JSON.stringify({ error: "Invalid email address." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (message && message.length > 0 && message.length < 10) {
      await logInquiry(supabaseAdmin, {
        ip_address: ip, user_agent: userAgent,
        status: "blocked", reason: "validation_message_too_short",
        email: email, payload_hash: payloadHash, source,
      });
      return new Response(
        JSON.stringify({ error: "Message must be at least 10 characters." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 5. DUPLICATE DETECTION
    if (isDuplicate(payloadHash)) {
      await logInquiry(supabaseAdmin, {
        ip_address: ip, user_agent: userAgent,
        status: "blocked", reason: "duplicate",
        email: email, payload_hash: payloadHash, source,
      });
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // 6. ALL CHECKS PASSED – SEND EMAIL
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const lines = [
      `<h2>New Inquiry from ${escapeHtml(firstName)} ${escapeHtml(lastName)}</h2>`,
      `<table style="border-collapse:collapse;width:100%;max-width:600px;">`,
      row("Name", `${firstName} ${lastName}`),
      row("Email", email),
      phone ? row("Phone", phone) : "",
      row("Company", company),
      project ? row("Project", project) : "",
      chamberType ? row("Chamber Type", chamberType) : "",
      applicationArea ? row("Application Area", applicationArea) : "",
      timeline ? row("Timeline", timeline) : "",
      `</table>`,
      message ? `<h3>Message</h3><p>${escapeHtml(message)}</p>` : "",
      `<hr/><p style="color:#888;font-size:12px;">Source: ${escapeHtml(source)} | IP: ${escapeHtml(ip)}</p>`,
    ].filter(Boolean).join("\n");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Deepvac <noreply@deepvac.space>",
        to: ["info@deepvac.space"],
        reply_to: email,
        subject: `Engineering Inquiry – ${company} (${firstName} ${lastName})`,
        html: lines,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", result);
      await logInquiry(supabaseAdmin, {
        ip_address: ip, user_agent: userAgent,
        status: "failed", reason: `resend_error_${res.status}`,
        email: email, payload_hash: payloadHash, source,
      });
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: result }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Log success
    await logInquiry(supabaseAdmin, {
      ip_address: ip, user_agent: userAgent,
      status: "success", reason: null,
      email: email, payload_hash: payloadHash, source,
    });

    return new Response(
      JSON.stringify({ success: true, id: result.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
    await logInquiry(supabaseAdmin, {
      ip_address: ip, user_agent: userAgent,
      status: "error", reason: error instanceof Error ? error.message : "unknown",
      email: null, payload_hash: null, source: null,
    });
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

// ============================================================
// QUESTIONNAIRE HANDLER
// ============================================================
async function handleQuestionnaire(
  payload: QuestionnairePayload,
  ctx: { ip: string; userAgent: string; supabaseAdmin: ReturnType<typeof createClient> }
): Promise<Response> {
  const { ip, userAgent, supabaseAdmin } = ctx;
  const source = payload.source || "tvac-questionnaire";
  const language: "en" | "de" = payload.language === "de" ? "de" : "en";
  const d = payload.data || ({} as QuestionnaireData);
  const payloadHash = hashQuestionnaire(d);

  // 1. HONEYPOT
  if (payload._website && payload._website.trim().length > 0) {
    await logInquiry(supabaseAdmin, {
      ip_address: ip, user_agent: userAgent,
      status: "blocked", reason: "honeypot",
      email: d.email || null, payload_hash: payloadHash, source,
    });
    return new Response(JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  // 2. RATE LIMITING
  const rateCheck = checkRateLimit(ip);
  if (!rateCheck.allowed) {
    await logInquiry(supabaseAdmin, {
      ip_address: ip, user_agent: userAgent,
      status: "rate_limited", reason: rateCheck.reason!,
      email: d.email || null, payload_hash: payloadHash, source,
    });
    return new Response(JSON.stringify({ error: "Too many requests. Please try again later." }),
      { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  // 3. TURNSTILE
  if (payload.turnstileToken) {
    const valid = await verifyTurnstile(payload.turnstileToken, ip);
    if (!valid) {
      await logInquiry(supabaseAdmin, {
        ip_address: ip, user_agent: userAgent,
        status: "blocked", reason: "turnstile_failed",
        email: d.email || null, payload_hash: payloadHash, source,
      });
      return new Response(JSON.stringify({ error: "Verification failed. Please try again." }),
        { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }
  } else {
    const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
    if (secret) {
      console.warn("Turnstile token missing on questionnaire — allowing with warning");
      await logInquiry(supabaseAdmin, {
        ip_address: ip, user_agent: userAgent,
        status: "warning", reason: "turnstile_missing",
        email: d.email || null, payload_hash: payloadHash, source,
      });
    }
  }

  // 4. STRICT VALIDATION (only required fields)
  const firstName = sanitize(d.firstName, 100);
  const lastName = sanitize(d.lastName, 100);
  const email = sanitize(d.email, 254);
  const company = sanitize(d.company, 200);

  if (!firstName || !lastName || !email || !company) {
    await logInquiry(supabaseAdmin, {
      ip_address: ip, user_agent: userAgent,
      status: "blocked", reason: "validation_missing_fields",
      email: email || null, payload_hash: payloadHash, source,
    });
    return new Response(JSON.stringify({ error: "Missing required fields." }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  if (!isValidEmail(email)) {
    await logInquiry(supabaseAdmin, {
      ip_address: ip, user_agent: userAgent,
      status: "blocked", reason: "validation_invalid_email",
      email, payload_hash: payloadHash, source,
    });
    return new Response(JSON.stringify({ error: "Invalid email address." }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }
  if (payload.data?.consent !== true && payload.consent !== true) {
    await logInquiry(supabaseAdmin, {
      ip_address: ip, user_agent: userAgent,
      status: "blocked", reason: "consent_missing",
      email, payload_hash: payloadHash, source,
    });
    return new Response(JSON.stringify({ error: "Consent is required." }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  // 5. DUPLICATE
  if (isDuplicate(payloadHash)) {
    await logInquiry(supabaseAdmin, {
      ip_address: ip, user_agent: userAgent,
      status: "blocked", reason: "duplicate",
      email, payload_hash: payloadHash, source,
    });
    return new Response(JSON.stringify({ success: true }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  // 6. SEND EMAIL
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
  if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");

  const subject = language === "de"
    ? `Technischer TVAC-Fragebogen – ${company}`
    : `Detailed TVAC Questionnaire – ${company}`;

  const html = renderQuestionnaireEmail(d, {
    language, source, ip, submittedAt: new Date().toISOString(),
    firstName, lastName, email, company, phone: sanitize(d.phone, 50),
  });

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Deepvac <noreply@deepvac.space>",
      to: ["info@deepvac.space"],
      reply_to: email,
      subject,
      html,
    }),
  });
  const result = await res.json();

  if (!res.ok) {
    console.error("Resend API error (questionnaire):", result);
    await logInquiry(supabaseAdmin, {
      ip_address: ip, user_agent: userAgent,
      status: "failed", reason: `resend_error_${res.status}`,
      email, payload_hash: payloadHash, source,
    });
    return new Response(JSON.stringify({ error: "Failed to send email", details: result }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } });
  }

  await logInquiry(supabaseAdmin, {
    ip_address: ip, user_agent: userAgent,
    status: "success", reason: null,
    email, payload_hash: payloadHash, source,
  });

  return new Response(JSON.stringify({ success: true, id: result.id }),
    { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } });
}

// ============================================================
// QUESTIONNAIRE EMAIL RENDERER
// ============================================================
const QUESTIONNAIRE_LABELS: Record<"en" | "de", Record<string, string | string[]>> = {
  en: {
    s1: "1. General Information",
    s2: "2. Mounting of DUT",
    s3: "3. Vacuum Chamber",
    s4: "4. Thermal and Vacuum Requirements",
    s5: "5. Feedthroughs and Interfaces",
    s6: "6. Control System",
    s7: "7. Safety",
    s8: "8. Additional Requirements",
    s9: "9. Schedule and Budget",
    contact: "Contact",
    company: "Company", firstName: "First name", lastName: "Last name",
    email: "Email", phone: "Phone", country: "Country", application: "Application field",
    weight: "Max. DUT weight (kg)", dutType: "DUT type", housing: "Housing material",
    shape: "Chamber shape", material: "Chamber material",
    external: "External dimensions (W × H × L), mm", customDims: "Custom dimensions",
    door: "Door type", ports: "Ports", viewports: "Viewports",
    heat: "Max. heat dissipation (W)", dutCount: "Max. number of DUTs",
    vacuum: "Vacuum level", highVac: "High vacuum pump", foreVac: "Fore vacuum pump",
    gauges: "Vacuum gauges", ramp: "Temperature ramp rate (K/min)",
    uniformity: "Temperature uniformity (±K)", tempRange: "Temperature range (°C)",
    plate: "Thermal plate", shroud: "Thermal shroud",
    sensor: "Temperature sensors", channels: "Measurement channels",
    elec: "Electrical feedthroughs", elecConnector: "Connector type",
    rf: "RF / Coaxial feedthroughs", fiber: "Fiber optic feedthroughs",
    fluid: "Fluid / Gas feedthroughs", motion: "Motion feedthroughs",
    remote: "Remote access", remoteOpts: "Access type", ai: "AI monitoring",
    comm: "Communication interfaces",
    logging: "Electrical parameter logging", exportFmt: "Data export formats",
    alarm: "Alarm and notification system",
    installEnv: "Installation environment", installSpace: "Space limitations",
    power: "Power supply", powerMax: "Max. power consumption (kW)",
    utilities: "Utilities available", specialReq: "Special requirements",
    delivery: "Requested delivery", budget: "Target budget", phase: "Project phase",
    submittedAt: "Submitted at", language: "Language", source: "Source",
    yes: "Yes", qty: "Qty", min: "min.", max: "max.", configuration: "Configuration",
    cooling: "Cooling / heating type", voltage: "Voltage (V)", current: "Current (A)",
    notes: "Notes", quantity: "Quantity", connection: "Connection type / standard",
    type: "Type", size: "Size", standard: "Standard",
    cleanroom: "Cleanroom",
    dutTypeOptions: ["Satellite component","Electronic unit","Optical instrument","Sensor","Battery","Solar panel","Antenna","Propulsion component","Structural element","Thermal control component","Mechanism / Actuator","PCB / Printed Circuit Board"],
    housingOptions: ["Stainless steel","Aluminum","Titanium","CFRP / Carbon Composite","GFRP / Glass Composite","Invar","Ceramic","Plastic / Polymer","PCB material (FR4 etc.)"],
    doorOptions: ["Hinged, single door","Horizontal sliding door","Vertical lift lid"],
    portLabels: ["KF (NW)","ISO-K / ISO-F","CF (ConFlat)","DN flanges","Custom / Other"],
    viewportsMaterialOptions: ["Borosilicate glass","Quartz","Sapphire","ZnSe"],
    highVacOptions: ["Cryo pump","Turbomolecular pump"],
    highVacNestedOptions: ["Maglev turbomolecular pump","Mechanical turbomolecular pump"],
    foreVacOptions: ["Scroll pump (oil-free)","Multi-stage roots pump (oil-free)","Screw vacuum pump (oil-free)","Oil rotary pump"],
    gaugeOptions: ["Pirani gauge","Cold cathode gauge","Hot cathode gauge"],
    plateCoolingOptions: ["Mechanical refrigeration / heating via chiller or system","LN2 / GN2 cooling + resistive heaters","Combined / Hybrid"],
    shroudCoolingOptions: ["LN2 / GN2 cooled shroud","Resistive heaters","Radiation heaters","Combined cooling + heating","None"],
    sensorOptions: ["PT100 / PT1000 (RTD)","Thermocouple Type K","Thermocouple Type T","Thermocouple Type E","NTC Thermistor","Diode sensor (cryogenic)"],
    elecConnectorOptions: ["Sub-D (9 / 15 / 25 / 37 / 50 pin)","Circular connector (MIL-spec)","SHV / HV connector","Custom pin feedthrough"],
    rfOptions: ["SMA","N-type","BNC","SMP"],
    fiberOptions: ["Single-mode","Multi-mode","UV-fiber"],
    motionOptions: ["Rotary","Linear","Both"],
    remoteOptionsList: ["VPN","Remote desktop","Web interface"],
    commOptions: ["Ethernet / TCP-IP","RS-232 / RS-485","USB","GPIB / IEEE-488","CAN bus","Modbus (RTU / TCP)","OPC UA"],
    exportOptions: ["CSV","Excel (.xlsx)","PDF report","Custom","Other"],
    alarmOptions: ["Acoustic alarm (buzzer / horn)","Visual alarm (signal light / HMI)","E-mail notification","SMS notification","Remote alert (SCADA / OPC UA)","Other"],
    powerOptions: ["230 V / 1-phase","400 V / 3-phase"],
    utilitiesOptions: ["LN2 supply on site","Compressed air","Cooling water","Industrial exhaust ventilation","None / To be provided by supplier"],
    installStandard: "Standard lab / indoor",
    loggingCustom: "Custom electrical parameters",
  },
  de: {
    s1: "1. Allgemeine Angaben",
    s2: "2. Aufnahme des Prüflings (DUT)",
    s3: "3. Vakuumkammer",
    s4: "4. Thermische und Vakuum-Anforderungen",
    s5: "5. Durchführungen und Schnittstellen",
    s6: "6. Steuerungssystem",
    s7: "7. Sicherheit",
    s8: "8. Zusätzliche Anforderungen",
    s9: "9. Terminplan und Budget",
    contact: "Kontakt",
    company: "Unternehmen", firstName: "Vorname", lastName: "Nachname",
    email: "E-Mail", phone: "Telefon", country: "Land", application: "Anwendungsfeld",
    weight: "Max. DUT-Gewicht (kg)", dutType: "DUT-Typ", housing: "Gehäusematerial",
    shape: "Kammerform", material: "Kammermaterial",
    external: "Außenmaße (B × H × L), mm", customDims: "Sondermaße",
    door: "Türtyp", ports: "Ports", viewports: "Sichtfenster",
    heat: "Max. Wärmeabgabe (W)", dutCount: "Max. Anzahl DUTs",
    vacuum: "Vakuumniveau", highVac: "Hochvakuumpumpe", foreVac: "Vorvakuumpumpe",
    gauges: "Vakuum-Messgeräte", ramp: "Temperatur-Rampenrate (K/min)",
    uniformity: "Temperatur-Homogenität (±K)", tempRange: "Temperaturbereich (°C)",
    plate: "Thermalplatte", shroud: "Thermal-Shroud",
    sensor: "Temperatursensoren", channels: "Messkanäle",
    elec: "Elektrische Durchführungen", elecConnector: "Steckverbindertyp",
    rf: "RF-/Koax-Durchführungen", fiber: "LWL-Durchführungen",
    fluid: "Flüssigkeits-/Gasdurchführungen", motion: "Bewegungsdurchführungen",
    remote: "Fernzugriff", remoteOpts: "Zugriffsart", ai: "KI-Überwachung",
    comm: "Kommunikationsschnittstellen",
    logging: "Erfassung elektrischer Parameter", exportFmt: "Datenexportformate",
    alarm: "Alarm- und Benachrichtigungssystem",
    installEnv: "Aufstellungsumgebung", installSpace: "Raum-Beschränkungen",
    power: "Spannungsversorgung", powerMax: "Max. Leistungsaufnahme (kW)",
    utilities: "Verfügbare Medien", specialReq: "Besondere Anforderungen",
    delivery: "Gewünschte Lieferzeit", budget: "Zielbudget", phase: "Projektphase",
    submittedAt: "Eingegangen am", language: "Sprache", source: "Quelle",
    yes: "Ja", qty: "Anz.", min: "min.", max: "max.", configuration: "Konfiguration",
    cooling: "Kühl-/Heizart", voltage: "Spannung (V)", current: "Strom (A)",
    notes: "Hinweise", quantity: "Anzahl", connection: "Anschlussart / Standard",
    type: "Typ", size: "Größe", standard: "Standard",
    cleanroom: "Reinraum",
    dutTypeOptions: ["Satellitenkomponente","Elektronikbaugruppe","Optisches Instrument","Sensor","Batterie","Solarpanel","Antenne","Antriebskomponente","Strukturbauteil","Thermalkontrollkomponente","Mechanismus / Aktuator","PCB / Leiterplatte"],
    housingOptions: ["Edelstahl","Aluminium","Titan","CFK / Carbon-Verbund","GFK / Glas-Verbund","Invar","Keramik","Kunststoff / Polymer","Leiterplattenmaterial (FR4 usw.)"],
    doorOptions: ["Einflüglige Schwenktür","Horizontale Schiebetür","Vertikaler Hubdeckel"],
    portLabels: ["KF (NW)","ISO-K / ISO-F","CF (ConFlat)","DN-Flansche","Custom / Sonstige"],
    viewportsMaterialOptions: ["Borosilikatglas","Quarz","Saphir","ZnSe"],
    highVacOptions: ["Kryopumpe","Turbomolekularpumpe"],
    highVacNestedOptions: ["Maglev-Turbomolekularpumpe","Mechanische Turbomolekularpumpe"],
    foreVacOptions: ["Scrollpumpe (ölfrei)","Mehrstufige Wälzkolbenpumpe (ölfrei)","Schraubenvakuumpumpe (ölfrei)","Öl-Drehschieberpumpe"],
    gaugeOptions: ["Pirani-Messröhre","Kaltkathoden-Messröhre","Heißkathoden-Messröhre"],
    plateCoolingOptions: ["Mechanische Kälte-/Wärmeerzeugung über Chiller oder System","LN2-/GN2-Kühlung + Widerstandsheizungen","Kombiniert / Hybrid"],
    shroudCoolingOptions: ["LN2-/GN2-gekühlter Shroud","Widerstandsheizungen","Strahlungsheizungen","Kombinierte Kühlung + Heizung","Keine"],
    sensorOptions: ["PT100 / PT1000 (RTD)","Thermoelement Typ K","Thermoelement Typ T","Thermoelement Typ E","NTC-Thermistor","Diodensensor (kryogen)"],
    elecConnectorOptions: ["Sub-D (9 / 15 / 25 / 37 / 50-polig)","Rundsteckverbinder (MIL-spec)","SHV / HV-Steckverbinder","Sonderpin-Durchführung"],
    rfOptions: ["SMA","N-Typ","BNC","SMP"],
    fiberOptions: ["Single-Mode","Multi-Mode","UV-Faser"],
    motionOptions: ["Rotativ","Linear","Beides"],
    remoteOptionsList: ["VPN","Remote Desktop","Web-Oberfläche"],
    commOptions: ["Ethernet / TCP-IP","RS-232 / RS-485","USB","GPIB / IEEE-488","CAN-Bus","Modbus (RTU / TCP)","OPC UA"],
    exportOptions: ["CSV","Excel (.xlsx)","PDF-Bericht","Custom","Sonstiges"],
    alarmOptions: ["Akustischer Alarm (Summer / Hupe)","Optischer Alarm (Signalleuchte / HMI)","E-Mail-Benachrichtigung","SMS-Benachrichtigung","Remote-Alarm (SCADA / OPC UA)","Sonstiges"],
    powerOptions: ["230 V / 1-phasig","400 V / 3-phasig"],
    utilitiesOptions: ["LN2-Versorgung vor Ort","Druckluft","Kühlwasser","Industrielle Abluft","Keine / Vom Lieferanten bereitzustellen"],
    installStandard: "Standard-Labor / Innenraum",
    loggingCustom: "Kundenspezifische elektrische Parameter",
  },
};

// Render helpers
function pickedFromArray(flags: boolean[] | undefined, options: string[]): string[] {
  if (!flags) return [];
  return options.filter((_, i) => flags[i]);
}
function withOther(values: string[], other?: OtherCheck): string[] {
  if (other?.checked) {
    const t = sanitize(other.text, 200);
    values.push(t ? `Other: ${t}` : "Other");
  }
  return values;
}

function renderQuestionnaireEmail(
  d: QuestionnaireData,
  meta: { language: "en" | "de"; source: string; ip: string; submittedAt: string;
          firstName: string; lastName: string; email: string; company: string; phone: string }
): string {
  const L = QUESTIONNAIRE_LABELS[meta.language];
  const parts: string[] = [];

  // ---------- Header ----------
  const headerTitle = meta.language === "de"
    ? `Technischer TVAC-Fragebogen – ${escapeHtml(meta.company)}`
    : `Detailed TVAC Questionnaire – ${escapeHtml(meta.company)}`;
  parts.push(`<div style="font-family:Arial,sans-serif;color:#22282E;max-width:720px;">`);
  parts.push(`<h2 style="margin:0 0 12px;font-size:20px;color:#22282E;">${headerTitle}</h2>`);

  // Meta strip
  parts.push(`<table style="border-collapse:collapse;width:100%;margin:0 0 18px;font-size:12px;color:#66727D;">
    <tr>
      <td style="padding:4px 0;">${esc(L.submittedAt as string)}: ${escapeHtml(meta.submittedAt)}</td>
      <td style="padding:4px 0;text-align:right;">${esc(L.language as string)}: ${meta.language.toUpperCase()} · ${esc(L.source as string)}: ${escapeHtml(meta.source)}</td>
    </tr>
  </table>`);

  // ---------- Section 1 — Contact / General ----------
  parts.push(sectionOpen(L.s1 as string));
  parts.push(table([
    rowKv(L.company as string, meta.company),
    rowKv(L.firstName as string, meta.firstName),
    rowKv(L.lastName as string, meta.lastName),
    rowKv(L.email as string, meta.email),
    meta.phone ? rowKv(L.phone as string, meta.phone) : "",
    d.country ? rowKv(L.country as string, sanitize(d.country, 100)) : "",
    d.application ? rowKv(L.application as string, sanitize(d.application, 100)) : "",
  ]));
  parts.push(sectionClose());

  // ---------- Section 2 — Mounting of DUT ----------
  const dutTypes = withOther(pickedFromArray(d.dutTypes, L.dutTypeOptions as string[]), d.dutTypeOther);
  const housing = withOther(pickedFromArray(d.housing, L.housingOptions as string[]), d.housingOther);
  if (d.dutWeight || dutTypes.length || housing.length) {
    parts.push(sectionOpen(L.s2 as string));
    parts.push(table([
      d.dutWeight ? rowKv(L.weight as string, sanitize(d.dutWeight, 50)) : "",
      dutTypes.length ? rowKv(L.dutType as string, dutTypes.join(", ")) : "",
      housing.length ? rowKv(L.housing as string, housing.join(", ")) : "",
    ]));
    parts.push(sectionClose());
  }

  // ---------- Section 3 — Vacuum chamber ----------
  const doors = pickedFromArray(d.doorTypes, L.doorOptions as string[]);
  const ports = (d.ports || [])
    .map((p, i) => p?.checked
      ? `${(L.portLabels as string[])[i]}${p.size ? ` — ${escapeHtml(sanitize(p.size, 80))}` : ""}${p.qty ? ` × ${escapeHtml(sanitize(p.qty, 10))}` : ""}`
      : "")
    .filter(Boolean);
  const viewportsMat = withOther(pickedFromArray(d.viewportsMaterial, L.viewportsMaterialOptions as string[]), d.viewportsMaterialOther);

  let customDims = "";
  if (d.externalDimensions === "Other") {
    if (d.chamberShape === "cubic" && (d.cubicL || d.cubicW || d.cubicH)) {
      customDims = `L: ${sanitize(d.cubicL || "—", 20)} · W: ${sanitize(d.cubicW || "—", 20)} · H: ${sanitize(d.cubicH || "—", 20)} mm`;
    } else if (d.chamberShape === "cylindrical" && (d.cylDiameter || d.cylLength)) {
      customDims = `D: ${sanitize(d.cylDiameter || "—", 20)} · L: ${sanitize(d.cylLength || "—", 20)} mm`;
    }
  }

  const hasS3 = d.chamberShape || d.chamberMaterial || d.externalDimensions || doors.length || ports.length || d.viewportsQty || d.viewportsSize || viewportsMat.length;
  if (hasS3) {
    parts.push(sectionOpen(L.s3 as string));
    parts.push(table([
      d.chamberShape ? rowKv(L.shape as string, escapeHtml(d.chamberShape)) : "",
      d.chamberMaterial ? rowKv(L.material as string, sanitize(d.chamberMaterial, 100)) : "",
      d.externalDimensions ? rowKv(L.external as string, sanitize(d.externalDimensions, 100)) : "",
      customDims ? rowKv(L.customDims as string, customDims) : "",
      doors.length ? rowKv(L.door as string, doors.join(", ")) : "",
      ports.length ? rowKv(L.ports as string, ports.join("<br/>")) : "",
      d.viewportsQty || d.viewportsSize || viewportsMat.length
        ? rowKv(L.viewports as string,
            [
              d.viewportsQty ? `${L.qty}: ${escapeHtml(sanitize(d.viewportsQty, 20))}` : "",
              d.viewportsSize ? `${L.size}: ${escapeHtml(sanitize(d.viewportsSize, 60))}` : "",
              viewportsMat.length ? viewportsMat.join(", ") : "",
            ].filter(Boolean).join(" · "))
        : "",
    ]));
    parts.push(sectionClose());
  }

  // ---------- Section 4 — Thermal & vacuum ----------
  const highVac = pickedFromArray(d.highVac, L.highVacOptions as string[])
    .concat(pickedFromArray(d.highVacNested, L.highVacNestedOptions as string[]));
  const foreVac = pickedFromArray(d.foreVac, L.foreVacOptions as string[]);
  const gauges = pickedFromArray(d.gauges, L.gaugeOptions as string[]);
  const plateCool = withOther(pickedFromArray(d.plateCooling, L.plateCoolingOptions as string[]), d.plateCoolingOther);
  const shroudCool = withOther(pickedFromArray(d.shroudCooling, L.shroudCoolingOptions as string[]), d.shroudCoolingOther);
  const sensors = withOther(pickedFromArray(d.sensorTypes, L.sensorOptions as string[]), d.sensorTypeOther);

  const tempRange = (d.tempMin || d.tempMax) ? `${L.min} ${sanitize(d.tempMin || "—", 20)} °C · ${L.max} ${sanitize(d.tempMax || "—", 20)} °C` : "";

  const plateBlock: string[] = [];
  const plateDims = d.plateDimensions === "Other"
    ? `Other${d.plateCustom ? ` — ${escapeHtml(sanitize(d.plateCustom, 100))}` : ""}`
    : (d.plateDimensions || "");
  if (plateDims) plateBlock.push(`${L.size}: ${escapeHtml(plateDims)}`);
  if (d.plateTempMin || d.plateTempMax) plateBlock.push(`${L.min} ${sanitize(d.plateTempMin || "—", 20)} °C · ${L.max} ${sanitize(d.plateTempMax || "—", 20)} °C`);
  if (plateCool.length) plateBlock.push(`${L.cooling}: ${plateCool.join(", ")}`);

  const shroudBlock: string[] = [];
  if (d.shroudConfig) shroudBlock.push(`${L.configuration}: ${escapeHtml(sanitize(d.shroudConfig, 60))}`);
  if (d.shroudTempMin || d.shroudTempMax) shroudBlock.push(`${L.min} ${sanitize(d.shroudTempMin || "—", 20)} °C · ${L.max} ${sanitize(d.shroudTempMax || "—", 20)} °C`);
  if (shroudCool.length) shroudBlock.push(`${L.cooling}: ${shroudCool.join(", ")}`);

  const hasS4 = d.heatDissipation || d.dutCount || d.vacuumLevel || highVac.length || foreVac.length || gauges.length || d.rampRate || d.uniformity || tempRange || plateBlock.length || shroudBlock.length || sensors.length || d.measurementChannels;
  if (hasS4) {
    parts.push(sectionOpen(L.s4 as string));
    parts.push(table([
      d.heatDissipation ? rowKv(L.heat as string, sanitize(d.heatDissipation, 50)) : "",
      d.dutCount ? rowKv(L.dutCount as string, sanitize(d.dutCount, 20)) : "",
      d.vacuumLevel ? rowKv(L.vacuum as string, sanitize(d.vacuumLevel, 50)) : "",
      highVac.length ? rowKv(L.highVac as string, highVac.join(", ")) : "",
      foreVac.length ? rowKv(L.foreVac as string, foreVac.join(", ")) : "",
      gauges.length ? rowKv(L.gauges as string, gauges.join(", ")) : "",
      d.rampRate ? rowKv(L.ramp as string, sanitize(d.rampRate, 20)) : "",
      d.uniformity ? rowKv(L.uniformity as string, sanitize(d.uniformity, 20)) : "",
      tempRange ? rowKv(L.tempRange as string, tempRange) : "",
      plateBlock.length ? rowKv(L.plate as string, plateBlock.join("<br/>")) : "",
      shroudBlock.length ? rowKv(L.shroud as string, shroudBlock.join("<br/>")) : "",
      sensors.length ? rowKv(L.sensor as string, sensors.join(", ")) : "",
      d.measurementChannels ? rowKv(L.channels as string, sanitize(d.measurementChannels, 30)) : "",
    ]));
    parts.push(sectionClose());
  }

  // ---------- Section 5 — Feedthroughs ----------
  const elecConn = withOther(pickedFromArray(d.elecConnector, L.elecConnectorOptions as string[]), d.elecConnectorOther);
  const elecBlock: string[] = [];
  if (d.elecQty) elecBlock.push(`${L.quantity}: ${escapeHtml(sanitize(d.elecQty, 20))}`);
  if (d.elecVoltage) elecBlock.push(`${L.voltage}: ${escapeHtml(sanitize(d.elecVoltage, 30))}`);
  if (d.elecCurrent) elecBlock.push(`${L.current}: ${escapeHtml(sanitize(d.elecCurrent, 30))}`);
  if (d.elecNotes) elecBlock.push(`${L.notes}: ${escapeHtml(sanitize(d.elecNotes, 200))}`);
  if (elecConn.length) elecBlock.push(`${L.elecConnector}: ${elecConn.join(", ")}`);

  const rfTypes = withOther(pickedFromArray(d.rfTypes, L.rfOptions as string[]), d.rfTypeOther);
  const fiberTypes = withOther(pickedFromArray(d.fiberTypes, L.fiberOptions as string[]), d.fiberTypeOther);
  const motionTypes = withOther(pickedFromArray(d.motionTypes, L.motionOptions as string[]), d.motionTypeOther);

  const rfBlock = [
    rfTypes.length ? `${L.type}: ${rfTypes.join(", ")}` : "",
    d.rfQty ? `${L.quantity}: ${escapeHtml(sanitize(d.rfQty, 20))}` : "",
  ].filter(Boolean).join(" · ");
  const fiberBlock = [
    fiberTypes.length ? `${L.type}: ${fiberTypes.join(", ")}` : "",
    d.fiberQty ? `${L.quantity}: ${escapeHtml(sanitize(d.fiberQty, 20))}` : "",
  ].filter(Boolean).join(" · ");
  const fluidBlock = [
    d.fluidQty ? `${L.quantity}: ${escapeHtml(sanitize(d.fluidQty, 20))}` : "",
    d.fluidConnection ? `${L.connection}: ${escapeHtml(sanitize(d.fluidConnection, 100))}` : "",
  ].filter(Boolean).join(" · ");
  const motionBlock = [
    motionTypes.length ? `${L.type}: ${motionTypes.join(", ")}` : "",
    d.motionQty ? `${L.quantity}: ${escapeHtml(sanitize(d.motionQty, 20))}` : "",
  ].filter(Boolean).join(" · ");

  const hasS5 = elecBlock.length || rfBlock || fiberBlock || fluidBlock || motionBlock;
  if (hasS5) {
    parts.push(sectionOpen(L.s5 as string));
    parts.push(table([
      elecBlock.length ? rowKv(L.elec as string, elecBlock.join("<br/>")) : "",
      rfBlock ? rowKv(L.rf as string, rfBlock) : "",
      fiberBlock ? rowKv(L.fiber as string, fiberBlock) : "",
      fluidBlock ? rowKv(L.fluid as string, fluidBlock) : "",
      motionBlock ? rowKv(L.motion as string, motionBlock) : "",
    ]));
    parts.push(sectionClose());
  }

  // ---------- Section 6 — Control system ----------
  const remoteOpts = pickedFromArray(d.remoteOptions, L.remoteOptionsList as string[]);
  const comm = withOther(pickedFromArray(d.comm, L.commOptions as string[]), d.commOther);
  const exportFmt = pickedFromArray(d.exportFormats, L.exportOptions as string[]);
  const loggingBlock: string[] = [];
  if (d.loggingCustom) loggingBlock.push(L.loggingCustom as string);
  if (d.loggingNotes) loggingBlock.push(escapeHtml(sanitize(d.loggingNotes, 300)));

  const hasS6 = d.remoteAccess || remoteOpts.length || d.ai || comm.length || loggingBlock.length || exportFmt.length;
  if (hasS6) {
    parts.push(sectionOpen(L.s6 as string));
    parts.push(table([
      d.remoteAccess ? rowKv(L.remote as string, sanitize(d.remoteAccess, 30) + (remoteOpts.length ? ` (${remoteOpts.join(", ")})` : "")) : "",
      d.ai ? rowKv(L.ai as string, sanitize(d.ai, 30)) : "",
      comm.length ? rowKv(L.comm as string, comm.join(", ")) : "",
      loggingBlock.length ? rowKv(L.logging as string, loggingBlock.join(" — ")) : "",
      exportFmt.length ? rowKv(L.exportFmt as string, exportFmt.join(", ")) : "",
    ]));
    parts.push(sectionClose());
  }

  // ---------- Section 7 — Safety ----------
  const alarms = pickedFromArray(d.alarms, L.alarmOptions as string[]);
  if (alarms.length) {
    parts.push(sectionOpen(L.s7 as string));
    parts.push(table([rowKv(L.alarm as string, alarms.join(", "))]));
    parts.push(sectionClose());
  }

  // ---------- Section 8 — Additional ----------
  const installEnv: string[] = [];
  if (d.installStandard) installEnv.push(L.installStandard as string);
  if (d.installCleanroom?.checked) installEnv.push(`${L.cleanroom}${d.installCleanroom.text ? `: ${sanitize(d.installCleanroom.text, 60)}` : ""}`);
  if (d.installOther?.checked) installEnv.push(`Other${d.installOther.text ? `: ${sanitize(d.installOther.text, 100)}` : ""}`);
  const power = withOther(pickedFromArray(d.power, L.powerOptions as string[]), d.powerOther);
  const utilities = pickedFromArray(d.utilities, L.utilitiesOptions as string[]);

  const hasS8 = installEnv.length || d.installSpace || power.length || d.powerMax || utilities.length || d.specialReq;
  if (hasS8) {
    parts.push(sectionOpen(L.s8 as string));
    parts.push(table([
      installEnv.length ? rowKv(L.installEnv as string, installEnv.join(", ")) : "",
      d.installSpace ? rowKv(L.installSpace as string, escapeHtml(sanitize(d.installSpace, 1500))) : "",
      power.length || d.powerMax
        ? rowKv(L.power as string,
            [power.length ? power.join(", ") : "", d.powerMax ? `${L.powerMax}: ${escapeHtml(sanitize(d.powerMax, 30))}` : ""].filter(Boolean).join(" · "))
        : "",
      utilities.length ? rowKv(L.utilities as string, utilities.join(", ")) : "",
      d.specialReq ? rowKv(L.specialReq as string, escapeHtml(sanitize(d.specialReq, 2000))) : "",
    ]));
    parts.push(sectionClose());
  }

  // ---------- Section 9 — Schedule & budget ----------
  if (d.delivery || d.budget || d.phase) {
    parts.push(sectionOpen(L.s9 as string));
    parts.push(table([
      d.delivery ? rowKv(L.delivery as string, sanitize(d.delivery, 50)) : "",
      d.budget ? rowKv(L.budget as string, sanitize(d.budget, 50)) : "",
      d.phase ? rowKv(L.phase as string, sanitize(d.phase, 60)) : "",
    ]));
    parts.push(sectionClose());
  }

  // Footer
  parts.push(`<hr style="border:none;border-top:1px solid #DDE6EE;margin:24px 0 8px;"/>`);
  parts.push(`<p style="color:#888;font-size:11px;font-family:Arial,sans-serif;">${esc(L.source as string)}: ${escapeHtml(meta.source)} · IP: ${escapeHtml(meta.ip)} · ${esc(L.submittedAt as string)}: ${escapeHtml(meta.submittedAt)}</p>`);
  parts.push(`</div>`);

  return parts.filter(Boolean).join("\n");
}

function sectionOpen(title: string): string {
  return `<h3 style="font-family:Arial,sans-serif;font-size:14px;margin:18px 0 6px;padding:6px 10px;background:#F6F9FC;border-left:3px solid #77AED7;color:#22282E;">${escapeHtml(title)}</h3>`;
}
function sectionClose(): string { return ""; }

function table(rows: string[]): string {
  const filtered = rows.filter(Boolean);
  if (!filtered.length) return "";
  return `<table style="border-collapse:collapse;width:100%;font-family:Arial,sans-serif;font-size:13px;">${filtered.join("")}</table>`;
}
function rowKv(label: string, value: string): string {
  return `<tr>
    <td style="padding:6px 12px;font-weight:600;border:1px solid #eee;width:35%;vertical-align:top;color:#22282E;">${escapeHtml(label)}</td>
    <td style="padding:6px 12px;border:1px solid #eee;color:#22282E;">${value}</td>
  </tr>`;
}
function esc(s: string): string { return escapeHtml(s); }

function escapeHtml(str: string): string {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:6px 12px;font-weight:bold;border:1px solid #eee;">${label}</td><td style="padding:6px 12px;border:1px solid #eee;">${escapeHtml(value)}</td></tr>`;
}
