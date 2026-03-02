"use client";

import { useEffect, useState, type FormEvent } from 'react';
import { useAuth } from '@/contexts/AuthContext';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: 'login' | 'register';
}

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 64;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z\d]).+$/;

export default function AuthModal({ isOpen, onClose, defaultMode = 'login' }: AuthModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login, register } = useAuth();

  const resetForm = () => {
    setIdentifier('');
    setPassword('');
    setRegisterName('');
    setRegisterPassword('');
    setConfirmPassword('');
    setError('');
    setLoading(false);
  };

  useEffect(() => {
    if (isOpen) {
      setMode(defaultMode);
      setError('');
    }
  }, [defaultMode, isOpen]);

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

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(identifier.trim(), password);
      resetForm();
      onClose();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : '登录失败，请重试';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegisterSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    const normalizedRegisterName = registerName.trim();

    if (normalizedRegisterName.length < USERNAME_MIN_LENGTH || normalizedRegisterName.length > USERNAME_MAX_LENGTH) {
      setError(`用户名需为 ${USERNAME_MIN_LENGTH}-${USERNAME_MAX_LENGTH} 位`);
      return;
    }

    if (/\s/.test(normalizedRegisterName)) {
      setError('用户名不能包含空格');
      return;
    }

    if (/^\d+$/.test(normalizedRegisterName)) {
      setError('用户名不能是纯数字');
      return;
    }

    if (registerPassword !== confirmPassword) {
      setError('两次输入的密码不一致');
      return;
    }

    if (
      registerPassword.length < PASSWORD_MIN_LENGTH ||
      registerPassword.length > PASSWORD_MAX_LENGTH ||
      !PASSWORD_REGEX.test(registerPassword)
    ) {
      setError('密码需为 8-64 位，且包含大小写字母、数字和特殊字符');
      return;
    }

    setLoading(true);

    try {
      await register(normalizedRegisterName, registerPassword, confirmPassword);
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
              使用邮箱、用户名或账号 ID + 密码登录
            </div>

            <div>
              <label htmlFor="identifier" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                邮箱 / 用户名 / 账号 ID
              </label>
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="例如 you@example.com 或 beatmaker_01"
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
              自由注册账号：设置不重复用户名和安全密码，注册后自动登录
            </div>

            <div>
              <label htmlFor="registerName" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                用户名
              </label>
              <input
                id="registerName"
                type="text"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="3-20 位，不能含空格，不能纯数字"
                required
                minLength={USERNAME_MIN_LENGTH}
                maxLength={USERNAME_MAX_LENGTH}
              />
            </div>

            <div>
              <label htmlFor="registerPassword" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                密码
              </label>
              <input
                id="registerPassword"
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="请输入密码"
                required
                minLength={PASSWORD_MIN_LENGTH}
                maxLength={PASSWORD_MAX_LENGTH}
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-300">
                确认密码
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-emerald-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="请再次输入密码"
                required
                minLength={PASSWORD_MIN_LENGTH}
                maxLength={PASSWORD_MAX_LENGTH}
              />
            </div>

            <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800 dark:border-amber-900/40 dark:bg-amber-950/30 dark:text-amber-300">
              密码要求：8-64 位，至少包含 1 个大写字母、1 个小写字母、1 个数字和 1 个特殊字符
            </p>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-800 dark:bg-red-900/20 dark:text-red-400">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
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
