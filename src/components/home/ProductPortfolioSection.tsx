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
      "Cubic thermal vacuum chambers for qualification, validation, and environmental simulation of aerospace hardware. The T Series provides a standardised chamber platform for controlled thermal vacuum testing across research, institutional, and commercial space applications.",
    image: tseriesImg,
    overlays: ["Cubic Geometry", "Standard Series", "Thermal Vacuum Testing"],
    href: "/products/standard-series",
    cta: "View Platform",
    specs: [
      { label: "Geometry", value: "Cubic" },
      { label: "Volume Range", value: "65 to 2000 L" },
      { label: "Vacuum Level", value: "up to ≤ 1 × 10^-6 mbar" },
      { label: "Temperature Range", value: "up to -190 °C to +150 °C*" },
    ],
    note: "*Depending on the selected thermal concept, including direct LN₂ cooling, GN₂ circulation, or mechanical refrigeration.",
  },
  {
    id: "c-series",
    title: "C Series TVAC",
    subtitle: "Cylindrical Thermal Vacuum Chambers",
    description:
      "Cylindrical thermal vacuum chambers for qualification, validation, and environmental simulation of aerospace hardware. The C Series provides a standardised chamber platform for controlled thermal vacuum testing across research, institutional, and commercial space applications.",
    image: cseriesImg,
    overlays: ["Cylindrical Geometry", "Standard Series", "Thermal Vacuum Testing"],
    href: "/products/standard-series",
    cta: "View Platform",
    specs: [
      { label: "Geometry", value: "Cylindrical" },
      { label: "Volume Range", value: "65 to 2000 L" },
      { label: "Vacuum Level", value: "up to ≤ 1 × 10^-6 mbar" },
      { label: "Temperature Range", value: "up to -190 °C to +150 °C*" },
    ],
    note: "*Depending on the selected thermal concept, including direct LN₂ cooling, GN₂ circulation, or mechanical refrigeration.",
  },
  {
    id: "custom",
    title: "Custom TVAC",
    subtitle: "Application-Specific Thermal Vacuum Systems",
    description:
      "Custom thermal vacuum systems for applications that fall outside the standard T and C series. These systems are developed for non-standard geometries, specific chamber volumes, temperature requirements additional subsystems tailored to specific test and qualification tasks.",
    image: customImg,
    overlays: ["Beyond Standard Series", "Custom Geometry", "Special TVAC Systems"],
    href: "/products/custom-tvac",
    cta: "Discuss Configuration",
    specs: [
      { label: "Design Scope", value: "Outside standard T and C series" },
      { label: "Volume", value: "Extended beyond standard range" },
      { label: "Temperature", value: "Extended beyond standard range" },
      { label: "System Features", value: "Project-specific subsystems" },
    ],
    note: "Custom systems can include dedicated interfaces, cryogenic shrouds, infrared heating, additional diagnostics, or other application-specific system extensions.",
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
