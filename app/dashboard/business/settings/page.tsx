'use client';

import { useState } from 'react';
import { ArrowLeft, Save, Shield, Bell, Key, Building, Check, Copy, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';

export default function BusinessSettingsPage() {
    const [activeTab, setActiveTab] = useState('profile');
    const [showSecret, setShowSecret] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] font-sans pb-12">
            {/* Header */}
            <div className="bg-white dark:bg-[#1e293b] sticky top-0 z-30 border-b border-gray-100 dark:border-slate-800">
                <div className="max-w-4xl mx-auto px-4">
                    <div className="h-16 flex items-center gap-4">
                        <Link href="/dashboard/business" className="p-2 -ml-2 hover:bg-gray-50 dark:hover:bg-slate-800 rounded-full transition-colors">
                            <ArrowLeft className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                        </Link>
                        <h1 className="text-lg font-bold text-gray-800 dark:text-white">Business Settings</h1>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 py-8">
                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar Nav */}
                    <div className="md:w-64 shrink-0">
                        <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-2 shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-800 sticky top-24">
                            <button
                                onClick={() => setActiveTab('profile')}
                                className={`flex items-center gap-3 w-full p-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'profile' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                            >
                                <Building className="w-5 h-5" />
                                Business Profile
                            </button>
                            <button
                                onClick={() => setActiveTab('integration')}
                                className={`flex items-center gap-3 w-full p-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'integration' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                            >
                                <Key className="w-5 h-5" />
                                API & Integration
                            </button>
                            <button
                                onClick={() => setActiveTab('security')}
                                className={`flex items-center gap-3 w-full p-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'security' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                            >
                                <Shield className="w-5 h-5" />
                                Security
                            </button>
                            <button
                                onClick={() => setActiveTab('notifications')}
                                className={`flex items-center gap-3 w-full p-3 rounded-xl text-sm font-bold transition-all ${activeTab === 'notifications' ? 'bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400' : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-slate-800'}`}
                            >
                                <Bell className="w-5 h-5" />
                                Notifications
                            </button>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-6">

                        {/* Profile Section */}
                        {activeTab === 'profile' && (
                            <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-800">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Business Profile</h2>

                                <div className="space-y-6">
                                    <div className="flex flex-col md:flex-row gap-6 items-start">
                                        <div className="w-24 h-24 rounded-2xl bg-indigo-100 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 dark:text-indigo-400 shrink-0">
                                            <Building className="w-10 h-10" />
                                        </div>
                                        <div className="flex-1 space-y-4 w-full">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Business Name</label>
                                                <input type="text" defaultValue="Tech Solutions Ltd." className="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-800 border-none outline-none font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                                            </div>
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Trade License No.</label>
                                                <input type="text" defaultValue="TRAD/DNCC/123456/2023" className="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-800 border-none outline-none font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-100 dark:border-slate-800">
                                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Business Address</label>
                                        <textarea defaultValue="Plot-12, Road-5, Sector-10, Uttara, Dhaka-1230, Bangladesh" className="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-800 border-none outline-none font-medium text-gray-700 dark:text-gray-300 focus:ring-2 focus:ring-indigo-500/20 transition-all min-h-[100px]"></textarea>
                                    </div>

                                    <div className="flex justify-end">
                                        <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                                            <Save className="w-4 h-4" />
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* API & Integration Section */}
                        {activeTab === 'integration' && (
                            <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-800">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">API & Integration</h2>

                                <div className="space-y-6">
                                    <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 text-amber-800 dark:text-amber-200 text-sm font-medium">
                                        ⚠️ Keep your API credentials secure. Do not share them publicly.
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Public Key</label>
                                        <div className="flex gap-2">
                                            <code className="flex-1 p-3 rounded-xl bg-gray-50 dark:bg-slate-800 font-mono text-sm text-gray-600 dark:text-gray-400  break-all">pk_live_51MzkG4Kj9L2xR7v8QwE3n...</code>
                                            <button onClick={() => handleCopy('pk_live_51MzkG4Kj9L2xR7v8QwE3n')} className="p-3 bg-gray-100 dark:bg-slate-700 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                                                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Secret Key</label>
                                        <div className="flex gap-2">
                                            <code className="flex-1 p-3 rounded-xl bg-gray-50 dark:bg-slate-800 font-mono text-sm text-gray-600 dark:text-gray-400 break-all">
                                                {showSecret ? 'sk_live_9aB8c7D6e5F4g3H2i1J0k...' : '••••••••••••••••••••••••••••••••'}
                                            </code>
                                            <button onClick={() => setShowSecret(!showSecret)} className="p-3 bg-gray-100 dark:bg-slate-700 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                                                {showSecret ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                            </button>
                                            <button onClick={() => handleCopy('sk_live_9aB8c7D6e5F4g3H2i1J0k')} className="p-3 bg-gray-100 dark:bg-slate-700 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors">
                                                {copied ? <Check className="w-5 h-5 text-green-500" /> : <Copy className="w-5 h-5" />}
                                            </button>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Webhook URL</label>
                                        <input type="text" placeholder="https://your-domain.com/api/webhook" className="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-800 border-none outline-none font-mono text-sm text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                                    </div>

                                    <div className="flex justify-end pt-4">
                                        <button className="flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
                                            <Save className="w-4 h-4" />
                                            Update Keys
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Security Section */}
                        {activeTab === 'security' && (
                            <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-800">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Security Settings</h2>

                                <div className="space-y-8">
                                    {/* Change PIN */}
                                    <div className="space-y-4">
                                        <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">Change PIN</h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <div>
                                                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Current PIN</label>
                                                <input type="password" placeholder="****" className="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-800 border-none outline-none font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                                            </div>
                                            <div className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">New PIN</label>
                                                    <input type="password" placeholder="****" className="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-800 border-none outline-none font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                                                </div>
                                                <div>
                                                    <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Confirm New PIN</label>
                                                    <input type="password" placeholder="****" className="w-full p-3 rounded-xl bg-gray-50 dark:bg-slate-800 border-none outline-none font-bold text-gray-800 dark:text-white focus:ring-2 focus:ring-indigo-500/20 transition-all" />
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex justify-end">
                                            <button className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors text-sm">
                                                Update PIN
                                            </button>
                                        </div>
                                    </div>

                                    <div className="border-t border-gray-100 dark:border-slate-800 pt-6">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-sm font-bold text-gray-700 dark:text-gray-300">Two-Factor Authentication</h3>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Require an OTP for every login attempt.</p>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Notifications Section */}
                        {activeTab === 'notifications' && (
                            <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-6 md:p-8 shadow-sm dark:shadow-none border border-gray-100 dark:border-slate-800">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-6">Notification Preferences</h2>

                                <div className="space-y-6">
                                    {[
                                        { title: 'Email Alerts', description: 'Receive transaction summaries and security alerts via email.', icon: Bell },
                                        { title: 'SMS Notifications', description: 'Get instant SMS for every transaction over ৳1,000.', icon: Bell },
                                        { title: 'Promotional Offers', description: 'Receive updates about new features and campaigns.', icon: Bell },
                                    ].map((item, i) => (
                                        <div key={i} className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors border border-gray-100 dark:border-slate-800">
                                            <div className="flex gap-4">
                                                <div className="w-10 h-10 rounded-full bg-indigo-50 dark:bg-indigo-900/20 flex items-center justify-center text-indigo-600 shrink-0">
                                                    <item.icon className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-gray-800 dark:text-white">{item.title}</h3>
                                                    <p className="text-xs text-gray-500 dark:text-slate-400 mt-0.5">{item.description}</p>
                                                </div>
                                            </div>
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" defaultChecked={i !== 2} />
                                                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-slate-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-indigo-600"></div>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
}
