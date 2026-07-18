import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  ClipboardList,
  Sun,
  Eye,
  Snowflake,
  Thermometer,
  Wind,
  Activity,
  Gauge,
  Cable,
  Move,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";

type OptionItem = {
  slug: string;
  category: string;
  name: string;
  description: string;
  linkLabel?: string;
  linkTo?: string;
  benefits?: string[];
};

const iconBySlug: Record<string, JSX.Element> = {
  "solar-simulation": <Sun className="w-5 h-5" />,
  "viewports-thermography": <Eye className="w-5 h-5" />,
  "cryo-shrouds": <Snowflake className="w-5 h-5" />,
  "bake-out": <Thermometer className="w-5 h-5" />,
  "dry-pumping": <Wind className="w-5 h-5" />,
  rga: <Activity className="w-5 h-5" />,
  qcm: <Gauge className="w-5 h-5" />,
  feedthroughs: <Cable className="w-5 h-5" />,
  handling: <Move className="w-5 h-5" />,
};

const CATEGORY_ORDER = ["thermal", "vacuum", "instrumentation", "interfaces"] as const;

function renderDescription(item: OptionItem, lang: "en" | "de") {
  if (!item.linkTo || !item.linkLabel) return item.description;
  const parts = item.description.split("{{link}}");
  if (parts.length !== 2) return item.description;
  return (
    <>
      {parts[0]}
      <Link
        to={localizedPath(item.linkTo, lang)}
        className="text-blue underline underline-offset-4 hover:text-sand transition-colors"
      >
        {item.linkLabel}
      </Link>
      {parts[1]}
    </>
  );
}

const Options = () => {
  const { t } = useTranslation("products");
  const { t: tSeo } = useTranslation("seo");
  const { t: tc } = useTranslation("common");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  const items = t("options.items", { returnObjects: true }) as OptionItem[];
  const categories = t("options.categories", { returnObjects: true }) as Record<string, string>;

  const productsUrl = `https://deepvac.space${localizedPath("/products", lang)}`;
  const homeUrl = lang === "de" ? "https://deepvac.space/de" : "https://deepvac.space/";
  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "de" ? "Startseite" : "Home", item: homeUrl },
      { "@type": "ListItem", position: 2, name: lang === "de" ? "Produkte" : "Products", item: productsUrl },
      { "@type": "ListItem", position: 3, name: t("options.title") as string, item: canonical },
    ],
  };

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("options.title")}</title>
        <meta name="description" content={tSeo("options.description")} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>
      <PageShell>
        <PageHero
          eyebrow={t("options.eyebrow")}
          title={t("options.title")}
          description={t("options.description")}
        >
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-4">
            <Button asChild size="lg" className="font-mono text-xs tracking-wide w-full sm:w-auto">
              <Link to={localizedPath("/tvac-questionnaire", lang)}>
                <ClipboardList className="w-4 h-4 mr-2" />
                {tc("cta.questionnaire.start")}
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-mono text-xs tracking-wide w-full sm:w-auto">
              <Link to={localizedPath("/contact", lang)}>{tc("cta.questionnaire.talkToEngineer")}</Link>
            </Button>
          </div>
        </PageHero>

        <div className="section-divider" />

        {CATEGORY_ORDER.map((cat) => {
          const catItems = items.filter((it) => it.category === cat);
          if (catItems.length === 0) return null;
          return (
            <Fragment key={cat}>
              <Section>
                <SectionHeader
                  eyebrow={categories[cat]}
                  title={categories[cat]}
                  className="mb-10"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {catItems.map((item) => (
                    <div
                      key={item.slug}
                      className="bento-card rounded-lg p-6 flex flex-col gap-4"
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-blue">{iconBySlug[item.slug]}</div>
                        <h3 className="text-base font-medium text-sand">{item.name}</h3>
                      </div>
                      <p className="text-card-meta">{renderDescription(item, lang)}</p>
                      {item.benefits && item.benefits.length > 0 && (
                        <ul className="space-y-1.5 pt-1">
                          {item.benefits.map((b) => (
                            <li key={b} className="flex items-start gap-2 text-card-meta">
                              <span className="w-1 h-1 rounded-full bg-blue mt-1.5 shrink-0" />
                              {b}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            </Fragment>
          );
        })}

        <Section>
          <p className="text-card-meta font-mono max-w-3xl">{t("options.note")}</p>
        </Section>

        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bento-card rounded-lg p-6 border-l-2 border-l-blue/60 space-y-4">
              <h3 className="text-lg font-medium text-sand">
                {lang === "de" ? "Standard-Serie mit Optionen" : "Standard Series with options"}
              </h3>
              <p className="text-card-meta">
                {lang === "de"
                  ? "Am schnellsten und wirtschaftlichsten: eine Standard-Serie-Kammer, konfiguriert mit den passenden Optionen aus dieser Liste."
                  : "The fastest and most economical route: a Standard Series chamber configured with the right options from this list."}
              </p>
              <Button asChild variant="tertiary" className="self-start">
                <Link to={localizedPath("/products/standard-series", lang)}>
                  {tc("buttons.viewStandardSeries")} <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="bento-card rounded-lg p-6 border-l-2 border-l-blue/60 space-y-4">
              <h3 className="text-lg font-medium text-sand">
                {lang === "de" ? "Wenn Standard nicht reicht: Custom TVAC" : "When standard is not enough: Custom TVAC"}
              </h3>
              <p className="text-card-meta">
                {lang === "de"
                  ? "Für Volumina, Temperaturen oder Schnittstellen außerhalb des Standardumfangs entwickeln wir die Kammer applikationsspezifisch."
                  : "For volumes, temperatures or interfaces outside the standard scope, we engineer the chamber application-specifically."}
              </p>
              <Button asChild variant="tertiary" className="self-start">
                <Link to={localizedPath("/products/custom-tvac", lang)}>
                  {tc("buttons.exploreCustomTvac")} <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </Button>
            </div>
          </div>
        </Section>

        <CTABand title={t("options.cta.title")} description={t("options.cta.description")}>
          <Button asChild size="lg" className="font-mono text-xs tracking-wide">
            <Link to={localizedPath("/tvac-questionnaire", lang)}>
              <ClipboardList className="w-4 h-4 mr-2" />
              {tc("cta.questionnaire.configure")}
            </Link>
          </Button>
          <Button asChild variant="outline" size="lg" className="font-mono text-xs tracking-wide">
            <Link to={localizedPath("/contact", lang)}>{tc("buttons.requestConsultation")}</Link>
          </Button>
        </CTABand>
      </PageShell>
    </Layout>
  );
};

export default Options;
