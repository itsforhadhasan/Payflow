"use client";

import { ADMIN_CREATE } from "@/actions/admin-actions";
import { useAdmin } from "@/app/dashboard/admins/context";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useImmer } from "use-immer";
import { z } from "zod";
import { Button } from "../ui/button";

const FormSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

type AdminFormValues = z.infer<typeof FormSchema>;

interface AdminField {
  name: keyof AdminFormValues;
  label: string;
  placeholder: string;
  value: string;
  type: string;
}

export default function NewAdmin() {
  const [isOpen, setIsOpen] = useState(false);

  const [fields, updateFields] = useImmer<AdminField[]>([
    {
      name: "firstname",
      label: "First Name",
      placeholder: "John",
      value: "",
      type: "text",
    },
    {
      name: "lastname",
      label: "Last Name",
      placeholder: "Doe",
      value: "",
      type: "text",
    },
    {
      name: "email",
      label: "Email",
      placeholder: "john@doe.com",
      value: "",
      type: "email",
    },
    {
      name: "password",
      label: "Password",
      placeholder: "********",
      value: "",
      type: "password",
    },
  ]);

  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
    },
  });

  const { refresh } = useAdmin();

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const response = await ADMIN_CREATE(data);

      if (response.success) {
        toast.success("User has been created successfully");

        form.reset();

        setIsOpen(false);
        refresh();
      } else {
        toast.error(response.error);
      }
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">New User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="mx-auto grid w-[350px] gap-6"
            >
              {fields.map((item) => (
                <FormField
                  control={form.control}
                  name={item.name}
                  key={item.name}
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-white">{item.label}</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={item.placeholder}
                          {...field}
                          type={item.type}
                        />
                      </FormControl>
                      <FormMessage className="text-red-500" />
                    </FormItem>
                  )}
                />
              ))}
              <Button type="submit">Create User</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
