import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical } from "@/lib/routes";
import { ArrowUpRight } from "lucide-react";

const credits = [
  {
    title: "hero-slide-1",
    usage: "Homepage hero background video",
    description:
      "B-roll footage of the Chamber A door closing and engineers working in the Johnson Space Center control room",
    sourceUrl: "https://svs.gsfc.nasa.gov/12757/#media_group_328774",
    credit: "Credit: NASA's Goddard Space Flight Center",
  },
  {
    title: "hero-slide-2",
    usage: "Homepage hero background video",
    description:
      "B-roll footage of the Chamber A door closing and engineers working in the Johnson Space Center control room",
    sourceUrl: "https://svs.gsfc.nasa.gov/12757/#media_group_328774",
    credit: "Credit: NASA's Goddard Space Flight Center",
  },
  {
    title: "hero-slide-3",
    usage: "Homepage hero background video",
    description:
      "Spacecraft Tanager-1, Instrument Carbon Mapper Imaging Spectrometer",
    sourceUrl:
      "https://science.nasa.gov/photojournal/imaging-spectrometer-inside-thermal-vacuum-chamber/",
    credit: "Credit: NASA/JPL-Caltech",
  },
];

export default function MediaCredits() {
  const { t } = useTranslation("common");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{t("mediaCredits.seoTitle")}</title>
        <meta name="description" content={t("mediaCredits.seoDescription")} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
      </Helmet>

      <PageShell>
        <PageHero eyebrow={t("mediaCredits.eyebrow")} title={t("mediaCredits.title")} />

        <Section>
          <div className="max-w-3xl space-y-10">
            <p className="text-sm leading-relaxed text-gray">
              {t("mediaCredits.intro")}
            </p>

            <div className="space-y-6">
              <h2 className="text-sand text-base font-medium">
                {t("mediaCredits.heroVideosHeading")}
              </h2>

              <div className="space-y-4">
                {credits.map((entry) => (
                  <div
                    key={entry.title}
                    className="rounded-sm border border-gray/10 bg-surface p-5 space-y-3"
                  >
                    <div className="flex items-baseline justify-between gap-4">
                      <h3 className="font-mono text-xs uppercase tracking-widest text-blue">
                        {entry.title}
                      </h3>
                      <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-gray/50">
                        {entry.usage}
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed text-gray">
                      {entry.description}
                    </p>

                    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-center sm:justify-between">
                      <span className="text-sm text-sand/80">{entry.credit}</span>
                      <a
                        href={entry.sourceUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs text-blue transition-colors hover:text-blue-light"
                      >
                        {t("mediaCredits.viewSource")}
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <p className="border-t border-gray/10 pt-8 text-xs leading-relaxed text-gray/50">
              {t("mediaCredits.disclaimer")}
            </p>
          </div>
        </Section>
      </PageShell>
    </Layout>
  );
}
