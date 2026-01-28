"use server";

import x_axios from "@/lib/axios";
import { formatError } from "@/lib/utils";
import type { ApiResponse } from "@/types";

export interface PlatformWalletStats {
  balance: number;
  totalFeesCollected: number;
  totalCommissionsPaid: number;
  totalBonusesGiven: number;
  netRevenue: number;
  lastTransactionAt: string;
}

export interface ReconciliationResult {
  success: boolean;
  currentBalance: number;
  calculatedBalance: number;
  discrepancy: number;
  reconciliationTimestamp: string;
}

export interface PlatformWalletTransaction {
  id: number;
  transactionType: string;
  entryType: "CREDIT" | "DEBIT";
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  relatedTransactionId?: string;
  relatedUserId?: string;
  relatedAgentId?: string | null;
  description: string;
  metadata?: Record<string, any>;
  createdAt: string;
}

export interface PlatformWalletTransactionsResponse {
  transactions: PlatformWalletTransaction[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
  };
}

export interface RevenueSummary {
  allTime: {
    totalFeesCollected: number;
    totalCommissionsPaid: number;
    totalBonusesGiven: number;
    netRevenue: number;
  };
  currentBalance: number;
  lastTransactionAt: string;
}

export async function GET_PLATFORM_WALLET_STATS(): Promise<
  ApiResponse<PlatformWalletStats>
> {
  try {
    const response = await x_axios.get("/admin/platform-wallet/stats");
    return { success: true, data: response.data.data };
  } catch (error) {
    return formatError(error);
  }
}

export async function GET_PLATFORM_WALLET_RECONCILIATION(): Promise<
  ApiResponse<ReconciliationResult>
> {
  try {
    const response = await x_axios.get("/admin/platform-wallet/reconcile");
    return { success: true, data: response.data.data };
  } catch (error) {
    return formatError(error);
  }
}

export async function GET_PLATFORM_WALLET_TRANSACTIONS(
  page: number = 1,
  limit: number = 50,
  startDate?: string,
  endDate?: string
): Promise<ApiResponse<PlatformWalletTransactionsResponse>> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (startDate) params.append("startDate", startDate);
    if (endDate) params.append("endDate", endDate);

    const response = await x_axios.get(
      `/admin/platform-wallet/transactions?${params.toString()}`
    );

    return { success: true, data: response.data.data };
  } catch (error) {

    return formatError(error);
  }
}

export async function GET_PLATFORM_WALLET_REVENUE_SUMMARY(): Promise<
  ApiResponse<RevenueSummary>
> {
  try {
    const response = await x_axios.get("/admin/platform-wallet/revenue-summary");
    return { success: true, data: response.data.data };
  } catch (error) {
    return formatError(error);
  }
}

