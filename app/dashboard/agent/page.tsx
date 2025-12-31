'use client';

import { useState } from 'react';
import { TrendingUp, Users, Wallet, ArrowRightLeft, QrCode, ClipboardList, History, Home, Menu, X, FileText, Settings, LogOut, Bell, ChevronRight, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { CashOutRequestsChart } from '@/components/cashout-requests-chart';
import { DailySummaryPieChart } from '@/components/daily-summary-pie-chart';

export default function AgentDashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const quickActions = [
        { name: 'Cash In', icon: ArrowRightLeft, href: '/dashboard/agent/cash-in', color: 'bg-emerald-600' },
        { name: 'Cash Out', icon: Wallet, href: '/dashboard/agent/cash-out', color: 'bg-orange-600' },
        { name: 'B2B Transfer', icon: Users, href: '/dashboard/agent/b2b-transfer', color: 'bg-blue-600' },
        { name: 'History', icon: History, href: '/dashboard/agent/history', color: 'bg-purple-600' },
    ];

    const allMenuSections = [
        {
            title: "My Account",
            items: [
                { name: 'Home', icon: Home, href: '/dashboard/agent' },
                { name: 'History', icon: History, href: '/dashboard/agent/history' },
                { name: 'Reports', icon: FileText, href: '/dashboard/agent/reports' },
            ]
        },
        {
            title: "Settings & Support",
            items: [
                { name: 'Settings', icon: Settings, href: '/dashboard/agent/settings' },
                { name: 'Support', icon: Mail, href: '/dashboard/agent/support' },
                { name: 'Log Out', icon: LogOut, href: '/auth/login', color: 'text-red-500 bg-red-50 dark:bg-red-900/10' },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] transition-colors duration-300 pb-32 md:pb-16 overflow-x-hidden">
            <div className="max-w-5xl mx-auto md:pt-8 px-0 md:px-4">

                {/* Hero Section - Agent Green Theme */}
                <div className="relative md:rounded-[2.5rem] bg-emerald-600 dark:bg-emerald-700 shadow-2xl shadow-emerald-500/20 z-10 transition-all duration-500">
                    {/* Simplified Elegant Gradient (Isolated in overflow-hidden container) */}
                    <div className="absolute inset-0 overflow-hidden md:rounded-[2.5rem] pointer-events-none">
                        <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[200%] bg-gradient-to-br from-white/10 via-transparent to-transparent rotate-12 blur-3xl"></div>
                        <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[200%] bg-gradient-to-rn from-black/5 via-transparent to-transparent -rotate-12 blur-3xl"></div>
                    </div>

                    <div className="relative z-10 p-6 md:p-12 text-white">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

                            {/* Agent Profile & Commission */}
                            <div className="flex items-center gap-6 w-full md:w-auto">
                                <div className="relative group">
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden bg-white/20 shadow-inner ring-2 ring-white/20 flex items-center justify-center">
                                        <span className="text-2xl md:text-3xl font-bold text-white">RS</span>
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full shadow-[0_0_0_2px_#10b981]"></div>
                                </div>

                                <div className="flex flex-col gap-1.5 flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-white/80 text-xs md:text-sm font-medium tracking-wide">Agent Portal</p>
                                            <h2 className="text-2xl md:text-3xl font-bold font-heading tracking-tight text-white drop-shadow-sm">Rahim Store</h2>
                                        </div>
                                        {/* Mobile Menu & Notifications */}
                                        <div className="flex items-center gap-2 md:hidden">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    setShowNotifications(!showNotifications);
                                                }}
                                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white relative"
                                            >
                                                <Bell className="w-5 h-5" />
                                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-400 rounded-full shadow-sm animate-pulse"></span>
                                            </button>
                                            <button
                                                onClick={() => setIsMenuOpen(true)}
                                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                            >
                                                <Menu className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>

                                    {/* Commission Display */}
                                    <div className="mt-2 flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-full pl-1.5 pr-6 py-1.5 transition-all shadow-lg backdrop-blur-sm w-fit group">
                                        <div className="w-7 h-7 rounded-full bg-white text-emerald-600 flex items-center justify-center shadow-md">
                                            <span className="font-bold text-lg">৳</span>
                                        </div>
                                        <div className="h-6 overflow-hidden flex flex-col justify-center min-w-[90px]">
                                            <span className="font-bold text-lg md:text-xl text-white tracking-wide leading-none">
                                                4,250
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Desktop Notification & Menu */}
                            <div className="hidden md:flex items-center gap-4 relative z-[60]">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowNotifications(!showNotifications);
                                    }}
                                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white relative"
                                >
                                    <Bell className="w-6 h-6" />
                                    <span className="absolute top-2.5 right-3 w-2 h-2 bg-red-400 rounded-full shadow-sm animate-pulse"></span>
                                </button>

                                <AnimatePresence>
                                    {showNotifications && (
                                        <>
                                            <div
                                                className="fixed inset-0 z-[55]"
                                                onClick={() => setShowNotifications(false)}
                                            />
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                                className="absolute top-16 right-0 w-80 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-slate-800 p-4 z-[60] origin-top-right"
                                            >
                                                <div className="flex justify-between items-center mb-4">
                                                    <h3 className="font-bold text-gray-800 dark:text-white">Notifications</h3>
                                                    <button className="text-xs text-emerald-600 font-bold">Mark all read</button>
                                                </div>
                                                <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-hide">
                                                    {[1, 2, 3].map((i) => (
                                                        <div key={i} className="flex gap-3 p-3 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-colors">
                                                            <div className="w-2 h-2 mt-2 bg-emerald-600 rounded-full shrink-0"></div>
                                                            <div>
                                                                <p className="text-xs font-bold text-gray-800 dark:text-white">New Cash Out Request</p>
                                                                <p className="text-[10px] text-gray-500 dark:text-slate-400 mt-1">Customer requested ৳500 cash out.</p>
                                                                <p className="text-[9px] text-gray-400 mt-2">5 min ago</p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>

                                <button
                                    onClick={() => setIsMenuOpen(true)}
                                    className="p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white"
                                >
                                    <Menu className="w-6 h-6" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Mobile Notifications Dropdown */}
                    <AnimatePresence>
                        {showNotifications && (
                            <>
                                <div
                                    className="md:hidden fixed inset-0 z-[55]"
                                    onClick={() => setShowNotifications(false)}
                                />
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                                    className="md:hidden fixed top-20 right-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl rounded-2xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-slate-800 p-4 z-[60]"
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="font-bold text-gray-800 dark:text-white">Notifications</h3>
                                        <button className="text-xs text-emerald-600 font-bold">Mark all read</button>
                                    </div>
                                    <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-hide">
                                        {[1, 2, 3].map((i) => (
                                            <div key={i} className="flex gap-3 p-3 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-colors">
                                                <div className="w-2 h-2 mt-2 bg-emerald-600 rounded-full shrink-0"></div>
                                                <div>
                                                    <p className="text-xs font-bold text-gray-800 dark:text-white">New Cash Out Request</p>
                                                    <p className="text-[10px] text-gray-500 dark:text-slate-400 mt-1">Customer requested ৳500 cash out.</p>
                                                    <p className="text-[9px] text-gray-400 mt-2">5 min ago</p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-0 mt-8 md:mt-10">

                    {/* Left Column */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Quick Actions */}
                        <div className="bg-white dark:bg-[#1e293b] rounded-[2rem] p-6 md:p-8 shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-3 mb-8">
                                <span className="w-1 h-5 bg-emerald-600 rounded-full"></span>
                                Quick Actions
                            </h3>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-2 md:gap-x-6">
                                {quickActions.map((item, i) => (
                                    <Link
                                        key={i}
                                        href={item.href}
                                        className="flex flex-col items-center gap-3 group active:scale-95 transition-transform"
                                    >
                                        <div className={cn("w-14 h-14 md:w-16 md:h-16 rounded-[1.2rem] flex items-center justify-center text-white shadow-lg shadow-gray-200/50 dark:shadow-none transform group-hover:scale-105 transition-all duration-300", item.color)}>
                                            <item.icon className="w-6 h-6 md:w-7 md:h-7 stroke-[2.5]" />
                                        </div>
                                        <span className="text-[10px] md:text-xs font-bold text-gray-600 dark:text-slate-400 group-hover:text-emerald-600 transition-colors text-center leading-tight truncate w-full px-1">{item.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Live Cash-Out Requests Chart */}
                        <div className="bg-white dark:bg-[#1e293b] rounded-[2rem] p-6 md:p-8 shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-3 mb-6">
                                <span className="w-1 h-5 bg-emerald-600 rounded-full"></span>
                                Live Cash-Out Requests
                            </h3>
                            <CashOutRequestsChart />
                        </div>
                    </div>

                    {/* Right Column: Stats */}
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-[#1e293b] rounded-[2rem] p-6 md:p-8 shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Daily Summary</h3>
                            <DailySummaryPieChart />
                        </div>

                        <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-[2rem] p-6 text-white text-center shadow-lg shadow-emerald-500/30">
                            <QrCode className="w-12 h-12 mx-auto mb-4 opacity-90" />
                            <h3 className="text-lg font-bold mb-1">My QR Code</h3>
                            <p className="text-emerald-100 text-xs mb-4">Show this to customers for quick payments</p>
                            <Link 
                                href="/dashboard/agent/qr-code"
                                className="bg-white text-emerald-700 px-6 py-2 rounded-full text-sm font-bold hover:bg-emerald-50 active:scale-95 transition-all inline-block"
                            >
                                View QR
                            </Link>
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
                            <div className="p-6 bg-emerald-600 text-white rounded-bl-[3rem] relative overflow-hidden shrink-0">
                                <div className="absolute top-0 right-0 p-4 z-20">
                                    <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                                        <X className="w-6 h-6 text-white" />
                                    </button>
                                </div>
                                <div className="relative z-10 flex gap-4 mt-8 mb-4">
                                    <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden border-2 border-white/50 bg-white/10">
                                        <div className="w-full h-full bg-emerald-500 flex items-center justify-center text-white text-2xl font-bold">
                                            RS
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-xl font-bold">Rahim Store</h3>
                                        <p className="text-emerald-100 text-sm">Agent ID: AG-12345</p>
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
                                                        item.color ? cn("bg-opacity-10 bg-current", item.color) : "bg-emerald-600/10 dark:bg-emerald-600/20 text-emerald-600"
                                                    )}>
                                                        <item.icon className="w-5 h-5" />
                                                    </div>
                                                    <span className={cn("font-semibold text-sm transition-colors", item.color ? item.color : "text-gray-700 dark:text-slate-200 group-hover:text-emerald-600")}>{item.name}</span>
                                                    <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-emerald-600" />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 border-t border-gray-100 dark:border-slate-800 text-center shrink-0">
                                <p className="text-[10px] text-gray-300">v2.5.0 • PayFlow Secure</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* bKash Style Fixed Bottom Nav */}
            <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1e293b] border-t border-gray-100 dark:border-slate-800 z-50 px-6 pb-6 pt-2 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-end relative max-w-sm mx-auto">

                    {/* Home */}
                    <Link href="/dashboard/agent" className="flex flex-col items-center gap-1 text-emerald-600 w-16">
                        <Home className="w-6 h-6 stroke-[2.5]" />
                        <span className="text-[10px] font-bold">Home</span>
                    </Link>

                    {/* Requests */}
                    <Link href="/dashboard/agent/requests" className="flex flex-col items-center gap-1 text-gray-400 dark:text-slate-500 hover:text-emerald-600 transition-colors w-16">
                        <Users className="w-6 h-6 stroke-[2.5]" />
                        <span className="text-[10px] font-medium">Requests</span>
                    </Link>

                    {/* QR Code (Center Prominent) */}
                    <Link 
                        href="/dashboard/agent/qr-code"
                        className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
                    >
                        <div className="w-16 h-16 rounded-full bg-white dark:bg-[#1e293b] p-1.5 shadow-[0_-5px_10px_rgba(0,0,0,0.05)] dark:shadow-none ring-4 ring-[#f8f9fa] dark:ring-[#0f172a]">
                            <div className="w-full h-full rounded-full bg-emerald-600 flex items-center justify-center text-white shadow-lg hover:scale-105 active:scale-95 transition-transform">
                                <QrCode className="w-7 h-7" />
                            </div>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 mt-1">My QR</span>
                    </Link>

                    {/* Spacer for Center Button */}
                    <div className="w-12"></div>

                    {/* History */}
                    <Link href="/dashboard/agent/history" className="flex flex-col items-center gap-1 text-gray-400 dark:text-slate-500 hover:text-emerald-600 transition-colors w-16">
                        <History className="w-6 h-6 stroke-[2.5]" />
                        <span className="text-[10px] font-medium">History</span>
                    </Link>

                    {/* Menu (Bottom) */}
                    <button onClick={() => setIsMenuOpen(true)} className="flex flex-col items-center gap-1 text-gray-400 dark:text-slate-500 hover:text-emerald-600 transition-colors w-16">
                        <Menu className="w-6 h-6 stroke-[2.5]" />
                        <span className="text-[10px] font-medium">Menu</span>
                    </button>

                </div>
            </div>
        </div>
    );
}
