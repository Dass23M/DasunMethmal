'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

export default function LandoStyleSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<SVGSVGElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Infinite smooth Marquee 1 (Leftwards)
      if (marquee1Ref.current) {
        gsap.to(marquee1Ref.current, {
          xPercent: -50,
          duration: 25,
          ease: 'none',
          repeat: -1,
        });
      }

      // Infinite smooth Marquee 2 (Rightwards)
      if (marquee2Ref.current) {
        gsap.fromTo(
          marquee2Ref.current,
          { xPercent: -50 },
          {
            xPercent: 0,
            duration: 28,
            ease: 'none',
            repeat: -1,
          }
        );
      }

      // Signature Draw Animation on load
      if (signatureRef.current) {
        const paths = signatureRef.current.querySelectorAll('path');
        paths.forEach((path) => {
          const length = path.getTotalLength();
          gsap.set(path, {
            strokeDasharray: length,
            strokeDashoffset: length,
          });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 2.2,
            ease: 'power2.out',
            delay: 0.4,
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return <section className="w-full h-[650px] bg-[#000000]" />;
  }

  const marqueeText1 = "WE DID IT TOGETHER • CRAFTING DIGITAL DREAMS • DRIVEN BY CODE • SCALING BRANDS WORLDWIDE • ";
  const marqueeText2 = "FOREVER AMBITIOUS • BOUNDLESS CREATIVITY • UNMATCHED PERFORMANCE • DESIGN & DEVELOPMENT • ";

  return (
    <section
      ref={sectionRef}
      id="landostyle-section"
      className="relative w-full min-h-[700px] md:min-h-[850px] bg-[#000000] text-white overflow-hidden select-none flex flex-col justify-between py-8 md:py-12 border-y border-white/10"
    >

      {/* ─── 2. TOP HEADER NAVIGATION BAR ─── */}
      <div className="relative z-30 w-full max-w-[1440px] mx-auto px-5 sm:px-10 flex items-center justify-between">
        {/* Left Brand Title */}
        <div className="flex items-center gap-2">
          <span className="font-sora font-black text-xl sm:text-2xl tracking-tighter text-white uppercase">
            METHMAL<span className="text-[#FF6B00]">.</span>
          </span>
        </div>
      </div>

      {/* ─── 3. CENTER HERO CONTAINER WITH BACKDROP MARQUEE & PORTRAIT OVERLAY ─── */}
      <div className="relative z-10 w-full my-auto py-12 md:py-20 flex items-center justify-center">

        {/* BACKGROUND CONTINUOUS GIANT MARQUEE TEXT LAYER */}
        <div className="absolute inset-0 flex flex-col justify-center gap-4 sm:gap-6 overflow-hidden pointer-events-none opacity-85 select-none">
          {/* Row 1: Leftward Scrolling Giant Headline */}
          <div className="w-max flex whitespace-nowrap" ref={marquee1Ref}>
            <span className="font-sora font-black text-[12vw] sm:text-[10vw] md:text-[8.5vw] uppercase tracking-tighter text-[#FF6B00] leading-none pr-8">
              {marqueeText1}
            </span>
            <span className="font-sora font-black text-[12vw] sm:text-[10vw] md:text-[8.5vw] uppercase tracking-tighter text-[#FF6B00] leading-none pr-8">
              {marqueeText1}
            </span>
          </div>

          {/* Row 2: Rightward Scrolling Secondary Giant Headline */}
          <div className="w-max flex whitespace-nowrap" ref={marquee2Ref}>
            <span className="font-sora font-black text-[12vw] sm:text-[10vw] md:text-[8.5vw] uppercase tracking-tighter text-white leading-none pr-8 opacity-90">
              {marqueeText2}
            </span>
            <span className="font-sora font-black text-[12vw] sm:text-[10vw] md:text-[8.5vw] uppercase tracking-tighter text-white leading-none pr-8 opacity-90">
              {marqueeText2}
            </span>
          </div>
        </div>

        {/* CENTER PORTRAIT CARD & NEON SIGNATURE OVERLAY */}
        <div className="relative z-20 w-[280px] xs:w-[320px] sm:w-[420px] md:w-[480px] aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-visible group">

          {/* Main Portrait Frame */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden border-2 border-white/20 shadow-2xl bg-[#1c201a]">
            <Image
              src="/images/methmal1.png"
              alt="Methmal Portrait"
              fill
              priority
              sizes="(max-width: 768px) 320px, 480px"
              className="object-cover object-top grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
            />
            {/* Subtle Vignette & Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

            {/* Bottom Card Title */}
            <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white z-10">
              <div>
                <p className="font-sora font-extrabold text-sm sm:text-base tracking-wide uppercase">
                  METHMAL
                </p>
                <p className="font-mono text-[10px] sm:text-xs text-[#FF6B00] font-semibold">
                  FULLSTACK &amp; MARKETING
                </p>
              </div>
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-ping" />
            </div>
          </div>

          {/* OVERLAY NEON SIGNATURE GRAPHIC (OVERLAPPING PORTRAIT BORDERS) */}
          <div className="absolute inset-0 -top-10 -bottom-10 -left-12 -right-12 pointer-events-none z-30 flex items-center justify-center">
            <svg
              ref={signatureRef}
              className="w-[125%] h-[125%] filter drop-shadow-[0_0_15px_rgba(255,107,0,0.8)]"
              viewBox="0 0 500 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Dynamic stylized neon signature path overlay matching Norris style */}
              <path
                d="M40 220 Q 90 40, 210 90 T 380 50 Q 480 30, 420 120 T 260 210 Q 200 240, 240 150 T 320 180"
                stroke="#FF6B00"
                strokeWidth="7"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M120 180 C 220 100, 310 110, 440 80 M 210 70 L 250 260 L 290 140 L 330 220"
                stroke="#FF6B00"
                strokeWidth="6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Secondary loop flourish */}
              <path
                d="M 180 240 Q 290 280, 410 230"
                stroke="#FFA800"
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </div>

        </div>

      </div>

      {/* ─── 4. BOTTOM STATUS BAR ─── */}
      <div className="relative z-30 w-full max-w-[1440px] mx-auto px-5 sm:px-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/70 border-t border-white/10 pt-4">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
          <span>BASED IN SRI LANKA / AVAILABLE FOR GLOBAL REMOTE WORK</span>
        </div>
        <div className="flex items-center gap-6">
          <span>CREATIVE ENGINE</span>
          <span className="text-[#FF6B00]">©2026 METHMAL®</span>
        </div>
      </div>
    </section>
  );
}
