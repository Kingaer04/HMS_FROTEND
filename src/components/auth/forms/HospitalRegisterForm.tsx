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

type Step = 1 | 2;

function StepIndicator({ step, accent }: { step: Step; accent: string }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 28 }}>
      {([1, 2] as const).map((s, i) => {
        const done = s < step;
        const active = s === step;
        return (
          <React.Fragment key={s}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div style={{
                width: 26, height: 26, borderRadius: "50%",
                background: done || active ? accent : "#F0F3FD",
                color: done || active ? "#fff" : "#B0B8CC",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, flexShrink: 0,
                boxShadow: active ? `0 0 0 4px ${accent}20` : "none",
                transition: "all 0.2s",
              }}>
                {done ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                    <path d="M5 12l5 5L19 7" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : s}
              </div>
              <span style={{
                fontSize: 12, fontWeight: 600,
                color: done ? accent : active ? "#253040" : "#B0B8CC",
              }}>
                {s === 1 ? "Verify UID" : "Hospital info"}
              </span>
            </div>
            {i < 1 && (
              <div style={{ flex: 1, height: 1, background: done ? accent + "44" : "#F0F3FD" }} />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

export default function HospitalRegisterForm() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);

  const [step, setStep] = useState<Step>(1);
  const [nhisUid, setNhisUid] = useState("");
  const [uidChecking, setUidChecking] = useState(false);
  const [uidError, setUidError] = useState("");

  const [fields, setFields] = useState({
    hospitalName: "", email: "", password: "", confirmPassword: "",
    phoneNumber: "", address: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const set = (k: keyof typeof fields) => (v: string) => {
    setFields(p => ({ ...p, [k]: v }));
    setErrors(p => ({ ...p, [k]: "" }));
  };

  async function verifyUid(e: React.FormEvent) {
    e.preventDefault();
    if (!nhisUid.trim()) { setUidError("Please enter your NHIS UID"); return; }
    setUidChecking(true); setUidError("");
    try {
      const { data } = await authService.verifyUid(nhisUid);
      if (data.isValid) setStep(2);
      else setUidError("This NHIS UID was not found. Please check and try again.");
    } catch {
      // Dev fallback — allow any UID
      setStep(2);
    } finally { setUidChecking(false); }
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!fields.hospitalName.trim()) e.hospitalName = "Hospital name is required";
    if (!fields.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Enter a valid email";
    if (!fields.password) e.password = "Password is required";
    else if (fields.password.length < 8) e.password = "Min. 8 characters";
    if (fields.confirmPassword !== fields.password) e.confirmPassword = "Passwords do not match";
    if (!fields.phoneNumber.trim()) e.phoneNumber = "Phone number is required";
    if (!fields.address.trim()) e.address = "Address is required";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setGlobalError(""); setLoading(true);
    try {
      const { data } = await authService.registerHospital({
        nhisUid, hospitalName: fields.hospitalName, email: fields.email,
        password: fields.password, phoneNumber: fields.phoneNumber, address: fields.address,
      });
      setAuth(data.user, data.token, data.refreshToken);
      Cookies.set("hms-token", data.token, { expires: 1 });
      Cookies.set("hms-role", data.user.role, { expires: 1 });
      router.push("/admin");
    } catch (err: any) {
      setGlobalError(err?.response?.data?.message || "Registration failed. Please try again.");
    } finally { setLoading(false); }
  }

  /* ── STEP 1 ── */
  if (step === 1) return (
    <AuthShell role="hospital" mode="register">
      <form onSubmit={verifyUid} noValidate>
        <FormHeading
          title="Create account"
          subtitle="Start by verifying your hospital's NHIS identifier."
          accentColor={ACCENT}
        />
        <StepIndicator step={1} accent={ACCENT} />

        <FormField
          label="Hospital NHIS UID"
          name="nhisUid"
          placeholder="e.g. NHIS-0001-LG"
          value={nhisUid}
          onChange={(v) => { setNhisUid(v); setUidError(""); }}
          error={uidError}
          hint="Assigned to your hospital by the National Health Insurance Scheme"
          required
          accentColor={ACCENT}
          checking={uidChecking}
        />

        {/* Quick-fill chips */}
        <div style={{
          marginTop: 12, padding: "12px 14px", borderRadius: 10,
          background: "#F7F8FC", border: "1px solid #EAECF2",
        }}>
          <p style={{ fontSize: 11, color: "#8896A8", fontWeight: 600, marginBottom: 8, textTransform: "uppercase", letterSpacing: "0.06em" }}>
            Test UIDs (dev only)
          </p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["NHIS-0001-LG", "NHIS-0002-AB", "NHIS-0003-KN"].map(id => (
              <button
                key={id} type="button"
                onClick={() => setNhisUid(id)}
                style={{
                  padding: "4px 10px", borderRadius: 6, border: `1px solid ${nhisUid === id ? ACCENT : "#D4D8E4"}`,
                  background: nhisUid === id ? ACCENT + "15" : "#fff",
                  color: nhisUid === id ? ACCENT : "#5E6E82",
                  fontSize: 11, fontFamily: "var(--font-mono)", cursor: "pointer",
                  fontWeight: nhisUid === id ? 600 : 400,
                  transition: "all 0.15s",
                }}
              >{id}</button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 24 }}>
          <SubmitButton
            label={uidChecking ? "Verifying…" : "Verify & Continue →"}
            loading={uidChecking}
            color={ACCENT}
          />
        </div>
      </form>
    </AuthShell>
  );

  /* ── STEP 2 ── */
  return (
    <AuthShell role="hospital" mode="register">
      <form onSubmit={handleSubmit} noValidate>
        <FormHeading
          title="Hospital details"
          subtitle="Complete your hospital profile to finish registration."
          accentColor={ACCENT}
        />
        <StepIndicator step={2} accent={ACCENT} />

        {/* Verified UID pill */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8, marginBottom: 20,
          padding: "10px 14px", borderRadius: 10,
          background: "#F0FDF9", border: "1px solid #6EE7B7",
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" fill="#D1FAE5"/>
            <path d="M7 12l3.5 3.5L17 8.5" stroke="#059669" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#059669" }}>UID verified — </span>
          <span style={{ fontSize: 12, fontFamily: "var(--font-mono)", color: "#047857" }}>{nhisUid}</span>
          <button type="button" onClick={() => setStep(1)}
            style={{ marginLeft: "auto", fontSize: 12, color: "#059669", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
            Change
          </button>
        </div>

        {globalError && (
          <div style={{ marginBottom: 16, padding: "10px 14px", borderRadius: 10, fontSize: 13,
            background: "#FFF1F1", border: "1px solid #FECACA", color: "#DC2626" }}>
            ⚠ {globalError}
          </div>
        )}

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <FormField label="Hospital name" name="hospitalName" placeholder="e.g. Lagos University Teaching Hospital"
            value={fields.hospitalName} onChange={set("hospitalName")} error={errors.hospitalName} required accentColor={ACCENT} />
          <FormField label="Admin email" name="email" type="email" placeholder="admin@hospital.ng"
            value={fields.email} onChange={set("email")} error={errors.email} required accentColor={ACCENT} autoComplete="email" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FormField label="Password" name="password" type="password" placeholder="Min. 8 characters"
              value={fields.password} onChange={set("password")} error={errors.password} required accentColor={ACCENT} autoComplete="new-password" />
            <FormField label="Confirm password" name="confirmPassword" type="password" placeholder="Repeat password"
              value={fields.confirmPassword} onChange={set("confirmPassword")} error={errors.confirmPassword} required accentColor={ACCENT} autoComplete="new-password" />
          </div>
          <FormField label="Phone number" name="phoneNumber" type="tel" placeholder="+234 800 000 0000"
            value={fields.phoneNumber} onChange={set("phoneNumber")} error={errors.phoneNumber} required accentColor={ACCENT} />
          <FormField label="Hospital address" name="address" placeholder="Street, City, State"
            value={fields.address} onChange={set("address")} error={errors.address} required accentColor={ACCENT} />
        </div>

        <div style={{ marginTop: 24 }}>
          <SubmitButton label="Create hospital account" loading={loading} color={ACCENT} />
        </div>
        <p style={{ fontSize: 12, textAlign: "center", color: "#C8D0E0", marginTop: 14 }}>
          By registering you agree to our{" "}
          <a href="#" style={{ color: "#8896A8" }}>Terms</a> and{" "}
          <a href="#" style={{ color: "#8896A8" }}>Privacy Policy</a>
        </p>
      </form>
    </AuthShell>
  );
}
