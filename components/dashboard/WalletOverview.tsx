"use client";

import type { WalletData } from "@/actions/wallet-actions";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, TrendingDown, Wallet } from "lucide-react";

interface WalletOverviewProps {
  wallet: WalletData;
}

export default function WalletOverview({ wallet }: WalletOverviewProps) {
  const formatCurrency = (value: number) => {
    return `৳${value.toLocaleString()}`;
  };

  const dailyPercentage = wallet.dailyLimit > 0
    ? ((wallet.dailySpent / wallet.dailyLimit) * 100).toFixed(1)
    : "0.0";
  const monthlyPercentage = wallet.monthlyLimit > 0
    ? ((wallet.monthlySpent / wallet.monthlyLimit) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="space-y-6">
      {/* Balance Card */}
      <Card className="border-2 border-green-200 dark:border-green-800">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Available Balance</CardTitle>
          <div className="rounded-full p-2 bg-green-50 dark:bg-green-950/20">
            <Wallet className="h-4 w-4 text-green-500" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{formatCurrency(wallet.availableBalance)}</div>
          <p className="text-xs text-muted-foreground mt-1">
            {wallet.currency} • Real-time balance
          </p>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Daily Limit</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(wallet.dailyLimit)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className={wallet.dailySpent > wallet.dailyLimit * 0.8 ? "text-red-500" : "text-green-500"}>
                {dailyPercentage}% used
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Limit</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(wallet.monthlyLimit)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              <span className={wallet.monthlySpent > wallet.monthlyLimit * 0.8 ? "text-red-500" : "text-green-500"}>
                {monthlyPercentage}% used
              </span>
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Today's Spending</CardTitle>
            <TrendingDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(wallet.dailySpent)}</div>
            <p className="text-xs text-muted-foreground mt-1">
              {formatCurrency(wallet.dailyLimit - wallet.dailySpent)} remaining
            </p>
          </CardContent>
        </Card>
      </div>

    </div>
  );
}

