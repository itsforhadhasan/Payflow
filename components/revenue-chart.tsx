'use client';

import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const data = [
    { month: 'Jan', amount: 30000 },
    { month: 'Feb', amount: 45000 },
    { month: 'Mar', amount: -15000 }, // Loss
    { month: 'Apr', amount: 60000 },
    { month: 'May', amount: -10000 }, // Loss
    { month: 'Jun', amount: 75000 },
    { month: 'Jul', amount: 65000 },
    { month: 'Aug', amount: 85000 },
    { month: 'Sep', amount: -20000 }, // Loss
    { month: 'Oct', amount: 90000 },
    { month: 'Nov', amount: 80000 },
    { month: 'Dec', amount: 100000 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        const value = payload[0].value;
        const isLoss = value < 0;
        return (
            <div className={`backdrop-blur-md border p-4 rounded-2xl shadow-xl min-w-[150px] ${isLoss ? 'bg-red-50/90 border-red-200 dark:bg-red-900/80 dark:border-red-800' : 'bg-white/80 border-white/20 dark:bg-slate-900/80 dark:border-white/10'}`}>
                <p className={`text-xs font-bold uppercase tracking-widest mb-1 ${isLoss ? 'text-red-600 dark:text-red-300' : 'text-gray-500 dark:text-gray-400'}`}>{label}</p>
                <p className={`text-2xl font-black ${isLoss ? 'text-red-600 dark:text-red-400' : 'bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent'}`}>
                    {isLoss ? '-' : ''}৳{Math.abs(value / 1000).toFixed(1)}k
                </p>
                <p className={`text-[10px] font-bold mt-1 ${isLoss ? 'text-red-500' : 'text-emerald-500'}`}>
                    {isLoss ? 'Net Loss' : 'Net Profit'}
                </p>
            </div>
        );
    }
    return null;
};

export function RevenueChart() {
    return (
        <div className="w-full h-[300px] select-none">
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
                        dataKey="month"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 600 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: '#94a3b8', fontSize: 12 }}
                        tickFormatter={(value) => `${value / 1000}k`}
                    />
                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                    <ReferenceLine y={0} stroke="#94a3b8" strokeDasharray="3 3" opacity={0.5} />
                    <Bar dataKey="amount" radius={[4, 4, 0, 0]}>
                        {data.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.amount > 0 ? '#6366f1' : '#ef4444'}
                                className={entry.amount > 0 ? 'dark:fill-indigo-500' : 'dark:fill-red-500'}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
