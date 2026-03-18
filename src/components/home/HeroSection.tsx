import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import heroChamber from "@/assets/hero-chamber.jpg";

const specChips = [
"HIGH-VACUUM ENVIRONMENTS",
"THERMAL CYCLING WORKFLOWS",
"CUSTOM CHAMBER ARCHITECTURES",
"INTEGRATED CONTROL SYSTEMS"];


const trustCues = [
"MODULAR SYSTEMS",
"CUSTOM ENGINEERING",
"AEROSPACE APPLICATIONS",
"SERVICE & RETROFIT"];


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
                  <span className="mono-label text-blue">PRECISION VACUUM ENGINEERING. MADE IN GERMANY.</span>
                  <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-medium tracking-tight text-sand leading-[1.1]">
                    Thermal Vacuum Systems for Aerospace Qualification
                  </h1>
                </div>
              </Reveal>

              <Reveal delay={100}>
                <p className="text-sm text-gray leading-relaxed max-w-lg">
                  Deepvac develops modular and custom thermal vacuum systems for the qualification, validation, and environmental simulation of aerospace hardware. Our platforms combine high-vacuum performance, precise thermal control, and application-specific integration for reliable test execution in research, institutional, and commercial space programs.
                </p>
              </Reveal>

              <Reveal delay={150}>
                <p className="text-sm text-gray/70 leading-relaxed max-w-lg">
                  {"\n"}
                </p>
              </Reveal>


              <Reveal delay={250}>
                <div className="flex flex-wrap gap-3 pt-4">
                  {trustCues.map((cue) =>
                  <span
                    key={cue}
                    className="inline-flex items-center gap-1.5 rounded-sm border border-gray/15 bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-gray/60">
                    
                      <span className="w-1 h-1 rounded-full bg-blue/60" />
                      {cue}
                    </span>
                  )}
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
                    loading="eager" />
                  

                  {/* Floating Spec Cards */}
                  <div className="absolute top-4 left-4 glass-overlay rounded-md px-3 py-2">
                    <span className="mono-label text-blue-light">VACUUM</span>
                    <p className="font-mono text-xs text-sand mt-0.5">High-Vacuum Regime</p>
                  </div>

                  <div className="absolute top-4 right-4 glass-overlay rounded-md px-3 py-2">
                    <span className="mono-label text-blue-light">THERMAL</span>
                    <p className="font-mono text-xs text-sand mt-0.5">Precision Cycling</p>
                  </div>

                  <div className="absolute bottom-4 left-4 glass-overlay rounded-md px-3 py-2">
                    <span className="mono-label text-blue-light">CONTROLS</span>
                    <p className="font-mono text-xs text-sand mt-0.5">Intelligent Automation</p>
                  </div>

                  <div className="absolute bottom-4 right-4 glass-overlay rounded-md px-3 py-2">
                    <span className="mono-label text-blue-light">INTEGRATION</span>
                    <p className="font-mono text-xs text-sand mt-0.5">Custom Interfaces</p>
                  </div>
                </div>

                {/* Spec Chips Below Image */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {specChips.map((chip) =>
                  <span
                    key={chip}
                    className="inline-flex items-center rounded-sm border border-blue/20 bg-surface px-2.5 py-1 font-mono text-[9px] uppercase tracking-widest text-blue/70">
                    
                      {chip}
                    </span>
                  )}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>);

}