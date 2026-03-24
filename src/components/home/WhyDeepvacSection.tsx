import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { CheckCircle } from "lucide-react";

const differentiators = [
  {
    title: "Integrated TVAC Infrastructure",
    description:
      "Chamber hardware, thermal control, vacuum architecture, control systems, and lifecycle support are combined in one coordinated engineering approach — not assembled from isolated components.",
  },
  {
    title: "Engineering-Driven System Design",
    description:
      "Projects start from technical requirements, system architecture, and interface definition to create robust, application-specific test environments.",
  },
  {
    title: "Data-Driven Control Architecture",
    description:
      "Advanced control systems with automation logic, instrumentation integration, and future-ready monitoring concepts for transparent, reproducible operation.",
  },
  {
    title: "Built for Qualification-Grade Environments",
    description:
      "System concepts developed around the requirements of aerospace qualification, thermal cycling, contamination-sensitive testing, and advanced research use cases.",
  },
  {
    title: "From New Systems to Modernization",
    description:
      "Deepvac supports projects across concept development, manufacturing, commissioning, retrofit, maintenance, and long-term technical improvement.",
  },
  {
    title: "Reduced Interface Complexity",
    description:
      "Thermal, vacuum, instrumentation, and control subsystems are designed as one functional architecture — reducing coordination effort, integration risk, and technical friction.",
  },
];

export function WhyDeepvacSection() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Why Deepvac"
            title="Built on Engineering Depth"
            description="Deepvac combines engineering discipline, integrated system architecture, and lifecycle-aware support to deliver reliable thermal vacuum infrastructure."
            className="mb-14"
          />
        </Reveal>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {differentiators.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="bento-card flex h-full gap-4 rounded-lg p-6">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue" />
                <div className="space-y-2">
                  <h3 className="text-[14px] font-medium text-sand">{item.title}</h3>
                  <p className="text-[13px] leading-relaxed text-gray">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
