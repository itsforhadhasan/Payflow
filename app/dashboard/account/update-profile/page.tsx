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
import { useImmer } from "use-immer";
import { z } from "zod";

const FormSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
});

type ProfileFormValues = z.infer<typeof FormSchema>;

interface ProfileField {
  name: keyof ProfileFormValues;
  label: string;
  placeholder: string;
  value: string;
}

export default function UpdateProfile() {
  const [fields, updateFields] = useImmer<ProfileField[]>([
    {
      name: "firstname",
      label: "First Name",
      placeholder: "John",
      value: "",
    },
    {
      name: "lastname",
      label: "Last Name",
      placeholder: "Doe",
      value: "",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "admin@example.com",
      value: "",
    },
  ]);
  const [loaded, setLoaded] = useState(false);
  const [userType, setUserType] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
    },
  });

  useEffect(() => {
    (async function () {
      const response = await PROFILE_FETCH();

      if (response.success && response.data) {
        const profile = response.data;

        if (profile && profile.email && profile.firstname && profile.lastname) {
          updateFields((draft) => {
            draft[0].value = profile.firstname;
            draft[1].value = profile.lastname;
            draft[2].value = profile.email;
          });

          form.reset({
            firstname: profile.firstname,
            lastname: profile.lastname,
            email: profile.email,
          });

          setUserType(profile.userType || null);
          setLoaded(true);
        }
      }
    })();
  }, [updateFields, form]);

  function onSubmit(data: ProfileFormValues) {
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
                          disabled={!loaded}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="submit" disabled={isPending || !loaded}>
                {isPending ? "Updating..." : "Update Profile"}
              </Button>
            </form>
          </Form>
        </section>
      </div>
    </main>
  );
}
