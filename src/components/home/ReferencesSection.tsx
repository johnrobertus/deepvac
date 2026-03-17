import { SectionHeader } from "@/components/SectionHeader";
import { PlaceholderImage } from "@/components/PlaceholderImage";

export function ReferencesSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface/30">
      <div className="container max-w-6xl">
        <SectionHeader
          eyebrow="Track Record"
          title="Selected References"
          description="Project references and collaborations will be published as they become available."
          className="mb-14"
        />

        {/* Future Logo Strip */}
        <div className="border border-gray/10 rounded-lg p-8 mb-8 flex items-center justify-center">
          <span className="mono-label text-gray/30">
            [CLIENT_LOGOS — Placeholder for future partner and collaborator logos]
          </span>
        </div>

        {/* Case Study Placeholders */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="bento-card rounded-lg overflow-hidden">
              <PlaceholderImage assetId={`CASE_${String(i).padStart(2, "0")}`} type="PROJECT" aspectRatio="16/9" className="rounded-none" />
              <div className="p-5 space-y-2">
                <span className="mono-label text-blue">Case Study</span>
                <h3 className="text-sm font-medium text-sand">Reference Project {i}</h3>
                <p className="text-xs text-gray leading-relaxed">Project details, scope, and outcomes to be published.</p>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial Placeholder */}
        <div className="mt-8 bento-card rounded-lg p-8 text-center space-y-3">
          <p className="text-sm text-gray/50 italic max-w-lg mx-auto">
            "Customer testimonials will be added as project references become available."
          </p>
          <span className="mono-label text-gray/30">[TESTIMONIAL — Placeholder]</span>
        </div>
      </div>
    </section>
  );
}
