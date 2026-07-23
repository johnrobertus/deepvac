import { useCallback, useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { CalendarClock } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/components/LanguageProvider";
import { localizedPath } from "@/lib/routes";
import { CALENDLY_TECHNICAL_CALL_URL } from "@/lib/external-links";
import { trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "deepvac-calendly-consent";

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
    if (value) {
      localStorage.setItem(STORAGE_KEY, "true");
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  } catch { /* no-op */ }
}

interface BookCallDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function BookCallDialog({ open, onOpenChange }: BookCallDialogProps) {
  const { t } = useTranslation("common");
  const { lang } = useLanguage();
  const [consented, setConsented] = useState(readConsent);
  const [iframeLoaded, setIframeLoaded] = useState(false);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setConsented(e.newValue === "true");
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  useEffect(() => {
    if (open) trackEvent("book_call_opened");
  }, [open]);

  // Calendly signals a completed booking via postMessage
  useEffect(() => {
    if (!open || !consented) return;
    const onMessage = (e: MessageEvent) => {
      if (
        typeof e.origin === "string" &&
        e.origin.endsWith("calendly.com") &&
        (e.data as { event?: string } | null)?.event === "calendly.event_scheduled"
      ) {
        trackEvent("book_call_booked");
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, [open, consented]);

  const handleAccept = useCallback(() => {
    writeConsent(true);
    setConsented(true);
    trackEvent("book_call_consent");
  }, []);

  const handleWithdraw = useCallback(() => {
    writeConsent(false);
    setConsented(false);
    setIframeLoaded(false);
  }, []);

  // Calendly inline embed, themed to the Deepvac monolith palette
  const embedUrl = useMemo(() => {
    const url = new URL(CALENDLY_TECHNICAL_CALL_URL);
    url.searchParams.set("hide_gdpr_banner", "1");
    url.searchParams.set("background_color", "0a0a0a");
    url.searchParams.set("text_color", "e5e5d7");
    url.searchParams.set("primary_color", "99ccd9");
    url.searchParams.set("embed_type", "Inline");
    if (typeof window !== "undefined") {
      url.searchParams.set("embed_domain", window.location.hostname);
    }
    return url.toString();
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="flex h-[min(88dvh,780px)] w-[calc(100vw-1.5rem)] max-w-[1040px] flex-col gap-0 overflow-hidden border-sand/15 bg-surface p-0">
        {/* Header */}
        <div className="shrink-0 border-b border-sand/10 px-5 pb-4 pt-5 sm:px-6">
          <span className="text-card-eyebrow">{t("bookCall.dialogEyebrow")}</span>
          <DialogTitle className="mt-1.5 text-xl font-medium tracking-[-0.01em] text-sand sm:text-2xl">
            {t("bookCall.dialogTitle")}
          </DialogTitle>
          <DialogDescription className="mt-1 text-[15px] leading-relaxed text-gray">
            {t("bookCall.dialogDescription")}
          </DialogDescription>
        </div>

        {/* Body */}
        {consented ? (
          <>
            <div className="relative min-h-0 flex-1">
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
                style={{ border: 0 }}
                onLoad={() => setIframeLoaded(true)}
              />
            </div>
            <div className="flex shrink-0 items-center justify-between gap-4 border-t border-sand/10 px-5 py-2.5 sm:px-6">
              <Link
                to={localizedPath("/privacy-policy", lang)}
                className="text-[13px] text-gray/80 underline underline-offset-2 transition-colors hover:text-gray focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
              >
                {t("footer.privacyPolicy")}
              </Link>
              <button
                onClick={handleWithdraw}
                className="text-[13px] text-gray/80 transition-colors hover:text-gray focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
              >
                {t("bookCall.consentWithdraw")}
              </button>
            </div>
          </>
        ) : (
          <div className="blueprint-grid flex min-h-0 flex-1 flex-col items-center justify-center px-6 py-10 text-center">
            <span className="mb-5 inline-flex h-12 w-12 items-center justify-center rounded-sm border border-blue/25 bg-blue/5">
              <CalendarClock className="h-5 w-5 text-blue" />
            </span>
            <h3 className="text-card-title-lg">{t("bookCall.consentTitle")}</h3>
            <p className="mt-2.5 max-w-md text-[15px] leading-relaxed text-gray">
              {t("bookCall.consentDescription")}
            </p>
            <Button
              onClick={handleAccept}
              size="lg"
              className="mt-6 font-mono text-xs tracking-wide"
            >
              {t("bookCall.consentAccept")}
            </Button>
            <Link
              to={localizedPath("/privacy-policy", lang)}
              className="mt-3.5 text-[13px] text-blue/60 underline underline-offset-2 transition-colors hover:text-blue focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
            >
              {t("footer.privacyPolicy")}
            </Link>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
