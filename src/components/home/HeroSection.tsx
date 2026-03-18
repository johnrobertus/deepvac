import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import heroChamber from "@/assets/hero-chamber.jpg";

const specChips = [
  "High-Vacuum Environments",
  "Thermal Cycling Workflows",
  "Custom Chamber Architectures",
  "Integrated Control Systems",
];

const trustCues = [
  "Modular Systems",
  "Custom Engineering",
  "Aerospace Applications",
  "Service & Retrofit",
];

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="relative z-10 pt-32 pb-20 md:pt-40 md:pb-28 px-6">
        <div className="container max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left — Copy */}
            <div className="space-y-8">
              <Reveal>
                <div className="space-y-4">
                  <span className="mono-label text-blue">Precision Vacuum Engineering — Made in Germany</span>
                  <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-sand leading-[1.1]">
                    Next Gen Space Simulation Systems
                  </h1>
                  <p className="text-xl md:text-2xl text-gray font-light tracking-tight">
                    Thermal Vacuum Testing. Reimagined.
                  </p>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <p className="text-sm text-gray leading-relaxed max-w-lg">
                  Deepvac develops advanced thermal vacuum systems for the qualification, validation, and environmental simulation of aerospace hardware. Our chamber platforms are engineered to recreate controlled high-vacuum and thermal test conditions for components, subsystems, and mission-critical assemblies.
                </p>
              </Reveal>

              <Reveal delay={150}>
                <p className="text-sm text-gray/70 leading-relaxed max-w-lg">
                  Combining modular chamber architectures, precision thermal control, and intelligent system integration, Deepvac supports repeatable test workflows, low-contamination environments, and application-specific system configurations for demanding space and research programs.
                </p>
              </Reveal>

              <Reveal delay={200}>
                <div className="flex flex-wrap gap-3 pt-2">
                  <Button asChild size="lg" className="font-mono text-xs tracking-wide">
                    <Link to="/contact">Request a Technical Consultation</Link>
                  </Button>
                  <Button asChild variant="outline" size="lg">
                    <Link to="/products">Explore TVAC Platforms</Link>
                  </Button>
                </div>
              </Reveal>

              <Reveal delay={250}>
                <div className="flex flex-wrap gap-3 pt-4">
                  {trustCues.map((cue) => (
                    <span
                      key={cue}
                      className="inline-flex items-center gap-1.5 rounded-sm border border-gray/15 bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-gray/60"
                    >
                      <span className="w-1 h-1 rounded-full bg-blue/60" />
                      {cue}
                    </span>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Right — Hero Visual */}
            <Reveal delay={150}>
              <div className="relative">
                <div className="relative rounded-lg overflow-hidden border border-gray/10">
                  <img
                    src={heroChamber}
                    alt="Deepvac thermal vacuum chamber system for aerospace qualification and space simulation testing"
                    className="w-full h-auto object-cover"
                    loading="eager"
                  />

                  {/* Floating Spec Cards */}
                  <div className="absolute top-4 left-4 glass-overlay rounded-md px-3 py-2">
                    <span className="mono-label text-blue-light">Vacuum</span>
                    <p className="font-mono text-xs text-sand mt-0.5">High-Vacuum Regime</p>
                  </div>

                  <div className="absolute top-4 right-4 glass-overlay rounded-md px-3 py-2">
                    <span className="mono-label text-blue-light">Thermal</span>
                    <p className="font-mono text-xs text-sand mt-0.5">Precision Cycling</p>
                  </div>

                  <div className="absolute bottom-4 left-4 glass-overlay rounded-md px-3 py-2">
                    <span className="mono-label text-blue-light">Controls</span>
                    <p className="font-mono text-xs text-sand mt-0.5">Intelligent Automation</p>
                  </div>

                  <div className="absolute bottom-4 right-4 glass-overlay rounded-md px-3 py-2">
                    <span className="mono-label text-blue-light">Integration</span>
                    <p className="font-mono text-xs text-sand mt-0.5">Custom Interfaces</p>
                  </div>
                </div>

                {/* Spec Chips Below Image */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {specChips.map((chip) => (
                    <span
                      key={chip}
                      className="inline-flex items-center rounded-sm border border-blue/20 bg-surface px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-blue/70"
                    >
                      {chip}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
