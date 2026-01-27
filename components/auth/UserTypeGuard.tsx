import { getUserTypeFromHeader } from "@/utils/auth";
import { ReactNode } from "react";

type UserTypeGuardProps = {
  children: ReactNode;
  allowedUserTypes: string[];
  fallback?: ReactNode;
};

/**
 * Server component that conditionally renders children based on user type
 * Use this to show/hide UI elements based on user permissions
 */
export async function UserTypeGuard({
  children,
  allowedUserTypes,
  fallback = null,
}: UserTypeGuardProps) {
  const userType = await getUserTypeFromHeader();

  if (!userType || !allowedUserTypes.includes(userType)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
