"use server";

import x_axios from "@/lib/axios";
import { formatError } from "@/lib/utils";
import type {
  ApiResponse,
  Patient,
  PatientFilter,
  PatientListResponse,
} from "@/types";

export async function PATIENT_CREATE(
  data: Partial<Patient>,
): Promise<ApiResponse<Patient>> {
  try {
    const response = await x_axios.post("/patients", data);

    return { success: true, data: response.data.data.patient };
  } catch (error) {
    return formatError(error);
  }
}

export async function PATIENT_LISTED(
  offset: number,
  limit: number,
  filter: PatientFilter = {},
): Promise<ApiResponse<PatientListResponse>> {
  try {
    // Prepare request body with optional filter parameters
    const requestBody: {
      search?: string;
      createdAtStart?: string;
      createdAtEnd?: string;
    } = {};

    if (filter.search) {
      requestBody.search = filter.search;
    }

    if (filter.createdAtStart) {
      requestBody.createdAtStart = filter.createdAtStart;
    }

    if (filter.createdAtEnd) {
      requestBody.createdAtEnd = filter.createdAtEnd;
    }

    // POST /patients/listed/:offset/:limit with filters in request body
    const response = await x_axios.post(
      `/patients/listed/${offset}/${limit}`,
      requestBody,
    );

    return {
      success: true,
      data: response.data.data,
    };
  } catch (error) {
    return formatError(error);
  }
}

export async function PATIENT_DELETE(id: string): Promise<ApiResponse> {
  try {
    await x_axios.delete("/patients/" + id);

    return { success: true };
  } catch (error) {
    return formatError(error);
  }
}

export async function PATIENT_GET(id: string): Promise<ApiResponse<Patient>> {
  try {
    const response = await x_axios.get("/patients/" + id);

    return { success: true, data: response.data.data.patient };
  } catch (error) {
    return formatError(error);
  }
}

export async function PATIENT_UPDATE(
  id: string,
  data: Partial<Patient>,
): Promise<ApiResponse<Patient>> {
  try {
    const response = await x_axios.put("/patients/" + id, data);

    return { success: true, data: response.data.data.patient };
  } catch (error) {
    return formatError(error);
  }
}
