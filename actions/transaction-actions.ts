"use server";

import x_axios from "@/lib/axios";
import { formatError } from "@/lib/utils";
import type { ApiResponse } from "@/types";
import type { Transaction } from "./wallet-actions";

export interface TransactionHistoryResponse {
  transactions: Transaction[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
    limit: number;
  };
}

export interface AddMoneyData {
  amount: number;
  cardNumber: string;
  cardHolderName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
}

export interface SendMoneyData {
  recipientIdentifier: string;
  amount: number;
  description?: string;
}

export interface CashOutData {
  agentCode: string;
  amount: number;
  description?: string;
}

export async function TRANSACTION_HISTORY(
  page: number = 1,
  limit: number = 20,
  type?: string,
  status?: string
): Promise<ApiResponse<TransactionHistoryResponse>> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });
    
    if (type) params.append("type", type);
    if (status) params.append("status", status);

    const response = await x_axios.get(`/transactions/history?${params.toString()}`);

    return { success: true, data: response.data.data };
  } catch (error) {
    return formatError(error);
  }
}

export async function TRANSACTION_DETAILS(id: string): Promise<ApiResponse<Transaction>> {
  try {
    const response = await x_axios.get(`/transactions/${id}`);

    return { success: true, data: response.data.data.transaction };
  } catch (error) {
    return formatError(error);
  }
}

export async function ADD_MONEY(data: AddMoneyData): Promise<ApiResponse> {
  try {
    const response = await x_axios.post("/transactions/add-money", data);

    return { success: true, data: response.data };
  } catch (error) {
    return formatError(error);
  }
}

export async function SEND_MONEY(data: SendMoneyData): Promise<ApiResponse> {
  try {
    const response = await x_axios.post("/transactions/send-money", data);

    return { success: true, data: response.data };
  } catch (error) {
    return formatError(error);
  }
}

export async function CASH_OUT(data: CashOutData): Promise<ApiResponse> {
  try {
    const response = await x_axios.post("/transactions/cash-out", data);

    return { success: true, data: response.data };
  } catch (error) {
    return formatError(error);
  }
}

