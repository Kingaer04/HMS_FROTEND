export interface Vitals {
  bloodPressure?: string;
  temperature?: number;
  weight?: number;
  height?: number;
  pulse?: number;
  spO2?: number;
  recordedAt: string;
}

export interface DoctorNote {
  id: string;
  doctorId: string;
  doctorName: string;
  content: string;
  visitId: string;
  createdAt: string;
  updatedAt?: string;
}

export interface Prescription {
  id: string;
  drugName: string;
  dosage: string;
  frequency: string;
  duration: string;
  notes?: string;
  visitId: string;
  createdAt: string;
}

export interface MedicalRecord {
  patientId: string;
  vitalsHistory: Vitals[];
  notes: DoctorNote[];
  prescriptions: Prescription[];
  allergies?: string;
}
