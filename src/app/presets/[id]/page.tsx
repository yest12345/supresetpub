"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface PresetDetail {
  id: number;
  title: string;
  description: string | null;
  daw: string;
  format: string;
  filePath: string;
  fileSize: number;
  files?: Array<{
    filePath: string;
    fileSize: number;
    originalName: string;
  }>;
  coverImage: string | null;
  previewAudio: string | null;
  downloads: number;
  likesCount: number;
  favoritesCount: number;
  isPublic: boolean;
  createdAt: string;
  updatedAt: string;
  user: {
    id: number;
    name: string;
    avatar: string | null;
    bio: string | null;
  };
  tags: Array<{
    tag: {
      id: number;
      name: string;
    };
  }>;
  comments: Array<{
    id: number;
    content: string;
    createdAt: string;
    user: {
      id: number;
      name: string;
      avatar: string | null;
    };
  }>;
  _count: {
    comments: number;
    likes: number;
    favorites: number;
    downloadsLog: number;
  };
}

export default function PresetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, token } = useAuth();
  const [preset, setPreset] = useState<PresetDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);
  const [liking, setLiking] = useState(false);
  const [favoriting, setFavoriting] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchPresetDetail();
      checkUserInteractions();
    }
  }, [params.id]);

  const fetchPresetDetail = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/presets/${params.id}`);
      const data = await response.json();

      if (data.success) {
        setPreset(data.data);
      } else {
        console.error('Failed to fetch preset:', data.error);
      }
    } catch (error) {
      console.error('Failed to fetch preset:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkUserInteractions = async () => {
    const userId = 2025100900; // TODO: Get from auth context
    try {
      // 检查点赞状态
      const likesResponse = await fetch(`/api/likes?userId=${userId}&presetId=${params.id}`);
      const likesData = await likesResponse.json();
      if (likesData.success && likesData.data.length > 0) {
        setIsLiked(true);
      }

      // 检查收藏状态
      const favoritesResponse = await fetch(`/api/favorites?userId=${userId}`);
      const favoritesData = await favoritesResponse.json();
      if (favoritesData.success) {
        const isFav = favoritesData.data.some((fav: any) => fav.presetId === parseInt(params.id as string));
        setIsFavorited(isFav);
      }
    } catch (error) {
      console.error('Failed to check user interactions:', error);
    }
  };

  const handleDownload = async () => {
    if (!preset) return;
    
    // 检查是否登录
    if (!user) {
      alert('请先登录后再下载预设');
      return;
    }
    
    if (!token) {
      alert('登录已过期，请重新登录');
      return;
    }
    
    // 调试信息：查看 preset.files 的值
    console.log('🔍 预设数据:', {
      id: preset.id,
      title: preset.title,
      files: preset.files,
      filesType: typeof preset.files,
      isArray: Array.isArray(preset.files),
      filesLength: preset.files ? (preset.files as any).length : 0
    });
    
    try {
      // 记录下载（需要登录）
      const response = await fetch(`/api/presets/${preset.id}/download`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({})
      });
      const data = await response.json();
      
      if (data.success) {
        // 显示下载提示
        if (!data.data.isFirstDownload) {
          console.log('ℹ️ 您已下载过此预设，下载次数不会重复计数');
        }
        
        // 检查是否为预设包（多个文件）
        if (preset.files && Array.isArray(preset.files) && preset.files.length > 0) {
          console.log(`📦 开始打包下载预设包，共 ${preset.files.length} 个文件`);
          
          // 请求服务器打包文件
          try {
            const zipResponse = await fetch(`/api/presets/${preset.id}/download-zip`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            
            if (zipResponse.ok) {
              const blob = await zipResponse.blob();
              const url = window.URL.createObjectURL(blob);
              const link = document.createElement('a');
              link.href = url;
              link.download = `${preset.title}.zip`;
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
              window.URL.revokeObjectURL(url);
              console.log('✅ 预设包下载已开始');
            } else {
              const errorData = await zipResponse.json();
              console.error('ZIP下载失败:', errorData);
              throw new Error(errorData.error || '打包下载失败');
            }
          } catch (zipError) {
            console.error('打包下载失败，尝试逐个下载:', zipError);
            alert('打包下载失败，将逐个下载文件');
            
            // 降级方案：逐个下载
            preset.files.forEach((file, index) => {
              setTimeout(() => {
                const link = document.createElement('a');
                link.href = file.filePath;
                link.download = file.originalName;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              }, index * 500);
            });
          }
        } else {
          // 单个文件下载
          console.log('📥 开始下载单个文件:', preset.filePath);
          
          try {
            const link = document.createElement('a');
            link.href = preset.filePath;
            link.download = preset.title + preset.format;
            link.target = '_blank'; // 在新标签页打开，避免被拦截
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            console.log('✅ 单文件下载已开始');
          } catch (downloadError) {
            console.error('下载失败:', downloadError);
            alert('下载失败，请检查文件是否存在');
          }
        }
        
        // 刷新预设数据以更新下载计数
        fetchPresetDetail();
      } else {
        console.error('❌ 下载失败:', data.error);
        alert('下载失败: ' + data.error);
      }
    } catch (error) {
      console.error('❌ 下载请求失败:', error);
      alert('下载失败，请稍后重试');
    }
  };

  const handleLike = async () => {
    if (!preset || liking) return;
    
    setLiking(true);
    try {
      const response = await fetch('/api/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          presetId: preset.id,
          userId: 2025100900 // TODO: Get from auth context - 临时使用测试用户
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        // 根据返回的 action 更新本地状态，避免重新加载整个页面
        if (data.action === 'liked') {
          setPreset({ 
            ...preset, 
            likesCount: preset.likesCount + 1,
            _count: { ...preset._count, likes: preset._count.likes + 1 }
          });
          setIsLiked(true);
        } else if (data.action === 'unliked') {
          setPreset({ 
            ...preset, 
            likesCount: Math.max(0, preset.likesCount - 1),
            _count: { ...preset._count, likes: Math.max(0, preset._count.likes - 1) }
          });
          setIsLiked(false);
        }
      }
    } catch (error) {
      console.error('Like failed:', error);
    } finally {
      setLiking(false);
    }
  };

  const handleFavorite = async () => {
    if (!preset || favoriting) return;
    
    setFavoriting(true);
    try {
      const response = await fetch('/api/favorites', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          presetId: preset.id,
          userId: 2025100900 // TODO: Get from auth context - 临时使用测试用户
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        // 根据返回的 action 更新本地状态，避免重新加载整个页面
        if (data.action === 'favorited') {
          setPreset({ 
            ...preset, 
            favoritesCount: preset.favoritesCount + 1,
            _count: { ...preset._count, favorites: preset._count.favorites + 1 }
          });
          setIsFavorited(true);
        } else if (data.action === 'unfavorited') {
          setPreset({ 
            ...preset, 
            favoritesCount: Math.max(0, preset.favoritesCount - 1),
            _count: { ...preset._count, favorites: Math.max(0, preset._count.favorites - 1) }
          });
          setIsFavorited(false);
        }
      }
    } catch (error) {
      console.error('Favorite failed:', error);
    } finally {
      setFavoriting(false);
    }
  };

  const handleDelete = async () => {
    if (!preset || deleting) return;

    setDeleting(true);
    try {
      const response = await fetch(`/api/presets/${preset.id}`, {
        method: 'DELETE',
        headers: {
          ...(token && { 'Authorization': `Bearer ${token}` })
        }
      });
      
      if (response.ok) {
        // 删除成功，不显示提示，直接跳转
        router.push('/presets');
      } else {
        alert('删除失败，请联系管理员');
      }
    } catch (error) {
      console.error('Delete failed:', error);
      alert('删除失败，请联系管理员');
    } finally {
      setDeleting(false);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(2) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
      </main>
    );
  }

  if (!preset) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center py-20">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              预设未找到
            </h2>
            <button
              onClick={() => router.push('/presets')}
              className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              返回预设列表
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Cover Image */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden mb-6">
                <div className="relative h-96 bg-gradient-to-br from-purple-500 to-pink-500">
                  {preset.coverImage && !imageError ? (
                    <img
                      src={preset.coverImage}
                      alt={preset.title}
                      className="w-full h-full object-cover"
                      onError={() => setImageError(true)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-white text-8xl font-bold opacity-50">
                        {preset.daw.charAt(0)}
                      </div>
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-black/70 text-white px-3 py-1 rounded-lg text-sm font-medium">
                    {preset.daw}
                  </div>
                </div>
              </div>

              {/* Audio Preview */}
              {preset.previewAudio && (
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                  <div className="flex items-center gap-3 mb-3">
                    <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      预设试听
                    </h3>
                  </div>
                  <audio 
                    controls 
                    className="w-full"
                    preload="metadata"
                  >
                    <source src={preset.previewAudio} type="audio/mpeg" />
                    <source src={preset.previewAudio} type="audio/wav" />
                    <source src={preset.previewAudio} type="audio/ogg" />
                    您的浏览器不支持音频播放。
                  </audio>
                </div>
              )}

              {/* Title and Description */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                  {preset.title}
                </h1>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {preset.tags.map((tagItem) => (
                    <span
                      key={tagItem.tag.id}
                      className="bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-3 py-1 rounded-full text-sm font-medium"
                    >
                      {tagItem.tag.name}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center gap-6 mb-6 text-gray-600 dark:text-gray-400">
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    {preset._count.downloadsLog} 次下载
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {preset._count.likes} 点赞
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    {preset._count.favorites} 收藏
                  </span>
                  <span className="flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    {preset._count.comments} 评论
                  </span>
                </div>

                {preset.description && (
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    {preset.description}
                  </p>
                )}
              </div>

              {/* Comments */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                  评论 ({preset._count.comments})
                </h2>
                
                {preset.comments.length === 0 ? (
                  <p className="text-gray-500 dark:text-gray-400 text-center py-8">
                    暂无评论
                  </p>
                ) : (
                  <div className="space-y-4">
                    {preset.comments.map((comment) => (
                      <div key={comment.id} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold overflow-hidden flex-shrink-0">
                            {comment.user.avatar ? (
                              <img src={comment.user.avatar} alt={comment.user.name} className="w-full h-full object-cover" />
                            ) : (
                              comment.user.name.charAt(0).toUpperCase()
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-gray-900 dark:text-white">
                                {comment.user.name}
                              </span>
                              <span className="text-xs text-gray-500 dark:text-gray-400">
                                {new Date(comment.createdAt).toLocaleDateString('zh-CN')}
                              </span>
                            </div>
                            <p className="text-gray-700 dark:text-gray-300">
                              {comment.content}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Download Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-6 sticky top-20">
                <div className="mb-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">文件格式</p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">{preset.format}</p>
                </div>
                
                {preset.files && preset.files.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">预设包</p>
                    <p className="text-lg font-semibold text-purple-600 dark:text-purple-400 flex items-center gap-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                      {preset.files.length} 个文件
                    </p>
                  </div>
                )}
                
                <div className="mb-6">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {preset.files && preset.files.length > 0 ? '总大小' : '文件大小'}
                  </p>
                  <p className="text-lg font-semibold text-gray-900 dark:text-white">
                    {formatFileSize(preset.fileSize)}
                  </p>
                </div>

                <button
                  onClick={handleDownload}
                  className={`w-full font-semibold py-3 px-4 rounded-lg transition-colors mb-3 flex items-center justify-center gap-2 ${
                    user
                      ? 'bg-purple-600 hover:bg-purple-700 text-white'
                      : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                  }`}
                  title={!user ? '请先登录后再下载' : ''}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  {user ? '下载预设' : '登录后下载'}
                </button>

                <div className="flex gap-2">
                  <button
                    onClick={handleLike}
                    disabled={liking}
                    className={`flex-1 border ${
                      isLiked 
                        ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400' 
                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    } font-semibold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${liking ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <svg 
                      className={`w-5 h-5 ${liking ? 'animate-pulse' : ''}`} 
                      fill={isLiked ? 'currentColor' : 'none'} 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                    </svg>
                    {liking ? '处理中...' : '点赞'}
                  </button>
                  <button
                    onClick={handleFavorite}
                    disabled={favoriting}
                    className={`flex-1 border ${
                      isFavorited 
                        ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-400' 
                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                    } font-semibold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${favoriting ? 'opacity-50 cursor-not-allowed' : ''}`}
                  >
                    <svg 
                      className={`w-5 h-5 ${favoriting ? 'animate-pulse' : ''}`} 
                      fill={isFavorited ? 'currentColor' : 'none'} 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                    </svg>
                    {favoriting ? '处理中...' : '收藏'}
                  </button>
                </div>

                {/* 编辑和删除按钮 - 只对作者显示 */}
                {user && user.id === preset.userId && (
                  <div className="mt-2 space-y-2">
                    <button
                      onClick={() => router.push(`/presets/${preset.id}/edit`)}
                      className="w-full border border-purple-300 dark:border-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-semibold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                      </svg>
                      编辑预设
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={deleting}
                      className={`w-full border border-red-300 dark:border-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400 font-semibold py-2 px-4 rounded-lg transition-all flex items-center justify-center gap-2 ${deleting ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <svg className={`w-5 h-5 ${deleting ? 'animate-pulse' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      {deleting ? '删除中...' : '删除预设'}
                    </button>
                  </div>
                )}
              </div>

              {/* Creator Card */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">创作者</h3>
                <div className="flex items-start gap-3">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-xl font-bold overflow-hidden flex-shrink-0">
                    {preset.user.avatar ? (
                      <img src={preset.user.avatar} alt={preset.user.name} className="w-full h-full object-cover" />
                    ) : (
                      preset.user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {preset.user.name}
                    </h4>
                    {preset.user.bio && (
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {preset.user.bio}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
  );
}
