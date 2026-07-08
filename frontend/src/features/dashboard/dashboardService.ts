import { useQuery } from '@tanstack/react-query';
import { api } from '@/services/api';
import type { DashboardData } from '@/types/dashboard';
import { mockDashboard } from './data/mockDashboard';

async function fetchDashboard(): Promise<DashboardData> {
  const { data } = await api.get<DashboardData>('/dashboard');
  return data;
}

/**
 * Loads the dashboard summary from the backend's Dashboard module.
 * Falls back to local mock data so the frontend remains fully demoable
 * even before the ASP.NET Core API is running — remove the fallback
 * once the backend is deployed everywhere the frontend is.
 *
 * Note: `habits` on the returned data is unused by the UI — the Habits
 * feature (see features/habits/habitsStore.ts) is now the single source
 * of truth for habit state, shared between this Dashboard and /habits.
 * Once the backend Habits module exists, wire habitsStore to sync with it.
 */
export function useDashboard() {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      try {
        return await fetchDashboard();
      } catch {
        return mockDashboard;
      }
    },
  });
}
