import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { ArrowRight } from "lucide-react";
import mechanicalDesignHero from "@/assets/mechanical-design-hero.png";

interface ServicePageProps {
  eyebrow: string;
  title: string;
  description: string;
  overview: string;
  heroImage?: string;
  deliverables: { title: string; description: string }[];
  scenarios: string[];
  crossLinks: { label: string; href: string; description: string }[];
  ctaTitle: string;
  ctaDescription: string;
}

function ServicePageTemplate({
  eyebrow, title, description, overview, heroImage, deliverables, scenarios, crossLinks, ctaTitle, ctaDescription,
}: ServicePageProps) {
  return (
    <Layout>
      <PageShell>
        <PageHero eyebrow={eyebrow} title={title} description={description}>
          <div className="flex flex-wrap gap-3 pt-4">
            <Button asChild size="lg" className="font-mono text-xs tracking-wide">
              <Link to="/contact">Discuss Your Requirements</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/services">All Services</Link>
            </Button>
          </div>
        </PageHero>

        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div className="space-y-4">
              <SectionHeader eyebrow="Overview" title="Service Scope" />
              <p className="text-sm text-gray leading-relaxed">{overview}</p>
            </div>
            {heroImage ? (
              <div className="relative w-full overflow-hidden rounded-lg" style={{ aspectRatio: "4/3" }}>
                <img src={heroImage} alt={title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent pointer-events-none" />
              </div>
            ) : (
              <PlaceholderImage assetId="SVC_HERO" type="PROCESS" aspectRatio="4/3" />
            )}
          </div>
        </Section>

        <div className="section-divider" />

        <Section>
          <SectionHeader eyebrow="Deliverables" title="Support Areas & Deliverables" className="mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {deliverables.map((d) => (
              <div key={d.title} className="bento-card rounded-lg p-6 space-y-3">
                <h3 className="text-base font-medium text-sand">{d.title}</h3>
                <p className="text-xs text-gray leading-relaxed">{d.description}</p>
              </div>
            ))}
          </div>
        </Section>

        <Section className="bg-surface/30">
          <SectionHeader eyebrow="Ideal For" title="When This Service Applies" className="mb-10" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {scenarios.map((s) => (
              <div key={s} className="bento-card rounded-lg p-4 flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-blue mt-1.5 shrink-0" />
                <span className="text-sm text-sand">{s}</span>
              </div>
            ))}
          </div>
        </Section>

        <Section>
          <SectionHeader eyebrow="Related" title="Related Products & Services" className="mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {crossLinks.map((link) => (
              <div key={link.href} className="bento-card rounded-lg p-6 border-l-2 border-l-blue/60 space-y-3">
                <h3 className="text-base font-medium text-sand">{link.label}</h3>
                <p className="text-xs text-gray leading-relaxed">{link.description}</p>
                <Button asChild variant="tertiary" className="self-start">
                  <Link to={link.href}>Learn More <ArrowRight className="w-3 h-3 ml-1" /></Link>
                </Button>
              </div>
            ))}
          </div>
        </Section>

        <CTABand title={ctaTitle} description={ctaDescription}>
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
}

export const TestingServices = () => (
  <ServicePageTemplate
    eyebrow="Services"
    title="Testing Services"
    description="Thermal vacuum testing executed with engineering precision — supporting qualification, validation, and development programs that require stable environmental control and repeatable test workflows."
    overview="Deepvac provides execution and support of thermal vacuum test campaigns across the full spectrum of aerospace and research applications. Our testing services encompass campaign planning, chamber preparation, test execution, data acquisition, and post-test reporting. Each campaign is executed with focus on environmental stability, measurement accuracy, and process repeatability."
    deliverables={[
      { title: "Test Campaign Execution", description: "End-to-end management and execution of thermal vacuum test campaigns including chamber preparation, test article integration, and controlled test sequences." },
      { title: "Data Acquisition & Reporting", description: "Systematic data collection, monitoring, and comprehensive test reporting with traceability and documentation standards." },
      { title: "Qualification & Acceptance Testing", description: "Support for formal qualification and acceptance test procedures aligned with project-specific requirements and standards." },
      { title: "Engineering Support", description: "Technical advisory during test planning, anomaly investigation, and test result interpretation." },
    ]}
    scenarios={["Satellite subsystem qualification campaigns", "Component-level environmental screening", "Research and development test programs", "Thermal cycling under high-vacuum conditions", "Outgassing and contamination characterisation", "Hardware acceptance testing"]}
    crossLinks={[
      { label: "Standard Series Chambers", href: "/products/standard-series", description: "Pre-engineered TVAC platforms suitable for standard test campaign requirements." },
      { label: "Custom TVAC Systems", href: "/products/custom-tvac", description: "Application-specific chamber systems for specialised test requirements." },
      { label: "Control Systems Design", href: "/services/control-systems-design", description: "Integrated control and data acquisition architectures for test environments." },
      { label: "Subsystem Integration", href: "/services/subsystem-integration", description: "Integration of test environment subsystems for coherent operation." },
    ]}
    ctaTitle="Discuss Your Test Campaign Requirements"
    ctaDescription="Contact Deepvac to plan and execute your thermal vacuum test program with engineering-grade precision."
  />
);

export const ControlSystemsDesign = () => (
  <ServicePageTemplate
    eyebrow="Services"
    title="Control Systems Design"
    description="Design of chamber control architectures, automation logic, user interfaces, instrumentation integration, and reliable operating concepts for thermal vacuum test environments."
    overview="Deepvac designs and implements control systems for thermal vacuum chambers — covering the full scope from sensor integration and automation logic to human-machine interfaces and data acquisition. Our control architectures are designed for operational reliability, process repeatability, and straightforward system maintenance. We work with both new chamber builds and existing systems requiring control upgrades."
    deliverables={[
      { title: "Control Architecture Design", description: "System-level control architecture specification including hardware selection, network topology, and functional allocation." },
      { title: "Automation & HMI Development", description: "PLC programming, sequence automation, alarm management, and user interface design for intuitive system operation." },
      { title: "Instrumentation Integration", description: "Sensor specification, signal conditioning, and integration of temperature, pressure, flow, and application-specific measurement systems." },
      { title: "System Commissioning", description: "On-site commissioning, functional testing, performance verification, and operator training." },
    ]}
    scenarios={["New chamber builds requiring integrated control systems", "Legacy systems needing control modernisation", "Facilities expanding data acquisition capabilities", "Projects with specific automation requirements", "Multi-chamber control integration", "Remote monitoring and diagnostics needs"]}
    crossLinks={[
      { label: "Custom TVAC Systems", href: "/products/custom-tvac", description: "Custom chamber development with integrated control architecture." },
      { label: "Retrofit & Modernisation", href: "/services/retrofit-modernisation", description: "Control system upgrades for existing chamber infrastructure." },
      { label: "Testing Services", href: "/services/testing-services", description: "Test execution leveraging Deepvac control system expertise." },
      { label: "Subsystem Integration", href: "/services/subsystem-integration", description: "Integration of control systems with thermal, vacuum, and instrumentation subsystems." },
    ]}
    ctaTitle="Discuss Your Control System Requirements"
    ctaDescription="Contact Deepvac to design a control architecture that meets your operational and measurement requirements."
  />
);

export const MechanicalDesign = () => (
  <ServicePageTemplate
    eyebrow="Services"
    title="Mechanical Design"
    heroImage={mechanicalDesignHero}
    description="Engineering of chamber assemblies, interfaces, fixturing, support structures, and customer-specific mechanical integration concepts for thermal vacuum systems."
    overview="Deepvac provides mechanical design services for thermal vacuum chamber systems — from structural analysis and chamber geometry definition to fixture engineering, feedthrough integration, and interface specification. Our mechanical design work supports both new system development and modifications to existing chamber infrastructure, with focus on structural integrity, thermal performance, and practical accessibility."
    deliverables={[
      { title: "Chamber Structural Design", description: "Vessel geometry, structural analysis, material selection, and detailed manufacturing documentation for chamber shells and assemblies." },
      { title: "Fixture & Support Engineering", description: "Design of test article fixtures, mounting systems, support structures, and payload accommodation hardware." },
      { title: "Interface Specification", description: "Definition of mechanical interfaces including port layouts, feedthrough positions, door mechanisms, and mating surfaces." },
      { title: "Integration Concepts", description: "Development of mechanical integration concepts for thermal shrouds, pumping systems, and facility infrastructure connections." },
    ]}
    scenarios={["Custom chamber development projects", "Fixture design for specific test articles", "Chamber modifications and extensions", "Feedthrough and port engineering", "Structural assessment of existing chambers", "Thermal shroud mechanical design"]}
    crossLinks={[
      { label: "Custom TVAC Systems", href: "/products/custom-tvac", description: "Full custom chamber engineering including mechanical design." },
      { label: "Standard Series", href: "/products/standard-series", description: "Standard platforms with proven mechanical architectures." },
      { label: "Subsystem Integration", href: "/services/subsystem-integration", description: "Mechanical integration within broader subsystem assemblies." },
      { label: "Maintenance & Repair", href: "/services/maintenance-repair", description: "Mechanical repair and component replacement services." },
    ]}
    ctaTitle="Discuss Your Mechanical Engineering Requirements"
    ctaDescription="Contact Deepvac for chamber structural design, fixture engineering, or mechanical integration support."
  />
  );
};

export const RetrofitModernisation = () => (
  <ServicePageTemplate
    eyebrow="Services"
    title="Retrofit & Modernisation"
    description="Technical upgrades for legacy TVAC systems to improve reliability, safety, control precision, usability, and lifecycle value."
    overview="Deepvac retrofits and modernises existing thermal vacuum systems — addressing control system obsolescence, safety improvements, operational efficiency, and performance enhancement. Our approach begins with a systematic assessment of the existing system, followed by engineering of targeted upgrades that maximise return on the installed base while minimising disruption to ongoing operations."
    deliverables={[
      { title: "System Assessment", description: "Comprehensive evaluation of existing chamber systems including controls, instrumentation, mechanical condition, and safety compliance." },
      { title: "Upgrade Engineering", description: "Design of retrofit solutions including hardware specifications, system architecture updates, and implementation planning." },
      { title: "Control System Modernisation", description: "Replacement or upgrade of legacy control hardware, software, HMI, and data acquisition systems." },
      { title: "Safety & Compliance Improvements", description: "Implementation of safety system upgrades, interlock modifications, and alignment with current standards and regulations." },
    ]}
    scenarios={["Chambers with obsolete control systems", "Facilities requiring safety upgrades", "Systems with degraded performance or reliability", "Organisations expanding test capabilities on existing platforms", "Legacy systems needing modern data acquisition", "Equipment approaching end-of-life requiring lifecycle extension"]}
    crossLinks={[
      { label: "Control Systems Design", href: "/services/control-systems-design", description: "New control architectures for modernised chamber systems." },
      { label: "Maintenance & Repair", href: "/services/maintenance-repair", description: "Ongoing maintenance to sustain modernised system performance." },
      { label: "Standard Series", href: "/products/standard-series", description: "When replacement with a new platform is more effective than retrofit." },
      { label: "Subsystem Integration", href: "/services/subsystem-integration", description: "Integration of upgraded subsystems into existing infrastructure." },
    ]}
    ctaTitle="Assess Your System for Modernisation"
    ctaDescription="Contact Deepvac to evaluate your existing thermal vacuum infrastructure and identify upgrade opportunities."
  />
);

export const MaintenanceRepair = () => (
  <ServicePageTemplate
    eyebrow="Services"
    title="Maintenance & Repair"
    description="Diagnostics, preventive servicing, repair, and technical support to reduce downtime and sustain long-term chamber availability."
    overview="Deepvac provides maintenance and repair services for thermal vacuum chamber systems — supporting operational continuity, reducing unplanned downtime, and extending equipment lifecycle. Our services range from scheduled preventive maintenance programs to reactive diagnostics and repair, with engineering-level understanding of chamber systems, vacuum technology, thermal subsystems, and control infrastructure."
    deliverables={[
      { title: "Preventive Maintenance", description: "Scheduled inspection, servicing, and calibration programs designed to maintain system performance and prevent unplanned failures." },
      { title: "Diagnostics & Troubleshooting", description: "Systematic fault identification and root cause analysis for mechanical, vacuum, thermal, and control system issues." },
      { title: "Repair & Component Replacement", description: "Targeted repair of chamber components including seals, feedthroughs, pumps, sensors, valves, and control hardware." },
      { title: "On-Site Service", description: "Field service capabilities for maintenance, repair, and commissioning support at customer facilities." },
    ]}
    scenarios={["Scheduled preventive maintenance programs", "Unplanned chamber system failures", "Vacuum integrity degradation", "Sensor or instrumentation malfunction", "Pump system servicing requirements", "Seal replacement and leak repair"]}
    crossLinks={[
      { label: "Retrofit & Modernisation", href: "/services/retrofit-modernisation", description: "When maintenance reveals the need for system-level upgrades." },
      { label: "Control Systems Design", href: "/services/control-systems-design", description: "Control system troubleshooting and replacement support." },
      { label: "Subsystem Integration", href: "/services/subsystem-integration", description: "Replacement or upgrade of integrated subsystem components." },
      { label: "Standard Series", href: "/products/standard-series", description: "Maintenance programs for Deepvac Standard Series platforms." },
    ]}
    ctaTitle="Schedule Maintenance or Report an Issue"
    ctaDescription="Contact Deepvac to arrange preventive maintenance or receive technical support for your thermal vacuum system."
  />
);

export const SubsystemIntegration = () => (
  <ServicePageTemplate
    eyebrow="Services"
    title="Subsystem Integration"
    description="Integration of thermal, vacuum, instrumentation, and control subsystems into coherent test environments tailored to project-specific requirements."
    overview="Deepvac integrates thermal, vacuum, instrumentation, and control subsystems into unified test environments — managing interfaces, compatibility, and system-level performance. Our integration services support both new chamber builds and upgrades to existing systems, with focus on subsystem interoperability, interface clarity, and reliable end-to-end system operation."
    deliverables={[
      { title: "Subsystem Specification", description: "Definition of subsystem requirements, performance specifications, and interface standards for thermal, vacuum, and control components." },
      { title: "Interface Engineering", description: "Design and management of mechanical, electrical, and signal interfaces between subsystems and facility infrastructure." },
      { title: "System Integration", description: "Physical and functional integration of subsystems into coherent test environments with systematic verification." },
      { title: "Acceptance & Validation", description: "Integrated system testing, performance validation, and acceptance documentation." },
    ]}
    scenarios={["New chamber builds with multi-vendor subsystems", "Facility upgrades requiring subsystem coordination", "Addition of new subsystems to existing chambers", "Complex feedthrough and instrumentation integration", "Thermal subsystem integration with vacuum systems", "Control system integration across multiple subsystems"]}
    crossLinks={[
      { label: "Custom TVAC Systems", href: "/products/custom-tvac", description: "Full system development with integrated subsystem engineering." },
      { label: "Control Systems Design", href: "/services/control-systems-design", description: "Control architecture for integrated multi-subsystem environments." },
      { label: "Mechanical Design", href: "/services/mechanical-design", description: "Mechanical interface and structure design for subsystem integration." },
      { label: "Testing Services", href: "/services/testing-services", description: "Test execution within integrated system environments." },
    ]}
    ctaTitle="Discuss Your Integration Requirements"
    ctaDescription="Contact Deepvac to plan subsystem integration for your thermal vacuum test environment."
  />
);
