'use client'

import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useGoalStore } from '@/stores/goalStore'
import GoalForm from '@/components/features/goal/GoalForm'
import GoalCard from '@/components/features/goal/GoalCard'

const GoalPage = () => {
    const goals = useGoalStore((s) => s.goals);

    return (
        <div className="space-y-2">
            <GoalForm />
            <h1 className="text-lg font-semibold text-gray-800 dark:text-white">🎯 Your Goals</h1>

            {goals.length === 0 ? (
                <p className="text-sm text-muted-foreground">No goals yet. Start by adding one above.</p>
            ) : (
                <div className="grid sm:grid-cols-2 gap-4">
                    <AnimatePresence>
                        {goals.map((goal) => (
                            <motion.div key={goal.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                                <GoalCard goal={goal} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>
            )}
        </div>
    )
}

export default GoalPage