"use server";

import x_axios from "@/lib/axios";
import { formatError } from "@/lib/utils";
import type { ApiResponse } from "@/types";

export interface BankTransferData {
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  routingNumber?: string;
  transferType: "INSTANT" | "STANDARD";
  amount: number;
  description?: string;
}

export interface BankTransfer {
  id: string;
  transactionId: string;
  bankName: string;
  accountNumber: string;
  accountHolderName: string;
  routingNumber?: string;
  amount: number;
  fee: number;
  totalAmount: number;
  status: "PENDING" | "PROCESSING" | "COMPLETED" | "FAILED";
  referenceNumber: string;
  createdAt: string;
  updatedAt: string;
  transaction?: {
    transactionId: string;
    status: string;
    description: string;
    initiatedAt: string;
    completedAt?: string;
  };
}

export interface BankTransferHistoryResponse {
  transfers: BankTransfer[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function BANK_TRANSFER_INITIATE(
  data: BankTransferData
): Promise<ApiResponse> {
  try {
    const response = await x_axios.post("/bank/transfer", data);
    return { success: true, data: response.data };
  } catch (error) {
    return formatError(error);
  }
}

export async function BANK_TRANSFER_HISTORY(
  page: number = 1,
  limit: number = 10,
  status?: string
): Promise<ApiResponse<BankTransferHistoryResponse>> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (status) params.append("status", status);

    const response = await x_axios.get(`/bank/transfers?${params.toString()}`);
    return { success: true, data: response.data.data };
  } catch (error) {
    return formatError(error);
  }
}

export async function BANK_TRANSFER_DETAILS(
  id: string
): Promise<ApiResponse<BankTransfer>> {
  try {
    const response = await x_axios.get(`/bank/transfers/${id}`);
    return { success: true, data: response.data.data };
  } catch (error) {
    return formatError(error);
  }
}

