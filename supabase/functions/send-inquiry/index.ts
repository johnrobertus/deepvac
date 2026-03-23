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

function hashPayload(data: InquiryPayload): string {
  const str = `${data.firstName}|${data.lastName}|${data.email}|${data.company}|${data.message || ""}`;
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return hash.toString(36);
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
    const data: InquiryPayload = await req.json();
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
      // If Turnstile is configured but no token provided
      const secret = Deno.env.get("TURNSTILE_SECRET_KEY");
      if (secret) {
        await logInquiry(supabaseAdmin, {
          ip_address: ip, user_agent: userAgent,
          status: "blocked", reason: "turnstile_missing",
          email: data.email || null, payload_hash: payloadHash, source,
        });
        return new Response(
          JSON.stringify({ error: "Verification required." }),
          { status: 403, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
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
        JSON.stringify({ success: true }), // fake success
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

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function row(label: string, value: string): string {
  return `<tr><td style="padding:6px 12px;font-weight:bold;border:1px solid #eee;">${label}</td><td style="padding:6px 12px;border:1px solid #eee;">${escapeHtml(value)}</td></tr>`;
}
