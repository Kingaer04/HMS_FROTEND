import { notFound } from "next/navigation";

const VALID_ROLES = ["hospital", "doctor", "receptionist", "patient", "lab-technician"];

export default function RegisterPage({ params }: { params: { role: string } }) {
  if (!VALID_ROLES.includes(params.role)) notFound();

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <h1 className="text-2xl font-bold text-center">Register</h1>
        <p className="text-center text-gray-500 mt-1 capitalize">{params.role.replace("-", " ")}</p>
        <p className="text-xs text-center text-amber-600 mt-3">Sprint 02–06: Registration form implemented here</p>
      </div>
    </div>
  );
}

export function generateStaticParams() {
  return VALID_ROLES.map((role) => ({ role }));
}
