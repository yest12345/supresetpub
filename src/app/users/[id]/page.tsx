"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import PresetCard from '../../../components/PresetCard';
import UploadModal from '../../../components/UploadModal';
import { useAuth } from '@/contexts/AuthContext';

interface User {
  id: number;
  name: string;
  email: string;
  avatar: string | null;
  bio: string | null;
  role: string;
  createdAt: string;
  _count: {
    presets: number;
    likes: number;
    favorites: number;
    comments: number;
    receivedDonations: number;
  };
}

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

export default function UserProfilePage() {
  const params = useParams();
  const router = useRouter();
  const { user: currentUser, token } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [presets, setPresets] = useState<Preset[]>([]);
  const [loading, setLoading] = useState(true);
  const [presetsLoading, setPresetsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'presets' | 'favorites' | 'trash' | 'events'>('presets');
  const [events, setEvents] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({ name: '', bio: '' });
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const isOwnProfile = currentUser?.id === parseInt(params.id as string);

  const fetchUserProfile = async () => {
    try {
      const response = await fetch(`/api/users/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setUser(data.data);
        setEditForm({
          name: data.data.name,
          bio: data.data.bio || ''
        });
      }
    } catch (error) {
      console.error('Failed to fetch user profile:', error);
    }
  };

  const fetchUserPresets = async (tab: 'presets' | 'favorites' | 'trash' | 'events' = activeTab) => {
    try {
      if (tab === 'presets') {
        const response = await fetch(`/api/presets?userId=${params.id}&limit=20`);
        const data = await response.json();
        if (data.success) {
          setPresets(data.data);
        }
      } else if (tab === 'favorites') {
        const response = await fetch(`/api/favorites?userId=${params.id}&limit=20`);
        const data = await response.json();
        if (data.success) {
          const favoritePresets = data.data.map((fav: any) => fav.preset);
          setPresets(favoritePresets);
        }
      } else if (tab === 'events') {
        const response = await fetch(`/api/events?organizerId=${params.id}&limit=20`);
        const data = await response.json();
        if (data.success) {
          setEvents(data.data);
        }
      } else if (tab === 'trash') {
        if (!token) return;
        const response = await fetch(`/api/presets/trash`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        const data = await response.json();
        if (data.success) {
          setPresets(data.data);
        }
      }
    } catch (error) {
      console.error('Failed to fetch presets:', error);
    }
  };

  // 初始加载：并行获取用户信息和预设列表
  useEffect(() => {
    if (params.id) {
      setLoading(true);
      Promise.all([
        fetchUserProfile(),
        fetchUserPresets('presets')
      ]).finally(() => {
        setLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  // 切换标签页时只加载预设数据
  useEffect(() => {
    if (params.id && user) {
      setPresetsLoading(true);
      fetchUserPresets(activeTab).finally(() => {
        setPresetsLoading(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab]);

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatarFile(file);
      // 创建预览
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveProfile = async () => {
    if (!token) {
      alert('请先登录');
      return;
    }

    try {
      let avatarUrl = user?.avatar;

      // 如果有新头像，先上传
      if (avatarFile) {
        const formData = new FormData();
        formData.append('file', avatarFile);
        formData.append('type', 'cover'); // 使用 cover 类型上传

        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        const uploadData = await uploadResponse.json();
        if (uploadData.success) {
          avatarUrl = uploadData.data.filePath;
        } else {
          alert('头像上传失败');
          return;
        }
      }

      const response = await fetch(`/api/users/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          ...editForm,
          avatar: avatarUrl
        })
      });

      const data = await response.json();

      if (data.success) {
        setUser(data.data);
        setIsEditing(false);
        setAvatarFile(null);
        setAvatarPreview(null);
        alert('资料更新成功！');
      } else {
        alert('更新失败: ' + data.error);
      }
    } catch (error) {
      console.error('Failed to update profile:', error);
      alert('更新失败，请重试');
    }
  };

  const handleDeletePreset = async (presetId: number) => {
    if (!token) {
      alert('请先登录');
      return;
    }

    try {
      const response = await fetch(`/api/presets/${presetId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        // 删除成功，不显示提示，直接刷新列表
        fetchUserPresets(activeTab);
      } else {
        alert('删除失败，请联系管理员');
      }
    } catch (error) {
      console.error('Delete failed:', error);
      alert('删除失败，请联系管理员');
    }
  };

  const handleRestorePreset = async (presetId: number) => {
    if (!token) {
      alert('请先登录');
      return;
    }

    try {
      const response = await fetch(`/api/presets/${presetId}/restore`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.ok) {
        // 恢复成功，刷新回收站列表
        fetchUserPresets('trash');
      } else {
        const data = await response.json();
        alert(data.error || '恢复失败，请联系管理员');
      }
    } catch (error) {
      console.error('Restore failed:', error);
      alert('恢复失败，请联系管理员');
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white dark:bg-black pt-8">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      </main>
    );
  }

  if (!user) {
    return (
      <main className="min-h-screen bg-white dark:bg-black pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-4">
              用户未找到
            </h2>
            <button
              onClick={() => router.push('/')}
              className="px-6 py-2 bg-gray-900 dark:bg-white text-white dark:text-black rounded-lg transition-colors font-medium"
            >
              返回首页
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <>
      <main className="min-h-screen bg-white dark:bg-black pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Instagram 风格的个人资料头部 */}
          <div className="mb-12">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8 sm:gap-12">
              {/* 头像 */}
              <div className="flex-shrink-0 mx-auto sm:mx-0">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-2 border-gray-300 dark:border-gray-700 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-3xl sm:text-4xl font-bold overflow-hidden">
                  {user.avatar ? (
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                  ) : (
                    user.name.charAt(0).toUpperCase()
                  )}
                </div>
              </div>

              {/* 用户信息区域 */}
              <div className="flex-1 min-w-0 w-full sm:w-auto">
                {/* 用户名和操作按钮 */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-5">
                  <div className="flex items-center gap-3">
                    <h1 className="text-xl sm:text-2xl font-normal text-gray-900 dark:text-white">
                      {user.name}
                    </h1>
                    {user.role === 'admin' && (
                      <span className="text-xs bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 px-2.5 py-1 rounded-md font-medium">
                        管理员
                      </span>
                    )}
                  </div>
                  
                  {isOwnProfile ? (
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          if (isEditing) {
                            setAvatarFile(null);
                            setAvatarPreview(null);
                          }
                          setIsEditing(!isEditing);
                        }}
                        className="px-4 py-1.5 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      >
                        {isEditing ? '取消' : '编辑主页'}
                      </button>
                      
                      {/* 上传预设按钮 */}
                      <button
                        onClick={() => setIsUploadModalOpen(true)}
                        className="px-4 py-1.5 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors"
                      >
                        上传预设
                      </button>
                    </div>
                  ) : (
                    <button className="px-4 py-1.5 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors">
                      关注
                    </button>
                  )}
                </div>

                {/* 统计数据 */}
                <div className="flex items-center gap-6 sm:gap-10 mb-5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-semibold text-gray-900 dark:text-white">
                      {user._count?.presets || 0}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">预设</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-semibold text-gray-900 dark:text-white">
                      {user._count?.favorites || 0}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">收藏</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-base font-semibold text-gray-900 dark:text-white">
                      {user._count?.likes || 0}
                    </span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">点赞</span>
                  </div>
                </div>

                {/* 个人简介 */}
                <div className="mb-4">
                  {isEditing ? (
                    <div className="space-y-3">
                      {/* 编辑模式表单保持不变... */}
                      <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                          头像
                        </label>
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-20 rounded-full border-2 border-gray-300 dark:border-gray-700 bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl font-bold overflow-hidden">
                            {avatarPreview ? (
                              <img src={avatarPreview} alt="预览" className="w-full h-full object-cover" />
                            ) : user?.avatar ? (
                              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                            ) : (
                              user?.name.charAt(0).toUpperCase()
                            )}
                          </div>
                          <label className="cursor-pointer px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-900 transition-colors">
                            选择图片
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleAvatarChange}
                              className="hidden"
                            />
                          </label>
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                          用户名
                        </label>
                        <input
                          type="text"
                          value={editForm.name}
                          onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-black text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400"
                          placeholder="用户名"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-900 dark:text-white mb-2">
                          个人简介
                        </label>
                        <textarea
                          value={editForm.bio}
                          onChange={(e) => setEditForm({ ...editForm, bio: e.target.value })}
                          className="w-full px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded bg-white dark:bg-black text-gray-900 dark:text-white focus:outline-none focus:ring-1 focus:ring-gray-400 resize-none"
                          placeholder="写一段个人简介..."
                          rows={4}
                        />
                      </div>

                      <button
                        onClick={handleSaveProfile}
                        className="w-full px-4 py-2 text-sm font-medium bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                      >
                        保存更改
                      </button>
                    </div>
                  ) : (
                    user.bio && (
                      <p className="text-sm text-gray-900 dark:text-white whitespace-pre-line leading-relaxed">
                        {user.bio}
                      </p>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* 标签页 */}
          <div className="border-t border-gray-300 dark:border-gray-700 mb-6">
            <div className="flex items-center justify-center gap-12 sm:gap-16">
              <button
                onClick={() => setActiveTab('presets')}
                disabled={presetsLoading}
                className={`flex items-center gap-2 py-4 border-t-2 transition-colors ${
                  activeTab === 'presets' ? 'border-gray-900 dark:border-white' : 'border-transparent'
                } disabled:opacity-50`}
              >
                {/* SVG Icon */}
                <svg className={`w-5 h-5 ${activeTab === 'presets' ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                <span className={`text-xs font-medium uppercase tracking-wider ${activeTab === 'presets' ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>预设</span>
              </button>
              
              <button
                onClick={() => setActiveTab('favorites')}
                disabled={presetsLoading}
                className={`flex items-center gap-2 py-4 border-t-2 transition-colors ${
                  activeTab === 'favorites' ? 'border-gray-900 dark:border-white' : 'border-transparent'
                } disabled:opacity-50`}
              >
                 <svg className={`w-5 h-5 ${activeTab === 'favorites' ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg>
                <span className={`text-xs font-medium uppercase tracking-wider ${activeTab === 'favorites' ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>收藏</span>
              </button>

              {isOwnProfile && (
                <button
                  onClick={() => setActiveTab('events')}
                  disabled={presetsLoading}
                  className={`flex items-center gap-2 py-4 border-t-2 transition-colors ${
                    activeTab === 'events' ? 'border-gray-900 dark:border-white' : 'border-transparent'
                  } disabled:opacity-50`}
                >
                   <svg className={`w-5 h-5 ${activeTab === 'events' ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                  <span className={`text-xs font-medium uppercase tracking-wider ${activeTab === 'events' ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>活动</span>
                </button>
              )}

              {isOwnProfile && (
                <button
                  onClick={() => setActiveTab('trash')}
                  disabled={presetsLoading}
                  className={`flex items-center gap-2 py-4 border-t-2 transition-colors ${
                    activeTab === 'trash' ? 'border-gray-900 dark:border-white' : 'border-transparent'
                  } disabled:opacity-50`}
                >
                   <svg className={`w-5 h-5 ${activeTab === 'trash' ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                  <span className={`text-xs font-medium uppercase tracking-wider ${activeTab === 'trash' ? 'text-gray-900 dark:text-white' : 'text-gray-400 dark:text-gray-600'}`}>回收站</span>
                </button>
              )}
            </div>
          </div>

          {/* 内容展示区 */}
          {presetsLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 dark:border-white"></div>
            </div>
          ) : activeTab === 'events' ? (
            events.length === 0 ? (
              <div className="text-center py-20">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center">
                  <svg className="w-12 h-12 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                </div>
                <h3 className="text-xl font-light text-gray-900 dark:text-white mb-2">我的活动</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">你还没有发布过任何活动。</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event: any) => (
                  <Link
                    key={event.id}
                    href={`/events/${event.id}`}
                    className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-500">
                      {event.coverImage ? (
                        <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-white text-4xl font-bold">
                          {event.title.charAt(0)}
                        </div>
                      )}
                      {event.status === 'draft' && (
                        <div className="absolute top-2 right-2 bg-gray-500 text-white px-2 py-1 rounded text-xs font-semibold">草稿</div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 line-clamp-2">{event.title}</h3>
                      <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                          {event.views} 次浏览
                        </div>
                        <div className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" /></svg>
                          {event.interestedCount} 人想去
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )
          ) : presets.length === 0 ? (
            <div className="text-center py-20">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full border-2 border-gray-300 dark:border-gray-700 flex items-center justify-center">
                 <svg className="w-12 h-12 text-gray-400 dark:text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
              </div>
              <h3 className="text-xl font-light text-gray-900 dark:text-white mb-2">
                {activeTab === 'presets' && '分享预设'}
                {activeTab === 'favorites' && '收藏的预设'}
                {activeTab === 'trash' && '回收站'}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                {activeTab === 'presets' && '分享的预设会显示在你的主页中。'}
                {activeTab === 'favorites' && '你还没有收藏任何预设。'}
                {activeTab === 'trash' && '回收站是空的，已删除的预设会保留7天。'}
              </p>
              {isOwnProfile && activeTab === 'presets' && (
                <button
                  onClick={() => setIsUploadModalOpen(true)}
                  className="text-sm text-blue-500 hover:text-blue-600 font-medium"
                >
                  分享你的第一个预设
                </button>
              )}
            </div>
          ) : activeTab === 'trash' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {presets.map((preset: any) => (
                <div key={preset.id} className="relative">
                  <div className="absolute top-2 right-2 z-10 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium shadow-lg">
                    {preset.daysLeft}天后永久删除
                  </div>
                  <PresetCard preset={preset} />
                  <button
                    onClick={() => handleRestorePreset(preset.id)}
                    className="absolute bottom-4 left-4 right-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                     <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    恢复预设
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {presets.map((preset) => (
                <PresetCard 
                  key={preset.id} 
                  preset={preset}
                  showDeleteButton={isOwnProfile && activeTab === 'presets'}
                  onDelete={handleDeletePreset}
                />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={() => {
          setIsUploadModalOpen(false);
          // 刷新预设列表
          fetchUserPresets(activeTab);
        }}
      />
    </>
  );
}