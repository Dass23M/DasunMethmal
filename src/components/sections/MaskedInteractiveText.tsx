'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

/**
 * MaskedInteractiveText Component.
 * - Sits below the Skills section.
 * - Features an orange background (#FF6B00).
 * - Implements SVG text masks: left side uses white/solid black, right side uses gray/contrast black.
 * - Interactive pointer tracking: moving the cursor scrubs the GSAP animation timeline progress.
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

      // Play half way as initial state
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

      // Play half way initially
      tl2.progress(0.5);

      // 3. Pointer move scrub handler
      const handlePointerMove = (e: PointerEvent) => {
        const rect = container.getBoundingClientRect();
        // Calculate horizontal mouse percentage relative to container width
        const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));

        // Smoothly tween both timelines to the target progress ratio
        gsap.to([tl, tl2], {
          progress: ratio,
          duration: 1.2,
          ease: 'power3.out',
          overwrite: 'auto',
        });
      };

      container.addEventListener('pointermove', handlePointerMove);

      return () => {
        container.removeEventListener('pointermove', handlePointerMove);
      };
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={containerRef}
      className="w-full h-[450px] md:h-[650px] bg-[#FF6B00] flex items-center justify-center overflow-hidden select-none relative z-10 border-t border-b border-[#e05e00]"
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
            {/* Left masked group - Solid bold Black */}
            <g mask="url(#maskLeft)" fill="#000000" className="left-group">
              <text y="200">CODE</text>
              <text y="370">DRIVEN</text>
              <text y="540">ANIMATION</text>
            </g>

            {/* Right masked group - Dark charcoal gray-black */}
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
