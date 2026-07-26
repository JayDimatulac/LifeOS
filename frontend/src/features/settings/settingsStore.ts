import { create } from "zustand";
import { persist } from "zustand/middleware";
import { dateKey } from "@/utils/date";

interface SettingsState {
  displayName: string;
  journeyStartDate: string;
  setDisplayName: (name: string) => void;
}

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      displayName: "Jay",
      journeyStartDate: dateKey(new Date()),
      setDisplayName: (name) => set({ displayName: name }),
    }),
    { name: "lifeos-settings" },
  ),
);
