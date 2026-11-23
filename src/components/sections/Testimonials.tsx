'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion } from 'framer-motion';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    roleTag: 'FOUNDER OF TRAINMATE',
    quote:
      'Working with Methmal completely transformed our digital presence. His strategic thinking, attention to detail and engineering execution helped us ship fast.',
    name: 'George El Nachar',
    position: 'FOUNDER, TRAINMATE · DUBAI',
    image: '/images/person_man_1.jpg',
    pos: { top: '20%', left: '14%' },
  },
  {
    id: 2,
    roleTag: 'LEAD AT STUDIO CRAFT',
    quote:
      'Methmal’s attention to detail and creative direction exceeded expectations. The crisp layout and smooth interactions elevated our entire product.',
    name: 'Sarah Jenkins',
    position: 'DESIGN LEAD, STUDIO CRAFT · LONDON',
    image: '/images/person_woman_1.jpg',
    pos: { top: '52%', left: '10%' },
  },
  {
    id: 3,
    roleTag: 'CEO OF NEXA TECH',
    quote:
      'Working with Methmal was an incredible experience. Technical precision, clean architecture, and sharp visual layouts brought our vision to life seamlessly.',
    name: 'Alexander Wright',
    position: 'CEO, NEXA TECH · SAN FRANCISCO',
    image: '/images/person_man_2.jpg',
    pos: { top: '66%', left: '48%' },
  },
  {
    id: 4,
    roleTag: 'DIRECTOR AT VELOCE',
    quote:
      'Outstanding full-stack engineering quality and design vision. Methmal delivered our web platform on time with buttery-smooth performance throughout.',
    name: 'Elena Rostova',
    position: 'PRODUCT DIRECTOR, VELOCE · BERLIN',
    image: '/images/person_woman_2.jpg',
    pos: { top: '32%', left: '52%' },
  },
];

const WAVE_HEIGHTS = [28, 45, 32, 68, 52, 84, 62, 95, 76, 48, 88, 58, 36, 72, 42];

export default function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const current = TESTIMONIALS_DATA[active];

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ctx: { revert: () => void } | null = null;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          gsap.fromTo(
            '.testi-reveal',
            { opacity: 0, y: 28 },
            {
              opacity: 1,
              y: 0,
              duration: 0.9,
              stagger: 0.12,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
              },
            }
          );
        }, sectionRef);
      }
    );
    return () => ctx?.revert();
  }, []);

  const handlePrev = () =>
    setActive((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  const handleNext = () =>
    setActive((prev) => (prev + 1) % TESTIMONIALS_DATA.length);

  return (
    <section
      ref={sectionRef}
      id="testimonial-section"
      className="relative w-full bg-[#080808] text-white py-20 sm:py-28 lg:py-32 overflow-hidden border-t border-dashed border-white/[0.12] select-none"
    >
      {/* Subtle Dark Olive-Neon Ambient Glow on Left */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-[18%] -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-[#9CFF00]/[0.07] blur-[140px]"
      />

      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="testi-reveal mb-12">
          <span className="font-mono text-xs tracking-[0.16em] uppercase text-zinc-400">
            [TESTIMONIAL]
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Interactive Floating Client Map */}
          <div className="testi-reveal lg:col-span-6 relative h-[320px] sm:h-[400px] border border-dashed border-white/[0.1] bg-[#0B0D08]/60 overflow-hidden">
            {/* Subtle animated vertical waveform lines at bottom */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 inset-x-0 h-28 opacity-25 flex items-end justify-around px-6"
            >
              {WAVE_HEIGHTS.map((h, i) => (
                <motion.span
                  key={i}
                  animate={{
                    scaleY: [1, 0.55 + ((i + active) % 4) * 0.14, 1],
                  }}
                  transition={{
                    duration: 2.2 + (i % 5) * 0.35,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                  className="w-px bg-white/60 origin-bottom"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>

            {TESTIMONIALS_DATA.map((item, idx) => {
              const isSelected = idx === active;
              return (
                <motion.button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(idx)}
                  animate={{
                    y: isSelected ? -4 : [0, idx % 2 === 0 ? -5 : 5, 0],
                  }}
                  transition={
                    isSelected
                      ? { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
                      : { duration: 4.5 + idx * 0.6, repeat: Infinity, ease: 'easeInOut' }
                  }
                  style={{ top: item.pos.top, left: item.pos.left }}
                  className={`absolute flex items-center gap-2 transition-opacity duration-300 cursor-pointer group ${
                    isSelected ? 'z-20' : 'z-10 opacity-70 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`relative w-9 h-9 overflow-hidden border transition-colors ${
                      isSelected ? 'border-[#9CFF00]' : 'border-white/30'
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="36px"
                      className={`object-cover transition-all duration-300 ${isSelected ? '' : 'grayscale'}`}
                    />
                  </div>

                  <span
                    className={`font-mono text-[10px] font-semibold tracking-[0.12em] uppercase px-3 py-1.5 whitespace-nowrap transition-colors ${
                      isSelected
                        ? 'bg-[#9CFF00] text-black'
                        : 'bg-[#9CFF00]/75 text-black group-hover:bg-[#9CFF00]'
                    }`}
                  >
                    {item.roleTag}
                  </span>

                  {isSelected && (
                    <motion.span
                      layoutId="active-testimonial-star"
                      transition={{ type: 'spring', stiffness: 320, damping: 28 }}
                      className="w-9 h-9 bg-[#9CFF00] text-black flex items-center justify-center shrink-0"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1L14.5 9.5L23 12L14.5 14.5L12 23L9.5 14.5L1 12L9.5 9.5L12 1Z" />
                      </svg>
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>

          {/* Right Giant Editorial Pull-Quote + Smooth AnimatePresence */}
          <div className="testi-reveal lg:col-span-6 lg:pl-6 flex flex-col justify-between min-h-[340px]">
            <div className="min-h-[210px] flex items-center">
              <AnimatePresence mode="wait">
                <motion.blockquote
                  key={current.id}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
                  className="font-display font-normal text-2xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] tracking-[-0.03em] text-white mb-10"
                >
                  &ldquo;{current.quote}&rdquo;
                </motion.blockquote>
              </AnimatePresence>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-dashed border-white/[0.12]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-center gap-3.5"
                >
                  <div className="relative w-12 h-12 overflow-hidden border border-white/20 shrink-0">
                    <Image
                      src={current.image}
                      alt={current.name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="font-display font-medium text-base text-white leading-tight">
                      {current.name}
                    </p>
                    <p className="font-mono text-[10px] tracking-[0.14em] uppercase text-zinc-400 mt-1">
                      {current.position}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Sharp Pagination Buttons */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 border border-white/20 hover:border-[#9CFF00] hover:bg-[#9CFF00] hover:text-black text-white flex items-center justify-center transition-colors cursor-pointer font-mono text-sm active:scale-95"
                >
                  &lt;
                </button>
                <span className="font-mono text-xs tracking-[0.16em] text-zinc-400 min-w-[44px] text-center tabular-nums">
                  {active + 1}/{TESTIMONIALS_DATA.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="w-10 h-10 border border-white/20 hover:border-[#9CFF00] hover:bg-[#9CFF00] hover:text-black text-white flex items-center justify-center transition-colors cursor-pointer font-mono text-sm active:scale-95"
                >
                  &gt;
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
