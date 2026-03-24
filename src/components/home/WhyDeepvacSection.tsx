import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { CheckCircle } from "lucide-react";

const credibilityPoints = [
  "Modular and custom system delivery",
  "Integrated hardware, controls, and support",
  "Lifecycle-oriented engineering approach",
];

const featuredDifferentiators = [
  {
    title: "Engineering-Driven System Design",
    description:
      "Projects start from technical requirements, system architecture, interface definition, and integration logic to create robust application-specific test environments.",
  },
  {
    title: "Integrated Hardware, Controls & Support",
    description:
      "Chamber hardware, control systems, subsystem integration, modernization, and service are combined in one coordinated engineering approach.",
  },
];

const supportingDifferentiators = [
  {
    title: "Modular Platforms & Custom Systems",
    description:
      "Deepvac offers standardized chamber platforms and custom thermal vacuum systems, from compact test setups to large-scale qualification infrastructure.",
  },
  {
    title: "Built for Qualification-Grade Environments",
    description:
      "System concepts are developed around the requirements of aerospace qualification, thermal cycling, contamination-sensitive testing, and advanced research use cases.",
  },
  {
    title: "From New Systems to Modernization",
    description:
      "Deepvac supports projects across concept development, manufacturing, commissioning, retrofit, maintenance, and long-term technical improvement.",
  },
  {
    title: "Reduced Interface Complexity",
    description:
      "Thermal, vacuum, instrumentation, and control subsystems are designed as one functional environment to reduce coordination effort, integration risk, and technical friction.",
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
            description="Deepvac combines engineering discipline, integrated system design, and lifecycle support to deliver reliable thermal vacuum infrastructure."
            className="mb-10"
          />
        </Reveal>

        <Reveal delay={60}>
          <div className="mb-8 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-gray/10 bg-gray/10 md:grid-cols-3">
            {credibilityPoints.map((point) => (
              <div key={point} className="bg-background/60 px-5 py-4 text-xs leading-relaxed text-gray">
                {point}
              </div>
            ))}
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-6">
          {featuredDifferentiators.map((item, i) => (
            <Reveal key={item.title} delay={i * 80}>
              <div className="bento-card col-span-1 h-full rounded-lg border border-blue/20 bg-blue/5 p-7 lg:col-span-3">
                <div className="mb-5 flex items-start gap-4">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-sm border border-blue/20 bg-blue/10 text-blue">
                    <CheckCircle className="h-5 w-5" />
                  </div>

                  <div className="space-y-2">
                    <span className="mono-label text-blue">Core differentiator</span>
                    <h3 className="text-lg font-medium text-sand">{item.title}</h3>
                  </div>
                </div>

                <p className="max-w-xl text-sm leading-relaxed text-gray">{item.description}</p>
              </div>
            </Reveal>
          ))}

          {supportingDifferentiators.map((item, i) => (
            <Reveal key={item.title} delay={180 + i * 60}>
              <div className="bento-card col-span-1 flex h-full gap-4 rounded-lg p-6 lg:col-span-3">
                <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue" />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-sand">{item.title}</h3>
                  <p className="text-xs leading-relaxed text-gray">{item.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
