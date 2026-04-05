import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";
import { blogArticles } from "@/lib/blog";
import { ArrowRight } from "lucide-react";

const Blog = () => {
  const { t } = useTranslation("blog");
  const { t: tc } = useTranslation("common");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

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

        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogArticles.map((article) => (
              <Link
                key={article.slug}
                to={localizedPath(`/resources/blog/${article.slug}`, lang)}
                className="bento-card rounded-lg overflow-hidden flex flex-col group"
              >
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <span className="mono-label text-blue">
                    {t(article.categoryKey)}
                  </span>
                  <h2 className="text-lg font-medium text-sand leading-snug">
                    {t(article.titleKey)}
                  </h2>
                  <p className="text-sm text-gray leading-relaxed flex-1">
                    {t(article.descriptionKey)}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-sm text-blue group-hover:gap-2.5 transition-all mt-2">
                    {t("blog.readArticle")}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Section>

        <CTABand
          title={lang === "de" ? "Technische Frage?" : "Have a Technical Question?"}
          description={lang === "de"
            ? "Besprechen Sie Ihre Anforderungen direkt mit unserem Engineering-Team."
            : "Discuss your requirements directly with our engineering team."}
        >
          <Button asChild>
            <Link to={localizedPath("/contact", lang)}>
              {tc("buttons.contactEngineering")}
            </Link>
          </Button>
        </CTABand>
      </PageShell>
    </Layout>
  );
};

export default Blog;
