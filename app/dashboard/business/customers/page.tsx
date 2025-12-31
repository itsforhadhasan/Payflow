'use client';

import { SubPageHeader } from '@/components/sub-page-header';
import { Users, Search, Phone, Mail, MoreVertical, CreditCard } from 'lucide-react';
import { useState } from 'react';

export default function CustomersPage() {
    const [searchQuery, setSearchQuery] = useState('');

    const customers = [
        { id: 1, name: 'Rahim Uddin', phone: '01711223344', email: 'rahim@example.com', spent: '12,500', orders: 15, lastTxnId: 'TXN123' },
        { id: 2, name: 'Karim Ahmed', phone: '01999887766', email: 'karim@gmail.com', spent: '8,200', orders: 8, lastTxnId: 'TXN456' },
        { id: 3, name: 'Selina Begum', phone: '01855667788', email: 'selina.b@yahoo.com', spent: '24,000', orders: 32, lastTxnId: 'TXN789' },
    ];

    const filteredCustomers = customers.filter(c =>
        c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.phone.includes(searchQuery) ||
        c.lastTxnId.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-[#f8f9fa] dark:bg-[#0f172a] font-sans">
            <SubPageHeader title="My Customers" backLink="/dashboard/business" className="bg-indigo-600 dark:bg-indigo-700" />

            <div className="max-w-md mx-auto px-4">

                {/* Search */}
                <div className="bg-white dark:bg-[#1e293b] p-4 rounded-2xl shadow-sm mb-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Name, Phone, or Txn ID"
                            className="w-full bg-gray-50 dark:bg-slate-900 border-none rounded-xl py-3 pl-12 pr-4 text-base font-bold text-gray-800 dark:text-white outline-none focus:ring-2 focus:ring-indigo-600/20"
                        />
                    </div>
                </div>

                {/* Customers List */}
                <div className="space-y-4">
                    {filteredCustomers.length > 0 ? filteredCustomers.map((customer) => (
                        <div key={customer.id} className="bg-white dark:bg-[#1e293b] p-5 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-800 relative">
                            <button className="absolute top-4 right-4 text-gray-400 hover:text-indigo-600">
                                <MoreVertical className="w-5 h-5" />
                            </button>

                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-full bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 flex items-center justify-center font-bold text-lg">
                                    {customer.name.charAt(0)}
                                </div>
                                <div>
                                    <h3 className="font-bold text-gray-800 dark:text-white">{customer.name}</h3>
                                    <div className="flex flex-col gap-1 mt-1">
                                        <span className="text-xs text-gray-500 bg-gray-100 dark:bg-slate-800 px-2 py-0.5 rounded-md flex items-center gap-1 w-fit">
                                            <Phone className="w-3 h-3" /> {customer.phone}
                                        </span>
                                        {searchQuery && customer.lastTxnId.toLowerCase().includes(searchQuery.toLowerCase()) && (
                                            <span className="text-xs text-indigo-600 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-0.5 rounded-md flex items-center gap-1 w-fit">
                                                <CreditCard className="w-3 h-3" /> Last: {customer.lastTxnId}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-50 dark:border-slate-800">
                                <div className="text-center w-1/2 border-r border-gray-50 dark:border-slate-800">
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Total Spent</p>
                                    <p className="text-lg font-bold text-indigo-600">৳{customer.spent}</p>
                                </div>
                                <div className="text-center w-1/2">
                                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">Orders</p>
                                    <p className="text-lg font-bold text-gray-800 dark:text-white">{customer.orders}</p>
                                </div>
                            </div>
                        </div>
                    )) : (
                        <div className="text-center py-10 text-gray-400">
                            <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                            <p>No customers found.</p>
                        </div>
                    )}
                </div>

            </div>
        </div>
    );
}
