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
      className="relative w-full overflow-hidden h-[180px] md:h-[260px] bg-[#07080B] select-none z-[2]"
      aria-label="Call to action marquee"
    >
      {/* Ambient background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#FF8A00]/5 to-transparent pointer-events-none" />

      {/* ─── TOP RIBBON (Radiant Cyber Amber, rotates +3°) ─── */}
      <div className="absolute left-[-15%] w-[130%] h-[50px] md:h-[70px] overflow-hidden whitespace-nowrap flex items-center top-[48%] rotate-[3deg] bg-gradient-to-r from-[#FFAA00] via-[#FF8A00] to-[#FF6B00] z-[2] shadow-[0_10px_35px_rgba(255,138,0,0.5),0_0_80px_rgba(255,138,0,0.25)] border-y border-white/20">
        <div className="inline-flex items-center will-change-transform" ref={topTrackRef}>
          {Array.from({ length: REPEATS }).map((_, i) => (
            <span key={`t-${i}`} className="inline-flex items-center gap-[12px] md:gap-[20px] px-[16px] md:px-[28px] shrink-0" aria-hidden="true">
              <span className="font-display text-[1.4rem] md:text-[2.6rem] font-black tracking-wider uppercase leading-none text-black">
                Let&apos;s Get Started
              </span>
              <span className="text-[1rem] md:text-[1.8rem] leading-none text-black/80">✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* ─── BOTTOM RIBBON (Obsidian Metallic, rotates −3° → forms X) ─── */}
      <div className="absolute left-[-15%] w-[130%] h-[50px] md:h-[70px] overflow-hidden whitespace-nowrap flex items-center top-[52%] rotate-[-3deg] bg-[#10121A] z-[1] shadow-[0_10px_35px_rgba(0,0,0,0.9)] border-y border-white/10">
        <div className="inline-flex items-center will-change-transform" ref={bottomTrackRef}>
          {Array.from({ length: REPEATS }).map((_, i) => (
            <span key={`b-${i}`} className="inline-flex items-center gap-[12px] md:gap-[20px] px-[16px] md:px-[28px] shrink-0" aria-hidden="true">
              <span className="font-display text-[1.4rem] md:text-[2.6rem] font-black tracking-wider uppercase leading-none text-white">
                Let&apos;s Get Started
              </span>
              <span className="text-[1rem] md:text-[1.8rem] leading-none text-[#FF8A00] drop-shadow-[0_0_8px_#FF8A00]">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
