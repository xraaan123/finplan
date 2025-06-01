// stores/budget-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { BudgetStore, BudgetCategory, Transaction } from '@/types';
import { nanoid } from 'nanoid';

const initialCategories: BudgetCategory[] = [
  {
    id: '1',
    category: 'Food & Dining',
    spent: 8500,
    budget: 10000,
    color: 'bg-blue-500',
    icon: '🍽️',
  },
  {
    id: '2',
    category: 'Transportation',
    spent: 6200,
    budget: 8000,
    color: 'bg-green-500',
    icon: '🚗',
  },
  {
    id: '3',
    category: 'Entertainment',
    spent: 3800,
    budget: 4000,
    color: 'bg-purple-500',
    icon: '🎬',
  },
  {
    id: '4',
    category: 'Shopping',
    spent: 5200,
    budget: 5000,
    color: 'bg-orange-500',
    icon: '🛍️',
  },
  {
    id: '5',
    category: 'Bills & Utilities',
    spent: 8300,
    budget: 9000,
    color: 'bg-red-500',
    icon: '💡',
  },
];

export const useBudgetStore = create<BudgetStore>()(
  persist(
    (set, get) => ({
      categories: initialCategories,
      transactions: [],

      addCategory: (category) => {
        const newCategory: BudgetCategory = {
          ...category,
          id: nanoid(),
        };
        set((state) => ({
          categories: [...state.categories, newCategory],
        }));
      },

      updateCategory: (id, updates) => {
        set((state) => ({
          categories: state.categories.map((category) => (category.id === id ? { ...category, ...updates } : category)),
        }));
      },

      deleteCategory: (id) => {
        set((state) => ({
          categories: state.categories.filter((category) => category.id !== id),
        }));
      },

      addTransaction: (transaction) => {
        const newTransaction: Transaction = {
          ...transaction,
          id: nanoid(),
        };
        set((state) => ({
          transactions: [...state.transactions, newTransaction],
        }));

        // Update category spent amount if it's an expense
        if (transaction.type === 'expense') {
          const category = get().categories.find((cat) => cat.category === transaction.category);
          if (category) {
            get().updateCategory(category.id, {
              spent: category.spent + transaction.amount,
            });
          }
        }
      },

      getTotalSpent: (categoryId) => {
        const category = get().categories.find((cat) => cat.id === categoryId);
        return category?.spent || 0;
      },

      getBudgetProgress: (categoryId) => {
        const category = get().categories.find((cat) => cat.id === categoryId);
        if (!category) return 0;
        return Math.min((category.spent / category.budget) * 100, 100);
      },
    }),
    {
      name: 'finplan-budget-store',
      version: 1,
    }
  )
);
