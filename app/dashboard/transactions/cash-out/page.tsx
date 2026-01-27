"use client";

import { CASH_OUT } from "@/actions/transaction-actions";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, Banknote, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  agentCode: z.string().regex(/^AG\d{7}$/, "Agent code must be in format AG1234567"),
  amount: z.string().min(1, "Amount is required").refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 50 && num <= 25000;
  }, "Amount must be between ৳50 and ৳25,000"),
  description: z.string().max(500, "Description must not exceed 500 characters").optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function CashOutPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      agentCode: "",
      amount: "",
      description: "",
    },
  });

  function onSubmit(data: FormValues) {
    startTransition(async () => {
      const response = await CASH_OUT({
        ...data,
        amount: parseFloat(data.amount),
      });

      if (response.success) {
        toast.success("Cash out successful! Redirecting...");
        form.reset();
        // Add a small delay to ensure the transaction is fully processed
        setTimeout(() => {
          window.location.href = "/dashboard/transactions";
        }, 1000);
      } else {
        toast.error(response.error || "Failed to cash out");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Calculate fee (1.85% for consumer)
  const amount = parseFloat(form.watch("amount")) || 0;
  const fee = amount * 0.0185;
  const total = amount + fee;
  const agentCommission = amount * 0.015;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col gap-4">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/dashboard" className="transition-colors hover:text-foreground">
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/dashboard/transactions" className="transition-colors hover:text-foreground">
            Transactions
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Cash Out</span>
        </nav>

        <div>
          <h1 className="text-lg font-semibold md:text-2xl">Cash Out</h1>
          <p className="text-sm text-muted-foreground">
            Withdraw cash from your wallet through an agent
          </p>
        </div>

        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Banknote className="h-5 w-5" />
                Cash Out
              </CardTitle>
              <CardDescription>
                Enter agent code and amount to withdraw cash
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="agentCode"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Agent Code</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="AG1234567"
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">
                          Enter the agent code (Format: AG + 7 digits)
                        </p>
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
                            placeholder="1000"
                            {...field}
                            onChange={(value) => field.onChange(value)}
                            disabled={isPending}
                          />
                        </FormControl>
                        <p className="text-xs text-muted-foreground">
                          Minimum: ৳50, Maximum: ৳25,000
                        </p>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Cash withdrawal..."
                            rows={3}
                            {...field}
                            disabled={isPending}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {amount > 0 && (
                    <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                      <h3 className="font-semibold">Transaction Summary</h3>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Cash Out Amount:</span>
                          <span>৳{amount.toLocaleString()}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Fee (1.85%):</span>
                          <span>৳{fee.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between border-t pt-2 font-semibold">
                          <span>Total Deducted:</span>
                          <span>৳{total.toFixed(2)}</span>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Agent receives: ৳{(amount + agentCommission).toFixed(2)} (includes ৳{agentCommission.toFixed(2)} commission)
                      </p>
                    </div>
                  )}

                  <div className="flex gap-4">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => router.back()}
                      disabled={isPending}
                    >
                      Cancel
                    </Button>
                    <Button type="submit" disabled={isPending} className="flex-1">
                      {isPending ? "Processing..." : "Cash Out"}
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

