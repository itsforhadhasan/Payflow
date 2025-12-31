'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Users, AlertTriangle, Activity, Database, Menu, X, Home, FileText, Settings, LogOut, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminDashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [alerts, setAlerts] = useState([
        { id: 1, type: 'pending', title: 'Pending Agent Approvals', description: 'Review applications for new agents', count: 3, icon: '3', color: 'blue', action: 'Review', visible: true },
        { id: 2, type: 'warning', title: 'High Load Warning', description: 'Database latency increased by 15% in last hour', count: 1, icon: '⚠️', color: 'red', action: 'Investigate', visible: true },
        { id: 3, type: 'suspicious', title: 'Suspicious Transaction', description: 'User U-129 attempted 5 failed logins', count: 1, icon: '🔒', color: 'yellow', action: 'Review', visible: true },
        { id: 4, type: 'healthy', title: 'System Status: Healthy', description: 'All services operating normally at 99.9% uptime', count: 1, icon: '✓', color: 'green', action: 'Details', visible: true },
    ]);

    const handleDismissAlert = (id: number) => {
        setAlerts(alerts.map(alert => 
            alert.id === id ? { ...alert, visible: false } : alert
        ));
    };

    const handleActionAlert = (id: number, action: string) => {
        const alertItem = alerts.find(a => a.id === id);
        if (!alertItem) return;

        // Handle specific actions based on alert type
        switch (alertItem.type) {
            case 'pending':
                console.log(`✓ Reviewing pending agent approvals - Alert #${id}`);
                break;
            case 'warning':
                console.log(`⚠️ Investigating system warning - Alert #${id}`);
                break;
            case 'suspicious':
                console.log(`🔍 Reviewing suspicious activity - Alert #${id}`);
                break;
            case 'healthy':
                console.log(`✓ Viewing system details - Alert #${id}`);
                break;
            default:
                console.log(`Action "${action}" triggered for alert #${id}`);
        }

        // Dismiss alert after action
        handleDismissAlert(id);
    };

    const visibleAlerts = alerts.filter(alert => alert.visible);

    const allMenuSections = [
        {
            title: "Admin Control",
            items: [
                { name: 'Dashboard', icon: Home, href: '/admin' },
                { name: 'Analytics', icon: Activity, href: '/admin/analytics' },
                { name: 'Reports', icon: FileText, href: '/admin/reports' },
            ]
        },
        {
            title: "Settings & Support",
            items: [
                { name: 'Settings', icon: Settings, href: '/admin/settings' },
                { name: 'Log Out', icon: LogOut, href: '/auth/login', color: 'text-red-500 bg-red-50 dark:bg-red-900/10' },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#1F0344] transition-colors duration-300 pb-32 md:pb-16 overflow-x-hidden">
            <div className="max-w-5xl mx-auto md:pt-8 px-0 md:px-4">

                {/* Hero Section - Admin Dark Theme */}
                <div className="relative md:rounded-[2.5rem] bg-slate-800 dark:bg-slate-900 shadow-2xl shadow-slate-500/20 z-10 transition-all duration-500">
                    {/* Simplified Elegant Gradient */}
                    <div className="absolute inset-0 overflow-hidden md:rounded-[2.5rem] pointer-events-none">
                        <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[200%] bg-gradient-to-br from-white/5 via-transparent to-transparent rotate-12 blur-3xl"></div>
                        <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[200%] bg-gradient-to-rn from-black/10 via-transparent to-transparent -rotate-12 blur-3xl"></div>
                    </div>

                    <div className="relative z-10 p-6 md:p-12 text-white">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

                            {/* Admin Profile */}
                            <div className="flex items-center gap-6 w-full md:w-auto">
                                <div className="relative group">
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden bg-white/20 shadow-inner ring-2 ring-white/20 flex items-center justify-center">
                                        <span className="text-2xl md:text-3xl font-bold text-white">AD</span>
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-blue-400 rounded-full shadow-[0_0_0_2px_#1e293b]"></div>
                                </div>

                                <div className="flex flex-col gap-1.5 flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-white/80 text-xs md:text-sm font-medium tracking-wide">System Administrator</p>
                                            <h2 className="text-2xl md:text-3xl font-bold font-heading tracking-tight text-white drop-shadow-sm">Admin Portal</h2>
                                        </div>
                                        {/* Mobile Menu */}
                                        <button
                                            onClick={() => setIsMenuOpen(true)}
                                            className="md:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                        >
                                            <Menu className="w-6 h-6" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop Menu Button */}
                            <button
                                onClick={() => setIsMenuOpen(true)}
                                className="hidden md:block p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="px-6 md:px-0 mt-8 md:mt-10">
                    <h2 className="text-3xl font-bold font-heading text-white mb-8">System Overview</h2>

                    {/* Stat Cards with Icons */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                        {[
                            { label: 'Total Users', value: '15,240', icon: Users, color: 'bg-[#1f0344]', gradient: 'from-[#1f0344] to-purple-700', bgLight: 'bg-purple-50 dark:bg-[#1f0344]/20' },
                            { label: 'Daily Volume', value: '৳ 2.4M', icon: Activity, color: 'bg-[#1f0344]', gradient: 'from-[#1f0344] to-purple-700', bgLight: 'bg-purple-50 dark:bg-[#1f0344]/20' },
                            { label: 'Settlement Balance', value: '৳ 50.0M', icon: Database, color: 'bg-[#1f0344]', gradient: 'from-[#1f0344] to-purple-700', bgLight: 'bg-purple-50 dark:bg-[#1f0344]/20' },
                            { label: 'Suspicious Activities', value: '3', icon: AlertTriangle, color: 'bg-red-600', gradient: 'from-red-500 to-orange-700', bgLight: 'bg-red-50 dark:bg-red-900/20' },
                        ].map((stat, i) => (
                            <div key={i} className={`p-6 rounded-2xl bg-gradient-to-br from-[#2d1b4e] to-[#1f0344] border border-purple-600/50 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1`}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-purple-300 text-sm font-medium">{stat.label}</p>
                                        <h3 className="text-3xl font-bold font-heading text-white mt-2">{stat.value}</h3>
                                    </div>
                                    <div className={cn(`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-lg transform group-hover:scale-110 transition-transform`, `bg-gradient-to-br ${stat.gradient}`)}>
                                        <stat.icon className="w-8 h-8" />
                                    </div>
                                </div>
                                <div className={cn("mt-4 h-1 rounded-full bg-gradient-to-r", stat.gradient)}></div>
                            </div>
                        ))}
                    </div>

                    {/* Charts and Representative Profiles */}
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
                        {/* Line Chart - Daily Transactions */}
                        <div className="lg:col-span-2 bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border border-purple-700/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-lg bg-gradient-to-r from-purple-300 to-purple-100 bg-clip-text text-transparent">Transaction Volume (Past 7 Days)</h3>
                                <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-600/30 text-purple-300 border border-purple-600/50">📈 Trend</span>
                            </div>
                            <div className="relative h-72 bg-gradient-to-b from-purple-50/50 to-white dark:from-[#1f0344]/30 dark:to-transparent rounded-xl p-4">
                                {/* Grid Background */}
                                <svg className="absolute inset-0 w-full h-full" style={{ pointerEvents: 'none' }}>
                                    <defs>
                                        <pattern id="grid" width="40" height="20" patternUnits="userSpaceOnUse">
                                            <path d="M 40 0 L 0 0 0 20" fill="none" stroke="#e5e7eb" strokeWidth="0.5" className="dark:stroke-purple-900/30" />
                                        </pattern>
                                    </defs>
                                    <rect width="100%" height="100%" fill="url(#grid)" />
                                    {/* Y-axis labels */}
                                    <text x="10" y="15" className="text-xs fill-gray-500 dark:fill-purple-400">100</text>
                                    <text x="10" y="85" className="text-xs fill-gray-500 dark:fill-purple-400">50</text>
                                    <text x="10" y="250" className="text-xs fill-gray-500 dark:fill-purple-400">0</text>
                                </svg>
                                
                                {/* Line Chart */}
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 500 250" preserveAspectRatio="none">
                                    {/* Gradient Definition */}
                                    <defs>
                                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                            <stop offset="0%" stopColor="#1f0344" stopOpacity="0.3" />
                                            <stop offset="100%" stopColor="#1f0344" stopOpacity="0.05" />
                                        </linearGradient>
                                    </defs>
                                    {/* Line Path with Shadow */}
                                    <polyline
                                        points="30,180 95,100 160,130 225,65 290,85 355,110 420,140"
                                        fill="none"
                                        stroke="#1f0344"
                                        strokeWidth="4"
                                        vectorEffect="non-scaling-stroke"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        filter="drop-shadow(0 4px 8px rgba(31,3,68,0.2))"
                                    />
                                    
                                    {/* Fill under line */}
                                    <polygon
                                        points="30,180 95,100 160,130 225,65 290,85 355,110 420,140 420,250 30,250"
                                        fill="url(#chartGradient)"
                                    />
                                    
                                    {/* Data Points with Glow */}
                                    {[
                                        { x: 30, y: 180 },
                                        { x: 95, y: 100 },
                                        { x: 160, y: 130 },
                                        { x: 225, y: 65 },
                                        { x: 290, y: 85 },
                                        { x: 355, y: 110 },
                                        { x: 420, y: 140 }
                                    ].map((point, i) => (
                                        <g key={i}>
                                            <circle cx={point.x} cy={point.y} r="5" fill="#1f0344" opacity="0.2" vectorEffect="non-scaling-stroke" />
                                            <circle cx={point.x} cy={point.y} r="3.5" fill="#1f0344" stroke="white" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                                        </g>
                                    ))}
                                </svg>
                            </div>
                            
                            {/* Day Labels */}
                            <div className="flex justify-between px-6 mt-6 text-xs font-bold text-gray-700 dark:text-purple-300">
                                <span className="flex flex-col items-center"><span>📅</span>Mon</span>
                                <span>Tue</span>
                                <span>Wed</span>
                                <span>Thu</span>
                                <span>Fri</span>
                                <span>Sat</span>
                                <span>Sun</span>
                            </div>
                            
                            {/* Stats Footer */}
                            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-purple-900/50 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-1.5">
                                        <div className="w-2.5 h-2.5 bg-[#1f0344] rounded-full animate-pulse"></div>
                                        <span className="text-xs text-gray-600 dark:text-purple-300 font-medium">Volume Trend</span>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <p className="text-sm font-bold text-[#1f0344] dark:text-purple-300">Peak: 92% 📈</p>
                                    <p className="text-xs text-gray-500 dark:text-purple-400 mt-0.5">Friday</p>
                                </div>
                            </div>
                        </div>

                        {/* Pie Chart - Transaction Types Distribution */}
                        <div className="bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border border-purple-700/50 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-lg bg-gradient-to-r from-purple-300 to-purple-100 bg-clip-text text-transparent">Transaction Types</h3>
                                <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-600/30 text-purple-300 border border-purple-600/50">💰 Breakdown</span>
                            </div>
                            <div className="flex-1 flex items-center justify-center relative">
                                <svg viewBox="0 0 100 100" className="w-48 h-48 drop-shadow-xl filter">
                                    <defs>
                                        <filter id="chartShadow" x="-50%" y="-50%" width="200%" height="200%">
                                            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.3" />
                                        </filter>
                                    </defs>
                                    {/* Pie Slices with vibrant colors and enhanced styling */}
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" strokeWidth="22" strokeDasharray="62.8 314" strokeDashoffset="0" strokeLinecap="round" filter="url(#chartShadow)" opacity="0.9" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#10b981" strokeWidth="22" strokeDasharray="47.1 314" strokeDashoffset="-62.8" strokeLinecap="round" filter="url(#chartShadow)" opacity="0.9" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" strokeWidth="22" strokeDasharray="39.25 314" strokeDashoffset="-109.9" strokeLinecap="round" filter="url(#chartShadow)" opacity="0.9" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" strokeWidth="22" strokeDasharray="31.4 314" strokeDashoffset="-149.15" strokeLinecap="round" filter="url(#chartShadow)" opacity="0.9" />
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="#a855f7" strokeWidth="22" strokeDasharray="23.55 314" strokeDashoffset="-180.55" strokeLinecap="round" filter="url(#chartShadow)" opacity="0.9" />
                                </svg>
                                <div className="absolute text-center bg-gradient-to-br from-[#1f0344] to-purple-600 rounded-full w-20 h-20 flex flex-col items-center justify-center shadow-lg">
                                    <p className="text-2xl font-bold text-white">2.4M</p>
                                    <p className="text-xs text-purple-200 mt-0.5 font-medium">Total</p>
                                </div>
                            </div>
                            <div className="mt-8 space-y-2.5">
                                {[
                                    { label: 'Cash In', value: '20%', color: 'bg-gradient-to-r from-blue-500 to-blue-600', textColor: 'text-blue-600', icon: '💳' },
                                    { label: 'Cash Out', value: '15%', color: 'bg-gradient-to-r from-green-500 to-emerald-600', textColor: 'text-green-600', icon: '💸' },
                                    { label: 'Transfers', value: '12.5%', color: 'bg-gradient-to-r from-amber-500 to-orange-600', textColor: 'text-amber-600', icon: '↔️' },
                                    { label: 'Payments', value: '10%', color: 'bg-gradient-to-r from-red-500 to-rose-600', textColor: 'text-red-600', icon: '📲' },
                                    { label: 'Other', value: '7.5%', color: 'bg-gradient-to-r from-purple-500 to-violet-600', textColor: 'text-purple-600', icon: '📦' },
                                ].map((type, i) => (
                                    <div key={i} className="flex items-center justify-between text-xs group p-2.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#1f0344]/50 transition-all duration-200">
                                        <div className="flex items-center gap-2.5 flex-1 min-w-0">
                                            <div className="flex-shrink-0">
                                                <span className="text-lg">{type.icon}</span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className={cn("h-1.5 rounded-full transition-all group-hover:shadow-md group-hover:h-2", type.color)}></div>
                                            </div>
                                            <span className="text-gray-700 dark:text-slate-300 font-semibold truncate">{type.label}</span>
                                        </div>
                                        <span className={cn("font-bold ml-2 flex-shrink-0", type.textColor)}>{type.value}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Representative Profiles and Alerts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
                        {/* Active Representatives */}
                        <div className="bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border border-purple-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-lg bg-gradient-to-r from-purple-300 to-purple-100 bg-clip-text text-transparent">Active Representatives</h3>
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                    <span className="text-xs font-semibold text-green-600 dark:text-green-400">4 Online</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                {[
                                    { name: 'Sarah Anderson', role: 'Senior Agent', status: 'online', transactions: '2,450', avatar: '🧑‍💼', badgeColor: 'from-blue-500 to-indigo-600' },
                                    { name: 'John Smith', role: 'Agent', status: 'online', transactions: '1,890', avatar: '👨‍💼', badgeColor: 'from-cyan-500 to-blue-600' },
                                    { name: 'Emma Davis', role: 'Junior Agent', status: 'away', transactions: '1,230', avatar: '👩‍💼', badgeColor: 'from-purple-500 to-pink-600' },
                                    { name: 'Mike Johnson', role: 'Support', status: 'offline', transactions: '890', avatar: '👨‍💻', badgeColor: 'from-orange-500 to-red-600' },
                                ].map((rep, i) => (
                                    <div key={i} className={cn("relative p-4 rounded-xl backdrop-blur-sm border transition-all duration-300 group cursor-pointer hover:shadow-md hover:-translate-y-1", {
                                        'bg-green-50/80 dark:bg-green-900/10 border-green-200 dark:border-green-900/50': rep.status === 'online',
                                        'bg-yellow-50/80 dark:bg-yellow-900/10 border-yellow-200 dark:border-yellow-900/50': rep.status === 'away',
                                        'bg-gray-50/80 dark:bg-gray-900/10 border-gray-200 dark:border-gray-900/50': rep.status === 'offline'
                                    })}>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3 flex-1">
                                                <div className="relative">
                                                    <div className={cn("w-14 h-14 rounded-full flex items-center justify-center text-2xl shadow-lg ring-2 group-hover:scale-110 transition-transform", `bg-gradient-to-br ${rep.badgeColor}`)}>
                                                        {rep.avatar}
                                                    </div>
                                                    <div className={cn("absolute bottom-0 right-0 w-4 h-4 rounded-full border-3 border-white shadow-md ring-1 animate-pulse", {
                                                        'bg-green-500': rep.status === 'online',
                                                        'bg-yellow-500': rep.status === 'away',
                                                        'bg-gray-400': rep.status === 'offline'
                                                    })}></div>
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2">
                                                        <p className="font-bold text-sm text-gray-800 dark:text-white truncate">{rep.name}</p>
                                                        <span className={cn("text-xs font-bold px-2 py-0.5 rounded-full whitespace-nowrap", {
                                                            'bg-green-200 text-green-700 dark:bg-green-900/40 dark:text-green-300': rep.status === 'online',
                                                            'bg-yellow-200 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300': rep.status === 'away',
                                                            'bg-gray-200 text-gray-700 dark:bg-gray-900/40 dark:text-gray-300': rep.status === 'offline'
                                                        })}>
                                                            {rep.status.charAt(0).toUpperCase() + rep.status.slice(1)}
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{rep.role}</p>
                                                </div>
                                            </div>
                                            <div className="text-right ml-4">
                                                <p className="font-bold text-lg bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{rep.transactions}</p>
                                                <p className="text-xs text-gray-500 dark:text-slate-400">Transactions</p>
                                            </div>
                                        </div>
                                        
                                        {/* Progress bar */}
                                        <div className="mt-3 h-1.5 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                            <div className={cn("h-full rounded-full transition-all", {
                                                'w-full bg-gradient-to-r from-green-500 to-emerald-500': rep.status === 'online',
                                                'w-3/4 bg-gradient-to-r from-yellow-500 to-orange-500': rep.status === 'away',
                                                'w-1/4 bg-gradient-to-r from-gray-500 to-gray-600': rep.status === 'offline'
                                            })}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button className="w-full mt-4 py-2 px-4 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold text-sm hover:from-blue-600 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl">
                                <Link href="/admin/representatives" className="flex items-center justify-center gap-1">
                                    View All Representatives →
                                </Link>
                            </button>
                        </div>

                        {/* Pending Approvals & System Alerts */}
                        <div className="bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border border-purple-700/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="font-bold text-lg bg-gradient-to-r from-purple-300 to-purple-100 bg-clip-text text-transparent">Alerts & Actions</h3>
                                <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-600/30 text-purple-300 border border-purple-600/50">{visibleAlerts.length} Items</span>
                            </div>
                            <div className="space-y-3 max-h-96 overflow-y-auto scrollbar-hide pr-2">
                                {visibleAlerts.map((alert) => (
                                    <div key={alert.id} className={cn("group p-4 rounded-xl backdrop-blur-sm border transition-all cursor-pointer hover:shadow-md hover:-translate-y-0.5", {
                                        'bg-blue-50/80 dark:bg-blue-900/15 border-blue-200 dark:border-blue-900/40': alert.color === 'blue',
                                        'bg-red-50/80 dark:bg-red-900/15 border-red-200 dark:border-red-900/40': alert.color === 'red',
                                        'bg-yellow-50/80 dark:bg-yellow-900/15 border-yellow-200 dark:border-yellow-900/40': alert.color === 'yellow',
                                        'bg-green-50/80 dark:bg-green-900/15 border-green-200 dark:border-green-900/40': alert.color === 'green',
                                    })}>
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="flex items-start gap-3 flex-1">
                                                <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-md", {
                                                    'bg-gradient-to-br from-blue-500 to-blue-600': alert.color === 'blue',
                                                    'bg-gradient-to-br from-red-500 to-red-600': alert.color === 'red',
                                                    'bg-gradient-to-br from-yellow-500 to-orange-600': alert.color === 'yellow',
                                                    'bg-gradient-to-br from-green-500 to-emerald-600': alert.color === 'green',
                                                })}>
                                                    {alert.icon}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <p className={cn("font-bold text-sm", {
                                                        'text-blue-900 dark:text-blue-300': alert.color === 'blue',
                                                        'text-red-900 dark:text-red-300': alert.color === 'red',
                                                        'text-yellow-900 dark:text-yellow-300': alert.color === 'yellow',
                                                        'text-green-900 dark:text-green-300': alert.color === 'green',
                                                    })}>{alert.title}</p>
                                                    <p className={cn("text-xs mt-0.5", {
                                                        'text-blue-700 dark:text-blue-400': alert.color === 'blue',
                                                        'text-red-700 dark:text-red-400': alert.color === 'red',
                                                        'text-yellow-700 dark:text-yellow-400': alert.color === 'yellow',
                                                        'text-green-700 dark:text-green-400': alert.color === 'green',
                                                    })}>{alert.description}</p>
                                                    <div className="mt-2 inline-flex gap-2">
                                                        <button 
                                                            onClick={() => handleActionAlert(alert.id, alert.action)}
                                                            className={cn("px-3 py-1.5 text-xs rounded-lg text-white hover:opacity-90 transition-all font-semibold shadow-sm active:scale-95", {
                                                                'bg-blue-600 hover:bg-blue-700': alert.color === 'blue',
                                                                'bg-red-600 hover:bg-red-700': alert.color === 'red',
                                                                'bg-yellow-600 hover:bg-yellow-700': alert.color === 'yellow',
                                                                'bg-green-600 hover:bg-green-700': alert.color === 'green',
                                                            })}>
                                                            {alert.action}
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDismissAlert(alert.id)}
                                                            className={cn("px-3 py-1.5 text-xs rounded-lg hover:opacity-90 transition-all font-semibold active:scale-95", {
                                                                'bg-blue-200 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 hover:bg-blue-300 dark:hover:bg-blue-900/60': alert.color === 'blue',
                                                                'bg-red-200 dark:bg-red-900/40 text-red-700 dark:text-red-300 hover:bg-red-300 dark:hover:bg-red-900/60': alert.color === 'red',
                                                                'bg-yellow-200 dark:bg-yellow-900/40 text-yellow-700 dark:text-yellow-300 hover:bg-yellow-300 dark:hover:bg-yellow-900/60': alert.color === 'yellow',
                                                                'bg-green-200 dark:bg-green-900/40 text-green-700 dark:text-green-300 hover:bg-green-300 dark:hover:bg-green-900/60': alert.color === 'green',
                                                            })}>
                                                            Dismiss
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={cn("w-2 h-2 rounded-full flex-shrink-0 mt-1.5", {
                                                'bg-blue-500 animate-pulse': alert.color === 'blue',
                                                'bg-red-500 animate-pulse': alert.color === 'red',
                                                'bg-yellow-500 animate-pulse': alert.color === 'yellow',
                                                'bg-green-500': alert.color === 'green',
                                            })}></div>
                                        </div>
                                    </div>
                                ))}
                                {visibleAlerts.length === 0 && (
                                    <div className="text-center py-8">
                                        <p className="text-gray-500 dark:text-slate-400 text-sm font-medium">All alerts have been dismissed</p>
                                        <p className="text-xs text-gray-400 dark:text-slate-500 mt-1">System is operating normally</p>
                                    </div>
                                )}
                            </div>

                            {/* Footer Stats */}
                            <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-700">
                                <div className="grid grid-cols-3 gap-3 text-center">
                                    <div>
                                        <p className="text-2xl font-bold text-purple-600">{alerts.filter(a => a.type === 'pending' && a.visible).length}</p>
                                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Pending</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-purple-600">{alerts.filter(a => (a.type === 'warning' || a.type === 'suspicious') && a.visible).length}</p>
                                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Warnings</p>
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-purple-600">{alerts.filter(a => a.type === 'healthy' && a.visible).length}</p>
                                        <p className="text-xs text-gray-500 dark:text-slate-400 mt-1">Healthy</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side Drawer Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[60]"
                        />
                        {/* Drawer */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="fixed top-0 right-0 h-full w-[80%] max-w-sm bg-white dark:bg-slate-900 z-[70] shadow-2xl flex flex-col"
                        >
                            <div className="p-6 bg-slate-800 text-white rounded-bl-[3rem] relative overflow-hidden shrink-0">
                                <div className="absolute top-0 right-0 p-4 z-20">
                                    <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                                        <X className="w-6 h-6 text-white" />
                                    </button>
                                </div>
                                <div className="relative z-10 flex gap-4 mt-8 mb-4">
                                    <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden border-2 border-white/50 bg-white/10 flex items-center justify-center text-white text-2xl font-bold">
                                        AD
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-xl font-bold">Admin Portal</h3>
                                        <p className="text-slate-300 text-sm">System Administrator</p>
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto px-4 py-4 scrollbar-hide">
                                {allMenuSections.map((section, idx) => (
                                    <div key={idx} className="mb-6 last:mb-0">
                                        <h4 className="text-xs font-bold text-gray-400 dark:text-slate-500 uppercase tracking-widest px-4 mb-2">{section.title}</h4>
                                        <div className="space-y-1">
                                            {section.items.map((item, index) => (
                                                <Link
                                                    key={index}
                                                    href={item.href}
                                                    onClick={() => setIsMenuOpen(false)}
                                                    className="flex items-center gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-slate-800 transition-colors group"
                                                >
                                                    <div className={cn("w-10 h-10 shrink-0 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform",
                                                        item.color ? cn("bg-opacity-10 bg-current", item.color) : "bg-slate-600/10 dark:bg-slate-600/20 text-slate-600"
                                                    )}>
                                                        <item.icon className="w-5 h-5" />
                                                    </div>
                                                    <span className={cn("font-semibold text-sm transition-colors", item.color ? item.color : "text-gray-700 dark:text-slate-200 group-hover:text-slate-600")}>{item.name}</span>
                                                    <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-slate-600" />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 border-t border-gray-100 dark:border-slate-800 text-center shrink-0">
                                <p className="text-[10px] text-gray-300">v2.5.0 • PayFlow Admin</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
