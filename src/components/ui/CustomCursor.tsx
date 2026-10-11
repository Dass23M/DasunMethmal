'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(max-width: 768px)').matches) {
      return;
    }

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 });

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power2.out' });
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power2.out' });

    const ringX = gsap.quickTo(ring, 'x', { duration: 0.35, ease: 'power3.out' });
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.35, ease: 'power3.out' });

    const onMouseMove = (e: MouseEvent) => {
      dotX(e.clientX);
      dotY(e.clientY);
      ringX(e.clientX);
      ringY(e.clientY);

      if (!isVisible) {
        setIsVisible(true);
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 });
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.closest('.pf-card') ||
        target.closest('.glass-card-premium') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
      gsap.to([dot, ring], { opacity: 0, duration: 0.2 });
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className="hidden md:block fixed top-0 left-0 w-2 h-2 rounded-full bg-[#FFAA00] pointer-events-none z-[9999] shadow-[0_0_8px_#FF8A00] will-change-transform"
      />

      {/* Smooth Trailing Frosted Glow Aura Ring */}
      <div
        ref={ringRef}
        className={`hidden md:block fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border transition-all duration-300 will-change-transform ${
          isHovering
            ? 'w-14 h-14 border-[#FF8A00]/70 bg-[#FF8A00]/10 shadow-[0_0_20px_rgba(255,138,0,0.3)] backdrop-blur-[2px]'
            : 'w-8 h-8 border-white/20 bg-transparent'
        }`}
      />
    </>
  );
}
