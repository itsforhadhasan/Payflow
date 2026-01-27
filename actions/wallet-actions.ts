"use server";

import x_axios from "@/lib/axios";
import type { ApiResponse } from "@/types";

export interface WalletData {
  availableBalance: number;
  dailyLimit: number;
  monthlyLimit: number;
  dailySpent: number;
  monthlySpent: number;
  currency: string;
  recentTransactions: Transaction[];
}

export interface Transaction {
  id: string;
  transactionId: string;
  type: string;
  amount: number;
  fee: number;
  status: string;
  description?: string;
  createdAt: string;
  isCredited?: boolean;
  sender?: {
    id: string;
    name: string;
  };
  receiver?: {
    id: string;
    name: string;
  };
}

export async function WALLET_FETCH(): Promise<ApiResponse<WalletData>> {
  try {
    const response = await x_axios.get("/wallet");

    if (response?.data?.data) {
      return { success: true, data: response.data.data };
    } else {
      return { success: false, error: "Wallet fetch failed" };
    }
  } catch (error) {
    console.log(error);
    return { success: false, error: "Wallet fetch failed" };
  }
}

