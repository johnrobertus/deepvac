import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import {
  Satellite,
  Rocket,
  FlaskConical,
  Thermometer,
  ShieldCheck,
  Boxes,
} from "lucide-react";

const useCases = [
  { icon: <Satellite className="w-5 h-5" />, title: "Satellite Subsystem Qualification", description: "Thermal vacuum testing of satellite components and subsystems under representative space conditions." },
  { icon: <Rocket className="w-5 h-5" />, title: "Payload Component Validation", description: "Environmental simulation and validation of payload-critical hardware before flight integration." },
  { icon: <FlaskConical className="w-5 h-5" />, title: "Research & Laboratory Testing", description: "Flexible chamber configurations for academic and institutional vacuum research programs." },
  { icon: <Thermometer className="w-5 h-5" />, title: "Thermal Cycling Under Vacuum", description: "Controlled thermal cycling workflows in high-vacuum conditions for materials and component durability testing." },
  { icon: <ShieldCheck className="w-5 h-5" />, title: "Contamination-Sensitive Testing", description: "Low-outgassing environments designed for contamination-critical test campaigns and cleanroom-adjacent workflows." },
  { icon: <Boxes className="w-5 h-5" />, title: "Custom Environmental Simulation", description: "Application-specific test conditions configured around unique geometries, interfaces, and thermal profiles." },
];

export function ApplicationsSection() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Applications"
            title="Built for Critical Test Campaigns"
            description="Deepvac chamber platforms support a range of aerospace, research, and industrial test scenarios."
            className="mb-14"
          />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((uc, i) => (
            <Reveal key={uc.title} delay={i * 60}>
              <div className="bento-card rounded-lg p-6 space-y-3 h-full">
                <div className="w-9 h-9 rounded-sm bg-blue/10 border border-blue/20 flex items-center justify-center text-blue">
                  {uc.icon}
                </div>
                <h3 className="text-sm font-medium text-sand">{uc.title}</h3>
                <p className="text-xs text-gray leading-relaxed">{uc.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
