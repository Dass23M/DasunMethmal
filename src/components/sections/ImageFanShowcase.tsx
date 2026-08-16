'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = [
  {
    id: 'web-dev',
    num: '01',
    header: 'Fullstack Web Development',
    category: 'WEB ENGINEERING',
    desc: 'Custom Next.js, React, Node.js, and MongoDB platforms. High-performance web applications built for speed, SEO, scalability, and seamless user experiences.',
    accent: '#FF6B00',
    image: '/images/post-1.png',
    tags: ['React.js', 'Next.js 14', 'Node.js', 'TypeScript', 'MongoDB'],
  },
  {
    id: 'poster-design',
    num: '02',
    header: 'Poster & Social Post Design',
    category: 'GRAPHIC & POST DESIGN',
    desc: 'Creative poster designs, social media post graphics, promotional banners, and visual branding assets crafted to capture attention and communicate strong brand narratives.',
    accent: '#FFA800',
    image: '/images/post-2.png',
    tags: ['Poster Design', 'Social Posts', 'Banner Design', 'Visual Branding', 'Photoshop'],
  },
  {
    id: 'digital-marketing',
    num: '03',
    header: 'Digital Growth & Marketing',
    category: 'MARKETING & SEO',
    desc: 'Data-driven growth marketing, technical SEO optimization, ad campaign architecture, and brand identity strategies engineered for maximum ROAS.',
    accent: '#FF8A00',
    image: '/images/post-3.png',
    tags: ['Technical SEO', 'Ad Campaigns', 'Conversion Rate', 'Brand Strategy'],
  },
  {
    id: 'ui-ux-motion',
    num: '04',
    header: 'UI/UX & Motion Design',
    category: 'CREATIVE DIRECTION',
    desc: 'Interactive 3D web motion graphics, GSAP animations, custom design systems, and user-centered interface design engineered for high engagement.',
    accent: '#FF6B00',
    image: '/images/post-4.png',
    tags: ['GSAP 3D', 'Design Systems', 'Interactive Motion', 'Figma'],
  },
];

export default function ImageFanShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.service-card');
        gsap.fromTo(
          cards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return <section className="w-full min-h-screen bg-[#080808]" />;
  }

  return (
    <section
      ref={sectionRef}
      id="capabilities-section"
      className="w-full bg-[#080808] text-white py-16 sm:py-24 select-none relative overflow-hidden font-inter"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between pb-6 mb-12 sm:mb-16 gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-pulse" />
              <span className="font-sora font-bold text-xs sm:text-sm tracking-widest text-[#FF6B00] uppercase">
                {"// CORE CAPABILITIES & SERVICES"}
              </span>
            </div>
            <h2 className="font-sora text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight uppercase leading-none">
              EXPERTISE &amp; CRAFT<span className="text-[#FF6B00]">.</span>
            </h2>
          </div>

          <p className="font-inter text-sm sm:text-base text-white/70 max-w-md leading-relaxed font-normal">
            Delivering end-to-end digital solutions combining engineering precision, visual storytelling, and growth marketing.
          </p>
        </div>

        {/* ─── BALANCED HORIZONTAL GRID SHOWCASE ─── */}
        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8"
        >
          {SERVICES.map((item) => (
            <div
              key={item.id}
              className="service-card group bg-[#12131A]/90 border border-white/12 rounded-2xl p-6 flex flex-col justify-between backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all duration-500 hover:border-[#FF6B00]/50 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(255,107,0,0.12)]"
            >
              {/* Top Ambient Glow */}
              <div
                className="absolute -top-16 -right-16 w-32 h-32 rounded-full blur-3xl opacity-15 transition-opacity duration-500 group-hover:opacity-35 pointer-events-none"
                style={{ backgroundColor: item.accent }}
              />

              {/* Card Header & Badge */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[11px] font-bold text-[#FF6B00] tracking-widest uppercase">
                    {item.num} / {item.category}
                  </span>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.accent }} />
                </div>

                <h3 className="font-sora text-xl sm:text-2xl font-bold text-white leading-snug tracking-tight mb-3 transition-colors duration-300 group-hover:text-[#FF6B00]">
                  {item.header}
                </h3>

                <p className="text-white/75 font-normal text-xs sm:text-sm leading-relaxed mb-4">
                  {item.desc}
                </p>
              </div>

              {/* Center Image Container — Balanced & Always Visible */}
              <div className="relative w-full h-[200px] sm:h-[220px] my-4 rounded-xl overflow-hidden bg-black/40 border border-white/5 flex items-center justify-center p-2">
                <Image
                  src={item.image}
                  alt={item.header}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-105 filter drop-shadow-[0_12px_24px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Card Footer: Tags & Action CTA */}
              <div className="mt-2">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href="#contact-section"
                  style={{ backgroundColor: item.accent }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-black font-sora font-extrabold text-xs tracking-wider uppercase shadow-lg transition-all duration-300 hover:brightness-110 hover:shadow-[0_8px_20px_rgba(255,107,0,0.3)]"
                >
                  <span>WORK WITH ME ↗</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
