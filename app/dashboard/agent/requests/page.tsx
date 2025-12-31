'use client';

import { SubPageHeader } from '@/components/sub-page-header';
import { Users, Wallet, CheckCircle, X, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function AgentRequestsPage() {
    const [requests, setRequests] = useState([
        { id: 1, customer: 'Rahim Ali', phone: '01712 345 678', amount: 5000, time: '2 min ago', status: 'pending' },
        { id: 2, customer: 'Fatima Begum', phone: '01713 456 789', amount: 3000, time: '5 min ago', status: 'pending' },
        { id: 3, customer: 'Karim Uddin', phone: '01714 567 890', amount: 8000, time: '10 min ago', status: 'pending' },
    ]);

    const handleAccept = (id: number) => {
        setRequests(prev => prev.filter(req => req.id !== id));
        alert('Cash-out request processed successfully!');
    };

    const handleReject = (id: number) => {
        setRequests(prev => prev.filter(req => req.id !== id));
        alert('Cash-out request rejected.');
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] pb-24">
            <SubPageHeader title="Cash-Out Requests" backLink="/dashboard/agent" className="bg-emerald-600" />

            <div className="max-w-md mx-auto px-4 space-y-4">
                {requests.length === 0 ? (
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-8 text-center">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full mx-auto flex items-center justify-center mb-4 text-gray-300 dark:text-slate-600">
                            <Users className="w-8 h-8" />
                        </div>
                        <p className="font-medium text-gray-800 dark:text-white">No active requests</p>
                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">New cash-out requests will appear here</p>
                    </div>
                ) : (
                    requests.map((request) => (
                        <div
                            key={request.id}
                            className="bg-white dark:bg-[#1e293b] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-slate-800"
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                                        <Wallet className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-gray-800 dark:text-white">{request.customer}</p>
                                        <p className="text-xs text-gray-500 dark:text-slate-400">{request.phone}</p>
                                        <div className="flex items-center gap-1 mt-1">
                                            <Clock className="w-3 h-3 text-gray-400" />
                                            <p className="text-[10px] text-gray-400">{request.time}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-bold text-orange-600 dark:text-orange-400">
                                        ৳{request.amount.toLocaleString()}
                                    </p>
                                    <span className="inline-block px-2 py-0.5 bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 text-[10px] font-bold rounded-full mt-1">
                                        Pending
                                    </span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleAccept(request.id)}
                                    className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2 active:scale-95"
                                >
                                    <CheckCircle className="w-4 h-4" />
                                    Accept
                                </button>
                                <button
                                    onClick={() => handleReject(request.id)}
                                    className="flex-1 py-3 bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-slate-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors flex items-center justify-center gap-2 active:scale-95"
                                >
                                    <X className="w-4 h-4" />
                                    Reject
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
