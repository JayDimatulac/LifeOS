/** Local calendar date -> "YYYY-MM-DD" key. Matches the key format used by habit history and task due dates. */
export function dateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function isSameMonth(a: Date, b: Date): boolean {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();
}

/** Returns a full 42-cell (6-week) grid of dates for the given month, padded with adjacent-month days. */
export function buildMonthGrid(year: number, month: number): Date[] {
  const first = new Date(year, month, 1);
  const startDay = first.getDay(); // 0 = Sunday
  const gridStart = new Date(year, month, 1 - startDay);

  const days: Date[] = [];
  for (let i = 0; i < 42; i++) {
    const d = new Date(gridStart);
    d.setDate(gridStart.getDate() + i);
    days.push(d);
  }
  return days;
}