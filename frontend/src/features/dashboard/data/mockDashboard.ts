import type { DashboardData } from '@/types/dashboard';

export const mockDashboard: DashboardData = {
  userName: 'Kai',
  dayCount: 1,
  chapterLabel: 'Chapter 1 · Day One',
  quote: 'Every long story starts with a single, unremarkable page.',
  weatherSummary: 'Clear',
  temperatureC: 27,
  streakDays: 0,
  tasksDoneRatio: '0/3',
  lifeAreas: [
    { label: 'Learning', value: 0, color: 'silver' },
    { label: 'Craft', value: 0, color: 'silver' },
    { label: 'Health', value: 0, color: 'silver' },
    { label: 'Adventure', value: 0, color: 'silver' },
    { label: 'Stillness', value: 0, color: 'silver' },
  ],
  habits: [
    { id: 'h1', name: 'Morning pages', done: false, streak: 0 },
    { id: 'h2', name: '30 min walk', done: false, streak: 0 },
    { id: 'h3', name: 'Read 20 pages', done: false, streak: 0 },
    { id: 'h4', name: 'No screens after 10pm', done: false, streak: 0 },
    { id: 'h5', name: '2L water', done: false, streak: 0 },
    { id: 'h6', name: 'Practice guitar', done: false, streak: 0 },
  ],
  tasks: [
    { id: 't1', title: 'Set up your first habit', time: 'Today', priority: 'medium' },
    { id: 't2', title: 'Write your first journal entry', time: 'Today', priority: 'medium' },
    { id: 't3', title: 'Add a book you\'re reading', time: 'Today', priority: 'low' },
  ],
  book: {
    title: 'Add your current read',
    author: '—',
    currentPage: 0,
    totalPages: 1,
  },
  journal: {
    date: 'Today',
    text: 'Nothing written yet — this is where your first entry will appear.',
    moods: [],
  },
  adventure: [
    { name: 'Add your first destination', x: 130, y: 55, active: true },
  ],
  stats: [
    { label: 'Water', value: '0L', trend: 'Log your first glass', trendType: 'flat', icon: 'drop' },
    { label: 'Sleep', value: '—', trend: 'No data yet', trendType: 'flat', icon: 'moon' },
    { label: 'Mood', value: '—', trend: 'Not logged yet', trendType: 'flat', icon: 'health' },
    { label: 'Spend today', value: '₱0', trend: 'No expenses yet', trendType: 'flat', icon: 'finance' },
  ],
  aiInsight:
    "Welcome to LifeOS. There's nothing to report yet — and that's exactly right for Day One. Set up one habit and write one line in your journal today. That's all this page is asking of you.",
  deadlines: [],
};
