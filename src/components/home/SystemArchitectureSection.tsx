import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";

const layers = [
  {
    label: "Service & Lifecycle",
    description: "Maintenance, modernization, campaign support, and long-term operational engineering.",
    level: "support",
  },
  {
    label: "Monitoring & Data Layer",
    description: "Instrumentation, data acquisition, future-ready monitoring concepts, and digital system logic.",
    level: "data",
  },
  {
    label: "Control & Automation",
    description: "PLC-based control architectures, automation logic, supervisory interfaces, and safety systems.",
    level: "control",
  },
  {
    label: "Thermal Control",
    description: "Thermal plates, shrouds, temperature regulation, cycling profiles, and bake-out systems.",
    level: "thermal",
  },
  {
    label: "Vacuum System",
    description: "Pump systems, valves, gauges, protection logic, and high-vacuum architecture.",
    level: "vacuum",
  },
  {
    label: "Chamber Platform",
    description: "Mechanical structure, vessel geometry, feedthroughs, fixtures, and interface engineering.",
    level: "chamber",
  },
];

export function SystemArchitectureSection() {
  return (
    <section className="px-6 py-20 md:py-28">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="System Architecture"
            title="What Makes a Deepvac System"
            description="Every Deepvac system integrates six engineering layers into a coherent TVAC infrastructure — from the physical chamber to lifecycle-aware service and future-ready monitoring."
            className="mb-14"
          />
        </Reveal>

        <div className="relative">
          {/* Vertical connector line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-blue/30 via-blue/15 to-transparent hidden md:block md:left-8" />

          <div className="space-y-3">
            {layers.map((layer, i) => (
              <Reveal key={layer.label} delay={i * 80}>
                <div className="group relative flex items-stretch gap-5 rounded-lg border border-gray/10 bg-surface/60 p-5 transition-all duration-300 hover:border-blue/20 hover:bg-surface md:ml-14 md:p-6">
                  {/* Layer number */}
                  <div className="absolute -left-8 top-1/2 -translate-y-1/2 hidden md:flex">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full border border-blue/25 bg-background text-[11px] font-mono text-blue">
                      {String(layers.length - i).padStart(2, "0")}
                    </div>
                  </div>

                  <div className="flex-1 space-y-1.5">
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-blue md:hidden">
                        L{layers.length - i}
                      </span>
                      <h3 className="text-[15px] font-medium text-sand">
                        {layer.label}
                      </h3>
                    </div>
                    <p className="text-[13px] leading-relaxed text-gray">
                      {layer.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal delay={500}>
          <div className="mt-10 rounded-lg border border-blue/12 bg-blue/5 px-6 py-4 md:ml-14">
            <p className="text-[13px] leading-relaxed text-gray">
              <span className="font-medium text-sand">Deepvac systems are designed as integrated infrastructure</span> — not assembled from isolated components. Each layer is engineered to work within a coordinated architecture, reducing interface complexity and enabling lifecycle-aware operation.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
