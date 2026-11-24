'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export default function SpotlightSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (window.innerWidth >= 768) {
        gsap.fromTo(
          '.spot-neon-block',
          { y: -24, x: 18 },
          {
            y: 28,
            x: -10,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          }
        );
      }

      gsap.fromTo(
        '.spot-stage',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 84%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Creative vision spotlight"
      className="relative w-full bg-[#080808] text-white py-20 sm:py-28 overflow-hidden border-t border-dashed border-white/[0.12] select-none"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative">
        <div className="spot-stage relative border border-white/[0.1] p-6 sm:p-10 lg:p-14 overflow-hidden bg-[#0C0C0C]">
          {/* Acid-Green Top-Right Cutout Accent with Scroll Parallax */}
          <div
            aria-hidden="true"
            className="spot-neon-block pointer-events-none hidden md:block absolute top-0 right-0 w-72 lg:w-96 h-44 bg-[#9CFF00] halftone-dots will-change-transform"
          >
            <div className="absolute top-12 right-10 w-16 h-16 bg-[#0C0C0C]" />
            <div className="absolute bottom-0 right-0 w-10 h-10 bg-[#0C0C0C]" />
          </div>

          {/* Top-Left Stacked Light-Gray Tags */}
          <div className="relative z-10 flex flex-col items-start gap-1.5 mb-8 lg:mb-4">
            <span className="inline-block bg-[#E5E5E5] text-black font-mono text-[10px] font-semibold tracking-[0.16em] uppercase px-2.5 py-1">
              LEADING EVERY
            </span>
            <span className="inline-block bg-[#E5E5E5] text-black font-mono text-[10px] font-semibold tracking-[0.16em] uppercase px-2.5 py-1">
              CREATIVE VISION
            </span>
          </div>

          {/* Center Main Portrait Frame */}
          <div className="relative z-10 flex flex-col items-center text-center mt-2">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] bg-[#161616] border border-white/15 overflow-hidden shadow-2xl">
              <Image
                src="/images/methmal1.png"
                alt="Dasun Methmal"
                fill
                quality={80}
                sizes="(max-width: 640px) 320px, 380px"
                className="object-cover object-top"
              />
            </div>

            <div className="mt-6">
              <h3 className="font-display font-medium text-xl sm:text-2xl tracking-[0.04em] uppercase text-white">
                DASUN METHMAL
              </h3>
              <p className="font-body text-sm text-zinc-400 mt-1">
                Creative Engineer &amp; Fullstack Developer
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
