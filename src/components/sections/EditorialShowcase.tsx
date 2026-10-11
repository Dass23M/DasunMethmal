'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShaderAnimation } from '@/components/ui/ShaderAnimation';
import { LiquidMetalButton } from '@/components/ui/LiquidMetalButton';

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
    return <section className="w-full min-h-[500px] bg-[#07080B]" />;
  }

  return (
    <section
      ref={sectionRef}
      id="digital-marketing-showcase"
      className="relative w-full min-h-[65vh] sm:min-h-[75vh] md:min-h-[85vh] bg-[#07080B] text-white py-16 sm:py-24 md:py-28 px-4 sm:px-8 md:px-16 lg:px-20 select-none overflow-hidden flex items-center luxury-mesh-bg"
    >
      {/* ─── 1. FULL-BLEED GLSL SHADER BACKGROUND ─── */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-85">
        <ShaderAnimation />
      </div>

      {/* Vignette Overlay for High Text Legibility */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/85 via-black/40 to-[#07080B] pointer-events-none" />

      {/* ─── 2. TRANSPARENT CONTENT ─── */}
      <div className="relative z-20 w-full max-w-[1550px] mx-auto">
        <div ref={contentRef} className="w-full space-y-6 sm:space-y-8 md:space-y-10">

          {/* Site-Consistent Top Header Row */}
          <div>
            <div className="flex items-center justify-between text-[10px] xs:text-xs sm:text-sm font-mono text-[#FF8A00] uppercase tracking-widest mb-3">
              <span className="flex items-center gap-2 font-bold">
                <span className="w-2 h-2 rounded-full bg-[#FF8A00] animate-pulse shadow-[0_0_8px_#FF8A00]" />
                {"// DIGITAL MARKETING & STRATEGY"}
              </span>
              <span className="text-zinc-400">EST. 2023</span>
            </div>

            {/* Giant Display Headline */}
            <h2 className="font-display font-black text-3xl xs:text-4xl sm:text-6xl md:text-7xl lg:text-[6.2rem] uppercase tracking-tight text-white leading-none drop-shadow-2xl">
              MARKETING<span className="text-gradient-amber">.</span>
            </h2>
          </div>

          {/* Floating Information Paragraph */}
          <div className="max-w-3xl">
            <p className="font-body text-sm sm:text-lg md:text-xl lg:text-2xl font-light leading-relaxed sm:leading-relaxed text-zinc-200 drop-shadow-md">
              Combining creative visual engineering with data-backed digital strategies. I engineer targeted social media campaigns, search engine optimization, and high-converting visual assets that scale brands and capture customer engagement.
            </p>
          </div>

          {/* Liquid Metal WebGL Shader Button */}
          <div className="pt-2">
            <LiquidMetalButton
              label="EXPLORE MARKETING & DESIGNS"
              href="#poster-design-section"
            />
          </div>

        </div>
      </div>
    </section>
  );
}
