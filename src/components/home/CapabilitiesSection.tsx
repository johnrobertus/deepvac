import { SectionHeader } from "@/components/SectionHeader";
import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import { Reveal } from "@/components/Reveal";
import { Crosshair, Settings, Thermometer, Gauge, Cpu, RefreshCw, Wrench, Workflow } from "lucide-react";

const capabilities = [
  {
    icon: <Crosshair className="w-5 h-5" />,
    title: "TVAC Chamber Platforms",
    description:
      "Standardized and custom chamber platforms for aerospace qualification, thermal cycling, and space environment simulation.",
    featured: true,
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Control & Automation",
    description:
      "Data-driven control architectures, automation logic, and supervisory interfaces for stable, reproducible test execution.",
    featured: true,
  },
  {
    icon: <Settings className="w-5 h-5" />,
    title: "Mechanical Design",
    description:
      "Chamber layouts, fixtures, feedthroughs, and support structures for application-specific test configurations.",
  },
  {
    icon: <Thermometer className="w-5 h-5" />,
    title: "Thermal Control Systems",
    description:
      "Thermal plate, shroud, and temperature control for stable profiles, cycling, and qualification workflows.",
  },
  {
    icon: <Gauge className="w-5 h-5" />,
    title: "Vacuum Engineering",
    description:
      "Vacuum architectures with pumps, valves, sensors, and protection logic for reliable high-vacuum operation.",
  },
  {
    icon: <Wrench className="w-5 h-5" />,
    title: "Test Campaign Support",
    description:
      "Engineering and operational support for thermal vacuum test campaigns, from preparation to execution.",
  },
  {
    icon: <Workflow className="w-5 h-5" />,
    title: "Subsystem Integration",
    description:
      "Integration of thermal, vacuum, instrumentation, and control subsystems into coherent test environments.",
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: "Retrofit & Modernization",
    description:
      "Modernization, maintenance, repair, and targeted upgrades for existing thermal vacuum infrastructure.",
  },
];

export function CapabilitiesSection() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Core Capabilities"
            title="Engineering Across the Full TVAC Lifecycle"
            description="Deepvac combines chamber platforms, control engineering, thermal design, subsystem integration, and lifecycle support in one engineering-driven approach."
            className="mb-14"
          />
        </Reveal>

        <BentoGrid className="lg:grid-cols-4">
          {capabilities.map((item, i) => (
            <BentoCard key={item.title} span="1x1">
              <Reveal delay={i * 60}>
                <div className={`flex h-full flex-col gap-4 ${item.featured ? 'relative' : ''}`}>
                  <div className={`flex h-10 w-10 items-center justify-center rounded-sm border ${
                    item.featured
                      ? 'border-blue/30 bg-blue/15 text-blue shadow-[0_0_12px_0_hsl(var(--blue)/0.15)]'
                      : 'border-blue/20 bg-blue/10 text-blue'
                  }`}>
                    {item.icon}
                  </div>

                  <div className="space-y-2">
                    <h3 className={`font-medium text-sand ${item.featured ? 'text-[15px]' : 'text-[15px]'}`}>{item.title}</h3>
                    <p className="text-[13px] leading-relaxed text-gray">{item.description}</p>
                  </div>
                </div>
              </Reveal>
            </BentoCard>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
