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
    <article className="group overflow-hidden rounded-card bg-white transition-shadow hover:shadow-card">
      <Link href={`/presets/${preset.id}`} className="block">
        <div className="relative aspect-square overflow-hidden rounded-card bg-surface-soft">
          {preset.coverImage && !imageError ? (
            <img
              src={preset.coverImage}
              alt={preset.title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
              onError={() => setImageError(true)}
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-surface-strong">
              <span className="text-5xl font-semibold text-muted-custom">{preset.daw.charAt(0)}</span>
            </div>
          )}

          <span className="absolute left-3 top-3 rounded-pill bg-white px-2.5 py-1 text-[11px] font-semibold text-ink shadow-card">
            {preset.daw}
          </span>

          {preset.previewAudio && (
            <span className="absolute bottom-3 left-3 rounded-pill bg-white/95 px-2.5 py-1 text-xs font-medium text-ink">
              可试听
            </span>
          )}
        </div>
      </Link>

      <div className="space-y-2 px-1 py-3">
        <Link href={`/presets/${preset.id}`}>
          <h3 className="line-clamp-1 text-base font-semibold text-ink transition-colors group-hover:text-[#ff385c]">
            {preset.title}
          </h3>
        </Link>

        <p className="line-clamp-1 text-sm text-muted-custom">
          {preset.user.name} · {preset.format}
        </p>

        {preset.tags.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {preset.tags.slice(0, 2).map((tagItem) => (
              <span
                key={tagItem.tag.id}
                className="rounded-pill border border-hairline px-2 py-0.5 text-xs text-body"
              >
                {tagItem.tag.name}
              </span>
            ))}
          </div>
        )}

        <div className="flex items-center justify-between text-sm text-muted-custom">
          <span>{preset.downloads} 次下载</span>
          <span>{preset.likesCount} 赞</span>
        </div>

        {showDeleteButton && (
          <div className="flex justify-end border-t border-hairline pt-3">
            <button
              onClick={handleDelete}
              disabled={deleting}
              className={`rounded-lg px-3 py-1.5 text-sm text-[#c13515] hover:bg-[#fff5f2] ${deleting ? 'opacity-50 cursor-not-allowed' : ''}`}
              title="删除预设"
            >
              删除
            </button>
          </div>
        )}
      </div>
    </article>
  );
}
