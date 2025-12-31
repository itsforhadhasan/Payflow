'use client';

import { SubPageHeader } from '@/components/sub-page-header';
import { FileText, Download, Calendar } from 'lucide-react';

export default function AgentReportsPage() {
    const reports = [
        { name: 'Daily Report', date: 'Today', icon: FileText },
        { name: 'Weekly Report', date: 'This Week', icon: Calendar },
        { name: 'Monthly Report', date: 'This Month', icon: FileText },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] pb-24">
            <SubPageHeader title="Reports" backLink="/dashboard/agent" className="bg-emerald-600" />

            <div className="max-w-md mx-auto px-4 space-y-4">
                {reports.map((report, index) => (
                    <div
                        key={index}
                        className="bg-white dark:bg-[#1e293b] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-slate-800 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                <report.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <p className="font-bold text-gray-800 dark:text-white">{report.name}</p>
                                <p className="text-xs text-gray-500 dark:text-slate-400">{report.date}</p>
                            </div>
                        </div>
                        <button className="p-2 rounded-lg bg-gray-50 dark:bg-slate-800 text-gray-600 dark:text-slate-400 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors">
                            <Download className="w-5 h-5" />
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
