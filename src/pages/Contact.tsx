import { useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Phone, Mail, MapPin, Clock, Shield, ArrowRight } from "lucide-react";

const qualifierOptions = {
  chamberType: ["Standard T Series", "Standard C Series", "Custom TVAC", "Not sure yet"],
  applicationArea: ["Satellite / Spacecraft", "Payload / Component", "Research / Laboratory", "Industrial / Process", "Other"],
  timeline: ["Immediate (< 3 months)", "Near-term (3–6 months)", "Planning phase (6–12 months)", "Exploratory"],
};

const faqs = [
  { q: "What information should I prepare before contacting DEEPVAC?", a: "A productive initial conversation typically covers: test article dimensions and mass, required pressure and temperature ranges, thermal cycling requirements, feedthrough and instrumentation needs, facility constraints, and project timeline. DEEPVAC can guide this requirements definition process if needed." },
  { q: "What is the typical response time?", a: "DEEPVAC aims to respond to technical inquiries within two business days. Complex configuration requests may require additional time for initial technical assessment." },
  { q: "Can DEEPVAC support projects outside Germany?", a: "Yes. DEEPVAC provides engineering, delivery, installation, and commissioning services internationally. Project logistics are discussed during the initial consultation." },
  { q: "Is there a minimum project size?", a: "DEEPVAC serves projects ranging from standard chamber deliveries to complex custom system developments. Contact us to discuss your specific requirements and scope." },
];

function FormField({
  label,
  placeholder,
  type = "text",
  required = false,
}: {
  label: string;
  placeholder: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div className="space-y-2">
      <label className="mono-label">
        {label}
        {required && <span className="text-blue ml-1">*</span>}
      </label>
      <input
        type={type}
        required={required}
        className="w-full bg-background border border-gray/15 rounded-sm px-4 py-3 text-sm text-sand placeholder:text-gray/30 focus:outline-none focus:border-blue/40 focus:ring-1 focus:ring-blue/20 transition-all duration-200"
        placeholder={placeholder}
      />
    </div>
  );
}

function SelectField({
  label,
  options,
}: {
  label: string;
  options: string[];
}) {
  return (
    <div className="space-y-2">
      <label className="mono-label">{label}</label>
      <select className="w-full bg-background border border-gray/15 rounded-sm px-4 py-3 text-sm text-sand focus:outline-none focus:border-blue/40 focus:ring-1 focus:ring-blue/20 transition-all duration-200 appearance-none">
        <option value="" className="bg-surface text-gray">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt} className="bg-surface text-sand">{opt}</option>
        ))}
      </select>
    </div>
  );
}

const Contact = () => {
  const [consent, setConsent] = useState(false);

  return (
    <Layout>
      <PageShell>
        <PageHero
          eyebrow="Contact"
          title="Discuss Your Thermal Vacuum Requirements"
          description="Whether you need a chamber platform, a custom TVAC configuration, or engineering support for modernisation and integration — our team is ready to discuss your project."
        />

        {/* Main Contact Section */}
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 lg:gap-16">
            {/* Inquiry Form */}
            <div className="space-y-8">
              <div className="space-y-2">
                <h2 className="text-2xl font-medium text-sand tracking-tight">Engineering Inquiry</h2>
                <p className="text-sm text-gray">Provide your project context and we'll follow up with relevant technical information.</p>
              </div>

              <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField label="First Name" placeholder="First name" required />
                  <FormField label="Last Name" placeholder="Last name" required />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormField label="Work Email" placeholder="your@company.com" type="email" required />
                  <FormField label="Phone Number" placeholder="+49 ..." type="tel" />
                </div>
                <FormField label="Company" placeholder="Organisation" required />
                <FormField label="Project / Application" placeholder="e.g. Satellite subsystem qualification, custom TVAC for research program" />

                {/* Qualifier Fields */}
                <div className="border-t border-gray/10 pt-5 space-y-5">
                  <span className="mono-label text-blue">Optional — Help Us Prepare</span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
                    <SelectField label="Chamber Type" options={qualifierOptions.chamberType} />
                    <SelectField label="Application Area" options={qualifierOptions.applicationArea} />
                    <SelectField label="Timeline" options={qualifierOptions.timeline} />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="mono-label">Message</label>
                  <textarea
                    className="w-full bg-background border border-gray/15 rounded-sm px-4 py-3 text-sm text-sand placeholder:text-gray/30 focus:outline-none focus:border-blue/40 focus:ring-1 focus:ring-blue/20 transition-all duration-200 min-h-[120px] resize-y"
                    placeholder="Describe your test requirements, chamber specifications, or integration needs..."
                  />
                </div>

                {/* Consent */}
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 w-4 h-4 accent-blue rounded-sm border-gray/30"
                  />
                  <span className="text-xs text-gray/60 leading-relaxed group-hover:text-gray/80 transition-colors">
                    I agree that this data may be stored and processed for the purpose of contacting me. I am aware that I can withdraw my consent at any time.
                  </span>
                </label>

                <div className="flex items-center gap-4 pt-2">
                  <Button size="lg" className="font-mono text-xs tracking-wide">
                    Send Inquiry
                  </Button>
                  <div className="flex items-center gap-1.5 text-gray/40">
                    <Shield className="w-3 h-3" />
                    <span className="text-[10px] font-mono">Your data is handled securely</span>
                  </div>
                </div>
              </form>
            </div>

            {/* Contact Info Sidebar */}
            <div className="space-y-6">
              <div className="bento-card rounded-lg p-6 space-y-6">
                <h3 className="text-base font-medium text-sand">Contact Details</h3>

                <div className="space-y-5">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                    <div>
                      <span className="mono-label mb-1 block">Address</span>
                      <p className="text-sm text-gray leading-relaxed">
                        DEEPVAC GmbH<br />
                        An der Universität 1<br />
                        30823 Garbsen<br />
                        Germany
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                    <div>
                      <span className="mono-label mb-1 block">Phone</span>
                      <a href="tel:+4915783027099" className="text-sm text-gray hover:text-sand transition-colors">
                        +49 157 830 270 99
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                    <div>
                      <span className="mono-label mb-1 block">Email</span>
                      <a href="mailto:info@deepvac.space" className="text-sm text-gray hover:text-sand transition-colors">
                        info@deepvac.space
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                    <div>
                      <span className="mono-label mb-1 block">Response Time</span>
                      <p className="text-xs text-gray">Typically within 2 business days</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="bento-card rounded-lg overflow-hidden">
                <div className="h-48 blueprint-grid flex items-center justify-center relative">
                  <div className="text-center space-y-2">
                    <MapPin className="w-6 h-6 text-blue/40 mx-auto" />
                    <span className="mono-label text-gray/30">[MAP — Garbsen, Germany]</span>
                  </div>
                  <div className="absolute bottom-3 right-3 glass-overlay rounded-sm px-2 py-1">
                    <span className="mono-label text-blue-light/60">30823 Garbsen</span>
                  </div>
                </div>
              </div>

              {/* LinkedIn */}
              <div className="bento-card rounded-lg p-4 flex items-center justify-between">
                <span className="text-sm text-gray">Follow DEEPVAC</span>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm text-blue hover:text-blue-light transition-colors font-mono"
                >
                  LinkedIn <ArrowRight className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </Section>

        {/* FAQ */}
        <Section className="bg-surface/30">
          <SectionHeader eyebrow="FAQ" title="Contact & Project Questions" className="mb-10" />
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
          title="Prefer a Direct Conversation?"
          description="Call or email our engineering team to discuss your thermal vacuum test requirements."
        >
          <Button asChild size="lg">
            <a href="tel:+4915783027099">Call +49 157 830 270 99</a>
          </Button>
          <Button asChild variant="outline" size="lg">
            <a href="mailto:info@deepvac.space">Email info@deepvac.space</a>
          </Button>
        </CTABand>
      </PageShell>
    </Layout>
  );
};

export default Contact;
