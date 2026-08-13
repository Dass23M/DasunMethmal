'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Lenis Smooth Scroll Provider.
 * Provides smooth inertia scrolling, connects to window.lenis,
 * and synchronizes with GSAP ScrollTrigger.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Disable browser default scroll restoration & force start at top (0,0)
    if (typeof window !== 'undefined') {
      if ('scrollRestoration' in window.history) {
        window.history.scrollRestoration = 'manual';
      }
      window.scrollTo(0, 0);
    }

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Initialize Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    (window as any).lenis = lenis;

    // Synchronize Lenis with GSAP ScrollTrigger & GSAP Ticker
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Anchor smooth click interceptor
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchorLink = target.closest('a');
      if (!anchorLink) return;

      const href = anchorLink.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href) as HTMLElement | null;
        if (element) {
          lenis.scrollTo(element, { offset: 0, duration: 1.2 });
        }
      } else if (href && href.includes('#')) {
        const parts = href.split('#');
        const hash = '#' + parts[1];
        if (window.location.pathname === parts[0] || parts[0] === '' || parts[0] === '/') {
          e.preventDefault();
          const element = document.querySelector(hash) as HTMLElement | null;
          if (element) {
            lenis.scrollTo(element, { offset: 0, duration: 1.2 });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(updateLenis);
      lenis.off('scroll', ScrollTrigger.update);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  return <>{children}</>;
}

