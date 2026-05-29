import * as React from "react";
import { cn } from "@/lib/utils";

type Status = "online" | "offline" | "busy" | "pending" | "active" | "inactive";

const colors: Record<Status, string> = {
  online:   "bg-green-500",
  offline:  "bg-text-muted",
  busy:     "bg-accent-500",
  pending:  "bg-yellow-500",
  active:   "bg-green-500",
  inactive: "bg-red-500",
};

interface StatusDotProps { status: Status; pulse?: boolean; label?: string; className?: string; }

export function StatusDot({ status, pulse, label, className }: StatusDotProps) {
  return (
    <span className={cn("inline-flex items-center gap-1.5", className)}>
      <span className={cn("w-2 h-2 rounded-full flex-shrink-0", colors[status], pulse && "animate-pulse-dot")} />
      {label && <span className="text-xs text-text-secondary capitalize">{label || status}</span>}
    </span>
  );
}
