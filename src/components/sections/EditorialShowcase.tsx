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
      <div className="relative z-20 w-full max-w-[1240px] mx-auto">
        <div ref={contentRef} className="w-full space-y-6 sm:space-y-8">
          <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] uppercase tracking-tight text-white leading-none">
            Marketing<span className="text-[#FF8A00]">.</span>
          </h2>

          <div className="max-w-xl">
            <p className="font-body text-base sm:text-lg md:text-xl font-normal leading-relaxed text-zinc-300">
              Targeted campaigns, technical SEO, and high-converting visuals built to scale modern brands.
            </p>
          </div>

          <div className="pt-2">
            <LiquidMetalButton
              label="VIEW WORK"
              href="#poster-design-section"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
