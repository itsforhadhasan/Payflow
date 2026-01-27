"use client";

import {
  CONSUMER_DETAILS,
  CONSUMER_TRANSACTIONS,
  CONSUMER_UPDATE_STATUS,
  type ConsumerDetails,
} from "@/actions/admin-consumer-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowLeft, DollarSign, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function ConsumerDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [consumer, setConsumer] = useState<ConsumerDetails | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusChanging, setStatusChanging] = useState(false);

  useEffect(() => {
    fetchConsumerData();
  }, [id]);

  const fetchConsumerData = async () => {
    setIsLoading(true);
    const [detailsResponse, transactionsResponse] = await Promise.all([
      CONSUMER_DETAILS(id),
      CONSUMER_TRANSACTIONS(id, 1, 10),
    ]);

    if (detailsResponse.success && detailsResponse.data) {
      setConsumer(detailsResponse.data);
    } else {
      toast.error("Failed to fetch consumer details");
    }

    if (transactionsResponse.success && transactionsResponse.data) {
      setTransactions(transactionsResponse.data.transactions || []);
    }

    setIsLoading(false);
  };

  const handleStatusChange = async (newStatus: string) => {
    setStatusChanging(true);
    const response = await CONSUMER_UPDATE_STATUS(
      id,
      newStatus as "ACTIVE" | "SUSPENDED" | "REJECTED"
    );

    if (response.success) {
      toast.success("Consumer status updated successfully");
      fetchConsumerData();
    } else {
      toast.error(response.error || "Failed to update status");
    }
    setStatusChanging(false);
  };

  if (isLoading) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          Loading consumer details...
        </div>
      </main>
    );
  }

  if (!consumer) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          Consumer not found
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/consumers">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold md:text-2xl">
                {consumer.user.firstName} {consumer.user.lastName}
              </h1>
              <p className="text-sm text-muted-foreground">
                Consumer ID: {consumer.user.id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Status:</span>
            <Select
              value={consumer.user.status}
              onValueChange={handleStatusChange}
              disabled={statusChanging}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="SUSPENDED">Suspended</SelectItem>
                <SelectItem value="REJECTED">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Wallet Stats */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Balance</CardTitle>
              <Wallet className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ৳{consumer.wallet.balance.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Available: ৳{consumer.wallet.availableBalance.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Limit</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ৳{consumer.wallet.dailyLimit.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Spent: ৳{consumer.wallet.dailySpent.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Monthly Limit</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ৳{consumer.wallet.monthlyLimit.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                Spent: ৳{consumer.wallet.monthlySpent.toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Pending</CardTitle>
              <TrendingDown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ৳{consumer.wallet.pendingBalance.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                {consumer.wallet.currency}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* User Information */}
        <Card>
          <CardHeader>
            <CardTitle>User Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                <dd className="mt-1 text-sm">{consumer.user.email}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
                <dd className="mt-1 text-sm">{consumer.user.phone}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Email Verified
                </dt>
                <dd className="mt-1">
                  <Badge
                    variant={
                      consumer.user.emailVerified ? "default" : "secondary"
                    }
                  >
                    {consumer.user.emailVerified ? "Yes" : "No"}
                  </Badge>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Phone Verified
                </dt>
                <dd className="mt-1">
                  <Badge
                    variant={
                      consumer.user.phoneVerified ? "default" : "secondary"
                    }
                  >
                    {consumer.user.phoneVerified ? "Yes" : "No"}
                  </Badge>
                </dd>
              </div>
              {consumer.user.dateOfBirth && (
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Date of Birth
                  </dt>
                  <dd className="mt-1 text-sm">{consumer.user.dateOfBirth}</dd>
                </div>
              )}
              {consumer.user.nidNumber && (
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    NID Number
                  </dt>
                  <dd className="mt-1 text-sm">{consumer.user.nidNumber}</dd>
                </div>
              )}
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Joined
                </dt>
                <dd className="mt-1 text-sm">
                  {moment(consumer.user.createdAt).format("MMM DD, YYYY")}
                </dd>
              </div>
              {consumer.user.lastLoginAt && (
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Last Login
                  </dt>
                  <dd className="mt-1 text-sm">
                    {moment(consumer.user.lastLoginAt).format(
                      "MMM DD, YYYY HH:mm"
                    )}
                  </dd>
                </div>
              )}
            </dl>
          </CardContent>
        </Card>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Fee</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.length > 0 ? (
                    transactions.map((txn) => (
                      <TableRow key={txn.id}>
                        <TableCell className="font-mono text-xs">
                          {txn.transactionId}
                        </TableCell>
                        <TableCell>{txn.type}</TableCell>
                        <TableCell>৳{txn.amount.toLocaleString()}</TableCell>
                        <TableCell>৳{txn.fee.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              txn.status === "COMPLETED"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {txn.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {moment(txn.createdAt).format("MMM DD, YYYY")}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center text-muted-foreground">
                        No transactions found
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}

