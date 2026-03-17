import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function LeadCaptureCTA() {
  return (
    <section className="py-20 md:py-28 px-6">
      <div className="container max-w-4xl text-center space-y-8">
        <span className="mono-label text-blue">Get Started</span>
        <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-sand">
          Discuss Your Thermal Vacuum Test Requirements
        </h2>
        <p className="text-sm text-gray max-w-2xl mx-auto leading-relaxed">
          Whether you need a modular chamber platform, a custom TVAC configuration, or support for modernization and subsystem integration, DEEPVAC can help define the right system architecture for your application.
        </p>
        <div className="flex flex-wrap justify-center gap-4 pt-4">
          <Button asChild size="lg" className="font-mono text-xs tracking-wide">
            <Link to="/contact">Request a Quote</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link to="/contact">Talk to an Engineer</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
