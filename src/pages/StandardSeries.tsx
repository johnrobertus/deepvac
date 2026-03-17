import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { PlaceholderImage } from "@/components/PlaceholderImage";

const StandardSeries = () => (
  <Layout>
    <PageShell>
      <PageHero eyebrow="Products — Standard Series" title="Pre-Engineered TVAC Platforms" description="Proven thermal vacuum chamber designs for standard aerospace and research testing requirements." />
      <Section>
        <PlaceholderImage assetId="STD_DETAIL" type="PRODUCT_GALLERY" aspectRatio="16/9" />
      </Section>
    </PageShell>
  </Layout>
);

export default StandardSeries;
