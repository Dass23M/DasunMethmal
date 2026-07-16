'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * MaskedInteractiveText Component.
 * Features SVG text masks animated dynamically.
 * Interactive pointer tracking on desktop + ScrollTrigger scrub for mobile/touch scroll.
 */
export default function MaskedInteractiveText() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. Timeline 1: Skew, scale, and offset rotation movement
      const tl = gsap.timeline({
        paused: true,
        defaults: {
          duration: 2,
          yoyo: true,
          ease: 'power2.inOut',
        },
      });

      tl.fromTo(
        '.left-group, .right-group',
        {
          svgOrigin: '640 360',
          skewY: (i) => [-30, 15][i],
          scaleX: (i) => [0.6, 0.85][i],
          x: 200,
        },
        {
          skewY: (i) => [-15, 30][i],
          scaleX: (i) => [0.85, 0.6][i],
          x: -200,
        }
      );

      tl.progress(0.5);

      // 2. Timeline 2: Individual text lines character entrance sliding
      const tl2 = gsap.timeline({ paused: true });
      const textLines = container.querySelectorAll('text');

      textLines.forEach((line, i) => {
        tl2.add(
          gsap.fromTo(
            line,
            {
              xPercent: -100,
              x: 700,
            },
            {
              duration: 1,
              xPercent: 0,
              x: 575,
              ease: 'sine.inOut',
            }
          ),
          (i % 3) * 0.2
        );
      });

      tl2.progress(0.5);

      // 3. Pointer move scrub handler for desktop
      const handlePointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

        gsap.to([tl, tl2], {
          progress: ratio,
          duration: 1.2,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      };

      container.addEventListener('pointermove', handlePointerMove);

      // 4. ScrollTrigger scrub for mobile & general scroll flow
      ScrollTrigger.create({
        trigger: container,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          // Only scrub via scroll on touch devices or if no pointer interaction active
          if (window.matchMedia('(max-width: 767px)').matches) {
            gsap.to([tl, tl2], {
              progress: self.progress,
              duration: 0.5,
              overwrite: 'auto',
            });
          }
        },
      });

      return () => {
        container.removeEventListener('pointermove', handlePointerMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full h-[280px] sm:h-[400px] md:h-[650px] flex items-center justify-center overflow-hidden select-none relative z-10 px-2 sm:px-4"
      style={{
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e7eb',
        borderBottom: '1px solid #e5e7eb',
      }}
    >
      <div className="w-full h-full max-w-[1280px] max-h-[720px] px-4 flex items-center justify-center">
        <svg
          viewBox="0 0 1280 720"
          className="w-full h-full object-contain"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <mask id="maskLeft">
              <rect x="-50%" width="100%" height="100%" fill="#fff" />
            </mask>
            <mask id="maskRight">
              <rect x="50%" width="100%" height="100%" fill="#fff" />
            </mask>
          </defs>

          <g className="font-raleway font-black" fontSize="140" letterSpacing="-4">
            <g mask="url(#maskLeft)" fill="#000000" className="left-group">
              <text y="200">CODE</text>
              <text y="370">DRIVEN</text>
              <text y="540">ANIMATION</text>
            </g>

            <g mask="url(#maskRight)" fill="#2a2a2a" className="right-group" fillOpacity="0.75">
              <text y="200">CODE</text>
              <text y="370">DRIVEN</text>
              <text y="540">ANIMATION</text>
            </g>
          </g>
        </svg>
      </div>
    </section>
  );
}
