"use client";

import { PROFILE_FETCH } from "@/actions/profile-actions";
import { WALLET_FETCH, type WalletData } from "@/actions/wallet-actions";
import { ANALYTICS_DASHBOARD, type DashboardAnalytics } from "@/actions/admin-analytics-actions";
import WalletOverview from "@/components/dashboard/WalletOverview";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Profile } from "@/types";
import { isAdminProfile, isUserProfile } from "@/types";
import {
  Building2,
  Crown,
  DollarSign,
  FolderOpen,
  TrendingUp,
  UserCheck,
  UserPlus,
  Users,
  UsersRound,
  Wallet,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

type MetricKey =
  | "new_projects_30d"
  | "new_admins_30d"
  | "new_participants_30d"
  | "new_moderators_30d"
  | "total_projects"
  | "total_admins"
  | "total_participants"
  | "total_moderators";

interface CardConfig {
  icon: React.ElementType;
  color: string;
  bgColor: string;
  borderColor: string;
}

interface AnalyticsCard {
  key: MetricKey;
  label: string;
  value: number;
}

const getCardConfig = (key: MetricKey): CardConfig => {
  const configs: Record<MetricKey, CardConfig> = {
    // 30-day metrics
    new_projects_30d: {
      icon: FolderOpen,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950/20",
      borderColor: "border-blue-200 dark:border-blue-800",
    },
    new_admins_30d: {
      icon: Crown,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950/20",
      borderColor: "border-purple-200 dark:border-purple-800",
    },
    new_participants_30d: {
      icon: UserPlus,
      color: "text-green-500",
      bgColor: "bg-green-50 dark:bg-green-950/20",
      borderColor: "border-green-200 dark:border-green-800",
    },
    new_moderators_30d: {
      icon: UserCheck,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950/20",
      borderColor: "border-orange-200 dark:border-orange-800",
    },
    // Total metrics
    total_projects: {
      icon: Building2,
      color: "text-indigo-500",
      bgColor: "bg-indigo-50 dark:bg-indigo-950/20",
      borderColor: "border-indigo-200 dark:border-indigo-800",
    },
    total_admins: {
      icon: Crown,
      color: "text-violet-500",
      bgColor: "bg-violet-50 dark:bg-violet-950/20",
      borderColor: "border-violet-200 dark:border-violet-800",
    },
    total_participants: {
      icon: Users,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/20",
      borderColor: "border-emerald-200 dark:border-emerald-800",
    },
    total_moderators: {
      icon: UsersRound,
      color: "text-amber-500",
      bgColor: "bg-amber-50 dark:bg-amber-950/20",
      borderColor: "border-amber-200 dark:border-amber-800",
    },
  };

  return (
    configs[key] || {
      icon: TrendingUp,
      color: "text-gray-500",
      bgColor: "bg-gray-50 dark:bg-gray-950/20",
      borderColor: "border-gray-200 dark:border-gray-800",
    }
  );
};

export default function Dashboard() {
  const [analytics, setAnalytics] = useState<AnalyticsCard[]>([]);
  const [adminAnalytics, setAdminAnalytics] = useState<DashboardAnalytics | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [wallet, setWallet] = useState<WalletData | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      // Fetch profile to determine user type
      const profileResponse = await PROFILE_FETCH();
      if (profileResponse.success && profileResponse.data) {
        setProfile(profileResponse.data);

        // Fetch wallet for Consumer/Agent users
        if (isUserProfile(profileResponse.data)) {
          const walletResponse = await WALLET_FETCH();
          console.log("Dashboard - Wallet fetch response:", walletResponse);
          if (walletResponse.success && walletResponse.data) {
            console.log("Dashboard - Setting wallet data:", walletResponse.data);
            setWallet(walletResponse.data);
          } else {
            console.error("Dashboard - Failed to fetch wallet:", walletResponse.error);
            toast.error("Failed to fetch wallet data");
          }
        } 
        // Fetch analytics for Admin users
        else if (isAdminProfile(profileResponse.data)) {
          const analyticsResponse = await ANALYTICS_DASHBOARD();
          if (analyticsResponse.success && analyticsResponse.data) {
            setAdminAnalytics(analyticsResponse.data);
          } else {
            toast.error("Failed to fetch analytics data");
          }
        }
      }

      setIsLoading(false);
    };

    fetchData();
  }, []);

  // Separate cards into 30-day and total metrics
  const recentMetrics = analytics.filter((card) => card.key.includes("30d"));
  const totalMetrics = analytics.filter((card) => !card.key.includes("30d"));

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Overview of your system statistics
          </p>
        </div>

        {isLoading ? (
          <div className="rounded-lg border bg-card p-6 text-sm text-muted-foreground">
            Loading dashboard...
          </div>
        ) : (
          <>
            {/* Wallet Overview - Only for Consumer/Agent */}
            {profile && isUserProfile(profile) && wallet && (
              <section>
                <div className="mb-4">
                  <h2 className="text-base font-semibold">Wallet Overview</h2>
                  <p className="text-sm text-muted-foreground">
                    Your balance and spending limits
                  </p>
                </div>
                <WalletOverview wallet={wallet} />
              </section>
            )}
          </>
        )}

        {/* Analytics Section (Currently empty) */}
        {!isLoading && (
          <div className="space-y-6">
            {/* Recent Activity (30-day metrics) */}
            {recentMetrics.length > 0 && (
              <section>
                <div className="mb-4">
                  <h2 className="text-base font-semibold">Recent Activity</h2>
                  <p className="text-sm text-muted-foreground">
                    New additions in the last 30 days
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {recentMetrics.map((card) => {
                    const config = getCardConfig(card.key);
                    const Icon = config.icon;
                    return (
                      <Card
                        key={card.key}
                        className={`${config.borderColor} border-2`}
                      >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            {card.label}
                          </CardTitle>
                          <div className={`rounded-full p-2 ${config.bgColor}`}>
                            <Icon className={`h-4 w-4 ${config.color}`} />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{card.value}</div>
                          <p className="text-xs text-muted-foreground mt-1">
                            Last 30 days
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Total Statistics */}
            {totalMetrics.length > 0 && (
              <section>
                <div className="mb-4">
                  <h2 className="text-base font-semibold">Total Statistics</h2>
                  <p className="text-sm text-muted-foreground">
                    Overall system totals
                  </p>
                </div>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  {totalMetrics.map((card) => {
                    const config = getCardConfig(card.key);
                    const Icon = config.icon;
                    return (
                      <Card
                        key={card.key}
                        className={`${config.borderColor} border-2`}
                      >
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                          <CardTitle className="text-sm font-medium">
                            {card.label}
                          </CardTitle>
                          <div className={`rounded-full p-2 ${config.bgColor}`}>
                            <Icon className={`h-4 w-4 ${config.color}`} />
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">{card.value}</div>
                          <p className="text-xs text-muted-foreground mt-1">
                            All time
                          </p>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </section>
            )}

            {/* Admin Analytics */}
            {profile && isAdminProfile(profile) && adminAnalytics && (
              <div className="space-y-6">
                {/* Consumer Stats */}
                <section>
                  <div className="mb-4">
                    <h2 className="text-base font-semibold">Consumer Statistics</h2>
                    <p className="text-sm text-muted-foreground">
                      Overview of all consumers in the system
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    <Card className="border-2 border-blue-200 dark:border-blue-800">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Consumers</CardTitle>
                        <Users className="h-4 w-4 text-blue-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{adminAnalytics.users?.total || 0}</div>
                        <p className="text-xs text-muted-foreground">All consumers</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-green-200 dark:border-green-800">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Consumers</CardTitle>
                        <UserCheck className="h-4 w-4 text-green-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{adminAnalytics.users?.active || 0}</div>
                        <p className="text-xs text-muted-foreground">Currently active</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-gray-200 dark:border-gray-800">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Inactive</CardTitle>
                        <Users className="h-4 w-4 text-gray-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{adminAnalytics.users?.inactive || 0}</div>
                        <p className="text-xs text-muted-foreground">Inactive consumers</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-red-200 dark:border-red-800">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Suspended</CardTitle>
                        <UsersRound className="h-4 w-4 text-red-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{adminAnalytics.users?.suspended || 0}</div>
                        <p className="text-xs text-muted-foreground">Suspended accounts</p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Agent Stats */}
                <section>
                  <div className="mb-4">
                    <h2 className="text-base font-semibold">Agent Statistics</h2>
                    <p className="text-sm text-muted-foreground">
                      Overview of all agents in the system
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-2 border-purple-200 dark:border-purple-800">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Agents</CardTitle>
                        <Building2 className="h-4 w-4 text-purple-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{adminAnalytics.agents?.total || 0}</div>
                        <p className="text-xs text-muted-foreground">All agents</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-green-200 dark:border-green-800">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
                        <UserCheck className="h-4 w-4 text-green-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{adminAnalytics.agents?.active || 0}</div>
                        <p className="text-xs text-muted-foreground">Operating agents</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-yellow-200 dark:border-yellow-800">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pending</CardTitle>
                        <UserPlus className="h-4 w-4 text-yellow-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{adminAnalytics.agents?.pending || 0}</div>
                        <p className="text-xs text-muted-foreground">Awaiting approval</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-red-200 dark:border-red-800">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                        <Users className="h-4 w-4 text-red-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{adminAnalytics.agents?.rejected || 0}</div>
                        <p className="text-xs text-muted-foreground">Rejected applications</p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Transaction Stats */}
                <section>
                  <div className="mb-4">
                    <h2 className="text-base font-semibold">Transaction Statistics</h2>
                    <p className="text-sm text-muted-foreground">
                      Transaction volume and activity
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-2 border-indigo-200 dark:border-indigo-800">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Transactions</CardTitle>
                        <FolderOpen className="h-4 w-4 text-indigo-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{adminAnalytics.transactions?.total || 0}</div>
                        <p className="text-xs text-muted-foreground">All time</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-blue-200 dark:border-blue-800">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Today</CardTitle>
                        <TrendingUp className="h-4 w-4 text-blue-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{adminAnalytics.transactions?.today || 0}</div>
                        <p className="text-xs text-muted-foreground">Transactions today</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-cyan-200 dark:border-cyan-800">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">This Week</CardTitle>
                        <TrendingUp className="h-4 w-4 text-cyan-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{adminAnalytics.transactions?.thisWeek || 0}</div>
                        <p className="text-xs text-muted-foreground">Last 7 days</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-teal-200 dark:border-teal-800">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">This Month</CardTitle>
                        <TrendingUp className="h-4 w-4 text-teal-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{adminAnalytics.transactions?.thisMonth || 0}</div>
                        <p className="text-xs text-muted-foreground">Current month</p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Revenue Stats */}
                <section>
                  <div className="mb-4">
                    <h2 className="text-base font-semibold">Revenue Statistics</h2>
                    <p className="text-sm text-muted-foreground">
                      Platform revenue and earnings
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-4">
                    <Card className="border-2 border-emerald-200 dark:border-emerald-800">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-emerald-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          ৳{(adminAnalytics.revenue?.total || 0).toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">All time</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-green-200 dark:border-green-800">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Today</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          ৳{(adminAnalytics.revenue?.today || 0).toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">Revenue today</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-lime-200 dark:border-lime-800">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">This Week</CardTitle>
                        <DollarSign className="h-4 w-4 text-lime-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          ৳{(adminAnalytics.revenue?.thisWeek || 0).toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">Last 7 days</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-amber-200 dark:border-amber-800">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">This Month</CardTitle>
                        <DollarSign className="h-4 w-4 text-amber-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          ৳{(adminAnalytics.revenue?.thisMonth || 0).toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">Current month</p>
                      </CardContent>
                    </Card>
                  </div>
                </section>

                {/* Platform Wallet */}
                <section>
                  <div className="mb-4">
                    <h2 className="text-base font-semibold">Platform Wallet</h2>
                    <p className="text-sm text-muted-foreground">
                      Platform wallet balance and expenses
                    </p>
                  </div>
                  <div className="grid gap-4 md:grid-cols-3">
                    <Card className="border-2 border-violet-200 dark:border-violet-800">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Balance</CardTitle>
                        <Wallet className="h-4 w-4 text-violet-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          ৳{(adminAnalytics.platformWallet?.balance || 0).toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">Current balance</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-rose-200 dark:border-rose-800">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Bonuses Given</CardTitle>
                        <DollarSign className="h-4 w-4 text-rose-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          ৳{(adminAnalytics.platformWallet?.totalBonusesGiven || 0).toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">Total bonuses</p>
                      </CardContent>
                    </Card>
                    <Card className="border-2 border-emerald-200 dark:border-emerald-800">
                      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Revenue Collected</CardTitle>
                        <TrendingUp className="h-4 w-4 text-emerald-500" />
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">
                          ৳{(adminAnalytics.platformWallet?.totalRevenueCollected || 0).toLocaleString()}
                        </div>
                        <p className="text-xs text-muted-foreground">Total fees collected</p>
                      </CardContent>
                    </Card>
                  </div>
                </section>
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}
