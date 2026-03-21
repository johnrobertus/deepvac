import { SectionHeader } from "@/components/SectionHeader";
import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import { Reveal } from "@/components/Reveal";
import { Crosshair, Settings, Thermometer, Gauge, Cpu, RefreshCw } from "lucide-react";

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
    icon: <Settings className="w-5 h-5" />,
    title: "Custom Engineering",
    description:
      "Application-specific chamber layouts, interfaces, feedthroughs, and mechanical integration concepts tailored to demanding test requirements.",
    label: "CUSTOM",
    span: "1x1" as const,
  },
  {
    icon: <Thermometer className="w-5 h-5" />,
    title: "Thermal Control",
    description:
      "Thermal plate, shroud, and temperature-control concepts for stable, repeatable thermal profiles, cycling, and qualification workflows.",
    label: "THERMAL",
    span: "1x1" as const,
  },
  {
    icon: <Gauge className="w-5 h-5" />,
    title: "High-Vacuum Systems",
    description:
      "Vacuum architectures designed for reliable high-vacuum performance, contamination-sensitive testing, and qualification-grade operating conditions.",
    label: "VACUUM",
    span: "1x1" as const,
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Control Systems & AI-Enabled Automation",
    description:
      "PLC-based control architectures with data acquisition, automation, and AI-enabled system logic for reproducible, transparent, and efficient test execution.",
    label: "CONTROL",
    span: "1x1" as const,
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: "Retrofit, Service & Modernisation",
    description:
      "Maintenance, repair, retrofit, and system upgrades for existing thermal vacuum infrastructure to improve performance, operability, and long-term availability.",
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
            title="Engineering for Advanced Thermal Vacuum Infrastructure"
            description="From standard series chambers to custom systems, control architectures, retrofit, and lifecycle support."
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
