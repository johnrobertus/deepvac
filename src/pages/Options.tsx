import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, ClipboardList } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";
import { OptionIcon } from "@/components/options/OptionIcon";
import { CATEGORY_ORDER, type OptionItem } from "@/lib/optionCatalog";

const CATALOG_ID = "catalog";

const Options = () => {
  const { t } = useTranslation("products");
  const { t: tSeo } = useTranslation("seo");
  const { t: tc } = useTranslation("common");
  const { lang } = useLanguage();
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  const items = t("options.items", { returnObjects: true }) as OptionItem[];
  const categories = t("options.categories", { returnObjects: true }) as Record<string, string>;
  const itemsByCategory = CATEGORY_ORDER.map((cat) => ({
    cat,
    catItems: items.filter((it) => it.category === cat),
  })).filter(({ catItems }) => catItems.length > 0);

  useEffect(() => {
    const legacySlug = hash.replace(/^#/, "");
    if (!legacySlug || !items.some((item) => item.slug === legacySlug)) return;

    navigate(localizedPath(`/products/options/${legacySlug}`, lang), { replace: true });
  }, [hash, items, lang, navigate]);

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
      url: `https://deepvac.space${localizedPath(`/products/options/${it.slug}`, lang)}`,
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
                        to={localizedPath(`/products/options/${item.slug}`, lang)}
                        className="group flex items-center gap-4 py-4 px-2 -mx-2 sm:px-3 sm:-mx-3 rounded-md hover:bg-surface/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      >
                        <span className="text-blue shrink-0" aria-hidden="true">
                          <OptionIcon slug={item.slug} />
                        </span>
                        <span className="flex-1 min-w-0 sm:grid sm:grid-cols-2 sm:gap-4 sm:items-center">
                          <span className="block text-[15px] font-medium text-sand">{item.name}</span>
                          <span className="block text-[13px] text-gray mt-0.5 sm:mt-0">{item.purpose}</span>
                        </span>
                        <ArrowRight
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
