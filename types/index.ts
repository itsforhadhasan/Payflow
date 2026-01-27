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

// Base profile structure for Consumer and Agent
export interface UserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: "CONSUMER" | "AGENT";
  status: "ACTIVE" | "PENDING" | "SUSPENDED" | "REJECTED";
  emailVerified?: boolean;
  phoneVerified?: boolean;
  dateOfBirth?: string;
  nidNumber?: string;
  createdAt: string;
  updatedAt?: string;
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

// Admin profile has a different structure
export interface AdminProfile {
  id: string;
  email: string;
  name: string;
  status: "ACTIVE" | "SUSPENDED";
  lastLoginAt?: string;
  createdAt: string;
  updatedAt?: string;
}

// Union type for all profiles
export type Profile = UserProfile | AdminProfile;

// Type for Admin in the admin list
export type Admin = AdminProfile;

// Type guard functions
export function isAdminProfile(profile: Profile): profile is AdminProfile {
  return 'name' in profile && !('firstName' in profile);
}

export function isUserProfile(profile: Profile): profile is UserProfile {
  return 'firstName' in profile && 'lastName' in profile;
}

// Helper to get display name from any profile
export function getProfileDisplayName(profile: Profile): string {
  if (isAdminProfile(profile)) {
    return profile.name;
  }
  return profile.firstName;
}

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
