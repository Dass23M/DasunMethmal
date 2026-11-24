'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
  const quoteRef = useRef<HTMLQuoteElement>(null);
  const authorRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const current = TESTIMONIALS_DATA[active];

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
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
            once: true,
          },
        }
      );

      // Gentle ambient motion on waveform bars & desktop client pins (paused off-screen)
      const ambientTweens: gsap.core.Tween[] = [];

      const bars = sectionRef.current?.querySelectorAll<HTMLElement>('.testi-wave-bar');
      bars?.forEach((bar, i) => {
        ambientTweens.push(
          gsap.to(bar, {
            scaleY: 0.55 + (i % 4) * 0.14,
            duration: 1.2 + (i % 5) * 0.25,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        );
      });

      const pins = sectionRef.current?.querySelectorAll<HTMLElement>('.testi-map-pin');
      pins?.forEach((pin, idx) => {
        ambientTweens.push(
          gsap.to(pin, {
            y: idx % 2 === 0 ? -5 : 5,
            duration: 2.2 + idx * 0.35,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          })
        );
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => ambientTweens.forEach((t) => t.resume()),
        onEnterBack: () => ambientTweens.forEach((t) => t.resume()),
        onLeave: () => ambientTweens.forEach((t) => t.pause()),
        onLeaveBack: () => ambientTweens.forEach((t) => t.pause()),
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Smooth pull-quote & author swap transition (replaces framer-motion)
  useEffect(() => {
    if (quoteRef.current) {
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 14 },
        { opacity: 1, y: 0, duration: 0.4, ease: 'expo.out', overwrite: 'auto' }
      );
    }
    if (authorRef.current) {
      gsap.fromTo(
        authorRef.current,
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.34, ease: 'expo.out', overwrite: 'auto' }
      );
    }
  }, [active]);

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

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Mobile & Tablet (<1024px): Clean 2x2 Touch-Friendly Client Selector Grid */}
          <div className="testi-reveal lg:hidden grid grid-cols-2 gap-2.5">
            {TESTIMONIALS_DATA.map((item, idx) => {
              const isSelected = idx === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActive(idx)}
                  className={`flex items-center gap-2.5 p-2.5 border text-left transition-all duration-200 cursor-pointer active:scale-[0.98] ${
                    isSelected
                      ? 'bg-[#9CFF00] text-black border-[#9CFF00]'
                      : 'bg-[#111111] text-white border-white/15 hover:border-white/35'
                  }`}
                >
                  <div
                    className={`relative w-9 h-9 overflow-hidden shrink-0 border ${
                      isSelected ? 'border-black/25' : 'border-white/20'
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
                  <div className="min-w-0">
                    <span
                      className={`block font-display text-xs font-semibold truncate ${
                        isSelected ? 'text-black' : 'text-white'
                      }`}
                    >
                      {item.name}
                    </span>
                    <span
                      className={`block font-mono text-[9px] tracking-[0.1em] uppercase truncate ${
                        isSelected ? 'text-black/75' : 'text-zinc-400'
                      }`}
                    >
                      {item.roleTag}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Desktop (>=1024px): Interactive Floating Client Map */}
          <div className="testi-reveal hidden lg:block lg:col-span-6 relative h-[400px] border border-dashed border-white/[0.1] bg-[#0B0D08]/60 overflow-hidden">
            {/* Subtle animated vertical waveform lines at bottom */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 inset-x-0 h-28 opacity-25 flex items-end justify-around px-6"
            >
              {WAVE_HEIGHTS.map((h, i) => (
                <span
                  key={i}
                  className="testi-wave-bar w-px bg-white/60 origin-bottom will-change-transform"
                  style={{ height: `${h}%` }}
                />
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
                  className={`testi-map-pin absolute flex items-center gap-2 transition-opacity duration-300 cursor-pointer group will-change-transform ${
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

          {/* Right Giant Editorial Pull-Quote */}
          <div className="testi-reveal lg:col-span-6 lg:pl-6 flex flex-col justify-between min-h-[260px] lg:min-h-[340px]">
            <div className="min-h-[140px] sm:min-h-[200px] flex items-center">
              <blockquote
                ref={quoteRef}
                className="font-display font-normal text-xl sm:text-3xl lg:text-[2.75rem] leading-[1.2] sm:leading-[1.15] tracking-[-0.025em] text-white mb-6 sm:mb-10 will-change-transform"
              >
                &ldquo;{current.quote}&rdquo;
              </blockquote>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-dashed border-white/[0.12]">
              <div ref={authorRef} className="flex items-center gap-3.5 will-change-transform">
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
