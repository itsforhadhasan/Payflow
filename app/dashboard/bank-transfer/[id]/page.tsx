"use client";

import { BANK_TRANSFER_DETAILS } from "@/actions/bank-actions";
import type { BankTransfer } from "@/actions/bank-actions";
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

export default function BankTransferDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const [transfer, setTransfer] = useState<BankTransfer | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchTransferDetails();
  }, [id]);

  const fetchTransferDetails = async () => {
    setIsLoading(true);
    const response = await BANK_TRANSFER_DETAILS(id);

    if (response.success && response.data) {
      setTransfer(response.data);
    } else {
      toast.error("Failed to fetch transfer details");
    }
    setIsLoading(false);
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, "default" | "secondary" | "destructive"> = {
      COMPLETED: "default",
      PENDING: "secondary",
      PROCESSING: "secondary",
      FAILED: "destructive",
    };
    return <Badge variant={variants[status] || "secondary"}>{status}</Badge>;
  };

  if (isLoading) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          Loading transfer details...
        </div>
      </main>
    );
  }

  if (!transfer) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          Bank transfer not found
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
          <Link href="/dashboard/bank-transfer" className="transition-colors hover:text-foreground">
            Bank Transfer
          </Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/dashboard/bank-transfer/history" className="transition-colors hover:text-foreground">
            History
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">Transfer Details</span>
        </nav>

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/bank-transfer/history">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold md:text-2xl">Bank Transfer Details</h1>
              <p className="text-sm text-muted-foreground font-mono">
                {transfer.transactionId}
              </p>
            </div>
          </div>
          {getStatusBadge(transfer.status)}
        </div>

        {/* Transfer Information */}
        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Transfer Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Transaction ID</span>
                <span className="font-mono text-sm">{transfer.transactionId}</span>
              </div>
              <Separator />
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Reference Number</span>
                <span className="font-mono text-sm">{transfer.referenceNumber}</span>
              </div>
              <Separator />
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Amount</span>
                <span className="text-xl font-bold">৳{transfer.amount.toLocaleString()}</span>
              </div>
              <Separator />
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Processing Fee</span>
                <span className="font-semibold">
                  ৳{transfer.fee.toLocaleString()}
                  {transfer.fee === 0 && " (FREE)"}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Total Amount</span>
                <span className="text-lg font-bold">
                  ৳{transfer.totalAmount.toLocaleString()}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Status</span>
                {getStatusBadge(transfer.status)}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Bank Account Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Bank Name</span>
                <span className="font-semibold">{transfer.bankName}</span>
              </div>
              <Separator />
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Account Holder</span>
                <span>{transfer.accountHolderName}</span>
              </div>
              <Separator />
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Account Number</span>
                <span className="font-mono text-sm">{transfer.accountNumber}</span>
              </div>
              {transfer.routingNumber && (
                <>
                  <Separator />
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Routing Number</span>
                    <span className="font-mono text-sm">{transfer.routingNumber}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {/* Timeline */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Initiated At</span>
                <span className="text-sm">
                  {moment(transfer.createdAt).format("MMM DD, YYYY HH:mm:ss")}
                </span>
              </div>
              <Separator />
              <div className="flex justify-between py-2">
                <span className="text-muted-foreground">Last Updated</span>
                <span className="text-sm">
                  {moment(transfer.updatedAt).format("MMM DD, YYYY HH:mm:ss")}
                </span>
              </div>
              {transfer.transaction && transfer.transaction.completedAt && (
                <>
                  <Separator />
                  <div className="flex justify-between py-2">
                    <span className="text-muted-foreground">Completed At</span>
                    <span className="text-sm">
                      {moment(transfer.transaction.completedAt).format("MMM DD, YYYY HH:mm:ss")}
                    </span>
                  </div>
                </>
              )}
              {transfer.transaction && transfer.transaction.description && (
                <>
                  <Separator />
                  <div className="py-2">
                    <span className="text-muted-foreground block mb-2">Description</span>
                    <p className="text-sm">{transfer.transaction.description}</p>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
}

