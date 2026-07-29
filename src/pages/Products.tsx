import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Box, Cog, Camera, ClipboardList, Clock } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";
import { buildBreadcrumbJsonLd } from "@/lib/jsonld";
import tseriesImg from "@/assets/product-tseries-chamber-glow.jpg";
import cseriesImg from "@/assets/cseries-chamber.avif";
import customImg from "@/assets/custom-chamber.avif";
import thermalVisionImg from "@/assets/thermal-vision-product.jpg";

const Products = () => {
  const { t } = useTranslation("products");
  const { t: tSeo } = useTranslation("seo");
  const { t: tc } = useTranslation("common");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  const productLines = [
    {
      titleKey: "overview.standardSeries.title",
      subtitleKey: "overview.standardSeries.subtitle",
      descriptionKey: "overview.standardSeries.description",
      image: tseriesImg,
      href: "/products/standard-series",
      ctaKey: "overview.standardSeries.cta",
      icon: <Box className="w-5 h-5" />,
      chipsKey: "overview.standardSeries.chips",
    },
    {
      titleKey: "overview.customTvac.title",
      subtitleKey: "overview.customTvac.subtitle",
      descriptionKey: "overview.customTvac.description",
      image: customImg,
      href: "/products/custom-tvac",
      ctaKey: "overview.customTvac.cta",
      icon: <Cog className="w-5 h-5" />,
      chipsKey: "overview.customTvac.chips",
    },
    {
      titleKey: "overview.thermalVision.title",
      subtitleKey: "overview.thermalVision.subtitle",
      descriptionKey: "overview.thermalVision.description",
      image: thermalVisionImg,
      href: "/products/thermal-vision",
      ctaKey: "overview.thermalVision.cta",
      icon: <Camera className="w-5 h-5" />,
      chipsKey: "overview.thermalVision.chips",
    },
  ];

  const factors = t("overview.configGuide.factors", { returnObjects: true }) as Array<{ label: string; standard: string; custom: string }>;
  const faqItems = t("overview.faq.items", { returnObjects: true }) as Array<{ q: string; a: string }>;

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [{ name: t("overview.title") as string, enPath: "/products" }],
    lang,
  );

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("products.title")}</title>
        <meta name="description" content={tSeo("products.description")} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
        <script type="application/ld+json">{JSON.stringify(faqJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>
      <PageShell>
        <PageHero
          eyebrow={t("overview.eyebrow")}
          title={t("overview.title")}
          description={t("overview.description")}
        >
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-4">
            <Button asChild size="lg" className="font-mono text-xs tracking-wide w-full sm:w-auto">
              <Link to={localizedPath("/contact", lang)}>{tc("buttons.requestConsultation")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-mono text-xs tracking-wide w-full sm:w-auto">
              <Link to={localizedPath("/catalogs", lang)}>{tc("buttons.downloadProductOverview")}</Link>
            </Button>
          </div>
        </PageHero>

        {/* Product Lines */}
        <Section>
          <div className="space-y-8">
            {productLines.map((product, i) => {
              const chips = t(product.chipsKey, { returnObjects: true }) as string[];
              return (
                <div key={product.titleKey} className="bento-card rounded-lg overflow-hidden group">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className={`relative overflow-hidden bg-surface/40 h-[280px] lg:h-[420px] ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                      <img
                        src={product.image}
                        alt={`Deepvac ${t(product.titleKey)}`}
                        className="w-full h-full object-contain p-6 lg:p-8 transition-transform duration-500 group-hover:scale-[1.02]"
                        loading="lazy"
                      />
                      <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                        {chips.map((chip: string) => (
                          <span key={chip} className="glass-overlay rounded-sm px-2 py-1 font-mono text-[11px] uppercase tracking-widest text-blue-light/80">
                            {chip}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className={`p-8 lg:p-10 flex flex-col justify-center space-y-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                      <div className="text-blue">{product.icon}</div>
                      <div>
                        <span className="mono-label text-blue">{t(product.subtitleKey)}</span>
                        <h2 className="text-2xl md:text-3xl font-medium text-sand mt-2 tracking-tight">{t(product.titleKey)}</h2>
                      </div>
                      <p className="text-body">{t(product.descriptionKey)}</p>
                      <Button asChild variant="outline" className="self-start group/btn">
                        <Link to={localizedPath(product.href, lang)}>
                          {t(product.ctaKey)}
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <p className="mt-8 text-[13px] text-gray">
            <Link
              to={localizedPath("/products/options", lang)}
              className="inline-flex items-center gap-1 text-blue hover:text-sand underline underline-offset-4 transition-colors"
            >
              {tc("buttons.browseOptions")}
              <ArrowRight className="w-3 h-3" aria-hidden="true" />
            </Link>
          </p>
        </Section>

        <div className="section-divider" />

        {/* Decision Support */}
        <Section>
          <SectionHeader
            eyebrow={t("overview.configGuide.eyebrow")}
            title={t("overview.configGuide.title")}
            description={t("overview.configGuide.description")}
            className="mb-12"
          />
          {/* Desktop: table layout */}
          <div className="bento-card rounded-lg overflow-hidden hidden md:block">
            <div className="grid grid-cols-3 border-b border-gray/15">
              <div className="p-4 mono-label text-gray">{t("overview.configGuide.headers.requirement")}</div>
              <div className="p-4 mono-label text-blue border-l border-gray/15">{t("overview.configGuide.headers.standard")}</div>
              <div className="p-4 mono-label text-blue border-l border-gray/15">{t("overview.configGuide.headers.custom")}</div>
            </div>
            {factors.map((row) => (
              <div key={row.label} className="grid grid-cols-3 border-b border-gray/10 last:border-b-0">
                <div className="p-4 text-sm font-medium text-sand">{row.label}</div>
                <div className="p-4 text-card-meta border-l border-gray/10">{row.standard}</div>
                <div className="p-4 text-card-meta border-l border-gray/10">{row.custom}</div>
              </div>
            ))}
          </div>
          {/* Mobile: stacked cards */}
          <div className="space-y-4 md:hidden">
            {factors.map((row) => (
              <div key={row.label} className="bento-card rounded-lg p-4 space-y-3">
                <h3 className="text-sm font-medium text-sand">{row.label}</h3>
                <div className="space-y-2">
                  <div>
                    <span className="mono-label text-blue">{t("overview.configGuide.headers.standard")}</span>
                    <p className="text-card-meta mt-1">{row.standard}</p>
                  </div>
                  <div>
                    <span className="mono-label text-blue">{t("overview.configGuide.headers.custom")}</span>
                    <p className="text-card-meta mt-1">{row.custom}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Cross-link to Services */}
        <Section className="bg-surface/30">
          <SectionHeader
            eyebrow={t("overview.integrated.eyebrow")}
            title={t("overview.integrated.title")}
            description={t("overview.integrated.description")}
            className="mb-8"
          />
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="outline">
              <Link to={localizedPath("/services", lang)}>{tc("buttons.exploreServices")} <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
            </Button>
            <Button asChild variant="tertiary">
              <Link to={localizedPath("/contact", lang)}>{tc("buttons.talkToEngineer")}</Link>
            </Button>
          </div>
        </Section>

        {/* FAQ */}
        <Section>
          <SectionHeader eyebrow={t("overview.faq.eyebrow")} title={t("overview.faq.title")} className="mb-10" />
          <Accordion type="single" collapsible className="max-w-3xl">
            {faqItems.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-gray/15">
                <AccordionTrigger className="text-sand text-[15px] md:text-base text-left hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-sand/85 text-[15px] md:text-base leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>

        <CTABand
          title={t("overview.cta.title")}
          description={t("overview.cta.description")}
        >
          <Button asChild size="lg" className="font-mono text-xs tracking-wide">
            <Link to={localizedPath("/tvac-questionnaire", lang)}>
              <ClipboardList className="w-4 h-4 mr-2" />
              {tc("cta.questionnaire.configure")}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-mono text-xs tracking-wide">
            <Link to={localizedPath("/contact", lang)}>{tc("buttons.requestQuote")}</Link>
          </Button>
          <Button asChild variant="ghost" size="lg" className="font-mono text-xs tracking-wide text-gray hover:text-sand">
            <Link to={localizedPath("/contact", lang)}>{tc("buttons.talkToEngineer")}</Link>
          </Button>
        </CTABand>
        <p className="container mx-auto px-6 -mt-6 mb-12 flex items-start gap-1.5 text-[13px] text-gray/85 leading-relaxed font-mono max-w-2xl">
          <Clock className="w-3 h-3 mt-0.5 text-blue/60 shrink-0" />
          <span>{tc("cta.questionnaire.microcopy")}</span>
        </p>
      </PageShell>
    </Layout>
  );
};

export default Products;
