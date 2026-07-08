/**
 * A habit's completion history, keyed by ISO date ("YYYY-MM-DD") -> completed.
 * Storing history (not just "done today" + "streak") lets us derive both
 * the weekly grid and the current streak from a single source of truth.
 */
export interface Habit {
  id: string;
  name: string;
  history: Record<string, boolean>;
}
