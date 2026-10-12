"use client";

import { useState, type FormEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";

const USERNAME_MIN_LENGTH = 3;
const USERNAME_MAX_LENGTH = 50;
const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;
const PASSWORD_MIN_LENGTH = 6;

type Mode = "login" | "register";

export default function LoginPage() {
  const { login, register } = useAuth();
  const [mode, setMode] = useState<Mode>("login");

  const [loginName, setLoginName] = useState("");
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
      await login(loginName.trim(), password);
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
    if (
      normalizedName.length < USERNAME_MIN_LENGTH ||
      normalizedName.length > USERNAME_MAX_LENGTH
    ) {
      setError(`用户名需为 ${USERNAME_MIN_LENGTH}-${USERNAME_MAX_LENGTH} 位`);
      return;
    }

    if (!USERNAME_REGEX.test(normalizedName)) {
      setError("用户名仅允许字母、数字和下划线");
      return;
    }

    if (registerPassword.length < PASSWORD_MIN_LENGTH) {
      setError(`密码至少 ${PASSWORD_MIN_LENGTH} 位`);
      return;
    }

    if (registerPassword !== confirmPassword) {
      setError("两次输入的密码不一致");
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
    <div className="min-h-screen bg-white px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-md rounded-card border border-hairline bg-white p-6 shadow-card sm:p-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-[28px] font-bold leading-[1.43] text-ink">
              {mode === "login" ? "欢迎回来" : "创建新账号"}
            </h1>
            <p className="mt-2 text-sm text-muted-custom">
              {mode === "login"
                ? "使用用户名 + 密码登录"
                : "设置用户名和密码即可注册"}
            </p>
          </div>
          <div className="rounded-pill bg-surface-soft p-1 text-xs font-medium text-body">
            <button
              type="button"
              onClick={() => {
                setMode("login");
                setError("");
              }}
              className={`rounded-full px-3 py-1 transition ${
                mode === "login"
                  ? "bg-brand text-white"
                  : "hover:bg-white"
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
                  ? "bg-brand text-white"
                  : "hover:bg-white"
              }`}
            >
              注册
            </button>
          </div>
        </div>

        {mode === "login" ? (
          <form onSubmit={handleLogin} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="loginName" className="text-sm font-medium text-body">
                用户名
              </label>
              <input
                id="loginName"
                type="text"
                value={loginName}
                onChange={(e) => setLoginName(e.target.value)}
                placeholder="例如 beatmaker_01"
                className="w-full rounded-lg border border-hairline px-3 py-2.5 text-sm text-ink outline-none focus:border-[#222222]"
                required
                minLength={USERNAME_MIN_LENGTH}
                maxLength={USERNAME_MAX_LENGTH}
                pattern="[a-zA-Z0-9_]+"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-body">
                密码
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="请输入密码"
                className="w-full rounded-lg border border-hairline px-3 py-2.5 text-sm text-ink outline-none focus:border-[#222222]"
                required
                minLength={PASSWORD_MIN_LENGTH}
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
              className="w-full rounded-lg bg-brand py-2.5 text-sm font-medium text-white hover:bg-[#e00b41] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "登录中..." : "登录"}
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegister} className="mt-6 space-y-4">
            <div className="space-y-2">
              <label htmlFor="registerName" className="text-sm font-medium text-body">
                用户名
              </label>
              <input
                id="registerName"
                type="text"
                value={registerName}
                onChange={(e) => setRegisterName(e.target.value)}
                placeholder="3-50 位，仅字母、数字、下划线"
                className="w-full rounded-lg border border-hairline px-3 py-2.5 text-sm text-ink outline-none focus:border-[#222222]"
                required
                minLength={USERNAME_MIN_LENGTH}
                maxLength={USERNAME_MAX_LENGTH}
                pattern="[a-zA-Z0-9_]+"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="registerPassword" className="text-sm font-medium text-body">
                密码
              </label>
              <input
                id="registerPassword"
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                placeholder="至少 6 位"
                className="w-full rounded-lg border border-hairline px-3 py-2.5 text-sm text-ink outline-none focus:border-[#222222]"
                required
                minLength={PASSWORD_MIN_LENGTH}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="confirmPassword" className="text-sm font-medium text-body">
                确认密码
              </label>
              <input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="请再次输入密码"
                className="w-full rounded-lg border border-hairline px-3 py-2.5 text-sm text-ink outline-none focus:border-[#222222]"
                required
                minLength={PASSWORD_MIN_LENGTH}
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
              className="w-full rounded-lg bg-brand py-2.5 text-sm font-medium text-white hover:bg-[#e00b41] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {loading ? "注册中..." : "立即注册"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
