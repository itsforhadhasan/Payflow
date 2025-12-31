'use client';

import { SubPageHeader } from '@/components/sub-page-header';
import { DollarSign, FileText, Link as LinkIcon, Save, Type } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export default function EditPaymentLinkPage() {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        description: ''
    });

    // Simulate fetching data
    useEffect(() => {
        // Mock data lookup based on ID (In real app, fetch from API)
        const mockData = {
            '1': { title: 'Summer Sale 2024', amount: '500', description: 'Discounted items for summer clearance.' },
            '2': { title: 'Consultation Fee', amount: '2000', description: 'One hour consultation session.' },
            '3': { title: 'Workshop Registration', amount: '1500', description: 'Entry fee for the web dev workshop.' },
        };

        const id = params.id as string;
        const data = mockData[id as keyof typeof mockData];

        if (data) {
            setFormData(data);
        }
    }, [params.id]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Simulate API update
        setTimeout(() => {
            setIsLoading(false);
            alert('Link updated successfully!');
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] font-sans">
            <SubPageHeader title="Edit Payment Link" backLink="/dashboard/business/payment-link" className="bg-indigo-600 dark:bg-indigo-700" />

            <div className="max-w-2xl mx-auto px-4 pb-8">
                <form onSubmit={handleSubmit} className="bg-white dark:bg-[#1e293b] p-6 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 space-y-6">

                    {/* Title */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <Type className="w-4 h-4" />
                            Link Title
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-indigo-500/20 text-gray-800 dark:text-white font-medium"
                            required
                        />
                    </div>

                    {/* Amount */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <DollarSign className="w-4 h-4" />
                            Amount (৳)
                        </label>
                        <input
                            type="number"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-indigo-500/20 text-gray-800 dark:text-white font-medium"
                            required
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-700 dark:text-gray-300 flex items-center gap-2">
                            <FileText className="w-4 h-4" />
                            Description (Optional)
                        </label>
                        <textarea
                            rows={4}
                            value={formData.description}
                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-900 border-none focus:ring-2 focus:ring-indigo-500/20 text-gray-800 dark:text-white font-medium resize-none"
                        />
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full py-4 rounded-xl bg-indigo-600 text-white font-bold text-lg hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200 dark:shadow-none disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isLoading ? (
                            <span className="animate-pulse">Updating...</span>
                        ) : (
                            <>
                                <Save className="w-5 h-5" />
                                Update Link
                            </>
                        )}
                    </button>

                </form>
            </div>
        </div>
    );
}
