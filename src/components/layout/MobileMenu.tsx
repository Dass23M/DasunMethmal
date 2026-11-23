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
    // Close drawer automatically on route change
    document.body.classList.remove('offcanvas');
  }, [pathname]);

  useEffect(() => {
    const handleOutside = (e: MouseEvent | TouchEvent) => {
      const menu = document.querySelector('.site-mobile-menu');
      if (menu && !menu.contains(e.target as Node) && document.body.classList.contains('offcanvas')) {
        document.body.classList.remove('offcanvas');
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') document.body.classList.remove('offcanvas');
    };
    document.addEventListener('mouseup', handleOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mouseup', handleOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <nav
      className="site-mobile-menu bg-[#0C0C0C]/98 backdrop-blur-2xl text-white border-r border-white/10 flex flex-col justify-between pb-8"
      aria-label="Slide-out navigation"
    >
      <div>
        <div className="px-6 pb-5 mb-2 border-b border-dashed border-white/15 flex items-center justify-between">
          <Link href="/" onClick={() => closeMenu()} className="font-mono text-xs tracking-[0.2em] text-[#9CFF00] uppercase font-bold">
            METHMAL®
          </Link>
          <button
            type="button"
            onClick={closeMenu}
            aria-label="Close navigation menu"
            className="w-9 h-9 bg-white text-black hover:bg-[#9CFF00] flex items-center justify-center font-mono text-xs font-bold transition-colors cursor-pointer active:scale-95"
          >
            ✕
          </button>
        </div>

        <ul className="list-none p-0 m-0 px-5">
          {MOBILE_NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== '/' && pathname?.startsWith(item.href));
            return (
              <li key={item.href} className="border-b border-dashed border-white/10">
                <Link
                  href={item.href}
                  onClick={() => closeMenu()}
                  className={`flex items-center justify-between py-4 px-1 font-display text-xl uppercase tracking-tight transition-colors ${
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
      </div>

      <div className="px-6 pt-8 space-y-4">
        <Link
          href="/contact"
          onClick={() => closeMenu()}
          className="chamfer-btn w-full inline-flex items-center justify-center gap-2 bg-[#9CFF00] text-black font-mono font-bold text-xs tracking-widest uppercase py-3.5"
        >
          <span>SCHEDULE A CALL</span>
          <span>&gt;</span>
        </Link>
        <div className="flex items-center justify-between font-mono text-[10px] text-zinc-500 uppercase tracking-widest pt-1">
          <span>COLOMBO, SRI LANKA</span>
          <span className="text-[#9CFF00]">● ONLINE</span>
        </div>
      </div>
    </nav>
  );
}
