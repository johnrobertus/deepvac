import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { PlaceholderImage } from "@/components/PlaceholderImage";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Linkedin, Cpu, Thermometer, Settings, Users } from "lucide-react";

const founders = [
  {
    name: "John Robertus",
    role: "CEO | Co-Founder",
    description: "Electrical engineer specialized in AI integration for mechatronic systems. John brings deep expertise in control architecture design, intelligent automation, and system-level integration for complex test environments.",
    focus: ["Control Systems & Automation", "AI-Driven Mechatronics", "System Architecture"],
    icon: Cpu,
  },
  {
    name: "Anton Opalikhin",
    role: "CTO | Co-Founder",
    description: "Mechanical engineer specialized in refrigeration and test chamber development. Anton leads the design and engineering of thermal vacuum chamber platforms, thermal subsystems, and mechanical integration.",
    focus: ["Chamber Development", "Refrigeration Engineering", "Mechanical Design"],
    icon: Thermometer,
  },
];

const philosophy = [
  { title: "System-Level Thinking", description: "Every chamber is a system, not just a vessel. We design thermal, vacuum, control, and mechanical subsystems as an integrated whole.", icon: Settings },
  { title: "Engineering-Led Decisions", description: "Technical rigor drives our architecture choices. We prioritize repeatability, serviceability, and long-term operational value over short-term optimization.", icon: Cpu },
  { title: "Collaborative Development", description: "We work closely with our customers' engineering teams to define requirements, interfaces, and integration constraints before committing to a design.", icon: Users },
];

const Team = () => (
  <Layout>
    <PageShell>
      <PageHero
        eyebrow="Our Team"
        title="Engineering-Led from Day One"
        description="Deepvac is built by engineers who have spent their careers developing, manufacturing, and commissioning thermal vacuum test systems."
      />

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <SectionHeader eyebrow="Our Story" title="Founded on Complementary Expertise" />
            <div className="space-y-4 text-sm text-gray leading-relaxed">
              <p>Deepvac was founded with a clear conviction: that thermal vacuum systems require a level of engineering integration that most equipment suppliers fail to deliver. Too often, chambers are designed in isolation from their control systems, thermal subsystems are bolted on as afterthoughts, and instrumentation is left to the end-user to figure out.</p>
              <p>The founding team brings more than 15 years of combined experience in the development and manufacturing of test chamber systems. By combining electrical engineering, mechatronics, refrigeration expertise, and chamber development know-how, Deepvac addresses the full system scope from a single engineering source.</p>
              <p>This integrated approach enables chamber platforms that are designed for repeatability, serviceability, and long-term operational value — not just initial commissioning.</p>
            </div>
          </div>
          <div className="bento-card rounded-lg p-6 space-y-4">
            <span className="mono-label text-blue">Combined Competencies</span>
            <div className="grid grid-cols-2 gap-3">
              {["Electrical Engineering", "Mechanical Design", "Refrigeration Systems", "Control Architecture", "AI & Automation", "Chamber Development", "System Integration", "Test Operations"].map((skill) => (
                <div key={skill} className="flex items-center gap-2 text-xs text-gray">
                  <span className="w-1 h-1 rounded-full bg-blue flex-shrink-0" />
                  {skill}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-surface/30">
        <SectionHeader eyebrow="Leadership" title="Founding Team" description="Two engineers with complementary expertise in the core disciplines required for advanced thermal vacuum system design." className="mb-14" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
          {founders.map((member) => (
            <div key={member.name} className="bento-card rounded-lg overflow-hidden">
              <PlaceholderImage assetId={member.name.split(" ")[1]?.toUpperCase() || "TEAM"} type="PORTRAIT" aspectRatio="4/5" className="rounded-none" />
              <div className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-medium text-sand">{member.name}</h3>
                    <span className="mono-label text-blue">{member.role}</span>
                  </div>
                  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray/40 hover:text-blue transition-colors" aria-label={`${member.name} LinkedIn`}>
                    <Linkedin className="w-4 h-4" />
                  </a>
                </div>
                <p className="text-sm text-gray leading-relaxed">{member.description}</p>
                <div className="pt-2 border-t border-gray/10 space-y-2">
                  <span className="mono-label">Focus Areas</span>
                  <div className="flex flex-wrap gap-2">
                    {member.focus.map((f) => (
                      <span key={f} className="px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-blue border border-blue/20 rounded-sm bg-blue/5">{f}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeader eyebrow="Philosophy" title="How We Engineer" description="Our approach to thermal vacuum system design is shaped by three principles." className="mb-14" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {philosophy.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="bento-card rounded-lg p-6 space-y-4">
                <div className="w-10 h-10 rounded-sm bg-blue/10 border border-blue/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue" />
                </div>
                <h3 className="text-base font-medium text-sand">{item.title}</h3>
                <p className="text-sm text-gray leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section className="bg-surface/30">
        <SectionHeader eyebrow="Partnership" title="Why Work with Deepvac" className="mb-10" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
          {[
            { title: "Single Engineering Source", text: "Thermal, vacuum, control, and mechanical subsystems designed by one team with shared system understanding." },
            { title: "Full Lifecycle Support", text: "From initial concept through commissioning, operation, maintenance, and modernization." },
            { title: "Application-Specific Design", text: "Every system is configured around the customer's test requirements, not around a fixed catalog product." },
            { title: "Hands-On Engineering Culture", text: "Our founders are practicing engineers who remain directly involved in technical decisions and customer projects." },
          ].map((item) => (
            <div key={item.title} className="flex gap-4">
              <span className="w-1.5 h-1.5 rounded-full bg-blue mt-2 flex-shrink-0" />
              <div>
                <h3 className="text-sm font-medium text-sand">{item.title}</h3>
                <p className="text-sm text-gray leading-relaxed mt-1">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CTABand title="Interested in Working Together?" description="Whether you need a thermal vacuum system, engineering support, or a technical consultation — we'd like to hear about your project.">
        <Button asChild><Link to="/contact">Request a Technical Consultation</Link></Button>
        <Button asChild variant="outline"><Link to="/careers">View Open Positions</Link></Button>
      </CTABand>
    </PageShell>
  </Layout>
);

export default Team;
