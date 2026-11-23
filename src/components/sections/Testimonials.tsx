'use client';

import { useState } from 'react';
import Image from 'next/image';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    roleTag: 'FOUNDER OF TRAINMATE',
    quote:
      'Working with Methmal completely transformed our digital presence. His strategic thinking, attention to detail and engineering execution helped us ship fast.',
    name: 'George El Nachar',
    position: 'FOUNDER, TRAINMATE · DUBAI',
    image: '/images/person_man_1.jpg',
    pos: { top: '20%', left: '16%' },
  },
  {
    id: 2,
    roleTag: 'LEAD AT STUDIO CRAFT',
    quote:
      'Methmal’s attention to detail and creative direction exceeded expectations. The crisp layout and smooth interactions elevated our entire product.',
    name: 'Sarah Jenkins',
    position: 'DESIGN LEAD, STUDIO CRAFT · LONDON',
    image: '/images/person_woman_1.jpg',
    pos: { top: '54%', left: '12%' },
  },
  {
    id: 3,
    roleTag: 'CEO OF NEXA TECH',
    quote:
      'Working with Methmal was an incredible experience. Technical precision, clean architecture, and sharp visual layouts brought our vision to life seamlessly.',
    name: 'Alexander Wright',
    position: 'CEO, NEXA TECH · SAN FRANCISCO',
    image: '/images/person_man_2.jpg',
    pos: { top: '66%', left: '54%' },
  },
  {
    id: 4,
    roleTag: 'DIRECTOR AT VELOCE',
    quote:
      'Outstanding full-stack engineering quality and design vision. Methmal delivered our web platform on time with buttery-smooth performance throughout.',
    name: 'Elena Rostova',
    position: 'PRODUCT DIRECTOR, VELOCE · BERLIN',
    image: '/images/person_woman_2.jpg',
    pos: { top: '34%', left: '58%' },
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const current = TESTIMONIALS_DATA[active];

  const handlePrev = () =>
    setActive((prev) => (prev - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length);
  const handleNext = () =>
    setActive((prev) => (prev + 1) % TESTIMONIALS_DATA.length);

  return (
    <section
      id="testimonial-section"
      className="relative w-full bg-[#080808] text-white py-20 sm:py-28 lg:py-32 overflow-hidden border-t border-dashed border-white/[0.12] select-none"
    >
      {/* Subtle Dark Olive-Neon Ambient Glow on Left (matching Image 6) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-[18%] -translate-y-1/2 w-[520px] h-[520px] rounded-full bg-[#9CFF00]/[0.07] blur-[140px]"
      />

      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        <div className="mb-12">
          <span className="font-mono text-xs tracking-[0.16em] uppercase text-zinc-400">
            [TESTIMONIAL]
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          {/* Left Interactive Floating Client Map (Image 6) */}
          <div className="lg:col-span-6 relative h-[320px] sm:h-[400px] border border-dashed border-white/[0.1] bg-[#0B0D08]/60 overflow-hidden">
            {/* Subtle vertical waveform lines at bottom */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 inset-x-0 h-28 opacity-20 flex items-end justify-around px-6"
            >
              {[28, 45, 32, 68, 52, 84, 62, 95, 76, 48, 88, 58, 36, 72, 42].map((h, i) => (
                <span key={i} className="w-px bg-white/60" style={{ height: `${h}%` }} />
              ))}
            </div>

            {TESTIMONIALS_DATA.map((item, idx) => {
              const isSelected = idx === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(idx)}
                  style={{ top: item.pos.top, left: item.pos.left }}
                  className={`absolute flex items-center gap-2 transition-all duration-300 cursor-pointer group ${
                    isSelected ? 'z-20 scale-105' : 'z-10 opacity-75 hover:opacity-100'
                  }`}
                >
                  <div
                    className={`relative w-9 h-9 overflow-hidden border ${
                      isSelected ? 'border-[#9CFF00]' : 'border-white/30'
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      sizes="36px"
                      className={`object-cover ${isSelected ? '' : 'grayscale'}`}
                    />
                  </div>

                  <span
                    className={`font-mono text-[10px] font-semibold tracking-[0.12em] uppercase px-3 py-1.5 whitespace-nowrap transition-colors ${
                      isSelected
                        ? 'bg-[#9CFF00] text-black'
                        : 'bg-[#9CFF00]/80 text-black group-hover:bg-[#9CFF00]'
                    }`}
                  >
                    {item.roleTag}
                  </span>

                  {isSelected && (
                    <span className="w-9 h-9 bg-[#9CFF00] text-black flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 1L14.5 9.5L23 12L14.5 14.5L12 23L9.5 14.5L1 12L9.5 9.5L12 1Z" />
                      </svg>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Right Giant Editorial Pull-Quote + Pagination */}
          <div className="lg:col-span-6 lg:pl-6 flex flex-col justify-between min-h-[340px]">
            <blockquote className="font-display font-normal text-2xl sm:text-4xl lg:text-[2.75rem] leading-[1.15] tracking-[-0.03em] text-white mb-10">
              &ldquo;{current.quote}&rdquo;
            </blockquote>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-dashed border-white/[0.12]">
              <div className="flex items-center gap-3.5">
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
              </div>

              {/* Sharp Pagination Buttons: <  1 / 4  > */}
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous testimonial"
                  className="w-10 h-10 border border-white/20 hover:border-[#9CFF00] hover:bg-[#9CFF00] hover:text-black text-white flex items-center justify-center transition-colors cursor-pointer font-mono text-sm"
                >
                  &lt;
                </button>
                <span className="font-mono text-xs tracking-[0.16em] text-zinc-400 min-w-[44px] text-center">
                  {active + 1}/{TESTIMONIALS_DATA.length}
                </span>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next testimonial"
                  className="w-10 h-10 border border-white/20 hover:border-[#9CFF00] hover:bg-[#9CFF00] hover:text-black text-white flex items-center justify-center transition-colors cursor-pointer font-mono text-sm"
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
