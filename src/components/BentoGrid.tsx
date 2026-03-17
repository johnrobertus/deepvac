import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface BentoGridProps {
  children: ReactNode;
  className?: string;
}

export function BentoGrid({ children, className }: BentoGridProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6",
        className
      )}
    >
      {children}
    </div>
  );
}

interface BentoCardProps {
  children: ReactNode;
  className?: string;
  span?: "1x1" | "2x1" | "2x2" | "1x2";
}

export function BentoCard({ children, className, span = "1x1" }: BentoCardProps) {
  const spanClasses = {
    "1x1": "",
    "2x1": "md:col-span-2",
    "2x2": "md:col-span-2 md:row-span-2",
    "1x2": "md:row-span-2",
  };

  return (
    <div
      className={cn(
        "bento-card rounded-lg p-6",
        spanClasses[span],
        className
      )}
    >
      {children}
    </div>
  );
}
