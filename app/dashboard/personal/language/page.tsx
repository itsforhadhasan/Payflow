'use client';

import { SubPageHeader } from '@/components/sub-page-header';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

export default function LanguagePage() {
    const [lang, setLang] = useState('en');

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a]">
            <SubPageHeader title="Language / ভাষা" />

            <div className="max-w-md mx-auto px-4 space-y-4">

                {[
                    { code: 'en', name: 'English', sub: 'Default' },
                    { code: 'bn', name: 'বাংলা', sub: 'Bengali' }
                ].map((item, i) => (
                    <button
                        key={i}
                        onClick={() => setLang(item.code)}
                        className={cn(
                            "w-full p-5 rounded-2xl shadow-sm flex items-center justify-between border-2 transition-all",
                            lang === item.code ? "bg-white dark:bg-[#1e293b] border-[#E2136E]" : "bg-white dark:bg-[#1e293b] border-transparent"
                        )}
                    >
                        <div className="text-left">
                            <h3 className="font-bold text-gray-800 dark:text-white text-lg">{item.name}</h3>
                            <p className="text-xs text-gray-500">{item.sub}</p>
                        </div>
                        {lang === item.code && <div className="w-6 h-6 bg-[#E2136E] rounded-full flex items-center justify-center text-white"><Check className="w-4 h-4" /></div>}
                    </button>
                ))}

            </div>
        </div>
    );
}
