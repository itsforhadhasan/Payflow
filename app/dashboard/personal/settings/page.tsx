'use client';

import { useState } from 'react';
import { SubPageHeader } from '@/components/sub-page-header';
import { User, Lock, Bell, Moon, ChevronRight, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsPage() {
    const [themeOpen, setThemeOpen] = useState(false);
    const { setTheme, theme } = useTheme();

    const settings = [
        { icon: User, title: 'Edit Profile', desc: 'Name, Email, Profile Picture', action: () => { } },
        { icon: Lock, title: 'Change PIN', desc: 'Secure your account', action: () => { } },
        { icon: Bell, title: 'Notifications', desc: 'Push, SMS, Email', action: () => { } },
        { icon: Moon, title: 'Appearance', desc: 'Light, Dark, System', action: () => setThemeOpen(!themeOpen) },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a]">
            <SubPageHeader title="Settings" />

            <div className="max-w-md mx-auto px-4 space-y-4">

                {settings.map((item, i) => (
                    <div key={i}>
                        <button onClick={item.action} className="w-full bg-white dark:bg-[#1e293b] p-5 rounded-2xl shadow-sm flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-slate-800/80 transition-colors group text-left z-10 relative">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-600 dark:text-slate-400 group-hover:bg-[#E2136E]/10 group-hover:text-[#E2136E] transition-colors">
                                <item.icon className="w-6 h-6" />
                            </div>
                            <div className="flex-1">
                                <h3 className="font-bold text-gray-800 dark:text-white group-hover:text-[#E2136E] transition-colors">{item.title}</h3>
                                <p className="text-xs text-gray-500 dark:text-slate-500 font-medium">{item.desc}</p>
                            </div>
                            <ChevronRight className={cn("w-5 h-5 text-gray-300 group-hover:text-[#E2136E] transition-transform", item.title === 'Appearance' && themeOpen ? 'rotate-90' : '')} />
                        </button>

                        {/* Theme Options Dropdown */}
                        {item.title === 'Appearance' && (
                            <AnimatePresence>
                                {themeOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="overflow-hidden bg-gray-50 dark:bg-slate-900 rounded-b-2xl mx-2 -mt-4 pt-6 pb-2 px-2 shadow-inner"
                                    >
                                        <div className="space-y-1">
                                            {['light', 'dark'].map((t) => (
                                                <button
                                                    key={t}
                                                    onClick={() => setTheme(t)}
                                                    className={cn("w-full flex items-center justify-between p-3 rounded-xl text-sm font-bold capitalize transition-colors",
                                                        theme === t ? "bg-white dark:bg-slate-800 text-[#E2136E] shadow-sm" : "text-gray-500 hover:bg-white/50 dark:hover:bg-slate-800/50"
                                                    )}
                                                >
                                                    {t}
                                                    {theme === t && <Check className="w-4 h-4" />}
                                                </button>
                                            ))}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}
                    </div>
                ))}

                <button className="w-full mt-8 p-4 rounded-2xl bg-red-50 dark:bg-red-900/10 text-red-500 font-bold hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors">
                    Delete Account
                </button>

            </div>
        </div>
    );
}
