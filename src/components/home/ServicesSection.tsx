import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, Thermometer, Gauge, Settings, RefreshCw, Wrench, Boxes } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedPath } from "@/lib/routes";

const serviceIcons = [Thermometer, Gauge, Settings, RefreshCw, Wrench, Boxes];
const serviceHrefs = [
  "/services/testing-services",
  "/services/control-systems-design",
  "/services/mechanical-design",
  "/services/retrofit-modernization",
  "/services/maintenance-repair",
  "/services/subsystem-integration",
];

export function ServicesSection() {
  const { t } = useTranslation("home");
  const { lang } = useLanguage();

  const pillars = t("services.pillars", { returnObjects: true }) as { title: string; description: string }[];
  const items = t("services.items", { returnObjects: true }) as { label: string; title: string; description: string }[];

  return (
    <section className="bg-surface/30 px-6 py-20 md:py-28">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow={t("services.eyebrow")}
            title={t("services.title")}
            description={t("services.description")}
            className="mb-10"
          />
        </Reveal>

        <div className="mb-8 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-gray/10 bg-gray/10 lg:grid-cols-3">
          {Array.isArray(pillars) && pillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 70}>
              <div className="h-full bg-background/60 px-6 py-5">
                <h3 className="text-sm font-medium text-sand">{pillar.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-gray">{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {Array.isArray(items) && items.map((service, i) => {
            const Icon = serviceIcons[i] || Thermometer;
            return (
              <Reveal key={service.title} delay={120 + i * 60}>
                <div className="bento-card group flex h-full flex-col justify-between rounded-lg p-6 transition-all duration-300 hover:border-blue/20 hover:bg-background/40">
                  <div className="space-y-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-blue/20 bg-blue/10 text-blue">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-2">
                      <span className="mono-label text-blue">{service.label}</span>
                      <h3 className="text-base font-medium text-sand">{service.title}</h3>
                      <p className="text-sm leading-relaxed text-gray">{service.description}</p>
                    </div>
                  </div>
                  <div className="pt-5">
                    <Link
                      to={localizedPath(serviceHrefs[i], lang)}
                      className="inline-flex items-center gap-1.5 text-sm text-sand transition-colors hover:text-blue"
                    >
                      {t("buttons.exploreService", { ns: "common" })}
                      <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
