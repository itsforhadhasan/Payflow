'use client';

import { SubPageHeader } from '@/components/sub-page-header';
import { Users, Building2, Phone } from 'lucide-react';
import { useState } from 'react';

export default function B2BTransferPage() {
    const [agentId, setAgentId] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!agentId || !amount) {
            alert('Please fill in all required fields');
            return;
        }
        alert(`B2B Transfer processed: ৳${amount} to Agent ${agentId}`);
        setAgentId('');
        setAmount('');
        setNote('');
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] pb-24">
            <SubPageHeader title="B2B Transfer" backLink="/dashboard/agent" className="bg-emerald-600" />

            <div className="max-w-md mx-auto px-4">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                                <Users className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 dark:text-white">B2B Transfer</h3>
                                <p className="text-xs text-gray-500 dark:text-slate-400">Transfer to another agent</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 dark:text-slate-400 mb-2 block">Agent ID</label>
                                <div className="relative">
                                    <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={agentId}
                                        onChange={(e) => setAgentId(e.target.value)}
                                        placeholder="AG-12345"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-500 dark:text-slate-400 mb-2 block">Amount (৳)</label>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="0.00"
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white"
                                    required
                                    min="1"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-500 dark:text-slate-400 mb-2 block">Note (Optional)</label>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Add a note..."
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors active:scale-95"
                    >
                        Process Transfer
                    </button>
                </form>
            </div>
        </div>
    );
}
