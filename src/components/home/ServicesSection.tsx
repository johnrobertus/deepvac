import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import {
  Activity,
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
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { SectionHeader } from "@/components/SectionHeader";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedPath } from "@/lib/routes";
import thermalPlateAsset from "@/assets/services-thermal-plate-reference.png.asset.json";
import vacuumPumpImage from "@/assets/services-vacuum-pump-cutaway.svg";
import chamberImage from "@/assets/tseries-chamber.webp";

const thermalPlateImage = thermalPlateAsset.url;

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

function IconTile({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-sm border border-blue/25 bg-blue/10 text-blue">
      <Icon className="h-5 w-5" aria-hidden="true" />
    </div>
  );
}

function PillarHeading({
  id,
  title,
  description,
  icon,
}: {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <header className="border-b border-gray/15 pb-6">
      <div className="flex items-start justify-between gap-5">
        <h3 id={id} className="max-w-[18rem] text-xl font-medium leading-[1.18] text-sand sm:text-2xl">
          {title}
        </h3>
        <IconTile icon={icon} />
      </div>
      <p className="mt-5 text-[15px] leading-relaxed text-sand/80 md:text-[16px]">{description}</p>
    </header>
  );
}

function ModularRows({ rows }: { rows: ModularRow[] }) {
  return (
    <div className="mt-6 grid gap-3">
      {Array.isArray(rows) &&
        rows.map((row, index) => (
          <div key={row.title} className="rounded-md border border-gray/15 bg-background/30 p-4">
            <div className="grid grid-cols-[96px_minmax(0,1fr)] items-center gap-4">
              <div className="media-frame flex h-24 items-center justify-center rounded-sm border border-gray/10 bg-black/30 p-2.5">
                <img
                  src={modularImages[index] ?? chamberImage}
                  alt={row.alt}
                  loading="lazy"
                  className="media-zoom h-full w-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <h4 className="font-mono text-[13px] font-medium uppercase leading-snug tracking-[0.06em] text-blue">
                  {row.title}
                </h4>
                <ul className="mt-2 space-y-1 text-[14px] leading-relaxed text-sand/75">
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
          </div>
        ))}
    </div>
  );
}

function CapabilityRows({ rows, icons }: { rows: CapabilityRow[]; icons: LucideIcon[] }) {
  return (
    <div className="mt-6 grid gap-3">
      {Array.isArray(rows) &&
        rows.map((row, index) => {
          const Icon = icons[index] ?? Settings;
          return (
            <div key={row.title} className="rounded-md border border-gray/15 bg-background/30 p-4">
              <div className="flex items-start gap-4">
                <IconTile icon={Icon} />
                <div className="min-w-0">
                  <h4 className="text-[15px] font-medium leading-snug text-sand sm:text-[16px]">{row.title}</h4>
                  <p className="mt-1.5 text-[14px] leading-relaxed text-sand/70 sm:text-[15px]">
                    {row.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

function PillarCta({ href, label }: { href: string; label: string }) {
  return (
    <div className="mt-auto pt-7">
      <Button asChild variant="outline" className="group/btn w-full justify-between sm:w-auto">
        <Link to={href}>
          {label}
          <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
        </Link>
      </Button>
    </div>
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
    <section id="services" aria-labelledby="technology-services-title" className="bg-surface/30 px-6 py-20 md:py-28">
      <div className="container-wide">
        <Reveal>
          <SectionHeader
            eyebrow={t("eyebrow")}
            title={t("title")}
            description={t("description")}
            className="mb-12 max-w-4xl"
          />
        </Reveal>

        <Reveal delay={60}>
          <div className="overflow-hidden rounded-lg border border-border bg-surface shadow-[var(--shadow-card)]">
            <div role="list" aria-label={t("title")} className="grid md:grid-cols-3">
              {Array.isArray(lifecycle) &&
                lifecycle.map((stage, index) => {
                  const Icon = lifecycleIcons[index] ?? Crosshair;
                  return (
                    <div
                      key={stage.title}
                      role="listitem"
                      className={`p-6 sm:p-7 lg:p-8 ${
                        index > 0 ? "border-t border-border md:border-l md:border-t-0" : ""
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <IconTile icon={Icon} />
                        <h3 className="text-card-title-lg">{stage.title}</h3>
                      </div>
                      <p className="mt-5 text-card-body">{stage.description}</p>
                    </div>
                  );
                })}
            </div>
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-3">
          <Reveal className="h-full">
            <article aria-labelledby="services-pillar-modular" className="bento-card flex h-full flex-col rounded-lg p-6 sm:p-7">
              <PillarHeading
                id="services-pillar-modular"
                title={modular.title}
                description={modular.description}
                icon={Boxes}
              />
              <div className="flex-1">
                <ModularRows rows={modular.rows} />
              </div>
              <PillarCta href={localizedPath("/products/standard-series", lang)} label={modular.cta} />
            </article>
          </Reveal>

          <Reveal className="h-full" delay={70}>
            <article aria-labelledby="services-pillar-custom" className="bento-card flex h-full flex-col rounded-lg p-6 sm:p-7">
              <PillarHeading
                id="services-pillar-custom"
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
            <article aria-labelledby="services-pillar-retrofit" className="bento-card flex h-full flex-col rounded-lg p-6 sm:p-7">
              <PillarHeading
                id="services-pillar-retrofit"
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
