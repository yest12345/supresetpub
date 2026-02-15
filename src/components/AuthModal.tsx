"use client";

import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COUNTDOWN_SECONDS = 60;

export default function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerCode, setRegisterCode] = useState('');
  const [agreed, setAgreed] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const { login, loginWithCode } = useAuth();

  const normalizedRegisterEmail = registerEmail.trim().toLowerCase();
  const isRegisterEmailValid = EMAIL_REGEX.test(normalizedRegisterEmail);

  const resetForm = () => {
    setIdentifier('');
    setPassword('');
    setRegisterEmail('');
    setRegisterCode('');
    setAgreed(false);
    setError('');
    setLoading(false);
    setSending(false);
    setCountdown(0);
  };

  useEffect(() => {
    if (isOpen) {
      setMode(defaultMode);
      setError('');
    }
  }, [defaultMode, isOpen]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        resetForm();
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      resetForm();
      onClose();
    }
  };

  const handleSendCode = async () => {
    if (!isRegisterEmailValid) {
      setError('请输入正确的邮箱地址');
      return;
    }

    setError('');
    setSending(true);

    try {
      const response = await fetch('/api/auth/send-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: normalizedRegisterEmail })
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || '验证码发送失败');
      }

      setCountdown(COUNTDOWN_SECONDS);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '验证码发送失败';
      setError(message);
    } finally {
      setSending(false);
    }
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(identifier, password);
      resetForm();
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '登录失败，请重试';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isRegisterEmailValid) {
      setError('请输入正确的邮箱地址');
      return;
    }

    if (registerCode.trim().length !== 6) {
      setError('请输入 6 位验证码');
      return;
    }

    if (!agreed) {
      setError('请先勾选同意服务协议');
      return;
    }

    setLoading(true);

    try {
      await loginWithCode(normalizedRegisterEmail, registerCode.trim());
      resetForm();
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '注册失败，请重试';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      onClick={handleBackdropClick}
    >
      <div
        className="relative w-full max-w-md rounded-lg bg-white p-6 shadow-xl dark:bg-gray-800"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => {
            resetForm();
            onClose();
          }}
          className="absolute right-4 top-4 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-200"
          aria-label="关闭"
        >
          <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">账号访问</h2>

        <div className="mb-6 flex rounded-lg border border-gray-200 bg-gray-50 p-1 dark:border-gray-700 dark:bg-gray-900">
          <button
            type="button"
            onClick={() => {
              setMode('login');
              setError('');
            }}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              mode === 'login'
                ? 'bg-blue-600 text-white'
                : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            登录
          </button>
          <button
            type="button"
            onClick={() => {
              setMode('register');
              setError('');
            }}
            className={`flex-1 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
              mode === 'register'
                ? 'bg-emerald-600 text-white'
                : 'text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700'
            }`}
          >
            注册
          </button>
        </div>

        {mode === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-xs text-blue-800 dark:border-blue-900/40 dark:bg-blue-950/30 dark:text-blue-300">
              使用邮箱或账号 ID + 密码登录
            </div>

            <div>
              <label htmlFor="identifier" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                邮箱或账号 ID
              </label>
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="例如 you@example.com 或 2025100901"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                密码
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="请输入密码"
                required
                minLength={6}
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-blue-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:bg-blue-400"
            >
              {loading ? '登录中...' : '登录'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit} className="space-y-4">
            <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300">
              使用邮箱验证码注册，验证通过后自动创建账号并登录
            </div>

            <div>
              <label htmlFor="registerEmail" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                邮箱
              </label>
              <input
                id="registerEmail"
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label htmlFor="registerCode" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                验证码
              </label>
              <div className="flex gap-2">
                <input
                  id="registerCode"
                  type="text"
                  inputMode="numeric"
                  value={registerCode}
                  onChange={(e) => setRegisterCode(e.target.value)}
                  className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  placeholder="6 位验证码"
                  required
                  minLength={6}
                  maxLength={6}
                />
                <button
                  type="button"
                  onClick={handleSendCode}
                  disabled={!isRegisterEmailValid || sending || countdown > 0}
                  className="whitespace-nowrap rounded-lg border border-emerald-600 px-3 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50 dark:border-emerald-400 dark:text-emerald-300"
                >
                  {countdown > 0 ? `已发送 (${countdown}s)` : sending ? '发送中...' : '获取验证码'}
                </button>
              </div>
            </div>

            <label className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-300">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-gray-300 text-emerald-600 focus:ring-emerald-500"
              />
              <span>我已阅读并同意服务协议</span>
            </label>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading || !agreed}
              className="w-full rounded-lg bg-emerald-600 px-4 py-3 font-semibold text-white transition-colors hover:bg-emerald-700 disabled:bg-emerald-400"
            >
              {loading ? '注册中...' : '立即注册'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
