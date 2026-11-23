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
    return <section className="w-full h-[650px] bg-[#FAFAFA]" />;
  }

  const marqueeText1 = "DESIGN • CODE • GROWTH • ";
  const marqueeText2 = "CREATIVE ENGINEERING • DIGITAL STRATEGY • ";

  return (
    <section
      ref={sectionRef}
      id="landostyle-section"
      className="relative w-full min-h-[650px] md:min-h-[780px] bg-[#FAFAFA] text-zinc-950 overflow-hidden select-none flex flex-col justify-center py-16 md:py-20"
    >
      {/* ─── CENTER HERO CONTAINER WITH BACKDROP MARQUEE & PORTRAIT OVERLAY ─── */}
      <div className="relative z-10 w-full my-auto py-12 md:py-16 flex items-center justify-center">

        {/* BACKGROUND CONTINUOUS GIANT MARQUEE TEXT LAYER */}
        <div className="absolute inset-0 flex flex-col justify-center gap-4 sm:gap-6 overflow-hidden pointer-events-none opacity-85 select-none">
          {/* Row 1: Leftward Scrolling Giant Headline */}
          <div className="w-max flex whitespace-nowrap" ref={marquee1Ref}>
            <span className="font-display font-black text-[12vw] sm:text-[10vw] md:text-[8.5vw] uppercase tracking-tighter text-[#FF6B00] leading-none pr-8">
              {marqueeText1}
            </span>
            <span className="font-display font-black text-[12vw] sm:text-[10vw] md:text-[8.5vw] uppercase tracking-tighter text-[#FF6B00] leading-none pr-8">
              {marqueeText1}
            </span>
          </div>

          {/* Row 2: Rightward Scrolling Secondary Giant Headline */}
          <div className="w-max flex whitespace-nowrap" ref={marquee2Ref}>
            <span className="font-display font-black text-[12vw] sm:text-[10vw] md:text-[8.5vw] uppercase tracking-tighter text-zinc-900/15 leading-none pr-8">
              {marqueeText2}
            </span>
            <span className="font-display font-black text-[12vw] sm:text-[10vw] md:text-[8.5vw] uppercase tracking-tighter text-zinc-900/15 leading-none pr-8">
              {marqueeText2}
            </span>
          </div>
        </div>

        {/* CENTER PORTRAIT CARD & SIGNATURE OVERLAY */}
        <div className="relative z-20 w-[280px] xs:w-[320px] sm:w-[420px] md:w-[460px] aspect-[4/5] sm:aspect-[3/4] rounded-2xl overflow-visible group">

          {/* Main Portrait Frame */}
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-zinc-200 shadow-[0_20px_50px_rgba(0,0,0,0.12)] bg-zinc-100">
            <Image
              src="/images/methmal1.png"
              alt="Methmal Portrait"
              fill
              priority
              sizes="(max-width: 768px) 320px, 460px"
              className="object-cover object-top grayscale contrast-125 transition-transform duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0"
            />
            {/* Subtle Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/15" />

            {/* Bottom Card Title */}
            <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between text-white z-10">
              <p className="font-display font-bold text-sm tracking-wide uppercase">
                Dasun Methmal
              </p>
            </div>
          </div>

          {/* OVERLAY SIGNATURE GRAPHIC */}
          <div className="absolute inset-0 -top-10 -bottom-10 -left-12 -right-12 pointer-events-none z-30 flex items-center justify-center">
            <svg
              ref={signatureRef}
              className="w-[125%] h-[125%] filter drop-shadow-[0_0_15px_rgba(255,107,0,0.8)]"
              viewBox="0 0 500 300"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
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
    </section>
  );
}
