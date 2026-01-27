"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface MenuItemProps {
  type?: "desktop" | "mobile";
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export default function MenuItem({
  type = "desktop",
  href = "",
  icon = "",
  children,
}: MenuItemProps) {
  const pathname = usePathname();

  let className =
    "flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary font-semibold";

  if (pathname.endsWith(href)) {
    className =
      "flex items-center gap-3 rounded-lg bg-muted px-3 py-2 text-primary transition-all hover:text-primary font-bold";
  }

  if (type === "mobile") {
    className = "flex items-center gap-2 text-lg";
  }

  return (
    <Link href={href} className={className}>
      {icon}
      {children}
    </Link>
  );
}
