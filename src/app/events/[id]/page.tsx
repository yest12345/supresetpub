"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

// --- 登录弹窗 (纯黑白极简) ---
function LoginModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-neutral-900 text-white rounded-none border border-neutral-700 p-8 w-full max-w-sm shadow-2xl scale-100 animate-scale-up">
        <h3 className="text-2xl font-black uppercase mb-2 tracking-tighter">Login Required</h3>
        <p className="text-neutral-400 mb-8 text-sm">登录解锁收藏与提醒功能。</p>
        <div className="flex gap-4">
          <button onClick={onClose} className="flex-1 py-3 border border-neutral-700 hover:bg-neutral-800 transition-colors font-bold text-xs uppercase tracking-widest">Cancel</button>
          <Link href="/auth/login" className="flex-1 py-3 bg-white text-black hover:bg-neutral-200 transition-colors font-bold text-xs uppercase tracking-widest flex items-center justify-center">Login</Link>
        </div>
      </div>
    </div>
  );
}

type EventStatus = 'upcoming' | 'ongoing' | 'ended';

interface EventDetail {
  id: number;
  title: string;
  description: string | null;
  coverImage: string | null;
  startTime: string;
  endTime: string | null;
  location: string | null;
  ticketUrl: string | null;
  hasTicketUrl: boolean;
  views: number;
  interestedCount: number;
  organizer: { id: number; name: string; avatar: string | null; };
  isInterested?: boolean;
}

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number; }

export default function EventDetailPage() {
  const params = useParams();
  const { user, token } = useAuth();
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [togglingInterest, setTogglingInterest] = useState(false);
  const [isInterested, setIsInterested] = useState(false);
  const [eventStatus, setEventStatus] = useState<EventStatus>('upcoming');
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [showLoginModal, setShowLoginModal] = useState(false);

  useEffect(() => { if (params.id) fetchEventDetail(); }, [params.id]);

  useEffect(() => {
    if (!event) return;
    const calculateStatus = () => {
      const now = new Date().getTime();
      const start = new Date(event.startTime).getTime();
      const end = event.endTime ? new Date(event.endTime).getTime() : start + 24 * 60 * 60 * 1000;
      if (now < start) {
        setEventStatus('upcoming');
        const diff = start - now;
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      } else if (now >= start && now <= end) setEventStatus('ongoing');
      else setEventStatus('ended');
    };
    const timer = setInterval(calculateStatus, 1000);
    calculateStatus();
    return () => clearInterval(timer);
  }, [event]);

  const fetchEventDetail = async () => {
    setLoading(true);
    try {
      const headers: HeadersInit = token ? { 'Authorization': `Bearer ${token}` } : {};
      const response = await fetch(`/api/events/${params.id}`, { headers });
      const data = await response.json();
      if (data.success) {
        setEvent(data.data);
        setIsInterested(data.data.isInterested || false);
      }
    } catch (error) { console.error(error); } finally { setLoading(false); }
  };

  const handleToggleInterest = async () => {
    if (!user || !token) { setShowLoginModal(true); return; }
    if (eventStatus === 'ended') return;
    setTogglingInterest(true);
    try {
      const response = await fetch(`/api/events/${params.id}/interested`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) {
        setIsInterested(data.isInterested);
        setEvent(prev => prev ? ({ ...prev, interestedCount: data.isInterested ? prev.interestedCount + 1 : prev.interestedCount - 1 }) : null);
      }
    } catch (error) { alert('操作失败'); } finally { setTogglingInterest(false); }
  };

  const handleShare = async () => {
    try { await navigator.clipboard.writeText(window.location.href); alert('链接已复制'); } catch (e) { prompt('复制链接：', window.location.href); }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('zh-CN', { year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center bg-black text-white font-mono">LOADING_DATA...</div>;
  if (!event) return <div className="min-h-screen flex justify-center items-center bg-black text-white font-mono">EVENT_NOT_FOUND</div>;

  return (
    // 强制深色背景，移除 gray-50，确保“黑客/机能”风格统一
    <main className="relative min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
      
      {/* --- 背景层：更暗、更模糊，让前景更突出 --- */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-80">
        {event.coverImage && (
          <>
             <img src={event.coverImage} alt="" className="absolute inset-0 w-full h-full object-cover blur-[120px] scale-110 saturate-150" />
             {/* 黑色遮罩，确保文字绝对清晰 */}
             <div className="absolute inset-0 bg-black/60" />
          </>
        )}
      </div>

      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

      {/* --- 内容层 --- */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* 顶部导航 */}
        <div className="flex justify-between items-center mb-12">
          <Link href="/events" className="group flex items-center text-sm font-bold uppercase tracking-widest text-neutral-400 hover:text-white transition-colors">
            <span className="inline-block mr-2 transition-transform group-hover:-translate-x-1">←</span> BACK
          </Link>
          <div className="text-xs font-mono text-neutral-600">ID: {event.id.toString().padStart(6, '0')}</div>
        </div>

        {/* 🚀 布局重构：标题置顶区 (Hero Section) */}
        <div className="mb-12 border-b border-neutral-800 pb-12">
          <div className="flex flex-wrap gap-4 mb-6">
             <span className="px-3 py-1 bg-white text-black text-xs font-black uppercase tracking-wider">
               {eventStatus === 'ongoing' ? 'LIVE NOW' : (eventStatus === 'ended' ? 'ARCHIVED' : 'UPCOMING')}
             </span>
             <span className="px-3 py-1 border border-neutral-700 text-neutral-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                EYES: {event.views}
             </span>
             <span className="px-3 py-1 border border-neutral-700 text-neutral-300 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                LIKES: {event.interestedCount}
             </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white to-neutral-500 leading-none">
            {event.title}
          </h1>
        </div>

        {/* 双栏布局 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* ====== 左侧：海报 ====== */}
          <div className="lg:col-span-5 space-y-6">
            <div className="relative aspect-[3/4] w-full bg-neutral-900 border border-neutral-800 shadow-2xl overflow-hidden group">
               {/* 纯粹的海报，去掉圆角，更硬朗 */}
              {event.coverImage ? (
                <img src={event.coverImage} alt={event.title} className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-neutral-800 text-9xl font-black">{event.title.charAt(0)}</div>
              )}
            </div>

            {/* 倒计时：工业风格 */}
            {eventStatus === 'upcoming' && (
              <div className="grid grid-cols-4 border border-neutral-800 bg-black/50 backdrop-blur-sm">
                {[{ l: 'D', v: timeLeft.days }, { l: 'H', v: timeLeft.hours }, { l: 'M', v: timeLeft.minutes }, { l: 'S', v: timeLeft.seconds }].map((item, index) => (
                  <div key={index} className="flex flex-col items-center justify-center py-4 border-r border-neutral-800 last:border-r-0">
                    <span className="text-2xl font-mono font-bold">{item.v.toString().padStart(2, '0')}</span>
                    <span className="text-[10px] text-neutral-500 font-bold">{item.l}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* ====== 右侧：信息流 ====== */}
          <div className="lg:col-span-7 flex flex-col space-y-12">
            
            {/* 核心数据块：大号字体 */}
            <div className="space-y-8">
              <div className="flex flex-col gap-1">
                <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">When</span>
                <span className="text-2xl md:text-3xl font-bold font-mono border-l-2 border-white pl-4">
                  {formatDate(event.startTime)}
                  {event.endTime && <span className="text-neutral-500 block text-lg mt-1">→ {formatDate(event.endTime)}</span>}
                </span>
              </div>
              
              {event.location && (
                <div className="flex flex-col gap-1">
                  <span className="text-xs font-bold text-neutral-500 uppercase tracking-widest">Where</span>
                  <span className="text-2xl md:text-3xl font-bold font-mono border-l-2 border-neutral-700 pl-4 text-neutral-300">
                    {event.location}
                  </span>
                </div>
              )}
            </div>

            {/* 活动通道：高亮区块 */}
            {event.hasTicketUrl && event.ticketUrl && (
              <div className="p-6 bg-neutral-900 border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-6 hover:border-white/30 transition-colors">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"/>
                    TICKET ACCESS
                  </h3>
                  <p className="text-sm text-neutral-400 mt-1">Official link to external platform</p>
                </div>
                <a href={event.ticketUrl} target="_blank" className="w-full sm:w-auto px-8 py-3 bg-white text-black font-bold uppercase tracking-wide hover:bg-neutral-200 transition-colors text-center">
                  Get Tickets
                </a>
              </div>
            )}

            <div className="h-px bg-neutral-800 w-full" />

            {/* 主办方 */}
            <div className="flex items-center justify-between">
              <Link href={`/users/${event.organizer.id}`} className="flex items-center gap-4 group">
                 {event.organizer.avatar ? (
                   <img src={event.organizer.avatar} alt="org" className="w-16 h-16 grayscale group-hover:grayscale-0 transition-all duration-500" />
                 ) : (
                   <div className="w-16 h-16 bg-neutral-800 flex items-center justify-center font-bold text-neutral-500">{event.organizer.name.charAt(0)}</div>
                 )}
                 <div>
                   <p className="text-xs font-bold text-neutral-500 uppercase mb-1">Presented By</p>
                   <p className="text-xl font-bold text-white group-hover:text-neutral-300 transition-colors">{event.organizer.name}</p>
                 </div>
              </Link>
            </div>

            {/* 底部操作栏：巨型按钮 */}
            <div className="grid grid-cols-12 gap-4">
              <button 
                onClick={handleShare} 
                className="col-span-3 py-5 border border-neutral-700 text-neutral-300 hover:bg-neutral-800 hover:text-white transition-all font-bold uppercase tracking-wide flex flex-col items-center justify-center gap-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                <span className="text-[10px]">Share</span>
              </button>
              
              <button
                onClick={handleToggleInterest}
                disabled={togglingInterest || eventStatus === 'ended'}
                className={`col-span-9 py-5 font-black uppercase tracking-widest text-lg transition-all flex items-center justify-center gap-3
                  ${eventStatus === 'ended' 
                    ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed' 
                    : isInterested
                      ? 'bg-transparent border-2 border-white text-white' // 已收藏：空心
                      : 'bg-white text-black hover:bg-neutral-200' // 未收藏：实心白
                  }
                `}
              >
                {togglingInterest ? 'Updating...' : (isInterested ? 'Saved to List' : 'Add to Interested')}
              </button>
            </div>

            {/* 详情文本 */}
            {event.description && (
              <div className="pt-8">
                <h3 className="text-sm font-bold text-neutral-500 uppercase tracking-widest mb-6">Description</h3>
                <div className="prose prose-invert prose-lg max-w-none text-neutral-300 leading-relaxed font-light">
                  {event.description}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}