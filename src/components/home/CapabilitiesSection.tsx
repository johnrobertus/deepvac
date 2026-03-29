import { useTranslation } from "react-i18next";
import { SectionHeader } from "@/components/SectionHeader";
import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import { Reveal } from "@/components/Reveal";
import { Crosshair, Settings, Thermometer, Gauge, Cpu, RefreshCw, Wrench, Workflow } from "lucide-react";

const icons = [Crosshair, Cpu, Settings, Thermometer, Gauge, Wrench, Workflow, RefreshCw];
const featuredIndexes = [0, 1];

export function CapabilitiesSection() {
  const { t } = useTranslation("home");
  const items = t("capabilities.items", { returnObjects: true }) as { title: string; description: string }[];

  return (
    <section className="px-6 py-20 md:py-28">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow={t("capabilities.eyebrow")}
            title={t("capabilities.title")}
            description={t("capabilities.description")}
            className="mb-14"
          />
        </Reveal>

        <BentoGrid className="lg:grid-cols-4">
          {Array.isArray(items) && items.map((item, i) => {
            const Icon = icons[i] || Crosshair;
            const featured = featuredIndexes.includes(i);
            return (
              <BentoCard key={item.title} span="1x1">
                <Reveal delay={i * 60}>
                  <div className={`flex h-full flex-col gap-4 ${featured ? 'relative' : ''}`}>
                    <div className={`flex h-9 w-9 items-center justify-center rounded-sm border ${featured ? 'border-blue/30 bg-blue/15 text-blue shadow-[0_0_12px_0_hsl(var(--blue)/0.15)]' : 'border-blue/20 bg-blue/10 text-blue'}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className={`font-medium text-sand ${featured ? 'text-[15px]' : 'text-base'}`}>{item.title}</h3>
                      <p className="text-sm leading-relaxed text-gray">{item.description}</p>
                    </div>
                  </div>
                </Reveal>
              </BentoCard>
            );
          })}
        </BentoGrid>
      </div>
    </section>
  );
}
