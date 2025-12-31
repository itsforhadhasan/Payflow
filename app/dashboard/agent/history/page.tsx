'use client';

import { useState } from 'react';
import { SubPageHeader } from '@/components/sub-page-header';
import { History, ArrowRightLeft, Wallet, Filter, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function AgentHistoryPage() {
    const [filterType, setFilterType] = useState<string>('ALL');
    const [filterStatus, setFilterStatus] = useState<string>('ALL');
    const [showFilters, setShowFilters] = useState(false);

    const transactions = [
        { id: 1, type: 'CASH_IN', amount: 5000, customer: 'Rahim Ali', time: '2 hours ago', status: 'completed' },
        { id: 2, type: 'CASH_OUT', amount: 3000, customer: 'Fatima Begum', time: '3 hours ago', status: 'completed' },
        { id: 3, type: 'CASH_IN', amount: 8000, customer: 'Karim Uddin', time: '5 hours ago', status: 'completed' },
        { id: 4, type: 'CASH_OUT', amount: 2000, customer: 'Ayesha Khan', time: '1 day ago', status: 'completed' },
        { id: 5, type: 'CASH_IN', amount: 12000, customer: 'Mohammad Hasan', time: '2 days ago', status: 'pending' },
        { id: 6, type: 'CASH_OUT', amount: 4500, customer: 'Sultana Begum', time: '2 days ago', status: 'completed' },
    ];

    const filteredTransactions = transactions.filter(tx => {
        const typeMatch = filterType === 'ALL' || tx.type === filterType;
        const statusMatch = filterStatus === 'ALL' || tx.status === filterStatus;
        return typeMatch && statusMatch;
    });

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] pb-24">
            <SubPageHeader title="Transaction History" backLink="/dashboard/agent" className="bg-emerald-600" />

            <div className="max-w-md mx-auto px-4 space-y-4">
                {/* Filter Button */}
                <div className="flex items-center justify-between">
                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#1e293b] rounded-xl border border-gray-100 dark:border-slate-800 text-sm font-bold text-gray-700 dark:text-slate-300 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                        <Filter className="w-4 h-4" />
                        Filters
                    </button>
                    {(filterType !== 'ALL' || filterStatus !== 'ALL') && (
                        <button
                            onClick={() => {
                                setFilterType('ALL');
                                setFilterStatus('ALL');
                            }}
                            className="text-xs text-emerald-600 dark:text-emerald-400 font-bold"
                        >
                            Clear All
                        </button>
                    )}
                </div>

                {/* Filter Options */}
                {showFilters && (
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-slate-800 space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="font-bold text-gray-800 dark:text-white">Filter Options</h3>
                            <button
                                onClick={() => setShowFilters(false)}
                                className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
                            >
                                <X className="w-4 h-4 text-gray-500" />
                            </button>
                        </div>
                        
                        <div>
                            <p className="text-xs font-bold text-gray-500 dark:text-slate-400 mb-2 uppercase">Type</p>
                            <div className="flex gap-2">
                                {['ALL', 'CASH_IN', 'CASH_OUT'].map((type) => (
                                    <button
                                        key={type}
                                        onClick={() => setFilterType(type)}
                                        className={cn(
                                            "px-3 py-1.5 rounded-lg text-xs font-bold transition-colors",
                                            filterType === type
                                                ? "bg-emerald-600 text-white"
                                                : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300"
                                        )}
                                    >
                                        {type === 'ALL' ? 'All' : type.replace('_', ' ')}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="text-xs font-bold text-gray-500 dark:text-slate-400 mb-2 uppercase">Status</p>
                            <div className="flex gap-2">
                                {['ALL', 'completed', 'pending'].map((status) => (
                                    <button
                                        key={status}
                                        onClick={() => setFilterStatus(status)}
                                        className={cn(
                                            "px-3 py-1.5 rounded-lg text-xs font-bold transition-colors capitalize",
                                            filterStatus === status
                                                ? "bg-emerald-600 text-white"
                                                : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300"
                                        )}
                                    >
                                        {status === 'ALL' ? 'All' : status}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Transactions List */}
                {filteredTransactions.length === 0 ? (
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-8 text-center">
                        <p className="text-gray-500 dark:text-slate-400">No transactions found</p>
                    </div>
                ) : (
                    filteredTransactions.map((tx) => (
                    <div
                        key={tx.id}
                        className="bg-white dark:bg-[#1e293b] rounded-2xl p-4 shadow-sm border border-gray-100 dark:border-slate-800"
                    >
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className={cn(
                                    "w-12 h-12 rounded-xl flex items-center justify-center",
                                    tx.type === 'CASH_IN' 
                                        ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
                                        : 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400'
                                )}>
                                    {tx.type === 'CASH_IN' ? (
                                        <ArrowRightLeft className="w-6 h-6" />
                                    ) : (
                                        <Wallet className="w-6 h-6" />
                                    )}
                                </div>
                                <div>
                                    <p className="font-bold text-gray-800 dark:text-white">{tx.customer}</p>
                                    <p className="text-xs text-gray-500 dark:text-slate-400">{tx.time}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className={cn(
                                    "font-bold text-lg",
                                    tx.type === 'CASH_IN' 
                                        ? 'text-emerald-600 dark:text-emerald-400'
                                        : 'text-orange-600 dark:text-orange-400'
                                )}>
                                    {tx.type === 'CASH_IN' ? '+' : '-'}৳{tx.amount.toLocaleString()}
                                </p>
                                <p className="text-xs text-gray-500 dark:text-slate-400 capitalize">{tx.status}</p>
                            </div>
                        </div>
                    </div>
                    ))
                )}
            </div>
        </div>
    );
}
