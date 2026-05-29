import * as React from "react";
import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "info" | "muted"
  | "role-admin" | "role-doctor" | "role-receptionist" | "role-patient" | "role-lab";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  dot?: boolean;
}

const variants: Record<BadgeVariant, string> = {
  default:          "bg-primary-100 text-primary-700",
  success:          "bg-green-100 text-green-700",
  warning:          "bg-accent-100 text-accent-600",
  danger:           "bg-red-100 text-red-600",
  info:             "bg-teal-100 text-teal-700",
  muted:            "bg-surface-bg text-text-muted border border-border",
  "role-admin":     "bg-primary-50 text-primary-700 border border-primary-200",
  "role-doctor":    "bg-teal-50 text-teal-700 border border-teal-200",
  "role-receptionist": "bg-accent-50 text-accent-600 border border-accent-200",
  "role-patient":   "bg-purple-50 text-purple-700 border border-purple-200",
  "role-lab":       "bg-cyan-50 text-cyan-700 border border-cyan-200",
};

const dotColors: Record<BadgeVariant, string> = {
  default: "bg-primary-500",
  success: "bg-green-500",
  warning: "bg-accent-500",
  danger:  "bg-red-500",
  info:    "bg-teal-500",
  muted:   "bg-text-muted",
  "role-admin": "bg-primary-500",
  "role-doctor": "bg-teal-500",
  "role-receptionist": "bg-accent-500",
  "role-patient": "bg-purple-500",
  "role-lab": "bg-cyan-500",
};

export function Badge({ variant = "default", dot, className, children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium",
        variants[variant],
        className
      )}
      {...props}
    >
      {dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full animate-pulse-dot", dotColors[variant])} />
      )}
      {children}
    </span>
  );
}
