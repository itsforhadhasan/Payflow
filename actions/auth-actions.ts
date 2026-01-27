"use server";

import x_axios from "@/lib/axios";
import { formatError } from "@/lib/utils";
import { cookies } from "next/headers";
import type {
  ApiResponse,
  LoginData,
} from "@/types";
import { UserTypes } from "@/types";
import { getUserTypeFromJWT } from "@/utils/auth";

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
  email: string,
  password: string,
): Promise<ApiResponse<LoginData>> {
  try {
    const response = await x_axios.post(
      `/auth/${userType.toLowerCase()}/login`,
      {
        email,
        password,
      },
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
  current_password: string,
  new_password: string,
): Promise<ApiResponse<LoginData>> {
  try {
    const userType = await getUserTypeFromJWT();

    if (!userType) {
      return { success: false, error: "Invalid session" };
    }

    const response = await x_axios.put(
      `/auth/${userType.toLowerCase()}/change-password`,
      {
        current_password,
        new_password,
      },
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

