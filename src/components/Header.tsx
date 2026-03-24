import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import deepvacLogo from "@/assets/deepvac-logo.png";

type NavItem = {
  label: string;
  href: string;
};

const productsMenu: NavItem[] = [
  { label: "Overview", href: "/products" },
  { label: "Standard Series", href: "/products/standard-series" },
  { label: "Custom TVAC", href: "/products/custom-tvac" },
  { label: "Twin-QCM Outgassing Analysis", href: "/products/twin-qcm" },
];

const servicesMenu: NavItem[] = [
  { label: "Overview", href: "/services" },
  { label: "Testing Services", href: "/services/testing-services" },
  { label: "Control Systems Design", href: "/services/control-systems-design" },
  { label: "Mechanical Design", href: "/services/mechanical-design" },
  { label: "Retrofit & Modernization", href: "/services/retrofit-modernization" },
  { label: "Maintenance & Repair", href: "/services/maintenance-repair" },
  { label: "Subsystem Integration", href: "/services/subsystem-integration" },
];

const navLinks: NavItem[] = [
  { label: "Team", href: "/team" },
  { label: "Resources", href: "/resources" },
  { label: "Careers", href: "/careers" },
  { label: "References", href: "/references" },
];

function isActivePath(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

function DropdownMenu({
  label,
  baseHref,
  items,
  pathname,
  open,
  onToggle,
  onClose,
}: {
  label: string;
  baseHref: string;
  items: NavItem[];
  pathname: string;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const active = isActivePath(pathname, baseHref);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        onClose();
      }
    }

    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        aria-haspopup="menu"
        className={cn(
          "flex items-center gap-1 text-sm transition-colors duration-200",
          active || open ? "text-sand" : "text-gray hover:text-sand",
        )}
      >
        <span>{label}</span>
        <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-50 mt-3 min-w-[240px] overflow-hidden rounded-lg border border-gray/15 border-t-2 border-t-blue bg-surface shadow-lg animate-fade-in">
          <div className="py-2">
            {items.map((item, i) => {
              const itemActive = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onClose}
                  className={cn(
                    "block px-4 py-2.5 text-sm transition-colors duration-150",
                    itemActive ? "bg-surface-raised text-sand" : "text-gray hover:bg-surface-raised hover:text-sand",
                    i === 0 && !itemActive && "font-medium text-sand",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileSection({ label, items, pathname }: { label: string; items: NavItem[]; pathname: string }) {
  const hasActiveChild = items.some((item) => isActivePath(pathname, item.href));
  const [open, setOpen] = useState(hasActiveChild);

  useEffect(() => {
    setOpen(hasActiveChild);
  }, [hasActiveChild]);

  return (
    <div className="border-b border-gray/10 pb-4 last:border-b-0 last:pb-0">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className={cn(
          "flex w-full items-center justify-between text-sm transition-colors",
          hasActiveChild ? "text-sand" : "text-gray hover:text-sand",
        )}
      >
        <span>{label}</span>
        <ChevronDown className={cn("h-3 w-3 transition-transform duration-200", open && "rotate-180")} />
      </button>

      {open && (
        <div className="space-y-2 pl-4 pt-3">
          {items.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                to={item.href}
                className={cn("block text-sm transition-colors", active ? "text-sand" : "text-gray/70 hover:text-sand")}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function Header() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"products" | "services" | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray/10 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to="/" className="flex items-center" aria-label="Deepvac home">
          <img src={deepvacLogo} alt="Deepvac" className="h-7 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          <DropdownMenu
            label="Products"
            baseHref="/products"
            items={productsMenu}
            pathname={pathname}
            open={openDropdown === "products"}
            onToggle={() => setOpenDropdown((prev) => (prev === "products" ? null : "products"))}
            onClose={() => setOpenDropdown(null)}
          />

          <DropdownMenu
            label="Services"
            baseHref="/services"
            items={servicesMenu}
            pathname={pathname}
            open={openDropdown === "services"}
            onToggle={() => setOpenDropdown((prev) => (prev === "services" ? null : "services"))}
            onClose={() => setOpenDropdown(null)}
          />

          {navLinks.map((link) => {
            const active = isActivePath(pathname, link.href);

            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "text-sm transition-colors duration-200",
                  active ? "text-sand" : "text-gray hover:text-sand",
                )}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="hidden lg:block">
          <Button asChild size="sm" className="font-mono text-xs tracking-wide">
            <Link to="/contact">Talk to an Engineer</Link>
          </Button>
        </div>

        <button
          type="button"
          className="text-sand lg:hidden"
          onClick={() => setMobileOpen((prev) => !prev)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Close navigation" : "Open navigation"}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {mobileOpen && (
        <div className="border-t border-gray/10 bg-surface lg:hidden animate-fade-in">
          <div className="container max-w-6xl space-y-6 px-6 py-6">
            <MobileSection label="Products" items={productsMenu} pathname={pathname} />
            <MobileSection label="Services" items={servicesMenu} pathname={pathname} />

            <div className="space-y-4">
              {navLinks.map((link) => {
                const active = isActivePath(pathname, link.href);

                return (
                  <Link
                    key={link.href}
                    to={link.href}
                    className={cn(
                      "block text-sm transition-colors",
                      active ? "text-sand" : "text-gray hover:text-sand",
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>

            <div className="pt-2">
              <Button asChild size="sm" className="w-full font-mono text-xs tracking-wide">
                <Link to="/contact">Talk to an Engineer</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
