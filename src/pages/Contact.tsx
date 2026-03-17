import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section } from "@/components/PageShell";
import { Button } from "@/components/ui/button";

const Contact = () => (
  <Layout>
    <PageShell>
      <PageHero eyebrow="Get in Touch" title="Request a Technical Consultation" description="Our engineering team is ready to discuss your thermal vacuum requirements." />
      <Section>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="mono-label">Full Name</label>
              <input type="text" className="w-full bg-surface border border-gray/15 rounded-sm px-4 py-3 text-sm text-sand placeholder:text-gray/40 focus:outline-none focus:border-blue/50 transition-colors" placeholder="Your name" />
            </div>
            <div className="space-y-2">
              <label className="mono-label">Email</label>
              <input type="email" className="w-full bg-surface border border-gray/15 rounded-sm px-4 py-3 text-sm text-sand placeholder:text-gray/40 focus:outline-none focus:border-blue/50 transition-colors" placeholder="your@email.com" />
            </div>
            <div className="space-y-2">
              <label className="mono-label">Company</label>
              <input type="text" className="w-full bg-surface border border-gray/15 rounded-sm px-4 py-3 text-sm text-sand placeholder:text-gray/40 focus:outline-none focus:border-blue/50 transition-colors" placeholder="Organisation" />
            </div>
            <div className="space-y-2">
              <label className="mono-label">Message</label>
              <textarea className="w-full bg-surface border border-gray/15 rounded-sm px-4 py-3 text-sm text-sand placeholder:text-gray/40 focus:outline-none focus:border-blue/50 transition-colors min-h-[120px] resize-y" placeholder="Describe your requirements..." />
            </div>
            <Button size="lg" className="font-mono text-xs tracking-wide w-full md:w-auto">
              Send Inquiry
            </Button>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="mono-label text-blue mb-3">Address</h3>
              <p className="text-sm text-gray leading-relaxed">
                DEEPVAC GmbH<br />
                Address placeholder<br />
                Germany
              </p>
            </div>
            <div>
              <h3 className="mono-label text-blue mb-3">Contact</h3>
              <p className="text-sm text-gray leading-relaxed">
                Phone: +49 (0) 000 000 0000<br />
                Email: info@deepvac.de
              </p>
            </div>
          </div>
        </div>
      </Section>
    </PageShell>
  </Layout>
);

export default Contact;
