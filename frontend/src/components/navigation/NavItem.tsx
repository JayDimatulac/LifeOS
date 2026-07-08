import { NavLink } from 'react-router-dom';
import { Icon, type IconName } from '@/components/common/IconSprite';

interface NavItemProps {
  to: string;
  icon: IconName;
  label: string;
}

export function NavItem({ to, icon, label }: NavItemProps) {
  return (
    <NavLink to={to} className={({ isActive }) => `nav-item${isActive ? ' active' : ''}`}>
      <Icon name={icon} />
      <span className="side-label">{label}</span>
    </NavLink>
  );
}
