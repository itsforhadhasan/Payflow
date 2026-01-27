"use client";

import { BILLER_CREATE, type BillerCreateData } from "@/actions/admin-biller-actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(255, "Name is too long"),
  billerCode: z
    .string()
    .min(2, "Biller code must be at least 2 characters")
    .max(50, "Biller code is too long")
    .regex(/^[A-Z0-9_-]+$/, "Only uppercase letters, numbers, hyphens, and underscores allowed"),
  billType: z.enum(["ELECTRICITY", "GAS", "WATER", "INTERNET", "MOBILE", "TV", "ORGANIZATION"]),
  contactEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  contactPhone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
    .optional()
    .or(z.literal("")),
  description: z.string().max(1000, "Description is too long").optional(),
  logoUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

type FormData = z.infer<typeof FormSchema>;

export default function NewBillerPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const billType = watch("billType");

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);

    const billerData: BillerCreateData = {
      name: data.name,
      billerCode: data.billerCode,
      billType: data.billType,
      contactEmail: data.contactEmail || undefined,
      contactPhone: data.contactPhone || undefined,
      description: data.description || undefined,
      logoUrl: data.logoUrl || undefined,
    };

    const response = await BILLER_CREATE(billerData);

    if (response.success) {
      toast.success("Biller created successfully!");
      router.push("/dashboard/billers");
    } else {
      toast.error(response.message || "Failed to create biller");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    setIsLoading(false);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/billers">
          <Button variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div>
          <h1 className="text-lg font-semibold md:text-2xl">Add New Biller</h1>
          <p className="text-sm text-muted-foreground">
            Create a new bill payment service provider
          </p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Biller Information</CardTitle>
          <CardDescription>
            Enter the details for the new biller
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Biller Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                placeholder="e.g., Dhaka Electric Supply Company Limited"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-destructive">{errors.name.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="billerCode">
                Biller Code <span className="text-destructive">*</span>
              </Label>
              <Input
                id="billerCode"
                placeholder="e.g., DESCO-ELEC"
                {...register("billerCode")}
                className="font-mono"
              />
              <p className="text-xs text-muted-foreground">
                Only uppercase letters, numbers, hyphens, and underscores
              </p>
              {errors.billerCode && (
                <p className="text-sm text-destructive">{errors.billerCode.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="billType">
                Bill Type <span className="text-destructive">*</span>
              </Label>
              <Select
                value={billType}
                onValueChange={(value) =>
                  setValue("billType", value as FormData["billType"])
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select bill type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ELECTRICITY">Electricity</SelectItem>
                  <SelectItem value="GAS">Gas</SelectItem>
                  <SelectItem value="WATER">Water</SelectItem>
                  <SelectItem value="INTERNET">Internet</SelectItem>
                  <SelectItem value="MOBILE">Mobile</SelectItem>
                  <SelectItem value="TV">TV</SelectItem>
                  <SelectItem value="ORGANIZATION">Organization</SelectItem>
                </SelectContent>
              </Select>
              {errors.billType && (
                <p className="text-sm text-destructive">{errors.billType.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="info@example.com"
                {...register("contactEmail")}
              />
              {errors.contactEmail && (
                <p className="text-sm text-destructive">
                  {errors.contactEmail.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                placeholder="01712345678"
                {...register("contactPhone")}
              />
              {errors.contactPhone && (
                <p className="text-sm text-destructive">
                  {errors.contactPhone.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of the biller..."
                rows={4}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-destructive">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="logoUrl">Logo URL</Label>
              <Input
                id="logoUrl"
                type="url"
                placeholder="https://example.com/logo.png"
                {...register("logoUrl")}
              />
              {errors.logoUrl && (
                <p className="text-sm text-destructive">{errors.logoUrl.message}</p>
              )}
            </div>

            <div className="flex gap-4 pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Biller
              </Button>
              <Link href="/dashboard/billers">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </main>
  );
}

