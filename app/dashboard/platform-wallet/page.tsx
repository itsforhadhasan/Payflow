"use client";

import {
  GET_PLATFORM_WALLET_RECONCILIATION,
  GET_PLATFORM_WALLET_STATS,
  GET_PLATFORM_WALLET_TRANSACTIONS,
  type PlatformWalletStats,
  type PlatformWalletTransaction,
  type ReconciliationResult,
} from "@/actions/platform-wallet-actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertCircle,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  DollarSign,
  Loader2,
  RefreshCw,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function PlatformWalletPage() {
  const [stats, setStats] = useState<PlatformWalletStats | null>(null);
  const [transactions, setTransactions] = useState<PlatformWalletTransaction[]>([]);
  const [reconciliation, setReconciliation] = useState<ReconciliationResult | null>(
    null
  );
  const [isLoadingStats, setIsLoadingStats] = useState(true);
  const [isLoadingTransactions, setIsLoadingTransactions] = useState(true);
  const [isReconciling, setIsReconciling] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);

  useEffect(() => {
    fetchStats();
    fetchTransactions();
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [currentPage]);

  const fetchStats = async () => {
    setIsLoadingStats(true);
    const response = await GET_PLATFORM_WALLET_STATS();

    if (response.success && response.data) {
      setStats(response.data);
    } else {
      toast.error("Failed to fetch platform wallet stats");
    }
    setIsLoadingStats(false);
  };

  const fetchTransactions = async () => {
    setIsLoadingTransactions(true);
    const response = await GET_PLATFORM_WALLET_TRANSACTIONS(currentPage, 20);

    if (response.success && response.data) {
      setTransactions(response.data.transactions);
      setTotalPages(response.data.pagination.totalPages);
      setTotalItems(response.data.pagination.totalItems);
    } else {
      toast.error("Failed to fetch transactions");
    }
    setIsLoadingTransactions(false);
  };

  const handleReconciliation = async () => {
    setIsReconciling(true);
    const response = await GET_PLATFORM_WALLET_RECONCILIATION();

    if (response.success && response.data) {
      setReconciliation(response.data);
      if (response.data.success) {
        toast.success("Reconciliation successful! No discrepancies found.");
      } else {
        toast.warning(
          `Discrepancy detected: ৳${response.data.discrepancy.toLocaleString()}`
        );
      }
    } else {
      toast.error("Failed to perform reconciliation");
    }
    setIsReconciling(false);
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div>
        <h1 className="text-lg font-semibold md:text-2xl">Platform Wallet Management</h1>
        <p className="text-sm text-muted-foreground">
          Monitor and manage the platform wallet and reconciliation
        </p>
      </div>

      {/* Statistics Cards */}
      {isLoadingStats ? (
        <div className="flex items-center justify-center h-32">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : stats ? (
        <>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="border-2 border-blue-200 dark:border-blue-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Current Balance</CardTitle>
                <Wallet className="h-4 w-4 text-blue-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ৳{(stats.balance || 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Last updated: {stats.lastTransactionAt ? moment(stats.lastTransactionAt).fromNow() : "N/A"}
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 border-green-200 dark:border-green-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Fees Collected</CardTitle>
                <TrendingUp className="h-4 w-4 text-green-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ৳{(stats.totalFeesCollected || 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Cumulative</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-orange-200 dark:border-orange-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Commissions Paid
                </CardTitle>
                <TrendingDown className="h-4 w-4 text-orange-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ৳{(stats.totalCommissionsPaid || 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">To agents</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-purple-200 dark:border-purple-800">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Bonuses Given</CardTitle>
                <DollarSign className="h-4 w-4 text-purple-500" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ৳{(stats.totalBonusesGiven || 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">Welcome bonuses</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-emerald-200 dark:border-emerald-800 lg:col-span-2">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Net Revenue</CardTitle>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">
                  ৳{(stats.netRevenue || 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Fees - Commissions - Bonuses
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Reconciliation */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Wallet Reconciliation</CardTitle>
                  <CardDescription>
                    Verify platform wallet integrity and detect discrepancies
                  </CardDescription>
                </div>
                <Button onClick={handleReconciliation} disabled={isReconciling}>
                  {isReconciling ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <RefreshCw className="mr-2 h-4 w-4" />
                  )}
                  Run Reconciliation
                </Button>
              </div>
            </CardHeader>
            {reconciliation && (
              <CardContent>
                <div
                  className={`p-4 rounded-lg border-2 ${reconciliation.success
                    ? "bg-green-50 border-green-200 dark:bg-green-950 dark:border-green-800"
                    : "bg-yellow-50 border-yellow-200 dark:bg-yellow-950 dark:border-yellow-800"
                    }`}
                >
                  <div className="flex items-start gap-3">
                    {reconciliation.success ? (
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    ) : (
                      <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold mb-2">
                        {reconciliation.success
                          ? "Reconciliation Successful"
                          : "Discrepancy Detected"}
                      </h3>
                      <div className="grid gap-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Current Balance:
                          </span>
                          <span className="font-medium">
                            ৳{(reconciliation.currentBalance || 0).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">
                            Calculated Balance:
                          </span>
                          <span className="font-medium">
                            ৳{(reconciliation.calculatedBalance || 0).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between pt-2 border-t">
                          <span className="text-muted-foreground">Discrepancy:</span>
                          <span
                            className={`font-bold ${(reconciliation.discrepancy || 0) === 0
                              ? "text-green-600"
                              : "text-yellow-600"
                              }`}
                          >
                            ৳{Math.abs(reconciliation.discrepancy || 0).toLocaleString()}
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground pt-1">
                          Reconciliation performed at:{" "}
                          {moment(reconciliation.reconciliationTimestamp).format(
                            "MMMM DD, YYYY HH:mm:ss"
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>
        </>
      ) : null}

      {/* Transaction History */}
      <Card>
        <CardHeader>
          <CardTitle>Platform Wallet Transactions</CardTitle>
          <CardDescription>
            {totalItems > 0
              ? `${totalItems} transaction${totalItems !== 1 ? "s" : ""} found`
              : "No transactions yet"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoadingTransactions ? (
            <div className="flex items-center justify-center h-32">
              <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            </div>
          ) : transactions.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <p>No transactions found</p>
            </div>
          ) : (
            <>
              <div className="overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[80px]">ID</TableHead>
                        <TableHead className="min-w-[120px]">Amount</TableHead>
                        <TableHead className="min-w-[200px]">Description</TableHead>
                        <TableHead className="min-w-[160px]">Date</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {transactions.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell>
                            <span className="font-mono text-xs">
                              #{transaction.id}
                            </span>
                          </TableCell>
                          <TableCell>
                            <span
                              className={`font-semibold ${transaction.entryType === "CREDIT"
                                ? "text-green-600"
                                : "text-red-600"
                                }`}
                            >
                              {transaction.entryType === "CREDIT" ? "+" : "-"}৳
                              {(transaction.amount || 0).toLocaleString()}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div className="max-w-[200px]">
                              <p className="text-sm truncate">
                                {transaction.description}
                              </p>
                              {transaction.relatedTransactionId && (
                                <p className="text-xs text-muted-foreground font-mono">
                                  Ref: {transaction.relatedTransactionId}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">
                              {moment(transaction.createdAt).format("MMM DD, YYYY")}
                            </span>
                            <div className="text-xs text-muted-foreground">
                              {moment(transaction.createdAt).format("HH:mm:ss")}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                  <p className="text-sm text-muted-foreground">
                    Page {currentPage} of {totalPages}
                  </p>
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage - 1)}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="h-4 w-4" />
                      Previous
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(currentPage + 1)}
                      disabled={currentPage === totalPages}
                    >
                      Next
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </main>
  );
}

