import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";
import thermalHeroImg from "@/assets/thermal-vision-hero.png";

const ThermalVision = () => {
  const { t } = useTranslation("products");
  const { t: tSeo } = useTranslation("seo");
  const { t: tc } = useTranslation("common");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  const features = t("thermalVision.features", { returnObjects: true }) as Array<{ label: string; detail: string }>;

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("thermalVision.title")}</title>
        <meta name="description" content={tSeo("thermalVision.description")} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
      </Helmet>
      <PageShell>
        <PageHero
          eyebrow={t("thermalVision.eyebrow")}
          title={t("thermalVision.title")}
          description={t("thermalVision.description")}
        >
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-4">
            <Button asChild size="lg" className="font-mono text-xs tracking-wide w-full sm:w-auto">
              <Link to={localizedPath("/contact", lang)}>{t("thermalVision.cta.button")}</Link>
            </Button>
          </div>
        </PageHero>

        {/* Hero image section */}
        <Section>
          <div className="bento-card rounded-lg overflow-hidden">
            <div className="relative">
              <img
                src={thermalHeroImg}
                alt={t("thermalVision.title")}
                className="w-full h-auto max-h-[500px] object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-4 left-6">
                <span className="glass-overlay rounded-sm px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-blue-light/80">
                  {t("thermalVision.imageCaption")}
                </span>
              </div>
            </div>
            <div className="p-8 lg:p-10 space-y-5">
              <p className="text-sm text-gray leading-relaxed">{t("thermalVision.body")}</p>
              <div className="flex flex-wrap gap-2">
                {(t("thermalVision.tags", { returnObjects: true }) as string[]).map((tag) => (
                  <span key={tag} className="rounded-sm border border-gray/20 bg-surface-raised px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-blue-light/80">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Features */}
        <Section>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {features.map((feat) => (
              <div key={feat.label} className="bento-card rounded-lg p-6 space-y-2">
                <span className="mono-label text-blue">{feat.label}</span>
                <p className="text-sm text-gray leading-relaxed">{feat.detail}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Cross-links */}
        <Section className="bg-surface/30">
          <div className="flex flex-wrap gap-4">
            <Button asChild variant="outline">
              <Link to={localizedPath("/products", lang)}>
                {tc("buttons.backToProducts")} <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Link>
            </Button>
            <Button asChild variant="tertiary">
              <Link to={localizedPath("/contact", lang)}>{tc("buttons.talkToEngineer")}</Link>
            </Button>
          </div>
        </Section>

        <CTABand
          title={t("thermalVision.cta.title")}
          description={t("thermalVision.cta.description")}
        >
          <Button asChild size="lg" className="font-mono text-xs tracking-wide">
            <Link to={localizedPath("/contact", lang)}>{t("thermalVision.cta.button")}</Link>
          </Button>
        </CTABand>
      </PageShell>
    </Layout>
  );
};

export default ThermalVision;
