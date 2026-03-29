import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { Download } from "lucide-react";
import { getFeaturedBrochure } from "@/lib/brochures";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedPath } from "@/lib/routes";

export function CataloguesSection() {
  const { t } = useTranslation(["home", "common"]);
  const { lang } = useLanguage();
  const featured = getFeaturedBrochure();

  return (
    <section className="py-20 md:py-28 px-6">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow={t("home:catalogues.eyebrow")}
            title={t("home:catalogues.title")}
            description={t("home:catalogues.description")}
            className="mb-14"
          />
        </Reveal>

        {featured && (
          <Reveal delay={80}>
            <div className="bento-card rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-[240px_1fr] gap-0 mb-8">
              <div className="relative bg-surface overflow-hidden">
                <img src={featured.coverUrl} alt={featured.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-6 flex flex-col justify-center space-y-3">
                <span className="mono-label text-blue text-[10px]">{t("home:catalogues.featuredBrochure")}</span>
                <h3 className="text-base font-medium text-sand">{featured.title}</h3>
                <p className="text-xs text-gray leading-relaxed line-clamp-3">{featured.description}</p>
                <div className="pt-1">
                  <Button asChild size="sm">
                    <a href={featured.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="w-3 h-3 mr-1.5" />
                      {t("common:buttons.downloadPdf")}
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        )}

        <Reveal delay={200}>
          <div className="text-center">
            <Button asChild variant="outline">
              <Link to={localizedPath("/catalogs", lang)}>{t("common:buttons.viewAllResources")}</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
