export type TaskPriority = "low" | "medium" | "high";

export interface Task {
  id: string;
  title: string;
  done: boolean;
  priority: TaskPriority;
  dueAt: string | null; // ISO datetime string, or null for "no due date"
}
