import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { BookCallDialog } from "@/components/BookCallDialog";
import { Satellite, FlaskConical, Factory, Microscope } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";
import existFundingEn from "@/assets/exist-funding-en.jpg";
import existFundingDe from "@/assets/exist-funding-de.png";

const LINKEDIN_POST_URL = "https://www.linkedin.com/in/john-robertus/"; // TODO: replace with the exact LinkedIn post URL

const areaIcons = [Satellite, FlaskConical, Factory, Microscope];


const References = () => {
  const { t } = useTranslation("references");
  const { t: tSeo } = useTranslation("seo");
  const { t: tc } = useTranslation("common");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  const areas = t("industries.items", { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  const types = t("projectScope.types", { returnObjects: true }) as string[];
  const specs = t("featured.specs", { returnObjects: true }) as string[];
  const [bookCallOpen, setBookCallOpen] = useState(false);



  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("references.title")}</title>
        <meta name="description" content={tSeo("references.description")} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
      </Helmet>

      <PageShell>
        <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <Section>
          <SectionHeader
            eyebrow={t("featured.eyebrow")}
            title={t("featured.title")}
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="order-1 md:order-2 bento-card rounded-lg overflow-hidden">
              <img
                src="/images/t500-garbsen-1.webp"
                alt={t("featured.imageAlt")}
                width={1350}
                height={1800}
                className="w-full h-auto block"
              />
            </div>
            <div className="order-2 md:order-1 space-y-6">
              <p className="text-body">{t("featured.body")}</p>
              <a
                href={LINKEDIN_POST_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-sm text-blue underline underline-offset-4 hover:text-sand transition-colors"
              >
                {t("featured.linkedin")}
              </a>
              <ul className="space-y-3">
                {specs.map((spec) => (
                  <li key={spec} className="bento-card rounded-lg p-4 flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue flex-shrink-0" />
                    <span className="text-sm text-sand font-medium">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-8 bento-card rounded-lg overflow-hidden">
            <img
              src="/images/t500-garbsen-2.webp"
              alt={t("featured.bannerAlt")}
              width={1350}
              height={1800}
              loading="lazy"
              className="w-full max-h-[480px] object-cover block"
            />
          </div>
        </Section>

        <Section>
          <SectionHeader

            eyebrow={t("industries.eyebrow")}
            title={t("industries.title")}
            description={t("industries.description")}
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {areas.map((area, i) => {
              const Icon = areaIcons[i];
              return (
                <div key={area.title} className="bento-card rounded-lg p-6 space-y-4">
                  <div className="w-10 h-10 rounded-sm bg-blue/10 border border-blue/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue" />
                  </div>
                  <h3 className="text-base font-medium text-sand">{area.title}</h3>
                  <p className="text-body">{area.description}</p>
                </div>
              );
            })}
          </div>
        </Section>

        <Section className="bg-surface/30">
          <SectionHeader
            eyebrow={t("projectScope.eyebrow")}
            title={t("projectScope.title")}
            description={t("projectScope.description")}
            className="mb-10"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {types.map((type: string) => (
              <div key={type} className="bento-card rounded-lg p-5 flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue flex-shrink-0" />
                <span className="text-sm text-sand font-medium">{type}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeader
            eyebrow={t("origin.eyebrow")}
            title={t("origin.title")}
            className="mb-10"
          />
          <div className="bento-card rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-2 gap-0">
            <div className="p-8 md:p-10 flex items-center">
              <p className="text-body whitespace-normal">{t("origin.description")}</p>
            </div>
            <div className="p-6 md:p-8 flex items-center justify-center">
              <div className="w-full max-w-md rounded-lg border border-gray/15 bg-white/95 p-5 md:p-6">
                <img
                  src={lang === "de" ? existFundingDe : existFundingEn}
                  alt={t("origin.altText")}
                  className="w-full h-auto block"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </Section>




        <CTABand title={t("cta.title")} description={t("cta.description")}>
          <Button onClick={() => setBookCallOpen(true)}>{tc("bookCall.linkLabel")}</Button>
          <Button asChild variant="outline">
            <Link to={localizedPath("/products", lang)}>{tc("buttons.exploreProducts")}</Link>
          </Button>
        </CTABand>
        <BookCallDialog open={bookCallOpen} onOpenChange={setBookCallOpen} />

      </PageShell>
    </Layout>
  );
};

export default References;
