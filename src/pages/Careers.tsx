import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Clock, Wrench, Cpu, Settings, Users, CheckCircle2, Workflow, FileText, MessageSquare, Building2 } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";

const reasonIcons = [Wrench, Settings, Cpu, Users];
const workIcons = [Workflow, Cpu, Wrench, FileText];
const processIcons = [FileText, MessageSquare, Settings, Building2, ArrowRight];

const Careers = () => {
  const { t } = useTranslation("careers");
  const { t: tSeo } = useTranslation("seo");
  const { t: tc } = useTranslation("common");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  const missionParagraphs = t("mission.paragraphs", { returnObjects: true }) as string[];
  const values = t("mission.values", { returnObjects: true }) as string[];
  const workAreas = t("workAreas.items", { returnObjects: true }) as Array<{ title: string; description: string }>;
  const reasons = t("reasons.items", { returnObjects: true }) as Array<{ title: string; description: string }>;
  const fitParagraphs = t("fit.paragraphs", { returnObjects: true }) as string[];
  const fitPoints = t("fit.fitPoints", { returnObjects: true }) as string[];
  const sendItems = t("opportunities.generalApplication.sendItems", { returnObjects: true }) as string[];
  const processSteps = t("process.steps", { returnObjects: true }) as Array<{ step: string; title: string; description: string }>;
  const cultureParagraphs = t("culture.paragraphs", { returnObjects: true }) as string[];
  const envItems = t("culture.environmentItems", { returnObjects: true }) as string[];

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("careers.title")}</title>
        <meta name="description" content={tSeo("careers.description")} />
        <link rel="canonical" href={canonical} />
        {hreflangs.map((h) => (
          <link key={h.lang} rel="alternate" hrefLang={h.lang} href={h.href} />
        ))}
      </Helmet>
      <PageShell>
        <PageHero eyebrow={t("eyebrow")} title={t("title")} description={t("description")} />

        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <SectionHeader eyebrow={t("mission.eyebrow")} title={t("mission.title")} />
              <div className="space-y-4 text-sm text-gray leading-relaxed">
                {missionParagraphs.map((p: string, i: number) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <div className="bento-card rounded-lg p-6 space-y-5">
              <span className="mono-label text-blue">{t("mission.valuesTitle")}</span>
              <div className="space-y-3">
                {values.map((v: string) => (
                  <div key={v} className="flex items-start gap-3 text-sm text-gray leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-blue mt-0.5 flex-shrink-0" />
                    <span>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section className="bg-surface/30">
          <SectionHeader eyebrow={t("workAreas.eyebrow")} title={t("workAreas.title")} className="mb-14" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {workAreas.map((item, i) => {
              const Icon = workIcons[i];
              return (
                <div key={item.title} className="bento-card rounded-lg p-6 space-y-4">
                  <div className="w-10 h-10 rounded-sm bg-blue/10 border border-blue/20 flex items-center justify-center"><Icon className="w-5 h-5 text-blue" /></div>
                  <h3 className="text-base font-medium text-sand">{item.title}</h3>
                  <p className="text-sm text-gray leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </Section>

        <Section>
          <SectionHeader eyebrow={t("reasons.eyebrow")} title={t("reasons.title")} className="mb-14" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reasons.map((reason, i) => {
              const Icon = reasonIcons[i];
              return (
                <div key={reason.title} className="bento-card rounded-lg p-6 space-y-4">
                  <div className="w-10 h-10 rounded-sm bg-blue/10 border border-blue/20 flex items-center justify-center"><Icon className="w-5 h-5 text-blue" /></div>
                  <h3 className="text-base font-medium text-sand">{reason.title}</h3>
                  <p className="text-sm text-gray leading-relaxed">{reason.description}</p>
                </div>
              );
            })}
          </div>
        </Section>

        <Section className="bg-surface/30">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <SectionHeader eyebrow={t("fit.eyebrow")} title={t("fit.title")} />
              <div className="space-y-4 text-sm text-gray leading-relaxed">
                {fitParagraphs.map((p: string, i: number) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <div className="bento-card rounded-lg p-6 space-y-5">
              <span className="mono-label text-blue">{t("fit.fitTitle")}</span>
              <div className="space-y-3">
                {fitPoints.map((point: string) => (
                  <div key={point} className="flex items-start gap-3 text-sm text-gray leading-relaxed">
                    <CheckCircle2 className="w-4 h-4 text-blue mt-0.5 flex-shrink-0" />
                    <span>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section>
          <SectionHeader eyebrow={t("opportunities.eyebrow")} title={t("opportunities.title")} description={t("opportunities.description")} className="mb-10" />
          <a
            href="mailto:careers@deepvac.space?subject=General%20Application"
            className="bento-card rounded-lg p-6 flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10 cursor-pointer group block"
          >
            <div className="flex-1 space-y-4">
              <div className="space-y-2">
                <h3 className="text-lg font-medium text-sand group-hover:text-blue transition-colors">{t("opportunities.generalApplication.title")}</h3>
                <p className="text-sm text-gray leading-relaxed">{t("opportunities.generalApplication.description")}</p>
              </div>
              <div className="flex flex-wrap gap-3 pt-1">
                <span className="flex items-center gap-1.5 mono-label"><MapPin className="w-3 h-3" />{t("opportunities.generalApplication.location")}</span>
                <span className="flex items-center gap-1.5 mono-label"><Clock className="w-3 h-3" />{t("opportunities.generalApplication.type")}</span>
                <span className="mono-label text-blue">{t("opportunities.generalApplication.department")}</span>
              </div>
              <div className="pt-2 border-t border-white/10">
                <p className="text-sm text-gray leading-relaxed">{t("opportunities.generalApplication.relevantBackgrounds")}</p>
              </div>
            </div>
            <div className="lg:w-[220px] flex flex-col gap-4">
              <div className="bento-card rounded-lg p-4 space-y-3">
                <span className="mono-label text-blue">{t("opportunities.generalApplication.whatToSend")}</span>
                <div className="space-y-2 text-sm text-gray leading-relaxed">
                  {sendItems.map((item: string) => (
                    <div key={item} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-blue mt-0.5 flex-shrink-0" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="flex items-center gap-1.5 text-sm text-blue font-mono group-hover:gap-2.5 transition-all">
                  {tc("buttons.applyNow")}
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </div>
          </a>
        </Section>

        <Section className="bg-surface/30">
          <SectionHeader eyebrow={t("process.eyebrow")} title={t("process.title")} description={t("process.description")} className="mb-14" />
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
            {processSteps.map((item, i) => {
              const Icon = processIcons[i];
              return (
                <div key={item.step} className="bento-card rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="mono-label text-blue">{item.step}</span>
                    <div className="w-9 h-9 rounded-sm bg-blue/10 border border-blue/20 flex items-center justify-center"><Icon className="w-4 h-4 text-blue" /></div>
                  </div>
                  <h3 className="text-base font-medium text-sand">{item.title}</h3>
                  <p className="text-sm text-gray leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </Section>

        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              <SectionHeader eyebrow={t("culture.eyebrow")} title={t("culture.title")} />
              <div className="space-y-4 text-sm text-gray leading-relaxed">
                {cultureParagraphs.map((p: string, i: number) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <div className="bento-card rounded-lg p-6 space-y-5">
              <span className="mono-label text-blue">{t("culture.environmentTitle")}</span>
              <div className="space-y-3 text-sm text-gray leading-relaxed">
                {envItems.map((item: string) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle2 className="w-4 h-4 text-blue mt-0.5 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <CTABand title={t("cta.title")} description={t("cta.description")}>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild>
              <a href="mailto:careers@deepvac.space?subject=Careers%20at%20Deepvac">{tc("buttons.emailUs")}</a>
            </Button>
            <Button asChild variant="outline">
              <Link to={localizedPath("/contact", lang)}>{tc("buttons.contactPage")}</Link>
            </Button>
          </div>
        </CTABand>
      </PageShell>
    </Layout>
  );
};

export default Careers;
