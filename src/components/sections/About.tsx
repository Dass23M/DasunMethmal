"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const GALLERY_IMAGES = [
  {
    src: "/images/developer-1.png",
    alt: "Mobile App Architecture",
    title: "01 / APP ARCHITECTURE",
  },
  {
    src: "/images/developer-3.png",
    alt: "Fullstack Platform",
    title: "02 / FULLSTACK PLATFORM",
  },
  {
    src: "/images/developer-7.png",
    alt: "UI/UX & Brand Identity",
    title: "03 / UI/UX & BRANDING",
  },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const footerCtaRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [emailText, setEmailText] = useState("methmal.liyanage23@gmail.com");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("methmal.liyanage23@gmail.com");
    setEmailText("email copied to clipboard!");
    setCopied(true);
    setTimeout(() => {
      setEmailText("methmal.liyanage23@gmail.com");
      setCopied(false);
    }, 2400);
  };

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    let ctx: { revert: () => void } | null = null;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // 1. Luxury Apple-Style Hero Portrait Reveal on Scroll Down
      if (heroImageRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          {
            scale: isMobile ? 0.92 : 0.85,
            y: isMobile ? 40 : 0,
            opacity: 0,
            clipPath: isMobile ? "inset(8% 0% 8% 0%)" : "inset(0% 0% 0% 0%)",
            filter: isMobile ? "none" : "blur(8px)",
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            clipPath: "inset(0% 0% 0% 0%)",
            filter: "none",
            duration: isMobile ? 1.1 : 1.4,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heroImageRef.current,
              start: isMobile ? "top 88%" : "top 80%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // 2. Editorial About Text Staggered Slide Up
      if (aboutTextRef.current) {
        gsap.fromTo(
          aboutTextRef.current,
          { y: isMobile ? 45 : 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: isMobile ? 1.1 : 1.0,
            ease: "power3.out",
            scrollTrigger: {
              trigger: aboutTextRef.current,
              start: isMobile ? "top 90%" : "top 85%",
              toggleActions: "play none none reverse",
            },
          },
        );
      }

      // 3. Vertical Clip-Path Reveal for Gallery Items
      if (galleryRef.current) {
        const galleryItems =
          galleryRef.current.querySelectorAll(".gallery-item-img");
        galleryItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            { clipPath: "inset(100% 0 0 0)" },
            {
              clipPath: "inset(0% 0 0 0)",
              duration: 1.0,
              delay: index * 0.08,
              ease: "power3.inOut",
              scrollTrigger: {
                trigger: item.parentElement,
                start: "top 85%",
              },
            },
          );
        });

        // Gallery Caption Reveal
        const caption = galleryRef.current.querySelector(".gallery-caption");
        if (caption) {
          gsap.fromTo(
            caption,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: "power3.out",
              scrollTrigger: {
                trigger: caption,
                start: "top 85%",
              },
            },
          );
        }
      }

      // 4. Footer CTA & Display Wave Reveal
      if (footerCtaRef.current) {
        gsap.fromTo(
          footerCtaRef.current,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: {
              trigger: footerCtaRef.current,
              start: "top 85%",
            },
          },
        );

        const svgPaths =
          containerRef.current?.querySelectorAll(".footer-svg-path");
        if (svgPaths && svgPaths.length > 0) {
          svgPaths.forEach((path, index) => {
            gsap.fromTo(
              path,
              { opacity: 0, y: 35 },
              {
                opacity: 1,
                y: 0,
                duration: 0.9,
                delay: index * 0.06,
                ease: "power3.out",
                scrollTrigger: {
                  trigger: path.parentElement,
                  start: "top 90%",
                },
              },
            );
          });
        }
      }
    }, containerRef);
  });

  return () => ctx?.revert();
}, [mounted]);

  if (!mounted) {
    return <section className="w-full h-screen bg-[#000000]" />;
  }

  return (
    <section
      id="about-section"
      ref={containerRef}
      className="w-full bg-[#080808] text-white select-none relative overflow-hidden py-16 sm:py-24 font-inter"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* ─── 1. TOP EDITORIAL SVG TITLE BANNER ─── */}
        <div className="w-full mb-10 sm:mb-14 pb-6">
          <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-[#FF6B00] uppercase tracking-widest mb-3">
            <span>{"// ABOUT METHMAL"}</span>
            <span>EST. 2023</span>
          </div>

          <div className="relative w-full overflow-hidden">
            <h2 className="font-sora font-bold text-3xl sm:text-6xl md:text-7xl lg:text-[6.2rem] uppercase tracking-tight text-white leading-none">
              METHMAL<span className="text-[#FF6B00]">.</span>
            </h2>
          </div>
        </div>

        {/* ─── 2. HERO ROW SPLIT: PORTRAIT LEFT / ABOUT TEXT RIGHT ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-end mb-14 sm:mb-20">
          {/* Left Column (5 Cols): Grayscale Portrait Image */}
          <div className="lg:col-span-5">
            <div
              ref={heroImageRef}
              className="relative w-full max-w-sm lg:max-w-none mx-auto aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#14151C] group"
            >
              <Image
                src="/images/methmal2.png"
                alt="Methmal Portrait"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-mono text-xs">
                <span>METHMAL®</span>
                <span className="text-[#FF6B00]">
                  FULLSTACK &amp; MARKETING
                </span>
              </div>
            </div>
          </div>

          {/* Spacer Column (3 Cols) */}
          <div className="hidden lg:block lg:col-span-2" />

          {/* Right Column (5 Cols): Editorial Journey Text */}
          <div className="lg:col-span-5">
            <div ref={aboutTextRef} className="space-y-4">
              <span className="font-mono text-xs font-bold text-[#FF6B00] tracking-widest uppercase block">
                001 / PHILOSOPHY &amp; JOURNEY
              </span>
              <p className="font-inter text-sm sm:text-base md:text-lg text-white/85 leading-relaxed font-normal">
                I am a fullstack software engineer and digital marketer
                exploring the intersection of modern web architecture and
                creative growth strategy. Building digital solutions as a craft,
                my work embodies the transformation of complex ideas into
                seamless, production-grade applications.
              </p>
              <p className="font-inter text-sm sm:text-base md:text-lg text-white/70 leading-relaxed font-normal">
                Through deliberate practice and technical precision, I find that
                clean code provides structure in times of uncertainty and offers
                rare clarity when scaling user experiences. Each platform
                becomes both a foundation and a window into growth.
              </p>
            </div>
          </div>
        </div>


        {/* ─── 4. FOOTER SECTION WITH GIANT STAGGERED DISPLAY & CONTACT CTA ─── */}
        <div className="footer pt-16 flex flex-col items-center justify-between text-center relative">
          {/* Interactive Contact Button & Email Copy */}
          <div
            ref={footerCtaRef}
            className="footer-cta flex flex-col items-center gap-3 mb-16 z-10"
          >
            <button
              onClick={handleCopyEmail}
              className="px-8 py-3.5 rounded-full bg-[#FF6B00] text-black font-sora font-extrabold text-xs tracking-wider uppercase shadow-xl hover:bg-white transition-all duration-300 hover:scale-105"
            >
              + GET IN TOUCH
            </button>

            <div
              onClick={handleCopyEmail}
              className="font-mono text-sm sm:text-base text-white/90 cursor-pointer hover:text-[#FF6B00] transition-colors flex items-center gap-1"
            >
              <span className="text-[#FF6B00]">[</span>
              <span>{emailText}</span>
              <span className="text-[#FF6B00]">]</span>
            </div>
            {copied && (
              <span className="text-emerald-400 font-mono text-xs animate-pulse">
                COPIED!
              </span>
            )}
          </div>

          {/* Giant Bottom Display Text Wave */}
          <div className="w-full overflow-hidden">
            <div className="flex items-center justify-center gap-4 sm:gap-8 font-sora font-black text-4xl sm:text-7xl md:text-8xl lg:text-[7rem] text-white/20 uppercase tracking-tighter">
              <span className="footer-svg-path">CRAFT</span>
              <span className="footer-svg-path text-[#FF6B00]">•</span>
              <span className="footer-svg-path">VISION</span>
              <span className="footer-svg-path text-[#FF6B00]">•</span>
              <span className="footer-svg-path">IMPACT</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
