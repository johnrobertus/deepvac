import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { CheckCircle } from "lucide-react";

const differentiators = [
  {
    title: "Modular Platforms & Custom Systems",
    description:
      "Standardized chamber platforms and custom TVAC systems, from compact test cells to large-scale qualification infrastructure.",
  },
  {
    title: "Engineering-Led System Design",
    description:
      "Projects start from technical requirements, system architecture, interface design, and integration logic to create coherent application-specific test environments.",
  },
  {
    title: "Integrated Hardware, Controls & Lifecycle Support",
    description:
      "Deepvac combines chamber hardware, control systems, subsystem integration, modernization, and service in one engineering-driven offering.",
  },
  {
    title: "Built for Demanding Test Environments",
    description:
      "Designed around the requirements of aerospace qualification, thermal cycling, contamination-sensitive testing, and advanced research applications.",
  },
  {
    title: "From Design to Modernization",
    description:
      "Support across concept development, manufacturing, commissioning, retrofit, maintenance, and long-term system improvement.",
  },
  {
    title: "System Integration with Practical Focus",
    description:
      "Thermal, vacuum, instrumentation, and control subsystems are developed as part of one functional test environment to reduce interfaces, complexity, and integration risk.",
  },
];

export function WhyDeepvacSection() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Why Deepvac"
            title="Built on Engineering Depth"
            description="Deepvac combines engineering discipline, integrated system design, and lifecycle support for reliable thermal vacuum infrastructure."
            className="mb-14"
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {differentiators.map((item, i) => (
            <Reveal key={item.title} delay={i * 60}>
              <div className="flex gap-4 p-6 bento-card rounded-lg h-full">
                <CheckCircle className="w-5 h-5 text-blue flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-sand">{item.title}</h3>
                  <p className="text-xs text-gray mt-2 leading-relaxed">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
