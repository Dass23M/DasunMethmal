'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import MouseScroll from '@/components/ui/MouseScroll';

interface HeroProps {
  title?: string;
  subtitle?: string;
}

/**
 * Hero Section — GSAP Powered Reveal
 * Clean, Ultra-Premium Full-Screen Parallax Hero Section.
 */
export default function Hero({
  title = 'METH',
  subtitle = 'A Fullstack Developer & Digital Marketer',
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.inOut' } });

      // Title cover wipe + reveal
      tl.fromTo(
        '.hero-title-cover',
        { x: '-101%' },
        { x: '101%', duration: 1.1 },
        0.2
      ).to(
        '.hero-title-text',
        { opacity: 1, duration: 0.01 },
        0.75
      );

      // Subtitle cover wipe + reveal
      tl.fromTo(
        '.hero-sub-cover',
        { x: '-101%' },
        { x: '101%', duration: 1.1 },
        0.5
      ).to(
        '.hero-sub-text',
        { opacity: 1, duration: 0.01 },
        1.05
      );
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section
      id="home-section"
      ref={containerRef}
      className="cover-v1 bg-cover bg-[65%_center] md:bg-center bg-no-repeat w-full lg:bg-fixed"
      style={{
        backgroundImage: "url('/images/cover_bg_2.png')",
      }}
    >
      <div className="relative z-[9] max-w-[1140px] mx-auto px-[15px] h-[100svh] min-h-0 lg:h-screen lg:min-h-[650px] flex items-center justify-center">
        <div className="text-center max-w-[850px] w-full px-1">
          {/* Title: METH */}
          <h1 className="hero-title-meth font-raleway text-[2.5rem] xs:text-[3rem] sm:text-[4rem] lg:text-[5.5rem] font-black text-white mb-[16px] sm:mb-[20px] tracking-tight leading-[1.1]">
            <span className="relative inline-block overflow-hidden align-top">
              <span className="hero-title-cover absolute inset-0 bg-[#FF6B00] z-[2] -translate-x-[101%]" />
              <span className="hero-title-text inline-block opacity-0">
                {title}
              </span>
            </span>
          </h1>

          {/* Subtitle: A Fullstack Developer & Digital Marketer */}
          <h2 className="hero-subtitle-meth text-[16px] sm:text-[24px] lg:text-[33px] font-light text-white leading-snug sm:leading-normal max-w-[22em] mx-auto">
            <span className="relative inline-block overflow-hidden align-top">
              <span className="hero-sub-cover absolute inset-0 bg-[#FF6B00] z-[2] -translate-x-[101%]" />
              <span className="hero-sub-text inline-block opacity-0">
                {subtitle}
              </span>
            </span>
          </h2>
        </div>
      </div>

      <MouseScroll targetId="portfolio-section" />
    </section>
  );
}
