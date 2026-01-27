"use client";

import { ADD_MONEY } from "@/actions/transaction-actions";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { ChevronRight, CreditCard, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  amount: z.string().min(1, "Amount is required").refine((val) => {
    const num = parseFloat(val);
    return !isNaN(num) && num >= 50 && num <= 25000;
  }, "Amount must be between ৳50 and ৳25,000"),
  cardNumber: z.string().length(16, "Card number must be 16 digits").regex(/^\d+$/, "Card number must contain only digits"),
  cardHolderName: z.string().min(3, "Card holder name must be at least 3 characters"),
  expiryMonth: z.string().length(2, "Month must be 2 digits").regex(/^(0[1-9]|1[0-2])$/, "Invalid month (01-12)"),
  expiryYear: z.string().length(2, "Year must be 2 digits").regex(/^\d{2}$/, "Invalid year"),
  cvv: z.string().length(3, "CVV must be 3 digits").regex(/^\d{3}$/, "CVV must contain only digits"),
});

type FormValues = z.infer<typeof FormSchema>;

export default function AddMoneyPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: "",
      cardNumber: "",
      cardHolderName: "",
      expiryMonth: "",
      expiryYear: "",
      cvv: "",
    },
  });

  function onSubmit(data: FormValues) {
    startTransition(async () => {
      const response = await ADD_MONEY({
        ...data,
        amount: parseFloat(data.amount),
      });

      if (response.success) {
        toast.success("Money added successfully! Redirecting...");
        form.reset();
        // Add a small delay to ensure the transaction is fully processed
        setTimeout(() => {
          window.location.href = "/dashboard/transactions";
        }, 1000);
      } else {
        toast.error(response.error || "Failed to add money");
      }
    });
  }

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
          <span className="text-foreground">Add Money</span>
        </nav>

        <div>
          <h1 className="text-lg font-semibold md:text-2xl">Add Money</h1>
          <p className="text-sm text-muted-foreground">
            Add money to your wallet from your debit or credit card
          </p>
        </div>

        <div className="max-w-2xl">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Card Details
              </CardTitle>
              <CardDescription>
                Enter your card information to add money to your wallet
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                    name="cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="1234567890123456"
                            maxLength={16}
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
                    name="cardHolderName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Holder Name</FormLabel>
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

                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={form.control}
                      name="expiryMonth"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Month</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="MM"
                              maxLength={2}
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
                      name="expiryYear"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Year</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="YY"
                              maxLength={2}
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
                      name="cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="123"
                              maxLength={3}
                              {...field}
                              disabled={isPending}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

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
                      {isPending ? "Processing..." : "Add Money"}
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

