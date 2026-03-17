import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  icon?: React.ReactNode;
  title: string;
  description?: string;
  className?: string;
}

export function ServiceCard({
  icon,
  title,
  description,
  className,
}: ServiceCardProps) {
  return (
    <div
      className={cn(
        "bento-card rounded-lg p-6 border-l-2 border-l-blue/60 group cursor-pointer flex flex-col justify-between gap-4",
        className
      )}
    >
      <div className="space-y-3">
        {icon && <div className="text-blue">{icon}</div>}
        <h3 className="text-base font-medium text-sand">{title}</h3>
        {description && (
          <p className="text-sm text-gray leading-relaxed">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-1 text-blue text-sm font-mono opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Learn more <ArrowRight className="w-3 h-3" />
      </div>
    </div>
  );
}
