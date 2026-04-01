import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { TechChip } from "@/components/TechChip";
import { ArrowRight, Maximize, Circle, Thermometer, Gauge, Cpu, Download } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";
import tseriesImg from "@/assets/tseries-chamber.png";
import cseriesImg from "@/assets/cseries-chamber.jpg";

const vacuum = "< 1 × 10⁻⁶ mbar";
const minTemp = "-190 °C";

const tSeriesIcons = [
  <Maximize className="w-4 h-4" />,
  <Thermometer className="w-4 h-4" />,
  <Gauge className="w-4 h-4" />,
  <Cpu className="w-4 h-4" />,
];

const cSeriesIcons = [
  <Circle className="w-4 h-4" />,
  <Thermometer className="w-4 h-4" />,
  <Gauge className="w-4 h-4" />,
  <Cpu className="w-4 h-4" />,
];

const StandardSeries = () => {
  const { t } = useTranslation("products");
  const { t: tSeo } = useTranslation("seo");
  const { t: tc } = useTranslation("common");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  const tFeatures = t("standardSeries.tSeries.features", { returnObjects: true }) as Array<{ label: string; detail: string }>;
  const cFeatures = t("standardSeries.cSeries.features", { returnObjects: true }) as Array<{ label: string; detail: string }>;
  const applications = t("standardSeries.applicationFit.items", { returnObjects: true }) as string[];
  const faqItems = t("standardSeries.faq.items", { returnObjects: true }) as Array<{ q: string; a: string }>;

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("standardSeries.title")}</title>
        <meta name="description" content={tSeo("standardSeries.description")} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
      </Helmet>
      <PageShell>
        <PageHero
          eyebrow={t("standardSeries.eyebrow")}
          title={t("standardSeries.title")}
          description={t("standardSeries.description")}
        >
          <div className="flex flex-wrap gap-3 pt-4">
            <Button asChild size="lg" className="font-mono text-xs tracking-wide">
              <Link to={localizedPath("/contact", lang)}>{tc("buttons.requestTechnicalDetails")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to={localizedPath("/catalogs", lang)}>{tc("buttons.downloadBrochure")}</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 pt-4">
            <TechChip label="Architecture" value="Modular" />
            <TechChip label="Vacuum" value={vacuum} />
            <TechChip label="Min Temp" value={minTemp} />
          </div>
        </PageHero>

        {/* T Series */}
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="relative rounded-lg overflow-hidden border border-gray/10">
                <img src={tseriesImg} alt="Deepvac T Series Cubic Thermal Vacuum Chamber" className="w-full h-auto object-cover" loading="lazy" />
                <div className="absolute top-3 left-3 glass-overlay rounded-md px-3 py-1.5">
                  <span className="mono-label text-blue-light">T Series</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <span className="mono-label text-blue">{t("standardSeries.tSeries.eyebrow")}</span>
                <h2 className="text-3xl md:text-4xl font-medium text-sand mt-2 tracking-tight">{t("standardSeries.tSeries.title")}</h2>
              </div>
              <p className="text-sm text-gray leading-relaxed">{t("standardSeries.tSeries.description")}</p>
              <p className="text-sm text-gray/70 leading-relaxed">
                {t("standardSeries.tSeries.descriptionExtended", { vacuum, minTemp })}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {tFeatures.map((f, i) => (
                  <div key={f.label} className="bento-card rounded-lg p-4 space-y-2">
                    <div className="text-blue">{tSeriesIcons[i]}</div>
                    <h4 className="text-xs font-medium text-sand">{f.label}</h4>
                    <p className="text-[11px] text-gray leading-relaxed">{f.detail.replace("{{vacuum}}", vacuum).replace("{{minTemp}}", minTemp)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <div className="section-divider" />

        {/* C Series */}
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div className="lg:order-2">
              <div className="relative rounded-lg overflow-hidden border border-gray/10">
                <img src={cseriesImg} alt="Deepvac C Series Cylindrical Thermal Vacuum Chamber" className="w-full h-auto object-cover" loading="lazy" />
                <div className="absolute top-3 right-3 glass-overlay rounded-md px-3 py-1.5">
                  <span className="mono-label text-blue-light">C Series</span>
                </div>
              </div>
            </div>
            <div className="space-y-6 lg:order-1">
              <div>
                <span className="mono-label text-blue">{t("standardSeries.cSeries.eyebrow")}</span>
                <h2 className="text-3xl md:text-4xl font-medium text-sand mt-2 tracking-tight">{t("standardSeries.cSeries.title")}</h2>
              </div>
              <p className="text-sm text-gray leading-relaxed">{t("standardSeries.cSeries.description")}</p>
              <p className="text-sm text-gray/70 leading-relaxed">
                {t("standardSeries.cSeries.descriptionExtended", { vacuum, minTemp })}
              </p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {cFeatures.map((f, i) => (
                  <div key={f.label} className="bento-card rounded-lg p-4 space-y-2">
                    <div className="text-blue">{cSeriesIcons[i]}</div>
                    <h4 className="text-xs font-medium text-sand">{f.label}</h4>
                    <p className="text-[11px] text-gray leading-relaxed">{f.detail.replace("{{vacuum}}", vacuum).replace("{{minTemp}}", minTemp)}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <div className="section-divider" />

        {/* Application Fit */}
        <Section className="bg-surface/30">
          <SectionHeader
            eyebrow={t("standardSeries.applicationFit.eyebrow")}
            title={t("standardSeries.applicationFit.title")}
            description={t("standardSeries.applicationFit.description")}
            className="mb-10"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {applications.map((app: string) => (
              <div key={app} className="bento-card rounded-lg p-4 flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue mt-1.5 shrink-0" />
                <span className="text-sm text-sand">{app}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Cross-link Custom */}
        <Section>
          <div className="bento-card rounded-lg p-8 lg:p-10 border-l-2 border-l-blue/60">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
              <div className="space-y-3">
                <span className="mono-label text-blue">{t("standardSeries.beyondStandard.eyebrow")}</span>
                <h3 className="text-xl md:text-2xl font-medium text-sand tracking-tight">{t("standardSeries.beyondStandard.title")}</h3>
                <p className="text-sm text-gray leading-relaxed max-w-xl">{t("standardSeries.beyondStandard.description")}</p>
              </div>
              <Button asChild variant="outline" className="self-start group/btn">
                <Link to={localizedPath("/products/custom-tvac", lang)}>
                  {tc("buttons.exploreCustomTvac")}
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </Section>

        {/* Brochure Download */}
        <Section>
          <div className="bento-card rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-0">
            <div className="relative bg-surface overflow-hidden">
              <img src="/brochures/deepvac-standard-series-cover.jpg" alt="Deepvac Standard Series Catalogue" className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="p-8 lg:p-10 flex flex-col justify-center space-y-4">
              <span className="mono-label text-blue">{t("standardSeries.brochure.eyebrow")}</span>
              <h3 className="text-xl md:text-2xl font-medium text-sand tracking-tight">{t("standardSeries.brochure.title")}</h3>
              <p className="text-sm text-gray leading-relaxed max-w-xl">{t("standardSeries.brochure.description")}</p>
              <div className="pt-2">
                <Button asChild>
                  <a href="/brochures/deepvac-standard-series-catalogue-2026.pdf" target="_blank" rel="noopener noreferrer">
                    <Download className="w-4 h-4 mr-2" />
                    {tc("buttons.downloadPdf")}
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section>
          <SectionHeader eyebrow={t("standardSeries.faq.eyebrow")} title={t("standardSeries.faq.title")} className="mb-10" />
          <Accordion type="single" collapsible className="max-w-3xl">
            {faqItems.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-gray/15">
                <AccordionTrigger className="text-sand text-sm text-left hover:no-underline">{faq.q.replace("{{vacuum}}", vacuum).replace("{{minTemp}}", minTemp)}</AccordionTrigger>
                <AccordionContent className="text-gray text-sm leading-relaxed">{faq.a.replace("{{vacuum}}", vacuum).replace("{{minTemp}}", minTemp)}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>

        <CTABand title={t("standardSeries.cta.title")} description={t("standardSeries.cta.description")}>
          <Button asChild size="lg" className="font-mono text-xs tracking-wide">
            <Link to={localizedPath("/contact", lang)}>{tc("buttons.requestQuote")}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to={localizedPath("/contact", lang)}>{tc("buttons.talkToEngineer")}</Link>
          </Button>
        </CTABand>
      </PageShell>
    </Layout>
  );
};

export default StandardSeries;
