'use client';

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const data = [
    { name: 'Payment', value: 12500, color: '#ec4899' }, // Pink (Shopping)
    { name: 'Send Money', value: 8000, color: '#6366f1' }, // Indigo (Transfer)
    { name: 'Cash Out', value: 5000, color: '#f97316' }, // Orange
    { name: 'Bill Pay', value: 3500, color: '#eab308' }, // Yellow
];

const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-gray-100 dark:border-slate-800 p-3 rounded-xl shadow-lg">
                <p className="text-xs font-bold text-gray-500 dark:text-gray-400 mb-1">{payload[0].name}</p>
                <p className="text-lg font-black text-gray-800 dark:text-white">
                    ৳{(payload[0].value).toLocaleString()}
                </p>
            </div>
        );
    }
    return null;
};

export function SpendingPieChart() {
    return (
        <div className="w-full h-[250px] select-none">
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={70}
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
