import { useTranslation } from "react-i18next";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { CheckCircle } from "lucide-react";

export function WhyDeepvacSection() {
  const { t } = useTranslation("home");
  const items = t("whyDeepvac.items", { returnObjects: true }) as { title: string; description: string }[];

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow={t("whyDeepvac.eyebrow")}
            title={t("whyDeepvac.title")}
            description={t("whyDeepvac.description")}
            className="mb-14"
          />
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {Array.isArray(items) && items.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="bento-card flex h-full gap-4 rounded-lg p-6">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue" />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-sand">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-gray">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
