import { SectionHeader } from "@/components/SectionHeader";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { Reveal } from "@/components/Reveal";

export function ReferencesSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface/30">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Track Record"
            title="Selected References"
            description="Project references and collaborations will be published as they become available."
            className="mb-14"
          />
        </Reveal>

        {/* Future Logo Strip */}
        <Reveal delay={100}>
          <div className="border border-gray/10 rounded-lg p-8 mb-8 flex items-center justify-center blueprint-grid">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-6 flex-wrap">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="w-20 h-10 rounded-sm border border-gray/15 flex items-center justify-center">
                    <span className="mono-label text-gray/25">Logo</span>
                  </div>
                ))}
              </div>
              <p className="mono-label text-gray/25 pt-2">
                [PARTNER_LOGOS — Placeholder for future customer and collaborator logos]
              </p>
            </div>
          </div>
        </Reveal>

        {/* Case Study Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <Reveal key={i} delay={i * 100 + 150}>
              <div className="bento-card rounded-lg overflow-hidden h-full">
                <PlaceholderImage assetId={`CASE_${String(i).padStart(2, "0")}`} type="PROJECT" aspectRatio="16/9" className="rounded-none" />
                <div className="p-5 space-y-2">
                  <span className="mono-label text-blue">Case Study</span>
                  <h3 className="text-sm font-medium text-sand">Reference Project {i}</h3>
                  <p className="text-xs text-gray leading-relaxed">Project details, scope, and outcomes to be published.</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Testimonial Placeholder */}
        <Reveal delay={400}>
          <div className="mt-8 bento-card rounded-lg p-8 text-center space-y-3">
            <p className="text-sm text-gray/40 italic max-w-lg mx-auto">
              "Customer testimonials will be added as project references become available."
            </p>
            <span className="mono-label text-gray/20">[TESTIMONIAL — Placeholder]</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
