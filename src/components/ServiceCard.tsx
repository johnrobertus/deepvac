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
      tabIndex={0}
      className={cn(
        "bento-card rounded-lg p-6 border-l-2 border-l-blue/60 group cursor-pointer flex flex-col justify-between gap-4 focus:outline-none hover:border-l-blue",
        className
      )}
    >
      <div className="space-y-3">
        {icon && (
          <div className="text-blue transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:-translate-y-0.5 group-hover:text-blue-light">
            {icon}
          </div>
        )}
        <h3 className="text-base font-medium text-sand transition-colors duration-300 group-hover:text-blue-light">
          {title}
        </h3>
        {description && (
          <p className="text-body transition-colors duration-300 group-hover:text-sand/85">{description}</p>
        )}
      </div>
      <div className="flex items-center gap-1.5 text-blue text-sm font-mono opacity-0 -translate-x-1 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:opacity-100 group-hover:translate-x-0">
        Learn more <ArrowRight className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" />
      </div>
    </div>
  );
}
