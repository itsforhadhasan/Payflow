'use client';

import { SubPageHeader } from '@/components/sub-page-header';
import { DollarSign, FileText, Link as LinkIcon, Type } from 'lucide-react';
import { useState } from 'react';

export default function CreatePaymentLinkPage() {
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            // Navigate back or show success (in a real app)
            alert('Link created!');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] font-sans">
            <SubPageHeader title="Create Payment Link" backLink="/dashboard/business/payment-link" className="bg-indigo-600 dark:bg-indigo-700" />

            <div className="max-w-2xl mx-auto px-4 pb-8">
                <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 space-y-6">

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <Type className="w-4 h-4" />
                            Link Title
                        </label>
                        <input
                            type="text"
                            placeholder="e.g., Summer Sale 2024"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-indigo-500/20 text-gray-800 dark:text-white font-medium placeholder:text-gray-400"
                            required
                        />
                    </div>

                    {/* Amount */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            Amount (৳)
                        </label>
                        <input
                            type="number"
                            placeholder="0.00"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-indigo-500/20 text-gray-800 dark:text-white font-medium placeholder:text-gray-400"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Description (Optional)
                        </label>
                        <textarea
                            rows={4}
                            placeholder="What is this payment for?"
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-indigo-500/20 text-gray-800 dark:text-white font-medium placeholder:text-gray-400 resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 rounded-xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <span className="animate-pulse">Creating...</span>
                        ) : (
                            <>
                                <LinkIcon className="w-5 h-5" />
                                Create Link
                            </>
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
}
