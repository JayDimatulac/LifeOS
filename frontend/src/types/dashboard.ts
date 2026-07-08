export interface LifeAreaScore {
  label: string;
  value: number;
  color: 'gold' | 'goldSoft' | 'silver';
}

export interface Habit {
  id: string;
  name: string;
  done: boolean;
  streak: number;
}

export interface TaskItem {
  id: string;
  title: string;
  time: string;
  priority: 'high' | 'medium' | 'low';
}

export interface CurrentBook {
  title: string;
  author: string;
  currentPage: number;
  totalPages: number;
}

export interface JournalEntry {
  date: string;
  text: string;
  moods: string[];
}

export interface AdventureStop {
  name: string;
  x: number;
  y: number;
  active?: boolean;
}

export interface StatTile {
  label: string;
  value: string;
  trend: string;
  trendType: 'up' | 'flat';
  icon: 'drop' | 'moon' | 'health' | 'finance';
}

export interface Deadline {
  date: string;
  title: string;
}

export interface DashboardData {
  userName: string;
  dayCount: number;
  chapterLabel: string;
  quote: string;
  weatherSummary: string;
  temperatureC: number;
  streakDays: number;
  tasksDoneRatio: string;
  lifeAreas: LifeAreaScore[];
  habits: Habit[];
  tasks: TaskItem[];
  book: CurrentBook;
  journal: JournalEntry;
  adventure: AdventureStop[];
  stats: StatTile[];
  aiInsight: string;
  deadlines: Deadline[];
}
