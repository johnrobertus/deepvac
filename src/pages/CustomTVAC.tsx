import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import { Button } from "@/components/ui/button";
import { TechChip } from "@/components/TechChip";
import {
  ArrowRight, Ruler, Thermometer, Gauge, Cpu, Cable, FlaskConical, Settings,
  MessageSquare, FileCheck, Truck, Wrench,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";
import customImg from "@/assets/custom-chamber.jpg";

const driverIcons = [
  <Ruler className="w-5 h-5" />,
  <Thermometer className="w-5 h-5" />,
  <Cable className="w-5 h-5" />,
  <FlaskConical className="w-5 h-5" />,
  <Cpu className="w-5 h-5" />,
  <Settings className="w-5 h-5" />,
];

const stepIcons = [
  <MessageSquare className="w-5 h-5" />,
  <Settings className="w-5 h-5" />,
  <FileCheck className="w-5 h-5" />,
  <Wrench className="w-5 h-5" />,
  <Truck className="w-5 h-5" />,
];

const CustomTVAC = () => {
  const { t } = useTranslation("products");
  const { t: tSeo } = useTranslation("seo");
  const { t: tc } = useTranslation("common");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  const drivers = t("customTvac.projectDrivers.items", { returnObjects: true }) as Array<{ title: string; description: string }>;
  const configDims = t("customTvac.configDimensions.items", { returnObjects: true }) as Array<{ label: string; items: string[] }>;
  const steps = t("customTvac.process.steps", { returnObjects: true }) as Array<{ step: string; title: string; description: string }>;
  const faqItems = t("customTvac.faq.items", { returnObjects: true }) as Array<{ q: string; a: string }>;

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("customTvac.title")}</title>
        <meta name="description" content={tSeo("customTvac.description")} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
      </Helmet>
      <PageShell>
        <PageHero
          eyebrow={t("customTvac.eyebrow")}
          title={t("customTvac.title")}
          description={t("customTvac.description")}
        >
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-4">
            <Button asChild size="lg" className="font-mono text-xs tracking-wide w-full sm:w-auto">
              <Link to={localizedPath("/contact", lang)}>{tc("buttons.discussConfiguration")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link to={localizedPath("/contact", lang)}>{tc("buttons.requestQuote")}</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 pt-4">
            <TechChip label={t("customTvac.techChips.engineering.label")} value={t("customTvac.techChips.engineering.value")} />
            <TechChip label={t("customTvac.techChips.integration.label")} value={t("customTvac.techChips.integration.value")} />
            <TechChip label={t("customTvac.techChips.support.label")} value={t("customTvac.techChips.support.value")} />
          </div>
        </PageHero>

        {/* Hero Image */}
        <Section>
          <div className="rounded-lg overflow-hidden border border-gray/10">
            <img src={customImg} alt="Deepvac Custom Thermal Vacuum Chamber System" className="w-full h-auto object-contain max-h-[1000px]" loading="lazy" />
          </div>
          <p className="mt-3 font-mono text-xs text-gray text-center">{t("customTvac.heroCaption")}</p>
        </Section>

        <div className="section-divider" />

        {/* When Custom */}
        <Section>
          <SectionHeader
            eyebrow={t("customTvac.projectDrivers.eyebrow")}
            title={t("customTvac.projectDrivers.title")}
            description={t("customTvac.projectDrivers.description")}
            className="mb-12"
          />
          <BentoGrid className="lg:grid-cols-3">
            {drivers.map((driver, i) => (
              <BentoCard key={driver.title} className="flex flex-col gap-4">
                <div className="text-blue">{driverIcons[i]}</div>
                <h3 className="text-base font-medium text-sand">{driver.title}</h3>
                <p className="text-xs text-gray leading-relaxed">{driver.description}</p>
              </BentoCard>
            ))}
          </BentoGrid>
        </Section>

        {/* Mid-page CTA */}
        <CTABand title={t("customTvac.midCta.title")} description={t("customTvac.midCta.description")}>
          <Button asChild size="lg" className="font-mono text-xs tracking-wide">
            <Link to={localizedPath("/contact", lang)}>{tc("buttons.requestConsultation")}</Link>
          </Button>
        </CTABand>

        {/* Configurable Dimensions */}
        <Section>
          <SectionHeader
            eyebrow={t("customTvac.configDimensions.eyebrow")}
            title={t("customTvac.configDimensions.title")}
            description={t("customTvac.configDimensions.description")}
            className="mb-12"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {configDims.map((dim) => (
              <div key={dim.label} className="bento-card rounded-lg p-6 space-y-4">
                <h3 className="text-base font-medium text-sand">{dim.label}</h3>
                <ul className="space-y-2">
                  {dim.items.map((item: string) => (
                    <li key={item} className="flex items-start gap-2 text-xs text-gray leading-relaxed">
                      <span className="w-1 h-1 rounded-full bg-blue mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        <div className="section-divider" />

        {/* Process */}
        <Section className="bg-surface/30">
          <SectionHeader
            eyebrow={t("customTvac.process.eyebrow")}
            title={t("customTvac.process.title")}
            description={t("customTvac.process.description")}
            className="mb-12"
          />
          <div className="space-y-4">
            {steps.map((step, i) => (
              <div key={step.step} className="bento-card rounded-lg p-6 flex items-start gap-6 group">
                <div className="shrink-0 w-12 h-12 rounded-lg bg-surface-raised border border-gray/15 flex items-center justify-center">
                  <span className="font-mono text-sm text-blue">{step.step}</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="text-blue">{stepIcons[i]}</div>
                    <h3 className="text-base font-medium text-sand">{step.title}</h3>
                  </div>
                  <p className="text-xs text-gray leading-relaxed">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* Cross-links */}
        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bento-card rounded-lg p-6 border-l-2 border-l-blue/60 space-y-4">
              <span className="mono-label text-blue">{t("customTvac.crossLinks.relatedProducts")}</span>
              <h3 className="text-lg font-medium text-sand">{t("customTvac.crossLinks.standardSeriesTitle")}</h3>
              <p className="text-xs text-gray leading-relaxed">{t("customTvac.crossLinks.standardSeriesDescription")}</p>
              <Button asChild variant="tertiary" className="self-start">
                <Link to={localizedPath("/products/standard-series", lang)}>
                  {tc("buttons.viewStandardSeries")} <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="bento-card rounded-lg p-6 border-l-2 border-l-blue/60 space-y-4">
              <span className="mono-label text-blue">{t("customTvac.crossLinks.engineeringServices")}</span>
              <h3 className="text-lg font-medium text-sand">{t("customTvac.crossLinks.engineeringServicesTitle")}</h3>
              <p className="text-xs text-gray leading-relaxed">{t("customTvac.crossLinks.engineeringServicesDescription")}</p>
              <Button asChild variant="tertiary" className="self-start">
                <Link to={localizedPath("/services", lang)}>
                  {tc("buttons.exploreServices")} <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section>
          <SectionHeader eyebrow={t("customTvac.faq.eyebrow")} title={t("customTvac.faq.title")} className="mb-10" />
          <Accordion type="single" collapsible className="max-w-3xl">
            {faqItems.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-gray/15">
                <AccordionTrigger className="text-sand text-sm text-left hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-gray text-sm leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>

        <CTABand title={t("customTvac.cta.title")} description={t("customTvac.cta.description")}>
          <Button asChild size="lg" className="font-mono text-xs tracking-wide">
            <Link to={localizedPath("/contact", lang)}>{tc("buttons.requestConsultation")}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to={localizedPath("/contact", lang)}>{tc("buttons.requestQuote")}</Link>
          </Button>
        </CTABand>
      </PageShell>
    </Layout>
  );
};

export default CustomTVAC;
