'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GALLERY_IMAGES = [
  { src: '/images/fashion1.png', alt: 'Mobile App Architecture', title: '01 / APP ARCHITECTURE' },
  { src: '/images/fashion2.webp', alt: 'Fullstack Platform', title: '02 / FULLSTACK PLATFORM' },
  { src: '/images/fashion3.jpg', alt: 'Brand Identity', title: '03 / BRAND IDENTITY' },
  { src: '/images/fashion4.jpg', alt: 'Growth Marketing', title: '04 / GROWTH CAMPAIGN' },
  { src: '/images/editorial_2.png', alt: 'UI/UX Design', title: '05 / UI/UX DESIGN' },
];

export default function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroImageRef = useRef<HTMLDivElement>(null);
  const aboutTextRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const footerCtaRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const [emailText, setEmailText] = useState('mail@uxoradesign.com');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText('mail@uxoradesign.com');
    setEmailText('email copied to clipboard!');
    setCopied(true);
    setTimeout(() => {
      setEmailText('mail@uxoradesign.com');
      setCopied(false);
    }, 2400);
  };

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const isMobile = window.innerWidth < 768;

      // 1. Hero Image Scale & Reveal (No CSS blur on mobile for 60fps)
      if (heroImageRef.current) {
        gsap.fromTo(
          heroImageRef.current,
          { scale: isMobile ? 0.95 : 0.85, opacity: 0, filter: isMobile ? 'none' : 'blur(8px)' },
          {
            scale: 1,
            opacity: 1,
            filter: 'none',
            duration: isMobile ? 0.8 : 1.4,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 80%',
            },
          }
        );
      }

      // 2. Editorial About Text Slide Up
      if (aboutTextRef.current) {
        gsap.fromTo(
          aboutTextRef.current,
          { y: 35, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: aboutTextRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      // 3. Vertical Clip-Path Reveal for Gallery Items
      if (galleryRef.current) {
        const galleryItems = galleryRef.current.querySelectorAll('.gallery-item-img');
        galleryItems.forEach((item, index) => {
          gsap.fromTo(
            item,
            { clipPath: 'inset(100% 0 0 0)' },
            {
              clipPath: 'inset(0% 0 0 0)',
              duration: 1.0,
              delay: index * 0.08,
              ease: 'power3.inOut',
              scrollTrigger: {
                trigger: item.parentElement,
                start: 'top 85%',
              },
            }
          );
        });

        // Gallery Caption Reveal
        const caption = galleryRef.current.querySelector('.gallery-caption');
        if (caption) {
          gsap.fromTo(
            caption,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: caption,
                start: 'top 85%',
              },
            }
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
            ease: 'power3.out',
            scrollTrigger: {
              trigger: footerCtaRef.current,
              start: 'top 85%',
            },
          }
        );

        const svgPaths = containerRef.current?.querySelectorAll('.footer-svg-path');
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
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: path.parentElement,
                  start: 'top 90%',
                },
              }
            );
          });
        }
      }
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return <section className="w-full h-screen bg-[#0A0B0E]" />;
  }

  return (
    <section
      id="about-section"
      ref={containerRef}
      className="w-full bg-[#0A0B0E] text-white select-none relative overflow-hidden py-16 sm:py-24 border-y border-white/10 font-inter"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        
        {/* ─── 1. TOP EDITORIAL SVG TITLE BANNER ─── */}
        <div className="w-full mb-12 sm:mb-16 border-b border-white/10 pb-6">
          <div className="flex items-center justify-between text-xs sm:text-sm font-mono text-[#FF6B00] uppercase tracking-widest mb-4">
            <span>{"// ABOUT METHMAL"}</span>
            <span>EST. 2024</span>
          </div>

          <div className="relative w-full overflow-hidden">
            <h1 className="font-sora font-black text-4xl sm:text-7xl md:text-8xl lg:text-[7.5rem] uppercase tracking-tight text-white leading-none">
              ARTISTRY<span className="text-[#FF6B00]">.</span>
            </h1>
          </div>
        </div>

        {/* ─── 2. HERO ROW SPLIT: PORTRAIT LEFT / ABOUT TEXT RIGHT ─── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 items-end mb-24 sm:mb-32">
          {/* Left Column (5 Cols): Grayscale Portrait Image */}
          <div className="lg:col-span-5">
            <div
              ref={heroImageRef}
              className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden border border-white/15 shadow-2xl bg-[#14151C] group"
            >
              <Image
                src="/images/about_me_pic.jpg"
                alt="Methmal Portrait"
                fill
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-mono text-xs">
                <span>METHMAL®</span>
                <span className="text-[#FF6B00]">FULLSTACK &amp; MARKETING</span>
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
                I am a fullstack software engineer and digital marketer exploring the intersection of modern web architecture and creative growth strategy. Building digital solutions as a craft, my work embodies the transformation of complex ideas into seamless, production-grade applications.
              </p>
              <p className="font-inter text-sm sm:text-base md:text-lg text-white/70 leading-relaxed font-normal">
                Through deliberate practice and technical precision, I find that clean code provides structure in times of uncertainty and offers rare clarity when scaling user experiences. Each platform becomes both a foundation and a window into growth.
              </p>
            </div>
          </div>
        </div>

        {/* ─── 3. GALLERY MOSAIC SECTION WITH VERTICAL CLIP-PATH REVEAL ─── */}
        <div ref={galleryRef} className="mb-24 sm:mb-36">
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
            <span className="font-sora font-bold text-xs sm:text-sm text-white tracking-widest uppercase">
              SELECTED WORKS &amp; CRAFT MOSAIC
            </span>
            <span className="font-mono text-xs text-[#FF6B00]">02 / SHOWCASE</span>
          </div>

          {/* Horizontal Gallery Wrapper */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 mb-10">
            {GALLERY_IMAGES.map((item, idx) => (
              <div
                key={idx}
                className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/15 bg-[#14151C] group"
              >
                <div className="gallery-item-img relative w-full h-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 50vw, 20vw"
                    className="object-cover grayscale transition-all duration-500 group-hover:grayscale-0 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="font-mono text-[10px] text-[#FF6B00] block truncate">
                    {item.title}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Gallery Caption Text */}
          <div className="gallery-caption max-w-4xl mx-auto text-center pt-6">
            <p className="font-inter text-xs sm:text-sm md:text-base text-white/80 leading-relaxed max-w-3xl mx-auto">
              When software architecture becomes a labyrinth of choices, methodical engineering offers a thread to follow. Through continuous practice—refining Next.js APIs, component composition, and SEO strategies—we create rhythm where there was noise. This discipline transforms complex challenges into intuitive experiences you can launch, measure, and scale.
            </p>
          </div>
        </div>

        {/* ─── 4. FOOTER SECTION WITH GIANT STAGGERED DISPLAY & CONTACT CTA ─── */}
        <div className="footer pt-16 border-t border-white/10 flex flex-col items-center justify-between text-center relative">
          
          {/* Interactive Contact Button & Email Copy */}
          <div ref={footerCtaRef} className="footer-cta flex flex-col items-center gap-3 mb-16 z-10">
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
            {copied && <span className="text-emerald-400 font-mono text-xs animate-pulse">COPIED!</span>}
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
