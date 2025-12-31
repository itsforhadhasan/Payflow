'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Filter, TrendingUp, MessageSquare, Clock, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RepresentativesPage() {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState<'all' | 'online' | 'away' | 'offline'>('all');
    const [sortBy, setSortBy] = useState<'transactions' | 'name' | 'status'>('transactions');

    const representatives = [
        { id: 1, name: 'Sarah Anderson', role: 'Senior Agent', status: 'online', transactions: '2,450', email: 'sarah@payflow.com', joinDate: '2024-01-15', avatar: '🧑‍💼', performance: 95 },
        { id: 2, name: 'John Smith', role: 'Agent', status: 'online', transactions: '1,890', email: 'john@payflow.com', joinDate: '2024-03-20', avatar: '👨‍💼', performance: 87 },
        { id: 3, name: 'Emma Davis', role: 'Junior Agent', status: 'away', transactions: '1,230', email: 'emma@payflow.com', joinDate: '2024-05-10', avatar: '👩‍💼', performance: 78 },
        { id: 4, name: 'Mike Johnson', role: 'Support', status: 'offline', transactions: '890', email: 'mike@payflow.com', joinDate: '2024-06-05', avatar: '👨‍💻', performance: 72 },
        { id: 5, name: 'Lisa Chen', role: 'Senior Agent', status: 'online', transactions: '2,120', email: 'lisa@payflow.com', joinDate: '2024-02-12', avatar: '👩‍💼', performance: 92 },
        { id: 6, name: 'David Wilson', role: 'Agent', status: 'online', transactions: '1,650', email: 'david@payflow.com', joinDate: '2024-04-08', avatar: '👨‍💼', performance: 84 },
        { id: 7, name: 'Rachel Brown', role: 'Junior Agent', status: 'away', transactions: '980', email: 'rachel@payflow.com', joinDate: '2024-07-15', avatar: '👩‍💼', performance: 75 },
        { id: 8, name: 'James Taylor', role: 'Agent', status: 'offline', transactions: '1,340', email: 'james@payflow.com', joinDate: '2024-08-22', avatar: '👨‍💼', performance: 80 },
    ];

    const filteredReps = representatives
        .filter(rep => {
            const matchesSearch = rep.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                                 rep.email.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesStatus = filterStatus === 'all' || rep.status === filterStatus;
            return matchesSearch && matchesStatus;
        })
        .sort((a, b) => {
            if (sortBy === 'transactions') {
                return parseInt(b.transactions) - parseInt(a.transactions);
            } else if (sortBy === 'name') {
                return a.name.localeCompare(b.name);
            } else {
                const statusOrder = { online: 3, away: 2, offline: 1 };
                return statusOrder[b.status as keyof typeof statusOrder] - statusOrder[a.status as keyof typeof statusOrder];
            }
        });

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] transition-colors duration-300 pb-16 overflow-x-hidden">
            <div className="max-w-7xl mx-auto md:pt-8 px-0 md:px-4">

                {/* Header */}
                <div className="relative md:rounded-[2.5rem] bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-900 dark:to-slate-950 shadow-2xl shadow-slate-500/20 z-10 mb-8">
                    <div className="absolute inset-0 overflow-hidden md:rounded-[2.5rem] pointer-events-none">
                        <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[200%] bg-gradient-to-br from-white/5 via-transparent to-transparent rotate-12 blur-3xl"></div>
                        <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[200%] bg-gradient-to-rn from-black/10 via-transparent to-transparent -rotate-12 blur-3xl"></div>
                    </div>

                    <div className="relative z-10 p-6 md:p-12 text-white">
                        <Link href="/admin" className="inline-flex items-center gap-2 text-white/80 hover:text-white transition-colors mb-4">
                            <ArrowLeft className="w-5 h-5" />
                            <span>Back to Dashboard</span>
                        </Link>
                        <h1 className="text-4xl md:text-5xl font-bold font-heading mt-2">All Representatives</h1>
                        <p className="text-white/70 mt-2">Manage and monitor your team of representatives</p>
                    </div>
                </div>

                {/* Controls Section */}
                <div className="px-6 md:px-0 mb-8">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
                        {/* Search */}
                        <div className="lg:col-span-2">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder="Search by name or email..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-lg bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                            </div>
                        </div>

                        {/* Filter Status */}
                        <div>
                            <select
                                value={filterStatus}
                                onChange={(e) => setFilterStatus(e.target.value as any)}
                                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="all">All Status</option>
                                <option value="online">Online</option>
                                <option value="away">Away</option>
                                <option value="offline">Offline</option>
                            </select>
                        </div>

                        {/* Sort By */}
                        <div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as any)}
                                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-[#1e293b] border border-gray-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="transactions">Sort by Transactions</option>
                                <option value="name">Sort by Name</option>
                                <option value="status">Sort by Status</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Representatives Grid */}
                <div className="px-6 md:px-0">
                    {filteredReps.length > 0 ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                            {filteredReps.map((rep) => (
                                <div key={rep.id} className={cn("relative p-6 rounded-2xl backdrop-blur-sm border transition-all duration-300 group hover:shadow-lg hover:-translate-y-1 cursor-pointer", {
                                    'bg-green-50/80 dark:bg-green-900/10 border-green-200 dark:border-green-900/50': rep.status === 'online',
                                    'bg-yellow-50/80 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-900/50': rep.status === 'away',
                                    'bg-gray-50/80 dark:bg-gray-900/10 border-gray-200 dark:border-gray-900/50': rep.status === 'offline'
                                })}>
                                    {/* Performance Badge */}
                                    <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                        {rep.performance}% Performance
                                    </div>

                                    {/* Main Content */}
                                    <div className="flex gap-4 mb-4">
                                        <div className="relative">
                                            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-4xl shadow-lg ring-4 ring-white dark:ring-slate-800 group-hover:scale-110 transition-transform">
                                                {rep.avatar}
                                            </div>
                                            <div className={cn("absolute bottom-0 right-0 w-5 h-5 rounded-full border-3 border-white dark:border-slate-800 shadow-md ring-1", {
                                                'bg-green-500': rep.status === 'online',
                                                'bg-yellow-500': rep.status === 'away',
                                                'bg-gray-400': rep.status === 'offline'
                                            })}></div>
                                        </div>

                                        <div className="flex-1">
                                            <div className="flex items-start justify-between gap-2 mb-1">
                                                <div>
                                                    <h3 className="font-bold text-lg text-gray-800 dark:text-white">{rep.name}</h3>
                                                    <p className="text-sm text-gray-600 dark:text-slate-400">{rep.role}</p>
                                                </div>
                                                <span className={cn("text-xs font-bold px-2 py-1 rounded-full whitespace-nowrap", {
                                                    'bg-green-200 text-green-700 dark:bg-green-900/40 dark:text-green-300': rep.status === 'online',
                                                    'bg-yellow-200 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300': rep.status === 'away',
                                                    'bg-gray-200 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300': rep.status === 'offline'
                                                })}>
                                                    {rep.status.charAt(0).toUpperCase() + rep.status.slice(1)}
                                                </span>
                                            </div>
                                            <p className="text-xs text-gray-500 dark:text-slate-400">{rep.email}</p>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-3 gap-3 mb-4">
                                        <div className="p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
                                            <div className="flex items-center gap-2 mb-1">
                                                <TrendingUp className="w-4 h-4 text-blue-600" />
                                                <p className="text-xs text-gray-500 dark:text-slate-400">Transactions</p>
                                            </div>
                                            <p className="font-bold text-lg text-gray-800 dark:text-white">{rep.transactions}</p>
                                        </div>
                                        <div className="p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
                                            <div className="flex items-center gap-2 mb-1">
                                                <Clock className="w-4 h-4 text-purple-600" />
                                                <p className="text-xs text-gray-500 dark:text-slate-400">Joined</p>
                                            </div>
                                            <p className="font-bold text-sm text-gray-800 dark:text-white">
                                                {new Date(rep.joinDate).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                                            </p>
                                        </div>
                                        <div className="p-3 rounded-lg bg-white/50 dark:bg-slate-800/50">
                                            <div className="flex items-center gap-2 mb-1">
                                                <CheckCircle className="w-4 h-4 text-green-600" />
                                                <p className="text-xs text-gray-500 dark:text-slate-400">Score</p>
                                            </div>
                                            <p className="font-bold text-lg text-gray-800 dark:text-white">{rep.performance}</p>
                                        </div>
                                    </div>

                                    {/* Performance Bar */}
                                    <div className="mb-3">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-xs font-semibold text-gray-600 dark:text-slate-400">Performance</span>
                                            <span className="text-xs font-bold text-gray-700 dark:text-slate-300">{rep.performance}%</span>
                                        </div>
                                        <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <div 
                                                className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all"
                                                style={{ width: `${rep.performance}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button className="w-full py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">
                                        View Details
                                    </button>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16">
                            <p className="text-xl font-semibold text-gray-600 dark:text-slate-400">No representatives found</p>
                            <p className="text-sm text-gray-500 dark:text-slate-500 mt-2">Try adjusting your search or filters</p>
                        </div>
                    )}

                    {/* Summary Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        {[
                            { label: 'Total Representatives', value: representatives.length, color: 'from-blue-500 to-blue-600' },
                            { label: 'Online Now', value: representatives.filter(r => r.status === 'online').length, color: 'from-green-500 to-emerald-600' },
                            { label: 'Away', value: representatives.filter(r => r.status === 'away').length, color: 'from-yellow-500 to-orange-600' },
                            { label: 'Offline', value: representatives.filter(r => r.status === 'offline').length, color: 'from-gray-500 to-slate-600' },
                        ].map((stat, i) => (
                            <div key={i} className={`p-4 rounded-xl bg-gradient-to-br ${stat.color} text-white shadow-lg hover:shadow-xl transition-shadow`}>
                                <p className="text-sm font-medium text-white/80">{stat.label}</p>
                                <p className="text-3xl font-bold mt-2">{stat.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
