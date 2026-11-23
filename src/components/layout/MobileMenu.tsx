'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MOBILE_NAV_ITEMS = [
  { href: '/', label: 'Home', num: '00' },
  { href: '/about', label: 'About', num: '01' },
  { href: '/services', label: 'Services', num: '02' },
  { href: '/works', label: 'Works', num: '03' },
  { href: '/blog', label: 'Blog', num: '04' },
  { href: '/contact', label: 'Contact', num: '05' },
];

export default function MobileMenu() {
  const pathname = usePathname();

  const closeMenu = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    document.body.classList.remove('offcanvas');
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      const menu = document.querySelector('.site-mobile-menu');
      if (menu && !menu.contains(e.target as Node) && document.body.classList.contains('offcanvas')) {
        document.body.classList.remove('offcanvas');
      }
    };
    document.addEventListener('mouseup', handleClickOutside);
    return () => document.removeEventListener('mouseup', handleClickOutside);
  }, []);

  return (
    <nav
      className="site-mobile-menu bg-[#0E0E0E]/98 backdrop-blur-2xl text-white border-r border-white/10"
      aria-label="Slide-out navigation"
    >
      <div className="px-6 pb-6 mb-4 border-b border-dashed border-white/15 flex items-center justify-between">
        <Link href="/" onClick={() => closeMenu()} className="font-mono text-xs tracking-[0.2em] text-[#9CFF00] uppercase">
          METHMAL®
        </Link>
        <button
          type="button"
          onClick={closeMenu}
          aria-label="Close navigation menu"
          className="w-8 h-8 bg-white text-black hover:bg-[#9CFF00] flex items-center justify-center font-mono text-xs font-bold transition-colors cursor-pointer"
        >
          ✕
        </button>
      </div>

      <ul className="list-none p-0 m-0 px-4">
        {MOBILE_NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <li key={item.href} className="border-b border-dashed border-white/10">
              <Link
                href={item.href}
                onClick={() => closeMenu()}
                className={`flex items-center justify-between py-4 px-2 font-display text-lg uppercase tracking-tight transition-colors ${
                  isActive ? 'text-[#9CFF00]' : 'text-white hover:text-[#9CFF00]'
                }`}
              >
                <span>{item.label}</span>
                <span className="font-mono text-[10px] text-zinc-500">{item.num}</span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="px-6 pt-8 space-y-3">
        <a
          href="/Dasun Methmal CV.pdf"
          download
          target="_blank"
          rel="noopener noreferrer"
          className="chamfer-btn w-full inline-flex items-center justify-center gap-2 bg-[#9CFF00] text-black font-mono font-bold text-xs tracking-widest uppercase py-3"
        >
          <span>DOWNLOAD CV</span>
          <span>↓</span>
        </a>
        <p className="font-mono text-[10px] text-zinc-500 uppercase tracking-widest pt-2">
          COLOMBO, SRI LANKA · WORLDWIDE
        </p>
      </div>
    </nav>
  );
}
