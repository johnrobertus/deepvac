import { Link } from "react-router-dom";

const footerNav = {
  Products: [
    { label: "Standard Series", href: "/products/standard-series" },
    { label: "Custom TVAC", href: "/products/custom-tvac" },
  ],
  Services: [
    { label: "Testing Services", href: "/services/testing-services" },
    { label: "Control Systems Design", href: "/services/control-systems-design" },
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
            <span className="text-sand font-semibold text-lg tracking-tight">
              DEEPVAC
            </span>
            <p className="text-sm text-gray leading-relaxed">
              Precision Vacuum Engineering.
              <br />
              Made in Germany.
            </p>
            <div className="pt-2">
              <a
                href="https://linkedin.com"
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
                    <Link
                      to={link.href}
                      className="text-sm text-gray hover:text-sand transition-colors duration-150"
                    >
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
            © {new Date().getFullYear()} DEEPVAC GmbH. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            <Link to="/imprint" className="text-xs text-gray/50 hover:text-gray transition-colors">
              Imprint
            </Link>
            <Link to="/terms" className="text-xs text-gray/50 hover:text-gray transition-colors">
              General Terms & Conditions
            </Link>
            <Link to="/privacy" className="text-xs text-gray/50 hover:text-gray transition-colors">
              Privacy Policy
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <span className="font-mono text-[10px] text-gray/40 uppercase tracking-widest">
              System Status: Nominal
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
