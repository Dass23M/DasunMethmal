'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Premium Momentum-Based Smooth Scrolling Engine (Lenis).
 * - Syncs with GSAP ScrollTrigger
 * - Respects prefers-reduced-motion accessibility setting
 * - Provides natural momentum scrolling
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Check reduced motion accessibility
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    // Lighter touch inertia on phones so pins / native scroll fight less
    const isTouchMobile = window.matchMedia('(max-width: 991px)').matches;

    const lenis = new Lenis({
      duration: isTouchMobile ? 0.85 : 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: isTouchMobile ? 1.15 : 1.5,
      syncTouch: isTouchMobile,
      syncTouchLerp: 0.08,
      touchInertiaMultiplier: isTouchMobile ? 1.2 : 1,
    });

    // Share lenis globally for layouts to interact with (e.g. scrollTo)
    (window as any).lenis = lenis;

    // Connect Lenis to ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Run Lenis tick within GSAP ticker
    const gsapTick = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(gsapTick);
    gsap.ticker.lagSmoothing(0);

    // Intercept clicks on anchor links on the same page
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchorLink = target.closest('a');
      if (!anchorLink) return;

      const href = anchorLink.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const element = document.querySelector(href) as HTMLElement | null;
        if (element) {
          lenis.scrollTo(element, {
            offset: 0,
            duration: 1.4,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          });
        }
      } else if (href && href.includes('#')) {
        const parts = href.split('#');
        const hash = '#' + parts[1];
        if (window.location.pathname === parts[0] || parts[0] === '' || parts[0] === '/') {
          e.preventDefault();
          const element = document.querySelector(hash) as HTMLElement | null;
          if (element) {
            lenis.scrollTo(element, {
              offset: 0,
              duration: 1.4,
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(gsapTick);
      document.removeEventListener('click', handleAnchorClick);
      (window as any).lenis = undefined;
    };
  }, []);

  return <>{children}</>;
}
