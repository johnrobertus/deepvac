import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

const productsMenu = [
  { label: "Standard Series", href: "/products/standard-series" },
  { label: "Custom TVAC", href: "/products/custom-tvac" },
];

const servicesMenu = [
  { label: "Testing Services", href: "/services/testing-services" },
  { label: "Control Systems Design", href: "/services/control-systems-design" },
  { label: "Mechanical Design", href: "/services/mechanical-design" },
  { label: "Retrofit & Modernisation", href: "/services/retrofit-modernisation" },
  { label: "Maintenance & Repair", href: "/services/maintenance-repair" },
  { label: "Subsystem Integration", href: "/services/subsystem-integration" },
];

const navLinks = [
  { label: "Team", href: "/team" },
  { label: "Catalogues", href: "/catalogues" },
  { label: "Careers", href: "/careers" },
  { label: "References", href: "/references" },
];

function DropdownMenu({
  label,
  items,
  open,
  onOpen,
  onClose,
}: {
  label: string;
  items: { label: string; href: string }[];
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose();
    }
    if (open) document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [open, onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={onOpen}
        className="flex items-center gap-1 text-sm text-gray hover:text-sand transition-colors duration-200"
      >
        {label}
        <ChevronDown className={cn("w-3 h-3 transition-transform duration-200", open && "rotate-180")} />
      </button>
      {open && (
        <div className="absolute top-full left-0 mt-3 min-w-[220px] bg-surface border border-gray/15 border-t-2 border-t-blue rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="py-2">
            {items.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                onClick={onClose}
                className="block px-4 py-2.5 text-sm text-gray hover:text-sand hover:bg-surface-raised transition-colors duration-150"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-gray/10">
      <div className="container max-w-6xl flex items-center justify-between h-16 px-6">
        {/* Logo */}
        <Link to="/" className="text-sand font-semibold text-lg tracking-tight">
          DEEPVAC
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-8">
          <Link to="/products" className="text-sm text-gray hover:text-sand transition-colors duration-200">
            Products
          </Link>
          <DropdownMenu
            label="Products"
            items={productsMenu}
            open={openDropdown === "products"}
            onOpen={() => setOpenDropdown(openDropdown === "products" ? null : "products")}
            onClose={() => setOpenDropdown(null)}
          />
          <DropdownMenu
            label="Services"
            items={servicesMenu}
            open={openDropdown === "services"}
            onOpen={() => setOpenDropdown(openDropdown === "services" ? null : "services")}
            onClose={() => setOpenDropdown(null)}
          />
          {navLinks.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="text-sm text-gray hover:text-sand transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button asChild size="sm" className="font-mono text-xs tracking-wide">
            <Link to="/contact">Request Technical Consultation</Link>
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          className="lg:hidden text-sand"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-surface border-t border-gray/10 animate-fade-in">
          <div className="container max-w-6xl px-6 py-6 space-y-6">
            {/* Products */}
            <MobileSection label="Products" items={productsMenu} />
            <MobileSection label="Services" items={servicesMenu} />
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="block text-sm text-gray hover:text-sand"
              >
                {link.label}
              </Link>
            ))}
            <div className="pt-4">
              <Button asChild size="sm" className="w-full font-mono text-xs">
                <Link to="/contact">Request Technical Consultation</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function MobileSection({
  label,
  items,
}: {
  label: string;
  items: { label: string; href: string }[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full text-sm text-gray hover:text-sand"
      >
        {label}
        <ChevronDown className={cn("w-3 h-3 transition-transform", open && "rotate-180")} />
      </button>
      {open && (
        <div className="pl-4 pt-2 space-y-2">
          {items.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className="block text-sm text-gray/70 hover:text-sand"
            >
              {item.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
