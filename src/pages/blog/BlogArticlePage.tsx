import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, Section, CTABand } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";
import { blogArticles } from "@/lib/blog";
import { ArrowLeft } from "lucide-react";
import { type ReactNode } from "react";

interface BlogArticlePageProps {
  /** Article slug — must match an entry in blogArticles registry */
  slug: string;
  categoryKey: string;
  titleKey: string;
  children: ReactNode;
}

export function BlogArticlePage({
  slug,
  categoryKey,
  titleKey,
  children,
}: BlogArticlePageProps) {
  const { t } = useTranslation("blog");
  const { t: tSeo } = useTranslation("seo");
  const { t: tc } = useTranslation("common");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  const article = blogArticles.find((a) => a.slug === slug);
  const seoKey = article?.seoKey ?? "resources";
  const datePublished = article?.datePublished ?? "";
  const dateModified = article?.dateModified ?? datePublished;

  const seoTitle = tSeo(`${seoKey}.title`);
  const seoDescription = tSeo(`${seoKey}.description`);
  const headline = t(titleKey);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description: seoDescription,
    inLanguage: lang,
    url: canonical,
    mainEntityOfPage: canonical,
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    author: {
      "@type": "Organization",
      name: "Deepvac GmbH",
      url: "https://deepvac.space",
    },
    publisher: {
      "@type": "Organization",
      name: "Deepvac GmbH",
      url: "https://deepvac.space",
      logo: {
        "@type": "ImageObject",
        url: "https://deepvac.space/logo.png",
      },
    },
  };

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      </Helmet>
      <PageShell>
        <section className="py-20 md:py-32 px-6">
          <div className="container max-w-3xl space-y-6">
            <Link
              to={localizedPath("/resources/blog", lang)}
              className="inline-flex items-center gap-1.5 text-[15px] text-gray hover:text-sand transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("blog.backToBlog")}
            </Link>
            <span className="mono-label text-blue block">{t(categoryKey)}</span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-sand">
              {headline}
            </h1>
          </div>
        </section>

        <Section>
          <article className="max-w-2xl mx-auto space-y-8 text-sand/85 leading-relaxed">
            {children}
          </article>
        </Section>

        <CTABand
          title={lang === "de" ? "Fragen zu diesem Thema?" : "Questions About This Topic?"}
          description={lang === "de"
            ? "Unser Engineering-Team steht für technische Rückfragen zur Verfügung."
            : "Our engineering team is available for technical follow-up."}
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
}
