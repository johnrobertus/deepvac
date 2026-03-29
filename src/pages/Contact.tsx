import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, Mail, MapPin, Clock, Shield, ArrowRight, CheckCircle, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ConsentMap } from "@/components/ConsentMap";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";

declare global {
  interface Window {
    turnstile?: {
      render: (el: HTMLElement, opts: any) => string;
      getResponse: (id: string) => string | undefined;
      reset: (id: string) => void;
    };
  }
}

function FormField({
  label, placeholder, type = "text", required = false, name, value, onChange, error,
}: {
  label: string; placeholder: string; type?: string; required?: boolean; name: string; value: string; onChange: (val: string) => void; error?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="mono-label">{label}{required && <span className="text-blue ml-1">*</span>}</label>
      <input
        type={type} name={name} required={required} value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-background border rounded-sm px-4 py-3 text-sm text-sand placeholder:text-gray/30 focus:outline-none focus:border-blue/40 focus:ring-1 focus:ring-blue/20 transition-all duration-200 ${error ? "border-red-400/60" : "border-gray/15"}`}
        placeholder={placeholder} aria-invalid={!!error}
      />
      {error && <p className="text-xs text-red-400">{error}</p>}
    </div>
  );
}

function SelectField({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (val: string) => void }) {
  const { t } = useTranslation("contact");
  return (
    <div className="space-y-2">
      <label className="mono-label">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-background border border-gray/15 rounded-sm px-4 py-3 text-sm text-sand focus:outline-none focus:border-blue/40 focus:ring-1 focus:ring-blue/20 transition-all duration-200 appearance-none">
        <option value="" className="bg-surface text-gray">{t("qualifiers.select")}</option>
        {options.map((opt) => <option key={opt} value={opt} className="bg-surface text-sand">{opt}</option>)}
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
  const { t } = useTranslation("contact");
  const { t: tSeo } = useTranslation("seo");
  const { t: tc } = useTranslation("common");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  const chamberOptions = t("qualifiers.chamberOptions", { returnObjects: true }) as string[];
  const applicationOptions = t("qualifiers.applicationOptions", { returnObjects: true }) as string[];
  const timelineOptions = t("qualifiers.timelineOptions", { returnObjects: true }) as string[];
  const faqItems = t("faq.items", { returnObjects: true }) as Array<{ q: string; a: string }>;

  useEffect(() => {
    if (!document.getElementById("cf-turnstile-script")) {
      const script = document.createElement("script");
      script.id = "cf-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true; script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (!turnstileRef.current) return;
    const interval = setInterval(() => {
      if (window.turnstile && turnstileRef.current && !turnstileWidgetId.current) {
        turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY, callback: () => {}, size: "invisible",
        });
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [submitted]);

  const set = (field: keyof FormData) => (val: string) => {
    setForm((prev) => ({ ...prev, [field]: val }));
    if (validationErrors[field]) {
      setValidationErrors((prev) => { const next = { ...prev }; delete next[field]; return next; });
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof FormData, string>> = {};
    if (!form.firstName.trim()) errors.firstName = tc("form.validation.firstNameRequired");
    if (!form.lastName.trim()) errors.lastName = tc("form.validation.lastNameRequired");
    if (!form.email.trim()) {
      errors.email = tc("form.validation.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      errors.email = tc("form.validation.emailInvalid");
    }
    if (!form.company.trim()) errors.company = tc("form.validation.companyRequired");
    if (form.message.trim().length > 0 && form.message.trim().length < 10) {
      errors.message = tc("form.validation.messageMinLength");
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) { toast.error(tc("form.validation.consentRequired")); return; }
    if (!validateForm()) return;
    if (sending) return;

    setSending(true);
    try {
      let turnstileToken = "";
      if (window.turnstile && turnstileWidgetId.current) {
        turnstileToken = window.turnstile.getResponse(turnstileWidgetId.current) || "";
      }
      const { data, error } = await supabase.functions.invoke("send-inquiry", {
        body: {
          firstName: form.firstName, lastName: form.lastName, email: form.email,
          phone: form.phone || undefined, company: form.company,
          project: form.project || undefined, chamberType: form.chamberType || undefined,
          applicationArea: form.applicationArea || undefined, timeline: form.timeline || undefined,
          message: form.message || undefined, source: "contact-page",
          _website: honeypot, turnstileToken: turnstileToken || undefined,
        },
      });
      if (error) throw error;
      if (data?.error) {
        const msg = data.error as string;
        if (msg.includes("Message must be") || msg.includes("Missing required") || msg.includes("Invalid email")) {
          toast.error(msg);
        } else { throw new Error(msg); }
        return;
      }
      setSubmitted(true); setValidationErrors({});
      turnstileWidgetId.current = null;
      toast.success(tc("form.success.toast"));
    } catch (err: any) {
      console.error("Submission error:", err);
      if (err?.message?.includes("Too many requests")) {
        toast.error(tc("form.errors.tooManyRequests"));
      } else {
        toast.error(tc("form.errors.submissionFailedDirect"));
      }
      if (window.turnstile && turnstileWidgetId.current) { window.turnstile.reset(turnstileWidgetId.current); }
    } finally { setSending(false); }
  };

  if (submitted) {
    return (
      <Layout>
        <Helmet><html lang={lang} /><title>{tSeo("contact.title")}</title></Helmet>
        <PageShell>
          <Section>
            <div className="max-w-xl mx-auto text-center space-y-6 py-20">
              <CheckCircle className="w-12 h-12 text-blue mx-auto" />
              <h2 className="text-3xl font-medium text-sand tracking-tight">{tc("form.success.titleInquiry")}</h2>
              <p className="text-gray text-sm leading-relaxed">{tc("form.success.messagePage")}</p>
              <Button variant="outline" onClick={() => { setSubmitted(false); setForm(initialForm); setConsent(false); }}>
                {tc("buttons.submitAnotherInquiry")}
              </Button>
            </div>
          </Section>
        </PageShell>
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("contact.title")}</title>
        <meta name="description" content={tSeo("contact.description")} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (<link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />))}
      </Helmet>
      <PageShell>
        <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-medium text-sand tracking-tight">{t("formTitle")}</h2>
                <p className="text-sm text-gray">{t("formDescription")}</p>
              </div>

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField label={tc("form.firstName")} placeholder={tc("form.placeholders.firstName")} required name="firstName" value={form.firstName} onChange={set("firstName")} error={validationErrors.firstName} />
                  <FormField label={tc("form.lastName")} placeholder={tc("form.placeholders.lastName")} required name="lastName" value={form.lastName} onChange={set("lastName")} error={validationErrors.lastName} />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField label={tc("form.workEmail")} placeholder={tc("form.placeholders.email")} type="email" required name="email" value={form.email} onChange={set("email")} error={validationErrors.email} />
                  <FormField label={tc("form.phoneNumber")} placeholder={tc("form.placeholders.phone")} type="tel" name="phone" value={form.phone} onChange={set("phone")} />
                </div>
                <FormField label={tc("form.company")} placeholder={tc("form.placeholders.company")} required name="company" value={form.company} onChange={set("company")} error={validationErrors.company} />
                <FormField label={tc("form.projectApplication")} placeholder={tc("form.placeholders.project")} name="project" value={form.project} onChange={set("project")} />

                <div className="border-t border-gray/10 pt-5 space-y-5">
                  <span className="mono-label text-blue">{t("qualifiers.eyebrow")}</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <SelectField label={t("qualifiers.chamberType")} options={chamberOptions} value={form.chamberType} onChange={set("chamberType")} />
                    <SelectField label={t("qualifiers.applicationArea")} options={applicationOptions} value={form.applicationArea} onChange={set("applicationArea")} />
                    <SelectField label={t("qualifiers.timeline")} options={timelineOptions} value={form.timeline} onChange={set("timeline")} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="mono-label">{tc("form.message")}</label>
                  <textarea
                    value={form.message} onChange={(e) => set("message")(e.target.value)}
                    className={`w-full bg-background border rounded-sm px-4 py-3 text-sm text-sand placeholder:text-gray/30 focus:outline-none focus:border-blue/40 focus:ring-1 focus:ring-blue/20 transition-all duration-200 min-h-[120px] resize-y ${validationErrors.message ? "border-red-400/60" : "border-gray/15"}`}
                    placeholder={tc("form.placeholders.messageDetailed")} aria-invalid={!!validationErrors.message}
                  />
                  {validationErrors.message && <p className="text-xs text-red-400">{validationErrors.message}</p>}
                </div>

                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
                  <label htmlFor="website">Website</label>
                  <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                </div>

                <div ref={turnstileRef} />

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 w-4 h-4 accent-blue rounded-sm border-gray/30" />
                  <span className="text-xs text-gray/60 leading-relaxed group-hover:text-gray/80 transition-colors">{tc("form.consentText")}</span>
                </label>

                <div className="flex items-center gap-4 pt-2">
                  <Button size="lg" className="font-mono text-xs tracking-wide" disabled={sending}>
                    {sending ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {tc("buttons.sending")}</>) : tc("buttons.sendInquiry")}
                  </Button>
                  <div className="flex items-center gap-1.5 text-gray/40">
                    <Shield className="w-3 h-3" />
                    <span className="text-[10px] font-mono leading-snug">{tc("form.confidentialNote")}</span>
                  </div>
                </div>
              </form>
            </div>

            <div className="space-y-6">
              <div className="bento-card rounded-lg p-6 space-y-6">
                <h3 className="text-base font-medium text-sand">{t("contactDetails")}</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                    <div>
                      <span className="mono-label mb-1 block">{t("address")}</span>
                      <p className="text-sm text-gray leading-relaxed">Deepvac GmbH<br />An der Universität 1<br />30823 Garbsen<br />Germany</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                    <div>
                      <span className="mono-label mb-1 block">{t("phone")}</span>
                      <a href="tel:+4915783027099" className="text-sm text-gray hover:text-sand transition-colors">+49 157 830 270 99</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                    <div>
                      <span className="mono-label mb-1 block">{t("email")}</span>
                      <a href="mailto:info@deepvac.space" className="text-sm text-gray hover:text-sand transition-colors">info@deepvac.space</a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                    <div>
                      <span className="mono-label mb-1 block">{t("responseTime")}</span>
                      <p className="text-xs text-gray">{t("responseTimeValue")}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bento-card rounded-lg overflow-hidden">
                <ConsentMap height="h-48" />
              </div>

              <div className="bento-card rounded-lg p-4 flex items-center justify-between">
                <span className="text-sm text-gray">{t("followDeepvac")}</span>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-blue hover:text-blue-light transition-colors font-mono">
                  LinkedIn <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </Section>

        <Section className="bg-surface/30">
          <SectionHeader eyebrow={t("faq.eyebrow")} title={t("faq.title")} className="mb-10" />
          <Accordion type="single" collapsible className="max-w-3xl">
            {faqItems.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-gray/15">
                <AccordionTrigger className="text-sand text-sm text-left hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-gray text-sm leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>

        <CTABand title={t("cta.title")} description={t("cta.description")}>
          <Button asChild size="lg"><a href="tel:+4915783027099">Call +49 157 830 270 99</a></Button>
          <Button asChild variant="outline" size="lg"><a href="mailto:info@deepvac.space">Email info@deepvac.space</a></Button>
        </CTABand>
      </PageShell>
    </Layout>
  );
};

export default Contact;
