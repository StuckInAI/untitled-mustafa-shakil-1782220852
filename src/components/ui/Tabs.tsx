import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface Tab {
  id: string;
  label: string;
  icon?: ReactNode;
  count?: number;
}

interface TabsProps {
  tabs: Tab[];
  active: string;
  onChange: (id: string) => void;
  className?: string;
}

export function Tabs({ tabs, active, onChange, className }: TabsProps) {
  return (
    <div className={cn('flex gap-1 border-b border-slate-200', className)}>
      {tabs.map(tab => (
        <button
          key={tab.id}
          onClick={() => onChange(tab.id)}
          className={cn(
            'flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors',
            active === tab.id
              ? 'border-blue-600 text-blue-600'
              : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
          )}
        >
          {tab.icon}
          {tab.label}
          {tab.count !== undefined && (
            <span className={cn('inline-flex items-center justify-center w-5 h-5 rounded-full text-xs font-semibold', active === tab.id ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500')}>
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
