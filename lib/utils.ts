// lib/utils.ts
import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Currency formatting
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('th-TH', {
    style: 'currency',
    currency: 'THB',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Number formatting
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('th-TH').format(num);
};

// Percentage formatting
export const formatPercentage = (num: number): string => {
  return `${Math.round(num * 10) / 10}%`;
};

// Date formatting
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('th-TH', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatDateShort = (date: string | Date): string => {
  return new Date(date).toLocaleDateString('th-TH', {
    month: 'short',
    day: 'numeric',
  });
};

// Progress calculations
export const calculateProgress = (current: number, target: number): number => {
  if (target === 0) return 0;
  return Math.min((current / target) * 100, 100);
};

export const calculateRemaining = (current: number, target: number): number => {
  return Math.max(target - current, 0);
};

// Time calculations
export const getDaysUntil = (date: string | Date): number => {
  const targetDate = new Date(date);
  const today = new Date();
  const diffTime = targetDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getMonthsUntil = (date: string | Date): number => {
  const targetDate = new Date(date);
  const today = new Date();
  const diffMonths = (targetDate.getFullYear() - today.getFullYear()) * 12 + (targetDate.getMonth() - today.getMonth());
  return Math.max(diffMonths, 0);
};

// Budget calculations
export const getBudgetStatus = (spent: number, budget: number): 'under' | 'on-track' | 'over' => {
  const percentage = (spent / budget) * 100;
  if (percentage <= 75) return 'under';
  if (percentage <= 100) return 'on-track';
  return 'over';
};

export const getBudgetStatusColor = (status: string): string => {
  switch (status) {
    case 'under':
      return 'text-green-600';
    case 'on-track':
      return 'text-yellow-600';
    case 'over':
      return 'text-red-600';
    default:
      return 'text-gray-600';
  }
};

// Debt calculations
export const calculateMinimumPayment = (balance: number, interestRate: number, months: number): number => {
  const monthlyRate = interestRate / 100 / 12;
  if (monthlyRate === 0) return balance / months;

  return (balance * monthlyRate * Math.pow(1 + monthlyRate, months)) / (Math.pow(1 + monthlyRate, months) - 1);
};

export const calculateInterestSaved = (balance: number, interestRate: number, extraPayment: number): number => {
  // Simplified calculation - actual implementation would be more complex
  const monthlyRate = interestRate / 100 / 12;
  return extraPayment * (1 + monthlyRate);
};

// Goal calculations
export const calculateMonthlyContribution = (current: number, target: number, months: number): number => {
  return Math.max((target - current) / months, 0);
};

export const getGoalProgress = (
  current: number,
  target: number
): {
  percentage: number;
  remaining: number;
  status: 'not-started' | 'in-progress' | 'almost-complete' | 'completed';
} => {
  const percentage = calculateProgress(current, target);
  const remaining = calculateRemaining(current, target);

  let status: 'not-started' | 'in-progress' | 'almost-complete' | 'completed';
  if (percentage === 0) status = 'not-started';
  else if (percentage >= 100) status = 'completed';
  else if (percentage >= 80) status = 'almost-complete';
  else status = 'in-progress';

  return { percentage, remaining, status };
};

// Validation helpers
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidAmount = (amount: number): boolean => {
  return amount > 0 && Number.isFinite(amount);
};

export const isValidDate = (date: string): boolean => {
  const parsedDate = new Date(date);
  return !isNaN(parsedDate.getTime()) && parsedDate > new Date();
};

// Color utilities
export const getColorFromString = (str: string): string => {
  const colors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-red-500',
    'bg-indigo-500',
    'bg-pink-500',
    'bg-teal-500',
    'bg-cyan-500',
  ];
  const hash = str.split('').reduce((a, b) => {
    a = (a << 5) - a + b.charCodeAt(0);
    return a & a;
  }, 0);
  return colors[Math.abs(hash) % colors.length];
};

// Local storage helpers
export const getFromStorage = <T>(key: string, defaultValue: T): T => {
  if (typeof window === 'undefined') return defaultValue;

  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

export const setToStorage = <T>(key: string, value: T): void => {
  if (typeof window === 'undefined') return;

  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};
