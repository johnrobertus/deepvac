import { useTranslation } from "react-i18next";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { Satellite, Rocket, FlaskConical, Thermometer, ShieldCheck, Boxes } from "lucide-react";

const icons = [Satellite, Rocket, Thermometer, ShieldCheck, FlaskConical, Boxes];

export function ApplicationsSection() {
  const { t } = useTranslation("home");
  const items = t("applications.items", { returnObjects: true }) as { title: string; description: string }[];

  return (
    <section id="applications" className="py-20 md:py-28 px-6">
      <div className="container-wide">
        <Reveal>
          <SectionHeader
            eyebrow={t("applications.eyebrow")}
            title={t("applications.title")}
            description={t("applications.description")}
            className="mb-14"
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.isArray(items) && items.map((useCase, i) => {
            const Icon = icons[i] || Satellite;
            return (
              <Reveal key={useCase.title} delay={i * 60}>
                <div className="bento-card rounded-lg p-7 space-y-4 h-full">
                  <div className="w-11 h-11 rounded-sm bg-blue/10 border border-blue/25 flex items-center justify-center text-blue">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-medium text-sand">{useCase.title}</h3>
                  <p className="text-[16px] md:text-[17px] text-sand/75 leading-relaxed">{useCase.description}</p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
