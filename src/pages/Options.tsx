import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Aperture,
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Cable,
  ClipboardList,
  Droplets,
  Eye,
  Fan,
  Flame,
  Gauge,
  Network,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Snowflake,
  Sun,
  Thermometer,
  ThermometerSun,
  Video,
  Waves,
  Wind,
} from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";
import { scrollToId } from "@/lib/scroll";

type OptionItem = {
  slug: string;
  category: string;
  name: string;
  purpose: string;
  description: string;
  linkLabel?: string;
  linkTo?: string;
  benefits?: string[];
};

const iconBySlug: Record<string, JSX.Element> = {
  "solar-simulator": <Sun className="w-5 h-5" />,
  "infrared-heaters": <Flame className="w-5 h-5" />,
  "temperature-control-zones": <SlidersHorizontal className="w-5 h-5" />,
  "temperature-sensors": <Thermometer className="w-5 h-5" />,
  "bake-out": <ThermometerSun className="w-5 h-5" />,
  "cryogenic-traps": <Snowflake className="w-5 h-5" />,
  "roots-booster": <Fan className="w-5 h-5" />,
  "oil-free-pumping": <Wind className="w-5 h-5" />,
  "nitrogen-venting": <RefreshCw className="w-5 h-5" />,
  "residual-gas-analysis": <Activity className="w-5 h-5" />,
  "qcm-monitoring": <Gauge className="w-5 h-5" />,
  "helium-leak-test": <Search className="w-5 h-5" />,
  "viewing-window-znse": <Eye className="w-5 h-5" />,
  "optical-viewports": <Aperture className="w-5 h-5" />,
  "interior-camera": <Video className="w-5 h-5" />,
  "remote-monitoring": <Network className="w-5 h-5" />,
  "process-connections": <Cable className="w-5 h-5" />,
  "vibration-isolation": <Waves className="w-5 h-5" />,
  "water-cooling": <Droplets className="w-5 h-5" />,
};

const CATEGORY_ORDER = ["thermal", "vacuum", "observation", "integration"] as const;
const CATALOG_ID = "catalog";

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
  const itemsByCategory = CATEGORY_ORDER.map((cat) => ({
    cat,
    catItems: items.filter((it) => it.category === cat),
  })).filter(({ catItems }) => catItems.length > 0);

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
  const itemListJsonLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: tSeo("options.title") as string,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: `${canonical}#${it.slug}`,
    })),
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
        <script type="application/ld+json">{JSON.stringify(itemListJsonLd)}</script>
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

        {/* Catalog: grouped, clickable overview of all options */}
        <Section>
          <div id={CATALOG_ID}>
            <SectionHeader
              eyebrow={t("options.catalog.eyebrow")}
              title={t("options.catalog.title")}
              description={t("options.catalog.hint")}
              className="mb-12"
            />
            <div className="space-y-10">
              {itemsByCategory.map(({ cat, catItems }) => (
                <div key={cat}>
                  <h3 className="mono-label text-blue mb-3">{categories[cat]}</h3>
                  <div className="border-y border-gray/15 divide-y divide-gray/15">
                    {catItems.map((item) => (
                      <Link
                        key={item.slug}
                        to={{ hash: `#${item.slug}` }}
                        onClick={() => scrollToId(item.slug)}
                        className="group flex items-center gap-4 py-4 px-2 -mx-2 sm:px-3 sm:-mx-3 rounded-md hover:bg-surface/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span className="text-blue shrink-0" aria-hidden="true">
                          {iconBySlug[item.slug]}
                        </span>
                        <span className="flex-1 min-w-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:items-center">
                          <span className="block text-[15px] font-medium text-sand">{item.name}</span>
                          <span className="block text-[13px] text-gray mt-0.5 sm:mt-0">{item.purpose}</span>
                        </span>
                        <ArrowDown
                          className="w-3.5 h-3.5 shrink-0 text-gray group-hover:text-blue transition-colors"
                          aria-hidden="true"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <p className="text-card-meta font-mono mt-10 max-w-3xl">{t("options.note")}</p>
          </div>
        </Section>

        <div className="section-divider" />

        {/* Detail sections: one deep-linkable block per option */}
        <Section>
          <SectionHeader
            eyebrow={t("options.details.eyebrow")}
            title={t("options.details.title")}
            className="mb-12"
          />
          <div className="space-y-14">
            {itemsByCategory.map(({ cat, catItems }) => (
              <Fragment key={cat}>
                <div className="space-y-6">
                  <h3 className="mono-label text-blue">{categories[cat]}</h3>
                  {catItems.map((item) => (
                    <article key={item.slug} id={item.slug} className="bento-card rounded-lg p-6 md:p-8">
                      <div className="flex items-start gap-3 mb-4">
                        <span className="text-blue mt-0.5 shrink-0" aria-hidden="true">
                          {iconBySlug[item.slug]}
                        </span>
                        <h4 className="text-lg font-medium text-sand">{item.name}</h4>
                      </div>
                      <p className="text-card-meta max-w-3xl mb-6">{renderDescription(item, lang)}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <span className="mono-label text-gray">{t("options.purposeLabel")}</span>
                          <p className="text-card-meta mt-2">{item.purpose}</p>
                        </div>
                        {item.benefits && item.benefits.length > 0 && (
                          <div>
                            <span className="mono-label text-gray">{t("options.benefitsLabel")}</span>
                            <ul className="mt-2 space-y-1.5">
                              {item.benefits.map((b) => (
                                <li key={b} className="flex items-start gap-2 text-card-meta">
                                  <span className="w-1 h-1 rounded-full bg-blue mt-2 shrink-0" aria-hidden="true" />
                                  {b}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                      <div className="mt-6">
                        <Link
                          to={{ hash: `#${CATALOG_ID}` }}
                          onClick={() => scrollToId(CATALOG_ID)}
                          className="inline-flex items-center gap-1.5 text-[13px] text-gray hover:text-sand underline underline-offset-4 transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                        >
                          <ArrowUp className="w-3 h-3" aria-hidden="true" />
                          {t("options.backToOverview")}
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              </Fragment>
            ))}
          </div>
        </Section>

        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bento-card rounded-lg p-6 border-l-2 border-l-blue/60 space-y-4">
              <h3 className="text-lg font-medium text-sand">{t("options.crossSell.standard.title")}</h3>
              <p className="text-card-meta">{t("options.crossSell.standard.description")}</p>
              <Button asChild variant="tertiary" className="self-start">
                <Link to={localizedPath("/products/standard-series", lang)}>
                  {tc("buttons.viewStandardSeries")} <ArrowRight className="w-3 h-3 ml-1" />
                </Link>
              </Button>
            </div>
            <div className="bento-card rounded-lg p-6 border-l-2 border-l-blue/60 space-y-4">
              <h3 className="text-lg font-medium text-sand">{t("options.crossSell.custom.title")}</h3>
              <p className="text-card-meta">{t("options.crossSell.custom.description")}</p>
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
