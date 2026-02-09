"use client";

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';

export default function Sidebar() {
  const { user, logout, loading } = useAuth();
  const pathname = usePathname();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const isActive = (path: string) => {
    if (path === '#' || !path) {
      return false;
    }
    if (path === '/') {
      return pathname === '/';
    }
    return pathname.startsWith(path);
  };

  const navItems = [
    {
      href: '/',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      label: '首页',
      show: true
    },
    {
      href: '/presets',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      ),
      label: '预设广场',
      show: true
    },
    {
      href: '/events',
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
      label: '活动',
      show: true
    },
    {
      href: user?.id ? `/users/${user.id}` : '#',
      icon: user ? (
        <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xs font-bold overflow-hidden">
          {user.avatar ? (
            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
          ) : (
            user.name.charAt(0).toUpperCase()
          )}
        </div>
      ) : (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      label: user?.name || '个人界面',
      show: true
    }
  ];

  return (
    <>
      <aside
        className={`fixed left-0 top-0 h-full bg-white dark:bg-black border-r border-gray-300 dark:border-gray-800 transition-all duration-300 z-50 flex-shrink-0 ${
          isHovered ? 'w-64' : 'w-20'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="flex flex-col h-full py-4">
          {/* Logo */}
          <div className="px-4 mb-8">
            <Link
              href="/"
              className="flex items-center gap-3 text-gray-900 dark:text-white hover:opacity-70 transition-opacity"
            >
              <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
                <img 
                  src="/icons/logo.svg" 
                  alt="supreset logo" 
                  className="w-full h-full object-contain"
                />
              </div>
              <span
                className={`text-xl font-semibold whitespace-nowrap transition-all duration-300 ${
                  isHovered
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 -translate-x-4 w-0 overflow-hidden'
                }`}
              >
                supreset
              </span>
            </Link>
          </div>

          {/* 导航项 */}
          <nav className="flex-1 px-3 space-y-1">
            {navItems
              .filter(item => item.show)
              .map((item, index) => {
                const active = isActive(item.href);
                // 通过 href 判断是否是个人界面链接（更可靠）
                const isProfileLink = item.href.startsWith('/users/') || item.href === '#';
                // 如果是个人界面且未登录或没有用户ID，显示按钮打开登录弹窗
                const shouldShowLogin = isProfileLink && (!user || !user.id);

                // 如果是个人界面且未登录，显示按钮而不是链接
                if (shouldShowLogin) {
                  return (
                    <button
                      key={`profile-${index}`}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setIsAuthModalOpen(true);
                      }}
                      className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group w-full text-left ${
                        active
                          ? 'bg-gray-100 dark:bg-gray-900'
                          : 'hover:bg-gray-50 dark:hover:bg-gray-900'
                      }`}
                    >
                      <div
                        className={`flex-shrink-0 ${
                          active
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                        }`}
                      >
                        {item.icon}
                      </div>
                      <span
                        className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                          isHovered
                            ? 'opacity-100 translate-x-0'
                            : 'opacity-0 -translate-x-4 w-0 overflow-hidden'
                        } ${
                          active
                            ? 'text-gray-900 dark:text-white'
                            : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                        }`}
                      >
                        {item.label}
                      </span>
                    </button>
                  );
                }

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-3 py-3 rounded-lg transition-colors group ${
                      active
                        ? 'bg-gray-100 dark:bg-gray-900'
                        : 'hover:bg-gray-50 dark:hover:bg-gray-900'
                    }`}
                  >
                    <div
                      className={`flex-shrink-0 ${
                        active
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                      }`}
                    >
                      {item.icon}
                    </div>
                    <span
                      className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                        isHovered
                          ? 'opacity-100 translate-x-0'
                          : 'opacity-0 -translate-x-4 w-0 overflow-hidden'
                      } ${
                        active
                          ? 'text-gray-900 dark:text-white'
                          : 'text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white'
                      }`}
                    >
                      {item.label}
                    </span>
                  </Link>
                );
              })}
          </nav>

          {/* 底部操作 */}
          <div className="px-3 space-y-1 border-t border-gray-300 dark:border-gray-800 pt-4">
            {loading ? (
              <div className="flex items-center gap-3 px-3 py-3">
                <div className="w-6 h-6 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                {isHovered && (
                  <div className="h-4 w-20 bg-gray-200 dark:bg-gray-700 animate-pulse rounded"></div>
                )}
              </div>
            ) : user ? (
              <>
                <button
                  onClick={logout}
                  className="flex items-center gap-3 px-3 py-3 rounded-lg transition-colors w-full text-left hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                  </svg>
                  <span
                    className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                      isHovered
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 -translate-x-4 w-0 overflow-hidden'
                    }`}
                  >
                    退出登录
                  </span>
                </button>
              </>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-3 px-3 py-3 rounded-lg transition-colors w-full text-left hover:bg-gray-50 dark:hover:bg-gray-900 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                <span
                  className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${
                    isHovered
                      ? 'opacity-100 translate-x-0'
                      : 'opacity-0 -translate-x-4 w-0 overflow-hidden'
                  }`}
                >
                  登录
                </span>
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* 登录/注册模态框 */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}

