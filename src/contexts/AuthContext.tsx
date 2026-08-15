"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface User {
  id: number;
  name: string;
  email: string | null;
  avatar: string | null;
  bio: string | null;
  role: string;
  mustChangePassword?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (name: string, password: string) => Promise<void>;
  register: (name: string, password: string, confirmPassword: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'auth_token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadUser = async () => {
      const savedToken = Cookies.get(TOKEN_KEY);

      if (savedToken) {
        setToken(savedToken);
        try {
          const response = await fetch('/api/auth/me', {
            headers: {
              'Authorization': `Bearer ${savedToken}`
            }
          });

          if (response.ok) {
            const data = await response.json();
            if (data.success) {
              setUser(data.data);
            }
          } else {
            Cookies.remove(TOKEN_KEY);
            setToken(null);
          }
        } catch (error) {
          console.error('Failed to load user:', error);
          Cookies.remove(TOKEN_KEY);
          setToken(null);
        }
      }

      setLoading(false);
    };

    loadUser();
  }, []);

  const login = async (name: string, password: string) => {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), password })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || '登录失败');
    }

    const { user, token, mustChangePassword } = data.data;

    Cookies.set(TOKEN_KEY, token, { expires: 7 });

    setUser({ ...user, mustChangePassword });
    setToken(token);

    if (mustChangePassword && typeof window !== 'undefined') {
      window.location.href = '/auth/change-password';
    }
  };

  const register = async (name: string, password: string, confirmPassword: string) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name.trim(), password, confirmPassword })
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(data.error || '注册失败');
    }

    const { user, token, mustChangePassword } = data.data;

    Cookies.set(TOKEN_KEY, token, { expires: 7 });

    setUser({ ...user, mustChangePassword });
    setToken(token);
  };

  const logout = () => {
    Cookies.remove(TOKEN_KEY);
    setUser(null);
    setToken(null);
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser }}>
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
