'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface PixelBox {
  top: string;
  left: string;
  size: string;
  peakOpacity: number;
  delay: number;
  hold: number;
  pause: number;
  desktopOnly?: boolean;
  hollow?: boolean;
}

// Curated architectural pixel-matrix boxes positioned in negative-space zones
// so they harmonize with the top/bottom cutouts without obscuring "I DO × CREATIVE"
const PIXEL_BOXES: PixelBox[] = [
  // Upper negative-space band
  { top: '12%', left: '16%', size: 'w-4 h-4 sm:w-5 sm:h-5', peakOpacity: 0.9, delay: 0.0, hold: 0.7, pause: 1.8 },
  { top: '18%', left: '24%', size: 'w-3 h-3 sm:w-3.5 sm:h-3.5', peakOpacity: 0.75, delay: 1.4, hold: 0.5, pause: 2.2, desktopOnly: true },
  { top: '9%', left: '34%', size: 'w-5 h-5 sm:w-6 sm:h-6', peakOpacity: 0.85, delay: 0.6, hold: 0.9, pause: 2.0 },
  { top: '20%', left: '43%', size: 'w-3 h-3 sm:w-4 sm:h-4', peakOpacity: 0.55, delay: 2.1, hold: 0.6, pause: 2.4, hollow: true },
  { top: '11%', left: '54%', size: 'w-4 h-4 sm:w-5 sm:h-5', peakOpacity: 0.85, delay: 1.1, hold: 0.8, pause: 1.9, desktopOnly: true },
  { top: '17%', left: '66%', size: 'w-3.5 h-3.5 sm:w-4 sm:h-4', peakOpacity: 0.8, delay: 0.3, hold: 0.65, pause: 2.3 },
  { top: '10%', left: '75%', size: 'w-5 h-5 sm:w-6 sm:h-6', peakOpacity: 0.9, delay: 1.9, hold: 0.85, pause: 1.7, desktopOnly: true },
  { top: '23%', left: '84%', size: 'w-3 h-3 sm:w-4 sm:h-4', peakOpacity: 0.75, delay: 0.8, hold: 0.6, pause: 2.1 },

  // Side flanks & subtle mid-field depth boxes
  { top: '36%', left: '4%', size: 'w-4 h-4 sm:w-5 sm:h-5', peakOpacity: 0.85, delay: 1.6, hold: 0.75, pause: 2.0 },
  { top: '54%', left: '3%', size: 'w-3 h-3 sm:w-3.5 sm:h-3.5', peakOpacity: 0.7, delay: 0.4, hold: 0.55, pause: 2.5, desktopOnly: true },
  { top: '34%', left: '30%', size: 'w-3 h-3 sm:w-4 sm:h-4', peakOpacity: 0.28, delay: 2.4, hold: 0.7, pause: 2.6, desktopOnly: true },
  { top: '62%', left: '36%', size: 'w-3.5 h-3.5 sm:w-4 sm:h-4', peakOpacity: 0.35, delay: 1.0, hold: 0.6, pause: 2.2, hollow: true },
  { top: '33%', left: '91%', size: 'w-4 h-4 sm:w-5 sm:h-5', peakOpacity: 0.85, delay: 0.5, hold: 0.8, pause: 1.9 },
  { top: '60%', left: '93%', size: 'w-3 h-3 sm:w-4 sm:h-4', peakOpacity: 0.8, delay: 2.0, hold: 0.65, pause: 2.3, desktopOnly: true },

  // Lower negative-space band
  { top: '76%', left: '12%', size: 'w-4 h-4 sm:w-5 sm:h-5', peakOpacity: 0.9, delay: 0.9, hold: 0.8, pause: 1.9 },
  { top: '83%', left: '21%', size: 'w-3 h-3 sm:w-4 sm:h-4', peakOpacity: 0.75, delay: 2.3, hold: 0.55, pause: 2.1, desktopOnly: true },
  { top: '74%', left: '44%', size: 'w-4 h-4 sm:w-5 sm:h-5', peakOpacity: 0.8, delay: 1.3, hold: 0.7, pause: 2.4 },
  { top: '84%', left: '56%', size: 'w-3.5 h-3.5 sm:w-4 sm:h-4', peakOpacity: 0.85, delay: 0.2, hold: 0.75, pause: 1.8, desktopOnly: true },
  { top: '78%', left: '68%', size: 'w-5 h-5 sm:w-6 sm:h-6', peakOpacity: 0.85, delay: 1.7, hold: 0.9, pause: 2.0 },
  { top: '72%', left: '78%', size: 'w-3 h-3 sm:w-4 sm:h-4', peakOpacity: 0.65, delay: 0.7, hold: 0.6, pause: 2.5, hollow: true },
  { top: '82%', left: '86%', size: 'w-4 h-4 sm:w-5 sm:h-5', peakOpacity: 0.9, delay: 2.5, hold: 0.7, pause: 1.8 },
];

export default function AcidBanner() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // 1. Living architectural black pixel boxes appear & disappear smoothly
      const pixelTimelines: gsap.core.Timeline[] = [];
      const boxEls = sectionRef.current?.querySelectorAll<HTMLElement>('.acid-pixel-box');

      boxEls?.forEach((el, idx) => {
        const cfg = PIXEL_BOXES[idx];
        if (!cfg) return;

        gsap.set(el, { opacity: 0, scale: 0.35 });

        const boxTl = gsap.timeline({
          repeat: -1,
          delay: cfg.delay,
          repeatDelay: cfg.pause,
        });

        boxTl
          .to(el, {
            opacity: cfg.peakOpacity,
            scale: 1,
            duration: 0.42,
            ease: 'expo.out',
          })
          .to(el, {
            opacity: cfg.peakOpacity,
            duration: cfg.hold,
            ease: 'none',
          })
          .to(el, {
            opacity: 0,
            scale: 0.4,
            duration: 0.48,
            ease: 'power3.in',
          });

        pixelTimelines.push(boxTl);
      });

      // Pause pixel matrix when scrolled outside viewport for 120fps scroll performance
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => pixelTimelines.forEach((t) => t.resume()),
        onEnterBack: () => pixelTimelines.forEach((t) => t.resume()),
        onLeave: () => pixelTimelines.forEach((t) => t.pause()),
        onLeaveBack: () => pixelTimelines.forEach((t) => t.pause()),
      });

      // 2. Desktop scroll-scrubbed horizontal typography & geometric cross/plus rotation
      mm.add('(min-width: 768px)', () => {
        gsap.fromTo(
          '.acid-word-left',
          { x: -38 },
          {
            x: 24,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.9,
            },
          }
        );

        gsap.fromTo(
          '.acid-word-right',
          { x: 38 },
          {
            x: -24,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 0.9,
            },
          }
        );

        gsap.to('.acid-cross', {
          rotate: 180,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.9,
          },
        });

        gsap.to('.acid-plus', {
          rotate: -135,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.9,
          },
        });
      });

      // 3. Top & bottom pixel cutouts + caption entrance
      gsap.fromTo(
        '.acid-cutout-top',
        { yPercent: -100 },
        {
          yPercent: 0,
          duration: 0.85,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.acid-cutout-bottom',
        { yPercent: 100 },
        {
          yPercent: 0,
          duration: 0.85,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.acid-caption',
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Creative engineering statement"
      className="relative w-full bg-[#9CFF00] text-black overflow-hidden select-none py-24 sm:py-32 lg:py-40"
    >
      {/* Subtle Halftone Texture Overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 halftone-dots opacity-45"
      />

      {/* Animated Architectural Black Pixel Boxes (Appear & Disappear Matrix) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
      >
        {PIXEL_BOXES.map((box, idx) => (
          <span
            key={idx}
            style={{ top: box.top, left: box.left }}
            className={`acid-pixel-box absolute will-change-transform ${box.size} ${
              box.hollow
                ? 'border-2 border-[#080808] bg-transparent'
                : 'bg-[#080808]'
            } ${box.desktopOnly ? 'hidden sm:block' : 'block'}`}
          />
        ))}
      </div>

      {/* Architectural Black Pixel-Step Cutouts (Top) */}
      <div
        aria-hidden="true"
        className="acid-cutout-top pointer-events-none absolute top-0 left-0 right-0 flex justify-between will-change-transform"
      >
        <div className="flex items-start">
          <div className="w-10 sm:w-14 h-12 sm:h-16 bg-[#080808] ml-6 sm:ml-14" />
          <div className="w-5 sm:w-7 h-5 sm:h-7 bg-[#080808] mt-12 sm:mt-16" />
        </div>
        <div className="flex items-start">
          <div className="w-10 sm:w-14 h-7 sm:h-9 bg-[#080808] mt-7 sm:mt-9" />
          <div className="w-24 sm:w-44 h-7 sm:h-9 bg-[#080808]" />
        </div>
      </div>

      {/* Architectural Black Pixel-Step Cutouts (Bottom) */}
      <div
        aria-hidden="true"
        className="acid-cutout-bottom pointer-events-none absolute bottom-0 left-0 right-0 flex justify-between items-end will-change-transform"
      >
        <div className="flex items-end">
          <div className="w-8 sm:w-10 h-6 sm:h-8 bg-[#080808] ml-10 sm:ml-24" />
          <div className="w-6 sm:w-8 h-6 sm:h-8 bg-[#080808] ml-20 sm:ml-36" />
          <div className="w-28 sm:w-52 h-6 sm:h-8 bg-[#080808] mb-6 sm:mb-8" />
          <div className="w-6 sm:w-8 h-6 sm:h-8 bg-[#080808] mb-12 sm:mb-16" />
        </div>
        <div className="w-32 sm:w-56 h-7 sm:h-9 bg-[#080808] mr-4 sm:mr-10" />
      </div>

      {/* Center Statement Typography */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        <div className="flex flex-wrap items-center justify-center lg:justify-between gap-4 sm:gap-10">
          <span className="acid-word-left font-display font-medium uppercase tracking-[-0.04em] leading-none text-[clamp(2.4rem,11vw,7.75rem)] will-change-transform">
            I DO
          </span>

          <span
            aria-hidden="true"
            className="acid-cross inline-block text-2xl sm:text-5xl font-light leading-none text-black/80 will-change-transform"
          >
            ×
          </span>

          <span className="acid-word-right font-display font-medium uppercase tracking-[-0.04em] leading-none text-[clamp(2.4rem,11vw,7.75rem)] will-change-transform">
            CREATIVE
          </span>

          <span
            aria-hidden="true"
            className="acid-plus hidden lg:inline-block text-4xl sm:text-5xl font-light leading-none text-black/80 will-change-transform"
          >
            +
          </span>
        </div>

        {/* Sub-caption */}
        <div className="acid-caption mt-8 sm:mt-14 text-center lg:text-left lg:pl-[46%] font-mono text-[10px] sm:text-xs tracking-[0.14em] uppercase leading-relaxed text-black/85">
          <div className="flex items-center justify-center lg:justify-start gap-2 font-semibold">
            <span className="w-2 h-2 rounded-full bg-black inline-block" />
            <span>FROM IDEA TO IMPACT</span>
          </div>
          <p className="mt-1 text-black/75">
            EVERY PROJECT STARTS WITH A CLEAR PURPOSE.
          </p>
        </div>
      </div>
    </section>
  );
}
