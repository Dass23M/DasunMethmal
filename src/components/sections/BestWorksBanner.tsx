'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Pinned & Scroll-Scrubbed "MY BEST WORKS" Banner.
 * Desktop (≥768px): pinned scrub timeline.
 * Mobile (<768px): unpinned entrance — no long pin spacing.
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

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop / tablet: keep existing pinned scrub experience
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

        if (textRow1) {
          tl.fromTo(
            textRow1,
            { y: 120, opacity: 0, scale: 0.85 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
            0
          );
        }

        if (textRow2) {
          tl.fromTo(
            textRow2,
            { y: 120, opacity: 0, scale: 0.85 },
            { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
            0.2
          );
        }

        if (card) {
          tl.fromTo(
            card,
            { scaleX: 0.1, opacity: 0, scaleY: 0.6 },
            { scaleX: 1, opacity: 1, scaleY: 1, duration: 0.9, ease: 'power3.inOut' },
            0.3
          );
        }
      });

      // Mobile: unpinned entrance — no extra scroll lock
      mm.add('(max-width: 767px)', () => {
        gsap.set([textRow1, textRow2, card].filter(Boolean), {
          clearProps: 'transform,opacity,width,scale',
        });

        const targets = [textRow1, textRow2].filter(Boolean);
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
    return <section className="hidden md:block w-full h-[100svh] lg:h-screen bg-white" />;
  }

  return (
    <div ref={wrapperRef} className="hidden md:block w-full overflow-hidden">
      <section
        ref={sectionRef}
        className="relative w-full min-h-[380px] h-auto py-16 sm:py-24 md:py-0 md:h-[100svh] md:h-screen bg-white text-black flex items-center justify-center select-none overflow-hidden"
      >
        <div className="relative z-[2] w-full max-w-[1400px] mx-auto px-4 sm:px-8 md:px-16 lg:px-20 text-center">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Row 1: OUR BEST */}
            <div className="text-row-1 font-raleway text-[clamp(2.1rem,9vw,3.8rem)] md:text-[8.5vw] lg:text-[7.8vw] xl:text-[7.5rem] 2xl:text-[8.8rem] font-extrabold tracking-tighter uppercase leading-[0.92] will-change-transform text-black">
              OUR BEST
            </div>

            {/* Row 2: WOR [CARD] KS */}
            <div className="text-row-2 flex items-center justify-center gap-[3px] sm:gap-[10px] md:gap-[16px] mt-[6px] sm:mt-[14px] font-raleway text-[clamp(2.1rem,9vw,3.8rem)] md:text-[8.5vw] lg:text-[7.8vw] xl:text-[7.5rem] 2xl:text-[8.8rem] font-extrabold tracking-tighter uppercase leading-[0.92] will-change-transform text-black">
              <span>WOR</span>

              {/* Embedded Work Preview Card */}
              <Link
                ref={cardRef}
                href="#portfolio-section"
                className="relative w-[75px] sm:w-[130px] md:w-[15vw] xl:w-[240px] 2xl:w-[280px] h-[34px] sm:h-[60px] md:h-[7.5vw] xl:h-[120px] 2xl:h-[140px] rounded-[8px] sm:rounded-[16px] md:rounded-[1.5vw] xl:rounded-[24px] overflow-hidden inline-flex items-center justify-center border border-black/10 shadow-md mx-[2px] sm:mx-[6px] align-middle transition-all duration-400 hover:border-black/30 hover:shadow-xl group will-change-[transform,opacity]"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                aria-label="View Best Works"
              >
                <Image
                  src="/images/work_1_full.jpg"
                  alt="Featured work preview"
                  fill
                  sizes="(max-width: 767px) 130px, (max-width: 1200px) 15vw, 280px"
                  className={`object-cover transition-transform duration-[600ms] ease-out ${
                    hovered ? 'scale-110' : 'scale-100'
                  }`}
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors duration-300 group-hover:bg-black/30">
                  <div className="w-[22px] h-[22px] sm:w-[42px] sm:h-[42px] md:w-[50px] md:h-[50px] rounded-full bg-white/25 backdrop-blur-md flex items-center justify-center border border-white/50 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:border-white">
                    <span className="w-0 h-0 border-t-[4px] sm:border-t-[7px] md:border-t-[9px] border-t-transparent border-b-[4px] sm:border-b-[7px] md:border-b-[9px] border-b-transparent border-l-[7px] sm:border-l-[12px] md:border-l-[15px] border-l-white ml-[2px] sm:ml-[3px] transition-colors duration-300 group-hover:border-l-black" />
                  </div>
                </div>
              </Link>

              <span>KS</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
