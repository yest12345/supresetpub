"use client";

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import PresetCard from '../../components/PresetCard';
import UploadModal from '../../components/UploadModal';

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
  _count?: {
    comments: number;
    likes: number;
    favorites: number;
  };
}

interface Tag {
  id: number;
  name: string;
  _count: {
    presets: number;
  };
}

function PresetsPageContent() {
  const searchParams = useSearchParams();
  const [presets, setPresets] = useState<Preset[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Filter states
  const [selectedDAW, setSelectedDAW] = useState<string>('');
  const [selectedTag, setSelectedTag] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<string>('latest');
  
  // Upload modal state
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);

  const daws = ['FL Studio', 'Reaper', 'Logic Pro', 'Ableton Live', 'Studio One', 'Pro Tools', 'Cubase', 'BandLab'];

  useEffect(() => {
    fetchTags();
  }, []);

  useEffect(() => {
    const initialSearch = searchParams.get('search') || '';
    const initialDaw = searchParams.get('daw') || '';
    setSearchQuery(initialSearch);
    setSelectedDAW(initialDaw);
    setPage(1);
  }, [searchParams]);

  useEffect(() => {
    fetchPresets();
  }, [page, selectedDAW, selectedTag, searchQuery, sortBy]);

  const fetchPresets = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        sort: sortBy,
      });

      if (selectedDAW) params.append('daw', selectedDAW);
      if (selectedTag) params.append('tag', selectedTag);
      if (searchQuery) params.append('search', searchQuery);

      const response = await fetch(`/api/presets?${params}`);
      const data = await response.json();

      if (data.success) {
        setPresets(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch presets:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchTags = async () => {
    try {
      const response = await fetch('/api/tags?popular=true');
      const data = await response.json();
      if (data.success) {
        setTags(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch tags:', error);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchPresets();
  };

  const resetFilters = () => {
    setSelectedDAW('');
    setSelectedTag('');
    setSearchQuery('');
    setSortBy('latest');
    setPage(1);
  };

  return (
    <>
      <main className="min-h-screen bg-white pt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="mb-8 flex items-start justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-[28px] font-bold leading-[1.43] text-ink">
                  预设广场
                </h1>
                <Link
                  href="/disclaimer"
                  className="text-sm px-3 py-1.5 rounded-pill border border-hairline text-body hover:bg-surface-soft transition-colors"
                >
                  免责声明
                </Link>
              </div>
              <p className="text-muted-custom">
                探索和下载专业的音乐制作预设
              </p>
            </div>
            <button
              onClick={() => setIsUploadModalOpen(true)}
              className="bg-brand hover:bg-[#e00b41] text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
              上传预设
            </button>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="mb-6">
            <div className="flex h-14 items-center rounded-pill border border-hairline bg-white shadow-card">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="搜索预设名称、风格或 DAW"
                className="flex-1 bg-transparent px-6 text-base text-ink outline-none placeholder:text-muted-custom"
              />
              <button
                type="submit"
                className="mr-2 flex h-10 items-center rounded-full bg-brand px-5 text-sm font-medium text-white transition-colors hover:bg-[#e00b41]"
              >
                搜索
              </button>
            </div>
          </form>

          {/* Filters */}
          <div className="rounded-card border border-hairline bg-white p-6 mb-8">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-semibold text-ink">筛选条件</h3>
              <button
                onClick={resetFilters}
                className="text-sm font-medium text-ink underline-offset-4 hover:underline"
              >
                重置筛选
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* DAW Filter */}
              <div>
                <label className="block text-sm font-medium text-body mb-2">
                  DAW
                </label>
                <select
                  value={selectedDAW}
                  onChange={(e) => {
                    setSelectedDAW(e.target.value);
                    setPage(1);
                  }}
                  className="w-full rounded-lg border border-hairline bg-white px-3 py-2.5 text-ink outline-none focus:border-[#222222]"
                >
                  <option value="">全部 DAW</option>
                  {daws.map((daw) => (
                    <option key={daw} value={daw}>
                      {daw}
                    </option>
                  ))}
                </select>
              </div>

              {/* Tag Filter */}
              <div>
                <label className="block text-sm font-medium text-body mb-2">
                  音乐风格
                </label>
                <select
                  value={selectedTag}
                  onChange={(e) => {
                    setSelectedTag(e.target.value);
                    setPage(1);
                  }}
                  className="w-full rounded-lg border border-hairline bg-white px-3 py-2.5 text-ink outline-none focus:border-[#222222]"
                >
                  <option value="">全部风格</option>
                  {tags.map((tag) => (
                    <option key={tag.id} value={tag.name}>
                      {tag.name} ({tag._count.presets})
                    </option>
                  ))}
                </select>
              </div>

              {/* Sort Filter */}
              <div>
                <label className="block text-sm font-medium text-body mb-2">
                  排序方式
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setPage(1);
                  }}
                  className="w-full rounded-lg border border-hairline bg-white px-3 py-2.5 text-ink outline-none focus:border-[#222222]"
                >
                  <option value="latest">最新发布</option>
                  <option value="popular">最多下载</option>
                  <option value="liked">最多点赞</option>
                </select>
              </div>
            </div>
          </div>

          {/* Presets Grid */}
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#ff385c]"></div>
            </div>
          ) : presets.length === 0 ? (
            <div className="text-center py-20">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">
                没有找到预设
              </h3>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                尝试调整筛选条件或搜索关键词
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {presets.map((preset) => (
                  <PresetCard key={preset.id} preset={preset} />
                ))}
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-2">
                  <button
                    onClick={() => setPage(Math.max(1, page - 1))}
                    disabled={page === 1}
                    className="px-4 py-2 border border-hairline rounded-lg hover:bg-surface-soft disabled:opacity-50 disabled:cursor-not-allowed text-ink"
                  >
                    上一页
                  </button>
                  
                  <div className="flex items-center gap-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (page <= 3) {
                        pageNum = i + 1;
                      } else if (page >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = page - 2 + i;
                      }
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => setPage(pageNum)}
                          className={`px-3 py-2 rounded-lg ${
                            page === pageNum
                              ? 'bg-brand text-white'
                              : 'border border-hairline hover:bg-surface-soft text-ink'
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => setPage(Math.min(totalPages, page + 1))}
                    disabled={page === totalPages}
                    className="px-4 py-2 border border-hairline rounded-lg hover:bg-surface-soft disabled:opacity-50 disabled:cursor-not-allowed text-ink"
                  >
                    下一页
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Upload Modal */}
      <UploadModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onSuccess={() => {
          fetchPresets(); // 刷新预设列表
        }}
      />
    </>
  );
}

export default function PresetsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen bg-white pt-8">
          <div className="mx-auto max-w-7xl px-4 py-20 text-center text-muted-custom">
            加载中...
          </div>
        </main>
      }
    >
      <PresetsPageContent />
    </Suspense>
  );
}
