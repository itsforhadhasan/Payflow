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
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: "CONSUMER" | "AGENT" | "ADMIN";
  status: "ACTIVE" | "PENDING" | "SUSPENDED" | "REJECTED";
  emailVerified?: boolean;
  phoneVerified?: boolean;
  dateOfBirth?: string;
  nidNumber?: string;
  createdAt: string;
  updatedAt?: string;
  // Admin specific
  name?: string;
  lastLoginAt?: string;
  // Agent specific
  agent?: {
    id: number;
    agentCode: string;
    businessName: string;
    businessAddress: string;
    status: string;
    totalCashouts?: number;
    totalCommissionEarned?: number;
    approvedBy?: string;
    approvedAt?: string;
    createdAt?: string;
  };
  // Wallet (Consumer & Agent)
  wallet?: {
    balance: number;
    availableBalance: number;
    pendingBalance: number;
    currency: string;
    dailyLimit: number;
    monthlyLimit: number;
    dailySpent: number;
    monthlySpent: number;
  };
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
