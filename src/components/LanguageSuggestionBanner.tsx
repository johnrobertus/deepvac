import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { X } from "lucide-react";
import { useLanguage } from "@/components/LanguageProvider";
import { getAlternatePath } from "@/lib/routes";

const STORAGE_KEY = "deepvac-lang-banner-dismissed";

export function LanguageSuggestionBanner() {
  const { lang } = useLanguage();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation("common");
  const [visible, setVisible] = useState(false);
  const [target, setTarget] = useState<"de" | "en" | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      if (localStorage.getItem(STORAGE_KEY) === "1") return;
    } catch {
      /* ignore */
    }
    const nav = (navigator.language || "").toLowerCase();
    const prefersDe = nav.startsWith("de");
    if (prefersDe && lang === "en") {
      setTarget("de");
      setVisible(true);
    } else if (!prefersDe && lang === "de") {
      setTarget("en");
      setVisible(true);
    }
  }, [lang]);

  const dismiss = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
  };

  const handleSwitch = () => {
    if (!target) return;
    const to = getAlternatePath(pathname, target);
    try {
      localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      /* ignore */
    }
    setVisible(false);
    navigate(to);
  };

  if (!visible || !target) return null;

  const message = target === "de" ? t("languageBanner.messageDe") : t("languageBanner.messageEn");
  const buttonLabel = target === "de" ? t("languageBanner.switchToDe") : t("languageBanner.switchToEn");

  return (
    <div
      role="region"
      aria-label={t("languageBanner.regionLabel")}
      className="mt-16 border-b border-gray/15 bg-surface"
    >
      <div className="container-wide flex items-center justify-between gap-4 py-2">
        <div className="flex flex-wrap items-center gap-3 text-[13px] text-gray">
          <span>{message}</span>
          <button
            type="button"
            onClick={handleSwitch}
            className="font-mono text-xs uppercase tracking-wider text-blue hover:text-blue-light transition-colors rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {buttonLabel}
          </button>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label={t("languageBanner.dismiss")}
          className="text-gray hover:text-sand rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
