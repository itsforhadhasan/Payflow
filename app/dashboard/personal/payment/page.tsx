'use client';

import { useState } from 'react';
import { SubPageHeader } from '@/components/sub-page-header';
import { ArrowRight, Store, ScanLine } from 'lucide-react';

export default function PaymentPage() {
    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a]">
            <SubPageHeader title="Make Payment" />

            <div className="max-w-md mx-auto px-4 space-y-6">

                {/* Merchant Input */}
                <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm space-y-4">
                    <label className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Merchant Number or Name</label>
                    <div className="flex gap-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Enter Merchant Account"
                                className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl py-3 px-4 text-lg font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-[#E2136E]"
                            />
                        </div>
                        <button className="p-3 bg-gray-100 dark:bg-slate-800 rounded-xl text-gray-500 hover:text-[#E2136E] transition-colors">
                            <ScanLine className="w-6 h-6" />
                        </button>
                    </div>
                </div>

                {/* Saved Merchants */}
                <h3 className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider px-2">Saved Merchants</h3>
                <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm divide-y divide-gray-100 dark:divide-slate-800">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors first:rounded-t-2xl last:rounded-b-2xl">
                            <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                                <Store className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-800 dark:text-white">Agora Super Shop {i}</h4>
                                <p className="text-xs text-gray-500">01700-00000{i}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Action Button */}
                <button className="w-full bg-[#E2136E] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#E2136E]/30 flex items-center justify-center gap-2 hover:bg-[#c2105e] transition-colors mt-4">
                    Proceed <ArrowRight className="w-5 h-5" />
                </button>
            </div>
        </div>
    );
}
