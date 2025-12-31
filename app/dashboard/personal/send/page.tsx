'use client';

import { useState } from 'react';
import { SubPageHeader } from '@/components/sub-page-header';
import { ArrowRight, Contact, User, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

export default function SendMoneyPage() {
    const [amount, setAmount] = useState('');
    const [receiver, setReceiver] = useState('');
    const [step, setStep] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);

    const suggestAmounts = [500, 1000, 2000, 5000];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] font-sans">
            <SubPageHeader title="Send Money" />

            <div className="max-w-md mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white dark:bg-[#1e293b] rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 dark:shadow-none relative overflow-hidden"
                >
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#E2136E]/5 rounded-bl-[100%] pointer-events-none"></div>

                    {step === 1 && (
                        <div className="space-y-8">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Receiver</label>
                                <div className="relative group">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-[#E2136E] transition-colors" />
                                    <input
                                        type="tel"
                                        value={receiver}
                                        onChange={(e) => setReceiver(e.target.value)}
                                        placeholder="Enter Phone Number"
                                        className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-transparent focus:border-[#E2136E]/20 rounded-2xl py-4 pl-12 pr-12 text-lg font-bold text-gray-800 dark:text-white outline-none transition-all"
                                    />
                                    <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#E2136E]">
                                        <Contact className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Amount</label>
                                <div className="relative">
                                    <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-bold text-[#E2136E]">৳</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0"
                                        className="w-full bg-gray-50 dark:bg-slate-900 rounded-3xl py-8 pl-16 pr-6 text-4xl font-bold text-gray-800 dark:text-white text-center outline-none focus:ring-2 focus:ring-[#E2136E]/20 transition-all placeholder:text-gray-200"
                                    />
                                </div>

                                <div className="grid grid-cols-4 gap-2">
                                    {suggestAmounts.map((amt) => (
                                        <button
                                            key={amt}
                                            onClick={() => setAmount(amt.toString())}
                                            className="py-2 rounded-xl bg-gray-50 dark:bg-slate-800 text-xs font-bold text-gray-500 hover:bg-[#E2136E] hover:text-white transition-colors"
                                        >
                                            ৳{amt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <p className="text-center text-xs text-gray-400">Available Balance: <span className="font-bold text-gray-600 dark:text-slate-300">৳ 25,450</span></p>

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
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">Confirm Transfer</h2>
                                <p className="text-gray-500 text-sm">Review the details below</p>
                            </div>

                            <div className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-6 space-y-4 text-left">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Receiver</span>
                                    <span className="font-bold text-gray-800 dark:text-white">{receiver}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Amount</span>
                                    <span className="font-bold text-[#E2136E] text-xl">৳ {amount}</span>
                                </div>
                                <div className="flex justify-between items-center text-xs text-gray-400">
                                    <span>Fee</span>
                                    <span>৳ 5.00</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <input
                                    type="password"
                                    placeholder="Enter PIN"
                                    className="w-full bg-white dark:bg-[#1e293b] border-2 border-gray-100 dark:border-slate-800 focus:border-[#E2136E] rounded-xl py-3 px-4 text-center font-bold text-lg tracking-widest outline-none transition-colors"
                                />
                                <button
                                    onClick={() => setShowSuccess(true)}
                                    className="w-full bg-[#E2136E] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-pink-500/30"
                                >
                                    Confirm Send Money
                                </button>
                                <button onClick={() => setStep(1)} className="text-sm text-gray-400 font-bold hover:text-gray-600 block w-full py-2">
                                    Cancel
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Success Modal */}
                    {showSuccess && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm flex items-center justify-center p-4 left-0 top-0"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-white dark:bg-[#1e293b] w-full max-w-sm rounded-[2.5rem] p-8 relative text-center"
                            >
                                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
                                    <ShieldCheck className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Transfer Successful!</h3>
                                <p className="text-gray-500 dark:text-slate-400 mb-8">
                                    You have successfully sent ৳{amount} to {receiver}.
                                </p>
                                <button
                                    onClick={() => {
                                        setShowSuccess(false);
                                        setStep(1);
                                        setAmount('');
                                        setReceiver('');
                                    }}
                                    className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 rounded-2xl hover:scale-[1.02] transition-transform"
                                >
                                    Done
                                </button>
                            </motion.div>
                        </motion.div>
                    )}

                </motion.div>
            </div>
        </div>
    );
}
