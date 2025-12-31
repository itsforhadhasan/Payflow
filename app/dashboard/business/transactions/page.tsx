'use client';

import { useState } from 'react';
import { ArrowLeft, Search, Filter, Download, Calendar, ArrowDownLeft, ArrowUpRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Mock Data
const TRANSACTIONS = [
    { id: 1, type: 'PAYMENT', user: 'Rahim Store', date: '2023-11-20', time: '10:30 AM', amount: 500, status: 'Success', icon: ArrowUpRight, color: 'text-rose-600 bg-rose-50 dark:bg-rose-900/20' },
    { id: 2, type: 'CASH_IN', user: 'Bank Transfer', date: '2023-11-19', time: '02:15 PM', amount: 12000, status: 'Success', icon: ArrowDownLeft, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
    { id: 3, type: 'PAYMENT', user: 'Daraz Online', date: '2023-11-18', time: '09:00 PM', amount: 1250, status: 'Success', icon: ArrowUpRight, color: 'text-rose-600 bg-rose-50 dark:bg-rose-900/20' },
    { id: 4, type: 'BILL_PAY', user: 'DESCO Bill', date: '2023-11-15', time: '11:45 AM', amount: 850, status: 'Success', icon: ArrowUpRight, color: 'text-rose-600 bg-rose-50 dark:bg-rose-900/20' },
    { id: 5, type: 'CASH_IN', user: 'Agent Cash In', date: '2023-11-12', time: '04:30 PM', amount: 5000, status: 'Success', icon: ArrowDownLeft, color: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-900/20' },
    { id: 6, type: 'PAYMENT', user: 'Failed Transfer', date: '2023-11-10', time: '01:00 PM', amount: 2000, status: 'Failed', icon: ArrowUpRight, color: 'text-gray-400 bg-gray-100 dark:bg-gray-800' },
];

export default function BusinessTransactionsPage() {
    const [filter, setFilter] = useState('All');

    const filteredTransactions = TRANSACTIONS.filter(tx => {
        if (filter === 'All') return true;
        if (filter === 'In') return tx.type === 'CASH_IN';
        if (filter === 'Out') return tx.type === 'PAYMENT' || tx.type === 'BILL_PAY' || tx.type === 'CASH_OUT';
        if (filter === 'Failed') return tx.status === 'Failed';
        return true;
    });

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] font-sans pb-12">
            {/* Header */}
            <div className="bg-white dark:bg-[#1e293b] sticky top-0 z-30 border-b border-gray-100 dark:border-slate-800">
                <div className="max-w-2xl mx-auto px-4">
                    <div className="h-16 flex items-center gap-4">
                        <Link href="/dashboard/business" className="p-2 -ml-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </Link>
                        <h1 className="text-lg font-bold text-gray-800 dark:text-white">Transaction History</h1>
                        <div className="ml-auto flex gap-2">
                            <button className="p-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                                <Search className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            </button>
                            <button className="p-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                                <Filter className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-2xl mx-auto px-4 py-6">

                <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
                    {['All', 'In', 'Out', 'Failed'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors",
                                filter === tab
                                    ? "bg-indigo-600 text-white shadow-md shadow-indigo-200 dark:shadow-none"
                                    : "bg-white dark:bg-[#1e293b] text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-800 overflow-hidden">
                    <div className="p-4 border-b border-gray-100 dark:border-slate-800 flex justify-between items-center bg-gray-50/50 dark:bg-slate-800/50">
                        <h3 className="font-bold text-gray-700 dark:text-gray-300 text-sm">Recent Transactions</h3>
                        <button className="flex items-center gap-1 text-xs font-bold text-indigo-600">
                            <Calendar className="w-3 h-3" />
                            Select Date
                        </button>
                    </div>
                    <div>
                        {filteredTransactions.map((tx, i) => (
                            <div key={tx.id} className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors border-b border-gray-50 dark:border-slate-800/50 last:border-0 cursor-pointer group">
                                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center shrink-0", tx.color)}>
                                    <tx.icon className="w-5 h-5" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between items-start mb-0.5">
                                        <h4 className="font-bold text-gray-800 dark:text-white truncate pr-2 group-hover:text-indigo-600 transition-colors">{tx.user}</h4>
                                        <span className={cn("font-bold whitespace-nowrap", tx.type === 'CASH_IN' ? 'text-emerald-600' : 'text-gray-900 dark:text-white')}>
                                            {tx.type === 'CASH_IN' ? '+' : '-'}৳{tx.amount.toLocaleString()}
                                        </span>
                                    </div>
                                    <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
                                        <span>{tx.time} • {tx.type.replace('_', ' ')}</span>
                                        <span className={cn("px-1.5 py-0.5 rounded text-[10px] font-bold uppercase",
                                            tx.status === 'Success' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400' : 'bg-red-100 text-red-700'
                                        )}>
                                            {tx.status}
                                        </span>
                                    </div>
                                </div>
                                <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-indigo-600 -mr-1" />
                            </div>
                        ))}
                    </div>
                    <div className="p-4">
                        <button className="w-full py-3 rounded-xl border border-dashed border-gray-300 dark:border-slate-700 text-gray-500 dark:text-slate-400 text-sm font-bold hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" />
                            Load More
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
