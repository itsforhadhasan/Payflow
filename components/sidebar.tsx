'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Send, Download, CreditCard, History, Settings, LogOut, Briefcase, Users, BadgeDollarSign } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Sidebar({ type }: { type: 'personal' | 'business' | 'agent' | 'admin' }) {
    const pathname = usePathname();

    const links = {
        personal: [
            { name: 'Overview', href: '/dashboard/personal', icon: LayoutDashboard },
            { name: 'Send Money', href: '/dashboard/personal/send', icon: Send },
            { name: 'Cash Out', href: '/dashboard/personal/cashout', icon: Download },
            { name: 'Add Money', href: '/dashboard/personal/add-money', icon: CreditCard },
            { name: 'Transactions', href: '/dashboard/personal/transactions', icon: History },
        ],
        business: [
            { name: 'Overview', href: '/dashboard/business', icon: LayoutDashboard },
            { name: 'Receive Payment', href: '/dashboard/business/receive', icon: BadgeDollarSign },
            { name: 'Analytics', href: '/dashboard/business/analytics', icon: Briefcase },
            { name: 'Transactions', href: '/dashboard/business/transactions', icon: History },
        ],
        agent: [
            { name: 'Overview', href: '/dashboard/agent', icon: LayoutDashboard },
            { name: 'Cash In/Out Requests', href: '/dashboard/agent/requests', icon: Users },
            { name: 'Earnings', href: '/dashboard/agent/earnings', icon: BadgeDollarSign },
            { name: 'History', href: '/dashboard/agent/transactions', icon: History },
        ],
        admin: [
            { name: 'Master Dashboard', href: '/admin', icon: LayoutDashboard },
            { name: 'User Management', href: '/admin/users', icon: Users },
            { name: 'Global Ledger', href: '/admin/ledger', icon: History },
            { name: 'System Config', href: '/admin/settings', icon: Settings },
        ],
    };

    const menu = links[type] || links.personal;

    return (
        <aside className="w-64 bg-card border-r border-border h-screen flex flex-col hidden md:flex fixed left-0 top-0 z-20">
            <div className="p-6 h-16 flex items-center border-b border-border">
                <h1 className="text-2xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    PayFlow.
                </h1>
            </div>

            <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                {menu.map((item) => {
                    const Icon = item.icon;
                    const isActive = pathname === item.href;
                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            className={cn(
                                "flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                                isActive
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                            )}
                        >
                            <Icon className="w-5 h-5" />
                            <span>{item.name}</span>
                        </Link>
                    );
                })}
            </nav>

            <div className="p-4 border-t border-border">
                <Link
                    href="/dashboard/settings"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                >
                    <Settings className="w-5 h-5" />
                    <span>Settings</span>
                </Link>
                <Link
                    href="/auth/login"
                    className="flex items-center space-x-3 px-4 py-3 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 transition-colors mt-1"
                >
                    <LogOut className="w-5 h-5" />
                    <span>Logout</span>
                </Link>
            </div>
        </aside>
    );
}
