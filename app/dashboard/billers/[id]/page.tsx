"use client";

import {
  BILLER_DELETE,
  BILLER_DETAILS,
  BILLER_UPDATE,
  BILLER_UPDATE_STATUS,
  type BillerDetails,
  type BillerUpdateData,
} from "@/actions/admin-biller-actions";
import { Badge } from "@/components/ui/badge";
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
import { ArrowLeft, Edit, Loader2, Save, Trash2, X } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(255, "Name is too long"),
  contactEmail: z.string().email("Invalid email").optional().or(z.literal("")),
  contactPhone: z
    .string()
    .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
    .optional()
    .or(z.literal("")),
  description: z.string().max(1000, "Description is too long").optional(),
  status: z.enum(["ACTIVE", "SUSPENDED", "INACTIVE"]),
});

type FormData = z.infer<typeof FormSchema>;

export default function BillerDetailsPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [billerData, setBillerData] = useState<BillerDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [billerId, setBillerId] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const status = watch("status");

  useEffect(() => {
    // Unwrap params for Next.js 15+ compatibility
    const unwrapParams = async () => {
      const resolvedParams = await Promise.resolve(params);
      if (resolvedParams.id) {
        setBillerId(resolvedParams.id);
      }
    };
    unwrapParams();
  }, [params]);

  useEffect(() => {
    if (billerId) {
      fetchBillerDetails();
    }
  }, [billerId]);

  const fetchBillerDetails = async () => {
    if (!billerId) return;

    setIsLoading(true);
    const response = await BILLER_DETAILS(billerId);

    if (response.success && response.data) {
      setBillerData(response.data);
      reset({
        name: response.data.biller.name,
        contactEmail: response.data.biller.contactEmail || "",
        contactPhone: response.data.biller.contactPhone || "",
        description: response.data.biller.description || "",
        status: response.data.biller.status,
      });
    } else {
      toast.error("Failed to fetch biller details");
    }
    setIsLoading(false);
  };

  const onSubmit = async (data: FormData) => {
    if (!billerId) return;

    setIsSaving(true);

    const updateData: BillerUpdateData = {
      name: data.name,
      contactEmail: data.contactEmail || undefined,
      contactPhone: data.contactPhone || undefined,
      description: data.description || undefined,
      status: data.status,
    };

    const response = await BILLER_UPDATE(billerId, updateData);

    if (response.success) {
      toast.success("Biller updated successfully!");
      setIsEditing(false);
      fetchBillerDetails();
    } else {
      toast.error(response.error || "Failed to update biller");
    }

    setIsSaving(false);
  };

  const handleStatusChange = async (newStatus: "ACTIVE" | "SUSPENDED" | "INACTIVE") => {
    if (!billerId) return;

    const response = await BILLER_UPDATE_STATUS(billerId, newStatus);

    if (response.success) {
      toast.success("Biller status updated successfully!");
      fetchBillerDetails();
    } else {
      toast.error(response.error || "Failed to update status");
    }
  };

  const handleDelete = async () => {
    if (!billerId) return;

    if (!confirm("Are you sure you want to delete this biller? This action cannot be undone.")) {
      return;
    }

    setIsDeleting(true);
    const response = await BILLER_DELETE(billerId);

    if (response.success) {
      toast.success("Biller deleted successfully!");
      router.push("/dashboard/billers");
    } else {
      toast.error(response.error || "Failed to delete biller");
    }
    setIsDeleting(false);
  };

  if (isLoading) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </main>
    );
  }

  if (!billerData) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Biller not found</p>
        </div>
      </main>
    );
  }

  const { biller, statistics } = billerData;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/billers">
            <Button variant="outline" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Biller Details</h1>
            <p className="text-sm text-muted-foreground">
              View and manage biller information
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          ) : (
            <Button onClick={() => setIsEditing(false)} variant="outline">
              <X className="mr-2 h-4 w-4" />
              Cancel
            </Button>
          )}
          <Button
            onClick={handleDelete}
            variant="destructive"
            disabled={isDeleting}
          >
            {isDeleting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="mr-2 h-4 w-4" />
            )}
            Delete
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{statistics.totalPayments}</div>
            <p className="text-xs text-muted-foreground">
              {statistics.completedPayments} completed
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ৳{statistics.totalRevenue.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Collected from payments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">৳{biller.balance.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground">Available balance</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Biller Information</CardTitle>
          <CardDescription>
            {isEditing ? "Edit biller details" : "View biller details"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    Biller Name <span className="text-destructive">*</span>
                  </Label>
                  <Input id="name" {...register("name")} />
                  {errors.name && (
                    <p className="text-sm text-destructive">{errors.name.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>Biller Code</Label>
                  <Input value={biller.billerCode} disabled className="font-mono" />
                  <p className="text-xs text-muted-foreground">
                    Biller code cannot be changed
                  </p>
                </div>

                <div className="space-y-2">
                  <Label>Bill Type</Label>
                  <Input value={biller.billType} disabled />
                  <p className="text-xs text-muted-foreground">
                    Bill type cannot be changed
                  </p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">
                    Status <span className="text-destructive">*</span>
                  </Label>
                  <Select
                    value={status}
                    onValueChange={(value) =>
                      setValue("status", value as FormData["status"])
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVE">Active</SelectItem>
                      <SelectItem value="SUSPENDED">Suspended</SelectItem>
                      <SelectItem value="INACTIVE">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <p className="text-sm text-destructive">{errors.status.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactEmail">Contact Email</Label>
                  <Input id="contactEmail" type="email" {...register("contactEmail")} />
                  {errors.contactEmail && (
                    <p className="text-sm text-destructive">
                      {errors.contactEmail.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="contactPhone">Contact Phone</Label>
                  <Input id="contactPhone" {...register("contactPhone")} />
                  {errors.contactPhone && (
                    <p className="text-sm text-destructive">
                      {errors.contactPhone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" rows={4} {...register("description")} />
                {errors.description && (
                  <p className="text-sm text-destructive">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <Button type="submit" disabled={isSaving}>
                {isSaving ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <Save className="mr-2 h-4 w-4" />
                )}
                Save Changes
              </Button>
            </form>
          ) : (
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label className="text-muted-foreground">Biller Name</Label>
                  <p className="text-base font-medium">{biller.name}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Biller Code</Label>
                  <p className="text-base font-mono font-medium">{biller.billerCode}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Bill Type</Label>
                  <div className="mt-1">
                    <Badge variant="outline">{biller.billType}</Badge>
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground">Status</Label>
                  <div className="mt-1">
                    <Badge
                      variant={
                        biller.status === "ACTIVE"
                          ? "default"
                          : biller.status === "SUSPENDED"
                            ? "secondary"
                            : "destructive"
                      }
                    >
                      {biller.status}
                    </Badge>
                  </div>
                </div>

                <div>
                  <Label className="text-muted-foreground">Contact Email</Label>
                  <p className="text-base">{biller.contactEmail || "—"}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Contact Phone</Label>
                  <p className="text-base">{biller.contactPhone || "—"}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Created At</Label>
                  <p className="text-base">
                    {moment(biller.createdAt).format("MMMM DD, YYYY HH:mm")}
                  </p>
                </div>

                <div>
                  <Label className="text-muted-foreground">Last Updated</Label>
                  <p className="text-base">
                    {moment(biller.updatedAt).format("MMMM DD, YYYY HH:mm")}
                  </p>
                </div>
              </div>

              {biller.description && (
                <div>
                  <Label className="text-muted-foreground">Description</Label>
                  <p className="text-base mt-1">{biller.description}</p>
                </div>
              )}

              {biller.logoUrl && (
                <div>
                  <Label className="text-muted-foreground">Logo URL</Label>
                  <p className="text-base mt-1 break-all">{biller.logoUrl}</p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {!isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Change biller status</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex gap-2">
              <Button
                onClick={() => handleStatusChange("ACTIVE")}
                disabled={biller.status === "ACTIVE"}
                variant="outline"
              >
                Set Active
              </Button>
              <Button
                onClick={() => handleStatusChange("SUSPENDED")}
                disabled={biller.status === "SUSPENDED"}
                variant="outline"
              >
                Suspend
              </Button>
              <Button
                onClick={() => handleStatusChange("INACTIVE")}
                disabled={biller.status === "INACTIVE"}
                variant="outline"
              >
                Deactivate
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </main>
  );
}

