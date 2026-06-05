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
    <section id="catalogs" className="py-24 md:py-32 px-6">
      <div className="container-wide">
        <Reveal>
          <SectionHeader
            eyebrow={t("home:catalogues.eyebrow")}
            title={t("home:catalogues.title")}
            description={t("home:catalogues.description")}
            className="mb-16"
          />
        </Reveal>

        {featured && (
          <Reveal delay={80}>
            <div className="bento-card rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-[260px_1fr] gap-0 max-w-3xl">
              <div className="relative bg-surface overflow-hidden">
                <img src={featured.coverUrl} alt={featured.title} className="w-full h-full object-cover" loading="lazy" />
              </div>
              <div className="p-7 flex flex-col justify-center space-y-3">
                <span className="mono-label text-blue text-[10px]">{t("home:catalogues.featuredBrochure")}</span>
                <h3 className="text-base font-medium text-sand">{featured.title}</h3>
                <div className="pt-1 flex flex-wrap gap-3">
                  <Button asChild size="sm">
                    <a href={featured.pdfUrl} target="_blank" rel="noopener noreferrer">
                      <Download className="w-3 h-3 mr-1.5" />
                      {t("common:buttons.downloadPdf")}
                    </a>
                  </Button>
                  <Button asChild size="sm" variant="outline">
                    <Link to={localizedPath("/catalogs", lang)}>{t("common:buttons.viewAllResources")}</Link>
                  </Button>
                </div>
              </div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}
