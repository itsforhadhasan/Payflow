"use server";

import x_axios from "@/lib/axios";
import { formatError } from "@/lib/utils";
import type { ApiResponse } from "@/types";

export interface Biller {
  id: string;
  name: string;
  billerCode: string;
  billType: "ELECTRICITY" | "GAS" | "WATER" | "INTERNET" | "MOBILE" | "TV" | "ORGANIZATION";
  status: "ACTIVE" | "SUSPENDED" | "INACTIVE";
  balance: number;
  totalPayments: number;
  contactEmail?: string;
  contactPhone?: string;
  description?: string;
  logoUrl?: string;
  createdAt: string;
  updatedAt: string;
}

export interface BillerDetails {
  biller: Biller;
  statistics: {
    totalPayments: number;
    completedPayments: number;
    totalRevenue: number;
  };
}

export interface BillerListResponse {
  billers: Biller[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export interface BillerFilter {
  search?: string;
  billType?: string;
  status?: string;
}

export interface BillerCreateData {
  name: string;
  billerCode: string;
  billType: "ELECTRICITY" | "GAS" | "WATER" | "INTERNET" | "MOBILE" | "TV" | "ORGANIZATION";
  contactEmail?: string;
  contactPhone?: string;
  description?: string;
  logoUrl?: string;
}

export interface BillerUpdateData {
  name?: string;
  contactEmail?: string;
  contactPhone?: string;
  description?: string;
  status?: "ACTIVE" | "SUSPENDED" | "INACTIVE";
}

export async function BILLER_LIST(
  page: number = 1,
  limit: number = 20,
  filter: BillerFilter = {}
): Promise<ApiResponse<BillerListResponse>> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      limit: limit.toString(),
    });

    if (filter.search) params.append("search", filter.search);
    if (filter.billType) params.append("billType", filter.billType);
    if (filter.status) params.append("status", filter.status);

    const response = await x_axios.get(`/admin/billers?${params.toString()}`);
    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return formatError(error);
  }
}

export async function BILLER_DETAILS(
  id: string
): Promise<ApiResponse<BillerDetails>> {
  try {
    const response = await x_axios.get(`/admin/billers/${id}`);
    return { success: true, data: response.data.data };
  } catch (error) {
    return formatError(error);
  }
}

export async function BILLER_CREATE(
  data: BillerCreateData
): Promise<ApiResponse> {
  try {
    const response = await x_axios.post("/admin/billers", data);
    return { success: true, data: response.data };
  } catch (error) {
    return formatError(error);
  }
}

export async function BILLER_UPDATE(
  id: string,
  data: BillerUpdateData
): Promise<ApiResponse> {
  try {
    const response = await x_axios.put(`/admin/billers/${id}`, data);
    return { success: true, data: response.data };
  } catch (error) {
    return formatError(error);
  }
}

export async function BILLER_UPDATE_STATUS(
  id: string,
  status: "ACTIVE" | "SUSPENDED" | "INACTIVE"
): Promise<ApiResponse> {
  try {
    const response = await x_axios.patch(`/admin/billers/${id}/status`, { status });
    return { success: true, data: response.data };
  } catch (error) {
    return formatError(error);
  }
}

export async function BILLER_DELETE(id: string): Promise<ApiResponse> {
  try {
    await x_axios.delete(`/admin/billers/${id}`);
    return { success: true };
  } catch (error) {
    return formatError(error);
  }
}

