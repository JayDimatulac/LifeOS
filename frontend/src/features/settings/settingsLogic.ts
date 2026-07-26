export const DATA_KEYS = [
  "lifeos-habits",
  "lifeos-tasks",
  "lifeos-journal",
  "lifeos-library",
  "lifeos-adventures",
  "lifeos-finance",
  "lifeos-health",
  "lifeos-settings",
  "lifeos-theme",
];

export function exportAllData(): string {
  const data: Record<string, string | null> = {};
  for (const key of DATA_KEYS) {
    data[key] = window.localStorage.getItem(key);
  }
  return JSON.stringify(data, null, 2);
}

export function downloadJson(filename: string, content: string) {
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export function importAllData(json: string): void {
  const data = JSON.parse(json) as Record<string, string | null>;
  for (const key of DATA_KEYS) {
    if (data[key] != null) {
      window.localStorage.setItem(key, data[key] as string);
    }
  }
}

export function resetAllData(): void {
  for (const key of DATA_KEYS) {
    window.localStorage.removeItem(key);
  }
}
