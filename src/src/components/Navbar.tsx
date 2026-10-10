"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from './AuthModal';

interface NavbarProps {
  visible: boolean;
}

export default function Navbar({ visible }: NavbarProps) {
  const { user, logout, loading } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border transition-all duration-300 ${
          visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo/品牌名 */}
            <div className="flex-shrink-0">
              <Link href="/" className="text-xl font-bold text-foreground hover:text-primary transition-colors">
                🎵 supreset
              </Link>
            </div>

            {/* 导航链接 */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
              >
                首页
              </Link>
              
              <Link
                href="/presets"
                className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
              >
                预设
              </Link>

              {user && (
                <>
                  <Link
                    href="/presets/upload"
                    className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
                  >
                    上传预设
                  </Link>
                  {user.role === 'admin' && (
                    <Link
                      href="/admin/users"
                      className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm font-medium transition-colors"
                    >
                      用户管理
                    </Link>
                  )}
                </>
              )}
            </div>

            {/* 用户状态区域 */}
            <div className="flex items-center space-x-4">
              {loading ? (
                <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
              ) : user ? (
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center space-x-2 text-sm font-medium text-foreground hover:text-primary transition-colors"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                      {user.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full rounded-full object-cover" />
                      ) : (
                        user.name.charAt(0).toUpperCase()
                      )}
                    </div>
                    <span className="hidden md:inline">{user.name}</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* 用户菜单下拉 */}
                  {showUserMenu && (
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg py-2 border border-gray-200 dark:border-gray-700">
                      <Link
                        href={`/users/${user.id}`}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setShowUserMenu(false)}
                      >
                        个人资料
                      </Link>
                      <Link
                        href="/favorites"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        onClick={() => setShowUserMenu(false)}
                      >
                        我的收藏
                      </Link>
                      <hr className="my-2 border-gray-200 dark:border-gray-700" />
                      <button
                        onClick={() => {
                          logout();
                          setShowUserMenu(false);
                        }}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        退出登录
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                >
                  登录
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* 登录/注册模态框 */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </>
  );
}
