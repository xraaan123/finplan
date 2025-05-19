'use client'

import ClientOnly from '@/components/shared/ClientOnly'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useBudgetStore } from '@/stores/budgetStore'
import { useDebtStore } from '@/stores/debtStore'
import { useGoalStore } from '@/stores/goalStore'
import { motion } from 'framer-motion'

const fadeVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (i: number) => ({ 
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.4 }
    })
}

const DashboardSummary = () => {
    const selectedMonth = useBudgetStore((s) => s.selectedMonth);
    const getBudgetForMonth = useBudgetStore((s) => s.getBudgetForMonth);
    const budget = getBudgetForMonth(selectedMonth);
    const debts = useDebtStore((s) => s.debts);
    const goals = useGoalStore((s) => s.goals);

    const totalExpenses = budget?.expenses.reduce((sum, e) => sum + e.amount, 0) ?? 0;
    const netBalance = (budget?.income ?? 0) - totalExpenses;

    const cards = [
        { title: 'Total Income', value: budget?.income ?? 0 },
        { title: 'Total Expenses', value: totalExpenses },
        { title: 'Net Balance', value: netBalance, highlight: true },
        { title: 'Active Debts', value: debts.length },
        { title: 'Goals Created', value: goals.length },
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {cards.map((card, i) => (
                <motion.div key={card.title} custom={i} initial="hidden" animate="visible" variants={fadeVariants}>
                    <Card>
                        <CardHeader>
                            <CardTitle className='text-sm text-gray-600 dark:text-gray-400'>{card.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ClientOnly>
                                <p className="text-2xl font-semibold text-gray-900 dark:text-white">
                                    {card.value.toLocaleString()} ฿
                                </p>
                            </ClientOnly>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </div>
    )
}

export default DashboardSummary