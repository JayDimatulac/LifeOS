import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { Expense, SavingsGoal } from "./types";

interface FinanceState {
  expenses: Expense[];
  monthlyBudget: number;
  goals: SavingsGoal[];
  addExpense: (
    description: string,
    amount: number,
    category: string,
    date: string,
  ) => void;
  removeExpense: (id: string) => void;
  setMonthlyBudget: (amount: number) => void;
  addGoal: (name: string, targetAmount: number) => void;
  addFunds: (id: string, amount: number) => void;
  removeGoal: (id: string) => void;
}

export const useFinanceStore = create<FinanceState>()(
  persist(
    (set) => ({
      expenses: [],
      monthlyBudget: 0,
      goals: [],

      addExpense: (description, amount, category, date) =>
        set((state) => ({
          expenses: [
            ...state.expenses,
            { id: crypto.randomUUID(), description, amount, category, date },
          ],
        })),

      removeExpense: (id) =>
        set((state) => ({
          expenses: state.expenses.filter((e) => e.id !== id),
        })),

      setMonthlyBudget: (amount) => set({ monthlyBudget: Math.max(0, amount) }),

      addGoal: (name, targetAmount) =>
        set((state) => ({
          goals: [
            ...state.goals,
            { id: crypto.randomUUID(), name, targetAmount, savedAmount: 0 },
          ],
        })),

      addFunds: (id, amount) =>
        set((state) => ({
          goals: state.goals.map((g) =>
            g.id === id
              ? {
                  ...g,
                  savedAmount: Math.min(g.targetAmount, g.savedAmount + amount),
                }
              : g,
          ),
        })),

      removeGoal: (id) =>
        set((state) => ({ goals: state.goals.filter((g) => g.id !== id) })),
    }),
    { name: "lifeos-finance" },
  ),
);
