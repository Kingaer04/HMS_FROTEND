"use client";
import React, { useState } from "react";

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  hint?: string;
  required?: boolean;
  disabled?: boolean;
  accentColor?: string;
  verified?: boolean;
  checking?: boolean;
  autoComplete?: string;
}

export function FormField({
  label, name, type = "text", placeholder, value, onChange,
  error, hint, required, disabled, accentColor = "#22D3C8",
  verified, checking, autoComplete,
}: FormFieldProps) {
  const [focused, setFocused] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const isPw = type === "password";

  const borderColor = error ? "#F87171" : focused ? accentColor : "#E4E8F0";
  const shadow = error
    ? "0 0 0 3px #F8717122"
    : focused ? `0 0 0 3px ${accentColor}20` : "none";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label htmlFor={name} style={{ fontSize: 13, fontWeight: 600, color: "#3D4F63", display: "block" }}>
        {label}{required && <span style={{ color: "#F87171", marginLeft: 3 }}>*</span>}
      </label>
      <div style={{ position: "relative" }}>
        <input
          id={name} name={name}
          type={isPw ? (showPw ? "text" : "password") : type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autoComplete}
          onChange={e => onChange(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          style={{
            width: "100%", height: 46,
            padding: "0 44px 0 14px",
            borderRadius: 10,
            border: `1.5px solid ${borderColor}`,
            background: disabled ? "#FAFBFD" : "#fff",
            color: "#060D1A", fontSize: 14,
            fontFamily: "var(--font-sans)",
            outline: "none",
            boxShadow: shadow,
            transition: "border-color 0.15s, box-shadow 0.15s",
          }}
        />
        <div style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", display: "flex", alignItems: "center", gap: 6 }}>
          {checking && (
            <svg style={{ animation: "spin 1s linear infinite", width: 16, height: 16 }} viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="#E4E8F0" strokeWidth="3" />
              <path d="M12 2a10 10 0 0 1 10 10" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
            </svg>
          )}
          {verified && !checking && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#4ADE8020" />
              <path d="M7 12l3.5 3.5L17 8.5" stroke="#4ADE80" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          )}
          {error && !checking && !verified && (
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" fill="#F8717122" />
              <path d="M12 7v5M12 16h.01" stroke="#F87171" strokeWidth="2" strokeLinecap="round" />
            </svg>
          )}
          {isPw && (
            <button type="button" onClick={() => setShowPw(s => !s)}
              style={{ background: "none", border: "none", cursor: "pointer", padding: 0, color: "#8896A8", display: "flex", alignItems: "center" }}>
              {showPw ? (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24M1 1l22 22" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          )}
        </div>
      </div>
      {error && <p style={{ fontSize: 12, color: "#F87171", margin: 0 }}>{error}</p>}
      {hint && !error && <p style={{ fontSize: 12, color: "#B0B8CC", margin: 0 }}>{hint}</p>}
    </div>
  );
}
