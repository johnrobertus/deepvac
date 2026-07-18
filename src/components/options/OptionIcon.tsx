import type { LucideIcon } from "lucide-react";
import {
  Activity,
  Aperture,
  Cable,
  Droplets,
  Eye,
  Fan,
  Flame,
  Gauge,
  Network,
  RefreshCw,
  Search,
  SlidersHorizontal,
  Snowflake,
  Sun,
  Thermometer,
  ThermometerSun,
  Video,
  Waves,
  Wind,
} from "lucide-react";

const iconBySlug: Record<string, LucideIcon> = {
  "solar-simulator": Sun,
  "infrared-heaters": Flame,
  "temperature-control-zones": SlidersHorizontal,
  "temperature-sensors": Thermometer,
  "bake-out": ThermometerSun,
  "cryogenic-traps": Snowflake,
  "roots-booster": Fan,
  "oil-free-pumping": Wind,
  "nitrogen-venting": RefreshCw,
  "residual-gas-analysis": Activity,
  "qcm-monitoring": Gauge,
  "helium-leak-test": Search,
  "viewing-window-znse": Eye,
  "optical-viewports": Aperture,
  "interior-camera": Video,
  "remote-monitoring": Network,
  "process-connections": Cable,
  "vibration-isolation": Waves,
  "water-cooling": Droplets,
};

export function OptionIcon({ slug }: { slug: string }) {
  const Icon = iconBySlug[slug];
  return Icon ? <Icon className="w-5 h-5" /> : null;
}
