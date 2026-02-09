"use client";

import { useState } from 'react';
import Link from 'next/link';

interface PresetCardProps {
  preset: {
    id: number;
    title: string;
    description: string | null;
    daw: string;
    format: string;
    coverImage: string | null;
    previewAudio?: string | null;
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
  };
  showDeleteButton?: boolean;
  onDelete?: (id: number) => void;
}

export default function PresetCard({ preset, showDeleteButton = false, onDelete }: PresetCardProps) {
  const [imageError, setImageError] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (deleting) return;

    if (onDelete) {
      setDeleting(true);
      await onDelete(preset.id);
      setDeleting(false);
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Cover Image */}
      <Link href={`/presets/${preset.id}`}>
        <div className="relative h-48 bg-gradient-to-br from-purple-500 to-pink-500 overflow-hidden">
          {preset.coverImage && !imageError ? (
            <img
              src={preset.coverImage}
              alt={preset.title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-white text-6xl font-bold opacity-50">
                {preset.daw.charAt(0)}
              </div>
            </div>
          )}
          {/* DAW Badge */}
          <div className="absolute top-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs font-medium">
            {preset.daw}
          </div>
          {/* Audio Preview Indicator */}
          {preset.previewAudio && (
            <div className="absolute bottom-2 left-2 bg-purple-600/90 text-white px-2 py-1 rounded flex items-center gap-1 text-xs font-medium">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
              </svg>
              试听
            </div>
          )}
        </div>
      </Link>

      {/* Content */}
      <div className="p-4">
        {/* Title */}
        <Link href={`/presets/${preset.id}`}>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2 hover:text-purple-600 dark:hover:text-purple-400 transition-colors line-clamp-1">
            {preset.title}
          </h3>
        </Link>

        {/* Description */}
        {preset.description && (
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
            {preset.description}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {preset.tags.slice(0, 3).map((tagItem) => (
            <span
              key={tagItem.tag.id}
              className="text-xs bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300 px-2 py-1 rounded-full"
            >
              {tagItem.tag.name}
            </span>
          ))}
          {preset.tags.length > 3 && (
            <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
              +{preset.tags.length - 3}
            </span>
          )}
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              {preset.downloads}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {preset.likesCount}
            </span>
            <span className="flex items-center gap-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              {preset.favoritesCount}
            </span>
          </div>
          <span className="text-xs">{preset.format}</span>
        </div>

        {/* User Info */}
        <div className="flex items-center gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white text-sm font-bold overflow-hidden">
            {preset.user.avatar ? (
              <img src={preset.user.avatar} alt={preset.user.name} className="w-full h-full object-cover" />
            ) : (
              preset.user.name.charAt(0).toUpperCase()
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
              {preset.user.name}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {new Date(preset.createdAt).toLocaleDateString('zh-CN')}
            </p>
          </div>
          
          {/* Delete Button */}
          {showDeleteButton && (
            <button
              onClick={handleDelete}
              disabled={deleting}
              className={`p-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors ${deleting ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="删除预设"
            >
              <svg className={`w-5 h-5 ${deleting ? 'animate-pulse' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
