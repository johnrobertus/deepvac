import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { ServiceCard } from "@/components/ServiceCard";
import { Thermometer, Gauge, Wrench, RefreshCw, Settings, Box } from "lucide-react";

const services = [
  { icon: <Thermometer className="w-5 h-5" />, title: "Testing Services", description: "Thermal vacuum testing with engineering-grade precision.", href: "/services/testing-services" },
  { icon: <Gauge className="w-5 h-5" />, title: "Control Systems Design", description: "Advanced automation, monitoring, and data acquisition.", href: "/services/control-systems-design" },
  { icon: <Settings className="w-5 h-5" />, title: "Mechanical Design", description: "Structural and mechanical engineering for vacuum systems.", href: "/services/mechanical-design" },
  { icon: <RefreshCw className="w-5 h-5" />, title: "Retrofit & Modernisation", description: "Upgrade and modernise existing chamber infrastructure.", href: "/services/retrofit-modernisation" },
  { icon: <Wrench className="w-5 h-5" />, title: "Maintenance & Repair", description: "Lifecycle support, repair, and preventive maintenance.", href: "/services/maintenance-repair" },
  { icon: <Box className="w-5 h-5" />, title: "Subsystem Integration", description: "Integration of thermal, vacuum, and electrical subsystems.", href: "/services/subsystem-integration" },
];

const Services = () => (
  <Layout>
    <PageShell>
      <PageHero eyebrow="Engineering Services" title="End-to-End TVAC Expertise" description="From design and testing to retrofit and lifecycle support." />
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <ServiceCard key={s.title} icon={s.icon} title={s.title} description={s.description} />
          ))}
        </div>
      </Section>
    </PageShell>
  </Layout>
);

export default Services;
