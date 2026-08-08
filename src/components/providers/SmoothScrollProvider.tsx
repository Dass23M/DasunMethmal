'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Native Smooth Scroll Provider (Lenis motion removed).
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // ── 1. Disable browser scroll restoration & force refresh to ALWAYS start at top (0,0) ──
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
      requestAnimationFrame(() => {
        window.scrollTo(0, 0);
      });
    }

    // Intercept clicks on anchor links (#section) for clean native smooth navigation
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchorLink = target.closest('a');
      if (!anchorLink) return;

      const href = anchorLink.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href) as HTMLElement | null;
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      } else if (href && href.includes('#')) {
        const parts = href.split('#');
        const hash = '#' + parts[1];
        if (window.location.pathname === parts[0] || parts[0] === '' || parts[0] === '/') {
          e.preventDefault();
          const element = document.querySelector(hash) as HTMLElement | null;
          if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);
    return () => {
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  return <>{children}</>;
}

