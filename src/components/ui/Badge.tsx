import { cn } from '@/lib/utils';

type Variant = 'green' | 'red' | 'yellow' | 'blue' | 'purple' | 'gray' | 'orange' | 'teal';

const variants: Record<Variant, string> = {
  green: 'bg-emerald-100 text-emerald-700 ring-emerald-200',
  red: 'bg-red-100 text-red-700 ring-red-200',
  yellow: 'bg-amber-100 text-amber-700 ring-amber-200',
  blue: 'bg-blue-100 text-blue-700 ring-blue-200',
  purple: 'bg-purple-100 text-purple-700 ring-purple-200',
  gray: 'bg-slate-100 text-slate-600 ring-slate-200',
  orange: 'bg-orange-100 text-orange-700 ring-orange-200',
  teal: 'bg-teal-100 text-teal-700 ring-teal-200',
};

interface BadgeProps {
  label: string;
  variant: Variant;
  dot?: boolean;
  className?: string;
}

export function Badge({ label, variant, dot, className }: BadgeProps) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ring-1 ring-inset', variants[variant], className)}>
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full',
        variant === 'green' ? 'bg-emerald-500' :
        variant === 'red' ? 'bg-red-500' :
        variant === 'yellow' ? 'bg-amber-500' :
        variant === 'blue' ? 'bg-blue-500' :
        variant === 'purple' ? 'bg-purple-500' :
        variant === 'orange' ? 'bg-orange-500' :
        variant === 'teal' ? 'bg-teal-500' : 'bg-slate-400'
      )} />}
      {label}
    </span>
  );
}

export function statusBadge(status: string) {
  const map: Record<string, Variant> = {
    Active: 'green', 'On Leave': 'yellow', Terminated: 'red', Probation: 'blue',
    Approved: 'green', Rejected: 'red', Pending: 'yellow', Cancelled: 'gray',
    Completed: 'green', 'In Progress': 'blue', 'Not Started': 'gray', Overdue: 'red',
    'On Track': 'green', 'At Risk': 'orange',
    Draft: 'gray', Processing: 'blue', Failed: 'red',
    'Full-time': 'teal', 'Part-time': 'purple', Contract: 'orange', Intern: 'blue',
    Mandatory: 'red',
  };
  return <Badge label={status} variant={map[status] ?? 'gray'} dot />;
}
