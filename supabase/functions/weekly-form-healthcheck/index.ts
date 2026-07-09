// Weekly synthetic healthcheck for Deepvac contact forms.
// Submits a test payload to `send-inquiry` for both form variants
// (short project inquiry + technical TVAC questionnaire) and emails
// a pass/fail summary to info@deepvac.space.
//
// Triggered weekly by pg_cron. Safe to invoke manually for verification.

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
};

const SUPABASE_URL = Deno.env.get("SUPABASE_URL")!;
const ANON_KEY = Deno.env.get("SUPABASE_ANON_KEY")!;
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const HEALTHCHECK_TO = "info@deepvac.space";
const HEALTHCHECK_FROM = "Deepvac Monitor <noreply@deepvac.space>";

type CheckResult = {
  name: string;
  source: string;
  ok: boolean;
  status: number;
  body: string;
};

async function callSendInquiry(payload: unknown): Promise<{ status: number; body: string }> {
  try {
    const res = await fetch(`${SUPABASE_URL}/functions/v1/send-inquiry`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${ANON_KEY}`,
        apikey: ANON_KEY,
      },
      body: JSON.stringify(payload),
    });
    const text = await res.text();
    return { status: res.status, body: text.slice(0, 500) };
  } catch (err) {
    return { status: 0, body: err instanceof Error ? err.message : String(err) };
  }
}

function stamp() {
  return new Date().toISOString().replace(/[:.]/g, "-");
}

async function runChecks(): Promise<CheckResult[]> {
  const s = stamp();

  // 1) Short project inquiry (Contact page)
  const shortSource = "healthcheck-weekly-project-inquiry";
  const shortPayload = {
    firstName: "Deepvac",
    lastName: "Monitor",
    email: "monitoring@deepvac.space",
    company: "Deepvac Internal Monitoring",
    phone: "",
    country: "Germany",
    interests: ["General consultation"],
    projectStage: "Not sure yet",
    existingSystem: "No, new project",
    timeline: "Not sure yet",
    message:
      `AUTOMATED WEEKLY HEALTHCHECK — please ignore. ` +
      `Verifies that the short project inquiry form + send-inquiry function are operational. ` +
      `Run ID: ${s}`,
    language: "en",
    source: shortSource,
  };
  const short = await callSendInquiry(shortPayload);

  // 2) Technical TVAC questionnaire
  const qSource = "healthcheck-weekly-questionnaire";
  const qPayload = {
    kind: "questionnaire",
    source: qSource,
    language: "en",
    consent: true,
    data: {
      firstName: "Deepvac",
      lastName: "Monitor",
      email: "monitoring@deepvac.space",
      company: "Deepvac Internal Monitoring",
      phone: "",
      country: "Germany",
      application: "Automated healthcheck",
      specialReq: `AUTOMATED WEEKLY HEALTHCHECK — please ignore. Run ID: ${s}`,
      consent: true,
    },
  };
  const questionnaire = await callSendInquiry(qPayload);

  return [
    {
      name: "Short project inquiry",
      source: shortSource,
      ok: short.status >= 200 && short.status < 300,
      status: short.status,
      body: short.body,
    },
    {
      name: "Technical TVAC questionnaire",
      source: qSource,
      ok: questionnaire.status >= 200 && questionnaire.status < 300,
      status: questionnaire.status,
      body: questionnaire.body,
    },
  ];
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

async function sendSummary(results: CheckResult[]): Promise<void> {
  if (!RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not configured — skipping summary email");
    return;
  }
  const allOk = results.every((r) => r.ok);
  const subject = allOk
    ? "[Deepvac] Weekly form healthcheck — OK"
    : "[Deepvac] Weekly form healthcheck — FAILED";

  const rows = results
    .map(
      (r) => `
      <tr>
        <td style="padding:6px 10px;border:1px solid #ddd;"><strong>${escapeHtml(r.name)}</strong><br/><small>${escapeHtml(r.source)}</small></td>
        <td style="padding:6px 10px;border:1px solid #ddd;color:${r.ok ? "#0a7d2b" : "#b00020"};">${r.ok ? "OK" : "FAIL"}</td>
        <td style="padding:6px 10px;border:1px solid #ddd;">HTTP ${r.status}</td>
        <td style="padding:6px 10px;border:1px solid #ddd;font-family:monospace;font-size:12px;">${escapeHtml(r.body)}</td>
      </tr>`,
    )
    .join("");

  const html = `
    <h2>Deepvac — Weekly Form Healthcheck</h2>
    <p>Automated synthetic submission verifying that all contact forms and the <code>send-inquiry</code> edge function are operational.</p>
    <p><strong>Overall:</strong> ${allOk ? "✅ All forms responding" : "❌ At least one form failed"}<br/>
    <strong>Run:</strong> ${escapeHtml(new Date().toISOString())}</p>
    <table style="border-collapse:collapse;font-family:Arial,sans-serif;font-size:14px;">
      <thead><tr>
        <th style="padding:6px 10px;border:1px solid #ddd;text-align:left;">Form</th>
        <th style="padding:6px 10px;border:1px solid #ddd;text-align:left;">Result</th>
        <th style="padding:6px 10px;border:1px solid #ddd;text-align:left;">Status</th>
        <th style="padding:6px 10px;border:1px solid #ddd;text-align:left;">Response</th>
      </tr></thead>
      <tbody>${rows}</tbody>
    </table>
    <hr/>
    <p style="color:#888;font-size:12px;">
      Submissions are tagged with <code>source=healthcheck-weekly-*</code> and can be filtered in <code>inquiry_logs</code>.
      Two synthetic inquiry emails to info@deepvac.space are expected each week — please ignore them.
    </p>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: HEALTHCHECK_FROM,
        to: [HEALTHCHECK_TO],
        subject,
        html,
      }),
    });
    if (!res.ok) {
      console.error("Summary email failed:", res.status, await res.text());
    }
  } catch (err) {
    console.error("Summary email error:", err);
  }
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  try {
    const results = await runChecks();
    await sendSummary(results);
    const allOk = results.every((r) => r.ok);
    return new Response(JSON.stringify({ ok: allOk, results }, null, 2), {
      status: allOk ? 200 : 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Healthcheck error:", err);
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});
