'use client';

import { useState } from 'react';
import { SubPageHeader } from '@/components/sub-page-header';
import { ArrowRight, Contact } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function MobileRechargePage() {
    const [amount, setAmount] = useState('');
    const [number, setNumber] = useState('');
    const [operator, setOperator] = useState<string | null>(null);

    const operators = [
        { name: 'Grameenphone', color: 'bg-blue-500' },
        { name: 'Banglalink', color: 'bg-orange-500' },
        { name: 'Robi', color: 'bg-red-500' },
        { name: 'Airtel', color: 'bg-purple-500' },
        { name: 'Teletalk', color: 'bg-green-500' },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a]">
            <SubPageHeader title="Mobile Recharge" />

            <div className="max-w-md mx-auto px-4 space-y-6">

                {/* Number Input */}
                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm space-y-4">
                    <label className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Mobile Number</label>
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <input
                                type="tel"
                                value={number}
                                onChange={(e) => setNumber(e.target.value)}
                                placeholder="01712-345678"
                                className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl py-3 px-4 text-lg font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-[#E2136E]"
                            />
                        </div>
                        <button className="p-3 bg-gray-100 dark:bg-slate-800 rounded-xl text-gray-500 hover:text-[#E2136E] transition-colors">
                            <Contact className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Operator Selection */}
                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm space-y-4">
                    <label className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Select Operator</label>
                    <div className="grid grid-cols-5 gap-3">
                        {operators.map((op, idx) => (
                            <button
                                key={idx}
                                onClick={() => setOperator(op.name)}
                                className={cn(
                                    "aspect-square rounded-full flex items-center justify-center text-xs font-bold text-white transition-all",
                                    op.color,
                                    operator === op.name ? "ring-4 ring-offset-2 ring-[#E2136E]" : "opacity-80 hover:opacity-100 hover:scale-110"
                                )}
                            >
                                {op.name.slice(0, 2)}
                            </button>
                        ))}
                    </div>
                    {operator && <p className="text-center text-sm font-bold text-[#E2136E]">{operator}</p>}
                </div>

                {/* Amount Input */}
                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm space-y-4">
                    <label className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Amount</label>
                    <div className="relative">
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">৳</span>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            placeholder="0"
                            className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl py-4 pl-12 pr-4 text-3xl font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-[#E2136E]"
                        />
                    </div>
                    <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                        {[20, 50, 100, 200, 500].map((amt) => (
                            <button
                                key={amt}
                                onClick={() => setAmount(amt.toString())}
                                className="px-4 py-2 bg-gray-100 dark:bg-slate-800 rounded-lg text-sm font-bold text-gray-600 dark:text-slate-400 hover:bg-[#E2136E] hover:text-white transition-colors"
                            >
                                ৳{amt}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Action Button */}
                <button className="w-full bg-[#E2136E] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#E2136E]/30 flex items-center justify-center gap-2 hover:bg-[#c2105e] transition-colors">
                    Next <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
