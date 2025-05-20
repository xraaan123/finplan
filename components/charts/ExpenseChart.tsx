'use client'

// import React, { useEffect } from 'react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const COLORS = ['#6366f1', '#06b6d4', '#facc15', '#fb7185', '#34d399', '#f97316'];

type ChartData = {
    category: string;
    amount: number;
}[];

interface Props {
    data: ChartData,
    title?: string,
}

const ExpenseChart = ({ data, title = '📊 Expense Breakdown' }: Props) => {
    const filtered = data.filter((e) => e.amount > 0);

    // useEffect(() => {
    //   console.log('check data: ', filtered)
    // }, [])

    if (filtered.length === 0)
        return <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">⚠️ No expense data available.</div>

    return (
        <div className="w-full h-96 bg-white dark:bg-gray-900 p-4 rounded-xl shadow-sm space-y-8">
            <h2 className="text-md font-medium text-gray-800 dark:text-white mb-4">{title}</h2>
            <ResponsiveContainer width='100%' height='100%'>
                <PieChart margin={{ bottom: 24 }}>
                    <Pie data={filtered} dataKey='amount' nameKey='category' cx='50%' cy='50%' outerRadius={80} label={({ category }) => category}>
                        {data.map((_, i) => (
                            <Cell key={i} fill={COLORS[i % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip formatter={(value: number | string) => `${Number(value).toLocaleString()} ฿`} contentStyle={{ backgroundColor: '#fff', color: '#fff', borderRadius: 8, border: 'none' }} labelStyle={{ color: '#cbd5e1' }} />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ExpenseChart