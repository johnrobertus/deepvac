import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Link, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, Section, CTABand } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedPath } from "@/lib/routes";
import {
  findPostBySlug,
  resolveRelatedArticle,
  solutionLabel,
  type BlogSection,
} from "@/lib/blogContent";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ArrowLeft, ArrowRight, ChevronDown, ExternalLink } from "lucide-react";


const BASE = "https://deepvac.space";

const GeneratedPost = () => {
  const { slug } = useParams();
  const { t } = useTranslation("blog");
  const { t: tc } = useTranslation("common");
  const { lang } = useLanguage();

  const post = findPostBySlug(slug);

  if (!post) {
    return (
      <Layout>
        <PageShell>
          <section className="py-32 px-6">
            <div className="container max-w-2xl space-y-6 text-center">
              <h1 className="text-3xl font-medium text-sand">
                {lang === "de" ? "Artikel nicht gefunden" : "Article not found"}
              </h1>
              <Button asChild>
                <Link to={localizedPath("/resources/blog", lang)}>
                  {t("blog.backToBlog")}
                </Link>
              </Button>
            </div>
          </section>
        </PageShell>
      </Layout>
    );
  }

  const content = post[lang];
  const intent = post.searchIntent[lang];
  const technicalNote = post.technicalNote?.[lang];

  const enUrl = `${BASE}/resources/blog/${post.enSlug}`;
  const deUrl = `${BASE}/de/ressourcen/blog/${post.deSlug}`;
  const canonical = lang === "de" ? deUrl : enUrl;

  const hreflangs = [
    { lang: "en", href: enUrl },
    { lang: "de", href: deUrl },
    { lang: "x-default", href: enUrl },
  ];

  const publisher = {
    "@type": "Organization",
    name: "Deepvac GmbH",
    url: BASE,
    logo: { "@type": "ImageObject", url: `${BASE}/logo.png` },
  };

  const blogPostingLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: content.title,
    description: content.seoDescription,
    inLanguage: lang,
    url: canonical,
    mainEntityOfPage: canonical,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    image: `${BASE}/og-image.png`,
    keywords: intent.primaryKeyword,
    about: {
      "@type": "Thing",
      name: intent.primaryQuestion,
    },
    citation: post.references.map((reference) => reference.url),
    author: { "@type": "Organization", name: "Deepvac GmbH", url: BASE },
    publisher,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: content.faq.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };

  const blogRoot =
    lang === "de" ? `${BASE}/de/ressourcen/blog` : `${BASE}/resources/blog`;
  const resourcesRoot =
    lang === "de" ? `${BASE}/de/ressourcen` : `${BASE}/resources`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: lang === "de" ? "Ressourcen" : "Resources",
        item: resourcesRoot,
      },
      { "@type": "ListItem", position: 2, name: "Blog", item: blogRoot },
      {
        "@type": "ListItem",
        position: 3,
        name: content.title,
        item: canonical,
      },
    ],
  };

  const dateLabel = new Date(post.datePublished).toLocaleDateString(
    lang === "de" ? "de-DE" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  const related = post.relatedArticles
    .map((key) => resolveRelatedArticle(key, lang))
    .filter((item): item is { title: string; path: string } => Boolean(item));

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{content.seoTitle}</title>
        <meta name="description" content={content.seoDescription} />
        <meta name="keywords" content={intent.primaryKeyword} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((item) => (
          <link
            key={item.lang}
            rel="alternate"
            hrefLang={item.lang}
            href={item.href}
          />
        ))}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={content.seoTitle} />
        <meta property="og:description" content={content.seoDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="article:published_time" content={post.datePublished} />
        <meta property="article:modified_time" content={post.dateModified} />
        <script type="application/ld+json">
          {JSON.stringify(blogPostingLd)}
        </script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        <script type="application/ld+json">
          {JSON.stringify(breadcrumbLd)}
        </script>
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

            <div className="flex flex-wrap items-center gap-3">
              <span className="mono-label text-blue block">
                {t(`blog.categories.${post.category}`)}
              </span>
              <span className="text-gray/60" aria-hidden="true">
                ·
              </span>
              <time
                dateTime={post.datePublished}
                className="text-[15px] text-gray"
              >
                {dateLabel}
              </time>
            </div>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-sand">
              {content.title}
            </h1>
          </div>
        </section>

        <Section>
          <article className="max-w-2xl mx-auto space-y-8 text-sand/85 leading-relaxed">
            <p className="text-lg leading-relaxed text-sand/90">
              {content.intro}
            </p>

            {technicalNote && (
              <aside className="rounded-lg border border-blue/25 bg-blue/5 p-5 space-y-2">
                <h2 className="mono-label text-blue">
                  {t("blog.labels.technicalNote")}
                </h2>
                <p className="text-sm text-sand/80">{technicalNote}</p>
              </aside>
            )}

            {content.sections.map((section: BlogSection, index: number) => (
              <div key={index} className="space-y-4">
                <h2 className="text-xl md:text-2xl font-medium text-sand">
                  {section.title}
                </h2>
                <p>{section.content}</p>
                {section.content2 && <p>{section.content2}</p>}
                {section.bullets && section.bullets.length > 0 && (
                  <div className="space-y-2">
                    {section.bulletsHeading && (
                      <h3 className="mono-label">
                        {section.bulletsHeading}
                      </h3>
                    )}
                    <ul className="list-disc list-outside pl-5 space-y-2 marker:text-blue/70">
                      {section.bullets.map((bullet, bulletIndex) => (
                        <li key={bulletIndex}>{bullet}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            <div className="border-t border-gray/15 pt-6 space-y-2">
              <h2 className="text-lg font-medium text-sand">
                {t("blog.labels.takeaway")}
              </h2>
              <p>{content.conclusion}</p>
            </div>

            {content.faq.length > 0 && (
              <div className="border-t border-gray/15 pt-8 space-y-6">
                <h2 className="text-xl md:text-2xl font-medium text-sand">
                  {t("blog.labels.faqTitle")}
                </h2>
                <AccordionPrimitive.Root
                  type="multiple"
                  className="border-t border-gray/15"
                >
                  {content.faq.map((faq, index) => (
                    <AccordionPrimitive.Item
                      key={index}
                      value={`faq-${index}`}
                      className="border-b border-gray/15"
                    >
                      <AccordionPrimitive.Header className="flex">
                        <AccordionPrimitive.Trigger className="group flex flex-1 items-start justify-between gap-4 py-5 text-left text-base font-medium text-sand transition-colors hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/60 focus-visible:ring-offset-2 focus-visible:ring-offset-background">
                          <h3 className="text-base font-medium text-sand">
                            {faq.q}
                          </h3>
                          <ChevronDown className="mt-0.5 h-4 w-4 shrink-0 text-blue transition-transform duration-300 group-data-[state=open]:rotate-180" />
                        </AccordionPrimitive.Trigger>
                      </AccordionPrimitive.Header>
                      <AccordionPrimitive.Content
                        forceMount
                        className="grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out data-[state=closed]:grid-rows-[0fr] data-[state=open]:grid-rows-[1fr]"
                      >
                        <div className="overflow-hidden">
                          <p className="pb-5 text-sand/80">{faq.a}</p>
                        </div>
                      </AccordionPrimitive.Content>
                    </AccordionPrimitive.Item>
                  ))}
                </AccordionPrimitive.Root>

              </div>
            )}

            {post.references.length > 0 && (
              <div className="border-t border-gray/15 pt-8 space-y-4">
                <h2 className="text-xl md:text-2xl font-medium text-sand">
                  {t("blog.labels.referencesTitle")}
                </h2>
                <p className="text-sm text-sand/70">
                  {t("blog.labels.referencesNote")}
                </p>
                <ol className="space-y-3">
                  {post.references.map((reference) => (
                    <li key={reference.url}>
                      <a
                        href={reference.url}
                        target="_blank"
                        rel="noreferrer"
                        className="group inline-flex items-start gap-2 text-sm text-sand/85 hover:text-sand transition-colors"
                      >
                        <ExternalLink className="w-4 h-4 mt-0.5 shrink-0 text-blue" />
                        <span>
                          <span className="font-medium">{reference.title}</span>
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

            {post.relatedPaths.length > 0 && (
              <div className="border-t border-gray/15 pt-8 space-y-3">
                <h2 className="mono-label text-blue">
                  {t("blog.labels.relatedSolutions")}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {post.relatedPaths.map((path) => (
                    <Link
                      key={path}
                      to={localizedPath(path, lang)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gray/25 px-3.5 py-1.5 text-sm text-sand/85 hover:border-blue/50 hover:text-sand transition-colors"
                    >
                      {solutionLabel(path, lang)}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </article>
        </Section>

        {related.length > 0 && (
          <Section className="pt-0">
            <div className="max-w-2xl mx-auto">
              <h2 className="text-xl font-medium text-sand mb-6">
                {t("blog.labels.relatedTitle")}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {related.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className="bento-card rounded-lg p-5 flex flex-col gap-3 group"
                  >
                    <h3 className="text-base font-medium text-sand leading-snug">
                      {item.title}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-sm text-blue group-hover:gap-2.5 transition-all mt-auto">
                      {t("blog.readArticle")}
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </Section>
        )}

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
};

export default GeneratedPost;
