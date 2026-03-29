import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { MapPin, Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Link } from "react-router-dom";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedPath } from "@/lib/routes";

const STORAGE_KEY = "deepvac-maps-consent";
const DEFAULT_MAP_URL =
  "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2434.0!2d9.7069!3d52.3911!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b074d80e5b6d4b%3A0x4a5c4b4e4e4e4e4e!2sAn+der+Universit%C3%A4t+1%2C+30823+Garbsen!5e0!3m2!1sde!2sde!4v1700000000000";
const ADDRESS = "Deepvac GmbH, An der Universität 1, 30823 Garbsen, Germany";

function readConsent(): boolean {
  try { if (typeof window === "undefined") return false; return localStorage.getItem(STORAGE_KEY) === "true"; } catch { return false; }
}

function writeConsent(value: boolean) {
  try { if (typeof window === "undefined") return; if (value) { localStorage.setItem(STORAGE_KEY, "true"); } else { localStorage.removeItem(STORAGE_KEY); } } catch {}
}

interface ConsentMapProps { height?: string; mapUrl?: string; }

export function ConsentMap({ height = "h-44", mapUrl = DEFAULT_MAP_URL }: ConsentMapProps) {
  const { t } = useTranslation("common");
  const { lang } = useLanguage();
  const [consented, setConsented] = useState(readConsent);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => { if (e.key === STORAGE_KEY) setConsented(e.newValue === "true"); };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const handleAccept = useCallback(() => { writeConsent(true); setConsented(true); }, []);
  const handleWithdraw = useCallback(() => { writeConsent(false); setConsented(false); }, []);

  const handleCopy = useCallback(async () => {
    try {
      if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(ADDRESS); } else {
        const ta = document.createElement("textarea"); ta.value = ADDRESS; ta.style.position = "fixed"; ta.style.left = "-9999px";
        document.body.appendChild(ta); ta.select(); document.execCommand("copy"); document.body.removeChild(ta);
      }
      setCopied(true); toast.success(t("consent.addressCopied")); setTimeout(() => setCopied(false), 2000);
    } catch { toast.error(t("consent.couldNotCopy")); }
  }, [t]);

  if (consented) {
    return (
      <div>
        <div className={height} style={{ filter: "invert(0.9) hue-rotate(180deg)" }}>
          <iframe src={mapUrl} width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Deepvac GmbH Location" />
        </div>
        <button onClick={handleWithdraw} className="w-full text-center py-2 text-[10px] text-gray/40 hover:text-gray/60 transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
          {t("consent.withdrawConsent")}
        </button>
      </div>
    );
  }

  return (
    <div className={`${height} bg-surface flex flex-col items-center justify-center px-6 text-center`}>
      <MapPin className="w-5 h-5 text-blue mb-3" />
      <p className="text-xs text-gray/70 mb-1.5">Deepvac GmbH · An der Universität 1 · 30823 Garbsen · Germany</p>
      <button onClick={handleCopy} className="inline-flex items-center gap-1 text-[10px] text-gray/40 hover:text-gray/60 transition-colors mb-4 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm px-1">
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        {copied ? t("consent.copied") : t("consent.copyAddress")}
      </button>
      <h3 className="text-sm font-medium text-sand mb-1.5">{t("consent.mapTitle")}</h3>
      <p className="text-[11px] text-gray/50 leading-relaxed max-w-sm mb-4">{t("consent.mapDescription")}</p>
      <Button size="sm" onClick={handleAccept} className="font-mono text-xs tracking-wide mb-2">{t("consent.acceptAndLoad")}</Button>
      <Link to={localizedPath("/privacy-policy", lang)} className="text-[10px] text-blue/60 hover:text-blue transition-colors underline underline-offset-2 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm">
        {t("footer.privacyPolicy")}
      </Link>
    </div>
  );
}
