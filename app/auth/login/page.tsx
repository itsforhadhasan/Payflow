'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils'; // Ensure utils exists

export default function LoginPage() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [role, setRole] = useState<'personal' | 'business' | 'agent' | 'admin'>('personal');

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API delay
        setTimeout(() => {
            setIsLoading(false);
            // Redirect based on role
            if (role === 'admin') router.push('/admin');
            else router.push(`/dashboard/${role}`);
        }, 1500);
    };

    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
            <div className="text-center mb-8">
                <h1 className="text-3xl font-bold font-heading bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
                    Welcome Back
                </h1>
                <p className="text-sm text-gray-500 mt-2">Sign in to your PayFlow account</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-6">
                {/* Role Selector */}
                <div className="grid grid-cols-4 gap-2 bg-gray-100 dark:bg-gray-900 p-1 rounded-lg">
                    {['personal', 'business', 'agent', 'admin'].map((r) => (
                        <button
                            key={r}
                            type="button"
                            onClick={() => setRole(r as any)}
                            className={cn(
                                "py-2 text-xs font-medium rounded-md capitalize transition-all",
                                role === r
                                    ? "bg-white dark:bg-gray-700 shadow text-blue-600 dark:text-blue-400"
                                    : "text-gray-500 hover:text-gray-900 dark:text-gray-400"
                            )}
                        >
                            {r}
                        </button>
                    ))}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address / Phone
                    </label>
                    <input
                        required
                        type="text"
                        placeholder="Enter your email or phone"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Password
                    </label>
                    <input
                        required
                        type="password"
                        placeholder="••••••••"
                        className="w-full px-4 py-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full py-3.5 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                >
                    {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight className="w-5 h-5" /></>}
                </button>

                <p className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Don&apos;t have an account?{' '}
                    <Link href="/auth/register" className="text-blue-600 hover:underline font-medium">
                        Create Account
                    </Link>
                </p>
            </form>
        </div>
    );
}
