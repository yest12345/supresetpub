"use client";

import ASCIIText from '../components/ASCIIText';

interface LogoProps {
  opacity: number;
  translateY: number;
}

export default function Logo({ opacity, translateY }: LogoProps) {
  return (
    <div 
      className="fixed inset-0 z-40 flex items-center justify-center pointer-events-none"
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        willChange: 'opacity, transform',
        pointerEvents: 'none'
      }}
    >
      {/* 视频背景 */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        style={{ zIndex: -1 }}
      >
        <source src="/videos/supresetLOGO.mp4" type="video/mp4" />
      </video>

      {/* ASCIIText 前景 */}
      {/* <div className="relative w-full h-full z-10">
        <ASCIIText
          text='supreset'
          enableWaves={true}
          asciiFontSize={6}
          planeBaseHeight={8}
        />
      </div> */}
    </div>
  );
}
