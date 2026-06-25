"use client";
import React from "react";
import AuthShell from "@/components/auth/AuthShell";
import { FormHeading } from "@/components/auth/FormHeading";
export default function PatientRegisterForm() {
  return (
    <AuthShell role="patient" mode="register">
      <FormHeading title="Patient registration" subtitle="Coming in Sprint 05." accentColor="#7C3AED" />
      <p style={{ color: "var(--gray-400)", fontSize: 14 }}>Full form implemented in Sprint 05.</p>
    </AuthShell>
  );
}
