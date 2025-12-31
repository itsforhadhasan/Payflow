'use client';

import { useState } from 'react';
import { SubPageHeader } from '@/components/sub-page-header';
import { MOCK_TRANSACTIONS } from '@/lib/mock-data';
import { Download, Send, ArrowDownLeft } from 'lucide-react';
import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';

export default function StatementsPage() {
    const [filter, setFilter] = useState('All');

    const filteredTransactions = MOCK_TRANSACTIONS.filter(tx => {
        if (filter === 'All') return true;
        if (filter === 'In' || filter === 'Add Money') return tx.type === 'ADD_MONEY';
        if (filter === 'Out' || filter === 'Send Money') return tx.type === 'SEND_MONEY';
        if (filter === 'Cash Out') return tx.type === 'CASH_OUT';
        if (filter === 'Payment') return tx.type === 'PAYMENT'; // Assuming payment type exists or map appropriately
        return true;
    });

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a]">
            <SubPageHeader title="Statements" />

            <div className="max-w-md mx-auto px-4 pb-8 space-y-6">

                {/* Filter Tabs */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                    {['All', 'In', 'Out', 'Cash Out', 'Payment'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setFilter(tab)}
                            className={cn(
                                "px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all",
                                filter === tab
                                    ? "bg-[#E2136E] text-white shadow-md shadow-pink-500/20"
                                    : "bg-white dark:bg-[#1e293b] text-gray-500 dark:text-slate-400 hover:bg-gray-50 dark:hover:bg-slate-800"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Transactions List */}
                <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm p-4 min-h-[300px]">
                    {filteredTransactions.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-40 text-gray-400">
                            <p>No transactions found.</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <AnimatePresence mode='popLayout'>
                                {filteredTransactions.map((tx, i) => (
                                    <motion.div
                                        layout
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        key={tx.id || i}
                                        className="flex items-center gap-4 group cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/50 p-2 rounded-xl transition-colors border-b border-gray-50 dark:border-slate-800/50 last:border-0"
                                    >
                                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-sm shrink-0",
                                            tx.type === 'CASH_OUT' ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' :
                                                tx.type === 'ADD_MONEY' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' :
                                                    'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                        )}>
                                            {tx.type === 'CASH_OUT' ? <Download className="w-5 h-5 stroke-[2.5]" /> :
                                                tx.type === 'ADD_MONEY' ? <ArrowDownLeft className="w-5 h-5 stroke-[2.5]" /> : <Send className="w-5 h-5 stroke-[2.5]" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-gray-800 dark:text-slate-200 group-hover:text-[#E2136E] dark:group-hover:text-[#E2136E] transition-colors truncate">{tx.description || 'Transfer'}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <p className="text-xs text-gray-500 dark:text-slate-500 font-medium">{new Date(tx.date).toLocaleDateString()}</p>
                                                <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                                <p className="text-xs text-gray-400 uppercase tracking-wider">{tx.id}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <p className={cn("font-bold text-base", tx.type === 'ADD_MONEY' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white')}>
                                                {tx.type === 'ADD_MONEY' ? '+' : '-'}৳ {tx.amount}
                                            </p>
                                            <p className="text-[10px] text-green-500 font-bold uppercase mt-1">Success</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
