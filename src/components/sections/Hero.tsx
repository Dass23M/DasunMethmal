/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '@/components/ui/Magnetic';

const DISCIPLINES = [
  'Fullstack',
  'UI/UX Design',
  'AI & Systems',
  'Digital Growth',
];

const WORD_TOP = 'Think'.split('');
const WORD_BOTTOM = 'Different'.split('');

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    let autoTurnTl: gsap.core.Timeline | null = null;
    let fallbackTimer: number | null = null;
    let started = false;

    // Create GSAP context FIRST before defining callbacks that call ctx.add()
    const ctx = gsap.context(() => {}, heroRef);

    const runFullTurnWave = () => {
      const wave = gsap.timeline();
      wave
        .fromTo(
          '.hero-char-top',
          {
            rotateY: 0,
            transformPerspective: 1000,
            transformOrigin: '50% 50%',
          },
          {
            rotateY: 360,
            duration: 1.15,
            stagger: 0.055,
            ease: 'power2.inOut',
          },
          0
        )
        .fromTo(
          '.hero-char-bottom',
          {
            rotateY: 0,
            transformPerspective: 1000,
            transformOrigin: '50% 50%',
          },
          {
            rotateY: 360,
            duration: 1.15,
            stagger: 0.045,
            ease: 'power2.inOut',
          },
          0.26
        )
        .set('.hero-char-top, .hero-char-bottom', { rotateY: 0 });
      return wave;
    };

    const playEntrance = () => {
      if (started || !heroRef.current) return;
      started = true;
      if (fallbackTimer) {
        window.clearTimeout(fallbackTimer);
        fallbackTimer = null;
      }

      ctx.add(() => {
        const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

        // 1. Crisp entrance for "Think" & "Different" + immediate smooth 360° full turn
        tl.fromTo(
          '.hero-char-top',
          {
            opacity: 0,
            y: 28,
            rotateY: 0,
            transformPerspective: 1000,
            transformOrigin: '50% 50%',
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: 0.04,
            ease: 'power3.out',
          },
          0
        )
          .fromTo(
            '.hero-underscore',
            { scaleX: 0, opacity: 0, transformOrigin: 'left center' },
            { scaleX: 1, opacity: 1, duration: 0.5, ease: 'expo.out' },
            0.25
          )
          .fromTo(
            '.hero-char-bottom',
            {
              opacity: 0,
              y: 28,
              rotateY: 0,
              transformPerspective: 1000,
              transformOrigin: '50% 50%',
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.55,
              stagger: 0.035,
              ease: 'power3.out',
            },
            0.16
          )
          // Full 360° smooth kinetic turn right after words appear clearly on screen
          .add(runFullTurnWave(), 0.42)
          // 2. Editorial portrait vertical shutter reveal + gentle zoom settle
          .fromTo(
            '.hero-portrait-frame',
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.05, ease: 'power4.inOut' },
            0.12
          )
          .fromTo(
            '.hero-portrait-img',
            { scale: 1.16 },
            { scale: 1.0, duration: 1.25, ease: 'expo.out' },
            0.12
          )
          // 3. Crosshair spin + discipline list cascade
          .fromTo(
            '.hero-crosshair',
            { opacity: 0, rotate: -90, scale: 0.6 },
            { opacity: 1, rotate: 0, scale: 1, duration: 0.75 },
            0.28
          )
          .fromTo(
            '.hero-discipline-item',
            { opacity: 0, x: 18 },
            { opacity: 1, x: 0, duration: 0.6, stagger: 0.06 },
            0.34
          )
          // 4. Bottom hairline & tags reveal
          .fromTo(
            '.hero-bottom-line',
            { scaleX: 0, transformOrigin: 'left center' },
            { scaleX: 1, duration: 0.85, ease: 'expo.out' },
            0.42
          )
          .fromTo(
            '.hero-bottom-meta',
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.65, stagger: 0.07 },
            0.52
          );

        // 5. Subtle blinking cursor pulse on the neon underscore
        gsap.to('.hero-underscore', {
          opacity: 0.28,
          duration: 0.75,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
          delay: 1.1,
        });

        // 6. Automatic smooth 360° full-turn repeat every 3.8s (paused when scrolled away)
        autoTurnTl = gsap.timeline({
          repeat: -1,
          repeatDelay: 3.8,
          delay: 3.8,
        });
        autoTurnTl.add(runFullTurnWave(), 0);

        ScrollTrigger.create({
          trigger: heroRef.current,
          start: 'top bottom',
          end: 'bottom top',
          onLeave: () => autoTurnTl?.pause(),
          onEnterBack: () => autoTurnTl?.resume(),
        });
      });
    };

    // Wait for preloader ONLY if it is actively mounted on screen; otherwise play immediately
    const preloaderEl = document.getElementById('site-preloader');
    const loaderAlreadyDone =
      Boolean((window as unknown as { __loaderRevealed?: boolean }).__loaderRevealed) ||
      !preloaderEl;

    if (loaderAlreadyDone) {
      playEntrance();
    } else {
      // Hide chars briefly only while preloader is actively covering the viewport
      ctx.add(() => {
        gsap.set('.hero-char-top, .hero-char-bottom', { opacity: 0, y: 28 });
      });
      window.addEventListener('site-loader-reveal', playEntrance, { once: true });
      fallbackTimer = window.setTimeout(playEntrance, 2800);
    }

    // 7. Smooth scroll-linked parallax (desktop only for 120Hz native mobile touch scroll)
    ctx.add(() => {
      const mm = gsap.matchMedia();
      mm.add('(min-width: 768px)', () => {
        gsap.to('.hero-headline-wrap', {
          y: -52,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });

        gsap.to('.hero-crosshair', {
          rotate: 135,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });

        gsap.to('.hero-portrait-img', {
          yPercent: 10,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: 0.8,
          },
        });
      });
    });

    return () => {
      window.removeEventListener('site-loader-reveal', playEntrance);
      if (fallbackTimer) window.clearTimeout(fallbackTimer);
      autoTurnTl?.kill();
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={heroRef}
      id="home-section"
      className="relative min-h-[100svh] pt-24 sm:pt-32 pb-8 sm:pb-10 bg-[#080808] text-white overflow-hidden flex flex-col justify-between"
    >
      {/* Subtle Architectural Halftone Diagonal Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-[18%] w-[420px] h-full halftone-dots-light opacity-50 -skew-x-12"
      />

      {/* Main Hero Canvas */}
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative z-10 flex-1 flex flex-col justify-center py-6 sm:py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-end">
          {/* Left: Giant Editorial Display Headline with 3D Full-Turn Kinetic Typography */}
          <div className="hero-headline-wrap lg:col-span-7 xl:col-span-7 will-change-transform">
            <h1
              aria-label="Think Different"
              className="font-display font-medium tracking-[-0.045em] leading-[0.88] select-none"
            >
              <span
                aria-hidden="true"
                className="block pb-1.5 sm:pb-2 [perspective:1100px] [transform-style:preserve-3d]"
              >
                <span className="inline-flex items-baseline text-[#9CFF00] text-[clamp(3rem,13vw,10.5rem)]">
                  {WORD_TOP.map((char, idx) => (
                    <span
                      key={`top-${idx}`}
                      className="hero-char-top inline-block will-change-transform"
                    >
                      {char}
                    </span>
                  ))}
                  <span className="hero-underscore inline-block w-[0.42em] h-[0.075em] bg-[#9CFF00] ml-2 align-baseline translate-y-[0.06em]" />
                </span>
              </span>
              <span
                aria-hidden="true"
                className="block pb-1.5 sm:pb-2 mt-1 [perspective:1100px] [transform-style:preserve-3d]"
              >
                <span className="inline-flex items-baseline text-white text-[clamp(3rem,13vw,10.5rem)]">
                  {WORD_BOTTOM.map((char, idx) => (
                    <span
                      key={`bottom-${idx}`}
                      className="hero-char-bottom inline-block will-change-transform"
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </span>
            </h1>
          </div>

          {/* Right: Crosshair + Discipline List + Shutter-Revealed Editorial Portrait */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col sm:flex-row lg:flex-row items-stretch sm:items-end justify-end gap-5 sm:gap-6">
            {/* Crosshair + Interactive Services Stack */}
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto sm:h-[270px] lg:h-[290px] py-1 gap-4">
              <div
                className="hero-crosshair relative w-6 h-6 sm:w-7 sm:h-7 text-white/85 shrink-0 will-change-transform"
                aria-hidden="true"
              >
                <span className="absolute left-1/2 top-0 bottom-0 w-px bg-current -translate-x-1/2" />
                <span className="absolute top-1/2 left-0 right-0 h-px bg-current -translate-y-1/2" />
              </div>

              <ul className="list-none m-0 p-0 grid grid-cols-2 sm:block gap-x-5 gap-y-1 text-left sm:text-right font-display text-xs sm:text-[15px] leading-[1.5] text-zinc-200 font-medium">
                {DISCIPLINES.map((item) => (
                  <li
                    key={item}
                    className="hero-discipline-item group flex items-center sm:justify-end gap-2 cursor-default"
                  >
                    <span className="hidden sm:inline-block w-0 group-hover:w-3 h-px bg-[#9CFF00] transition-all duration-300" />
                    <span className="group-hover:text-[#9CFF00] transition-colors duration-200">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Square Monochrome Editorial Motion Card */}
            <div className="hero-portrait-frame relative w-full max-w-[340px] sm:max-w-none sm:w-[270px] lg:w-[290px] aspect-square overflow-hidden bg-[#141414] border border-white/10 group shrink-0">
              <img
                src="/images/methmal2.png"
                alt="Dasun Methmal Creative Engineer"
                className="hero-portrait-img w-full h-full object-cover object-[50%_13%] grayscale contrast-125 brightness-95 transition-[filter,transform] duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-white/10 pointer-events-none" />
              <div className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-sm border border-white/15 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-[#9CFF00] uppercase">
                DASUN METHMAL
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Dashed Hairline + Editorial Tags Bar */}
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="relative pt-6 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6">
          <div className="hero-bottom-line absolute top-0 left-0 right-0 border-t border-dashed border-white/[0.18]" />

          {/* Corner Anchor Square */}
          <span
            aria-hidden="true"
            className="hidden sm:block absolute -top-[3px] right-0 w-1.5 h-1.5 bg-white"
          />

          {/* Stacked Light-Gray Sharp Tags */}
          <div className="hero-bottom-meta flex flex-col items-start gap-1.5">
            <span className="inline-block bg-[#E5E5E5] text-black font-mono text-[10px] font-semibold tracking-[0.16em] uppercase px-2.5 py-1">
              PORTFOLIO
            </span>
            <span className="inline-block bg-[#E5E5E5] text-black font-mono text-[10px] font-semibold tracking-[0.16em] uppercase px-2.5 py-1">
              ENGINEERING THAT DRIVES IMPACT
            </span>
          </div>

          {/* Right Keywords + Magnetic CTA */}
          <div className="hero-bottom-meta flex flex-wrap items-center gap-6 font-mono text-[11px] tracking-[0.18em] uppercase text-zinc-400">
            <span>CREATIVE</span>
            <span>MODERN</span>
            <Magnetic strength={0.22}>
              <Link
                href="/works"
                className="text-white hover:text-[#9CFF00] transition-colors inline-flex items-center gap-1.5 py-1"
              >
                <span>EXPLORE WORKS</span>
                <span className="text-[#9CFF00]">↗</span>
              </Link>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
