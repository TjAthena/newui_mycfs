
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  role: 'admin' | 'employee';
  email: string;
  photo?: string;
}

interface AuthContextType {
  user: User | null;
  login: (id: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demo
const mockUsers = {
  'admin001': {
    id: 'admin001',
    name: 'Sarah Johnson',
    role: 'admin' as const,
    email: 'sarah.johnson@confidencefs.com',
    password: 'admin123',
    photo: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face'
  },
  'emp001': {
    id: 'emp001',
    name: 'John Doe',
    role: 'employee' as const,
    email: 'john.doe@confidencefs.com',
    password: 'emp123',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  }
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (id: string, password: string): Promise<boolean> => {
    const mockUser = mockUsers[id as keyof typeof mockUsers];
    
    if (mockUser && mockUser.password === password) {
      const { password: _, ...userWithoutPassword } = mockUser;
      setUser(userWithoutPassword);
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
