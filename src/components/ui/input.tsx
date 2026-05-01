import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-input bg-surface px-3 py-2 text-base ring-offset-background transition-[border-color,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-gray/45 focus:outline-none focus:border-blue/60 focus:bg-surface-raised focus:shadow-[0_0_0_3px_hsl(var(--blue)/0.15)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
