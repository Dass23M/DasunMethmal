'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(false);
  const isHoveringRef = useRef(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined' || window.matchMedia('(max-width: 768px), (pointer: coarse)').matches) {
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

      if (!isVisibleRef.current) {
        isVisibleRef.current = true;
        gsap.to([dot, ring], { opacity: 1, duration: 0.3, overwrite: 'auto' });
      }
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = Boolean(
        target.tagName.toLowerCase() === 'a' ||
          target.tagName.toLowerCase() === 'button' ||
          target.closest('a') ||
          target.closest('button') ||
          target.closest('.pf-card') ||
          target.closest('.glass-card-premium') ||
          target.classList.contains('cursor-pointer')
      );
      if (interactive !== isHoveringRef.current) {
        isHoveringRef.current = interactive;
        setIsHovering(interactive);
      }
    };

    const onMouseLeave = () => {
      if (isVisibleRef.current) {
        isVisibleRef.current = false;
        gsap.to([dot, ring], { opacity: 0, duration: 0.2, overwrite: 'auto' });
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <>
      {/* Precision Center Dot */}
      <div
        ref={dotRef}
        className="hidden md:block fixed top-0 left-0 w-2 h-2 bg-[#9CFF00] pointer-events-none z-[9999] will-change-transform"
      />

      {/* Smooth Trailing Ring */}
      <div
        ref={ringRef}
        className={`hidden md:block fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border transition-all duration-300 will-change-transform ${
          isHovering
            ? 'w-12 h-12 border-[#9CFF00] bg-[#9CFF00]/10'
            : 'w-7 h-7 border-white/25 bg-transparent'
        }`}
      />
    </>
  );
}
