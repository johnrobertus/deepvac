import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { PlaceholderImage } from "@/components/PlaceholderImage";

const Team = () => (
  <Layout>
    <PageShell>
      <PageHero eyebrow="Our Team" title="Engineering Expertise" description="A multidisciplinary team of vacuum engineers, physicists, and technical specialists." />
      <Section>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-3">
              <PlaceholderImage assetId={`TEAM_${String(i + 1).padStart(2, '0')}`} type="PORTRAIT" aspectRatio="3/4" />
              <div>
                <p className="text-sm text-sand font-medium">Team Member</p>
                <p className="mono-label">Position Title</p>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  </Layout>
);

export default Team;
