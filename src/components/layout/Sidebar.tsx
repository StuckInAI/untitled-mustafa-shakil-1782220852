import { NavLink } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard, Users,
  GraduationCap, Shield, FileText, DollarSign,
  BarChart3, Settings, ChevronRight, LogOut
} from 'lucide-react';

const nav = [
  { label: 'Dashboard', to: '/', icon: LayoutDashboard },
  { label: 'Employees', to: '/employees', icon: Users },
  { label: 'Training', to: '/training', icon: GraduationCap },
  { label: 'Benefits', to: '/benefits', icon: Shield },
  { label: 'Documents', to: '/documents', icon: FileText },
  { label: 'Payroll', to: '/payroll', icon: DollarSign },
  { label: 'Reports', to: '/reports', icon: BarChart3 },
];

export function Sidebar() {
  const { user, logout } = useAuth();
  return (
    <aside className="w-64 min-h-screen bg-slate-900 flex flex-col flex-shrink-0">
      <div className="px-5 py-5 border-b border-slate-700/50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center flex-shrink-0">
            <Users className="w-5 h-5 text-white" />
          </div>
          <div>
            <p className="text-white font-bold text-base leading-none">PeopleCore</p>
            <p className="text-slate-400 text-xs mt-0.5">HR Management</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        {nav.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/'}
            className={({ isActive }) =>
              cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors group',
                isActive
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              )
            }
          >
            {({ isActive }) => (
              <>
                <Icon className="w-4.5 h-4.5 flex-shrink-0" />
                <span className="flex-1">{label}</span>
                {isActive && <ChevronRight className="w-3.5 h-3.5 opacity-60" />}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="px-3 py-3 border-t border-slate-700/50">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            cn('flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-colors',
              isActive ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white hover:bg-slate-800')
          }
        >
          <Settings className="w-4 h-4" />
          Settings
        </NavLink>
        <div className="mt-3 flex items-center gap-3 px-3 py-2 group">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
            {user?.initials ?? 'HR'}
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-white text-xs font-semibold truncate">{user?.name ?? 'HR User'}</p>
            <p className="text-slate-500 text-xs truncate">{user?.role ?? ''}</p>
          </div>
          <button
            onClick={logout}
            title="Sign out"
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded-lg"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
}
