import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HealthState {
  waterLog: Record<string, number>; // date -> glasses
  sleepLog: Record<string, number>; // date -> hours
  weightLog: Record<string, number>; // date -> kg
  heightCm: number;
  waterGoal: number; // glasses per day
  addWaterGlass: (date: string) => void;
  removeWaterGlass: (date: string) => void;
  setSleepHours: (date: string, hours: number) => void;
  setWeight: (date: string, kg: number) => void;
  removeWeightEntry: (date: string) => void;
  setHeight: (cm: number) => void;
  setWaterGoal: (glasses: number) => void;
}

// Zero-state: nothing logged yet, sensible default water goal.
export const useHealthStore = create<HealthState>()(
  persist(
    (set) => ({
      waterLog: {},
      sleepLog: {},
      weightLog: {},
      heightCm: 0,
      waterGoal: 8,

      addWaterGlass: (date) =>
        set((state) => ({ waterLog: { ...state.waterLog, [date]: (state.waterLog[date] ?? 0) + 1 } })),

      removeWaterGlass: (date) =>
        set((state) => ({
          waterLog: { ...state.waterLog, [date]: Math.max(0, (state.waterLog[date] ?? 0) - 1) },
        })),

      setSleepHours: (date, hours) =>
        set((state) => ({ sleepLog: { ...state.sleepLog, [date]: Math.max(0, hours) } })),

      setWeight: (date, kg) =>
        set((state) => ({ weightLog: { ...state.weightLog, [date]: Math.max(0, kg) } })),

      removeWeightEntry: (date) =>
        set((state) => {
          const next = { ...state.weightLog };
          delete next[date];
          return { weightLog: next };
        }),

      setHeight: (cm) => set({ heightCm: Math.max(0, cm) }),

      setWaterGoal: (glasses) => set({ waterGoal: Math.max(1, glasses) }),
    }),
    { name: 'lifeos-health' }
  )
);