import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ClipboardList, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedPath } from "@/lib/routes";

export function LeadCaptureCTA() {
  const { t } = useTranslation(["home", "common"]);
  const { lang } = useLanguage();
  const contactPath = localizedPath("/contact", lang);
  const questionnairePath = localizedPath("/tvac-questionnaire", lang);

  return (
    <section id="lead-capture" className="relative px-6 py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/40 to-transparent" />
      <div className="container relative z-10 max-w-4xl text-center">
        <Reveal>
          <div className="space-y-5">
            <span className="mono-label text-blue">{t("home:leadCapture.eyebrow")}</span>
            <h2 className="mt-3 text-3xl font-medium tracking-tight text-sand md:text-4xl">{t("home:leadCapture.title")}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray">{t("home:leadCapture.description")}</p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button asChild size="lg" className="font-mono text-xs tracking-wide">
                <Link to={contactPath}>{t("common:buttons.requestConsultation")}</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-mono text-xs tracking-wide border-blue/40 text-sand hover:bg-blue/10">
                <Link to={questionnairePath}>
                  <ClipboardList className="w-4 h-4 mr-2" />
                  {t("common:cta.questionnaire.configure")}
                </Link>
              </Button>
            </div>
            <p className="flex items-center justify-center gap-1.5 text-[11px] text-gray/60 font-mono pt-1">
              <Clock className="w-3 h-3 text-blue/60" />
              <span>{t("common:cta.questionnaire.microcopyShort")}</span>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
