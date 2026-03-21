import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Clock, Wrench, Cpu, Settings, Users } from "lucide-react";

const openings = [
  {
    title: "General Application",
    type: "Full-time",
    location: "Garbsen, Germany",
    department: "Engineering",
    description:
      "We are always interested in hearing from engineers who want to contribute to the design, development, integration, and commissioning of advanced thermal vacuum systems. If there is no specific role listed that matches your background, we still encourage you to get in touch.",
  },
];

const reasons = [
  {
    title: "Work on Real Hardware",
    description:
      "Design, build, and commission physical test systems that support aerospace qualification, research missions, and demanding development programs..",
    icon: Wrench,
  },
  {
    title: "Engineering Ownership",
    description:
      "Take responsibility for technical decisions in a small team where engineering quality, speed, and accountability matter.",
    icon: Settings,
  },
  {
    title: "Multidisciplinary Scope",
    description:
      "Work across mechanical, thermal, vacuum, electrical, and software-related interfaces within one integrated system.",
    icon: Cpu,
  },
  {
    title: "Direct Customer Impact",
    description:
      "Your work directly enables test campaigns for aerospace and research customers and has visible impact on project outcomes.",
    icon: Users,
  },
];

const Careers = () => (
  <Layout>
    <PageShell>
      <PageHero
        eyebrow="Careers"
        title="Build Systems That Test Space Hardware"
        description="Deepvac is looking for engineers who want to work across the full technical scope of thermal vacuum system development, from concept and subsystem design to integration and commissioning."
      />

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <SectionHeader
              eyebrow="Our Mission"
              title="Engineering Thermal Vacuum Systems for Demanding Applications"
            />
            <div className="space-y-4 text-sm text-gray leading-relaxed">
              <p>
                Deepvac develops advanced thermal vacuum systems for aerospace, research, and industrial test
                environments. Our work covers the full engineering scope of these systems, including mechanical design,
                thermal subsystems, vacuum architecture, control systems, instrumentation, and overall system
                integration.
              </p>
              <p>
                We are building a team of engineers who are comfortable working across disciplines, who take ownership
                of technical decisions, and who care about the long-term performance and reliability of the systems they
                design.
              </p>
            </div>
          </div>
          <div className="bento-card rounded-lg p-6 space-y-5">
            <span className="mono-label text-blue">What We Value</span>
            <div className="space-y-3">
              {[
                "Technical depth and sound engineering judgement",
                "Clear communication and honest assessment",
                "Ownership of technical decisions and outcomes",
                "Willingness to work across system boundaries",
                "Precision in design, documentation, and execution",
              ].map((value) => (
                <div key={value} className="flex items-start gap-3 text-sm text-gray">
                  <span className="w-1 h-1 rounded-full bg-blue mt-2 flex-shrink-0" />
                  {value}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-surface/30">
        <SectionHeader eyebrow="Why Deepvac" title="Reasons to Join" className="mb-14" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reasons.map((reason) => {
            const Icon = reason.icon;
            return (
              <div key={reason.title} className="bento-card rounded-lg p-6 space-y-4">
                <div className="w-10 h-10 rounded-sm bg-blue/10 border border-blue/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-blue" />
                </div>
                <h3 className="text-base font-medium text-sand">{reason.title}</h3>
                <p className="text-sm text-gray leading-relaxed">{reason.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Open Positions"
          title="Current Openings"
          description="We are always interested in hearing from talented people who want to contribute to our team in Garbsen, Germany."
          className="mb-10"
        />
        <div className="space-y-4">
          {openings.map((role) => (
            <a
              key={role.title}
              href="mailto:careers@deepvac.space?subject=General%20Application"
              className="bento-card rounded-lg p-6 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 cursor-pointer group block"
            >
              <div className="flex-1 space-y-2">
                <h3 className="text-base font-medium text-sand group-hover:text-blue transition-colors">
                  {role.title}
                </h3>
                <p className="text-sm text-gray leading-relaxed">{role.description}</p>
                <div className="flex flex-wrap gap-3 pt-1">
                  <span className="flex items-center gap-1.5 mono-label">
                    <MapPin className="w-3 h-3" />
                    {role.location}
                  </span>
                  <span className="flex items-center gap-1.5 mono-label">
                    <Clock className="w-3 h-3" />
                    {role.type}
                  </span>
                  <span className="mono-label text-blue">{role.department}</span>
                </div>
              </div>
              <div className="flex-shrink-0">
                <span className="flex items-center gap-1.5 text-sm text-blue font-mono group-hover:gap-2.5 transition-all">
                  Apply Now
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </a>
          ))}
        </div>
      </Section>

      <Section className="bg-surface/30">
        <SectionHeader
          eyebrow="Culture"
          title="How We Work"
          description="Deepvac operates at the intersection of engineering precision and entrepreneurial agility. We value technical depth, collaborative problem-solving, and hands-on ownership."
        />
      </Section>

      <CTABand
        title="Questions About Working at Deepvac?"
        description="Reach out to learn more about the team, the work, and current opportunities."
      >
        <Button asChild>
          <Link to="/contact">Contact Us</Link>
        </Button>
      </CTABand>
    </PageShell>
  </Layout>
);

export default Careers;
