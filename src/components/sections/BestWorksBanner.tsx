'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned & Scroll-Scrubbed "OUR BEST WORKS" Banner.
 * Features orangebackground.webp, ImpactSection-style typography,
 * rotating star vector, corner '+' crosshairs, and interactive embedded preview card.
 */
export default function BestWorksBanner() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLAnchorElement>(null);
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    const card = cardRef.current;
    if (!wrapper || !section) return;

    const textRow1 = section.querySelector('.text-row-1');
    const textRow2 = section.querySelector('.text-row-2');
    const badgeEl = section.querySelector('.banner-badge');
    const starEl = section.querySelector('.banner-star');

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop / tablet: pinned scrub timeline
      mm.add('(min-width: 768px)', () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: '+=1600',
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
          },
        });

        if (badgeEl) {
          tl.fromTo(
            badgeEl,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' },
            0
          );
        }

        if (textRow1) {
          tl.fromTo(
            textRow1,
            { y: 100, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
            0.1
          );
        }

        if (textRow2) {
          tl.fromTo(
            textRow2,
            { y: 100, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
            0.25
          );
        }

        if (card) {
          tl.fromTo(
            card,
            { scaleX: 0.1, opacity: 0, scaleY: 0.6 },
            { scaleX: 1, opacity: 1, scaleY: 1, duration: 0.9, ease: 'power3.inOut' },
            0.35
          );
        }

        if (starEl) {
          tl.fromTo(
            starEl,
            { scale: 0, rotate: -180 },
            { scale: 1, rotate: 0, duration: 0.8, ease: 'back.out(1.7)' },
            0.4
          );
        }
      });

      // Mobile: unpinned entrance
      mm.add('(max-width: 767px)', () => {
        gsap.set([textRow1, textRow2, card, badgeEl, starEl].filter(Boolean), {
          clearProps: 'transform,opacity,width,scale,rotate',
        });

        const targets = [badgeEl, textRow1, textRow2, card].filter(Boolean);
        if (targets.length) {
          gsap.fromTo(
            targets,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.7,
              stagger: 0.12,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 80%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });
    }, wrapper);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return <section className="hidden md:block w-full h-[100svh] lg:h-screen bg-[#FF6B00]" />;
  }

  return (
    <div ref={wrapperRef} className="hidden md:block w-full overflow-hidden">
      <section
        ref={sectionRef}
        className="relative w-full min-h-[380px] h-auto py-16 sm:py-24 md:py-0 md:h-[100svh] md:h-screen text-white flex items-center justify-center select-none overflow-hidden"
      >
        {/* Background Image: orangebackground.webp */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/orangebackground.webp"
            alt="Orange Background"
            fill
            priority
            className="object-cover object-center"
          />
          {/* Subtle gradient vignette overlay for depth & high contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
        </div>

        {/* Outer Frame with '+' Corner Crosshairs (matching ImpactSection style) */}
        <div className="absolute inset-6 sm:inset-10 lg:inset-14 z-10 border border-white/20 rounded-3xl pointer-events-none p-4 sm:p-6 flex flex-col justify-between">
          <span className="absolute top-2 left-3 text-white/80 text-sm sm:text-base font-mono select-none">+</span>
          <span className="absolute top-2 right-3 text-white/80 text-sm sm:text-base font-mono select-none">+</span>
          <span className="absolute bottom-2 left-3 text-white/80 text-sm sm:text-base font-mono select-none">+</span>
          <span className="absolute bottom-2 right-3 text-white/80 text-sm sm:text-base font-mono select-none">+</span>
        </div>

        {/* Main Content Container */}
        <div className="relative z-[2] w-full max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 lg:px-20 text-center flex flex-col items-center justify-center">
          
          {/* Rotating Asterisk Star Icon (ImpactSection style) */}
          <div className="banner-star absolute top-[-60px] sm:top-[-40px] lg:top-[-20px] right-[10%] sm:right-[15%] pointer-events-none">
            <svg
              className="w-14 h-14 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-white/90 animate-[spin_20s_linear_infinite] drop-shadow-lg"
              viewBox="0 0 100 100"
              fill="none"
              stroke="currentColor"
              strokeWidth="5"
              strokeLinecap="round"
            >
              <line x1="50" y1="5" x2="50" y2="95" />
              <line x1="5" y1="50" x2="95" y2="50" />
              <line x1="18" y1="18" x2="82" y2="82" />
              <line x1="18" y1="82" x2="82" y2="18" />
            </svg>
          </div>

          {/* Top Pill Tag Badge */}
          <div className="banner-badge mb-4 sm:mb-6 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 backdrop-blur-md border border-white/20 text-white font-mono text-xs sm:text-sm font-bold tracking-widest uppercase shadow-lg">
            <span className="text-white">✳</span>
            <span>FEATURED SHOWCASE</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </div>

          {/* Main Impact Headlines */}
          <div className="flex flex-col items-center justify-center text-center">
            
            {/* Row 1: OUR BEST */}
            <div className="text-row-1 font-raleway font-black text-[clamp(2.5rem,10vw,4.5rem)] md:text-[9vw] lg:text-[8.5vw] xl:text-[8rem] 2xl:text-[9.5rem] tracking-tighter uppercase leading-[0.9] text-white drop-shadow-2xl">
              <span className="text-white">OUR </span>
              <span className="text-black drop-shadow-none">BEST</span>
            </div>

            {/* Row 2: WOR [CARD] KS */}
            <div className="text-row-2 flex items-center justify-center gap-[4px] sm:gap-[12px] md:gap-[18px] mt-[6px] sm:mt-[12px] font-raleway font-black text-[clamp(2.5rem,10vw,4.5rem)] md:text-[9vw] lg:text-[8.5vw] xl:text-[8rem] 2xl:text-[9.5rem] tracking-tighter uppercase leading-[0.9] text-white drop-shadow-2xl">
              <span className="text-white">WOR</span>

              {/* Embedded Work Preview Card */}
              <Link
                ref={cardRef}
                href="#portfolio-section"
                className="relative w-[80px] sm:w-[140px] md:w-[16vw] xl:w-[250px] 2xl:w-[290px] h-[38px] sm:h-[65px] md:h-[8vw] xl:h-[125px] 2xl:h-[145px] rounded-[10px] sm:rounded-[18px] md:rounded-[1.6vw] xl:rounded-[26px] overflow-hidden inline-flex items-center justify-center border-2 border-white/60 shadow-2xl mx-[2px] sm:mx-[6px] align-middle transition-all duration-400 hover:border-white hover:scale-105 group will-change-[transform,opacity]"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                aria-label="View Best Works"
              >
                <Image
                  src="/images/work_1_full.jpg"
                  alt="Featured work preview"
                  fill
                  sizes="(max-width: 767px) 140px, (max-width: 1200px) 16vw, 290px"
                  className={`object-cover transition-transform duration-[600ms] ease-out ${
                    hovered ? 'scale-110' : 'scale-100'
                  }`}
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors duration-300 group-hover:bg-black/20">
                  <div className="w-[24px] h-[24px] sm:w-[44px] sm:h-[44px] md:w-[54px] md:h-[54px] rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center border border-white/80 shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:border-white">
                    <span className="w-0 h-0 border-t-[5px] sm:border-t-[8px] md:border-t-[10px] border-t-transparent border-b-[5px] sm:border-b-[8px] md:border-b-[10px] border-b-transparent border-l-[8px] sm:border-l-[13px] md:border-l-[16px] border-l-white ml-[2px] sm:ml-[3px] transition-colors duration-300 group-hover:border-l-black" />
                  </div>
                </div>
              </Link>

              <span className="text-black drop-shadow-none">KS</span>
            </div>

          </div>

          {/* Bottom Call to Action Button */}
          <div className="mt-8 sm:mt-12">
            <Link
              href="#portfolio-section"
              className="inline-flex items-center gap-3 bg-black text-white px-7 py-3.5 sm:px-9 sm:py-4 rounded-full font-raleway font-bold text-xs sm:text-sm tracking-wider uppercase border border-white/20 transition-all duration-300 hover:bg-white hover:text-black hover:scale-105 shadow-2xl group"
            >
              <span>EXPLORE ALL PROJECTS</span>
              <span className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
            </Link>
          </div>

        </div>
      </section>
    </div>
  );
}

