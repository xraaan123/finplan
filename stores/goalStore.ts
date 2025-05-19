import { Goal } from '@/types/finance';
import { nanoid } from 'nanoid';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface GoalState {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  removeGoal: (id: string) => void;
  updateGoal: (id: string, updated: Partial<Goal>) => void;
  updateSaved: (id: string, amount: number) => void;
  getGoalById: (id: string) => Goal | undefined;
  clearGoals: () => void;
}

export const useGoalStore = create<GoalState>()(
  persist(
    (set, get) => ({
      goals: [],

      addGoal: (goal) =>
        set((state) => ({
          goals: [...state.goals, { id: nanoid(), ...goal }],
        })),

      removeGoal: (id) =>
        set((state) => ({
          goals: state.goals.filter((g) => g.id !== id),
        })),

      updateGoal: (id, updated) =>
        set((state) => ({
          goals: state.goals.map((g) => (g.id === id ? { ...g, ...updated } : g)),
        })),

      updateSaved: (id, amount) =>
        set((state) => ({
          goals: state.goals.map((g) => (g.id === id ? { ...g, saved: amount } : g)),
        })),

      getGoalById: (id) => get().goals.find((g) => g.id === id),

      clearGoals: () => set({ goals: [] }),
    }),
    { name: 'goal-storage' }
  )
);
