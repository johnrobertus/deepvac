import { Layout } from "@/components/Layout";
import { PageShell, PageHero, Section, CTABand } from "@/components/PageShell";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  MapPin,
  Clock,
  Wrench,
  Cpu,
  Settings,
  Users,
  CheckCircle2,
  Workflow,
  FileText,
  MessageSquare,
  Building2,
} from "lucide-react";

const reasons = [
  {
    title: "Work on Real Hardware",
    description:
      "Design, build, and commission physical test systems that support aerospace qualification, research missions, and demanding development programs.",
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

const workAreas = [
  {
    title: "System Concept Development",
    description:
      "Translate customer requirements into technically sound system concepts for thermal vacuum and space simulation applications.",
    icon: Workflow,
  },
  {
    title: "Subsystem Engineering",
    description:
      "Design and specify vacuum, thermal, mechanical, control, and instrumentation subsystems, including interfaces and component selection.",
    icon: Cpu,
  },
  {
    title: "Integration & Commissioning",
    description:
      "Support build-up, acceptance testing, troubleshooting, and commissioning of complete systems in real project environments.",
    icon: Wrench,
  },
  {
    title: "Documentation & Reviews",
    description:
      "Create engineering documentation, calculations, specifications, and design review material with a focus on clarity and reliability.",
    icon: FileText,
  },
];

const fitPoints = [
  "You enjoy solving practical engineering problems on real hardware.",
  "You are comfortable working across disciplines and technical interfaces.",
  "You can move between analysis, design, implementation, and troubleshooting.",
  "You communicate clearly and make technically grounded decisions.",
  "You care about documentation, reliability, and long-term system performance.",
];

const processSteps = [
  {
    step: "01",
    title: "Application Review",
    description: "We review your background, experience, and technical fit for the work we do at Deepvac.",
    icon: FileText,
  },
  {
    step: "02",
    title: "Introductory Conversation",
    description:
      "A first conversation to get to know each other, discuss your interests, and answer initial questions.",
    icon: MessageSquare,
  },
  {
    step: "03",
    title: "Technical Discussion",
    description:
      "A focused exchange about your engineering experience, problem-solving approach, and relevant project work.",
    icon: Settings,
  },
  {
    step: "04",
    title: "On-Site Meeting",
    description:
      "A conversation in Garbsen to discuss the role in more detail and give you a better sense of the team and work environment.",
    icon: Building2,
  },
  {
    step: "05",
    title: "Decision & Next Steps",
    description: "We follow up quickly and communicate clearly about the outcome and potential next steps.",
    icon: ArrowRight,
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
                <div key={value} className="flex items-start gap-3 text-sm text-gray leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-blue mt-0.5 flex-shrink-0" />
                  <span>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section className="bg-surface/30">
        <SectionHeader eyebrow="Your Work" title="What You Will Work On" className="mb-14" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {workAreas.map((item) => {
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

      <Section>
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

      <Section className="bg-surface/30">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <SectionHeader eyebrow="Who Fits Well Here" title="Engineers Who Thrive at Deepvac" />
            <div className="space-y-4 text-sm text-gray leading-relaxed">
              <p>
                Deepvac is a strong fit for engineers who want to work on technically demanding systems with real-world
                constraints and real operational consequences. The work requires structured thinking, practical
                problem-solving, and the willingness to engage beyond a single discipline.
              </p>
              <p>
                We are especially interested in people who value engineering substance over presentation, who can work
                independently when needed, and who are motivated by building systems that must perform reliably in
                demanding environments.
              </p>
            </div>
          </div>

          <div className="bento-card rounded-lg p-6 space-y-5">
            <span className="mono-label text-blue">You are likely a strong fit if</span>
            <div className="space-y-3">
              {fitPoints.map((point) => (
                <div key={point} className="flex items-start gap-3 text-sm text-gray leading-relaxed">
                  <CheckCircle2 className="w-4 h-4 text-blue mt-0.5 flex-shrink-0" />
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeader
          eyebrow="Opportunities"
          title="Opportunities at Deepvac"
          description="We are currently building our team and welcome applications from engineers with relevant technical backgrounds who want to contribute in Garbsen, Germany."
          className="mb-10"
        />

        <a
          href="mailto:careers@deepvac.space?subject=General%20Application"
          className="bento-card rounded-lg p-6 flex flex-col lg:flex-row lg:items-start gap-6 lg:gap-10 cursor-pointer group block"
        >
          <div className="flex-1 space-y-4">
            <div className="space-y-2">
              <h3 className="text-lg font-medium text-sand group-hover:text-blue transition-colors">
                General Application
              </h3>
              <p className="text-sm text-gray leading-relaxed">
                We are always interested in hearing from engineers who want to contribute to the design, development,
                integration, and commissioning of advanced thermal vacuum systems. If there is no specific role listed
                that matches your background, we still encourage you to get in touch.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <span className="flex items-center gap-1.5 mono-label">
                <MapPin className="w-3 h-3" />
                Garbsen, Germany
              </span>
              <span className="flex items-center gap-1.5 mono-label">
                <Clock className="w-3 h-3" />
                Full-time
              </span>
              <span className="mono-label text-blue">Engineering</span>
            </div>

            <div className="pt-2 border-t border-white/10">
              <p className="text-sm text-gray leading-relaxed">
                Relevant backgrounds may include mechanical engineering, thermal engineering, vacuum systems, controls,
                instrumentation, system integration, test engineering, or adjacent technical fields.
              </p>
            </div>
          </div>

          <div className="lg:w-[220px] flex flex-col gap-4">
            <div className="bento-card rounded-lg p-4 space-y-3">
              <span className="mono-label text-blue">What to send</span>
              <div className="space-y-2 text-sm text-gray leading-relaxed">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue mt-0.5 flex-shrink-0" />
                  <span>Your CV or résumé</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue mt-0.5 flex-shrink-0" />
                  <span>A short note on your technical background</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-blue mt-0.5 flex-shrink-0" />
                  <span>Relevant project or hardware experience</span>
                </div>
              </div>
            </div>

            <div className="flex-shrink-0">
              <span className="flex items-center gap-1.5 text-sm text-blue font-mono group-hover:gap-2.5 transition-all">
                Apply Now
                <ArrowRight className="w-4 h-4" />
              </span>
            </div>
          </div>
        </a>
      </Section>

      <Section className="bg-surface/30">
        <SectionHeader
          eyebrow="Application Process"
          title="How We Hire"
          description="We aim for a straightforward and transparent process with clear communication throughout."
          className="mb-14"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-6">
          {processSteps.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.step} className="bento-card rounded-lg p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="mono-label text-blue">{item.step}</span>
                  <div className="w-9 h-9 rounded-sm bg-blue/10 border border-blue/20 flex items-center justify-center">
                    <Icon className="w-4 h-4 text-blue" />
                  </div>
                </div>
                <h3 className="text-base font-medium text-sand">{item.title}</h3>
                <p className="text-sm text-gray leading-relaxed">{item.description}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-6">
            <SectionHeader eyebrow="Culture" title="How We Work" />
            <div className="space-y-4 text-sm text-gray leading-relaxed">
              <p>
                Deepvac operates at the intersection of engineering precision and entrepreneurial execution. We work in
                a hands-on environment where technical depth, cross-disciplinary collaboration, and personal ownership
                matter.
              </p>
              <p>
                Engineers at Deepvac are expected to think beyond their immediate discipline, communicate clearly, and
                contribute to systems that must perform reliably in demanding real-world applications.
              </p>
            </div>
          </div>

          <div className="bento-card rounded-lg p-6 space-y-5">
            <span className="mono-label text-blue">Working environment</span>
            <div className="space-y-3 text-sm text-gray leading-relaxed">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-blue mt-0.5 flex-shrink-0" />
                <span>Small team with direct technical responsibility</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-blue mt-0.5 flex-shrink-0" />
                <span>Hands-on work across concept, design, integration, and commissioning</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-blue mt-0.5 flex-shrink-0" />
                <span>Close interaction with real projects, customers, and system-level decisions</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-blue mt-0.5 flex-shrink-0" />
                <span>Engineering culture focused on substance, clarity, and reliability</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      <CTABand
        title="Questions About Working at Deepvac?"
        description="Reach out to learn more about the team, the work, and current opportunities."
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <Button asChild>
            <a href="mailto:careers@deepvac.space?subject=Careers%20at%20Deepvac">Email Us</a>
          </Button>
          <Button asChild variant="outline">
            <Link to="/contact">Contact Page</Link>
          </Button>
        </div>
      </CTABand>
    </PageShell>
  </Layout>
);

export default Careers;
