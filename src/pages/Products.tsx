import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { BentoGrid, BentoCard } from "@/components/BentoGrid";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { TechChip } from "@/components/TechChip";
import { ArrowRight, ChevronRight, Box, Cog, Crosshair } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import tseriesImg from "@/assets/tseries-chamber.png";
import cseriesImg from "@/assets/cseries-chamber.jpg";
import customImg from "@/assets/custom-chamber.jpg";

const productLines = [
  {
    title: "Standard Series",
    subtitle: "Pre-Engineered TVAC Platforms",
    description: "Modular thermal vacuum chamber systems with proven architectures, standardised interfaces, and repeatable performance for established test requirements. Available in cubic (T Series) and cylindrical (C Series) configurations.",
    image: tseriesImg,
    href: "/products/standard-series",
    cta: "Explore Standard Series",
    icon: <Box className="w-5 h-5" />,
    chips: ["Modular Design", "Proven Architecture", "Standardised Interfaces"],
  },
  {
    title: "Custom TVAC",
    subtitle: "Application-Specific Chamber Engineering",
    description: "Fully bespoke thermal vacuum systems configured around mission-specific geometries, feedthrough requirements, thermal profiles, instrumentation needs, and integration constraints. Engineered from concept through commissioning.",
    image: customImg,
    href: "/products/custom-tvac",
    cta: "Discuss a Custom Configuration",
    icon: <Cog className="w-5 h-5" />,
    chips: ["Custom Geometry", "Interface Engineering", "Full Integration"],
  },
];

const decisionFactors = [
  { label: "Test Profile", standard: "Established thermal and vacuum requirements", custom: "Application-specific pressure, temperature, or cycling profiles" },
  { label: "Chamber Geometry", standard: "Standard cubic or cylindrical chamber volumes", custom: "Non-standard dimensions, access requirements, or payload geometries" },
  { label: "Feedthroughs & Interfaces", standard: "Pre-configured port layouts and feedthrough options", custom: "Custom interface engineering and specialised feedthrough integration" },
  { label: "Instrumentation", standard: "Standard sensor and measurement configurations", custom: "Application-specific instrumentation and data acquisition requirements" },
  { label: "Timeline", standard: "Shorter delivery timelines with proven designs", custom: "Engineering-led development with project-specific milestones" },
];

const faqs = [
  { q: "What distinguishes a standard chamber from a custom configuration?", a: "Standard Series chambers use pre-engineered designs with proven architectures, offering shorter lead times and established performance envelopes. Custom TVAC systems are engineered from concept to commissioning around application-specific requirements including geometry, thermal profile, instrumentation, and interface constraints." },
  { q: "Can standard chambers be modified for specific test requirements?", a: "Standard Series platforms support a range of configuration options within their design envelope. For requirements beyond the standard platform scope, Deepvac offers custom engineering to develop application-specific solutions." },
  { q: "What support does Deepvac provide after chamber delivery?", a: "Deepvac offers lifecycle services including preventive maintenance, repair, retrofit and modernisation, control system upgrades, and subsystem integration support for all chamber systems." },
  { q: "Does Deepvac provide testing services alongside chamber systems?", a: "Yes. Deepvac offers thermal vacuum testing services including test campaign execution, data acquisition, and engineering support for qualification, validation, and development programs." },
];

const Products = () => (
  <Layout>
    <PageShell>
      <PageHero
        eyebrow="Product Range"
        title="Thermal Vacuum Chamber Systems"
        description="Deepvac develops standardised and custom-engineered thermal vacuum systems for aerospace qualification, environmental simulation, and research applications. Our chamber platforms address a range of test requirements — from established workflows using modular standard systems to fully bespoke configurations for complex mission profiles."
      >
        <div className="flex flex-wrap gap-3 pt-4">
          <Button asChild size="lg" className="font-mono text-xs tracking-wide">
            <Link to="/contact">Request a Technical Consultation</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/catalogues">Download Product Overview</Link>
          </Button>
        </div>
      </PageHero>

      {/* Product Lines */}
      <Section>
        <div className="space-y-8">
          {productLines.map((product, i) => (
            <div key={product.title} className="bento-card rounded-lg overflow-hidden group">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className={`relative overflow-hidden ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                  <img
                    src={product.image}
                    alt={`Deepvac ${product.title}`}
                    className="w-full h-full object-cover min-h-[280px] lg:min-h-[380px] transition-transform duration-500 group-hover:scale-[1.02]"
                    loading="lazy"
                  />
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                    {product.chips.map((chip) => (
                      <span key={chip} className="glass-overlay rounded-sm px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-blue-light/80">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
                <div className={`p-8 lg:p-10 flex flex-col justify-center space-y-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                  <div className="text-blue">{product.icon}</div>
                  <div>
                    <span className="mono-label text-blue">{product.subtitle}</span>
                    <h2 className="text-2xl md:text-3xl font-medium text-sand mt-2 tracking-tight">{product.title}</h2>
                  </div>
                  <p className="text-sm text-gray leading-relaxed">{product.description}</p>
                  <Button asChild variant="outline" className="self-start group/btn">
                    <Link to={product.href}>
                      {product.cta}
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <div className="section-divider" />

      {/* Decision Support */}
      <Section>
        <SectionHeader
          eyebrow="Configuration Guide"
          title="Standard Platform vs. Custom Configuration"
          description="Use the comparison below to determine which approach best fits your test requirements, timeline, and integration constraints."
          className="mb-12"
        />
        <div className="bento-card rounded-lg overflow-hidden">
          <div className="grid grid-cols-3 border-b border-gray/15">
            <div className="p-4 mono-label text-gray">Requirement</div>
            <div className="p-4 mono-label text-blue border-l border-gray/15">Standard Series</div>
            <div className="p-4 mono-label text-blue border-l border-gray/15">Custom TVAC</div>
          </div>
          {decisionFactors.map((row) => (
            <div key={row.label} className="grid grid-cols-3 border-b border-gray/10 last:border-b-0">
              <div className="p-4 text-sm font-medium text-sand">{row.label}</div>
              <div className="p-4 text-xs text-gray leading-relaxed border-l border-gray/10">{row.standard}</div>
              <div className="p-4 text-xs text-gray leading-relaxed border-l border-gray/10">{row.custom}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Cross-link to Services */}
      <Section className="bg-surface/30">
        <SectionHeader
          eyebrow="Integrated Capabilities"
          title="Beyond the Chamber"
          description="Deepvac provides engineering services across the full lifecycle — from control systems design and mechanical engineering to testing, retrofit, and subsystem integration."
          className="mb-8"
        />
        <div className="flex flex-wrap gap-4">
          <Button asChild variant="outline">
            <Link to="/services">Explore Engineering Services <ArrowRight className="w-3.5 h-3.5 ml-1" /></Link>
          </Button>
          <Button asChild variant="tertiary">
            <Link to="/contact">Talk to an Engineer</Link>
          </Button>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <SectionHeader eyebrow="FAQ" title="Frequently Asked Questions" className="mb-10" />
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
        title="Discuss Your Chamber Requirements"
        description="Whether you need a modular standard platform or a custom-engineered TVAC system, Deepvac can help define the right configuration for your application."
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

export default Products;
