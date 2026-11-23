'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * Persistent left vertical architectural rail (desktop)
 * - Top: 8-point starburst emblem (home)
 * - Middle: live neon-green vertical scroll progress indicator
 * - Bottom: high-contrast white square quick menu / X toggle
 */
export default function LeftRail() {
  const [scrollPct, setScrollPct] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max <= 0) {
        setScrollPct(0);
        return;
      }
      setScrollPct(Math.min(100, Math.max(0, (window.scrollY / max) * 100)));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = () => {
    const next = !document.body.classList.contains('offcanvas');
    document.body.classList.toggle('offcanvas', next);
    setMenuOpen(next);
  };

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setMenuOpen(document.body.classList.contains('offcanvas'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  return (
    <aside
      aria-label="Site utility rail"
      className="hidden md:flex fixed top-0 left-0 bottom-0 w-14 z-[1010] bg-[#141414] border-r border-white/[0.08] flex-col items-center justify-between py-5 select-none"
    >
      {/* Top 8-Point Starburst Emblem */}
      <Link
        href="/"
        aria-label="Dasun Methmal Home"
        className="w-10 h-10 flex items-center justify-center text-white hover:text-[#9CFF00] transition-colors group"
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 32 32"
          fill="currentColor"
          className="transition-transform duration-500 group-hover:rotate-45"
        >
          <path d="M16 0L18.2 12.2L27.3 4.7L19.8 13.8L32 16L19.8 18.2L27.3 27.3L18.2 19.8L16 32L13.8 19.8L4.7 27.3L12.2 18.2L0 16L12.2 13.8L4.7 4.7L13.8 12.2L16 0Z" />
        </svg>
      </Link>

      {/* Center Live Vertical Scroll Track */}
      <div className="relative w-[3px] h-40 bg-white/15 overflow-hidden">
        <div
          className="absolute left-0 right-0 h-10 bg-[#9CFF00] transition-transform duration-100 ease-out"
          style={{
            transform: `translateY(${(scrollPct / 100) * 120}px)`,
          }}
        />
      </div>

      {/* Bottom White Square Quick Menu / Close Button */}
      <button
        type="button"
        onClick={toggleMenu}
        aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
        className="w-9 h-9 bg-white hover:bg-[#9CFF00] text-black flex items-center justify-center transition-colors duration-200 cursor-pointer"
      >
        {menuOpen ? (
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.2">
            <path d="M3 3l10 10M13 3L3 13" />
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 4h12M2 8h12M2 12h12" />
          </svg>
        )}
      </button>
    </aside>
  );
}
