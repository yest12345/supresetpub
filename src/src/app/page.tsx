"use client";

import { useEffect, useState } from 'react';
import Logo from './LOGO';
import ASCIIText from '../components/ASCIIText';

export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const [logoRemoved, setLogoRemoved] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  
  // 滚动 0-800px 时，逐渐向上移除 LOGO（增加距离让过渡更平滑）
  const fadeDistance = 800;

  // 检查是否是从其他页面导航而来
  useEffect(() => {
    // 使用全局标记来区分真正的页面加载和客户端路由
    // 页面刷新时 window 对象会重置，客户端路由时会保留
    if (typeof window !== 'undefined') {
      const win = window as any;
      
      if (!win.__homePageMounted) {
        // 首次挂载（真正的页面加载，包括刷新和首次访问）
        win.__homePageMounted = true;
        setIsFirstVisit(true);
      } else {
        // 后续挂载（客户端路由导航）
        setIsFirstVisit(false);
        setLogoRemoved(true);
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const currentScroll = window.scrollY;
      setScrollY(currentScroll);
      
      // 一旦滚动超过阈值，永久移除 LOGO
      if (currentScroll > fadeDistance && !logoRemoved) {
        setLogoRemoved(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [logoRemoved, fadeDistance]);
  
  // 使用缓动函数让透明度变化更自然
  const progress = Math.min(scrollY / fadeDistance, 1);
  const easedProgress = 1 - Math.pow(1 - progress, 3); // easeOutCubic
  
  const opacity = logoRemoved ? 0 : Math.max(0, 1 - easedProgress);
  const translateY = logoRemoved ? -fadeDistance * 0.6 : -scrollY * 0.6;
  
  // LOGO 完全移除后显示导航栏
  const showNavbar = logoRemoved || scrollY > fadeDistance;
  
  // 只在初次访问且 LOGO 未被移除时渲染 LOGO
  const shouldRenderLogo = isFirstVisit && (!logoRemoved || scrollY <= fadeDistance);

  return (
    <>
      {shouldRenderLogo && <Logo opacity={opacity} translateY={translateY} />}
      <main className="relative">
        {/* 主页内容 - 当 LOGO 存在时它在下方，LOGO 移除后直接显示 */}
        <section 
          id="home" 
          className="relative bg-background"
          style={{ minHeight: (logoRemoved || !isFirstVisit) ? '100vh' : '180vh' }}
        >
          {/* 当 LOGO 未移除且是初次访问时，添加顶部空白以便 LOGO 显示 */}
          {!logoRemoved && isFirstVisit && <div style={{ height: `${fadeDistance}px` }} />}
          
          <div className="relative min-h-screen">
            <ASCIIText
              text='supreset'
              enableWaves={true}
              asciiFontSize={8}
            />

          </div>
        </section>
      </main>
    </>
  );
}
