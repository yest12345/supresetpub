"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function UsersPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user?.id) {
        // 如果已登录，重定向到用户个人页面
        router.replace(`/users/${user.id}`);
      } else {
        // 如果未登录，重定向到首页
        router.replace('/');
      }
    }
  }, [user, loading, router]);

  // 显示加载状态
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    </main>
  );
}

