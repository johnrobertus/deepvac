import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Waves, Thermometer, Radio, Replace, Settings } from "lucide-react";
import heroImg from "@/assets/twin-qcm-hero.png";
import technicalImg from "@/assets/twin-qcm-technical.png";

const features = [
  {
    icon: <Waves className="w-5 h-5" />,
    title: "Differential twin sensing",
    description:
      "Reference and detection electrodes on a single crystal support stable measurement with reduced sensitivity to external noise, vibration, and temperature variation.",
  },
  {
    icon: <Thermometer className="w-5 h-5" />,
    title: "On-crystal temperature sensing",
    description:
      "A platinum RTD Pt1000 temperature sensor is mounted directly on the crystal for improved temperature measurement accuracy at the actual sensing location.",
  },
  {
    icon: <Radio className="w-5 h-5" />,
    title: "Dual-frequency operation",
    description:
      "Simultaneous fundamental and 3rd overtone measurement supports both broad dynamic range and higher sensitivity within one measurement architecture.",
  },
  {
    icon: <Replace className="w-5 h-5" />,
    title: "User-replaceable crystal",
    description:
      "The clip-based design allows fast crystal replacement by the user, reducing service effort, downtime, and operating cost.",
  },
  {
    icon: <Settings className="w-5 h-5" />,
    title: "Flexible integration",
    description:
      "Available with single-channel and multi-channel sensing units for integration into new systems, chamber upgrades, and retrofit environments.",
  },
];

const specs = [
  { label: "Frequency (fundamental)", value: "10.278 MHz" },
  { label: "Frequency (3rd overtone)", value: "30.833 MHz" },
  { label: "Frequency resolution", value: "0.01 Hz" },
  { label: "Detection accuracy", value: "≤ 1 ppm" },
  { label: "Electrode area", value: "0.1257 cm² per electrode" },
  { label: "Viewing angle", value: "20° half angle" },
  { label: "TQCM temp. range", value: "-80 to +125 °C" },
  { label: "CQCM temp. range", value: "-196 to +125 °C" },
  { label: "TQCM module mass", value: "≤ 50 g" },
  { label: "CQCM module mass", value: "≤ 100 g" },
  { label: "Module dimensions", value: "Φ35.0 × 23.3 mm" },
  { label: "Max. cable length", value: "20 m" },
  { label: "Measurement interval", value: "From 1 s" },
  { label: "Temp. detection accuracy", value: "≤ ±0.4 °C" },
];

const applications = [
  "Quantitative outgassing evaluation of materials, components, and equipment",
  "Chamber-integrated contamination monitoring in vacuum environments",
  "Material qualification for cleanroom and contamination-sensitive applications",
  "Thermally resolved adsorption and desorption analysis",
  "Comparative assessment of cable and seal materials",
  "O-ring outgassing evaluation",
  "Verification of cleaning effectiveness on machined metal parts",
  "Assessment of curing conditions for conductive adhesives",
];

const TwinQCM = () => (
  <Layout>
    <PageShell>
      {/* Hero */}
      <section className="py-20 md:py-32 px-6">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="mono-label text-blue">Integrated Technologies</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-sand">
                NDK Twin-QCM Outgassing Analysis
              </h1>
              <p className="text-base text-gray leading-relaxed max-w-xl">
                Chamber-integrated QTGA sensor technology for quantitative outgassing measurement and contamination
                analysis.
              </p>
              <p className="text-sm text-gray/80 leading-relaxed max-w-xl">
                Deepvac integrates NDK&apos;s Twin-TQCM and Twin-CQCM sensor technology into new and existing vacuum
                systems to enable quantitative outgassing measurement directly inside the test environment. Based on
                quartz crystal microbalance sensing and QTGA, the platform detects mass deposition via frequency shift
                and supports thermally resolved analysis of adsorption and desorption behavior under controlled vacuum
                conditions.
              </p>
              <p className="text-xs text-gray/60 leading-relaxed max-w-xl font-mono">
                Technology developed and manufactured by NDK. Integrated, configured, and application-engineered by
                Deepvac.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild size="lg" className="font-mono text-xs tracking-wide">
                  <Link to="/contact">Request a Technical Consultation</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Discuss Integration</Link>
                </Button>
              </div>
            </div>
            <div className="w-full overflow-hidden">
              <img
                src={heroImg}
                alt="NDK Twin-QCM sensor module and sensing unit integrated by Deepvac for chamber-based outgassing analysis"
                className="block w-[112%] max-w-none h-auto -ml-[6%]"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* Overview */}
      <Section>
        <SectionHeader eyebrow="Overview" title="Chamber-Integrated Outgassing Diagnostics" className="mb-10" />
        <div className="max-w-3xl space-y-5">
          <p className="text-sm text-gray leading-relaxed">
            The Twin-QCM platform combines precise mass detection with thermally resolved outgassing analysis in a
            compact, chamber-integrated subsystem. Instead of relying on a separate laboratory workflow, Deepvac
            integrates the technology directly into vacuum chambers, chamber upgrades, retrofit packages, and
            customer-specific test setups.
          </p>
          <p className="text-sm text-gray leading-relaxed">
            At the core of the system is a twin-electrode crystal design with a reaction electrode and a reference
            electrode on the same crystal blank. By evaluating the differential signal between both electrodes, the
            sensor reduces the influence of vibration, temperature drift, and other environmental disturbances,
            supporting stable and repeatable measurements under real chamber conditions. A platinum temperature sensor
            mounted directly on the crystal further improves temperature monitoring at the actual sensing location.
          </p>
        </div>
      </Section>

      <div className="section-divider" />

      {/* How it works */}
      <Section>
        <SectionHeader eyebrow="Measurement Principle" title="How It Works" className="mb-10" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
          <div className="space-y-5">
            <p className="text-sm text-gray leading-relaxed">
              When outgassed species adsorb onto the crystal electrode, the resonance frequency decreases in proportion
              to the deposited mass. In QTGA operation, the sensor is cooled and heated in a controlled profile,
              allowing adsorption and desorption behavior to be tracked as a function of temperature and time.
            </p>
            <p className="text-sm text-gray leading-relaxed">
              This enables both total outgassing quantification and thermally resolved analysis of release behavior from
              materials, components, and assemblies.
            </p>
            <p className="text-sm text-gray leading-relaxed">
              Both Twin-TQCM and Twin-CQCM support simultaneous real-time measurement at 10.278 MHz fundamental
              frequency and 30.833 MHz 3rd overtone, combining wide dynamic range with higher sensitivity in a single
              measurement architecture. The sensing units support up to 20 m module distance, ≤1 ppm frequency detection
              accuracy, 0.01 Hz frequency resolution, and temperature monitoring down to cryogenic conditions depending
              on the selected configuration.
            </p>
          </div>
          <div className="bento-card rounded-lg overflow-hidden bg-white/95 p-5">
            <img
              src={technicalImg}
              alt="Differential Twin-QCM measurement reduces environmental interference and improves measurement stability under real operating conditions"
              className="w-full h-auto object-contain"
            />
            <p className="text-[10px] font-mono text-gray/60 mt-3 text-center">
              Differential Twin-QCM measurement reduces environmental interference and improves measurement stability
              under real operating conditions.
            </p>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* Key features */}
      <Section>
        <SectionHeader eyebrow="Capabilities" title="Key Features" className="mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {features.map((f) => (
            <div key={f.title} className="bento-card rounded-lg p-6 space-y-3">
              <div className="text-blue">{f.icon}</div>
              <h3 className="text-sm font-medium text-sand">{f.title}</h3>
              <p className="text-xs text-gray leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="section-divider" />

      {/* Available variants */}
      <Section>
        <SectionHeader eyebrow="Configurations" title="Available Variants" className="mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bento-card rounded-lg p-8 space-y-4">
            <span className="mono-label text-blue">Thermoelectric</span>
            <h3 className="text-xl font-medium text-sand">Twin-TQCM</h3>
            <p className="text-sm text-gray leading-relaxed">
              The thermoelectric version is designed for applications where liquid nitrogen is not desired. It uses
              Peltier-based cooling and supports an operating temperature range from -80 to +125 °C. This makes it well
              suited for vacuum environment monitoring, cleanroom-related applications, compact material evaluation
              setups, and chamber integrations with reduced operating complexity and lower running cost.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-blue-light/70 border border-gray/15 rounded-sm px-2 py-1">
                -80 to +125 °C
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-blue-light/70 border border-gray/15 rounded-sm px-2 py-1">
                Peltier Cooling
              </span>
            </div>
          </div>
          <div className="bento-card rounded-lg p-8 space-y-4">
            <span className="mono-label text-blue">Cryogenic</span>
            <h3 className="text-xl font-medium text-sand">Twin-CQCM</h3>
            <p className="text-sm text-gray leading-relaxed">
              The cryogenic version is intended for advanced outgassing characterization, ASTM E1559-oriented testing,
              and contamination-sensitive applications requiring cryogenic trapping. It supports an operating
              temperature range from -196 to +125 °C for high-fidelity analysis in environments where liquid nitrogen
              cooling is available.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-blue-light/70 border border-gray/15 rounded-sm px-2 py-1">
                -196 to +125 °C
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-blue-light/70 border border-gray/15 rounded-sm px-2 py-1">
                LN₂ Cooling
              </span>
            </div>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* Technical snapshot */}
      <Section>
        <SectionHeader eyebrow="Specifications" title="Technical Snapshot" className="mb-10" />
        <div className="bento-card rounded-lg overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {specs.map((s) => (
              <div key={s.label} className="p-5 border-b border-r border-gray/10 last:border-r-0 space-y-1">
                <span className="mono-label text-gray/60 text-[10px]">{s.label}</span>
                <p className="text-sm font-medium text-sand">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* Typical applications */}
      <Section>
        <SectionHeader eyebrow="Use Cases" title="Typical Applications" className="mb-10" />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl">
          {applications.map((app) => (
            <div key={app} className="flex items-start gap-3 bento-card rounded-lg p-4">
              <ArrowRight className="w-3.5 h-3.5 text-blue mt-0.5 shrink-0" />
              <span className="text-sm text-gray leading-relaxed">{app}</span>
            </div>
          ))}
        </div>
      </Section>

      <div className="section-divider" />

      {/* System Integration by Deepvac */}
      <Section className="bg-surface/30">
        <SectionHeader eyebrow="Engineering Partner" title="System Integration by Deepvac" className="mb-8" />
        <div className="max-w-3xl space-y-5">
          <p className="text-sm text-gray leading-relaxed">
            Deepvac offers NDK Twin-QCM technology as an integrated option within new vacuum chambers and as an add-on
            subsystem for existing installations. Depending on customer requirements, the platform can be implemented as
            part of chamber upgrades, retrofit packages, material qualification setups, or contamination-monitoring
            extensions.
          </p>
          <p className="text-sm text-gray leading-relaxed">
            This gives customers access to outgassing diagnostics directly within their chamber environment, reducing
            reliance on separate standalone measurement workflows.
          </p>
        </div>
        <div className="flex flex-wrap gap-4 mt-8">
          <Button asChild variant="outline">
            <Link to="/products">
              Explore Products <ArrowRight className="w-3.5 h-3.5 ml-1" />
            </Link>
          </Button>
          <Button asChild variant="tertiary">
            <Link to="/services">View Engineering Services</Link>
          </Button>
        </div>
      </Section>

      {/* CTA */}
      <CTABand
        title="Add Advanced Outgassing Diagnostics to Your Vacuum System"
        description="From compact thermoelectric configurations to cryogenic QTGA setups, Deepvac integrates NDK Twin-QCM technology into new chambers, retrofit projects, and contamination-sensitive test environments."
      >
        <Button asChild size="lg" className="font-mono text-xs tracking-wide">
          <Link to="/contact">Request a Technical Consultation</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/contact">Discuss Integration</Link>
        </Button>
      </CTABand>
    </PageShell>
  </Layout>
);

export default TwinQCM;
