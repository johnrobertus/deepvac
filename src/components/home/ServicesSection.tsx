import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, Thermometer, Gauge, Settings, RefreshCw, Wrench, Box } from "lucide-react";

const services = [
  {
    icon: <Thermometer className="w-5 h-5" />,
    title: "Testing Services",
    description:
      "Execution and support of thermal vacuum test campaigns for qualification, validation, and development programs requiring stable environmental control and repeatable workflows.",
    href: "/services/testing-services",
  },
  {
    icon: <Gauge className="w-5 h-5" />,
    title: "Control Systems Design",
    description:
      "Design of chamber control architectures, automation logic, user interfaces, and instrumentation integration for reliable and efficient system operation.",
    href: "/services/control-systems-design",
  },
  {
    icon: <Settings className="w-5 h-5" />,
    title: "Mechanical Design",
    description:
      "Engineering of chamber assemblies, interfaces, fixturing, support structures, and application-specific mechanical integration concepts.",
    href: "/services/mechanical-design",
  },
  {
    icon: <RefreshCw className="w-5 h-5" />,
    title: "Retrofit & Modernisation",
    description:
      "Technical upgrades for legacy TVAC systems to improve reliability, operability, safety, control precision, and lifecycle performance.",
    href: "/services/retrofit-modernisation",
  },
  {
    icon: <Wrench className="w-5 h-5" />,
    title: "Maintenance & Repair",
    description:
      "Diagnostics, servicing, preventive maintenance, and repair to support long-term chamber availability and reduced downtime.",
    href: "/services/maintenance-repair",
  },
  {
    icon: <Box className="w-5 h-5" />,
    title: "Subsystem Integration",
    description:
      "Integration of thermal, vacuum, instrumentation, and control subsystems into coherent test environments tailored to specific customer requirements.",
    href: "/services/subsystem-integration",
  },
];

export function ServicesSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface/30">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Engineering Services"
            title="End-to-End TVAC Expertise"
            description="From chamber design and test execution to retrofit, maintenance, and subsystem integration."
            className="mb-14"
          />
        </Reveal>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 60}>
              <div className="bento-card rounded-lg p-6 border-l-2 border-l-blue/40 group cursor-pointer flex flex-col justify-between gap-5 h-full">
                <div className="space-y-3">
                  <div className="w-9 h-9 rounded-sm bg-blue/10 border border-blue/20 flex items-center justify-center text-blue">
                    {s.icon}
                  </div>
                  <h3 className="text-base font-medium text-sand">{s.title}</h3>
                  <p className="text-xs text-gray leading-relaxed">{s.description}</p>
                </div>
                <Button asChild variant="tertiary" className="self-start">
                  <Link to={s.href}>
                    Learn More <ArrowRight className="w-3 h-3 ml-1" />
                  </Link>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
