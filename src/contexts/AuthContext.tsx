import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthContextType {
  user: User | null;
  userType: 'customer' | 'supplier' | null;
  login: (email: string, password: string, type: 'customer' | 'supplier') => Promise<void>;
  signup: (email: string, password: string, name: string, type: 'customer' | 'supplier') => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userType, setUserType] = useState<'customer' | 'supplier' | null>(null);

  const login = async (email: string, password: string, type: 'customer' | 'supplier') => {
    // Simulate login
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({ id: '1', email, name: 'John Doe' });
    setUserType(type);
  };

  const signup = async (email: string, password: string, name: string, type: 'customer' | 'supplier') => {
    // Simulate signup
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({ id: '1', email, name });
    setUserType(type);
  };

  const logout = () => {
    setUser(null);
    setUserType(null);
  };

  return (
    <AuthContext.Provider value={{ user, userType, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}