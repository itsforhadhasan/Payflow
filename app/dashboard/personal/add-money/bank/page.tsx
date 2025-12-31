'use client';

import { SubPageHeader } from '@/components/sub-page-header';
import { Building2, Plus, ChevronRight } from 'lucide-react';

export default function BankTransferPage() {
    const banks = [
        { name: 'City Bank', account: '1234 **** **** 5678' },
        { name: 'Brac Bank', account: '9876 **** **** 4321' },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] font-sans">
            <SubPageHeader title="Bank to PayFlow" />

            <div className="max-w-md mx-auto px-4 space-y-6">

                <h2 className="text-xl font-bold text-gray-800 dark:text-white px-2">Linked Banks</h2>

                {/* Linked Accounts */}
                {banks.map((bank, i) => (
                    <button key={i} className="w-full bg-white dark:bg-[#1e293b] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group flex items-center gap-4 text-left">
                        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-800 dark:text-white">{bank.name}</h3>
                            <p className="text-xs text-gray-500">{bank.account}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#E2136E]" />
                    </button>
                ))}

                {/* Add New Bank */}
                <button className="w-full border-2 border-dashed border-gray-200 dark:border-slate-700 p-5 rounded-2xl flex items-center justify-center gap-2 text-gray-500 hover:border-[#E2136E] hover:text-[#E2136E] transition-colors">
                    <Plus className="w-5 h-5" />
                    <span className="font-bold text-sm">Link New Bank Account</span>
                </button>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
                    <p className="text-xs text-blue-600 dark:text-blue-300">
                        <strong>Note:</strong> You can add money from your own bank account only. The name on the bank account must match your PayFlow account name.
                    </p>
                </div>

            </div>
        </div>
    );
}
