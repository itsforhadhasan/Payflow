"use client";

import { GET_BILL_PAYMENT_HISTORY, type BillPayment } from "@/actions/bill-payment-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ChevronLeft, ChevronRight, Eye, FileText, Loader2 } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function BillPaymentHistoryPage() {
  const [payments, setPayments] = useState<BillPayment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [selectedPayment, setSelectedPayment] = useState<BillPayment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchPaymentHistory();
  }, [currentPage]);

  const fetchPaymentHistory = async () => {
    setIsLoading(true);
    const response = await GET_BILL_PAYMENT_HISTORY(currentPage, 10);

    if (response.success && response.data) {
      setPayments(response.data.payments);
      setTotalPages(response.data.pagination.totalPages);
      setTotal(response.data.pagination.total);
    } else {
      toast.error("Failed to fetch payment history");
    }
    setIsLoading(false);
  };

  const handleViewDetails = (payment: BillPayment) => {
    setSelectedPayment(payment);
    setIsModalOpen(true);
  };

  if (isLoading) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl">Bill Payment History</h1>
          <p className="text-sm text-muted-foreground">
            View all your bill payment transactions
          </p>
        </div>
        <Link href="/dashboard/bill-payment">
          <Button>
            <FileText className="mr-2 h-4 w-4" />
            Pay New Bill
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
          <CardDescription>
            {total > 0 ? `${total} payment${total !== 1 ? "s" : ""} found` : "No payments yet"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {payments.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground/50" />
              <h3 className="mt-4 text-lg font-semibold">No payments yet</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Start paying your bills to see them here
              </p>
              <Link href="/dashboard/bill-payment">
                <Button className="mt-4">Pay Your First Bill</Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="min-w-[140px]">Transaction ID</TableHead>
                        <TableHead className="min-w-[200px]">Biller</TableHead>
                        <TableHead className="min-w-[100px]">Amount</TableHead>
                        <TableHead className="min-w-[100px]">Status</TableHead>
                        <TableHead className="min-w-[140px]">Date</TableHead>
                        <TableHead className="w-[80px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {payments.map((payment) => (
                        <TableRow key={payment.id}>
                          <TableCell>
                            <span className="font-mono text-xs">
                              {payment.transactionId}
                            </span>
                          </TableCell>
                          <TableCell>
                            <div>
                              <div className="font-medium truncate max-w-[200px]">
                                {payment.biller.name}
                              </div>
                              <div className="text-xs text-muted-foreground">
                                {payment.biller.billType}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="font-semibold">
                              ৳{payment.amount.toLocaleString()}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={
                                payment.status === "COMPLETED"
                                  ? "default"
                                  : payment.status === "PENDING"
                                    ? "secondary"
                                    : "destructive"
                              }
                            >
                              {payment.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <span className="text-sm">
                              {moment(payment.createdAt).format("MMM DD, YYYY")}
                            </span>
                            <div className="text-xs text-muted-foreground">
                              {moment(payment.createdAt).format("HH:mm")}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => handleViewDetails(payment)}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
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

      {/* Payment Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Bill Payment Details</DialogTitle>
            <DialogDescription>
              Complete information about this bill payment
            </DialogDescription>
          </DialogHeader>
          
          {selectedPayment && (
            <div className="space-y-6">
              {/* Transaction Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase">
                  Transaction Information
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-muted-foreground">Transaction ID</Label>
                    <p className="text-sm font-mono font-medium mt-1">
                      {selectedPayment.transactionId}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Status</Label>
                    <div className="mt-1">
                      <Badge
                        variant={
                          selectedPayment.status === "COMPLETED"
                            ? "default"
                            : selectedPayment.status === "PENDING"
                              ? "secondary"
                              : "destructive"
                        }
                      >
                        {selectedPayment.status}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Payment Date</Label>
                    <p className="text-sm font-medium mt-1">
                      {moment(selectedPayment.createdAt).format("MMMM DD, YYYY")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {moment(selectedPayment.createdAt).format("hh:mm A")}
                    </p>
                  </div>
                  {selectedPayment.receiptNumber && (
                    <div>
                      <Label className="text-muted-foreground">Receipt Number</Label>
                      <p className="text-sm font-mono font-medium text-primary mt-1">
                        {selectedPayment.receiptNumber}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Biller Info */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase">
                  Biller Information
                </h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <Label className="text-muted-foreground">Biller Name</Label>
                    <p className="text-sm font-medium mt-1">
                      {selectedPayment.biller.name}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Biller Code</Label>
                    <p className="text-sm font-mono font-medium mt-1">
                      {selectedPayment.biller.billerCode}
                    </p>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Bill Type</Label>
                    <div className="mt-1">
                      <Badge variant="outline">{selectedPayment.biller.billType}</Badge>
                    </div>
                  </div>
                  <div>
                    <Label className="text-muted-foreground">Account Number</Label>
                    <p className="text-sm font-mono font-medium mt-1">
                      {selectedPayment.accountNumber}
                    </p>
                  </div>
                </div>
              </div>

              {/* Billing Period */}
              {(selectedPayment.billingMonth || selectedPayment.billingYear) && (
                <div className="space-y-4">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase">
                    Billing Period
                  </h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    {selectedPayment.billingMonth && (
                      <div>
                        <Label className="text-muted-foreground">Billing Month</Label>
                        <p className="text-sm font-medium mt-1">
                          {selectedPayment.billingMonth}
                        </p>
                      </div>
                    )}
                    {selectedPayment.billingYear && (
                      <div>
                        <Label className="text-muted-foreground">Billing Year</Label>
                        <p className="text-sm font-medium mt-1">
                          {selectedPayment.billingYear}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Payment Summary */}
              <div className="space-y-4">
                <h3 className="font-semibold text-sm text-muted-foreground uppercase">
                  Payment Summary
                </h3>
                <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Bill Amount:</span>
                    <span className="font-medium">
                      ৳{selectedPayment.amount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Transaction Fee:</span>
                    <span className="font-medium">
                      ৳{selectedPayment.fee.toLocaleString()}
                    </span>
                  </div>
                  <div className="h-px bg-border" />
                  <div className="flex justify-between font-semibold">
                    <span>Total Amount:</span>
                    <span>৳{selectedPayment.totalAmount.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </main>
  );
}

