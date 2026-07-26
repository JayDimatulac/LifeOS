export type DestinationStatus = 'dream' | 'visited';

export interface Destination {
  id: string;
  name: string;
  status: DestinationStatus;
  notes?: string;
  visitedDate?: string; // "YYYY-MM-DD", set when marked visited
}