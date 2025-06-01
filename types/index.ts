export interface FinancialOverview {
  totalBalance: number;
  monthlyIncome: number;
  monthlyExpenses: number;
  totalDebt: number;
  savingsRate: number;
}

export interface BudgetCategory {
  id: string;
  category: string;
  spent: number;
  budget: number;
  color: string;
  icon?: string;
}

export interface Debt {
  id: string;
  name: string;
  balance: number;
  minPayment: number;
  interestRate: number;
  dueDate: string;
  type: 'credit_card' | 'loan' | 'mortgage' | 'other';
}

export interface Goal {
  id: string;
  name: string;
  current: number;
  target: number;
  deadline: string;
  color: string;
  category: 'emergency' | 'savings' | 'investment' | 'purchase' | 'debt_payoff';
  priority: 'high' | 'medium' | 'low';
}

export interface Notification {
  id: string;
  type: 'warning' | 'success' | 'info' | 'error';
  title: string;
  message: string;
  time: string;
  read: boolean;
  actionable?: boolean;
}

export interface Transaction {
  id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  type: 'income' | 'expense';
}

// Store interfaces
export interface BudgetStore {
  categories: BudgetCategory[];
  transactions: Transaction[];
  addCategory: (category: Omit<BudgetCategory, 'id'>) => void;
  updateCategory: (id: string, updates: Partial<BudgetCategory>) => void;
  deleteCategory: (id: string) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  getTotalSpent: (categoryId: string) => number;
  getBudgetProgress: (categoryId: string) => number;
}

export interface DebtStore {
  debts: Debt[];
  addDebt: (debt: Omit<Debt, 'id'>) => void;
  updateDebt: (id: string, updates: Partial<Debt>) => void;
  deleteDebt: (id: string) => void;
  makePayment: (id: string, amount: number) => void;
  getTotalDebt: () => number;
  getTotalMinPayment: () => number;
  getAverageInterestRate: () => number;
}

export interface GoalStore {
  goals: Goal[];
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  deleteGoal: (id: string) => void;
  addProgress: (id: string, amount: number) => void;
  getProgress: (id: string) => number;
  getTimeRemaining: (id: string) => number;
}

export interface NotificationStore {
  notifications: Notification[];
  addNotification: (notification: Omit<Notification, 'id'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
  getUnreadCount: () => number;
}
