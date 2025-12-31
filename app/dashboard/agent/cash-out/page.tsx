'use client';

import { SubPageHeader } from '@/components/sub-page-header';
import { Wallet, User, Phone, CheckCircle, AlertCircle } from 'lucide-react';
import { useState } from 'react';

export default function CashOutPage() {
    const [phone, setPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [note, setNote] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

    const showToast = (message: string, type: 'success' | 'error' = 'success') => {
        setToast({ message, type });
        setTimeout(() => setToast(null), 3000);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!phone || !amount) {
            showToast('Please fill in all required fields', 'error');
            return;
        }

        if (parseFloat(amount) <= 0) {
            showToast('Amount must be greater than 0', 'error');
            return;
        }

        setIsLoading(true);
        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Here you would typically send data to your backend
            console.log({
                type: 'cash-out',
                phone,
                amount,
                note,
                timestamp: new Date().toISOString()
            });

            showToast(`Cash Out request processed: ৳${amount} to ${phone}`, 'success');
            setPhone('');
            setAmount('');
            setNote('');
        } catch (error) {
            showToast('Failed to process cash out request', 'error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] pb-24">
            <SubPageHeader title="Cash Out" backLink="/dashboard/agent" className="bg-emerald-600" />

            {/* Toast Notification */}
            {toast && (
                <div className={`fixed top-24 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-3 px-6 py-4 rounded-xl shadow-lg z-50 animate-in fade-in slide-in-from-top-4 ${
                    toast.type === 'success' 
                        ? 'bg-orange-600 text-white' 
                        : 'bg-red-600 text-white'
                }`}>
                    {toast.type === 'success' ? (
                        <CheckCircle className="w-5 h-5" />
                    ) : (
                        <AlertCircle className="w-5 h-5" />
                    )}
                    <span className="font-medium">{toast.message}</span>
                </div>
            )}

            <div className="max-w-md mx-auto px-4">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-slate-800">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-12 h-12 rounded-xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400 flex items-center justify-center">
                                <Wallet className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-gray-800 dark:text-white">Cash Out</h3>
                                <p className="text-xs text-gray-500 dark:text-slate-400">Give cash to customer</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="text-xs font-bold text-gray-500 dark:text-slate-400 mb-2 block">Customer Phone Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                    <input
                                        type="tel"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="01712 345 678"
                                        className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
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
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
                                    required
                                    min="1"
                                    step="0.01"
                                />
                            </div>

                            <div>
                                <label className="text-xs font-bold text-gray-500 dark:text-slate-400 mb-2 block">Note (Optional)</label>
                                <textarea
                                    value={note}
                                    onChange={(e) => setNote(e.target.value)}
                                    placeholder="Add a note..."
                                    rows={3}
                                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white resize-none focus:outline-none focus:ring-2 focus:ring-orange-500"
                                />
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 bg-orange-600 text-white rounded-xl font-bold hover:bg-orange-700 transition-colors active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Processing...' : 'Process Cash Out'}
                    </button>
                </form>
            </div>
        </div>
    );
}
