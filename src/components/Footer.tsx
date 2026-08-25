import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Phone, Mail, MapPin, ArrowUpRight, ClipboardList } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedPath } from "@/lib/routes";
import { PrivacySettingsDialog } from "@/components/PrivacySettingsDialog";
import { Button } from "@/components/ui/button";
import deepvacLogo from "@/assets/deepvac-logo.png";
import itvLogo from "@/assets/itv-logo.png";
import luhLogo from "@/assets/luh-logo-light.svg";

export function Footer() {
  const { t } = useTranslation("common");
  const { lang } = useLanguage();
  const lp = (path: string) => localizedPath(path, lang);
  const [privacyOpen, setPrivacyOpen] = useState(false);

  const footerNav = {
    [t("nav.products")]: [
      { label: t("nav.standardSeries"), href: lp("/products/standard-series") },
      { label: t("nav.customTvac"), href: lp("/products/custom-tvac") },
      { label: t("footer.allProducts"), href: lp("/products") },
    ],
    [t("nav.services")]: [
      { label: t("nav.testingServices"), href: lp("/services/testing-services") },
      { label: t("nav.controlSystemsDesign"), href: lp("/services/control-systems-design") },
      { label: t("nav.mechanicalDesign"), href: lp("/services/mechanical-design") },
      { label: t("nav.retrofitModernization"), href: lp("/services/retrofit-modernization") },
      { label: t("nav.maintenanceRepair"), href: lp("/services/maintenance-repair") },
      { label: t("nav.subsystemIntegration"), href: lp("/services/subsystem-integration") },
    ],
    [t("footer.company")]: [
      { label: t("nav.team"), href: lp("/team") },
      { label: t("nav.careers"), href: lp("/careers") },
      { label: t("nav.references"), href: lp("/references") },
      { label: t("nav.resources"), href: lp("/resources") },
      { label: t("footer.technicalQuestionnaire"), href: lp("/tvac-questionnaire") },
      { label: t("footer.contact"), href: lp("/contact") },
    ],
  };

  return (
    <footer className="border-t border-gray/10 bg-surface">
      <section
        aria-label={t("footer.ctaTitle")}
        className="border-b border-gray/10 bg-gradient-to-b from-background/40 via-surface to-surface"
      >
        <div className="container-wide py-12 md:py-16">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl space-y-3">
              <span className="mono-label text-blue">{t("footer.ctaEyebrow")}</span>
              <h2 className="text-2xl font-medium tracking-tight text-sand md:text-3xl [text-wrap:balance]">
                {t("footer.ctaTitle")}
              </h2>
              <p className="text-base leading-relaxed text-sand/80 md:text-[17px]">
                {t("footer.ctaDescription")}
              </p>
            </div>
            <div className="md:shrink-0">
              <Button asChild size="lg" className="font-mono text-xs tracking-wide">
                <Link to={lp("/tvac-questionnaire")}>
                  <ClipboardList className="mr-2 h-4 w-4" aria-hidden="true" />
                  {t("footer.ctaSecondary")}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.35fr_repeat(3,minmax(0,1fr))]">
          <div className="space-y-5">
            <Link to={lp("/")} className="inline-flex items-center" aria-label="Deepvac home">
              <img src={deepvacLogo} alt="Deepvac" className="h-6 w-auto" />
            </Link>

            <p className="max-w-sm text-[15px] leading-relaxed text-gray">{t("footer.description")}</p>

            <div className="space-y-3 pt-1 text-[15px] text-gray">
              <div className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
                <address className="not-italic leading-relaxed">
                  An der Universität 1
                  <br />
                  30823 Garbsen
                  <br />
                  Germany
                </address>
              </div>

              <a href="tel:+4915783027099" className="group flex items-center gap-3 transition-colors duration-300 hover:text-sand">
                <Phone className="h-4 w-4 shrink-0 text-blue transition-colors duration-300 group-hover:text-blue-light" />
                <span>+49 157 830 270 99</span>
              </a>

              <a href="mailto:info@deepvac.space" className="group flex items-center gap-3 transition-colors duration-300 hover:text-sand">
                <Mail className="h-4 w-4 shrink-0 text-blue transition-colors duration-300 group-hover:text-blue-light" />
                <span>info@deepvac.space</span>
              </a>
            </div>

            <div className="pt-1">
              <a
                href="https://www.linkedin.com/company/deepvac-gmbh/"
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-[15px] text-gray transition-colors duration-300 hover:text-blue"
              >
                <span className="mono-label transition-colors duration-300 group-hover:text-blue">LinkedIn</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <div className="space-y-3 border-t border-gray/15 pt-4">
              <span className="mono-label text-[10.5px] uppercase tracking-[0.18em] text-gray">
                {t("footer.spinoffLabel")}
              </span>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <a
                  href="https://www.itv.uni-hannover.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Institut für Technische Verbrennung, Leibniz Universität Hannover"
                  className="opacity-88 transition-opacity duration-200 hover:opacity-100"
                >
                  <img
                    src={itvLogo}
                    alt="Institut für Technische Verbrennung"
                    className="h-8 w-auto sm:h-10"
                    style={{ filter: "brightness(0) invert(1)" }}
                  />
                </a>
                <span className="hidden h-6 w-px bg-white/18 sm:block" aria-hidden="true" />
                <a
                  href="https://www.uni-hannover.de/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Leibniz Universität Hannover"
                  className="opacity-88 transition-opacity duration-200 hover:opacity-100"
                >
                  <img
                    src={luhLogo}
                    alt="Leibniz Universität Hannover"
                    className="h-7 w-auto sm:h-9"
                  />
                </a>
              </div>
            </div>
          </div>

          {Object.entries(footerNav).map(([section, links]) => (
            <nav key={section} aria-label={section}>
              <h4 className="mb-4 mono-label text-blue">{section}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="link-underline inline-block text-[15px] text-gray hover:text-sand">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
      </div>

      <div className="border-t border-gray/15 py-5">
        <div className="container-wide flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="font-mono text-[13px] text-gray">{t("footer.copyright", { year: new Date().getFullYear() })}</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link to={lp("/imprint")} className="text-[15px] text-gray transition-colors hover:text-sand">
              {t("footer.imprint")}
            </Link>
            <Link to={lp("/terms-and-conditions")} className="text-[15px] text-gray transition-colors hover:text-sand">
              {t("footer.termsAndConditions")}
            </Link>
            <Link to={lp("/privacy-policy")} className="text-[15px] text-gray transition-colors hover:text-sand">
              {t("footer.privacyPolicy")}
            </Link>
            <Link to={lp("/media-credits")} className="text-[15px] text-gray transition-colors hover:text-sand">
              {t("mediaCredits.footerLink")}
            </Link>
            <button
              onClick={() => setPrivacyOpen(true)}
              className="text-[15px] text-gray transition-colors hover:text-sand"
            >
              {t("footer.privacySettings")}
            </button>
          </div>
        </div>
      </div>

      <PrivacySettingsDialog open={privacyOpen} onOpenChange={setPrivacyOpen} />
    </footer>
  );
}
