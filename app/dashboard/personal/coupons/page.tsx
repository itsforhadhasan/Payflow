'use client';

import { SubPageHeader } from '@/components/sub-page-header';
import { Ticket, Copy } from 'lucide-react';

export default function CouponsPage() {
    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a]">
            <SubPageHeader title="My Coupons" />

            <div className="max-w-md mx-auto px-4 pb-8 space-y-6">

                {/* Active Coupon */}
                <div className="relative group overflow-hidden bg-gradient-to-r from-[#E2136E] to-[#cd1163] rounded-2xl p-6 text-white shadow-xl shadow-pink-500/20">
                    <div className="absolute right-[-20px] top-[-20px] w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
                    <div className="relative z-10 flex gap-4">
                        <div className="w-16 h-16 bg-white/20 rounded-xl flex items-center justify-center mt-1">
                            <Ticket className="w-8 h-8 text-white" />
                        </div>
                        <div className="flex-1">
                            <h3 className="text-xl font-bold font-heading">20% CASHBACK</h3>
                            <p className="text-pink-100 text-sm mb-4">On your next electricity bill payment.</p>

                            <div className="bg-black/20 rounded-lg p-3 flex items-center justify-between">
                                <code className="font-mono font-bold tracking-widest text-lg">SAVE20</code>
                                <button className="text-white/70 hover:text-white transition-colors">
                                    <Copy className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Other Coupons */}
                <div className="space-y-4">
                    <h3 className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider px-2">Available for you</h3>

                    {[1, 2].map((i) => (
                        <div key={i} className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl shadow-sm flex items-center gap-4 opacity-75 hover:opacity-100 transition-opacity">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-400">
                                <Ticket className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h4 className="font-bold text-gray-800 dark:text-white">Free Send Money</h4>
                                <p className="text-xs text-gray-500">Valid until 30 Dec 2024</p>
                            </div>
                            <button className="px-4 py-2 bg-gray-50 dark:bg-slate-800 rounded-lg text-xs font-bold text-gray-600 dark:text-slate-300">
                                Claim
                            </button>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
