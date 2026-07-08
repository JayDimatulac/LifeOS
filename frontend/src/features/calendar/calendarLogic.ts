import type { Task } from '@/features/tasks/types';
import type { Habit } from '@/features/habits/types';
import { dateKey } from '@/utils/date';

export function tasksOnDay(tasks: Task[], day: Date): Task[] {
  const key = dateKey(day);
  return tasks.filter((t) => t.dueAt && dateKey(new Date(t.dueAt)) === key);
}

export function habitsDoneOnDay(habits: Habit[], day: Date): number {
  const key = dateKey(day);
  return habits.filter((h) => h.history[key]).length;
}