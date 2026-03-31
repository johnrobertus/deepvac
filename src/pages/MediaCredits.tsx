import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical } from "@/lib/routes";
import { ArrowUpRight } from "lucide-react";

const heroVideoCredits = [
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

const serviceImageCredits: CreditEntry[] = [
  {
    title: "control-systems-design",
    usage: "Control Systems Design – Service page hero",
    description:
      "Principle diagram of temperature system for spacecraft vacuum thermal test",
    sourceUrl:
      "https://www.researchgate.net/publication/350844432_Development_of_an_Intelligent_Control_System_for_Spacecraft_Vacuum_Thermal_Test/figures?lo=1",
    credit: "Credit: Original authors (ResearchGate publication)",
    license: "Creative Commons Attribution 3.0 (CC BY 3.0)",
    ccBy: true,
  },
  {
    title: "testing-services",
    usage: "Testing Services – Service page hero",
    description: "Thermal vacuum testing preparation at NASA Goddard",
    sourceUrl: "https://svs.gsfc.nasa.gov/14874/#media_group_378623",
    credit: "Credit: NASA / Lacey Young",
  },
  {
    title: "retrofit-modernization",
    usage: "Retrofit & Modernization – Service page hero",
    description:
      "A technician surveys the TIRS instrument and the calibration equipment, preparing to move to the clean room after testing.",
    sourceUrl:
      "https://science.nasa.gov/missions/landsat/landsats-tirs-instrument-comes-out-of-first-round-of-thermal-vacuum-testing/",
    credit: "Credit: NASA / Goddard / Bill Hrybyk",
  },
  {
    title: "maintenance-repair",
    usage: "Maintenance & Repair – Service page hero",
    description: "Europa Imaging System Wide Angle Camera",
    sourceUrl:
      "https://science.nasa.gov/photojournal/pj-europa-imaging-system-wide-angle-camera/",
    credit: "Credit: NASA / Johns Hopkins APL / Ed Whitman",
  },
  {
    title: "subsystem-integration",
    usage: "Subsystem Integration – Service page hero",
    description: "Instrument integration work at NASA Goddard",
    sourceUrl: "https://svs.gsfc.nasa.gov/14354/#media_group_312367",
    credit:
      "Credit: NASA / Sophia Roberts · Contributors: Jeanette Kazmierczak, Aaron E. Lepsch",
  },
];

interface CreditEntry {
  title: string;
  usage: string;
  description: string;
  sourceUrl: string;
  credit: string;
  license?: string;
  ccBy?: boolean;
  notAiModified?: boolean;
}

function CreditCard({
  entry,
  t,
}: {
  entry: CreditEntry;
  t: (key: string) => string;
}) {
  return (
    <div className="rounded-sm border border-gray/10 bg-surface p-5 space-y-3">
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-mono text-xs uppercase tracking-widest text-blue">
          {entry.title}
        </h3>
        <span className="shrink-0 font-mono text-[10px] uppercase tracking-wider text-gray/50">
          {entry.usage}
        </span>
      </div>

      <p className="text-sm leading-relaxed text-gray">{entry.description}</p>

      {entry.license && (
        <p className="text-xs text-gray/60">
          <span className="text-sand/60">{t("mediaCredits.license")}:</span>{" "}
          {entry.license}
        </p>
      )}

      {entry.ccBy && (
        <p className="text-xs italic text-gray/50">
          {t("mediaCredits.ccByNote")}
        </p>
      )}

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
  );
}

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
        <PageHero
          eyebrow={t("mediaCredits.eyebrow")}
          title={t("mediaCredits.title")}
        />

        <Section>
          <div className="max-w-3xl space-y-10">
            <p className="text-sm leading-relaxed text-gray">
              {t("mediaCredits.intro")}
            </p>

            {/* Homepage Hero Videos */}
            <div className="space-y-6">
              <h2 className="text-sand text-base font-medium">
                {t("mediaCredits.heroVideosHeading")}
              </h2>
              <div className="space-y-4">
                {heroVideoCredits.map((entry) => (
                  <CreditCard key={entry.title} entry={entry} t={t} />
                ))}
              </div>
            </div>

            {/* Service Images */}
            <div className="space-y-6">
              <h2 className="text-sand text-base font-medium">
                {t("mediaCredits.serviceImagesHeading")}
              </h2>
              <div className="space-y-4">
                {serviceImageCredits.map((entry) => (
                  <CreditCard key={entry.title} entry={entry} t={t} />
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
