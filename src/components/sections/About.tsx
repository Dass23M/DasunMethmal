'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Magnetic from '@/components/ui/Magnetic';

interface AboutProps {
  showMoreLink?: boolean;
}

const LEAD_PART_1 = [
  'Dasun',
  'Methmal',
  'is',
  'a',
  'Sri',
  'Lanka-based',
  'Creative',
  'Engineer,',
  'building',
  'scalable',
  'web',
  'apps,',
];

const LEAD_PART_2 = [
  'digital',
  'products',
  'and',
  'AI-powered',
  'experiences',
  'for',
  'modern',
  'businesses.',
];

export default function About({ showMoreLink = true }: AboutProps) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    let ctx: { revert: () => void } | null = null;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const mm = gsap.matchMedia();

          // Desktop: Full scroll-scrubbed word illumination + stamp & watermark parallax
          mm.add('(min-width: 768px)', () => {
            const words = sectionRef.current?.querySelectorAll('.about-scrub-word');
            if (words && words.length > 0) {
              gsap.fromTo(
                words,
                { opacity: 0.18 },
                {
                  opacity: 1,
                  stagger: 0.08,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: '.about-statement-wrap',
                    start: 'top 84%',
                    end: 'bottom 58%',
                    scrub: 0.85,
                  },
                }
              );
            }

            gsap.fromTo(
              '.about-neon-pill',
              { scale: 0.82, opacity: 0.2 },
              {
                scale: 1,
                opacity: 1,
                ease: 'expo.out',
                scrollTrigger: {
                  trigger: '.about-statement-wrap',
                  start: 'top 76%',
                  end: 'top 46%',
                  scrub: 0.8,
                },
              }
            );

            gsap.to('.about-pill-x', {
              rotate: 180,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1,
              },
            });

            gsap.to('.about-stamp-star', {
              rotate: 360,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.2,
              },
            });

            gsap.fromTo(
              '.about-year-watermark',
              { x: 45 },
              {
                x: -25,
                ease: 'none',
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 1,
                },
              }
            );
          });

          // Mobile: Lightweight one-shot entrance (zero scroll-scrub lag on touch devices)
          mm.add('(max-width: 767px)', () => {
            gsap.fromTo(
              '.about-statement-wrap',
              { opacity: 0, y: 24 },
              {
                opacity: 1,
                y: 0,
                duration: 0.75,
                ease: 'expo.out',
                scrollTrigger: {
                  trigger: '.about-statement-wrap',
                  start: 'top 88%',
                  once: true,
                },
              }
            );
          });
        }, sectionRef);
      }
    );

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about-section"
      className="relative w-full bg-[#080808] text-white py-20 sm:py-28 lg:py-32 overflow-hidden border-t border-dashed border-white/[0.12]"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Top Meta Bar */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-16 sm:mb-24">
          <div className="space-y-6">
            {/* Circular Starburst Stamp */}
            <div className="w-12 h-12 border border-white/15 bg-[#121212] flex items-center justify-center">
              <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 32 32"
                  fill="currentColor"
                  className="about-stamp-star will-change-transform"
                >
                  <path d="M16 0L18.2 12.2L27.3 4.7L19.8 13.8L32 16L19.8 18.2L27.3 27.3L18.2 19.8L16 32L13.8 19.8L4.7 27.3L12.2 18.2L0 16L12.2 13.8L4.7 4.7L13.8 12.2L16 0Z" />
                </svg>
              </div>
            </div>

            <div className="space-y-1.5 font-mono text-[11px] tracking-[0.14em] uppercase">
              <div className="flex items-center gap-2.5 text-white">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#9CFF00] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[#9CFF00]" />
                </span>
                <span>OPEN FOR NEW PROJECTS</span>
              </div>
              <p className="text-zinc-500">
                LET&apos;S CREATE SOMETHING REMARKABLE TOGETHER.
              </p>
            </div>
          </div>

          {/* Giant ® 2026 Watermark with Horizontal Parallax */}
          <div
            aria-hidden="true"
            className="about-year-watermark hidden sm:flex items-start font-display font-medium leading-none select-none text-white/[0.12] tracking-[-0.04em] will-change-transform"
          >
            <span className="text-4xl lg:text-6xl mr-2 mt-2">®</span>
            <span className="text-7xl lg:text-[9.5rem]">2026</span>
          </div>
        </div>

        {/* Main Editorial Statement Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          <div className="lg:col-span-3">
            <span className="font-mono text-xs tracking-[0.16em] uppercase text-zinc-400">
              [ABOUT ME]
            </span>
          </div>

          <div className="about-statement-wrap lg:col-span-9">
            <h2 className="font-display font-normal text-[1.65rem] sm:text-4xl lg:text-[3.35rem] leading-[1.2] sm:leading-[1.14] tracking-[-0.03em] text-white">
              <span className="hidden sm:inline-block w-20 lg:w-28" aria-hidden="true" />
              {LEAD_PART_1.map((word, i) => (
                <span key={`p1-${i}`} className="about-scrub-word inline-block mr-[0.26em]">
                  {word}
                </span>
              ))}
              <span
                aria-hidden="true"
                className="about-neon-pill inline-flex items-center gap-2 bg-[#9CFF00] text-black px-2.5 sm:px-3.5 py-0.5 sm:py-1 align-middle text-base sm:text-2xl lg:text-3xl font-mono font-normal mr-[0.26em] will-change-transform"
              >
                <span>+</span>
                <span className="about-pill-x inline-block will-change-transform">×</span>
                <span>+</span>
              </span>
              {LEAD_PART_2.map((word, i) => (
                <span key={`p2-${i}`} className="about-scrub-word inline-block mr-[0.26em]">
                  {word}
                </span>
              ))}
            </h2>

            {/* Bottom Metadata & Magnetic Link */}
            <div className="mt-14 sm:mt-20 pt-6 border-t border-dashed border-white/[0.12] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="font-body text-sm">
                <p className="text-white font-medium">
                  Based in Sri Lanka · Worldwide
                </p>
                <p className="text-zinc-500 mt-0.5">
                  Cardiff Met Software Engineering Graduate · Building Since 2023
                </p>
              </div>

              {showMoreLink && (
                <Magnetic strength={0.22}>
                  <Link
                    href="/about"
                    className="group inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] uppercase text-white hover:text-[#9CFF00] transition-colors py-1"
                  >
                    <span>MORE ABOUT ME</span>
                    <span className="text-[#9CFF00] transition-transform duration-200 group-hover:translate-x-1">
                      &gt;
                    </span>
                  </Link>
                </Magnetic>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
