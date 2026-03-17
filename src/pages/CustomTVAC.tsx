import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { PlaceholderImage } from "@/components/PlaceholderImage";

const CustomTVAC = () => (
  <Layout>
    <PageShell>
      <PageHero eyebrow="Products — Custom TVAC" title="Bespoke Chamber Engineering" description="Custom thermal vacuum systems designed and manufactured to your exact specifications." />
      <Section>
        <PlaceholderImage assetId="CUSTOM_DETAIL" type="ENGINEERING_RENDER" aspectRatio="16/9" />
      </Section>
    </PageShell>
  </Layout>
);

export default CustomTVAC;
