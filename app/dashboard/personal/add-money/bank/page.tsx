'use client';

import { useState } from 'react';
import { SubPageHeader } from '@/components/sub-page-header';
import { Building2, Plus, ChevronRight, CheckCircle, Smartphone, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BankTransferPage() {
    const [banks, setBanks] = useState([
        { name: 'City Bank', account: '1234 **** **** 5678' },
        { name: 'Brac Bank', account: '9876 **** **** 4321' },
    ]);

    // States for Transfer Flow
    const [selectedBank, setSelectedBank] = useState<any>(null);
    const [amount, setAmount] = useState('');
    const [step, setStep] = useState(1); // 1: Input, 2: Confirm

    // States for Link Bank Flow
    const [showLinkModal, setShowLinkModal] = useState(false);
    const [newBankName, setNewBankName] = useState('');
    const [newBankAccount, setNewBankAccount] = useState('');

    // Success Modal
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    const handleBankClick = (bank: any) => {
        setSelectedBank(bank);
        setStep(1);
        setAmount('');
    };

    const handleTransferNext = () => {
        if (!amount) {
            alert('Please enter amount');
            return;
        }
        setStep(2);
    };

    const handleTransferConfirm = () => {
        setSuccessMessage(`Successfully added ৳${amount} from ${selectedBank.name}`);
        setShowSuccess(true);
    };

    const handleLinkBank = () => {
        if (!newBankName || !newBankAccount) {
            alert('Please fill in bank details');
            return;
        }
        setBanks([...banks, { name: newBankName, account: `${newBankAccount.slice(0, 4)} **** **** ${newBankAccount.slice(-4)}` }]);
        setShowLinkModal(false);
        setNewBankName('');
        setNewBankAccount('');
        setSuccessMessage(`${newBankName} linked successfully!`);
        setShowSuccess(true);
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] font-sans">
            <SubPageHeader title="Bank to PayFlow" />

            <div className="max-w-md mx-auto px-4 space-y-6">

                <h2 className="text-xl font-bold text-gray-800 dark:text-white px-2">Linked Banks</h2>

                {/* Linked Accounts List */}
                {banks.map((bank, i) => (
                    <button
                        key={i}
                        onClick={() => handleBankClick(bank)}
                        className="w-full bg-white dark:bg-[#1e293b] p-5 rounded-2xl shadow-sm hover:shadow-md transition-all group flex items-center gap-4 text-left"
                    >
                        <div className="w-12 h-12 bg-blue-50 dark:bg-blue-900/20 rounded-xl flex items-center justify-center text-blue-600 dark:text-blue-400">
                            <Building2 className="w-6 h-6" />
                        </div>
                        <div className="flex-1">
                            <h3 className="font-bold text-gray-800 dark:text-white">{bank.name}</h3>
                            <p className="text-xs text-gray-500">{bank.account}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-300 group-hover:text-[#E2136E]" />
                    </button>
                ))}

                {/* Add New Bank Button */}
                <button
                    onClick={() => setShowLinkModal(true)}
                    className="w-full border-2 border-dashed border-gray-200 dark:border-slate-700 p-5 rounded-2xl flex items-center justify-center gap-2 text-gray-500 hover:border-[#E2136E] hover:text-[#E2136E] transition-colors"
                >
                    <Plus className="w-5 h-5" />
                    <span className="font-bold text-sm">Link New Bank Account</span>
                </button>

                <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl">
                    <p className="text-xs text-blue-600 dark:text-blue-300">
                        <strong>Note:</strong> You can add money from your own bank account only. The name on the bank account must match your PayFlow account name.
                    </p>
                </div>

            </div>

            {/* Transfer Modal - Bottom Sheet */}
            <AnimatePresence>
                {selectedBank && !showSuccess && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedBank(null)}
                            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            className="fixed bottom-0 left-0 right-0 md:absolute md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-4 md:right-4 bg-white dark:bg-[#1e293b] rounded-t-[2.5rem] md:rounded-[2.5rem] p-6 z-50 shadow-2xl max-w-md mx-auto"
                        >
                            {step === 1 ? (
                                <div className="space-y-6">
                                    <div className="text-center">
                                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">Add from {selectedBank.name}</h3>
                                        <p className="text-xs text-gray-500">{selectedBank.account}</p>
                                    </div>

                                    <div className="relative">
                                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-gray-400">৳</span>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="0"
                                            className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl py-4 pl-12 pr-4 text-3xl font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-[#E2136E] outline-none text-center"
                                            autoFocus
                                        />
                                    </div>

                                    <button
                                        onClick={handleTransferNext}
                                        className="w-full bg-[#E2136E] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2"
                                    >
                                        Next <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6 pt-4 text-center">
                                    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto text-blue-600 dark:text-blue-400">
                                        <Building2 className="w-8 h-8" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-800 dark:text-white">Confirm Deposit</h3>
                                        <p className="text-sm text-gray-500">You are adding</p>
                                        <p className="text-3xl font-bold text-[#E2136E] mt-1">৳ {amount}</p>
                                    </div>
                                    <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl text-left text-sm space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">From</span>
                                            <span className="font-bold text-gray-800 dark:text-white">{selectedBank.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Fee</span>
                                            <span className="font-bold text-gray-800 dark:text-white">Free</span>
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <button
                                            onClick={handleTransferConfirm}
                                            className="w-full bg-[#E2136E] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-pink-500/30"
                                        >
                                            Confirm Transfer
                                        </button>
                                        <button onClick={() => setStep(1)} className="text-sm text-gray-400 font-bold hover:text-gray-600">Back</button>
                                    </div>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Link New Bank Modal */}
            <AnimatePresence>
                {showLinkModal && !showSuccess && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowLinkModal(false)}
                            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            className="fixed bottom-0 left-0 right-0 md:absolute md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-4 md:right-4 bg-white dark:bg-[#1e293b] rounded-t-[2.5rem] md:rounded-[2.5rem] p-6 z-50 shadow-2xl max-w-md mx-auto"
                        >
                            <div className="space-y-6">
                                <h3 className="text-xl font-bold text-gray-800 dark:text-white text-center">Link Bank Account</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Bank Name</label>
                                        <input
                                            type="text"
                                            value={newBankName}
                                            onChange={(e) => setNewBankName(e.target.value)}
                                            placeholder="e.g. Dutch Bangla Bank"
                                            className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl py-3 px-4 text-base font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-[#E2136E] outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Account Number</label>
                                        <input
                                            type="tel"
                                            value={newBankAccount}
                                            onChange={(e) => setNewBankAccount(e.target.value)}
                                            placeholder="1234 5678 9012"
                                            className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl py-3 px-4 text-base font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-[#E2136E] outline-none"
                                        />
                                    </div>
                                </div>

                                <button
                                    onClick={handleLinkBank}
                                    className="w-full bg-[#E2136E] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-pink-500/30"
                                >
                                    Link Account
                                </button>
                            </div>
                        </motion.div>
                    </>
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
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Success!</h3>
                            <p className="text-gray-500 dark:text-slate-400 mb-8">
                                {successMessage}
                            </p>
                            <button
                                onClick={() => {
                                    setShowSuccess(false);
                                    setSelectedBank(null);
                                    setAmount('');
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
    );
}
