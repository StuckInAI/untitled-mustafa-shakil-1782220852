import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'HR Manager' | 'HR Admin' | 'Recruiter' | 'HR Business Partner';
  avatar?: string;
  provider: 'google' | 'microsoft' | 'email';
  initials: string;
}

interface AuthContextValue {
  user: AuthUser | null;
  isLoading: boolean;
  login: (provider: 'google' | 'microsoft' | 'email', email?: string, password?: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

const MOCK_USERS: Record<string, AuthUser> = {
  google: {
    id: 'u1', name: 'Marcus Chen', email: 'marcus.chen@company.com',
    role: 'HR Manager', provider: 'google', initials: 'MC',
  },
  microsoft: {
    id: 'u2', name: 'Sarah Mitchell', email: 'sarah.mitchell@company.com',
    role: 'HR Admin', provider: 'microsoft', initials: 'SM',
  },
  email: {
    id: 'u3', name: 'Priya Sharma', email: 'priya.sharma@company.com',
    role: 'Recruiter', provider: 'email', initials: 'PS',
  },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const login = useCallback(async (provider: 'google' | 'microsoft' | 'email') => {
    setIsLoading(true);
    // Simulate async auth
    await new Promise(r => setTimeout(r, 1200));
    setUser(MOCK_USERS[provider]);
    setIsLoading(false);
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}
