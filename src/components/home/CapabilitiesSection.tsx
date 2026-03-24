import { SectionHeader } from "@/components/SectionHeader";
import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import { Reveal } from "@/components/Reveal";
import { Crosshair, Settings, Thermometer, Gauge, Cpu, RefreshCw, Wrench, Workflow } from "lucide-react";

const capabilities = [
  {
    icon: <Crosshair className="w-5 h-5" />,
    title: "TVAC Chamber Systems",
    description:
      "Standardized and custom thermal vacuum chamber systems for aerospace qualification, thermal cycling, and space environment simulation.",
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
      "Engineering of chamber layouts, fixtures, feedthroughs, mounting concepts, and support structures for customer-specific test setups.",
    span: "1x1" as const,
  },
  {
    icon: <Thermometer className="w-5 h-5" />,
    title: "Thermal Control Concepts",
    description:
      "Thermal plate, shroud, and temperature-control solutions for stable thermal profiles, cycling, bake-out, and qualification workflows.",
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
    title: "Thermal Vacuum Testing Support",
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
    <section className="py-20 md:py-28 px-6">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Core Capabilities"
            title="From TVAC Chamber Design to Lifecycle Support"
            description="Deepvac combines chamber systems, control engineering, mechanical design, subsystem integration, and lifecycle support in one engineering-driven offering for thermal vacuum infrastructure."
            className="mb-14"
          />
        </Reveal>

        <BentoGrid className="lg:grid-cols-4">
          {capabilities.map((capability, i) => (
            <BentoCard key={capability.title} span={capability.span}>
              <Reveal delay={i * 60}>
                <div className="flex flex-col gap-4 h-full">
                  <div className="w-9 h-9 rounded-sm bg-blue/10 border border-blue/20 flex items-center justify-center text-blue">
                    {capability.icon}
                  </div>

                  <div>
                    <h3 className="text-base font-medium text-sand">{capability.title}</h3>
                    <p className="text-sm text-gray mt-2 leading-relaxed">{capability.description}</p>
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
