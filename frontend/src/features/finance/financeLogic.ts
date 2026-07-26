import { dateKey } from "@/utils/date";
import type { Expense } from "./types";

export function totalForDay(expenses: Expense[], day: string): number {
  return expenses
    .filter((e) => e.date === day)
    .reduce((sum, e) => sum + e.amount, 0);
}

export function currentMonthPrefix(): string {
  return dateKey(new Date()).slice(0, 7); // "YYYY-MM"
}

export function totalForMonth(
  expenses: Expense[],
  monthPrefix: string,
): number {
  return expenses
    .filter((e) => e.date.startsWith(monthPrefix))
    .reduce((sum, e) => sum + e.amount, 0);
}

/** Most recent expenses first. */
export function sortedExpenses(expenses: Expense[]): Expense[] {
  return [...expenses].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function formatCurrency(amount: number): string {
  return `₱${amount.toLocaleString(undefined, { maximumFractionDigits: 2 })}`;
}
