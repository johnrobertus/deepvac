import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

export function LeadCaptureCTA() {
  return (
    <section className="py-20 md:py-28 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/40 to-transparent" />
      <div className="container max-w-4xl text-center space-y-8 relative z-10">
        <Reveal>
          <span className="mono-label text-blue">Start a Conversation</span>
          <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-sand mt-3">
            Discuss Your Thermal Vacuum Test Requirements
          </h2>
          <p className="text-sm text-gray max-w-2xl mx-auto leading-relaxed mt-4">
            Whether you need a modular chamber platform, a custom TVAC configuration, or support for modernisation and subsystem integration — DEEPVAC can help define the right system architecture for your application.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-6">
            <Button asChild size="lg" className="font-mono text-xs tracking-wide">
              <Link to="/contact">Request a Quote</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Talk to an Engineer</Link>
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
