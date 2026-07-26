import type { Habit } from "@/features/habits/types";
import type { Expense } from "@/features/finance/types";
import type { JournalEntry } from "@/features/journal/types";

export interface HabitConsistencyPoint {
  day: string;
  percent: number;
}

/** % of all habits completed on each of the given days. */
export function habitConsistency(
  habits: Habit[],
  days: string[],
): HabitConsistencyPoint[] {
  return days.map((day) => {
    const total = habits.length;
    const done = habits.filter((h) => h.history[day]).length;
    const percent = total > 0 ? Math.round((done / total) * 100) : 0;
    const label = new Date(`${day}T00:00:00`).toLocaleDateString([], {
      weekday: "short",
    });
    return { day: label, percent };
  });
}

export interface CategorySpend {
  category: string;
  amount: number;
}

/** Expense totals grouped by category for the given "YYYY-MM" month, largest first. */
export function spendByCategory(
  expenses: Expense[],
  monthPrefix: string,
): CategorySpend[] {
  const filtered = expenses.filter((e) => e.date.startsWith(monthPrefix));
  const totals = new Map<string, number>();
  for (const e of filtered) {
    totals.set(e.category, (totals.get(e.category) ?? 0) + e.amount);
  }
  return Array.from(totals.entries())
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);
}

export interface HealthPoint {
  day: string;
  water: number;
  sleep: number;
}

export function healthTrend(
  waterLog: Record<string, number>,
  sleepLog: Record<string, number>,
  days: string[],
): HealthPoint[] {
  return days.map((day) => ({
    day: new Date(`${day}T00:00:00`).toLocaleDateString([], {
      weekday: "short",
    }),
    water: Math.round((waterLog[day] ?? 0) * 0.25 * 10) / 10,
    sleep: sleepLog[day] ?? 0,
  }));
}

export interface MoodCount {
  mood: string;
  count: number;
}

/** How often each mood tag has been used across every journal entry, most frequent first. */
export function moodFrequency(
  entries: Record<string, JournalEntry>,
): MoodCount[] {
  const counts = new Map<string, number>();
  for (const entry of Object.values(entries)) {
    for (const mood of entry.moods) {
      counts.set(mood, (counts.get(mood) ?? 0) + 1);
    }
  }
  return Array.from(counts.entries())
    .map(([mood, count]) => ({ mood, count }))
    .sort((a, b) => b.count - a.count);
}
