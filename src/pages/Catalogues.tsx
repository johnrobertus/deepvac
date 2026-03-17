import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { PlaceholderImage } from "@/components/PlaceholderImage";

const Catalogues = () => (
  <Layout>
    <PageShell>
      <PageHero eyebrow="Technical Documentation" title="Catalogues & Brochures" description="Download technical specifications, product catalogues, and engineering documentation." />
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {["Product Catalogue", "Technical Specifications", "Company Brochure"].map((title) => (
            <div key={title} className="bento-card rounded-lg overflow-hidden cursor-pointer">
              <PlaceholderImage assetId="CATALOGUE" type="PDF_PREVIEW" aspectRatio="3/4" className="rounded-none" />
              <div className="p-4">
                <p className="text-sm text-sand font-medium">{title}</p>
                <p className="mono-label mt-1">PDF — Download</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  </Layout>
);

export default Catalogues;
