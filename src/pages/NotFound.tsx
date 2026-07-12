import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { Layout } from "@/components/Layout";
import { PageShell } from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedPath } from "@/lib/routes";

const NotFound = () => {
  const location = useLocation();
  const { t } = useTranslation(["errors", "common"]);
  const { t: tSeo } = useTranslation("seo");
  const { lang } = useLanguage();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("notFound.title")}</title>
        <meta name="description" content={tSeo("notFound.description")} />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      <PageShell>
        <section className="py-32 md:py-48 px-6">
          <div className="container max-w-4xl text-center space-y-8">
            <span className="mono-label text-blue">{t("errors:notFound.eyebrow")}</span>
            <h1 className="text-5xl md:text-7xl font-medium tracking-tight text-sand">{t("errors:notFound.title")}</h1>
            <p className="text-base text-gray max-w-md mx-auto leading-relaxed">{t("errors:notFound.description")}</p>
            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button asChild size="lg" className="font-mono text-xs tracking-wide">
                <Link to={localizedPath("/", lang)}>
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  {t("common:buttons.returnToHomepage")}
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="font-mono text-xs tracking-wide">
                <Link to={localizedPath("/contact", lang)}>{t("common:buttons.contactUs")}</Link>
              </Button>
            </div>
          </div>
        </section>
      </PageShell>
    </Layout>
  );
};

export default NotFound;
