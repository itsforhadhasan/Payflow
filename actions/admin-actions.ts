"use server";

import x_axios from "@/lib/axios";
import { formatError } from "@/lib/utils";
import type { Admin, AdminFilter, AdminListResponse, ApiResponse } from "@/types";

export async function ADMIN_CREATE(data: Partial<Admin>): Promise<ApiResponse<Admin>> {
  try {
    const response = await x_axios.post("/admin/register", {
      email: data.email,
      password: data.password,
      name: data.name,
    });

    return { success: true, data: response.data.data.admin };
  } catch (error) {
    return formatError(error);
  }
}

export async function ADMIN_LISTED(
  offset: number,
  limit: number,
  filter: AdminFilter = {}
): Promise<ApiResponse<AdminListResponse>> {
  try {
    const endpoint = `/admin/listed/${offset}/${limit}`;

    const response = await x_axios.post(endpoint, filter);

    return {
      success: true,
      data: {
        users: response.data.data.users,
        usersFetched: response.data.data.usersFetched,
        usersMatched: response.data.data.usersMatched,
      },
    };
  } catch (error) {
    return formatError(error);
  }
}

export async function ADMIN_TOGGLE_STATUS(id: string): Promise<ApiResponse> {
  try {
    await x_axios.post("/admin/toggle-status/" + id);

    return { success: true };
  } catch (error) {
    return formatError(error);
  }
}

export async function ADMIN_DELETE(id: string): Promise<ApiResponse> {
  try {
    await x_axios.delete("/admin/" + id);

    return { success: true };
  } catch (error) {
    return formatError(error);
  }
}
