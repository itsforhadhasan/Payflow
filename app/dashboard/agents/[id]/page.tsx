"use client";

import {
  AGENT_APPROVE,
  AGENT_DETAILS,
  AGENT_REJECT,
  AGENT_TRANSACTIONS,
  type AgentDetails,
} from "@/actions/admin-agent-actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Building2, CheckCircle, DollarSign, MapPin, TrendingDown, TrendingUp, Wallet, XCircle } from "lucide-react";
import moment from "moment";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AgentDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [agent, setAgent] = useState<AgentDetails | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [actionInProgress, setActionInProgress] = useState(false);

  useEffect(() => {
    fetchAgentData();
  }, [id]);

  const fetchAgentData = async () => {
    setIsLoading(true);
    const [detailsResponse, transactionsResponse] = await Promise.all([
      AGENT_DETAILS(id),
      AGENT_TRANSACTIONS(id, 1, 10),
    ]);

    if (detailsResponse.success && detailsResponse.data) {
      setAgent(detailsResponse.data);
    } else {
      toast.error("Failed to fetch agent details");
    }

    if (transactionsResponse.success && transactionsResponse.data) {
      setTransactions(transactionsResponse.data.transactions || []);
    }

    setIsLoading(false);
  };

  const handleApprove = async () => {
    setActionInProgress(true);
    const response = await AGENT_APPROVE(id);

    if (response.success) {
      toast.success("Agent approved successfully");
      fetchAgentData();
    } else {
      toast.error(response.error || "Failed to approve agent");
    }
    setActionInProgress(false);
  };

  const handleReject = async () => {
    if (!rejectReason || rejectReason.length < 10) {
      toast.error("Rejection reason must be at least 10 characters");
      return;
    }

    setActionInProgress(true);
    const response = await AGENT_REJECT(id, rejectReason);

    if (response.success) {
      toast.success("Agent rejected successfully");
      setShowRejectDialog(false);
      setRejectReason("");
      fetchAgentData();
    } else {
      toast.error(response.error || "Failed to reject agent");
    }
    setActionInProgress(false);
  };

  if (isLoading) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          Loading agent details...
        </div>
      </main>
    );
  }

  if (!agent) {
    return (
      <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
        <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
          Agent not found
        </div>
      </main>
    );
  }

  const isPending = agent.agent?.status === "PENDING";
  const agentData = agent.agent;

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/dashboard/agents">
              <Button variant="outline" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-lg font-semibold md:text-2xl">
                {agentData?.business_name || "N/A"}
              </h1>
              <p className="text-sm text-muted-foreground">
                Agent Code: {agentData?.agent_code || "N/A"}
              </p>
            </div>
          </div>

          {isPending && (
            <div className="flex items-center gap-2">
              <Button
                onClick={handleApprove}
                disabled={actionInProgress}
                className="bg-green-600 hover:bg-green-700"
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Approve
              </Button>
              <Button
                onClick={() => setShowRejectDialog(true)}
                disabled={actionInProgress}
                variant="destructive"
              >
                <XCircle className="mr-2 h-4 w-4" />
                Reject
              </Button>
            </div>
          )}
        </div>

        {/* Status Badge */}
        <div>
          <Badge
            variant={
              agentData?.status === "ACTIVE"
                ? "default"
                : agentData?.status === "PENDING"
                  ? "secondary"
                  : "destructive"
            }
            className="text-sm"
          >
            {agentData?.status || "UNKNOWN"}
          </Badge>
        </div>

        {/* Wallet Stats */}
        {agentData?.wallet && (
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Balance</CardTitle>
                <Wallet className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  ৳{(agentData.wallet.balance || 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Available: ৳{(agentData.wallet.availableBalance || 0).toLocaleString()}
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
                  ৳{(agentData.wallet.dailyLimit || 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Spent: ৳{(agentData.wallet.dailySpent || 0).toLocaleString()}
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
                  ৳{(agentData.wallet.monthlyLimit || 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  Spent: ৳{(agentData.wallet.monthlySpent || 0).toLocaleString()}
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
                  ৳{(agentData.wallet.pendingBalance || 0).toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">
                  {agentData.wallet.currency || "BDT"}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Business Stats */}
        <div className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Commission Earned
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ৳{parseFloat(agentData?.total_commission_earned || "0").toLocaleString()}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Business Name</CardTitle>
              <Building2 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-xl font-semibold truncate">
                {agentData?.business_name || "N/A"}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Location</CardTitle>
              <MapPin className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-sm line-clamp-2">
                {agentData?.business_address || "N/A"}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Information */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Name</dt>
                <dd className="mt-1 text-sm">
                  {agentData?.user?.first_name || ""} {agentData?.user?.last_name || ""}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Email</dt>
                <dd className="mt-1 text-sm">{agentData?.user?.email || "N/A"}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">Phone</dt>
                <dd className="mt-1 text-sm">{agentData?.user?.phone || "N/A"}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">User ID</dt>
                <dd className="mt-1 text-sm font-mono">{agentData?.user?.id || "N/A"}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  User Status
                </dt>
                <dd className="mt-1">
                  <Badge>{agentData?.user?.status || "UNKNOWN"}</Badge>
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Registered
                </dt>
                <dd className="mt-1 text-sm">
                  {agentData?.user?.created_at
                    ? moment(agentData.user.created_at).format("MMM DD, YYYY")
                    : "N/A"}
                </dd>
              </div>
              {agentData?.approved_at && (
                <div>
                  <dt className="text-sm font-medium text-muted-foreground">
                    Approved At
                  </dt>
                  <dd className="mt-1 text-sm">
                    {moment(agentData.approved_at).format("MMM DD, YYYY HH:mm")}
                  </dd>
                </div>
              )}
              {agentData?.approver && (
                <>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Approved By
                    </dt>
                    <dd className="mt-1 text-sm">{agentData.approver.name}</dd>
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-muted-foreground">
                      Approver Email
                    </dt>
                    <dd className="mt-1 text-sm">{agentData.approver.email}</dd>
                  </div>
                </>
              )}
            </dl>
          </CardContent>
        </Card>

        {/* Business Information */}
        <Card>
          <CardHeader>
            <CardTitle>Business Information</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Agent ID
                </dt>
                <dd className="mt-1 text-sm font-mono">{agentData?.id || "N/A"}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Agent Code
                </dt>
                <dd className="mt-1 text-sm font-mono font-semibold">
                  {agentData?.agent_code || "N/A"}
                </dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Business Name
                </dt>
                <dd className="mt-1 text-sm">{agentData?.business_name || "N/A"}</dd>
              </div>
              <div>
                <dt className="text-sm font-medium text-muted-foreground">
                  Agent Status
                </dt>
                <dd className="mt-1">
                  <Badge>{agentData?.status || "UNKNOWN"}</Badge>
                </dd>
              </div>
              <div className="col-span-2">
                <dt className="text-sm font-medium text-muted-foreground">
                  Business Address
                </dt>
                <dd className="mt-1 text-sm">{agentData?.business_address || "N/A"}</dd>
              </div>
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

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reject Agent Application</DialogTitle>
            <DialogDescription>
              Please provide a reason for rejecting this agent application.
              This reason will be shared with the applicant.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea
              placeholder="Enter rejection reason (minimum 10 characters)..."
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              rows={4}
              disabled={actionInProgress}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowRejectDialog(false)}
              disabled={actionInProgress}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleReject}
              disabled={actionInProgress || rejectReason.length < 10}
            >
              {actionInProgress ? "Rejecting..." : "Reject Agent"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}

