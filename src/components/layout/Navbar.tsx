'use client';

import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    document.body.classList.toggle('offcanvas');
  };

  return (
    <header
      className={`fixed top-0 left-0 md:left-14 right-0 z-[1002] transition-all duration-300 ${
        scrolled
          ? 'bg-[#080808]/92 backdrop-blur-xl border-b border-dashed border-white/[0.14]'
          : 'bg-[#080808]/75 backdrop-blur-md border-b border-dashed border-white/[0.12]'
      }`}
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 h-20 flex items-center justify-between gap-4 relative">
        {/* Left: Minimal Navigation Links (Desktop) / Brand + Menu (Mobile) */}
        <div className="flex items-center gap-4">
          <Link
            href="/"
            aria-label="Home"
            className="md:hidden w-8 h-8 flex items-center justify-center text-white hover:text-[#9CFF00] transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 32 32" fill="currentColor">
              <path d="M16 0L18.2 12.2L27.3 4.7L19.8 13.8L32 16L19.8 18.2L27.3 27.3L18.2 19.8L16 32L13.8 19.8L4.7 27.3L12.2 18.2L0 16L12.2 13.8L4.7 4.7L13.8 12.2L16 0Z" />
            </svg>
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
        <div className="flex items-center gap-3">
          <Magnetic strength={0.2}>
            <Link
              href="/contact"
              className="chamfer-btn inline-flex items-center gap-2 bg-white hover:bg-[#9CFF00] text-black font-mono font-bold text-[11px] tracking-[0.12em] uppercase px-5 py-3 transition-colors duration-200"
            >
              <span>SCHEDULE A CALL</span>
              <span aria-hidden="true">&gt;</span>
            </Link>
          </Magnetic>

          <button
            type="button"
            onClick={toggleMenu}
            aria-label="Open mobile menu"
            className="lg:hidden inline-flex items-center justify-center px-3 py-2.5 border border-white/20 text-white hover:border-[#9CFF00] hover:text-[#9CFF00] font-mono text-[11px] tracking-widest uppercase transition-colors"
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
