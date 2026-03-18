import { PlaceholderImage } from "@/components/PlaceholderImage";
import { Reveal } from "@/components/Reveal";

export function FundingSection() {
  return (
    <section className="py-16 px-6">
      <div className="container max-w-6xl">
        <Reveal>
          <div className="border border-gray/10 rounded-lg p-8 flex flex-col sm:flex-row items-center gap-8">
            <div className="flex gap-6 flex-shrink-0">
              <div className="w-24 h-16 border border-gray/10 rounded-sm flex items-center justify-center blueprint-grid">
                <span className="font-mono text-[8px] uppercase text-gray/30">EXIST</span>
              </div>
              <div className="w-24 h-16 border border-gray/10 rounded-sm flex items-center justify-center blueprint-grid">
                <span className="font-mono text-[8px] uppercase text-gray/30">BMBF</span>
              </div>
            </div>
            <div>
              <span className="mono-label text-blue">Funded & Supported</span>
              <p className="text-xs text-gray/60 mt-1 leading-relaxed">
                DEEPVAC is supported through public funding programs. Institutional and program logos will be displayed as formal approvals are confirmed.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
