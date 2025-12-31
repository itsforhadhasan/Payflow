'use client';

import Link from 'next/link';
import { ArrowLeft, FileText, Download, Calendar } from 'lucide-react';

export default function ReportsPage() {
    return (
        <div className="min-h-screen bg-[#1F0344] transition-colors duration-300 pb-32 md:pb-16 overflow-x-hidden">
            <div className="max-w-5xl mx-auto md:pt-8 px-4 md:px-4">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8 mt-6">
                    <Link href="/admin" className="p-2 hover:bg-purple-600/20 rounded-lg transition-colors">
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </Link>
                    <h1 className="text-4xl font-bold text-white">Reports</h1>
                </div>

                {/* Reports Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {[
                        {
                            title: 'Daily Transactions Report',
                            description: 'Summary of all daily transactions',
                            icon: '📋',
                            date: 'Updated: Today'
                        },
                        {
                            title: 'Revenue Report',
                            description: 'Revenue breakdown and analytics',
                            icon: '💰',
                            date: 'Updated: Today'
                        },
                        {
                            title: 'User Activity Report',
                            description: 'User engagement and activity metrics',
                            icon: '👥',
                            date: 'Updated: Today'
                        },
                        {
                            title: 'System Health Report',
                            description: 'System performance and reliability',
                            icon: '⚙️',
                            date: 'Updated: Today'
                        },
                    ].map((report, i) => (
                        <div key={i} className="bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border border-purple-700/50 rounded-2xl p-6 hover:shadow-lg transition-all">
                            <div className="flex items-start justify-between mb-4">
                                <span className="text-4xl">{report.icon}</span>
                                <Download className="w-5 h-5 text-purple-300 cursor-pointer hover:text-purple-100 transition-colors" />
                            </div>
                            <h3 className="text-white font-bold text-lg mb-2">{report.title}</h3>
                            <p className="text-purple-300 text-sm mb-4">{report.description}</p>
                            <p className="text-purple-400 text-xs">{report.date}</p>
                        </div>
                    ))}
                </div>

                {/* Generate Report Section */}
                <div className="bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border border-purple-700/50 rounded-2xl p-8 shadow-lg">
                    <h2 className="text-white font-bold text-xl mb-6">Generate Custom Report</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4">
                            <Calendar className="w-5 h-5 text-purple-300" />
                            <div>
                                <p className="text-white font-medium">Select Date Range</p>
                                <p className="text-purple-300 text-sm">Choose start and end dates for your report</p>
                            </div>
                        </div>
                        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-6 rounded-lg transition-colors mt-6">
                            Generate Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
