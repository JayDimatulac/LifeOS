import type { JournalEntry } from './types';

/** Most recent entries first. */
export function sortedEntries(entries: Record<string, JournalEntry>): JournalEntry[] {
  return Object.values(entries).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function formatEntryDate(dateKeyValue: string): string {
  const d = new Date(`${dateKeyValue}T00:00:00`);
  return d.toLocaleDateString([], { month: 'long', day: 'numeric', year: 'numeric' });
}