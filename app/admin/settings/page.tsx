'use client';

import Link from 'next/link';
import { ArrowLeft, Bell, Lock, Users, Palette, Database, Shield } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
    const [settings, setSettings] = useState<{
        emailNotifications: boolean;
        smsNotifications: boolean;
        twoFactor: boolean;
        darkMode: boolean;
    }>({
        emailNotifications: true,
        smsNotifications: false,
        twoFactor: true,
        darkMode: true,
    });

    const handleToggle = (key: keyof typeof settings) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    return (
        <div className="min-h-screen bg-[#1F0344] transition-colors duration-300 pb-32 md:pb-16 overflow-x-hidden">
            <div className="max-w-5xl mx-auto md:pt-8 px-4 md:px-4">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8 mt-6">
                    <Link href="/admin" className="p-2 hover:bg-purple-600/20 rounded-lg transition-colors">
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </Link>
                    <h1 className="text-4xl font-bold text-white">Settings</h1>
                </div>

                {/* Settings Sections */}
                <div className="space-y-6">
                    {/* Notifications */}
                    <div className="bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border border-purple-700/50 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Bell className="w-6 h-6 text-purple-300" />
                            <h2 className="text-white font-bold text-xl">Notifications</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-purple-600/10 rounded-lg border border-purple-600/20">
                                <div>
                                    <p className="text-white font-medium">Email Notifications</p>
                                    <p className="text-purple-300 text-sm">Receive alerts via email</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={settings.emailNotifications}
                                    onChange={() => handleToggle('emailNotifications')}
                                    className="w-5 h-5 rounded cursor-pointer"
                                />
                            </div>
                            <div className="flex items-center justify-between p-4 bg-purple-600/10 rounded-lg border border-purple-600/20">
                                <div>
                                    <p className="text-white font-medium">SMS Notifications</p>
                                    <p className="text-purple-300 text-sm">Receive alerts via SMS</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={settings.smsNotifications}
                                    onChange={() => handleToggle('smsNotifications')}
                                    className="w-5 h-5 rounded cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Security */}
                    <div className="bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border border-purple-700/50 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className="w-6 h-6 text-purple-300" />
                            <h2 className="text-white font-bold text-xl">Security</h2>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 bg-purple-600/10 rounded-lg border border-purple-600/20">
                                <div>
                                    <p className="text-white font-medium">Two-Factor Authentication</p>
                                    <p className="text-purple-300 text-sm">Add extra layer of security</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={settings.twoFactor}
                                    onChange={() => handleToggle('twoFactor')}
                                    className="w-5 h-5 rounded cursor-pointer"
                                />
                            </div>
                            <button className="w-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 font-medium py-2 px-4 rounded-lg transition-colors border border-purple-600/50">
                                Change Password
                            </button>
                        </div>
                    </div>

                    {/* Display */}
                    <div className="bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border border-purple-700/50 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Palette className="w-6 h-6 text-purple-300" />
                            <h2 className="text-white font-bold text-xl">Display</h2>
                        </div>
                        <div className="flex items-center justify-between p-4 bg-purple-600/10 rounded-lg border border-purple-600/20">
                            <div>
                                <p className="text-white font-medium">Dark Mode</p>
                                <p className="text-purple-300 text-sm">Use dark theme</p>
                            </div>
                            <input
                                type="checkbox"
                                checked={settings.darkMode}
                                onChange={() => handleToggle('darkMode')}
                                className="w-5 h-5 rounded cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* System */}
                    <div className="bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border border-purple-700/50 rounded-2xl p-6">
                        <div className="flex items-center gap-3 mb-6">
                            <Database className="w-6 h-6 text-purple-300" />
                            <h2 className="text-white font-bold text-xl">System</h2>
                        </div>
                        <div className="space-y-3">
                            <button className="w-full bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 font-medium py-2 px-4 rounded-lg transition-colors border border-purple-600/50">
                                Export Data
                            </button>
                            <button className="w-full bg-red-600/20 hover:bg-red-600/30 text-red-200 font-medium py-2 px-4 rounded-lg transition-colors border border-red-600/50">
                                Clear Cache
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
