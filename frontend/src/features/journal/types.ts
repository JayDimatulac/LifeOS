export interface JournalEntry {
  date: string; // "YYYY-MM-DD" key, one entry per day
  text: string;
  moods: string[];
}
