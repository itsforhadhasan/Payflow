'use client';

import { useState } from 'react';
import { SubPageHeader } from '@/components/sub-page-header';
import { ArrowRight, Store, ScanLine, ShoppingBag, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PaymentPage() {
    const [merchant, setMerchant] = useState('');
    const [amount, setAmount] = useState('');
    const [reference, setReference] = useState('');
    const [step, setStep] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleProceed = () => {
        if (!merchant || !amount) {
            alert('Please enter Merchant and Amount');
            return;
        }
        setStep(2);
    };

    const handleConfirm = () => {
        setShowSuccess(true);
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] font-sans">
            <SubPageHeader title="Make Payment" />

            <div className="max-w-md mx-auto px-4 pb-8">
                <AnimatePresence mode='wait'>
                    {step === 1 && (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            className="space-y-6"
                        >
                            {/* Merchant Input */}
                            <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm space-y-4">
                                <label className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Merchant Number or Name</label>
                                <div className="flex gap-4">
                                    <div className="relative flex-1">
                                        <input
                                            type="text"
                                            value={merchant}
                                            onChange={(e) => setMerchant(e.target.value)}
                                            placeholder="Enter Merchant Account"
                                            className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl py-3 px-4 text-lg font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-[#E2136E]"
                                        />
                                    </div>
                                    <button className="p-3 bg-gray-100 dark:bg-slate-800 rounded-xl text-gray-500 hover:text-[#E2136E] transition-colors">
                                        <ScanLine className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Amount Input */}
                            <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm space-y-4">
                                <label className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Amount</label>
                                <div className="relative">
                                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">৳</span>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        placeholder="0"
                                        className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl py-4 pl-12 pr-4 text-3xl font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-[#E2136E]"
                                    />
                                </div>
                            </div>

                            {/* Reference Input */}
                            <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm space-y-4">
                                <label className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Reference (Optional)</label>
                                <input
                                    type="text"
                                    value={reference}
                                    onChange={(e) => setReference(e.target.value)}
                                    placeholder="Invoice / Bill No"
                                    className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl py-3 px-4 text-lg font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-[#E2136E]"
                                />
                            </div>

                            {/* Saved Merchants */}
                            <h3 className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider px-2">Saved Merchants</h3>
                            <div className="bg-white dark:bg-[#1e293b] rounded-2xl shadow-sm divide-y divide-gray-100 dark:divide-slate-800">
                                {[1, 2, 3].map((i) => (
                                    <button
                                        key={i}
                                        onClick={() => setMerchant(`Agora Super Shop ${i}`)}
                                        className="w-full flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors first:rounded-t-2xl last:rounded-b-2xl text-left"
                                    >
                                        <div className="w-12 h-12 rounded-full bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                                            <Store className="w-6 h-6" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-gray-800 dark:text-white">Agora Super Shop {i}</h4>
                                            <p className="text-xs text-gray-500">01700-00000{i}</p>
                                        </div>
                                    </button>
                                ))}
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={handleProceed}
                                className="w-full bg-[#E2136E] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#E2136E]/30 flex items-center justify-center gap-2 hover:bg-[#c2105e] transition-colors mt-4"
                            >
                                Proceed <ArrowRight className="w-5 h-5" />
                            </button>
                        </motion.div>
                    )}

                    {step === 2 && (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className="bg-white dark:bg-[#1e293b] p-8 rounded-[2.5rem] shadow-xl text-center space-y-8"
                        >
                            <div className="w-20 h-20 bg-pink-50 dark:bg-pink-900/20 rounded-full flex items-center justify-center mx-auto text-[#E2136E] animate-pulse">
                                <ShoppingBag className="w-10 h-10" />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">Confirm Payment</h2>
                                <p className="text-gray-500 text-sm">Review details before paying</p>
                            </div>

                            <div className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-6 space-y-4 text-left">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Merchant</span>
                                    <span className="font-bold text-gray-800 dark:text-white">{merchant}</span>
                                </div>
                                {reference && (
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">Ref</span>
                                        <span className="font-bold text-gray-800 dark:text-white">{reference}</span>
                                    </div>
                                )}
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Amount</span>
                                    <span className="font-bold text-[#E2136E] text-xl">৳ {amount}</span>
                                </div>
                            </div>

                            <div className="space-y-3">
                                <input
                                    type="password"
                                    placeholder="Enter PIN"
                                    className="w-full bg-white dark:bg-[#1e293b] border-2 border-gray-100 dark:border-slate-800 focus:border-[#E2136E] rounded-xl py-3 px-4 text-center font-bold text-lg tracking-widest outline-none transition-colors"
                                />
                                <button
                                    onClick={handleConfirm}
                                    className="w-full bg-[#E2136E] text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-pink-500/30"
                                >
                                    Confirm Payment
                                </button>
                                <button
                                    onClick={() => setStep(1)}
                                    className="text-sm text-gray-400 font-bold hover:text-gray-600 block w-full py-2"
                                >
                                    Cancel
                                </button>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Success Modal */}
                <AnimatePresence>
                    {showSuccess && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm flex items-center justify-center p-4"
                        >
                            <motion.div
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                                className="bg-white dark:bg-[#1e293b] w-full max-w-sm rounded-[2.5rem] p-8 relative text-center"
                            >
                                <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
                                    <CheckCircle className="w-10 h-10" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Payment Successful!</h3>
                                <p className="text-gray-500 dark:text-slate-400 mb-8">
                                    Payment of ৳{amount} to {merchant} was successful.
                                </p>
                                <button
                                    onClick={() => {
                                        setShowSuccess(false);
                                        setStep(1);
                                        setAmount('');
                                        setMerchant('');
                                        setReference('');
                                    }}
                                    className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 rounded-2xl hover:scale-[1.02] transition-transform"
                                >
                                    Done
                                </button>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
