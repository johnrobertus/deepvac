import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { ProductCard } from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Products = () => (
  <Layout>
    <PageShell>
      <PageHero
        eyebrow="Product Range"
        title="Thermal Vacuum Chamber Platforms"
        description="Explore our standard series and custom-engineered TVAC systems for aerospace and research applications."
      />
      <Section>
        <SectionHeader eyebrow="Standard & Custom" title="Chamber Systems" className="mb-12" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <ProductCard title="Standard Series" subtitle="Pre-configured TVAC platforms for established test requirements." assetId="STD_SERIES" />
          <ProductCard title="Custom TVAC" subtitle="Fully bespoke chamber design for unique mission profiles." assetId="CUSTOM_TVAC" />
        </div>
        <div className="mt-12 text-center">
          <Button asChild variant="outline"><Link to="/contact">Discuss Your Requirements</Link></Button>
        </div>
      </Section>
    </PageShell>
  </Layout>
);

export default Products;
