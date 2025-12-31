'use client';

import { SubPageHeader } from '@/components/sub-page-header';
import { Zap, Droplets, Flame, Wifi, Tv } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function PayBillPage() {
    const categories = [
        { name: 'Electricity', icon: Zap, color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10' },
        { name: 'Gas', icon: Flame, color: 'text-orange-500 bg-orange-50 dark:bg-orange-500/10' },
        { name: 'Water', icon: Droplets, color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10' },
        { name: 'Internet', icon: Wifi, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' },
        { name: 'TV', icon: Tv, color: 'text-pink-500 bg-pink-50 dark:bg-pink-500/10' },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a]">
            <SubPageHeader title="Pay Bill" />

            <div className="max-w-md mx-auto px-4 space-y-8">

                {/* Search Organization */}
                <input
                    type="text"
                    placeholder="Search Organization"
                    className="w-full bg-white dark:bg-[#1e293b] border-none rounded-2xl py-4 px-6 text-sm font-bold text-gray-800 dark:text-white shadow-sm focus:ring-2 focus:ring-[#E2136E]"
                />

                {/* Categories Grid */}
                <div>
                    <h3 className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-4 px-2">Categories</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {categories.map((cat, idx) => (
                            <button key={idx} className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-sm flex flex-col items-center gap-3 hover:scale-105 transition-transform">
                                <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", cat.color)}>
                                    <cat.icon className="w-6 h-6" />
                                </div>
                                <span className="text-xs font-bold text-gray-700 dark:text-gray-300">{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Recent Bills */}
                <div>
                    <h3 className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-4 px-2">Recent Bills</h3>
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm p-6 text-center text-gray-400 text-sm font-medium">
                        No recent bills paid.
                    </div>
                </div>

            </div>
        </div>
    );
}
