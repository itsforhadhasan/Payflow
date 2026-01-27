import { getUserTypeFromHeader } from "@/utils/auth";
import { Home, Package2, UserCircle, Users } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import MenuItem from "./MenuItem";

type MenuItem = {
  label: string;
  href: string;
  icon: ReactNode;
  allowedUserTypes?: string[]; // If undefined, accessible to all
};

export const MENU_ITEMS: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    label: "Admins",
    href: "/dashboard/admins",
    icon: <Users className="h-4 w-4" />,
    allowedUserTypes: ["Admin"],
  },
  {
    label: "Patients",
    href: "/dashboard/patients",
    icon: <UserCircle className="h-4 w-4" />,
  },
];

function filterMenusByUserType(userType: string | null) {
  if (!userType) return MENU_ITEMS;

  return MENU_ITEMS.filter((item) => {
    // If no allowedUserTypes specified, show to everyone
    if (!item.allowedUserTypes) return true;
    // Otherwise, check if user's type is in the allowed list
    return item.allowedUserTypes.includes(userType);
  });
}

export async function DesktopMenus() {
  const userType = await getUserTypeFromHeader();
  const filteredItems = filterMenusByUserType(userType);

  return (
    <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
      {filteredItems.map((item) => (
        <MenuItem key={item.href} href={item.href} icon={item.icon}>
          {item.label}
        </MenuItem>
      ))}
    </nav>
  );
}

export async function MobileMenus() {
  const userType = await getUserTypeFromHeader();
  const filteredItems = filterMenusByUserType(userType);

  return (
    <nav className="grid gap-2 text-lg font-medium">
      <Link href="#" className="flex items-center gap-2 text-lg font-semibold">
        <Package2 className="h-6 w-6" />
        <span className="sr-only">UIU Cash</span>
      </Link>

      {filteredItems.map((item) => (
        <MenuItem
          key={item.href}
          href={item.href}
          icon={item.icon}
          type="mobile"
        >
          {item.label}
        </MenuItem>
      ))}
    </nav>
  );
}
