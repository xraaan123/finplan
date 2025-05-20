'use client'

import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { showInfo } from '@/lib/toastUtil';
import { useGoalStore } from '@/stores/goalStore';
import { Goal } from '@/types/finance'
import React from 'react'

interface Props {
    goal: Goal;
}

const GoalCard = ({ goal }: Props) => {
    const removeGoal = useGoalStore((s) => s.removeGoal);

    const percent = Math.min((goal.saved / goal.amount) * 100, 100).toFixed();

    return (
        <div className='bg-white dark:bg-gray-900 rounded-xl shadow p-4 space-y-3'>
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="text-lg font-medium text-gray-800 dark:text-white">{goal.name}</h3>
                    <p className="text-sm text-muted-foreground capitalize">{goal.category}</p>
                </div>
                <Button variant='outline' size='sm' onClick={() => { removeGoal(goal.id); showInfo(`Deleted goal: ${goal.name}`) }}>
                    ❌
                </Button>
            </div>

            <Progress value={+percent} />

            <div className="text-sm text-gray-600 dark:text-gray-400 text-right">
                {goal.saved.toLocaleString()} / {goal.amount.toLocaleString()} ฿
                <span className="ml-2 text-xs text-gray-400 dark:text-gray-500">({percent}%)</span>
            </div>

            <p className="text-xs text-gray-400 dark:text-gray-500 text-right">
                Target: {goal.targetDate}
            </p>
        </div>
    )
}

export default GoalCard