import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: ReactNode;
  iconBg: string;
  trend?: { value: number; label: string };
  className?: string;
}

export function StatCard({ title, value, subtitle, icon, iconBg, trend, className }: StatCardProps) {
  return (
    <div className={cn('bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-shadow', className)}>
      <div className="flex items-start justify-between mb-4">
        <div className={cn('w-11 h-11 rounded-xl flex items-center justify-center', iconBg)}>
          {icon}
        </div>
        {trend && (
          <div className={cn('flex items-center gap-1 text-xs font-medium', trend.value >= 0 ? 'text-emerald-600' : 'text-red-500')}>
            {trend.value >= 0 ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>
      <p className="text-2xl font-bold text-slate-900">{value}</p>
      <p className="text-sm font-medium text-slate-600 mt-0.5">{title}</p>
      {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
    </div>
  );
}
