import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { Login } from '@/pages/Login';
import { Sidebar } from '@/components/layout/Sidebar';
import { Dashboard } from '@/pages/Dashboard';
import { Employees } from '@/pages/Employees';
import { Training } from '@/pages/Training';
import { Benefits } from '@/pages/Benefits';
import { Documents } from '@/pages/Documents';
import { Payroll } from '@/pages/Payroll';
import { Reports } from '@/pages/Reports';
import { ToastContainer } from '@/components/ui/ToastContainer';
import { useToastStore } from '@/hooks/useToast';
import { Settings } from 'lucide-react';

function AppShell() {
  const { user } = useAuth();
  const { toasts, remove } = useToastStore();

  if (!user) {
    return (
      <>
        <Routes>
          <Route path="*" element={<Login />} />
        </Routes>
        <ToastContainer toasts={toasts} remove={remove} />
      </>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/training" element={<Training />} />
          <Route path="/benefits" element={<Benefits />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/payroll" element={<Payroll />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
      <ToastContainer toasts={toasts} remove={remove} />
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="flex-1 flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-8 max-w-sm w-full text-center">
        <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Settings className="w-7 h-7 text-blue-600" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">Settings</h2>
        <p className="text-slate-500 mt-2 text-sm">System configuration and integrations will appear here.</p>
      </div>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppShell />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
