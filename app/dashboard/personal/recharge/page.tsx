'use client';

import { useState } from 'react';
import { SubPageHeader } from '@/components/sub-page-header';
import { ArrowRight, Contact, Smartphone, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function MobileRechargePage() {
    const [amount, setAmount] = useState('');
    const [number, setNumber] = useState('');
    const [operator, setOperator] = useState<string | null>(null);
    const [step, setStep] = useState(1);
    const [showSuccess, setShowSuccess] = useState(false);

    const operators = [
        { name: 'Grameenphone', color: 'bg-blue-500' },
        { name: 'Banglalink', color: 'bg-orange-500' },
        { name: 'Robi', color: 'bg-red-500' },
        { name: 'Airtel', color: 'bg-purple-500' },
        { name: 'Teletalk', color: 'bg-green-500' },
    ];

    const handleNext = () => {
        if (!amount || !number || !operator) {
            alert('Please fill in all fields');
            return;
        }
        setStep(2);
    };

    const handleConfirm = () => {
        setShowSuccess(true);
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] font-sans">
            <SubPageHeader title="Mobile Recharge" />

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
                            {/* Number Input */}
                            <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm space-y-4">
                                <label className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Mobile Number</label>
                                <div className="flex gap-4">
                                    <div className="relative flex-1">
                                        <input
                                            type="tel"
                                            value={number}
                                            onChange={(e) => setNumber(e.target.value)}
                                            placeholder="01712-345678"
                                            className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl py-3 px-4 text-lg font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-[#E2136E] outline-none"
                                        />
                                    </div>
                                    <button className="p-3 bg-gray-100 dark:bg-slate-800 rounded-xl text-gray-500 hover:text-[#E2136E] transition-colors">
                                        <Contact className="w-6 h-6" />
                                    </button>
                                </div>
                            </div>

                            {/* Operator Selection */}
                            <div className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm space-y-4">
                                <label className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider">Select Operator</label>
                                <div className="grid grid-cols-5 gap-3">
                                    {operators.map((op, idx) => (
                                        <button
                                            key={idx}
                                            onClick={() => setOperator(op.name)}
                                            className={cn(
                                                "aspect-square rounded-full flex items-center justify-center text-xs font-bold text-white transition-all",
                                                op.color,
                                                operator === op.name ? "ring-4 ring-offset-2 ring-[#E2136E]" : "opacity-80 hover:opacity-100 hover:scale-110"
                                            )}
                                        >
                                            {op.name.slice(0, 2)}
                                        </button>
                                    ))}
                                </div>
                                {operator && <p className="text-center text-sm font-bold text-[#E2136E]">{operator}</p>}
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
                                        className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl py-4 pl-12 pr-4 text-3xl font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-[#E2136E] outline-none"
                                    />
                                </div>
                                <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
                                    {[20, 50, 100, 200, 500].map((amt) => (
                                        <button
                                            key={amt}
                                            onClick={() => setAmount(amt.toString())}
                                            className="px-4 py-2 bg-gray-100 dark:bg-slate-800 rounded-lg text-sm font-bold text-gray-600 dark:text-slate-400 hover:bg-[#E2136E] hover:text-white transition-colors"
                                        >
                                            ৳{amt}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Action Button */}
                            <button
                                onClick={handleNext}
                                className="w-full bg-[#E2136E] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-[#E2136E]/30 flex items-center justify-center gap-2 hover:bg-[#c2105e] transition-colors"
                            >
                                Next <ArrowRight className="w-5 h-5" />
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
                                <Smartphone className="w-10 h-10" />
                            </div>

                            <div>
                                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-1">Confirm Recharge</h2>
                                <p className="text-gray-500 text-sm">Please review the details</p>
                            </div>

                            <div className="bg-gray-50 dark:bg-slate-900 rounded-2xl p-6 space-y-4 text-left">
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Number</span>
                                    <span className="font-bold text-gray-800 dark:text-white">{number}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Operator</span>
                                    <span className="font-bold text-gray-800 dark:text-white">{operator}</span>
                                </div>
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
                                    Recharge Now
                                </button>
                                <button
                                    onClick={() => setStep(1)}
                                    className="text-sm text-gray-400 font-bold hover:text-gray-600 block w-full py-2"
                                >
                                    Back to Edit
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
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Recharge Successful!</h3>
                                <p className="text-gray-500 dark:text-slate-400 mb-8">
                                    Recharge of ৳{amount} to {number} ({operator}) was successful.
                                </p>
                                <button
                                    onClick={() => {
                                        setShowSuccess(false);
                                        setStep(1);
                                        setAmount('');
                                        setNumber('');
                                        setOperator(null);
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
