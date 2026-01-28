"use client";

import { GET_BILLERS, PAY_BILL, type Biller, type PayBillData } from "@/actions/bill-payment-actions";
import { AmountField } from "@/components/ui/amount-field";
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
import { ArrowRight, CheckCircle2, FileText, Loader2, Search } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - 2 + i);

const FormSchema = z.object({
  billerId: z.string().min(1, "Please select a biller"),
  accountNumber: z
    .string()
    .min(5, "Account number must be at least 5 characters")
    .max(50, "Account number is too long")
    .regex(/^[a-zA-Z0-9-]+$/, "Only alphanumeric characters and hyphens allowed"),
  amount: z.number().min(10, "Minimum amount is ৳10").max(100000, "Maximum amount is ৳100,000"),
  billingMonth: z.string().optional(),
  billingYear: z.number().optional(),
  description: z.string().max(500, "Description is too long").optional(),
});

type FormData = z.infer<typeof FormSchema>;

export default function BillPaymentPage() {
  const [billers, setBillers] = useState<Biller[]>([]);
  const [filteredBillers, setFilteredBillers] = useState<Biller[]>([]);
  const [isLoadingBillers, setIsLoadingBillers] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedBiller, setSelectedBiller] = useState<Biller | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const billerId = watch("billerId");
  const amount = watch("amount");
  const billingMonth = watch("billingMonth");
  const billingYear = watch("billingYear");

  useEffect(() => {
    fetchBillers();
  }, []);

  useEffect(() => {
    filterBillersList();
  }, [billers, searchQuery, filterType]);

  useEffect(() => {
    if (billerId) {
      const biller = billers.find((b) => b.id === billerId);
      setSelectedBiller(biller || null);
    } else {
      setSelectedBiller(null);
    }
  }, [billerId, billers]);

  const fetchBillers = async () => {
    setIsLoadingBillers(true);
    const response = await GET_BILLERS();

    console.log(response);

    if (response.success && response.data) {
      setBillers(response.data.billers);
    } else {
      toast.error("Failed to fetch billers");
    }
    setIsLoadingBillers(false);
  };

  const filterBillersList = () => {
    let filtered = billers;

    if (filterType !== "all") {
      filtered = filtered.filter((b) => b.billType === filterType);
    }

    if (searchQuery) {
      filtered = filtered.filter((b) =>
        b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.billerCode.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredBillers(filtered);
  };

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    const paymentData: PayBillData = {
      billerId: data.billerId,
      accountNumber: data.accountNumber,
      amount: data.amount,
      billingMonth: data.billingMonth,
      billingYear: data.billingYear,
      description: data.description,
    };

    const response = await PAY_BILL(paymentData);

    if (response.success && response.data) {
      toast.success("Bill payment successful!");
      setPaymentSuccess(true);
      reset();
      setSelectedBiller(null);
    } else {
      toast.error(response.error || "Failed to process bill payment");
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    setIsSubmitting(false);
  };

  if (paymentSuccess) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
          <CheckCircle2 className="h-16 w-16 text-green-500" />
          <h2 className="text-2xl font-semibold">Payment Successful!</h2>
          <p className="text-muted-foreground text-center max-w-md">
            Your bill payment has been processed successfully. Check your payment history for details.
          </p>
          <div className="flex gap-4">
            <Button onClick={() => setPaymentSuccess(false)}>
              Pay Another Bill
            </Button>
            <Link href="/dashboard/bill-payment/history">
              <Button variant="outline">
                <FileText className="mr-2 h-4 w-4" />
                View History
              </Button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl">Pay Bills</h1>
          <p className="text-sm text-muted-foreground">
            Pay your utility bills with zero transaction fees
          </p>
        </div>
        <Link href="/dashboard/bill-payment/history">
          <Button variant="outline">
            <FileText className="mr-2 h-4 w-4" />
            Payment History
          </Button>
        </Link>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {/* Biller Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Select Biller</CardTitle>
            <CardDescription>Choose the service provider</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search billers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="ELECTRICITY">Electricity</SelectItem>
                <SelectItem value="GAS">Gas</SelectItem>
                <SelectItem value="WATER">Water</SelectItem>
                <SelectItem value="INTERNET">Internet</SelectItem>
                <SelectItem value="MOBILE">Mobile</SelectItem>
                <SelectItem value="TV">TV</SelectItem>
                <SelectItem value="ORGANIZATION">Organization</SelectItem>
              </SelectContent>
            </Select>

            {isLoadingBillers ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : (
              <div className="space-y-2 max-h-[400px] overflow-y-auto">
                {filteredBillers.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">
                    No billers found
                  </p>
                ) : (
                  filteredBillers.map((biller) => (
                    <button
                      key={biller.id}
                      type="button"
                      onClick={() => setValue("billerId", biller.id)}
                      className={`w-full text-left p-3 rounded-lg border transition-colors ${billerId === biller.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                        }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <p className="font-medium truncate">{biller.name}</p>
                          <p className="text-xs text-muted-foreground font-mono">
                            {biller.billerCode}
                          </p>
                        </div>
                        <Badge variant="outline" className="shrink-0">
                          {biller.billType}
                        </Badge>
                      </div>
                      {biller.description && (
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                          {biller.description}
                        </p>
                      )}
                    </button>
                  ))
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Form */}
        <Card>
          <CardHeader>
            <CardTitle>Payment Details</CardTitle>
            <CardDescription>
              {selectedBiller ? `Paying to ${selectedBiller.name}` : "Select a biller to continue"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <input type="hidden" {...register("billerId")} />

              <div className="space-y-2">
                <Label htmlFor="accountNumber">
                  Account Number <span className="text-destructive">*</span>
                </Label>
                <Input
                  id="accountNumber"
                  placeholder="Enter your account number"
                  {...register("accountNumber")}
                  disabled={!selectedBiller}
                />
                {errors.accountNumber && (
                  <p className="text-sm text-destructive">{errors.accountNumber.message}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">
                  Amount (৳) <span className="text-destructive">*</span>
                </Label>
                <AmountField
                  id="amount"
                  placeholder="0.00"
                  value={amount?.toString() || ""}
                  onChange={(value) => setValue("amount", parseFloat(value) || 0)}
                  disabled={!selectedBiller}
                />
                <p className="text-xs text-muted-foreground">
                  Min: ৳10 | Max: ৳100,000 | Fee: ৳0
                </p>
                {errors.amount && (
                  <p className="text-sm text-destructive">{errors.amount.message}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="billingMonth">Billing Month (Optional)</Label>
                  <Select
                    value={billingMonth}
                    onValueChange={(value) => setValue("billingMonth", value)}
                    disabled={!selectedBiller}
                  >
                    <SelectTrigger id="billingMonth">
                      <SelectValue placeholder="Select month" />
                    </SelectTrigger>
                    <SelectContent>
                      {MONTHS.map((month) => (
                        <SelectItem key={month} value={month}>
                          {month}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="billingYear">Billing Year (Optional)</Label>
                  <Select
                    value={billingYear?.toString()}
                    onValueChange={(value) => setValue("billingYear", parseInt(value))}
                    disabled={!selectedBiller}
                  >
                    <SelectTrigger id="billingYear">
                      <SelectValue placeholder="Select year" />
                    </SelectTrigger>
                    <SelectContent>
                      {YEARS.map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description (Optional)</Label>
                <Textarea
                  id="description"
                  placeholder="Payment note or reference..."
                  rows={3}
                  {...register("description")}
                  disabled={!selectedBiller}
                />
                {errors.description && (
                  <p className="text-sm text-destructive">{errors.description.message}</p>
                )}
              </div>

              {amount > 0 && (
                <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bill Amount:</span>
                    <span className="font-medium">৳{amount.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Transaction Fee:</span>
                    <span className="font-medium text-green-600">৳0.00</span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount:</span>
                    <span>৳{amount.toLocaleString()}</span>
                  </div>
                </div>
              )}

              <Button
                type="submit"
                className="w-full"
                disabled={!selectedBiller || isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <ArrowRight className="mr-2 h-4 w-4" />
                )}
                {isSubmitting ? "Processing..." : "Pay Bill"}
              </Button>

              {errors.billerId && (
                <p className="text-sm text-destructive text-center">
                  {errors.billerId.message}
                </p>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

