import { cn } from '@/lib/utils';

interface ProgressBarProps {
  value: number;
  max?: number;
  color?: 'blue' | 'green' | 'yellow' | 'red' | 'purple';
  size?: 'sm' | 'md';
  showLabel?: boolean;
  className?: string;
}

const colors = {
  blue: 'bg-blue-500',
  green: 'bg-emerald-500',
  yellow: 'bg-amber-500',
  red: 'bg-red-500',
  purple: 'bg-purple-500',
};

const heights = { sm: 'h-1.5', md: 'h-2.5' };

export function ProgressBar({ value, max = 100, color = 'blue', size = 'md', showLabel, className }: ProgressBarProps) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <div className={cn('flex-1 bg-slate-100 rounded-full overflow-hidden', heights[size])}>
        <div className={cn('h-full rounded-full transition-all', colors[color])} style={{ width: `${pct}%` }} />
      </div>
      {showLabel && <span className="text-xs font-medium text-slate-600 w-8 text-right">{pct}%</span>}
    </div>
  );
}
