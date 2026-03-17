import { Layout } from "@/components/Layout";
import { PageShell } from "@/components/PageShell";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { ProductPortfolioSection } from "@/components/home/ProductPortfolioSection";
import { ApplicationsSection } from "@/components/home/ApplicationsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyDeepvacSection } from "@/components/home/WhyDeepvacSection";
import { TeamSection } from "@/components/home/TeamSection";
import { CataloguesSection } from "@/components/home/CataloguesSection";
import { ReferencesSection } from "@/components/home/ReferencesSection";
import { LeadCaptureCTA } from "@/components/home/LeadCaptureCTA";
import { ContactSection } from "@/components/home/ContactSection";
import { FundingSection } from "@/components/home/FundingSection";

const Index = () => {
  return (
    <Layout>
      <PageShell>
        {/* S1: Hero */}
        <HeroSection />

        {/* S2: Trust Bar */}
        <TrustBarSection />

        {/* S3: Capabilities Bento */}
        <CapabilitiesSection />

        {/* Divider */}
        <div className="section-divider" />

        {/* S4: Product Portfolio */}
        <ProductPortfolioSection />

        {/* S5: Applications */}
        <ApplicationsSection />

        {/* Divider */}
        <div className="section-divider" />

        {/* S6: Services */}
        <ServicesSection />

        {/* S7: Why DEEPVAC */}
        <WhyDeepvacSection />

        {/* Divider */}
        <div className="section-divider" />

        {/* S8: Team */}
        <TeamSection />

        {/* S9: Catalogues */}
        <CataloguesSection />

        {/* S10: References */}
        <ReferencesSection />

        {/* S11: Lead Capture CTA */}
        <LeadCaptureCTA />

        {/* Divider */}
        <div className="section-divider" />

        {/* S12: Contact */}
        <ContactSection />

        {/* S13: Funding */}
        <FundingSection />
      </PageShell>
    </Layout>
  );
};

export default Index;
