export type UserRole = 'PERSONAL' | 'BUSINESS' | 'AGENT' | 'ADMIN';

export interface User {
    id: string;
    name: string;
    email: string;
    phone: string;
    role: UserRole;
    balance: number;
    avatar?: string;
    isVerified: boolean;
}

export interface Transaction {
    id: string;
    type: 'SEND_MONEY' | 'CASH_OUT' | 'ADD_MONEY' | 'PAYMENT' | 'BILL_PAY';
    amount: number;
    date: string;
    status: 'COMPLETED' | 'PENDING' | 'FAILED';
    recipientId?: string; // For Send Money / Payment
    senderId?: string;
    description?: string;
}

export const CURRENT_USER: User = {
    id: 'u1',
    name: 'Tahsin Ahmed',
    email: 'tahsin@example.com',
    phone: '01712-345678',
    role: 'PERSONAL',
    balance: 15420.50,
    isVerified: true,
};

export const MOCK_TRANSACTIONS: Transaction[] = [
    {
        id: 'tx1',
        type: 'SEND_MONEY',
        amount: 500,
        date: '2024-10-25T10:30:00Z',
        status: 'COMPLETED',
        recipientId: 'u2',
        description: 'Lunch split',
    },
    {
        id: 'tx2',
        type: 'ADD_MONEY',
        amount: 2000,
        date: '2024-10-24T15:00:00Z',
        status: 'COMPLETED',
        description: 'Bank Transfer',
    },
    {
        id: 'tx3',
        type: 'CASH_OUT',
        amount: 1000,
        date: '2024-10-22T09:15:00Z',
        status: 'COMPLETED',
        description: 'Agent Cashout',
    },
];
