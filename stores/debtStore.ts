import { Debt } from '@/types/finance';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { nanoid } from 'nanoid';

interface DebtState {
  debts: Debt[];

  addDebt: (debt: Omit<Debt, 'id'>) => void;
  removeDebt: (id: string) => void;
  getMonthlyTotal: (month: string) => void;
  clearDebts: () => void;
}

export const useDebtStore = create<DebtState>()(
  persist(
    (set, get) => ({
      debts: [],

      addDebt: (debt) => {
        const newDebt: Debt = { id: nanoid(), ...debt };
        set((state) => ({
          debts: [...state.debts, newDebt],
        }));
      },

      removeDebt: (id) =>
        set((state) => ({
          debts: state.debts.filter((d) => d.id !== id),
        })),

      getMonthlyTotal: (month) =>
        get()
          .debts.filter((d) => d.startMonth <= month && d.endMonth >= month)
          .reduce((sum, d) => sum + d.monthlyPayment, 0),

      clearDebts: () => set({ debts: [] }),
    }),
    { name: 'debt-storage' }
  )
);
