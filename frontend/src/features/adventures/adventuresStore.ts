import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { dateKey } from '@/utils/date';
import type { Destination, DestinationStatus } from './types';

interface AdventuresState {
  destinations: Destination[];
  addDestination: (name: string, status: DestinationStatus, notes?: string) => void;
  markVisited: (id: string) => void;
  removeDestination: (id: string) => void;
}

const defaultDestinations: Destination[] = [];

export const useAdventuresStore = create<AdventuresState>()(
  persist(
    (set) => ({
      destinations: defaultDestinations,

      addDestination: (name, status, notes) =>
        set((state) => ({
          destinations: [
            ...state.destinations,
            {
              id: crypto.randomUUID(),
              name,
              status,
              notes,
              visitedDate: status === 'visited' ? dateKey(new Date()) : undefined,
            },
          ],
        })),

      markVisited: (id) =>
        set((state) => ({
          destinations: state.destinations.map((d) =>
            d.id === id ? { ...d, status: 'visited', visitedDate: dateKey(new Date()) } : d
          ),
        })),

      removeDestination: (id) =>
        set((state) => ({ destinations: state.destinations.filter((d) => d.id !== id) })),
    }),
    { name: 'lifeos-adventures' }
  )
);