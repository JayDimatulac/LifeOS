export interface Expense {
  id: string;
  description: string;
  amount: number;
  category: string;
  date: string; // "YYYY-MM-DD"
}

export interface SavingsGoal {
  id: string;
  name: string;
  targetAmount: number;
  savedAmount: number;
}

export const EXPENSE_CATEGORIES = [
  "Food",
  "Transport",
  "Shopping",
  "Bills",
  "Entertainment",
  "Health",
  "Other",
] as const;
