import { Layout } from "@/components/Layout";
import { PageShell } from "@/components/PageShell";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { CapabilitiesSection } from "@/components/home/CapabilitiesSection";
import { ProductPortfolioSection } from "@/components/home/ProductPortfolioSection";
import { ApplicationsSection } from "@/components/home/ApplicationsSection";
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

        {/* Divider */}
        <div className="section-divider" />

        {/* S3: Capabilities Bento */}
        <CapabilitiesSection />

        {/* Divider */}
        <div className="section-divider" />


        {/* S4: Product Portfolio */}

        {/* S6: Applications */}
        <ApplicationsSection />

        {/* Divider */}
        <div className="section-divider" />

        {/* S7: Services */}
        <ServicesSection />

        {/* S8: Why Deepvac */}
        <WhyDeepvacSection />

        {/* Divider */}
        <div className="section-divider" />

        {/* S9: Team */}
        <TeamSection />

        {/* S10: Catalogs */}
        <CataloguesSection />

        {/* S11: References */}
        <ReferencesSection />

        {/* S12: Lead Capture CTA */}
        <LeadCaptureCTA />

        {/* Divider */}
        <div className="section-divider" />

        {/* S13: Contact */}
        <ContactSection />

        {/* S14: Funding */}
        <FundingSection />
      </PageShell>
    </Layout>
  );
};

export default Index;
