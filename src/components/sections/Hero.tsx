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
      {/* Precise mobile face positioning */}
      <style>{`
        @media (max-width: 639px) {
          #home-section .hero-bg-img {
            object-position: 60% 15% !important;
            transform: scale(1.25) !important;
            transform-origin: 60% 15% !important;
          }
        }
      `}</style>

      <Image
        src="/images/cover_bg_2.png"
        alt="Hero Background"
        fill
        priority
        unoptimized
        quality={100}
        sizes="100vw"
        className="hero-bg-img object-cover sm:object-center sm:scale-100 pointer-events-none select-none z-0"
      />
      <div
        ref={heroContentRef}
        className="relative z-[9] max-w-[1240px] mx-auto px-4 h-[100svh] min-h-0 lg:h-screen lg:min-h-[650px] flex items-end justify-center pb-24 sm:pb-28 lg:pb-32 will-change-transform"
      >
        <div className="text-center max-w-[1050px] w-full px-2">
          {/* Title: DASUN METHMAL */}
          <h1 className="hero-title-meth font-sora text-[3rem] xs:text-[3.8rem] sm:text-[5.5rem] lg:text-[7rem] xl:text-[7.8rem] font-extrabold text-white mb-4 sm:mb-5 tracking-tight leading-[0.95] drop-shadow-xl">
            <span className="relative inline-block overflow-hidden align-top">
              <span className="hero-title-cover absolute inset-0 bg-[#FF6B00] z-[2] -translate-x-[101%]" />
              <span className="hero-title-text inline-block opacity-100">
                DASUN METHMAL
              </span>
            </span>
          </h1>

          {/* Subtitle: A Fullstack Developer & Digital Marketer */}
          <h2 className="hero-subtitle-meth text-[16px] sm:text-[22px] lg:text-[28px] font-normal text-white/80 leading-snug sm:leading-normal max-w-[26em] mx-auto tracking-wide font-inter">
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
