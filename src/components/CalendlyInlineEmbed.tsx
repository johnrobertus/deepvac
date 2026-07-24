import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CalendarClock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedPath } from "@/lib/routes";
import { CALENDLY_TECHNICAL_CALL_URL } from "@/lib/external-links";
import { trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "deepvac-calendly-consent";
const LOAD_TIMEOUT_MS = 8000;

function readConsent(): boolean {
  try {
    if (typeof window === "undefined") return false;
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function writeConsent(value: boolean) {
  try {
    if (typeof window === "undefined") return;
    if (value) localStorage.setItem(STORAGE_KEY, "true");
    else localStorage.removeItem(STORAGE_KEY);
  } catch { /* no-op */ }
}

interface Prefill {
  firstName?: string;
  lastName?: string;
  email?: string;
}

interface Props {
  prefill?: Prefill;
}

export function CalendlyInlineEmbed({ prefill }: Props) {
  const { t } = useTranslation("common");
  const { lang } = useLanguage();
  const [consented, setConsented] = useState(readConsent);
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const embedUrl = useMemo(() => {
    const url = new URL(CALENDLY_TECHNICAL_CALL_URL);
    url.searchParams.set("hide_gdpr_banner", "1");
    url.searchParams.set("background_color", "0a0a0a");
    url.searchParams.set("text_color", "e5e5d7");
    url.searchParams.set("primary_color", "99ccd9");
    url.searchParams.set("embed_type", "Inline");
    const fullName = [prefill?.firstName, prefill?.lastName].filter(Boolean).join(" ").trim();
    if (fullName) url.searchParams.set("name", fullName);
    if (prefill?.email) url.searchParams.set("email", prefill.email);
    url.searchParams.set("utm_source", "website");
    url.searchParams.set("utm_medium", "inquiry_form");
    if (typeof window !== "undefined") {
      url.searchParams.set("embed_domain", window.location.hostname);
    }
    return url.toString();
  }, [prefill?.firstName, prefill?.lastName, prefill?.email]);

  const fallbackUrl = useMemo(() => {
    const url = new URL(CALENDLY_TECHNICAL_CALL_URL);
    const fullName = [prefill?.firstName, prefill?.lastName].filter(Boolean).join(" ").trim();
    if (fullName) url.searchParams.set("name", fullName);
    if (prefill?.email) url.searchParams.set("email", prefill.email);
    url.searchParams.set("utm_source", "website");
    url.searchParams.set("utm_medium", "inquiry_form");
    return url.toString();
  }, [prefill?.firstName, prefill?.lastName, prefill?.email]);

  const handleAccept = useCallback(() => {
    writeConsent(true);
    setConsented(true);
    trackEvent("calendly_consent_given");
  }, []);

  // Timeout guard: fall back to plain link if the iframe never loads
  useEffect(() => {
    if (!consented || iframeLoaded) return;
    timeoutRef.current = window.setTimeout(() => setLoadFailed(true), LOAD_TIMEOUT_MS);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [consented, iframeLoaded]);

  // Calendly booking event
  useEffect(() => {
    if (!consented) return;
    const onMessage = (e: MessageEvent) => {
      if (
        typeof e.origin === "string" &&
        e.origin.endsWith("calendly.com") &&
        (e.data as { event?: string } | null)?.event === "calendly.event_scheduled"
      ) {
        trackEvent("calendly_scheduled");
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [consented]);

  const FallbackLink = (
    <a
      href={fallbackUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2 text-blue underline underline-offset-2 hover:text-blue-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/40 rounded-sm"
    >
      {t("bookCall.openInNewTab")}
      <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
    </a>
  );

  if (!consented) {
    return (
      <div className="blueprint-grid flex flex-col items-center justify-center rounded-lg border border-sand/15 bg-surface px-6 py-10 text-center">
        <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-sm border border-blue/25 bg-blue/5">
          <CalendarClock className="h-5 w-5 text-blue" aria-hidden="true" />
        </span>
        <h3 className="text-card-title-lg">{t("bookCall.consentTitle")}</h3>
        <p className="mt-2.5 max-w-md text-[15px] leading-relaxed text-gray">
          {t("bookCall.consentDescription")}
        </p>
        <Button onClick={handleAccept} size="lg" className="mt-6 font-mono text-xs tracking-wide">
          {t("bookCall.consentAccept")}
        </Button>
        <div className="mt-4 flex flex-col items-center gap-2">
          {FallbackLink}
          <Link
            to={localizedPath("/privacy-policy", lang)}
            className="text-[13px] text-gray/70 underline underline-offset-2 transition-colors hover:text-gray focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
          >
            {t("footer.privacyPolicy")}
          </Link>
        </div>
      </div>
    );
  }

  if (loadFailed) {
    return (
      <div className="rounded-lg border border-sand/15 bg-surface px-6 py-8 text-center">
        <p className="text-[15px] text-gray">{t("bookCall.consentDescription")}</p>
        <div className="mt-4">{FallbackLink}</div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-lg border border-sand/15 bg-surface">
      <div className="relative w-full" style={{ minHeight: "660px" }}>
        {!iframeLoaded && (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center bg-surface"
            aria-hidden="true"
          >
            <span className="inline-flex items-center gap-2.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-blue" />
              <span className="mono-label">{t("bookCall.loading")}</span>
            </span>
          </div>
        )}
        <iframe
          src={embedUrl}
          title={t("bookCall.dialogTitle")}
          className="h-full w-full"
          style={{ border: 0, minHeight: "660px" }}
          onLoad={() => setIframeLoaded(true)}
          onError={() => setLoadFailed(true)}
        />
      </div>
      <div className="flex items-center justify-between gap-4 border-t border-sand/10 px-4 py-2.5">
        {FallbackLink}
        <Link
          to={localizedPath("/privacy-policy", lang)}
          className="text-[13px] text-gray/70 underline underline-offset-2 transition-colors hover:text-gray focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
        >
          {t("footer.privacyPolicy")}
        </Link>
      </div>
    </div>
  );
}
