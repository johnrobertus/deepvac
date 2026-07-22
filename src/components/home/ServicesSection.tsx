import { Fragment } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Activity,
  ArrowDown,
  ArrowRight,
  Boxes,
  Cpu,
  Crosshair,
  Gauge,
  RefreshCw,
  Settings,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { Reveal } from "@/components/Reveal";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedPath } from "@/lib/routes";
import thermalPlateAsset from "@/assets/services-thermal-plate-reference.png.asset.json";
const thermalPlateImage = thermalPlateAsset.url;
import vacuumPumpImage from "@/assets/services-vacuum-pump-cutaway.svg";
import chamberImage from "@/assets/tseries-chamber.webp";

type LifecycleStage = {
  title: string;
  description: string;
};

type ModularRow = {
  title: string;
  alt: string;
  bullets: string[];
};

type ModularPillar = {
  label: string;
  title: string;
  description: string;
  cta: string;
  rows: ModularRow[];
};

type CapabilityRow = {
  title: string;
  description: string;
};

type CapabilityPillar = {
  label: string;
  title: string;
  description: string;
  cta: string;
  rows: CapabilityRow[];
};

const lifecycleIcons: LucideIcon[] = [Crosshair, Wrench, Activity];
const customIcons: LucideIcon[] = [Settings, Cpu, Activity, Boxes];
const retrofitIcons: LucideIcon[] = [RefreshCw, Settings, Wrench, Gauge];
const modularImages = [thermalPlateImage, vacuumPumpImage, chamberImage];

function PillarHeading({
  id,
  label,
  title,
  description,
  icon: Icon,
}: {
  id: string;
  label: string;
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <header>
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-sm border border-blue/30 bg-blue/10 text-blue">
          <Icon className="h-6 w-6" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <span className="text-card-eyebrow">{label}</span>
          <h3 id={id} className="mt-1.5 text-xl font-medium leading-[1.18] text-sand sm:text-[1.35rem]">
            {title}
          </h3>
        </div>
      </div>
      <p className="mt-4 text-[15px] leading-relaxed text-sand/80 md:text-[16px]">{description}</p>
    </header>
  );
}

function CapabilityRows({ rows, icons }: { rows: CapabilityRow[]; icons: LucideIcon[] }) {
  return (
    <div className="mt-6 divide-y divide-border/80 border-y border-border/80">
      {Array.isArray(rows) &&
        rows.map((row, index) => {
          const Icon = icons[index] ?? Settings;
          return (
            <div key={row.title} className="grid grid-cols-[44px_minmax(0,1fr)] gap-4 py-5">
              <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-blue/25 bg-blue/[0.08] text-blue">
                <Icon className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <h4 className="text-[15px] font-medium leading-snug text-sand">{row.title}</h4>
                <p className="mt-1.5 text-[14px] leading-relaxed text-sand/70 sm:text-[15px]">
                  {row.description}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

function PillarCta({ href, label }: { href: string; label: string }) {
  return (
    <Link
      to={href}
      className="mt-6 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-sm border border-blue/40 px-4 py-3 text-center text-[15px] font-medium text-blue transition-colors duration-200 hover:border-blue/70 hover:bg-blue/10 hover:text-blue-light"
    >
      {label}
      <ArrowRight className="h-4 w-4" aria-hidden="true" />
    </Link>
  );
}

export function ServicesSection() {
  const { t } = useTranslation("homeServices");
  const { lang } = useLanguage();

  const lifecycle = t("lifecycle", { returnObjects: true }) as LifecycleStage[];
  const modular = t("pillars.modular", { returnObjects: true }) as ModularPillar;
  const custom = t("pillars.custom", { returnObjects: true }) as CapabilityPillar;
  const retrofit = t("pillars.retrofit", { returnObjects: true }) as CapabilityPillar;

  return (
    <section id="services" aria-labelledby="technology-services-title" className="bg-surface/30 py-20 md:py-28">
      <div className="container-wide">
        <div className="grid gap-8 border-b border-border/80 pb-9 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:items-stretch lg:gap-10">
          <Reveal>
            <div className="flex h-full flex-col justify-center">
              <span className="text-section-eyebrow">{t("eyebrow")}</span>
              <h2 id="technology-services-title" className="text-section-title mt-4 max-w-3xl">
                {t("title")}
              </h2>
              <p className="text-section-lead mt-5 max-w-3xl">{t("description")}</p>
            </div>
          </Reveal>

          <Reveal delay={80}>
            <div className="h-full rounded-lg border border-blue/25 bg-background/60 p-5 sm:p-6">
              <div
                role="list"
                aria-label={t("title")}
                className="grid h-full gap-3 lg:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)_auto_minmax(0,1fr)] lg:items-center"
              >
                {Array.isArray(lifecycle) &&
                  lifecycle.map((stage, index) => {
                    const Icon = lifecycleIcons[index] ?? Crosshair;
                    return (
                      <Fragment key={stage.title}>
                        <div
                          role="listitem"
                          className="flex min-w-0 items-start gap-4 rounded-sm border border-transparent p-2 lg:flex-col lg:items-center lg:px-1 lg:text-center"
                        >
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-blue/40 bg-blue/[0.08] text-blue">
                            <Icon className="h-5 w-5" aria-hidden="true" />
                          </div>
                          <div className="min-w-0">
                            <span className="font-mono text-[12px] tracking-[0.12em] text-blue/80">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <h3 className="mt-1 text-[14px] font-semibold uppercase leading-snug tracking-[0.035em] text-sand">
                              {stage.title}
                            </h3>
                            <p className="mt-2 text-[13px] leading-relaxed text-sand/70 sm:text-[14px]">
                              {stage.description}
                            </p>
                          </div>
                        </div>

                        {index < lifecycle.length - 1 && (
                          <div aria-hidden="true" className="flex justify-center text-blue/50">
                            <ArrowDown className="h-5 w-5 lg:hidden" />
                            <ArrowRight className="hidden h-5 w-5 lg:block" />
                          </div>
                        )}
                      </Fragment>
                    );
                  })}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="mt-8 grid grid-cols-1 items-stretch gap-5 lg:grid-cols-3 xl:gap-6">
          <Reveal className="h-full">
            <article
              aria-labelledby="services-pillar-modular"
              className="flex h-full flex-col rounded-lg border border-border bg-surface p-5 transition-colors duration-300 hover:border-blue/40 hover:bg-background/40 sm:p-6"
            >
              <PillarHeading
                id="services-pillar-modular"
                label={modular.label}
                title={modular.title}
                description={modular.description}
                icon={Boxes}
              />

              <div className="mt-6 flex-1 divide-y divide-border/80 border-y border-border/80">
                {Array.isArray(modular.rows) &&
                  modular.rows.map((row, index) => (
                    <div
                      key={row.title}
                      className="grid grid-cols-[88px_minmax(0,1fr)] gap-4 py-5 sm:grid-cols-[108px_minmax(0,1fr)] lg:grid-cols-[84px_minmax(0,1fr)] xl:grid-cols-[100px_minmax(0,1fr)]"
                    >
                      <div className="flex aspect-square items-center justify-center overflow-hidden rounded-sm border border-blue/20 bg-background/80 p-2.5">
                        <img
                          src={modularImages[index] ?? chamberImage}
                          alt={row.alt}
                          loading="lazy"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-[14px] font-semibold uppercase leading-snug tracking-[0.025em] text-blue">
                          {row.title}
                        </h4>
                        <ul className="mt-2 space-y-1 text-[14px] leading-relaxed text-sand/75 sm:text-[15px]">
                          {Array.isArray(row.bullets) &&
                            row.bullets.map((bullet) => (
                              <li key={bullet} className="flex gap-2">
                                <span className="mt-[0.68em] h-1 w-1 shrink-0 rounded-full bg-blue" aria-hidden="true" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                        </ul>
                      </div>
                    </div>
                  ))}
              </div>

              <PillarCta href={localizedPath("/products/standard-series", lang)} label={modular.cta} />
            </article>
          </Reveal>

          <Reveal className="h-full" delay={70}>
            <article
              aria-labelledby="services-pillar-custom"
              className="flex h-full flex-col rounded-lg border border-border bg-surface p-5 transition-colors duration-300 hover:border-blue/40 hover:bg-background/40 sm:p-6"
            >
              <PillarHeading
                id="services-pillar-custom"
                label={custom.label}
                title={custom.title}
                description={custom.description}
                icon={Settings}
              />

              <div className="flex-1">
                <CapabilityRows rows={custom.rows} icons={customIcons} />
              </div>

              <PillarCta href={localizedPath("/products/custom-tvac", lang)} label={custom.cta} />
            </article>
          </Reveal>

          <Reveal className="h-full" delay={140}>
            <article
              aria-labelledby="services-pillar-retrofit"
              className="flex h-full flex-col rounded-lg border border-border bg-surface p-5 transition-colors duration-300 hover:border-blue/40 hover:bg-background/40 sm:p-6"
            >
              <PillarHeading
                id="services-pillar-retrofit"
                label={retrofit.label}
                title={retrofit.title}
                description={retrofit.description}
                icon={RefreshCw}
              />

              <div className="flex-1">
                <CapabilityRows rows={retrofit.rows} icons={retrofitIcons} />
              </div>

              <PillarCta
                href={localizedPath("/services/retrofit-modernization", lang)}
                label={retrofit.cta}
              />
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
