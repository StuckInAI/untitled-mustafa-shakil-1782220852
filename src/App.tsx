import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Sidebar } from '@/components/layout/Sidebar';
import { Dashboard } from '@/pages/Dashboard';
import { Employees } from '@/pages/Employees';
import { Leave } from '@/pages/Leave';
import { Performance } from '@/pages/Performance';
import { Training } from '@/pages/Training';
import { Benefits } from '@/pages/Benefits';
import { Documents } from '@/pages/Documents';
import { Payroll } from '@/pages/Payroll';
import { Reports } from '@/pages/Reports';

function App() {
  return (
    <BrowserRouter>
      <div className="flex h-screen overflow-hidden bg-slate-50">
        <Sidebar />
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/leave" element={<Leave />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/training" element={<Training />} />
            <Route path="/benefits" element={<Benefits />} />
            <Route path="/documents" element={<Documents />} />
            <Route path="/payroll" element={<Payroll />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

function SettingsPage() {
  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 max-w-sm w-full text-center">
        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">⚙️</span>
        </div>
        <h2 className="text-lg font-bold text-slate-900">Settings</h2>
        <p className="text-slate-500 mt-2 text-sm">System configuration and integrations will appear here.</p>
      </div>
    </div>
  );
}

export default App;
