import { SectionHeader } from "@/components/SectionHeader";
import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import { Reveal } from "@/components/Reveal";
import {
  Crosshair,
  Settings,
  Thermometer,
  Gauge,
  Cpu,
  RefreshCw,
} from "lucide-react";

const capabilities = [
  {
    icon: <Crosshair className="w-5 h-5" />,
    title: "Thermal Vacuum Chamber Platforms",
    description:
      "Standard and custom-engineered TVAC systems designed for controlled environmental simulation of aerospace hardware across a range of test profiles and payload geometries.",
    span: "2x1" as const,
  },
  {
    icon: <Settings className="w-5 h-5" />,
    title: "Custom Engineering & Integration",
    description:
      "Application-specific system design, interface engineering, fixture integration, and feedthrough configurations tailored to individual mission and test requirements.",
    span: "1x1" as const,
  },
  {
    icon: <Thermometer className="w-5 h-5" />,
    title: "Precision Thermal Control",
    description:
      "Thermal shroud and platen design with accurate temperature regulation for stable, repeatable thermal cycling and bake-out workflows.",
    span: "1x1" as const,
  },
  {
    icon: <Gauge className="w-5 h-5" />,
    title: "High-Vacuum Test Environments",
    description:
      "Chamber and pumping architectures designed to achieve and maintain high-vacuum conditions for contamination-sensitive and qualification-grade testing.",
    span: "1x1" as const,
  },
  {
    icon: <Cpu className="w-5 h-5" />,
    title: "Control Systems & Automation",
    description:
      "Integrated control platforms with data acquisition, process automation, and user interfaces designed for reliable and efficient test execution.",
    span: "1x1" as const,
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: "Lifecycle Service & Modernisation",
    description:
      "Maintenance, retrofit, and technical upgrades for existing thermal vacuum systems to extend operational life and improve performance.",
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
            title="Engineering Excellence at Every Scale"
            description="From standardised chamber platforms to fully bespoke thermal vacuum solutions — designed, built, and supported by DEEPVAC."
            className="mb-14"
          />
        </Reveal>
        <BentoGrid className="lg:grid-cols-4">
          {capabilities.map((cap, i) => (
            <Reveal key={cap.title} delay={i * 60}>
              <BentoCard span={cap.span} className="flex flex-col gap-4 h-full">
                <div className="w-9 h-9 rounded-sm bg-blue/10 border border-blue/20 flex items-center justify-center text-blue">
                  {cap.icon}
                </div>
                <div>
                  <h3 className="text-base font-medium text-sand">{cap.title}</h3>
                  <p className="text-sm text-gray mt-2 leading-relaxed">{cap.description}</p>
                </div>
                <span className="mono-label text-gray/20 mt-auto">
                  [{cap.title.split(" ")[0].toUpperCase()}]
                </span>
              </BentoCard>
            </Reveal>
          ))}
        </BentoGrid>
      </div>
    </section>
  );
}
