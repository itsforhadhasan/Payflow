import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { AxiosError } from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface ErrorResponse {
  errors?: Array<{ message: string }>;
  message?: string;
}

interface FormattedError {
  success: false;
  error: string;
}

export const formatError = (error: unknown): FormattedError => {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ErrorResponse | undefined;
    
    if (data?.errors && data.errors.length > 0) {
      return {
        success: false,
        error: data.errors[0].message,
      };
    } else if (data?.message) {
      return { success: false, error: data.message };
    }
  }
  
  return { success: false, error: "An error occurred" };
};
