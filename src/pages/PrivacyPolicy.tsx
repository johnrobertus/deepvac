import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical } from "@/lib/routes";

function LegalSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h2 className="text-sand text-base font-medium">{title}</h2>
      {children}
    </div>
  );
}

function asStringArray(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.filter((item): item is string => typeof item === "string");
  }
  return [];
}

export default function PrivacyPolicy() {
  const { t } = useTranslation("legal");
  const { t: tSeo } = useTranslation("seo");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  const legalBasesList = asStringArray(t("privacy.sections.legalBasesList", { returnObjects: true }));

  const serverLogsList = asStringArray(t("privacy.sections.serverLogsList", { returnObjects: true }));

  const contactFormDataList = asStringArray(t("privacy.sections.contactFormDataList", { returnObjects: true }));

  const contactFormLegalList = asStringArray(t("privacy.sections.contactFormLegalList", { returnObjects: true }));

  const yourRightsList = asStringArray(t("privacy.sections.yourRightsList", { returnObjects: true }));

  const emailLabel = lang === "de" ? "E-Mail" : "Email";
  const phoneLabel = lang === "de" ? "Telefon" : "Phone";
  const countryLabel = lang === "de" ? "Deutschland" : "Germany";
  const supervisoryAuthorityName =
    lang === "de"
      ? "Die Landesbeauftragte für den Datenschutz Niedersachsen"
      : "The State Commissioner for Data Protection of Lower Saxony";

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("privacyPolicy.title")}</title>
        <meta name="description" content={tSeo("privacyPolicy.description")} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
      </Helmet>

      <PageShell>
        <PageHero eyebrow={t("privacy.eyebrow")} title={t("privacy.title")} description="Deepvac GmbH" />

        <Section>
          <div className="max-w-3xl space-y-8 text-gray text-sm leading-relaxed">
            <p className="text-xs text-gray/60">{t("privacy.lastUpdated")}</p>

            <LegalSection title={t("privacy.sections.controller")}>
              <p>Deepvac GmbH</p>
              <p>{t("imprint.representedBy")}</p>
              <p>An der Universität 1 (Building 8141)</p>
              <p>30823 Garbsen</p>
              <p>{countryLabel}</p>
              <p className="pt-2">{emailLabel}: info@deepvac.space</p>
              <p>{phoneLabel}: +49 157 830 270 99</p>
              <p className="pt-2">
                {t("imprint.registeredOffice")}: {t("imprint.registeredOfficeValue")}
              </p>
            </LegalSection>

            <LegalSection title={t("privacy.sections.generalInfo")}>
              <p>{t("privacy.sections.generalInfoText")}</p>
              <p>{t("privacy.sections.generalInfoText2")}</p>
              <p>{t("privacy.sections.generalInfoText3")}</p>
            </LegalSection>

            <LegalSection title={t("privacy.sections.legalBases")}>
              <p>{t("privacy.sections.legalBasesIntro")}</p>
              <ul className="list-disc pl-5 space-y-1">
                {legalBasesList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>{t("privacy.sections.legalBasesNote")}</p>
            </LegalSection>

            <LegalSection title={t("privacy.sections.serverLogs")}>
              <p>{t("privacy.sections.serverLogsIntro")}</p>
              <ul className="list-disc pl-5 space-y-1">
                {serverLogsList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>{t("privacy.sections.serverLogsNote")}</p>
              <p>{t("privacy.sections.serverLogsLegal")}</p>
              <p>{t("privacy.sections.serverLogsRetention")}</p>
            </LegalSection>

            <LegalSection title={t("privacy.sections.contactForm")}>
              <p>{t("privacy.sections.contactFormText")}</p>
              <p>{t("privacy.sections.contactFormDataIntro")}</p>
              <ul className="list-disc pl-5 space-y-1">
                {contactFormDataList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>{t("privacy.sections.contactFormRequired")}</p>
              <p>{t("privacy.sections.contactFormLegal")}</p>
              <ul className="list-disc pl-5 space-y-1">
                {contactFormLegalList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>{t("privacy.sections.contactFormNote")}</p>
              <p>{t("privacy.sections.contactFormRetention")}</p>
            </LegalSection>

            <LegalSection title={t("privacy.sections.provisionOfData")}>
              <p>{t("privacy.sections.provisionOfDataText")}</p>
            </LegalSection>

            <LegalSection title={t("privacy.sections.hosting")}>
              <p>{t("privacy.sections.hostingIntro")}</p>
              <div className="pt-1 space-y-1">
                <p>Hetzner Online GmbH</p>
                <p>Industriestr. 25</p>
                <p>91710 Gunzenhausen</p>
                <p>{countryLabel}</p>
              </div>
              <p>{t("privacy.sections.hostingNote")}</p>
            </LegalSection>

            <LegalSection title={t("privacy.sections.cookies")}>
              <p>{t("privacy.sections.cookiesText")}</p>
              <p>{t("privacy.sections.cookiesText2")}</p>
              <p>{t("privacy.sections.cookiesLegal")}</p>
            </LegalSection>

            <LegalSection title={t("privacy.sections.dataRetention")}>
              <p>{t("privacy.sections.dataRetentionText")}</p>
              <p>{t("privacy.sections.dataRetentionText2")}</p>
            </LegalSection>

            <LegalSection title={t("privacy.sections.dataSecurity")}>
              <p>{t("privacy.sections.dataSecurityText")}</p>
              <p>{t("privacy.sections.dataSecurityText2")}</p>
            </LegalSection>

            <LegalSection title={t("privacy.sections.yourRights")}>
              <p>{t("privacy.sections.yourRightsIntro")}</p>
              <ul className="list-disc pl-5 space-y-1">
                {yourRightsList.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p>{t("privacy.sections.yourRightsNote")}</p>
            </LegalSection>

            <LegalSection title={t("privacy.sections.supervisoryAuthority")}>
              <p>{t("privacy.sections.supervisoryAuthorityText")}</p>
              <p>{t("privacy.sections.supervisoryAuthorityCompetent")}</p>
              <div className="pt-1 space-y-1">
                <p>{supervisoryAuthorityName}</p>
                <p>Prinzenstraße 5</p>
                <p>30159 Hannover</p>
                <p>{countryLabel}</p>
              </div>
            </LegalSection>

            <LegalSection title={t("privacy.sections.noAutomatedDecisionMaking")}>
              <p>{t("privacy.sections.noAutomatedDecisionMakingText")}</p>
            </LegalSection>

            <LegalSection title={t("privacy.sections.changes")}>
              <p>{t("privacy.sections.changesText")}</p>
            </LegalSection>
          </div>
        </Section>
      </PageShell>
    </Layout>
  );
}
