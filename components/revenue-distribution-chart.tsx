'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
    { name: 'Sales', value: 65000, color: '#6366f1' }, // Indigo-500
    { name: 'Services', value: 35000, color: '#8b5cf6' }, // Violet-500
    { name: 'Affiliate', value: 15000, color: '#ec4899' }, // Pink-500
    { name: 'Consulting', value: 24500, color: '#f43f5e' }, // Rose-500
];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-gray-100 dark:border-slate-800 p-3 rounded-xl shadow-lg">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{payload[0].name}</p>
                <p className="text-lg font-black text-gray-800 dark:text-white">
                    ৳{(payload[0].value / 1000).toFixed(1)}k
                </p>
            </div>
        );
    }
    return null;
};

export function RevenueDistributionChart() {
    return (
        <div className="w-full h-[300px] select-none">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} strokeWidth={0} />
                        ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        formatter={(value) => <span className="text-xs font-bold text-gray-600 dark:text-slate-400 ml-1">{value}</span>}
                    />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}
