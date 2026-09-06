'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Ultra-Minimalist Apple Luxury Preloader.
 * Features a sleek typography fade-in, a razor-thin loading line, and smooth exit.
 */
export default function Loader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    if (!overlayRef.current || !nameRef.current || !lineRef.current || !textContainerRef.current) return;

    // Set initial states for luxury reveal
    gsap.set(nameRef.current, { opacity: 0, scale: 1.05, filter: 'blur(8px)' });
    gsap.set(lineRef.current, { scaleX: 0, transformOrigin: 'left center' });

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => setHidden(true),
        delay: 0.2 // slight delay before starting to ensure smooth rendering
      });

      // 1. Text fades in and sharpens
      tl.to(nameRef.current, {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.2,
        ease: 'power3.out',
      });

      // 2. Sleek loading line expands
      tl.to(
        lineRef.current,
        {
          scaleX: 1,
          duration: 1.0,
          ease: 'power4.inOut',
        },
        "-=0.8" // Start while text is still settling
      );

      // 3. Text and line fade out elegantly
      tl.to(
        textContainerRef.current,
        {
          opacity: 0,
          y: -10,
          duration: 0.6,
          ease: 'power2.inOut',
        },
        "+=0.3" // hold the fully loaded state for a fraction of a second
      );

      // 4. Background curtain slides up
      tl.to(
        overlayRef.current,
        {
          yPercent: -100,
          duration: 0.8,
          ease: 'expo.inOut',
        },
        "-=0.4"
      );
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
      className="fixed inset-0 z-[9999] bg-white dark:bg-[#080808] flex flex-col items-center justify-center overflow-hidden select-none font-display"
    >
      <div ref={textContainerRef} className="flex flex-col items-center justify-center relative">
        <h1
          ref={nameRef}
          className="font-display font-black text-2xl sm:text-3xl md:text-4xl tracking-[0.3em] uppercase text-black dark:text-white mb-6"
        >
          METHMAL<span className="text-[#FF8A00]">.</span>
        </h1>
        
        {/* The razor-thin luxury loading line */}
        <div className="w-[120px] sm:w-[160px] h-[1px] bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
          <div ref={lineRef} className="w-full h-full bg-black dark:bg-white rounded-full" />
        </div>
      </div>
    </div>
  );
}
