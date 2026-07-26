import type { Destination } from "./types";

export interface MapStop {
  name: string;
  x: number;
  y: number;
  active?: boolean;
}

/**
 * Lays out visited destinations (oldest first) followed by the next dream
 * destination, evenly spaced across the given width. Not real geography —
 * an abstract "journey so far" line, matching the observatory map motif
 * used elsewhere in LifeOS.
 */
export function buildMapStops(
  destinations: Destination[],
  width = 260,
): MapStop[] {
  const visited = [...destinations]
    .filter((d) => d.status === "visited")
    .sort((a, b) => (a.visitedDate ?? "").localeCompare(b.visitedDate ?? ""));
  const nextDream = destinations.find((d) => d.status === "dream");

  const points = nextDream ? [...visited, nextDream] : visited;
  if (points.length === 0) return [];

  const usableWidth = width - 40;
  const step = points.length > 1 ? usableWidth / (points.length - 1) : 0;

  return points.map((d, i) => {
    const isLast = i === points.length - 1;
    const isNextDream = d.status === "dream" && isLast;
    return {
      name: isNextDream ? `Next: ${d.name}` : d.name,
      x: 20 + i * step,
      y: i % 2 === 0 ? 80 : 30,
      active: isNextDream,
    };
  });
}
