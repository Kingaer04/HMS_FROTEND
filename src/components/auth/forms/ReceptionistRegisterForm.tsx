"use client";
import React from "react";
import AuthShell from "@/components/auth/AuthShell";
import { FormHeading } from "@/components/auth/FormHeading";
export default function ReceptionistRegisterForm() {
  return (
    <AuthShell role="receptionist" mode="register">
      <FormHeading title="Receptionist registration" subtitle="Coming in Sprint 04." accentColor="#F0820A" />
      <p style={{ color: "var(--gray-400)", fontSize: 14 }}>Full form implemented in Sprint 04.</p>
    </AuthShell>
  );
}
