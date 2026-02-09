"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

interface Tag {
  id: number;
  name: string;
}

export default function UploadPresetPage() {
  const router = useRouter();
  const { user, token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [tags, setTags] = useState<Tag[]>([]);
  
  // Form states
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [daw, setDaw] = useState('');
  const [format, setFormat] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isPublic, setIsPublic] = useState(true);
  
  // File states
  const [presetFile, setPresetFile] = useState<File | null>(null);
  const [presetFiles, setPresetFiles] = useState<File[]>([]); // 支持多个文件
  const [isFolderUpload, setIsFolderUpload] = useState(false); // 是否为文件夹上传
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [previewAudio, setPreviewAudio] = useState<File | null>(null);
  const [formatError, setFormatError] = useState<string>('');
  
  // Upload progress
  const [uploadProgress, setUploadProgress] = useState<{
    preset?: boolean;
    cover?: boolean;
    audio?: boolean;
  }>({});

  const daws = ['FL Studio', 'Reaper', 'Logic Pro', 'Ableton Live', 'Studio One', 'Pro Tools', 'Cubase', 'BandLab'];
  
  const formatsByDAW: Record<string, string[]> = {
    'FL Studio': ['.fst', '.fxp'],
    'Reaper': ['.rpl', '.rfxchain', '.fxp'],
    'Logic Pro': ['.patch', '.aupreset', '.exs', '.cst'],
    'Ableton Live': ['.adg', '.adv', '.alp', '.amxd'],
    'Studio One': ['.preset', '.song', '.fxp'],
    'Pro Tools': ['.tfx', '.ptxt'],
    'Cubase': ['.vstpreset', '.fxp', '.fxb'],
    'BandLab': ['.blx', '.blp']
  };

  useEffect(() => {
    fetchTags();
  }, []);

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/tags');
      const data = await response.json();
      if (data.success) {
        setTags(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch tags:', error);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'preset' | 'cover' | 'audio') => {
    if (type === 'preset') {
      const files = e.target.files;
      if (!files || files.length === 0) return;

      // 验证是否选择了 DAW
      if (!daw) {
        setFormatError('请先选择 DAW');
        e.target.value = '';
        return;
      }

      const supportedFormats = formatsByDAW[daw];
      const validFiles: File[] = [];
      const fileArray = Array.from(files);

      // 判断是否为文件夹上传（通过检查 webkitRelativePath 属性）
      const isFolder = fileArray.some(file => (file as any).webkitRelativePath && (file as any).webkitRelativePath.includes('/'));

      if (isFolder) {
        // 文件夹上传：筛选符合格式的文件
        fileArray.forEach(file => {
          // 过滤掉空文件和隐藏文件
          if (file.size === 0) return;
          if (file.name.startsWith('.')) return;
          
          const ext = '.' + file.name.split('.').pop()?.toLowerCase();
          // 检查扩展名是否有效（排除没有扩展名的项，通常是文件夹）
          if (!ext || ext === '.' || ext.length > 10) return;
          
          if (supportedFormats.includes(ext)) {
            validFiles.push(file);
          }
        });

        // 验证文件数量
        if (validFiles.length === 0) {
          setFormatError('该文件夹中没有该宿主的预设');
          setPresetFiles([]);
          setPresetFile(null);
          setIsFolderUpload(false);
          e.target.value = '';
          return;
        }

        if (validFiles.length > 10) {
          setFormatError('请将预设文件控制在10个以内');
          setPresetFiles([]);
          setPresetFile(null);
          setIsFolderUpload(false);
          e.target.value = '';
          return;
        }

        // 文件夹上传成功
        setFormatError('');
        setPresetFiles(validFiles);
        setPresetFile(null);
        setIsFolderUpload(true);
        const firstExt = '.' + validFiles[0].name.split('.').pop()?.toLowerCase();
        setFormat(firstExt);
      } else {
        // 单个文件上传
        const file = fileArray[0];
        const ext = '.' + file.name.split('.').pop()?.toLowerCase();

        if (!supportedFormats.includes(ext)) {
          setFormatError(`文件格式 ${ext} 不支持所选 DAW (${daw})。支持的格式：${supportedFormats.join(', ')}`);
          setPresetFile(null);
          setPresetFiles([]);
          setIsFolderUpload(false);
          setFormat('');
          e.target.value = '';
          return;
        }

        setFormatError('');
        setPresetFile(file);
        setPresetFiles([]);
        setIsFolderUpload(false);
        setFormat(ext);
      }
    } else if (type === 'cover') {
      const file = e.target.files?.[0];
      if (file) setCoverImage(file);
    } else if (type === 'audio') {
      const file = e.target.files?.[0];
      if (file) setPreviewAudio(file);
    }
  };

  // 清除文件选择
  const handleClearFiles = () => {
    setPresetFile(null);
    setPresetFiles([]);
    setIsFolderUpload(false);
    setFormat('');
    setFormatError('');
  };

  // 删除单个文件
  const handleRemoveFile = (index: number) => {
    const newFiles = presetFiles.filter((_, i) => i !== index);
    
    if (newFiles.length === 0) {
      // 如果删除后没有文件了，清空所有状态
      handleClearFiles();
    } else if (newFiles.length === 1) {
      // 如果只剩一个文件，切换到单文件模式
      setPresetFile(newFiles[0]);
      setPresetFiles([]);
      setIsFolderUpload(false);
      const ext = '.' + newFiles[0].name.split('.').pop()?.toLowerCase();
      setFormat(ext);
    } else {
      // 还有多个文件，继续多文件模式
      setPresetFiles(newFiles);
    }
  };

  const uploadFile = async (file: File, type: string, presetPackId?: string): Promise<string | null> => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', type);
    if (presetPackId) {
      formData.append('presetPackId', presetPackId); // 预设包ID，用于创建文件夹
    }

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      // 检查响应状态
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`上传失败 (${response.status}): ${errorText.substring(0, 100)}`);
      }

      const data = await response.json();
      if (data.success) {
        return data.data.filePath;
      } else {
        throw new Error(data.error || '上传失败');
      }
    } catch (error: any) {
      console.error(`Failed to upload ${type} (${file.name}):`, error);
      throw new Error(`文件 "${file.name}" 上传失败: ${error.message}`);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const hasPresetFile = presetFile || (presetFiles.length > 0);
    if (!hasPresetFile || !title || !daw || !format) {
      alert('请填写必填项并上传预设文件');
      return;
    }

    setLoading(true);
    
    try {
      const filesToUpload = isFolderUpload ? presetFiles : (presetFile ? [presetFile] : []);
      
      if (filesToUpload.length === 0) {
        alert('请上传预设文件');
        return;
      }

      // 生成唯一的预设包ID（时间戳+随机字符串）
      const presetPackId = `preset-${Date.now()}-${Math.random().toString(36).substring(2, 10)}`;
      console.log(`📦 创建预设包文件夹: ${presetPackId}`);

      // 批量上传预设文件
      setUploadProgress({ preset: true });
      const uploadedFiles: Array<{ filePath: string; fileSize: number; originalName: string }> = [];
      const failedFiles: Array<{ name: string; error: string }> = [];
      
      for (let i = 0; i < filesToUpload.length; i++) {
        const file = filesToUpload[i];
        
        // 验证文件
        if (!file || file.size === 0) {
          console.warn(`⚠️ 跳过无效文件: ${file?.name || 'unknown'}`);
          failedFiles.push({
            name: file?.name || 'unknown',
            error: '文件为空或无效'
          });
          continue;
        }
        
        try {
          console.log(`📤 正在上传文件 ${i + 1}/${filesToUpload.length}: ${file.name} (${(file.size / 1024).toFixed(2)} KB)`);
          const filePath = await uploadFile(file, 'preset', presetPackId);
          uploadedFiles.push({
            filePath,
            fileSize: file.size,
            originalName: file.name
          });
          console.log(`✅ 文件 ${i + 1}/${filesToUpload.length} 上传成功: ${file.name}`);
          
          // 添加小延迟，避免并发压力（除了最后一个文件）
          if (i < filesToUpload.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 200));
          }
        } catch (error: any) {
          console.error(`❌ 文件 ${i + 1}/${filesToUpload.length} 上传失败: ${file.name}`, error);
          failedFiles.push({
            name: file.name,
            error: error.message
          });
        }
      }

      // 如果所有文件都失败了
      if (uploadedFiles.length === 0) {
        const errorMsg = failedFiles.map(f => `${f.name}: ${f.error}`).join('\n');
        alert(`所有文件上传失败：\n${errorMsg}`);
        return;
      }

      // 如果部分文件失败
      if (failedFiles.length > 0) {
        const errorMsg = failedFiles.map(f => `${f.name}: ${f.error}`).join('\n');
        console.warn('部分文件上传失败：', errorMsg);
      }

      // 上传封面图片（如果有）
      let coverImagePath = null;
      if (coverImage) {
        setUploadProgress(prev => ({ ...prev, cover: true }));
        coverImagePath = await uploadFile(coverImage, 'cover');
      }
      
      // 上传预览音频（如果有）
      let previewAudioPath = null;
      if (previewAudio) {
        setUploadProgress(prev => ({ ...prev, audio: true }));
        previewAudioPath = await uploadFile(previewAudio, 'audio');
      }

      // 创建预设记录（文件夹上传作为预设包）
      const totalSize = uploadedFiles.reduce((sum, f) => sum + f.fileSize, 0);
      const presetData = {
        title: title,
        description: description || null,
        daw,
        format,
        filePath: uploadedFiles[0].filePath, // 主文件路径（第一个文件）
        fileSize: totalSize, // 总大小
        files: uploadedFiles.length > 1 ? uploadedFiles : null, // 多个文件信息
        coverImage: coverImagePath,
        previewAudio: previewAudioPath,
        isPublic,
        userId: user.id,
        tags: selectedTags
      };

      const response = await fetch('/api/presets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        body: JSON.stringify(presetData),
      });

      const result = await response.json();
      const results = [result];

      const allSuccess = results.every(r => r.success);
      if (allSuccess) {
        // 构建成功消息
        let successMsg = uploadedFiles.length > 1 
          ? `成功上传预设包！包含 ${uploadedFiles.length} 个文件`
          : '成功上传预设！';
        if (failedFiles.length > 0) {
          successMsg += `\n\n失败 ${failedFiles.length} 个文件：\n${failedFiles.map(f => `- ${f.name}`).join('\n')}`;
        }
        alert(successMsg);
        
        // 跳转到第一个预设的详情页
        if (results[0]?.data?.id) {
          router.push(`/presets/${results[0].data.id}`);
        } else {
          router.push('/presets');
        }
      } else {
        const failedCount = results.filter(r => !r.success).length;
        throw new Error(`${failedCount} 个预设创建失败`);
      }
    } catch (error: any) {
      console.error('Failed to create preset:', error);
      alert('上传失败: ' + error.message);
    } finally {
      setLoading(false);
      setUploadProgress({});
    }
  };

  const toggleTag = (tagName: string) => {
    setSelectedTags(prev => 
      prev.includes(tagName) 
        ? prev.filter(t => t !== tagName)
        : [...prev, tagName]
    );
  };

  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.push('/presets')}
              className="mb-4 flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              返回预设列表
            </button>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
              上传预设
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              分享您的音乐制作预设给社区
            </p>
          </div>

          {/* Upload Form */}
          <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {/* 基本信息 */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">基本信息</h2>
              
              {/* 标题 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  预设标题 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="例如：Trap 808 混音预设"
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* 描述 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  预设描述
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="详细描述您的预设特点和使用场景..."
                  rows={4}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              {/* DAW 选择 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  DAW <span className="text-red-500">*</span>
                </label>
                <select
                  value={daw}
                  onChange={(e) => {
                    setDaw(e.target.value);
                    setFormat('');
                    setPresetFile(null);
                    setFormatError('');
                  }}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">选择 DAW</option>
                  {daws.map((dawName) => (
                    <option key={dawName} value={dawName}>
                      {dawName}
                    </option>
                  ))}
                </select>
                {daw && (
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    支持的格式：{formatsByDAW[daw].join(', ')}
                  </p>
                )}
              </div>

              {/* 标签 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  音乐风格标签
                </label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag.id}
                      type="button"
                      onClick={() => toggleTag(tag.name)}
                      className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
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

              {/* 公开状态 */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="isPublic"
                  checked={isPublic}
                  onChange={(e) => setIsPublic(e.target.checked)}
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label htmlFor="isPublic" className="text-sm text-gray-700 dark:text-gray-300">
                  公开预设（其他用户可以查看和下载）
                </label>
              </div>
            </div>

            {/* 文件上传 */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">文件上传</h2>
              
              {/* 预设文件 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  预设文件 <span className="text-red-500">*</span>
                </label>
                
                {/* 文件选择按钮组 */}
                <div className="flex gap-2 mb-2">
                  <label className="flex-1">
                    <input
                      type="file"
                      accept=".fst,.zip,.fxp,.rpl,.rfxchain,.patch,.aupreset,.exs,.cst,.adg,.adv,.alp,.amxd,.preset,.song,.tfx,.ptxt,.vstpreset,.fxb,.blx,.blp"
                      onChange={(e) => handleFileChange(e, 'preset')}
                      className="hidden"
                      disabled={!daw}
                    />
                    <div className={`px-4 py-2 text-center text-sm rounded-lg border transition-colors ${
                      daw 
                        ? 'border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer' 
                        : 'border-gray-300 text-gray-400 cursor-not-allowed'
                    }`}>
                      选择文件
                    </div>
                  </label>
                  <label className="flex-1">
                    <input
                      type="file"
                      webkitdirectory=""
                      directory=""
                      multiple
                      onChange={(e) => handleFileChange(e, 'preset')}
                      className="hidden"
                      disabled={!daw}
                    />
                    <div className={`px-4 py-2 text-center text-sm rounded-lg border transition-colors ${
                      daw 
                        ? 'border-purple-500 text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20 cursor-pointer' 
                        : 'border-gray-300 text-gray-400 cursor-not-allowed'
                    }`}>
                      选择文件夹
                    </div>
                  </label>
                </div>

                <div className={`relative border-2 border-dashed rounded-lg p-6 transition-colors ${
                  formatError 
                    ? 'border-red-500 dark:border-red-500' 
                    : 'border-gray-300 dark:border-gray-600'
                }`}>
                  {isFolderUpload && presetFiles.length > 0 ? (
                    <div className="text-center relative">
                      <button
                        type="button"
                        onClick={handleClearFiles}
                        className="absolute top-0 right-0 text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        清除全部
                      </button>
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-900 dark:text-white font-medium">
                        已选择文件夹，找到 {presetFiles.length} 个预设文件：
                      </p>
                      <div className="mt-2 max-h-32 overflow-y-auto space-y-1.5 text-left px-4">
                        {presetFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between gap-2 group">
                            <p className="text-xs text-gray-600 dark:text-gray-400 flex-1 truncate">
                              {index + 1}. {file.name}
                            </p>
                            <button
                              type="button"
                              onClick={() => handleRemoveFile(index)}
                              className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300"
                              title="删除此文件"
                            >
                              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                          </div>
                        ))}
                      </div>
                      {format && (
                        <p className="mt-2 text-xs text-green-600 dark:text-green-400">
                          格式：{format} ✓
                        </p>
                      )}
                      {uploadProgress.preset && (
                        <p className="mt-1 text-xs text-purple-600">上传中...</p>
                      )}
                    </div>
                  ) : presetFile ? (
                    <div className="text-center relative">
                      <button
                        type="button"
                        onClick={handleClearFiles}
                        className="absolute top-0 right-0 text-xs text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 flex items-center gap-1"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        清除
                      </button>
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-900 dark:text-white font-medium">
                        {presetFile.name}
                      </p>
                      {format && (
                        <p className="mt-1 text-xs text-green-600 dark:text-green-400">
                          格式：{format} ✓
                        </p>
                      )}
                      {uploadProgress.preset && (
                        <p className="mt-1 text-xs text-purple-600">上传中...</p>
                      )}
                    </div>
                  ) : (
                    <div className="text-center">
                      <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        {daw ? '请选择预设文件或文件夹' : '请先选择 DAW'}
                      </p>
                    </div>
                  )}
                </div>
                {formatError && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-start gap-1">
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{formatError}</span>
                  </p>
                )}
              </div>

              {/* 封面图片 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  封面图片（可选）
                </label>
                <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:border-purple-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleFileChange(e, 'cover')}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {coverImage ? (
                      <p className="mt-2 text-sm text-gray-900 dark:text-white font-medium">
                        {coverImage.name}
                      </p>
                    ) : (
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        点击或拖拽上传封面图片
                      </p>
                    )}
                    {uploadProgress.cover && (
                      <p className="mt-1 text-xs text-purple-600">上传中...</p>
                    )}
                  </div>
                </div>
              </div>

              {/* 预览音频 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  预览音频（可选）
                </label>
                <div className="relative border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:border-purple-500 transition-colors">
                  <input
                    type="file"
                    accept="audio/*"
                    onChange={(e) => handleFileChange(e, 'audio')}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="text-center">
                    <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                    </svg>
                    {previewAudio ? (
                      <p className="mt-2 text-sm text-gray-900 dark:text-white font-medium">
                        {previewAudio.name}
                      </p>
                    ) : (
                      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        点击或拖拽上传预览音频
                      </p>
                    )}
                    {uploadProgress.audio && (
                      <p className="mt-1 text-xs text-purple-600">上传中...</p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex gap-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    上传中...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                    </svg>
                    发布预设
                  </>
                )}
              </button>
              
              <button
                type="button"
                onClick={() => router.push('/presets')}
                disabled={loading}
                className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors disabled:opacity-50"
              >
                取消
              </button>
            </div>
          </form>
        </div>
      </main>
  );
}
