'use client';

import Link from 'next/link';
import { ArrowLeft, TrendingUp, Users, Zap, DollarSign, CheckCircle, AlertCircle } from 'lucide-react';
import { RevenueChart } from '@/components/revenue-chart';
import { RevenueDistributionChart } from '@/components/revenue-distribution-chart';
import { DailySummaryPieChart } from '@/components/daily-summary-pie-chart';
import { SpendingPieChart } from '@/components/spending-pie-chart';
import { MOCK_TRANSACTIONS } from '@/lib/mock-data';

export default function AnalyticsPage() {
    // Calculate transaction metrics
    const totalTransactions = MOCK_TRANSACTIONS.length;
    const completedTransactions = MOCK_TRANSACTIONS.filter(t => t.status === 'COMPLETED').length;
    const totalAmount = MOCK_TRANSACTIONS.reduce((sum, t) => sum + t.amount, 0);
    const averageTransaction = totalAmount / totalTransactions;

    const transactionsByType = MOCK_TRANSACTIONS.reduce((acc, t) => {
        acc[t.type] = (acc[t.type] || 0) + 1;
        return acc;
    }, {} as Record<string, number>);

    const amountByType = MOCK_TRANSACTIONS.reduce((acc, t) => {
        acc[t.type] = (acc[t.type] || 0) + t.amount;
        return acc;
    }, {} as Record<string, number>);

    return (
        <div className="min-h-screen bg-[#1F0344] transition-colors duration-300 pb-32 md:pb-16 overflow-x-hidden">
            <div className="max-w-7xl mx-auto md:pt-8 px-4 md:px-4">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8 mt-6">
                    <Link href="/admin" className="p-2 hover:bg-purple-600/20 rounded-lg transition-colors">
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </Link>
                    <h1 className="text-4xl font-bold text-white">Analytics</h1>
                </div>

                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    {/* Total Transactions */}
                    <div className="bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border border-purple-700/50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-purple-300 text-sm font-medium">Total Transactions</span>
                            <TrendingUp className="w-5 h-5 text-purple-400" />
                        </div>
                        <p className="text-3xl font-bold text-white">{totalTransactions}</p>
                        <p className="text-purple-300 text-xs mt-2">Last 30 days</p>
                    </div>

                    {/* Completed Transactions */}
                    <div className="bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border border-purple-700/50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-purple-300 text-sm font-medium">Completed</span>
                            <CheckCircle className="w-5 h-5 text-green-400" />
                        </div>
                        <p className="text-3xl font-bold text-white">{completedTransactions}</p>
                        <p className="text-green-400 text-xs mt-2">{Math.round((completedTransactions / totalTransactions) * 100)}% success rate</p>
                    </div>

                    {/* Total Amount */}
                    <div className="bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border border-purple-700/50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-purple-300 text-sm font-medium">Total Amount</span>
                            <DollarSign className="w-5 h-5 text-blue-400" />
                        </div>
                        <p className="text-3xl font-bold text-white">${totalAmount.toLocaleString()}</p>
                        <p className="text-purple-300 text-xs mt-2">Volume processed</p>
                    </div>

                    {/* Average Transaction */}
                    <div className="bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border border-purple-700/50 rounded-lg p-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-purple-300 text-sm font-medium">Average Amount</span>
                            <Zap className="w-5 h-5 text-yellow-400" />
                        </div>
                        <p className="text-3xl font-bold text-white">${averageTransaction.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                        <p className="text-purple-300 text-xs mt-2">Per transaction</p>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Revenue Trends */}
                    <div className="bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border border-purple-700/50 rounded-2xl p-6 shadow-lg">
                        <h2 className="text-xl font-bold text-white mb-4">Revenue Trends</h2>
                        <RevenueChart />
                    </div>

                    {/* Daily Summary */}
                    <div className="bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border border-purple-700/50 rounded-2xl p-6 shadow-lg">
                        <h2 className="text-xl font-bold text-white mb-4">Daily Summary</h2>
                        <DailySummaryPieChart />
                    </div>
                </div>

                {/* Additional Charts */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                    {/* Revenue Distribution */}
                    <div className="bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border border-purple-700/50 rounded-2xl p-6 shadow-lg">
                        <h2 className="text-xl font-bold text-white mb-4">Revenue Distribution</h2>
                        <RevenueDistributionChart />
                    </div>

                    {/* Spending Analysis */}
                    <div className="bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border border-purple-700/50 rounded-2xl p-6 shadow-lg">
                        <h2 className="text-xl font-bold text-white mb-4">Spending Analysis</h2>
                        <SpendingPieChart />
                    </div>
                </div>

                {/* Transaction Types Detail */}
                <div className="bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border border-purple-700/50 rounded-2xl p-6 shadow-lg mb-8">
                    <h2 className="text-xl font-bold text-white mb-6">Transaction Breakdown by Type</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                        {Object.entries(transactionsByType).map(([type, count]) => (
                            <div key={type} className="bg-purple-600/20 border border-purple-600/50 rounded-lg p-4">
                                <p className="text-purple-300 text-sm mb-2">{type.replace(/_/g, ' ')}</p>
                                <p className="text-2xl font-bold text-white">{count}</p>
                                <p className="text-blue-400 text-sm mt-2">${amountByType[type]?.toLocaleString()}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Detailed Transactions Table */}
                <div className="bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border border-purple-700/50 rounded-2xl p-6 shadow-lg">
                    <h2 className="text-xl font-bold text-white mb-6">Recent Transactions</h2>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-purple-600/50">
                                    <th className="text-left py-3 px-4 text-purple-300 font-semibold text-sm">Transaction ID</th>
                                    <th className="text-left py-3 px-4 text-purple-300 font-semibold text-sm">Type</th>
                                    <th className="text-left py-3 px-4 text-purple-300 font-semibold text-sm">Amount</th>
                                    <th className="text-left py-3 px-4 text-purple-300 font-semibold text-sm">Date</th>
                                    <th className="text-left py-3 px-4 text-purple-300 font-semibold text-sm">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MOCK_TRANSACTIONS.map((tx) => (
                                    <tr key={tx.id} className="border-b border-purple-600/30 hover:bg-purple-600/10">
                                        <td className="py-3 px-4 text-white text-sm font-mono">{tx.id}</td>
                                        <td className="py-3 px-4 text-purple-300 text-sm">{tx.type.replace(/_/g, ' ')}</td>
                                        <td className="py-3 px-4 text-blue-400 font-semibold">${tx.amount.toLocaleString()}</td>
                                        <td className="py-3 px-4 text-purple-300 text-sm">{new Date(tx.date).toLocaleDateString()}</td>
                                        <td className="py-3 px-4">
                                            <span className={`text-xs px-3 py-1 rounded-full font-semibold ${
                                                tx.status === 'COMPLETED' ? 'bg-green-500/20 text-green-400' :
                                                tx.status === 'PENDING' ? 'bg-yellow-500/20 text-yellow-400' :
                                                'bg-red-500/20 text-red-400'
                                            }`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}
