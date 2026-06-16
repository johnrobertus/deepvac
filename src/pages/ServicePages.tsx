import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { ArrowRight, Wrench, Activity, Thermometer, BarChart3, Target } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";
import mechanicalDesignHero from "@/assets/mechanical-design-hero.png";
import controlSystemsHero from "@/assets/control-systems-hero.png";
import testingHero from "@/assets/testing-hero.png";
import retrofitHero from "@/assets/retrofit-hero.png";
import maintenanceHero from "@/assets/maintenance-hero.png";
import subsystemHero from "@/assets/subsystem-hero.png";

interface ServicePageProps {
  seoKey: string;
  nsKey: string;
  heroImage?: string;
  children?: React.ReactNode;
}

function ServicePageTemplate({ seoKey, nsKey, heroImage, children }: ServicePageProps) {
  const { t } = useTranslation("services");
  const { t: tSeo } = useTranslation("seo");
  const { t: tc } = useTranslation("common");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  const deliverables = t(`${nsKey}.deliverables`, { returnObjects: true }) as Array<{ title: string; description: string }>;
  const scenarios = t(`${nsKey}.scenarios`, { returnObjects: true }) as string[];
  const crossLinks = t(`${nsKey}.crossLinks`, { returnObjects: true }) as Array<{ label: string; href: string; description: string }>;

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo(`${seoKey}.title`)}</title>
        <meta name="description" content={tSeo(`${seoKey}.description`)} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
      </Helmet>
      <PageShell>
        <PageHero eyebrow={t(`${nsKey}.eyebrow`)} title={t(`${nsKey}.title`)} description={t(`${nsKey}.description`)}>
          <div className="flex flex-col sm:flex-row flex-wrap gap-3 pt-4">
            <Button asChild size="lg" className="font-mono text-xs tracking-wide w-full sm:w-auto">
              <Link to={localizedPath("/contact", lang)}>{tc("buttons.discussRequirements")}</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="w-full sm:w-auto">
              <Link to={localizedPath("/services", lang)}>{tc("buttons.allServices")}</Link>
            </Button>
          </div>
        </PageHero>

        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-4">
              <SectionHeader eyebrow={t("template.overviewEyebrow")} title={t("template.overviewTitle")} />
              <p className="text-sm text-gray leading-relaxed">{t(`${nsKey}.overview`)}</p>
            </div>
            {heroImage ? (
              <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: "4/3" }}>
                <img src={heroImage} alt={t(`${nsKey}.title`)} className="w-full h-full object-cover" loading="lazy" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
              </div>
            ) : (
              <PlaceholderImage assetId="SVC_HERO" type="PROCESS" aspectRatio="4/3" />
            )}
          </div>
        </Section>

        <div className="section-divider" />

        {children}

        <Section>
          <SectionHeader eyebrow={t("template.deliverablesEyebrow")} title={t("template.deliverablesTitle")} className="mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deliverables.map((d) => (
              <div key={d.title} className="bento-card rounded-lg p-6 space-y-3">
                <h3 className="text-base font-medium text-sand">{d.title}</h3>
                <p className="text-xs text-gray leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section className="bg-surface/30">
          <SectionHeader eyebrow={t("template.scenariosEyebrow")} title={t("template.scenariosTitle")} className="mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scenarios.map((s: string) => (
              <div key={s} className="bento-card rounded-lg p-4 flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue mt-1.5 shrink-0" />
                <span className="text-sm text-sand">{s}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeader eyebrow={t("template.relatedEyebrow")} title={t("template.relatedTitle")} className="mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {crossLinks.map((link) => (
              <div key={link.href} className="bento-card rounded-lg p-6 border-l-2 border-l-blue/60 space-y-3">
                <h3 className="text-base font-medium text-sand">{link.label}</h3>
                <p className="text-xs text-gray leading-relaxed">{link.description}</p>
                <Button asChild variant="tertiary" className="self-start">
                  <Link to={localizedPath(link.href, lang)}>{tc("buttons.learnMore")} <ArrowRight className="w-3 h-3 ml-1" /></Link>
                </Button>
              </div>
            ))}
          </div>
        </Section>

        <CTABand title={t(`${nsKey}.ctaTitle`)} description={t(`${nsKey}.ctaDescription`)}>
          <Button asChild size="lg" className="font-mono text-xs tracking-wide">
            <Link to={localizedPath("/contact", lang)}>{tc("buttons.talkToEngineer")}</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to={localizedPath("/contact", lang)}>{tc("buttons.requestQuote")}</Link>
          </Button>
        </CTABand>
      </PageShell>
    </Layout>
  );
}

function TestingScopeSection() {
  const { t } = useTranslation("services");
  const scope = t("testing.scope", { returnObjects: true }) as {
    eyebrow: string;
    title: string;
    description: string;
    items: Array<{
      title: string;
      equipment: string;
      tests: string[];
      category: string;
    }>;
  };

  const icons = [Wrench, Activity, Thermometer, BarChart3, Target];

  if (!scope?.items) return null;

  return (
    <Section className="bg-surface/30">
      <SectionHeader
        eyebrow={scope.eyebrow}
        title={scope.title}
        description={scope.description}
        className="mb-10"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {scope.items.map((item, i) => {
          const Icon = icons[i] || Wrench;
          const isLast = i === scope.items.length - 1;
          return (
            <div
              key={item.title}
              className={`bento-card rounded-lg p-6 space-y-5 ${isLast ? "md:col-span-2 max-w-2xl mx-auto w-full" : ""}`}
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-sm border border-blue/20 bg-blue/10 text-blue">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-medium text-sand leading-snug">{item.title}</h3>
              </div>

              <div className="space-y-3">
                <div>
                  <span className="mono-label text-blue text-[11px] uppercase tracking-wider">Test systems / equipment</span>
                  <p className="text-sm text-gray leading-relaxed mt-1">{item.equipment}</p>
                </div>

                <div>
                  <span className="mono-label text-blue text-[11px] uppercase tracking-wider">Tests / capabilities</span>
                  <ul className="mt-1.5 space-y-1">
                    {item.tests.map((test) => (
                      <li key={test} className="flex items-start gap-2 text-sm text-gray/90">
                        <span className="w-1 h-1 rounded-full bg-blue mt-2 shrink-0" />
                        <span className="leading-relaxed">{test}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-2 border-t border-gray/10">
                <span className="mono-label text-[11px] text-gray/70 uppercase tracking-wider">Category</span>
                <p className="text-xs text-sand/80 leading-relaxed mt-1">{item.category}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}

export const TestingServices = () => (
  <ServicePageTemplate seoKey="testingServices" nsKey="testing" heroImage={testingHero}>
    <TestingScopeSection />
  </ServicePageTemplate>
);

export const ControlSystemsDesign = () => (
  <ServicePageTemplate seoKey="controlSystems" nsKey="controlSystems" heroImage={controlSystemsHero} />
);

export const MechanicalDesign = () => (
  <ServicePageTemplate seoKey="mechanicalDesign" nsKey="mechanicalDesign" heroImage={mechanicalDesignHero} />
);

export const RetrofitModernisation = () => (
  <ServicePageTemplate seoKey="retrofitModernization" nsKey="retrofit" heroImage={retrofitHero} />
);

export const MaintenanceRepair = () => (
  <ServicePageTemplate seoKey="maintenanceRepair" nsKey="maintenance" heroImage={maintenanceHero} />
);

export const SubsystemIntegration = () => (
  <ServicePageTemplate seoKey="subsystemIntegration" nsKey="subsystemIntegration" heroImage={subsystemHero} />
);
