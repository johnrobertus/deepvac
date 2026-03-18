import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { Phone, Mail, MapPin, Shield } from "lucide-react";

export function ContactSection() {
  const [consent, setConsent] = useState(false);

  return (
    <section className="py-20 md:py-28 px-6 bg-surface/30">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Contact"
            title="Discuss Your Requirements"
            description="Tell us about your chamber, test, or integration requirements."
            className="mb-14"
          />
        </Reveal>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <Reveal delay={100}>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormField label="First Name" placeholder="First name" required />
                <FormField label="Last Name" placeholder="Last name" required />
              </div>
              <FormField label="Work Email" placeholder="your@company.com" type="email" required />
              <FormField label="Company" placeholder="Organisation" required />
              <FormField label="Phone Number" placeholder="+49 ..." type="tel" />
              <FormField label="Project / Application" placeholder="Satellite TVAC, Research Chamber, etc." />
              <div className="space-y-2">
                <label className="mono-label">Message</label>
                <textarea
                  className="w-full bg-background border border-gray/15 rounded-sm px-4 py-3 text-sm text-sand placeholder:text-gray/30 focus:outline-none focus:border-blue/40 focus:ring-1 focus:ring-blue/20 transition-all duration-200 min-h-[100px] resize-y"
                  placeholder="Describe your requirements..."
                />
              </div>

              {/* Consent */}
              <label className="flex items-start gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  className="mt-0.5 w-4 h-4 accent-blue"
                />
                <span className="text-xs text-gray/60 leading-relaxed group-hover:text-gray/80 transition-colors">
                  I agree that this data may be stored and processed for the purpose of contacting me. I am aware that I can withdraw my consent at any time.
                </span>
              </label>

              <div className="flex items-center gap-4">
                <Button size="lg" className="font-mono text-xs tracking-wide">
                  Send Inquiry
                </Button>
                <div className="flex items-center gap-1.5 text-gray/40">
                  <Shield className="w-3 h-3" />
                  <span className="text-[10px] font-mono">Secure & confidential</span>
                </div>
              </div>
            </form>
          </Reveal>

          {/* Contact Info */}
          <Reveal delay={200}>
            <div className="space-y-6 lg:pl-8">
              <div className="bento-card rounded-lg p-6 space-y-5">
                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                  <div>
                    <span className="mono-label mb-1 block">Address</span>
                    <p className="text-sm text-gray leading-relaxed">
                      Deepvac GmbH<br />
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
                    <a href="tel:+4915783027099" className="text-sm text-gray hover:text-sand transition-colors">+49 157 830 270 99</a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Mail className="w-4 h-4 text-blue mt-0.5 shrink-0" />
                  <div>
                    <span className="mono-label mb-1 block">Email</span>
                    <a href="mailto:info@deepvac.space" className="text-sm text-gray hover:text-sand transition-colors">info@deepvac.space</a>
                  </div>
                </div>
              </div>

              {/* Map placeholder */}
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

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bento-card rounded-lg p-4 flex items-center justify-between group block"
              >
                <span className="text-sm text-gray group-hover:text-sand transition-colors">Follow Deepvac</span>
                <span className="text-sm text-blue font-mono">LinkedIn →</span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

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
