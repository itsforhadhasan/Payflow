'use client';

import { useState } from 'react';
import { TrendingUp, Users, CreditCard, Link as LinkIcon, ArrowDownLeft, RotateCcw, Menu, X, Home, Settings, LogOut, HelpCircle, FileText, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { RevenueChart } from '@/components/revenue-chart';
import { RevenueDistributionChart } from '@/components/revenue-distribution-chart';

export default function BusinessDashboard() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const quickActions = [
        { name: 'Payment Link', icon: LinkIcon, href: '/dashboard/business/payment-link', color: 'bg-indigo-600' },
        { name: 'Request Money', icon: ArrowDownLeft, href: '/dashboard/business/request-money', color: 'bg-blue-600' },
        { name: 'Refund', icon: RotateCcw, href: '/dashboard/business/refund', color: 'bg-orange-600' },
        { name: 'Customers', icon: Users, href: '/dashboard/business/customers', color: 'bg-purple-600' },
    ];

    const allMenuSections = [
        {
            title: "Business Account",
            items: [
                { name: 'Overview', icon: Home, href: '/dashboard/business' },
                { name: 'Transactions', icon: FileText, href: '/dashboard/business/transactions' },
                { name: 'Customers', icon: Users, href: '/dashboard/business/customers' },
                { name: 'Payment Links', icon: LinkIcon, href: '/dashboard/business/payment-link' },
            ]
        },
        {
            title: "Settings & Support",
            items: [
                { name: 'Business Settings', icon: Settings, href: '/dashboard/business/settings' },
                { name: 'Switch to Personal', icon: ArrowDownLeft, href: '/dashboard/personal', color: 'text-pink-600 bg-pink-50 dark:bg-pink-900/10' },
                { name: 'Support Center', icon: HelpCircle, href: '/dashboard/business/support' },
                { name: 'Log Out', icon: LogOut, href: '/auth/login', color: 'text-red-500 bg-red-50 dark:bg-red-900/10' },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] transition-colors duration-300 pb-28 md:pb-12 overflow-x-hidden">
            <div className="max-w-5xl mx-auto md:pt-8 px-0 md:px-4">

                {/* Hero Section */}
                <div className="relative md:rounded-[2.5rem] bg-indigo-600 dark:bg-indigo-700 shadow-2xl shadow-indigo-500/20 z-10 transition-all duration-500">
                    <div className="absolute inset-0 overflow-hidden md:rounded-[2.5rem] pointer-events-none">
                        <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[200%] bg-gradient-to-br from-white/10 via-transparent to-transparent rotate-12 blur-3xl"></div>
                        <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[200%] bg-gradient-to-rn from-black/5 via-transparent to-transparent -rotate-12 blur-3xl"></div>
                    </div>

                    <div className="relative z-10 p-6 md:p-12 text-white">
                        {/* Menu Button - Mobile (Absolute) */}
                        <button
                            onClick={() => setIsMenuOpen(true)}
                            className="md:hidden absolute top-6 right-6 p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white z-20"
                        >
                            <Menu className="w-6 h-6" />
                        </button>

                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 pt-4 md:pt-0">
                            <div className="flex-1 max-w-[80%] md:max-w-none">
                                <p className="text-indigo-100 text-xs md:text-sm font-medium tracking-wide">Business Overview</p>
                                <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tight mt-1">Tech Solutions Ltd.</h2>
                            </div>

                            <div className="flex flex-col items-end gap-4 w-full md:w-auto">
                                {/* Menu Button - Desktop (In Flow) */}
                                <button
                                    onClick={() => setIsMenuOpen(true)}
                                    className="hidden md:block p-3 rounded-full bg-white/10 hover:bg-white/20 transition-all text-white"
                                >
                                    <Menu className="w-6 h-6" />
                                </button>

                                <div className="text-left md:text-right w-full md:w-auto bg-white/5 md:bg-transparent p-4 md:p-0 rounded-2xl md:rounded-none backdrop-blur-sm md:backdrop-blur-none border border-white/10 md:border-none">
                                    <p className="text-indigo-200 text-xs uppercase tracking-widest font-bold">Total Sales</p>
                                    <h3 className="text-3xl md:text-4xl font-bold mt-1">৳ 1,24,500</h3>
                                    <div className="flex items-center justify-start md:justify-end gap-1 text-emerald-300 text-sm font-bold mt-1">
                                        <TrendingUp className="w-4 h-4" /> +12.5%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-0 mt-8 md:mt-10">

                    {/* Left Column */}
                    <div className="md:col-span-2 space-y-8">
                        {/* Quick Actions */}
                        <div className="bg-white dark:bg-[#1e293b] rounded-[2rem] p-6 md:p-8 shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <span className="w-1 h-5 bg-indigo-600 rounded-full"></span>
                                    Quick Actions
                                </div>

                            </h3>
                            <div className="grid grid-cols-4 gap-y-8 gap-x-2 md:gap-x-6">
                                {quickActions.map((item, i) => (
                                    <Link key={i} href={item.href} className="flex flex-col items-center gap-3 group">
                                        <div className={cn("w-14 h-14 md:w-16 md:h-16 rounded-[1.2rem] flex items-center justify-center text-white shadow-lg shadow-gray-200/50 dark:shadow-none transform group-hover:scale-105 transition-all duration-300", item.color)}>
                                            <item.icon className="w-6 h-6 md:w-7 md:h-7 stroke-[2.5]" />
                                        </div>
                                        <span className="text-[10px] md:text-xs font-bold text-gray-600 dark:text-slate-400 group-hover:text-indigo-600 transition-colors text-center leading-tight truncate w-full px-1">{item.name}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Revenue Graph */}
                        <div className="bg-white dark:bg-[#1e293b] rounded-[2rem] p-6 md:p-8 shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-3 mb-6">
                                <span className="w-1 h-5 bg-indigo-600 rounded-full"></span>
                                Revenue Analytics
                            </h3>
                            <RevenueChart />
                        </div>
                    </div>

                    {/* Right Column: Stats */}
                    <div className="space-y-8">
                        {/* Revenue Distribution */}
                        <div className="bg-white dark:bg-[#1e293b] rounded-[2rem] p-6 md:p-8 shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Revenue Sources</h3>
                            <RevenueDistributionChart />
                        </div>

                        <div className="bg-white dark:bg-[#1e293b] rounded-[2rem] p-6 md:p-8 shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Overview</h3>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-slate-400 font-bold uppercase">Active Customers</p>
                                        <p className="text-xl font-bold text-gray-800 dark:text-white">1,024</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 flex items-center justify-center">
                                        <CreditCard className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-slate-400 font-bold uppercase">Pending Settlement</p>
                                        <p className="text-xl font-bold text-gray-800 dark:text-white">৳ 15,000</p>
                                    </div>
                                </div>
                            </div>

                            <Link href="/dashboard/business/withdraw" className="w-full mt-8 py-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-colors flex justify-center items-center">
                                Withdraw Funds
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
                            <div className="p-6 bg-indigo-600 text-white rounded-bl-[3rem] relative overflow-hidden shrink-0">
                                <div className="absolute top-0 right-0 p-4 z-20">
                                    <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                                        <X className="w-6 h-6 text-white" />
                                    </button>
                                </div>
                                <div className="relative z-10 flex gap-4 mt-8 mb-4">
                                    <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden border-2 border-white/50 bg-white/10 flex items-center justify-center">
                                        <Users className="w-8 h-8" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-xl font-bold">Tech Solutions Ltd.</h3>
                                        <p className="text-indigo-200 text-sm">Business Account</p>
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
                                                        item.color ? cn("bg-opacity-10 bg-current", item.color) : "bg-indigo-600/10 dark:bg-indigo-400/20 text-indigo-600 dark:text-indigo-400"
                                                    )}>
                                                        <item.icon className="w-5 h-5" />
                                                    </div>
                                                    <span className={cn("font-semibold text-sm transition-colors", item.color ? item.color : "text-gray-700 dark:text-slate-200 group-hover:text-indigo-600")}>{item.name}</span>
                                                    <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-indigo-600" />
                                                </Link>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="p-4 border-t border-gray-100 dark:border-slate-800 text-center shrink-0">
                                <p className="text-[10px] text-gray-300">v2.5.0 • PayFlow Business</p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
