import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Habit } from './types';
import { todayKey } from './habitLogic';

interface HabitsState {
  habits: Habit[];
  toggleToday: (id: string) => void;
  addHabit: (name: string) => void;
  removeHabit: (id: string) => void;
}

// Matches the zero-state seed used by the backend's DbSeeder — a brand-new
// user hasn't completed any habit yet, so every history starts empty.
const defaultHabits: Habit[] = [
  { id: 'h1', name: 'Morning pages', history: {} },
  { id: 'h2', name: '30 min walk', history: {} },
  { id: 'h3', name: 'Read 20 pages', history: {} },
  { id: 'h4', name: 'No screens after 10pm', history: {} },
  { id: 'h5', name: '2L water', history: {} },
  { id: 'h6', name: 'Practice guitar', history: {} },
];

export const useHabitsStore = create<HabitsState>()(
  persist(
    (set) => ({
      habits: defaultHabits,

      toggleToday: (id) =>
        set((state) => ({
          habits: state.habits.map((h) =>
            h.id === id
              ? { ...h, history: { ...h.history, [todayKey()]: !h.history[todayKey()] } }
              : h
          ),
        })),

      addHabit: (name) =>
        set((state) => ({
          habits: [...state.habits, { id: crypto.randomUUID(), name, history: {} }],
        })),

      removeHabit: (id) =>
        set((state) => ({ habits: state.habits.filter((h) => h.id !== id) })),
    }),
    { name: 'lifeos-habits' }
  )
);
