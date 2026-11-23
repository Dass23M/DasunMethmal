/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Magnetic from '@/components/ui/Magnetic';

const DISCIPLINES = [
  'Fullstack',
  'UI/UX Design',
  'AI & Systems',
  'Digital Growth',
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !heroRef.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let ctx: { revert: () => void } | null = null;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

          // 1. Masked split-line headline reveal
          tl.fromTo(
            '.hero-line-inner',
            { yPercent: 110, opacity: 0 },
            { yPercent: 0, opacity: 1, duration: 1.05, stagger: 0.12 },
            0.15
          )
            // 2. Editorial portrait vertical shutter reveal + gentle zoom settle
            .fromTo(
              '.hero-portrait-frame',
              { clipPath: 'inset(100% 0% 0% 0%)' },
              { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.1, ease: 'power4.inOut' },
              0.25
            )
            .fromTo(
              '.hero-portrait-img',
              { scale: 1.18 },
              { scale: 1.0, duration: 1.35, ease: 'expo.out' },
              0.25
            )
            // 3. Crosshair spin + discipline list cascade
            .fromTo(
              '.hero-crosshair',
              { opacity: 0, rotate: -90, scale: 0.6 },
              { opacity: 1, rotate: 0, scale: 1, duration: 0.8 },
              0.45
            )
            .fromTo(
              '.hero-discipline-item',
              { opacity: 0, x: 18 },
              { opacity: 1, x: 0, duration: 0.65, stagger: 0.07 },
              0.5
            )
            // 4. Bottom hairline & tags reveal
            .fromTo(
              '.hero-bottom-line',
              { scaleX: 0, transformOrigin: 'left center' },
              { scaleX: 1, duration: 0.9, ease: 'expo.out' },
              0.6
            )
            .fromTo(
              '.hero-bottom-meta',
              { opacity: 0, y: 14 },
              { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
              0.72
            );

          // 5. Subtle blinking cursor pulse on the neon underscore
          gsap.to('.hero-underscore', {
            opacity: 0.28,
            duration: 0.75,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
            delay: 1.3,
          });

          // 6. Smooth scroll-linked parallax as user scrolls past hero
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
        }, heroRef);
      }
    );

    return () => ctx?.revert();
  }, [mounted]);

  return (
    <section
      ref={heroRef}
      id="home-section"
      className="relative min-h-screen pt-28 sm:pt-32 pb-10 bg-[#080808] text-white overflow-hidden flex flex-col justify-between"
    >
      {/* Subtle Architectural Halftone Diagonal Texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-[18%] w-[420px] h-full halftone-dots-light opacity-50 -skew-x-12"
      />

      {/* Main Hero Canvas */}
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10 flex-1 flex flex-col justify-center py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-end">
          {/* Left: Giant Editorial Display Headline with Masked Clip-Up */}
          <div className="hero-headline-wrap lg:col-span-7 xl:col-span-7 will-change-transform">
            <h1 className="font-display font-medium tracking-[-0.045em] leading-[0.88] select-none">
              <span className="block overflow-hidden pb-2">
                <span className="hero-line-inner block text-[#9CFF00] text-[clamp(4.2rem,12vw,10.5rem)] will-change-transform">
                  Think
                  <span className="hero-underscore inline-block w-[0.42em] h-[0.075em] bg-[#9CFF00] ml-2 align-baseline translate-y-[0.06em]" />
                </span>
              </span>
              <span className="block overflow-hidden pb-2">
                <span className="hero-line-inner block text-white text-[clamp(4.2rem,12vw,10.5rem)] mt-1 will-change-transform">
                  Different
                </span>
              </span>
            </h1>
          </div>

          {/* Right: Crosshair + Discipline List + Shutter-Revealed Editorial Portrait */}
          <div className="lg:col-span-5 xl:col-span-5 flex flex-col sm:flex-row lg:flex-row items-start sm:items-end justify-end gap-6">
            {/* Crosshair + Interactive Services Stack */}
            <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto sm:h-[270px] lg:h-[290px] py-1">
              <div
                className="hero-crosshair relative w-7 h-7 text-white/85 shrink-0 will-change-transform"
                aria-hidden="true"
              >
                <span className="absolute left-1/2 top-0 bottom-0 w-px bg-current -translate-x-1/2" />
                <span className="absolute top-1/2 left-0 right-0 h-px bg-current -translate-y-1/2" />
              </div>

              <ul className="list-none m-0 p-0 text-right font-display text-sm sm:text-[15px] leading-[1.5] text-zinc-200 font-medium">
                {DISCIPLINES.map((item) => (
                  <li
                    key={item}
                    className="hero-discipline-item group flex items-center justify-end gap-2 cursor-default"
                  >
                    <span className="w-0 group-hover:w-3 h-px bg-[#9CFF00] transition-all duration-300" />
                    <span className="group-hover:text-[#9CFF00] transition-colors duration-200">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Square Monochrome Editorial Motion Card */}
            <div className="hero-portrait-frame relative w-full sm:w-[270px] lg:w-[290px] aspect-square overflow-hidden bg-[#141414] border border-white/10 group shrink-0">
              <img
                src="/images/methmal2.png"
                alt="Dasun Methmal Creative Engineer"
                className="hero-portrait-img w-full h-full object-cover object-top grayscale contrast-125 brightness-95 transition-[filter,transform] duration-700 ease-out group-hover:scale-105 group-hover:grayscale-0 will-change-transform"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/50 via-transparent to-white/10 pointer-events-none" />
              <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm border border-white/15 px-2.5 py-1 font-mono text-[10px] tracking-[0.16em] text-[#9CFF00] uppercase">
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
