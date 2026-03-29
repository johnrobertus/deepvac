import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedPath } from "@/lib/routes";
import tseriesImg from "@/assets/tseries-chamber.png";
import cseriesImg from "@/assets/cseries-chamber.jpg";
import customImg from "@/assets/custom-chamber.jpg";

const productImages = [tseriesImg, cseriesImg, customImg];
const productHrefs = ["/products/standard-series", "/products/standard-series", "/products/custom-tvac"];

export function ProductPortfolioSection() {
  const { t } = useTranslation("home");
  const { lang } = useLanguage();

  const productKeys = ["tSeries", "cSeries", "custom"] as const;

  return (
    <section className="bg-surface/30 px-6 py-20 md:py-28">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow={t("productPortfolio.eyebrow")}
            title={t("productPortfolio.title")}
            description={t("productPortfolio.description")}
            className="mb-14"
          />
        </Reveal>

        <div className="space-y-8">
          {productKeys.map((key, i) => {
            const prefix = `productPortfolio.${key}`;
            const overlays = t(`${prefix}.overlays`, { returnObjects: true }) as string[];
            const specs = t(`${prefix}.specs`, { returnObjects: true }) as Record<string, { label: string; value: string }>;
            const specsArr = Object.values(specs);

            return (
              <Reveal key={key} delay={i * 100}>
                <div className="bento-card group overflow-hidden rounded-lg">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className={`relative flex items-center justify-center overflow-hidden bg-[#0a0a0a] ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                      <img
                        src={productImages[i]}
                        alt={`${t(`${prefix}.title`)}, ${t(`${prefix}.subtitle`)}`}
                        className="h-full max-h-[400px] w-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.02] lg:max-h-[420px]"
                        loading="lazy"
                      />
                      <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                        {Array.isArray(overlays) && overlays.map((label) => (
                          <span key={label} className="glass-overlay rounded-sm px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-blue-light/80">{label}</span>
                        ))}
                      </div>
                    </div>

                    <div className={`flex flex-col justify-center space-y-5 p-8 lg:p-10 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                      <div>
                        <span className="mono-label text-blue">{t(`${prefix}.subtitle`)}</span>
                        <h3 className="mt-2 text-2xl font-medium tracking-tight text-sand md:text-3xl">{t(`${prefix}.title`)}</h3>
                      </div>
                      <p className="text-sm leading-relaxed text-gray">{t(`${prefix}.description`)}</p>
                      <div className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2">
                        {specsArr.map((spec) => (
                          <div key={spec.label} className="rounded-md border border-gray/10 bg-background/20 px-4 py-3">
                            <span className="mono-label">{spec.label}</span>
                            <p className="mt-1 font-mono text-xs text-sand">{spec.value}</p>
                          </div>
                        ))}
                      </div>
                      <p className="text-[11px] leading-relaxed text-gray/70">{t(`${prefix}.note`)}</p>
                      <div>
                        <Button asChild variant="outline" className="group/btn">
                          <Link to={localizedPath(productHrefs[i], lang)}>
                            {t(`${prefix}.cta`)}
                            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
