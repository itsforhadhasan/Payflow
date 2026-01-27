import { getUserTypeFromHeader } from "@/utils/auth";
import { ArrowRightLeft, Banknote, History, Home, Package2, Plus, Send, Users } from "lucide-react";
import Link from "next/link";
import { ReactNode } from "react";
import MenuItem from "./MenuItem";

type MenuItem = {
  label: string;
  href: string;
  icon: ReactNode;
  allowedUserTypes?: string[]; // If undefined, accessible to all
  subItems?: MenuItem[]; // Optional sub-menu items
};

export const MENU_ITEMS: MenuItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: <Home className="h-4 w-4" />,
  },
  {
    label: "Consumers",
    href: "/dashboard/consumers",
    icon: <Users className="h-4 w-4" />,
    allowedUserTypes: ["Admin"],
  },
  {
    label: "Agents",
    href: "/dashboard/agents",
    icon: <Users className="h-4 w-4" />,
    allowedUserTypes: ["Admin"],
  },
  {
    label: "Admins",
    href: "/dashboard/admins",
    icon: <Users className="h-4 w-4" />,
    allowedUserTypes: ["Admin"],
  },
  {
    label: "Transactions",
    href: "/dashboard/transactions",
    icon: <ArrowRightLeft className="h-4 w-4" />,
    allowedUserTypes: ["Consumer", "Agent"],
    subItems: [
      {
        label: "History",
        href: "/dashboard/transactions",
        icon: <History className="h-4 w-4" />,
      },
      {
        label: "Add Money",
        href: "/dashboard/transactions/add-money",
        icon: <Plus className="h-4 w-4" />,
      },
      {
        label: "Send Money",
        href: "/dashboard/transactions/send-money",
        icon: <Send className="h-4 w-4" />,
        allowedUserTypes: ["Consumer"],
      },
      {
        label: "Cash Out",
        href: "/dashboard/transactions/cash-out",
        icon: <Banknote className="h-4 w-4" />,
        allowedUserTypes: ["Consumer"],
      },
      {
        label: "Cash In",
        href: "/dashboard/transactions/cash-in",
        icon: <Banknote className="h-4 w-4" />,
        allowedUserTypes: ["Agent"],
      },
    ],
  },
];

function filterMenusByUserType(userType: string | null, items: MenuItem[] = MENU_ITEMS) {
  if (!userType) return items;

  return items.filter((item) => {
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
        <div key={item.href}>
          <MenuItem href={item.href} icon={item.icon}>
            {item.label}
          </MenuItem>
          {item.subItems && item.subItems.length > 0 && (
            <div className="ml-4 mt-1 space-y-1">
              {filterMenusByUserType(userType, item.subItems).map((subItem) => (
                <MenuItem key={subItem.href} href={subItem.href} icon={subItem.icon}>
                  {subItem.label}
                </MenuItem>
              ))}
            </div>
          )}
        </div>
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
        <div key={item.href}>
          <MenuItem
            href={item.href}
            icon={item.icon}
            type="mobile"
          >
            {item.label}
          </MenuItem>
          {item.subItems && item.subItems.length > 0 && (
            <div className="ml-4 mt-1 space-y-1">
              {filterMenusByUserType(userType, item.subItems).map((subItem) => (
                <MenuItem
                  key={subItem.href}
                  href={subItem.href}
                  icon={subItem.icon}
                  type="mobile"
                >
                  {subItem.label}
                </MenuItem>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );
}
