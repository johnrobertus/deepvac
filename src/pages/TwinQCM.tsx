import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { ArrowRight, Waves, Thermometer, Radio, Replace, Settings, Wrench, Package, RefreshCw, Shield } from "lucide-react";
import heroImg from "@/assets/twin-qcm-hero.png";
import technicalImg from "@/assets/twin-qcm-technical.png";

const features = [
  {
    icon: <Waves className="w-5 h-5" />,
    title: "Differential twin sensing",
    description: "Reference and detection electrodes on one crystal support stable measurement with reduced sensitivity to external noise and temperature variation.",
  },
  {
    icon: <Thermometer className="w-5 h-5" />,
    title: "On-crystal temperature sensing",
    description: "A platinum RTD Pt1000 temperature sensor mounted directly on the crystal for higher temperature measurement accuracy.",
  },
  {
    icon: <Radio className="w-5 h-5" />,
    title: "Dual-frequency operation",
    description: "Simultaneous fundamental and 3rd overtone measurement supports both broad measurement range and higher sensitivity.",
  },
  {
    icon: <Replace className="w-5 h-5" />,
    title: "User-replaceable crystal",
    description: "Clip-based design allows fast crystal replacement by the user, reducing service effort and running cost.",
  },
  {
    icon: <Settings className="w-5 h-5" />,
    title: "Flexible integration",
    description: "Available with 1-channel and multi-channel sensing units, suitable for new systems and retrofit environments.",
  },
];

const keySpecs = [
  { label: "Dual frequency", value: "10.278 / 30.833 MHz", sub: "Fundamental + 3rd overtone" },
  { label: "Cryogenic range", value: "Down to −196 °C", sub: "Twin-CQCM with LN₂ cooling" },
  { label: "Detection accuracy", value: "≤ 1 ppm", sub: "Frequency detection" },
  { label: "Cable distance", value: "Up to 20 m", sub: "Module-to-sensing-unit" },
];

const specs = [
  { label: "Frequency (fundamental)", value: "10.278 MHz" },
  { label: "Frequency (3rd overtone)", value: "30.833 MHz" },
  { label: "Frequency resolution", value: "0.01 Hz" },
  { label: "Detection accuracy", value: "≤ 1 ppm" },
  { label: "Electrode area", value: "0.1257 cm² per electrode" },
  { label: "Viewing angle", value: "20° half angle" },
  { label: "TQCM temp. range", value: "−80 to +125 °C" },
  { label: "CQCM temp. range", value: "−196 to +125 °C" },
  { label: "TQCM module mass", value: "≤ 50 g" },
  { label: "CQCM module mass", value: "≤ 100 g" },
  { label: "Module dimensions", value: "Φ35.0 × 23.3 mm" },
  { label: "Max. cable length", value: "20 m" },
  { label: "Measurement interval", value: "From 1 s" },
  { label: "Temp. detection accuracy", value: "≤ ±0.4 °C" },
];

const applications = [
  "Chamber-integrated outgassing diagnostics for aerospace test campaigns",
  "Material qualification for contamination-sensitive hardware",
  "Evaluation of seals, cables, adhesives, and machined parts",
  "Monitoring of contamination-critical vacuum processes",
  "Thermally resolved analysis for qualification and validation workflows",
  "Cleaning effectiveness verification on machined metal components",
];

const integrationScenarios = [
  { icon: <Package className="w-5 h-5" />, title: "New chamber option", description: "Twin-QCM integrated as a factory option in new Deepvac vacuum chambers." },
  { icon: <RefreshCw className="w-5 h-5" />, title: "Retrofit package", description: "Add outgassing diagnostics to existing vacuum chambers as a retrofit subsystem." },
  { icon: <Wrench className="w-5 h-5" />, title: "Chamber upgrade", description: "Extend chamber capability with integrated contamination sensing during planned upgrades." },
  { icon: <Shield className="w-5 h-5" />, title: "Contamination monitoring", description: "Dedicated monitoring extension for contamination-critical processes and qualification campaigns." },
];

const TwinQCM = () => (
  <Layout>
    <PageShell>
      {/* ── Hero ── */}
      <section className="py-20 md:py-32 px-6">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <span className="mono-label text-blue">Integrated Technology</span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-sand">
                NDK Twin-QCM Outgassing Analysis
              </h1>
              <p className="text-base text-gray leading-relaxed max-w-xl">
                Integrated by Deepvac for new vacuum chambers, upgrades, retrofit projects, and contamination-control applications.
              </p>
              <p className="text-xs font-mono text-blue-light/80 border-l-2 border-blue/40 pl-3 max-w-xl">
                Sensor technology developed and manufactured by NDK. System integration, application engineering, and chamber implementation by Deepvac.
              </p>
              <p className="text-sm text-gray/80 leading-relaxed max-w-xl">
                Deepvac integrates NDK's Twin-TQCM and Twin-CQCM technology into new and existing vacuum systems for quantitative outgassing measurement and thermally resolved contamination analysis. The platform supports chamber-integrated diagnostics for contamination-sensitive applications, material evaluation, and vacuum process characterization.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild size="lg" className="font-mono text-xs tracking-wide">
                  <Link to="/contact">Discuss Integration</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link to="/contact">Request a Technical Consultation</Link>
                </Button>
              </div>
            </div>
            <div className="bento-card rounded-lg overflow-hidden bg-white/95 p-6 lg:p-8">
              <img
                src={heroImg}
                alt="NDK Twin-QCM sensor module and sensing unit for integrated outgassing analysis"
                className="w-full h-auto object-contain"
              />
              <p className="text-[10px] font-mono text-gray/60 mt-3 text-center">
                Twin-QCM sensor module and sensing unit for integrated outgassing analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ── Engineering Integration by Deepvac ── */}
      <Section>
        <SectionHeader
          eyebrow="Engineering Partner"
          title="System Integration for New and Existing Vacuum Chambers"
          className="mb-10"
        />
        <div className="max-w-3xl space-y-5 mb-10">
          <p className="text-sm text-gray leading-relaxed">
            Deepvac delivers Twin-QCM technology as a fully integrated subsystem — not as a standalone instrument. Depending on project scope, the sensor platform is implemented as part of new chamber builds, retrofit packages, chamber upgrades, or dedicated contamination-monitoring extensions.
          </p>
          <p className="text-sm text-gray leading-relaxed">
            This gives customers access to chamber-integrated outgassing diagnostics without relying on separate laboratory workflows or third-party measurement setups.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {integrationScenarios.map((s) => (
            <div key={s.title} className="bento-card rounded-lg p-6 space-y-3">
              <div className="text-blue">{s.icon}</div>
              <h3 className="text-sm font-medium text-sand">{s.title}</h3>
              <p className="text-xs text-gray leading-relaxed">{s.description}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-wrap gap-3 mt-8">
          <Button asChild size="lg" className="font-mono text-xs tracking-wide">
            <Link to="/contact">Discuss Integration</Link>
          </Button>
          <Button asChild variant="tertiary">
            <Link to="/services">View Engineering Services</Link>
          </Button>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ── Overview ── */}
      <Section>
        <SectionHeader
          eyebrow="Overview"
          title="Chamber-Integrated Outgassing Diagnostics"
          className="mb-10"
        />
        <div className="max-w-3xl space-y-5">
          <p className="text-sm text-gray leading-relaxed">
            The Twin-QCM platform combines precise mass detection with thermally resolved outgassing analysis in a compact, chamber-integrated subsystem. Instead of treating contamination analysis as a separate laboratory workflow, Deepvac integrates the technology directly into vacuum chambers, chamber upgrades, retrofit packages, and customer-specific test setups.
          </p>
          <p className="text-sm text-gray leading-relaxed">
            At the core is a twin-electrode crystal design with a reaction electrode and a reference electrode on the same crystal blank. By evaluating the differential signal between both electrodes, the sensor reduces the influence of vibration, temperature drift, and other environmental disturbances — supporting more stable and repeatable measurements under real chamber conditions. A platinum temperature sensor mounted directly on the crystal further improves temperature monitoring at the actual sensing location.
          </p>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ── Measurement Principle ── */}
      <Section>
        <SectionHeader
          eyebrow="Measurement Principle"
          title="How It Works"
          className="mb-10"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-5">
            <p className="text-sm text-gray leading-relaxed">
              When outgassed species adsorb onto the crystal electrode, the resonance frequency decreases in proportion to the deposited mass. In QTGA operation, the sensor is cooled and heated in a controlled profile, allowing adsorption and desorption behavior to be tracked as a function of temperature and time.
            </p>
            <p className="text-sm text-gray leading-relaxed">
              This provides not only total outgassing information, but also deeper insight into thermal release characteristics of materials, components, and assemblies.
            </p>
            <p className="text-sm text-gray leading-relaxed">
              Both Twin-TQCM and Twin-CQCM support simultaneous real-time measurement at 10.278 MHz fundamental frequency and 30.833 MHz 3rd overtone — combining wide dynamic range with higher sensitivity in one measurement architecture.
            </p>
          </div>
          {/* Technical image — larger presentation with breathing room */}
          <div className="bento-card rounded-lg overflow-hidden bg-white/95 p-6 lg:p-10">
            <img
              src={technicalImg}
              alt="Differential Twin-QCM measurement principle — reference and detection electrodes reduce environmental interference"
              className="w-full h-auto object-contain"
            />
            <p className="text-[10px] font-mono text-gray/60 mt-4 text-center leading-relaxed">
              Differential Twin-QCM measurement reduces environmental interference and improves measurement stability under real chamber conditions.
            </p>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ── Key Technical Features ── */}
      <Section>
        <SectionHeader
          eyebrow="Capabilities"
          title="Key Technical Features"
          className="mb-10"
        />
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

      {/* ── Variant Selection ── */}
      <Section>
        <SectionHeader
          eyebrow="Configurations"
          title="Variant Selection"
          className="mb-10"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bento-card rounded-lg p-8 space-y-4">
            <span className="mono-label text-blue">Thermoelectric</span>
            <h3 className="text-xl font-medium text-sand">Twin-TQCM</h3>
            <p className="text-sm text-gray leading-relaxed">
              Designed for applications where liquid nitrogen is not desired. Uses Peltier-based cooling with an operating range from −80 to +125 °C. Suited for vacuum environment monitoring, cleanroom-related applications, compact material evaluation setups, and lower-complexity chamber integrations.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-blue-light/70 border border-gray/15 rounded-sm px-2 py-1">−80 to +125 °C</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-blue-light/70 border border-gray/15 rounded-sm px-2 py-1">Peltier Cooling</span>
            </div>
          </div>
          <div className="bento-card rounded-lg p-8 space-y-4">
            <span className="mono-label text-blue">Cryogenic</span>
            <h3 className="text-xl font-medium text-sand">Twin-CQCM</h3>
            <p className="text-sm text-gray leading-relaxed">
              Designed for advanced outgassing studies and ASTM E1559-oriented testing. Supports an operating range from −196 to +125 °C for high-fidelity outgassing analysis in cryogenic environments where liquid nitrogen cooling is available.
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              <span className="font-mono text-[10px] uppercase tracking-widest text-blue-light/70 border border-gray/15 rounded-sm px-2 py-1">−196 to +125 °C</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-blue-light/70 border border-gray/15 rounded-sm px-2 py-1">LN₂ Cooling</span>
            </div>
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ── Technical Snapshot — Key specs first ── */}
      <Section>
        <SectionHeader
          eyebrow="Specifications"
          title="Technical Snapshot"
          className="mb-10"
        />
        {/* Key spec highlights */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {keySpecs.map((ks) => (
            <div key={ks.label} className="bento-card rounded-lg p-6 space-y-2 text-center">
              <span className="mono-label text-gray/50 text-[10px]">{ks.label}</span>
              <p className="text-lg md:text-xl font-medium text-sand">{ks.value}</p>
              <p className="text-[10px] font-mono text-gray/50">{ks.sub}</p>
            </div>
          ))}
        </div>
        {/* Full spec grid */}
        <div className="bento-card rounded-lg overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {specs.map((s) => (
              <div
                key={s.label}
                className="p-5 border-b border-r border-gray/10 last:border-r-0 space-y-1"
              >
                <span className="mono-label text-gray/60 text-[10px]">{s.label}</span>
                <p className="text-sm font-medium text-sand">{s.value}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <div className="section-divider" />

      {/* ── Applications ── */}
      <Section>
        <SectionHeader
          eyebrow="Use Cases"
          title="Applications in Contamination-Sensitive Vacuum Environments"
          className="mb-10"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-4xl">
          {applications.map((app) => (
            <div key={app} className="flex items-start gap-3 bento-card rounded-lg p-4">
              <ArrowRight className="w-3.5 h-3.5 text-blue mt-0.5 shrink-0" />
              <span className="text-sm text-gray leading-relaxed">{app}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── CTA Band ── */}
      <CTABand
        title="Add Outgassing Diagnostics to Your Vacuum System"
        description="From compact thermoelectric configurations to cryogenic QTGA setups, Deepvac integrates NDK Twin-QCM technology into new chambers, retrofit projects, and application-specific contamination-control solutions."
      >
        <Button asChild size="lg" className="font-mono text-xs tracking-wide">
          <Link to="/contact">Discuss Integration</Link>
        </Button>
        <Button asChild variant="outline" size="lg">
          <Link to="/contact">Request a Technical Consultation</Link>
        </Button>
      </CTABand>
    </PageShell>
  </Layout>
);

export default TwinQCM;
