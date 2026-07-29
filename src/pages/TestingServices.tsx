import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import {
  ArrowRight,
  ChevronRight,
  ClipboardList,
  Settings2,
  PlayCircle,
  LineChart,
  FileText,
  Thermometer,
  Wrench,
  Activity,
  BarChart3,
  Target,
  CheckCircle2,
} from "lucide-react";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";
import { buildBreadcrumbJsonLd } from "@/lib/jsonld";
import testingHero from "@/assets/testing-hero.webp";

type ScopeItem = {
  title: string;
  short: string;
  equipment: string;
  tests: string[];
  category: string;
};

const capabilityIcons = [Thermometer, Wrench, Activity, BarChart3, Target];
const stepIcons = [ClipboardList, Settings2, PlayCircle, LineChart, FileText];

export const TestingServices = () => {
  const { t } = useTranslation("services");
  const { t: tSeo } = useTranslation("seo");
  const { t: tc } = useTranslation("common");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);
  const lp = (p: string) => localizedPath(p, lang);

  const tags = t("testing.tags", { returnObjects: true }) as string[];
  const steps = t("testing.process.steps", { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;
  const capItems = t("testing.capabilities.items", {
    returnObjects: true,
  }) as ScopeItem[];
  const deliverables = t("testing.deliverables.items", {
    returnObjects: true,
  }) as Array<{ title: string; description: string }>;
  const applications = t("testing.applications.items", {
    returnObjects: true,
  }) as string[];
  const whyItems = t("testing.why.items", { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;
  const related = t("testing.related.items", { returnObjects: true }) as Array<{
    label: string;
    href: string;
    description: string;
  }>;
  const breadcrumbJsonLd = buildBreadcrumbJsonLd(
    [
      { name: lang === "de" ? "Leistungen" : "Services", enPath: "/services" },
      { name: t("testing.title") as string, enPath: "/services/testing-services" },
    ],
    lang,
  );

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("testingServices.title")}</title>
        <meta name="description" content={tSeo("testingServices.description")} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
        <script type="application/ld+json">{JSON.stringify(breadcrumbJsonLd)}</script>
      </Helmet>

      <PageShell>
        {/* Breadcrumb */}
        <div className="container-wide pt-8">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 mono-label"
          >
            <Link to={lp("/")} className="hover:text-sand transition-colors">
              {t("testing.breadcrumbHome")}
            </Link>
            <ChevronRight className="h-3 w-3 text-gray/80" />
            <span className="text-sand">{t("testing.breadcrumbCurrent")}</span>
          </nav>
        </div>

        <PageHero
          eyebrow={t("testing.eyebrow")}
          title={t("testing.title")}
          description={t("testing.subline")}
          className="pt-10 md:pt-14"
        >
          <p className="text-sm md:text-base text-gray/90 max-w-2xl leading-relaxed">
            {t("testing.description")}
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="font-mono text-[13px] uppercase tracking-wider text-blue/90 border border-blue/25 bg-blue/5 rounded-sm px-2.5 py-1"
              >
                {tag}
              </span>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-4">
            <Button asChild size="lg" className="font-mono text-xs tracking-wide w-full sm:w-auto">
              <Link to={`${lp("/contact")}?interest=testing`}>{t("testing.ctaPrimary")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="font-mono text-xs tracking-wide w-full sm:w-auto">
              <a href="#capabilities">{t("testing.ctaSecondary")}</a>
            </Button>
          </div>
        </PageHero>

        {/* Scope / Overview */}
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-5">
              <SectionHeader
                eyebrow={t("testing.scopeSection.eyebrow")}
                title={t("testing.scopeSection.title")}
              />
              <p className="text-body">
                {t("testing.scopeSection.p1")}
              </p>
              <p className="text-body">
                {t("testing.scopeSection.p2")}
              </p>
            </div>
            <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: "4/3" }}>
              <img
                src={testingHero}
                alt={t("testing.title")}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
            </div>
          </div>
        </Section>

        <div className="section-divider" />

        {/* Process */}
        <Section className="bg-surface/30">
          <SectionHeader
            eyebrow={t("testing.process.eyebrow")}
            title={t("testing.process.title")}
            description={t("testing.process.intro")}
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {steps.map((step, i) => {
              const Icon = stepIcons[i] || ClipboardList;
              return (
                <div
                  key={step.title}
                  className="bento-card rounded-lg p-5 space-y-3 relative"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex h-8 w-8 items-center justify-center rounded-sm border border-blue/20 bg-blue/10 text-blue">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="font-mono text-[13px] uppercase tracking-wider text-gray/85">
                      0{i + 1}
                    </span>
                  </div>
                  <h3 className="text-sm font-medium text-sand leading-snug">
                    {step.title}
                  </h3>
                  <p className="text-card-meta/90 leading-relaxed">
                    {step.description}
                  </p>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Capabilities */}
        <Section>
          <span id="capabilities" className="block -mt-16 pt-16" aria-hidden="true" />
          <SectionHeader
            eyebrow={t("testing.capabilities.eyebrow")}
            title={t("testing.capabilities.title")}
            description={t("testing.capabilities.intro")}
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capItems.map((item, i) => {
              const Icon = capabilityIcons[i] || Wrench;
              const isLast = i === capItems.length - 1;
              return (
                <div
                  key={item.title}
                  className={`bento-card rounded-lg p-6 space-y-5 ${
                    isLast ? "md:col-span-2 max-w-2xl mx-auto w-full" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-sm border border-blue/20 bg-blue/10 text-blue">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="space-y-1">
                      <h3 className="text-base font-medium text-sand leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-card-meta/90 leading-relaxed">
                        {item.short}
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <span className="mono-label text-blue text-[13px] uppercase tracking-wider">
                        {t("testing.capabilities.equipmentLabel")}
                      </span>
                      <p className="text-body mt-1">
                        {item.equipment}
                      </p>
                    </div>

                    <div>
                      <span className="mono-label text-blue text-[13px] uppercase tracking-wider">
                        {t("testing.capabilities.testsLabel")}
                      </span>
                      <ul className="mt-1.5 space-y-1">
                        {item.tests.map((test) => (
                          <li
                            key={test}
                            className="flex items-start gap-2 text-sm text-gray/90"
                          >
                            <span className="w-1 h-1 rounded-full bg-blue mt-2 shrink-0" />
                            <span className="leading-relaxed">{test}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray/10">
                    <span className="mono-label text-[13px] text-gray uppercase tracking-wider">
                      {t("testing.capabilities.categoryLabel")}
                    </span>
                    <p className="text-xs text-sand/80 leading-relaxed mt-1">
                      {item.category}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </Section>

        {/* Deliverables */}
        <Section className="bg-surface/30">
          <SectionHeader
            eyebrow={t("testing.deliverables.eyebrow")}
            title={t("testing.deliverables.title")}
            description={t("testing.deliverables.intro")}
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {deliverables.map((d) => (
              <div key={d.title} className="bento-card rounded-lg p-6 space-y-3">
                <h3 className="text-base font-medium text-sand">{d.title}</h3>
                <p className="text-card-meta">{d.description}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Typical Applications */}
        <Section>
          <SectionHeader
            eyebrow={t("testing.applications.eyebrow")}
            title={t("testing.applications.title")}
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {applications.map((s) => (
              <div
                key={s}
                className="bento-card rounded-lg p-4 flex items-start gap-3"
              >
                <CheckCircle2 className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                <span className="text-sm text-sand">{s}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Why Deepvac */}
        <Section className="bg-surface/30">
          <SectionHeader
            eyebrow={t("testing.why.eyebrow")}
            title={t("testing.why.title")}
            className="mb-10"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {whyItems.map((w) => (
              <div
                key={w.title}
                className="bento-card rounded-lg p-6 border-l-2 border-l-blue/60 space-y-3"
              >
                <h3 className="text-base font-medium text-sand">{w.title}</h3>
                <p className="text-card-meta">{w.description}</p>
              </div>
            ))}
          </div>
        </Section>

        {/* Related */}
        <Section>
          <SectionHeader
            eyebrow={t("testing.related.eyebrow")}
            title={t("testing.related.title")}
            className="mb-8"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((link) => (
              <div
                key={link.href}
                className="bento-card rounded-lg p-6 border-l-2 border-l-blue/60 space-y-3 flex flex-col"
              >
                <h3 className="text-base font-medium text-sand">{link.label}</h3>
                <p className="text-card-meta flex-1">
                  {link.description}
                </p>
                <Button asChild variant="tertiary" className="self-start">
                  <Link to={lp(link.href)}>
                    {tc("buttons.learnMore")}
                    <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </Section>

        <CTABand
          title={t("testing.cta.title")}
          description={t("testing.cta.description")}
        >
          <Button asChild size="lg" className="font-mono text-xs tracking-wide">
            <Link to={`${lp("/contact")}?interest=testing`}>{t("testing.cta.button")}</Link>
          </Button>
        </CTABand>
      </PageShell>
    </Layout>
  );
};

export default TestingServices;
