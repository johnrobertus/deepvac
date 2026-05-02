import { useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Phone, Mail, MapPin, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedPath } from "@/lib/routes";
import { PrivacySettingsDialog } from "@/components/PrivacySettingsDialog";
import deepvacLogo from "@/assets/deepvac-logo.png";

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
      <div className="container-wide py-16 md:py-20">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-[1.35fr_repeat(3,minmax(0,1fr))]">
          <div className="space-y-5">
            <Link to={lp("/")} className="inline-flex items-center" aria-label="Deepvac home">
              <img src={deepvacLogo} alt="Deepvac" className="h-6 w-auto" />
            </Link>

            <p className="max-w-sm text-sm leading-relaxed text-gray/90">{t("footer.description")}</p>

            <div className="space-y-3 pt-1 text-sm text-gray">
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
                className="group inline-flex items-center gap-1.5 text-sm text-gray transition-colors duration-300 hover:text-blue"
              >
                <span className="mono-label transition-colors duration-300 group-hover:text-blue">LinkedIn</span>
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>
          </div>

          {Object.entries(footerNav).map(([section, links]) => (
            <nav key={section} aria-label={section}>
              <h4 className="mb-4 mono-label text-blue">{section}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="link-underline inline-block text-sm text-gray hover:text-sand">
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
          <p className="font-mono text-xs text-gray/70">{t("footer.copyright", { year: new Date().getFullYear() })}</p>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <Link to={lp("/imprint")} className="text-xs text-gray/75 transition-colors hover:text-sand">
              {t("footer.imprint")}
            </Link>
            <Link to={lp("/terms-and-conditions")} className="text-xs text-gray/75 transition-colors hover:text-sand">
              {t("footer.termsAndConditions")}
            </Link>
            <Link to={lp("/privacy-policy")} className="text-xs text-gray/75 transition-colors hover:text-sand">
              {t("footer.privacyPolicy")}
            </Link>
            <Link to={lp("/media-credits")} className="text-xs text-gray/75 transition-colors hover:text-sand">
              {t("mediaCredits.footerLink")}
            </Link>
            <button
              onClick={() => setPrivacyOpen(true)}
              className="text-xs text-gray/75 transition-colors hover:text-sand"
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
