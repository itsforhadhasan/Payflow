"use client";

import { AUTH_CHANGE_PASSWORD } from "@/actions/auth-actions";
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
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useImmer } from "use-immer";
import { z } from "zod";
import { UserTypes } from "@/types";

const FormSchema = z
  .object({
    current_password: z
      .string()
      .min(8, "The current password must contain at least 8 characters.")
      .max(255, "The current password must not exceed 255 characters."),
    new_password: z
      .string()
      .min(8, "The new password must contain at least 8 characters.")
      .max(255, "The new password must not exceed 255 characters."),
    new_password_confirmation: z
      .string()
      .min(8, "The password confirmation must contain at least 8 characters.")
      .max(255, "The password confirmation must not exceed 255 characters."),
  })
  .refine((data) => data.new_password === data.new_password_confirmation, {
    path: ["new_password_confirmation"], // Point to the specific field
    message: "New password and confirm password do not match.",
  });

type PasswordFormValues = z.infer<typeof FormSchema>;

interface PasswordField {
  name: keyof PasswordFormValues;
  label: string;
  placeholder: string;
  value: string;
}

export default function ChangePassword() {
  const [fields, updateFields] = useImmer<PasswordField[]>([
    {
      name: "current_password",
      label: "Current Password",
      placeholder: "********",
      value: "",
    },
    {
      name: "new_password",
      label: "New Password",
      placeholder: "********",
      value: "",
    },
    {
      name: "new_password_confirmation",
      label: "Confirm New Password",
      placeholder: "********",
      value: "",
    },
  ]);
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password_confirmation: "",
    },
  });

  function onSubmit(data: PasswordFormValues) {
    startTransition(async () => {
      const response = await AUTH_CHANGE_PASSWORD(
        data.current_password,
        data.new_password
      );

      if (response.success) {
        toast.success("Password changed successfully!");

        form.reset();
      } else {
        toast.error("An error occurred");
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
          <span className="text-foreground">Change Password</span>
        </nav>

        <div>
          <h1 className="text-lg font-semibold md:text-2xl">Change Password</h1>
          <p className="text-sm text-muted-foreground">
            Update your password to keep your account secure
          </p>
        </div>

        <section className="rounded-lg border bg-card p-6 shadow-sm">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {fields.map((item) => (
                <FormField
                  control={form.control}
                  name={item.name}
                  key={item.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{item.label}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={item.placeholder}
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="submit" disabled={isPending}>
                {isPending ? "Changing..." : "Change Password"}
              </Button>
            </form>
          </Form>
        </section>
      </div>
    </main>
  );
}
