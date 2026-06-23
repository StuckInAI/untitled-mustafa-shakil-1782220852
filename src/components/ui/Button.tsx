import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'outline';
type Size = 'sm' | 'md' | 'lg';

const variantStyles: Record<Variant, string> = {
  primary: 'bg-blue-600 hover:bg-blue-700 text-white shadow-sm',
  secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700',
  ghost: 'hover:bg-slate-100 text-slate-600',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
  outline: 'border border-slate-200 hover:bg-slate-50 text-slate-700 bg-white',
};

const sizeStyles: Record<Size, string> = {
  sm: 'px-3 py-1.5 text-xs gap-1.5',
  md: 'px-4 py-2 text-sm gap-2',
  lg: 'px-5 py-2.5 text-sm gap-2',
};

interface ButtonProps {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  icon?: ReactNode;
}

export function Button({ children, variant = 'primary', size = 'md', onClick, disabled, loading, className, type = 'button', icon }: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : icon}
      {children}
    </button>
  );
}
