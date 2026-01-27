// Common types for the application
export enum UserTypes {
  Consumer = "Consumer",
  Agent = "Agent",
  Admin = "Admin",
}

export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
}

export interface Profile {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
  status: boolean;
  isVerified: boolean;
  userType?: string;
  phone?: string;
  address?: string;
  createdAt: string;
  updatedAt?: string;
}

export type Admin = Profile;

export interface LoginData {
  token: string;
  profile?: Profile;
}

export interface AdminListResponse {
  users: Admin[];
  usersFetched: number;
  usersMatched: number;
}

export interface AdminFilter {
  search?: string;
  createdAtStart?: string;
  createdAtEnd?: string;
}


// Patient types
export interface PersonalHistory {
  complaints?: string;
  comorbidity?: string;
  past_history?: string;
  family_history?: string;
  menstrual_history?: string;
  obsteric_history?: string;
  diagnosis?: string;
  stage?: string;
  ihc?: string;
  performance_status?: string;
}

export interface PreviousTreatment {
  treatment_name?: string;
  comments?: string;
  date_of_treatment?: string;
}

export interface PreviousInvestigation {
  lab_test_name?: string;
  lab_test_comments?: string;
  radiological_test?: string;
  radiological_comment?: string;
  instrumental_test?: string;
  instrumental_comment?: string;
}

export interface Patient {
  _id: string;
  id: string;
  full_name: string;
  age: number;
  gender: "Male" | "Female" | "Other";
  date_of_birth?: string;
  blood_group: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-";
  nid: string;
  phone: string;
  email?: string;
  histo_pathology?: string;
  metastatic_site?: string;
  personal_history?: PersonalHistory[];
  previous_treatments?: PreviousTreatment[];
  previous_investigations?: PreviousInvestigation[];
  doctor: string;
  createdAt: string;
  updatedAt?: string;
}

export interface PatientListResponse {
  patients: Patient[];
  patientsFetched: number;
  patientsMatched: number;
}

export interface PatientFilter {
  search?: string;
  createdAtStart?: string;
  createdAtEnd?: string;
}
