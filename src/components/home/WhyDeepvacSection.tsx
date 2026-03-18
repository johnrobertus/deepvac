import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { CheckCircle } from "lucide-react";

const differentiators = [
  {
    title: "Modular Platforms & Custom Builds",
    description: "Pre-engineered standard systems and fully bespoke chamber designs — from compact test cells to large-scale TVAC installations.",
  },
  {
    title: "Engineering-Led System Design",
    description: "Every Deepvac project is driven by engineering discipline — not by sales. Chamber architecture, interface design, and integration concepts start from first principles.",
  },
  {
    title: "Hardware, Controls & Services — Integrated",
    description: "Deepvac delivers chamber hardware, control system design, and lifecycle services as a unified offering, reducing integration risk and vendor complexity.",
  },
  {
    title: "Proximity to Demanding Applications",
    description: "Born from direct experience with aerospace qualification and research programs, Deepvac understands the technical requirements of mission-critical test environments.",
  },
  {
    title: "Design, Build, Retrofit & Operate",
    description: "Full project lifecycle support — from concept design through manufacturing, commissioning, modernisation, and long-term maintenance.",
  },
];

export function WhyDeepvacSection() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Why Deepvac"
            title="Engineered for the Mission"
            description="Technical credibility built on engineering fundamentals, not marketing claims."
            className="mb-14"
          />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {differentiators.map((d, i) => (
            <Reveal key={d.title} delay={i * 60}>
              <div className="flex gap-4 p-6 bento-card rounded-lg h-full">
                <CheckCircle className="w-5 h-5 text-blue flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-medium text-sand">{d.title}</h3>
                  <p className="text-xs text-gray mt-2 leading-relaxed">{d.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
