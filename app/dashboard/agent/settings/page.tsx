'use client';

import { useState } from 'react';
import { SubPageHeader } from '@/components/sub-page-header';
import { User, Lock, Bell, Shield, Moon, Sun, ChevronRight, X, Check, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTheme } from 'next-themes';
import { motion, AnimatePresence } from 'framer-motion';

export default function AgentSettingsPage() {
    const { theme, setTheme } = useTheme();
    const [activeModal, setActiveModal] = useState<string | null>(null);
    const [showSuccess, setShowSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    // Profile Data
    const [profile, setProfile] = useState({
        storeName: 'Rahim Store',
        agentId: 'AG-12345',
        phone: '+880 1712 345 678',
        email: 'rahim@store.com',
    });

    // Security Data
    const [security, setSecurity] = useState({
        currentPin: '',
        newPin: '',
        confirmPin: '',
    });

    // Notification Settings
    const [notifications, setNotifications] = useState({
        push: true,
        email: false,
        sms: true,
    });

    // Privacy Settings
    const [privacy, setPrivacy] = useState({
        showProfile: true,
        allowContact: true,
    });

    const handleSaveProfile = () => {
        setSuccessMessage('Profile updated successfully!');
        setActiveModal(null);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const handleUpdatePin = () => {
        if (security.newPin !== security.confirmPin) {
            alert('PINs do not match!');
            return;
        }
        setSuccessMessage('PIN changed successfully!');
        setActiveModal(null);
        setShowSuccess(true);
        setSecurity({ currentPin: '', newPin: '', confirmPin: '' });
        setTimeout(() => setShowSuccess(false), 3000);
    };

    const toggleNotification = (key: keyof typeof notifications) => {
        setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const togglePrivacy = (key: keyof typeof privacy) => {
        setPrivacy(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const settings = [
        { icon: User, title: 'Profile Settings', desc: 'Update your agent profile', modal: 'profile' },
        { icon: Lock, title: 'Security', desc: 'Change PIN & Password', modal: 'security' },
        { icon: Bell, title: 'Notifications', desc: 'Manage notifications', modal: 'notifications' },
        { icon: Shield, title: 'Privacy', desc: 'Privacy settings', modal: 'privacy' },
        { icon: Moon, title: 'Mode', desc: 'Dark / Light theme', modal: 'mode' },
    ];

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] pb-24">
            <SubPageHeader title="Settings" backLink="/dashboard/agent" className="bg-emerald-600" />

            <div className="max-w-md mx-auto px-4 space-y-4">
                {settings.map((setting, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveModal(setting.modal)}
                        className="w-full bg-white dark:bg-[#1e293b] rounded-2xl p-5 shadow-sm border border-gray-100 dark:border-slate-800 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors"
                    >
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                                <setting.icon className="w-6 h-6" />
                            </div>
                            <div className="text-left">
                                <p className="font-bold text-gray-800 dark:text-white">{setting.title}</p>
                                <p className="text-xs text-gray-500 dark:text-slate-400">{setting.desc}</p>
                            </div>
                        </div>
                        <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                ))}
            </div>

            {/* Success Message */}
            <AnimatePresence>
                {showSuccess && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        className="fixed bottom-24 left-1/2 -translate-x-1/2 bg-emerald-600 text-white px-6 py-3 rounded-full shadow-lg z-50 flex items-center gap-2"
                    >
                        <CheckCircle className="w-5 h-5" />
                        <span className="font-bold text-sm">{successMessage}</span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Profile Modal */}
            <AnimatePresence>
                {activeModal === 'profile' && (
                    <>
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={() => setActiveModal(null)} />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1e293b] rounded-t-3xl p-6 z-50 max-h-[90vh] overflow-y-auto"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Profile Settings</h2>
                                <button onClick={() => setActiveModal(null)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 dark:text-slate-400 mb-2 block">Store Name</label>
                                    <input
                                        type="text"
                                        value={profile.storeName}
                                        onChange={(e) => setProfile({ ...profile, storeName: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 dark:text-slate-400 mb-2 block">Phone</label>
                                    <input
                                        type="tel"
                                        value={profile.phone}
                                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 dark:text-slate-400 mb-2 block">Email</label>
                                    <input
                                        type="email"
                                        value={profile.email}
                                        onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white"
                                    />
                                </div>
                                <button
                                    onClick={handleSaveProfile}
                                    className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors"
                                >
                                    Save Changes
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Security Modal */}
            <AnimatePresence>
                {activeModal === 'security' && (
                    <>
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={() => setActiveModal(null)} />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1e293b] rounded-t-3xl p-6 z-50"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Change PIN</h2>
                                <button onClick={() => setActiveModal(null)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-xs font-bold text-gray-500 dark:text-slate-400 mb-2 block">Current PIN</label>
                                    <input
                                        type="password"
                                        value={security.currentPin}
                                        onChange={(e) => setSecurity({ ...security, currentPin: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white"
                                        placeholder="Enter current PIN"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 dark:text-slate-400 mb-2 block">New PIN</label>
                                    <input
                                        type="password"
                                        value={security.newPin}
                                        onChange={(e) => setSecurity({ ...security, newPin: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white"
                                        placeholder="Enter new PIN"
                                    />
                                </div>
                                <div>
                                    <label className="text-xs font-bold text-gray-500 dark:text-slate-400 mb-2 block">Confirm New PIN</label>
                                    <input
                                        type="password"
                                        value={security.confirmPin}
                                        onChange={(e) => setSecurity({ ...security, confirmPin: e.target.value })}
                                        className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-slate-800 border border-gray-200 dark:border-slate-700 text-gray-800 dark:text-white"
                                        placeholder="Confirm new PIN"
                                    />
                                </div>
                                <button
                                    onClick={handleUpdatePin}
                                    className="w-full py-4 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-colors"
                                >
                                    Update PIN
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Notifications Modal */}
            <AnimatePresence>
                {activeModal === 'notifications' && (
                    <>
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={() => setActiveModal(null)} />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1e293b] rounded-t-3xl p-6 z-50"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Notifications</h2>
                                <button onClick={() => setActiveModal(null)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                {Object.entries(notifications).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                                        <div>
                                            <p className="font-bold text-gray-800 dark:text-white capitalize">{key}</p>
                                            <p className="text-xs text-gray-500 dark:text-slate-400">Receive {key} notifications</p>
                                        </div>
                                        <button
                                            onClick={() => toggleNotification(key as keyof typeof notifications)}
                                            className={cn(
                                                "w-12 h-6 rounded-full transition-colors relative",
                                                value ? "bg-emerald-600" : "bg-gray-300 dark:bg-slate-700"
                                            )}
                                        >
                                            <div className={cn(
                                                "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform",
                                                value ? "translate-x-6" : "translate-x-0"
                                            )} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Privacy Modal */}
            <AnimatePresence>
                {activeModal === 'privacy' && (
                    <>
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={() => setActiveModal(null)} />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1e293b] rounded-t-3xl p-6 z-50"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Privacy Settings</h2>
                                <button onClick={() => setActiveModal(null)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                            <div className="space-y-4">
                                {Object.entries(privacy).map(([key, value]) => (
                                    <div key={key} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-slate-800 rounded-xl">
                                        <div>
                                            <p className="font-bold text-gray-800 dark:text-white capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                            <p className="text-xs text-gray-500 dark:text-slate-400">Control your privacy preferences</p>
                                        </div>
                                        <button
                                            onClick={() => togglePrivacy(key as keyof typeof privacy)}
                                            className={cn(
                                                "w-12 h-6 rounded-full transition-colors relative",
                                                value ? "bg-emerald-600" : "bg-gray-300 dark:bg-slate-700"
                                            )}
                                        >
                                            <div className={cn(
                                                "absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform",
                                                value ? "translate-x-6" : "translate-x-0"
                                            )} />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Mode Modal */}
            <AnimatePresence>
                {activeModal === 'mode' && (
                    <>
                        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50" onClick={() => setActiveModal(null)} />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-[#1e293b] rounded-t-3xl p-6 z-50"
                        >
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-800 dark:text-white">Theme Mode</h2>
                                <button onClick={() => setActiveModal(null)} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800">
                                    <X className="w-5 h-5 text-gray-500" />
                                </button>
                            </div>
                            <div className="space-y-3">
                                <button
                                    onClick={() => { setTheme('light'); setActiveModal(null); }}
                                    className={cn(
                                        "w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-colors",
                                        theme === 'light'
                                            ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20"
                                            : "border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800"
                                    )}
                                >
                                    <Sun className="w-6 h-6 text-gray-700 dark:text-slate-300" />
                                    <div className="flex-1 text-left">
                                        <p className="font-bold text-gray-800 dark:text-white">Light Mode</p>
                                        <p className="text-xs text-gray-500 dark:text-slate-400">Use light theme</p>
                                    </div>
                                    {theme === 'light' && <Check className="w-5 h-5 text-emerald-600" />}
                                </button>
                                <button
                                    onClick={() => { setTheme('dark'); setActiveModal(null); }}
                                    className={cn(
                                        "w-full p-4 rounded-xl border-2 flex items-center gap-4 transition-colors",
                                        theme === 'dark'
                                            ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-900/20"
                                            : "border-gray-200 dark:border-slate-700 bg-gray-50 dark:bg-slate-800"
                                    )}
                                >
                                    <Moon className="w-6 h-6 text-gray-700 dark:text-slate-300" />
                                    <div className="flex-1 text-left">
                                        <p className="font-bold text-gray-800 dark:text-white">Dark Mode</p>
                                        <p className="text-xs text-gray-500 dark:text-slate-400">Use dark theme</p>
                                    </div>
                                    {theme === 'dark' && <Check className="w-5 h-5 text-emerald-600" />}
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
