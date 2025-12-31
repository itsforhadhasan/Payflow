'use client';

import { SubPageHeader } from '@/components/sub-page-header';
import { Link as LinkIcon, Copy, Plus, Share2, DollarSign } from 'lucide-react';
import { useState } from 'react';
import Link from 'next/link';

export default function PaymentLinkPage() {
    const [activeTab, setActiveTab] = useState('active');

    const paymentLinks = [
        { id: 1, title: 'Summer Sale 2024', amount: '500', url: 'payflow.com/link/summer24', clicks: 24, status: 'Active' },
        { id: 2, title: 'Consultation Fee', amount: '2000', url: 'payflow.com/link/consult', clicks: 8, status: 'Active' },
        { id: 3, title: 'Workshop Registration', amount: '1500', url: 'payflow.com/link/workshop', clicks: 45, status: 'Paused' },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] font-sans">
            <SubPageHeader title="Payment Links" backLink="/dashboard/business" className="bg-indigo-600 dark:bg-indigo-700" />

            <div className="max-w-md mx-auto px-4 pb-8">

                {/* Create New Button */}
                <Link href="/dashboard/business/payment-link/new" className="block mb-8">
                    <button className="w-full bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-dashed border-indigo-300 dark:border-indigo-700 flex flex-col items-center justify-center gap-2 group hover:border-indigo-500 transition-colors cursor-pointer">
                        <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Plus className="w-6 h-6" />
                        </div>
                        <span className="font-bold text-indigo-600 dark:text-indigo-400">Create New Link</span>
                    </button>
                </Link>

                {/* Filter Tabs */}
                <div className="flex p-1 bg-gray-100 dark:bg-slate-800 rounded-xl mb-6">
                    {['active', 'paused'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-2 rounded-lg text-sm font-bold capitalize transition-all ${activeTab === tab
                                ? 'bg-white dark:bg-[#1e293b] text-indigo-600 shadow-sm'
                                : 'text-gray-400 hover:text-gray-600'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Links List */}
                <div className="space-y-4">
                    {paymentLinks
                        .filter(link => link.status.toLowerCase() === activeTab)
                        .map((link) => (
                            <div key={link.id} className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h3 className="font-bold text-gray-800 dark:text-white">{link.title}</h3>
                                        <p className="text-xs text-gray-400 font-medium mt-0.5">{link.clicks} clicks • Created 2d ago</p>
                                    </div>
                                    <span className="bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 px-2 py-1 rounded-lg text-xs font-bold flex items-center gap-1">
                                        <DollarSign className="w-3 h-3" /> ৳{link.amount}
                                    </span>
                                </div>

                                <div className="flex items-center gap-2 bg-gray-50 dark:bg-slate-900 p-3 rounded-xl mb-4">
                                    <LinkIcon className="w-4 h-4 text-gray-400" />
                                    <span className="text-xs text-gray-600 dark:text-slate-400 font-mono truncate flex-1">{link.url}</span>
                                    <button className="text-indigo-600 hover:text-indigo-700">
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>

                                <div className="flex gap-2">
                                    <button className="flex-1 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
                                        <Share2 className="w-3 h-3" /> Share
                                    </button>
                                    <Link href={`/dashboard/business/payment-link/edit/${link.id}`} className="px-4 py-2 rounded-xl border border-gray-200 dark:border-slate-700 text-gray-600 dark:text-slate-400 text-xs font-bold hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors">
                                        Edit
                                    </Link>
                                </div>
                            </div>
                        ))}
                </div>

            </div>
        </div>
    );
}
