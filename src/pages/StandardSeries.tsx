import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { TechChip } from "@/components/TechChip";
import { ArrowRight, Maximize, Circle, Thermometer, Gauge, Cpu, Download } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import tseriesImg from "@/assets/tseries-chamber.png";
import cseriesImg from "@/assets/cseries-chamber.jpg";

const tSeriesFeatures = [
  {
    icon: <Maximize className="w-4 h-4" />,
    label: "Cubic Geometry",
    detail:
      "Shared Standard Series platform in a cubic chamber format for straightforward access, efficient volume use, and flexible fixturing.",
  },
  {
    icon: <Thermometer className="w-4 h-4" />,
    label: "Thermal Control",
    detail: "Integrated shroud and platen systems for controlled thermal cycling and bake-out readiness.",
  },
  {
    icon: <Gauge className="w-4 h-4" />,
    label: "Vacuum Performance",
    detail: "High-vacuum capable pumping architecture with leak-tight chamber integrity.",
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
      "Shared Standard Series platform in a cylindrical chamber format for conventional vacuum layouts, symmetric shroud integration, and efficient pumping integration.",
  },
  {
    icon: <Thermometer className="w-4 h-4" />,
    label: "Thermal Control",
    detail: "Integrated shroud and platen systems for controlled thermal cycling and bake-out readiness.",
  },
  {
    icon: <Gauge className="w-4 h-4" />,
    label: "Vacuum Performance",
    detail: "High-vacuum capable pumping architecture with leak-tight chamber integrity.",
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
    q: "What is the difference between the T Series and C Series?",
    a: "Both are based on the same Deepvac Standard Series platform, including the same design philosophy for thermal control, vacuum performance, control integration, and modular configuration. The primary difference is chamber geometry. The T Series uses a cubic chamber, while the C Series uses a cylindrical chamber.",
  },
  {
    q: "What chamber sizes are available in the Standard Series?",
    a: "The Standard Series is available in both cubic (T Series) and cylindrical (C Series) chamber formats across a range of chamber volumes. Specific dimensions are selected according to the required test envelope, payload size, and integration needs.",
  },
  {
    q: "Can Standard Series chambers achieve high-vacuum conditions?",
    a: "Yes. Standard Series chambers are designed with pumping architectures capable of reaching high-vacuum pressure regimes. Specific achievable pressures depend on chamber volume, pumping configuration, and application requirements.",
  },
  {
    q: "What thermal control options are available?",
    a: "Standard Series platforms include integrated thermal shroud and platen systems supporting controlled heating and cooling cycles. Temperature ranges and ramp rates are configuration-dependent.",
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
        description="Shared thermal vacuum chamber platforms available in cubic and cylindrical configurations, combining standardised architecture, modular integration, and repeatable performance for aerospace qualification, environmental simulation, and research testing."
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
          <TechChip label="Config" value="Standard" />
          <TechChip label="Support" value="Full Lifecycle" />
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
              The T Series is the cubic configuration of the Deepvac Standard Series. It uses the same core thermal
              vacuum platform, control philosophy, and modular subsystem architecture as the C Series, configured for
              repeatable environmental simulation, subsystem validation, and laboratory workflows.
            </p>
            <p className="text-sm text-gray/70 leading-relaxed">
              Its cubic chamber geometry supports straightforward payload access, efficient use of internal space, and
              flexible fixture mounting for test articles with box-shaped or space-efficient layouts.
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
              The C Series is the cylindrical configuration of the Deepvac Standard Series. It uses the same core
              thermal vacuum platform, control philosophy, and modular subsystem architecture as the T Series,
              configured for repeatable environmental simulation, subsystem validation, and qualification workflows.
            </p>
            <p className="text-sm text-gray/70 leading-relaxed">
              Its cylindrical chamber geometry supports conventional vacuum chamber layouts, symmetric shroud
              integration, and an overall form factor often preferred for classic cylindrical test setups.
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
