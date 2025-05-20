'use client'

import { useBudgetStore } from '@/stores/budgetStore'
import React from 'react'
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const ExpenseHistoryChart = () => {
    const budgets = useBudgetStore((s) => s.budgets);

    const data = budgets.map((b) => ({
        month: new Date(b.month + '-01').toLocaleDateString('en-US', {
            month: 'short',
            year: '2-digit'
        }),
        expense: b.expenses.reduce((sum, e) => sum + e.amount, 0)
    }))

    if (data.length === 0) {
        return <div className="text-sm text-gray-500 dark:text-gray-400 mt-4">No expense history available.</div>
    }

    return (
        <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm w-full h-72 mt-8">
            <h2 className="text-md font-medium text-gray-800 dark:text-white mb-4">📈 Monthly Expense History</h2>
            <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={data}>
                    <XAxis dataKey='month' stroke='#888888' />
                    <YAxis stroke='#888888' />
                    <Tooltip formatter={(value: number | string) => `${Number(value).toLocaleString()} ฿`} contentStyle={{ backgroundColor: '#1f2937', color: '#fff', borderRadius: 8, border: 'none' }} labelStyle={{ color: '#cbd5e1' }} />
                    <Bar dataKey='expense' fill='#6366f1' />    
                </BarChart>
            </ResponsiveContainer>
        </div>
    )
}

export default ExpenseHistoryChart