"use client";
import React from "react";

interface SubmitButtonProps {
  label: string;
  loading?: boolean;
  disabled?: boolean;
  color?: string;
}

export function SubmitButton({ label, loading, disabled, color = "#22D3C8" }: SubmitButtonProps) {
  const isOff = disabled || loading;
  return (
    <button
      type="submit"
      disabled={isOff}
      style={{
        width: "100%", height: 48,
        background: isOff ? "#F0F3FD" : color,
        color: isOff ? "#B0B8CC" : "#fff",
        border: "none", borderRadius: 12,
        fontSize: 15, fontWeight: 700,
        fontFamily: "var(--font-sans)",
        cursor: isOff ? "not-allowed" : "pointer",
        display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
        transition: "all 0.15s",
        boxShadow: isOff ? "none" : `0 4px 16px ${color}50, 0 1px 3px ${color}30`,
        letterSpacing: "-0.01em",
      }}
      onMouseEnter={e => { if (!isOff) { const b = e.currentTarget as HTMLButtonElement; b.style.transform = "translateY(-1px)"; b.style.boxShadow = `0 8px 24px ${color}60, 0 2px 6px ${color}40`; }}}
      onMouseLeave={e => { const b = e.currentTarget as HTMLButtonElement; b.style.transform = ""; b.style.boxShadow = isOff ? "none" : `0 4px 16px ${color}50, 0 1px 3px ${color}30`; }}
      onMouseDown={e => { if (!isOff) (e.currentTarget as HTMLButtonElement).style.transform = "translateY(0px)"; }}
    >
      {loading && (
        <svg style={{ animation: "spin 1s linear infinite", width: 16, height: 16 }} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="3" />
          <path d="M12 2a10 10 0 0 1 10 10" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
        </svg>
      )}
      {label}
    </button>
  );
}
