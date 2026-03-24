import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";

export function LeadCaptureCTA() {
  return (
    <section className="relative px-6 py-20 md:py-28">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-surface/40 to-transparent" />

      <div className="container relative z-10 max-w-4xl text-center">
        <Reveal>
          <div className="space-y-5">
            <span className="mono-label text-blue">Start a Conversation</span>

            <h2 className="mt-3 text-3xl font-medium tracking-tight text-sand md:text-4xl">
              Discuss Your Thermal Vacuum Requirements
            </h2>

            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-gray">
              Whether you need a modular chamber platform, a custom TVAC configuration, or support for modernization and
              subsystem integration, Deepvac can help define the right system architecture for your application.
            </p>

            <div className="flex flex-wrap justify-center gap-4 pt-4">
              <Button asChild size="lg" className="font-mono text-xs tracking-wide">
                <Link to="/contact">Request a Quote</Link>
              </Button>

              <Button asChild variant="outline" size="lg" className="font-mono text-xs tracking-wide">
                <Link to="/contact">Talk to an Engineer</Link>
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
