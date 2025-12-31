'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const data = [
    { time: '9 AM', requests: 12, amount: 15000, color: '#10b981' }, // Emerald
    { time: '10 AM', requests: 18, amount: 22000, color: '#3b82f6' }, // Blue
    { time: '11 AM', requests: 25, amount: 31000, color: '#8b5cf6' }, // Purple
    { time: '12 PM', requests: 22, amount: 28000, color: '#ec4899' }, // Pink
    { time: '1 PM', requests: 15, amount: 19000, color: '#f97316' }, // Orange
    { time: '2 PM', requests: 20, amount: 25000, color: '#eab308' }, // Yellow
    { time: '3 PM', requests: 28, amount: 35000, color: '#06b6d4' }, // Cyan
    { time: '4 PM', requests: 24, amount: 30000, color: '#14b8a6' }, // Teal
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        // Find the data entry for this time to get the amount
        const dataEntry = data.find(d => d.time === label);
        const amount = dataEntry?.amount || 0;
        
        return (
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-gray-100 dark:border-slate-800 p-3 rounded-xl shadow-lg">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{label}</p>
                <p className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {payload[0].value} Requests
                </p>
                <p className="text-xs text-gray-600 dark:text-slate-400 mt-1">
                    ৳{amount.toLocaleString()}
                </p>
            </div>
        );
    }
    return null;
};

export function CashOutRequestsChart() {
    return (
        <div className="w-full h-[280px] select-none">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={data}
                    margin={{
                        top: 20,
                        right: 10,
                        left: -20,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" opacity={0.5} className="dark:stroke-slate-700" />
                    <XAxis
                        dataKey="time"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 600 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 11 }}
                        tickFormatter={(value) => `${value}`}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(16, 185, 129, 0.1)' }} />
                    <Bar dataKey="requests" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.color}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
