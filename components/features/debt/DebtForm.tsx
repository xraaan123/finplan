'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { showSuccess } from '@/lib/toastUtil';
import { useDebtStore } from '@/stores/debtStore'
import React, { useState } from 'react'

const DebtForm = () => {
    const addDebt = useDebtStore((s) => s.addDebt);
    const [form, setForm] = useState({
        name: '',
        amount: 0,
        monthlyPayment: 0,
        startMonth: '2025-05',
        endMonth: '2025-12'
    })

    const handleSubmit = () => {
        if (!form.name || form.amount <= 0 || form.monthlyPayment <= 0) return;

        addDebt({ userId: 'user-001', ...form });
        showSuccess('Debt added successfully!');
        setForm({ name: '', amount: 0, monthlyPayment: 0, startMonth: '2025-06', endMonth: '2025-12' });
    }

    return (
        <div className='bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md space-y-6'>
            <div className="grid sm:grid-cols-2 gap-6">
                <div>
                    <Label htmlFor='name'>Debt name</Label>
                    <Input id='name' placeholder='e.g. Car loan' value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} />
                </div>
                <div>
                    <Label htmlFor='amount'>Principal amount (THB)</Label>
                    <Input id='amount' type='number' value={form.amount} onChange={(e) => setForm((f) => ({ ...f, amount: +e.target.value }))} />
                </div>
                <div>
                    <Label htmlFor='monthly'>Monthly payment (THB)</Label>
                    <Input id='monthly' type='number' value={form.monthlyPayment} onChange={(e) => setForm((f) => ({ ...f, monthlyPayment: +e.target.value }))} />
                </div>
                <div>
                    <Label htmlFor='start'>Start month</Label>
                    <Input id='start' type='month' value={form.startMonth} onChange={(e) => setForm((f) => ({ ...f, startMonth: e.target.value }))} />
                </div>
                <div>
                    <Label htmlFor='end'>End month</Label>
                    <Input id='end' type='month' value={form.endMonth} onChange={(e) => setForm((f) => ({ ...f, endMonth: e.target.value }))} />
                </div>
            </div>

            <Button onClick={handleSubmit} className='w-full sm:w-auto'>➕ Add Debt</Button>
        </div>
    )
}

export default DebtForm