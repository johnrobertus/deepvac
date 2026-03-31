import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Satellite, FlaskConical, Factory, Microscope, ArrowRight } from "lucide-react";
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

  const areas = t("industries.items", { returnObjects: true }) as Array<{ title: string; description: string }>;
  const types = t("projectScope.types", { returnObjects: true }) as string[];
  const caseStudies = t("caseStudies.items", { returnObjects: true }) as Array<{
    category: string;
    title: string;
    summary: string;
  }>;

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
          <SectionHeader
            eyebrow={t("collaborations.eyebrow")}
            title={t("collaborations.title")}
            description={t("collaborations.description")}
            className="mb-10"
          />

          {/*
          <div className="border border-gray/10 rounded-lg p-10 blueprint-grid flex items-center justify-center">
            <div className="text-center space-y-3">
              <div className="flex items-center justify-center gap-6 flex-wrap">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="w-24 h-12 rounded-sm border border-gray/15 flex items-center justify-center">
                    <span className="mono-label text-gray/25">{t("collaborations.logoPlaceholder")}</span>
                  </div>
                ))}
              </div>
              <p className="mono-label text-gray/30 pt-4">{t("collaborations.placeholderText")}</p>
            </div>
          </div>
          */}

          <div className="bento-card rounded-lg p-10 text-center space-y-4 border border-gray/10">
            <span className="mono-label text-blue">{t("caseStudies.comingSoon")}</span>
            <h3 className="text-base font-medium text-sand">Collaboration references are being prepared</h3>
            <p className="text-sm text-gray leading-relaxed max-w-xl mx-auto">
              We will showcase selected partners, collaborations and project references here soon.
            </p>
          </div>
        </Section>

        <Section className="bg-surface/30">
          <SectionHeader
            eyebrow={t("caseStudies.eyebrow")}
            title={t("caseStudies.title")}
            description={t("caseStudies.description")}
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {caseStudies.map((study, i) => (
              <div key={i} className="bento-card rounded-lg overflow-hidden">
                {/*
                <PlaceholderImage
                  assetId={`CASE_${String(i + 1).padStart(2, "0")}`}
                  type="PROJECT"
                  aspectRatio="16/9"
                  className="rounded-none"
                />
                */}

                <div className="aspect-[16/9] border-b border-gray/10 bg-surface/40 flex items-center justify-center">
                  <div className="text-center space-y-2">
                    <span className="mono-label text-blue">{t("caseStudies.comingSoon")}</span>
                    <p className="text-sm text-gray/60">Case study preview in preparation</p>
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <span className="mono-label text-blue">{study.category}</span>
                  <h3 className="text-base font-medium text-sand">{study.title}</h3>
                  <p className="text-sm text-gray leading-relaxed">{study.summary}</p>
                  <span className="flex items-center gap-1.5 text-xs text-gray/40 font-mono">
                    {t("caseStudies.comingSoon")}
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          {/*
          <div className="bento-card rounded-lg p-8 md:p-10 text-center space-y-4 max-w-2xl mx-auto">
            <span className="mono-label text-gray/30">{t("testimonials.eyebrow")}</span>
            <p className="text-sm text-gray/40 italic max-w-lg mx-auto leading-relaxed">{t("testimonials.placeholder")}</p>
            <span className="mono-label text-gray/20">{t("testimonials.label")}</span>
          </div>
          */}

          <div className="bento-card rounded-lg p-8 md:p-10 text-center space-y-4 max-w-2xl mx-auto">
            <span className="mono-label text-blue">{t("caseStudies.comingSoon")}</span>
            <h3 className="text-base font-medium text-sand">{t("testimonials.eyebrow")}</h3>
            <p className="text-sm text-gray leading-relaxed max-w-lg mx-auto">
              Client testimonials and feedback will be added here soon.
            </p>
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
