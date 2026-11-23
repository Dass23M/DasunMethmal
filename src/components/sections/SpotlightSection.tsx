'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

const SPOTLIGHT_ITEMS = [
  {
    id: 1,
    title: 'DASUN METHMAL',
    role: 'Creative Engineer & Fullstack Developer',
    image: '/images/methmal1.png',
  },
  {
    id: 2,
    title: 'SYSTEM ARCHITECTURE',
    role: 'Next.js · Node.js · PostgreSQL · Cloud',
    image: '/images/developer-1.png',
  },
  {
    id: 3,
    title: 'PRODUCT & UI CRAFT',
    role: 'Editorial Design Systems & Motion',
    image: '/images/methmal2.png',
  },
  {
    id: 4,
    title: 'BRAND & POSTER ART',
    role: 'Campaign Visuals & Art Direction',
    image: '/images/poster-5.png',
  },
  {
    id: 5,
    title: 'AI & ML ENGINEERING',
    role: 'Predictive Models & Intelligent UX',
    image: '/images/robot_hero.png',
  },
];

export default function SpotlightSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const current = SPOTLIGHT_ITEMS[activeIdx];

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ctx: { revert: () => void } | null = null;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
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
      }
    );

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Creative vision spotlight"
      className="relative w-full bg-[#080808] text-white py-20 sm:py-28 overflow-hidden border-t border-dashed border-white/[0.12] select-none"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12 relative">
        <div className="spot-stage relative border border-white/[0.1] p-4 sm:p-10 lg:p-14 overflow-hidden bg-[#0C0C0C]">
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

          {/* Center Large Portrait / Feature Frame with Smooth Shutter Crossfade */}
          <div className="relative z-10 flex flex-col items-center text-center mt-2">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] bg-[#161616] border border-white/15 overflow-hidden shadow-2xl">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  <Image
                    src={current.image}
                    alt={current.title}
                    fill
                    sizes="(max-width: 640px) 90vw, 380px"
                    className="object-cover object-top"
                  />
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="mt-6 min-h-[60px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                >
                  <h3 className="font-display font-medium text-xl sm:text-2xl tracking-[0.04em] uppercase text-white">
                    {current.title}
                  </h3>
                  <p className="font-body text-sm text-zinc-400 mt-1">
                    {current.role}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* 5-Thumbnail Selector Strip */}
            <div className="mt-8 sm:mt-10 grid grid-cols-5 gap-2 sm:gap-5 w-full max-w-2xl">
              {SPOTLIGHT_ITEMS.map((item, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    aria-label={`View ${item.title}`}
                    className={`relative aspect-square overflow-hidden border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'border-[#9CFF00] scale-105'
                        : 'border-white/15 opacity-55 hover:opacity-90'
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="120px"
                      className={`object-cover object-top transition-all duration-300 ${isActive ? '' : 'grayscale'}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
