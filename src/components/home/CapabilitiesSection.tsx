import { SectionHeader } from "@/components/SectionHeader";
import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import { Reveal } from "@/components/Reveal";
import { Crosshair, Settings, Thermometer, Gauge, Cpu, RefreshCw, Wrench, Workflow } from "lucide-react";

const capabilities = [
  {
    icon: <Crosshair className="w-5 h-5" />,
    title: "TVAC Chamber Platforms",
    description:
      "Standardized and custom thermal vacuum chamber platforms for aerospace qualification, thermal cycling, and space environment simulation.",
    span: "1x1" as const,
    featured: true,
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Control & Automation Systems",
    description:
      "PLC-based control architectures, automation, data acquisition, and supervisory logic for stable, reproducible test execution.",
    span: "1x1" as const,
    featured: true,
  },
  {
    icon: <Settings className="w-5 h-5" />,
    title: "Mechanical Design & Interfaces",
    description:
      "Chamber layouts, fixtures, feedthroughs, mounting concepts, and support structures for customer-specific test configurations.",
    span: "1x1" as const,
  },
  {
    icon: <Thermometer className="w-5 h-5" />,
    title: "Thermal Control Systems",
    description:
      "Thermal plate, shroud, and temperature control solutions for stable profiles, cycling, bake-out, and qualification workflows.",
    span: "1x1" as const,
  },
  {
    icon: <Gauge className="w-5 h-5" />,
    title: "Vacuum Systems Engineering",
    description:
      "Vacuum architectures with pumps, valves, sensors, and protection logic for reliable high-vacuum operation.",
    span: "1x1" as const,
  },
  {
    icon: <Wrench className="w-5 h-5" />,
    title: "Test Campaign Support",
    description:
      "Engineering and operational support for thermal vacuum test campaigns, from setup and preparation to execution.",
    span: "1x1" as const,
  },
  {
    icon: <Workflow className="w-5 h-5" />,
    title: "Subsystem Integration",
    description:
      "Integration of thermal, vacuum, instrumentation, and control subsystems into coherent test environments.",
    span: "1x1" as const,
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: "Retrofit, Maintenance & Repair",
    description:
      "Modernization, maintenance, repair, and targeted upgrades for existing thermal vacuum infrastructure.",
    span: "1x1" as const,
  },
];

export function CapabilitiesSection() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Core Capabilities"
            title="Engineering Capabilities Across the Full TVAC Lifecycle"
            description="Deepvac combines chamber platforms, control engineering, mechanical design, subsystem integration, and lifecycle support in one engineering-driven offering."
            className="mb-14"
          />
        </Reveal>

        <BentoGrid className="lg:grid-cols-4">
          {capabilities.map((item, i) => (
            <BentoCard key={item.title} span={item.span}>
              <Reveal delay={i * 60}>
                <div className={`flex h-full flex-col gap-4 ${item.featured ? 'relative' : ''}`}>
                  <div className={`flex h-9 w-9 items-center justify-center rounded-sm border ${
                    item.featured 
                      ? 'border-blue/30 bg-blue/15 text-blue shadow-[0_0_12px_0_hsl(var(--blue)/0.15)]' 
                      : 'border-blue/20 bg-blue/10 text-blue'
                  }`}>
                    {item.icon}
                  </div>

                  <div className="space-y-2">
                    <h3 className={`font-medium text-sand ${item.featured ? 'text-[15px]' : 'text-base'}`}>{item.title}</h3>
                    <p className="text-sm leading-relaxed text-gray">{item.description}</p>
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
