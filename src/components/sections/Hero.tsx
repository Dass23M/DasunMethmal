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
    return <section id="home-section" className="w-full min-h-screen bg-gray-50 dark:bg-[#080808]" />;
  }

  return (
    <section
      ref={heroRef}
      id="home-section"
      className="min-h-screen overflow-hidden relative pt-28 sm:pt-32 pb-16 sm:pb-20 bg-gray-50 dark:bg-[#080808] text-black dark:text-white"
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
      <div className="hero-reveal-shutter pointer-events-none fixed inset-0 z-50 bg-gray-50 dark:bg-[#080808] flex flex-col justify-end">
        <div className="w-full h-1 bg-[#FF8A00] shadow-[0_0_20px_#FF8A00]" />
      </div>

      {/* Grid Mesh Background with Radial Mask */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.08) 1px, transparent 1px)
          `,
          backgroundSize: "28px 28px",
          backgroundPosition: "0 0, 0 0",
          maskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          WebkitMaskImage: `
            repeating-linear-gradient(
              to right,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            repeating-linear-gradient(
              to bottom,
              black 0px,
              black 3px,
              transparent 3px,
              transparent 8px
            ),
            radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)
          `,
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      />

      <div className="mx-auto max-w-7xl relative z-20 px-4 sm:px-6">
        {/* Main Giant Headline & Name Tags */}
        <div className="relative hero-perspective">
          <p className="hero-year-badge text-xs sm:text-sm absolute -top-5 left-2 sm:left-6 md:left-20 font-mono font-medium tracking-widest text-[#FF8A00]">
            EST. 2023
          </p>

          <h1 className="hero-headline z-20 text-black dark:text-white relative font-sora font-extrabold text-center tracking-tight sm:tracking-[-6px] md:tracking-[-12px] xl:tracking-[-0.8rem] text-3xl xs:text-4xl sm:text-6xl md:text-8xl xl:text-[9.5rem] leading-none uppercase select-none drop-shadow-2xl">
            CREATIVE ENGINEER
          </h1>

          {/* Desktop Name Tag */}
          <p className="hero-name-tag text-2xl md:text-4xl hidden xl:block absolute -bottom-10 right-16 font-mono font-light tracking-[8px] text-[#FF8A00]">
            DASUN METHMAL
          </p>
          {/* Mobile/Tablet Name Tag */}
          <p className="hero-name-tag text-lg sm:text-2xl xl:hidden block text-center mt-3 font-mono font-light tracking-[5px] sm:tracking-[8px] text-[#FF8A00]">
            DASUN METHMAL
          </p>
        </div>

        {/* Disciplines & Portrait Grid */}
        <div className="grid relative mt-12 sm:mt-20 md:mt-24">
          <div className="space-y-8 pt-4 sm:pt-8 flex gap-6 justify-center">
            <div className="hero-discipline-card flex flex-col sm:flex-row gap-6 bg-white/5 dark:bg-[#121212]/50 backdrop-blur-xl border border-black/10 dark:border-white/5 rounded-2xl w-full max-w-2xl h-fit p-6 sm:p-8 md:p-10 items-start sm:items-end justify-between shadow-2xl">
              <div className="font-sora font-semibold text-base sm:text-xl md:text-2xl space-y-2 text-black/90 dark:text-white/90">
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

        <div className="hero-bio mt-12 sm:mt-20 md:mt-32">
          <p className="mx-auto max-w-2xl font-mono text-center text-xs sm:text-sm md:text-base font-medium tracking-wide text-black/80 dark:text-gray-300 leading-relaxed uppercase px-2">
            I&apos;M AN EXPERIENCED FULLSTACK ENGINEER &amp; DIGITAL MARKETER,
            <br className="hidden xs:block" />
            WHO CRAFTS MEMORABLE HIGH-PERFORMANCE WEB EXPERIENCES
            <br className="hidden xs:block" />
            &amp; DATA-DRIVEN GROWTH STRATEGIES FOR BRANDS WORLDWIDE.
          </p>
        </div>

        <div className="hero-cta-btn flex flex-row flex-wrap justify-center gap-5 pt-8 sm:pt-10">
          <a
            href="#contact-section"
            onClick={handleSmoothScroll('#contact-section')}
            className="group relative inline-flex items-center justify-center gap-2 bg-[#FF8A00] text-black font-sora font-bold text-sm px-8 py-3 rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-[0_0_20px_rgba(255,138,0,0.6)] w-auto overflow-hidden"
          >
            <span className="relative z-10 flex items-center gap-2">
              Book a Call
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
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
          </a>
          
          <a
            href="/Dasun Methmal CV.pdf"
            download
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center justify-center gap-2 bg-transparent border border-black/20 dark:border-white/20 hover:border-[#FF8A00] dark:hover:border-[#FF8A00] text-black dark:text-white font-sora font-bold text-sm px-8 py-3 rounded-full transition-all duration-300 hover:scale-[1.02] hover:bg-[#FF8A00]/5 w-auto"
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
              className="transition-transform duration-300 group-hover:-translate-y-1"
            >
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
              <polyline points="7 10 12 15 17 10" />
              <line x1="12" y1="15" x2="12" y2="3" />
            </svg>
          </a>
        </div>

        {/* Bottom Recent Work Showcase */}
        <div className="hero-recent-works flex flex-col md:flex-row mt-16 sm:mt-24 items-center md:items-end justify-between gap-10 md:gap-8 pt-10 sm:pt-12">
          <div className="relative mb-6 md:mb-0 w-64 h-40 mx-auto md:mx-0">
            <div className="w-52 sm:w-64 h-32 sm:h-40 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-black/10 dark:border-white/5 rounded-xl overflow-hidden bg-gray-100 dark:bg-[#111]">
              <img
                src="/images/post-1.png"
                alt="Portfolio showcase 1"
                className="w-full h-full object-cover opacity-60 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
            <div className="w-52 sm:w-64 h-32 sm:h-40 absolute left-4 sm:left-6 -top-4 sm:-top-6 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border border-black/15 dark:border-white/5 rounded-xl overflow-hidden bg-gray-100 dark:bg-[#111]">
              <img
                src="/images/post-2.png"
                alt="Portfolio showcase 2"
                className="w-full h-full object-cover opacity-75 hover:opacity-100 transition-opacity duration-500"
              />
            </div>
            <div className="w-52 sm:w-64 h-32 sm:h-40 absolute left-8 sm:left-12 -top-8 sm:-top-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-black/20 dark:border-white/10 rounded-xl overflow-hidden bg-gray-100 dark:bg-[#111] group">
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
              className="inline-flex items-center gap-2 group text-black/90 dark:text-white/90 hover:text-[#FF8A00] transition-colors"
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
              <h2 className="text-2xl sm:text-4xl md:text-5xl font-sora font-extrabold uppercase tracking-tight text-black dark:text-white">
                DESIGN WITHOUT <span className="text-[#FF8A00]">LIMITS</span>
              </h2>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
