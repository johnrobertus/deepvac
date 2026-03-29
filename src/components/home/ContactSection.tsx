import { useState, useRef, useEffect } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { Phone, Mail, MapPin, Shield, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ConsentMap } from "@/components/ConsentMap";

const TURNSTILE_SITE_KEY = "0x4AAAAAACu_Uqbd5b8IkXxU";

function FormField({
  label, placeholder, type = "text", required = false, value, onChange, error,
}: {
  label: string; placeholder: string; type?: string; required?: boolean; value: string; onChange: (val: string) => void; error?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="mono-label">
        {label}
        {required && <span className="text-blue ml-1">*</span>}
      </label>
      <input
        type={type} required={required} value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-background border rounded-sm px-4 py-3 text-sm text-sand placeholder:text-gray/30 focus:outline-none focus:border-blue/40 focus:ring-1 focus:ring-blue/20 transition-all duration-200 ${error ? "border-red-400/60" : "border-gray/15"}`}
        placeholder={placeholder}
        aria-invalid={!!error}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

interface FormData {
  firstName: string; lastName: string; email: string;
  company: string; phone: string; project: string; message: string;
}

const initialForm: FormData = {
  firstName: "", lastName: "", email: "",
  company: "", phone: "", project: "", message: "",
};

export function ContactSection() {
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState<FormData>(initialForm);
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  useEffect(() => {
    if (!document.getElementById("cf-turnstile-script")) {
      const script = document.createElement("script");
      script.id = "cf-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (!turnstileRef.current) return;
    const interval = setInterval(() => {
      if ((window as any).turnstile && turnstileRef.current && !turnstileWidgetId.current) {
        turnstileWidgetId.current = (window as any).turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: () => {},
          size: "invisible",
        });
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [submitted]);

  const set = (field: keyof FormData) => (val: string) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    clearFieldError(field);
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof FormData, string>> = {};
    if (!form.firstName.trim()) errors.firstName = "First name is required.";
    if (!form.lastName.trim()) errors.lastName = "Last name is required.";
    if (!form.email.trim()) {
      errors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
    if (!form.company.trim()) errors.company = "Company is required.";
    if (form.message.trim().length > 0 && form.message.trim().length < 10) {
      errors.message = "Please enter a more detailed message (minimum 10 characters).";
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const clearFieldError = (field: keyof FormData) => {
    if (validationErrors[field]) {
      setValidationErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      toast.error("Please accept the data processing consent to proceed.");
      return;
    }
    if (!validateForm()) return;
    if (sending) return;

    setSending(true);
    try {
      let turnstileToken = "";
      if ((window as any).turnstile && turnstileWidgetId.current) {
        turnstileToken = (window as any).turnstile.getResponse(turnstileWidgetId.current) || "";
      }

      const { data, error } = await supabase.functions.invoke("send-inquiry", {
        body: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone || undefined,
          company: form.company,
          project: form.project || undefined,
          message: form.message || undefined,
          source: "homepage-contact",
          _website: honeypot,
          turnstileToken: turnstileToken || undefined,
        },
      });

      if (error) throw error;
      if (data?.error) {
        // Surface server validation errors as user-friendly toasts, not crash states
        const msg = data.error as string;
        if (msg.includes("Message must be") || msg.includes("Missing required") || msg.includes("Invalid email")) {
          toast.error(msg);
        } else {
          throw new Error(msg);
        }
        return;
      }

      setSubmitted(true);
      setValidationErrors({});
      turnstileWidgetId.current = null;
      toast.success("Your inquiry has been sent successfully.");
    } catch (err: any) {
      console.error("Submission error:", err);
      if (err?.message?.includes("Too many requests")) {
        toast.error("Too many submissions. Please try again later.");
      } else {
        toast.error("Submission failed. Please try again later or contact us at info@deepvac.space.");
      }
      if ((window as any).turnstile && turnstileWidgetId.current) {
        (window as any).turnstile.reset(turnstileWidgetId.current);
      }
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <section className="py-20 md:py-28 px-6 bg-surface/30">
        <div className="container max-w-6xl">
          <div className="max-w-xl mx-auto text-center space-y-6">
            <CheckCircle className="w-12 h-12 text-blue mx-auto" />
            <h2 className="text-3xl font-medium text-sand tracking-tight">Thank You</h2>
            <p className="text-gray text-sm leading-relaxed">
              Your inquiry has been received. Our team typically responds within two business days.
            </p>
            <Button variant="outline" onClick={() => { setSubmitted(false); setForm(initialForm); setConsent(false); }}>
              Submit Another Inquiry
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 md:py-28 px-6 bg-surface/30">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Contact"
            title="Discuss Your Requirements"
            description="Tell us about your chamber, test, or integration requirements."
            className="mb-14"
          />
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <Reveal delay={100}>
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="First Name" placeholder="First name" required value={form.firstName} onChange={set("firstName")} error={validationErrors.firstName} />
                <FormField label="Last Name" placeholder="Last name" required value={form.lastName} onChange={set("lastName")} error={validationErrors.lastName} />
              </div>
              <FormField label="Work Email" placeholder="your@company.com" type="email" required value={form.email} onChange={set("email")} error={validationErrors.email} />
              <FormField label="Company" placeholder="Company name" required value={form.company} onChange={set("company")} error={validationErrors.company} />
              <FormField label="Phone Number" placeholder="+49 ..." type="tel" value={form.phone} onChange={set("phone")} />
              <FormField label="Project / Application" placeholder="e.g. Satellite qualification chamber, custom TVAC system, retrofit project" value={form.project} onChange={set("project")} />
              <div className="space-y-2">
                <label className="mono-label">Message</label>
                <textarea
                  value={form.message}
                  onChange={(e) => set("message")(e.target.value)}
                  className={`w-full bg-background border rounded-sm px-4 py-3 text-sm text-sand placeholder:text-gray/30 focus:outline-none focus:border-blue/40 focus:ring-1 focus:ring-blue/20 transition-all duration-200 min-h-[100px] resize-y ${validationErrors.message ? "border-red-400/60" : "border-gray/15"}`}
                  placeholder="Describe your requirements..."
                  aria-invalid={!!validationErrors.message}
                />
                {validationErrors.message && <p className="text-xs text-red-400">{validationErrors.message}</p>}
              </div>

              {/* Honeypot - invisible to users */}
              <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
                <label htmlFor="hp-website">Website</label>
                <input
                  type="text" id="hp-website" name="website" tabIndex={-1} autoComplete="off"
                  value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
                />
              </div>

              {/* Turnstile invisible widget */}
              <div ref={turnstileRef} />

              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox" checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-blue"
                />
                <span className="text-xs text-gray/60 leading-relaxed group-hover:text-gray/80 transition-colors">
                  I agree that this data may be stored and processed for the purpose of contacting me. I am aware that I can withdraw my consent at any time.
                </span>
              </label>

              <div className="flex items-center gap-4">
                <Button size="lg" className="font-mono text-xs tracking-wide" disabled={sending}>
                  {sending ? (
                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                  ) : (
                    "Send Inquiry"
                  )}
                </Button>
                <p className="text-[10px] text-gray/40 leading-snug max-w-[200px]">
                  Your inquiry will be handled confidentially by our engineering team.
                </p>
              </div>
            </form>
          </Reveal>

          <Reveal delay={200}>
            <div className="space-y-5 lg:pl-8">
              <div className="bento-card rounded-lg p-6 space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                  <div>
                    <span className="mono-label mb-1 block">Address</span>
                    <p className="text-sm text-gray leading-relaxed">
                      Deepvac GmbH<br />An der Universität 1<br />30823 Garbsen<br />Germany
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                  <div>
                    <span className="mono-label mb-1 block">Phone</span>
                    <a href="tel:+4915783027099" className="text-sm text-gray hover:text-sand transition-colors">+49 157 830 270 99</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                  <div>
                    <span className="mono-label mb-1 block">Email</span>
                    <a href="mailto:info@deepvac.space" className="text-sm text-gray hover:text-sand transition-colors">info@deepvac.space</a>
                  </div>
                </div>
              </div>

              <div className="bento-card rounded-lg overflow-hidden">
                <ConsentMap height="h-44" />
              </div>

              <a href="https://www.linkedin.com/company/deepvac-gmbh/" target="_blank" rel="noopener noreferrer"
                className="bento-card rounded-lg p-4 flex items-center justify-between group block">
                <span className="text-sm text-gray group-hover:text-sand transition-colors">Follow Deepvac</span>
                <span className="text-sm text-blue font-mono">LinkedIn →</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
