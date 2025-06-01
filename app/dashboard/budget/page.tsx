// app/(dashboard)/budget/page.tsx
'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Edit, Trash2, TrendingUp, TrendingDown } from 'lucide-react';
import { useBudgetStore } from '@/stores/budget-store';
import { formatCurrency, getBudgetStatus } from '@/lib/utils';
import { slideUp, staggerContainer, cardHover } from '@/lib/animations';

const categoryIcons = {
    'Food & Dining': '🍽️',
    'Transportation': '🚗',
    'Entertainment': '🎬',
    'Shopping': '🛍️',
    'Bills & Utilities': '💡',
    'Healthcare': '🏥',
    'Education': '📚',
    'Travel': '✈️',
    'Other': '📦'
};

export default function BudgetPage() {
    const { categories, addCategory, updateCategory, deleteCategory } = useBudgetStore();
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        category: '',
        budget: '',
        color: 'bg-blue-500'
    });

    const totalBudget = categories.reduce((sum, cat) => sum + cat.budget, 0);
    const totalSpent = categories.reduce((sum, cat) => sum + cat.spent, 0);
    const remainingBudget = totalBudget - totalSpent;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingCategory) {
            updateCategory(editingCategory, {
                category: formData.category,
                budget: parseFloat(formData.budget),
                color: formData.color
            });
            setEditingCategory(null);
        } else {
            addCategory({
                category: formData.category,
                budget: parseFloat(formData.budget),
                spent: 0,
                color: formData.color
            });
        }

        setFormData({ category: '', budget: '', color: 'bg-blue-500' });
        setIsAddDialogOpen(false);
    };

    const handleEdit = (category: { id: string; category: string; budget: number; color: string; }) => {
        setFormData({
            category: category.category,
            budget: category.budget.toString(),
            color: category.color
        });
        setEditingCategory(category.id);
        setIsAddDialogOpen(true);
    };

    const getBudgetStatusColor = (spent: number, budget: number) => {
        const status = getBudgetStatus(spent, budget);
        switch (status) {
            case 'under': return 'text-green-600';
            case 'on-track': return 'text-yellow-600';
            case 'over': return 'text-red-600';
            default: return 'text-gray-600';
        }
    };

    const getBudgetStatusBadge = (spent: number, budget: number) => {
        const status = getBudgetStatus(spent, budget);
        switch (status) {
            case 'under': return <Badge variant="secondary" className="bg-green-100 text-green-800">Under Budget</Badge>;
            case 'on-track': return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">On Track</Badge>;
            case 'over': return <Badge variant="destructive">Over Budget</Badge>;
            default: return <Badge variant="outline">Unknown</Badge>;
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <motion.div
                className="flex justify-between items-center"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div>
                    <h1 className="text-3xl font-bold">Budget Plan</h1>
                    <p className="text-muted-foreground">
                        Manage your monthly budget and track spending
                    </p>
                </div>

                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="gap-2">
                            <Plus className="w-4 h-4" />
                            Add Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {editingCategory ? 'Edit Category' : 'Add New Category'}
                            </DialogTitle>
                        </DialogHeader>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <Label htmlFor="category">Category Name</Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {Object.keys(categoryIcons).map((cat) => (
                                            <SelectItem key={cat} value={cat}>
                                                <div className="flex items-center gap-2">
                                                    <span>{categoryIcons[cat as keyof typeof categoryIcons]}</span>
                                                    {cat}
                                                </div>
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            <div>
                                <Label htmlFor="budget">Monthly Budget</Label>
                                <Input
                                    id="budget"
                                    type="number"
                                    value={formData.budget}
                                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                                    placeholder="Enter budget amount"
                                    required
                                />
                            </div>

                            <div>
                                <Label>Color</Label>
                                <div className="flex gap-2 mt-2">
                                    {['bg-blue-500', 'bg-green-500', 'bg-purple-500', 'bg-orange-500', 'bg-red-500', 'bg-indigo-500'].map((color) => (
                                        <button
                                            key={color}
                                            type="button"
                                            className={`w-8 h-8 rounded-full ${color} ${formData.color === color ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
                                            onClick={() => setFormData({ ...formData, color })}
                                        />
                                    ))}
                                </div>
                            </div>

                            <div className="flex gap-2">
                                <Button type="submit" className="flex-1">
                                    {editingCategory ? 'Update' : 'Add'} Category
                                </Button>
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => {
                                        setIsAddDialogOpen(false);
                                        setEditingCategory(null);
                                        setFormData({ category: '', budget: '', color: 'bg-blue-500' });
                                    }}
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </DialogContent>
                </Dialog>
            </motion.div>

            {/* Budget Summary */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                <motion.div variants={slideUp}>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Budget</p>
                                    <p className="text-2xl font-bold">{formatCurrency(totalBudget)}</p>
                                </div>
                                <div className="p-3 rounded-lg bg-blue-100 dark:bg-blue-900">
                                    <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={slideUp}>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                                    <p className="text-2xl font-bold">{formatCurrency(totalSpent)}</p>
                                    <p className={`text-sm mt-1 ${getBudgetStatusColor(totalSpent, totalBudget)}`}>
                                        {Math.round((totalSpent / totalBudget) * 100)}% of budget
                                    </p>
                                </div>
                                <div className="p-3 rounded-lg bg-orange-100 dark:bg-orange-900">
                                    <TrendingDown className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                <motion.div variants={slideUp}>
                    <Card>
                        <CardContent className="p-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-medium text-muted-foreground">Remaining</p>
                                    <p className={`text-2xl font-bold ${remainingBudget >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                                        {formatCurrency(remainingBudget)}
                                    </p>
                                </div>
                                <div className={`p-3 rounded-lg ${remainingBudget >= 0 ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
                                    <TrendingUp className={`w-6 h-6 ${remainingBudget >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} />
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </motion.div>

            {/* Budget Categories */}
            <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                variants={staggerContainer}
                initial="initial"
                animate="animate"
            >
                {categories.map((category) => (
                    <motion.div
                        key={category.id}
                        variants={cardHover}
                        initial="initial"
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <Card className="cursor-pointer">
                            <CardHeader className="pb-3">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-4 h-4 rounded-full ${category.color}`} />
                                        <div>
                                            <CardTitle className="text-lg">
                                                {categoryIcons[category.category as keyof typeof categoryIcons]} {category.category}
                                            </CardTitle>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {getBudgetStatusBadge(category.spent, category.budget)}
                                        <div className="flex gap-1">
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => handleEdit(category)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => deleteCategory(category.id)}
                                                className="text-red-500 hover:text-red-700"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="flex justify-between items-center">
                                    <div className="text-sm text-muted-foreground">
                                        Spent: <span className="font-medium text-foreground">{formatCurrency(category.spent)}</span>
                                    </div>
                                    <div className="text-sm text-muted-foreground">
                                        Budget: <span className="font-medium text-foreground">{formatCurrency(category.budget)}</span>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Progress
                                        value={Math.min((category.spent / category.budget) * 100, 100)}
                                        className="h-3"
                                    />
                                    <div className="flex justify-between text-sm">
                                        <span className={getBudgetStatusColor(category.spent, category.budget)}>
                                            {Math.round((category.spent / category.budget) * 100)}% used
                                        </span>
                                        <span className="font-medium">
                                            {formatCurrency(Math.max(category.budget - category.spent, 0))} remaining
                                        </span>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <Button variant="outline" size="sm" className="w-full">
                                        View Transactions
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </motion.div>

            {/* Empty State */}
            {categories.length === 0 && (
                <motion.div
                    className="text-center py-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                >
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                        <Plus className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">No budget categories yet</h3>
                    <p className="text-muted-foreground mb-4">
                        Start by adding your first budget category to track your spending.
                    </p>
                    <Button onClick={() => setIsAddDialogOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Add Your First Category
                    </Button>
                </motion.div>
            )}
        </div>
    );
}