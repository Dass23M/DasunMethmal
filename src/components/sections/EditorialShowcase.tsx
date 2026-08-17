'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ShaderAnimation } from '@/components/ui/ShaderAnimation';

gsap.registerPlugin(ScrollTrigger);

const MARKETING_METRICS = [
  { value: '3.5×', label: 'Avg. Campaign ROAS' },
  { value: '+140%', label: 'Organic Search Growth' },
  { value: '100+', label: 'Campaigns Executed' },
];

const MARKETING_PILLARS = [
  {
    icon: '⚡',
    title: 'Performance Marketing',
    desc: 'Targeted paid ad strategies, high-CTR promotional assets, and conversion rate optimization for Meta & Google.',
  },
  {
    icon: '📈',
    title: 'SEO & Content Strategy',
    desc: 'Technical site auditing, high-ranking search architecture, and data-driven organic traffic domination.',
  },
  {
    icon: '🎨',
    title: 'Visual Brand Engineering',
    desc: 'High-impact promotional graphics, custom campaign posters, and cohesive digital design systems.',
  },
];

export default function EditorialShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const shaderContainerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Smooth ScrollTrigger Entrance
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
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
      }

      if (shaderContainerRef.current) {
        gsap.fromTo(
          shaderContainerRef.current,
          { opacity: 0, scale: 0.95 },
          {
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      }

      if (statsRef.current) {
        gsap.fromTo(
          statsRef.current.children,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            stagger: 0.15,
            duration: 0.8,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 85%',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return <section className="w-full min-h-[600px] bg-[#060609]" />;
  }

  return (
    <section
      ref={sectionRef}
      id="digital-marketing-showcase"
      className="relative w-full bg-[#060609] text-white py-16 sm:py-24 md:py-28 px-4 sm:px-8 lg:px-12 select-none overflow-hidden"
    >
      {/* Background glow accents */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#FF6B00]/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-10 -right-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-[1550px] mx-auto relative z-10">

        {/* Section Tagline Header */}
        <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-[#FF6B00] uppercase tracking-widest pb-4 border-b border-white/10 mb-12">
          <span className="flex items-center gap-2 font-bold">
            <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse" />
            DIGITAL MARKETING &amp; STRATEGY
          </span>
          <span className="text-zinc-500 font-mono">©2026 METHMAL®</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

          {/* Left Column: Digital Marketing Copy & Pillars */}
          <div ref={textRef} className="lg:col-span-6 flex flex-col justify-between space-y-8">
            <div>
              <h2 className="font-sora font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-tight uppercase leading-[1.1] mb-6">
                Data-Driven <br className="hidden sm:block" />
                <span className="text-[#FF6B00]">Marketing &amp; Scaling</span>
              </h2>

              <p className="font-inter text-sm sm:text-base md:text-lg text-zinc-300 leading-relaxed max-w-xl">
                I blend creative visual engineering with data-backed performance strategies. From SEO-optimized content hubs and high-converting landing pages to targeted ad campaigns across Meta &amp; Google, I help ambitious brands build strong online presence and convert visitors into loyal customers.
              </p>
            </div>

            {/* Strategic Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {MARKETING_PILLARS.map((pillar, idx) => (
                <div
                  key={idx}
                  className="bg-zinc-900/60 border border-white/10 backdrop-blur-md p-4 rounded-xl hover:border-[#FF6B00]/40 transition-all duration-300 group"
                >
                  <div className="text-2xl mb-2 group-hover:scale-110 transition-transform">
                    {pillar.icon}
                  </div>
                  <h3 className="font-sora font-bold text-xs sm:text-sm text-white mb-1">
                    {pillar.title}
                  </h3>
                  <p className="font-inter text-[11px] text-zinc-400 leading-normal">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <div>
              <Link
                href="#poster-design-section"
                className="inline-flex items-center gap-3 bg-[#FF6B00] text-black px-7 py-3.5 rounded-full text-xs sm:text-sm font-mono font-bold tracking-wider uppercase transition-all duration-300 hover:bg-white hover:scale-105 shadow-lg shadow-[#FF6B00]/20 group"
              >
                <span>EXPLORE MARKETING &amp; POSTER DESIGNS</span>
                <span className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-45">
                  ⤵
                </span>
              </Link>
            </div>
          </div>

          {/* Right Column: WebGL GLSL Shader Showcase Display */}
          <div
            ref={shaderContainerRef}
            className="lg:col-span-6 relative w-full h-[400px] sm:h-[500px] md:h-[550px] lg:h-[600px] rounded-2xl overflow-hidden border border-white/15 bg-black shadow-2xl group"
          >
            {/* Embedded GLSL Three.js Shader Animation */}
            <ShaderAnimation />

            {/* Dark Gradient Overlay for Contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

            {/* Top HUD Badge */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20 pointer-events-none">
              <div className="bg-zinc-950/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full flex items-center gap-2 text-xs font-mono text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>GLSL MATH SHADER ENGINE</span>
              </div>
              <div className="bg-zinc-950/80 backdrop-blur-md border border-white/10 px-3 py-1.5 rounded-full text-[10px] font-mono text-[#FF6B00] uppercase tracking-widest">
                60 FPS REALTIME
              </div>
            </div>

            {/* Floating Metric Card Overlay */}
            <div className="absolute bottom-6 left-6 right-6 z-20 pointer-events-none">
              <div className="bg-zinc-950/85 backdrop-blur-xl border border-white/15 rounded-xl p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4 shadow-2xl">
                <div>
                  <div className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest mb-1">
                    PERFORMANCE ROI METRICS
                  </div>
                  <div className="font-sora font-black text-xl sm:text-2xl text-white">
                    3.5× Avg. ROAS <span className="text-[#FF6B00]">|</span> +140% CTR
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="px-3 py-1 bg-white/10 rounded-lg text-xs font-mono text-white">
                    SEO Optimized
                  </div>
                  <div className="px-3 py-1 bg-[#FF6B00]/20 text-[#FF6B00] border border-[#FF6B00]/30 rounded-lg text-xs font-mono font-bold">
                    High Conversion
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Bottom Metrics Grid */}
        <div
          ref={statsRef}
          className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-12 mt-12 border-t border-white/10"
        >
          {MARKETING_METRICS.map((metric, idx) => (
            <div
              key={idx}
              className="bg-zinc-900/40 border border-white/5 rounded-xl p-5 backdrop-blur-sm flex flex-col justify-center"
            >
              <span className="font-sora text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#FF6B00]">
                {metric.value}
              </span>
              <span className="text-xs sm:text-sm font-mono text-zinc-400 mt-2 uppercase tracking-wider">
                {metric.label}
              </span>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
