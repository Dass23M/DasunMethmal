/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState, useEffect, useRef } from 'react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !heroRef.current) return;

    let ctx: { revert: () => void } | null = null;

    Promise.all([import('gsap')]).then(([{ default: gsap }]) => {
      ctx = gsap.context(() => {
        // 1. Shutter Curtain Reveal Animation
        gsap.to('.hero-reveal-shutter', {
          yPercent: -105,
          duration: 1.1,
          ease: 'power4.inOut',
          delay: 0.1,
        });

        // 2. Year Badge Slide Down
        gsap.fromTo(
          '.hero-year-badge',
          { opacity: 0, y: -25 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'expo.out', delay: 0.6 }
        );

        // 3. Giant Headline 3D Perspective Reveal
        gsap.fromTo(
          '.hero-headline',
          { opacity: 0, y: 45, rotateX: 18, transformOrigin: 'top center' },
          { opacity: 1, y: 0, rotateX: 0, duration: 1.2, ease: 'expo.out', delay: 0.75 }
        );

        // 4. Name Tag Fade & Letter Spacing Expansion
        gsap.fromTo(
          '.hero-name-tag',
          { opacity: 0, y: 15 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'expo.out', delay: 0.9 }
        );

        // 5. Discipline Box Scale & Float In
        gsap.fromTo(
          '.hero-discipline-card',
          { opacity: 0, scale: 0.95, y: 35 },
          { opacity: 1, scale: 1, y: 0, duration: 1.2, ease: 'expo.out', delay: 1.05 }
        );

        // 6. Robot Portrait 3D Rotation & Pop
        gsap.fromTo(
          '.hero-robot-card',
          { opacity: 0, scale: 0.88, rotateY: -15 },
          { opacity: 1, scale: 1, rotateY: 0, duration: 1.0, ease: 'back.out(1.4)', delay: 1.2 }
        );

        // 7. Bio Paragraph Float Up
        gsap.fromTo(
          '.hero-bio',
          { opacity: 0, y: 25 },
          { opacity: 1, y: 0, duration: 1.0, ease: 'expo.out', delay: 1.35 }
        );

        // 8. Call to Action Button Pop
        gsap.fromTo(
          '.hero-cta-btn',
          { opacity: 0, scale: 0.82, y: 20 },
          { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.7)', delay: 1.5 }
        );

        // 9. Stacked Portfolio Showcase Reveal
        gsap.fromTo(
          '.hero-recent-works',
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'expo.out', delay: 1.65 }
        );
      }, heroRef);
    });

    return () => ctx?.revert();
  }, [mounted]);

  const handleSmoothScroll = (targetId: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    const cleanId = targetId.replace('#', '');
    const el = document.getElementById(cleanId);
    if (el) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(el, { offset: 0, duration: 1.4 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (!mounted) {
    return <section id="home-section" className="w-full min-h-screen bg-[#07080B]" />;
  }

  return (
    <section
      ref={heroRef}
      id="home-section"
      className="min-h-screen overflow-hidden relative pt-28 sm:pt-32 pb-16 sm:pb-20 bg-[#07080B] text-white luxury-mesh-bg"
    >
      <style>{`
        .writing-mode-vertical {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
        .hero-perspective {
          perspective: 1000px;
        }
      `}</style>

      {/* Shutter Reveal Curtain Overlay */}
      <div className="hero-reveal-shutter pointer-events-none fixed inset-0 z-50 bg-[#07080B] flex flex-col justify-end">
        <div className="w-full h-1 bg-[#FF8A00] shadow-[0_0_20px_#FF8A00]" />
      </div>

      {/* Grid Mesh Background with Radial Mask */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          WebkitMaskImage: `
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
        }}
      />

      <div className="mx-auto max-w-7xl relative z-20 px-4 sm:px-6">
        {/* Main Giant Headline & Name Tags */}
        <div className="relative hero-perspective">
          <div className="hero-year-badge flex flex-wrap items-center gap-2.5 sm:gap-4 mb-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF8A00]/10 border border-[#FF8A00]/30 text-[#FF8A00] font-mono text-xs font-semibold tracking-wider shadow-[0_0_15px_rgba(255,138,0,0.15)]">
              <span className="w-2 h-2 rounded-full bg-[#FF8A00] animate-pulse shadow-[0_0_8px_#FF8A00]" />
              EST. 2023
            </span>
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-semibold tracking-wider shadow-[0_0_15px_rgba(16,185,129,0.15)]">
              <span className="w-2 h-2 rounded-full bg-emerald-400 live-beacon shadow-[0_0_8px_#10B981]" />
              OPEN FOR SELECT OPPORTUNITIES
            </span>
            <span className="text-zinc-400 font-mono text-[11px] tracking-widest hidden lg:inline-block">
              CARDIFF MET GRADUATE • FULLSTACK &amp; AI
            </span>
          </div>

          <h1 className="hero-headline z-20 text-white relative font-display font-extrabold text-left tracking-tight sm:tracking-[-6px] md:tracking-[-12px] xl:tracking-[-0.8rem] text-3xl xs:text-4xl sm:text-6xl md:text-8xl xl:text-[9.5rem] leading-none uppercase select-none drop-shadow-2xl max-w-6xl">
            CREATIVE <span className="animate-shimmer-text">ENGINEER</span>
          </h1>

          {/* Desktop Name Tag */}
          <p className="hero-name-tag text-2xl md:text-4xl hidden xl:block absolute -bottom-10 right-16 font-mono font-light tracking-[8px] text-[#FF8A00] drop-shadow-[0_0_20px_rgba(255,138,0,0.4)]">
            DASUN METHMAL
          </p>
          {/* Mobile/Tablet Name Tag */}
          <p className="hero-name-tag text-lg sm:text-2xl xl:hidden block text-center mt-3 font-mono font-light tracking-[5px] sm:tracking-[8px] text-[#FF8A00] drop-shadow-[0_0_15px_rgba(255,138,0,0.3)]">
            DASUN METHMAL
          </p>
        </div>

        {/* Disciplines & Portrait Grid */}
        <div className="grid relative mt-12 sm:mt-20 md:mt-24">
          <div className="space-y-8 pt-4 sm:pt-8 flex gap-6 justify-center">
            <div className="hero-discipline-card flex flex-col sm:flex-row gap-6 obsidian-surface rounded-2xl w-full max-w-2xl h-fit p-6 sm:p-8 md:p-10 items-start sm:items-end justify-between shadow-2xl">
              <div className="font-display font-semibold text-base sm:text-xl md:text-2xl space-y-2 text-white/90">
                <div className="hover:text-[#FF8A00] transition-colors cursor-default">/ FULLSTACK DEVELOPMENT</div>
                <div className="hover:text-[#FF8A00] transition-colors cursor-default">/ WEB DESIGN (UX/UI)</div>
                <div className="hover:text-[#FF8A00] transition-colors cursor-default">/ DIGITAL MARKETING &amp; SEO</div>
              </div>

              {/* Desktop Center Robot Container */}
              <div className="hero-robot-card hidden md:flex relative w-48 h-60 rounded-xl overflow-hidden bg-gray-100 dark:bg-[#111] border border-black/10 dark:border-white/5 shadow-[0_0_30px_rgba(255,138,0,0.15)] shrink-0 group">
                <img
                  src="/images/robot_hero.png"
                  alt="AI Robot Avatar"
                  className="h-full w-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-110"
                />
                <div className="text-left p-2 writing-mode-vertical text-[10px] font-mono font-semibold tracking-widest text-[#FF8A00] bg-white/85 dark:bg-black/85 backdrop-blur-md border-r border-black/5 dark:border-white/5 transition-all duration-500 group-hover:bg-white/95 dark:group-hover:bg-black/95">
                  AI ENGINE &amp; CREATIVE ROBOT
                </div>
              </div>
            </div>
          </div>

          {/* Mobile Center Robot Container */}
          <div className="hero-robot-card flex md:hidden mt-6 w-full max-w-2xl mx-auto rounded-2xl overflow-hidden bg-white/5 dark:bg-[#121212]/50 backdrop-blur-xl border border-black/10 dark:border-white/5 shadow-xl items-stretch">
            <div className="flex-1 relative h-56 sm:h-64 overflow-hidden">
              <img
                src="/images/robot_hero.png"
                alt="AI Robot Avatar"
                className="w-full h-full object-cover object-center"
              />
            </div>
            <div className="flex items-center justify-center p-3 writing-mode-vertical text-[10px] font-mono font-semibold tracking-widest text-[#FF8A00] bg-white/90 dark:bg-black/90 backdrop-blur-md border-l border-black/5 dark:border-white/5 shrink-0">
              AI ENGINE &amp; CREATIVE ROBOT
            </div>
          </div>
        </div>

        <div className="hero-bio mt-12 sm:mt-24 md:mt-36 max-w-2xl ml-0">
          <p className="font-mono text-left text-xs sm:text-sm md:text-base font-normal tracking-wide text-zinc-300 leading-relaxed uppercase px-2">
            I&apos;M AN EXPERIENCED FULLSTACK ENGINEER &amp; DIGITAL MARKETER,
            <br className="hidden xs:block" />
            WHO CRAFTS MEMORABLE HIGH-PERFORMANCE WEB EXPERIENCES
            <br className="hidden xs:block" />
            &amp; DATA-DRIVEN GROWTH STRATEGIES FOR BRANDS WORLDWIDE.
          </p>
        </div>

        <div className="hero-cta-btn flex flex-row flex-wrap justify-start gap-5 pt-8 sm:pt-10 px-2">
          <a
            href="#contact-section"
            onClick={handleSmoothScroll('#contact-section')}
            className="group relative inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#FFAA00] via-[#FF8A00] to-[#FF6B00] text-black font-display font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_30px_rgba(255,138,0,0.7)] w-auto overflow-hidden shadow-lg"
          >
            <span className="relative z-10 flex items-center gap-2">
              Book a Strategy Call
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform duration-300 group-hover:translate-x-1"
              >
                <path d="M7 7h10v10" />
                <path d="M7 17 17 7" />
              </svg>
            </span>
            <div className="absolute inset-0 bg-white/25 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </a>
          
          <a
            href="/Dasun Methmal CV.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 bg-white/[0.03] backdrop-blur-md border border-white/15 hover:border-[#FF8A00] text-white font-display font-bold text-sm px-8 py-3.5 rounded-full transition-all duration-300 hover:scale-[1.03] hover:bg-[#FF8A00]/10 hover:shadow-[0_0_20px_rgba(255,138,0,0.25)] w-auto"
          >
            Download CV
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="transition-transform duration-300 group-hover:-translate-y-0.5"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        </div>

        {/* Modern Interactive Scroll Down Cue */}
        <div className="pt-10 sm:pt-12 px-2 flex items-center">
          <a
            href="#portfolio-section"
            onClick={handleSmoothScroll('#portfolio-section')}
            className="group inline-flex items-center gap-3 text-xs font-mono font-medium tracking-widest text-zinc-400 hover:text-[#FF8A00] transition-colors"
          >
            <div className="w-5 h-8 rounded-full border border-white/20 group-hover:border-[#FF8A00] flex items-start justify-center p-1 transition-colors shadow-sm">
              <span className="w-1 h-2 rounded-full bg-[#FF8A00] animate-bounce shadow-[0_0_6px_#FF8A00]" />
            </div>
            <span>SCROLL TO EXPLORE WORK</span>
            <svg
              className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-y-1 text-[#FF8A00]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </a>
        </div>

        {/* Bottom Recent Work Showcase */}
        <div className="hero-recent-works flex flex-col md:flex-row mt-16 sm:mt-24 items-center md:items-end justify-between gap-10 md:gap-8 pt-10 sm:pt-12">
          <div className="relative mb-6 md:mb-0 w-64 h-40 mx-auto md:mx-0">
            <div className="w-52 sm:w-64 h-32 sm:h-40 shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-white/10 rounded-xl overflow-hidden bg-[#0D0E15]">
              <img
                src="/images/post-1.png"
                alt="Portfolio showcase 1"
                className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
            <div className="w-52 sm:w-64 h-32 sm:h-40 absolute left-4 sm:left-6 -top-4 sm:-top-6 shadow-[0_10px_40px_rgba(0,0,0,0.8)] border border-white/10 rounded-xl overflow-hidden bg-[#0D0E15]">
              <img
                src="/images/post-2.png"
                alt="Portfolio showcase 2"
                className="w-full h-full object-cover opacity-75 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
            <div className="w-52 sm:w-64 h-32 sm:h-40 absolute left-8 sm:left-12 -top-8 sm:-top-12 shadow-[0_20px_50px_rgba(0,0,0,0.9)] border border-white/15 rounded-xl overflow-hidden bg-[#0D0E15] group">
              <img
                src="/images/post-3.png"
                alt="Portfolio showcase 3"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>

          {/* Recent Work Label & Title */}
          <div className="text-center md:text-right">
            <a
              href="#portfolio-section"
              onClick={handleSmoothScroll('#portfolio-section')}
              className="inline-flex items-center gap-2 group text-white/90 hover:text-[#FF8A00] transition-colors"
            >
              <span className="text-xs sm:text-base font-mono font-semibold tracking-wider">
                RECENT WORK
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 group-hover:translate-y-1 transition-transform"
              >
                <line x1="7" y1="7" x2="17" y2="17" />
                <polyline points="17 7 17 17 7 17" />
              </svg>
            </a>

            <div className="mt-2">
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-display font-extrabold uppercase tracking-tight text-white">
                DESIGN WITHOUT <span className="text-gradient-amber">LIMITS</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
