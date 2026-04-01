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

            {/* Part A */}
            <PartHeader label={t("terms.partA")} />

            <LS n="1" title={t("terms.sections.1.title")}>
              <p className="font-medium text-sand">1.1 {t("terms.sections.1.provider")}</p>
              <p>Deepvac GmbH</p>
              <p>{t("imprint.representedBy")}</p>
              <p>{businessAddressLabel}: An der Universität 1, 30823 Garbsen, {lang === "de" ? "Deutschland" : "Germany"}</p>
              <p>{emailLabel}: info@deepvac.space</p>
              <p>{phoneLabel}: +49 157 830 270 99</p>
              <p>{registeredOfficeLabel}: {registeredOfficeValue}</p>
              <p className="font-medium text-sand pt-4">1.2 {t("terms.sections.1.customer")}</p>
              <p>{t("terms.sections.1.customerText")}</p>
            </LS>

            <SimpleSection n="2" t={t} keys={["c1","c2","c3","c4","c5","c6","c7","c8","c9","c10","c11","c12","c13"]} />
            <SimpleSection n="3" t={t} keys={["c1","c2","c3","c4"]} />
            <SimpleSection n="4" t={t} keys={["c1","c2","c3"]} />

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

            {/* Part B */}
            <PartHeader label={t("terms.partB")} />

            <SimpleSection n="6" t={t} keys={["c1","c2","c3","c4"]} />
            <SimpleSection n="7" t={t} keys={["c1","c2","c3"]} />
            <SimpleSection n="8" t={t} keys={["c1","c2","c3","c4"]} />
            <SimpleSection n="9" t={t} keys={["c1","c2","c3","c4","c5"]} />

            <LS n="10" title={t("terms.sections.10.title")}>
              <p>{t("terms.sections.10.c1")}</p>
              <p>{t("terms.sections.10.c1a")}</p>
              <p>{t("terms.sections.10.c2")}</p>
              <p>{t("terms.sections.10.c3")}</p>
              <p>{t("terms.sections.10.c4")}</p>
            </LS>

            <SimpleSection n="11" t={t} keys={["c1","c2","c3"]} />

            {/* Part C */}
            <PartHeader label={t("terms.partC")} />

            <LS n="12" title={t("terms.sections.12.title")}>
              <p>{t("terms.sections.12.c1")}</p>
              <p>{t("terms.sections.12.c2")}</p>
              <p>{t("terms.sections.12.c3")}</p>
              <p>{t("terms.sections.12.c4")}</p>
              <p>{t("terms.sections.12.c5intro")}</p>
              <ol className="list-[lower-alpha] pl-5 space-y-1">
                <li>{t("terms.sections.12.c5a")}</li>
                <li>{t("terms.sections.12.c5b")}</li>
                <li>{t("terms.sections.12.c5c")}</li>
              </ol>
              <p>{t("terms.sections.12.c6")}</p>
              <p>{t("terms.sections.12.c7")}</p>
              <p>{t("terms.sections.12.c8")}</p>
              <p>{t("terms.sections.12.c9")}</p>
              <p>{t("terms.sections.12.c10")}</p>
            </LS>

            {/* Part D */}
            <PartHeader label={t("terms.partD")} />

            <SimpleSection n="13" t={t} keys={["c1","c2","c3","c4","c5"]} />
            <SimpleSection n="14" t={t} keys={["c1","c2","c3","c4","c5","c6"]} />
            <SimpleSection n="15" t={t} keys={["c1","c2","c3","c4","c5","c6","c7","c8","c9","c10","c11","c12","c13","c14"]} />
            <SimpleSection n="16" t={t} keys={["c1","c2","c3","c4","c5","c6","c7","c8"]} />
            <SimpleSection n="17" t={t} keys={["c1","c2","c3","c4","c5","c6","c7","c8"]} />
            <SimpleSection n="18" t={t} keys={["c1","c2","c3","c4","c5","c6","c7","c8","c9","c10"]} />

            {/* Part E */}
            <PartHeader label={t("terms.partE")} />

            <SimpleSection n="19" t={t} keys={["c1","c2","c3"]} />
            <SimpleSection n="20" t={t} keys={["c1","c2","c3","c4","c5","c6"]} />
            <SimpleSection n="21" t={t} keys={["c1","c2","c3","c4","c5","c6","c7","c8","c9"]} />

            <LS n="22" title={t("terms.sections.22.title")}>
              <p>{t("terms.sections.22.c1")}</p>
              <p>{t("terms.sections.22.c2")}</p>
              <p>{t("terms.sections.22.c3")}</p>
              <p>{t("terms.sections.22.c4")}</p>
              <p>{t("terms.sections.22.c5")}</p>
              <p>{t("terms.sections.22.c6")}</p>
              <p>{t("terms.sections.22.c7")}</p>
              <p>{t("terms.sections.22.c8")}</p>
              <p>{t("terms.sections.22.c9")}</p>
            </LS>

            <LS n="23" title={t("terms.sections.23.title")}>
              <p>{t("terms.sections.23.c1")}</p>
              <p>{t("terms.sections.23.c2")}</p>
              <p>{t("terms.sections.23.c3intro")}</p>
              <ol className="list-[lower-alpha] pl-5 space-y-1">
                <li>{t("terms.sections.23.c3a")}</li>
                <li>{t("terms.sections.23.c3b")}</li>
                <li>{t("terms.sections.23.c3c")}</li>
                <li>{t("terms.sections.23.c3d")}</li>
              </ol>
              <p>{t("terms.sections.23.c4")}</p>
            </LS>

            <SimpleSection n="24" t={t} keys={["c1","c2"]} />
            <SimpleSection n="25" t={t} keys={["c1","c2","c3"]} />
            <SimpleSection n="26" t={t} keys={["c1","c2","c3"]} />

            <LS n="27" title={t("terms.sections.27.title")}>
              <p>{t("terms.sections.27.c1")}</p>
              <p>{t("terms.sections.27.c2intro")}</p>
              <ol className="list-[lower-alpha] pl-5 space-y-1">
                <li>{t("terms.sections.27.c2a")}</li>
                <li>{t("terms.sections.27.c2b")}</li>
                <li>{t("terms.sections.27.c2c")}</li>
              </ol>
              <p>{t("terms.sections.27.c3")}</p>
            </LS>

            <SimpleSection n="28" t={t} keys={["c1","c2"]} />
            <SimpleSection n="29" t={t} keys={["c1","c2","c3"]} />
            <SimpleSection n="30" t={t} keys={["c1","c2"]} />
            <SimpleSection n="31" t={t} keys={["c1","c2"]} />
            <SimpleSection n="32" t={t} keys={["c1","c2"]} />
          </div>
        </Section>
      </PageShell>
    </Layout>
  );
}

function PartHeader({ label }: { label: string }) {
  return (
    <div className="pt-6 pb-2 border-t border-sand/20">
      <h2 className="text-sand text-lg font-semibold tracking-wide uppercase">{label}</h2>
    </div>
  );
}

function LS({ n, title, children }: { n: string; title: string; children: ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-sand text-base font-medium">
        {n}. {title}
      </h3>
      {children}
    </div>
  );
}

function SimpleSection({ n, t, keys }: { n: string; t: (key: string) => string; keys: string[] }) {
  return (
    <LS n={n} title={t(`terms.sections.${n}.title`)}>
      {keys.map((k) => (
        <p key={k}>{t(`terms.sections.${n}.${k}`)}</p>
      ))}
    </LS>
  );
}
