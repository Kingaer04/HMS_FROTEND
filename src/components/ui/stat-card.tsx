import * as React from "react";
import { cn } from "@/lib/utils";

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: React.ReactNode;
  trend?: { value: number; label: string };
  color?: "primary" | "teal" | "accent" | "success" | "danger";
  className?: string;
}

const colorMap: Record<string, { bg: string; icon: string; badge: string }> = {
  primary: { bg: "bg-primary-50",  icon: "bg-primary-100 text-primary-700",  badge: "text-primary-700" },
  teal:    { bg: "bg-teal-50",     icon: "bg-teal-100 text-teal-700",         badge: "text-teal-700" },
  accent:  { bg: "bg-accent-50",   icon: "bg-accent-100 text-accent-600",     badge: "text-accent-600" },
  success: { bg: "bg-green-50",    icon: "bg-green-100 text-green-700",        badge: "text-green-700" },
  danger:  { bg: "bg-red-50",      icon: "bg-red-100 text-red-600",           badge: "text-red-600" },
};

export function StatCard({ title, value, subtitle, icon, trend, color = "primary", className }: StatCardProps) {
  const c = colorMap[color];
  return (
    <div className={cn("bg-surface rounded-xl border border-border shadow-sm p-5 flex items-start gap-4", className)}>
      {icon && (
        <div className={cn("p-3 rounded-xl flex-shrink-0", c.icon)}>
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wide">{title}</p>
        <p className="text-2xl font-bold text-text-primary mt-0.5">{value}</p>
        {subtitle && <p className="text-xs text-text-muted mt-0.5">{subtitle}</p>}
        {trend && (
          <p className={cn("text-xs font-medium mt-1", trend.value >= 0 ? "text-green-600" : "text-red-500")}>
            {trend.value >= 0 ? "↑" : "↓"} {Math.abs(trend.value)}% {trend.label}
          </p>
        )}
      </div>
    </div>
  );
}
