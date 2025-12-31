import { TrendingUp, Users, Wallet, ArrowRightLeft, QrCode, ClipboardList, History } from 'lucide-react';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export default function AgentDashboard() {
    const quickActions = [
        { name: 'Cash In', icon: ArrowRightLeft, href: '#', color: 'bg-emerald-600' },
        { name: 'Cash Out', icon: Wallet, href: '#', color: 'bg-orange-600' },
        { name: 'B2B Transfer', icon: Users, href: '#', color: 'bg-blue-600' },
        { name: 'History', icon: History, href: '#', color: 'bg-purple-600' },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] transition-colors duration-300 pb-28 md:pb-12 overflow-x-hidden">
            <div className="max-w-5xl mx-auto md:pt-8 px-0 md:px-4">

                {/* Hero Section - Agent Green Theme */}
                <div className="relative md:rounded-[2.5rem] bg-emerald-600 dark:bg-emerald-700 shadow-2xl shadow-emerald-500/20 z-10 transition-all duration-500">
                    <div className="absolute inset-0 overflow-hidden md:rounded-[2.5rem] pointer-events-none">
                        <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[200%] bg-gradient-to-br from-white/10 via-transparent to-transparent rotate-12 blur-3xl"></div>
                        <div className="absolute bottom-[-50%] right-[-20%] w-[80%] h-[200%] bg-gradient-to-rn from-black/5 via-transparent to-transparent -rotate-12 blur-3xl"></div>
                    </div>

                    <div className="relative z-10 p-6 md:p-12 text-white">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                            <div>
                                <p className="text-emerald-100 text-xs md:text-sm font-medium tracking-wide">Agent Portal</p>
                                <h2 className="text-3xl md:text-4xl font-bold font-heading tracking-tight mt-1">Rahim Store</h2>
                            </div>
                            <div className="text-right">
                                <p className="text-emerald-200 text-xs uppercase tracking-widest font-bold">Total Commission</p>
                                <h3 className="text-3xl md:text-4xl font-bold mt-1">৳ 4,250</h3>
                                <div className="flex items-center justify-end gap-1 text-emerald-200 text-sm font-bold mt-1">
                                    <TrendingUp className="w-4 h-4" /> Today: ৳ 450
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
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-3 mb-8">
                                <span className="w-1 h-5 bg-emerald-600 rounded-full"></span>
                                Quick Actions
                            </h3>
                            <div className="grid grid-cols-4 gap-y-8 gap-x-2 md:gap-x-6">
                                {quickActions.map((item, i) => (
                                    <button key={i} className="flex flex-col items-center gap-3 group">
                                        <div className={cn("w-14 h-14 md:w-16 md:h-16 rounded-[1.2rem] flex items-center justify-center text-white shadow-lg shadow-gray-200/50 dark:shadow-none transform group-hover:scale-105 transition-all duration-300", item.color)}>
                                            <item.icon className="w-6 h-6 md:w-7 md:h-7 stroke-[2.5]" />
                                        </div>
                                        <span className="text-[10px] md:text-xs font-bold text-gray-600 dark:text-slate-400 group-hover:text-emerald-600 transition-colors text-center leading-tight truncate w-full px-1">{item.name}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Pending Requests */}
                        <div className="bg-white dark:bg-[#1e293b] rounded-[2rem] p-6 md:p-8 shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white flex items-center gap-3 mb-6">
                                <span className="w-1 h-5 bg-emerald-600 rounded-full"></span>
                                Live Cash-Out Requests
                            </h3>
                            <div className="bg-gray-50 dark:bg-slate-900 rounded-xl p-8 text-center text-gray-400 dark:text-slate-500 border border-dashed border-gray-200 dark:border-slate-700">
                                <div className="w-16 h-16 bg-gray-100 dark:bg-slate-800 rounded-full mx-auto flex items-center justify-center mb-4 text-gray-300 dark:text-slate-600">
                                    <Users className="w-8 h-8" />
                                </div>
                                <p className="font-medium">No active requests at the moment.</p>
                                <p className="text-xs mt-1">Real-time requests will appear here.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Stats */}
                    <div className="space-y-8">
                        <div className="bg-white dark:bg-[#1e293b] rounded-[2rem] p-6 md:p-8 shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-800">
                            <h3 className="text-lg font-bold text-gray-800 dark:text-white mb-6">Daily Summary</h3>

                            <div className="space-y-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 flex items-center justify-center">
                                        <ArrowRightLeft className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-slate-400 font-bold uppercase">Cash In</p>
                                        <p className="text-xl font-bold text-gray-800 dark:text-white">৳ 45,000</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-orange-50 dark:bg-orange-900/20 text-orange-600 flex items-center justify-center">
                                        <Wallet className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-slate-400 font-bold uppercase">Cash Out</p>
                                        <p className="text-xl font-bold text-gray-800 dark:text-white">৳ 23,500</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-900/20 text-blue-600 flex items-center justify-center">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-xs text-gray-500 dark:text-slate-400 font-bold uppercase">Served</p>
                                        <p className="text-xl font-bold text-gray-800 dark:text-white">142</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gradient-to-br from-emerald-600 to-emerald-800 rounded-[2rem] p-6 text-white text-center shadow-lg shadow-emerald-500/30">
                            <QrCode className="w-12 h-12 mx-auto mb-4 opacity-90" />
                            <h3 className="text-lg font-bold mb-1">My QR Code</h3>
                            <p className="text-emerald-100 text-xs mb-4">Show this to customers for quick payments</p>
                            <button className="bg-white text-emerald-700 px-6 py-2 rounded-full text-sm font-bold hover:bg-emerald-50 transition-colors">
                                View QR
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
