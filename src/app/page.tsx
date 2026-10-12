"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PresetCard from "@/components/PresetCard";

interface Preset {
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
}

const categories = [
  { label: "全部预设", href: "/presets" },
  { label: "FL Studio", href: "/presets?daw=FL+Studio" },
  { label: "Ableton Live", href: "/presets?daw=Ableton+Live" },
  { label: "Logic Pro", href: "/presets?daw=Logic+Pro" },
  { label: "Reaper", href: "/presets?daw=Reaper" },
];

const NETEASE_ARTIST_URL =
  "https://music.163.com/#/search/m/?s=shawtyboy&type=100";

const TAOBAO_SHOP_URL = "https://m.tb.cn/h.jYlQTHeMHMYRrIK";
const TAOBAO_SEARCH_URL =
  "https://s.taobao.com/search?q=WAM%E7%BA%BF%E4%B8%8A%E5%95%86%E5%BA%97";

const WAM_AD_IMAGES = [
  { src: "/ads/wam/product-1.jpg", alt: "WAM 服饰与配饰展示" },
  { src: "/ads/wam/product-2.jpg", alt: "WAM 上身效果" },
  { src: "/ads/wam/product-3.jpg", alt: "WAM 团队穿搭" },
];

export default function Home() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [presets, setPresets] = useState<Preset[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const response = await fetch("/api/presets?page=1&limit=8&sort=popular");
        const data = await response.json();
        if (data.success) {
          setPresets(data.data);
        }
      } catch (error) {
        console.error("Failed to fetch featured presets:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeatured();
  }, []);

  const handleSearch = (event: FormEvent) => {
    event.preventDefault();
    const query = searchQuery.trim();
    if (!query) {
      router.push("/presets");
      return;
    }
    router.push(`/presets?search=${encodeURIComponent(query)}`);
  };

  return (
    <main className="min-h-screen bg-white">
      <section className="border-b border-hairline px-4 pb-12 pt-10 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-[28px] font-bold leading-[1.43] text-ink">
            发现你的下一套混音预设
          </h1>
          <p className="mt-3 max-w-2xl text-base leading-6 text-body">
            浏览、下载并分享 FL Studio、Ableton、Logic 等 DAW 的高质量预设，像逛 marketplace 一样轻松找到灵感。
          </p>

          <form onSubmit={handleSearch} className="mt-8">
            <div className="flex h-16 items-center rounded-pill border border-hairline bg-white shadow-card">
              <div className="flex min-w-0 flex-1 flex-col px-6 py-2">
                <span className="text-sm font-medium text-muted-custom">搜索</span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="预设名称、风格或 DAW"
                  className="w-full border-0 bg-transparent p-0 text-base text-ink outline-none placeholder:text-muted-custom"
                />
              </div>
              <button
                type="submit"
                aria-label="搜索预设"
                className="mr-2 flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-brand text-white transition-colors hover:bg-[#e00b41]"
              >
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>

          <div className="mt-6 flex flex-wrap gap-2">
            {categories.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="rounded-pill border border-hairline px-4 py-2 text-sm font-medium text-body transition-colors hover:border-[#222222] hover:text-ink"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-b border-hairline bg-white px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8">
            <h2 className="text-[22px] font-medium leading-[1.18] tracking-[-0.44px] text-ink">
              推荐关注
            </h2>
            <p className="mt-2 text-sm text-muted-custom">音乐与周边，点击即可跳转</p>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* 广告 1：网易云 */}
            <a
              href={NETEASE_ARTIST_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="group grid grid-cols-1 gap-5 rounded-card border border-hairline bg-white p-6 shadow-card transition-shadow hover:shadow-[rgba(0,0,0,0.02)_0_0_0_1px,rgba(0,0,0,0.06)_0_4px_12px,rgba(0,0,0,0.12)_0_8px_16px] sm:grid-cols-[1fr_140px]"
            >
              <div className="flex flex-col justify-between">
                <div>
                  <span className="inline-flex rounded-pill bg-[#fce8ec] px-3 py-1 text-xs font-semibold text-[#c20c0c]">
                    网易云音乐
                  </span>
                  <h3 className="mt-4 text-xl font-semibold text-ink group-hover:text-[#ff385c]">
                    关注 shawtyboy
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-body">
                    在网易云音乐搜索并关注 <strong className="font-medium text-ink">shawtyboy</strong>
                    ，获取最新作品与动态。
                  </p>
                </div>
                <span className="mt-6 inline-flex h-11 w-fit items-center rounded-lg bg-[#c20c0c] px-5 text-sm font-medium text-white transition-colors group-hover:bg-[#a00a0a]">
                  打开网易云音乐
                </span>
              </div>
              <div className="mx-auto w-full max-w-[140px] overflow-hidden rounded-2xl border border-hairline bg-surface-soft shadow-card sm:mx-0">
                <img
                  src="/ads/shawtyboy-netease.jpg"
                  alt="shawtyboy 网易云音乐主页"
                  className="h-auto w-full object-cover object-top"
                />
              </div>
            </a>

            {/* 广告 2：淘宝 WAM */}
            <div className="rounded-card border border-hairline bg-white p-6 shadow-card">
              <span className="inline-flex rounded-pill bg-[#fff4e8] px-3 py-1 text-xs font-semibold text-[#ff5000]">
                淘宝 · WAM线上商店
              </span>
              <h3 className="mt-4 text-xl font-semibold text-ink">MF937 · WAM 线上商店</h3>
              <p className="mt-2 text-sm text-body">
                点击链接直达店铺，或在淘宝搜索「WAM线上商店」
              </p>

              <div className="mt-4 grid grid-cols-3 gap-2">
                {WAM_AD_IMAGES.map((image) => (
                  <div
                    key={image.src}
                    className="aspect-[3/4] overflow-hidden rounded-lg border border-hairline bg-surface-soft"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="h-full w-full object-cover"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a
                  href={TAOBAO_SHOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center rounded-lg bg-[#ff5000] px-5 text-sm font-medium text-white transition-colors hover:bg-[#e64800]"
                >
                  点击打开淘宝链接
                </a>
                <a
                  href={TAOBAO_SEARCH_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex h-11 items-center rounded-lg border border-hairline px-5 text-sm font-medium text-ink transition-colors hover:bg-surface-soft"
                >
                  淘宝搜索店铺
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <h2 className="text-[22px] font-medium leading-[1.18] tracking-[-0.44px] text-ink">
                热门预设
              </h2>
              <p className="mt-2 text-sm text-muted-custom">按下载量推荐，持续更新</p>
            </div>
            <Link
              href="/presets"
              className="text-sm font-medium text-ink underline-offset-4 hover:underline"
            >
              查看全部
            </Link>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Array.from({ length: 8 }).map((_, index) => (
                <div
                  key={index}
                  className="h-[320px] animate-pulse rounded-card bg-surface-soft"
                />
              ))}
            </div>
          ) : presets.length === 0 ? (
            <div className="rounded-card border border-hairline bg-surface-soft px-6 py-16 text-center">
              <p className="text-base font-medium text-ink">还没有公开预设</p>
              <p className="mt-2 text-sm text-muted-custom">成为第一个上传并分享预设的创作者</p>
              <Link
                href="/presets"
                className="mt-6 inline-flex h-12 items-center rounded-lg bg-brand px-6 text-base font-medium text-white hover:bg-[#e00b41]"
              >
                前往预设广场
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {presets.map((preset) => (
                <PresetCard key={preset.id} preset={preset} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
