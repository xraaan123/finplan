'use client'

import { useRouter } from 'next/navigation';
import React, { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext<{
    isAuthenticated: boolean;
    login: () => void;
    logout: () => void;
} | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!token);
  }, [])
  
  const login = () => {
    localStorage.setItem('token', 'mocked-token');
    setIsAuthenticated(true)
    router.push('/dashboard')
  }

  const logout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    router.push('/login');
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>{children}</AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if(!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}