'use client';

import { useState } from 'react';
import { SubPageHeader } from '@/components/sub-page-header';
import { Zap, Droplets, Flame, Wifi, Tv, Search, CheckCircle, ArrowRight, Building2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function PayBillPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [selectedOrg, setSelectedOrg] = useState<any>(null);
    const [billStep, setBillStep] = useState(1); // 1: Input, 2: Confirm
    const [amount, setAmount] = useState('');
    const [billNumber, setBillNumber] = useState('');
    const [showSuccess, setShowSuccess] = useState(false);

    const categories = [
        { name: 'Electricity', icon: Zap, color: 'text-yellow-500 bg-yellow-50 dark:bg-yellow-500/10' },
        { name: 'Gas', icon: Flame, color: 'text-orange-500 bg-orange-50 dark:bg-orange-500/10' },
        { name: 'Water', icon: Droplets, color: 'text-blue-500 bg-blue-50 dark:bg-blue-500/10' },
        { name: 'Internet', icon: Wifi, color: 'text-indigo-500 bg-indigo-50 dark:bg-indigo-500/10' },
        { name: 'TV', icon: Tv, color: 'text-pink-500 bg-pink-50 dark:bg-pink-500/10' },
    ];

    const allOrganizations = [
        { id: 1, name: 'DESCO Prepaid', category: 'Electricity', icon: Zap },
        { id: 2, name: 'DPDC Postpaid', category: 'Electricity', icon: Zap },
        { id: 3, name: 'Nesco', category: 'Electricity', icon: Zap },
        { id: 4, name: 'Karnaphuli Gas', category: 'Gas', icon: Flame },
        { id: 5, name: 'Titas Gas', category: 'Gas', icon: Flame },
        { id: 6, name: 'Dhaka WASA', category: 'Water', icon: Droplets },
        { id: 7, name: 'Khulna WASA', category: 'Water', icon: Droplets },
        { id: 8, name: 'Link3', category: 'Internet', icon: Wifi },
        { id: 9, name: 'Carnival', category: 'Internet', icon: Wifi },
        { id: 10, name: 'Amber IT', category: 'Internet', icon: Wifi },
        { id: 11, name: 'Akash DTH', category: 'TV', icon: Tv },
    ];

    const filteredOrgs = allOrganizations.filter(org => {
        const matchesSearch = org.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory ? org.category === selectedCategory : true;
        return matchesSearch && matchesCategory;
    });

    const handleOrgClick = (org: any) => {
        setSelectedOrg(org);
        setBillStep(1);
        setAmount('');
        setBillNumber('');
    };

    const handleBillNext = () => {
        if (!billNumber || !amount) {
            alert('Please enter Bill Number and Amount');
            return;
        }
        setBillStep(2);
    };

    const handleConfirmPay = () => {
        setShowSuccess(true);
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] font-sans">
            <SubPageHeader title="Pay Bill" />

            <div className="max-w-md mx-auto px-4 space-y-6 pb-8">

                {/* Search Organization */}
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search Organization"
                        className="w-full bg-white dark:bg-[#1e293b] border-none rounded-2xl py-4 pl-12 pr-6 text-sm font-bold text-gray-800 dark:text-white shadow-sm focus:ring-2 focus:ring-[#E2136E] outline-none"
                    />
                </div>

                {/* Categories Grid */}
                <div>
                    <h3 className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-4 px-2">Categories</h3>
                    <div className="grid grid-cols-3 gap-3">
                        {categories.map((cat, idx) => (
                            <button
                                key={idx}
                                onClick={() => setSelectedCategory(selectedCategory === cat.name ? null : cat.name)}
                                className={cn(
                                    "p-4 rounded-2xl shadow-sm flex flex-col items-center gap-3 transition-all",
                                    selectedCategory === cat.name
                                        ? "bg-[#E2136E] text-white transform scale-105 ring-4 ring-[#E2136E]/20"
                                        : "bg-white dark:bg-[#1e293b] hover:bg-gray-50 dark:hover:bg-slate-800"
                                )}
                            >
                                <div className={cn("w-10 h-10 rounded-full flex items-center justify-center", selectedCategory === cat.name ? "bg-white/20 text-white" : cat.color)}>
                                    <cat.icon className="w-5 h-5" />
                                </div>
                                <span className={cn("text-[10px] font-bold", selectedCategory === cat.name ? "text-white" : "text-gray-700 dark:text-gray-300")}>{cat.name}</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Organizations List */}
                <div>
                    <h3 className="text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider mb-4 px-2">
                        {selectedCategory ? `${selectedCategory} Organizations` : 'All Organizations'}
                    </h3>

                    {filteredOrgs.length > 0 ? (
                        <div className="space-y-3">
                            {filteredOrgs.map((org) => (
                                <button
                                    key={org.id}
                                    onClick={() => handleOrgClick(org)}
                                    className="w-full bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-sm flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors text-left"
                                >
                                    <div className="w-12 h-12 bg-gray-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400">
                                        <org.icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-800 dark:text-white text-sm">{org.name}</h4>
                                        <p className="text-xs text-gray-500">{org.category}</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 text-gray-300" />
                                </button>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-8 text-gray-400">
                            <Building2 className="w-12 h-12 mx-auto mb-2 opacity-20" />
                            <p className="text-sm">No organizations found</p>
                        </div>
                    )}
                </div>

            </div>

            {/* Bill Payment Modal */}
            <AnimatePresence>
                {selectedOrg && !showSuccess && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedOrg(null)}
                            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            className="fixed bottom-0 left-0 right-0 md:absolute md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-4 md:right-4 bg-white dark:bg-[#1e293b] rounded-t-[2.5rem] md:rounded-[2.5rem] p-6 z-50 shadow-2xl max-w-md mx-auto"
                        >
                            <div className="flex items-center gap-4 mb-6 pb-6 border-b border-gray-100 dark:border-slate-800">
                                <div className="w-12 h-12 bg-gray-100 dark:bg-slate-800 rounded-xl flex items-center justify-center text-gray-600 dark:text-gray-400">
                                    <selectedOrg.icon className="w-6 h-6" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">{selectedOrg.name}</h3>
                                    <p className="text-xs text-gray-500">{selectedOrg.category}</p>
                                </div>
                            </div>

                            {billStep === 1 ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Bill Number / Account No</label>
                                        <input
                                            type="text"
                                            value={billNumber}
                                            onChange={(e) => setBillNumber(e.target.value)}
                                            placeholder="Enter Bill Number"
                                            className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl py-3 px-4 text-base font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-[#E2136E] outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Amount</label>
                                        <input
                                            type="number"
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="0"
                                            className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl py-3 px-4 text-base font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-[#E2136E] outline-none"
                                        />
                                    </div>

                                    <button
                                        onClick={handleBillNext}
                                        className="w-full bg-[#E2136E] text-white py-4 rounded-xl font-bold text-lg flex items-center justify-center gap-2 mt-4"
                                    >
                                        Next <ArrowRight className="w-5 h-5" />
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6 text-center">
                                    <div className="bg-gray-50 dark:bg-slate-900 p-4 rounded-xl text-left text-sm space-y-2">
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Bill Number</span>
                                            <span className="font-bold text-gray-800 dark:text-white">{billNumber}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-500">Amount</span>
                                            <span className="font-bold text-[#E2136E]">৳ {amount}</span>
                                        </div>
                                        <div className="flex justify-between text-xs pt-2 border-t border-gray-200 dark:border-slate-800 mt-2">
                                            <span className="text-gray-400">Total Payable</span>
                                            <span className="font-bold text-gray-800 dark:text-white">৳ {amount}</span>
                                        </div>
                                    </div>

                                    <div className="space-y-3">
                                        <input
                                            type="password"
                                            placeholder="Enter PIN"
                                            className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl py-3 px-4 text-center font-bold text-lg tracking-widest focus:ring-2 focus:ring-[#E2136E] outline-none"
                                        />
                                        <button
                                            onClick={handleConfirmPay}
                                            className="w-full bg-[#E2136E] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-pink-500/30"
                                        >
                                            Confirm Pay Bill
                                        </button>
                                        <button onClick={() => setSelectedOrg(null)} className="text-sm text-gray-400 font-bold hover:text-gray-600">Cancel</button>
                                    </div>
                                </div>
                            )}
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
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">My Bill Paid!</h3>
                            <p className="text-gray-500 dark:text-slate-400 mb-8">
                                You successfully paid ৳{amount} to {selectedOrg?.name}.
                            </p>
                            <button
                                onClick={() => {
                                    setShowSuccess(false);
                                    setSelectedOrg(null);
                                    setAmount('');
                                    setBillNumber('');
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
