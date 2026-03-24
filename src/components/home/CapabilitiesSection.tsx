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
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Control & Automation Systems",
    description:
      "PLC-based control architectures, automation, data acquisition, and supervisory system logic for stable, reproducible, and efficient test execution.",
    span: "1x1" as const,
  },
  {
    icon: <Settings className="w-5 h-5" />,
    title: "Mechanical Design & Interfaces",
    description:
      "Engineering of chamber layouts, fixtures, feedthroughs, mounting concepts, and support structures for customer-specific test configurations.",
    span: "1x1" as const,
  },
  {
    icon: <Thermometer className="w-5 h-5" />,
    title: "Thermal Control Systems",
    description:
      "Thermal plate, shroud, and temperature control solutions for stable thermal profiles, cycling, bake-out, and qualification workflows.",
    span: "1x1" as const,
  },
  {
    icon: <Gauge className="w-5 h-5" />,
    title: "Vacuum Systems Engineering",
    description:
      "Vacuum architectures with pumps, valves, sensors, and protection logic for reliable high-vacuum operation and contamination-sensitive testing.",
    span: "1x1" as const,
  },
  {
    icon: <Wrench className="w-5 h-5" />,
    title: "Test Campaign Support",
    description:
      "Engineering and operational support for thermal vacuum test campaigns, from setup and preparation to execution and repeatable test operation.",
    span: "1x1" as const,
  },
  {
    icon: <Workflow className="w-5 h-5" />,
    title: "Subsystem Integration",
    description:
      "Integration of thermal, vacuum, instrumentation, and control subsystems into coherent customer-specific test environments.",
    span: "1x1" as const,
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: "Retrofit, Maintenance & Repair",
    description:
      "Modernization, maintenance, repair, and targeted technical upgrades for existing thermal vacuum infrastructure and legacy test systems.",
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
            description="Deepvac combines chamber platforms, control engineering, mechanical design, subsystem integration, and lifecycle support in one engineering-driven offering for thermal vacuum infrastructure."
            className="mb-14"
          />
        </Reveal>

        <BentoGrid className="lg:grid-cols-4">
          {capabilities.map((item, i) => (
            <BentoCard key={item.title} span={item.span}>
              <Reveal delay={i * 60}>
                <div className="flex h-full flex-col gap-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-blue/20 bg-blue/10 text-blue">
                    {item.icon}
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-base font-medium text-sand">{item.title}</h3>
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
