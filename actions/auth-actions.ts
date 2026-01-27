"use server";

import x_axios from "@/lib/axios";
import { formatError } from "@/lib/utils";
import type {
  ApiResponse,
  LoginData,
} from "@/types";
import { UserTypes } from "@/types";
import { getUserTypeFromJWT } from "@/utils/auth";
import { cookies } from "next/headers";

export async function GET_USER_TYPE(): Promise<ApiResponse<string>> {
  try {
    const userType = await getUserTypeFromJWT();
    if (!userType) {
      return { success: false, error: "User type not found" };
    }
    return { success: true, data: userType };
  } catch (error) {
    return formatError(error);
  }
}

export async function AUTH_LOGIN(
  userType: UserTypes,
  identifier: string,
  password: string,
): Promise<ApiResponse<LoginData>> {
  try {
    // Map user types to API endpoints
    const endpointMap: Record<UserTypes, string> = {
      [UserTypes.Consumer]: "/auth/consumer/login",
      [UserTypes.Agent]: "/auth/agent/login",
      [UserTypes.Admin]: "/auth/admin/login",
    };

    // Admin uses email, Consumer and Agent use identifier
    const requestBody = userType === UserTypes.Admin
      ? { email: identifier, password }
      : { identifier, password };

    const response = await x_axios.post(
      endpointMap[userType],
      requestBody,
    );

    const data = response.data.data as LoginData;

    if (data) {
      (await cookies()).set("x-jwt", data.token, {
        httpOnly: true,
        path: "/",
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24 * 7,
      });

      return { success: true, data };
    }

    return { success: true, data: response.data };
  } catch (error) {
    return formatError(error);
  }
}

export async function AUTH_LOGOUT(): Promise<ApiResponse> {
  try {
    const userType = await getUserTypeFromJWT();

    if (!userType) {
      return { success: false, error: "Invalid session" };
    }

    await x_axios.post(`/auth/${userType.toLowerCase()}/logout`);

    (await cookies()).delete("x-jwt");

    return { success: true };
  } catch {
    return { success: false, error: "Logout failed" };
  }
}


export async function AUTH_CHANGE_PASSWORD(
  currentPassword: string,
  newPassword: string,
): Promise<ApiResponse> {
  try {
    const userType = await getUserTypeFromJWT();

    if (!userType) {
      return { success: false, error: "Invalid session" };
    }

    // Map user types to API endpoints
    const endpointMap: Record<string, string> = {
      "Consumer": "/auth/consumer/change-password",
      "Agent": "/agents/auth/change-password",
      "Admin": "/auth/admin/change-password",
    };

    const endpoint = endpointMap[userType];
    if (!endpoint) {
      return { success: false, error: "Invalid user type" };
    }

    await x_axios.put(endpoint, {
      currentPassword,
      newPassword,
    });

    return { success: true };
  } catch (error) {
    return formatError(error);
  }
}

export async function AUTH_REGISTER_CONSUMER(data: {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  dateOfBirth?: string;
  nidNumber?: string;
}): Promise<ApiResponse> {
  try {
    const response = await x_axios.post("/auth/consumer/register", {
      ...data,
      role: "CONSUMER",
    });

    return { success: true, data: response.data };
  } catch (error) {
    return formatError(error);
  }
}

export async function AUTH_REGISTER_AGENT(data: {
  email: string;
  phone: string;
  password: string;
  firstName: string;
  lastName: string;
  businessName: string;
  businessAddress: string;
  dateOfBirth?: string;
  nidNumber?: string;
}): Promise<ApiResponse> {
  try {
    const response = await x_axios.post("/auth/agent/register", {
      ...data,
    });

    return { success: true, data: response.data };
  } catch (error) {
    return formatError(error);
  }
}

