import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Download, FileText } from "lucide-react";
import { useState } from "react";

const categories = ["All", "TVAC", "Service", "Overview", "Custom"] as const;

const documents = [
  { title: "Deepvac Company Overview", description: "General introduction to Deepvac capabilities, product platforms, and engineering services.", tags: ["Overview"], featured: true },
  { title: "T Series TVAC — Product Brochure", description: "Technical overview of the T Series cubic thermal vacuum chamber platform.", tags: ["TVAC"] },
  { title: "C Series TVAC — Product Brochure", description: "Technical overview of the C Series cylindrical thermal vacuum chamber platform.", tags: ["TVAC"] },
  { title: "Custom TVAC Systems", description: "Overview of Deepvac's custom thermal vacuum chamber engineering capabilities.", tags: ["TVAC", "Custom"] },
  { title: "Service Portfolio Overview", description: "Summary of engineering services including testing, retrofit, maintenance, and subsystem integration.", tags: ["Service", "Overview"] },
  { title: "Technical Specifications Template", description: "Reference document for chamber specification discussions and project scoping.", tags: ["TVAC", "Custom"] },
];

const Catalogues = () => {
  const [filter, setFilter] = useState<string>("All");
  const filtered = filter === "All" ? documents : documents.filter((d) => d.tags.includes(filter));

  return (
    <Layout>
      <PageShell>
        <PageHero eyebrow="Technical Documentation" title="Catalogues & Resources" description="Download product brochures, technical overviews, and engineering documentation. Additional spec sheets and data sheets will be published as they become available." />

        <Section>
          <div className="bento-card rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
            <PlaceholderImage assetId="COMPANY_BROCHURE" type="PDF_COVER" aspectRatio="3/4" className="rounded-none h-full" />
            <div className="p-8 lg:p-10 flex flex-col justify-center space-y-5">
              <span className="mono-label text-blue">Featured Document</span>
              <h2 className="text-2xl md:text-3xl font-medium text-sand tracking-tight">Deepvac Company Overview</h2>
              <p className="text-sm text-gray leading-relaxed">A comprehensive introduction to Deepvac's thermal vacuum chamber platforms, engineering services, and technical capabilities. Includes product portfolio overview, service descriptions, and company background.</p>
              <div className="flex flex-wrap gap-2">
                {["Overview", "Products", "Services"].map((tag) => (
                  <span key={tag} className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-blue border border-blue/20 rounded-sm bg-blue/5">{tag}</span>
                ))}
              </div>
              <div className="pt-2">
                <Button><Download className="w-4 h-4 mr-2" />Download PDF</Button>
              </div>
            </div>
          </div>
        </Section>

        <Section className="bg-surface/30">
          <SectionHeader eyebrow="Document Library" title="All Resources" description="Browse and download technical documentation by category." className="mb-10" />
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)} className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm border transition-colors ${filter === cat ? "bg-blue/10 border-blue/40 text-blue" : "border-gray/20 text-gray hover:border-gray/40 hover:text-sand"}`}>{cat}</button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((doc) => (
              <div key={doc.title} className="bento-card rounded-lg overflow-hidden">
                <PlaceholderImage assetId="DOCUMENT" type="PDF_COVER" aspectRatio="3/4" className="rounded-none" />
                <div className="p-5 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {doc.tags.map((tag) => (
                      <span key={tag} className="px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-gray border border-gray/20 rounded-sm">{tag}</span>
                    ))}
                  </div>
                  <h3 className="text-sm font-medium text-sand">{doc.title}</h3>
                  <p className="text-xs text-gray leading-relaxed">{doc.description}</p>
                  <Button variant="tertiary" className="text-xs"><Download className="w-3 h-3 mr-1.5" />Download PDF</Button>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <div className="bento-card rounded-lg p-8 text-center space-y-4">
            <FileText className="w-8 h-8 text-gray/30 mx-auto" />
            <h3 className="text-base font-medium text-sand">More Documentation Coming Soon</h3>
            <p className="text-sm text-gray max-w-lg mx-auto">Additional technical specifications, data sheets, and platform-specific documentation will be published as they become available.</p>
            <Button asChild variant="outline" size="sm"><Link to="/contact">Request Specific Documentation</Link></Button>
          </div>
        </Section>

        <CTABand title="Need Technical Specifications?" description="If you require specific technical data for a project evaluation or procurement process, contact our engineering team directly.">
          <Button asChild><Link to="/contact">Contact Engineering</Link></Button>
        </CTABand>
      </PageShell>
    </Layout>
  );
};

export default Catalogues;
