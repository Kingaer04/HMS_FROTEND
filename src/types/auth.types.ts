export type Role =
  | "HospitalAdmin"
  | "Doctor"
  | "Receptionist"
  | "Patient"
  | "LabTechnician";

export type RoleSlug =
  | "hospital"
  | "doctor"
  | "receptionist"
  | "patient"
  | "lab-technician";

export const ROLE_ROUTES: Record<Role, string> = {
  HospitalAdmin: "/admin",
  Doctor: "/doctor",
  Receptionist: "/receptionist",
  Patient: "/patient",
  LabTechnician: "/lab",
};

export const ROLE_SLUG_MAP: Record<RoleSlug, Role> = {
  hospital: "HospitalAdmin",
  doctor: "Doctor",
  receptionist: "Receptionist",
  patient: "Patient",
  "lab-technician": "LabTechnician",
};

export interface AuthUser {
  id: string;
  email: string;
  role: Role;
  hospitalId?: string;
  firstName?: string;
  lastName?: string;
  fullName?: string;
}

export interface TokenResponse {
  token: string;
  refreshToken: string;
  user: AuthUser;
}

export interface LoginHospitalDto {
  uid: string;
  password: string;
}

export interface LoginDto {
  email: string;
  password: string;
}

export interface RegisterHospitalDto {
  nhisUid: string;
  hospitalName: string;
  email: string;
  password: string;
  phoneNumber: string;
  address: string;
}

export interface RegisterDoctorDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  specialization: string;
  licenseNumber: string;
  departmentId?: string;
}

export interface RegisterReceptionistDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
}

export interface RegisterPatientDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  dateOfBirth: string;
  gender: string;
  phoneNumber: string;
  address: string;
  nhisUid?: string;
}

export interface RegisterLabTechDto {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  labLicenseNumber: string;
}
