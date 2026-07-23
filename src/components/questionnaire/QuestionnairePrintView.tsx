import { forwardRef } from "react";
import { useTranslation } from "react-i18next";

/**
 * Shared types — kept loose to avoid coupling.
 * The print view receives the full FormState from TvacQuestionnaire.
 */
interface OtherCheck { checked: boolean; text: string }
interface PortRow { checked: boolean; size: string; qty: string }
type AnyForm = Record<string, unknown>;

interface Props {
  form: AnyForm;
  /** Optional override for the document timestamp (mainly for tests). */
  generatedAt?: Date;
}

/* ---------- helpers ---------- */
const isEmptyVal = (v: unknown): boolean => {
  if (v == null) return true;
  if (typeof v === "string") return v.trim() === "";
  if (typeof v === "boolean") return v === false;
  return false;
};

/** Map a boolean array onto its label list, returning checked labels + an optional "Other: …" entry. */
const checkedLabels = (
  flags: boolean[] | undefined,
  labels: string[] | undefined,
  other?: OtherCheck,
  otherLabel = "Other"
): string[] => {
  const out: string[] = [];
  if (Array.isArray(flags) && Array.isArray(labels)) {
    flags.forEach((f, i) => { if (f && labels[i]) out.push(labels[i]); });
  }
  if (other?.checked) {
    const text = other.text?.trim();
    out.push(text ? `${otherLabel}: ${text}` : otherLabel);
  }
  return out;
};

/* ---------- presentational primitives (print-safe) ---------- */
function PrintRow({ label, value }: { label: string; value: React.ReactNode }) {
  if (value == null || value === "" || (Array.isArray(value) && value.length === 0)) return null;
  const display = Array.isArray(value) ? value.join(" · ") : value;
  return (
    <div className="qpv-row">
      <div className="qpv-label">{label}</div>
      <div className="qpv-value">{display}</div>
    </div>
  );
}

function PrintSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="qpv-section">
      <h2 className="qpv-section-title">{title}</h2>
      <div className="qpv-section-body">{children}</div>
    </section>
  );
}

/* ---------- main component ---------- */
export const QuestionnairePrintView = forwardRef<HTMLDivElement, Props>(function QuestionnairePrintView(
  { form, generatedAt = new Date() },
  ref
) {
  const { t, i18n } = useTranslation("questionnaire");
  const lang = i18n.language?.startsWith("de") ? "de" : "en";

  // Prebuild option/label arrays from i18n
  const apps = t("s1.applicationOptions", { returnObjects: true }) as string[];
  const dutOpts = t("s2.dutTypeOptions", { returnObjects: true }) as string[];
  const housingOpts = t("s2.housingOptions", { returnObjects: true }) as string[];
  const shapeOpts = t("s2.shapeOptions", { returnObjects: true }) as { cubic: string; cylindrical: string };
  const doorOpts = t("s2.doorOptions", { returnObjects: true }) as string[];
  const portRows = t("s2.portRows", { returnObjects: true }) as { label: string; ph: string }[];
  const vmOpts = t("s2.viewportsMaterialOptions", { returnObjects: true }) as string[];
  const highVacOpts = t("s3.highVacOptions", { returnObjects: true }) as string[];
  const highVacNested = t("s3.highVacNested", { returnObjects: true }) as string[];
  const foreVacOpts = t("s3.foreVacOptions", { returnObjects: true }) as string[];
  const gaugeOpts = t("s3.gaugeOptions", { returnObjects: true }) as string[];
  const plateCoolingOpts = t("s3.plateCoolingOptions", { returnObjects: true }) as string[];
  const shroudCoolingOpts = t("s3.shroudCoolingOptions", { returnObjects: true }) as string[];
  const sensorOpts = t("s3.sensorOptions", { returnObjects: true }) as string[];
  const elecConnOpts = t("s4.elecConnectorOptions", { returnObjects: true }) as string[];
  const rfOpts = t("s4.rfOptions", { returnObjects: true }) as string[];
  const fiberOpts = t("s4.fiberOptions", { returnObjects: true }) as string[];
  const motionOpts = t("s4.motionOptions", { returnObjects: true }) as string[];
  const remoteOpts = t("s4.remoteOptions", { returnObjects: true }) as string[];
  const commOpts = t("s4.commOptions", { returnObjects: true }) as string[];
  const exportOpts = t("s4.exportOptions", { returnObjects: true }) as string[];
  const alarmOpts = t("s4.alarmOptions", { returnObjects: true }) as string[];
  const powerOpts = t("s5.powerOptions", { returnObjects: true }) as string[];
  const utilOpts = t("s5.utilitiesOptions", { returnObjects: true }) as string[];

  const otherLabel = t("common.other");
  const yes = t("print.yes");

  // Range helper — combines min/max if either present
  const range = (min: string, max: string, unit = "") => {
    const a = (min ?? "").trim();
    const b = (max ?? "").trim();
    if (!a && !b) return "";
    return `${a || "?"} – ${b || "?"}${unit}`;
  };

  // Internal usable dimensions
  const isCyl = form.chamberShape === "cylindrical";
  const internalDims = (() => {
    if (isCyl) {
      const L = (form.internalL || "").trim();
      const D = (form.internalW || "").trim();
      if (!L && !D) return "";
      return `L ${L || "?"} × D ${D || "?"} mm`;
    }
    const v = [form.internalW, form.internalH, form.internalL].filter((x: string) => x?.trim());
    return v.length ? v.join(" × ") + " mm" : "";
  })();
  const internalDimsLabel = isCyl ? t("s2.internalDimensionsCyl") : t("s2.internalDimensions");

  // Ports
  const portsRendered = (form.ports as PortRow[] | undefined)?.flatMap((p, i) => {
    if (!p?.checked) return [];
    const label = portRows[i]?.label ?? `Port ${i + 1}`;
    const parts: string[] = [];
    if (p.size?.trim()) parts.push(p.size.trim());
    if (p.qty?.trim()) parts.push(`× ${p.qty.trim()}`);
    return [`${label}${parts.length ? " — " + parts.join(" ") : ""}`];
  }) ?? [];

  // Date formatting
  const dateStr = generatedAt.toLocaleDateString(lang === "de" ? "de-DE" : "en-GB", {
    year: "numeric", month: "short", day: "2-digit",
  });

  return (
    <div ref={ref} className="qpv-root" aria-hidden="true">
      <header className="qpv-header">
        <div className="qpv-header-left">
          <div className="qpv-eyebrow">Deepvac</div>
          <h1 className="qpv-title">{t("print.documentTitle")}</h1>
          <div className="qpv-subtitle">{t("print.subtitle")}</div>
        </div>
        <div className="qpv-header-right">
          <div className="qpv-meta">{t("print.generated")}: {dateStr}</div>
          <div className="qpv-meta">info@deepvac.space</div>
        </div>
      </header>
      <div className="qpv-rule" />

      {/* 1. Contact */}
      <PrintSection title={"1. " + t("stepTitles.s1")}>
        <PrintRow label={t("s1.company")} value={form.company} />
        <PrintRow label={t("s1.firstName")} value={form.firstName} />
        <PrintRow label={t("s1.lastName")} value={form.lastName} />
        <PrintRow label={t("s1.email")} value={form.email} />
        <PrintRow label={t("s1.phone")} value={form.phone} />
        <PrintRow label={t("s1.country")} value={form.country} />
        <PrintRow label={t("s1.application")} value={form.application} />
      </PrintSection>

      {/* 2. Mounting / Chamber */}
      <PrintSection title={t("s2.mounting")}>
        <PrintRow label={t("s2.weight")} value={form.dutWeight} />
        <PrintRow label={t("s2.dutType")} value={checkedLabels(form.dutTypes, dutOpts, form.dutTypeOther, otherLabel)} />
        <PrintRow label={t("s2.housing")} value={checkedLabels(form.housing, housingOpts, form.housingOther, otherLabel)} />
      </PrintSection>

      <PrintSection title={t("s2.chamber")}>
        <PrintRow
          label={t("s2.shape")}
          value={form.chamberShape ? shapeOpts[form.chamberShape as "cubic" | "cylindrical"] : ""}
        />
        <PrintRow label={t("s2.chamberMaterial")} value={form.chamberMaterial} />
        <PrintRow label={t("s2.internalVolume")} value={form.internalVolume} />
        <PrintRow label={internalDimsLabel} value={internalDims} />
        <PrintRow label={t("s2.doorType")} value={checkedLabels(form.doorTypes, doorOpts)} />
        <PrintRow label={t("s2.ports")} value={portsRendered} />
        <PrintRow label={t("s2.viewportsQty")} value={form.viewportsQty} />
        <PrintRow label={t("s2.viewportsSize")} value={form.viewportsSize} />
        <PrintRow label={t("s2.viewportsMaterial")} value={checkedLabels(form.viewportsMaterial, vmOpts, form.viewportsMaterialOther, otherLabel)} />
      </PrintSection>

      {/* 3. Thermal & vacuum */}
      <PrintSection title={t("s3.title")}>
        <PrintRow label={t("s3.heat")} value={form.heatDissipation} />
        <PrintRow label={t("s3.dutCount")} value={form.dutCount} />
        <PrintRow label={t("s3.vacuum")} value={form.vacuumLevel} />
        <PrintRow label={t("s3.highVacPump")} value={checkedLabels(form.highVac, highVacOpts)} />
        <PrintRow label={highVacOpts[1]} value={checkedLabels(form.highVacNested, highVacNested)} />
        <PrintRow label={t("s3.foreVacPump")} value={checkedLabels(form.foreVac, foreVacOpts)} />
        <PrintRow label={t("s3.gauges")} value={checkedLabels(form.gauges, gaugeOpts)} />
        <PrintRow label={t("s3.ramp")} value={form.rampRate} />
        <PrintRow label={t("s3.uniformity")} value={form.uniformity} />
        <PrintRow label={t("s3.tempRange")} value={range(form.tempMin, form.tempMax, " °C")} />
        <PrintRow label={t("s3.plateDims")} value={form.plateDimensions} />
        <PrintRow label={t("s3.plateCustomPh")} value={form.plateCustom} />
        <PrintRow label={`${t("s3.thermalPlate")} — ${t("s3.tempRange")}`} value={range(form.plateTempMin, form.plateTempMax, " °C")} />
        <PrintRow label={`${t("s3.thermalPlate")} — ${t("s3.plateCooling")}`} value={checkedLabels(form.plateCooling, plateCoolingOpts, form.plateCoolingOther, otherLabel)} />
        <PrintRow label={`${t("s3.shroud")} — ${t("s3.shroudConfig")}`} value={form.shroudConfig} />
        <PrintRow label={`${t("s3.shroud")} — ${t("s3.tempRange")}`} value={range(form.shroudTempMin, form.shroudTempMax, " °C")} />
        <PrintRow label={`${t("s3.shroud")} — ${t("s3.shroudCooling")}`} value={checkedLabels(form.shroudCooling, shroudCoolingOpts, form.shroudCoolingOther, otherLabel)} />
        <PrintRow label={t("s3.sensor")} value={checkedLabels(form.sensorTypes, sensorOpts, form.sensorTypeOther, otherLabel)} />
        <PrintRow label={t("s3.channels")} value={form.measurementChannels} />
      </PrintSection>

      {/* 4. Feedthroughs / Control / Safety */}
      <PrintSection title={t("s4.feedthroughs")}>
        <PrintRow label={`${t("s4.elec")} — ${t("common.qty")}`} value={form.elecQty} />
        <PrintRow label={`${t("s4.elec")} — ${t("s4.elecVoltage")}`} value={form.elecVoltage} />
        <PrintRow label={`${t("s4.elec")} — ${t("s4.elecCurrent")}`} value={form.elecCurrent} />
        <PrintRow label={`${t("s4.elec")} — ${t("s4.elecConnector")}`} value={checkedLabels(form.elecConnector, elecConnOpts, form.elecConnectorOther, otherLabel)} />
        <PrintRow label={`${t("s4.elec")} — ${t("s4.elecNotes")}`} value={form.elecNotes} />
        <PrintRow label={t("s4.rf")} value={checkedLabels(form.rfTypes, rfOpts, form.rfTypeOther, otherLabel)} />
        <PrintRow label={`${t("s4.rf")} — ${t("common.qty")}`} value={form.rfQty} />
        <PrintRow label={t("s4.fiber")} value={checkedLabels(form.fiberTypes, fiberOpts, form.fiberTypeOther, otherLabel)} />
        <PrintRow label={`${t("s4.fiber")} — ${t("common.qty")}`} value={form.fiberQty} />
        <PrintRow label={`${t("s4.fluid")} — ${t("common.qty")}`} value={form.fluidQty} />
        <PrintRow label={`${t("s4.fluid")} — ${t("s4.fluidConn")}`} value={form.fluidConnection} />
        <PrintRow label={t("s4.motion")} value={checkedLabels(form.motionTypes, motionOpts, form.motionTypeOther, otherLabel)} />
        <PrintRow label={`${t("s4.motion")} — ${t("common.qty")}`} value={form.motionQty} />
      </PrintSection>

      <PrintSection title={t("s4.control")}>
        <PrintRow label={t("s4.remote")} value={form.remoteAccess} />
        <PrintRow label={t("s4.remoteAccess")} value={checkedLabels(form.remoteOptions, remoteOpts)} />
        <PrintRow label={t("s4.ai")} value={form.ai} />
        <PrintRow label={t("s4.comm")} value={checkedLabels(form.comm, commOpts, form.commOther, otherLabel)} />
        <PrintRow label={t("s4.loggingCustom")} value={form.loggingCustom ? yes : ""} />
        <PrintRow label={t("s4.logging")} value={form.loggingNotes} />
        <PrintRow label={t("s4.export")} value={checkedLabels(form.exportFormats, exportOpts)} />
      </PrintSection>

      <PrintSection title={t("s4.safety")}>
        <PrintRow label={t("s4.alarm")} value={checkedLabels(form.alarms, alarmOpts)} />
      </PrintSection>

      {/* 5. Site / Schedule / Budget */}
      <PrintSection title={t("s5.additional")}>
        <PrintRow
          label={t("s5.installEnv")}
          value={(() => {
            const v: string[] = [];
            if (form.installStandard) v.push(t("s5.installStandard"));
            if (form.installCleanroom?.checked) v.push(`${t("s5.installCleanroom").replace(":", "")}${form.installCleanroom.text ? " — " + form.installCleanroom.text : ""}`);
            if (form.installOther?.checked) v.push(`${otherLabel}${form.installOther.text ? ": " + form.installOther.text : ""}`);
            return v;
          })()}
        />
        <PrintRow label={t("s5.installSpace")} value={form.installSpace} />
        <PrintRow label={t("s5.power")} value={checkedLabels(form.power, powerOpts, form.powerOther, otherLabel)} />
        <PrintRow label={t("s5.powerMaxPh")} value={form.powerMax} />
        <PrintRow label={t("s5.utilities")} value={checkedLabels(form.utilities, utilOpts)} />
        <PrintRow label={t("s5.specialReq")} value={form.specialReq} />
      </PrintSection>

      <PrintSection title={t("s5.schedule")}>
        <PrintRow label={t("s5.delivery")} value={form.delivery} />
        <PrintRow label={t("s5.budget")} value={form.budget} />
        <PrintRow label={t("s5.phase")} value={form.phase} />
      </PrintSection>

      <footer className="qpv-footer">
        <div>{t("print.footer")}</div>
      </footer>
    </div>
  );
});
