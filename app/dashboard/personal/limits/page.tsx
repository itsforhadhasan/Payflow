'use client';

import { SubPageHeader } from '@/components/sub-page-header';
import { cn } from '@/lib/utils'; // Assuming cn utility exists

export default function LimitsPage() {
    const limits = [
        { type: 'Send Money', daily: { used: 5000, max: 25000 }, monthly: { used: 15000, max: 100000 } },
        { type: 'Cash Out', daily: { used: 2000, max: 25000 }, monthly: { used: 10000, max: 150000 } },
        { type: 'Mobile Recharge', daily: { used: 200, max: 10000 }, monthly: { used: 500, max: 50000 } },
        { type: 'Payment', daily: { used: 0, max: 50000 }, monthly: { used: 5000, max: 200000 } },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a]">
            <SubPageHeader title="Transaction Limits" />

            <div className="max-w-md mx-auto px-4 space-y-6 pb-8">

                {limits.map((limit, i) => (
                    <div key={i} className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm space-y-4">
                        <div className="flex items-center justify-between border-b border-gray-50 dark:border-slate-800 pb-4">
                            <h3 className="font-bold text-lg text-gray-800 dark:text-white">{limit.type}</h3>
                            <span className="text-xs font-bold text-gray-400 bg-gray-100 dark:bg-slate-800 px-2 py-1 rounded-md">Daily Limit</span>
                        </div>

                        {/* Daily Progress */}
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm font-medium">
                                <span className="text-gray-500 dark:text-slate-400">Used: ৳{limit.daily.used}</span>
                                <span className="text-gray-800 dark:text-white font-bold">Max: ৳{limit.daily.max}</span>
                            </div>
                            <div className="h-2 w-full bg-gray-100 dark:bg-slate-800 rounded-full overflow-hidden">
                                <div
                                    className={cn("h-full rounded-full transition-all duration-500",
                                        (limit.daily.used / limit.daily.max) > 0.8 ? "bg-red-500" : "bg-[#E2136E]"
                                    )}
                                    style={{ width: `${(limit.daily.used / limit.daily.max) * 100}%` }}
                                ></div>
                            </div>
                        </div>

                        {/* Monthly (Simplified) */}
                        <div className="pt-2 flex justify-between items-center text-xs text-gray-400">
                            <span>Monthly Limit</span>
                            <span>৳{limit.monthly.max.toLocaleString()}</span>
                        </div>
                    </div>
                ))}

            </div>
        </div>
    );
}
