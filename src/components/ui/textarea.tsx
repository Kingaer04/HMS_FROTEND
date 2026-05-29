"use client";
import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, className, id, ...props }, ref) => {
    const areaId = id || label?.toLowerCase().replace(/\s+/g, "-");
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label htmlFor={areaId} className="text-sm font-medium text-text-primary">
            {label}{props.required && <span className="text-red-500 ml-0.5">*</span>}
          </label>
        )}
        <textarea
          ref={ref}
          id={areaId}
          className={cn(
            "w-full rounded-lg border border-border-strong bg-white px-3 py-2.5 text-sm text-text-primary",
            "placeholder:text-text-muted resize-y min-h-[100px]",
            "transition-all duration-150",
            "focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20",
            "disabled:opacity-50",
            error && "border-red-400",
            className
          )}
          {...props}
        />
        {error && <p className="text-xs text-red-500">⚠ {error}</p>}
      </div>
    );
  }
);
Textarea.displayName = "Textarea";
