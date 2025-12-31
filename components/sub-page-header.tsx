'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SubPageHeaderProps {
    title: string;
    backLink?: string;
    className?: string;
}

export function SubPageHeader({ title, backLink = '/dashboard/personal', className }: SubPageHeaderProps) {
    return (
        <div className={cn("bg-[#E2136E] text-white p-6 pt-8 pb-10 rounded-b-[2rem] shadow-lg mb-6 relative overflow-hidden", className)}>
            {/* Abstract Background Shapes */}
            <div className="absolute top-[-50%] left-[-20%] w-[80%] h-[200%] bg-gradient-to-br from-white/10 via-transparent to-transparent rotate-12 blur-3xl pointer-events-none"></div>

            <div className="relative z-10 flex items-center gap-4">
                <Link href={backLink} className="p-2 bg-white/20 hover:bg-white/30 rounded-full transition-colors">
                    <ArrowLeft className="w-6 h-6" />
                </Link>
                <h1 className="text-2xl font-bold font-heading">{title}</h1>
            </div>
        </div>
    );
}
