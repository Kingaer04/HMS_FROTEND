export type LabRequestStatus = "Pending" | "Received" | "Processing" | "Done";

export interface LabRequest {
  id: string;
  patientId: string;
  patientName: string;
  visitId: string;
  testName: string;
  testCode: string;
  status: LabRequestStatus;
  results?: string;
  fileUrl?: string;
  requestedAt: string;
  completedAt?: string;
}

export interface LabCatalogueItem {
  id: string;
  name: string;
  code: string;
  normalRange?: string;
  price: number;
}
