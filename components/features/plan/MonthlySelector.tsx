'use client'

import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useBudgetStore } from '@/stores/budgetStore';
import React from 'react'

const months = ['2025-05', '2025-06', '2025-07', '2025-08', '2025-09'];

function formatMonth(m: string) {
    return new Date(m + '-01').toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
    })
}

const MonthlySelector = () => {
    const selectedMonth = useBudgetStore((s) => s.selectedMonth);
    const setSelectedMonth = useBudgetStore((s) => s.setSelectedMonth);

  return (
    <div className='space-y-2'>
        <Label>Select Month</Label>
        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className='w-[240px] text-gray-700 dark:text-gray-300'>
                <SelectValue placeholder='Select a month' />
            </SelectTrigger>
            <SelectContent>
                {months.map((m) => (
                    <SelectItem key={m} value={m}>
                        {formatMonth(m)}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    </div>
  )
}

export default MonthlySelector