'use client';

import { useEffect, useRef } from 'react';

export default function AcidBanner() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ctx: { revert: () => void } | null = null;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const mm = gsap.matchMedia();

          mm.add('(min-width: 768px)', () => {
            gsap.fromTo(
              '.acid-word-left',
              { x: -38 },
              {
                x: 24,
                ease: 'none',
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.9,
                },
              }
            );

            gsap.fromTo(
              '.acid-word-right',
              { x: 38 },
              {
                x: -24,
                ease: 'none',
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: 0.9,
                },
              }
            );

            gsap.to('.acid-cross', {
              rotate: 180,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.9,
              },
            });

            gsap.to('.acid-plus', {
              rotate: -135,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 0.9,
              },
            });
          });

          gsap.fromTo(
            '.acid-cutout-top',
            { yPercent: -100 },
            {
              yPercent: 0,
              duration: 0.85,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 85%',
                once: true,
              },
            }
          );

          gsap.fromTo(
            '.acid-cutout-bottom',
            { yPercent: 100 },
            {
              yPercent: 0,
              duration: 0.85,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                once: true,
              },
            }
          );

          gsap.fromTo(
            '.acid-caption',
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                once: true,
              },
            }
          );
        }, sectionRef);
      }
    );

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Creative engineering statement"
      className="relative w-full bg-[#9CFF00] text-black overflow-hidden select-none py-24 sm:py-32 lg:py-40"
    >
      {/* Subtle Halftone Texture Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 halftone-dots opacity-45"
      />

      {/* Architectural Black Pixel-Step Cutouts (Top) */}
      <div
        aria-hidden="true"
        className="acid-cutout-top pointer-events-none absolute top-0 left-0 right-0 flex justify-between will-change-transform"
      >
        <div className="flex items-start">
          <div className="w-10 sm:w-14 h-12 sm:h-16 bg-[#080808] ml-6 sm:ml-14" />
          <div className="w-5 sm:w-7 h-5 sm:h-7 bg-[#080808] mt-12 sm:mt-16" />
        </div>
        <div className="flex items-start">
          <div className="w-10 sm:w-14 h-7 sm:h-9 bg-[#080808] mt-7 sm:mt-9" />
          <div className="w-24 sm:w-44 h-7 sm:h-9 bg-[#080808]" />
        </div>
      </div>

      {/* Architectural Black Pixel-Step Cutouts (Bottom) */}
      <div
        aria-hidden="true"
        className="acid-cutout-bottom pointer-events-none absolute bottom-0 left-0 right-0 flex justify-between items-end will-change-transform"
      >
        <div className="flex items-end">
          <div className="w-8 sm:w-10 h-6 sm:h-8 bg-[#080808] ml-10 sm:ml-24" />
          <div className="w-6 sm:w-8 h-6 sm:h-8 bg-[#080808] ml-20 sm:ml-36" />
          <div className="w-28 sm:w-52 h-6 sm:h-8 bg-[#080808] mb-6 sm:mb-8" />
          <div className="w-6 sm:w-8 h-6 sm:h-8 bg-[#080808] mb-12 sm:mb-16" />
        </div>
        <div className="w-32 sm:w-56 h-7 sm:h-9 bg-[#080808] mr-4 sm:mr-10" />
      </div>

      {/* Center Statement Typography */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-4 sm:gap-10">
          <span className="acid-word-left font-display font-medium uppercase tracking-[-0.04em] leading-none text-[clamp(2.4rem,11vw,7.75rem)] will-change-transform">
            I DO
          </span>

          <span
            aria-hidden="true"
            className="acid-cross inline-block text-2xl sm:text-5xl font-light leading-none text-black/80 will-change-transform"
          >
            ×
          </span>

          <span className="acid-word-right font-display font-medium uppercase tracking-[-0.04em] leading-none text-[clamp(2.4rem,11vw,7.75rem)] will-change-transform">
            CREATIVE
          </span>

          <span
            aria-hidden="true"
            className="acid-plus hidden lg:inline-block text-4xl sm:text-5xl font-light leading-none text-black/80 will-change-transform"
          >
            +
          </span>
        </div>

        {/* Sub-caption */}
        <div className="acid-caption mt-8 sm:mt-14 text-center lg:text-left lg:pl-[46%] font-mono text-[10px] sm:text-xs tracking-[0.14em] uppercase leading-relaxed text-black/85">
          <div className="flex items-center justify-center lg:justify-start gap-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-black inline-block" />
            <span>FROM IDEA TO IMPACT</span>
          </div>
          <p className="mt-1 text-black/75">
            EVERY PROJECT STARTS WITH A CLEAR PURPOSE.
          </p>
        </div>
      </div>
    </section>
  );
}
