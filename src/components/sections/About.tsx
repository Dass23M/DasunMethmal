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
      className="w-full bg-[#000000] text-white select-none relative overflow-hidden py-16 sm:py-24 border-y border-white/10 font-inter"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* ─── 1. TOP EDITORIAL SVG TITLE BANNER ─── */}
        <div className="w-full mb-12 sm:mb-16 border-b border-white/10 pb-6">
          <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-[#FF6B00] uppercase tracking-widest mb-4">
            <span>{"// ABOUT METHMAL"}</span>
            <span>EST. 2024</span>
          </div>

          <div className="relative w-full overflow-hidden">
            <h2 className="font-sora font-black text-4xl sm:text-7xl md:text-8xl lg:text-[7.5rem] uppercase tracking-tight text-white leading-none">
              METHMAL<span className="text-[#FF6B00]">.</span>
            </h2>
          </div>
        </div>

        {/* ─── 2. HERO ROW SPLIT: PORTRAIT LEFT / ABOUT TEXT RIGHT ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-end mb-24 sm:mb-32">
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

        {/* ─── 3. GALLERY MOSAIC SECTION: ENGINEERING DISCIPLINE & CRAFT ─── */}
        <div ref={galleryRef} className="mb-24 sm:mb-36">
          <div className="w-full mb-8 sm:mb-10 border-b border-white/10 pb-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-[#FF6B00] animate-pulse shrink-0" />
                <h2 className="font-sora font-bold text-xs sm:text-sm text-white tracking-widest uppercase">
                  ENGINEERING DISCIPLINE &amp; VISUAL CRAFT
                </h2>
              </div>
              <span className="font-mono text-xs font-semibold text-[#FF6B00] tracking-widest uppercase">
                002 / CAPABILITIES &amp; ARCHITECTURE
              </span>
            </div>
          </div>

          {/* Horizontal Gallery Wrapper - 3 Images Small & Centered on Mobile */}
          <div className="grid grid-cols-3 gap-2 sm:gap-6 w-full max-w-[340px] sm:max-w-3xl mx-auto mb-8 sm:mb-10 justify-center items-center">
            {GALLERY_IMAGES.map((item, idx) => (
              <div
                key={idx}
                className="relative aspect-[3/4] rounded-lg sm:rounded-xl overflow-hidden border border-white/15 bg-[#14151C] group"
              >
                <div className="gallery-item-img relative w-full h-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 33vw, 20vw"
                    className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-1.5 sm:p-2.5 bg-gradient-to-t from-black/90 to-transparent opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-mono text-[8px] sm:text-[10px] text-[#FF6B00] block truncate text-center sm:text-left">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Gallery Caption Text */}
          <div className="gallery-caption max-w-4xl mx-auto text-center pt-6">
            <p className="font-inter text-xs sm:text-sm md:text-base text-white/80 leading-relaxed max-w-3xl mx-auto">
              When software architecture becomes a labyrinth of choices,
              methodical engineering offers a thread to follow. Through
              continuous practice refining Next.js APIs, component composition,
              and SEO strategies we create rhythm where there was noise. This
              discipline transforms complex challenges into intuitive
              experiences you can launch, measure, and scale.
            </p>
          </div>
        </div>

        {/* ─── 4. FOOTER SECTION WITH GIANT STAGGERED DISPLAY & CONTACT CTA ─── */}
        <div className="footer pt-16 border-t border-white/10 flex flex-col items-center justify-between text-center relative">
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
