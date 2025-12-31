'use client';

import { SubPageHeader } from '@/components/sub-page-header';
import { RotateCcw, Search, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function RefundPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const recentTransactions = [
        { id: 'TXN12345678', user: '01711223344', amount: '2500', time: 'Today, 10:30 AM', status: 'Success' },
        { id: 'TXN87654321', user: '01999887766', amount: '500', time: 'Yesterday, 4:15 PM', status: 'Success' },
        { id: 'TXN45678901', user: '01855667788', amount: '1200', time: 'Oct 24, 2:00 PM', status: 'Success' },
    ];

    const filteredTransactions = recentTransactions.filter(txn =>
        txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        txn.user.includes(searchQuery)
    );

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] font-sans">
            <SubPageHeader title="Refund Customer" backLink="/dashboard/business" className="bg-indigo-600 dark:bg-indigo-700" />

            <div className="max-w-md mx-auto px-4 space-y-6">

                {/* Search Box */}
                <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-sm">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-widest block mb-3">Find Transaction</label>
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Enter Transaction ID or Phone"
                            className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl py-3 pl-12 pr-4 text-base font-bold text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-600/20"
                        />
                    </div>
                </div>

                {/* Warning Card */}
                <div className="bg-orange-50 dark:bg-orange-900/10 p-4 rounded-xl flex gap-3 items-start border border-orange-100 dark:border-orange-500/20">
                    <AlertCircle className="w-5 h-5 text-orange-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-orange-700 dark:text-orange-300 leading-relaxed font-medium">Refunds can only be initiated for transactions made within the last 30 days. The amount will be deducted from your merchant wallet immediately.</p>
                </div>

                <h3 className="text-sm font-bold text-gray-500 dark:text-slate-400 pl-2">Recent Transactions</h3>

                {/* Transactions List */}
                <div className="space-y-4">
                    {filteredTransactions.map((txn) => (
                        <div key={txn.id} className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 flex justify-between items-center group cursor-pointer hover:border-indigo-100 dark:hover:border-indigo-900 transition-colors">
                            <div>
                                <h4 className="font-bold text-gray-800 dark:text-white text-sm">{txn.id}</h4>
                                <p className="text-xs text-gray-500 mt-1">{txn.user} • {txn.time}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-indigo-600">৳{txn.amount}</p>
                                <button className="mt-2 text-[10px] font-bold text-white bg-indigo-600 hover:bg-indigo-700 px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                    Refund
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
