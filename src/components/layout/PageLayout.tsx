import { ReactNode } from 'react';
import { TopBar } from './TopBar';

interface PageLayoutProps {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}

export function PageLayout({ title, subtitle, actions, children }: PageLayoutProps) {
  return (
    <div className="flex flex-col flex-1 min-h-0 overflow-hidden">
      <TopBar title={title} subtitle={subtitle} actions={actions} />
      <main className="flex-1 overflow-y-auto p-6 bg-slate-50">
        {children}
      </main>
    </div>
  );
}
