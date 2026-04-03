import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Satellite, FlaskConical, Factory, Microscope } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";

const areaIcons = [Satellite, FlaskConical, Factory, Microscope];

const References = () => {
  const { t } = useTranslation("references");
  const { t: tSeo } = useTranslation("seo");
  const { t: tc } = useTranslation("common");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  const areas = t("industries.items", { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  const types = t("projectScope.types", { returnObjects: true }) as string[];

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("references.title")}</title>
        <meta name="description" content={tSeo("references.description")} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
      </Helmet>

      <PageShell>
        <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <Section>
          <SectionHeader
            eyebrow={t("industries.eyebrow")}
            title={t("industries.title")}
            description={t("industries.description")}
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {areas.map((area, i) => {
              const Icon = areaIcons[i];
              return (
                <div key={area.title} className="bento-card rounded-lg p-6 space-y-4">
                  <div className="w-10 h-10 rounded-sm bg-blue/10 border border-blue/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue" />
                  </div>
                  <h3 className="text-base font-medium text-sand">{area.title}</h3>
                  <p className="text-sm text-gray leading-relaxed">{area.description}</p>
                </div>
              );
            })}
          </div>
        </Section>

        <Section className="bg-surface/30">
          <SectionHeader
            eyebrow={t("projectScope.eyebrow")}
            title={t("projectScope.title")}
            description={t("projectScope.description")}
            className="mb-10"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {types.map((type: string) => (
              <div key={type} className="bento-card rounded-lg p-5 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue flex-shrink-0" />
                <span className="text-sm text-sand font-medium">{type}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <div className="relative overflow-hidden rounded-lg border border-gray/10 bg-surface/30 px-6 py-16 md:px-10 md:py-24 text-center">
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(120,170,255,0.08),transparent_65%)]" />

            <div className="relative mx-auto max-w-3xl space-y-4">
              <span className="mono-label text-blue/80">{t("comingSoon.eyebrow")}</span>

              <h2 className="text-4xl md:text-6xl lg:text-7xl font-semibold uppercase tracking-[0.18em] text-sand">
                {t("comingSoon.title")}
              </h2>

              <p className="text-sm md:text-base text-gray leading-relaxed max-w-2xl mx-auto">
                {t("comingSoon.description")}
              </p>
            </div>
          </div>
        </Section>

        <CTABand title={t("cta.title")} description={t("cta.description")}>
          <Button asChild>
            <Link to={localizedPath("/contact", lang)}>{tc("buttons.requestConsultation")}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to={localizedPath("/products", lang)}>{tc("buttons.exploreProducts")}</Link>
          </Button>
        </CTABand>
      </PageShell>
    </Layout>
  );
};

export default References;
