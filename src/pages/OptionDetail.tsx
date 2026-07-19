import { Link, Navigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { ArrowLeft, ClipboardList } from "lucide-react";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { OptionDescription } from "@/components/options/OptionDescription";
import { OptionIcon } from "@/components/options/OptionIcon";
import { plainOptionDescription, type OptionItem } from "@/lib/optionCatalog";
import {
  getCanonical,
  getHreflangs,
  getOptionSlugFromPath,
  localizedPath,
} from "@/lib/routes";

const OptionDetail = () => {
  const { t } = useTranslation("products");
  const { t: tc } = useTranslation("common");
  const { lang } = useLanguage();
  const { pathname } = useLocation();

  const items = t("options.items", { returnObjects: true }) as OptionItem[];
  const categories = t("options.categories", { returnObjects: true }) as Record<string, string>;
  const optionSlug = getOptionSlugFromPath(pathname);
  const item = items.find((candidate) => candidate.slug === optionSlug);

  if (!item) {
    return <Navigate to={localizedPath("/products/options", lang)} replace />;
  }

  const canonical = getCanonical(pathname, lang);
  const hreflangs = getHreflangs(pathname);
  const description = plainOptionDescription(item);
  const pageTitle = t("options.detailSeoTitle", { name: item.name }) as string;
  const homeUrl = lang === "de" ? "https://deepvac.space/de" : "https://deepvac.space/";
  const productsUrl = `https://deepvac.space${localizedPath("/products", lang)}`;
  const optionsPath = localizedPath("/products/options", lang);
  const optionsUrl = `https://deepvac.space${optionsPath}`;

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "de" ? "Startseite" : "Home", item: homeUrl },
      { "@type": "ListItem", position: 2, name: lang === "de" ? "Produkte" : "Products", item: productsUrl },
      { "@type": "ListItem", position: 3, name: t("options.title") as string, item: optionsUrl },
      { "@type": "ListItem", position: 4, name: item.name, item: canonical },
    ],
  };
  const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: item.name,
    description,
    url: canonical,
    isPartOf: {
      "@type": "CollectionPage",
      name: t("options.title") as string,
      url: optionsUrl,
    },
  };

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{pageTitle}</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(webPageJsonLd)}</script>
      </Helmet>

      <PageShell>
        <PageHero
          eyebrow={`${t("options.details.eyebrow")} / ${categories[item.category]}`}
          title={item.name}
          description={item.purpose}
        >
          <Button asChild variant="outline" size="lg" className="font-mono text-xs tracking-wide w-full sm:w-auto">
            <Link to={optionsPath}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t("options.backToOverview")}
            </Link>
          </Button>
        </PageHero>

        <div className="section-divider" />

        <Section>
          <article className="bento-card rounded-lg p-6 md:p-10">
            <div className="flex items-start gap-3 mb-6">
              <span className="text-blue mt-0.5 shrink-0" aria-hidden="true">
                <OptionIcon slug={item.slug} />
              </span>
              <h2 className="text-xl md:text-2xl font-medium text-sand">{item.name}</h2>
            </div>

            <p className="text-body max-w-3xl">
              <OptionDescription item={item} lang={lang} />
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 pt-8 border-t border-gray/15">
              <div>
                <span className="mono-label text-gray">{t("options.purposeLabel")}</span>
                <p className="text-card-meta mt-3">{item.purpose}</p>
              </div>
              {item.benefits && item.benefits.length > 0 && (
                <div>
                  <span className="mono-label text-gray">{t("options.benefitsLabel")}</span>
                  <ul className="mt-3 space-y-2">
                    {item.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-2 text-card-meta">
                        <span className="w-1 h-1 rounded-full bg-blue mt-2 shrink-0" aria-hidden="true" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </article>
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

export default OptionDetail;
