'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import LenisBackgroundCanvas from '@/components/ui/LenisBackgroundCanvas';

gsap.registerPlugin(ScrollTrigger);

/**
 * Premium Momentum-Based Smooth Scrolling Engine (Lenis).
 * - Enables smooth momentum scrolling on Desktop (≥992px)
 * - Uses native 120Hz/60Hz hardware touch scrolling on Mobile (<992px) for zero lag
 * - Perfectly synchronized with GSAP ScrollTrigger ticker & pins
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouchMobile = window.matchMedia('(max-width: 991px)').matches;

    if (prefersReduced) return;

    // On mobile touch devices, use native hardware touch scrolling for 100% responsiveness & 0 lag
    if (isTouchMobile) {
      ScrollTrigger.config({ autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load' });
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.0,
    });

    (window as any).lenis = lenis;

    // Synchronize Lenis scroll updates with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);

    // Run Lenis RAF via GSAP ticker for 60/120 FPS lock
    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger when Lenis resizes
    const onResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener('resize', onResize);

    // Intercept clicks on anchor links (#section)
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
            duration: 1.2,
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
              duration: 1.2,
            });
          }
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      window.removeEventListener('resize', onResize);
      document.removeEventListener('click', handleAnchorClick);
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      (window as any).lenis = undefined;
    };
  }, []);

  return (
    <>
      <LenisBackgroundCanvas />
      {children}
    </>
  );
}
