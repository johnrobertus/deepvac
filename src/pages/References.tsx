import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { PlaceholderImage } from "@/components/PlaceholderImage";

const References = () => (
  <Layout>
    <PageShell>
      <PageHero eyebrow="Track Record" title="References & Case Studies" description="Selected projects demonstrating DEEPVAC engineering capabilities." />
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="bento-card rounded-lg overflow-hidden">
              <PlaceholderImage assetId={`REF_${String(i + 1).padStart(2, '0')}`} type="CASE_STUDY" aspectRatio="16/9" className="rounded-none" />
              <div className="p-5 space-y-2">
                <span className="mono-label text-blue">Case Study</span>
                <h3 className="text-base font-medium text-sand">Reference Project {i + 1}</h3>
                <p className="text-sm text-gray">Project description placeholder. Technical details and outcomes to follow.</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  </Layout>
);

export default References;
