import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical } from "@/lib/routes";

export default function Imprint() {
  const { t } = useTranslation("legal");
  const { t: tSeo } = useTranslation("seo");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("imprint.title")}</title>
        <meta name="description" content={tSeo("imprint.description")} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
      </Helmet>
      <PageShell>
        <PageHero eyebrow={t("imprint.eyebrow")} title={t("imprint.title")} />
        <Section>
          <div className="max-w-3xl space-y-8 text-gray text-sm leading-relaxed">
            <div className="space-y-1">
              <p className="text-sand font-medium text-base">Deepvac GmbH</p>
              <p>{t("imprint.representedBy")}</p>
            </div>
            <div className="space-y-1">
              <h2 className="text-sand text-base font-medium">{t("imprint.registeredOffice")}</h2>
              <p>{t("imprint.registeredOfficeValue")}</p>
            </div>
            <div className="space-y-1">
              <h2 className="text-sand text-base font-medium">{t("imprint.businessAddress")}</h2>
              <p>An der Universität 1</p>
              <p>30823 Garbsen</p>
              <p>Germany</p>
            </div>
            <div className="space-y-1">
              <h2 className="text-sand text-base font-medium">{t("imprint.contact")}</h2>
              <p>Phone: +49 157 83027099</p>
              <p>Email: info@deepvac.space</p>
            </div>
            <div className="space-y-1">
              <h2 className="text-sand text-base font-medium">{t("imprint.commercialRegister")}</h2>
              <p>Amtsgericht Hannover</p>
              <p>HRB 230263</p>
            </div>
            <div className="space-y-1">
              <h2 className="text-sand text-base font-medium">{t("imprint.shareCapital")}</h2>
              <p>{t("imprint.shareCapitalValue")}</p>
            </div>
          </div>
        </Section>
      </PageShell>
    </Layout>
  );
}
