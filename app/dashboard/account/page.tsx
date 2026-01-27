"use client";

import { PROFILE_FETCH } from "@/actions/profile-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  Home,
  Lock,
  User,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Profile } from "@/types";

const InfoItem = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <div className="space-y-1">
    <dt className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
      {label}
    </dt>
    <dd className="text-sm font-medium text-foreground break-words">
      {children ?? <span className="text-muted-foreground">—</span>}
    </dd>
  </div>
);

export default function AccountPage() {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);
      const response = await PROFILE_FETCH();
      if (response.success && response.data) {
        setProfile(response.data);
      } else {
        toast.error("Failed to fetch profile");
      }
      setIsLoading(false);
    };

    fetchProfile();
  }, []);

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col gap-4">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link
            href="/dashboard"
            className="transition-colors hover:text-foreground"
          >
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Account</span>
        </nav>

        <div>
          <h1 className="text-lg font-semibold md:text-2xl">
            Account Settings
          </h1>
          <p className="text-sm text-muted-foreground">
            Manage your account information and security settings
          </p>
        </div>

        {isLoading ? (
          <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
            Loading profile...
          </div>
        ) : profile ? (
          <div className="space-y-6">
            {/* Profile Information Section */}
            <section className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="mb-4">
                <h2 className="text-base font-semibold">Profile Information</h2>
                <p className="text-sm text-muted-foreground">
                  Your personal details and contact information
                </p>
              </div>
              <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <InfoItem label="First Name">{profile.firstName}</InfoItem>
                <InfoItem label="Last Name">{profile.lastName}</InfoItem>
                <InfoItem label="Email">{profile.email}</InfoItem>
                <InfoItem label="USER ID">{profile.id}</InfoItem>
                <InfoItem label="Account Status">
                  <Badge variant={profile.status ? "default" : "secondary"}>
                    {profile.status ? "Active" : "Inactive"}
                  </Badge>
                </InfoItem>
              </dl>
              <div className="mt-6">
                <Link href="/dashboard/account/update-profile">
                  <Button variant="outline" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    Update Profile
                  </Button>
                </Link>
              </div>
            </section>

            {/* Security Settings Section */}
            <section className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="mb-4">
                <h2 className="text-base font-semibold">Security Settings</h2>
                <p className="text-sm text-muted-foreground">
                  Manage your password
                </p>
              </div>
              <div className="space-y-4">
                {/* Password */}
                <div className="flex items-center justify-between rounded-lg border p-4">
                  <div className="flex items-center gap-3">
                    <Lock className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">Password</p>
                      <p className="text-sm text-muted-foreground">
                        Last changed recently
                      </p>
                    </div>
                  </div>
                  <Link href="/dashboard/account/change-password">
                    <Button variant="outline" size="sm">
                      Change Password
                    </Button>
                  </Link>
                </div>
              </div>
            </section>

            {/* Contact Information Section */}
            {(profile.phone || profile.address) && (
              <section className="rounded-lg border bg-card p-6 shadow-sm">
                <div className="mb-4">
                  <h2 className="text-base font-semibold">
                    Contact Information
                  </h2>
                  <p className="text-sm text-muted-foreground">
                    Additional contact details
                  </p>
                </div>
                <dl className="grid gap-4 sm:grid-cols-2">
                  {profile.phone && (
                    <InfoItem label="Phone">{profile.phone}</InfoItem>
                  )}
                  {profile.address && (
                    <InfoItem label="Address">{profile.address}</InfoItem>
                  )}
                </dl>
              </section>
            )}

            {/* Quick Actions Section */}
            <section className="rounded-lg border bg-card p-6 shadow-sm">
              <div className="mb-4">
                <h2 className="text-base font-semibold">Quick Actions</h2>
                <p className="text-sm text-muted-foreground">
                  Common account management tasks
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Link href="/dashboard/account/update-profile">
                  <Button variant="outline" size="sm">
                    <User className="mr-2 h-4 w-4" />
                    Update Profile
                  </Button>
                </Link>
                <Link href="/dashboard/account/change-password">
                  <Button variant="outline" size="sm">
                    <Lock className="mr-2 h-4 w-4" />
                    Change Password
                  </Button>
                </Link>
              </div>
            </section>
          </div>
        ) : (
          <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
            Profile not found.
          </div>
        )}
      </div>
    </main>
  );
}
