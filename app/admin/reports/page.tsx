'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, FileText, Download, Calendar, TrendingUp, DollarSign, Users, Activity, File, CheckCircle } from 'lucide-react';
import { MOCK_TRANSACTIONS } from '@/lib/mock-data';

interface Report {
    id: string;
    title: string;
    description: string;
    icon: React.ReactNode;
    date: string;
    content?: React.ReactNode;
}

export default function ReportsPage() {
    const [selectedReport, setSelectedReport] = useState<string | null>(null);
    const [startDate, setStartDate] = useState('2024-10-01');
    const [endDate, setEndDate] = useState('2024-10-31');
    const [generatedReports, setGeneratedReports] = useState<Report[]>([]);

    // Generate reports based on date range
    const generateReport = () => {
        const start = new Date(startDate);
        const end = new Date(endDate);

        const filteredTx = MOCK_TRANSACTIONS.filter(tx => {
            const txDate = new Date(tx.date);
            return txDate >= start && txDate <= end;
        });

        const totalAmount = filteredTx.reduce((sum, tx) => sum + tx.amount, 0);
        const completedCount = filteredTx.filter(tx => tx.status === 'COMPLETED').length;
        const transactionsByType = filteredTx.reduce((acc, tx) => {
            acc[tx.type] = (acc[tx.type] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        const reports: Report[] = [
            {
                id: 'daily-transactions',
                title: 'Daily Transactions Report',
                description: 'Summary of all daily transactions',
                icon: <FileText className="w-8 h-8 text-blue-400" />,
                date: `${startDate} to ${endDate}`,
                content: (
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-blue-500/20 rounded-lg p-4">
                                <p className="text-blue-300 text-sm mb-1">Total Transactions</p>
                                <p className="text-2xl font-bold text-white">{filteredTx.length}</p>
                            </div>
                            <div className="bg-green-500/20 rounded-lg p-4">
                                <p className="text-green-300 text-sm mb-1">Completed</p>
                                <p className="text-2xl font-bold text-white">{completedCount}</p>
                            </div>
                            <div className="bg-purple-500/20 rounded-lg p-4">
                                <p className="text-purple-300 text-sm mb-1">Success Rate</p>
                                <p className="text-2xl font-bold text-white">{filteredTx.length ? Math.round((completedCount / filteredTx.length) * 100) : 0}%</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-3">Transactions by Type</h4>
                            <div className="space-y-2">
                                {Object.entries(transactionsByType).map(([type, count]) => (
                                    <div key={type} className="flex justify-between items-center p-3 bg-purple-600/10 rounded-lg">
                                        <span className="text-purple-300">{type.replace(/_/g, ' ')}</span>
                                        <span className="text-white font-bold">{count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            },
            {
                id: 'revenue',
                title: 'Revenue Report',
                description: 'Revenue breakdown and analytics',
                icon: <DollarSign className="w-8 h-8 text-green-400" />,
                date: `${startDate} to ${endDate}`,
                content: (
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-green-500/20 rounded-lg p-4">
                                <p className="text-green-300 text-sm mb-1">Total Revenue</p>
                                <p className="text-2xl font-bold text-white">${totalAmount.toLocaleString()}</p>
                            </div>
                            <div className="bg-blue-500/20 rounded-lg p-4">
                                <p className="text-blue-300 text-sm mb-1">Avg Transaction</p>
                                <p className="text-2xl font-bold text-white">${(totalAmount / (filteredTx.length || 1)).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                            </div>
                            <div className="bg-yellow-500/20 rounded-lg p-4">
                                <p className="text-yellow-300 text-sm mb-1">Daily Average</p>
                                <p className="text-2xl font-bold text-white">${(totalAmount / 30).toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-3">Revenue by Transaction Type</h4>
                            <div className="space-y-2">
                                {filteredTx.reduce((acc, tx) => {
                                    const existing = acc.find(item => item.type === tx.type);
                                    if (existing) {
                                        existing.amount += tx.amount;
                                    } else {
                                        acc.push({ type: tx.type, amount: tx.amount });
                                    }
                                    return acc;
                                }, [] as { type: string; amount: number }[]).map(item => (
                                    <div key={item.type} className="flex justify-between items-center p-3 bg-purple-600/10 rounded-lg">
                                        <span className="text-purple-300">{item.type.replace(/_/g, ' ')}</span>
                                        <span className="text-green-400 font-bold">${item.amount.toLocaleString()}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )
            },
            {
                id: 'user-activity',
                title: 'User Activity Report',
                description: 'User engagement and activity metrics',
                icon: <Users className="w-8 h-8 text-purple-400" />,
                date: `${startDate} to ${endDate}`,
                content: (
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-purple-500/20 rounded-lg p-4">
                                <p className="text-purple-300 text-sm mb-1">Active Users</p>
                                <p className="text-2xl font-bold text-white">{new Set(filteredTx.map(tx => tx.senderId || tx.recipientId)).size}</p>
                            </div>
                            <div className="bg-indigo-500/20 rounded-lg p-4">
                                <p className="text-indigo-300 text-sm mb-1">Total Actions</p>
                                <p className="text-2xl font-bold text-white">{filteredTx.length}</p>
                            </div>
                            <div className="bg-pink-500/20 rounded-lg p-4">
                                <p className="text-pink-300 text-sm mb-1">Engagement Rate</p>
                                <p className="text-2xl font-bold text-white">{Math.round((completedCount / (filteredTx.length || 1)) * 100)}%</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-3">Activity Summary</h4>
                            <div className="bg-purple-600/10 rounded-lg p-4 space-y-3">
                                <div className="flex justify-between text-sm">
                                    <span className="text-purple-300">Total Transactions</span>
                                    <span className="text-white font-bold">{filteredTx.length}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-purple-300">Completed</span>
                                    <span className="text-green-400 font-bold">{completedCount}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-purple-300">Pending/Failed</span>
                                    <span className="text-red-400 font-bold">{filteredTx.length - completedCount}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            },
            {
                id: 'system-health',
                title: 'System Health Report',
                description: 'System performance and reliability',
                icon: <Activity className="w-8 h-8 text-orange-400" />,
                date: `${startDate} to ${endDate}`,
                content: (
                    <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="bg-green-500/20 rounded-lg p-4">
                                <p className="text-green-300 text-sm mb-1">System Status</p>
                                <p className="text-2xl font-bold text-white flex items-center gap-2">
                                    <CheckCircle className="w-6 h-6" />
                                    Healthy
                                </p>
                            </div>
                            <div className="bg-green-500/20 rounded-lg p-4">
                                <p className="text-green-300 text-sm mb-1">Uptime</p>
                                <p className="text-2xl font-bold text-white">99.9%</p>
                            </div>
                            <div className="bg-green-500/20 rounded-lg p-4">
                                <p className="text-green-300 text-sm mb-1">Reliability</p>
                                <p className="text-2xl font-bold text-white">{Math.round((completedCount / (filteredTx.length || 1)) * 100)}%</p>
                            </div>
                        </div>
                        <div>
                            <h4 className="text-white font-semibold mb-3">Performance Metrics</h4>
                            <div className="space-y-2">
                                <div className="flex justify-between items-center p-3 bg-purple-600/10 rounded-lg">
                                    <span className="text-purple-300">Average Response Time</span>
                                    <span className="text-white font-bold">245ms</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-purple-600/10 rounded-lg">
                                    <span className="text-purple-300">Transactions/Second</span>
                                    <span className="text-white font-bold">{(filteredTx.length / 2592000).toFixed(4)}</span>
                                </div>
                                <div className="flex justify-between items-center p-3 bg-purple-600/10 rounded-lg">
                                    <span className="text-purple-300">Error Rate</span>
                                    <span className="text-green-400 font-bold">0.1%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            }
        ];

        setGeneratedReports(reports);
    };

    const prebuiltReports: Report[] = [
        {
            id: 'daily-transactions',
            title: 'Daily Transactions Report',
            description: 'Summary of all daily transactions',
            icon: <FileText className="w-8 h-8 text-blue-400" />,
            date: 'Updated: Today'
        },
        {
            id: 'revenue',
            title: 'Revenue Report',
            description: 'Revenue breakdown and analytics',
            icon: <DollarSign className="w-8 h-8 text-green-400" />,
            date: 'Updated: Today'
        },
        {
            id: 'user-activity',
            title: 'User Activity Report',
            description: 'User engagement and activity metrics',
            icon: <Users className="w-8 h-8 text-purple-400" />,
            date: 'Updated: Today'
        },
        {
            id: 'system-health',
            title: 'System Health Report',
            description: 'System performance and reliability',
            icon: <Activity className="w-8 h-8 text-orange-400" />,
            date: 'Updated: Today'
        },
    ];

    const displayReports = generatedReports.length > 0 ? generatedReports : prebuiltReports;
    const selectedReportData = displayReports.find(r => r.id === selectedReport);

    const handleDownload = (report: Report) => {
        const element = document.createElement('a');
        const file = new Blob([JSON.stringify(report, null, 2)], {type: 'application/json'});
        element.href = URL.createObjectURL(file);
        element.download = `${report.title.toLowerCase().replace(/\s/g, '-')}.json`;
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };

    return (
        <div className="min-h-screen bg-[#1F0344] transition-colors duration-300 pb-32 md:pb-16 overflow-x-hidden">
            <div className="max-w-7xl mx-auto md:pt-8 px-4 md:px-4">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8 mt-6">
                    <Link href="/admin" className="p-2 hover:bg-purple-600/20 rounded-lg transition-colors">
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </Link>
                    <h1 className="text-4xl font-bold text-white">Reports</h1>
                </div>

                {/* Generate Custom Report Section */}
                <div className="bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border border-purple-700/50 rounded-2xl p-6 shadow-lg mb-8">
                    <h2 className="text-white font-bold text-xl mb-6">Generate Custom Report</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div>
                            <label className="block text-purple-300 text-sm font-medium mb-2">Start Date</label>
                            <input
                                type="date"
                                value={startDate}
                                onChange={(e) => setStartDate(e.target.value)}
                                className="w-full bg-purple-600/20 border border-purple-600/50 rounded-lg px-4 py-2 text-white"
                            />
                        </div>
                        <div>
                            <label className="block text-purple-300 text-sm font-medium mb-2">End Date</label>
                            <input
                                type="date"
                                value={endDate}
                                onChange={(e) => setEndDate(e.target.value)}
                                className="w-full bg-purple-600/20 border border-purple-600/50 rounded-lg px-4 py-2 text-white"
                            />
                        </div>
                        <div className="flex items-end">
                            <button
                                onClick={generateReport}
                                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
                            >
                                Generate Reports
                            </button>
                        </div>
                    </div>
                </div>

                {/* Reports Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {displayReports.map((report) => (
                        <div
                            key={report.id}
                            onClick={() => setSelectedReport(report.id)}
                            className={`bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border rounded-2xl p-6 hover:shadow-lg transition-all cursor-pointer ${
                                selectedReport === report.id ? 'border-purple-400 shadow-lg' : 'border-purple-700/50'
                            }`}
                        >
                            <div className="flex items-start justify-between mb-4">
                                <div>{report.icon}</div>
                                <Download
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleDownload(report);
                                    }}
                                    className="w-5 h-5 text-purple-300 cursor-pointer hover:text-purple-100 transition-colors"
                                />
                            </div>
                            <h3 className="text-white font-bold text-sm mb-2">{report.title}</h3>
                            <p className="text-purple-300 text-xs mb-4">{report.description}</p>
                            <p className="text-purple-400 text-xs">{report.date}</p>
                        </div>
                    ))}
                </div>

                {/* Selected Report Detail */}
                {selectedReportData && (
                    <div className="bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border border-purple-700/50 rounded-2xl p-8 shadow-lg">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    {selectedReportData.icon}
                                    {selectedReportData.title}
                                </h2>
                                <p className="text-purple-300 text-sm mt-2">Report Period: {selectedReportData.date}</p>
                            </div>
                            <button
                                onClick={() => handleDownload(selectedReportData)}
                                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" />
                                Download
                            </button>
                        </div>
                        <div className="border-t border-purple-600/50 pt-6">
                            {selectedReportData.content}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
