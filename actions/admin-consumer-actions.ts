"use server";

import x_axios from "@/lib/axios";
import { formatError } from "@/lib/utils";
import type { ApiResponse } from "@/types";

export interface Consumer {
  id: string;
  email: string;
  phone: string;
  firstName: string;
  lastName: string;
  role: "CONSUMER";
  status: "ACTIVE" | "SUSPENDED" | "REJECTED";
  emailVerified: boolean;
  phoneVerified: boolean;
  lastLoginAt?: string;
  createdAt: string;
  walletBalance: number;
  walletAvailableBalance: number;
}

export interface ConsumerDetails {
  user: {
    id: string;
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    role: "CONSUMER";
    status: string;
    dateOfBirth?: string;
    nidNumber?: string;
    emailVerified: boolean;
    phoneVerified: boolean;
    lastLoginAt?: string;
    createdAt: string;
    updatedAt?: string;
  };
  wallet: {
    balance: number;
    availableBalance: number;
    pendingBalance: number;
    currency: string;
    dailyLimit: number;
    monthlyLimit: number;
    dailySpent: number;
    monthlySpent: number;
    lastTransactionAt?: string;
  };
  recentTransactions: Array<{
    id: string;
    transactionId: string;
    type: string;
    amount: number;
    fee: number;
    status: string;
    createdAt: string;
  }>;
}

export interface ConsumerListResponse {
  consumers: Consumer[];
  pagination: {
    offset: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export interface ConsumerFilter {
  search?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}

export async function CONSUMER_LIST(
  offset: number,
  limit: number,
  filter: ConsumerFilter = {}
): Promise<ApiResponse<ConsumerListResponse>> {
  try {
    const response = await x_axios.post("/admin/consumers/list", {
      offset,
      limit,
      ...filter,
    });
    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return formatError(error);
  }
}

export async function CONSUMER_DETAILS(
  id: string
): Promise<ApiResponse<ConsumerDetails>> {
  try {
    const response = await x_axios.get(`/admin/consumers/${id}`);
    return { success: true, data: response.data.data };
  } catch (error) {
    return formatError(error);
  }
}

export async function CONSUMER_UPDATE_STATUS(
  id: string,
  status: "ACTIVE" | "SUSPENDED" | "REJECTED"
): Promise<ApiResponse> {
  try {
    await x_axios.patch(`/admin/consumers/${id}/status`, { status });
    return { success: true };
  } catch (error) {
    return formatError(error);
  }
}

export async function CONSUMER_TRANSACTIONS(
  id: string,
  page: number = 1,
  limit: number = 20
): Promise<ApiResponse> {
  try {
    const response = await x_axios.get(
      `/admin/consumers/${id}/transactions?page=${page}&limit=${limit}`
    );
    return { success: true, data: response.data.data };
  } catch (error) {
    return formatError(error);
  }
}

