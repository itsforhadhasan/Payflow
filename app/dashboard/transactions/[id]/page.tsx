"use client";

import { TRANSACTION_DETAILS } from "@/actions/transaction-actions";
import type { Transaction } from "@/actions/wallet-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, ChevronRight, Home } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TransactionDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTransactionDetails();
  }, [id]);

  const fetchTransactionDetails = async () => {
    setIsLoading(true);
    const response = await TRANSACTION_DETAILS(id);

    if (response.success && response.data) {
      setTransaction(response.data);
    } else {
      toast.error("Failed to fetch transaction details");
    }
    setIsLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      COMPLETED: "default",
      PENDING: "secondary",
      FAILED: "destructive",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  const getTypeLabel = (type: string) => {
    const labels: Record<string, string> = {
      SEND_MONEY: "Send Money",
      ADD_MONEY: "Add Money",
      CASH_OUT: "Cash Out",
      CASH_IN: "Cash In",
      BILL_PAYMENT: "Bill Payment",
      BANK_TRANSFER: "Bank Transfer",
      CASHBACK: "Cashback",
      COMMISSION: "Commission",
      ONBOARDING_BONUS: "Onboarding Bonus",
    };
    return labels[type] || type;
  };

  if (isLoading) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          Loading transaction details...
        </div>
      </main>
    );
  }

  if (!transaction) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          Transaction not found
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col gap-4">
        {/* Breadcrumb */}
        <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/dashboard" className="transition-colors hover:text-foreground">
            <Home className="h-4 w-4" />
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/dashboard/transactions" className="transition-colors hover:text-foreground">
            Transactions
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Transaction Details</span>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/transactions">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold md:text-2xl">Transaction Details</h1>
              <p className="text-sm text-muted-foreground font-mono">
                {transaction.transactionId}
              </p>
            </div>
          </div>
          {getStatusBadge(transaction.status)}
        </div>

        {/* Transaction Information */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Transaction Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-mono text-sm">{transaction.transactionId}</span>
              </div>
              <Separator />
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Type</span>
                <span className="font-semibold">{getTypeLabel(transaction.type)}</span>
              </div>
              <Separator />
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Amount</span>
                <span className="text-xl font-bold">৳{transaction.amount.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Fee</span>
                <span className="font-semibold">৳{transaction.fee.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Status</span>
                {getStatusBadge(transaction.status)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Created At</span>
                <span className="text-sm">
                  {moment(transaction.createdAt).format("MMM DD, YYYY HH:mm:ss")}
                </span>
              </div>
              <Separator />
              {transaction.completedAt && (
                <>
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Completed At</span>
                    <span className="text-sm">
                      {moment(transaction.completedAt).format("MMM DD, YYYY HH:mm:ss")}
                    </span>
                  </div>
                  <Separator />
                </>
              )}
              {transaction.description && (
                <div className="py-2">
                  <span className="text-muted-foreground block mb-2">Description</span>
                  <p className="text-sm">{transaction.description}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Sender & Receiver Information */}
          {(transaction.sender || transaction.receiver) && (
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Parties Involved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 md:grid-cols-2">
                  {transaction.sender && (
                    <div>
                      <h3 className="font-semibold mb-4">Sender</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Name</span>
                          <span>{transaction.sender.name}</span>
                        </div>
                        {transaction.sender.phone && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Phone</span>
                            <span>{transaction.sender.phone}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">User ID</span>
                          <span className="font-mono text-sm">{transaction.sender.id}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {transaction.receiver && (
                    <div>
                      <h3 className="font-semibold mb-4">Receiver</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Name</span>
                          <span>{transaction.receiver.name}</span>
                        </div>
                        {transaction.receiver.phone && (
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Phone</span>
                            <span>{transaction.receiver.phone}</span>
                          </div>
                        )}
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">User ID</span>
                          <span className="font-mono text-sm">{transaction.receiver.id}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </main>
  );
}

