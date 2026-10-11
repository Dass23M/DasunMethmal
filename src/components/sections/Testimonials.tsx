'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import SectionHeading from '@/components/ui/SectionHeading';

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
    return <section className="w-full min-h-[400px] bg-[#07080B]" />;
  }

  // Duplicate items array so infinite marquee wraps 100% seamlessly
  const slides = [...TESTIMONIALS_DATA, ...TESTIMONIALS_DATA];

  return (
    <section id="testimonial-section" className="w-full bg-[#07080B] text-white py-16 sm:py-24 md:py-28 overflow-hidden select-none luxury-mesh-bg">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-12 lg:px-20 mb-8 sm:mb-14">
        <SectionHeading 
          category="SOCIAL PROOF &amp; REPUTATION"
          title="CLIENT ENDORSEMENTS &amp; TESTIMONIALS" 
          subtitle="Direct feedback from startup founders, product directors, and global engineering collaborators."
        />
      </div>

      {/* ─── CONTINUOUS SMOOTH GSAP INFINITE MARQUEE SLIDER ─── */}
      <div
        className="w-full overflow-hidden py-4"
        onMouseEnter={() => tweenRef.current?.pause()}
        onMouseLeave={() => tweenRef.current?.play()}
      >
        <div ref={trackRef} className="inline-flex gap-6 sm:gap-8 will-change-transform">
          {slides.map((card, idx) => (
            <div
              key={`${card.id}-${idx}`}
              className="w-[78vw] xs:w-[82vw] sm:w-[620px] md:w-[740px] shrink-0 obsidian-surface rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-8 items-center border border-white/10 hover:border-[#FF8A00]/45 shadow-[0_15px_45px_rgba(0,0,0,0.7)] transition-all duration-300 group"
            >
              {/* Text Info Container */}
              <div className="flex-1 flex flex-col justify-between h-full text-left w-full">
                <div>
                  {/* Brand Logo Tag */}
                  <div className="flex items-center gap-2 mb-3 sm:mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#FF8A00] transition-transform duration-300 group-hover:scale-125 shadow-[0_0_8px_#FF8A00]" />
                    <span className="font-display font-bold text-base sm:text-lg text-white tracking-tight">
                      {card.brand}
                    </span>
                  </div>

                  {/* Quote */}
                  <blockquote className="font-body text-xs xs:text-sm sm:text-base text-zinc-300 leading-relaxed mb-4 sm:mb-8 font-light">
                    &ldquo;{card.quote}&rdquo;
                  </blockquote>
                </div>

                {/* Author Info */}
                <div>
                  <h3 className="font-display font-bold text-sm sm:text-base md:text-lg text-white leading-tight flex items-center gap-2">
                    {card.name}
                    {card.linkedin && (
                      <a href={card.linkedin} target="_blank" rel="noopener noreferrer" className="text-[#0A66C2] hover:opacity-80 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                        </svg>
                      </a>
                    )}
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-zinc-400 font-normal mt-0.5">
                    {card.position} • {card.location}
                  </p>
                </div>
              </div>

              {/* Portrait Image Side */}
              <div className="w-full md:w-[250px] lg:w-[280px] h-[140px] xs:h-[160px] sm:h-[300px] shrink-0 relative rounded-lg sm:rounded-2xl overflow-hidden border border-black/10 dark:border-white/5">
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
