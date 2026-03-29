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
            </div>

            <div className="space-y-1">
              <h2 className="text-sand text-base font-medium">Represented by the Managing Director</h2>
              <p>John Robertus</p>
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
              <p>Phone: +49 157 830 270 99</p>
              <p>Email: info@deepvac.space</p>
            </div>

            <div className="space-y-1">
              <h2 className="text-sand text-base font-medium">Commercial Register</h2>
              <p>Register court: Amtsgericht Hannover</p>
              <p>Registration number: HRB 230263</p>
            </div>
          </div>
        </Section>
      </PageShell>
    </Layout>
  );
}
