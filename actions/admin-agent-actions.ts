"use server";

import x_axios from "@/lib/axios";
import { formatError } from "@/lib/utils";
import type { ApiResponse } from "@/types";

export interface Agent {
  id: string;
  userId: string;
  agentCode: string;
  businessName: string;
  businessAddress: string;
  status: "PENDING" | "ACTIVE" | "SUSPENDED" | "REJECTED";
  totalCommissionEarned: string;
  createdAt: string;
  approvedAt?: string | null;
  user: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    status: string;
  };
  wallet: {
    balance: number;
    availableBalance: number;
  };
}

export interface AgentDetails {
  agent: {
    id: string;
    user_id: string;
    agent_code: string;
    business_name: string;
    business_address: string;
    status: string;
    total_cashouts: number;
    total_commission_earned: string;
    created_at: string;
    updated_at: string;
    approved_at?: string | null;
    approved_by?: string | null;
    rejection_reason?: string | null;
    user: {
      id: string;
      email: string;
      phone: string;
      first_name: string;
      last_name: string;
      status: string;
      created_at: string;
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
    };
    approver?: {
      id: string;
      name: string;
      email: string;
    } | null;
  };
}

export interface AgentTransaction {
  id: string;
  transactionId: string;
  type: string;
  amount: number;
  fee: number;
  totalAmount: number;
  status: string;
  description: string;
  createdAt: string;
  completedAt?: string;
}

export interface AgentTransactionsResponse {
  transactions: AgentTransaction[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface AgentListResponse {
  agents: Agent[];
  pagination: {
    offset: number;
    limit: number;
    total: number;
    hasMore: boolean;
  };
}

export interface AgentFilter {
  search?: string;
  startDate?: string;
  endDate?: string;
  status?: string;
}

export async function AGENT_LIST(
  offset: number,
  limit: number,
  filter: AgentFilter = {}
): Promise<ApiResponse<AgentListResponse>> {
  try {
    const response = await x_axios.post("/admin/agents/list", {
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

export async function AGENT_DETAILS(
  id: string
): Promise<ApiResponse<AgentDetails>> {
  try {
    const response = await x_axios.get(`/admin/agents/${id}`);
    return { success: true, data: response.data.data };
  } catch (error) {
    return formatError(error);
  }
}

export async function AGENT_APPROVE(id: string): Promise<ApiResponse> {
  try {
    await x_axios.post(`/admin/agents/${id}/approve`);
    return { success: true };
  } catch (error) {
    return formatError(error);
  }
}

export async function AGENT_REJECT(
  id: string,
  reason: string
): Promise<ApiResponse> {
  try {
    await x_axios.post(`/admin/agents/${id}/reject`, { reason });
    return { success: true };
  } catch (error) {
    return formatError(error);
  }
}

export async function AGENT_TRANSACTIONS(
  id: string,
  page: number = 1,
  limit: number = 20
): Promise<ApiResponse<AgentTransactionsResponse>> {
  try {
    const response = await x_axios.get(
      `/admin/agents/${id}/transactions?page=${page}&limit=${limit}`
    );
    return { success: true, data: response.data.data };
  } catch (error) {
    return formatError(error);
  }
}

