"use server";

import x_axios from "@/lib/axios";
import { formatError } from "@/lib/utils";
import type { ApiResponse } from "@/types";

export interface Biller {
  id: string;
  name: string;
  billerCode: string;
  billType: "ELECTRICITY" | "GAS" | "WATER" | "INTERNET" | "MOBILE" | "TV" | "ORGANIZATION";
  contactEmail?: string;
  contactPhone?: string;
  description?: string;
  logoUrl?: string | null;
}

export interface BillersResponse {
  billers: Biller[];
  total: number;
}

export interface PayBillData {
  billerId: string;
  accountNumber: string;
  amount: number;
  billingMonth?: string;
  billingYear?: number;
  description?: string;
}

export interface PayBillResponse {
  transactionId: string;
  billerId: string;
  billerName: string;
  billerCode: string;
  billType: string;
  accountNumber: string;
  amount: number;
  fee: number;
  totalAmount: number;
  status: string;
  completedAt: string;
  newBalance: number;
}

export interface BillPayment {
  id: string;
  transactionId: string;
  biller: {
    id: string;
    name: string;
    billerCode: string;
    billType: string;
  };
  accountNumber: string;
  amount: number;
  fee: number;
  totalAmount: number;
  status: string;
  billingMonth?: string;
  billingYear?: number;
  receiptNumber?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BillPaymentHistoryResponse {
  payments: BillPayment[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export async function GET_BILLERS(
  billType?: string,
  search?: string
): Promise<ApiResponse<BillersResponse>> {
  try {
    const params = new URLSearchParams();
    if (billType) params.append("billType", billType);
    if (search) params.append("search", search);

    const queryString = params.toString();
    const url = queryString ? `/transactions/billers?${queryString}` : "/transactions/billers";

    const response = await x_axios.get(url);
    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return formatError(error);
  }
}

export async function PAY_BILL(data: PayBillData): Promise<ApiResponse<PayBillResponse>> {
  try {
    const response = await x_axios.post("/transactions/pay-bill", data);
    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return formatError(error);
  }
}

export async function GET_BILL_PAYMENT_HISTORY(
  page: number = 1,
  limit: number = 10,
  billerId?: string
): Promise<ApiResponse<BillPaymentHistoryResponse>> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (billerId) params.append("billerId", billerId);

    const response = await x_axios.get(`/transactions/bill-payments?${params.toString()}`);
    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return formatError(error);
  }
}

