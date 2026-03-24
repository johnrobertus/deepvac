import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import deepvacLogo from "@/assets/deepvac-logo.png";

const footerNav = {
  Products: [
    { label: "Standard Series", href: "/products/standard-series" },
    { label: "Custom TVAC", href: "/products/custom-tvac" },
    { label: "All Products", href: "/products" },
  ],
  Services: [
    { label: "Testing Services", href: "/services/testing-services" },
    { label: "Control Systems Design", href: "/services/control-systems-design" },
    { label: "Mechanical Design", href: "/services/mechanical-design" },
    { label: "Retrofit & Modernization", href: "/services/retrofit-modernization" },
    { label: "Maintenance & Repair", href: "/services/maintenance-repair" },
    { label: "Subsystem Integration", href: "/services/subsystem-integration" },
  ],
  Company: [
    { label: "Team", href: "/team" },
    { label: "Careers", href: "/careers" },
    { label: "References", href: "/references" },
    { label: "Resources", href: "/catalogues" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gray/10 bg-surface">
      <div className="container max-w-6xl px-6 py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.35fr_repeat(3,minmax(0,1fr))]">
          <div className="space-y-5">
            <Link to="/" className="inline-flex items-center" aria-label="Deepvac home">
              <img src={deepvacLogo} alt="Deepvac" className="h-6 w-auto" />
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-gray">
              Advanced thermal vacuum systems for aerospace qualification, space simulation, and environmental testing.
            </p>

            <div className="space-y-3 pt-1 text-sm text-gray">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
                <address className="not-italic leading-relaxed">
                  Deepvac GmbH
                  <br />
                  An der Universität 1
                  <br />
                  30823 Garbsen, Germany
                </address>
              </div>

              <a href="tel:+4915783027099" className="flex items-center gap-3 transition-colors hover:text-sand">
                <Phone className="h-4 w-4 shrink-0 text-blue" />
                <span>+49 157 830 270 99</span>
              </a>

              <a href="mailto:info@deepvac.space" className="flex items-center gap-3 transition-colors hover:text-sand">
                <Mail className="h-4 w-4 shrink-0 text-blue" />
                <span>info@deepvac.space</span>
              </a>
            </div>

            <div className="pt-1">
              <a
                href="https://www.linkedin.com/company/deepvac-gmbh/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-sm text-gray transition-colors hover:text-blue"
              >
                <span className="mono-label">LinkedIn</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>

          {Object.entries(footerNav).map(([section, links]) => (
            <nav key={section} aria-label={section}>
              <h4 className="mb-4 mono-label text-blue">{section}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm text-gray transition-colors duration-150 hover:text-sand">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-gray/10 px-6 py-5">
        <div className="container flex max-w-6xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-xs text-gray/50">
            © {new Date().getFullYear()} Deepvac GmbH. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link to="/imprint" className="text-xs text-gray/50 transition-colors hover:text-gray">
              Imprint
            </Link>
            <Link to="/terms-and-conditions" className="text-xs text-gray/50 transition-colors hover:text-gray">
              General Terms &amp; Conditions
            </Link>
            <Link to="/privacy-policy" className="text-xs text-gray/50 transition-colors hover:text-gray">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
