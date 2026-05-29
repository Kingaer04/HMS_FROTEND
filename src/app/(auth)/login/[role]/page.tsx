// Sprint 02-06: Login pages implemented per role
// This is the dynamic route handler - actual forms added in respective sprints
import { notFound } from "next/navigation";

const VALID_ROLES = ["hospital", "doctor", "receptionist", "patient", "lab-technician"];

// 1. Turned this into an async function and typed params as a Promise
export default async function LoginPage({ params }: { params: Promise<{ role: string }> }) {
  // 2. Await the params before reading from it
  const resolvedParams = await params;
  const role = resolvedParams.role;

  if (!VALID_ROLES.includes(role)) notFound();

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">H</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">HMS</h1>
          <p className="text-gray-500 mt-1 capitalize">
            {role.replace("-", " ")} Login
          </p>
          <p className="text-xs text-amber-600 bg-amber-50 rounded px-2 py-1 mt-2 inline-block">
            Sprint 02–06: Login form implemented here
          </p>
        </div>
      </div>
    </div>
  );
}

// 3. Mark generateStaticParams as async to cleanly match the asynchronous dynamic parameters API
export async function generateStaticParams() {
  return VALID_ROLES.map((role) => ({ role }));
}