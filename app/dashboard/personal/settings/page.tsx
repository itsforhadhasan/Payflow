'use client';

import { useState } from 'react';
import { SubPageHeader } from '@/components/sub-page-header';
import { User, Lock, Bell, Moon, ChevronRight, Check, CheckCircle, Smartphone, Mail, Shield, Trash2, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

export default function SettingsPage() {
    const [themeOpen, setThemeOpen] = useState(false);
    const { setTheme, theme } = useTheme();

    // Modal States
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Profile Data (Mock)
    const [profile, setProfile] = useState({ name: 'John Doe', email: 'john@example.com' });

    // Notification Data (Mock)
    const [notifications, setNotifications] = useState({ push: true, email: false, sms: true });

    const handleSaveProfile = () => {
        setSuccessMessage('Profile updated successfully!');
        setActiveModal(null);
        setShowSuccess(true);
    };

    const handleUpdatePin = () => {
        setSuccessMessage('PIN changed successfully!');
        setActiveModal(null);
        setShowSuccess(true);
    };

    const toggleNotification = (key: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const handleDeleteAccount = () => {
        const confirmed = confirm('Are you sure you want to delete your account? This action cannot be undone.');
        if (confirmed) {
            alert('Account deletion request sent to support.');
        }
    };

    const settings = [
        { icon: User, title: 'Edit Profile', desc: 'Name, Email', action: () => setActiveModal('profile') },
        { icon: Lock, title: 'Change PIN', desc: 'Secure your account', action: () => setActiveModal('pin') },
        { icon: Bell, title: 'Notifications', desc: 'Push, SMS, Email', action: () => setActiveModal('notifications') },
        { icon: Moon, title: 'Appearance', desc: 'Light, Dark, System', action: () => setThemeOpen(!themeOpen) },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] font-sans">
            <SubPageHeader title="Settings" />

            <div className="max-w-md mx-auto px-4 space-y-4 pb-8">

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
                                            {['light', 'dark', 'system'].map((t) => (
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

                <button
                    onClick={handleDeleteAccount}
                    className="w-full mt-8 p-4 rounded-2xl bg-red-50 dark:bg-red-900/10 text-red-500 font-bold hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors flex items-center justify-center gap-2"
                >
                    <Trash2 className="w-5 h-5" />
                    Delete Account
                </button>

            </div>

            {/* Dynamic Modal Layer */}
            <AnimatePresence>
                {activeModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setActiveModal(null)}
                            className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ y: '100%' }}
                            animate={{ y: 0 }}
                            exit={{ y: '100%' }}
                            className="fixed bottom-0 left-0 right-0 md:absolute md:bottom-auto md:top-1/2 md:-translate-y-1/2 md:left-4 md:right-4 bg-white dark:bg-[#1e293b] rounded-t-[2.5rem] md:rounded-[2.5rem] p-6 z-50 shadow-2xl max-w-md mx-auto"
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setActiveModal(null)}
                                className="absolute top-4 right-4 p-2 bg-gray-100 dark:bg-slate-800 rounded-full text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Modals Content */}
                            {activeModal === 'profile' && (
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white text-center">Edit Profile</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Full Name</label>
                                            <input
                                                type="text"
                                                value={profile.name}
                                                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                                                className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl py-3 px-4 text-gray-800 dark:text-white font-bold outline-none focus:ring-2 focus:ring-[#E2136E]"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
                                            <input
                                                type="email"
                                                value={profile.email}
                                                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                                className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl py-3 px-4 text-gray-800 dark:text-white font-bold outline-none focus:ring-2 focus:ring-[#E2136E]"
                                            />
                                        </div>
                                    </div>
                                    <button onClick={handleSaveProfile} className="w-full bg-[#E2136E] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-pink-500/30">Save Changes</button>
                                </div>
                            )}

                            {activeModal === 'pin' && (
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white text-center">Change PIN</h3>
                                    <div className="space-y-4">
                                        <input
                                            type="password"
                                            placeholder="Current PIN"
                                            className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl py-3 px-4 text-center font-bold text-lg tracking-widest outline-none focus:ring-2 focus:ring-[#E2136E]"
                                        />
                                        <input
                                            type="password"
                                            placeholder="New PIN"
                                            className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl py-3 px-4 text-center font-bold text-lg tracking-widest outline-none focus:ring-2 focus:ring-[#E2136E]"
                                        />
                                        <input
                                            type="password"
                                            placeholder="Confirm New PIN"
                                            className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl py-3 px-4 text-center font-bold text-lg tracking-widest outline-none focus:ring-2 focus:ring-[#E2136E]"
                                        />
                                    </div>
                                    <button onClick={handleUpdatePin} className="w-full bg-[#E2136E] text-white py-4 rounded-xl font-bold text-lg shadow-lg shadow-pink-500/30">Update PIN</button>
                                </div>
                            )}

                            {activeModal === 'notifications' && (
                                <div className="space-y-6">
                                    <h3 className="text-xl font-bold text-gray-800 dark:text-white text-center">Notifications</h3>
                                    <div className="space-y-2">
                                        {[
                                            { key: 'push', label: 'Push Notifications', icon: Smartphone },
                                            { key: 'email', label: 'Email Alerts', icon: Mail },
                                            { key: 'sms', label: 'SMS Updates', icon: Shield },
                                        ].map((item) => (
                                            <div key={item.key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-900 rounded-xl">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 bg-white dark:bg-slate-800 rounded-full flex items-center justify-center text-gray-500">
                                                        <item.icon className="w-5 h-5" />
                                                    </div>
                                                    <span className="font-bold text-gray-700 dark:text-gray-200">{item.label}</span>
                                                </div>
                                                <button
                                                    onClick={() => toggleNotification(item.key as keyof typeof notifications)}
                                                    className={cn(
                                                        "w-12 h-6 rounded-full p-1 transition-colors duration-300",
                                                        notifications[item.key as keyof typeof notifications] ? "bg-[#E2136E]" : "bg-gray-300 dark:bg-slate-700"
                                                    )}
                                                >
                                                    <div className={cn(
                                                        "w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300",
                                                        notifications[item.key as keyof typeof notifications] ? "translate-x-6" : ""
                                                    )} />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                    <button onClick={() => setActiveModal(null)} className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 py-4 rounded-xl font-bold text-lg">Done</button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white dark:bg-[#1e293b] w-full max-w-sm rounded-[2.5rem] p-8 relative text-center"
                        >
                            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6 text-green-600 dark:text-green-400">
                                <CheckCircle className="w-10 h-10" />
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Success!</h3>
                            <p className="text-gray-500 dark:text-slate-400 mb-8">
                                {successMessage}
                            </p>
                            <button
                                onClick={() => {
                                    setShowSuccess(false);
                                }}
                                className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold py-4 rounded-2xl hover:scale-[1.02] transition-transform"
                            >
                                Great!
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

        </div>
    );
}
