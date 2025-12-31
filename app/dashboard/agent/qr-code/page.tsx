'use client';

import { SubPageHeader } from '@/components/sub-page-header';
import { QrCode, Download, Share2 } from 'lucide-react';
import { useState } from 'react';

export default function AgentQRCodePage() {
    const [copied, setCopied] = useState(false);
    
    // Mock QR code data - in real app, this would be generated from agent ID
    const agentId = 'AG-12345';
    const qrData = `payflow://agent/${agentId}`;

    const handleDownload = () => {
        // In a real app, this would download the QR code image
        alert('QR Code download feature coming soon!');
    };

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: 'My PayFlow Agent QR Code',
                text: `Scan this QR code to send money to ${agentId}`,
                url: qrData,
            }).catch(() => {
                handleCopy();
            });
        } else {
            handleCopy();
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(qrData);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] pb-24">
            <SubPageHeader title="My QR Code" backLink="/dashboard/agent" className="bg-emerald-600" />

            <div className="max-w-md mx-auto px-4 space-y-6">
                {/* QR Code Display */}
                <div className="bg-white dark:bg-[#1e293b] rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-slate-800">
                    <div className="flex flex-col items-center">
                        {/* QR Code Display */}
                        <div className="w-64 h-64 bg-white p-4 rounded-2xl border-4 border-emerald-600 mb-6 flex items-center justify-center relative overflow-hidden">
                            {/* QR Code Pattern - More realistic representation */}
                            <div className="absolute inset-4 grid" style={{ gridTemplateColumns: 'repeat(20, 1fr)', gap: '1px' }}>
                                {Array.from({ length: 400 }).map((_, i) => {
                                    const row = Math.floor(i / 20);
                                    const col = i % 20;
                                    // Create a pattern that looks like a QR code
                                    const isCorner = (row < 6 && col < 6) || (row < 6 && col >= 14) || (row >= 14 && col < 6);
                                    const isPattern = (row + col) % 3 === 0 || (row * col) % 7 === 0;
                                    const shouldFill = isCorner || isPattern;
                                    
                                    return (
                                        <div
                                            key={i}
                                            className={shouldFill ? 'bg-black' : 'bg-white'}
                                        />
                                    );
                                })}
                            </div>
                            {/* Center Logo/Icon */}
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
                                <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center border-2 border-emerald-600 shadow-lg">
                                    <QrCode className="w-8 h-8 text-emerald-600" />
                                </div>
                            </div>
                        </div>
                        
                        <div className="text-center">
                            <p className="text-sm font-bold text-gray-500 dark:text-slate-400 mb-2">Agent ID</p>
                            <p className="text-2xl font-bold text-emerald-600 dark:text-emerald-400 mb-4">{agentId}</p>
                            <p className="text-xs text-gray-500 dark:text-slate-400">Rahim Store</p>
                        </div>
                    </div>
                </div>

                {/* Instructions */}
                <div className="bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-900/20">
                    <h3 className="font-bold text-emerald-800 dark:text-emerald-300 mb-3 flex items-center gap-2">
                        <QrCode className="w-5 h-5" />
                        How to use
                    </h3>
                    <ul className="space-y-2 text-sm text-emerald-700 dark:text-emerald-300">
                        <li className="flex items-start gap-2">
                            <span className="font-bold">1.</span>
                            <span>Show this QR code to your customers</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-bold">2.</span>
                            <span>They scan it with their PayFlow app</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="font-bold">3.</span>
                            <span>Money will be sent directly to your account</span>
                        </li>
                    </ul>
                </div>

                {/* Actions */}
                <div className="grid grid-cols-2 gap-4">
                    <button
                        onClick={handleDownload}
                        className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors active:scale-95"
                    >
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                            <Download className="w-6 h-6" />
                        </div>
                        <p className="text-xs font-bold text-gray-800 dark:text-white">Download</p>
                    </button>

                    <button
                        onClick={handleShare}
                        className="flex flex-col items-center gap-2 p-4 bg-white dark:bg-[#1e293b] rounded-2xl border border-gray-100 dark:border-slate-800 hover:bg-gray-50 dark:hover:bg-slate-800/50 transition-colors active:scale-95"
                    >
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                            <Share2 className="w-6 h-6" />
                        </div>
                        <p className="text-xs font-bold text-gray-800 dark:text-white">
                            {copied ? 'Copied!' : 'Share'}
                        </p>
                    </button>
                </div>
            </div>
        </div>
    );
}
