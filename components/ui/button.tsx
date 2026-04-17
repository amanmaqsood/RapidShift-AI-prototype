"use client";

import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40",
  {
    variants: {
      variant: {
        primary:
          "bg-primary text-on-primary hover:bg-primary-dim shadow-ambient",
        secondary:
          "bg-surface-container-high text-on-surface hover:bg-surface-container-highest",
        ghost:
          "bg-transparent text-on-surface hover:bg-surface-container-high",
        outline:
          "bg-surface-container-lowest text-on-surface hover:bg-surface-container-low ring-1 ring-outline-variant/40",
        destructive:
          "bg-error text-on-error hover:bg-error-dim",
        ai: "ai-pulse-bg text-white hover:opacity-90",
        success:
          "bg-primary-container text-on-primary-container hover:bg-primary-fixed-dim",
      },
      size: {
        sm: "h-8 px-3 text-xs",
        md: "h-10 px-5 text-sm",
        lg: "h-12 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        ref={ref}
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { buttonVariants };
