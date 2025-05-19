import { Budget, ExpenseCategory } from '@/types/finance';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface BudgetState {
  budgets: Budget[];
  selectedMonth: string;

  setBudget: (data: Budget) => void;
  getBudgetForMonth: (month: string) => Budget | undefined;
  updatedExpense: (category: ExpenseCategory, amount: number) => void;

  setSelectedMonth: (month: string) => void;
  clearBudget: () => void;
}

export const useBudgetStore = create<BudgetState>()(
  persist(
    (set, get) => ({
      budgets: [],
      selectedMonth: '2025-05',

      setSelectedMonth: (month) => set({ selectedMonth: month }),

      getBudgetForMonth: (month) => get().budgets.find((b) => b.month === month),

      setBudget: (newBudget: Budget) =>
        set((state) => {
          const existingIndex = state.budgets.findIndex((b) => b.month === newBudget.month);
          const updatedBudgets =
            existingIndex !== -1
              ? [...state.budgets.slice(0, existingIndex), newBudget, ...state.budgets.slice(existingIndex + 1)]
              : [...state.budgets, newBudget];
          return { budgets: updatedBudgets };
        }),

      updatedExpense: (category, amount) =>
        set((state) => {
          const month = state.selectedMonth;
          const current = state.budgets.find((b) => b.month === month);
          if (!current) return state;

          const updatedExpenses = [...current.expenses];
          const idx = updatedExpenses.findIndex((e) => e.category === category);
          if (idx >= 0) updatedExpenses[idx].amount = amount;
          else updatedExpenses.push({ category, amount });

          const updatedBudget: Budget = {
            ...current,
            expenses: updatedExpenses,
          };

          const otherBudgets = state.budgets.filter((b) => b.month !== month);
          return { budgets: [...otherBudgets, updatedBudget] };
        }),

      clearBudget: () => set({ budgets: [] }),
    }),
    {
      name: 'budget-multimonth-storage',
    }
  )
);
