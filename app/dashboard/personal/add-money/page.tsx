'use client';

import { SubPageHeader } from '@/components/sub-page-header';
import { CreditCard, Building2, ArrowRight } from 'lucide-react';

import Link from 'next/link';

export default function AddMoneyPage() {
    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] font-sans">
            <SubPageHeader title="Add Money" />

            <div className="max-w-md mx-auto px-4 space-y-6">

                <h2 className="text-xl font-bold text-gray-800 dark:text-white px-2">Select Source</h2>

                {/* Bank to bKash */}
                <Link href="/dashboard/personal/add-money/bank" className="w-full bg-white dark:bg-[#1e293b] p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-all group flex items-center gap-5">
                    <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
                        <Building2 className="w-8 h-8" />
                    </div>
                    <div className="flex-1 text-left">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-blue-600 transition-colors">Bank to PayFlow</h3>
                        <p className="text-sm text-gray-500 mt-1">Transfer from linked bank account</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-blue-600" />
                </Link>

                {/* Card to bKash */}
                <Link href="/dashboard/personal/add-money/card" className="w-full bg-white dark:bg-[#1e293b] p-6 rounded-[2rem] shadow-sm hover:shadow-md transition-all group flex items-center gap-5">
                    <div className="w-16 h-16 bg-purple-50 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
                        <CreditCard className="w-8 h-8" />
                    </div>
                    <div className="flex-1 text-left">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white group-hover:text-purple-600 transition-colors">Card to PayFlow</h3>
                        <p className="text-sm text-gray-500 mt-1">Visa or Mastercard</p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-purple-600" />
                </Link>

            </div>
        </div>
    );
}
