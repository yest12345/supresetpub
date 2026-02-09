"use client";

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function CreateEventPage() {
  const router = useRouter();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    coverImage: '',
    ticketUrl: '', // [新增] 这里加回活动链接字段
    startTime: '',
    endTime: '',
    location: '',
    status: 'draft'
  });

  // 核心上传逻辑
  const executeUpload = async (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert('图片大小不能超过 5MB');
      return;
    }

    setUploading(true);
    const uploadFormData = new FormData();
    uploadFormData.append('file', file);
    uploadFormData.append('type', 'cover'); 

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: uploadFormData,
      });
      const data = await response.json();

      if (data.success) {
        setFormData(prev => ({ ...prev, coverImage: data.data.filePath }));
      } else {
        alert('图片上传失败: ' + (data.error || '未知错误'));
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('图片上传出错');
    } finally {
      setUploading(false);
    }
  };

  // 处理文件选择
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) executeUpload(file);
    e.target.value = '';
  };

  // 拖拽事件处理
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    if (!uploading) setIsDragging(true);
  }, [uploading]);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation();
    setIsDragging(false);
    if (uploading) return;
    const files = e.dataTransfer.files;
    if (files && files.length > 0 && files[0].type.startsWith('image/')) {
      executeUpload(files[0]);
    } else if (files && files.length > 0) {
      alert('请拖入图片文件');
    }
  }, [uploading]);

  if (!user || !token) {
    return (
      <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">请先登录</h2>
            <Link href="/auth/login" className="inline-block px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors">前往登录</Link>
          </div>
        </div>
      </main>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.startTime) {
      alert('请填写标题和开始时间');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        alert('活动创建成功！');
        router.push(`/events/${data.data.id}`);
      } else {
        alert('创建失败: ' + data.error);
      }
    } catch (error) {
      console.error('Failed to create event:', error);
      alert('创建失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/events" className="inline-flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
          返回活动列表
        </Link>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">发布活动</h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">活动标题 <span className="text-red-500">*</span></label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="输入活动标题" required />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">活动描述</label>
              <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white resize-none" placeholder="详细描述你的活动..." rows={6} />
            </div>

            {/* Cover Image (Drag & Drop) */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">封面图片</label>
              <div 
                className={`space-y-4 transition-all duration-200 rounded-lg p-1 ${isDragging ? 'ring-2 ring-purple-500 scale-[1.01]' : ''}`}
                onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop}
              >
                {formData.coverImage ? (
                  <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden group border border-gray-200 dark:border-gray-600">
                    <img src={formData.coverImage} alt="封面预览" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer" onClick={() => document.getElementById('file-upload')?.click()}>
                      <p className="text-white font-medium">点击或拖拽更换图片</p>
                    </div>
                  </div>
                ) : (
                  <div 
                    className={`w-full h-48 border-2 border-dashed rounded-lg flex flex-col items-center justify-center text-gray-500 dark:text-gray-400 transition-colors cursor-pointer ${isDragging ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-300 dark:border-gray-600 hover:border-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                    onClick={() => document.getElementById('file-upload')?.click()}
                  >
                     <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                    <p className="font-medium">点击选择或拖拽图片到这里</p>
                    <p className="text-sm mt-1 opacity-70">支持 JPG, PNG, WEBP (最大 5MB)</p>
                  </div>
                )}
                <input id="file-upload" type="file" className="hidden" accept="image/*" onChange={handleFileSelect} disabled={uploading} />
              </div>
            </div>

            {/* Time */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">开始时间 <span className="text-red-500">*</span></label>
                <input type="datetime-local" value={formData.startTime} onChange={(e) => setFormData({ ...formData, startTime: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">结束时间</label>
                <input type="datetime-local" value={formData.endTime} onChange={(e) => setFormData({ ...formData, endTime: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" />
              </div>
            </div>

            {/* Location & Ticket Link */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">活动地点</label>
                <input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="输入活动地点" />
              </div>
              {/* [新增] 活动链接输入框 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">活动链接 / 购票地址</label>
                <input type="url" value={formData.ticketUrl} onChange={(e) => setFormData({ ...formData, ticketUrl: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white" placeholder="https://..." />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">发布状态</label>
              <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white">
                <option value="draft">草稿</option>
                <option value="published">立即发布</option>
              </select>
            </div>

            {/* Buttons */}
            <div className="flex items-center gap-4 pt-4">
              <button type="submit" disabled={loading || uploading} className="flex-1 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? '创建中...' : (uploading ? '图片上传中...' : '创建活动')}
              </button>
              <Link href="/events" className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 transition-colors">取消</Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}