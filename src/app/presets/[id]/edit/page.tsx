"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function EditPresetPage() {
  const params = useParams();
  const router = useRouter();
  const { user, token } = useAuth();
  
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [preset, setPreset] = useState<any>(null);
  
  // 表单数据
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [isPublic, setIsPublic] = useState(true);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [availableTags, setAvailableTags] = useState<any[]>([]);
  
  // 文件重新上传相关
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [previewAudio, setPreviewAudio] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (!user || !token) {
      alert('请先登录');
      router.push('/');
      return;
    }
    
    fetchPresetDetail();
    fetchTags();
  }, [params.id, user, token]);

  const fetchPresetDetail = async () => {
    try {
      const response = await fetch(`/api/presets/${params.id}`);
      const data = await response.json();
      
      if (data.success) {
        const presetData = data.data;
        
        // 检查是否是作者
        if (presetData.userId !== user?.id) {
          alert('您没有权限编辑此预设');
          router.push(`/presets/${params.id}`);
          return;
        }
        
        setPreset(presetData);
        setTitle(presetData.title);
        setDescription(presetData.description || '');
        setIsPublic(presetData.isPublic);
        setSelectedTags(presetData.tags.map((t: any) => t.tag.name));
      }
    } catch (error) {
      console.error('Failed to fetch preset:', error);
      alert('加载预设失败');
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/tags');
      const data = await response.json();
      if (data.success) {
        setAvailableTags(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch tags:', error);
    }
  };

  const uploadFile = async (file: File, type: 'preset' | 'cover' | 'audio', presetPackId?: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    if (presetPackId) {
      formData.append('presetPackId', presetPackId);
    }

    const response = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    if (!result.success) {
      throw new Error(result.error || '文件上传失败');
    }

    return result.data.filePath;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) {
      alert('请输入预设标题');
      return;
    }
    
    setSaving(true);
    setUploading(true);
    
    try {
      let updateData: any = {
        title: title.trim(),
        description: description.trim() || null,
        isPublic,
        tags: selectedTags
      };

      // 如果有新的预设文件，先上传
      if (newFiles.length > 0) {
        const presetPackId = `preset-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const uploadedFiles: Array<{ filePath: string; fileSize: number; originalName: string }> = [];
        
        for (const file of newFiles) {
          const filePath = await uploadFile(file, 'preset', presetPackId);
          uploadedFiles.push({
            filePath,
            fileSize: file.size,
            originalName: file.name
          });
        }
        
        const totalSize = uploadedFiles.reduce((sum, f) => sum + f.fileSize, 0);
        updateData.filePath = uploadedFiles[0].filePath;
        updateData.fileSize = totalSize;
        updateData.files = uploadedFiles.length > 1 ? uploadedFiles : null;
      }

      // 上传封面图片
      if (coverImage) {
        updateData.coverImage = await uploadFile(coverImage, 'cover');
      }

      // 上传预览音频
      if (previewAudio) {
        updateData.previewAudio = await uploadFile(previewAudio, 'audio');
      }

      const response = await fetch(`/api/presets/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        alert('预设更新成功！');
        router.push(`/presets/${params.id}`);
      } else {
        alert('更新失败: ' + data.error);
      }
    } catch (error) {
      console.error('Failed to update preset:', error);
      alert('更新失败，请稍后重试');
    } finally {
      setSaving(false);
      setUploading(false);
    }
  };

  const toggleTag = (tagName: string) => {
    setSelectedTags(prev =>
      prev.includes(tagName)
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">加载中...</p>
        </div>
      </div>
    );
  }

  if (!preset) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">预设不存在</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div className="mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">编辑预设</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              修改预设的基本信息和标签
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* 标题 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                预设标题 *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                placeholder="请输入预设标题"
                required
              />
            </div>

            {/* 描述 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                描述
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-700 dark:text-white resize-none"
                placeholder="请输入预设描述（可选）"
              />
            </div>

            {/* 公开设置 */}
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="isPublic"
                checked={isPublic}
                onChange={(e) => setIsPublic(e.target.checked)}
                className="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="isPublic" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                公开预设（其他用户可以看到和下载）
              </label>
            </div>

            {/* 标签选择 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                标签
              </label>
              <div className="flex flex-wrap gap-2">
                {availableTags.map(tag => (
                  <button
                    key={tag.id}
                    type="button"
                    onClick={() => toggleTag(tag.name)}
                    className={`px-3 py-1 rounded-full text-sm transition-colors ${
                      selectedTags.includes(tag.name)
                        ? 'bg-purple-600 text-white'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                  >
                    {tag.name}
                  </button>
                ))}
              </div>
            </div>

            {/* 当前文件信息 */}
            <div className="bg-gray-50 dark:bg-gray-700/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">当前文件信息</h3>
              <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
                <p><span className="font-medium">DAW:</span> {preset.daw}</p>
                <p><span className="font-medium">格式:</span> {preset.format}</p>
                <p><span className="font-medium">文件大小:</span> {(preset.fileSize / 1024).toFixed(2)} KB</p>
                {preset.files && preset.files.length > 0 && (
                  <p><span className="font-medium">文件数量:</span> {preset.files.length} 个文件</p>
                )}
              </div>
            </div>

            {/* 重新上传预设文件 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                重新上传预设文件（可选）
              </label>
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                ⚠️ 文件格式必须为 {preset.format}，可以选择单个或多个文件
              </p>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                <input
                  type="file"
                  multiple
                  accept={`.${preset.format}`}
                  onChange={(e) => setNewFiles(Array.from(e.target.files || []))}
                  className="hidden"
                  id="preset-files"
                />
                <label
                  htmlFor="preset-files"
                  className="cursor-pointer inline-flex flex-col items-center"
                >
                  <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {newFiles.length > 0 
                      ? `已选择 ${newFiles.length} 个文件` 
                      : '点击选择新的预设文件'}
                  </span>
                </label>
                {newFiles.length > 0 && (
                  <div className="mt-3 text-left">
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">选中的文件:</p>
                    {newFiles.map((file, idx) => (
                      <p key={idx} className="text-xs text-gray-600 dark:text-gray-400">
                        {file.name} ({(file.size / 1024).toFixed(2)} KB)
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 重新上传封面图片 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                重新上传封面图片（可选）
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setCoverImage(e.target.files?.[0] || null)}
                  className="hidden"
                  id="cover-image"
                />
                <label htmlFor="cover-image" className="cursor-pointer inline-flex flex-col items-center">
                  <svg className="w-10 h-10 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {coverImage ? coverImage.name : '点击选择新封面'}
                  </span>
                </label>
              </div>
            </div>

            {/* 重新上传预览音频 */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                重新上传预览音频（可选）
              </label>
              <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-4 text-center">
                <input
                  type="file"
                  accept="audio/*"
                  onChange={(e) => setPreviewAudio(e.target.files?.[0] || null)}
                  className="hidden"
                  id="preview-audio"
                />
                <label htmlFor="preview-audio" className="cursor-pointer inline-flex flex-col items-center">
                  <svg className="w-10 h-10 text-gray-400 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {previewAudio ? previewAudio.name : '点击选择新预览音频'}
                  </span>
                </label>
              </div>
            </div>

            {/* 按钮组 */}
            <div className="flex gap-4 pt-4">
              <button
                type="submit"
                disabled={saving || uploading}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {uploading ? '上传文件中...' : saving ? '保存中...' : '保存修改'}
              </button>
              <button
                type="button"
                onClick={() => router.push(`/presets/${params.id}`)}
                className="flex-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-semibold py-3 px-6 rounded-lg transition-colors"
              >
                取消
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
