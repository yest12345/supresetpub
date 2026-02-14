"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COUNTDOWN_SECONDS = 60;

type Mode = "login" | "register";

export default function EmailCodeLoginPage() {
  const { loginWithCode } = useAuth();
  const [mode, setMode] = useState<Mode>("login");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);

  const normalizedEmail = email.trim().toLowerCase();
  const isEmailValid = EMAIL_REGEX.test(normalizedEmail);
  const isCodeValid = code.trim().length === 6;

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleSendCode = async () => {
    setSending(true);
    try {
      const response = await fetch("/api/auth/send-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail }),
      });
      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "验证码发送失败");
      }

      setCountdown(COUNTDOWN_SECONDS);
      window.alert("发送成功");
    } catch (error: any) {
      window.alert(error.message || "验证码发送失败");
    } finally {
      setSending(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const trimmedCode = code.trim();

    if (!isEmailValid) {
      window.alert("请输入正确的邮箱格式");
      return;
    }
    if (trimmedCode.length !== 6) {
      window.alert("请输入 6 位验证码");
      return;
    }
    if (mode === "register" && !agreed) {
      window.alert("请先同意服务协议");
      return;
    }

    setLoading(true);
    try {
      await loginWithCode(normalizedEmail, trimmedCode);
      if (typeof window !== "undefined") {
        window.location.href = "/";
      }
    } catch (error: any) {
      window.alert(error.message || "登录失败");
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
              请输入邮箱获取验证码，5 分钟内有效
            </p>
          </div>
          <div className="rounded-full bg-neutral-100 p-1 text-xs font-medium text-neutral-600">
            <button
              type="button"
              onClick={() => setMode("login")}
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
              onClick={() => setMode("register")}
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

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-neutral-700">
              邮箱
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="code" className="text-sm font-medium text-neutral-700">
              验证码
            </label>
            <div className="flex gap-2">
              <input
                id="code"
                type="text"
                inputMode="numeric"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="6 位验证码"
                className="flex-1 rounded-lg border border-neutral-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900"
                required
                minLength={6}
                maxLength={6}
              />
              <button
                type="button"
                onClick={handleSendCode}
                disabled={!isEmailValid || sending || countdown > 0}
                className="whitespace-nowrap rounded-lg border border-neutral-900 px-4 py-2 text-sm font-medium text-neutral-900 hover:bg-neutral-900 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                {countdown > 0
                  ? `已发送 (${countdown}s)`
                  : sending
                    ? "发送中..."
                    : "获取验证码"}
              </button>
            </div>
          </div>

          {mode === "register" && (
            <label className="flex items-start gap-2 text-sm text-neutral-600">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-neutral-300 text-neutral-900 focus:ring-neutral-900"
              />
              <span>我已阅读并同意服务协议</span>
            </label>
          )}

          <button
            type="submit"
            disabled={loading || (mode === "register" && !agreed)}
            className="w-full rounded-lg bg-neutral-900 py-2 text-sm font-semibold text-white hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {loading
              ? "提交中..."
              : mode === "login"
                ? "登录"
                : "立即注册"}
          </button>
        </form>
      </div>
    </div>
  );
}
