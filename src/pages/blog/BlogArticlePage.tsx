import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, Section, CTABand } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";
import { buildBreadcrumbJsonLd, SITE_URL } from "@/lib/jsonld";
import { blogArticles } from "@/lib/blog";
import { solutionLabel } from "@/lib/blogContent";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { type ReactNode } from "react";

interface BlogArticlePageProps {
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

  const article = blogArticles.find((candidate) => candidate.slug === slug);
  const seoKey = article?.seoKey ?? "resources";
  const datePublished = article?.datePublished ?? "";
  const dateModified = article?.dateModified ?? datePublished;
  const intent = article?.searchIntent[lang];
  const references = article?.references ?? [];
  const technicalNote = article?.technicalNote?.[lang];

  const seoTitle = tSeo(`${seoKey}.title`);
  const seoDescription = tSeo(`${seoKey}.description`);
  const headline = t(titleKey);

  const relatedPaths = references
    .map((reference) => {
      try {
        const url = new URL(reference.url);
        return url.origin === SITE_URL ? url.pathname : null;
      } catch {
        return null;
      }
    })
    .filter((path): path is string => Boolean(path));

  const externalReferences = references.filter((reference) => {
    try {
      return new URL(reference.url).origin !== SITE_URL;
    } catch {
      return true;
    }
  });

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline,
    description: seoDescription,
    inLanguage: lang,
    url: canonical,
    mainEntityOfPage: canonical,
    image: `${SITE_URL}/og-image.png`,
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(intent?.primaryKeyword ? { keywords: intent.primaryKeyword } : {}),
    ...(intent?.primaryQuestion
      ? {
          about: {
            "@type": "Thing",
            name: intent.primaryQuestion,
          },
        }
      : {}),
    ...(references.length > 0
      ? { citation: references.map((reference) => reference.url) }
      : {}),
    author: {
      "@type": "Organization",
      name: "Deepvac GmbH",
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: "Deepvac GmbH",
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
  };

  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [
      { name: "Blog", enPath: "/resources/blog" },
      { name: headline as string, enPath: `/resources/blog/${slug}` },
    ],
    lang,
  );

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{seoTitle}</title>
        <meta name="description" content={seoDescription} />
        {intent?.primaryKeyword && (
          <meta name="keywords" content={intent.primaryKeyword} />
        )}
        <link rel="canonical" href={canonical} />
        {hreflangs.map((item) => (
          <link
            key={item.lang}
            rel="alternate"
            hrefLang={item.lang}
            href={item.href}
          />
        ))}
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
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
            <span className="mono-label text-blue block">
              {t(categoryKey)}
            </span>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-sand">
              {headline}
            </h1>
          </div>
        </section>

        <Section>
          <article className="max-w-2xl mx-auto space-y-8 text-sand/85 leading-relaxed">
            {technicalNote && (
              <aside className="rounded-lg border border-blue/25 bg-blue/5 p-5 space-y-2">
                <h2 className="mono-label text-blue">
                  {t("blog.labels.technicalNote")}
                </h2>
                <p className="text-sm text-sand/80">{technicalNote}</p>
              </aside>
            )}

            {children}

            {externalReferences.length > 0 && (
              <div className="border-t border-gray/15 pt-8 space-y-4">
                <h2 className="text-xl md:text-2xl font-medium text-sand">
                  {t("blog.labels.referencesTitle")}
                </h2>
                <p className="text-sm text-sand/70">
                  {t("blog.labels.referencesNote")}
                </p>
                <ol className="space-y-3">
                  {externalReferences.map((reference) => (
                    <li key={reference.url}>
                      <a
                        href={reference.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-start gap-2 text-sm text-sand/85 hover:text-sand transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mt-0.5 shrink-0 text-blue" />
                        <span>
                          <span className="font-medium">
                            {reference.title}
                          </span>
                          <span className="block text-sand/60">
                            {reference.publisher}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {relatedPaths.length > 0 && (
              <div className="border-t border-gray/15 pt-8 space-y-3">
                <h2 className="mono-label text-blue">
                  {t("blog.labels.relatedSolutions")}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {relatedPaths.map((path) => (
                    <Link
                      key={path}
                      to={localizedPath(path, lang)}
                      className="inline-flex items-center rounded-full border border-gray/25 px-3.5 py-1.5 text-sm text-sand/85 hover:border-blue/50 hover:text-sand transition-colors"
                    >
                      {solutionLabel(path, lang)}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </Section>

        <CTABand
          title={
            lang === "de"
              ? "Konkrete Randbedingungen klären"
              : "Clarify a Specific Test Case"
          }
          description={
            lang === "de"
              ? "Für eine belastbare Auslegung sind Prüfling, Testprofil und Standortbedingungen gemeinsam zu betrachten."
              : "A defensible configuration starts with the test item, verification profile and site constraints."
          }
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
