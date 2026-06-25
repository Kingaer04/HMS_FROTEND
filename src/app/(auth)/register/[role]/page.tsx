import { notFound } from "next/navigation";
import HospitalRegisterForm from "@/components/auth/forms/HospitalRegisterForm";
import DoctorRegisterForm from "@/components/auth/forms/DoctorRegisterForm";
import ReceptionistRegisterForm from "@/components/auth/forms/ReceptionistRegisterForm";
import PatientRegisterForm from "@/components/auth/forms/PatientRegisterForm";
import LabRegisterForm from "@/components/auth/forms/LabRegisterForm";

const VALID_ROLES = ["hospital", "doctor", "receptionist", "patient", "lab-technician"] as const;
type RoleSlug = typeof VALID_ROLES[number];

const FORM_MAP: Record<RoleSlug, React.ComponentType> = {
  "hospital":        HospitalRegisterForm,
  "doctor":          DoctorRegisterForm,
  "receptionist":    ReceptionistRegisterForm,
  "patient":         PatientRegisterForm,
  "lab-technician":  LabRegisterForm,
};

export default function RegisterPage({ params }: { params: { role: string } }) {
  if (!VALID_ROLES.includes(params.role as RoleSlug)) notFound();
  const Form = FORM_MAP[params.role as RoleSlug];
  return <Form />;
}

export function generateStaticParams() {
  return VALID_ROLES.map((role) => ({ role }));
}
