"use client";

import { BANK_TRANSFER_HISTORY } from "@/actions/bank-actions";
import type { BankTransfer } from "@/actions/bank-actions";
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
import { ChevronRight, ChevronLeft, Eye, Home } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function BankTransferHistoryPage() {
  const [transfers, setTransfers] = useState<BankTransfer[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const limit = 10;

  useEffect(() => {
    fetchTransfers();
  }, [currentPage, statusFilter]);

  const fetchTransfers = async () => {
    setIsLoading(true);
    const response = await BANK_TRANSFER_HISTORY(
      currentPage,
      limit,
      statusFilter === "all" ? undefined : statusFilter
    );

    if (response.success && response.data) {
      setTransfers(response.data.transfers);
      setTotalPages(response.data.pagination.totalPages);
    } else {
      toast.error("Failed to fetch bank transfers");
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
          <ChevronRight className="h-4 w-4" />
          <Link href="/dashboard/bank-transfer" className="transition-colors hover:text-foreground">
            Bank Transfer
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">History</span>
        </nav>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-lg font-semibold md:text-2xl">Bank Transfer History</h1>
            <p className="text-sm text-muted-foreground">
              View and manage your bank transfer history
            </p>
          </div>
          <Link href="/dashboard/bank-transfer">
            <Button>New Transfer</Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-4">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="COMPLETED">Completed</SelectItem>
              <SelectItem value="PENDING">Pending</SelectItem>
              <SelectItem value="PROCESSING">Processing</SelectItem>
              <SelectItem value="FAILED">Failed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Transfers Table */}
        <div className="rounded-lg border bg-card overflow-hidden">
          {isLoading ? (
            <div className="p-6 text-sm text-muted-foreground">Loading transfers...</div>
          ) : transfers.length === 0 ? (
            <div className="p-6 text-sm text-muted-foreground">No bank transfers found.</div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-[150px]">Transaction ID</TableHead>
                      <TableHead className="min-w-[150px]">Bank Name</TableHead>
                      <TableHead className="min-w-[150px]">Account Number</TableHead>
                      <TableHead className="min-w-[100px]">Amount</TableHead>
                      <TableHead className="min-w-[80px]">Fee</TableHead>
                      <TableHead className="min-w-[100px]">Status</TableHead>
                      <TableHead className="min-w-[140px]">Date</TableHead>
                      <TableHead className="w-[60px]">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {transfers.map((transfer) => (
                      <TableRow key={transfer.id}>
                        <TableCell className="font-mono text-xs min-w-[150px]">
                          {transfer.transactionId}
                        </TableCell>
                        <TableCell className="min-w-[150px]">
                          {transfer.bankName}
                        </TableCell>
                        <TableCell className="font-mono text-sm min-w-[150px]">
                          {transfer.accountNumber}
                        </TableCell>
                        <TableCell className="font-semibold min-w-[100px]">
                          {formatCurrency(transfer.amount)}
                        </TableCell>
                        <TableCell className="text-muted-foreground min-w-[80px]">
                          {formatCurrency(transfer.fee)}
                        </TableCell>
                        <TableCell className="min-w-[100px]">
                          {getStatusBadge(transfer.status)}
                        </TableCell>
                        <TableCell className="text-sm min-w-[140px] whitespace-nowrap">
                          {moment(transfer.createdAt).format("MMM DD, YYYY HH:mm")}
                        </TableCell>
                        <TableCell className="w-[60px]">
                          <Link href={`/dashboard/bank-transfer/${transfer.id}`}>
                            <Button variant="ghost" size="icon">
                              <Eye className="h-4 w-4" />
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
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

