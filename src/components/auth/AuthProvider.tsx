// AuthContext.tsx
'use client';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { getCookie, setCookie, deleteCookie } from 'cookies-next';
interface AuthContextType {
  isAuthenticated: boolean;
  userRole: string | null;
  login: (token: string, role: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{children: ReactNode}> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  useEffect( () => {
    const token = getCookie('token');
    const role = getCookie('role');
    setIsAuthenticated(!!token);
    if(role){
      setUserRole(role);
    }
  },[])

  const login = (token: string, role: string) => {
    setCookie('token', token, { maxAge: 60 * 60 * 24 * 30 }); //
    setCookie('role', role, { maxAge: 60 * 60 * 24 * 30 });
    setIsAuthenticated(true);
    setUserRole(role);
  };

  const logout = () => {
    deleteCookie('token');
    deleteCookie('role');
    setIsAuthenticated(false);
    setUserRole(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, login, logout }}>
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