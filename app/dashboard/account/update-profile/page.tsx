"use client";

import { PROFILE_FETCH, PROFILE_UPDATE } from "@/actions/profile-actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Home } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { isAdminProfile } from "@/types";

// Schema for User (Consumer/Agent)
const UserFormSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
});

// Schema for Admin
const AdminFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Please enter a valid email"),
});

type UserFormValues = z.infer<typeof UserFormSchema>;
type AdminFormValues = z.infer<typeof AdminFormSchema>;

export default function UpdateProfile() {
  const [loaded, setLoaded] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isPending, startTransition] = useTransition();

  const userForm = useForm<UserFormValues>({
    resolver: zodResolver(UserFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
    },
  });

  const adminForm = useForm<AdminFormValues>({
    resolver: zodResolver(AdminFormSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    (async function () {
      const response = await PROFILE_FETCH();

      if (response.success && response.data) {
        const profile = response.data;

        if (isAdminProfile(profile)) {
          setIsAdmin(true);
          adminForm.reset({
            name: profile.name,
            email: profile.email,
          });
        } else {
          setIsAdmin(false);
          userForm.reset({
            firstName: profile.firstName,
            lastName: profile.lastName,
            email: profile.email,
          });
        }
        setLoaded(true);
      }
    })();
  }, [userForm, adminForm]);

  function onUserSubmit(data: UserFormValues) {
    startTransition(async () => {
      const response = await PROFILE_UPDATE(data);

      if (response.success) {
        toast.success("Profile updated successfully");
      } else {
        if (response.data && 'errors' in response.data && Array.isArray(response.data.errors) && response.data.errors.length > 0) {
          const firstError = response.data.errors[0] as { message: string };
          toast.error(firstError.message);
        } else if (response.data && 'message' in response.data) {
          toast.error(response.data.message as string);
        } else {
          toast.error(response.error || "An error occurred");
        }
      }
    });
  }

  function onAdminSubmit(data: AdminFormValues) {
    startTransition(async () => {
      const response = await PROFILE_UPDATE(data);

      if (response.success) {
        toast.success("Profile updated successfully");
      } else {
        if (response.data && 'errors' in response.data && Array.isArray(response.data.errors) && response.data.errors.length > 0) {
          const firstError = response.data.errors[0] as { message: string };
          toast.error(firstError.message);
        } else if (response.data && 'message' in response.data) {
          toast.error(response.data.message as string);
        } else {
          toast.error(response.error || "An error occurred");
        }
      }
    });
  }

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
          <Link
            href="/dashboard/account"
            className="transition-colors hover:text-foreground"
          >
            Account
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Update Profile</span>
        </nav>

        <div>
          <h1 className="text-lg font-semibold md:text-2xl">Update Profile</h1>
          <p className="text-sm text-muted-foreground">
            Update your personal information
          </p>
        </div>

        <section className="rounded-lg border bg-card p-6 shadow-sm">
          {isAdmin ? (
            <Form {...adminForm}>
              <form onSubmit={adminForm.handleSubmit(onAdminSubmit)} className="space-y-6">
                <FormField
                  control={adminForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="System Administrator"
                          {...field}
                          disabled={!loaded}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={adminForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="admin@example.com"
                          {...field}
                          disabled={!loaded}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending || !loaded}>
                  {isPending ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </Form>
          ) : (
            <Form {...userForm}>
              <form onSubmit={userForm.handleSubmit(onUserSubmit)} className="space-y-6">
                <FormField
                  control={userForm.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John"
                          {...field}
                          disabled={!loaded}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={userForm.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Doe"
                          {...field}
                          disabled={!loaded}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={userForm.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="user@example.com"
                          {...field}
                          disabled={!loaded}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" disabled={isPending || !loaded}>
                  {isPending ? "Updating..." : "Update Profile"}
                </Button>
              </form>
            </Form>
          )}
        </section>
      </div>
    </main>
  );
}
