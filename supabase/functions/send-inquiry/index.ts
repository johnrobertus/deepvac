import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
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
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not configured");
    }

    const data: InquiryPayload = await req.json();

    // Validate required fields
    if (!data.firstName || !data.lastName || !data.email || !data.company) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Build email body
    const lines = [
      `<h2>New Inquiry from ${data.firstName} ${data.lastName}</h2>`,
      `<table style="border-collapse:collapse;width:100%;max-width:600px;">`,
      row("Name", `${data.firstName} ${data.lastName}`),
      row("Email", data.email),
      data.phone ? row("Phone", data.phone) : "",
      row("Company", data.company),
      data.project ? row("Project", data.project) : "",
      data.chamberType ? row("Chamber Type", data.chamberType) : "",
      data.applicationArea ? row("Application Area", data.applicationArea) : "",
      data.timeline ? row("Timeline", data.timeline) : "",
      `</table>`,
      data.message ? `<h3>Message</h3><p>${escapeHtml(data.message)}</p>` : "",
      `<hr/><p style="color:#888;font-size:12px;">Source: ${data.source || "website"}</p>`,
    ].filter(Boolean).join("\n");

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Deepvac Website <onboarding@resend.dev>",
        to: ["info@deepvac.space"],
        reply_to: data.email,
        subject: `Engineering Inquiry – ${data.company} (${data.firstName} ${data.lastName})`,
        html: lines,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      console.error("Resend API error:", result);
      return new Response(
        JSON.stringify({ error: "Failed to send email", details: result }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(
      JSON.stringify({ success: true, id: result.id }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error:", error);
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
