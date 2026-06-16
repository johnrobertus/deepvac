import { useState, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { Phone, Mail, MapPin, Shield, Loader2, CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { ConsentMap } from "@/components/ConsentMap";
import { useLanguage } from "@/components/LanguageProvider";

const TURNSTILE_SITE_KEY = "0x4AAAAAACu_Uqbd5b8IkXxU";

function FormField({
  label, placeholder, type = "text", required = false, name, value, onChange, error,
}: {
  label: string; placeholder: string; type?: string; required?: boolean; name: string; value: string; onChange: (val: string) => void; error?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="mono-label text-gray/90">{label}{required && <span className="text-blue ml-1">*</span>}</label>
      <input
        type={type} name={name} required={required} value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full bg-surface border rounded-sm px-4 py-3 text-base text-sand placeholder:text-gray/55 hover:border-gray/50 focus:outline-none focus:bg-surface-raised focus:border-blue/70 focus:ring-2 focus:ring-blue/25 transition-colors duration-200 ${error ? "border-red-400/60" : "border-gray/30"}`}
        placeholder={placeholder} aria-invalid={!!error}
      />
      {error && <p className="text-[13px] text-red-400">{error}</p>}
    </div>
  );
}

function SelectField({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (val: string) => void }) {
  const { t } = useTranslation("contact");
  return (
    <div className="space-y-2">
      <label className="mono-label text-gray/90">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="w-full bg-surface border border-gray/30 rounded-sm px-4 py-3 text-base text-sand hover:border-gray/50 focus:outline-none focus:bg-surface-raised focus:border-blue/70 focus:ring-2 focus:ring-blue/25 transition-colors duration-200 appearance-none">
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

export function ContactSection() {
  const { t } = useTranslation("contact");
  const { t: tc } = useTranslation("common");
  const { t: tHome } = useTranslation("home");
  const { lang } = useLanguage();

  const [consent, setConsent] = useState(false);
  const [form, setForm] = useState<FormData>(initialForm);
  const [interests, setInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [validationErrors, setValidationErrors] = useState<Partial<Record<keyof FormData | "interests", string>>>({});
  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);

  const productInterests = t("interests.products", { returnObjects: true }) as string[];
  const serviceInterests = t("interests.services", { returnObjects: true }) as string[];
  const otherInterests = t("interests.other", { returnObjects: true }) as string[];
  const projectStageOptions = t("projectStageOptions", { returnObjects: true }) as string[];
  const timelineOptionsNew = t("timelineOptionsNew", { returnObjects: true }) as string[];
  const existingSystemOptions = t("existingSystemOptions", { returnObjects: true }) as string[];

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
      if ((window as any).turnstile && turnstileRef.current && !turnstileWidgetId.current) {
        turnstileWidgetId.current = (window as any).turnstile.render(turnstileRef.current, {
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
    if (validationErrors.interests) {
      setValidationErrors((prev) => { const next = { ...prev }; delete next.interests; return next; });
    }
  };

  const validateForm = (): boolean => {
    const errors: Partial<Record<keyof FormData | "interests", string>> = {};
    if (!form.firstName.trim()) errors.firstName = tc("form.validation.firstNameRequired");
    if (!form.lastName.trim()) errors.lastName = tc("form.validation.lastNameRequired");
    if (!form.email.trim()) {
      errors.email = tc("form.validation.emailRequired");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      errors.email = tc("form.validation.emailInvalid");
    }
    if (!form.company.trim()) errors.company = tc("form.validation.companyRequired");
    if (interests.length === 0) errors.interests = t("validationNew.interestRequired");
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
      let turnstileToken = "";
      if ((window as any).turnstile && turnstileWidgetId.current) {
        turnstileToken = (window as any).turnstile.getResponse(turnstileWidgetId.current) || "";
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
          source: "homepage-project-inquiry",
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
        toast.error(tc("form.errors.submissionFailed"));
      }
      if ((window as any).turnstile && turnstileWidgetId.current) { (window as any).turnstile.reset(turnstileWidgetId.current); }
    } finally { setSending(false); }
  };

  if (submitted) {
    return (
      <section id="contact" className="py-20 md:py-28 px-6 bg-surface/30">
        <div className="container-wide">
          <div className="max-w-xl mx-auto text-center space-y-6">
            <CheckCircle className="w-12 h-12 text-blue mx-auto" />
            <h2 className="text-3xl font-medium text-sand tracking-tight">{t("successNew.title")}</h2>
            <p className="text-gray text-sm leading-relaxed">{t("successNew.body")}</p>
            <Button variant="outline" onClick={() => { setSubmitted(false); setForm(initialForm); setInterests([]); setConsent(false); }}>
              {tc("buttons.submitAnotherInquiry")}
            </Button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="contact" className="py-20 md:py-28 px-6 bg-surface/30">
      <div className="container-wide">
        <Reveal>
          <SectionHeader
            eyebrow={tHome("contact.eyebrow")}
            title={tHome("contact.title")}
            description={tHome("contact.description")}
            className="mb-14"
          />
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
          <Reveal delay={100}>
            <div className="space-y-8">
              <div className="space-y-2">
                <h3 className="text-2xl font-medium text-sand tracking-tight">{t("formTitle")}</h3>
                <p className="text-sm text-gray/85 leading-relaxed">{t("formDescription")}</p>
              </div>

              <form className="space-y-7" onSubmit={handleSubmit}>
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
                    <span className="mono-label text-blue">{t("sections.interestTitle")}<span className="text-blue ml-1">*</span></span>
                    <p className="text-[12px] text-gray/70">{t("sections.interestHelper")}</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-5">
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-gray/60 mb-1">{t("sections.interestProducts")}</p>
                      {productInterests.map((label) => (
                        <CheckboxItem key={label} label={label} checked={interests.includes(label)} onChange={() => toggleInterest(label)} />
                      ))}
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-gray/60 mb-1">{t("sections.interestServices")}</p>
                      {serviceInterests.map((label) => (
                        <CheckboxItem key={label} label={label} checked={interests.includes(label)} onChange={() => toggleInterest(label)} />
                      ))}
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-[11px] font-mono uppercase tracking-wider text-gray/60 mb-1">{t("sections.interestOther")}</p>
                      {otherInterests.map((label) => (
                        <CheckboxItem key={label} label={label} checked={interests.includes(label)} onChange={() => toggleInterest(label)} />
                      ))}
                    </div>
                  </div>
                  {validationErrors.interests && <p className="text-[13px] text-red-400">{validationErrors.interests}</p>}
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
                  <label className="mono-label text-gray/90">{t("fields.messageLabel")}<span className="text-blue ml-1">*</span></label>
                  <textarea
                    value={form.message} onChange={(e) => set("message")(e.target.value)}
                    className={`w-full bg-surface border rounded-sm px-4 py-3 text-base text-sand placeholder:text-gray/55 hover:border-gray/50 focus:outline-none focus:bg-surface-raised focus:border-blue/70 focus:ring-2 focus:ring-blue/25 transition-colors duration-200 min-h-[140px] resize-y ${validationErrors.message ? "border-red-400/60" : "border-gray/30"}`}
                    placeholder={t("fields.messagePlaceholder")} aria-invalid={!!validationErrors.message}
                  />
                  {validationErrors.message && <p className="text-[13px] text-red-400">{validationErrors.message}</p>}
                </div>

                <div aria-hidden="true" style={{ position: "absolute", left: "-9999px", top: "-9999px", opacity: 0, height: 0, overflow: "hidden" }}>
                  <label htmlFor="hp-website-home">Website</label>
                  <input type="text" id="hp-website-home" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
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
                  <div className="flex items-start gap-1.5 text-gray/70 max-w-md">
                    <Shield className="w-3 h-3 mt-1 shrink-0" />
                    <span className="text-[11px] font-mono leading-snug">{t("submit.helper")}</span>
                  </div>
                </div>
              </form>
            </div>
          </Reveal>

          <Reveal delay={200}>
            <div className="space-y-5">
              <div className="bento-card rounded-lg p-6 space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                  <div>
                    <span className="mono-label mb-1 block">{tHome("contact.address")}</span>
                    <p className="text-sm text-gray leading-relaxed">Deepvac GmbH<br />An der Universität 1<br />30823 Garbsen<br />Germany</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                  <div>
                    <span className="mono-label mb-1 block">{tHome("contact.phone")}</span>
                    <a href="tel:+4915783027099" className="text-sm text-gray hover:text-sand transition-colors">+49 157 830 270 99</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                  <div>
                    <span className="mono-label mb-1 block">{tHome("contact.email")}</span>
                    <a href="mailto:info@deepvac.space" className="text-sm text-gray hover:text-sand transition-colors">info@deepvac.space</a>
                  </div>
                </div>
              </div>

              <div className="bento-card rounded-lg overflow-hidden">
                <ConsentMap height="h-44" />
              </div>

              <a href="https://www.linkedin.com/company/deepvac-gmbh/" target="_blank" rel="noopener noreferrer"
                className="bento-card rounded-lg p-4 flex items-center justify-between group block">
                <span className="text-sm text-gray group-hover:text-sand transition-colors">{tc("footer.followDeepvac")}</span>
                <span className="text-sm text-blue font-mono">LinkedIn →</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
