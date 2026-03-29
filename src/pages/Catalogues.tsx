import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation, Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Download, FileText } from "lucide-react";
import { useState } from "react";
import { brochures, type Brochure } from "@/lib/brochures";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";

const Catalogues = () => {
  const { t } = useTranslation("catalogs");
  const { t: tSeo } = useTranslation("seo");
  const { t: tc } = useTranslation("common");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  const [filter, setFilter] = useState<string>("All");
  const featured = brochures.find((b) => b.featured);

  const placeholderDocs: Brochure[] = [
    { id: "custom-tvac", title: t("placeholderDocs.customTvac.title"), description: t("placeholderDocs.customTvac.description"), tags: ["TVAC", "Custom"], pdfUrl: "", coverUrl: "" },
    { id: "service-portfolio", title: t("placeholderDocs.servicePortfolio.title"), description: t("placeholderDocs.servicePortfolio.description"), tags: ["Service", "Overview"], pdfUrl: "", coverUrl: "" },
  ];

  const allDocuments = [...brochures, ...placeholderDocs];
  const categories = [
    t("categories.all"), t("categories.tvac"), t("categories.standardSeries"),
    t("categories.custom"), t("categories.service"), t("categories.overview"),
  ];
  const categoryMap: Record<string, string> = {
    [t("categories.all")]: "All", [t("categories.tvac")]: "TVAC", [t("categories.standardSeries")]: "Standard Series",
    [t("categories.custom")]: "Custom", [t("categories.service")]: "Service", [t("categories.overview")]: "Overview",
  };

  const filtered = filter === "All"
    ? allDocuments
    : allDocuments.filter((d) => d.tags.includes(filter));

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("catalogs.title")}</title>
        <meta name="description" content={tSeo("catalogs.description")} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
      </Helmet>
      <PageShell>
        <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        {featured && (
          <Section>
            <div className="bento-card rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-2">
              <div className="relative bg-surface overflow-hidden">
                <img src={featured.coverUrl} alt={featured.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-8 lg:p-10 flex flex-col justify-center space-y-5">
                <span className="mono-label text-blue">{t("featuredBrochure")}</span>
                <h2 className="text-2xl md:text-3xl font-medium text-sand tracking-tight">{featured.title}</h2>
                {featured.subtitle && <p className="text-sm text-blue/80 font-mono uppercase tracking-wider">{featured.subtitle}</p>}
                <p className="text-sm text-gray leading-relaxed">{featured.description}</p>
                <div className="flex flex-wrap gap-2">
                  {featured.tags.map((tag) => (
                    <span key={tag} className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-blue border border-blue/20 rounded-sm bg-blue/5">{tag}</span>
                  ))}
                </div>
                <div className="pt-2">
                  <Button asChild>
                    <a href={featured.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="w-4 h-4 mr-2" />{tc("buttons.downloadPdf")}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Section>
        )}

        <Section className="bg-surface/30">
          <SectionHeader eyebrow={t("documentLibrary.eyebrow")} title={t("documentLibrary.title")} description={t("documentLibrary.description")} className="mb-10" />
          <div className="flex flex-wrap gap-2 mb-8">
            {categories.map((cat) => {
              const internalVal = categoryMap[cat] || "All";
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(internalVal)}
                  className={`px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-sm border transition-colors ${
                    filter === internalVal ? "bg-blue/10 border-blue/40 text-blue" : "border-gray/20 text-gray hover:border-gray/40 hover:text-sand"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((doc) => (
              <BrochureCard key={doc.id} doc={doc} />
            ))}
          </div>
        </Section>

        <Section>
          <div className="bento-card rounded-lg p-8 text-center space-y-4">
            <FileText className="w-8 h-8 text-gray/30 mx-auto" />
            <h3 className="text-base font-medium text-sand">{t("moreDocumentation.title")}</h3>
            <p className="text-sm text-gray max-w-lg mx-auto">{t("moreDocumentation.description")}</p>
            <Button asChild variant="outline" size="sm">
              <Link to={localizedPath("/contact", lang)}>{tc("buttons.requestSpecificDocumentation")}</Link>
            </Button>
          </div>
        </Section>

        <CTABand title={t("cta.title")} description={t("cta.description")}>
          <Button asChild>
            <Link to={localizedPath("/contact", lang)}>{tc("buttons.contactEngineering")}</Link>
          </Button>
        </CTABand>
      </PageShell>
    </Layout>
  );
};

function BrochureCard({ doc }: { doc: Brochure }) {
  const { t } = useTranslation("catalogs");
  const { t: tc } = useTranslation("common");
  const hasFile = Boolean(doc.pdfUrl);

  return (
    <div className="bento-card rounded-lg overflow-hidden flex flex-col">
      {doc.coverUrl ? (
        <div className="relative bg-surface overflow-hidden" style={{ aspectRatio: "3/4" }}>
          <img src={doc.coverUrl} alt={doc.title} className="w-full h-full object-cover" loading="lazy" />
        </div>
      ) : (
        <div className="relative w-full overflow-hidden bg-surface blueprint-grid flex items-center justify-center" style={{ aspectRatio: "3/4" }}>
          <FileText className="w-10 h-10 text-gray/20" />
          <span className="absolute bottom-2 right-3 font-mono text-[10px] uppercase tracking-widest text-gray/40">{t("comingSoon")}</span>
        </div>
      )}
      <div className="p-5 space-y-3 flex-1 flex flex-col">
        <div className="flex flex-wrap gap-1.5">
          {doc.tags.map((tag) => (
            <span key={tag} className="px-1.5 py-0.5 text-[9px] font-mono uppercase tracking-wider text-gray border border-gray/20 rounded-sm">{tag}</span>
          ))}
        </div>
        <h3 className="text-sm font-medium text-sand">{doc.title}</h3>
        <p className="text-xs text-gray leading-relaxed flex-1">{doc.description}</p>
        {hasFile ? (
          <Button asChild variant="tertiary" className="text-xs self-start">
            <a href={doc.pdfUrl} target="_blank" rel="noopener noreferrer">
              <Download className="w-3 h-3 mr-1.5" />{tc("buttons.downloadPdf")}
            </a>
          </Button>
        ) : (
          <span className="text-xs text-gray/50 font-mono">{t("availableSoon")}</span>
        )}
      </div>
    </div>
  );
}

export default Catalogues;
