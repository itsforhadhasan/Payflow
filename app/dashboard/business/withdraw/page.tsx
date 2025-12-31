'use client';

import { SubPageHeader } from '@/components/sub-page-header';
import { Contact, User, Send, X, Clock, Banknote } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function WithdrawPage() {
    const [amount, setAmount] = useState('');
    const [agentNumber, setAgentNumber] = useState('');
    const [note, setNote] = useState('');
    const [showContacts, setShowContacts] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    // Mock agents
    const quickAgents = [
        { name: 'Agent X', number: '01700000001' },
        { name: 'Agent Y', number: '01900000002' },
        { name: 'Agent Z', number: '01800000003' },
    ];

    const handleSubmit = () => {
        if (!amount || !agentNumber) {
            // Using a simple shake animation or error state would be better, but sticking to alert for validation for now, 
            // or better, just don't proceed.
            // Let's rely on required attribute or better, just show alert for error, but Success Modal for success.
            alert('Please fill in Agent Number and Amount');
            return;
        }

        // Show success modal
        setShowSuccess(true);

        // Reset form in background
        setAmount('');
        setAgentNumber('');
        setNote('');
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] font-sans">
            <SubPageHeader title="Withdraw Money" backLink="/dashboard/business" className="bg-indigo-600 dark:bg-indigo-700" />

            <div className="max-w-md mx-auto px-4 relative">
                <div className="bg-white dark:bg-[#1e293b] rounded-[2.5rem] p-8 shadow-xl shadow-gray-200/50 dark:shadow-none space-y-8">

                    {/* Agent Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Agent Number</label>
                        <div className="relative group">
                            <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-indigo-600 transition-colors" />
                            <input
                                type="tel"
                                value={agentNumber}
                                onChange={(e) => setAgentNumber(e.target.value)}
                                placeholder="Enter Agent Number"
                                className="w-full bg-gray-50 dark:bg-slate-900 border-2 border-transparent focus:border-indigo-600/20 rounded-2xl py-4 pl-12 pr-12 text-lg font-bold text-gray-800 dark:text-white outline-none transition-all"
                            />
                            <button
                                onClick={() => setShowContacts(true)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-indigo-600 p-1 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-full transition-all"
                            >
                                <Contact className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Amount Input */}
                    <div className="space-y-4">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Amount</label>
                        <div className="relative">
                            <span className="absolute left-6 top-1/2 -translate-y-1/2 text-3xl font-bold text-indigo-600">৳</span>
                            <input
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="0"
                                className="w-full bg-gray-50 dark:bg-slate-900 rounded-3xl py-8 pl-16 pr-6 text-4xl font-bold text-gray-800 dark:text-white text-center outline-none focus:ring-2 focus:ring-indigo-600/20 transition-all placeholder:text-gray-200"
                            />
                        </div>
                    </div>

                    {/* Note Input */}
                    <div className="space-y-2">
                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Reference (Optional)</label>
                        <textarea
                            value={note}
                            onChange={(e) => setNote(e.target.value)}
                            placeholder="Reason for withdrawal..."
                            rows={3}
                            className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-2xl p-4 font-medium text-gray-700 dark:text-slate-300 outline-none focus:ring-2 focus:ring-indigo-600/20 resize-none"
                        ></textarea>
                    </div>

                    <button onClick={handleSubmit} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold text-lg shadow-lg shadow-indigo-500/30 flex items-center justify-center gap-2 transition-all hover:scale-[1.02] active:scale-95">
                        <Banknote className="w-5 h-5" /> Confirm Withdraw
                    </button>

                </div>

                {/* Contact Picker Modal */}
                <AnimatePresence>
                    {showContacts && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowContacts(false)}
                                className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                            />
                            <motion.div
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 100 }}
                                className="fixed bottom-0 left-0 right-0 md:absolute md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-4 md:right-4 bg-white dark:bg-[#1e293b] rounded-t-[2.5rem] md:rounded-[2.5rem] p-6 z-50 shadow-2xl"
                            >
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">Recent Agents</h3>
                                    <button onClick={() => setShowContacts(false)} className="p-2 bg-gray-100 dark:bg-slate-800 rounded-full">
                                        <X className="w-5 h-5 text-gray-500" />
                                    </button>
                                </div>

                                <div className="space-y-4 max-h-64 overflow-y-auto">
                                    {quickAgents.map((agent, i) => (
                                        <button
                                            key={i}
                                            onClick={() => { setAgentNumber(agent.number); setShowContacts(false); }}
                                            className="w-full flex items-center gap-4 p-4 rounded-2xl bg-gray-50 dark:bg-slate-900 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-colors group"
                                        >
                                            <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 flex items-center justify-center">
                                                <Clock className="w-5 h-5" />
                                            </div>
                                            <div className="text-left">
                                                <p className="font-bold text-gray-800 dark:text-white group-hover:text-indigo-600">{agent.name}</p>
                                                <p className="text-xs text-gray-400">{agent.number}</p>
                                            </div>
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                {/* Success Modal */}
                <AnimatePresence>
                    {showSuccess && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowSuccess(false)}
                                className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm flex items-center justify-center p-4"
                            >
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    onClick={(e) => e.stopPropagation()}
                                    className="bg-white dark:bg-[#1e293b] w-full max-w-sm rounded-[2.5rem] p-8 relative text-center"
                                >
                                    <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
                                        <Banknote className="w-10 h-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Withdrawal Initiated!</h3>
                                    <p className="text-gray-500 dark:text-slate-400 mb-8">
                                        Your request has been sent to the agent. Please wait for confirmation.
                                    </p>
                                    <button
                                        onClick={() => setShowSuccess(false)}
                                        className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 rounded-2xl hover:scale-[1.02] transition-transform"
                                    >
                                        Done
                                    </button>
                                </motion.div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
