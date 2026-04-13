import { cn } from "@/lib/utils";
import thermalHero from "@/assets/thermal-vision-hero.png";

interface ThermalVisionCardProps {
  className?: string;
  onInquiry?: () => void;
}

export function ThermalVisionCard({ className, onInquiry }: ThermalVisionCardProps) {
  return (
    <div
      className={cn(
        "group max-w-[420px] w-full rounded-xl border border-gray-200 bg-white overflow-hidden transition-shadow duration-300 hover:shadow-[0_8px_30px_-12px_rgba(0,0,0,0.15)]",
        className
      )}
    >
      {/* Hero image */}
      <div className="relative h-[280px] w-full overflow-hidden">
        <img
          src={thermalHero}
          alt="Deepvac Thermal Vision – Thermalkamera-Integration für Thermovakuumkammern"
          className="h-full w-full object-cover"
        />
        {/* Bottom gradient overlay */}
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        {/* Text overlay */}
        <div className="absolute inset-x-0 bottom-0 px-6 pb-5">
          <h3 className="text-2xl font-medium leading-tight text-white">
            Deepvac Thermal Vision
          </h3>
          <p className="mt-1.5 text-[13px] leading-snug text-white/70">
            Thermalkamera-Integration für Thermovakuumkammern
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-5 px-6 py-6">
        {/* Body text */}
        <p className="text-[14px] leading-[1.8] text-gray-700">
          Deepvac Thermal Vision ermöglicht die kontinuierliche Aufnahme kalibrierter
          Wärmebilder von Prüflingen unter Hochvakuum-Bedingungen, unter denen
          handelsübliche Kamerasysteme ohne gezielte Schutzmaßnahmen nicht
          funktionsfähig sind. Die Kamera wird in einem druckdichten Schutzgehäuse mit
          IR-transparentem Sichtfenster betrieben. Ein aktives Kühl- und Heizsystem
          hält die Kamera dauerhaft im sicheren Betriebsbereich. Die PID-basierte
          Temperaturregelung lässt sich in bestehende Kammersteuerungen integrieren.
          Geeignet für Neuanlagen und Retrofit bestehender TVAC-Systeme – Engineering
          und Hardwarebeschaffung aus einer Hand.
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          <span className="rounded-full bg-teal-800 px-3 py-1 text-[12px] font-medium text-white">
            Raumfahrt &amp; Verteidigung
          </span>
          <span className="rounded-full bg-teal-800 px-3 py-1 text-[12px] font-medium text-white">
            TVAC-Systeme
          </span>
        </div>

        {/* CTA */}
        <button
          onClick={onInquiry}
          className="mt-1 w-full rounded-lg border border-teal-800 px-4 py-2.5 text-[14px] font-medium text-teal-800 transition-colors duration-200 hover:bg-teal-800 hover:text-white"
        >
          Technische Anfrage stellen →
        </button>
      </div>
    </div>
  );
}
