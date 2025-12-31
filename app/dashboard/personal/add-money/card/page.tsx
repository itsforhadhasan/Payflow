'use client';

import { SubPageHeader } from '@/components/sub-page-header';
import { CreditCard, Plus, ChevronRight } from 'lucide-react';
import Image from 'next/image';

export default function CardTransferPage() {
    const cards = [
        { type: 'Visa', number: '**** 4242' },
        { type: 'Mastercard', number: '**** 8888' },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] font-sans">
            <SubPageHeader title="Card to PayFlow" />

            <div className="max-w-md mx-auto px-4 space-y-6">

                <h2 className="text-xl font-bold text-gray-800 dark:text-white px-2">Saved Cards</h2>

                {/* Saved Cards */}
                {cards.map((card, i) => (
                    <button key={i} className="w-full bg-white dark:bg-[#1e293b] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group flex items-center gap-4 text-left">
                        <div className="w-12 h-12 bg-gray-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-gray-600">
                            <CreditCard className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-800 dark:text-white">{card.type}</h3>
                            <p className="text-xs text-gray-500">{card.number}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#E2136E]" />
                    </button>
                ))}

                {/* Add New Card */}
                <button className="w-full border-2 border-dashed border-gray-200 dark:border-slate-700 p-5 rounded-2xl flex items-center justify-center gap-2 text-gray-500 hover:border-[#E2136E] hover:text-[#E2136E] transition-colors">
                    <Plus className="w-5 h-5" />
                    <span className="font-bold text-sm">Add New Visa/Mastercard</span>
                </button>

                {/* Logos */}
                <div className="flex justify-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                    {/* Placeholder for card logos if image assets were available, else utilizing text/icons */}
                    <div className="h-8 w-12 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold">VISA</div>
                    <div className="h-8 w-12 bg-gray-200 rounded flex items-center justify-center text-[10px] font-bold">MC</div>
                </div>

                <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl">
                    <p className="text-xs text-purple-600 dark:text-purple-300">
                        <strong>Security:</strong> Your card details are saved securely. We do not store your CVV/CVC code.
                    </p>
                </div>

            </div>
        </div>
    );
}
