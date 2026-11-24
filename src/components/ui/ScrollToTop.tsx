'use client';

import React, { useState, useEffect, useRef } from 'react';

const CIRCUMFERENCE = 2 * Math.PI * 18;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);
  const circleRef = useRef<SVGCircleElement>(null);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const currentScroll = window.scrollY;
      const shouldShow = currentScroll > 320;
      if (shouldShow !== visibleRef.current) {
        visibleRef.current = shouldShow;
        setVisible(shouldShow);
      }

      if (circleRef.current) {
        const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = totalScroll > 0 ? Math.min(1, Math.max(0, currentScroll / totalScroll)) : 0;
        circleRef.current.style.strokeDashoffset = String(CIRCUMFERENCE * (1 - ratio));
      }
    };

    const onScroll = () => {
      if (!rafId) rafId = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (rafId) window.cancelAnimationFrame(rafId);
    };
  }, []);

  const scrollToTop = () => {
    if ((window as unknown as { lenis?: { scrollTo: (y: number, opts: { duration: number }) => void } }).lenis) {
      (window as unknown as { lenis: { scrollTo: (y: number, opts: { duration: number }) => void } }).lenis.scrollTo(0, { duration: 1.4 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Scroll back to top"
      aria-hidden={!visible}
      tabIndex={visible ? 0 : -1}
      className={`fixed bottom-6 right-6 z-[990] w-12 h-12 rounded-full bg-[#181818]/90 backdrop-blur-xl border border-white/15 flex items-center justify-center text-white hover:text-black hover:bg-[#9CFF00] hover:border-[#9CFF00] transition-all duration-300 ease-out group cursor-pointer ${
        visible
          ? 'opacity-100 scale-100 translate-y-0 pointer-events-auto'
          : 'opacity-0 scale-75 translate-y-4 pointer-events-none'
      }`}
    >
      {/* Circular SVG Scroll Progress Ring (driven directly via rAF ref) */}
      <svg className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none" viewBox="0 0 44 44">
        <circle
          cx="22"
          cy="22"
          r="18"
          fill="none"
          stroke="rgba(255, 255, 255, 0.1)"
          strokeWidth="2"
        />
        <circle
          ref={circleRef}
          cx="22"
          cy="22"
          r="18"
          fill="none"
          stroke="#9CFF00"
          strokeWidth="2"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={CIRCUMFERENCE}
          strokeLinecap="round"
        />
      </svg>

      {/* Up arrow icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="transition-transform duration-300 group-hover:-translate-y-0.5"
      >
        <polyline points="18 15 12 9 6 15" />
      </svg>
    </button>
  );
}
