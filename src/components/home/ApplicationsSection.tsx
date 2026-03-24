import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { Satellite, Rocket, FlaskConical, Thermometer, ShieldCheck, Boxes } from "lucide-react";

const useCases = [
  {
    icon: <Satellite className="w-5 h-5" />,
    title: "Satellite Subsystem Qualification",
    description:
      "Thermal vacuum qualification of satellite components and subsystems under representative space conditions.",
  },
  {
    icon: <Rocket className="w-5 h-5" />,
    title: "Payload and Instrument Validation",
    description:
      "Environmental simulation and thermal verification of payload-critical hardware before integration and deployment.",
  },
  {
    icon: <Thermometer className="w-5 h-5" />,
    title: "Thermal Cycling and Durability Testing",
    description:
      "Controlled thermal cycling under high vacuum for material, assembly, and component durability verification.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Contamination-Controlled Test Environments",
    description:
      "High-purity, low-outgassing test conditions for contamination-sensitive hardware and reproducible vacuum test campaigns.",
  },
  {
    icon: <FlaskConical className="w-5 h-5" />,
    title: "R&D and Prototype Verification",
    description:
      "Flexible chamber configurations for development programs, pilot setups, early validation, and iterative hardware testing.",
  },
  {
    icon: <Boxes className="w-5 h-5" />,
    title: "Custom Space Environment Simulation",
    description:
      "Application-specific chamber configurations for unique geometries, interfaces, radiative conditions, and thermal profiles.",
  },
];

export function ApplicationsSection() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Applications"
            title="Built for Qualification, Thermal Cycling, and Mission-Critical Verification"
            description="Deepvac chamber platforms support qualification, validation, and development testing of space and high-performance hardware under controlled thermal and high-vacuum conditions."
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
