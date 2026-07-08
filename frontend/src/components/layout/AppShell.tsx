import { Outlet, useLocation } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { TopBar } from './TopBar';

const BREADCRUMBS: Record<string, string> = {
  '/': 'Home / Dashboard',
  '/habits': 'Home / Habits',
  '/tasks': 'Home / Tasks',
  '/calendar': 'Home / Calendar',
  '/journal': 'Chapters / Journal',
  '/library': 'Chapters / Library',
  '/adventures': 'Chapters / Adventures',
  '/finance': 'Chapters / Finance',
  '/health': 'Chapters / Health',
  '/analytics': 'System / Analytics',
  '/ai': 'System / Companion',
  '/settings': 'System / Settings',
};

export function AppShell() {
  const location = useLocation();
  const breadcrumb = BREADCRUMBS[location.pathname] ?? 'LifeOS';

  return (
    <div className="shell">
      <Sidebar />
      <main className="main">
        <TopBar breadcrumb={breadcrumb} />
        <Outlet />
        <footer className="page-foot mono">LIFEOS · A PERSONAL OPERATING SYSTEM · EVERY DAY IS A PAGE</footer>
      </main>
    </div>
  );
}
