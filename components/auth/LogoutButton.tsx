"use client";

import { AUTH_LOGOUT } from "@/actions/auth-actions";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

export default function LogoutButton() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  function handleClick() {
    startTransition(async () => {
      const response = await AUTH_LOGOUT();

      if (response.success) {
        router.push("/");
      }
    });
  }

  return (
    <DropdownMenuItem onClick={handleClick}>
      {isPending ? "Logging out..." : "Logout"}
    </DropdownMenuItem>
  );
}
