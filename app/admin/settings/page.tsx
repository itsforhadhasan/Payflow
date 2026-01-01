'use client';

import Link from 'next/link';
import { ArrowLeft, Bell, Lock, Users, Palette, Database, Shield, Sun, Moon, Monitor } from 'lucide-react';
import { useState } from 'react';

export default function SettingsPage() {
    const [settings, setSettings] = useState<{
        emailNotifications: boolean;
        smsNotifications: boolean;
        twoFactor: boolean;
        darkMode: boolean;
        theme: 'dark' | 'light' | 'auto';
    }>({
        emailNotifications: true,
        smsNotifications: false,
        twoFactor: true,
        darkMode: true,
        theme: 'dark',
    });

    const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');

    const handleToggle = (key: keyof typeof settings) => {
        setSettings(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
        triggerSave();
    };

    const handleThemeChange = (theme: 'dark' | 'light' | 'auto') => {
        setSettings(prev => ({
            ...prev,
            theme,
            darkMode: theme === 'dark' || theme === 'auto'
        }));
        triggerSave();
    };

    const triggerSave = () => {
        setSaveStatus('saving');
        setTimeout(() => {
            setSaveStatus('saved');
            setTimeout(() => {
                setSaveStatus('idle');
            }, 2000);
        }, 500);
    };

    return (
        <div className={`min-h-screen transition-colors duration-300 pb-32 md:pb-16 overflow-x-hidden ${
            settings.theme === 'light' ? 'bg-gray-50' : 'bg-[#1F0344]'
        }`}>
            <div className="max-w-5xl mx-auto md:pt-8 px-4 md:px-4">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8 mt-6">
                    <Link href="/admin" className={`p-2 hover:bg-purple-600/20 rounded-lg transition-colors ${
                        settings.theme === 'light' ? 'text-gray-700' : 'text-white'
                    }`}>
                        <ArrowLeft className="w-6 h-6" />
                    </Link>
                    <h1 className={`text-4xl font-bold ${
                        settings.theme === 'light' ? 'text-gray-900' : 'text-white'
                    }`}>Settings</h1>
                </div>

                {/* Save Status Indicator */}
                {saveStatus !== 'idle' && (
                    <div className={`mb-4 p-4 rounded-lg ${
                        saveStatus === 'saving' 
                            ? 'bg-blue-500/20 text-blue-300' 
                            : 'bg-green-500/20 text-green-300'
                    }`}>
                        {saveStatus === 'saving' ? 'Saving changes...' : '✓ Changes saved'}
                    </div>
                )}

                {/* Settings Sections */}
                <div className="space-y-6">
                    {/* Display Theme */}
                    <div className={`bg-gradient-to-br rounded-2xl p-6 border ${
                        settings.theme === 'light'
                            ? 'from-gray-100 to-gray-50 border-gray-300 bg-white'
                            : 'from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border-purple-700/50'
                    }`}>
                        <div className="flex items-center gap-3 mb-6">
                            <Palette className={`w-6 h-6 ${
                                settings.theme === 'light' ? 'text-gray-600' : 'text-purple-300'
                            }`} />
                            <h2 className={`font-bold text-xl ${
                                settings.theme === 'light' ? 'text-gray-900' : 'text-white'
                            }`}>Display Theme</h2>
                        </div>
                        
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            {/* Light Mode */}
                            <button
                                onClick={() => handleThemeChange('light')}
                                className={`p-4 rounded-lg border-2 transition-all ${
                                    settings.theme === 'light'
                                        ? 'border-blue-500 bg-blue-50'
                                        : settings.theme === 'light'
                                        ? 'border-gray-300 bg-gray-50'
                                        : 'border-purple-600/30 bg-purple-600/10'
                                }`}
                            >
                                <Sun className={`w-6 h-6 mx-auto mb-2 ${
                                    settings.theme === 'light' ? 'text-yellow-500' : 'text-gray-400'
                                }`} />
                                <p className={`text-sm font-medium ${
                                    settings.theme === 'light' ? 'text-gray-900' : 'text-gray-400'
                                }`}>
                                    Light
                                </p>
                            </button>

                            {/* Dark Mode */}
                            <button
                                onClick={() => handleThemeChange('dark')}
                                className={`p-4 rounded-lg border-2 transition-all ${
                                    settings.theme === 'dark'
                                        ? 'border-purple-500 bg-purple-600/20'
                                        : settings.theme === 'light'
                                        ? 'border-gray-300 bg-gray-50'
                                        : 'border-purple-600/30 bg-purple-600/10'
                                }`}
                            >
                                <Moon className={`w-6 h-6 mx-auto mb-2 ${
                                    settings.theme === 'dark' ? 'text-purple-300' : settings.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                                }`} />
                                <p className={`text-sm font-medium ${
                                    settings.theme === 'dark' 
                                        ? 'text-white' 
                                        : settings.theme === 'light'
                                        ? 'text-gray-900'
                                        : 'text-gray-400'
                                }`}>
                                    Dark
                                </p>
                            </button>

                            {/* Auto Mode */}
                            <button
                                onClick={() => handleThemeChange('auto')}
                                className={`p-4 rounded-lg border-2 transition-all ${
                                    settings.theme === 'auto'
                                        ? 'border-cyan-500 bg-cyan-600/20'
                                        : settings.theme === 'light'
                                        ? 'border-gray-300 bg-gray-50'
                                        : 'border-purple-600/30 bg-purple-600/10'
                                }`}
                            >
                                <Monitor className={`w-6 h-6 mx-auto mb-2 ${
                                    settings.theme === 'auto' ? 'text-cyan-300' : settings.theme === 'light' ? 'text-gray-600' : 'text-gray-400'
                                }`} />
                                <p className={`text-sm font-medium ${
                                    settings.theme === 'auto'
                                        ? 'text-white'
                                        : settings.theme === 'light'
                                        ? 'text-gray-900'
                                        : 'text-gray-400'
                                }`}>
                                    Auto
                                </p>
                            </button>
                        </div>

                        {/* Theme Preview */}
                        <div className={`p-4 rounded-lg ${
                            settings.theme === 'light'
                                ? 'bg-gray-100 border border-gray-300'
                                : 'bg-purple-600/10 border border-purple-600/50'
                        }`}>
                            <p className={`text-sm ${
                                settings.theme === 'light' ? 'text-gray-600' : 'text-purple-300'
                            }`}>
                                Current Theme: <span className="font-semibold">{settings.theme.charAt(0).toUpperCase() + settings.theme.slice(1)}</span>
                            </p>
                        </div>
                    </div>

                    {/* Notifications */}
                    <div className={`bg-gradient-to-br rounded-2xl p-6 border ${
                        settings.theme === 'light'
                            ? 'from-gray-100 to-gray-50 border-gray-300 bg-white'
                            : 'from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border-purple-700/50'
                    }`}>
                        <div className="flex items-center gap-3 mb-6">
                            <Bell className={`w-6 h-6 ${
                                settings.theme === 'light' ? 'text-gray-600' : 'text-purple-300'
                            }`} />
                            <h2 className={`font-bold text-xl ${
                                settings.theme === 'light' ? 'text-gray-900' : 'text-white'
                            }`}>Notifications</h2>
                        </div>
                        <div className="space-y-4">
                            <div className={`flex items-center justify-between p-4 rounded-lg border ${
                                settings.theme === 'light'
                                    ? 'bg-gray-50 border-gray-300'
                                    : 'bg-purple-600/10 border-purple-600/20'
                            }`}>
                                <div>
                                    <p className={`font-medium ${
                                        settings.theme === 'light' ? 'text-gray-900' : 'text-white'
                                    }`}>Email Notifications</p>
                                    <p className={`text-sm ${
                                        settings.theme === 'light' ? 'text-gray-600' : 'text-purple-300'
                                    }`}>Receive alerts via email</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={settings.emailNotifications}
                                    onChange={() => handleToggle('emailNotifications')}
                                    className="w-5 h-5 rounded cursor-pointer"
                                />
                            </div>
                            <div className={`flex items-center justify-between p-4 rounded-lg border ${
                                settings.theme === 'light'
                                    ? 'bg-gray-50 border-gray-300'
                                    : 'bg-purple-600/10 border-purple-600/20'
                            }`}>
                                <div>
                                    <p className={`font-medium ${
                                        settings.theme === 'light' ? 'text-gray-900' : 'text-white'
                                    }`}>SMS Notifications</p>
                                    <p className={`text-sm ${
                                        settings.theme === 'light' ? 'text-gray-600' : 'text-purple-300'
                                    }`}>Receive alerts via SMS</p>
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
                    <div className={`bg-gradient-to-br rounded-2xl p-6 border ${
                        settings.theme === 'light'
                            ? 'from-gray-100 to-gray-50 border-gray-300 bg-white'
                            : 'from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border-purple-700/50'
                    }`}>
                        <div className="flex items-center gap-3 mb-6">
                            <Shield className={`w-6 h-6 ${
                                settings.theme === 'light' ? 'text-gray-600' : 'text-purple-300'
                            }`} />
                            <h2 className={`font-bold text-xl ${
                                settings.theme === 'light' ? 'text-gray-900' : 'text-white'
                            }`}>Security</h2>
                        </div>
                        <div className="space-y-4">
                            <div className={`flex items-center justify-between p-4 rounded-lg border ${
                                settings.theme === 'light'
                                    ? 'bg-gray-50 border-gray-300'
                                    : 'bg-purple-600/10 border-purple-600/20'
                            }`}>
                                <div>
                                    <p className={`font-medium ${
                                        settings.theme === 'light' ? 'text-gray-900' : 'text-white'
                                    }`}>Two-Factor Authentication</p>
                                    <p className={`text-sm ${
                                        settings.theme === 'light' ? 'text-gray-600' : 'text-purple-300'
                                    }`}>Add extra layer of security</p>
                                </div>
                                <input
                                    type="checkbox"
                                    checked={settings.twoFactor}
                                    onChange={() => handleToggle('twoFactor')}
                                    className="w-5 h-5 rounded cursor-pointer"
                                />
                            </div>
                            <button className={`w-full font-medium py-2 px-4 rounded-lg transition-colors border ${
                                settings.theme === 'light'
                                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300'
                                    : 'bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 border-purple-600/50'
                            }`}>
                                Change Password
                            </button>
                        </div>
                    </div>

                    {/* System */}
                    <div className={`bg-gradient-to-br rounded-2xl p-6 border ${
                        settings.theme === 'light'
                            ? 'from-gray-100 to-gray-50 border-gray-300 bg-white'
                            : 'from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border-purple-700/50'
                    }`}>
                        <div className="flex items-center gap-3 mb-6">
                            <Database className={`w-6 h-6 ${
                                settings.theme === 'light' ? 'text-gray-600' : 'text-purple-300'
                            }`} />
                            <h2 className={`font-bold text-xl ${
                                settings.theme === 'light' ? 'text-gray-900' : 'text-white'
                            }`}>System</h2>
                        </div>
                        <div className="space-y-3">
                            <button className={`w-full font-medium py-2 px-4 rounded-lg transition-colors border ${
                                settings.theme === 'light'
                                    ? 'bg-gray-100 hover:bg-gray-200 text-gray-700 border-gray-300'
                                    : 'bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 border-purple-600/50'
                            }`}>
                                Export Data
                            </button>
                            <button className={`w-full font-medium py-2 px-4 rounded-lg transition-colors border ${
                                settings.theme === 'light'
                                    ? 'bg-red-100 hover:bg-red-200 text-red-700 border-red-300'
                                    : 'bg-red-600/20 hover:bg-red-600/30 text-red-200 border-red-600/50'
                            }`}>
                                Clear Cache
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
