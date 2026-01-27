"use client";

import { ReactNode } from "react";

type ClientUserTypeGuardProps = {
  children: ReactNode;
  allowedUserTypes: string[];
  userType: string | null | undefined;
  fallback?: ReactNode;
};

/**
 * Client component that conditionally renders children based on user type
 * Use this in client components where you already have the userType
 */
export function ClientUserTypeGuard({
  children,
  allowedUserTypes,
  userType,
  fallback = null,
}: ClientUserTypeGuardProps) {
  if (!userType || !allowedUserTypes.includes(userType)) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
}
