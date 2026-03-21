import { SectionHeader } from "@/components/SectionHeader";
import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import { Reveal } from "@/components/Reveal";
import { Crosshair, Settings, Thermometer, Gauge, Cpu, RefreshCw, Wrench, Workflow } from "lucide-react";

const capabilities = [
  {
    icon: <Crosshair className="w-5 h-5" />,
    title: "Thermal Vacuum Chamber Systems",
    description:
      "Standardised and custom thermal vacuum chamber systems for qualification, validation, and environmental simulation of aerospace hardware.",
    label: "SYSTEMS",
    span: "2x1" as const,
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Control Systems Design",
    description:
      "PLC-based control architectures, data acquisition, automation, and AI-enabled system logic for transparent, reproducible, and efficient test execution.",
    label: "CONTROL",
    span: "1x1" as const,
  },
  {
    icon: <Settings className="w-5 h-5" />,
    title: "Mechanical Design",
    description:
      "Mechanical design of chamber layouts, fixtures, support structures, interfaces, and feedthrough concepts for application-specific test requirements.",
    label: "MECHANICAL",
    span: "1x1" as const,
  },
  {
    icon: <Thermometer className="w-5 h-5" />,
    title: "Thermal Control",
    description:
      "Thermal plate, shroud, and temperature-control concepts for stable thermal profiles, cycling, bake-out workflows, and qualification testing.",
    label: "THERMAL",
    span: "1x1" as const,
  },
  {
    icon: <Gauge className="w-5 h-5" />,
    title: "High-Vacuum Systems",
    description:
      "Vacuum architectures with pumping systems, valves, sensors, and protection logic for reliable high-vacuum and contamination-sensitive test environments.",
    label: "VACUUM",
    span: "1x1" as const,
  },
  {
    icon: <Wrench className="w-5 h-5" />,
    title: "Testing Services",
    description:
      "Support for thermal vacuum test campaigns, including test preparation, execution support, and reliable operation under controlled environmental conditions.",
    label: "TESTING",
    span: "1x1" as const,
  },
  {
    icon: <Workflow className="w-5 h-5" />,
    title: "Subsystem Integration",
    description:
      "Integration of thermal, vacuum, instrumentation, and control subsystems into coherent test environments tailored to customer-specific requirements.",
    label: "INTEGRATION",
    span: "1x1" as const,
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: "Retrofit, Maintenance & Repair",
    description:
      "Modernisation, maintenance, repair, and technical upgrades for existing thermal vacuum infrastructure to improve performance, reliability, and long-term availability.",
    label: "LIFECYCLE",
    span: "2x1" as const,
  },
];

export function CapabilitiesSection() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Core Capabilities"
            title="From Chamber Design to Intelligent Test Infrastructure"
            description="Deepvac combines chamber development, control systems, mechanical design, subsystem integration, and lifecycle support in one engineering-driven offering."
            className="mb-14"
          />
        </Reveal>

        <BentoGrid className="lg:grid-cols-4">
          {capabilities.map((cap, i) => (
            <BentoCard key={cap.title} span={cap.span}>
              <Reveal delay={i * 60}>
                <div className="flex flex-col gap-4 h-full">
                  <div className="w-9 h-9 rounded-sm bg-blue/10 border border-blue/20 flex items-center justify-center text-blue">
                    {cap.icon}
                  </div>
                  <div>
                    <h3 className="text-base font-medium text-sand">{cap.title}</h3>
                    <p className="text-sm text-gray mt-2 leading-relaxed">{cap.description}</p>
                  </div>
                  <span className="mono-label text-gray/20 mt-auto">[{cap.label}]</span>
                </div>
              </Reveal>
            </BentoCard>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
