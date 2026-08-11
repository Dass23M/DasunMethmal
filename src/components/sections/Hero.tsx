"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import MouseScroll from "@/components/ui/MouseScroll";

interface HeroProps {
  title?: string;
  subtitle?: string;
}

/**
 * Hero Section — Apple-Style Parallax & GSAP Powered Reveal
 */
export default function Hero({
  title = "METH",
  subtitle = "A Fullstack Developer & Digital Marketer",
}: HeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    let ctx: { revert: () => void } | null = null;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          // 1. Initial Wipe & Reveal
          const tl = gsap.timeline({ defaults: { ease: "power4.inOut" } });

          tl.fromTo(
            ".hero-title-cover",
            { x: "-101%" },
            { x: "101%", duration: 1.1 },
            0.2,
          ).to(".hero-title-text", { opacity: 1, duration: 0.01 }, 0.75);

          tl.fromTo(
            ".hero-sub-cover",
            { x: "-101%" },
            { x: "101%", duration: 1.1 },
            0.5,
          ).to(".hero-sub-text", { opacity: 1, duration: 0.01 }, 1.05);

          // 2. Apple-Style Hero Parallax Scroll Effect (scale down & float up on scroll down)
          if (heroContentRef.current && containerRef.current) {
            gsap.to(heroContentRef.current, {
              y: -70,
              scale: 0.92,
              opacity: 0.2,
              ease: "none",
              scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "bottom top",
                scrub: 0.6,
              },
            });
          }
        }, containerRef);
      },
    );

    return () => ctx?.revert();
  }, [mounted]);

  return (
    <section
      id="home-section"
      ref={containerRef}
      className="cover-v1 bg-cover bg-no-repeat w-full lg:bg-fixed hero-cover-mobile relative overflow-hidden"
    >
      <Image
        src="/images/cover_bg_2.png"
        alt="Hero Background"
        fill
        priority
        sizes="100vw"
        quality={85}
        className="object-cover object-center pointer-events-none select-none z-0"
      />
      <div
        ref={heroContentRef}
        className="relative z-[9] max-w-[1140px] mx-auto px-4 h-[100svh] min-h-0 lg:h-screen lg:min-h-[650px] flex items-center justify-center will-change-transform"
      >
        <div className="text-center max-w-[850px] w-full px-2">
          {/* Title: METH with accessible search headline */}
          <h1 className="hero-title-meth font-sora text-[2.5rem] xs:text-[3rem] sm:text-[4rem] lg:text-[5.5rem] font-black text-white mb-4 sm:mb-6 tracking-tight leading-[1.1]">
            <span className="sr-only">Methmal — Fullstack Developer, AI Engineer &amp; Digital Strategist Portfolio</span>
            <span className="relative inline-block overflow-hidden align-top" aria-hidden="true">
              <span className="hero-title-cover absolute inset-0 bg-[#FF6B00] z-[2] -translate-x-[101%]" />
              <span className="hero-title-text inline-block opacity-100">
                {title}
              </span>
            </span>
          </h1>

          {/* Subtitle: A Fullstack Developer & Digital Marketer */}
          <h2 className="hero-subtitle-meth text-[16px] sm:text-[24px] lg:text-[33px] font-light text-white leading-snug sm:leading-normal max-w-[22em] mx-auto">
            <span className="relative inline-block overflow-hidden align-top">
              <span className="hero-sub-cover absolute inset-0 bg-[#FF6B00] z-[2] -translate-x-[101%]" />
              <span className="hero-sub-text inline-block opacity-100">
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
