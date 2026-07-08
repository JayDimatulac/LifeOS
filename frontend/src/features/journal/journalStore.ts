import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { JournalEntry } from './types';

interface JournalState {
  entries: Record<string, JournalEntry>; // keyed by date
  saveEntry: (date: string, text: string, moods: string[]) => void;
  deleteEntry: (date: string) => void;
}

export const useJournalStore = create<JournalState>()(
  persist(
    (set) => ({
      entries: {},

      saveEntry: (date, text, moods) =>
        set((state) => ({
          entries: { ...state.entries, [date]: { date, text, moods } },
        })),

      deleteEntry: (date) =>
        set((state) => {
          const next = { ...state.entries };
          delete next[date];
          return { entries: next };
        }),
    }),
    { name: 'lifeos-journal' }
  )
);