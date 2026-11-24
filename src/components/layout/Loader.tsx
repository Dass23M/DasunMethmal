'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const SESSION_KEY = 'methmal_preloader_seen';

/**
 * High-Speed Editorial Preloader (~1.1s first visit, instant skip on repeat reloads in same tab)
 * Preserves strong Core Web Vitals (LCP) while cleanly synchronizing Hero's opening turn.
 */
export default function Loader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const notifyHero = () => {
      (window as unknown as { __loaderRevealed?: boolean }).__loaderRevealed = true;
      window.dispatchEvent(new CustomEvent('site-loader-reveal'));
    };

    // Skip blocking overlay on repeat visits within the same browser tab for instant LCP
    try {
      if (window.sessionStorage.getItem(SESSION_KEY) === '1') {
        setHidden(true);
        notifyHero();
        return;
      }
      window.sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      // sessionStorage unavailable (private mode restrictions) — play short loader normally
    }

    if (!overlayRef.current || !nameRef.current || !lineRef.current || !textContainerRef.current) {
      notifyHero();
      return;
    }

    gsap.set(nameRef.current, { opacity: 0, scale: 1.03 });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setHidden(true),
      });

      // 1. Crisp typography entrance
      tl.to(nameRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.42,
        ease: 'power3.out',
      })
        // 2. Razor-thin neon progress bar sweep
        .to(
          lineRef.current,
          {
            scaleX: 1,
            duration: 0.48,
            ease: 'power4.inOut',
          },
          '-=0.26'
        )
        // 3. Fade out mark & slide curtain away (~1.15s total)
        .to(
          textContainerRef.current,
          {
            opacity: 0,
            y: -8,
            duration: 0.25,
            ease: 'power2.in',
          },
          '+=0.08'
        )
        .to(
          overlayRef.current,
          {
            yPercent: -100,
            duration: 0.55,
            ease: 'expo.inOut',
          },
          '-=0.14'
        )
        .call(notifyHero, undefined, '-=0.16');
    }, overlayRef);

    return () => {
      ctx.revert();
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={overlayRef}
      id="site-preloader"
      className="fixed inset-0 z-[9999] bg-[#080808] flex flex-col items-center justify-center overflow-hidden select-none font-display"
    >
      <div ref={textContainerRef} className="flex flex-col items-center justify-center relative">
        <span
          ref={nameRef}
          className="font-display font-bold text-2xl sm:text-3xl md:text-4xl tracking-[0.26em] uppercase text-white mb-6"
        >
          METHMAL<span className="text-[#9CFF00]">_</span>
        </span>

        <div className="w-[140px] sm:w-[180px] h-[2px] bg-white/15 overflow-hidden">
          <div ref={lineRef} className="w-full h-full bg-[#9CFF00]" />
        </div>
      </div>
    </div>
  );
}
