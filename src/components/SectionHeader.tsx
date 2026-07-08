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
      <h2 className="text-[2rem] sm:text-4xl md:text-[2.6rem] lg:text-[3rem] font-medium tracking-tight text-sand leading-[1.12]">
        {title}
      </h2>
      {description && (
        <p className="text-sand/85 max-w-2xl text-[17px] sm:text-lg md:text-xl leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
