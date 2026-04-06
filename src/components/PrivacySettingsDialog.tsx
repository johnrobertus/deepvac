import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { MapPin } from "lucide-react";

const STORAGE_KEY = "deepvac-maps-consent";

function readConsent(): boolean {
  try {
    return typeof window !== "undefined" && localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

function writeConsent(value: boolean) {
  try {
    if (typeof window === "undefined") return;
    if (value) localStorage.setItem(STORAGE_KEY, "true");
    else localStorage.removeItem(STORAGE_KEY);
  } catch {}
}

interface PrivacySettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function PrivacySettingsDialog({ open, onOpenChange }: PrivacySettingsDialogProps) {
  const { t } = useTranslation("common");
  const [mapsConsent, setMapsConsent] = useState(readConsent);

  useEffect(() => {
    if (open) setMapsConsent(readConsent());
  }, [open]);

  const handleToggle = useCallback((checked: boolean) => {
    writeConsent(checked);
    setMapsConsent(checked);
  }, []);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-surface border-gray/15 max-w-md">
        <DialogHeader>
          <DialogTitle className="text-sand text-base">{t("privacySettings.title")}</DialogTitle>
          <DialogDescription className="text-gray text-xs leading-relaxed">
            {t("privacySettings.description")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 pt-2">
          <div className="flex items-start justify-between gap-4 rounded border border-gray/10 bg-background p-4">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-blue" />
              <div>
                <p className="text-sm font-medium text-sand">{t("privacySettings.googleMaps")}</p>
                <p className="text-xs text-gray/60 leading-relaxed mt-1">
                  {t("privacySettings.googleMapsDescription")}
                </p>
              </div>
            </div>
            <Switch checked={mapsConsent} onCheckedChange={handleToggle} />
          </div>

          <p className="text-[10px] text-gray/40 leading-relaxed">
            {t("privacySettings.note")}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
