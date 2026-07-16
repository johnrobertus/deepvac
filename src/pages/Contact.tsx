import { useState, useRef, useEffect, useId } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, Mail, MapPin, Clock, Shield, ArrowRight, CheckCircle, Loader2, ClipboardList, ClipboardCheck, CalendarClock } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ConsentMap } from "@/components/ConsentMap";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";
import { QuestionnaireCard } from "@/components/questionnaire/QuestionnaireCTA";
import { BookCallDialog } from "@/components/BookCallDialog";

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
  const fieldId = `field-${name}`;
  return (
    <div className="space-y-2">
      <label htmlFor={fieldId} className="mono-label text-gray/90">{label}{required && <span className="text-blue ml-1">*</span>}</label>
      <input
        id={fieldId} type={type} name={name} required={required} value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-surface border rounded-sm px-4 py-3 text-base text-sand placeholder:text-gray/55 hover:border-gray/50 focus:outline-none focus:bg-surface-raised focus:border-blue/70 focus:ring-2 focus:ring-blue/25 transition-colors duration-200 ${error ? "border-red-400/60" : "border-gray/30"}`}
        placeholder={placeholder} aria-invalid={!!error} aria-describedby={error ? `${fieldId}-error` : undefined}
      />
      {error && <p id={`${fieldId}-error`} className="text-[13px] text-red-400">{error}</p>}
    </div>
  );
}

function SelectField({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (val: string) => void }) {
  const { t } = useTranslation("contact");
  const selectId = useId();
  return (
    <div className="space-y-2">
      <label htmlFor={selectId} className="mono-label text-gray/90">{label}</label>
      <select id={selectId} value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-surface border border-gray/30 rounded-sm px-4 py-3 text-base text-sand hover:border-gray/50 focus:outline-none focus:bg-surface-raised focus:border-blue/70 focus:ring-2 focus:ring-blue/25 transition-colors duration-200 appearance-none">
        <option value="" className="bg-surface text-gray">{t("qualifiers.select")}</option>
        {options.map((opt) => <option key={opt} value={opt} className="bg-surface text-sand">{opt}</option>)}
      </select>
    </div>
  );
}

function CheckboxItem({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-start gap-2.5 cursor-pointer group py-1">
      <input
        type="checkbox" checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="mt-0.5 w-[16px] h-[16px] accent-blue rounded-sm border-gray/40 shrink-0"
      />
      <span className="text-[13px] text-gray group-hover:text-sand transition-colors leading-snug">{label}</span>
    </label>
  );
}

interface FormData {
  firstName: string; lastName: string; email: string; phone: string;
  company: string; country: string; projectName: string;
  projectStage: string; timeline: string; existingSystem: string;
  message: string;
}

const initialForm: FormData = {
  firstName: "", lastName: "", email: "", phone: "",
  company: "", country: "", projectName: "",
  projectStage: "", timeline: "", existingSystem: "",
  message: "",
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
  const [interests, setInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const turnstileScriptLoaded = useRef(false);

  const productInterests = t("interests.products", { returnObjects: true }) as string[];
  const serviceInterests = t("interests.services", { returnObjects: true }) as string[];
  const otherInterests = t("interests.other", { returnObjects: true }) as string[];

  const [searchParams] = useSearchParams();
  const [bookCallOpen, setBookCallOpen] = useState(false);

  // Deep links from product/service pages preselect the matching interest
  useEffect(() => {
    const key = searchParams.get("interest");
    if (!key) return;
    const paramToLabel: Record<string, string | undefined> = {
      "standard-series": productInterests[0],
      "custom-tvac": productInterests[1],
      "thermal-vision": productInterests[2],
      testing: serviceInterests[0],
      controls: serviceInterests[1],
      mechanical: serviceInterests[2],
      retrofit: serviceInterests[3],
      maintenance: serviceInterests[4],
      subsystems: serviceInterests[5],
    };
    const label = paramToLabel[key];
    if (label) setInterests((prev) => (prev.includes(label) ? prev : [...prev, label]));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const projectStageOptions = t("projectStageOptions", { returnObjects: true }) as string[];
  const timelineOptionsNew = t("timelineOptionsNew", { returnObjects: true }) as string[];
  const existingSystemOptions = t("existingSystemOptions", { returnObjects: true }) as string[];
  const faqItems = t("faq.items", { returnObjects: true }) as Array<{ q: string; a: string }>;

  const ensureTurnstileScript = () => {
    if (turnstileScriptLoaded.current) return;
    turnstileScriptLoaded.current = true;
    if (!document.getElementById("cf-turnstile-script")) {
      const script = document.createElement("script");
      script.id = "cf-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true; script.defer = true;
      document.head.appendChild(script);
    }
  };

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

  const toggleInterest = (label: string) => {
    setInterests((prev) => prev.includes(label) ? prev.filter((i) => i !== label) : [...prev, label]);
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
    if (form.message.trim().length < 10) errors.message = t("validationNew.messageRequired");
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
      ensureTurnstileScript();
      let turnstileToken = "";
      if (window.turnstile && turnstileWidgetId.current) {
        turnstileToken = window.turnstile.getResponse(turnstileWidgetId.current) || "";
      }
      if (!turnstileToken) {
        const deadline = Date.now() + 5000;
        while (Date.now() < deadline) {
          await new Promise((r) => setTimeout(r, 200));
          if (window.turnstile && turnstileRef.current && !turnstileWidgetId.current) {
            try {
              turnstileWidgetId.current = window.turnstile.render(turnstileRef.current, {
                sitekey: TURNSTILE_SITE_KEY, callback: () => {}, size: "invisible",
              });
            } catch { /* already rendered */ }
          }
          if (window.turnstile && turnstileWidgetId.current) {
            turnstileToken = window.turnstile.getResponse(turnstileWidgetId.current) || "";
            if (turnstileToken) break;
          }
        }
      }
      if (!turnstileToken) {
        if (window.turnstile && turnstileWidgetId.current) { window.turnstile.reset(turnstileWidgetId.current); }
        toast.error(tc("form.errors.submissionFailedDirect"));
        return;
      }
      const { data, error } = await supabase.functions.invoke("send-inquiry", {
        body: {
          firstName: form.firstName, lastName: form.lastName, email: form.email,
          phone: form.phone || undefined, company: form.company,
          country: form.country || undefined,
          project: form.projectName || undefined,
          interests,
          projectStage: form.projectStage || undefined,
          timeline: form.timeline || undefined,
          existingSystem: form.existingSystem || undefined,
          message: form.message,
          source: "contact-page-project-inquiry",
          language: lang,
          _website: honeypot, turnstileToken: turnstileToken || undefined,
        },
      });
      if (error) throw error;
      if (data?.error) {
        const msg = data.error as string;
        if (msg.includes("Message must be") || msg.includes("Missing required") || msg.includes("Invalid email") || msg.includes("area of interest")) {
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
              <h2 className="text-3xl font-medium text-sand tracking-tight">{t("successNew.title")}</h2>
              <p className="text-gray text-sm leading-relaxed">{t("successNew.body")}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
                <Button variant="outline" onClick={() => { setSubmitted(false); setForm(initialForm); setInterests([]); setConsent(false); }}>
                  {tc("buttons.submitAnotherInquiry")}
                </Button>
                <Button asChild variant="ghost">
                  <Link to={localizedPath("/tvac-questionnaire", lang)}>
                    <ClipboardList className="w-4 h-4 mr-2" />
                    {t("decisionHelper.questionnaireCta")}
                  </Link>
                </Button>
              </div>
            </div>
          </Section>
        </PageShell>
      </Layout>
    );
  }

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: (faqItems || []).map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("contact.title")}</title>
        <meta name="description" content={tSeo("contact.description")} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (<link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />))}
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
      </Helmet>
      <PageShell>
        <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
            <div className="space-y-8">
              <div className="space-y-2" id="project-inquiry-form">
                <h2 className="text-2xl font-medium text-sand tracking-tight">{t("formTitle")}</h2>
                <p className="text-body">{t("formDescription")}</p>
              </div>


              <aside
                aria-label={t("prepareCard.title")}
                className="bento-card rounded-lg p-5 sm:p-6 space-y-3 border-blue/20"
              >
                <div className="flex items-start gap-3">
                  <ClipboardCheck className="w-4 h-4 text-blue mt-0.5 shrink-0" aria-hidden="true" />
                  <div className="space-y-1">
                    <p className="mono-label text-blue">{t("prepareCard.title")}</p>
                    <p className="text-[13px] text-gray/85 leading-relaxed">{t("prepareCard.subtitle")}</p>
                  </div>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5 pl-7 list-disc marker:text-blue/60">
                  {(t("prepareCard.items", { returnObjects: true }) as string[]).map((item) => (
                    <li key={item} className="text-[13px] text-gray leading-snug">{item}</li>
                  ))}
                </ul>
              </aside>

              <aside
                aria-label={tc("bookCall.cardTitle")}
                className="bento-card rounded-lg p-5 sm:p-6 space-y-3 border-blue/20"
              >
                <div className="flex items-start gap-3">
                  <CalendarClock className="w-4 h-4 text-blue mt-0.5 shrink-0" aria-hidden="true" />
                  <div className="space-y-1">
                    <p className="mono-label text-blue">{tc("bookCall.cardTitle")}</p>
                    <p className="text-[13px] text-gray/85 leading-relaxed">{tc("bookCall.cardDescription")}</p>
                  </div>
                </div>
                <Button className="w-full" onClick={() => setBookCallOpen(true)}>
                  {tc("bookCall.cardButton")}
                  <CalendarClock className="h-4 w-4 ml-2" aria-hidden="true" />
                </Button>
                <BookCallDialog open={bookCallOpen} onOpenChange={setBookCallOpen} />
              </aside>


              <form className="space-y-7" onSubmit={handleSubmit} onFocusCapture={ensureTurnstileScript} onInputCapture={ensureTurnstileScript}>
                {/* Section 1 — Contact details */}
                <div className="space-y-5">
                  <span className="mono-label text-blue">{t("sections.contact")}</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label={tc("form.firstName")} placeholder={tc("form.placeholders.firstName")} required name="firstName" value={form.firstName} onChange={set("firstName")} error={validationErrors.firstName} />
                    <FormField label={tc("form.lastName")} placeholder={tc("form.placeholders.lastName")} required name="lastName" value={form.lastName} onChange={set("lastName")} error={validationErrors.lastName} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label={tc("form.workEmail")} placeholder={tc("form.placeholders.email")} type="email" required name="email" value={form.email} onChange={set("email")} error={validationErrors.email} />
                    <FormField label={tc("form.company")} placeholder={tc("form.placeholders.company")} required name="company" value={form.company} onChange={set("company")} error={validationErrors.company} />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <FormField label={tc("form.phoneNumber")} placeholder={tc("form.placeholders.phone")} type="tel" name="phone" value={form.phone} onChange={set("phone")} />
                    <FormField label={t("fields.country")} placeholder={t("fields.countryPlaceholder")} name="country" value={form.country} onChange={set("country")} />
                  </div>
                </div>

                {/* Section 2 — Area of interest */}
                <div className="border-t border-gray/20 pt-6 space-y-4">
                  <div className="space-y-1">
                    <span className="mono-label text-blue">{t("sections.interestTitle")}</span>
                    <p className="text-[13px] text-gray">{t("sections.interestHelper")}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                    <div className="space-y-1.5">
                      <p className="text-[13px] font-mono uppercase tracking-wider text-gray/85 mb-1">{t("sections.interestProducts")}</p>
                      {productInterests.map((label) => (
                        <CheckboxItem key={label} label={label} checked={interests.includes(label)} onChange={() => toggleInterest(label)} />
                      ))}
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[13px] font-mono uppercase tracking-wider text-gray/85 mb-1">{t("sections.interestServices")}</p>
                      {serviceInterests.map((label) => (
                        <CheckboxItem key={label} label={label} checked={interests.includes(label)} onChange={() => toggleInterest(label)} />
                      ))}
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[13px] font-mono uppercase tracking-wider text-gray/85 mb-1">{t("sections.interestOther")}</p>
                      {otherInterests.map((label) => (
                        <CheckboxItem key={label} label={label} checked={interests.includes(label)} onChange={() => toggleInterest(label)} />
                      ))}
                    </div>
                  </div>
                </div>


                {/* Section 3 — Project context */}
                <div className="border-t border-gray/20 pt-6 space-y-5">
                  <span className="mono-label text-blue">{t("sections.context")}</span>
                  <FormField label={t("fields.projectName")} placeholder={t("fields.projectNamePlaceholder")} name="projectName" value={form.projectName} onChange={set("projectName")} />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <SelectField label={t("fields.projectStage")} options={projectStageOptions} value={form.projectStage} onChange={set("projectStage")} />
                    <SelectField label={t("fields.timeline")} options={timelineOptionsNew} value={form.timeline} onChange={set("timeline")} />
                    <SelectField label={t("fields.existingSystem")} options={existingSystemOptions} value={form.existingSystem} onChange={set("existingSystem")} />
                  </div>
                </div>

                {/* Message */}
                <div className="border-t border-gray/20 pt-6 space-y-2">
                  <label htmlFor="field-message" className="mono-label text-gray/90">{t("fields.messageLabel")}<span className="text-blue ml-1">*</span></label>
                  <textarea
                    id="field-message"
                    value={form.message} onChange={(e) => set("message")(e.target.value)}
                    className={`w-full bg-surface border rounded-sm px-4 py-3 text-base text-sand placeholder:text-gray/55 hover:border-gray/50 focus:outline-none focus:bg-surface-raised focus:border-blue/70 focus:ring-2 focus:ring-blue/25 transition-colors duration-200 min-h-[140px] resize-y ${validationErrors.message ? "border-red-400/60" : "border-gray/30"}`}
                    placeholder={t("fields.messagePlaceholder")} aria-invalid={!!validationErrors.message}
                  />
                  {validationErrors.message && <p className="text-[13px] text-red-400">{validationErrors.message}</p>}
                </div>

                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
                  <label htmlFor="website">Website</label>
                  <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
                </div>

                <div ref={turnstileRef} />

                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="mt-0.5 w-[18px] h-[18px] accent-blue rounded-sm border-gray/40" />
                  <span className="text-helper group-hover:text-gray transition-colors">{tc("form.consentText")}</span>
                </label>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2">
                  <Button size="lg" className="font-mono text-xs tracking-wide" disabled={sending}>
                    {sending ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {tc("buttons.sending")}</>) : t("submit.button")}
                  </Button>
                  <div className="flex items-start gap-1.5 text-gray max-w-md">
                    <Shield className="w-3 h-3 mt-1 shrink-0" />
                    <span className="text-[13px] font-mono leading-snug">{t("submit.helper")}</span>
                  </div>
                </div>
              </form>

              <QuestionnaireCard />
            </div>


            <div className="space-y-6">
              <div className="bento-card rounded-lg p-6 space-y-6">
                <h3 className="text-base font-medium text-sand">{t("contactDetails")}</h3>
                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                    <div>
                      <span className="mono-label mb-1 block">{t("address")}</span>
                      <p className="text-body">Deepvac GmbH<br />An der Universität 1<br />30823 Garbsen<br />Germany</p>
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
                      <p className="text-card-meta">{t("responseTimeValue")}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bento-card rounded-lg overflow-hidden">
                <ConsentMap height="h-48" />
              </div>

              <div className="bento-card rounded-lg p-4 flex items-center justify-between">
                <span className="text-sm text-gray">{t("followDeepvac")}</span>
                <a href="https://www.linkedin.com/company/deepvac-gmbh/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-sm text-blue hover:text-blue-light transition-colors font-mono">
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
              <AccordionItem key={i} value={`faq-${i}`} className="border-gray/22">
                <AccordionTrigger className="text-sand text-sm font-medium text-left hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-gray/90 text-sm leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>
      </PageShell>
    </Layout>
  );
};

export default Contact;
