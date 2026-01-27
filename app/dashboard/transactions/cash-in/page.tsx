"use client";

import { CASH_IN } from "@/actions/transaction-actions";
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
import { ChevronRight, ArrowDownLeft, Home, Info } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Alert, AlertDescription } from "@/components/ui/alert";

const FormSchema = z.object({
  consumerIdentifier: z.string().min(1, "Consumer email or phone is required"),
  amount: z.string().min(1, "Amount is required").refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 50 && num <= 25000;
  }, "Amount must be between ৳50 and ৳25,000"),
  description: z.string().max(500, "Description must not exceed 500 characters").optional(),
});

type FormValues = z.infer<typeof FormSchema>;

export default function CashInPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      consumerIdentifier: "",
      amount: "",
      description: "",
    },
  });

  function onSubmit(data: FormValues) {
    startTransition(async () => {
      const response = await CASH_IN({
        ...data,
        amount: parseFloat(data.amount),
      });

      if (response.success) {
        toast.success("Cash in successful! Consumer's wallet has been credited. Redirecting...");
        form.reset();
        // Add a small delay to ensure the transaction is fully processed
        setTimeout(() => {
          window.location.href = "/dashboard/transactions";
        }, 1000);
      } else {
        toast.error(response.error || "Failed to process cash in");
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }

  // Calculate commission (agent earns 0.15% commission)
  const amount = parseFloat(form.watch("amount")) || 0;
  const commission = amount * 0.0015; // 1.5% / 10 = 0.15%
  const agentNetCost = amount - commission;

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
          <span className="text-foreground">Cash In</span>
        </nav>

        <div>
          <h1 className="text-lg font-semibold md:text-2xl">Cash In</h1>
          <p className="text-sm text-muted-foreground">
            Accept physical cash from a consumer and credit their digital wallet
          </p>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            As an agent, you accept physical cash from consumers and credit their digital wallet.
            You earn a commission for this service.
          </AlertDescription>
        </Alert>

        <div className="grid gap-6 lg:grid-cols-5">
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Cash In Details</CardTitle>
              <CardDescription>
                Enter the consumer's information and the amount they want to deposit
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="consumerIdentifier"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Consumer Email or Phone</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="consumer@example.com or 01712345678"
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
                    name="amount"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Amount (৳)</FormLabel>
                        <FormControl>
                          <AmountField
                            placeholder="1000"
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
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description (Optional)</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Cash deposit"
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
                    <ArrowDownLeft className="mr-2 h-4 w-4" />
                    {isPending ? "Processing..." : "Process Cash In"}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Transaction Summary</CardTitle>
              <CardDescription>
                Review the cash in details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Amount to Credit</span>
                <span className="font-semibold">৳{amount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Consumer Fee</span>
                <span className="font-semibold text-green-600">৳0</span>
              </div>
              <div className="flex justify-between py-2 border-b">
                <span className="text-muted-foreground">Your Commission</span>
                <span className="font-semibold text-green-600">+৳{commission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="flex justify-between py-3 border-t-2">
                <span className="font-semibold">Consumer Receives</span>
                <span className="text-xl font-bold text-green-600">
                  ৳{amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between py-2">
                <span className="font-semibold">Your Net Cost</span>
                <span className="text-lg font-bold">
                  ৳{agentNetCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </span>
              </div>

              <Alert className="mt-4">
                <Info className="h-4 w-4" />
                <AlertDescription className="text-xs">
                  You will pay ৳{amount.toLocaleString()} from your wallet and receive ৳{commission.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} as commission from the platform.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

