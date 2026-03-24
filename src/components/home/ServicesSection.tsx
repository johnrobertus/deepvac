import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/SectionHeader";
import { Reveal } from "@/components/Reveal";
import { ArrowRight, Thermometer, Gauge, Settings, RefreshCw, Wrench, Boxes } from "lucide-react";

const servicePillars = [
  {
    title: "New Chamber Development",
    description:
      "Support for the planning and implementation of new thermal vacuum infrastructure, from early engineering through system realization.",
  },
  {
    title: "Modernization & Upgrades",
    description:
      "Targeted upgrades for legacy systems to improve control quality, reliability, operability, and long-term technical performance.",
  },
  {
    title: "Operations & Lifecycle Support",
    description:
      "Maintenance, repair, and campaign support to keep test infrastructure available, stable, and ready for demanding qualification workflows.",
  },
];

const services = [
  {
    icon: <Thermometer className="h-5 w-5" />,
    label: "Campaign support",
    title: "Testing Services",
    description:
      "Support for qualification, validation, and development test campaigns requiring stable environmental control and repeatable workflows.",
    href: "/services/testing-services",
  },
  {
    icon: <Gauge className="h-5 w-5" />,
    label: "Control architecture",
    title: "Control Systems Design",
    description:
      "Design of chamber control architectures, automation logic, user interfaces, and instrumentation integration for reliable system operation.",
    href: "/services/control-systems-design",
  },
  {
    icon: <Settings className="h-5 w-5" />,
    label: "Mechanical engineering",
    title: "Mechanical Design",
    description:
      "Engineering of chamber assemblies, interfaces, fixturing, support structures, and application-specific mechanical integration concepts.",
    href: "/services/mechanical-design",
  },
  {
    icon: <RefreshCw className="h-5 w-5" />,
    label: "Legacy system upgrades",
    title: "Retrofit & Modernization",
    description:
      "Technical upgrades for legacy TVAC systems to improve reliability, operability, safety, control precision, and lifecycle performance.",
    href: "/services/retrofit-modernisation",
  },
  {
    icon: <Wrench className="h-5 w-5" />,
    label: "Availability support",
    title: "Maintenance & Repair",
    description:
      "Diagnostics, preventive maintenance, servicing, and repair to support long-term chamber availability and reduced downtime.",
    href: "/services/maintenance-repair",
  },
  {
    icon: <Boxes className="h-5 w-5" />,
    label: "System integration",
    title: "Subsystem Integration",
    description:
      "Integration of thermal, vacuum, instrumentation, and control subsystems into coherent test environments tailored to specific customer requirements.",
    href: "/services/subsystem-integration",
  },
];

export function ServicesSection() {
  return (
    <section className="bg-surface/30 px-6 py-20 md:py-28">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Engineering Services"
            title="Support Across the Full TVAC Lifecycle"
            description="From new chamber development to modernization, maintenance, and subsystem integration, Deepvac supports thermal vacuum infrastructure across planning, implementation, and long-term operation."
            className="mb-10"
          />
        </Reveal>

        <div className="mb-8 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-gray/10 bg-gray/10 lg:grid-cols-3">
          {servicePillars.map((pillar, i) => (
            <Reveal key={pillar.title} delay={i * 70}>
              <div className="h-full bg-background/60 px-6 py-5">
                <h3 className="text-sm font-medium text-sand">{pillar.title}</h3>
                <p className="mt-2 text-xs leading-relaxed text-gray">{pillar.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, i) => (
            <Reveal key={service.title} delay={120 + i * 60}>
              <div className="bento-card group flex h-full flex-col justify-between rounded-lg p-6 transition-all duration-300 hover:border-blue/20 hover:bg-background/40">
                <div className="space-y-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-sm border border-blue/20 bg-blue/10 text-blue">
                    {service.icon}
                  </div>

                  <div className="space-y-2">
                    <span className="mono-label text-blue">{service.label}</span>
                    <h3 className="text-base font-medium text-sand">{service.title}</h3>
                    <p className="text-sm leading-relaxed text-gray">{service.description}</p>
                  </div>
                </div>

                <div className="pt-5">
                  <Link
                    to={service.href}
                    className="inline-flex items-center gap-1.5 text-sm text-sand transition-colors hover:text-blue"
                  >
                    Explore Service
                    <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </Link>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
