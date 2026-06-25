"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import AuthShell from "@/components/auth/AuthShell";
import { FormField } from "@/components/auth/FormField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { FormHeading } from "@/components/auth/FormHeading";
import authService from "@/services/auth.service";
import { useAuthStore } from "@/store/auth.store";
import Cookies from "js-cookie";

const ACCENT = "#22D3C8";

export default function HospitalLoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [uid, setUid] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState("");

  function validate() {
    const e: Record<string, string> = {};
    if (!uid.trim()) e.uid = "Hospital UID is required";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "At least 6 characters";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setGlobalError(""); setLoading(true);
    try {
      const { data } = await authService.loginHospital({ uid, password });
      setAuth(data.user, data.token, data.refreshToken);
      Cookies.set("hms-token", data.token, { expires: 1 });
      Cookies.set("hms-role", data.user.role, { expires: 1 });
      router.push("/admin");
    } catch (err: any) {
      setGlobalError(err?.response?.data?.message || "Invalid UID or password. Please try again.");
    } finally { setLoading(false); }
  }

  return (
    <AuthShell role="hospital" mode="login">
      <form onSubmit={handleSubmit} noValidate>
        <FormHeading
          title="Sign in"
          subtitle="Enter your hospital credentials to access the admin dashboard."
          accentColor={ACCENT}
        />

        {globalError && (
          <div style={{
            marginBottom: 20, padding: "12px 16px", borderRadius: 10, fontSize: 13,
            background: "#FFF1F1", border: "1px solid #FECACA", color: "#DC2626",
            display: "flex", alignItems: "flex-start", gap: 8,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0, marginTop: 1 }}>
              <circle cx="12" cy="12" r="10" fill="#FEE2E2"/>
              <path d="M12 7v5M12 16h.01" stroke="#DC2626" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            {globalError}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <FormField
            label="Hospital NHIS UID"
            name="uid"
            placeholder="e.g. NHIS-0001-LG"
            value={uid}
            onChange={(v) => { setUid(v); setErrors(p => ({ ...p, uid: "" })); }}
            error={errors.uid}
            hint="Found on your hospital's NHIS registration certificate"
            required
            accentColor={ACCENT}
            autoComplete="username"
          />
          <FormField
            label="Password"
            name="password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(v) => { setPassword(v); setErrors(p => ({ ...p, password: "" })); }}
            error={errors.password}
            required
            accentColor={ACCENT}
            autoComplete="current-password"
          />
        </div>

        <div style={{ textAlign: "right", margin: "10px 0 24px" }}>
          <a href="#" style={{ fontSize: 13, fontWeight: 600, color: ACCENT, textDecoration: "none" }}>
            Forgot password?
          </a>
        </div>

        <SubmitButton label="Sign in to HMS" loading={loading} color={ACCENT} />

        {/* Role switcher */}
        <div style={{
          marginTop: 24, paddingTop: 20, borderTop: "1px solid #F0F3FD",
        }}>
          <p style={{ fontSize: 12, color: "#B0B8CC", textAlign: "center", marginBottom: 12 }}>Sign in as a different role</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {[
              { role: "doctor",         label: "Doctor",      color: "#22D3C8" },
              { role: "receptionist",   label: "Receptionist",color: "#FB923C" },
              { role: "patient",        label: "Patient",     color: "#A78BFA" },
              { role: "lab-technician", label: "Lab Tech",    color: "#38BDF8" },
            ].map(({ role, label, color }) => (
              <a
                key={role}
                href={`/login/${role}`}
                style={{
                  display: "block", padding: "8px 12px", borderRadius: 8, textAlign: "center",
                  background: color + "10", border: `1px solid ${color}30`,
                  fontSize: 12, fontWeight: 600, color, textDecoration: "none",
                  transition: "all 0.15s",
                }}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </form>
    </AuthShell>
  );
}
