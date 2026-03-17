import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";

const Careers = () => (
  <Layout>
    <PageShell>
      <PageHero eyebrow="Join Us" title="Careers at DEEPVAC" description="Build the future of thermal vacuum engineering with a team of specialists." />
      <Section>
        <div className="space-y-4">
          {["Mechanical Engineer", "Controls Engineer", "Project Manager"].map((role) => (
            <div key={role} className="bento-card rounded-lg p-5 flex items-center justify-between">
              <div>
                <h3 className="text-base font-medium text-sand">{role}</h3>
                <p className="mono-label mt-1">Full-time — Germany</p>
              </div>
              <span className="mono-label text-blue">View →</span>
            </div>
          ))}
        </div>
      </Section>
    </PageShell>
  </Layout>
);

export default Careers;
