'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShaderAnimation } from '@/components/ui/ShaderAnimation';

gsap.registerPlugin(ScrollTrigger);

const MARKETING_METRICS = [
  { value: '3.5×', label: 'Avg. ROAS' },
  { value: '+140%', label: 'Organic Traffic' },
  { value: '100+', label: 'Campaigns Executed' },
];

export default function EditorialShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !sectionRef.current || !cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        cardRef.current,
        { opacity: 0, y: 50, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
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
    return <section className="w-full min-h-[650px] bg-black" />;
  }

  return (
    <section
      ref={sectionRef}
      id="digital-marketing-showcase"
      className="relative w-full min-h-[75vh] md:min-h-[85vh] bg-black text-white py-20 sm:py-28 md:py-32 px-4 sm:px-8 lg:px-12 select-none overflow-hidden flex items-center justify-center"
    >
      {/* ─── 1. FULL SECTION GLSL SHADER BACKGROUND ─── */}
      <div className="absolute inset-0 w-full h-full z-0 pointer-events-none opacity-80">
        <ShaderAnimation />
      </div>

      {/* Dark Vignette & Gradient Overlay for Sharp Contrast */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/85 via-black/55 to-black/90 pointer-events-none" />

      {/* Radial Glow Accent */}
      <div className="absolute inset-0 z-10 bg-[radial-gradient(circle_at_center,rgba(255,107,0,0.12)_0%,transparent_70%)] pointer-events-none" />

      {/* ─── 2. OVERLAID DIGITAL MARKETING CONTENT ─── */}
      <div className="relative z-20 w-full max-w-4xl mx-auto text-center">
        <div
          ref={cardRef}
          className="bg-zinc-950/80 border border-white/15 backdrop-blur-2xl p-6 sm:p-10 md:p-14 rounded-3xl shadow-2xl space-y-6 sm:space-y-8"
        >
          {/* Top Eyebrow Tag */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs sm:text-sm font-mono text-[#FF6B00] uppercase tracking-widest">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
            <span>DIGITAL MARKETING &amp; STRATEGY</span>
          </div>

          {/* Main Title */}
          <h2 className="font-sora font-extrabold text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight uppercase leading-tight">
            Data-Driven <span className="text-[#FF6B00]">Marketing &amp; Scaling</span>
          </h2>

          {/* Short Information Paragraph */}
          <p className="font-inter text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed max-w-2xl mx-auto">
            Combining creative visual engineering with data-backed performance strategies. From targeted social ad campaigns to technical search engine optimization, I engineer digital brand experiences that capture attention and drive measurable revenue.
          </p>

          {/* Key Metric Pills */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-4 border-t border-white/10">
            {MARKETING_METRICS.map((m, idx) => (
              <div
                key={idx}
                className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col items-center justify-center hover:border-[#FF6B00]/40 transition-colors"
              >
                <span className="font-sora font-extrabold text-2xl sm:text-3xl md:text-4xl text-[#FF6B00]">
                  {m.value}
                </span>
                <span className="font-mono text-xs text-zinc-400 uppercase tracking-wider mt-1">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Action Button */}
          <div className="pt-2">
            <Link
              href="#poster-design-section"
              className="inline-flex items-center gap-3 bg-[#FF6B00] text-black px-8 py-4 rounded-full text-xs sm:text-sm font-mono font-bold tracking-wider uppercase transition-all duration-300 hover:bg-white hover:scale-105 shadow-xl shadow-[#FF6B00]/20 group"
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
