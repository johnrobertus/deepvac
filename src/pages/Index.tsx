import { Helmet } from "react-helmet-async";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell } from "@/components/PageShell";
import { HeroSection } from "@/components/home/HeroSection";
import { TrustBarSection } from "@/components/home/TrustBarSection";
import { ProductPortfolioSection } from "@/components/home/ProductPortfolioSection";
import { ApplicationsSection } from "@/components/home/ApplicationsSection";
import { ServicesSection } from "@/components/home/ServicesSection";
import { WhyDeepvacSection } from "@/components/home/WhyDeepvacSection";
import { TeamSection } from "@/components/home/TeamSection";
import { CataloguesSection } from "@/components/home/CataloguesSection";
import { ContactSection } from "@/components/home/ContactSection";
import { useLanguage } from "@/components/LanguageProvider";
import { getCanonical, getHreflangs, localizedPath } from "@/lib/routes";

const Index = () => {
  const { t: tSeo } = useTranslation("seo");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const canonical = getCanonical(pathname, lang);
  const hreflangs = getHreflangs(pathname);
  const baseUrl = "https://deepvac.space";

  // Priority destination signals for sitelinks selection
  const priorityPages = [
    { name: "Thermal Vacuum Chambers", url: localizedPath("/products", lang) },
    { name: "Standard Series TVAC", url: localizedPath("/products/standard-series", lang) },
    { name: "Custom Thermal Vacuum Systems", url: localizedPath("/products/custom-tvac", lang) },
    { name: "Engineering Services", url: localizedPath("/services", lang) },
    { name: "Retrofit & Modernization", url: localizedPath("/services/retrofit-modernization", lang) },
    { name: "References", url: localizedPath("/references", lang) },
    { name: "Contact Engineering", url: localizedPath("/contact", lang) },
  ];

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Deepvac",
    alternateName: "Deepvac GmbH",
    url: baseUrl,
    publisher: { "@type": "Organization", name: "Deepvac GmbH", url: baseUrl },
    inLanguage: ["en", "de"],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Deepvac Primary Sections",
    itemListElement: priorityPages.map((p, i) => ({
      "@type": "SiteNavigationElement",
      position: i + 1,
      name: p.name,
      url: `${baseUrl}${p.url}`,
    })),
  };

  const webPageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: tSeo("home.title"),
    description: tSeo("home.description"),
    url: canonical,
    inLanguage: lang,
    isPartOf: { "@type": "WebSite", url: baseUrl, name: "Deepvac" },
  };

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("home.title")}</title>
        <meta name="description" content={tSeo("home.description")} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
        <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(itemListSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(webPageSchema)}</script>
      </Helmet>
      <PageShell className="pt-0">
        <HeroSection />
        <TrustBarSection />
        <div className="section-divider" />
        <ProductPortfolioSection />
        <ApplicationsSection />
        <div className="section-divider" />
        <ServicesSection />
        <WhyDeepvacSection />
        <div className="section-divider" />
        <TeamSection />
        <CataloguesSection />
        <ContactSection />
      </PageShell>
    </Layout>
  );
};

export default Index;
