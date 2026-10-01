import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogCtaBand } from "@/components/blog/BlogCtaBand";
import { categoryEnPath } from "@/lib/blogCategories";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";
import { allListItems } from "@/lib/blogContent";
import { ArrowRight } from "lucide-react";

// Display order for category groups on the blog index.
const CATEGORY_ORDER = ["basics", "engineeringGuide", "applications", "decisionSupport"];

const Blog = () => {
  const { t } = useTranslation("blog");
  const { t: tSeo } = useTranslation("seo");
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

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("blog.title")}</title>
        <meta name="description" content={tSeo("blog.description")} />
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
              <Link
                to={localizedPath(categoryEnPath(g.cat) ?? "/resources/blog", lang)}
                className="inline-flex items-center gap-1.5 hover:text-sand transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              >
                {t(`blog.categories.${g.cat}`)}
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {g.items.map((item) => (
                <BlogCard key={item.articleKey} item={item} lang={lang} />
              ))}
            </div>
          </Section>
        ))}

        <BlogCtaBand lang={lang} />
      </PageShell>
    </Layout>
  );
};

export default Blog;
