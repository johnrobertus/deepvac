import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { TechChip } from "@/components/TechChip";
import { ArrowRight, Maximize, Circle, Thermometer, Gauge, Cpu, Download } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import tseriesImg from "@/assets/tseries-chamber.png";
import cseriesImg from "@/assets/cseries-chamber.jpg";

const standardSeriesSpecs = {
  ultimateVacuum: "[INSERT ULTIMATE VACUUM]",
  minTemperature: "[INSERT MIN. TEMPERATURE]",
};

const tSeriesFeatures = [
  {
    icon: <Maximize className="w-4 h-4" />,
    label: "Cubic Geometry",
    detail:
      "Cube-based chamber layout for straightforward payload access, efficient internal volume usage, and flexible fixture integration.",
  },
  {
    icon: <Thermometer className="w-4 h-4" />,
    label: "Low Temperature Capability",
    detail: `Configured for thermal operation down to ${standardSeriesSpecs.minTemperature}, depending on system configuration and test setup.`,
  },
  {
    icon: <Gauge className="w-4 h-4" />,
    label: "Ultimate Vacuum",
    detail: `Designed for vacuum performance down to ${standardSeriesSpecs.ultimateVacuum}, depending on chamber size and pumping package.`,
  },
  {
    icon: <Cpu className="w-4 h-4" />,
    label: "Control Integration",
    detail: "Pre-engineered control system interface with data acquisition and automation support.",
  },
];

const cSeriesFeatures = [
  {
    icon: <Circle className="w-4 h-4" />,
    label: "Cylindrical Geometry",
    detail:
      "Cylindrical chamber layout suited for uniform radial design, efficient shroud integration, and classic vacuum chamber configurations.",
  },
  {
    icon: <Thermometer className="w-4 h-4" />,
    label: "Low Temperature Capability",
    detail: `Configured for thermal operation down to ${standardSeriesSpecs.minTemperature}, depending on system configuration and test setup.`,
  },
  {
    icon: <Gauge className="w-4 h-4" />,
    label: "Ultimate Vacuum",
    detail: `Designed for vacuum performance down to ${standardSeriesSpecs.ultimateVacuum}, depending on chamber size and pumping package.`,
  },
  {
    icon: <Cpu className="w-4 h-4" />,
    label: "Control Integration",
    detail: "Pre-engineered control system interface with data acquisition and automation support.",
  },
];

const applications = [
  "Subsystem qualification testing",
  "Component-level environmental simulation",
  "Research and development campaigns",
  "Thermal cycling under vacuum",
  "Material outgassing characterisation",
  "Payload integration validation",
];

const faqs = [
  {
    q: "What chamber sizes are available in the Standard Series?",
    a: "The Standard Series is available in both cubic and cylindrical chamber formats across a range of chamber volumes. Specific dimensions are selected according to the required test envelope, payload size, and integration needs.",
  },
  {
    q: "What vacuum level can Standard Series chambers achieve?",
    a: `Standard Series chambers are designed for vacuum performance down to ${standardSeriesSpecs.ultimateVacuum}, depending on chamber volume, pumping configuration, and application requirements.`,
  },
  {
    q: "What thermal control options are available?",
    a: `Standard Series platforms include integrated thermal shroud and platen systems supporting controlled heating and cooling cycles. Minimum temperature capability can be configured down to ${standardSeriesSpecs.minTemperature}, depending on the selected system configuration.`,
  },
  {
    q: "How are Standard Series chambers delivered and commissioned?",
    a: "Deepvac provides full delivery, installation, and commissioning support including system integration, acceptance testing, and operator training.",
  },
];

const StandardSeries = () => (
  <Layout>
    <PageShell>
      <PageHero
        eyebrow="Products / Standard Series"
        title="Pre-Engineered TVAC Platforms"
        description="Standardised thermal vacuum chamber platforms with modular configurations and repeatable performance for aerospace qualification, environmental simulation, and research testing."
      >
        <div className="flex flex-wrap gap-3 pt-4">
          <Button asChild size="lg" className="font-mono text-xs tracking-wide">
            <Link to="/contact">Request Technical Details</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/catalogues">Download Brochure</Link>
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 pt-4">
          <TechChip label="Architecture" value="Modular" />
          <TechChip label="Vacuum" value={standardSeriesSpecs.ultimateVacuum} />
          <TechChip label="Min Temp" value={standardSeriesSpecs.minTemperature} />
        </div>
      </PageHero>

      {/* T Series */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <div className="relative rounded-lg overflow-hidden border border-gray/10">
              <img
                src={tseriesImg}
                alt="Deepvac T Series Cubic Thermal Vacuum Chamber"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute top-3 left-3 glass-overlay rounded-md px-3 py-1.5">
                <span className="mono-label text-blue-light">T Series</span>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <span className="mono-label text-blue">Cubic Thermal Vacuum Chambers</span>
              <h2 className="text-3xl md:text-4xl font-medium text-sand mt-2 tracking-tight">T Series TVAC</h2>
            </div>
            <p className="text-sm text-gray leading-relaxed">
              Compact cubic thermal vacuum chamber platforms designed for repeatable environmental simulation, subsystem
              validation, and laboratory workflows. The T Series combines controlled thermal and vacuum conditions with
              a standardised architecture for research and qualification applications.
            </p>
            <p className="text-sm text-gray/70 leading-relaxed">
              The cubic chamber geometry provides straightforward payload access, efficient interior utilisation, and
              flexible fixture mounting. Standard configurations support vacuum performance down to{" "}
              {standardSeriesSpecs.ultimateVacuum} and thermal operation down to {standardSeriesSpecs.minTemperature},
              depending on the selected system setup.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              {tSeriesFeatures.map((f) => (
                <div key={f.label} className="bento-card rounded-lg p-4 space-y-2">
                  <div className="text-blue">{f.icon}</div>
                  <h4 className="text-xs font-medium text-sand">{f.label}</h4>
                  <p className="text-[11px] text-gray leading-relaxed">{f.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* C Series */}
      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="lg:order-2">
            <div className="relative rounded-lg overflow-hidden border border-gray/10">
              <img
                src={cseriesImg}
                alt="Deepvac C Series Cylindrical Thermal Vacuum Chamber"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="absolute top-3 right-3 glass-overlay rounded-md px-3 py-1.5">
                <span className="mono-label text-blue-light">C Series</span>
              </div>
            </div>
          </div>
          <div className="space-y-6 lg:order-1">
            <div>
              <span className="mono-label text-blue">Cylindrical Thermal Vacuum Chambers</span>
              <h2 className="text-3xl md:text-4xl font-medium text-sand mt-2 tracking-tight">C Series TVAC</h2>
            </div>
            <p className="text-sm text-gray leading-relaxed">
              Cylindrical thermal vacuum chamber platforms designed for repeatable environmental simulation, subsystem
              qualification, and robust laboratory operation. The C Series combines controlled thermal and vacuum
              conditions with a standardised architecture for research and qualification applications.
            </p>
            <p className="text-sm text-gray/70 leading-relaxed">
              The cylindrical chamber geometry supports classic vacuum chamber layouts, efficient shroud integration,
              and a structurally efficient form factor. Standard configurations support vacuum performance down to{" "}
              {standardSeriesSpecs.ultimateVacuum} and thermal operation down to {standardSeriesSpecs.minTemperature},
              depending on the selected system setup.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-2">
              {cSeriesFeatures.map((f) => (
                <div key={f.label} className="bento-card rounded-lg p-4 space-y-2">
                  <div className="text-blue">{f.icon}</div>
                  <h4 className="text-xs font-medium text-sand">{f.label}</h4>
                  <p className="text-[11px] text-gray leading-relaxed">{f.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* Application Fit */}
      <Section className="bg-surface/30">
        <SectionHeader
          eyebrow="Application Fit"
          title="Designed for Demanding Test Environments"
          description="Standard Series platforms serve a wide range of aerospace, research, and industrial test applications."
          className="mb-10"
        />
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {applications.map((app) => (
            <div key={app} className="bento-card rounded-lg p-4 flex items-start gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-blue mt-1.5 shrink-0" />
              <span className="text-sm text-sand">{app}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* Cross-link Custom */}
      <Section>
        <div className="bento-card rounded-lg p-8 lg:p-10 border-l-2 border-l-blue/60">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6 items-center">
            <div className="space-y-3">
              <span className="mono-label text-blue">Beyond Standard</span>
              <h3 className="text-xl md:text-2xl font-medium text-sand tracking-tight">Need a Custom Configuration?</h3>
              <p className="text-sm text-gray leading-relaxed max-w-xl">
                When test requirements exceed the standard platform scope, including non-standard geometries,
                specialised feedthrough configurations, or application-specific thermal profiles, Deepvac offers fully
                custom-engineered TVAC solutions.
              </p>
            </div>
            <Button asChild variant="outline" className="self-start group/btn">
              <Link to="/products/custom-tvac">
                Explore Custom TVAC
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>

      {/* Brochure Download */}
      <Section>
        <div className="bento-card rounded-lg overflow-hidden grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-0">
          <div className="relative bg-surface overflow-hidden">
            <img
              src="/brochures/deepvac-standard-series-cover.jpg"
              alt="Deepvac Standard Series Catalogue"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="p-8 lg:p-10 flex flex-col justify-center space-y-4">
            <span className="mono-label text-blue">Download Standard Series Brochure</span>
            <h3 className="text-xl md:text-2xl font-medium text-sand tracking-tight">
              Deepvac Standard Series Catalogue
            </h3>
            <p className="text-sm text-gray leading-relaxed max-w-xl">
              Explore the Deepvac Standard Series in more detail, including common technical characteristics, chamber
              configurations, control system features, and optional upgrades.
            </p>
            <div className="pt-2">
              <Button asChild>
                <a
                  href="/brochures/deepvac-standard-series-catalogue-2026.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download PDF
                </a>
              </Button>
            </div>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeader eyebrow="FAQ" title="Standard Series Questions" className="mb-10" />
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
        title="Discuss Your Test Requirements"
        description="Contact Deepvac to identify the right Standard Series configuration for your application."
      >
        <Button asChild size="lg" className="font-mono text-xs tracking-wide">
          <Link to="/contact">Request a Quote</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/contact">Talk to an Engineer</Link>
        </Button>
      </CTABand>
    </PageShell>
  </Layout>
);

export default StandardSeries;
