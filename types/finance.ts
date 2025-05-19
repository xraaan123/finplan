export type ExpenseCategory =
  | "rent"
  | "food"
  | "transport"
  | "debt"
  | "saving"
  | "spending";

export interface Budget {
  id: string;
  userId: string;
  month: string;
  income: number;
  expenses: {
    category: ExpenseCategory;
    amount: number;
  }[];
}

export interface Debt {
  id: string;
  userId: string;
  name: string;
  amount: number;
  monthlyPayment: number;
  startMonth: string;
  endMonth: string;
}

export type GoalCategory = "travel" | "car" | "education" | "saving" | "other";

export interface Goal {
  id: string;
  name: string;
  userId: string;
  amount: number;
  saved: number;
  targetDate: string;
  category: GoalCategory;
}

export interface MonthlyReport {
  month: string;
  totalIncome: number;
  totalExpense: number;
  netBalance: number;
  savingsRate: number;
}

export type NotificationType = "success" | "error" | "info" | "warning";

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: Notification;
  createdAt: string;
  read: boolean;
}
