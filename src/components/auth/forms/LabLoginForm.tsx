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

const ACCENT = "#38BDF8";

export default function LabLoginForm() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [globalError, setGlobalError] = useState("");

  function validate() {
    const e: Record<string, string> = {};
    if (!email.trim()) e.email = "Email is required";
    if (!password) e.password = "Password is required";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setGlobalError(""); setLoading(true);
    try {
      const { data } = await authService.loginLabTech({ email, password });
      setAuth(data.user, data.token, data.refreshToken);
      Cookies.set("hms-token", data.token, { expires: 1 });
      Cookies.set("hms-role", data.user.role, { expires: 1 });
      router.push("/lab");
    } catch (err: any) {
      setGlobalError(err?.response?.data?.message || "Invalid email or password.");
    } finally { setLoading(false); }
  }

  return (
    <AuthShell role="lab-technician" mode="login">
      <form onSubmit={handleSubmit} noValidate>
        <FormHeading title="Lab portal" subtitle="Process pending requests and upload test results." accentColor={ACCENT} />
        {globalError && (
          <div style={{ marginBottom: 20, padding: "12px 16px", borderRadius: 10, fontSize: 13,
            background: "#F0F9FF", border: "1px solid #BAE6FD", color: "#0369A1", display: "flex", gap: 8 }}>
            <span>⚠</span>{globalError}
          </div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <FormField label="Email address" name="email" type="email" placeholder="lab@hospital.ng"
            value={email} onChange={(v) => { setEmail(v); setErrors(p => ({ ...p, email: "" })); }}
            error={errors.email} required accentColor={ACCENT} autoComplete="email" />
          <FormField label="Password" name="password" type="password" placeholder="Your password"
            value={password} onChange={(v) => { setPassword(v); setErrors(p => ({ ...p, password: "" })); }}
            error={errors.password} required accentColor={ACCENT} autoComplete="current-password" />
        </div>
        <div style={{ textAlign: "right", margin: "10px 0 24px" }}>
          <a href="#" style={{ fontSize: 13, fontWeight: 600, color: ACCENT, textDecoration: "none" }}>Forgot password?</a>
        </div>
        <SubmitButton label="Sign in" loading={loading} color={ACCENT} />
      </form>
    </AuthShell>
  );
}
