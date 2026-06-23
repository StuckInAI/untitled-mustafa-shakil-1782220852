import { Bell, Search } from 'lucide-react';
import { useState } from 'react';

interface TopBarProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export function TopBar({ title, subtitle, actions }: TopBarProps) {
  const [notifOpen, setNotifOpen] = useState(false);

  const notifications = [
    { id: 1, text: '3 leave requests pending approval', time: '5m ago', color: 'bg-amber-500' },
    { id: 2, text: 'Performance review due: David Park', time: '1h ago', color: 'bg-red-500' },
    { id: 3, text: 'New hire onboarding: Robert Kim', time: '3h ago', color: 'bg-blue-500' },
    { id: 4, text: 'February payroll is ready to process', time: '1d ago', color: 'bg-purple-500' },
  ];

  return (
    <header className="bg-white border-b border-slate-100 px-6 py-4 flex items-center justify-between flex-shrink-0">
      <div>
        <h1 className="text-xl font-bold text-slate-900">{title}</h1>
        {subtitle && <p className="text-sm text-slate-500 mt-0.5">{subtitle}</p>}
      </div>
      <div className="flex items-center gap-3">
        {actions}
        <div className="relative">
          <button
            onClick={() => setNotifOpen(o => !o)}
            className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-500 hover:text-slate-700 transition-colors"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white" />
          </button>
          {notifOpen && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setNotifOpen(false)} />
              <div className="absolute right-0 top-11 z-20 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden">
                <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
                  <p className="text-sm font-semibold text-slate-900">Notifications</p>
                  <span className="text-xs bg-red-100 text-red-600 px-2 py-0.5 rounded-full font-medium">{notifications.length} new</span>
                </div>
                <div className="divide-y divide-slate-50">
                  {notifications.map(n => (
                    <div key={n.id} className="flex items-start gap-3 px-4 py-3 hover:bg-slate-50 cursor-pointer">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 mt-1.5 ${n.color}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-slate-700 leading-snug">{n.text}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{n.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
