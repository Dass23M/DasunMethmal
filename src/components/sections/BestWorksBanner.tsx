'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
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
  const glowRef = useRef<HTMLDivElement>(null);
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
    const glow = glowRef.current;
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

        if (glow) {
          tl.fromTo(
            glow,
            { scale: 0.5, opacity: 0 },
            { scale: 1.5, opacity: 0.8, duration: 1, ease: 'power2.out' },
            0
          );
        }

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
            { width: '30px', opacity: 0, scale: 0.6 },
            { width: '260px', opacity: 1, scale: 1, duration: 0.9, ease: 'power3.inOut' },
            0.3
          );
        }
      });

      // Mobile: unpinned entrance — no extra scroll lock
      mm.add('(max-width: 767px)', () => {
        gsap.set([glow, textRow1, textRow2, card].filter(Boolean), {
          clearProps: 'transform,opacity,width,scale',
        });

        if (glow) gsap.set(glow, { scale: 1, opacity: 0.65 });
        if (card) gsap.set(card, { width: '100px', opacity: 1, scale: 1 });

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
    return <section className="w-full h-[100svh] lg:h-screen bg-black" />;
  }

  return (
    <div ref={wrapperRef} className="w-full overflow-hidden">
      <section
        ref={sectionRef}
        className="relative w-full h-[100svh] min-h-[420px] md:h-screen bg-black text-white flex items-center justify-center select-none"
      >
        <div
          ref={glowRef}
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.18)_0%,rgba(0,0,0,1)_70%)] pointer-events-none will-change-transform"
        />

        <div className="relative z-[2] max-w-[1200px] mx-auto px-[15px] w-full text-center">
          <div className="flex flex-col items-center justify-center text-center">
            {/* Row 1: MY BEST */}
            <div className="text-row-1 font-raleway text-[clamp(2.25rem,11vw,3.8rem)] md:text-[12vw] xl:text-[9.5rem] font-extrabold tracking-tighter uppercase leading-[0.95] will-change-transform text-white">
              MY BEST
            </div>

            {/* Row 2: WOR [CARD] KS */}
            <div className="text-row-2 flex items-center justify-center gap-[4px] sm:gap-[8px] md:gap-[16px] mt-[8px] sm:mt-[12px] font-raleway text-[clamp(2.25rem,11vw,3.8rem)] md:text-[12vw] xl:text-[9.5rem] font-extrabold tracking-tighter uppercase leading-[0.95] will-change-transform text-white">
              <span>WOR</span>

              {/* Embedded Work Preview Card */}
              <Link
                ref={cardRef}
                href="#portfolio-section"
                className="relative w-[100px] md:w-[260px] h-[45px] sm:h-[70px] md:h-[10vw] xl:h-[135px] rounded-[10px] sm:rounded-[14px] md:rounded-[2vw] xl:rounded-[26px] overflow-hidden inline-flex items-center justify-center border-2 border-[rgba(255,255,255,0.15)] shadow-[0_15px_35px_rgba(99,102,241,0.15)] mx-[2px] sm:mx-[4px] align-middle transition-all duration-400 hover:border-white hover:shadow-[0_25px_50px_rgba(99,102,241,0.3)] group will-change-[width,transform,opacity]"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                aria-label="View Best Works"
              >
                <img
                  src="/images/work_1_full.jpg"
                  alt="Featured work preview"
                  className={`w-full h-full object-cover transition-transform duration-[600ms] ease-out ${
                    hovered ? 'scale-110' : 'scale-100'
                  }`}
                />

                <div className="absolute inset-0 flex items-center justify-center bg-black/40 transition-colors duration-300 group-hover:bg-indigo-600/10">
                  <div className="w-[28px] h-[28px] sm:w-[44px] sm:h-[44px] rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-all duration-300 group-hover:scale-110 group-hover:bg-white group-hover:border-white">
                    <span className="w-0 h-0 border-t-[5px] sm:border-t-[7px] border-t-transparent border-b-[5px] sm:border-b-[7px] border-b-transparent border-l-[8px] sm:border-l-[12px] border-l-white ml-[2px] sm:ml-[3px] transition-colors duration-300 group-hover:border-l-black" />
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
