'use client'

import React, { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { GoalCategory } from '@/types/finance'
import { useGoalStore } from '@/stores/goalStore';
import { showSuccess } from '@/lib/toastUtil';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format } from 'date-fns';

const categories: GoalCategory[] = ['travel', 'car', 'education', 'saving', 'other'];

const GoalForm = () => {
    const addGoal = useGoalStore((s) => s.addGoal);
    const [name, setName] = useState('');
    const [amount, setAmount] = useState<number>(0);
    const [saved, setSaved] = useState<number>(0);
    const [targetDate, setTargetDate] = useState<Date | undefined>();
    const [category, setCategory] = useState<GoalCategory>('other');
    const [popoverOpen, setPopoverOpen] = useState(false);

    const handleSubmit = () => {
        if (!name || amount <= 0 || !targetDate) return;

        addGoal({ name, amount, saved, userId: 'user-001', targetDate: targetDate ? format(targetDate, 'yyyy-MM-dd') : '', category });
        showSuccess('Goal added successfully!');
        setName('');
        setAmount(0);
        setSaved(0);
        setTargetDate(undefined);
        setCategory('other');
    }

    return (
        <div className='bg-white dark:bg-gray-900 p-6 rounded-xl shadow space-y-4'>
            <h2 className="text-xl font-semibold text-grary-800 dark:text-white">➕ Add Goal</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <Label htmlFor='name'>Name</Label>
                    <Input id='name' value={name} onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                    <Label htmlFor='category'>Category</Label>
                    <Select value={category} onValueChange={(val) => setCategory(val as GoalCategory)}>
                        <SelectTrigger>
                            <SelectValue placeholder='Select' />
                        </SelectTrigger>
                        <SelectContent>
                            {categories.map((c) => (
                                <SelectItem key={c} value={c}>
                                    {c.charAt(0).toUpperCase() + c.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label htmlFor='amount'>Goal Amount</Label>
                    <Input id='amount' type='number' value={amount} onChange={(e) => setAmount(+e.target.value)} />
                </div>

                <div>
                    <Label htmlFor='saved'>Saved</Label>
                    <Input id='saved' type='number' value={saved} onChange={(e) => setSaved(+e.target.value)} />
                </div>

                <div>
                    <Label htmlFor='targetDate'>Target Date</Label>
                    <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
                        <PopoverTrigger asChild>
                            <Button variant='outline' className={cn('w-full justify-start text-left font-normal bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-300', !targetDate && 'text-muted-foreground')}>
                                <CalendarIcon className='mr-2 h-4 w-4' />
                                {targetDate ? format(targetDate, 'PPP') : <span>Select date</span>}
                            </Button>
                        </PopoverTrigger>
                        <AnimatePresence>
                            {popoverOpen && (
                                <PopoverContent asChild className='w-auto p-0 mt-2' align='start'>
                                    <motion.div initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.15, ease: 'easeOut' }}>
                                        <Calendar mode='single' selected={targetDate} onSelect={(date: Date | undefined) => { setTargetDate(date); setPopoverOpen(false); }} initialFocus />
                                    </motion.div>
                                </PopoverContent>
                            )}
                        </AnimatePresence>
                    </Popover>
                </div>
            </div>

            <div className="text-right">
                <Button onClick={handleSubmit}>💾 Save Goal</Button>
            </div>
        </div>
    )
}

export default GoalForm