import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Link, useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";
import { FileText, BookOpen, ArrowRight } from "lucide-react";

const Resources = () => {
  const { t } = useTranslation("common");
  const { t: tBlog } = useTranslation("blog");
  const { t: tCatalogs } = useTranslation("catalogs");
  const { t: tSeo } = useTranslation("seo");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  const resources = [
    {
      icon: FileText,
      titleKey: "catalogues",
      title: tCatalogs("title"),
      description: tCatalogs("description"),
      href: "/catalogs",
    },
    {
      icon: BookOpen,
      titleKey: "blog",
      title: tBlog("blog.title"),
      description: tBlog("blog.description"),
      href: "/resources/blog",
    },
  ];

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("resources.title")}</title>
        <meta name="description" content={tSeo("resources.description")} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
      </Helmet>
      <PageShell>
        <PageHero
          eyebrow={t("nav.resources")}
          title={lang === "de" ? "Ressourcen" : "Resources"}
          description={lang === "de"
            ? "Technische Dokumentation, Produktkataloge und Engineering-Wissen."
            : "Technical documentation, product catalogues, and engineering knowledge."}
        />

        <Section>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((res) => {
              const Icon = res.icon;
              return (
                <Link
                  key={res.titleKey}
                  to={localizedPath(res.href, lang)}
                  className="bento-card rounded-lg p-8 flex flex-col gap-5 group"
                >
                  <Icon className="w-8 h-8 text-blue" />
                  <h2 className="text-xl font-medium text-sand">{res.title}</h2>
                  <p className="text-sm text-gray leading-relaxed flex-1">{res.description}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm text-blue group-hover:gap-2.5 transition-all">
                    {t("buttons.learnMore")}
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </Section>
      </PageShell>
    </Layout>
  );
};

export default Resources;
