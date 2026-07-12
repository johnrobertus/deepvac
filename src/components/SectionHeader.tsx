import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  className,
  align = "left",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "space-y-3",
        align === "center" && "text-center",
        className
      )}
    >
      {eyebrow && <span className="text-section-eyebrow">{eyebrow}</span>}
      <h2 className="text-section-title">{title}</h2>
      {description && (
        <p className={cn("text-section-lead", align === "center" && "mx-auto")}>{description}</p>
      )}
  );
}

