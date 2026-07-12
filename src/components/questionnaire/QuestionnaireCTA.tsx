import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, ClipboardList, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedPath } from "@/lib/routes";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type LabelKey = "start" | "configure" | "configureCustomVariant" | "specify" | "submitDetailed" | "open";
type MicrocopyKey = "microcopy" | "microcopyDetailed" | "microcopyShort" | "none";

interface Props {
  /** Visual emphasis. */
  variant?: Variant;
  /** Which CTA label to display (i18n key under cta.questionnaire). */
  label?: LabelKey;
  /** Microcopy line under the button. "none" hides it. */
  microcopy?: MicrocopyKey;
  /** Optional size override. */
  size?: "default" | "sm" | "lg";
  className?: string;
  /** Show clock icon next to microcopy. */
  showClockIcon?: boolean;
}

/**
 * Reusable, route-aware CTA pointing to the bilingual TVAC questionnaire.
 * Resolves the localized path automatically (/tvac-questionnaire ↔ /de/tvac-fragebogen).
 */
export function QuestionnaireCTA({
  variant = "primary",
  label = "configure",
  microcopy = "microcopy",
  size = "lg",
  className,
  showClockIcon = true,
}: Props) {
  const { t } = useTranslation("common");
  const { lang } = useLanguage();
  const to = localizedPath("/tvac-questionnaire", lang);

  const buttonVariant: "default" | "outline" | "ghost" =
    variant === "primary" ? "default" : variant === "secondary" ? "outline" : "ghost";

  return (
    <div className={cn("flex flex-col items-start gap-2", className)}>
      <Button asChild size={size} variant={buttonVariant} className="font-mono text-xs tracking-wide">
        <Link to={to}>
          <ClipboardList className="w-4 h-4 mr-2" />
          {t(`cta.questionnaire.${label}`)}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
      </Button>
      {microcopy !== "none" && (
        <p className="flex items-start gap-1.5 text-[13px] text-gray/85 leading-relaxed font-mono max-w-md">
          {showClockIcon && <Clock className="w-3 h-3 mt-0.5 text-blue/60 shrink-0" />}
          <span>{t(`cta.questionnaire.${microcopy}`)}</span>
        </p>
      )}
    </div>
  );
}

/**
 * Inline card for the Contact page — sits above the short form and routes
 * high-intent users to the questionnaire without removing the short form.
 */
export function QuestionnaireCard({ className }: { className?: string }) {
  const { t } = useTranslation("common");
  const { lang } = useLanguage();
  const to = localizedPath("/tvac-questionnaire", lang);

  return (
    <div
      className={cn(
        "border border-blue/30 bg-gradient-to-br from-blue/5 via-surface/40 to-transparent rounded-sm p-6 md:p-8 space-y-4",
        className
      )}
    >
      <div className="flex items-start gap-4">
        <div className="hidden sm:flex w-10 h-10 rounded-sm bg-blue/10 border border-blue/20 items-center justify-center shrink-0">
          <ClipboardList className="w-5 h-5 text-blue" />
        </div>
        <div className="flex-1 space-y-3">
          <div className="space-y-2">
            <p className="text-[13px] font-mono uppercase tracking-[0.18em] text-blue/80">
              {t("cta.questionnaire.specify")}
            </p>
            <h2 className="text-card-title-lg md:text-2xl">
              {t("cta.questionnaire.card.title")}
            </h2>
          </div>
          <p className="text-body">{t("cta.questionnaire.card.text")}</p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-5 pt-1">
            <Button asChild size="lg" className="font-mono text-xs tracking-wide shrink-0">
              <Link to={to}>
                <ClipboardList className="w-4 h-4 mr-2" />
                {t("cta.questionnaire.open")}
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <p className="flex items-center gap-1.5 text-[13px] text-gray/85 font-mono">
              <Clock className="w-3 h-3 text-blue/60" />
              <span>{t("cta.questionnaire.microcopyShort")}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
