"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import PresetCard from '../../components/PresetCard';
import { useAuth } from '@/contexts/AuthContext';

interface Preset {
  id: number;
  title: string;
  description: string | null;
  daw: string;
  format: string;
  coverImage: string | null;
  downloads: number;
  likesCount: number;
  favoritesCount: number;
  createdAt: string;
  user: {
    id: number;
    name: string;
    avatar: string | null;
  };
  tags: Array<{
    tag: {
      id: number;
      name: string;
    };
  }>;
}

export default function FavoritesPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const [favorites, setFavorites] = useState<Preset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading) {
      if (!user) {
        router.push('/');
        return;
      }
      fetchFavorites();
    }
  }, [user, authLoading]);

  const fetchFavorites = async () => {
    if (!user) return;

    try {
      const response = await fetch(`/api/favorites?userId=${user.id}&limit=100`);
      const data = await response.json();

      if (data.success) {
        const favoritePresets = data.data.map((fav: any) => fav.preset);
        setFavorites(favoritePresets);
      }
    } catch (error) {
      console.error('Failed to fetch favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
            我的收藏
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            共收藏了 {favorites.length} 个预设
          </p>
        </div>

        {/* 预设列表 */}
        {favorites.length === 0 ? (
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-12 text-center">
            <svg className="mx-auto h-16 w-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
            </svg>
            <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
              还没有收藏任何预设
            </h3>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              浏览预设并点击收藏按钮来保存你喜欢的预设
            </p>
            <button
              onClick={() => router.push('/presets')}
              className="mt-6 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              浏览预设
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {favorites.map((preset) => (
              <PresetCard key={preset.id} preset={preset} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
