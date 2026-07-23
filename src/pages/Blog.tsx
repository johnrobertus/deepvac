import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";
import { allListItems, blogPostPath, type BlogListItem } from "@/lib/blogContent";
import { ArrowRight } from "lucide-react";

// Display order for category groups on the blog index.
const CATEGORY_ORDER = ["basics", "engineeringGuide", "applications", "decisionSupport"];

const Blog = () => {
  const { t } = useTranslation("blog");
  const { t: tc } = useTranslation("common");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  const sorted = [...allListItems].sort((a, b) =>
    b.datePublished.localeCompare(a.datePublished),
  );

  const groups = CATEGORY_ORDER.map((cat) => ({
    cat,
    items: sorted.filter((i) => i.category === cat),
  })).filter((g) => g.items.length > 0);

  const renderCard = (item: BlogListItem) => (
    <Link
      key={item.articleKey}
      to={blogPostPath(item, lang)}
      className="bento-card rounded-lg overflow-hidden flex flex-col group"
    >
      <div className="p-6 flex flex-col gap-4 flex-1">
        <span className="mono-label text-blue">{t(`blog.categories.${item.category}`)}</span>
        <h2 className="text-lg font-medium text-sand leading-snug">{item[lang].title}</h2>
        <p className="text-body flex-1">{item[lang].description}</p>
        <span className="inline-flex items-center gap-1.5 text-sm text-blue group-hover:gap-2.5 transition-all mt-2">
          {t("blog.readArticle")}
          <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{t("blog.seo.title")}</title>
        <meta name="description" content={t("blog.seo.description")} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
      </Helmet>
      <PageShell>
        <PageHero
          eyebrow={t("blog.eyebrow")}
          title={t("blog.title")}
          description={t("blog.description")}
        />

        {groups.map((g) => (
          <Section key={g.cat} className="pb-8 md:pb-10">
            <h2 className="text-sm font-medium uppercase tracking-[0.12em] text-gray mb-6">
              {t(`blog.categories.${g.cat}`)}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {g.items.map(renderCard)}
            </div>
          </Section>
        ))}

        <CTABand
          title={lang === "de" ? "Technische Frage?" : "Have a Technical Question?"}
          description={
            lang === "de"
              ? "Besprechen Sie Ihre Anforderungen direkt mit unserem Engineering-Team."
              : "Discuss your requirements directly with our engineering team."
          }
        >
          <Button asChild>
            <Link to={localizedPath("/contact", lang)}>{tc("buttons.contactEngineering")}</Link>
          </Button>
        </CTABand>
      </PageShell>
    </Layout>
  );
};

export default Blog;
