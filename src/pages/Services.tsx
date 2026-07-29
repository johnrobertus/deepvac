import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Thermometer, Gauge, Settings, RefreshCw, Wrench, Box, ClipboardList, Clock } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";
import { buildBreadcrumbJsonLd } from "@/lib/jsonld";

const serviceIcons = [
  <Thermometer className="w-6 h-6" />,
  <Gauge className="w-6 h-6" />,
  <Settings className="w-6 h-6" />,
  <RefreshCw className="w-6 h-6" />,
  <Wrench className="w-6 h-6" />,
  <Box className="w-6 h-6" />,
];

const serviceHrefs = [
  "/services/testing-services",
  "/services/control-systems-design",
  "/services/mechanical-design",
  "/services/retrofit-modernization",
  "/services/maintenance-repair",
  "/services/subsystem-integration",
];

const Services = () => {
  const { t } = useTranslation("services");
  const { t: tSeo } = useTranslation("seo");
  const { t: tc } = useTranslation("common");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  const serviceItems = t("overview.items", { returnObjects: true }) as Array<{
    title: string; description: string; deliverables: string[];
  }>;
  const faqItems = t("overview.faq.items", { returnObjects: true }) as Array<{ q: string; a: string }>;

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [{ name: t("overview.title") as string, enPath: "/services" }],
    lang,
  );

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("services.title")}</title>
        <meta name="description" content={tSeo("services.description")} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
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
              <Link to={localizedPath("/contact", lang)}>{tc("buttons.discussRequirements")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-mono text-xs tracking-wide w-full sm:w-auto">
              <Link to={localizedPath("/products", lang)}>{tc("buttons.exploreChamberProducts")}</Link>
            </Button>
          </div>
        </PageHero>

        {/* Service Cards */}
        <Section>
          <div className="space-y-6">
            {serviceItems.map((s, i) => (
              <div key={s.title} className="bento-card rounded-lg overflow-hidden group">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-0">
                  <div className="p-8 lg:p-10 space-y-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-lg bg-surface-raised border border-gray/15 flex items-center justify-center text-blue">
                        {serviceIcons[i]}
                      </div>
                      <div>
                        <span className="mono-label text-blue">{t("overview.serviceLabel")}</span>
                        <h2 className="text-card-title-lg md:text-2xl">{s.title}</h2>
                      </div>
                    </div>
                    <p className="text-body max-w-2xl">{s.description}</p>
                    <Button asChild variant="outline" className="self-start group/btn">
                      <Link to={localizedPath(serviceHrefs[i], lang)}>
                        {tc("buttons.learnMore")}
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                  <div className="border-l border-gray/10 p-8 bg-surface-raised/30 flex flex-col justify-center">
                    <span className="mono-label mb-3">{t("overview.keyDeliverables")}</span>
                    <ul className="space-y-2.5">
                      {s.deliverables.map((d: string) => (
                        <li key={d} className="flex items-start gap-2 text-card-meta">
                          <span className="w-1 h-1 rounded-full bg-blue mt-1.5 shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <div className="section-divider" />

        {/* Cross-link Products */}
        <Section className="bg-surface/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-4">
              <SectionHeader
                eyebrow={t("overview.integrated.eyebrow")}
                title={t("overview.integrated.title")}
                description={t("overview.integrated.description")}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild variant="outline" className="group/btn">
                <Link to={localizedPath("/products/standard-series", lang)}>Standard Series <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" /></Link>
              </Button>
              <Button asChild variant="outline" className="group/btn">
                <Link to={localizedPath("/products/custom-tvac", lang)}>Custom TVAC <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" /></Link>
              </Button>
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section>
          <SectionHeader eyebrow={t("overview.faq.eyebrow")} title={t("overview.faq.title")} className="mb-10" />
          <Accordion type="single" collapsible className="max-w-3xl">
            {faqItems.map((faq, i) => (
              <AccordionItem key={i} value={`faq-${i}`} className="border-gray/15">
                <AccordionTrigger className="text-sand text-sm text-left hover:no-underline">{faq.q}</AccordionTrigger>
                <AccordionContent className="text-gray text-sm leading-relaxed">{faq.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </Section>

        <CTABand title={t("overview.cta.title")} description={t("overview.cta.description")}>
          <Button asChild size="lg" className="font-mono text-xs tracking-wide">
            <Link to={localizedPath("/tvac-questionnaire", lang)}>
              <ClipboardList className="w-4 h-4 mr-2" />
              {tc("cta.questionnaire.configure")}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-mono text-xs tracking-wide">
            <Link to={localizedPath("/contact", lang)}>{tc("buttons.talkToEngineer")}</Link>
          </Button>
        </CTABand>
        <p className="container mx-auto px-6 -mt-6 mb-12 flex items-start gap-1.5 text-[13px] text-gray/85 leading-relaxed font-mono max-w-2xl">
          <Clock className="w-3 h-3 mt-0.5 text-blue/60 shrink-0" />
          <span>{tc("cta.questionnaire.microcopyDetailed")}</span>
        </p>
      </PageShell>
    </Layout>
  );
};

export default Services;
