'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Send, Smartphone, Download, ShoppingBag,
    CreditCard, Lightbulb,
    Wallet, Mail, Users, Bell, ChevronRight, ArrowUpRight, ArrowDownLeft,
    MoreHorizontal, QrCode, Menu, X, Home, FileText, Settings, LogOut, Globe, Percent,
    ShieldCheck, HelpCircle, Ticket, Heart, BookOpen, LifeBuoy
} from 'lucide-react';
import { CURRENT_USER, MOCK_TRANSACTIONS } from '@/lib/mock-data';
import { cn } from '@/lib/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { SpendingPieChart } from '@/components/spending-pie-chart';

export default function PersonalDashboard() {
    const [showBalance, setShowBalance] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);

    const quickActions = [
        { name: 'Send Money', icon: Send, href: '/dashboard/personal/send', color: 'bg-blue-600' },
        { name: 'Recharge', icon: Smartphone, href: '/dashboard/personal/recharge', color: 'bg-green-600' },
        { name: 'Cash Out', icon: Download, href: '/dashboard/personal/cashout', color: 'bg-orange-600' },
        { name: 'Payment', icon: ShoppingBag, href: '/dashboard/personal/payment', color: 'bg-purple-600' },
        { name: 'Add Money', icon: CreditCard, href: '/dashboard/personal/add-money', color: 'bg-pink-600' },
        { name: 'Pay Bill', icon: Lightbulb, href: '/dashboard/personal/pay-bill', color: 'bg-yellow-600' },
    ];

    const allMenuSections = [
        {
            title: "My Account",
            items: [
                { name: 'Home', icon: Home, href: '/dashboard/personal' },
                { name: 'Statements', icon: FileText, href: '/dashboard/personal/statements' },
                { name: 'Limits', icon: Percent, href: '/dashboard/personal/limits' },
                { name: 'Coupons', icon: Ticket, href: '/dashboard/personal/coupons' },
            ]
        },
        {
            title: "Settings & Support",
            items: [
                { name: 'Settings', icon: Settings, href: '/dashboard/personal/settings' },
                { name: 'Security', icon: ShieldCheck, href: '/dashboard/personal/security' },
                { name: 'Language', icon: Globe, href: '/dashboard/personal/language' },
                { name: 'Switch to Business', icon: ArrowUpRight, href: '/dashboard/business', color: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-900/10' },
                { name: 'Support', icon: HelpCircle, href: '/dashboard/personal/support' },
                { name: 'Log Out', icon: LogOut, href: '/auth/login', color: 'text-red-500 bg-red-50 dark:bg-red-900/10' },
            ]
        }
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] transition-colors duration-300 pb-28 md:pb-12 overflow-x-hidden">

            {/* Desktop Wrapper */}
            <div className="max-w-5xl mx-auto md:pt-8 px-0 md:px-4">

                {/* 1. Ultra-Clean Hero Section */}
                <div className="relative md:rounded-[2.5rem] bg-[#E2136E] dark:bg-[#E2136E] shadow-2xl shadow-pink-500/20 z-10 transition-all duration-500">
                    {/* Simplified Elegant Gradient (Isolated in overflow-hidden container) */}
                    <div className="absolute inset-0 overflow-hidden md:rounded-[2.5rem] pointer-events-none">
                        <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[200%] bg-gradient-to-br from-white/10 via-transparent to-transparent rotate-12 blur-3xl"></div>
                        <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[200%] bg-gradient-to-rn from-black/5 via-transparent to-transparent -rotate-12 blur-3xl"></div>
                    </div>

                    <div className="relative z-10 p-6 md:p-12 text-white">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">

                            {/* User Profile & Balance */}
                            <div className="flex items-center gap-6 w-full md:w-auto">
                                <div className="relative group">
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden bg-white/20 shadow-inner ring-2 ring-white/20">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                                    </div>
                                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 rounded-full shadow-[0_0_0_2px_#E2136E]"></div>
                                </div>

                                <div className="flex flex-col gap-1.5 flex-1">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <p className="text-white/80 text-xs md:text-sm font-medium tracking-wide">Welcome back,</p>
                                            <h2 className="text-2xl md:text-3xl font-bold font-heading tracking-tight text-white drop-shadow-sm">{CURRENT_USER.name}</h2>
                                        </div>
                                        {/* Mobile Menu Trigger */}
                                        <button
                                            onClick={() => setIsMenuOpen(true)}
                                            className="md:hidden p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                                        >
                                            <Menu className="w-6 h-6" />
                                        </button>
                                    </div>

                                    {/* Balance Toggle */}
                                    <button
                                        onClick={() => setShowBalance(!showBalance)}
                                        className="mt-2 flex items-center gap-3 bg-white/10 hover:bg-white/20 rounded-full pl-1.5 pr-6 py-1.5 transition-all shadow-lg backdrop-blur-sm w-fit group"
                                    >
                                        <div className="w-7 h-7 rounded-full bg-white text-[#E2136E] flex items-center justify-center shadow-md">
                                            <span className="font-bold text-lg">৳</span>
                                        </div>
                                        <div className="h-6 overflow-hidden flex flex-col justify-center min-w-[90px]">
                                            <AnimatePresence mode='wait'>
                                                {showBalance ? (
                                                    <motion.span
                                                        key="balance"
                                                        initial={{ y: 20, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        exit={{ y: -20, opacity: 0 }}
                                                        className="font-bold text-lg md:text-xl text-white tracking-wide leading-none"
                                                    >
                                                        {CURRENT_USER.balance.toLocaleString()}
                                                    </motion.span>
                                                ) : (
                                                    <motion.span
                                                        key="text"
                                                        initial={{ y: 20, opacity: 0 }}
                                                        animate={{ y: 0, opacity: 1 }}
                                                        exit={{ y: -20, opacity: 0 }}
                                                        className="text-[10px] md:text-xs font-bold text-white/90 uppercase tracking-widest leading-none"
                                                    >
                                                        Tap for Balance
                                                    </motion.span>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    </button>
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
                                                    <button className="text-xs text-[#E2136E] font-bold">Mark all read</button>
                                                </div>
                                                <div className="space-y-2 max-h-[300px] overflow-y-auto scrollbar-hide">
                                                    {[1, 2, 3].map((i) => (
                                                        <div key={i} className="flex gap-3 p-3 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-xl cursor-pointer transition-colors">
                                                            <div className="w-2 h-2 mt-2 bg-[#E2136E] rounded-full shrink-0"></div>
                                                            <div>
                                                                <p className="text-xs font-bold text-gray-800 dark:text-white">Cashback Received</p>
                                                                <p className="text-[10px] text-gray-500 dark:text-slate-400 mt-1">You received ৳20 cashback on your last electricity bill payment.</p>
                                                                <p className="text-[9px] text-gray-400 mt-2">2 min ago</p>
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
                </div>

                {/* 2. Main Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-6 md:px-0 mt-8 md:mt-10">

                    {/* Left Column: Actions & Services */}
                    <div className="md:col-span-2 space-y-8">

                        {/* Quick Actions - Clean Cards */}
                        <div className="bg-white dark:bg-[#1e293b] rounded-[2rem] p-6 md:p-8 shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-3">
                                    <span className="w-1 h-5 bg-[#E2136E] rounded-full"></span>
                                    Quick Actions
                                </h3>
                                <button className="text-gray-400 hover:text-[#E2136E] transition-colors rounded-full hover:bg-gray-50 dark:hover:bg-slate-800 p-2 -mr-2">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="grid grid-cols-4 gap-y-8 gap-x-2 md:gap-x-6">
                                {quickActions.map((item, i) => (
                                    <Link key={i} href={item.href} className="flex flex-col items-center gap-3 group">
                                        <div className={cn("w-14 h-14 md:w-16 md:h-16 rounded-[1.2rem] flex items-center justify-center text-white shadow-lg shadow-gray-200/50 dark:shadow-none transform group-hover:scale-105 transition-all duration-300", item.color)}>
                                            <item.icon className="w-6 h-6 md:w-7 md:h-7 stroke-[2.5]" />
                                        </div>
                                        <span className="text-[10px] md:text-xs font-bold text-gray-600 dark:text-slate-400 group-hover:text-[#E2136E] transition-colors text-center leading-tight truncate w-full px-1">{item.name}</span>
                                    </Link>
                                ))}
                                {/* More Button */}
                                <button onClick={() => setIsMenuOpen(true)} className="flex flex-col items-center gap-3 group">
                                    <div className="w-14 h-14 md:w-16 md:h-16 rounded-[1.2rem] bg-gray-50 dark:bg-slate-800 flex items-center justify-center text-gray-400 dark:text-slate-500 group-hover:bg-gray-100 dark:group-hover:bg-slate-700 transition-all duration-300">
                                        <ChevronRight className="w-7 h-7 stroke-[2.5]" />
                                    </div>
                                    <span className="text-[10px] md:text-xs font-bold text-gray-500 dark:text-slate-500">More</span>
                                </button>
                            </div>
                        </div>

                        {/* Promo Banner */}
                        <div className="relative overflow-hidden rounded-[2rem] h-44 bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] shadow-xl shadow-indigo-500/10 cursor-pointer group">
                            <div className="absolute right-0 top-0 h-full w-1/2 bg-white/5 skew-x-12 transform origin-bottom-right transition-transform group-hover:translate-x-4"></div>
                            <div className="absolute inset-0 flex items-center justify-between p-8 md:p-10 text-white z-10">
                                <div>
                                    <span className="px-3 py-1 rounded-full bg-white/20 text-[10px] font-bold backdrop-blur-md uppercase tracking-widest mb-3 inline-block">Limited Offer</span>
                                    <h3 className="text-2xl md:text-3xl font-bold font-heading leading-tight mb-1">20% Cashback</h3>
                                    <p className="text-indigo-100 text-sm font-medium">On electricity bill payments</p>
                                </div>
                                <div className="hidden sm:flex w-12 h-12 rounded-full bg-white/20 backdrop-blur-md items-center justify-center group-hover:scale-110 transition-transform">
                                    <ChevronRight className="w-6 h-6 text-white" />
                                </div>
                            </div>

                        </div>

                        {/* Monthly Spending Chart */}
                        <div className="bg-white dark:bg-[#1e293b] rounded-[2rem] p-6 md:p-8 shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-4">Monthly Spending</h3>
                            <SpendingPieChart />
                        </div>

                    </div>

                    {/* Right Column: Stats & Transactions */}
                    <div className="space-y-8">

                        {/* Stats Cards */}
                        {/* Company Offers */}
                        <div className="space-y-4">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-2">Offers for You</h3>

                            {/* Foodpanda */}
                            <div className="bg-pink-50 dark:bg-pink-900/10 p-5 rounded-[2rem] border border-pink-100 dark:border-pink-900/20 relative overflow-hidden group cursor-pointer hover:shadow-lg hover:shadow-pink-500/10 transition-all">
                                <div className="absolute right-0 top-0 w-24 h-24 bg-pink-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                                <div className="relative z-10 flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-pink-600 dark:text-pink-400 text-xs uppercase tracking-wider">Foodpanda</h4>
                                        <p className="text-lg font-bold text-gray-800 dark:text-white mt-1">50% Discount</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">On your first order above ৳200</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-pink-500/20 flex items-center justify-center text-pink-500 shadow-sm group-hover:scale-110 transition-transform">
                                        <ShoppingBag className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>

                            {/* Daraz */}
                            <div className="bg-orange-50 dark:bg-orange-900/10 p-5 rounded-[2rem] border border-orange-100 dark:border-orange-900/20 relative overflow-hidden group cursor-pointer hover:shadow-lg hover:shadow-orange-500/10 transition-all">
                                <div className="absolute right-0 top-0 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl -mr-10 -mt-10 transition-transform group-hover:scale-150"></div>
                                <div className="relative z-10 flex items-center justify-between">
                                    <div>
                                        <h4 className="font-bold text-orange-600 dark:text-orange-400 text-xs uppercase tracking-wider">Daraz</h4>
                                        <p className="text-lg font-bold text-gray-800 dark:text-white mt-1">15% Cashback</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">On electronics purchase</p>
                                    </div>
                                    <div className="w-12 h-12 rounded-2xl bg-white dark:bg-orange-500/20 flex items-center justify-center text-orange-500 shadow-sm group-hover:scale-110 transition-transform">
                                        <ShoppingBag className="w-6 h-6" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Donations */}
                        <div className="bg-white dark:bg-[#1e293b] rounded-[2rem] p-6 md:p-8 shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Donations</h3>
                            <div className="space-y-4">
                                {/* Bidyanondo */}
                                <div className="flex items-center gap-4 p-3 hover:bg-red-50 dark:hover:bg-red-900/10 rounded-2xl transition-colors cursor-pointer group">
                                    <div className="w-12 h-12 rounded-2xl bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Heart className="w-6 h-6 fill-current" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">Bidyanondo</h4>
                                        <p className="text-xs text-gray-500 dark:text-slate-400">1 Taka Meal</p>
                                    </div>
                                    <button className="px-4 py-2 rounded-xl bg-red-600 text-white text-xs font-bold hover:bg-red-700 transition-colors">Donate</button>
                                </div>

                                {/* JAAGO */}
                                <div className="flex items-center gap-4 p-3 hover:bg-yellow-50 dark:hover:bg-yellow-900/10 rounded-2xl transition-colors cursor-pointer group">
                                    <div className="w-12 h-12 rounded-2xl bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <BookOpen className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-yellow-600 dark:group-hover:text-yellow-400 transition-colors">JAAGO Foundation</h4>
                                        <p className="text-xs text-gray-500 dark:text-slate-400">Sponsor a Child</p>
                                    </div>
                                    <button className="px-4 py-2 rounded-xl bg-yellow-600 text-white text-xs font-bold hover:bg-yellow-700 transition-colors">Donate</button>
                                </div>

                                {/* Red Crescent */}
                                <div className="flex items-center gap-4 p-3 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-2xl transition-colors cursor-pointer group">
                                    <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-slate-800 text-gray-600 dark:text-slate-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <LifeBuoy className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-bold text-gray-800 dark:text-white group-hover:text-gray-900 dark:group-hover:text-white transition-colors">Red Crescent</h4>
                                        <p className="text-xs text-gray-500 dark:text-slate-400">Emergency Fund</p>
                                    </div>
                                    <button className="px-4 py-2 rounded-xl bg-gray-800 dark:bg-slate-700 text-white text-xs font-bold hover:bg-black dark:hover:bg-slate-600 transition-colors">Donate</button>
                                </div>
                            </div>
                        </div>

                        {/* Transactions */}
                        <div className="bg-white dark:bg-[#1e293b] rounded-[2rem] p-6 md:p-8 shadow-sm dark:shadow-none h-fit border border-gray-100 dark:border-slate-800">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-lg font-bold text-gray-800 dark:text-white">Transactions</h3>
                                <Link href="#" className="text-xs font-bold text-[#E2136E] hover:underline">View All</Link>
                            </div>
                            <div className="space-y-6">
                                {MOCK_TRANSACTIONS.slice(0, 4).map((tx, i) => (
                                    <div key={i} className="flex items-center gap-4 group cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-800/50 p-2 -mx-2 rounded-xl transition-colors">
                                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shadow-sm",
                                            tx.type === 'CASH_OUT' ? 'bg-orange-50 text-orange-600 dark:bg-orange-900/20 dark:text-orange-400' :
                                                tx.type === 'ADD_MONEY' ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-900/20 dark:text-emerald-400' :
                                                    'bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'
                                        )}>
                                            {tx.type === 'CASH_OUT' ? <Download className="w-5 h-5 stroke-[2.5]" /> :
                                                tx.type === 'ADD_MONEY' ? <ArrowDownLeft className="w-5 h-5 stroke-[2.5]" /> : <Send className="w-5 h-5 stroke-[2.5]" />}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <p className="font-bold text-gray-800 dark:text-slate-200 group-hover:text-[#E2136E] dark:group-hover:text-[#E2136E] transition-colors truncate">{tx.description || 'Transfer'}</p>
                                            <p className="text-xs text-gray-500 dark:text-slate-500 font-medium mt-0.5">{new Date(tx.date).toLocaleDateString()}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className={cn("font-bold text-base", tx.type === 'ADD_MONEY' ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-900 dark:text-white')}>
                                                {tx.type === 'ADD_MONEY' ? '+' : '-'}৳ {tx.amount}
                                            </p>
                                        </div>
                                    </div>
                                ))}
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
                            <div className="p-6 bg-[#E2136E] text-white rounded-bl-[3rem] relative overflow-hidden shrink-0">
                                <div className="absolute top-0 right-0 p-4 z-20">
                                    <button onClick={() => setIsMenuOpen(false)} className="p-2 bg-white/20 rounded-full hover:bg-white/30 transition-colors">
                                        <X className="w-6 h-6 text-white" />
                                    </button>
                                </div>
                                <div className="relative z-10 flex gap-4 mt-8 mb-4">
                                    <div className="w-16 h-16 shrink-0 rounded-full overflow-hidden border-2 border-white/50 bg-white/10">
                                        {/* eslint-disable-next-line @next/next/no-img-element */}
                                        <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" className="w-full h-full object-cover" />
                                    </div>
                                    <div className="flex flex-col justify-center">
                                        <h3 className="text-xl font-bold">{CURRENT_USER.name}</h3>
                                        <p className="text-pink-100 text-sm">{CURRENT_USER.phone}</p>
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
                                                        item.color ? cn("bg-opacity-10 bg-current", item.color) : "bg-[#E2136E]/10 dark:bg-[#E2136E]/20 text-[#E2136E]"
                                                    )}>
                                                        <item.icon className="w-5 h-5" />
                                                    </div>
                                                    <span className={cn("font-semibold text-sm transition-colors", item.color ? item.color : "text-gray-700 dark:text-slate-200 group-hover:text-[#E2136E]")}>{item.name}</span>
                                                    <ChevronRight className="w-4 h-4 text-gray-300 ml-auto group-hover:text-[#E2136E]" />
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
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1e293b] border-t border-gray-100 dark:border-slate-800 z-50 px-6 pb-6 pt-2 shadow-[0_-5px_20px_rgba(0,0,0,0.05)]">
                <div className="flex justify-between items-end relative max-w-sm mx-auto">

                    {/* Home */}
                    <Link href="/dashboard/personal" className="flex flex-col items-center gap-1 text-[#E2136E] w-16">
                        <Home className="w-6 h-6 stroke-[2.5]" />
                        <span className="text-[10px] font-bold">Home</span>
                    </Link>

                    {/* Inbox */}
                    <Link href="#" className="flex flex-col items-center gap-1 text-gray-400 dark:text-slate-500 hover:text-[#E2136E] transition-colors w-16">
                        <Mail className="w-6 h-6 stroke-[2.5]" />
                        <span className="text-[10px] font-medium">Inbox</span>
                    </Link>

                    {/* Scan QR (Center Prominent) */}
                    <button className="absolute -top-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                        <div className="w-16 h-16 rounded-full bg-white dark:bg-[#1e293b] p-1.5 shadow-[0_-5px_10px_rgba(0,0,0,0.05)] dark:shadow-none ring-4 ring-[#f8f9fa] dark:ring-[#0f172a]">
                            <div className="w-full h-full rounded-full bg-[#E2136E] flex items-center justify-center text-white shadow-lg hover:scale-105 transition-transform">
                                <QrCode className="w-7 h-7" />
                            </div>
                        </div>
                        <span className="text-[10px] font-bold text-[#E2136E] mt-1">Scan QR</span>
                    </button>

                    {/* Spacer for Center Button */}
                    <div className="w-12"></div>

                    {/* People */}
                    <Link href="#" className="flex flex-col items-center gap-1 text-gray-400 dark:text-slate-500 hover:text-[#E2136E] transition-colors w-16">
                        <Users className="w-6 h-6 stroke-[2.5]" />
                        <span className="text-[10px] font-medium">People</span>
                    </Link>

                    {/* Menu (Bottom) */}
                    <button onClick={() => setIsMenuOpen(true)} className="flex flex-col items-center gap-1 text-gray-400 dark:text-slate-500 hover:text-[#E2136E] transition-colors w-16">
                        <Menu className="w-6 h-6 stroke-[2.5]" />
                        <span className="text-[10px] font-medium">Menu</span>
                    </button>

                </div>
            </div>
        </div>
    );
}
