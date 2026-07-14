'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';

/**
 * X-Cross Dual-band scrolling marquee — "Let's Get Started" ✦
 * Styled with Tailwind CSS, configured with a slow, elegant scroll speed and clean, balanced font sizes.
 */
export default function FooterMarquee() {
  const topTrackRef = useRef<HTMLDivElement>(null);
  const bottomTrackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* Enough repeats to seamlessly fill ultra-wide viewports */
  const REPEATS = 14;

  useEffect(() => {
    const ctx = gsap.context(() => {
      /* ── Top band → scrolls LEFT (Slower, elegant speed) ── */
      if (topTrackRef.current) {
        gsap.set(topTrackRef.current, { xPercent: 0 });
        gsap.to(topTrackRef.current, {
          xPercent: -50,
          duration: 65,
          ease: 'none',
          repeat: -1,
        });
      }

      /* ── Bottom band → scrolls RIGHT (Slower, elegant speed) ── */
      if (bottomTrackRef.current) {
        gsap.set(bottomTrackRef.current, { xPercent: -50 });
        gsap.to(bottomTrackRef.current, {
          xPercent: 0,
          duration: 55,
          ease: 'none',
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden h-[180px] md:h-[260px] bg-black select-none z-[2]"
      aria-label="Call to action marquee"
    >
      {/* ─── TOP RIBBON (orange, rotates +3°) ─── */}
      <div className="absolute left-[-15%] w-[130%] h-[50px] md:h-[70px] overflow-hidden whitespace-nowrap flex items-center top-[48%] rotate-[3deg] bg-[#FF6B00] z-[2] shadow-[0_6px_30px_rgba(255,107,0,0.45),0_0_60px_rgba(255,107,0,0.15)]">
        <div className="inline-flex items-center will-change-transform" ref={topTrackRef}>
          {Array.from({ length: REPEATS }).map((_, i) => (
            <span key={`t-${i}`} className="inline-flex items-center gap-[12px] md:gap-[20px] px-[16px] md:px-[28px] shrink-0" aria-hidden="true">
              <span className="font-raleway text-[1.4rem] md:text-[2.6rem] font-black tracking-wide uppercase leading-none text-black">
                Let&apos;s Get Started
              </span>
              <span className="text-[1rem] md:text-[1.8rem] leading-none text-black">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── BOTTOM RIBBON (dark, rotates −3° → forms X) ─── */}
      <div className="absolute left-[-15%] w-[130%] h-[50px] md:h-[70px] overflow-hidden whitespace-nowrap flex items-center top-[52%] rotate-[-3deg] bg-[#1a1a1a] z-[1] shadow-[0_6px_30px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,107,0,0.12)] border-t border-[rgba(255,107,0,0.15)] border-b border-[rgba(255,107,0,0.08)]">
        <div className="inline-flex items-center will-change-transform" ref={bottomTrackRef}>
          {Array.from({ length: REPEATS }).map((_, i) => (
            <span key={`b-${i}`} className="inline-flex items-center gap-[12px] md:gap-[20px] px-[16px] md:px-[28px] shrink-0" aria-hidden="true">
              <span className="font-raleway text-[1.4rem] md:text-[2.6rem] font-black tracking-wide uppercase leading-none text-white">
                Let&apos;s Get Started
              </span>
              <span className="text-[1rem] md:text-[1.8rem] leading-none text-[#FF6B00]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
