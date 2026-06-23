import { CheckCircle2, XCircle, AlertCircle, Info, X } from 'lucide-react';
import type { Toast } from '@/hooks/useToast';

const icons = {
  success: <CheckCircle2 className="w-4 h-4 text-emerald-500" />,
  error: <XCircle className="w-4 h-4 text-red-500" />,
  warning: <AlertCircle className="w-4 h-4 text-amber-500" />,
  info: <Info className="w-4 h-4 text-blue-500" />,
};

const borders = {
  success: 'border-l-emerald-500',
  error: 'border-l-red-500',
  warning: 'border-l-amber-500',
  info: 'border-l-blue-500',
};

export function ToastContainer({ toasts, remove }: { toasts: Toast[]; remove: (id: string) => void }) {
  if (toasts.length === 0) return null;
  return (
    <div className="fixed bottom-5 right-5 z-[9999] flex flex-col gap-2 pointer-events-none">
      {toasts.map(t => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-start gap-3 bg-white border border-slate-200 border-l-4 ${borders[t.type]} rounded-xl shadow-xl px-4 py-3 min-w-72 max-w-sm animate-slide-in`}
        >
          <div className="mt-0.5 flex-shrink-0">{icons[t.type]}</div>
          <p className="text-sm text-slate-800 font-medium flex-1 leading-snug">{t.message}</p>
          <button onClick={() => remove(t.id)} className="text-slate-400 hover:text-slate-600 ml-1 flex-shrink-0">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  );
}
