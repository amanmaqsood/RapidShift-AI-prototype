import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-medium tracking-tight",
  {
    variants: {
      variant: {
        neutral: "bg-surface-container-high text-on-surface-variant",
        primary: "bg-primary-container text-on-primary-container",
        tertiary: "bg-tertiary-container text-on-tertiary-container",
        error: "bg-error-container/70 text-on-error-container",
        warn: "bg-[#fff1d1] text-[#6b4b00]",
        success: "bg-primary-container text-on-primary-container",
        ai: "ai-pulse-bg text-white",
      },
    },
    defaultVariants: { variant: "neutral" },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
