// app/(dashboard)/page.tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Plus, Wallet, TrendingUp, CreditCard, Target, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useBudgetStore } from '@/stores/budget-store';
// import { useDebtStore } from '@/stores/debt-store';
import { useGoalStore } from '@/stores/goal-store';
import { formatCurrency, calculateProgress } from '@/lib/utils';
import { fadeIn, slideUp, staggerContainer } from '@/lib/animations';

interface StatCardProps {
    title: string;
    value: string;
    change?: string;
    trend?: 'up' | 'down';
    icon: React.ComponentType<{ className?: string }>;
}

const financialOverview = {
    totalBalance: 125000,
    monthlyIncome: 45000,
    monthlyExpenses: 32000,
    totalDebt: 85000,
    savingsRate: 28.9
};

const StatCard = ({ title, value, change, trend, icon: Icon }: StatCardProps) => (
    <motion.div variants={slideUp}>
        <Card className="hover:shadow-lg transition-shadow duration-200">
            <CardContent className="p-6">
                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <p className="text-2xl font-bold mt-1">{value}</p>
                        {change && (
                            <div className={`flex items-center mt-2 text-sm ${trend === 'up' ? 'text-green-500' : 'text-red-500'
                                }`}>
                                {trend === 'up' ? (
                                    <ArrowUpRight className="w-4 h-4 mr-1" />
                                ) : (
                                    <ArrowDownRight className="w-4 h-4 mr-1" />
                                )}
                                <span>{change}</span>
                            </div>
                        )}
                    </div>
                    <div className="p-3 rounded-lg bg-muted">
                        <Icon className="w-6 h-6 text-muted-foreground" />
                    </div>
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

export default function DashboardPage() {
    const { categories } = useBudgetStore();
    // const { getTotalDebt } = useDebtStore();
    const { goals } = useGoalStore();

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                className="flex justify-between items-center"
                variants={fadeIn}
                initial="initial"
                animate="animate"
            >
                <div>
                    <h1 className="text-3xl font-bold">Financial Overview</h1>
                    <p className="text-muted-foreground">
                        Track your financial health and progress
                    </p>
                </div>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    Add Transaction
                </Button>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                <StatCard
                    title="Total Balance"
                    value={formatCurrency(financialOverview.totalBalance)}
                    change="+5.2%"
                    trend="up"
                    icon={Wallet}
                />
                <StatCard
                    title="Monthly Income"
                    value={formatCurrency(financialOverview.monthlyIncome)}
                    change="+2.1%"
                    trend="up"
                    icon={TrendingUp}
                />
                <StatCard
                    title="Monthly Expenses"
                    value={formatCurrency(financialOverview.monthlyExpenses)}
                    change="-3.5%"
                    trend="down"
                    icon={CreditCard}
                />
                <StatCard
                    title="Savings Rate"
                    value={`${financialOverview.savingsRate}%`}
                    change="+1.2%"
                    trend="up"
                    icon={Target}
                />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Budget Overview */}
                <motion.div variants={slideUp}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                This Month&apos;s Budget
                                <Button variant="outline" size="sm" asChild>
                                    <a href="/dashboard/budget">View All</a>
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {categories.slice(0, 3).map((category) => (
                                <div key={category.id} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className={`w-3 h-3 rounded-full ${category.color}`}
                                            />
                                            <span className="font-medium">{category.category}</span>
                                        </div>
                                        <Badge variant={category.spent <= category.budget ? "default" : "destructive"}>
                                            {category.spent <= category.budget ? 'On Track' : 'Over Budget'}
                                        </Badge>
                                    </div>
                                    <div className="space-y-1">
                                        <div className="flex justify-between text-sm text-muted-foreground">
                                            <span>{formatCurrency(category.spent)}</span>
                                            <span>{formatCurrency(category.budget)}</span>
                                        </div>
                                        <Progress
                                            value={Math.min((category.spent / category.budget) * 100, 100)}
                                            className="h-2"
                                        />
                                    </div>
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Goals Progress */}
                <motion.div variants={slideUp}>
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center justify-between">
                                Goal Progress
                                <Button variant="outline" size="sm" asChild>
                                    <a href="/dashboard/goals">View All</a>
                                </Button>
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {goals.slice(0, 3).map((goal) => (
                                <div key={goal.id} className="space-y-2">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="font-medium">{goal.name}</div>
                                            <div className="text-sm text-muted-foreground">
                                                {formatCurrency(goal.current)} / {formatCurrency(goal.target)}
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="font-semibold">
                                                {Math.round(calculateProgress(goal.current, goal.target))}%
                                            </div>
                                            <Badge variant="outline" className="text-xs">
                                                {calculateProgress(goal.current, goal.target) >= 100 ? 'Completed!' : 'In Progress'}
                                            </Badge>
                                        </div>
                                    </div>
                                    <Progress
                                        value={calculateProgress(goal.current, goal.target)}
                                        className="h-2"
                                    />
                                </div>
                            ))}
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Quick Actions */}
            <motion.div variants={slideUp}>
                <Card>
                    <CardHeader>
                        <CardTitle>Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <Button variant="outline" className="h-20 flex-col gap-2">
                                <Plus className="w-6 h-6" />
                                Add Expense
                            </Button>
                            <Button variant="outline" className="h-20 flex-col gap-2">
                                <TrendingUp className="w-6 h-6" />
                                Add Income
                            </Button>
                            <Button variant="outline" className="h-20 flex-col gap-2">
                                <CreditCard className="w-6 h-6" />
                                Pay Debt
                            </Button>
                            <Button variant="outline" className="h-20 flex-col gap-2">
                                <Target className="w-6 h-6" />
                                Add to Goal
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}