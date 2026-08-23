'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const TESTIMONIALS_DATA = [
  {
    id: 1,
    brand: 'Trainmate',
    quote:
      'As a founder, finding the right team for Trainmate was a challenge until we discovered Methmal. They quickly onboarded, worked within our budget, and delivered high-quality designs at an impressive pace.',
    name: 'George El Nachar',
    position: 'Founder, Trainmate',
    location: 'Dubai, United Arab Emirates',
    image: '/images/editorial_1.png',
    linkedin: 'https://www.linkedin.com/in/george-elnachar',
  },
  {
    id: 2,
    brand: 'Studio Craft',
    quote:
      'Methmal attention to detail and creative direction exceeded all expectations. The seamless animations and design aesthetic transformed our online presence completely.',
    name: 'Sarah Jenkins',
    position: 'Design Lead, Studio Craft',
    location: 'London, United Kingdom',
    image: '/images/editorial_2.png',
    linkedin: 'https://www.linkedin.com/in/sarah-jenkins',
  },
  {
    id: 3,
    brand: 'Nexa Tech',
    quote:
      'Working with Methmal was an incredible experience. The speed, technical precision, and stunning visual layouts brought our product vision to life seamlessly.',
    name: 'Alexander Wright',
    position: 'CEO, Nexa Tech',
    location: 'San Francisco, USA',
    image: '/images/editorial_3.png',
    linkedin: 'https://www.linkedin.com/in/alexander-wright',
  },
  {
    id: 4,
    brand: 'Veloce',
    quote:
      'Outstanding engineering quality and design vision. Methmal delivered our fullstack web platform on time with buttery-smooth interactions throughout.',
    name: 'Elena Rostova',
    position: 'Product Director, Veloce',
    location: 'Berlin, Germany',
    image: '/images/editorial_4.png',
    linkedin: 'https://www.linkedin.com/in/elena-rostova',
  },
];

export default function Testimonials() {
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !trackRef.current) return;

    // Double dataset for seamless infinite looping
    const ctx = gsap.context(() => {
      tweenRef.current = gsap.to(trackRef.current, {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      });
    }, trackRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return <section className="w-full min-h-[400px] bg-gray-50 dark:bg-[#080808]" />;
  }

  // Duplicate items array so infinite marquee wraps 100% seamlessly
  const slides = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];

  return (
    <section id="testimonial-section" className="w-full bg-gray-50 dark:bg-[#080808] text-black dark:text-white py-12 sm:py-20 md:py-24 overflow-hidden select-none">
      {/* ─── HEADER SECTION ─── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-20 mb-6 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-8">
        <div>
          <span className="font-sora font-bold text-xs uppercase tracking-widest text-[#FF6B00] mb-2 block">
            {"// TESTIMONIALS"}
          </span>
          <h2 className="font-sora font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-black dark:text-white tracking-tight leading-tight">
            Trusted Brands Worldwide
          </h2>
        </div>
        <p className="font-inter text-xs sm:text-sm md:text-base text-black/70 dark:text-white/70 max-w-md leading-relaxed">
          We build the next in digital experiences. From strategy to design, development to retention, we&apos;ve got you covered. 2+ years of experience, 10+ projects launched.
        </p>
      </div>

      {/* ─── CONTINUOUS SMOOTH GSAP INFINITE MARQUEE SLIDER ─── */}
      <div
        className="w-full overflow-hidden py-2 sm:py-4"
        onMouseEnter={() => tweenRef.current?.pause()}
        onMouseLeave={() => tweenRef.current?.play()}
      >
        <div ref={trackRef} className="inline-flex gap-3.5 sm:gap-8 will-change-transform">
          {slides.map((card, idx) => (
            <div
              key={`${card.id}-${idx}`}
              className="w-[78vw] xs:w-[82vw] sm:w-[620px] md:w-[740px] shrink-0 bg-white dark:bg-[#121212] rounded-[20px] sm:rounded-[32px] p-4 xs:p-5 sm:p-8 flex flex-col md:flex-row gap-3.5 sm:gap-8 items-center border border-black/10 dark:border-white/10 shadow-sm transition-all duration-300 hover:shadow-md hover:border-black/20 dark:border-white/20"
            >
              {/* Text Info Container */}
              <div className="flex-1 flex flex-col justify-between h-full text-left w-full">
                <div>
                  {/* Brand Logo Tag */}
                  <div className="flex items-center gap-2 mb-2.5 sm:mb-4">
                    <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-[#FF6B00]" />
                    <span className="font-sora font-bold text-sm sm:text-base md:text-lg text-black dark:text-white tracking-tight">
                      {card.brand}
                    </span>
                  </div>

                  {/* Quote */}
                  <blockquote className="font-inter text-xs xs:text-sm sm:text-base text-black/90 dark:text-white/90 leading-snug sm:leading-relaxed mb-3 sm:mb-8 font-normal">
                    &ldquo;{card.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Author Info */}
                <div>
                  <h3 className="font-sora font-bold text-xs sm:text-base md:text-lg text-black dark:text-white leading-tight flex items-center gap-2">
                    {card.name}
                    {card.linkedin && (
                      <a href={card.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0A66C2] hover:opacity-80 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                  </h3>
                  <p className="font-inter text-[10px] sm:text-sm text-black/70 dark:text-white/70 font-medium mt-0.5">
                    {card.position}
                  </p>
                  <p className="font-inter text-[9px] sm:text-xs text-black/40 dark:text-white/40 mt-0.5">
                    {card.location}
                  </p>
                </div>
              </div>

              {/* Portrait Image Side */}
              <div className="w-full md:w-[250px] lg:w-[280px] h-[140px] xs:h-[160px] sm:h-[300px] shrink-0 relative rounded-lg sm:rounded-2xl overflow-hidden border border-black/10 dark:border-white/10">
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  sizes="(max-width: 640px) 78vw, 280px"
                  className="object-cover rounded-lg sm:rounded-2xl"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
