'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Magnetic from '@/components/ui/Magnetic';

const NAV_LINKS = [
  { label: 'ABOUT', href: '/about' },
  { label: 'SERVICES', href: '/services' },
  { label: 'WORKS', href: '/works' },
  { label: 'BLOG', href: '/blog' },
  { label: 'CONTACT', href: '/contact' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const scrolledRef = useRef(false);

  useEffect(() => {
    let rafId = 0;

    const update = () => {
      rafId = 0;
      const y = window.scrollY;
      const isScrolled = y > 24;
      if (isScrolled !== scrolledRef.current) {
        scrolledRef.current = isScrolled;
        setScrolled(isScrolled);
      }

      if (progressBarRef.current) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = max > 0 ? Math.min(1, Math.max(0, y / max)) : 0;
        progressBarRef.current.style.transform = `scaleX(${ratio})`;
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

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    document.body.classList.toggle('offcanvas');
  };

  return (
    <header
      className={`fixed top-0 left-0 md:left-14 right-0 z-[1002] transition-colors duration-300 ${
        scrolled
          ? 'bg-[#080808]/95 backdrop-blur-xl border-b border-dashed border-white/[0.14]'
          : 'bg-[#080808]/80 backdrop-blur-md border-b border-dashed border-white/[0.12]'
      }`}
    >
      {/* Mobile-only GPU neon top scroll progress bar (zero React re-renders) */}
      <div className="md:hidden absolute bottom-0 left-0 right-0 h-[2px] bg-white/[0.06] pointer-events-none">
        <div
          ref={progressBarRef}
          className="h-full w-full bg-[#9CFF00] origin-left will-change-transform"
          style={{ transform: 'scaleX(0)' }}
        />
      </div>

      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 h-16 sm:h-20 flex items-center justify-between gap-3 relative">
        {/* Left: Brand (Mobile) / Minimal Links (Desktop) */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            aria-label="Dasun Methmal Home"
            className="md:hidden inline-flex items-center gap-2 text-white hover:text-[#9CFF00] transition-colors py-1"
          >
            <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor" className="text-[#9CFF00] shrink-0">
              <path d="M16 0L18.2 12.2L27.3 4.7L19.8 13.8L32 16L19.8 18.2L27.3 27.3L18.2 19.8L16 32L13.8 19.8L4.7 27.3L12.2 18.2L0 16L12.2 13.8L4.7 4.7L13.8 12.2L16 0Z" />
            </svg>
            <span className="font-mono text-xs font-bold tracking-[0.16em] uppercase text-white">
              METHMAL
            </span>
          </Link>

          <nav aria-label="Primary navigation" className="hidden lg:flex items-center">
            <ul className="flex items-center gap-3 m-0 p-0 list-none font-mono text-[11px] tracking-[0.16em]">
              {NAV_LINKS.map((item, idx) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/' && pathname?.startsWith(item.href));
                return (
                  <li key={item.href} className="flex items-center gap-3">
                    <Link
                      href={item.href}
                      className={`transition-colors duration-200 ${
                        isActive
                          ? 'text-[#9CFF00] font-semibold'
                          : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                    {idx < NAV_LINKS.length - 1 && (
                      <span className="w-1 h-1 bg-white/40 inline-block" aria-hidden="true" />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Center: Location Metadata */}
        <div className="hidden md:flex flex-col items-start font-mono text-[10px] leading-[1.35] tracking-[0.14em] uppercase">
          <span className="text-zinc-500">BASED IN</span>
          <span className="text-white">(SRI LANKA)</span>
        </div>

        {/* Right: Magnetic Chamfered CTA + Mobile Toggle */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Magnetic strength={0.2}>
            <Link
              href="/contact"
              className="chamfer-btn inline-flex items-center gap-1.5 sm:gap-2 bg-white hover:bg-[#9CFF00] text-black font-mono font-bold text-[10px] sm:text-[11px] tracking-[0.12em] uppercase px-3.5 sm:px-5 py-2.5 sm:py-3 transition-colors duration-200 whitespace-nowrap"
            >
              <span className="sm:hidden">BOOK CALL</span>
              <span className="hidden sm:inline">SCHEDULE A CALL</span>
              <span aria-hidden="true">&gt;</span>
            </Link>
          </Magnetic>

          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Open mobile menu"
            className="lg:hidden inline-flex items-center justify-center px-3 py-2.5 min-h-[38px] border border-white/20 text-white hover:border-[#9CFF00] hover:text-[#9CFF00] font-mono text-[10px] sm:text-[11px] tracking-[0.14em] uppercase transition-colors active:scale-95"
          >
            MENU
          </button>
        </div>

        {/* Corner Anchor Square Dot */}
        <span
          aria-hidden="true"
          className="hidden sm:block absolute -bottom-[3px] right-8 lg:right-12 w-1.5 h-1.5 bg-white"
        />
      </div>
    </header>
  );
}
