"use server";

import x_axios from "@/lib/axios";
import { formatError } from "@/lib/utils";
import type { ApiResponse } from "@/types";

export interface DashboardAnalytics {
  users: {
    total: number;
    active: number;
    pending: number;
    suspended: number;
    consumer: number;
    agent: number;
  };
  agents: {
    total: number;
    active: number;
    pending: number;
  };
  transactions: {
    total: number;
    completed: number;
    pending: number;
    failed: number;
    byType: {
      sendMoney: { count: number; volume: number };
      addMoney: { count: number; volume: number };
      cashOut: { count: number; volume: number };
      billPayment: { count: number; volume: number };
    };
  };
  platform: {
    totalBalance: number;
    revenueCollected: number;
    bonusGiven: number;
    commissionsPaid: number;
    netRevenue: number;
  };
  recentTransactions: Array<{
    id: string;
    transactionId: string;
    type: string;
    amount: string;
    status: string;
    createdAt: string;
  }>;
}

export interface TransactionAnalytics {
  byType: Record<string, { count: number; volume: number }>;
  byStatus: Record<string, number>;
  timeline: Array<{
    date: string;
    count: number;
    volume: number;
  }>;
  averageTransactionSize: number;
  totalFees: number;
}

export interface ConsumerAnalytics {
  total: number;
  byStatus: {
    active: number;
    pending: number;
    suspended: number;
    rejected: number;
  };
  registrationTrend: Array<{
    date: string;
    count: number;
  }>;
  verification: {
    total: number;
    emailVerified: number;
    phoneVerified: number;
    bothVerified: number;
  };
  transactions: {
    totalSent: {
      count: number;
      amount: number;
    };
    totalCashOut: {
      count: number;
      amount: number;
    };
    totalAddMoney: {
      count: number;
      amount: number;
    };
  };
}

export interface AgentAnalytics {
  totalAgents: number;
  activeAgents: number;
  pendingApprovals: number;
  totalCommissionsPaid: number;
  commissionsThisMonth: number;
  topAgents: Array<{
    agentCode: string;
    businessName: string;
    totalCommission: number;
    transactionsCount: number;
  }>;
  agentGrowth: Array<{
    date: string;
    newAgents: number;
    totalAgents: number;
  }>;
}

export interface RevenueAnalytics {
  totalRevenue: number;
  revenueToday: number;
  revenueThisWeek: number;
  revenueThisMonth: number;
  bySource: Record<string, number>;
  revenueTimeline: Array<{
    date: string;
    revenue: number;
    fees: number;
    commissions: number;
  }>;
  expenses: {
    totalCommissions: number;
    totalBonuses: number;
  };
  netRevenue: number;
}

export async function ANALYTICS_DASHBOARD(): Promise<
  ApiResponse<DashboardAnalytics>
> {
  try {
    const response = await x_axios.get("/admin/analytics/dashboard");
    return { success: true, data: response.data.data };
  } catch (error) {
    return formatError(error);
  }
}

export async function ANALYTICS_TRANSACTIONS(
  startDate?: string,
  endDate?: string,
  groupBy: string = "day"
): Promise<ApiResponse<TransactionAnalytics>> {
  try {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);
    params.append("groupBy", groupBy);

    const response = await x_axios.get(
      `/admin/analytics/transactions?${params.toString()}`
    );
    return { success: true, data: response.data.data };
  } catch (error) {
    return formatError(error);
  }
}

export async function ANALYTICS_CONSUMERS(
  startDate?: string,
  endDate?: string
): Promise<ApiResponse<ConsumerAnalytics>> {
  try {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    const endpoint = params.toString()
      ? `/admin/analytics/consumers?${params.toString()}`
      : "/admin/analytics/consumers";

    const response = await x_axios.get(endpoint);
    return { success: true, data: response.data.data };
  } catch (error) {
    return formatError(error);
  }
}

export async function ANALYTICS_AGENTS(): Promise<
  ApiResponse<AgentAnalytics>
> {
  try {
    const response = await x_axios.get("/admin/analytics/agents");
    return { success: true, data: response.data.data };
  } catch (error) {
    return formatError(error);
  }
}

export async function ANALYTICS_REVENUE(
  startDate?: string,
  endDate?: string
): Promise<ApiResponse<RevenueAnalytics>> {
  try {
    const params = new URLSearchParams();
    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    const response = await x_axios.get(
      `/admin/analytics/revenue?${params.toString()}`
    );
    return { success: true, data: response.data.data };
  } catch (error) {
    return formatError(error);
  }
}

