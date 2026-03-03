"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 20;
const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 64;
const PASSWORD_REGEX = /^(?=.*[A-Za-z])(?=.*\d).+$/;

type Mode = "login" | "register";

export default function LoginPage() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<Mode>("login");

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const [registerName, setRegisterName] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (event: FormEvent) => {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      await login(identifier.trim(), password);
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "登录失败，请重试";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (event: FormEvent) => {
    event.preventDefault();
    setError("");

    const normalizedName = registerName.trim();
    if (normalizedName.length < USERNAME_MIN_LENGTH || normalizedName.length > USERNAME_MAX_LENGTH) {
      setError(`用户名需为 ${USERNAME_MIN_LENGTH}-${USERNAME_MAX_LENGTH} 位`);
      return;
    }

    if (/\s/.test(normalizedName)) {
      setError("用户名不能包含空格");
      return;
    }

    if (/^\d+$/.test(normalizedName)) {
      setError("用户名不能是纯数字");
      return;
    }

    if (registerPassword !== confirmPassword) {
      setError("两次输入的密码不一致");
      return;
    }

    if (
      registerPassword.length < PASSWORD_MIN_LENGTH ||
      registerPassword.length > PASSWORD_MAX_LENGTH ||
      !PASSWORD_REGEX.test(registerPassword)
    ) {
      setError("密码需为 8-64 位，且至少包含字母和数字");
      return;
    }

    setLoading(true);

    try {
      await register(normalizedName, registerPassword, confirmPassword);
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "注册失败，请重试";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-neutral-50 px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-neutral-200 bg-white p-6 shadow-xl sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-neutral-900">
              {mode === "login" ? "欢迎回来" : "创建新账号"}
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              {mode === "login"
                ? "使用邮箱、用户名或账号 ID + 密码登录"
                : "输入不重复用户名并设置安全密码后即可注册"}
            </p>
          </div>
          <div className="rounded-full bg-neutral-100 p-1 text-xs font-medium text-neutral-600">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
              }}
              className={`rounded-full px-3 py-1 transition ${
                mode === "login"
                  ? "bg-neutral-900 text-white"
                  : "hover:bg-neutral-200"
              }`}
            >
              登录
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("register");
                setError("");
              }}
              className={`rounded-full px-3 py-1 transition ${
                mode === "register"
                  ? "bg-neutral-900 text-white"
                  : "hover:bg-neutral-200"
              }`}
            >
              注册
            </button>
          </div>
        </div>

        {mode === "login" ? (
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="identifier" className="text-sm font-medium text-neutral-700">
                邮箱 / 用户名 / 账号 ID
              </label>
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="例如 you@example.com 或 beatmaker_01"
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-neutral-700">
                密码
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                required
              />
            </div>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-neutral-900 py-2 text-sm font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "登录中..." : "登录"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="registerName" className="text-sm font-medium text-neutral-700">
                用户名
              </label>
              <input
                id="registerName"
                type="text"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                placeholder="3-20 位，不能含空格，不能纯数字"
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                required
                minLength={USERNAME_MIN_LENGTH}
                maxLength={USERNAME_MAX_LENGTH}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="registerPassword" className="text-sm font-medium text-neutral-700">
                密码
              </label>
              <input
                id="registerPassword"
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="请输入密码"
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                required
                minLength={PASSWORD_MIN_LENGTH}
                maxLength={PASSWORD_MAX_LENGTH}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-neutral-700">
                确认密码
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="请再次输入密码"
                className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                required
                minLength={PASSWORD_MIN_LENGTH}
                maxLength={PASSWORD_MAX_LENGTH}
              />
            </div>

            <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-800">
              密码要求：8-64 位，至少包含 1 个字母和 1 个数字
            </p>

            {error && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-neutral-900 py-2 text-sm font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "注册中..." : "立即注册"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
