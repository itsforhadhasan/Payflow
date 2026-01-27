import { CircleUser, Menu, Package2 } from "lucide-react";
import Link from "next/link";

import { PROFILE_FETCH } from "@/actions/profile-actions";
import LogoutButton from "@/components/auth/LogoutButton";
import { DesktopMenus, MobileMenus } from "@/components/layout/Menus";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getProfileDisplayName, isUserProfile } from "@/types";

export default async function AuthenticatedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profileData = await PROFILE_FETCH();
  const profile = profileData.data;

  return (
    <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[250px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Package2 className="h-6 w-6" />
              <span className="">UIU Cash</span>
            </Link>
          </div>
          <div className="flex-1">
            <DesktopMenus />
          </div>
        </div>
      </div>
      <div className="flex flex-col">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className="shrink-0 md:hidden"
              >
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
              <MobileMenus />
            </SheetContent>
          </Sheet>
          <div className="w-full flex-1"></div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" size="icon" className="rounded-full">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Hi {profile ? getProfileDisplayName(profile) : 'User'}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <Link href="/dashboard/account">
                <DropdownMenuItem>Account Settings</DropdownMenuItem>
              </Link>
              {profile && isUserProfile(profile) && (
                <Link href="/dashboard/account/update-profile">
                  <DropdownMenuItem>Update Profile</DropdownMenuItem>
                </Link>
              )}
              <Link href="/dashboard/account/change-password">
                <DropdownMenuItem>Change Password</DropdownMenuItem>
              </Link>
              <DropdownMenuSeparator />
              <LogoutButton />
            </DropdownMenuContent>
          </DropdownMenu>
        </header>
        {children}
      </div>
    </div>
  );
}
