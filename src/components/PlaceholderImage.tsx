import { cn } from "@/lib/utils";

interface PlaceholderImageProps {
  assetId?: string;
  type?: string;
  aspectRatio?: string;
  className?: string;
}

export function PlaceholderImage({
  assetId = "ASSET",
  type = "IMAGE",
  aspectRatio = "16/9",
  className,
}: PlaceholderImageProps) {
  return (
    <div
      className={cn(
        "relative w-full overflow-hidden rounded-lg bg-surface blueprint-grid flex items-center justify-center",
        className
      )}
      style={{ aspectRatio }}
    >
      {/* Crosshair */}
      <svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        fill="none"
        className="text-gray/30"
      >
        <line x1="24" y1="0" x2="24" y2="48" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="24" x2="48" y2="24" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="24" cy="24" r="8" stroke="currentColor" strokeWidth="0.5" />
        <circle cx="24" cy="24" r="2" fill="currentColor" />
      </svg>

      {/* Label */}
      <span className="absolute bottom-2 right-3 font-mono text-[10px] uppercase tracking-widest text-gray/40">
        [{assetId}: {type}_{aspectRatio.replace("/", "x")}]
      </span>
    </div>
  );
}
