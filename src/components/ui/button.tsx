"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost" | "outline" | "danger" | "success";
  size?: "sm" | "md" | "lg" | "icon";
  loading?: boolean;
}

const variantStyles: Record<string, string> = {
  primary:   "bg-primary-700 text-white hover:bg-primary-800 shadow-sm hover:shadow-md active:bg-primary-900 focus-visible:ring-primary-300",
  secondary: "bg-teal-500 text-white hover:bg-teal-600 shadow-sm active:bg-teal-700 focus-visible:ring-teal-300",
  ghost:     "bg-transparent text-text-secondary hover:bg-primary-50 hover:text-primary-700 focus-visible:ring-primary-200",
  outline:   "bg-white border border-border-strong text-text-primary hover:border-primary-400 hover:text-primary-700 hover:bg-primary-50",
  danger:    "bg-red-500 text-white hover:bg-red-600 shadow-sm active:bg-red-700",
  success:   "bg-green-600 text-white hover:bg-green-700 shadow-sm",
};

const sizeStyles: Record<string, string> = {
  sm:   "h-8  px-3   text-xs  gap-1.5 rounded-md",
  md:   "h-10 px-4   text-sm  gap-2   rounded-lg",
  lg:   "h-12 px-6   text-base gap-2.5 rounded-lg",
  icon: "h-10 w-10  text-sm         rounded-lg",
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-medium",
          "transition-all duration-150 ease-smooth",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          "disabled:opacity-50 disabled:pointer-events-none",
          "select-none cursor-pointer",
          variantStyles[variant],
          sizeStyles[size],
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="animate-spin -ml-0.5 h-4 w-4" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        {children}
      </button>
    );
  }
);
Button.displayName = "Button";
