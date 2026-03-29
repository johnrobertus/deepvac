import { useTranslation } from "react-i18next";
import { Reveal } from "@/components/Reveal";
import existFunding from "@/assets/exist-funding.jpg";

export function FundingSection() {
  const { t } = useTranslation("home");

  return (
    <section className="py-16 px-6">
      <div className="container max-w-6xl">
        <Reveal>
          <div className="space-y-4 text-center">
            <span className="mono-label text-blue block">{t("funding.eyebrow")}</span>
            <p className="text-xs text-gray/60 leading-relaxed max-w-2xl mx-auto">{t("funding.description")}</p>
            <div className="mt-6 rounded-lg overflow-hidden bg-white/95 p-6 max-w-3xl mx-auto">
              <img src={existFunding} alt={t("funding.altText")} className="w-full h-auto block" loading="lazy" />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
