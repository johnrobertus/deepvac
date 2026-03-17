import { cn } from "@/lib/utils";
import { PlaceholderImage } from "./PlaceholderImage";
import { TechChip } from "./TechChip";

interface ProductCardProps {
  title: string;
  subtitle?: string;
  specs?: { label: string; value: string }[];
  className?: string;
  assetId?: string;
}

export function ProductCard({
  title,
  subtitle,
  specs = [],
  className,
  assetId = "PRODUCT",
}: ProductCardProps) {
  return (
    <div
      className={cn(
        "bento-card rounded-lg overflow-hidden group cursor-pointer",
        className
      )}
    >
      <PlaceholderImage assetId={assetId} type="RENDER" aspectRatio="4/3" className="rounded-none" />
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-medium text-sand">{title}</h3>
        {subtitle && <p className="text-sm text-gray leading-relaxed">{subtitle}</p>}
        {specs.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-1">
            {specs.map((s) => (
              <TechChip key={s.label} label={s.label} value={s.value} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
