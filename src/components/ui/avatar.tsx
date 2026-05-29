import * as React from "react";
import { cn, getInitials } from "@/lib/utils";

interface AvatarProps {
  name?: string;
  src?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  role?: "admin" | "doctor" | "receptionist" | "patient" | "lab";
  className?: string;
}

const sizes = { xs: "w-6 h-6 text-xs", sm: "w-8 h-8 text-xs", md: "w-10 h-10 text-sm", lg: "w-12 h-12 text-base", xl: "w-16 h-16 text-lg" };

const roleColors: Record<string, string> = {
  admin:        "bg-primary-700 text-white",
  doctor:       "bg-teal-600 text-white",
  receptionist: "bg-accent-500 text-white",
  patient:      "bg-purple-600 text-white",
  lab:          "bg-cyan-600 text-white",
};

export function Avatar({ name, src, size = "md", role, className }: AvatarProps) {
  const colorClass = role ? roleColors[role] : "bg-primary-200 text-primary-700";
  return (
    <span className={cn("inline-flex items-center justify-center rounded-full font-semibold flex-shrink-0", sizes[size], colorClass, className)}>
      {src ? (
        <img src={src} alt={name} className="w-full h-full rounded-full object-cover" />
      ) : (
        getInitials(name || "?")
      )}
    </span>
  );
}
