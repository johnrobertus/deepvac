import * as React from "react";

import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => {
  return (
    <textarea
      className={cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background transition-[border-color,box-shadow,background-color] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] placeholder:text-muted-foreground hover:border-gray/35 focus:outline-none focus:border-blue/60 focus:bg-surface focus:shadow-[0_0_0_3px_hsl(var(--blue)/0.15)] focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
