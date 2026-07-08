import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Task, TaskPriority } from './types';

interface TasksState {
  tasks: Task[];
  addTask: (title: string, priority: TaskPriority, dueAt: string | null) => void;
  toggleDone: (id: string) => void;
  removeTask: (id: string) => void;
}

const defaultTasks: Task[] = [
  { id: 't1', title: 'Set up your first habit', done: false, priority: 'medium', dueAt: null },
  { id: 't2', title: 'Write your first journal entry', done: false, priority: 'medium', dueAt: null },
  { id: 't3', title: "Add a book you're reading", done: false, priority: 'low', dueAt: null },
];

export const useTasksStore = create<TasksState>()(
  persist(
    (set) => ({
      tasks: defaultTasks,

      addTask: (title, priority, dueAt) =>
        set((state) => ({
          tasks: [...state.tasks, { id: crypto.randomUUID(), title, done: false, priority, dueAt }],
        })),

      toggleDone: (id) =>
        set((state) => ({
          tasks: state.tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)),
        })),

      removeTask: (id) =>
        set((state) => ({ tasks: state.tasks.filter((t) => t.id !== id) })),
    }),
    { name: 'lifeos-tasks' }
  )
);