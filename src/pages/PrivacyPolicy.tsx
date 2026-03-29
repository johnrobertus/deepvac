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

export default function PrivacyPolicy() {
  const { t } = useTranslation("legal");
  const { t: tSeo } = useTranslation("seo");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  const s = "privacy.sections";
  const legalBasesList = t(`${s}.legalBasesList`, { returnObjects: true }) as string[];
  const serverLogsList = t(`${s}.serverLogsList`, { returnObjects: true }) as string[];
  const contactFormLegalList = t(`${s}.contactFormLegalList`, { returnObjects: true }) as string[];
  const yourRightsList = t(`${s}.yourRightsList`, { returnObjects: true }) as string[];

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

            <LegalSection title={t(`${s}.controller`)}>
              <p>Deepvac GmbH</p>
              <p>{t("imprint.representedBy")}</p>
              <p>An der Universität 1 (Building 8141)</p>
              <p>30823 Garbsen</p>
              <p>Germany</p>
              <p className="pt-2">Email: info@deepvac.space</p>
              <p>Phone: +49 157 83027099</p>
              <p className="pt-2">{t("imprint.registeredOffice")}: {t("imprint.registeredOfficeValue")}</p>
            </LegalSection>

            <LegalSection title={t(`${s}.generalInfo`)}>
              <p>{t(`${s}.generalInfoText`)}</p>
              <p>{t(`${s}.generalInfoText2`)}</p>
            </LegalSection>

            <LegalSection title={t(`${s}.legalBases`)}>
              <p>{t(`${s}.legalBasesIntro`)}</p>
              <ul className="list-disc pl-5 space-y-1">
                {legalBasesList.map((item: string, i: number) => <li key={i}>{item}</li>)}
              </ul>
              <p>{t(`${s}.legalBasesNote`)}</p>
            </LegalSection>

            <LegalSection title={t(`${s}.serverLogs`)}>
              <p>{t(`${s}.serverLogsIntro`)}</p>


              <ul className="list-disc pl-5 space-y-1">
                {serverLogsList.map((item: string, i: number) => <li key={i}>{item}</li>)}
              </ul>
              <p>{t(`${s}.serverLogsNote`)}</p>
              <p>{t(`${s}.serverLogsLegal`)}</p>
              <p>{t(`${s}.serverLogsRetention`)}</p>
            </LegalSection>

            <LegalSection title={t(`${s}.contactForm`)}>
              <p>{t(`${s}.contactFormText`)}</p>
              <p>{t(`${s}.contactFormLegal`)}</p>
              <ul className="list-disc pl-5 space-y-1">
                {contactFormLegalList.map((item: string, i: number) => <li key={i}>{item}</li>)}
              </ul>
              <p>{t(`${s}.contactFormNote`)}</p>
              <p>{t(`${s}.contactFormRetention`)}</p>
            </LegalSection>

            <LegalSection title={t(`${s}.provisionOfData`)}>
              <p>{t(`${s}.provisionOfDataText`)}</p>
            </LegalSection>

            <LegalSection title={t(`${s}.hosting`)}>
              <p>{t(`${s}.hostingIntro`)}</p>
              <div className="pt-1">
              <p>{t(`${s}.hostingNote`)}</p>
            </LegalSection>

            <LegalSection title={t(`${s}.cookies`)}>
              <p>{t(`${s}.cookiesText`)}</p>
              <p>{t(`${s}.cookiesText2`)}</p>
              <p>{t(`${s}.cookiesLegal`)}</p>
            </LegalSection>

            <LegalSection title={t(`${s}.dataRetention`)}>
              <p>{t(`${s}.dataRetentionText`)}</p>
              <p>{t(`${s}.dataRetentionText2`)}</p>
            </LegalSection>

            <LegalSection title={t(`${s}.dataSecurity`)}>
              <p>{t(`${s}.dataSecurityText`)}</p>
              <p>{t(`${s}.dataSecurityText2`)}</p>
            </LegalSection>

            <LegalSection title={t(`${s}.yourRights`)}>
              <p>{t(`${s}.yourRightsIntro`)}</p>
              <ul className="list-disc pl-5 space-y-1">
                {yourRightsList.map((item: string, i: number) => <li key={i}>{item}</li>)}
              </ul>
              <p>{t(`${s}.yourRightsNote`)}</p>
            </LegalSection>

            <LegalSection title={t(`${s}.supervisoryAuthority`)}>
              <p>{t(`${s}.supervisoryAuthorityText`)}</p>
              <p>{t(`${s}.supervisoryAuthorityCompetent`)}</p>
              <div className="pt-1">
                <p>The State Commissioner for Data Protection of Lower Saxony</p>
                <p>Prinzenstraße 5</p>
                <p>30159 Hannover</p>
                <p>Germany</p>
              </div>
            </LegalSection>

            <LegalSection title={t(`${s}.changes`)}>
              <p>{t(`${s}.changesText`)}</p>
            </LegalSection>
          </div>
        </Section>
      </PageShell>
    </Layout>
  );
}
