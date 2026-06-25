"use client";
import React from "react";
import AuthShell from "@/components/auth/AuthShell";
import { FormHeading } from "@/components/auth/FormHeading";
export default function LabRegisterForm() {
  return (
    <AuthShell role="lab-technician" mode="register">
      <FormHeading title="Lab technician registration" subtitle="Coming in Sprint 06." accentColor="#0891B2" />
      <p style={{ color: "var(--gray-400)", fontSize: 14 }}>Full form implemented in Sprint 06.</p>
    </AuthShell>
  );
}
