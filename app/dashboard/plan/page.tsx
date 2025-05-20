'use client'

import React from 'react'
import { motion } from 'framer-motion'
import MonthlySelector from '@/components/features/plan/MonthlySelector'
import BudgetForm from '@/components/features/plan/BudgetForm'
import ExpenseHistoryChart from '@/components/charts/ExpenseHistoryChart'

const PlanPage = () => {
    return (
        <motion.div className="p-6 space-y-4" initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.15 } } }}>
            <motion.h1 className="text-2xl font-semibold text-gray-900 dark:text-white" initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>📝 Monthly Budget Planner</motion.h1>
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                <MonthlySelector />
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4 }}>
                <BudgetForm />
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.4, delay: 0.1 }}>
                <ExpenseHistoryChart />
            </motion.div>
        </motion.div>
    )
}

export default PlanPage