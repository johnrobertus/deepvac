import { Reveal } from "@/components/Reveal";
import existFunding from "@/assets/exist-funding.jpg";

export function FundingSection() {
  return (
    <section className="py-16 px-6">
      <div className="container max-w-6xl">
        <Reveal>
          <div className="space-y-4">
            <span className="mono-label text-blue">Funded & Supported</span>
            <p className="text-xs text-gray/60 leading-relaxed max-w-2xl">
              Deepvac is supported through public funding programs.
            </p>
            <div className="mt-6 rounded-lg overflow-hidden bg-white/95 p-6 max-w-3xl">
              <img
                src={existFunding}
                alt="EXIST funding programme — supported by the Federal Ministry for Economic Affairs and Energy and co-funded by the European Union"
                className="w-full h-auto"
                loading="lazy"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
