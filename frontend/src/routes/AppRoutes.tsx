import { Routes, Route } from 'react-router-dom';
import { AppShell } from '@/components/layout/AppShell';
import { DashboardPage } from '@/features/dashboard/DashboardPage';
import { HabitsPage } from '@/features/habits/HabitsPage';
import { TasksPage } from '@/features/tasks/TasksPage';
import { CalendarPage } from '@/features/calendar/CalendarPage';
import { JournalPage } from '@/features/journal/JournalPage';
import { LibraryPage } from '@/features/library/LibraryPage';
import { AdventuresPage } from '@/features/adventures/AdventuresPage';
import { FinancePage } from '@/features/finance/FinancePage';
import { HealthPage } from '@/features/health/HealthPage';
import { AnalyticsPage } from '@/features/analytics/AnalyticsPage';
import { AICompanionPage } from '@/features/ai/AICompanionPage';
import { SettingsPage } from '@/features/settings/SettingsPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/habits" element={<HabitsPage />} />
        <Route path="/tasks" element={<TasksPage />} />
        <Route path="/calendar" element={<CalendarPage />} />
        <Route path="/journal" element={<JournalPage />} />
        <Route path="/library" element={<LibraryPage />} />
        <Route path="/adventures" element={<AdventuresPage />} />
        <Route path="/finance" element={<FinancePage />} />
        <Route path="/health" element={<HealthPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/ai" element={<AICompanionPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
    </Routes>
  );
}
