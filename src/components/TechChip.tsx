import { cn } from "@/lib/utils";

interface TechChipProps {
  label: string;
  value?: string;
  className?: string;
}

export function TechChip({ label, value, className }: TechChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-sm border border-gray/20 bg-surface px-3 py-1.5",
        className
      )}
    >
      <span className="mono-label">{label}</span>
      {value && <span className="mono-value">{value}</span>}
    </span>
  );
}
