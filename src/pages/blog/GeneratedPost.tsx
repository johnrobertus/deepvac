import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Link, useLocation, useParams } from "react-router-dom";
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
import { ArrowLeft, ArrowRight } from "lucide-react";

const BASE = "https://deepvac.space";

const GeneratedPost = () => {
  const { slug } = useParams();
  const { t } = useTranslation("blog");
  const { t: tc } = useTranslation("common");
  const { lang } = useLanguage();
  const { pathname } = useLocation();

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

  const c = post[lang];
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
    headline: c.title,
    description: c.seoDescription,
    inLanguage: lang,
    url: canonical,
    mainEntityOfPage: canonical,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    image: `${BASE}/og-image.png`,
    author: { "@type": "Organization", name: "Deepvac GmbH", url: BASE },
    publisher,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: lang,
    mainEntity: c.faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const blogRoot = lang === "de" ? `${BASE}/de/ressourcen/blog` : `${BASE}/resources/blog`;
  const resourcesRoot = lang === "de" ? `${BASE}/de/ressourcen` : `${BASE}/resources`;
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: lang === "de" ? "Ressourcen" : "Resources", item: resourcesRoot },
      { "@type": "ListItem", position: 2, name: "Blog", item: blogRoot },
      { "@type": "ListItem", position: 3, name: c.title, item: canonical },
    ],
  };

  const dateLabel = new Date(post.datePublished).toLocaleDateString(
    lang === "de" ? "de-DE" : "en-US",
    { year: "numeric", month: "long", day: "numeric" },
  );

  const related = post.relatedArticles
    .map((k) => resolveRelatedArticle(k, lang))
    .filter((x): x is { title: string; path: string } => Boolean(x));

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{c.seoTitle}</title>
        <meta name="description" content={c.seoDescription} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
        <meta property="og:type" content="article" />
        <meta property="og:title" content={c.seoTitle} />
        <meta property="og:description" content={c.seoDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="article:published_time" content={post.datePublished} />
        <meta property="article:modified_time" content={post.dateModified} />
        <script type="application/ld+json">{JSON.stringify(blogPostingLd)}</script>
        <script type="application/ld+json">{JSON.stringify(faqLd)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbLd)}</script>
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
              <span className="text-gray/60" aria-hidden="true">·</span>
              <time dateTime={post.datePublished} className="text-[15px] text-gray">
                {dateLabel}
              </time>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-sand">
              {c.title}
            </h1>
          </div>
        </section>

        <Section>
          <article className="max-w-2xl mx-auto space-y-8 text-sand/85 leading-relaxed">
            <p className="text-lg leading-relaxed text-sand/90">{c.intro}</p>

            {c.sections.map((s: BlogSection, i: number) => (
              <div key={i} className="space-y-4">
                <h2 className="text-xl md:text-2xl font-medium text-sand">{s.title}</h2>
                <p>{s.content}</p>
                {s.content2 && <p>{s.content2}</p>}
                {s.bullets && s.bullets.length > 0 && (
                  <div className="space-y-2">
                    {s.bulletsHeading && <h3 className="mono-label">{s.bulletsHeading}</h3>}
                    <ul className="list-disc list-outside pl-5 space-y-2 marker:text-blue/70">
                      {s.bullets.map((b, j) => (
                        <li key={j}>{b}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}

            <div className="border-t border-gray/15 pt-6 space-y-2">
              <h2 className="text-lg font-medium text-sand">{t("blog.labels.takeaway")}</h2>
              <p>{c.conclusion}</p>
            </div>

            {c.faq.length > 0 && (
              <div className="border-t border-gray/15 pt-8 space-y-6">
                <h2 className="text-xl md:text-2xl font-medium text-sand">
                  {t("blog.labels.faqTitle")}
                </h2>
                <div className="space-y-6">
                  {c.faq.map((f, i) => (
                    <div key={i} className="space-y-2">
                      <h3 className="text-base font-medium text-sand">{f.q}</h3>
                      <p className="text-sand/80">{f.a}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {post.relatedPaths.length > 0 && (
              <div className="border-t border-gray/15 pt-8 space-y-3">
                <h2 className="mono-label text-blue">{t("blog.labels.relatedSolutions")}</h2>
                <div className="flex flex-wrap gap-2">
                  {post.relatedPaths.map((p) => (
                    <Link
                      key={p}
                      to={localizedPath(p, lang)}
                      className="inline-flex items-center gap-1.5 rounded-full border border-gray/25 px-3.5 py-1.5 text-sm text-sand/85 hover:border-blue/50 hover:text-sand transition-colors"
                    >
                      {solutionLabel(p, lang)}
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
                {related.map((r) => (
                  <Link
                    key={r.path}
                    to={r.path}
                    className="bento-card rounded-lg p-5 flex flex-col gap-3 group"
                  >
                    <h3 className="text-base font-medium text-sand leading-snug">{r.title}</h3>
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
          title={lang === "de" ? "Fragen zu diesem Thema?" : "Questions About This Topic?"}
          description={
            lang === "de"
              ? "Unser Engineering-Team steht für technische Rückfragen zur Verfügung."
              : "Our engineering team is available for technical follow-up."
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

export default GeneratedPost;
