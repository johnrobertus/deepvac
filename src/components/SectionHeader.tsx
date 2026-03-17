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
      {eyebrow && (
        <span className="mono-label text-blue">{eyebrow}</span>
      )}
      <h2 className="text-3xl md:text-4xl font-medium tracking-tight text-sand">
        {title}
      </h2>
      {description && (
        <p className="text-gray max-w-2xl text-base leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
