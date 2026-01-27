"use server";

import x_axios from "@/lib/axios";
import type { ApiResponse, Profile } from "@/types";
import { AxiosError } from "axios";
import { getUserTypeFromJWT } from "@/utils/auth";

export async function PROFILE_FETCH(): Promise<ApiResponse<Profile>> {
  try {
    const userType = await getUserTypeFromJWT();

    if (!userType) {
      return { success: false, error: "Invalid session" };
    }

    // Map user types to API endpoints
    const endpointMap: Record<string, string> = {
      "Consumer": "/auth/consumer/profile",
      "Agent": "/auth/agent/profile",
      "Admin": "/auth/admin/profile",
    };

    const endpoint = endpointMap[userType];
    if (!endpoint) {
      return { success: false, error: "Invalid user type" };
    }

    const response = await x_axios.get(endpoint);

    // API returns user data in response.data.data.user or response.data.data.admin
    const userData = response?.data?.data?.user || response?.data?.data?.admin;
    
    if (userData) {
      return { success: true, data: userData };
    } else {
      return { success: false, error: "Profile fetch failed" };
    }
  } catch (error) {
    console.log(error);
    return { success: false, error: "Profile fetch failed" };
  }
}

export async function PROFILE_UPDATE(
  data: Partial<Profile>,
): Promise<ApiResponse<Profile>> {
  try {
    const userType = await getUserTypeFromJWT();

    if (!userType) {
      return { success: false, error: "Invalid session" };
    }

    // Map user types to API endpoints
    const endpointMap: Record<string, string> = {
      "Consumer": "/auth/consumer/profile",
      "Agent": "/agents/auth/profile",
      "Admin": "/auth/admin/profile",
    };

    const endpoint = endpointMap[userType];
    if (!endpoint) {
      return { success: false, error: "Invalid user type" };
    }

    const response = await x_axios.put(endpoint, data);

    // API returns user data in response.data.data.user or response.data.data.admin
    const userData = response?.data?.data?.user || response?.data?.data?.admin;
    
    if (userData) {
      return { success: true, data: userData };
    } else {
      return { success: false, data: response.data.data };
    }
  } catch (error) {
    if (error instanceof AxiosError) {
      const data = error.response?.data;
      return { success: false, data };
    }
    return { success: false, error: "An error occurred" };
  }
}
