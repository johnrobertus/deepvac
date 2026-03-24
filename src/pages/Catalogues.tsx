import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Download, FileText } from "lucide-react";
import { useState } from "react";
import { brochures, type Brochure } from "@/lib/brochures";

const categories = ["All", "TVAC", "Standard Series", "Custom", "Service", "Overview"] as const;

const placeholderDocs: Brochure[] = [
  {
    id: "custom-tvac",
    title: "Custom TVAC Systems",
    description: "Overview of Deepvac custom thermal vacuum chamber engineering capabilities.",
    tags: ["TVAC", "Custom"],
    pdfUrl: "",
    coverUrl: "",
  },
  {
    id: "service-portfolio",
    title: "Service Portfolio Overview",
    description: "Summary of engineering services including testing, retrofit, maintenance, and subsystem integration.",
    tags: ["Service", "Overview"],
    pdfUrl: "",
    coverUrl: "",
  },
];

const allDocuments = [...brochures, ...placeholderDocs];

const Catalogues = () => {
  const [filter, setFilter] = useState<string>("All");
  const featured = brochures.find((b) => b.featured);
  const filtered = filter === "All" ? allDocuments : allDocuments.filter((d) => d.tags.includes(filter));

  return (
    <Layout>
      <PageShell>
        <PageHero
          eyebrow="Technical Documentation"
          title="Catalogues & Resources"
          description="Download product brochures, technical overviews, and engineering documentation. Additional spec sheets and data sheets will be published as they become available."
        />

        {/* Featured Brochure */}
        {featured && (
          <Section>
            <div className="bento-card rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
              <div className="relative bg-surface overflow-hidden">
                <img
                  src={featured.coverUrl}
                  alt={featured.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center space-y-5">
                <span className="mono-label text-blue">Featured Brochure</span>
                <h2 className="text-2xl md:text-3xl font-medium text-sand tracking-tight">{featured.title}</h2>
                {featured.subtitle && (
                  <p className="text-sm text-blue/80 font-mono uppercase tracking-wider">{featured.subtitle}</p>
                )}
                <p className="text-sm text-gray leading-relaxed">{featured.description}</p>
                <div className="flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-blue border border-blue/20 rounded-sm bg-blue/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="pt-2">
                  <Button asChild>
                    <a href={featured.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Section>
        )}

        {/* Document Library */}
        <Section className="bg-surface/30">
          <SectionHeader
            eyebrow="Document Library"
            title="All Resources"
            description="Browse and download technical documentation by category."
            className="mb-10"
          />
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm border transition-colors ${
                  filter === cat
                    ? "bg-blue/10 border-blue/40 text-blue"
                    : "border-gray/20 text-gray hover:border-gray/40 hover:text-sand"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((doc) => (
              <BrochureCard key={doc.id} doc={doc} />
            ))}
          </div>
        </Section>

        {/* Coming Soon */}
        <Section>
          <div className="bento-card rounded-lg p-8 text-center space-y-4">
            <FileText className="w-8 h-8 text-gray/30 mx-auto" />
            <h3 className="text-base font-medium text-sand">More Documentation Coming Soon</h3>
            <p className="text-sm text-gray max-w-lg mx-auto">
              Additional technical specifications, data sheets, and platform-specific documentation will be published as
              they become available.
            </p>
            <Button asChild variant="outline" size="sm">
              <Link to="/contact">Request Specific Documentation</Link>
            </Button>
          </div>
        </Section>

        <CTABand
          title="Need Technical Specifications?"
          description="If you require specific technical data for a project evaluation or procurement process, contact our engineering team directly."
        >
          <Button asChild>
            <Link to="/contact">Contact Engineering</Link>
          </Button>
        </CTABand>
      </PageShell>
    </Layout>
  );
};

function BrochureCard({ doc }: { doc: Brochure }) {
  const hasFile = Boolean(doc.pdfUrl);

  return (
    <div className="bento-card rounded-lg overflow-hidden flex flex-col">
      {doc.coverUrl ? (
        <div className="relative bg-surface overflow-hidden" style={{ aspectRatio: "3/4" }}>
          <img src={doc.coverUrl} alt={doc.title} className="w-full h-full object-cover" loading="lazy" />
        </div>
      ) : (
        <div
          className="relative w-full overflow-hidden bg-surface blueprint-grid flex items-center justify-center"
          style={{ aspectRatio: "3/4" }}
        >
          <FileText className="w-10 h-10 text-gray/20" />
          <span className="absolute bottom-2 right-3 font-mono text-[10px] uppercase tracking-widest text-gray/40">
            Coming Soon
          </span>
        </div>
      )}
      <div className="p-5 space-y-3 flex-1 flex flex-col">
        <div className="flex flex-wrap gap-1.5">
          {doc.tags.map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-gray border border-gray/20 rounded-sm"
            >
              {tag}
            </span>
          ))}
        </div>
        <h3 className="text-sm font-medium text-sand">{doc.title}</h3>
        <p className="text-xs text-gray leading-relaxed flex-1">{doc.description}</p>
        {hasFile ? (
          <Button asChild variant="tertiary" className="text-xs self-start">
            <a href={doc.pdfUrl} target="_blank" rel="noopener noreferrer">
              <Download className="w-3 h-3 mr-1.5" />
              Download PDF
            </a>
          </Button>
        ) : (
          <span className="text-xs text-gray/50 font-mono">Available soon</span>
        )}
      </div>
    </div>
  );
}

export default resources;
