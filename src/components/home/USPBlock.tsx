import { Reveal } from "@/components/Reveal";
import { Crosshair, Thermometer, Cpu, RefreshCw } from "lucide-react";

const usps = [
  {
    icon: <Crosshair className="h-5 w-5" />,
    title: "Standardized & Custom TVAC Platforms",
    description: "Modular chamber systems and application-specific configurations for aerospace qualification and environmental simulation.",
  },
  {
    icon: <Cpu className="h-5 w-5" />,
    title: "Control Systems & Automation",
    description: "Data-driven control architectures, automation logic, and instrumentation integration for stable, reproducible test execution.",
  },
  {
    icon: <RefreshCw className="h-5 w-5" />,
    title: "Retrofit & Modernization",
    description: "Targeted upgrades for legacy systems to improve control quality, reliability, and long-term technical performance.",
  },
  {
    icon: <Thermometer className="h-5 w-5" />,
    title: "Lifecycle Support & Maintenance",
    description: "Maintenance, repair, and campaign support to keep test infrastructure available and ready for demanding qualification workflows.",
  },
];

export function USPBlock() {
  return (
    <section className="px-6 py-14 md:py-20">
      <div className="container max-w-6xl">
        <Reveal>
          <p className="mono-label text-blue mb-8 text-[11px] tracking-[0.06em]">
            WHAT WE DO
          </p>
        </Reveal>

        <div className="grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-blue/15 bg-blue/8 sm:grid-cols-2 lg:grid-cols-4">
          {usps.map((usp, i) => (
            <Reveal key={usp.title} delay={i * 70}>
              <div className="flex h-full flex-col gap-4 bg-background px-6 py-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-blue/25 bg-blue/10 text-blue">
                  {usp.icon}
                </div>
                <div className="space-y-2">
                  <h3 className="text-[14px] font-medium leading-snug text-sand">
                    {usp.title}
                  </h3>
                  <p className="text-[13px] leading-relaxed text-gray">
                    {usp.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
