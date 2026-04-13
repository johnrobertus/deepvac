import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { TechChip } from "@/components/TechChip";
import { ArrowRight, Shield, Thermometer, Cpu, RefreshCw } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";
import thermalHeroImg from "@/assets/thermal-vision-hero.png";

const featureIcons = [
  <Shield className="w-4 h-4" />,
  <Thermometer className="w-4 h-4" />,
  <Cpu className="w-4 h-4" />,
  <RefreshCw className="w-4 h-4" />,
];

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
          className="pb-8 md:pb-12"
          eyebrow={t("thermalVision.eyebrow")}
          title={t("thermalVision.title")}
          description={t("thermalVision.heroDescription")}
        >
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-4">
            <Button asChild size="lg" className="font-mono text-xs tracking-wide w-full sm:w-auto">
              <Link to={localizedPath("/contact", lang)}>{tc("buttons.requestTechnicalDetails")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link to={localizedPath("/contact", lang)}>{tc("buttons.requestConsultation")}</Link>
            </Button>
          </div>
          <div className="flex flex-wrap gap-2 pt-4">
            <TechChip label={t("thermalVision.chips.environment.label")} value={t("thermalVision.chips.environment.value")} />
            <TechChip label={t("thermalVision.chips.enclosure.label")} value={t("thermalVision.chips.enclosure.value")} />
            <TechChip label={t("thermalVision.chips.compatibility.label")} value={t("thermalVision.chips.compatibility.value")} />
          </div>
        </PageHero>

        {/* Split content section — image left, text + features right */}
        <Section className="pt-4 md:pt-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="relative rounded-lg overflow-hidden border border-gray/10">
                <img
                  src={thermalHeroImg}
                  alt="Deepvac Thermal Vision — thermal camera integration for TVAC"
                  className="w-full h-auto object-cover"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 glass-overlay rounded-md px-3 py-1.5">
                  <span className="mono-label text-blue-light">{t("thermalVision.imageLabel")}</span>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <span className="mono-label text-blue">{t("thermalVision.splitLabel")}</span>
                <h2 className="text-3xl md:text-4xl font-medium text-sand mt-2 tracking-tight">{t("thermalVision.title")}</h2>
              </div>
              <p className="text-sm text-gray leading-relaxed">{t("thermalVision.bodyParagraph1")}</p>
              <p className="text-sm text-gray/70 leading-relaxed">{t("thermalVision.bodyParagraph2")}</p>
              <div className="grid grid-cols-2 gap-4 pt-2">
                {features.map((f, i) => (
                  <div key={f.label} className="bento-card rounded-lg p-4 space-y-2">
                    <div className="text-blue">{featureIcons[i]}</div>
                    <h4 className="text-xs font-medium text-sand">{f.label}</h4>
                    <p className="text-[11px] text-gray leading-relaxed">{f.detail}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        {/* Bottom nav bar */}
        <Section>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-gray/15 pt-8">
            <Button asChild variant="outline" className="group/btn">
              <Link to={localizedPath("/products", lang)}>
                <ArrowRight className="w-3.5 h-3.5 rotate-180 transition-transform group-hover/btn:-translate-x-1" />
                {tc("buttons.backToProducts")}
              </Link>
            </Button>
            <Button asChild variant="outline" className="group/btn">
              <Link to={localizedPath("/contact", lang)}>
                {tc("buttons.talkToEngineer")}
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </div>
        </Section>
      </PageShell>
    </Layout>
  );
};

export default ThermalVision;
