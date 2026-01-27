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

    const response = await x_axios.get(`/profile/${userType.toLowerCase()}`);

    if (response?.data?.data?.profile) {
      return { success: true, data: response.data.data.profile };
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

    const response = await x_axios.put(
      `/profile/${userType.toLowerCase()}`,
      data,
    );

    if (response?.data?.data?.profile) {
      return { success: true, data: response.data.data.profile };
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
