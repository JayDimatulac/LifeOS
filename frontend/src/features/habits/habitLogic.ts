import type { Habit } from "./types";

export function toKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function todayKey(): string {
  return toKey(new Date());
}

export function isDoneToday(habit: Habit): boolean {
  return !!habit.history[todayKey()];
}

/**
 * Current streak, counting consecutive completed days ending today.
 * If today isn't marked done yet, we still count backward from yesterday —
 * the day isn't over, so a streak shouldn't look "broken" before midnight.
 */
export function computeStreak(habit: Habit): number {
  let streak = 0;
  const cursor = new Date();

  if (!habit.history[toKey(cursor)]) {
    cursor.setDate(cursor.getDate() - 1);
  }

  while (habit.history[toKey(cursor)]) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }

  return streak;
}

/** Returns `count` date keys ending today, oldest first — used for the weekly grid. */
export function lastNDays(count: number): string[] {
  const days: string[] = [];
  const cursor = new Date();
  cursor.setDate(cursor.getDate() - (count - 1));

  for (let i = 0; i < count; i++) {
    days.push(toKey(cursor));
    cursor.setDate(cursor.getDate() + 1);
  }

  return days;
}
/** Consecutive days (with today's grace period) where at least one habit was completed. */
export function overallStreak(habits: Habit[]): number {
  let streak = 0;
  const cursor = new Date();
  const anyDoneOn = (key: string) => habits.some((h) => h.history[key]);

  if (!anyDoneOn(toKey(cursor))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (anyDoneOn(toKey(cursor))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}
