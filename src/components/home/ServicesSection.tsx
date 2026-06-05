import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, Thermometer, Settings, Boxes, RefreshCw } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedPath } from "@/lib/routes";

const serviceIcons = [Thermometer, Settings, Boxes, RefreshCw];
const serviceHrefs = [
  "/services/testing-services",
  "/services/control-systems-design",
  "/services/subsystem-integration",
  "/services/retrofit-modernization",
];

export function ServicesSection() {
  const { t } = useTranslation("home");
  const { lang } = useLanguage();

  const items = t("services.items", { returnObjects: true }) as { label: string; title: string; description: string }[];

  return (
    <section id="services" className="bg-surface/30 px-6 py-24 md:py-32">
      <div className="container-wide">
        <Reveal>
          <SectionHeader
            eyebrow={t("services.eyebrow")}
            title={t("services.title")}
            description={t("services.description")}
            className="mb-16"
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {Array.isArray(items) && items.map((service, i) => {
            const Icon = serviceIcons[i] || Thermometer;
            return (
              <Reveal key={service.title} delay={i * 80}>
                <Link
                  to={localizedPath(serviceHrefs[i], lang)}
                  className="bento-card group flex h-full flex-col justify-between rounded-lg p-7 transition-all duration-300 hover:border-blue/20 hover:bg-background/40"
                >
                  <div className="space-y-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-blue/20 bg-blue/10 text-blue">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="space-y-2">
                      <span className="mono-label text-blue">{service.label}</span>
                      <h3 className="text-lg font-medium text-sand">{service.title}</h3>
                      <p className="text-sm leading-relaxed text-gray">{service.description}</p>
                    </div>
                  </div>
                  <div className="pt-6 inline-flex items-center gap-1.5 text-sm text-sand transition-colors group-hover:text-blue">
                    {t("buttons.exploreService", { ns: "common" })}
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={300}>
          <div className="mt-12 text-center">
            <Button asChild variant="outline">
              <Link to={localizedPath("/services", lang)}>
                {t("services.exploreAllCta")}
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
