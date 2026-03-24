import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Satellite, FlaskConical, Factory, Microscope, ArrowRight } from "lucide-react";

const applicationAreas = [
  { title: "Aerospace & Space", icon: Satellite, description: "Qualification and validation testing for satellite subsystems, payloads, and mission-critical assemblies." },
  { title: "Research & Development", icon: FlaskConical, description: "Laboratory-scale and development-phase thermal vacuum testing for academic and institutional research programs." },
  { title: "Industrial Applications", icon: Factory, description: "Environmental simulation and process validation for industrial components requiring controlled vacuum and thermal conditions." },
  { title: "Scientific Instrumentation", icon: Microscope, description: "Testing of optical, electronic, and precision instrumentation under representative space or vacuum conditions." },
];

const projectTypes = ["Standard Chamber Delivery", "Custom TVAC Development", "Control System Integration", "Retrofit & Modernization", "Test Campaign Support", "Subsystem Integration"];

const References = () => (
  <Layout>
    <PageShell>
      <PageHero eyebrow="Track Record" title="References & Project Experience" description="Selected project categories and collaboration formats demonstrating Deepvac's engineering scope. Specific references and case studies will be published as they become available." />

      <Section>
        <SectionHeader eyebrow="Industries" title="Application Areas" description="Deepvac develops thermal vacuum systems for customers across these primary application domains." className="mb-14" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {applicationAreas.map((area) => {
            const Icon = area.icon;
            return (
              <div key={area.title} className="bento-card rounded-lg p-6 space-y-4">
                <div className="w-10 h-10 rounded-sm bg-blue/10 border border-blue/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue" />
                </div>
                <h3 className="text-base font-medium text-sand">{area.title}</h3>
                <p className="text-sm text-gray leading-relaxed">{area.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section className="bg-surface/30">
        <SectionHeader eyebrow="Project Scope" title="Types of Engagements" description="Deepvac supports projects across the full lifecycle of thermal vacuum systems." className="mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {projectTypes.map((type) => (
            <div key={type} className="bento-card rounded-lg p-5 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue flex-shrink-0" />
              <span className="text-sm text-sand font-medium">{type}</span>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Collaborations" title="Partners & Customers" description="Logos and references of selected partners and customers will be published as they become available." className="mb-10" />
        <div className="border border-gray/10 rounded-lg p-10 blueprint-grid flex items-center justify-center">
          <div className="text-center space-y-3">
            <div className="flex items-center justify-center gap-6 flex-wrap">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="w-24 h-12 rounded-sm border border-gray/15 flex items-center justify-center">
                  <span className="mono-label text-gray/25">Logo</span>
                </div>
              ))}
            </div>
            <p className="mono-label text-gray/30 pt-4">[PARTNER_LOGOS — Placeholder for future customer and collaborator logos]</p>
          </div>
        </div>
      </Section>

      <Section className="bg-surface/30">
        <SectionHeader eyebrow="Case Studies" title="Selected Project References" description="Detailed case studies will be published as project references become available for public communication." className="mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            { category: "Custom TVAC", summary: "Application-specific chamber development for a demanding test environment with custom feedthrough and instrumentation requirements." },
            { category: "Retrofit Project", summary: "Modernization of an existing thermal vacuum system including control system upgrade, safety improvements, and extended lifecycle support." },
          ].map((study, i) => (
            <div key={i} className="bento-card rounded-lg overflow-hidden">
              <PlaceholderImage assetId={`CASE_${String(i + 1).padStart(2, "0")}`} type="PROJECT" aspectRatio="16/9" className="rounded-none" />
              <div className="p-6 space-y-3">
                <span className="mono-label text-blue">{study.category}</span>
                <h3 className="text-base font-medium text-sand">Reference Project {i + 1}</h3>
                <p className="text-sm text-gray leading-relaxed">{study.summary}</p>
                <span className="flex items-center gap-1.5 text-xs text-gray/40 font-mono">Full case study coming soon <ArrowRight className="w-3 h-3" /></span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="bento-card rounded-lg p-8 md:p-10 text-center space-y-4 max-w-2xl mx-auto">
          <span className="mono-label text-gray/30">Testimonials</span>
          <p className="text-sm text-gray/40 italic max-w-lg mx-auto leading-relaxed">"Customer testimonials and project endorsements will be added as references become available for publication."</p>
          <span className="mono-label text-gray/20">[TESTIMONIAL — Placeholder]</span>
        </div>
      </Section>

      <CTABand title="Discuss Your Project Requirements" description="Whether you're evaluating chamber platforms, planning a custom system, or exploring service and retrofit options — we're ready to discuss your requirements.">
        <Button asChild><Link to="/contact">Request a Technical Consultation</Link></Button>
        <Button asChild variant="outline"><Link to="/products">Explore TVAC Platforms</Link></Button>
      </CTABand>
    </PageShell>
  </Layout>
);

export default References;
