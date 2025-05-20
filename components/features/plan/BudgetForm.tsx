'use client'

import ExpenseChart from '@/components/charts/ExpenseChart';
import ClientOnly from '@/components/shared/ClientOnly';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { showSuccess } from '@/lib/toastUtil';
import { useBudgetStore } from '@/stores/budgetStore';
import { ExpenseCategory } from '@/types/finance'
import React, { useEffect, useState } from 'react'

const categories: ExpenseCategory[] = ['rent', 'food', 'transport', 'debt', 'spending', 'saving'];

const BudgetForm = () => {
    const selectedMonth = useBudgetStore((s) => s.selectedMonth);
    const getBudgetForMonth = useBudgetStore((s) => s.getBudgetForMonth);
    const setBudget = useBudgetStore((s) => s.setBudget);
    const budget = getBudgetForMonth(selectedMonth);
    const [income, setIncome] = useState(budget?.income ?? 0);
    const [expenseInput, setExpenseInput] = useState<{ [key: string]: number }>({});
    const data = budget?.expenses ?? [];

    useEffect(() => {
        setIncome(budget?.income ?? 0);
        const initial: { [key: string]: number } = {};
        budget?.expenses.forEach((e) => (initial[e.category] = e.amount));
        setExpenseInput(initial);
    }, [budget])

    const totalExpense = Object.values(expenseInput).reduce((sum, amt) => sum + (amt || 0), 0);
    const netBalance = income - totalExpense;

    const handleSave = () => {
        const newBudget = {
            id: `budget-${selectedMonth}`,
            userId: 'user-001',
            month: selectedMonth,
            income,
            expenses: categories.map((c) => ({
                category: c,
                amount: expenseInput[c] || 0
            })),
        };
        setBudget(newBudget);
        showSuccess('Budget saved successfully!');
    }

    return (
        <div className='bg-white dark:bg-gray-900 rounded-xl shadow p-6 space-y-6'>
            <div className="space-y-2">
                <Label htmlFor='income'>Monthly income</Label>
                <Input id='income' type='number' value={income} onChange={(e) => setIncome(+e.target.value)} />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {categories.map((cat) => (
                    <div key={cat} className="space-y-2">
                        <Label htmlFor={cat}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</Label>
                        <Input id={cat} type='number' value={expenseInput[cat] ?? ''} onChange={(e) => setExpenseInput((prev) => ({ ...prev, [cat]: +e.target.value }))} />
                    </div>
                ))}
            </div>

            <div className="text-right text-sm text-gray-600 dark:text-gray-400 space-y-1">
                <ClientOnly>
                    <p>Total expenses: <strong>{totalExpense.toLocaleString()} ฿</strong></p>
                </ClientOnly>
                <ClientOnly>
                    <p>Net balance: <strong>{netBalance.toLocaleString()} ฿</strong></p>
                </ClientOnly>
            </div>

            <Button onClick={handleSave} className='w-full sm:w-auto'>
                💾 Save Budget
            </Button>

            <ClientOnly>
                <ExpenseChart data={data} />
            </ClientOnly>
        </div>
    )
}

export default BudgetForm