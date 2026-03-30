import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical } from "@/lib/routes";

export default function TermsAndConditions() {
  const { t } = useTranslation("legal");
  const { t: tSeo } = useTranslation("seo");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  const emailLabel = lang === "de" ? "E-Mail" : "Email";
  const phoneLabel = lang === "de" ? "Telefon" : "Phone";
  const businessAddressLabel = lang === "de" ? "Geschäftsadresse" : "Business address";
  const registeredOfficeLabel = t("imprint.registeredOffice");
  const registeredOfficeValue = t("imprint.registeredOfficeValue");

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("termsAndConditions.title")}</title>
        <meta name="description" content={tSeo("termsAndConditions.description")} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
      </Helmet>

      <PageShell>
        <PageHero eyebrow={t("terms.eyebrow")} title={t("terms.title")} description="Deepvac GmbH" />

        <Section>
          <div className="max-w-3xl space-y-10 text-gray text-sm leading-relaxed">
            <p className="text-xs text-gray/60">{t("terms.effectiveDate")}</p>

            <LS n="1" title={t("terms.sections.1.title")}>
              <p className="font-medium text-sand">1.1 {t("terms.sections.1.provider")}</p>
              <p>Deepvac GmbH</p>
              <p>{t("imprint.representedBy")}</p>
              <p>
                {businessAddressLabel}: An der Universität 1, 30823 Garbsen, {lang === "de" ? "Deutschland" : "Germany"}
              </p>
              <p>{emailLabel}: info@deepvac.space</p>
              <p>{phoneLabel}: +49 157 830 270 99</p>
              <p>
                {registeredOfficeLabel}: {registeredOfficeValue}
              </p>

              <p className="font-medium text-sand pt-4">1.2 {t("terms.sections.1.customer")}</p>
              <p>{t("terms.sections.1.customerText")}</p>
            </LS>

            <LS n="2" title={t("terms.sections.2.title")}>
              <p>{t("terms.sections.2.c1")}</p>
              <p>{t("terms.sections.2.c2")}</p>
              <p>{t("terms.sections.2.c3")}</p>
              <p>{t("terms.sections.2.c4")}</p>
              <p>{t("terms.sections.2.c5")}</p>
              <p>{t("terms.sections.2.c6")}</p>
              <p>{t("terms.sections.2.c7")}</p>
            </LS>

            <LS n="3" title={t("terms.sections.3.title")}>
              <p>{t("terms.sections.3.c1")}</p>
              <p>{t("terms.sections.3.c2")}</p>
              <p>{t("terms.sections.3.c3")}</p>
              <p>{t("terms.sections.3.c4")}</p>
            </LS>

            <LS n="4" title={t("terms.sections.4.title")}>
              <p>{t("terms.sections.4.c1")}</p>
              <p>{t("terms.sections.4.c2")}</p>
              <p>{t("terms.sections.4.c3")}</p>
            </LS>

            <LS n="5" title={t("terms.sections.5.title")}>
              <p>{t("terms.sections.5.c1intro")}</p>
              <ol className="list-[lower-alpha] pl-5 space-y-1">
                <li>{t("terms.sections.5.c1a")}</li>
                <li>{t("terms.sections.5.c1b")}</li>
                <li>{t("terms.sections.5.c1c")}</li>
                <li>{t("terms.sections.5.c1d")}</li>
                <li>{t("terms.sections.5.c1e")}</li>
              </ol>
              <p>{t("terms.sections.5.c2")}</p>
            </LS>

            <LS n="6" title={t("terms.sections.6.title")}>
              <p>{t("terms.sections.6.c1")}</p>
              <p>{t("terms.sections.6.c2")}</p>
              <p>{t("terms.sections.6.c3")}</p>
              <p>{t("terms.sections.6.c4")}</p>
            </LS>

            <LS n="7" title={t("terms.sections.7.title")}>
              <p>{t("terms.sections.7.c1")}</p>
              <p>{t("terms.sections.7.c2")}</p>
              <p>{t("terms.sections.7.c3")}</p>
            </LS>

            <LS n="8" title={t("terms.sections.8.title")}>
              <p>{t("terms.sections.8.c1")}</p>
              <p>{t("terms.sections.8.c2")}</p>
              <p>{t("terms.sections.8.c3")}</p>
              <p>{t("terms.sections.8.c4")}</p>
            </LS>

            <LS n="9" title={t("terms.sections.9.title")}>
              <p>{t("terms.sections.9.c1")}</p>
              <p>{t("terms.sections.9.c2")}</p>
              <p>{t("terms.sections.9.c3")}</p>
              <p>{t("terms.sections.9.c4")}</p>
              <p>{t("terms.sections.9.c5")}</p>
              <p>{t("terms.sections.9.c6")}</p>
              <p>{t("terms.sections.9.c7")}</p>
              <p>{t("terms.sections.9.c8")}</p>
              <p>{t("terms.sections.9.c9")}</p>
            </LS>

            <LS n="10" title={t("terms.sections.10.title")}>
              <p>{t("terms.sections.10.c1")}</p>
              <p>{t("terms.sections.10.c2")}</p>
              <p>{t("terms.sections.10.c3")}</p>
              <p>{t("terms.sections.10.c4")}</p>
              <p>{t("terms.sections.10.c5")}</p>
            </LS>

            <LS n="11" title={t("terms.sections.11.title")}>
              <p>{t("terms.sections.11.c1")}</p>
              <p>{t("terms.sections.11.c1a")}</p>
              <p>{t("terms.sections.11.c2")}</p>
              <p>{t("terms.sections.11.c3")}</p>
              <p>{t("terms.sections.11.c4")}</p>
            </LS>

            <LS n="12" title={t("terms.sections.12.title")}>
              <p>{t("terms.sections.12.c1")}</p>
              <p>{t("terms.sections.12.c2")}</p>
              <p>{t("terms.sections.12.c3")}</p>
            </LS>

            <LS n="13" title={t("terms.sections.13.title")}>
              <p>{t("terms.sections.13.c1")}</p>
              <p>{t("terms.sections.13.c2intro")}</p>
              <ol className="list-[lower-alpha] pl-5 space-y-1">
                <li>{t("terms.sections.13.c2a")}</li>
                <li>{t("terms.sections.13.c2b")}</li>
                <li>{t("terms.sections.13.c2c")}</li>
              </ol>
              <p>{t("terms.sections.13.c3")}</p>
              <p>{t("terms.sections.13.c4")}</p>
            </LS>

            <LS n="14" title={t("terms.sections.14.title")}>
              <p>{t("terms.sections.14.c1")}</p>
              <p>{t("terms.sections.14.c2")}</p>
              <p>{t("terms.sections.14.c3")}</p>
            </LS>

            <LS n="15" title={t("terms.sections.15.title")}>
              <p>{t("terms.sections.15.c1")}</p>
              <p>{t("terms.sections.15.c2")}</p>
              <p>{t("terms.sections.15.c3")}</p>
              <p>{t("terms.sections.15.c4")}</p>
              <p>{t("terms.sections.15.c5")}</p>
            </LS>

            <LS n="16" title={t("terms.sections.16.title")}>
              <p>{t("terms.sections.16.c1")}</p>
              <p>{t("terms.sections.16.c2")}</p>
              <p>{t("terms.sections.16.c3")}</p>
              <p>{t("terms.sections.16.c4")}</p>
              <p>{t("terms.sections.16.c4a")}</p>
              <p>{t("terms.sections.16.c5")}</p>
              <p>{t("terms.sections.16.c6")}</p>
            </LS>

            <LS n="17" title={t("terms.sections.17.title")}>
              <p>{t("terms.sections.17.c1")}</p>
              <p>{t("terms.sections.17.c2")}</p>
              <p>{t("terms.sections.17.c3")}</p>
              <p>{t("terms.sections.17.c4")}</p>
              <p>{t("terms.sections.17.c5")}</p>
              <p>{t("terms.sections.17.c6")}</p>
              <p>{t("terms.sections.17.c7")}</p>
              <p>{t("terms.sections.17.c8")}</p>
            </LS>

            <LS n="18" title={t("terms.sections.18.title")}>
              <p>{t("terms.sections.18.c1")}</p>
              <p>{t("terms.sections.18.c2")}</p>
              <p>{t("terms.sections.18.c3intro")}</p>
              <ol className="list-[lower-alpha] pl-5 space-y-1">
                <li>{t("terms.sections.18.c3a")}</li>
                <li>{t("terms.sections.18.c3b")}</li>
                <li>{t("terms.sections.18.c3c")}</li>
                <li>{t("terms.sections.18.c3d")}</li>
              </ol>
              <p>{t("terms.sections.18.c4")}</p>
            </LS>

            <LS n="19" title={t("terms.sections.19.title")}>
              <p>{t("terms.sections.19.c1")}</p>
              <p>{t("terms.sections.19.c2")}</p>
            </LS>

            <LS n="20" title={t("terms.sections.20.title")}>
              <p>{t("terms.sections.20.c1")}</p>
              <p>{t("terms.sections.20.c2")}</p>
              <p>{t("terms.sections.20.c3")}</p>
            </LS>

            <LS n="21" title={t("terms.sections.21.title")}>
              <p>{t("terms.sections.21.c1")}</p>
              <p>{t("terms.sections.21.c2")}</p>
              <p>{t("terms.sections.21.c3")}</p>
            </LS>

            <LS n="22" title={t("terms.sections.22.title")}>
              <p>{t("terms.sections.22.c1")}</p>
              <p>{t("terms.sections.22.c2intro")}</p>
              <ol className="list-[lower-alpha] pl-5 space-y-1">
                <li>{t("terms.sections.22.c2a")}</li>
                <li>{t("terms.sections.22.c2b")}</li>
                <li>{t("terms.sections.22.c2c")}</li>
              </ol>
              <p>{t("terms.sections.22.c3")}</p>
            </LS>

            <LS n="23" title={t("terms.sections.23.title")}>
              <p>{t("terms.sections.23.c1")}</p>
              <p>{t("terms.sections.23.c2")}</p>
            </LS>

            <LS n="24" title={t("terms.sections.24.title")}>
              <p>{t("terms.sections.24.c1")}</p>
              <p>{t("terms.sections.24.c2")}</p>
              <p>{t("terms.sections.24.c3")}</p>
            </LS>

            <LS n="25" title={t("terms.sections.25.title")}>
              <p>{t("terms.sections.25.c1")}</p>
              <p>{t("terms.sections.25.c2")}</p>
            </LS>

            <LS n="26" title={t("terms.sections.26.title")}>
              <p>{t("terms.sections.26.c1")}</p>
              <p>{t("terms.sections.26.c2")}</p>
            </LS>

            <LS n="27" title={t("terms.sections.27.title")}>
              <p>{t("terms.sections.27.c1")}</p>
              <p>{t("terms.sections.27.c2")}</p>
            </LS>
          </div>
        </Section>
      </PageShell>
    </Layout>
  );
}

function LS({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="text-sand text-base font-medium">
        {n}. {title}
      </h2>
      {children}
    </div>
  );
}
