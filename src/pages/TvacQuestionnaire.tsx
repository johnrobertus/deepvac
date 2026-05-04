import { useState, useMemo, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ArrowLeft, ArrowRight, Send, RotateCcw, Clock, Info, FileDown, Loader2, CheckCircle, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";
import { cn } from "@/lib/utils";
import { QuestionnairePrintView } from "@/components/questionnaire/QuestionnairePrintView";

const TURNSTILE_SITE_KEY = "0x4AAAAAACu_Uqbd5b8IkXxU";

/* ---------- Dynamic logic constants (verbatim from Q11-5.html) ---------- */
const thermalPlateDimensionsByShape: Record<string, string[]> = {
  cubic: ["380 × 350", "480 × 450", "610 × 580", "780 × 750", "980 × 940", "1120 × 1120"],
  cylindrical: ["330 × 350", "400 × 420", "460 × 500", "660 × 700", "840 × 880", "1140 × 1200"],
};

/* ---------- Reusable input class strings (questionnaire-local) ----------
   Tuned for readability on the dark Deepvac CI:
   - raised surface bg vs page background
   - clearly visible default border + hover state
   - stronger blue focus ring
   - readable placeholder + base text size                                  */
const baseInput =
  "w-full bg-surface border border-gray/30 rounded-sm px-4 py-3 text-base text-sand placeholder:text-gray/55 hover:border-gray/50 focus:outline-none focus:border-blue/70 focus:bg-surface-raised focus:ring-2 focus:ring-blue/25 disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200";
const baseSelect = `${baseInput} appearance-none pr-10`;
const baseTextarea = `${baseInput} min-h-[120px] leading-relaxed resize-y`;
const errorBorder = "border-red-400/70";

/* Inline sub-label (lower-case helper labels above inputs) */
const subLabel = "text-[13px] font-medium text-gray/85";

/* ---------- Form state shape ---------- */
interface OtherCheck {
  checked: boolean;
  text: string;
}
interface PortRow {
  checked: boolean;
  size: string;
  qty: string;
}
interface FormState {
  // S1 - contact
  company: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;
  countrySpecify: string;
  application: string;
  applicationSpecify: string;
  // S2 - DUT
  dutWeight: string;
  dutTypes: boolean[];
  dutTypeOther: OtherCheck;
  housing: boolean[];
  housingOther: OtherCheck;
  // S2 - Chamber
  chamberShape: "" | "cubic" | "cylindrical";
  chamberMaterial: string;
  internalVolume: string;
  internalW: string;
  internalH: string;
  internalL: string;
  doorTypes: boolean[];
  ports: PortRow[]; // 5 rows
  viewportsQty: string;
  viewportsSize: string;
  viewportsMaterial: boolean[];
  viewportsMaterialOther: OtherCheck;
  // S3 - Thermal/Vacuum
  heatDissipation: string;
  dutCount: string;
  vacuumLevel: string;
  highVac: boolean[];
  highVacNested: boolean[];
  foreVac: boolean[];
  gauges: boolean[];
  rampRate: string;
  rampRateSpecify: string;
  uniformity: string;
  uniformitySpecify: string;
  tempMin: string;
  tempMax: string;
  plateDimensions: string;
  plateCustom: string;
  plateTempMin: string;
  plateTempMax: string;
  plateCooling: boolean[];
  plateCoolingOther: OtherCheck;
  shroudConfig: string;
  shroudConfigSpecify: string;
  shroudTempMin: string;
  shroudTempMax: string;
  shroudCooling: boolean[];
  shroudCoolingOther: OtherCheck;
  sensorTypes: boolean[];
  sensorTypeOther: OtherCheck;
  measurementChannels: string;
  measurementChannelsSpecify: string;
  // S4 - Feedthroughs
  elecQty: string;
  elecVoltage: string;
  elecCurrent: string;
  elecNotes: string;
  elecConnector: boolean[];
  elecConnectorOther: OtherCheck;
  rfTypes: boolean[];
  rfTypeOther: OtherCheck;
  rfQty: string;
  fiberTypes: boolean[];
  fiberTypeOther: OtherCheck;
  fiberQty: string;
  fluidQty: string;
  fluidConnection: string;
  motionTypes: boolean[];
  motionTypeOther: OtherCheck;
  motionQty: string;
  // S4 - Control
  remoteAccess: string;
  remoteOptions: boolean[];
  ai: string;
  comm: boolean[];
  commOther: OtherCheck;
  loggingCustom: boolean;
  loggingNotes: string;
  exportFormats: boolean[];
  // S4 - Safety
  alarms: boolean[];
  // S5 - Site
  installStandard: boolean;
  installCleanroom: OtherCheck;
  installOther: OtherCheck;
  installSpace: string;
  power: boolean[];
  powerOther: OtherCheck;
  powerMax: string;
  utilities: boolean[];
  specialReq: string;
  // S5 - Schedule
  delivery: string;
  budget: string;
  phase: string;
  // Consent
  consent: boolean;
}

const arr = (n: number) => Array(n).fill(false);
const o = (): OtherCheck => ({ checked: false, text: "" });
const port = (): PortRow => ({ checked: false, size: "", qty: "" });

const initialForm: FormState = {
  company: "", firstName: "", lastName: "", email: "", phone: "",
  country: "", countrySpecify: "",
  application: "", applicationSpecify: "",
  dutWeight: "",
  dutTypes: arr(12), dutTypeOther: o(),
  housing: arr(9), housingOther: o(),
  chamberShape: "", chamberMaterial: "",
  internalVolume: "", internalW: "", internalH: "", internalL: "",
  doorTypes: arr(3),
  ports: [port(), port(), port(), port(), port()],
  viewportsQty: "", viewportsSize: "", viewportsMaterial: arr(4), viewportsMaterialOther: o(),
  heatDissipation: "", dutCount: "", vacuumLevel: "",
  highVac: arr(2), highVacNested: arr(2),
  foreVac: arr(4), gauges: arr(3),
  rampRate: "", rampRateSpecify: "",
  uniformity: "", uniformitySpecify: "",
  tempMin: "", tempMax: "",
  plateDimensions: "", plateCustom: "", plateTempMin: "", plateTempMax: "",
  plateCooling: arr(3), plateCoolingOther: o(),
  shroudConfig: "", shroudConfigSpecify: "",
  shroudTempMin: "", shroudTempMax: "",
  shroudCooling: arr(5), shroudCoolingOther: o(),
  sensorTypes: arr(6), sensorTypeOther: o(),
  measurementChannels: "", measurementChannelsSpecify: "",
  elecQty: "", elecVoltage: "", elecCurrent: "", elecNotes: "",
  elecConnector: arr(4), elecConnectorOther: o(),
  rfTypes: arr(4), rfTypeOther: o(), rfQty: "",
  fiberTypes: arr(3), fiberTypeOther: o(), fiberQty: "",
  fluidQty: "", fluidConnection: "",
  motionTypes: arr(3), motionTypeOther: o(), motionQty: "",
  remoteAccess: "", remoteOptions: arr(3), ai: "",
  comm: arr(7), commOther: o(),
  loggingCustom: false, loggingNotes: "",
  exportFormats: arr(5),
  alarms: arr(6),
  installStandard: false, installCleanroom: o(), installOther: o(),
  installSpace: "",
  power: arr(2), powerOther: o(), powerMax: "",
  utilities: arr(5),
  specialReq: "",
  delivery: "", budget: "", phase: "",
  consent: false,
};

/* ---------- Small UI primitives ---------- */
function MonoLabel({ children, required }: { children: React.ReactNode; required?: boolean }) {
  return (
    <label className="block font-mono text-[11px] uppercase tracking-[0.08em] text-gray/90">
      {children}
      {required && <span className="text-blue ml-1 text-sm align-middle" aria-hidden="true">*</span>}
      {required && <span className="sr-only"> (required)</span>}
    </label>
  );
}

function CheckItem({
  label, checked, onChange, nested,
}: { label: React.ReactNode; checked: boolean; onChange: (v: boolean) => void; nested?: boolean }) {
  return (
    <label className={cn("flex items-center gap-2.5 cursor-pointer text-sm text-sand hover:text-sand py-1 transition-colors", nested && "ml-6")}>
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="w-[18px] h-[18px] accent-blue rounded-sm border-gray/40 shrink-0 cursor-pointer"
      />
      <span className="leading-snug">{label}</span>
    </label>
  );
}

function OtherInput({
  value, onCheck, onText, placeholder,
}: { value: OtherCheck; onCheck: (v: boolean) => void; onText: (v: string) => void; placeholder: string }) {
  const { t } = useTranslation("questionnaire");
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <CheckItem label={t("common.other") + ":"} checked={value.checked} onChange={onCheck} />
      <input
        type="text"
        value={value.text}
        onChange={(e) => onText(e.target.value)}
        className={cn(baseInput, "flex-1 min-w-[180px] py-2 text-sm")}
        placeholder={placeholder}
      />
    </div>
  );
}

function FieldGroup({ children, cols = 1 }: { children: React.ReactNode; cols?: 1 | 2 | 3 | 4 }) {
  const grid = { 1: "grid-cols-1", 2: "grid-cols-1 md:grid-cols-2", 3: "grid-cols-1 md:grid-cols-3", 4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4" }[cols];
  return <div className={cn("grid gap-5 md:gap-6", grid)}>{children}</div>;
}

function SubSectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg md:text-xl font-medium text-sand tracking-tight border-b border-gray/25 pb-3 mb-6">{children}</h3>;
}

/** Returns true when a select value is an "other"/"custom" placeholder requiring free-text. */
const isOtherValue = (v: string): boolean => {
  if (!v) return false;
  const s = v.toLowerCase();
  return (
    s === "other" ||
    s === "custom" ||
    s.startsWith("other ") ||
    s.startsWith("other/") ||
    s.startsWith("sonstiges") ||
    s.startsWith("benutzerdefiniert")
  );
};

/** Merge a select value with its specify text for submission/print rendering. */
const mergeOther = (value: string, specify: string): string => {
  if (!value) return value;
  const text = (specify || "").trim();
  if (!isOtherValue(value) || !text) return value;
  return `${value}: ${text}`;
};

/* ---------- The page ---------- */
export default function TvacQuestionnaire() {
  const { t } = useTranslation("questionnaire");
  const { t: tSeo } = useTranslation("seo");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  const [form, setForm] = useState<FormState>(initialForm);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sending, setSending] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [honeypot, setHoneypot] = useState("");
  const totalSteps = 5;

  const turnstileRef = useRef<HTMLDivElement>(null);
  const turnstileWidgetId = useRef<string | null>(null);
  const stepHeadingRef = useRef<HTMLDivElement>(null);

  // Load Turnstile script
  useEffect(() => {
    if (!document.getElementById("cf-turnstile-script")) {
      const script = document.createElement("script");
      script.id = "cf-turnstile-script";
      script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
      script.async = true; script.defer = true;
      document.head.appendChild(script);
    }
  }, []);

  // Mount invisible Turnstile widget once container exists (re-mount if user resets after success)
  useEffect(() => {
    if (submitted) return;
    if (!turnstileRef.current) return;
    const interval = setInterval(() => {
      const w = (window as any).turnstile;
      if (w && turnstileRef.current && !turnstileWidgetId.current) {
        turnstileWidgetId.current = w.render(turnstileRef.current, {
          sitekey: TURNSTILE_SITE_KEY, callback: () => {}, size: "invisible",
        });
        clearInterval(interval);
      }
    }, 200);
    return () => clearInterval(interval);
  }, [submitted]);

  // A11y: move focus to step heading on step change
  useEffect(() => {
    if (stepHeadingRef.current) stepHeadingRef.current.focus();
  }, [step]);

  const set = <K extends keyof FormState>(key: K) => (val: FormState[K]) => {
    setForm((p) => ({ ...p, [key]: val }));
    if (errors[key]) {
      setErrors((p) => {
        const n = { ...p };
        delete n[key];
        return n;
      });
    }
  };
  const toggleAt = <K extends keyof FormState>(key: K, idx: number) => {
    setForm((p) => {
      const arrCopy = [...(p[key] as unknown as boolean[])];
      arrCopy[idx] = !arrCopy[idx];
      return { ...p, [key]: arrCopy as unknown as FormState[K] };
    });
  };
  const setOther = <K extends keyof FormState>(key: K) => ({
    onCheck: (v: boolean) => setForm((p) => ({ ...p, [key]: { ...(p[key] as unknown as OtherCheck), checked: v } })),
    onText: (v: string) => setForm((p) => ({ ...p, [key]: { ...(p[key] as unknown as OtherCheck), text: v } })),
  });

  /* ----- Dynamic logic: chamber shape ----- */
  const plateOptions = useMemo<string[]>(
    () => (form.chamberShape ? thermalPlateDimensionsByShape[form.chamberShape] : []),
    [form.chamberShape]
  );

  useEffect(() => {
    if (!form.chamberShape) {
      if (form.plateDimensions) setForm((p) => ({ ...p, plateDimensions: "" }));
      return;
    }
    const validPlate = ["", "Other", ...plateOptions];
    setForm((p) => ({
      ...p,
      plateDimensions: validPlate.includes(p.plateDimensions) ? p.plateDimensions : "",
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.chamberShape]);

  /* ----- Validation ----- */
  const validateRequired = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {};
    if (!form.company.trim()) e.company = "required";
    if (!form.firstName.trim()) e.firstName = "required";
    if (!form.lastName.trim()) e.lastName = "required";
    if (!form.email.trim()) {
      e.email = "required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      e.email = "invalid";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /** Form variant where "Other"/"Custom" select values are merged with their free-text specify input. */
  const effectiveForm = useMemo<FormState>(() => ({
    ...form,
    country: mergeOther(form.country, form.countrySpecify),
    application: mergeOther(form.application, form.applicationSpecify),
    rampRate: mergeOther(form.rampRate, form.rampRateSpecify),
    uniformity: mergeOther(form.uniformity, form.uniformitySpecify),
    shroudConfig: mergeOther(form.shroudConfig, form.shroudConfigSpecify),
    measurementChannels: mergeOther(form.measurementChannels, form.measurementChannelsSpecify),
  }), [form]);

  const goNext = () => setStep((s) => Math.min(totalSteps, s + 1));
  const goBack = () => setStep((s) => Math.max(1, s - 1));

  const handlePrint = () => {
    // Slight delay so React commits the print view DOM before the dialog opens
    setTimeout(() => window.print(), 50);
  };

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault();
    if (sending) return;
    if (!form.consent) {
      toast.error(t("wizard.consentRequired"));
      return;
    }
    if (!validateRequired()) {
      setStep(1);
      toast.error(t("wizard.missingRequired"));
      return;
    }

    setSending(true);
    setSubmissionError(null);
    try {
      let turnstileToken = "";
      const w = (window as any).turnstile;
      if (w && turnstileWidgetId.current) {
        turnstileToken = w.getResponse(turnstileWidgetId.current) || "";
      }
      const { data, error } = await supabase.functions.invoke("send-inquiry", {
        body: {
          kind: "questionnaire",
          source: "tvac-questionnaire",
          language: lang,
          data: effectiveForm,
          _website: honeypot,
          turnstileToken: turnstileToken || undefined,
        },
      });
      if (error) throw error;
      if (data?.error) {
        const msg = data.error as string;
        if (msg.includes("Too many requests")) {
          setSubmissionError(t("error.tooManyRequests"));
          toast.error(t("error.tooManyRequests"));
          return;
        }
        throw new Error(msg);
      }
      setSubmitted(true);
      turnstileWidgetId.current = null;
      toast.success(t("success.title"));
    } catch (err: any) {
      console.error("Questionnaire submission error:", err);
      const msg = err?.message?.includes("Too many requests")
        ? t("error.tooManyRequests")
        : t("error.message");
      setSubmissionError(msg);
      toast.error(t("error.title"));
      const w = (window as any).turnstile;
      if (w && turnstileWidgetId.current) { w.reset(turnstileWidgetId.current); }
    } finally {
      setSending(false);
    }
  };

  const handleReset = () => {
    setForm(initialForm);
    setErrors({});
    setStep(1);
    setSubmissionError(null);
  };

  // Prevent Enter from advancing/submitting except inside textareas.
  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    const target = e.target as HTMLElement;
    if (e.key === "Enter" && target.tagName !== "TEXTAREA") {
      e.preventDefault();
    }
  };

  /* ---------- Step renderers ---------- */
  const StepNote = () => (
    <p className="flex items-start gap-2.5 text-sm text-gray/85 mb-7">
      <Info className="w-4 h-4 mt-0.5 shrink-0 text-blue/80" />
      <span className="leading-relaxed">{t("wizard.leaveBlankNote")}</span>
    </p>
  );

  const renderStep1 = () => {
    const apps = t("s1.applicationOptions", { returnObjects: true }) as string[];
    const countries = t("s1.countries", { returnObjects: true }) as string[];
    return (
      <div className="space-y-8">
        <SubSectionTitle>{t("stepTitles.s1")}</SubSectionTitle>
        <StepNote />
        <FieldGroup cols={2}>
          <div className="space-y-2">
            <MonoLabel required>{t("s1.company")}</MonoLabel>
            <input className={cn(baseInput, errors.company && errorBorder)} placeholder={t("s1.companyPh")} value={form.company} onChange={(e) => set("company")(e.target.value)} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <MonoLabel required>{t("s1.firstName")}</MonoLabel>
              <input className={cn(baseInput, errors.firstName && errorBorder)} placeholder={t("s1.firstNamePh")} value={form.firstName} onChange={(e) => set("firstName")(e.target.value)} />
            </div>
            <div className="space-y-2">
              <MonoLabel required>{t("s1.lastName")}</MonoLabel>
              <input className={cn(baseInput, errors.lastName && errorBorder)} placeholder={t("s1.lastNamePh")} value={form.lastName} onChange={(e) => set("lastName")(e.target.value)} />
            </div>
          </div>
        </FieldGroup>
        <FieldGroup cols={2}>
          <div className="space-y-2">
            <MonoLabel required>{t("s1.email")}</MonoLabel>
            <input type="email" className={cn(baseInput, errors.email && errorBorder)} placeholder={t("s1.emailPh")} value={form.email} onChange={(e) => set("email")(e.target.value)} />
          </div>
          <div className="space-y-2">
            <MonoLabel>{t("s1.phone")}</MonoLabel>
            <input type="tel" className={baseInput} placeholder={t("s1.phonePh")} value={form.phone} onChange={(e) => set("phone")(e.target.value)} />
          </div>
        </FieldGroup>
        <FieldGroup cols={2}>
          <div className="space-y-2">
            <MonoLabel>{t("s1.country")}</MonoLabel>
            <select className={baseSelect} value={form.country} onChange={(e) => set("country")(e.target.value)}>
              <option value="">{t("common.selectCountry")}</option>
              {countries.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {isOtherValue(form.country) && (
              <input className={baseInput} placeholder={t("common.specify")} value={form.countrySpecify} onChange={(e) => set("countrySpecify")(e.target.value)} />
            )}
          </div>
          <div className="space-y-2">
            <MonoLabel>{t("s1.application")}</MonoLabel>
            <select className={baseSelect} value={form.application} onChange={(e) => set("application")(e.target.value)}>
              <option value="">{t("common.selectOption")}</option>
              {apps.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            {isOtherValue(form.application) && (
              <input className={baseInput} placeholder={t("common.specify")} value={form.applicationSpecify} onChange={(e) => set("applicationSpecify")(e.target.value)} />
            )}
          </div>
        </FieldGroup>
      </div>
    );
  };

  const renderStep2 = () => {
    const dutOpts = t("s2.dutTypeOptions", { returnObjects: true }) as string[];
    const housingOpts = t("s2.housingOptions", { returnObjects: true }) as string[];
    const shapeOpts = t("s2.shapeOptions", { returnObjects: true }) as { cubic: string; cylindrical: string };
    const matOpts = t("s2.chamberMaterialOptions", { returnObjects: true }) as string[];
    const doorOpts = t("s2.doorOptions", { returnObjects: true }) as string[];
    const portRows = t("s2.portRows", { returnObjects: true }) as { label: string; ph: string }[];
    const vqOpts = t("s2.viewportsQtyOptions", { returnObjects: true }) as string[];
    const vmOpts = t("s2.viewportsMaterialOptions", { returnObjects: true }) as string[];

    return (
      <div className="space-y-10">
        <div>
          <SubSectionTitle>{t("s2.mounting")}</SubSectionTitle>
          <StepNote />
          <div className="space-y-6">
            <div className="space-y-2 max-w-md">
              <MonoLabel>{t("s2.weight")}</MonoLabel>
              <input inputMode="decimal" className={baseInput} placeholder={t("s2.weightPh")} value={form.dutWeight} onChange={(e) => set("dutWeight")(e.target.value)} />
            </div>
            <div className="space-y-3">
              <MonoLabel>{t("s2.dutType")}</MonoLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {dutOpts.map((o, i) => (
                  <CheckItem key={o} label={o} checked={form.dutTypes[i]} onChange={() => toggleAt("dutTypes", i)} />
                ))}
                <OtherInput value={form.dutTypeOther} {...setOther("dutTypeOther")} placeholder={t("common.specify")} />
              </div>
            </div>
            <div className="space-y-3">
              <MonoLabel>{t("s2.housing")}</MonoLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {housingOpts.map((o, i) => (
                  <CheckItem key={o} label={o} checked={form.housing[i]} onChange={() => toggleAt("housing", i)} />
                ))}
                <OtherInput value={form.housingOther} {...setOther("housingOther")} placeholder={t("common.specify")} />
              </div>
            </div>
          </div>
        </div>

        <div>
          <SubSectionTitle>{t("s2.chamber")}</SubSectionTitle>
          <div className="space-y-6">
            <FieldGroup cols={2}>
              <div className="space-y-2">
                <MonoLabel>{t("s2.shape")}</MonoLabel>
                <select className={baseSelect} value={form.chamberShape} onChange={(e) => set("chamberShape")(e.target.value as FormState["chamberShape"])}>
                  <option value="">{t("common.selectShape")}</option>
                  <option value="cubic">{shapeOpts.cubic}</option>
                  <option value="cylindrical">{shapeOpts.cylindrical}</option>
                </select>
              </div>
              <div className="space-y-2">
                <MonoLabel>{t("s2.chamberMaterial")}</MonoLabel>
                <select className={baseSelect} value={form.chamberMaterial} onChange={(e) => set("chamberMaterial")(e.target.value)}>
                  <option value="">{t("common.selectMaterial")}</option>
                  {matOpts.map((m) => <option key={m} value={m}>{m}</option>)}
                </select>
              </div>
            </FieldGroup>

            <div className="space-y-2">
              <MonoLabel>{t("s2.internalVolume")}</MonoLabel>
              <input
                className={baseInput}
                placeholder={t("s2.internalVolumePh")}
                inputMode="decimal"
                value={form.internalVolume}
                onChange={(e) => set("internalVolume")(e.target.value)}
              />
            </div>

            {form.chamberShape === "cylindrical" ? (
              <div className="space-y-2">
                <MonoLabel>{t("s2.internalDimensionsCyl")}</MonoLabel>
                <FieldGroup cols={2}>
                  <div className="space-y-2"><MonoLabel>{t("common.length")}</MonoLabel><input className={baseInput} placeholder="L" inputMode="decimal" value={form.internalL} onChange={(e) => set("internalL")(e.target.value)} /></div>
                  <div className="space-y-2"><MonoLabel>{t("common.diameter")}</MonoLabel><input className={baseInput} placeholder="D" inputMode="decimal" value={form.internalW} onChange={(e) => { set("internalW")(e.target.value); set("internalH")(""); }} /></div>
                </FieldGroup>
              </div>
            ) : (
              <div className="space-y-2">
                <MonoLabel>{t("s2.internalDimensions")}</MonoLabel>
                <FieldGroup cols={3}>
                  <div className="space-y-2"><MonoLabel>{t("common.width")}</MonoLabel><input className={baseInput} placeholder="W" inputMode="decimal" value={form.internalW} onChange={(e) => set("internalW")(e.target.value)} /></div>
                  <div className="space-y-2"><MonoLabel>{t("common.height")}</MonoLabel><input className={baseInput} placeholder="H" inputMode="decimal" value={form.internalH} onChange={(e) => set("internalH")(e.target.value)} /></div>
                  <div className="space-y-2"><MonoLabel>{t("common.length")}</MonoLabel><input className={baseInput} placeholder="L" inputMode="decimal" value={form.internalL} onChange={(e) => set("internalL")(e.target.value)} /></div>
                </FieldGroup>
              </div>
            )}

            <FieldGroup cols={2}>
              <div className="space-y-3">
                <MonoLabel>{t("s2.doorType")}</MonoLabel>
                <div className="flex flex-col gap-2">
                  {doorOpts.map((d, i) => (
                    <CheckItem key={d} label={d} checked={form.doorTypes[i]} onChange={() => toggleAt("doorTypes", i)} />
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <MonoLabel>{t("s2.ports")}</MonoLabel>
                <div className="space-y-3">
                  {portRows.map((row, i) => (
                    <div key={row.label} className="grid grid-cols-1 sm:grid-cols-[1.1fr_1.3fr_0.7fr] gap-2 items-center">
                      <CheckItem
                        label={row.label}
                        checked={form.ports[i].checked}
                        onChange={(v) => setForm((p) => { const n = [...p.ports]; n[i] = { ...n[i], checked: v }; return { ...p, ports: n }; })}
                      />
                      <input className={cn(baseInput, "py-2")} placeholder={row.ph} value={form.ports[i].size} onChange={(e) => setForm((p) => { const n = [...p.ports]; n[i] = { ...n[i], size: e.target.value }; return { ...p, ports: n }; })} />
                      <input className={cn(baseInput, "py-2")} type="number" placeholder={t("common.qty")} value={form.ports[i].qty} onChange={(e) => setForm((p) => { const n = [...p.ports]; n[i] = { ...n[i], qty: e.target.value }; return { ...p, ports: n }; })} />
                    </div>
                  ))}
                </div>
              </div>
            </FieldGroup>

            <FieldGroup cols={3}>
              <div className="space-y-2">
                <MonoLabel>{t("s2.viewportsQty")}</MonoLabel>
                <select className={baseSelect} value={form.viewportsQty} onChange={(e) => set("viewportsQty")(e.target.value)}>
                  <option value="">{t("common.selectQuantity")}</option>
                  {vqOpts.map((q) => <option key={q} value={q}>{q}</option>)}
                </select>
              </div>
              <div className="space-y-2">
                <MonoLabel>{t("s2.viewportsSize")}</MonoLabel>
                <input className={baseInput} placeholder={t("s2.viewportsSizePh")} value={form.viewportsSize} onChange={(e) => set("viewportsSize")(e.target.value)} />
              </div>
              <div className="space-y-3">
                <MonoLabel>{t("s2.viewportsMaterial")}</MonoLabel>
                <div className="flex flex-col gap-2">
                  {vmOpts.map((m, i) => (
                    <CheckItem key={m} label={m} checked={form.viewportsMaterial[i]} onChange={() => toggleAt("viewportsMaterial", i)} />
                  ))}
                  <OtherInput value={form.viewportsMaterialOther} {...setOther("viewportsMaterialOther")} placeholder={t("common.specify")} />
                </div>
              </div>
            </FieldGroup>
          </div>
        </div>
      </div>
    );
  };

  const renderStep3 = () => {
    const vacOpts = t("s3.vacuumOptions", { returnObjects: true }) as string[];
    const hvOpts = t("s3.highVacOptions", { returnObjects: true }) as string[];
    const hvNested = t("s3.highVacNested", { returnObjects: true }) as string[];
    const fvOpts = t("s3.foreVacOptions", { returnObjects: true }) as string[];
    const gOpts = t("s3.gaugeOptions", { returnObjects: true }) as string[];
    const rampOpts = t("s3.rampOptions", { returnObjects: true }) as string[];
    const uniOpts = t("s3.uniformityOptions", { returnObjects: true }) as string[];
    const plateCoolOpts = t("s3.plateCoolingOptions", { returnObjects: true }) as string[];
    const shroudCfg = t("s3.shroudConfigOptions", { returnObjects: true }) as string[];
    const shroudCool = t("s3.shroudCoolingOptions", { returnObjects: true }) as string[];
    const sensorOpts = t("s3.sensorOptions", { returnObjects: true }) as string[];
    const chOpts = t("s3.channelOptions", { returnObjects: true }) as string[];

    return (
      <div className="space-y-8">
        <SubSectionTitle>{t("s3.title")}</SubSectionTitle>
        <StepNote />

        <FieldGroup cols={3}>
          <div className="space-y-2"><MonoLabel>{t("s3.heat")}</MonoLabel><input inputMode="decimal" className={baseInput} placeholder={t("s3.heatPh")} value={form.heatDissipation} onChange={(e) => set("heatDissipation")(e.target.value)} /></div>
          <div className="space-y-2"><MonoLabel>{t("s3.dutCount")}</MonoLabel><input type="number" min={1} className={baseInput} placeholder={t("s3.dutCountPh")} value={form.dutCount} onChange={(e) => set("dutCount")(e.target.value)} /></div>
          <div className="space-y-2">
            <MonoLabel>{t("s3.vacuum")}</MonoLabel>
            <select className={baseSelect} value={form.vacuumLevel} onChange={(e) => set("vacuumLevel")(e.target.value)}>
              <option value="">{t("common.selectVacuum")}</option>
              {vacOpts.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
          </div>
        </FieldGroup>

        <FieldGroup cols={2}>
          <div className="space-y-3">
            <MonoLabel>{t("s3.highVacPump")}</MonoLabel>
            <div className="flex flex-col gap-2">
              {hvOpts.map((o, i) => <CheckItem key={o} label={o} checked={form.highVac[i]} onChange={() => toggleAt("highVac", i)} />)}
              {hvNested.map((o, i) => <CheckItem key={o} label={o} checked={form.highVacNested[i]} onChange={() => toggleAt("highVacNested", i)} nested />)}
            </div>
          </div>
          <div className="space-y-3">
            <MonoLabel>{t("s3.foreVacPump")}</MonoLabel>
            <div className="flex flex-col gap-2">
              {fvOpts.map((o, i) => <CheckItem key={o} label={o} checked={form.foreVac[i]} onChange={() => toggleAt("foreVac", i)} />)}
            </div>
          </div>
        </FieldGroup>

        <FieldGroup cols={3}>
          <div className="space-y-3">
            <MonoLabel>{t("s3.gauges")}</MonoLabel>
            <div className="flex flex-col gap-2">{gOpts.map((o, i) => <CheckItem key={o} label={o} checked={form.gauges[i]} onChange={() => toggleAt("gauges", i)} />)}</div>
          </div>
          <div className="space-y-2">
            <MonoLabel>{t("s3.ramp")}</MonoLabel>
            <select className={baseSelect} value={form.rampRate} onChange={(e) => set("rampRate")(e.target.value)}>
              <option value="">{t("common.selectRate")}</option>{rampOpts.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            {isOtherValue(form.rampRate) && (
              <input className={baseInput} placeholder={t("common.specify")} value={form.rampRateSpecify} onChange={(e) => set("rampRateSpecify")(e.target.value)} />
            )}
          </div>
          <div className="space-y-2">
            <MonoLabel>{t("s3.uniformity")}</MonoLabel>
            <select className={baseSelect} value={form.uniformity} onChange={(e) => set("uniformity")(e.target.value)}>
              <option value="">{t("common.selectValue")}</option>{uniOpts.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            {isOtherValue(form.uniformity) && (
              <input className={baseInput} placeholder={t("common.specify")} value={form.uniformitySpecify} onChange={(e) => set("uniformitySpecify")(e.target.value)} />
            )}
          </div>
        </FieldGroup>

        <div className="space-y-2">
          <MonoLabel>{t("s3.tempRange")}</MonoLabel>
          <FieldGroup cols={2}>
            <div className="space-y-1"><label className="text-[13px] text-gray/85">{t("common.min")}</label><input className={baseInput} placeholder={t("s3.tempMinPh")} value={form.tempMin} onChange={(e) => set("tempMin")(e.target.value)} /></div>
            <div className="space-y-1"><label className="text-[13px] text-gray/85">{t("common.max")}</label><input className={baseInput} placeholder={t("s3.tempMaxPh")} value={form.tempMax} onChange={(e) => set("tempMax")(e.target.value)} /></div>
          </FieldGroup>
        </div>

        <FieldGroup cols={2}>
          <div className="space-y-3">
            <MonoLabel>{t("s3.thermalPlate")}</MonoLabel>
            <div className="space-y-2">
              <label className="text-[13px] text-gray/85">{t("s3.plateDims")}</label>
              <select className={cn(baseSelect, !form.chamberShape && "opacity-60 cursor-not-allowed")} disabled={!form.chamberShape} value={form.plateDimensions} onChange={(e) => set("plateDimensions")(e.target.value)}>
                <option value="">{form.chamberShape ? t("common.selectSize") : t("common.selectOption")}</option>
                {plateOptions.map((o) => <option key={o} value={o}>{o}</option>)}
                {form.chamberShape && <option value="Other">{t("common.other")}</option>}
              </select>
            </div>
            <p className="text-[13px] text-gray/75">{t("s3.plateNote")}</p>
            {form.plateDimensions === "Other" && (
              <input className={baseInput} placeholder={t("s3.plateCustomPh")} value={form.plateCustom} onChange={(e) => set("plateCustom")(e.target.value)} />
            )}
            <FieldGroup cols={2}>
              <div className="space-y-1"><label className="text-[13px] text-gray/85">{t("s3.plateTempMin")}</label><input type="number" className={baseInput} placeholder="min. °C" value={form.plateTempMin} onChange={(e) => set("plateTempMin")(e.target.value)} /></div>
              <div className="space-y-1"><label className="text-[13px] text-gray/85">{t("s3.plateTempMax")}</label><input type="number" className={baseInput} placeholder="max. °C" value={form.plateTempMax} onChange={(e) => set("plateTempMax")(e.target.value)} /></div>
            </FieldGroup>
            <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-blue">{t("s3.plateCooling")}</span>
            <div className="flex flex-col gap-2">
              {plateCoolOpts.map((o, i) => <CheckItem key={o} label={o} checked={form.plateCooling[i]} onChange={() => toggleAt("plateCooling", i)} />)}
              <OtherInput value={form.plateCoolingOther} {...setOther("plateCoolingOther")} placeholder={t("common.specify")} />
            </div>
          </div>
          <div className="space-y-3">
            <MonoLabel>{t("s3.shroud")}</MonoLabel>
            <div className="space-y-2">
              <label className="text-[13px] text-gray/85">{t("s3.shroudConfig")}</label>
              <select className={baseSelect} value={form.shroudConfig} onChange={(e) => set("shroudConfig")(e.target.value)}>
                <option value="">{t("common.selectOption")}</option>
                <option value="Yes">{t("s4.yesNo.0", "Yes")}</option>
                <option value="No">{t("s4.yesNo.1", "No")}</option>
              </select>
            </div>
            <FieldGroup cols={2}>
              <div className="space-y-1"><label className="text-[13px] text-gray/85">{t("s3.plateTempMin")}</label><input type="number" className={baseInput} placeholder="min. °C" value={form.shroudTempMin} onChange={(e) => set("shroudTempMin")(e.target.value)} /></div>
              <div className="space-y-1"><label className="text-[13px] text-gray/85">{t("s3.plateTempMax")}</label><input type="number" className={baseInput} placeholder="max. °C" value={form.shroudTempMax} onChange={(e) => set("shroudTempMax")(e.target.value)} /></div>
            </FieldGroup>
            <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-blue">{t("s3.shroudCooling")}</span>
            <div className="flex flex-col gap-2">
              {shroudCool.map((o, i) => <CheckItem key={o} label={o} checked={form.shroudCooling[i]} onChange={() => toggleAt("shroudCooling", i)} />)}
              <OtherInput value={form.shroudCoolingOther} {...setOther("shroudCoolingOther")} placeholder={t("common.specify")} />
            </div>
          </div>
        </FieldGroup>

        <FieldGroup cols={2}>
          <div className="space-y-3">
            <MonoLabel>{t("s3.sensor")}</MonoLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {sensorOpts.map((o, i) => <CheckItem key={o} label={o} checked={form.sensorTypes[i]} onChange={() => toggleAt("sensorTypes", i)} />)}
              <OtherInput value={form.sensorTypeOther} {...setOther("sensorTypeOther")} placeholder={t("common.specify")} />
            </div>
          </div>
          <div className="space-y-2">
            <MonoLabel>{t("s3.channels")}</MonoLabel>
            <select className={baseSelect} value={form.measurementChannels} onChange={(e) => set("measurementChannels")(e.target.value)}>
              <option value="">{t("common.selectRange")}</option>{chOpts.map((o) => <option key={o} value={o}>{o}</option>)}
            </select>
            {isOtherValue(form.measurementChannels) && (
              <input className={baseInput} placeholder={t("common.specify")} value={form.measurementChannelsSpecify} onChange={(e) => set("measurementChannelsSpecify")(e.target.value)} />
            )}
          </div>
        </FieldGroup>
      </div>
    );
  };

  const renderStep4 = () => {
    const elecConn = t("s4.elecConnectorOptions", { returnObjects: true }) as string[];
    const rfOpts = t("s4.rfOptions", { returnObjects: true }) as string[];
    const fiberOpts = t("s4.fiberOptions", { returnObjects: true }) as string[];
    const motionOpts = t("s4.motionOptions", { returnObjects: true }) as string[];
    const yesNo = t("s4.yesNo", { returnObjects: true }) as string[];
    const remoteOpts = t("s4.remoteOptions", { returnObjects: true }) as string[];
    const aiOpts = t("s4.aiOptions", { returnObjects: true }) as string[];
    const commOpts = t("s4.commOptions", { returnObjects: true }) as string[];
    const exportOpts = t("s4.exportOptions", { returnObjects: true }) as string[];
    const alarmOpts = t("s4.alarmOptions", { returnObjects: true }) as string[];

    return (
      <div className="space-y-10">
        <div>
          <SubSectionTitle>{t("s4.feedthroughs")}</SubSectionTitle>
          <StepNote />
          <div className="space-y-6">
            <div className="space-y-3">
              <MonoLabel>{t("s4.elec")}</MonoLabel>
              <FieldGroup cols={4}>
                <div className="space-y-1"><label className="text-[13px] text-gray/85">{t("common.quantity")}</label><input type="number" className={baseInput} placeholder={t("common.qty")} value={form.elecQty} onChange={(e) => set("elecQty")(e.target.value)} /></div>
                <div className="space-y-1"><label className="text-[13px] text-gray/85">{t("s4.elecVoltage")}</label><input className={baseInput} placeholder="V" value={form.elecVoltage} onChange={(e) => set("elecVoltage")(e.target.value)} /></div>
                <div className="space-y-1"><label className="text-[13px] text-gray/85">{t("s4.elecCurrent")}</label><input className={baseInput} placeholder="A" value={form.elecCurrent} onChange={(e) => set("elecCurrent")(e.target.value)} /></div>
                <div className="space-y-1"><label className="text-[13px] text-gray/85">{t("s4.elecNotes")}</label><input className={baseInput} placeholder={t("s4.elecNotesPh")} value={form.elecNotes} onChange={(e) => set("elecNotes")(e.target.value)} /></div>
              </FieldGroup>
              <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-blue">{t("s4.elecConnector")}</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {elecConn.map((o, i) => <CheckItem key={o} label={o} checked={form.elecConnector[i]} onChange={() => toggleAt("elecConnector", i)} />)}
                <OtherInput value={form.elecConnectorOther} {...setOther("elecConnectorOther")} placeholder={t("common.specify")} />
              </div>
            </div>

            <FieldGroup cols={2}>
              <div className="space-y-3">
                <MonoLabel>{t("s4.rf")}</MonoLabel>
                <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-blue">{t("common.type")}</span>
                <div className="grid grid-cols-2 gap-2">{rfOpts.map((o, i) => <CheckItem key={o} label={o} checked={form.rfTypes[i]} onChange={() => toggleAt("rfTypes", i)} />)}</div>
                <OtherInput value={form.rfTypeOther} {...setOther("rfTypeOther")} placeholder={t("common.specify")} />
                <div className="space-y-1"><label className="text-[13px] text-gray/85">{t("common.quantity")}</label><input className={baseInput} placeholder={t("common.qty")} value={form.rfQty} onChange={(e) => set("rfQty")(e.target.value)} /></div>
              </div>
              <div className="space-y-3">
                <MonoLabel>{t("s4.fiber")}</MonoLabel>
                <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-blue">{t("common.type")}</span>
                <div className="grid grid-cols-2 gap-2">{fiberOpts.map((o, i) => <CheckItem key={o} label={o} checked={form.fiberTypes[i]} onChange={() => toggleAt("fiberTypes", i)} />)}</div>
                <OtherInput value={form.fiberTypeOther} {...setOther("fiberTypeOther")} placeholder={t("common.specify")} />
                <div className="space-y-1"><label className="text-[13px] text-gray/85">{t("common.quantity")}</label><input className={baseInput} placeholder={t("common.qty")} value={form.fiberQty} onChange={(e) => set("fiberQty")(e.target.value)} /></div>
              </div>
            </FieldGroup>

            <FieldGroup cols={2}>
              <div className="space-y-3">
                <MonoLabel>{t("s4.fluid")}</MonoLabel>
                <FieldGroup cols={2}>
                  <div className="space-y-1"><label className="text-[13px] text-gray/85">{t("common.quantity")}</label><input className={baseInput} placeholder={t("common.qty")} value={form.fluidQty} onChange={(e) => set("fluidQty")(e.target.value)} /></div>
                  <div className="space-y-1"><label className="text-[13px] text-gray/85">{t("s4.fluidConn")}</label><input className={baseInput} placeholder={t("s4.fluidConnPh")} value={form.fluidConnection} onChange={(e) => set("fluidConnection")(e.target.value)} /></div>
                </FieldGroup>
              </div>
              <div className="space-y-3">
                <MonoLabel>{t("s4.motion")}</MonoLabel>
                <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-blue">{t("common.type")}</span>
                <div className="grid grid-cols-2 gap-2">{motionOpts.map((o, i) => <CheckItem key={o} label={o} checked={form.motionTypes[i]} onChange={() => toggleAt("motionTypes", i)} />)}</div>
                <OtherInput value={form.motionTypeOther} {...setOther("motionTypeOther")} placeholder={t("common.specify")} />
                <div className="space-y-1"><label className="text-[13px] text-gray/85">{t("common.quantity")}</label><input className={baseInput} placeholder={t("common.qty")} value={form.motionQty} onChange={(e) => set("motionQty")(e.target.value)} /></div>
              </div>
            </FieldGroup>
          </div>
        </div>

        <div>
          <SubSectionTitle>{t("s4.control")}</SubSectionTitle>
          <div className="space-y-6">
            <FieldGroup cols={2}>
              <div className="space-y-3">
                <MonoLabel>{t("s4.remote")}</MonoLabel>
                <select className={baseSelect} value={form.remoteAccess} onChange={(e) => set("remoteAccess")(e.target.value)}>
                  <option value="">{t("common.selectOption")}</option>{yesNo.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
                <span className="block font-mono text-[11px] uppercase tracking-[0.08em] text-blue">{t("s4.remoteAccess")}</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">{remoteOpts.map((o, i) => <CheckItem key={o} label={o} checked={form.remoteOptions[i]} onChange={() => toggleAt("remoteOptions", i)} />)}</div>
              </div>
              <div className="space-y-2">
                <MonoLabel>{t("s4.ai")}</MonoLabel>
                <select className={baseSelect} value={form.ai} onChange={(e) => set("ai")(e.target.value)}>
                  <option value="">{t("common.selectOption")}</option>{aiOpts.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              </div>
            </FieldGroup>
            <div className="space-y-3">
              <MonoLabel>{t("s4.comm")}</MonoLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {commOpts.map((o, i) => <CheckItem key={o} label={o} checked={form.comm[i]} onChange={() => toggleAt("comm", i)} />)}
                <OtherInput value={form.commOther} {...setOther("commOther")} placeholder={t("common.specify")} />
              </div>
            </div>
            <FieldGroup cols={2}>
              <div className="space-y-3">
                <MonoLabel>{t("s4.logging")}</MonoLabel>
                <CheckItem label={t("s4.loggingCustom")} checked={form.loggingCustom} onChange={(v) => set("loggingCustom")(v)} />
                <input className={baseInput} placeholder={t("s4.loggingNotesPh")} value={form.loggingNotes} onChange={(e) => set("loggingNotes")(e.target.value)} />
              </div>
              <div className="space-y-3">
                <MonoLabel>{t("s4.export")}</MonoLabel>
                <div className="grid grid-cols-2 gap-2">{exportOpts.map((o, i) => <CheckItem key={o} label={o} checked={form.exportFormats[i]} onChange={() => toggleAt("exportFormats", i)} />)}</div>
              </div>
            </FieldGroup>
          </div>
        </div>

        <div>
          <SubSectionTitle>{t("s4.safety")}</SubSectionTitle>
          <div className="space-y-3">
            <MonoLabel>{t("s4.alarm")}</MonoLabel>
            <div className="flex flex-col gap-2">{alarmOpts.map((o, i) => <CheckItem key={o} label={o} checked={form.alarms[i]} onChange={() => toggleAt("alarms", i)} />)}</div>
          </div>
        </div>
      </div>
    );
  };

  const renderStep5 = () => {
    const powerOpts = t("s5.powerOptions", { returnObjects: true }) as string[];
    const utilOpts = t("s5.utilitiesOptions", { returnObjects: true }) as string[];
    const delivOpts = t("s5.deliveryOptions", { returnObjects: true }) as string[];
    const budgetOpts = t("s5.budgetOptions", { returnObjects: true }) as string[];
    const phaseOpts = t("s5.phaseOptions", { returnObjects: true }) as string[];

    return (
      <div className="space-y-10">
        <div>
          <SubSectionTitle>{t("s5.additional")}</SubSectionTitle>
          <StepNote />
          <div className="space-y-6">
            <div className="space-y-3">
              <MonoLabel>{t("s5.installEnv")}</MonoLabel>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <CheckItem label={t("s5.installStandard")} checked={form.installStandard} onChange={(v) => set("installStandard")(v)} />
                <div className="flex items-center gap-2 flex-wrap">
                  <CheckItem label={t("s5.installCleanroom")} checked={form.installCleanroom.checked} onChange={setOther("installCleanroom").onCheck} />
                  <input className={cn(baseInput, "flex-1 min-w-[140px] py-2")} placeholder={t("s5.installCleanroomPh")} value={form.installCleanroom.text} onChange={(e) => setOther("installCleanroom").onText(e.target.value)} />
                </div>
                <OtherInput value={form.installOther} {...setOther("installOther")} placeholder={t("common.specify")} />
              </div>
            </div>
            <div className="space-y-2">
              <MonoLabel>{t("s5.installSpace")}</MonoLabel>
              <textarea className={baseTextarea} placeholder={t("s5.installSpacePh")} value={form.installSpace} onChange={(e) => set("installSpace")(e.target.value)} />
            </div>
            <FieldGroup cols={2}>
              <div className="space-y-3">
                <MonoLabel>{t("s5.power")}</MonoLabel>
                <div className="flex flex-col gap-2">
                  {powerOpts.map((o, i) => <CheckItem key={o} label={o} checked={form.power[i]} onChange={() => toggleAt("power", i)} />)}
                  <OtherInput value={form.powerOther} {...setOther("powerOther")} placeholder={t("common.specify")} />
                </div>
                <input type="number" className={baseInput} placeholder={t("s5.powerMaxPh")} value={form.powerMax} onChange={(e) => set("powerMax")(e.target.value)} />
              </div>
              <div className="space-y-3">
                <MonoLabel>{t("s5.utilities")}</MonoLabel>
                <div className="flex flex-col gap-2">{utilOpts.map((o, i) => <CheckItem key={o} label={o} checked={form.utilities[i]} onChange={() => toggleAt("utilities", i)} />)}</div>
              </div>
            </FieldGroup>
            <div className="space-y-2">
              <MonoLabel>{t("s5.specialReq")}</MonoLabel>
              <textarea className={baseTextarea} placeholder={t("s5.specialReqPh")} value={form.specialReq} onChange={(e) => set("specialReq")(e.target.value)} />
            </div>
          </div>
        </div>

        <div>
          <SubSectionTitle>{t("s5.schedule")}</SubSectionTitle>
          <FieldGroup cols={3}>
            <div className="space-y-2">
              <MonoLabel>{t("s5.delivery")}</MonoLabel>
              <select className={baseSelect} value={form.delivery} onChange={(e) => set("delivery")(e.target.value)}>
                <option value="">{t("common.selectDelivery")}</option>{delivOpts.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <MonoLabel>{t("s5.budget")}</MonoLabel>
              <select className={baseSelect} value={form.budget} onChange={(e) => set("budget")(e.target.value)}>
                <option value="">{t("common.selectBudget")}</option>{budgetOpts.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
            <div className="space-y-2">
              <MonoLabel>{t("s5.phase")}</MonoLabel>
              <select className={baseSelect} value={form.phase} onChange={(e) => set("phase")(e.target.value)}>
                <option value="">{t("common.selectPhase")}</option>{phaseOpts.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </FieldGroup>
        </div>

        <div className="border-t border-gray/25 pt-6 space-y-4">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input type="checkbox" checked={form.consent} onChange={(e) => set("consent")(e.target.checked)} className="mt-0.5 w-[18px] h-[18px] accent-blue rounded-sm border-gray/40 focus:outline-none focus:ring-2 focus:ring-blue/40" />
            <span className="text-sm text-sand/85 leading-relaxed group-hover:text-sand transition-colors">
              {t("s5.consent")} <span className="text-blue ml-1" aria-hidden="true">*</span>
            </span>
          </label>
          <p className="text-xs text-gray/70 font-mono">{t("wizard.submitHelp")}</p>
        </div>
      </div>
    );
  };

  const stepLabels = [
    t("stepTitles.s1"),
    t("stepTitles.s2"),
    t("stepTitles.s3"),
    t("stepTitles.s4"),
    t("stepTitles.s5"),
  ];

  const customTvacPath = localizedPath("/products/custom-tvac", lang);
  const contactPath = localizedPath("/contact", lang);

  // ---- Success state ----
  if (submitted) {
    return (
      <Layout>
        <Helmet>
          <html lang={lang} />
          <title>{tSeo("questionnaire.title")}</title>
          <meta name="robots" content="noindex,follow" />
        </Helmet>
        <PageShell>
          <Section>
            <div className="max-w-xl mx-auto text-center space-y-6 py-20">
              <CheckCircle className="w-12 h-12 text-blue mx-auto" />
              <h1 className="text-3xl font-medium text-sand tracking-tight">{t("success.title")}</h1>
              <p className="text-gray text-sm leading-relaxed">{t("success.message")}</p>
              <p className="text-gray/60 text-xs leading-relaxed">{t("success.reassurance")}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
                <Button asChild variant="default" className="font-mono text-xs">
                  <Link to={customTvacPath}>{t("success.backToCustom")}</Link>
                </Button>
                <Button asChild variant="outline" className="font-mono text-xs">
                  <Link to={contactPath}>{t("success.backToContact")}</Link>
                </Button>
                <Button type="button" variant="ghost" onClick={handlePrint} className="font-mono text-xs">
                  <FileDown className="w-4 h-4 mr-1.5" /> {t("success.savePdf")}
                </Button>
              </div>
            </div>
          </Section>
        </PageShell>
        {/* Print view stays mounted so post-submit "Save as PDF" still works */}
        <QuestionnairePrintView form={effectiveForm} />
      </Layout>
    );
  }

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("questionnaire.title")}</title>
        <meta name="description" content={tSeo("questionnaire.description")} />
        <meta name="robots" content="noindex,follow" />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (<link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />))}
      </Helmet>
      <PageShell>
        <PageHero eyebrow={t("meta.eyebrow")} title={t("meta.title")} description={t("meta.description")}>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 pt-2 text-xs text-gray/70 font-mono">
            <span className="flex items-center gap-2"><Clock className="w-3.5 h-3.5 text-blue/70" /> {t("meta.estimatedTime")}</span>
            <span className="flex items-center gap-2"><Info className="w-3.5 h-3.5 text-blue/70" /> {t("meta.reassurance")}</span>
          </div>
        </PageHero>

        <Section className="pt-0">
          {/* Step indicator */}
          <div className="mb-10">
            {/* Desktop */}
            <ol className="hidden md:flex items-center gap-2">
              {stepLabels.map((label, i) => {
                const idx = i + 1;
                const active = idx === step;
                const done = idx < step;
                return (
                  <li key={label} className="flex-1 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setStep(idx)}
                      aria-current={active ? "step" : undefined}
                      aria-label={`${t("wizard.stepLabel", { current: idx, total: totalSteps })}: ${label}`}
                      className={cn(
                        "group flex items-center gap-3 px-4 py-2.5 rounded-sm border transition-colors w-full text-left cursor-pointer",
                        "hover:border-blue/50 hover:bg-blue/5 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/40",
                        active && "border-blue/60 bg-blue/10",
                        done && !active && "border-gray/30 bg-surface/60",
                        !active && !done && "border-gray/20 bg-transparent"
                      )}
                    >
                      <span className={cn(
                        "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-mono shrink-0 transition-colors",
                        active ? "bg-blue text-background" : done ? "bg-gray/30 text-sand" : "bg-transparent border border-gray/30 text-gray/80 group-hover:border-blue/50 group-hover:text-sand"
                      )}>{idx}</span>
                      <span className={cn("text-xs font-mono tracking-wide truncate transition-colors", active ? "text-sand" : "text-gray/85 group-hover:text-sand")}>{label}</span>
                    </button>
                    {idx < totalSteps && <div className="w-4 h-px bg-gray/25 shrink-0" />}
                  </li>
                );
              })}
            </ol>
            {/* Mobile */}
            <div className="md:hidden space-y-2">
              <div className="flex items-center justify-between gap-3 px-4 py-3 border border-gray/30 rounded-sm bg-surface/60">
                <span className="text-[11px] font-mono text-blue">{t("wizard.stepLabel", { current: step, total: totalSteps })}</span>
                <span className="text-sm font-medium text-sand truncate">{stepLabels[step - 1]}</span>
              </div>
              <div className="flex items-center gap-1.5">
                {stepLabels.map((label, i) => {
                  const idx = i + 1;
                  const active = idx === step;
                  const done = idx < step;
                  return (
                    <button
                      key={label}
                      type="button"
                      onClick={() => setStep(idx)}
                      aria-current={active ? "step" : undefined}
                      aria-label={`${t("wizard.stepLabel", { current: idx, total: totalSteps })}: ${label}`}
                      className={cn(
                        "flex-1 h-9 rounded-sm border text-[11px] font-mono transition-colors cursor-pointer",
                        "focus:outline-none focus-visible:ring-2 focus-visible:ring-blue/40",
                        active
                          ? "bg-blue text-background border-blue"
                          : done
                            ? "border-gray/30 bg-surface/60 text-sand hover:border-blue/50"
                            : "border-gray/25 text-gray/80 hover:border-blue/50 hover:text-sand"
                      )}
                    >
                      {idx}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Error banner */}
          {submissionError && (
            <div role="alert" className="mb-6 flex items-start gap-3 border border-red-400/40 bg-red-500/5 rounded-sm p-4">
              <AlertTriangle className="w-4 h-4 text-red-400 mt-0.5 shrink-0" />
              <div className="flex-1 space-y-1">
                <p className="text-sm font-medium text-sand">{t("error.title")}</p>
                <p className="text-xs text-gray/80 leading-relaxed">{submissionError}</p>
              </div>
            </div>
          )}

          <form onSubmit={handleSubmit} onKeyDown={handleKeyDown} className="space-y-8">
            {/* Focus target on step change */}
            <div ref={stepHeadingRef} tabIndex={-1} className="outline-none focus-visible:ring-2 focus-visible:ring-blue/40 rounded-sm">
              <div className="border border-gray/25 rounded-sm p-5 sm:p-7 md:p-10 bg-surface/40 shadow-card">
                {step === 1 && renderStep1()}
                {step === 2 && renderStep2()}
                {step === 3 && renderStep3()}
                {step === 4 && renderStep4()}
                {step === 5 && renderStep5()}
              </div>
            </div>

            {/* Honeypot (visually hidden) */}
            <div aria-hidden="true" className="absolute -left-[9999px] w-px h-px overflow-hidden">
              <label htmlFor="q-website">Website</label>
              <input type="text" id="q-website" name="website" tabIndex={-1} autoComplete="off" value={honeypot} onChange={(e) => setHoneypot(e.target.value)} />
            </div>
            {/* Invisible Turnstile container */}
            <div ref={turnstileRef} />

            {/* Wizard footer */}
            <div className="sticky bottom-0 z-10 bg-background/95 backdrop-blur-md border-t border-gray/25 py-4 -mx-5 sm:-mx-7 md:-mx-10 px-5 sm:px-7 md:px-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {/* Reset (visually de-emphasized) */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-xs text-gray/70 hover:text-sand transition-colors font-mono self-start focus:outline-none focus-visible:ring-2 focus-visible:ring-gray/40 rounded-sm px-1 py-0.5"
                  >
                    <RotateCcw className="w-3 h-3" /> {t("wizard.reset")}
                  </button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t("wizard.resetConfirmTitle")}</AlertDialogTitle>
                    <AlertDialogDescription>{t("wizard.resetConfirmDescription")}</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t("wizard.resetConfirmCancel")}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleReset}>{t("wizard.resetConfirmAction")}</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              {/* Right cluster: nav + (on step 5) Save PDF + Submit */}
              <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
                <Button type="button" variant="outline" size="sm" onClick={goBack} disabled={step === 1 || sending} className="font-mono text-xs">
                  <ArrowLeft className="w-4 h-4 mr-1.5" /> {t("wizard.back")}
                </Button>

                {step < totalSteps ? (
                  <Button type="button" size="sm" onClick={goNext} className="font-mono text-xs">
                    {t("wizard.continue")} <ArrowRight className="w-4 h-4 ml-1.5" />
                  </Button>
                ) : (
                  <>
                    {/* Secondary: Save a copy as PDF */}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={handlePrint}
                      disabled={sending}
                      className="font-mono text-xs text-gray/70 hover:text-sand"
                      title={t("wizard.savePdfHint")}
                    >
                      <FileDown className="w-4 h-4 mr-1.5" /> {t("wizard.savePdf")}
                    </Button>
                    {/* Primary: Submit questionnaire */}
                    <Button type="submit" size="lg" disabled={sending} className="font-mono text-xs shadow-md">
                      {sending ? (
                        <><Loader2 className="w-4 h-4 mr-1.5 animate-spin" /> {t("wizard.submitting")}</>
                      ) : (
                        <><Send className="w-4 h-4 mr-1.5" /> {t("wizard.submit")}</>
                      )}
                    </Button>
                  </>
                )}
              </div>
            </div>
          </form>
        </Section>
      </PageShell>

      {/* Print view — hidden on screen, rendered for window.print() only */}
      <QuestionnairePrintView form={effectiveForm} />
    </Layout>
  );
}
