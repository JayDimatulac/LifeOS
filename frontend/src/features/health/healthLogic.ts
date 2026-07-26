export function computeBmi(weightKg: number, heightCm: number): number | null {
  if (!weightKg || !heightCm) return null;
  const heightM = heightCm / 100;
  return Math.round((weightKg / (heightM * heightM)) * 10) / 10;
}

export function bmiCategory(bmi: number): string {
  if (bmi < 18.5) return "Underweight";
  if (bmi < 25) return "Normal";
  if (bmi < 30) return "Overweight";
  return "Obese";
}

export function averageThisWeek(
  log: Record<string, number>,
  days: string[],
): number {
  const values = days.map((d) => log[d] ?? 0).filter((v) => v > 0);
  if (values.length === 0) return 0;
  return (
    Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10
  );
}

export function sortedWeightEntries(
  weightLog: Record<string, number>,
): Array<{ date: string; kg: number }> {
  return Object.entries(weightLog)
    .map(([date, kg]) => ({ date, kg }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
