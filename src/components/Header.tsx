import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedPath } from "@/lib/routes";
import deepvacLogo from "@/assets/deepvac-logo.png";

type NavItem = {
  labelKey: string;
  href: string;
};

const productsMenu: NavItem[] = [
  { labelKey: "nav.overview", href: "/products" },
  { labelKey: "nav.standardSeries", href: "/products/standard-series" },
  { labelKey: "nav.customTvac", href: "/products/custom-tvac" },
];

const servicesMenu: NavItem[] = [
  { labelKey: "nav.overview", href: "/services" },
  { labelKey: "nav.testingServices", href: "/services/testing-services" },
  { labelKey: "nav.controlSystemsDesign", href: "/services/control-systems-design" },
  { labelKey: "nav.mechanicalDesign", href: "/services/mechanical-design" },
  { labelKey: "nav.retrofitModernization", href: "/services/retrofit-modernization" },
  { labelKey: "nav.maintenanceRepair", href: "/services/maintenance-repair" },
  { labelKey: "nav.subsystemIntegration", href: "/services/subsystem-integration" },
];

const navLinks: NavItem[] = [
  { labelKey: "nav.team", href: "/team" },
  { labelKey: "nav.resources", href: "/catalogs" },
  { labelKey: "nav.careers", href: "/careers" },
  { labelKey: "nav.references", href: "/references" },
];

function isActivePath(pathname: string, href: string, lang: "en" | "de") {
  const localized = localizedPath(href, lang);
  return pathname === localized || pathname.startsWith(`${localized}/`);
}

function DropdownMenu({
  label,
  baseHref,
  items,
  pathname,
  open,
  onToggle,
  onClose,
  lang,
  t,
}: {
  label: string;
  baseHref: string;
  items: NavItem[];
  pathname: string;
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  lang: "en" | "de";
  t: (key: string) => string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const active = isActivePath(pathname, baseHref, lang);

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
              const locHref = localizedPath(item.href, lang);
              const itemActive = isActivePath(pathname, item.href, lang);

              return (
                <Link
                  key={item.href}
                  to={locHref}
                  onClick={onClose}
                  className={cn(
                    "block px-4 py-2.5 text-sm transition-colors duration-150",
                    itemActive ? "bg-surface-raised text-sand" : "text-gray hover:bg-surface-raised hover:text-sand",
                    i === 0 && !itemActive && "font-medium text-sand",
                  )}
                >
                  {t(item.labelKey)}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

function MobileSection({ label, items, pathname, lang, t }: { label: string; items: NavItem[]; pathname: string; lang: "en" | "de"; t: (key: string) => string }) {
  const hasActiveChild = items.some((item) => isActivePath(pathname, item.href, lang));
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
            const locHref = localizedPath(item.href, lang);
            const active = isActivePath(pathname, item.href, lang);

            return (
              <Link
                key={item.href}
                to={locHref}
                className={cn("block text-sm transition-colors", active ? "text-sand" : "text-gray/70 hover:text-sand")}
              >
                {t(item.labelKey)}
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
  const { t } = useTranslation("common");
  const { lang, switchLanguage } = useLanguage();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<"products" | "services" | null>(null);

  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  const homePath = localizedPath("/", lang);
  const contactPath = localizedPath("/contact", lang);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-gray/10 bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-16 max-w-6xl items-center justify-between px-6">
        <Link to={homePath} className="flex items-center" aria-label="Deepvac home">
          <img src={deepvacLogo} alt="Deepvac" className="h-7 w-auto" />
        </Link>

        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary navigation">
          <DropdownMenu
            label={t("nav.products")}
            baseHref="/products"
            items={productsMenu}
            pathname={pathname}
            open={openDropdown === "products"}
            onToggle={() => setOpenDropdown((prev) => (prev === "products" ? null : "products"))}
            onClose={() => setOpenDropdown(null)}
            lang={lang}
            t={t}
          />

          <DropdownMenu
            label={t("nav.services")}
            baseHref="/services"
            items={servicesMenu}
            pathname={pathname}
            open={openDropdown === "services"}
            onToggle={() => setOpenDropdown((prev) => (prev === "services" ? null : "services"))}
            onClose={() => setOpenDropdown(null)}
            lang={lang}
            t={t}
          />

          {navLinks.map((link) => {
            const active = isActivePath(pathname, link.href, lang);
            const locHref = localizedPath(link.href, lang);

            return (
              <Link
                key={link.href}
                to={locHref}
                className={cn(
                  "text-sm transition-colors duration-200",
                  active ? "text-sand" : "text-gray hover:text-sand",
                )}
              >
                {t(link.labelKey)}
              </Link>
            );
          })}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          {/* Language switcher */}
          <div className="flex items-center gap-2">
            <button
              onClick={lang === "en" ? undefined : switchLanguage}
              className={cn("rounded-sm transition-opacity", lang === "en" ? "opacity-100" : "opacity-40 hover:opacity-80")}
              aria-label="English"
            >
              <svg viewBox="0 0 60 30" className="h-4 w-6 rounded-[2px]" xmlns="http://www.w3.org/2000/svg">
                <clipPath id="a"><rect width="60" height="30"/></clipPath>
                <g clipPath="url(#a)">
                  <rect width="60" height="30" fill="#012169"/>
                  <path d="M0 0L60 30M60 0L0 30" stroke="#fff" strokeWidth="6"/>
                  <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="4" clipPath="url(#a)"/>
                  <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
                  <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
                </g>
              </svg>
            </button>
            <span className="text-gray/30 text-xs">|</span>
            <button
              onClick={lang === "de" ? undefined : switchLanguage}
              className={cn("rounded-sm transition-opacity", lang === "de" ? "opacity-100" : "opacity-40 hover:opacity-80")}
              aria-label="Deutsch"
            >
              <svg viewBox="0 0 5 3" className="h-4 w-6 rounded-[2px]" xmlns="http://www.w3.org/2000/svg">
                <rect width="5" height="1" y="0" fill="#000"/>
                <rect width="5" height="1" y="1" fill="#D00"/>
                <rect width="5" height="1" y="2" fill="#FFCE00"/>
              </svg>
            </button>
          </div>

          <Button asChild size="sm" className="font-mono text-xs tracking-wide">
            <Link to={contactPath}>{t("nav.talkToEngineer")}</Link>
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
            <MobileSection label={t("nav.products")} items={productsMenu} pathname={pathname} lang={lang} t={t} />
            <MobileSection label={t("nav.services")} items={servicesMenu} pathname={pathname} lang={lang} t={t} />

            <div className="space-y-4">
              {navLinks.map((link) => {
                const active = isActivePath(pathname, link.href, lang);
                const locHref = localizedPath(link.href, lang);

                return (
                  <Link
                    key={link.href}
                    to={locHref}
                    className={cn(
                      "block text-sm transition-colors",
                      active ? "text-sand" : "text-gray hover:text-sand",
                    )}
                  >
                    {t(link.labelKey)}
                  </Link>
                );
              })}
            </div>

            {/* Mobile language switcher */}
            <div className="flex items-center gap-3 border-t border-gray/10 pt-4">
              <button
                onClick={lang === "en" ? undefined : switchLanguage}
                className={cn("rounded-sm transition-opacity", lang === "en" ? "opacity-100" : "opacity-40 hover:opacity-80")}
                aria-label="English"
              >
                <svg viewBox="0 0 60 30" className="h-5 w-7 rounded-[2px]" xmlns="http://www.w3.org/2000/svg">
                  <clipPath id="mob-a"><rect width="60" height="30"/></clipPath>
                  <g clipPath="url(#mob-a)">
                    <rect width="60" height="30" fill="#012169"/>
                    <path d="M0 0L60 30M60 0L0 30" stroke="#fff" strokeWidth="6"/>
                    <path d="M0 0L60 30M60 0L0 30" stroke="#C8102E" strokeWidth="4"/>
                    <path d="M30 0v30M0 15h60" stroke="#fff" strokeWidth="10"/>
                    <path d="M30 0v30M0 15h60" stroke="#C8102E" strokeWidth="6"/>
                  </g>
                </svg>
              </button>
              <button
                onClick={lang === "de" ? undefined : switchLanguage}
                className={cn("rounded-sm transition-opacity", lang === "de" ? "opacity-100" : "opacity-40 hover:opacity-80")}
                aria-label="Deutsch"
              >
                <svg viewBox="0 0 5 3" className="h-5 w-7 rounded-[2px]" xmlns="http://www.w3.org/2000/svg">
                  <rect width="5" height="1" y="0" fill="#000"/>
                  <rect width="5" height="1" y="1" fill="#D00"/>
                  <rect width="5" height="1" y="2" fill="#FFCE00"/>
                </svg>
              </button>
            </div>

            <div className="pt-2">
              <Button asChild size="sm" className="w-full font-mono text-xs tracking-wide">
                <Link to={contactPath}>{t("nav.talkToEngineer")}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
