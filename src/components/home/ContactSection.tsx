import { useState } from "react";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";

export function ContactSection() {
  const [consent, setConsent] = useState(false);

  return (
    <section className="py-20 md:py-28 px-6 bg-surface/30">
      <div className="container max-w-6xl">
        <SectionHeader
          eyebrow="Contact"
          title="Contact Us"
          description="Tell us about your chamber, test, or integration requirements."
          className="mb-14"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Form */}
          <div className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <FormField label="First Name" placeholder="First name" />
              <FormField label="Last Name" placeholder="Last name" />
            </div>
            <FormField label="Work Email" placeholder="your@company.com" type="email" />
            <FormField label="Company" placeholder="Organisation" />
            <FormField label="Phone Number" placeholder="+49 ..." type="tel" />
            <FormField label="Project / Application" placeholder="Satellite TVAC, Research Chamber, etc." />
            <div className="space-y-2">
              <label className="mono-label">Message</label>
              <textarea
                className="w-full bg-background border border-gray/15 rounded-sm px-4 py-3 text-sm text-sand placeholder:text-gray/30 focus:outline-none focus:border-blue/40 transition-colors min-h-[100px] resize-y"
                placeholder="Describe your requirements..."
              />
            </div>

            {/* Consent */}
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-1 accent-blue"
              />
              <span className="text-xs text-gray/60 leading-relaxed">
                I agree that this data may be stored and processed for the purpose of contacting me. I am aware that I can withdraw my consent at any time.
              </span>
            </label>

            <Button size="lg" className="font-mono text-xs tracking-wide w-full sm:w-auto">
              Send Inquiry
            </Button>
          </div>

          {/* Contact Info */}
          <div className="space-y-8 lg:pl-8">
            <div>
              <h3 className="mono-label text-blue mb-3">Address</h3>
              <p className="text-sm text-gray leading-relaxed">
                DEEPVAC GmbH<br />
                An der Universität 1<br />
                30823 Garbsen<br />
                Germany
              </p>
            </div>
            <div>
              <h3 className="mono-label text-blue mb-3">Contact</h3>
              <p className="text-sm text-gray leading-relaxed">
                Phone: +49 157 830 270 99<br />
                Email: info@deepvac.space
              </p>
            </div>
            <div>
              <h3 className="mono-label text-blue mb-3">Connect</h3>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray hover:text-blue transition-colors"
              >
                LinkedIn →
              </a>
            </div>

            {/* Map placeholder */}
            <div className="border border-gray/10 rounded-lg h-48 flex items-center justify-center blueprint-grid">
              <span className="mono-label text-gray/30">[MAP — Garbsen, Germany]</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="mono-label">{label}</label>
      <input
        type={type}
        className="w-full bg-background border border-gray/15 rounded-sm px-4 py-3 text-sm text-sand placeholder:text-gray/30 focus:outline-none focus:border-blue/40 transition-colors"
        placeholder={placeholder}
      />
    </div>
  );
}
