import { Budget, Debt, Goal, MonthlyReport } from "@/types/finance";

export const mockBudget: Budget = {
  id: "budget-may",
  userId: "user-001",
  month: "2025-05",
  income: 33829.17,
  expenses: [
    { category: "rent", amount: 7500 },
    { category: "food", amount: 10600 },
    { category: "transport", amount: 2800 },
    { category: "debt", amount: 6095.35 },
    { category: "spending", amount: 3000 },
  ],
};

export const mockDebts: Debt[] = [
  {
    id: "debt-01",
    userId: "user-001",
    name: "ผ่อนมือถือ",
    amount: 18000,
    monthlyPayment: 6095.35,
    startMonth: "2025-05",
    endMonth: "2025-05",
  },
  {
    id: "debt-02",
    userId: "user-001",
    name: "ผ่อนเครื่องใช้ไฟฟ้า",
    amount: 9000,
    monthlyPayment: 3091.3,
    startMonth: "2025-06",
    endMonth: "2025-06",
  },
];

export const mockGoals: Goal[] = [
  {
    id: "goal-01",
    userId: "user-001",
    name: "ซื้อรถคันแรก",
    category: "car",
    amount: 300000,
    saved: 0,
    targetDate: "2026-12",
  },
  {
    id: "goal-02",
    userId: "user-001",
    name: "ทริปญี่ปุ่น",
    category: "travel",
    amount: 80000,
    saved: 5000,
    targetDate: "2026-03",
  },
];

export const mockReport: MonthlyReport = {
  month: "2025-05",
  totalIncome: 33829.17,
  totalExpense: 30000,
  netBalance: 3829.17,
  savingsRate: 11.3,
};
