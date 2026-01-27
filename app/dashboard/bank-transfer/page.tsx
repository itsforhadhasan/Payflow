"use client";

import { BANK_TRANSFER_INITIATE } from "@/actions/bank-actions";
import { PROFILE_FETCH } from "@/actions/profile-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { AmountField } from "@/components/ui/amount-field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Building2, Home, Info } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  bankName: z.string().min(2, "Bank name must be at least 2 characters").max(100, "Bank name must not exceed 100 characters"),
  accountNumber: z.string().regex(/^\d{5,50}$/, "Account number must be 5-50 digits"),
  accountHolderName: z.string().min(2, "Account holder name must be at least 2 characters").max(255, "Account holder name must not exceed 255 characters"),
  routingNumber: z.string().regex(/^\d{9,20}$/, "Routing number must be 9-20 digits").optional().or(z.literal("")),
  transferType: z.enum(["INSTANT", "STANDARD"], {
    required_error: "Please select a transfer type",
  }),
  amount: z.string().min(1, "Amount is required").refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 10 && num <= 100000;
  }, "Amount must be between ৳10 and ৳100,000"),
  description: z.string().max(500, "Description must not exceed 500 characters").optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function BankTransferPage() {
  const [isPending, startTransition] = useTransition();
  const [isAgent, setIsAgent] = useState(false);
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      bankName: "",
      accountNumber: "",
      accountHolderName: "",
      routingNumber: "",
      transferType: "INSTANT",
      amount: "",
      description: "",
    },
  });

  useEffect(() => {
    checkUserType();
  }, []);

  const checkUserType = async () => {
    const response = await PROFILE_FETCH();
    if (response.success && response.data) {
      setIsAgent(response.data.role === "AGENT");
    }
  };

  function onSubmit(data: FormValues) {
    startTransition(async () => {
      const response = await BANK_TRANSFER_INITIATE({
        ...data,
        amount: parseFloat(data.amount),
        routingNumber: data.routingNumber || undefined,
      });

      if (response.success) {
        toast.success("Bank transfer completed successfully! Redirecting...");
        form.reset();
        setTimeout(() => {
          router.push("/dashboard/bank-transfer/history");
        }, 1000);
      } else {
        toast.error(response.error || "Failed to process bank transfer");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Calculate fee and total
  const amount = parseFloat(form.watch("amount")) || 0;
  const fee = isAgent ? 0 : Math.max(amount * 0.015, 10); // 1.5% for consumer, minimum ৳10
  const total = amount + fee;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col gap-4">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/dashboard" className="transition-colors hover:text-foreground">
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Bank Transfer</span>
        </nav>

        <div>
          <h1 className="text-lg font-semibold md:text-2xl">Bank Transfer</h1>
          <p className="text-sm text-muted-foreground">
            Transfer money from your wallet to a bank account
          </p>
        </div>

        {isAgent && (
          <Alert>
            <Info className="h-4 w-4" />
            <AlertDescription>
              As an agent, you enjoy <strong>zero fees</strong> on all bank transfers!
            </AlertDescription>
          </Alert>
        )}

        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Transfer Details</CardTitle>
              <CardDescription>
                Enter the bank account information and transfer amount
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="bankName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Bank Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Dutch Bangla Bank"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="accountNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Account Number</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="1234567890123456"
                              {...field}
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="routingNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Routing Number (Optional)</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="090271044"
                              {...field}
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="accountHolderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Account Holder Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="John Doe"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 md:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="transferType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Transfer Type</FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                            disabled={isPending}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select transfer type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="INSTANT">Instant</SelectItem>
                              <SelectItem value="STANDARD">Standard</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="amount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Amount (৳)</FormLabel>
                          <FormControl>
                            <AmountField
                              placeholder="5000"
                              {...field}
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Monthly savings"
                            {...field}
                            disabled={isPending}
                            rows={3}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={isPending}
                  >
                    <Building2 className="mr-2 h-4 w-4" />
                    {isPending ? "Processing..." : "Complete Transfer"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Transfer Summary</CardTitle>
              <CardDescription>
                Review your transfer details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Transfer Amount</span>
                <span className="font-semibold">৳{amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Processing Fee</span>
                <span className={`font-semibold ${isAgent ? "text-green-600" : ""}`}>
                  ৳{fee.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  {isAgent && " (FREE)"}
                </span>
              </div>
              <div className="flex justify-between py-3 border-t-2">
                <span className="font-semibold">Total Deduction</span>
                <span className="text-xl font-bold">
                  ৳{total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <Alert className="mt-4">
                <Info className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  {isAgent 
                    ? "Agents receive bank transfers with no fee. The transfer will be completed immediately."
                    : `Consumer fee: 1.5% of transfer amount (minimum ৳10). Your wallet will be debited ৳${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}.`
                  }
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

