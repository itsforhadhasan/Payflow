'use client';

import { SubPageHeader } from '@/components/sub-page-header';
import { Shield, Smartphone, Key } from 'lucide-react';

export default function SecurityPage() {
    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a]">
            <SubPageHeader title="Security" />

            <div className="max-w-md mx-auto px-4 space-y-6">

                <div className="bg-white dark:bg-[#1e293b] p-8 rounded-2xl shadow-sm text-center">
                    <div className="w-20 h-20 bg-green-100 dark:bg-green-500/10 rounded-full flex items-center justify-center text-green-500 mx-auto mb-4">
                        <Shield className="w-10 h-10" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-white">Account is Secure</h2>
                    <p className="text-sm text-gray-500 mt-2">Your account is protected with 2FA and PIN.</p>
                </div>

                <div className="space-y-4">
                    <button className="w-full bg-white dark:bg-[#1e293b] p-5 rounded-2xl shadow-sm flex items-center gap-4 text-left">
                        <div className="w-10 h-10 bg-blue-100 dark:bg-blue-500/10 rounded-full flex items-center justify-center text-blue-500 shrink-0">
                            <Key className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 dark:text-white">Change PIN</h3>
                            <p className="text-xs text-gray-500">Last changed 3 months ago</p>
                        </div>
                    </button>

                    <button className="w-full bg-white dark:bg-[#1e293b] p-5 rounded-2xl shadow-sm flex items-center gap-4 text-left">
                        <div className="w-10 h-10 bg-orange-100 dark:bg-orange-500/10 rounded-full flex items-center justify-center text-orange-500 shrink-0">
                            <Smartphone className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-800 dark:text-white">Devices</h3>
                            <p className="text-xs text-gray-500">2 Active Devices</p>
                        </div>
                    </button>
                </div>

            </div>
        </div>
    );
}
