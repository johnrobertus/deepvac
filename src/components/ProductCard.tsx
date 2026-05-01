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
      tabIndex={0}
      className={cn(
        "bento-card rounded-lg overflow-hidden group cursor-pointer focus:outline-none",
        className
      )}
    >
      <div className="media-frame">
        <PlaceholderImage assetId={assetId} type="RENDER" aspectRatio="4/3" className="rounded-none" />
      </div>
      <div className="p-5 space-y-3">
        <h3 className="text-lg font-medium text-sand transition-colors duration-300 group-hover:text-blue-light">
          {title}
        </h3>
        {subtitle && <p className="text-sm text-gray/90 leading-relaxed transition-colors duration-300 group-hover:text-sand/85">{subtitle}</p>}
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
