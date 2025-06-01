// stores/goal-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { GoalStore, Goal } from '@/types';
import { nanoid } from 'nanoid';

const initialGoals: Goal[] = [
  {
    id: '1',
    name: 'Emergency Fund',
    current: 40000,
    target: 50000,
    deadline: '2025-12-31',
    color: 'bg-blue-500',
    category: 'emergency',
    priority: 'high',
  },
  {
    id: '2',
    name: 'New Car',
    current: 180000,
    target: 300000,
    deadline: '2026-06-30',
    color: 'bg-green-500',
    category: 'purchase',
    priority: 'medium',
  },
  {
    id: '3',
    name: 'Vacation Fund',
    current: 12000,
    target: 25000,
    deadline: '2025-10-15',
    color: 'bg-purple-500',
    category: 'savings',
    priority: 'low',
  },
];

export const useGoalStore = create<GoalStore>()(
  persist(
    (set, get) => ({
      goals: initialGoals,

      addGoal: (goal) => {
        const newGoal: Goal = {
          ...goal,
          id: nanoid(),
        };
        set((state) => ({
          goals: [...state.goals, newGoal],
        }));
      },

      updateGoal: (id, updates) => {
        set((state) => ({
          goals: state.goals.map((goal) => (goal.id === id ? { ...goal, ...updates } : goal)),
        }));
      },

      deleteGoal: (id) => {
        set((state) => ({
          goals: state.goals.filter((goal) => goal.id !== id),
        }));
      },

      addProgress: (id, amount) => {
        const goal = get().goals.find((g) => g.id === id);
        if (goal && amount > 0) {
          const newCurrent = Math.min(goal.current + amount, goal.target);
          get().updateGoal(id, { current: newCurrent });
        }
      },

      getProgress: (id) => {
        const goal = get().goals.find((g) => g.id === id);
        if (!goal) return 0;
        return Math.min((goal.current / goal.target) * 100, 100);
      },

      getTimeRemaining: (id) => {
        const goal = get().goals.find((g) => g.id === id);
        if (!goal) return 0;

        const targetDate = new Date(goal.deadline);
        const today = new Date();
        const diffTime = targetDate.getTime() - today.getTime();
        return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      },
    }),
    {
      name: 'finplan-goal-store',
      version: 1,
    }
  )
);
