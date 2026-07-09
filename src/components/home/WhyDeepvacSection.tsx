import { useTranslation } from "react-i18next";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

export function WhyDeepvacSection() {
  const { t } = useTranslation("home");
  const items = t("whyDeepvac.items", { returnObjects: true }) as { title: string; description: string }[];

  return (
    <section id="why-deepvac" className="px-6 py-20 md:py-28">
      <div className="container-wide">
        <Reveal>
          <SectionHeader
            eyebrow={t("whyDeepvac.eyebrow")}
            title={t("whyDeepvac.title")}
            description={t("whyDeepvac.description")}
            className="mb-14"
          />
        </Reveal>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {Array.isArray(items) &&
            items.map((item, i) => (
              <Reveal key={item.title} delay={i * 60}>
                <div className="bento-card flex h-full gap-5 rounded-lg p-7">
                  <span className="mono-label flex-shrink-0 pt-0.5 text-blue tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="space-y-2.5">
                    <h3 className="text-card-title">{item.title}</h3>
                    <p className="text-card-body">{item.description}</p>

                  </div>
                </div>
              </Reveal>
            ))}
        </div>
      </div>
    </section>
  );
}
