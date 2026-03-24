import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { Satellite, Rocket, FlaskConical, Thermometer, ShieldCheck, Boxes } from "lucide-react";

const useCases = [
  {
    icon: <Satellite className="w-5 h-5" />,
    title: "Satellite Subsystem Qualification",
    description:
      "Thermal vacuum testing of satellite components and subsystems under representative space conditions for qualification and performance verification.",
  },
  {
    icon: <Rocket className="w-5 h-5" />,
    title: "Payload & Instrument Qualification",
    description:
      "Environmental simulation and thermal vacuum verification of payload and instrument hardware before integration, launch, and mission use.",
  },
  {
    icon: <Thermometer className="w-5 h-5" />,
    title: "Thermal Cycling & Durability Testing",
    description:
      "Controlled thermal cycling under high vacuum for durability testing of materials, assemblies, and critical hardware components.",
  },
  {
    icon: <ShieldCheck className="w-5 h-5" />,
    title: "Contamination-Controlled Testing",
    description:
      "High-purity, low-outgassing test conditions for contamination-sensitive hardware and reproducible thermal vacuum test campaigns.",
  },
  {
    icon: <FlaskConical className="w-5 h-5" />,
    title: "Development & Prototype Testing",
    description:
      "Flexible chamber configurations for development programs, prototype validation, early-stage testing, and iterative hardware refinement.",
  },
  {
    icon: <Boxes className="w-5 h-5" />,
    title: "Custom TVAC Configurations",
    description:
      "Application-specific thermal vacuum systems tailored to unique geometries, interfaces, thermal profiles, and test requirements.",
  },
];

export function ApplicationsSection() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Applications"
            title="Built for Aerospace Qualification and Thermal Vacuum Testing"
            description="Deepvac systems support qualification, thermal cycling, development testing, and custom space environment simulation for spacecraft hardware, subsystems, and high-performance components."
            className="mb-14"
          />
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((useCase, i) => (
            <Reveal key={useCase.title} delay={i * 60}>
              <div className="bento-card rounded-lg p-7 space-y-4 h-full">
                <div className="w-10 h-10 rounded-sm bg-blue/10 border border-blue/20 flex items-center justify-center text-blue">
                  {useCase.icon}
                </div>

                <h3 className="text-sm font-medium text-sand">{useCase.title}</h3>

                <p className="text-xs text-gray leading-relaxed">{useCase.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
