import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";

export default function Imprint() {
  return (
    <Layout>
      <PageShell>
        <PageHero eyebrow="Legal" title="Imprint" />
        <Section>
          <div className="max-w-3xl space-y-8 text-gray text-sm leading-relaxed">
            <div className="space-y-1">
              <p className="text-sand font-medium text-base">Deepvac GmbH</p>
              <p>Represented by the Managing Director John Robertus</p>
            </div>

            <div className="space-y-1">
              <h2 className="text-sand text-base font-medium">Registered office</h2>
              <p>Hanover, Germany</p>
            </div>

            <div className="space-y-1">
              <h2 className="text-sand text-base font-medium">Business address</h2>
              <p>An der Universität 1</p>
              <p>30823 Garbsen</p>
              <p>Germany</p>
            </div>

            <div className="space-y-1">
              <h2 className="text-sand text-base font-medium">Contact</h2>
              <p>Phone: +49 157 83027099</p>
              <p>Email: info@deepvac.space</p>
            </div>

            <div className="space-y-1">
              <h2 className="text-sand text-base font-medium">Commercial Register</h2>
              <p>Amtsgericht Hannover</p>
              <p>HRB 230263</p>
            </div>

            <div className="space-y-1">
              <h2 className="text-sand text-base font-medium">Share Capital</h2>
              <p>EUR 25,000.00</p>
            </div>
          </div>
        </Section>
      </PageShell>
    </Layout>
  );
}
