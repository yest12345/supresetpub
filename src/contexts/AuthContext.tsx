"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import Cookies from 'js-cookie';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  role: string;
  mustChangePassword?: boolean;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const TOKEN_KEY = 'auth_token';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 从 Cookie 加载 token 并获取用户信息
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
            // Token 无效，清除
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

  // 登录（支持使用账户ID或邮箱）
  const login = async (identifier: string, password: string) => {
    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Login failed');
      }

      const { user, token, mustChangePassword } = data.data;
      
      // 保存 token 到 cookie（7天有效期）
      Cookies.set(TOKEN_KEY, token, { expires: 7 });
      
      setUser({ ...user, mustChangePassword });
      setToken(token);

      // 如果需要修改密码，跳转到修改密码页面
      if (mustChangePassword && typeof window !== 'undefined') {
        window.location.href = '/auth/change-password';
      }
    } catch (error: any) {
      throw error;
    }
  };

  // 注册
  const register = async (name: string, email: string, password: string) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Registration failed');
      }

      const { user, token } = data.data;
      
      // 保存 token 到 cookie
      Cookies.set(TOKEN_KEY, token, { expires: 7 });
      
      setUser(user);
      setToken(token);
    } catch (error: any) {
      throw error;
    }
  };

  // 登出
  const logout = () => {
    Cookies.remove(TOKEN_KEY);
    setUser(null);
    setToken(null);
  };

  // 更新用户信息
  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// 自定义 Hook
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
