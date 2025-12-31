'use client';

import { useState } from 'react';
import { SubPageHeader } from '@/components/sub-page-header';
import { ArrowRight, QrCode, MapPin, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CashOutPage() {
    const [amount, setAmount] = useState('');
    const [agent, setAgent] = useState('');
    const [step, setStep] = useState(1);

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] font-sans">
            <SubPageHeader title="Cash Out" />

            <div className="max-w-md mx-auto px-4">
                <div className="bg-white dark:bg-[#1e293b] rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 dark:shadow-none space-y-8">

                    {step === 1 && (
                        <div className="space-y-8">
                            {/* Agent Input */}
                            <div className="space-y-4">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Agent Number</label>
                                <div className="flex gap-3">
                                    <input
                                        type="tel"
                                        value={agent}
                                        onChange={(e) => setAgent(e.target.value)}
                                        placeholder="Enter Agent Number"
                                        className="flex-1 bg-gray-50 dark:bg-slate-900 border-none rounded-2xl py-4 px-6 text-lg font-bold text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-[#E2136E]/50 transition-all"
                                    />
                                    <button className="w-14 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-2xl flex items-center justify-center hover:scale-105 transition-transform">
                                        <QrCode className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Amount Input */}
                            <div className="space-y-4">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Amount</label>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">৳</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0"
                                        className="w-full bg-gray-50 dark:bg-slate-900 rounded-2xl py-6 pl-12 pr-6 text-3xl font-bold text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-[#E2136E]/50 transition-all"
                                    />
                                </div>
                                <div className="flex justify-between text-xs font-medium px-2">
                                    <span className="text-gray-400">Fee: <span className="text-gray-600 dark:text-slate-300">৳ 18.50</span> / 1k</span>
                                    <span className="text-[#E2136E]">Balance: ৳ 25,450</span>
                                </div>
                            </div>

                            <button
                                onClick={() => setStep(2)}
                                className="w-full bg-[#E2136E] hover:bg-[#c2105e] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-pink-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95"
                            >
                                Next <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    )}

                    {step === 2 && (
                        <div className="space-y-8 text-center pt-4">
                            <div className="w-20 h-20 bg-pink-50 dark:bg-pink-900/20 rounded-full flex items-center justify-center mx-auto text-[#E2136E] animate-pulse">
                                <ShieldCheck className="w-10 h-10" />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">Confirm Cash Out</h2>
                                <p className="text-gray-500 text-sm">Review details before confirming</p>
                            </div>

                            <div className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-6 space-y-4 text-left">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Agent</span>
                                    <span className="font-bold text-gray-800 dark:text-white">{agent || '01700000000'}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Amount</span>
                                    <span className="font-bold text-[#E2136E] text-xl">৳ {amount || '0'}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs text-gray-400">
                                    <span>Fee</span>
                                    <span>৳ {((Number(amount || 0) * 18.5) / 1000).toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <input
                                    type="password"
                                    placeholder="Enter PIN"
                                    className="w-full bg-white dark:bg-[#1e293b] border-2 border-gray-100 dark:border-slate-800 focus:border-[#E2136E] rounded-xl py-3 px-4 text-center font-bold text-lg tracking-widest outline-none transition-colors"
                                />
                                <button className="w-full bg-[#E2136E] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-pink-500/30">
                                    Confirm Cash Out
                                </button>
                                <button onClick={() => setStep(1)} className="text-sm text-gray-400 font-bold hover:text-gray-600 block w-full py-2">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
