import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import {
  ArrowRight, Thermometer, Gauge, Settings, RefreshCw, Wrench, Box,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const services = [
  { icon: <Thermometer className="w-6 h-6" />, title: "Testing Services", description: "Execution and support of thermal vacuum test campaigns for qualification, validation, and development programs requiring stable environmental control and repeatable workflows.", deliverables: ["Test campaign execution", "Data acquisition and reporting", "Qualification and acceptance testing", "Engineering support"], href: "/services/testing-services" },
  { icon: <Gauge className="w-6 h-6" />, title: "Control Systems Design", description: "Design of chamber control architectures, automation logic, user interfaces, instrumentation integration, and reliable operating concepts for TVAC environments.", deliverables: ["Control architecture design", "Automation and HMI development", "Instrumentation integration", "System commissioning"], href: "/services/control-systems-design" },
  { icon: <Settings className="w-6 h-6" />, title: "Mechanical Design", description: "Engineering of chamber assemblies, interfaces, fixturing, support structures, and customer-specific mechanical integration concepts.", deliverables: ["Chamber structural design", "Fixture engineering", "Interface specification", "Integration concepts"], href: "/services/mechanical-design" },
  { icon: <RefreshCw className="w-6 h-6" />, title: "Retrofit & Modernisation", description: "Technical upgrades for legacy TVAC systems to improve reliability, safety, control precision, usability, and lifecycle value.", deliverables: ["System assessment", "Upgrade engineering", "Control system modernisation", "Safety improvements"], href: "/services/retrofit-modernisation" },
  { icon: <Wrench className="w-6 h-6" />, title: "Maintenance & Repair", description: "Diagnostics, preventive servicing, repair, and technical support to reduce downtime and sustain chamber availability.", deliverables: ["Preventive maintenance", "Diagnostics and repair", "Spare parts support", "On-site service"], href: "/services/maintenance-repair" },
  { icon: <Box className="w-6 h-6" />, title: "Subsystem Integration", description: "Integration of thermal, vacuum, instrumentation, and control subsystems into coherent test environments tailored to project-specific requirements.", deliverables: ["Subsystem specification", "Interface engineering", "System integration", "Acceptance testing"], href: "/services/subsystem-integration" },
];

const faqs = [
  { q: "Does Deepvac provide services for chambers from other manufacturers?", a: "Yes. Deepvac's service capabilities — including retrofit, maintenance, repair, and control system upgrades — can be applied to thermal vacuum systems from various manufacturers." },
  { q: "Can Deepvac support test campaigns at customer facilities?", a: "Deepvac provides testing services including on-site support for thermal vacuum test campaigns, depending on project requirements and facility access." },
  { q: "How does Deepvac's service offering relate to its chamber products?", a: "Deepvac's engineering services are designed to complement its chamber products, providing integrated support from initial system design through long-term operation. Services are also available independently for existing chamber infrastructure." },
];

const Services = () => (
  <Layout>
    <PageShell>
      <PageHero
        eyebrow="Engineering Services"
        title="End-to-End TVAC Engineering Support"
        description="Deepvac provides engineering services across the full lifecycle of thermal vacuum systems — from control architecture design and test campaign execution to retrofit, maintenance, and subsystem integration. Each service is grounded in practical chamber engineering experience."
      >
        <div className="flex flex-wrap gap-3 pt-4">
          <Button asChild size="lg" className="font-mono text-xs tracking-wide">
            <Link to="/contact">Discuss Your Requirements</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/products">Explore Chamber Products</Link>
          </Button>
        </div>
      </PageHero>

      {/* Service Cards */}
      <Section>
        <div className="space-y-6">
          {services.map((s) => (
            <div key={s.title} className="bento-card rounded-lg overflow-hidden group">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-0">
                <div className="p-8 lg:p-10 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-surface-raised border border-gray/15 flex items-center justify-center text-blue">
                      {s.icon}
                    </div>
                    <div>
                      <span className="mono-label text-blue">Service</span>
                      <h2 className="text-xl md:text-2xl font-medium text-sand tracking-tight">{s.title}</h2>
                    </div>
                  </div>
                  <p className="text-sm text-gray leading-relaxed max-w-2xl">{s.description}</p>
                  <Button asChild variant="outline" className="self-start group/btn">
                    <Link to={s.href}>
                      Learn More
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
                <div className="border-l border-gray/10 p-8 bg-surface-raised/30 flex flex-col justify-center">
                  <span className="mono-label text-gray/50 mb-3">Key Deliverables</span>
                  <ul className="space-y-2.5">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-xs text-gray leading-relaxed">
                        <span className="w-1 h-1 rounded-full bg-blue mt-1.5 shrink-0" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="section-divider" />

      {/* Cross-link Products */}
      <Section className="bg-surface/30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-4">
            <SectionHeader
              eyebrow="Integrated Offering"
              title="Services + Chamber Systems"
              description="Deepvac's engineering services are designed to integrate with our Standard Series and Custom TVAC platforms — or to support existing chamber infrastructure from any manufacturer."
            />
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button asChild variant="outline" className="group/btn">
              <Link to="/products/standard-series">Standard Series <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" /></Link>
            </Button>
            <Button asChild variant="outline" className="group/btn">
              <Link to="/products/custom-tvac">Custom TVAC <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" /></Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeader eyebrow="FAQ" title="Service Questions" className="mb-10" />
        <Accordion type="single" collapsible className="max-w-3xl">
          {faqs.map((faq, i) => (
            <AccordionItem key={i} value={`faq-${i}`} className="border-gray/15">
              <AccordionTrigger className="text-sand text-sm text-left hover:no-underline">{faq.q}</AccordionTrigger>
              <AccordionContent className="text-gray text-sm leading-relaxed">{faq.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Section>

      <CTABand
        title="Discuss Your Engineering Requirements"
        description="Whether you need testing support, control system design, or lifecycle services for your thermal vacuum infrastructure, Deepvac can help."
      >
        <Button asChild size="lg" className="font-mono text-xs tracking-wide">
          <Link to="/contact">Talk to an Engineer</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/contact">Request a Quote</Link>
        </Button>
      </CTABand>
    </PageShell>
  </Layout>
);

export default Services;
