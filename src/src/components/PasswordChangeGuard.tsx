"use client";

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';

/**
 * 密码修改守卫组件
 * 检查用户是否需要修改密码，如果需要则强制跳转到修改密码页面
 */
export default function PasswordChangeGuard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // 如果正在加载或没有用户，不处理
    if (loading || !user) {
      return;
    }

    // 如果用户需要修改密码，且当前不在修改密码页面，则跳转
    if (user.mustChangePassword && pathname !== '/auth/change-password') {
      router.push('/auth/change-password');
    }
  }, [user, loading, pathname, router]);

  return null; // 这个组件不渲染任何内容
}



