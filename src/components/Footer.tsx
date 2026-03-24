import { Link } from "react-router-dom";
import { Phone, Mail, MapPin } from "lucide-react";
import deepvacLogo from "@/assets/deepvac-logo.png";

const footerNav = {
  Products: [
    { label: "Standard Series", href: "/products/standard-series" },
    { label: "Custom TVAC", href: "/products/custom-tvac" },
    { label: "All Products", href: "/products" },
  ],
  Services: [
    { label: "Testing Services", href: "/services/testing-services" },
    { label: "Control Systems", href: "/services/control-systems-design" },
    { label: "Mechanical Design", href: "/services/mechanical-design" },
    { label: "Retrofit & Modernisation", href: "/services/retrofit-modernisation" },
    { label: "Maintenance & Repair", href: "/services/maintenance-repair" },
    { label: "Subsystem Integration", href: "/services/subsystem-integration" },
  ],
  Company: [
    { label: "Team", href: "/team" },
    { label: "Careers", href: "/careers" },
    { label: "References", href: "/references" },
    { label: "Catalogues", href: "/catalogues" },
    { label: "Contact", href: "/contact" },
  ],
};

export function Footer() {
  return (
    <footer className="border-t border-gray/10 bg-surface">
      <div className="container max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/">
              <img src={deepvacLogo} alt="Deepvac" className="h-6 w-auto" />
            </Link>
            <p className="text-sm text-gray leading-relaxed">
              Data-driven thermal vacuum chamber systems for aerospace qualification, space simulation, and
              environmental testing.
            </p>
            <div className="space-y-2 pt-2 text-xs text-gray">
              <div className="flex items-start gap-2">
                <MapPin className="w-3 h-3 text-blue mt-0.5 shrink-0" />
                <span>Deepvac GmbH · An der Universität 1 · 30823 Garbsen, Germany</span>
              </div>
              <a href="tel:+4915783027099" className="flex items-center gap-2 hover:text-sand transition-colors">
                <Phone className="w-3 h-3 text-blue" /> +49 157 830 270 99
              </a>
              <a href="mailto:info@deepvac.space" className="flex items-center gap-2 hover:text-sand transition-colors">
                <Mail className="w-3 h-3 text-blue" /> info@deepvac.space
              </a>
            </div>
            <div className="pt-1">
              <a
                href="https://www.linkedin.com/company/deepvac-gmbh/"
                target="_blank"
                rel="noopener noreferrer"
                className="mono-label text-gray hover:text-blue transition-colors"
              >
                LinkedIn →
              </a>
            </div>
          </div>

          {/* Nav Clusters */}
          {Object.entries(footerNav).map(([section, links]) => (
            <div key={section}>
              <h4 className="mono-label text-blue mb-4">{section}</h4>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm text-gray hover:text-sand transition-colors duration-150">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray/10 py-5 px-6">
        <div className="container max-w-6xl flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray/50 font-mono">
            © {new Date().getFullYear()} Deepvac GmbH. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/imprint" className="text-xs text-gray/50 hover:text-gray transition-colors">
              Imprint
            </Link>
            <Link to="/terms-and-conditions" className="text-xs text-gray/50 hover:text-gray transition-colors">
              General Terms &amp; Conditions
            </Link>
            <Link to="/privacy-policy" className="text-xs text-gray/50 hover:text-gray transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
