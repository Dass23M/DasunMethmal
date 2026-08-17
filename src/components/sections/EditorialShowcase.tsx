'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShaderAnimation } from '@/components/ui/ShaderAnimation';

gsap.registerPlugin(ScrollTrigger);

export default function EditorialShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !sectionRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return <section className="w-full min-h-[500px] bg-black" />;
  }

  return (
    <section
      ref={sectionRef}
      id="digital-marketing-showcase"
      className="relative w-full min-h-[65vh] sm:min-h-[75vh] md:min-h-[85vh] bg-black text-white py-14 sm:py-24 md:py-28 px-4 sm:px-8 md:px-16 lg:px-20 select-none overflow-hidden flex items-center"
    >
      {/* ─── 1. FULL-BLEED GLSL SHADER BACKGROUND ─── */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-85">
        <ShaderAnimation />
      </div>

      {/* Vignette Overlay for High Text Legibility */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/80 via-black/40 to-black/85 pointer-events-none" />

      {/* ─── 2. TRANSPARENT CONTENT ─── */}
      <div className="relative z-20 w-full max-w-[1550px] mx-auto">
        <div ref={contentRef} className="w-full space-y-6 sm:space-y-8 md:space-y-10">

          {/* Site-Consistent Top Header Row */}
          <div>
            <div className="flex items-center justify-between text-[10px] xs:text-xs sm:text-sm font-mono text-[#FF6B00] uppercase tracking-widest mb-3">
              <span className="flex items-center gap-2 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
                {"// DIGITAL MARKETING & STRATEGY"}
              </span>
              <span>EST. 2023</span>
            </div>

            {/* Giant Sora Headline */}
            <h2 className="font-sora font-extrabold text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[6.2rem] uppercase tracking-tight text-white leading-none drop-shadow-2xl">
              MARKETING<span className="text-[#FF6B00]">.</span>
            </h2>
          </div>

          {/* Floating Information Paragraph */}
          <div className="max-w-3xl">
            <p className="font-inter text-sm sm:text-lg md:text-xl lg:text-2xl font-normal leading-relaxed sm:leading-relaxed text-white/90 drop-shadow-md">
              Combining creative visual engineering with data-backed digital strategies. I engineer targeted social media campaigns, search engine optimization, and high-converting visual assets that scale brands and capture customer engagement.
            </p>
          </div>

          {/* Precision Sized Responsive CTA Button */}
          <div className="pt-2">
            <Link
              href="#poster-design-section"
              className="inline-flex items-center justify-center gap-2.5 sm:gap-3 bg-[#FF6B00] text-black px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-3.5 rounded-full text-xs sm:text-sm font-mono font-bold tracking-wider uppercase transition-all duration-300 hover:bg-white hover:scale-105 shadow-2xl group w-full xs:w-auto text-center"
            >
              <span>EXPLORE MARKETING &amp; POSTER DESIGNS</span>
              <span className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-45">
                ⤵
              </span>
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
}
