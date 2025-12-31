'use client';

import { usePathname } from 'next/navigation';
import { Sidebar } from '@/components/sidebar';
import { Bell, Search } from 'lucide-react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();

    // Determine role based on URL (hacky but works for frontend-only demo)
    let role: 'personal' | 'business' | 'agent' | 'admin' = 'personal';
    if (pathname.includes('/business')) role = 'business';
    else if (pathname.includes('/agent')) role = 'agent';
    else if (pathname.includes('/admin')) role = 'admin';
    const isPersonal = role === 'personal';
    const hideGlobalNav = role === 'personal' || role === 'business' || role === 'agent' || role === 'admin';

    return (
        <div className="min-h-screen bg-background flex">
            {!hideGlobalNav && <Sidebar type={role} />}

            {/* Main Content Area */}
            <div className={`flex-1 flex flex-col ${!hideGlobalNav ? 'md:ml-64' : ''}`}>
                {/* Topbar */}
                {!hideGlobalNav && (
                    <header className="h-16 border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-10 px-6 flex items-center justify-between">
                        <div className="md:hidden font-bold text-xl">PayFlow.</div>

                        <div className="hidden md:flex items-center px-4 py-2 bg-muted/50 rounded-full w-96 border border-transparent focus-within:border-primary/50 transition-all">
                            <Search className="w-4 h-4 text-muted-foreground mr-2" />
                            <input
                                type="text"
                                placeholder="Search transactions, agents..."
                                className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground/70"
                            />
                        </div>

                        <div className="flex items-center space-x-4">
                            <button className="p-2 rounded-full hover:bg-muted transition-colors relative">
                                <Bell className="w-5 h-5 text-muted-foreground" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-card"></span>
                            </button>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500"></div>
                        </div>
                    </header>
                )}

                <main className={`flex-1 w-full mx-auto ${!hideGlobalNav ? 'p-6 md:p-8 max-w-7xl' : 'p-0'}`}>
                    {children}
                </main>
            </div>
        </div>
    );
}
