import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Linkedin, Cpu, Thermometer, Settings, Users } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { getHreflangs, getCanonical, localizedPath } from "@/lib/routes";
import johnPhoto from "@/assets/john-robertus.jpg";
import antonPhoto from "@/assets/anton-opalikhin.jpg";

const founderPhotos = [
  { photo: johnPhoto, photoPosition: "50% 18%", photoScale: 1.23 },
  { photo: antonPhoto, photoPosition: "50% 16%", photoScale: 1.03 },
];

const philosophyIcons = [Settings, Cpu, Users];

const Team = () => {
  const { t } = useTranslation("team");
  const { t: tSeo } = useTranslation("seo");
  const { t: tc } = useTranslation("common");
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const hreflangs = getHreflangs(pathname);
  const canonical = getCanonical(pathname, lang);

  const storyParagraphs = t("story.paragraphs", { returnObjects: true }) as string[];
  const competencies = t("story.competencies", { returnObjects: true }) as string[];
  const founders = t("founders", { returnObjects: true }) as Array<{ name: string; role: string; description: string; focus: string[] }>;
  const philItems = t("philosophy.items", { returnObjects: true }) as Array<{ title: string; description: string }>;
  const partnerItems = t("partnership.items", { returnObjects: true }) as Array<{ title: string; text: string }>;

  return (
    <Layout>
      <Helmet>
        <html lang={lang} />
        <title>{tSeo("team.title")}</title>
        <meta name="description" content={tSeo("team.description")} />
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
              <SectionHeader eyebrow={t("story.eyebrow")} title={t("story.title")} />
              <div className="space-y-4 text-sm text-gray leading-relaxed">
                {storyParagraphs.map((p: string, i: number) => <p key={i}>{p}</p>)}
              </div>
            </div>
            <div className="bento-card rounded-lg p-6 space-y-4">
              <span className="mono-label text-blue">{t("story.competenciesTitle")}</span>
              <div className="grid grid-cols-2 gap-3">
                {competencies.map((skill: string) => (
                  <div key={skill} className="flex items-center gap-2 text-xs text-gray">
                    <span className="w-1 h-1 rounded-full bg-blue flex-shrink-0" />
                    {skill}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Section>

        <Section className="bg-surface/30">
          <SectionHeader
            eyebrow={t("leadership.eyebrow")}
            title={t("leadership.title")}
            description={t("leadership.description")}
            className="mb-14"
          />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
            {founders.map((member, i) => (
              <div key={member.name} className="bento-card rounded-lg overflow-hidden">
                <div className="aspect-[4/5] overflow-hidden bg-black">
                  <img
                    src={founderPhotos[i].photo}
                    alt={`${member.name} | ${member.role}`}
                    loading="lazy"
                    className="w-full h-full object-cover"
                    style={{
                      objectPosition: founderPhotos[i].photoPosition,
                      transform: `scale(${founderPhotos[i].photoScale})`,
                      transformOrigin: "center top",
                    }}
                  />
                </div>
                <div className="p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-sand">{member.name}</h3>
                      <span className="mono-label text-blue">{member.role}</span>
                    </div>
                    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray/40 hover:text-blue transition-colors" aria-label={`${member.name} LinkedIn`}>
                      <Linkedin className="w-4 h-4" />
                    </a>
                  </div>
                  <p className="text-sm text-gray leading-relaxed">{member.description}</p>
                  <div className="pt-2 border-t border-gray/10 space-y-2">
                    <span className="mono-label">{t("leadership.focusAreas")}</span>
                    <div className="flex flex-wrap gap-2">
                      {member.focus.map((f: string) => (
                        <span key={f} className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-blue border border-blue/20 rounded-sm bg-blue/5">{f}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeader eyebrow={t("philosophy.eyebrow")} title={t("philosophy.title")} description={t("philosophy.description")} className="mb-14" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {philItems.map((item, i) => {
              const Icon = philosophyIcons[i];
              return (
                <div key={item.title} className="bento-card rounded-lg p-6 space-y-4">
                  <div className="w-10 h-10 rounded-sm bg-blue/10 border border-blue/20 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-blue" />
                  </div>
                  <h3 className="text-base font-medium text-sand">{item.title}</h3>
                  <p className="text-sm text-gray leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </Section>

        <Section className="bg-surface/30">
          <SectionHeader eyebrow={t("partnership.eyebrow")} title={t("partnership.title")} className="mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
            {partnerItems.map((item) => (
              <div key={item.title} className="flex gap-4">
                <span className="w-1.5 h-1.5 rounded-full bg-blue mt-2 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-medium text-sand">{item.title}</h3>
                  <p className="text-sm text-gray leading-relaxed mt-1">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </Section>

        <CTABand title={t("cta.title")} description={t("cta.description")}>
          <Button asChild>
            <Link to={localizedPath("/contact", lang)}>{tc("buttons.requestConsultation")}</Link>
          </Button>
          <Button asChild variant="outline">
            <Link to={localizedPath("/careers", lang)}>{tc("buttons.viewOpenPositions")}</Link>
          </Button>
        </CTABand>
      </PageShell>
    </Layout>
  );
};

export default Team;
