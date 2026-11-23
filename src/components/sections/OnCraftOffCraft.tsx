'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function OnCraftOffCraft() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftItemRef = useRef<HTMLDivElement>(null);
  const rightItemRef = useRef<HTMLDivElement>(null);
  const centerContentRef = useRef<HTMLDivElement>(null);
  const brushOverlayRef = useRef<SVGSVGElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ScrollTrigger reveal for left helmet/gear asset
      if (leftItemRef.current) {
        gsap.fromTo(
          leftItemRef.current,
          { x: -80, opacity: 0, rotate: -8 },
          {
            x: 0,
            opacity: 1,
            rotate: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // ScrollTrigger reveal for right headshot portrait
      if (rightItemRef.current) {
        gsap.fromTo(
          rightItemRef.current,
          { x: 80, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        );
      }

      // Center cards reveal
      if (centerContentRef.current) {
        gsap.fromTo(
          centerContentRef.current.children,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      }

      // Brush path animation
      if (brushOverlayRef.current) {
        const path = brushOverlayRef.current.querySelector('path');
        if (path) {
          const length = path.getTotalLength();
          gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.6,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 65%',
            },
          });
        }
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return <section className="w-full h-[600px] bg-white" />;
  }

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-[680px] lg:min-h-[760px] bg-white text-zinc-950 overflow-hidden select-none py-24 lg:py-32 flex items-center justify-center border-y border-zinc-200/80"
    >
      {/* ─── 1. SUBTLE TOPOGRAPHIC CONTOUR LINES SVG BACKGROUND ─── */}
      <div className="absolute inset-0 pointer-events-none opacity-25">
        <svg
          className="w-full h-full object-cover"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 900"
          preserveAspectRatio="none"
        >
          <path
            d="M-100,120 Q300,20 700,180 T1500,80"
            fill="none"
            stroke="rgba(0,0,0,0.08)"
            strokeWidth="1.2"
            strokeDasharray="6 6"
          />
          <path
            d="M-100,320 Q250,480 800,280 T1600,420"
            fill="none"
            stroke="rgba(255,107,0,0.28)"
            strokeWidth="1.5"
          />
          <path
            d="M-100,520 Q450,380 900,600 T1600,550"
            fill="none"
            stroke="rgba(0,0,0,0.06)"
            strokeWidth="1"
          />
          <path
            d="M-100,720 Q200,850 750,680 T1600,780"
            fill="none"
            stroke="rgba(255,107,0,0.22)"
            strokeWidth="1.2"
            strokeDasharray="8 6"
          />
          <circle cx="720" cy="450" r="320" fill="none" stroke="rgba(0,0,0,0.05)" strokeWidth="0.8" />
          <circle cx="720" cy="450" r="480" fill="none" stroke="rgba(255,107,0,0.12)" strokeWidth="0.8" />
        </svg>
      </div>

      {/* ─── 2. MAIN CONTAINER ─── */}
      <div className="relative z-10 w-full max-w-[1480px] mx-auto px-4 sm:px-8 lg:px-12 flex flex-col lg:flex-row items-center justify-between gap-10">

        {/* ─── LEFT ASSET: TECH GEAR ASSET ON LEFT EDGE ─── */}
        <div
          ref={leftItemRef}
          className="hidden lg:flex shrink-0 w-[240px] xl:w-[280px] h-[360px] relative items-center justify-start pointer-events-none"
        >
          <div className="relative w-full h-full">
            <Image
              src="/images/orange1.png"
              alt="Tech Gear Asset"
              fill
              sizes="280px"
              className="object-contain object-right-bottom filter drop-shadow-[0_15px_30px_rgba(255,138,0,0.15)] contrast-105"
            />
          </div>
        </div>

        {/* ─── CENTER 2-COLUMN SPLIT: ON CRAFT / OFF CRAFT ─── */}
        <div
          ref={centerContentRef}
          className="flex-1 w-full max-w-[900px] grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16 items-start text-center md:text-left my-auto px-2"
        >
          {/* ── COLUMN 1: ON CRAFT (Web & Code Engineering) ── */}
          <div className="flex flex-col items-center md:items-start group">
            {/* Giant Stacked Title */}
            <div className="relative mb-4">
              <span className="font-display font-light text-5xl sm:text-6xl lg:text-7xl tracking-tight text-zinc-950 block leading-none">
                ON
              </span>
              <span className="font-display font-black text-5xl sm:text-6xl lg:text-7xl tracking-tighter text-zinc-950 block leading-none mt-1">
                CRAFT
              </span>

              {/* Dynamic Brush Overlay over "ON CRAFT" */}
              <svg
                ref={brushOverlayRef}
                className="absolute -top-3 -left-4 sm:-left-6 w-[120%] h-[130%] pointer-events-none"
                viewBox="0 0 260 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M15 65 Q 45 15, 110 35 T 225 25 Q 255 20, 240 70 T 130 95 Q 40 100, 25 55"
                  stroke="#FF6B00"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            {/* Description */}
            <p className="font-body text-sm sm:text-base text-zinc-600 font-normal leading-relaxed max-w-xs mb-6">
              Full-stack Next.js platforms and interactive web systems.
            </p>

            {/* Action Button */}
            <Link
              href="#portfolio-section"
              className="w-12 h-12 rounded-2xl bg-zinc-950 hover:bg-[#FF6B00] text-white flex items-center justify-center font-bold text-xl transition-all duration-200 hover:scale-105"
              aria-label="View Engineering Projects"
            >
              ⤤
            </Link>
          </div>

          {/* ── COLUMN 2: OFF CRAFT (Digital Marketing & Strategy) ── */}
          <div className="flex flex-col items-center md:items-start group">
            {/* Giant Stacked Title */}
            <div className="relative mb-4">
              <span className="font-display font-light text-5xl sm:text-6xl lg:text-7xl tracking-tight text-zinc-950 block leading-none">
                OFF
              </span>
              <span className="font-display font-black text-5xl sm:text-6xl lg:text-7xl tracking-tighter text-zinc-950 block leading-none mt-1">
                CRAFT
              </span>
            </div>

            {/* Description */}
            <p className="font-body text-sm sm:text-base text-zinc-600 font-normal leading-relaxed max-w-xs mb-6">
              SEO, performance marketing, and brand direction.
            </p>

            {/* Action Button */}
            <Link
              href="#contact-section"
              className="w-12 h-12 rounded-2xl bg-zinc-100 border border-zinc-200 text-zinc-950 flex items-center justify-center font-bold text-xl transition-all duration-200 hover:bg-[#FF6B00] hover:text-white hover:border-[#FF6B00] hover:scale-105"
              aria-label="View Marketing Campaigns"
            >
              ⤤
            </Link>
          </div>
        </div>

        {/* ─── RIGHT ASSET: TRANSPARENT PROFILE HEADSHOT ON RIGHT EDGE ─── */}
        <div
          ref={rightItemRef}
          className="hidden lg:flex shrink-0 w-[240px] xl:w-[280px] h-[360px] relative items-center justify-end overflow-visible bg-transparent pointer-events-none"
        >
          <Image
            src="/images/offcraft1.png"
            alt="Methmal Side Headshot"
            fill
            sizes="280px"
            className="object-contain object-left-bottom filter drop-shadow-[0_15px_25px_rgba(0,0,0,0.15)] contrast-105"
          />
        </div>

      </div>
    </section>
  );
}
