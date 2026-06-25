import { notFound } from "next/navigation";
import HospitalLoginForm from "@/components/auth/forms/HospitalLoginForm";
import DoctorLoginForm from "@/components/auth/forms/DoctorLoginForm";
import ReceptionistLoginForm from "@/components/auth/forms/ReceptionistLoginForm";
import PatientLoginForm from "@/components/auth/forms/PatientLoginForm";
import LabLoginForm from "@/components/auth/forms/LabLoginForm";

const VALID_ROLES = ["hospital", "doctor", "receptionist", "patient", "lab-technician"] as const;
type RoleSlug = typeof VALID_ROLES[number];

const FORM_MAP: Record<RoleSlug, React.ComponentType> = {
  "hospital":        HospitalLoginForm,
  "doctor":          DoctorLoginForm,
  "receptionist":    ReceptionistLoginForm,
  "patient":         PatientLoginForm,
  "lab-technician":  LabLoginForm,
};

export default function LoginPage({ params }: { params: { role: string } }) {
  if (!VALID_ROLES.includes(params.role as RoleSlug)) notFound();
  const Form = FORM_MAP[params.role as RoleSlug];
  return <Form />;
}

export function generateStaticParams() {
  return VALID_ROLES.map((role) => ({ role }));
}
