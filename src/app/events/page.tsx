"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { motion, useScroll, useTransform } from 'framer-motion';

// --- 类型定义 ---
interface Event {
  id: number;
  title: string;
  description: string | null;
  coverImage: string | null;
  startTime: string;
  endTime: string | null;
  location: string | null;
  views: number;
  interestedCount: number;
  status: string;
  createdAt: string;
  organizer: {
    id: number;
    name: string;
    avatar: string | null;
  };
  isInterested?: boolean;
}

// --- 组件：3D 滚动墙 (Hero 右侧) ---
const ParallaxHero = ({ events }: { events: Event[] }) => {
  // 如果没有活动，使用占位图防止空白
  const displayEvents = events.length > 0 ? events : Array(6).fill({
    id: 0,
    coverImage: null,
    title: "即将推出"
  });

  // 复制一份数据以实现无缝循环
  const duplicatedEvents = [...displayEvents, ...displayEvents, ...displayEvents];

  return (
    <div className="relative h-full w-full overflow-hidden flex justify-end">
      {/* 遮罩层：让图片在上下边缘渐隐 */}
      <div className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-b from-black via-transparent to-black h-full w-full"></div>
      
      {/* 3D 容器 */}
      <div className="h-[120%] -translate-y-[10%] w-[600px] flex gap-6 px-4 rotate-[-12deg] translate-x-[100px] opacity-80 hover:opacity-100 transition-opacity duration-500">
        
        {/* 列 1：向下滚动 */}
        <div className="flex flex-col gap-6 animate-scroll-vertical">
          {duplicatedEvents.map((event, idx) => (
            <EventCardSmall key={`col1-${idx}`} event={event} />
          ))}
        </div>

        {/* 列 2：向上滚动 (更慢一点，制造视差) */}
        <div className="flex flex-col gap-6 animate-scroll-vertical-reverse mt-[-200px]">
          {duplicatedEvents.map((event, idx) => (
            <EventCardSmall key={`col2-${idx}`} event={event} />
          ))}
        </div>
      </div>
    </div>
  );
};

// --- 组件：Hero 中的小卡片 ---
const EventCardSmall = ({ event }: { event: any }) => (
  <Link 
    href={`/events/${event.id}`}
    // 1. 改为 Link 组件
    // 2. 样式修改：直角(rounded-none)，硬边框(border-neutral-800)，移除阴影
    className="relative w-[280px] h-[380px] flex-shrink-0 border border-neutral-800 bg-neutral-900 group overflow-hidden hover:border-purple-500 transition-colors duration-300 cursor-pointer block"
  >
    {event.coverImage ? (
      // 图片处理：默认黑白+降低透明度，hover时恢复色彩+完全不透明+轻微放大
      <img 
        src={event.coverImage} 
        alt={event.title} 
        className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500" 
      />
    ) : (
      <div className="w-full h-full bg-neutral-900 flex items-center justify-center text-neutral-800 text-4xl font-black font-mono">
        {event.title?.charAt(0) || 'N/A'}
      </div>
    )}
    
    {/* 遮罩层：hover时消失，露出清晰图片 */}
    <div className="absolute inset-0 bg-black/50 group-hover:bg-transparent transition-colors duration-300" />

    {/* 底部信息条 (可选，增加一点信息量) */}
    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
      <h4 className="text-white font-bold uppercase truncate">{event.title}</h4>
      <p className="text-xs text-purple-400 font-mono">{new Date(event.startTime).toLocaleDateString()}</p>
    </div>
  </Link>
);


// --- 主页面组件 ---
export default function EventsPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState<string>('upcoming');

  // 引用内容区域，用于点击“探索更多”时滚动
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchEvents();
  }, [page, sortBy]);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '12',
        sort: sortBy,
      });

      const response = await fetch(`/api/events?${params}`, {
        headers: user ? {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        } : {}
      });
      const data = await response.json();

      if (data.success) {
        setEvents(data.data);
        setTotalPages(data.pagination.totalPages);
      }
    } catch (error) {
      console.error('Failed to fetch events:', error);
    } finally {
      setLoading(false);
    }
  };

  const scrollToContent = () => {
    contentRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString('zh-CN', {
      month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  const isUpcoming = (startTime: string) => new Date(startTime) > new Date();

  return (
    <div className="bg-black min-h-screen text-white selection:bg-purple-500 selection:text-white overflow-x-hidden">
      
      {/* ============================================== */}
      {/* 1. Hero Section (首屏黑色 3D 展示) */}
      {/* ============================================== */}
      <section className="relative h-screen w-full flex items-center overflow-hidden">
        {/* 背景光效 */}
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-purple-900/30 rounded-full blur-[120px]" />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-20 flex h-full">
          {/* 左侧文字 */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center pt-20">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-6xl md:text-8xl font-black tracking-tighter mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500"
            >
              DISCOVER<br />THE NIGHT.
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-xl text-gray-400 max-w-md mb-10 leading-relaxed"
            >
              探索城市中最令人兴奋的派对、演出与现场活动。
              连接你的同好，感受现场的脉搏。
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex items-center gap-4"
            >
              <button 
                onClick={scrollToContent}
                className="bg-white text-black px-8 py-4 rounded-full font-bold hover:bg-gray-200 transition-colors flex items-center gap-2"
              >
                开始探索
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
              </button>
              {user && (
                <Link
                  href="/events/create"
                  className="px-8 py-4 rounded-full font-bold border border-white/20 hover:bg-white/10 transition-colors text-white"
                >
                  发布活动
                </Link>
              )}
            </motion.div>
          </div>

          {/* 右侧 3D 视觉 */}
          <div className="hidden lg:block w-1/2 h-full absolute right-0 top-0 overflow-visible">
            {!loading && <ParallaxHero events={events} />}
          </div>
        </div>

        {/* 底部渐变衔接 */}
        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20" />
      </section>


      {/* ============================================== */}
      {/* 2. Content Section (列表内容区) */}
      {/* ============================================== */}
      <div ref={contentRef} className="relative z-20 bg-black min-h-screen pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* 工具栏：标题与筛选 */}
          <div className="sticky top-0 z-30 bg-black/80 backdrop-blur-md py-6 mb-8 border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              <span className="w-2 h-8 bg-purple-600 rounded-full inline-block"></span>
              所有活动
            </h2>

            <div className="flex items-center gap-4">
              <div className="relative group">
                <select
                  value={sortBy}
                  onChange={(e) => {
                    setSortBy(e.target.value);
                    setPage(1);
                  }}
                  className="appearance-none bg-neutral-900 border border-white/10 text-white px-6 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 hover:bg-neutral-800 transition-colors cursor-pointer pr-10"
                >
                  <option value="upcoming">📅 即将开始</option>
                  <option value="latest">🆕 最新发布</option>
                  <option value="popular">🔥 最受欢迎</option>
                </select>
                <div className="absolute right-3 top-3.5 pointer-events-none text-gray-400">
                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
              </div>
            </div>
          </div>

          {/* 列表展示 */}
          {loading ? (
            <div className="flex items-center justify-center py-40">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-600"></div>
            </div>
          ) : events.length === 0 ? (
            <div className="text-center py-40 border border-white/5 rounded-2xl bg-neutral-900/50">
              <div className="inline-block p-4 bg-neutral-800 rounded-full mb-4">
                <svg className="h-10 w-10 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.384-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
              </div>
              <h3 className="text-xl font-bold text-white mb-2">暂无活动</h3>
              <p className="text-gray-400">目前还没有相关活动，去发布一个吧！</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {events.map((event) => (
                <Link
                  key={event.id}
                  href={`/events/${event.id}`}
                  // 1. 外框：纯直角，黑色背景，硬边框
                  className="group relative aspect-[3/4] w-full bg-neutral-900 border border-neutral-800 hover:border-purple-500/80 transition-all duration-500 overflow-hidden"
                >
                  {/* 2. 背景图片层 */}
                  <div className="absolute inset-0 z-0">
                    {event.coverImage ? (
                      <img
                        src={event.coverImage}
                        alt={event.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-1 opacity-80 group-hover:opacity-100"
                      />
                    ) : (
                      <div className="w-full h-full bg-neutral-800 flex items-center justify-center">
                        <span className="text-8xl font-black text-white/5 font-mono">{event.title.charAt(0)}</span>
                      </div>
                    )}
                    {/* 遮罩：底部渐变黑，保证文字可读性 */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 group-hover:opacity-80 transition-opacity duration-500" />
                  </div>

                  {/* 3. 悬浮内容层 */}
                  <div className="relative z-10 h-full flex flex-col justify-between p-5">
                    
                    {/* 顶部：工业风日期方块 */}
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col items-center justify-center bg-white text-black border border-white w-14 h-14 shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                        <span className="text-[10px] font-black uppercase tracking-tighter leading-none mt-1">
                          {new Date(event.startTime).toLocaleString('en-US', { month: 'short' }).toUpperCase()}
                        </span>
                        <span className="text-2xl font-black leading-none">
                          {new Date(event.startTime).getDate()}
                        </span>
                      </div>

                      {isUpcoming(event.startTime) && (
                        <span className="px-2 py-1 bg-purple-600 text-white text-[10px] font-mono font-bold uppercase tracking-wider border border-purple-400 animate-pulse">
                          Upcoming
                        </span>
                      )}
                    </div>

                    {/* 底部：信息区域 */}
                    <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                      {/* ID 标签 */}
                      <div className="mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-[10px] font-mono text-purple-400">
                        ID: {event.id.toString().padStart(4, '0')}
                      </div>

                      {/* 标题 */}
                      <h3 className="text-2xl font-black text-white mb-3 leading-none uppercase drop-shadow-lg line-clamp-2">
                        {event.title}
                      </h3>
                      
                      {/* 详情行：仅在hover时完全显示详情 */}
                      <div className="border-t border-white/20 pt-3 flex flex-col gap-2">
                        {/* 地点 */}
                        <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
                          <span className="text-purple-500">LOC:</span>
                          <span className="truncate">{event.location || 'UNKNOWN'}</span>
                        </div>

                        {/* 底部栏：主办方 + 箭头 */}
                        <div className="flex items-center justify-between mt-1">
                          <div className="flex items-center gap-2">
                            {event.organizer.avatar ? (
                              <img src={event.organizer.avatar} className="w-5 h-5 grayscale group-hover:grayscale-0" />
                            ) : (
                              <div className="w-5 h-5 bg-neutral-700" />
                            )}
                            <span className="text-[10px] font-bold text-gray-400 uppercase">{event.organizer.name}</span>
                          </div>
                          
                          <div className="text-white opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {/* 分页组件 (保持原有逻辑，重写样式) */}
          {totalPages > 1 && (
            <div className="mt-16 flex justify-center">
              <nav className="flex items-center gap-2 bg-neutral-900 p-2 rounded-xl border border-white/10">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
                >
                  Previous
                </button>
                
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  let pageNum = i + 1;
                  // ... (分页计算逻辑保持不变，如果需要完整的分页逻辑我可以补全，这里简化展示)
                  // 简单处理：如果总页数少，直接显示。如果多，建议用更复杂的逻辑。
                  // 这里沿用你原来的逻辑，只做渲染
                  if (totalPages > 5) {
                      if (page > 3 && page < totalPages - 2) pageNum = page - 2 + i;
                      else if (page >= totalPages - 2) pageNum = totalPages - 4 + i;
                  }

                  return (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                        page === pageNum
                          ? 'bg-purple-600 text-white shadow-lg shadow-purple-900/50'
                          : 'text-gray-400 hover:bg-white/5 hover:text-white'
                      }`}
                    >
                      {pageNum}
                    </button>
                  );
                })}

                <button
                  onClick={() => setPage(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 text-sm font-medium text-gray-400 hover:text-white disabled:opacity-30 transition-colors"
                >
                  Next
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* CSS 动画定义: 必须添加到你的 globals.css 或者通过 Tailwind 插件添加 */}
      <style jsx global>{`
        @keyframes scroll-vertical {
          0% { transform: translateY(0); }
          100% { transform: translateY(-33.33%); } /* 移动 1/3 因为数据重复了3次 */
        }
        @keyframes scroll-vertical-reverse {
          0% { transform: translateY(-33.33%); }
          100% { transform: translateY(0); }
        }
        .animate-scroll-vertical {
          animation: scroll-vertical 30s linear infinite;
        }
        .animate-scroll-vertical-reverse {
          animation: scroll-vertical-reverse 35s linear infinite;
        }
        /* 隐藏滚动条 */
        ::-webkit-scrollbar {
            width: 8px;
            background: #000;
        }
        ::-webkit-scrollbar-thumb {
            background: #333;
            border-radius: 4px;
        }
      `}</style>
    </div>
  );
}