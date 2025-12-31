'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function AnalyticsPage() {
    return (
        <div className="min-h-screen bg-[#1F0344] transition-colors duration-300 pb-32 md:pb-16 overflow-x-hidden">
            <div className="max-w-5xl mx-auto md:pt-8 px-4 md:px-4">
                {/* Header */}
                <div className="flex items-center gap-4 mb-8 mt-6">
                    <Link href="/admin" className="p-2 hover:bg-purple-600/20 rounded-lg transition-colors">
                        <ArrowLeft className="w-6 h-6 text-white" />
                    </Link>
                    <h1 className="text-4xl font-bold text-white">Analytics</h1>
                </div>

                {/* Content */}
                <div className="bg-gradient-to-br from-[#2d1b4e] via-[#1f0344] to-[#2d1b4e] border border-purple-700/50 rounded-2xl p-8 shadow-lg">
                    <div className="text-center py-16">
                        <h2 className="text-2xl font-bold text-white mb-4">Analytics Dashboard</h2>
                        <p className="text-purple-300 text-lg">Detailed analytics and insights coming soon...</p>
                        <div className="mt-12 space-y-4 text-left max-w-2xl mx-auto">
                            <div className="bg-purple-600/20 border border-purple-600/50 rounded-lg p-4">
                                <h3 className="text-white font-semibold mb-2">📊 Transaction Analytics</h3>
                                <p className="text-purple-200 text-sm">View detailed transaction metrics and trends</p>
                            </div>
                            <div className="bg-purple-600/20 border border-purple-600/50 rounded-lg p-4">
                                <h3 className="text-white font-semibold mb-2">👥 User Analytics</h3>
                                <p className="text-purple-200 text-sm">Analyze user behavior and engagement</p>
                            </div>
                            <div className="bg-purple-600/20 border border-purple-600/50 rounded-lg p-4">
                                <h3 className="text-white font-semibold mb-2">📈 Performance Metrics</h3>
                                <p className="text-purple-200 text-sm">Monitor system performance and uptime</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
