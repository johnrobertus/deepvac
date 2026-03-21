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
      "Vacuum-tight rectangular stainless-steel thermal vacuum chambers for qualification and verification testing of space hardware under controlled high-vacuum and thermal conditions. The T Series combines a modular chamber architecture, integrated pumping hardware, and a thermal plate design for repeatable laboratory and aerospace test workflows.",
    image: tseriesImg,
    overlays: ["Front Door Access", "Thermal Plate", "Modular Pumping"],
    href: "/products/standard-series",
    cta: "View Platform",
    specs: [
      { label: "Volume Range", value: "65 to 2000 L" },
      { label: "Vacuum Level", value: "≤ 1 × 10^-6 mbar" },
      { label: "Thermal Control", value: "LN2, GN2 or mechanical" },
      { label: "Control System", value: "PLC + 7 in touchscreen" },
    ],
    note: "Depending on the selected thermal control concept, temperature ranges down to -180 °C and up to +150 °C are available.",
  },
  {
    id: "c-series",
    title: "C Series TVAC",
    subtitle: "Cylindrical Thermal Vacuum Chambers",
    description:
      "Hermetically sealed cylindrical stainless-steel thermal vacuum chambers designed for high-vacuum testing and controlled temperature operation. The C Series is suited for demanding qualification campaigns and can be configured with front-hinged door access or roll-out trolley loading for larger or heavier test articles.",
    image: cseriesImg,
    overlays: ["Hinged Door / Trolley", "Tech Ports", "Thermal Plate"],
    href: "/products/standard-series",
    cta: "View Platform",
    specs: [
      { label: "Volume Range", value: "65 to 2000 L" },
      { label: "Vacuum Level", value: "≤ 1 × 10^-6 mbar" },
      { label: "Access Type", value: "Door or roll-out trolley" },
      { label: "Control System", value: "PLC + 7 in touchscreen" },
    ],
    note: "Thermal control concepts include direct LN2, GN2 circulation, or mechanical refrigeration, depending on the required test profile and site infrastructure.",
  },
  {
    id: "custom",
    title: "Custom TVAC",
    subtitle: "Application-Specific Thermal Vacuum Systems",
    description:
      "Application-specific thermal vacuum systems engineered around mission-specific geometries, feedthrough layouts, thermal profiles, instrumentation concepts, and integration constraints. Custom configurations can extend the standard platform architecture with cryogenic shrouds, infrared heaters, dry pumping concepts, contamination-control options, and advanced automation interfaces.",
    image: customImg,
    overlays: ["Cryogenic Shrouds", "IR Heaters", "Custom Interfaces"],
    href: "/products/custom-tvac",
    cta: "Discuss Configuration",
    specs: [
      { label: "System Basis", value: "T / C platform or bespoke" },
      { label: "Vacuum Options", value: "Turbo, dry pumps, booster, traps" },
      { label: "Control & Data", value: "LAN, Modbus TCP, OPC UA" },
      { label: "Optional Features", value: "RGA, water cooling, QCM" },
    ],
    note: "Available options include bake-out wall heating, viewing windows, helium leak test preparation, remote monitoring, additional control zones, and contamination-sensitive configurations.",
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
            description="Standardised and custom-engineered thermal vacuum systems for qualification and verification testing of space hardware under controlled high-vacuum and thermal conditions."
            className="mb-14"
          />
        </Reveal>

        <div className="space-y-8">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={i * 100}>
              <div className="bento-card rounded-lg overflow-hidden group">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div
                    className={`relative overflow-hidden bg-[#0a0a0a] flex items-center justify-center ${
                      i % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={`Deepvac ${product.title}, ${product.subtitle}`}
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

                  <div
                    className={`p-8 lg:p-10 flex flex-col justify-center space-y-5 ${i % 2 === 1 ? "lg:order-1" : ""}`}
                  >
                    <div>
                      <span className="mono-label text-blue">{product.subtitle}</span>
                      <h3 className="text-2xl md:text-3xl font-medium text-sand mt-2 tracking-tight">
                        {product.title}
                      </h3>
                    </div>

                    <p className="text-sm text-gray leading-relaxed">{product.description}</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 py-2">
                      {product.specs.map((spec) => (
                        <div key={spec.label} className="rounded-md border border-gray/10 bg-background/20 px-4 py-3">
                          <span className="mono-label">{spec.label}</span>
                          <p className="font-mono text-xs text-sand mt-1">{spec.value}</p>
                        </div>
                      ))}
                    </div>

                    <p className="text-[11px] text-gray/70 leading-relaxed">{product.note}</p>

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
