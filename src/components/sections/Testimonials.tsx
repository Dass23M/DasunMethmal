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
    return <section className="w-full min-h-[400px] bg-[#ffffff]" />;
  }

  // Duplicate items array so infinite marquee wraps 100% seamlessly
  const slides = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];

  return (
    <section id="testimonial-section" className="w-full bg-[#ffffff] text-black py-16 md:py-24 overflow-hidden select-none">
      {/* ─── HEADER SECTION ─── */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-20 mb-8 sm:mb-16 flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-8">
        <div>
          <span className="font-sora font-bold text-xs uppercase tracking-widest text-[#FF6B00] mb-2 block">
            {"// TESTIMONIALS"}
          </span>
          <h2 className="font-sora font-black text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-black tracking-tight leading-tight">
            Trusted Brands Worldwide
          </h2>
        </div>
        <p className="font-inter text-xs sm:text-sm md:text-base text-gray-600 max-w-md leading-relaxed">
          We build the next in digital experiences. From strategy to design, development to retention, we&apos;ve got you covered. 2+ years of experience, 37+ projects launched.
        </p>
      </div>

      {/* ─── CONTINUOUS SMOOTH GSAP INFINITE MARQUEE SLIDER ─── */}
      <div
        className="w-full overflow-hidden py-2 sm:py-4"
        onMouseEnter={() => tweenRef.current?.pause()}
        onMouseLeave={() => tweenRef.current?.play()}
      >
        <div ref={trackRef} className="inline-flex gap-4 sm:gap-8 will-change-transform">
          {slides.map((card, idx) => (
            <div
              key={`${card.id}-${idx}`}
              className="w-[88vw] sm:w-[620px] md:w-[740px] shrink-0 bg-white rounded-[24px] sm:rounded-[32px] p-4 sm:p-8 flex flex-col md:flex-row gap-4 sm:gap-8 items-center border border-gray-200/80 shadow-sm transition-all duration-300 hover:shadow-md hover:border-gray-300"
            >
              {/* Text Info Container */}
              <div className="flex-1 flex flex-col justify-between h-full text-left w-full">
                <div>
                  {/* Brand Logo Tag */}
                  <div className="flex items-center gap-2 mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00]" />
                    <span className="font-sora font-bold text-base md:text-lg text-black tracking-tight">
                      {card.brand}
                    </span>
                  </div>

                  {/* Quote */}
                  <blockquote className="font-inter text-xs sm:text-base text-gray-800 leading-relaxed mb-4 sm:mb-8 font-normal">
                    &ldquo;{card.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Author Info */}
                <div>
                  <h3 className="font-sora font-bold text-sm sm:text-base md:text-lg text-black leading-tight">
                    {card.name}
                  </h3>
                  <p className="font-inter text-[11px] sm:text-sm text-gray-500 font-medium mt-0.5">
                    {card.position}
                  </p>
                  <p className="font-inter text-[10px] sm:text-xs text-gray-400 mt-0.5">
                    {card.location}
                  </p>
                </div>
              </div>

              {/* Portrait Image Side */}
              <div className="w-full md:w-[250px] lg:w-[280px] h-[200px] sm:h-[300px] shrink-0 relative rounded-xl sm:rounded-2xl overflow-hidden border border-black/5">
                <Image
                  src={card.image}
                  alt={card.name}
                  fill
                  sizes="(max-width: 640px) 88vw, 280px"
                  className="object-cover rounded-xl sm:rounded-2xl"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

