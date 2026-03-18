import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { TechChip } from "@/components/TechChip";
import {
  ArrowRight,
  Ruler,
  Thermometer,
  Gauge,
  Cpu,
  Cable,
  FlaskConical,
  Settings,
  MessageSquare,
  FileCheck,
  Truck,
  Wrench,
} from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import customImg from "@/assets/custom-chamber.jpg";

const projectDrivers = [
  { icon: <Ruler className="w-5 h-5" />, title: "Non-Standard Geometries", description: "Test articles that exceed standard chamber dimensions or require specialised access, orientation, or mounting configurations." },
  { icon: <Thermometer className="w-5 h-5" />, title: "Specific Thermal Profiles", description: "Applications demanding precise temperature ranges, ramp rates, uniformity requirements, or multi-zone thermal control." },
  { icon: <Cable className="w-5 h-5" />, title: "Complex Feedthrough Requirements", description: "Electrical, optical, fluid, or mechanical feedthrough configurations that exceed standard port layouts." },
  { icon: <FlaskConical className="w-5 h-5" />, title: "Contamination-Sensitive Testing", description: "Hardware requiring low-outgassing environments, clean interfaces, and controlled material compatibility." },
  { icon: <Cpu className="w-5 h-5" />, title: "Specialised Control Architecture", description: "Custom automation logic, advanced data acquisition, or integration with existing facility control systems." },
  { icon: <Settings className="w-5 h-5" />, title: "Subsystem & Interface Constraints", description: "Integration with existing infrastructure, specific utility connections, or project-defined mechanical and electrical interfaces." },
];

const configDimensions = [
  { label: "Chamber Geometry", items: ["Custom dimensions and volumes", "Horizontal or vertical orientation", "Application-specific access ports", "Multi-door or removable end-cap configurations"] },
  { label: "Thermal System", items: ["Shroud and platen design", "Multi-zone thermal control", "Application-specific temperature ranges", "Bake-out capability"] },
  { label: "Vacuum Architecture", items: ["Pumping train configuration", "Application-dependent pressure regimes", "Leak-tight chamber design", "Clean vacuum environments"] },
  { label: "Instrumentation & Control", items: ["Sensor and measurement integration", "Custom automation and HMI", "Data acquisition systems", "Remote monitoring capability"] },
  { label: "Feedthroughs & Interfaces", items: ["Electrical and signal feedthroughs", "Fluid and gas connections", "Optical access ports", "Mechanical motion feedthroughs"] },
  { label: "Integration & Infrastructure", items: ["Facility interface engineering", "Utility and service connections", "Fixture and mounting systems", "Safety and interlock integration"] },
];

const processSteps = [
  { icon: <MessageSquare className="w-5 h-5" />, step: "01", title: "Requirements Discussion", description: "Technical consultation to understand your test requirements, payload characteristics, operational constraints, and integration context." },
  { icon: <Settings className="w-5 h-5" />, step: "02", title: "Concept & System Design", description: "Engineering concept development including chamber geometry, thermal architecture, vacuum design, instrumentation, and control system specification." },
  { icon: <FileCheck className="w-5 h-5" />, step: "03", title: "Detailed Engineering", description: "Detailed mechanical, electrical, and control system design with documentation, interface specifications, and design review milestones." },
  { icon: <Wrench className="w-5 h-5" />, step: "04", title: "Manufacturing & Assembly", description: "Precision manufacturing, subsystem assembly, and integration with quality control and testing throughout the build process." },
  { icon: <Truck className="w-5 h-5" />, step: "05", title: "Commissioning & Support", description: "Delivery, installation, acceptance testing, operator training, and transition to lifecycle support services." },
];

const faqs = [
  { q: "When should I consider a custom TVAC system instead of a standard platform?", a: "A custom configuration is appropriate when your test requirements include non-standard chamber dimensions, specific thermal profiles, complex feedthrough or instrumentation needs, contamination-sensitive hardware, or integration with existing facility infrastructure that exceeds the scope of standard platform options." },
  { q: "What information does DEEPVAC need to develop a custom system concept?", a: "A productive initial discussion typically covers test article characteristics, required pressure and temperature ranges, thermal cycling requirements, feedthrough and instrumentation needs, facility constraints, and project timeline. DEEPVAC can guide this requirements definition process." },
  { q: "What is the typical timeline for a custom TVAC project?", a: "Project timelines depend on system complexity, component lead times, and engineering scope. DEEPVAC provides project-specific timelines during the concept development phase." },
  { q: "Does DEEPVAC provide control systems for custom chambers?", a: "Yes. DEEPVAC designs and integrates custom control architectures including automation logic, user interfaces, data acquisition, and instrumentation integration as part of the system delivery." },
  { q: "Can DEEPVAC integrate custom chambers with existing facility infrastructure?", a: "Yes. Interface engineering and facility integration are core elements of DEEPVAC's custom chamber development process, including utility connections, safety systems, and control system interoperability." },
  { q: "What lifecycle support is available for custom systems?", a: "DEEPVAC provides comprehensive lifecycle support including preventive maintenance, repair services, control system upgrades, retrofit and modernisation, and subsystem integration for all custom-engineered systems." },
];

const CustomTVAC = () => (
  <Layout>
    <PageShell>
      <PageHero
        eyebrow="Products — Custom TVAC"
        title="Application-Specific Thermal Vacuum Engineering"
        description="When standard chamber platforms cannot meet your test requirements, DEEPVAC develops fully custom thermal vacuum systems — engineered from concept through commissioning around your specific geometry, thermal profile, instrumentation, and integration constraints."
      >
        <div className="flex flex-wrap gap-3 pt-4">
          <Button asChild size="lg" className="font-mono text-xs tracking-wide">
            <Link to="/contact">Discuss a Custom Configuration</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/contact">Request a Quote</Link>
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 pt-4">
          <TechChip label="Engineering" value="Bespoke" />
          <TechChip label="Integration" value="Full System" />
          <TechChip label="Support" value="Concept → Operation" />
        </div>
      </PageHero>

      {/* Hero Image */}
      <Section>
        <div className="relative rounded-lg overflow-hidden border border-gray/10">
          <img src={customImg} alt="DEEPVAC Custom Thermal Vacuum Chamber System" className="w-full h-auto object-cover max-h-[480px]" loading="lazy" />
          <div className="absolute top-4 left-4 glass-overlay rounded-md px-3 py-2">
            <span className="mono-label text-blue-light">Custom TVAC</span>
            <p className="font-mono text-xs text-sand mt-0.5">Engineered to Specification</p>
          </div>
          <div className="absolute bottom-4 right-4 glass-overlay rounded-md px-3 py-2">
            <span className="mono-label text-blue-light">Integration</span>
            <p className="font-mono text-xs text-sand mt-0.5">Hardware · Controls · Services</p>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* When Custom */}
      <Section>
        <SectionHeader
          eyebrow="Project Drivers"
          title="When Standard Isn't Enough"
          description="Custom thermal vacuum systems are engineered when your application demands capabilities, geometries, or integration requirements beyond the scope of standardised chamber platforms."
          className="mb-12"
        />
        <BentoGrid className="lg:grid-cols-3">
          {projectDrivers.map((driver) => (
            <BentoCard key={driver.title} className="flex flex-col gap-4">
              <div className="text-blue">{driver.icon}</div>
              <h3 className="text-base font-medium text-sand">{driver.title}</h3>
              <p className="text-xs text-gray leading-relaxed">{driver.description}</p>
            </BentoCard>
          ))}
        </BentoGrid>
      </Section>

      {/* Mid-page CTA */}
      <CTABand
        title="Have a Specific Test Requirement?"
        description="DEEPVAC's engineering team can help evaluate your requirements and develop a system concept."
      >
        <Button asChild size="lg" className="font-mono text-xs tracking-wide">
          <Link to="/contact">Request a Technical Consultation</Link>
        </Button>
      </CTABand>

      {/* Configurable Dimensions */}
      <Section>
        <SectionHeader
          eyebrow="System Configuration"
          title="Configurable System Dimensions"
          description="Every custom TVAC system is defined across multiple engineering dimensions to match your specific application requirements."
          className="mb-12"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {configDimensions.map((dim) => (
            <div key={dim.label} className="bento-card rounded-lg p-6 space-y-4">
              <h3 className="text-base font-medium text-sand">{dim.label}</h3>
              <ul className="space-y-2">
                {dim.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-xs text-gray leading-relaxed">
                    <span className="w-1 h-1 rounded-full bg-blue mt-1.5 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <div className="section-divider" />

      {/* Process */}
      <Section className="bg-surface/30">
        <SectionHeader
          eyebrow="Project Workflow"
          title="From Concept to Commissioning"
          description="DEEPVAC supports the full development lifecycle of custom thermal vacuum systems — from initial requirements discussion through engineering, manufacturing, and installation."
          className="mb-12"
        />
        <div className="space-y-4">
          {processSteps.map((step) => (
            <div key={step.step} className="bento-card rounded-lg p-6 flex items-start gap-6 group">
              <div className="shrink-0 w-12 h-12 rounded-lg bg-surface-raised border border-gray/15 flex items-center justify-center">
                <span className="font-mono text-sm text-blue">{step.step}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="text-blue">{step.icon}</div>
                  <h3 className="text-base font-medium text-sand">{step.title}</h3>
                </div>
                <p className="text-xs text-gray leading-relaxed">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Cross-links */}
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bento-card rounded-lg p-6 border-l-2 border-l-blue/60 space-y-4">
            <span className="mono-label text-blue">Related Products</span>
            <h3 className="text-lg font-medium text-sand">Standard Series Platforms</h3>
            <p className="text-xs text-gray leading-relaxed">For established test requirements, DEEPVAC's Standard Series offers pre-engineered T Series and C Series platforms.</p>
            <Button asChild variant="tertiary" className="self-start">
              <Link to="/products/standard-series">View Standard Series <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </Button>
          </div>
          <div className="bento-card rounded-lg p-6 border-l-2 border-l-blue/60 space-y-4">
            <span className="mono-label text-blue">Engineering Services</span>
            <h3 className="text-lg font-medium text-sand">Design, Testing & Integration</h3>
            <p className="text-xs text-gray leading-relaxed">DEEPVAC provides control systems design, mechanical engineering, testing services, and lifecycle support alongside chamber development.</p>
            <Button asChild variant="tertiary" className="self-start">
              <Link to="/services">Explore Services <ArrowRight className="w-3 h-3 ml-1" /></Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeader eyebrow="FAQ" title="Custom TVAC Questions" className="mb-10" />
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
        title="Ready to Discuss Your Custom TVAC Project?"
        description="Contact DEEPVAC to start the technical consultation process and define the right system architecture for your application."
      >
        <Button asChild size="lg" className="font-mono text-xs tracking-wide">
          <Link to="/contact">Request a Technical Consultation</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/contact">Request a Quote</Link>
        </Button>
      </CTABand>
    </PageShell>
  </Layout>
);

export default CustomTVAC;
