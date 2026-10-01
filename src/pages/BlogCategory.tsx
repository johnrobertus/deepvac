import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Navigate, useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { BlogCard } from "@/components/blog/BlogCard";
import { BlogCtaBand } from "@/components/blog/BlogCtaBand";
import { useLanguage } from "@/components/LanguageProvider";
import { getCanonical, getHreflangs, localizedPath, routeMap } from "@/lib/routes";
import { allListItems } from "@/lib/blogContent";
import { BLOG_CATEGORIES } from "@/lib/blogCategories";

const BASE = "https://deepvac.space";

const BlogCategory = () => {
  const { t } = useTranslation("blog");
  const { lang } = useLanguage();
  const { pathname } = useLocation();

  const entry = routeMap.find((r) => r.en === pathname || r.de === pathname);
  const category = BLOG_CATEGORIES.find((c) => c.enPath === entry?.en);
  if (!category) {
    return <Navigate to={localizedPath("/resources/blog", lang)} replace />;
  }

  const canonical = getCanonical(pathname, lang);
  const hreflangs = getHreflangs(pathname);
  const title = t(`blog.categoryPages.${category.key}.title`);
  const intro = t(`blog.categoryPages.${category.key}.intro`);
  const label = t(`blog.categories.${category.key}`);
  const blogPath = localizedPath("/resources/blog", lang);

  const items = allListItems
    .filter((i) => i.category === category.key)
    .sort((a, b) => b.datePublished.localeCompare(a.datePublished));

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: title,
    description: intro,
    url: canonical,
    inLanguage: lang,
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: lang === "de" ? "Ressourcen" : "Resources",
        item: `${BASE}${localizedPath("/resources", lang)}`,
      },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${BASE}${blogPath}` },
      { "@type": "ListItem", position: 3, name: label, item: canonical },
    ],
  };

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{`${title} | Deepvac`}</title>
        <meta name="description" content={intro} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
        <script type="application/ld+json">{JSON.stringify(collectionLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
      </Helmet>
      <PageShell>
        <PageHero
          title={title}
          description={intro}
          breadcrumbs={{
            separator: "/",
            items: [{ label: "Blog", href: blogPath }, { label }],
          }}
        />
        <Section className="pb-8 md:pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <BlogCard key={item.articleKey} item={item} lang={lang} />
            ))}
          </div>
        </Section>
        <BlogCtaBand lang={lang} />
      </PageShell>
    </Layout>
  );
};

export default BlogCategory;
