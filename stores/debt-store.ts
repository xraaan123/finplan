// stores/debt-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DebtStore, Debt } from '@/types';
import { nanoid } from 'nanoid';

const initialDebts: Debt[] = [
  {
    id: '1',
    name: 'Credit Card',
    balance: 25000,
    minPayment: 1200,
    interestRate: 18,
    dueDate: '2025-06-05',
    type: 'credit_card',
  },
  {
    id: '2',
    name: 'Car Loan',
    balance: 45000,
    minPayment: 8500,
    interestRate: 5.5,
    dueDate: '2025-06-15',
    type: 'loan',
  },
  {
    id: '3',
    name: 'Personal Loan',
    balance: 15000,
    minPayment: 2800,
    interestRate: 12,
    dueDate: '2025-06-20',
    type: 'loan',
  },
];

export const useDebtStore = create<DebtStore>()(
  persist(
    (set, get) => ({
      debts: initialDebts,

      addDebt: (debt) => {
        const newDebt: Debt = {
          ...debt,
          id: nanoid(),
        };
        set((state) => ({
          debts: [...state.debts, newDebt],
        }));
      },

      updateDebt: (id, updates) => {
        set((state) => ({
          debts: state.debts.map((debt) => (debt.id === id ? { ...debt, ...updates } : debt)),
        }));
      },

      deleteDebt: (id) => {
        set((state) => ({
          debts: state.debts.filter((debt) => debt.id !== id),
        }));
      },

      makePayment: (id, amount) => {
        const debt = get().debts.find((d) => d.id === id);
        if (debt && amount > 0) {
          const newBalance = Math.max(debt.balance - amount, 0);
          get().updateDebt(id, { balance: newBalance });

          // If debt is fully paid, remove it
          if (newBalance === 0) {
            get().deleteDebt(id);
          }
        }
      },

      getTotalDebt: () => {
        return get().debts.reduce((total, debt) => total + debt.balance, 0);
      },

      getTotalMinPayment: () => {
        return get().debts.reduce((total, debt) => total + debt.minPayment, 0);
      },

      getAverageInterestRate: () => {
        const debts = get().debts;
        if (debts.length === 0) return 0;

        const totalInterest = debts.reduce((sum, debt) => sum + debt.interestRate, 0);
        return Math.round((totalInterest / debts.length) * 10) / 10;
      },
    }),
    {
      name: 'finplan-debt-store',
      version: 1,
    }
  )
);
