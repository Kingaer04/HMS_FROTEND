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

const SPECIALIZATIONS = [
  "Cardiology","Neurology","Paediatrics","Obstetrics & Gynaecology",
  "General Surgery","Internal Medicine","Orthopaedics","Dermatology",
  "Ophthalmology","ENT","Psychiatry","Radiology","Anaesthesiology","Family Medicine",
];

export default function DoctorRegisterForm() {
  const router = useRouter();
  const setAuth = useAuthStore((s) => s.setAuth);
  const [fields, setFields] = useState({
    firstName: "", lastName: "", email: "", password: "",
    confirmPassword: "", phoneNumber: "", specialization: "", licenseNumber: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [globalError, setGlobalError] = useState("");

  const set = (k: keyof typeof fields) => (v: string) => {
    setFields(p => ({ ...p, [k]: v }));
    setErrors(p => ({ ...p, [k]: "" }));
  };

  function validate() {
    const e: Record<string, string> = {};
    if (!fields.firstName.trim()) e.firstName = "Required";
    if (!fields.lastName.trim()) e.lastName = "Required";
    if (!fields.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = "Invalid email";
    if (!fields.password) e.password = "Required";
    else if (fields.password.length < 8) e.password = "Min. 8 characters";
    if (fields.confirmPassword !== fields.password) e.confirmPassword = "Passwords don't match";
    if (!fields.phoneNumber.trim()) e.phoneNumber = "Required";
    if (!fields.specialization) e.specialization = "Select a specialization";
    if (!fields.licenseNumber.trim()) e.licenseNumber = "License number is required";
    return e;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({}); setGlobalError(""); setLoading(true);
    try {
      const { data } = await authService.registerDoctor({
        firstName: fields.firstName, lastName: fields.lastName,
        email: fields.email, password: fields.password,
        phoneNumber: fields.phoneNumber, specialization: fields.specialization,
        licenseNumber: fields.licenseNumber,
      });
      setAuth(data.user, data.token, data.refreshToken);
      Cookies.set("hms-token", data.token, { expires: 1 });
      Cookies.set("hms-role", data.user.role, { expires: 1 });
      router.push("/doctor");
    } catch (err: any) {
      setGlobalError(err?.response?.data?.message || "Registration failed.");
    } finally { setLoading(false); }
  }

  return (
    <AuthShell role="doctor" mode="register">
      <form onSubmit={handleSubmit} noValidate>
        <FormHeading title="Create doctor account" subtitle="Register to access your patients and consultation tools." accentColor={ACCENT} />
        {globalError && (
          <div style={{ marginBottom: 16, padding: "10px 14px", borderRadius: 10, fontSize: 13,
            background: "#FFF1F1", border: "1px solid #FECACA", color: "#DC2626" }}>⚠ {globalError}</div>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FormField label="First name" name="firstName" placeholder="Emeka" value={fields.firstName} onChange={set("firstName")} error={errors.firstName} required accentColor={ACCENT} />
            <FormField label="Last name" name="lastName" placeholder="Okafor" value={fields.lastName} onChange={set("lastName")} error={errors.lastName} required accentColor={ACCENT} />
          </div>
          <FormField label="Email address" name="email" type="email" placeholder="dr.okafor@hospital.ng" value={fields.email} onChange={set("email")} error={errors.email} required accentColor={ACCENT} autoComplete="email" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <FormField label="Password" name="password" type="password" placeholder="Min. 8 chars" value={fields.password} onChange={set("password")} error={errors.password} required accentColor={ACCENT} autoComplete="new-password" />
            <FormField label="Confirm" name="confirmPassword" type="password" placeholder="Repeat" value={fields.confirmPassword} onChange={set("confirmPassword")} error={errors.confirmPassword} required accentColor={ACCENT} autoComplete="new-password" />
          </div>
          <FormField label="Phone number" name="phoneNumber" type="tel" placeholder="+234 800 000 0000" value={fields.phoneNumber} onChange={set("phoneNumber")} error={errors.phoneNumber} required accentColor={ACCENT} />

          {/* Specialization */}
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 13, fontWeight: 600, color: "#3D4F63" }}>
              Specialization <span style={{ color: "#F87171" }}>*</span>
            </label>
            <div style={{ position: "relative" }}>
              <select
                value={fields.specialization}
                onChange={e => set("specialization")(e.target.value)}
                style={{
                  width: "100%", height: 46, padding: "0 40px 0 14px",
                  borderRadius: 10, appearance: "none",
                  border: `1.5px solid ${errors.specialization ? "#F87171" : "#E4E8F0"}`,
                  background: "#fff", color: fields.specialization ? "#060D1A" : "#B0B8CC",
                  fontSize: 14, fontFamily: "var(--font-sans)", outline: "none", cursor: "pointer",
                }}
              >
                <option value="">Select specialization</option>
                {SPECIALIZATIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              <svg style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", pointerEvents: "none" }} width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M6 9l6 6 6-6" stroke="#8896A8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            {errors.specialization && <p style={{ fontSize: 12, color: "#F87171", margin: 0 }}>{errors.specialization}</p>}
          </div>

          <FormField label="Medical license number" name="licenseNumber" placeholder="e.g. MDCN-12345" value={fields.licenseNumber} onChange={set("licenseNumber")} error={errors.licenseNumber} required accentColor={ACCENT} hint="Issued by the Medical and Dental Council of Nigeria" />
        </div>
        <div style={{ marginTop: 24 }}>
          <SubmitButton label="Create account" loading={loading} color={ACCENT} />
        </div>
      </form>
    </AuthShell>
  );
}
