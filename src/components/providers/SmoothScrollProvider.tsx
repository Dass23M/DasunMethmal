'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Smooth Scroll Provider:
 * - Desktop (pointer: fine, >= 1024px): Lenis smooth inertia wheel synced with GSAP ScrollTrigger.
 * - Mobile & Touch devices: Native hardware-accelerated momentum scrolling (120Hz/60Hz)
 *   with ScrollTrigger.config({ ignoreMobileResize: true }) so URL bar shifts never jitter.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isDesktopPointer =
      window.matchMedia('(pointer: fine)').matches && window.innerWidth >= 1024;

    let lenis: Lenis | null = null;
    let updateLenis: ((time: number) => void) | null = null;

    if (!prefersReduced && isDesktopPointer) {
      lenis = new Lenis({
        duration: 1.15,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
      });

      (window as any).lenis = lenis;
      lenis.on('scroll', ScrollTrigger.update);

      updateLenis = (time: number) => {
        lenis?.raf(time * 1000);
      };
      gsap.ticker.add(updateLenis);
      gsap.ticker.lagSmoothing(0);
    }

    // Smooth anchor click interceptor (works on both desktop Lenis & native mobile)
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchorLink = target.closest('a');
      if (!anchorLink) return;

      const href = anchorLink.getAttribute('href');
      if (!href) return;

      let hash: string | null = null;
      if (href.startsWith('#') && href.length > 1) {
        hash = href;
      } else if (href.includes('#')) {
        const [pathPart, hashPart] = href.split('#');
        if (hashPart && (window.location.pathname === pathPart || pathPart === '' || pathPart === '/')) {
          hash = `#${hashPart}`;
        }
      }

      if (!hash) return;
      const element = document.querySelector(hash) as HTMLElement | null;
      if (!element) return;

      e.preventDefault();
      if (lenis) {
        lenis.scrollTo(element, { offset: 0, duration: 1.1 });
      } else {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      document.removeEventListener('click', handleAnchorClick);
      if (updateLenis) gsap.ticker.remove(updateLenis);
      if (lenis) {
        lenis.off('scroll', ScrollTrigger.update);
        lenis.destroy();
        delete (window as any).lenis;
      }
    };
  }, []);

  return <>{children}</>;
}
