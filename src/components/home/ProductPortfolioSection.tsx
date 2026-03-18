import { Link } from "react-router-dom";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/Reveal";
import { ArrowRight } from "lucide-react";
import tseriesImg from "@/assets/tseries-chamber.png";
import cseriesImg from "@/assets/cseries-chamber.jpg";
import customImg from "@/assets/custom-chamber.jpg";

const products = [
  {
    id: "t-series",
    title: "T Series TVAC",
    subtitle: "Cubic Thermal Vacuum Chambers",
    description:
      "Compact cubic thermal vacuum chamber platforms designed for repeatable environmental simulation, subsystem validation, and research workflows where modularity, accessibility, and controlled test conditions are critical.",
    image: tseriesImg,
    overlays: ["Shroud", "Feedthroughs", "Control Cabinet"],
    href: "/products/standard-series",
    cta: "View Platform",
  },
  {
    id: "c-series",
    title: "C Series TVAC",
    subtitle: "Cylindrical Thermal Vacuum Chambers",
    description:
      "Cylindrical thermal vacuum systems engineered for robust chamber performance, scalable integration, and demanding test campaigns involving aerospace components and qualification-sensitive hardware.",
    image: cseriesImg,
    overlays: ["Pumping Train", "Thermal Shroud", "Instrumentation"],
    href: "/products/standard-series",
    cta: "View Platform",
  },
  {
    id: "custom",
    title: "Custom TVAC",
    subtitle: "Application-Specific Thermal Vacuum Systems",
    description:
      "Tailor-made thermal vacuum systems configured around mission-specific geometries, feedthrough requirements, thermal profiles, instrumentation needs, and integration constraints.",
    image: customImg,
    overlays: ["Custom Geometry", "Interface Design", "System Integration"],
    href: "/products/custom-tvac",
    cta: "Discuss Configuration",
  },
];

export function ProductPortfolioSection() {
  return (
    <section className="py-20 md:py-28 px-6 bg-surface/30">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Product Portfolio"
            title="Chamber Platforms"
            description="Standardised and custom-engineered thermal vacuum systems for aerospace qualification, research, and environmental simulation."
            className="mb-14"
          />
        </Reveal>

        <div className="space-y-8">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={i * 100}>
              <div className="bento-card rounded-lg overflow-hidden group">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  {/* Image */}
                  <div className={`relative overflow-hidden bg-[#0a0a0a] flex items-center justify-center ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <img
                      src={product.image}
                      alt={`Deepvac ${product.title} — ${product.subtitle}`}
                      className="w-full h-full object-contain max-h-[400px] lg:max-h-[420px] p-4 transition-transform duration-500 group-hover:scale-[1.02]"
                      loading="lazy"
                    />
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
                      {product.overlays.map((label) => (
                        <span
                          key={label}
                          className="glass-overlay rounded-sm px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-blue-light/80"
                        >
                          {label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div className={`p-8 lg:p-10 flex flex-col justify-center space-y-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <div>
                      <span className="mono-label text-blue">{product.subtitle}</span>
                      <h3 className="text-2xl md:text-3xl font-medium text-sand mt-2 tracking-tight">
                        {product.title}
                      </h3>
                    </div>
                    <p className="text-sm text-gray leading-relaxed">{product.description}</p>

                    <div className="flex flex-wrap gap-3 py-2">
                      <div className="space-y-0.5">
                        <span className="mono-label">Chamber Type</span>
                        <p className="font-mono text-xs text-sand">{product.subtitle.split(" ")[0]}</p>
                      </div>
                      <div className="w-px bg-gray/15" />
                      <div className="space-y-0.5">
                        <span className="mono-label">Configuration</span>
                        <p className="font-mono text-xs text-sand">
                          {product.id === "custom" ? "Bespoke" : "Standard"}
                        </p>
                      </div>
                      <div className="w-px bg-gray/15" />
                      <div className="space-y-0.5">
                        <span className="mono-label">Integration</span>
                        <p className="font-mono text-xs text-sand">Full System</p>
                      </div>
                    </div>

                    <div>
                      <Button asChild variant="outline" className="group/btn">
                        <Link to={product.href}>
                          {product.cta}
                          <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
