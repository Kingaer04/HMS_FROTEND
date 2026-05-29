export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  dateOfBirth: string;
  gender: string;
  address: string;
  nhisUid?: string;
  isLocked: boolean;
  isTemporary: boolean;
  createdAt: string;
}

export interface PatientSearchResult {
  id: string;
  fullName: string;
  phoneNumber: string;
  nhisUid?: string;
  isLocked: boolean;
}
