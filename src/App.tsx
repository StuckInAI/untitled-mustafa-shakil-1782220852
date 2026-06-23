import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Dashboard } from '@/pages/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden bg-slate-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<PlaceholderPage title="Employees" />} />
            <Route path="/leave" element={<PlaceholderPage title="Leave" />} />
            <Route path="/performance" element={<PlaceholderPage title="Performance" />} />
            <Route path="/training" element={<PlaceholderPage title="Training" />} />
            <Route path="/benefits" element={<PlaceholderPage title="Benefits" />} />
            <Route path="/documents" element={<PlaceholderPage title="Documents" />} />
            <Route path="/payroll" element={<PlaceholderPage title="Payroll" />} />
            <Route path="/reports" element={<PlaceholderPage title="Reports" />} />
            <Route path="/settings" element={<PlaceholderPage title="Settings" />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

function PlaceholderPage({ title }: { title: string }) {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🔨</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900">{title}</h2>
        <p className="text-slate-500 mt-1 text-sm">Building this section…</p>
      </div>
    </div>
  );
}

export default App;
