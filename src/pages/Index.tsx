import { Layout } from "@/components/Layout";
import { PageShell } from "@/components/PageShell";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { USPBlock } from "@/components/home/USPBlock";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { ProductPortfolioSection } from "@/components/home/ProductPortfolioSection";
import { SystemArchitectureSection } from "@/components/home/SystemArchitectureSection";
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
      <PageShell className="pt-0">
        {/* S1: Hero */}
        <HeroSection />

        {/* S2: Trust Bar */}
        <TrustBarSection />

        {/* S3: USP Positioning Block */}
        <USPBlock />

        {/* Divider */}
        <div className="section-divider" />

        {/* S4: Capabilities Bento */}
        <CapabilitiesSection />

        {/* Divider */}
        <div className="section-divider" />

        {/* S5: Product Portfolio */}
        <ProductPortfolioSection />

        {/* S6: System Architecture */}
        <SystemArchitectureSection />

        {/* S7: Applications */}
        <ApplicationsSection />

        {/* Divider */}
        <div className="section-divider" />

        {/* S8: Services */}
        <ServicesSection />

        {/* S9: Why Deepvac */}
        <WhyDeepvacSection />

        {/* Divider */}
        <div className="section-divider" />

        {/* S10: Team */}
        <TeamSection />

        {/* S11: Catalogs */}
        <CataloguesSection />

        {/* S12: References */}
        <ReferencesSection />

        {/* S13: Lead Capture CTA */}
        <LeadCaptureCTA />

        {/* Divider */}
        <div className="section-divider" />

        {/* S14: Contact */}
        <ContactSection />

        {/* S15: Funding */}
        <FundingSection />
      </PageShell>
    </Layout>
  );
};

export default Index;
