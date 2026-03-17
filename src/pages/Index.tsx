import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import { SectionHeader } from "@/components/SectionHeader";
import { Crosshair, Gauge, Thermometer, Box, Wrench, Shield } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      <PageShell>
        {/* Hero */}
        <PageHero
          eyebrow="Precision Vacuum Engineering"
          title="Thermal Vacuum Chambers. Engineered in Germany."
          description="DEEPVAC develops advanced thermal vacuum systems for aerospace simulation, environmental testing, and research applications."
        >
          <div className="flex flex-wrap gap-4 pt-4">
            <Button asChild size="lg" className="font-mono text-xs tracking-wide">
              <Link to="/contact">Request Technical Consultation</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/products">Explore Products</Link>
            </Button>
          </div>
        </PageHero>

        {/* Hero Image */}
        <Section>
          <PlaceholderImage assetId="HERO_01" type="CHAMBER_RENDER" aspectRatio="21/9" />
        </Section>

        {/* Trust Bar */}
        <div className="border-y border-gray/10 py-8 px-6">
          <div className="container max-w-6xl flex flex-wrap items-center justify-center gap-8 md:gap-16">
            {["Aerospace", "Research", "Industrial", "Defense", "Space Simulation"].map((item) => (
              <span key={item} className="mono-label text-gray/50">{item}</span>
            ))}
          </div>
        </div>

        {/* Capabilities Bento */}
        <Section>
          <SectionHeader
            eyebrow="Capabilities"
            title="Engineering Excellence at Every Scale"
            description="From standard chamber platforms to fully custom thermal vacuum solutions."
            className="mb-12"
          />
          <BentoGrid>
            <BentoCard span="2x1" className="flex flex-col justify-between gap-6">
              <div className="flex items-start gap-4">
                <Crosshair className="w-6 h-6 text-blue flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-medium text-sand">Standard Series Chambers</h3>
                  <p className="text-sm text-gray mt-1">Pre-engineered TVAC platforms for proven performance and rapid deployment.</p>
                </div>
              </div>
              <PlaceholderImage assetId="STD_01" type="PRODUCT" aspectRatio="16/7" />
            </BentoCard>
            <BentoCard>
              <Gauge className="w-6 h-6 text-blue mb-4" />
              <h3 className="text-base font-medium text-sand">Control Systems</h3>
              <p className="text-sm text-gray mt-2">Advanced automation and monitoring for precision test environments.</p>
            </BentoCard>
            <BentoCard>
              <Thermometer className="w-6 h-6 text-blue mb-4" />
              <h3 className="text-base font-medium text-sand">Testing Services</h3>
              <p className="text-sm text-gray mt-2">Thermal vacuum testing executed with engineering rigor.</p>
            </BentoCard>
            <BentoCard>
              <Box className="w-6 h-6 text-blue mb-4" />
              <h3 className="text-base font-medium text-sand">Custom TVAC</h3>
              <p className="text-sm text-gray mt-2">Bespoke chamber design for unique mission requirements.</p>
            </BentoCard>
            <BentoCard>
              <Wrench className="w-6 h-6 text-blue mb-4" />
              <h3 className="text-base font-medium text-sand">Retrofit & Maintenance</h3>
              <p className="text-sm text-gray mt-2">Modernisation, repair, and lifecycle extension of existing systems.</p>
            </BentoCard>
          </BentoGrid>
        </Section>

        {/* CTA */}
        <CTABand
          title="Start Your Next TVAC Project"
          description="Speak directly with our engineering team about your thermal vacuum requirements."
        >
          <Button asChild size="lg" className="font-mono text-xs tracking-wide">
            <Link to="/contact">Get in Touch</Link>
          </Button>
        </CTABand>
      </PageShell>
    </Layout>
  );
};

export default Index;
