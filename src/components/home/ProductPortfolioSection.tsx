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
      "Cubic thermal vacuum chambers for qualification, validation, and environmental simulation of aerospace hardware. The T Series provides a standardized chamber platform for controlled thermal vacuum testing across research, institutional, and commercial space applications.",
    image: tseriesImg,
    overlays: ["Cubic Geometry", "Standard Series", "Thermal Vacuum Testing"],
    href: "/products/standard-series",
    cta: "View Platform",
    specs: [
      { label: "Geometry", value: "Cubic" },
      { label: "Volume Range", value: "65 to 2000 L" },
      { label: "Ultimate Pressure", value: "≤ 1 × 10⁻⁶ mbar" },
      { label: "Temperature Range", value: "-190 °C to +150 °C*" },
    ],
    note: "*Depending on the selected thermal concept, including direct LN₂ cooling, GN₂ circulation, or mechanical refrigeration.",
  },
  {
    id: "c-series",
    title: "C Series TVAC",
    subtitle: "Cylindrical Thermal Vacuum Chambers",
    description:
      "Cylindrical thermal vacuum chambers for qualification, validation, and environmental simulation of aerospace hardware. The C Series provides a standardized chamber platform for controlled thermal vacuum testing across research, institutional, and commercial space applications.",
    image: cseriesImg,
    overlays: ["Cylindrical Geometry", "Standard Series", "Thermal Vacuum Testing"],
    href: "/products/standard-series",
    cta: "View Platform",
    specs: [
      { label: "Geometry", value: "Cylindrical" },
      { label: "Volume Range", value: "65 to 2000 L" },
      { label: "Ultimate Pressure", value: "≤ 1 × 10⁻⁶ mbar" },
      { label: "Temperature Range", value: "-190 °C to +150 °C*" },
    ],
    note: "*Depending on the selected thermal concept, including direct LN₂ cooling, GN₂ circulation, or mechanical refrigeration.",
  },
  {
    id: "custom",
    title: "Custom TVAC",
    subtitle: "Application-Specific Thermal Vacuum Systems",
    description:
      "Custom thermal vacuum systems for applications beyond the standard series. These systems are developed for non-standard geometries, specific chamber volumes, extended temperature requirements, and additional subsystems tailored to dedicated test and qualification tasks.",
    image: customImg,
    overlays: ["Beyond Standard Series", "Custom Geometry", "Special TVAC Systems"],
    href: "/products/custom-tvac",
    cta: "Discuss Configuration",
    specs: [
      { label: "Design Scope", value: "Outside standard series" },
      { label: "Volume", value: "Extended beyond standard range" },
      { label: "Temperature", value: "Extended beyond standard range" },
      { label: "System Features", value: "Project-specific subsystems" },
    ],
    note: "Custom systems can include dedicated interfaces, cryogenic shrouds, infrared heating, additional diagnostics, and other application-specific system extensions.",
  },
];

export function ProductPortfolioSection() {
  return (
    <section className="bg-surface/30 px-6 py-20 md:py-28">
      <div className="container max-w-6xl">
        <Reveal>
          <SectionHeader
            eyebrow="Product Portfolio"
            title="Chamber Platforms"
            description="Standardized and custom-engineered thermal vacuum systems for qualification and verification testing of aerospace hardware under controlled high-vacuum and thermal conditions."
            className="mb-14"
          />
        </Reveal>

        <div className="space-y-8">
          {products.map((product, i) => (
            <Reveal key={product.id} delay={i * 100}>
              <div className="bento-card group overflow-hidden rounded-lg">
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div
                    className={`relative flex items-center justify-center overflow-hidden bg-[#0a0a0a] ${
                      i % 2 === 1 ? "lg:order-2" : ""
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={`${product.title}, ${product.subtitle}`}
                      className="h-full max-h-[400px] w-full object-contain p-4 transition-transform duration-500 group-hover:scale-[1.02] lg:max-h-[420px]"
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
                    className={`flex flex-col justify-center space-y-5 p-8 lg:p-10 ${i % 2 === 1 ? "lg:order-1" : ""}`}
                  >
                    <div>
                      <span className="mono-label text-blue">{product.subtitle}</span>
                      <h3 className="mt-2 text-2xl font-medium tracking-tight text-sand md:text-3xl">
                        {product.title}
                      </h3>
                    </div>

                    <p className="text-sm leading-relaxed text-gray">{product.description}</p>

                    <div className="grid grid-cols-1 gap-4 py-2 sm:grid-cols-2">
                      {product.specs.map((spec) => (
                        <div key={spec.label} className="rounded-md border border-gray/10 bg-background/20 px-4 py-3">
                          <span className="mono-label">{spec.label}</span>
                          <p className="mt-1 font-mono text-xs text-sand">{spec.value}</p>
                        </div>
                      ))}
                    </div>

                    <p className="text-[11px] leading-relaxed text-gray/70">{product.note}</p>

                    <div>
                      <Button asChild variant="outline" className="group/btn">
                        <Link to={product.href}>
                          {product.cta}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover/btn:translate-x-1" />
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
