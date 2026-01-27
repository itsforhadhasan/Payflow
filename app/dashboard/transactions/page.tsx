"use client";

import { TRANSACTION_HISTORY } from "@/actions/transaction-actions";
import type { Transaction } from "@/actions/wallet-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
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
import { ChevronRight as BreadcrumbIcon, ChevronLeft, ChevronRight, Eye, Home } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const limit = 20;

  useEffect(() => {
    fetchTransactions();
  }, [currentPage, typeFilter, statusFilter]);

  const fetchTransactions = async () => {
    setIsLoading(true);
    const response = await TRANSACTION_HISTORY(
      currentPage,
      limit,
      typeFilter === "all" ? undefined : typeFilter,
      statusFilter === "all" ? undefined : statusFilter
    );

    if (response.success && response.data) {
      setTransactions(response.data.transactions);
      setTotalPages(response.data.pagination.totalPages);
    } else {
      toast.error("Failed to fetch transactions");
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

  const formatCurrency = (amount: number) => {
    return `৳${amount.toLocaleString()}`;
  };

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col gap-4">
        <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <Link href="/dashboard" className="transition-colors hover:text-foreground">
            <Home className="h-4 w-4" />
          </Link>
          <BreadcrumbIcon className="h-4 w-4" />
          <span className="text-foreground">Transactions</span>
        </nav>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Transaction History</h1>
            <p className="text-sm text-muted-foreground">
              View and manage your transaction history
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="SEND_MONEY">Send Money</SelectItem>
              <SelectItem value="ADD_MONEY">Add Money</SelectItem>
              <SelectItem value="CASH_OUT">Cash Out</SelectItem>
              <SelectItem value="CASH_IN">Cash In</SelectItem>
              <SelectItem value="BILL_PAYMENT">Bill Payment</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transactions Table */}
        <div className="rounded-lg border bg-card overflow-hidden">
          {isLoading ? (
            <div className="p-6 text-sm text-muted-foreground">Loading transactions...</div>
          ) : transactions.length === 0 ? (
            <div className="p-6 text-sm text-muted-foreground">No transactions found.</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[180px]">Transaction ID</TableHead>
                      <TableHead className="min-w-[120px]">Type</TableHead>
                      <TableHead className="min-w-[100px]">Amount</TableHead>
                      <TableHead className="min-w-[80px]">Fee</TableHead>
                      <TableHead className="min-w-[100px]">Status</TableHead>
                      <TableHead className="min-w-[140px]">Date</TableHead>
                      <TableHead className="min-w-[200px] max-w-[300px]">Description</TableHead>
                      <TableHead className="w-[60px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transactions.map((transaction) => {
                      const isCreditTransaction = transaction.isCredited === true;
                      const colorClass = isCreditTransaction ? "text-green-600" : "text-red-600";

                      return (
                        <TableRow key={transaction.id}>
                          <TableCell className={`font-mono text-xs ${colorClass} min-w-[180px]`}>
                            {transaction.transactionId}
                          </TableCell>
                          <TableCell className={`${colorClass} min-w-[120px]`}>
                            {getTypeLabel(transaction.type)}
                          </TableCell>
                          <TableCell className={`font-semibold ${colorClass} min-w-[100px]`}>
                            {isCreditTransaction ? "+" : "−"}{formatCurrency(transaction.amount)}
                          </TableCell>
                          <TableCell className="text-muted-foreground min-w-[80px]">
                            {formatCurrency(transaction.fee)}
                          </TableCell>
                          <TableCell className="min-w-[100px]">{getStatusBadge(transaction.status)}</TableCell>
                          <TableCell className="text-sm min-w-[140px] whitespace-nowrap">
                            {moment(transaction.createdAt).format("MMM DD, YYYY HH:mm")}
                          </TableCell>
                          <TableCell className="text-sm text-muted-foreground min-w-[200px] max-w-[300px] whitespace-normal break-words">
                            {transaction.description || "—"}
                          </TableCell>
                          <TableCell className="w-[60px]">
                            <Link href={`/dashboard/transactions/${transaction.id}`}>
                              <Button variant="ghost" size="icon">
                                <Eye className="h-4 w-4" />
                              </Button>
                            </Link>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between border-t px-6 py-4">
                <p className="text-sm text-muted-foreground">
                  Page {currentPage} of {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                    disabled={currentPage === 1 || isLoading}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages || isLoading}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

