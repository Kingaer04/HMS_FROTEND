export type VisitStatus =
  | "CheckedIn"
  | "Assigned"
  | "GrantedEntry"
  | "InConsultation"
  | "ConsultationEnded"
  | "CheckedOut";

export interface Visit {
  id: string;
  patientId: string;
  patientName: string;
  doctorId?: string;
  doctorName?: string;
  status: VisitStatus;
  checkinAt: string;
  checkoutAt?: string;
  queueNumber: number;
}
