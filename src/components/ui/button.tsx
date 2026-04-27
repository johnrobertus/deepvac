import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-normal text-center text-sm font-medium ring-offset-background transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue/70 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed select-none touch-manipulation [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-300 max-w-full motion-reduce:transition-none motion-reduce:hover:transform-none",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground rounded-sm shadow-[0_0_0_0_hsl(193_49%_72%/0)] hover:bg-blue-light hover:-translate-y-[1px] hover:shadow-[0_0_22px_-4px_hsl(193_49%_72%/0.55)] hover:[&_svg]:translate-x-0.5 active:translate-y-0 active:scale-[0.98] active:shadow-[0_0_10px_-4px_hsl(193_49%_72%/0.45)]",
        destructive:
          "bg-destructive text-destructive-foreground rounded-sm hover:bg-destructive/90 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98]",
        outline:
          "border border-gray/40 text-sand rounded-sm hover:bg-gray/10 hover:border-blue/50 hover:text-sand hover:-translate-y-[1px] hover:shadow-[0_0_18px_-6px_hsl(193_49%_72%/0.35)] hover:[&_svg]:translate-x-0.5 active:translate-y-0 active:scale-[0.98]",
        secondary:
          "border border-gray/40 text-sand rounded-sm hover:bg-gray/10 hover:border-gray/60 hover:-translate-y-[1px] active:translate-y-0 active:scale-[0.98]",
        ghost:
          "text-sand rounded-sm hover:bg-surface-raised hover:text-sand active:scale-[0.98]",
        link:
          "text-blue underline-offset-4 hover:underline hover:text-blue-light font-mono",
        tertiary:
          "text-blue font-mono text-sm hover:text-blue-light hover:underline underline-offset-4 p-0 h-auto hover:[&_svg]:translate-x-0.5",
      },
      size: {
        default: "min-h-10 h-10 px-5 py-2",
        sm: "min-h-9 h-9 px-4 text-xs",
        lg: "min-h-12 h-12 px-8 text-base",
        icon: "h-10 w-10 min-h-10 min-w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
