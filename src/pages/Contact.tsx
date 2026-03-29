import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, Mail, MapPin, Clock, Shield, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ConsentMap } from "@/components/ConsentMap";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: any) => string;
      getResponse: (id: string) => string | undefined;
      reset: (id: string) => void;
    };
  }
}

const qualifierOptions = {
  chamberType: ["Standard T Series", "Standard C Series", "Custom TVAC", "Not sure yet"],
  applicationArea: ["Satellite / Spacecraft", "Payload / Component", "Research / Laboratory", "Industrial / Process", "Other"],
  timeline: ["Immediate (< 3 months)", "Near-term (3–6 months)", "Planning phase (6–12 months)", "Exploratory"],
};

const faqs = [
  { q: "What information should I prepare before contacting Deepvac?", a: "A productive initial conversation typically covers: test article dimensions and mass, required pressure and temperature ranges, thermal cycling requirements, feedthrough and instrumentation needs, facility constraints, and project timeline. Deepvac can guide this requirements definition process if needed." },
  { q: "What is the typical response time?", a: "Deepvac aims to respond to technical inquiries within two business days. Complex configuration requests may require additional time for initial technical assessment." },
  { q: "Can Deepvac support projects outside Germany?", a: "Yes. Deepvac provides engineering, delivery, installation, and commissioning services internationally. Project logistics are discussed during the initial consultation." },
  { q: "Is there a minimum project size?", a: "Deepvac serves projects ranging from standard chamber deliveries to complex custom system developments. Contact us to discuss your specific requirements and scope." },
];

function FormField({
  label, placeholder, type = "text", required = false, name, value, onChange,
}: {
  label: string; placeholder: string; type?: string; required?: boolean; name: string; value: string; onChange: (val: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="mono-label">
        {label}
        {required && <span className="text-blue ml-1">*</span>}
      </label>
      <input
        type={type} name={name} required={required} value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-gray/15 rounded-sm px-4 py-3 text-sm text-sand placeholder:text-gray/30 focus:outline-none focus:border-blue/40 focus:ring-1 focus:ring-blue/20 transition-all duration-200"
        placeholder={placeholder}
      />
    </div>
  );
}

function SelectField({
  label, options, value, onChange,
}: {
  label: string; options: string[]; value: string; onChange: (val: string) => void;
}) {
  return (
    <div className="space-y-2">
      <label className="mono-label">{label}</label>
      <select
        value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-background border border-gray/15 rounded-sm px-4 py-3 text-sm text-sand focus:outline-none focus:border-blue/40 focus:ring-1 focus:ring-blue/20 transition-all duration-200 appearance-none"
      >
        <option value="" className="bg-surface text-gray">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-surface text-sand">{opt}</option>
        ))}
      </select>
    </div>
  );
}

interface FormData {
  firstName: string; lastName: string; email: string; phone: string;
  company: string; project: string; chamberType: string;
  applicationArea: string; timeline: string; message: string;
}

const initialForm: FormData = {
  firstName: "", lastName: "", email: "", phone: "",
  company: "", project: "", chamberType: "", applicationArea: "",
  timeline: "", message: "",
};

const TURNSTILE_SITE_KEY = "0x4AAAAAACu_Uqbd5b8IkXxU";

const Contact = () => {
  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  useEffect(() => {
    // Load Turnstile script
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
      if (window.turnstile && turnstileRef.current && !turnstileWidgetId.current) {
        turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY,
          callback: () => {},
          size: "invisible",
        });
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [submitted]);

  const set = (field: keyof FormData) => (val: string) =>
    setForm((prev) => ({ ...prev, [field]: val }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!consent) {
      toast.error("Please accept the data processing consent to proceed.");
      return;
    }
    if (sending) return;

    setSending(true);
    try {
      // Get Turnstile token
      let turnstileToken = "";
      if (window.turnstile && turnstileWidgetId.current) {
        turnstileToken = window.turnstile.getResponse(turnstileWidgetId.current) || "";
      }

      const { data, error } = await supabase.functions.invoke("send-inquiry", {
        body: {
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          phone: form.phone || undefined,
          company: form.company,
          project: form.project || undefined,
          chamberType: form.chamberType || undefined,
          applicationArea: form.applicationArea || undefined,
          timeline: form.timeline || undefined,
          message: form.message || undefined,
          source: "contact-page",
          _website: honeypot,
          turnstileToken: turnstileToken || undefined,
        },
      });

      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      setSubmitted(true);
      turnstileWidgetId.current = null;
      toast.success("Your inquiry has been sent successfully.");
    } catch (err: any) {
      console.error("Submission error:", err);
      if (err?.message?.includes("Too many requests")) {
        toast.error("Too many submissions. Please try again later.");
      } else {
        toast.error("Submission failed. Please try again later or contact us directly at info@deepvac.space.");
      }
      // Reset Turnstile for retry
      if (window.turnstile && turnstileWidgetId.current) {
        window.turnstile.reset(turnstileWidgetId.current);
      }
    } finally {
      setSending(false);
    }
  };

  if (submitted) {
    return (
      <Layout>
        <PageShell>
          <Section>
            <div className="max-w-xl mx-auto text-center space-y-6 py-20">
              <CheckCircle className="w-12 h-12 text-blue mx-auto" />
              <h2 className="text-3xl font-medium text-sand tracking-tight">
                Thank You for Your Inquiry
              </h2>
              <p className="text-gray text-sm leading-relaxed">
                Your message has been received. Our engineering team typically responds within two business days.
              </p>
              <Button
                variant="outline"
                onClick={() => { setSubmitted(false); setForm(initialForm); setConsent(false); }}
              >
                Submit Another Inquiry
              </Button>
            </div>
          </Section>
        </PageShell>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageShell>
        <PageHero
          eyebrow="Contact"
          title="Discuss Your Thermal Vacuum Requirements"
          description="Whether you need a chamber platform, a custom TVAC configuration, or engineering support for modernization and integration — our team is ready to discuss your project."
        />

        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-medium text-sand tracking-tight">Engineering Inquiry</h2>
                <p className="text-sm text-gray">Provide your project context and we'll follow up with relevant technical information.</p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField label="First Name" placeholder="First name" required name="firstName" value={form.firstName} onChange={set("firstName")} />
                  <FormField label="Last Name" placeholder="Last name" required name="lastName" value={form.lastName} onChange={set("lastName")} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField label="Work Email" placeholder="your@company.com" type="email" required name="email" value={form.email} onChange={set("email")} />
                  <FormField label="Phone Number" placeholder="+49 ..." type="tel" name="phone" value={form.phone} onChange={set("phone")} />
                </div>
                <FormField label="Company" placeholder="Company name" required name="company" value={form.company} onChange={set("company")} />
                <FormField label="Project / Application" placeholder="e.g. Satellite qualification chamber, custom TVAC system, retrofit project" name="project" value={form.project} onChange={set("project")} />

                <div className="border-t border-gray/10 pt-5 space-y-5">
                  <span className="mono-label text-blue">Optional — Help Us Prepare</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <SelectField label="Chamber Type" options={qualifierOptions.chamberType} value={form.chamberType} onChange={set("chamberType")} />
                    <SelectField label="Application Area" options={qualifierOptions.applicationArea} value={form.applicationArea} onChange={set("applicationArea")} />
                    <SelectField label="Timeline" options={qualifierOptions.timeline} value={form.timeline} onChange={set("timeline")} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="mono-label">Message</label>
                  <textarea
                    value={form.message}
                    onChange={(e) => set("message")(e.target.value)}
                    className="w-full bg-background border border-gray/15 rounded-sm px-4 py-3 text-sm text-sand placeholder:text-gray/30 focus:outline-none focus:border-blue/40 focus:ring-1 focus:ring-blue/20 transition-all duration-200 min-h-[120px] resize-y"
                    placeholder="Describe your test requirements, chamber specifications, or integration needs..."
                  />
                </div>

                {/* Honeypot - invisible to users */}
                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
                  <label htmlFor="website">Website</label>
                  <input
                    type="text" id="website" name="website" tabIndex={-1} autoComplete="off"
                    value={honeypot} onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>

                {/* Turnstile invisible widget */}
                <div ref={turnstileRef} />

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox" checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-blue rounded-sm border-gray/30"
                  />
                  <span className="text-xs text-gray/60 leading-relaxed group-hover:text-gray/80 transition-colors">
                    I agree that this data may be stored and processed for the purpose of contacting me. I am aware that I can withdraw my consent at any time.
                  </span>
                </label>

                <div className="flex items-center gap-4 pt-2">
                  <Button size="lg" className="font-mono text-xs tracking-wide" disabled={sending}>
                    {sending ? (
                      <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> Sending...</>
                    ) : (
                      "Send Inquiry"
                    )}
                  </Button>
                  <div className="flex items-center gap-1.5 text-gray/40">
                    <Shield className="w-3 h-3" />
                    <span className="text-[10px] font-mono leading-snug">Your inquiry will be handled confidentially by our engineering team.</span>
                  </div>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bento-card rounded-lg p-6 space-y-6">
                <h3 className="text-base font-medium text-sand">Contact Details</h3>
                <div className="space-y-5">
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
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                    <div>
                      <span className="mono-label mb-1 block">Response Time</span>
                      <p className="text-xs text-gray">Typically within 2 business days</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bento-card rounded-lg overflow-hidden">
                <ConsentMap height="h-48" />
              </div>

              <div className="bento-card rounded-lg p-4 flex items-center justify-between">
                <span className="text-sm text-gray">Follow Deepvac</span>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-blue hover:text-blue-light transition-colors font-mono">
                  LinkedIn <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </Section>

        <Section className="bg-surface/30">
          <SectionHeader eyebrow="FAQ" title="Contact & Project Questions" className="mb-10" />
          <Accordion type="single" collapsible className="max-w-3xl">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-gray/15">
                <AccordionTrigger className="text-sand text-sm text-left hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-gray text-sm leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>

        <CTABand
          title="Prefer a Direct Conversation?"
          description="Call or email our engineering team to discuss your thermal vacuum test requirements."
        >
          <Button asChild size="lg">
            <a href="tel:+4915783027099">Call +49 157 830 270 99</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="mailto:info@deepvac.space">Email info@deepvac.space</a>
          </Button>
        </CTABand>
      </PageShell>
    </Layout>
  );
};

export default Contact;
