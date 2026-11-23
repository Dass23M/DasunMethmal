'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Magnetic from '@/components/ui/Magnetic';

export interface ServiceRowItem {
  num: string;
  title: string;
  tags: [string, string];
  description: string;
  image: string;
  href: string;
  glyph: 'code' | 'ui' | 'ai' | 'growth';
}

export const EDITORIAL_SERVICES: ServiceRowItem[] = [
  {
    num: '01',
    title: 'Fullstack Web',
    tags: ['NEXT.JS', 'SYSTEMS'],
    description:
      'Architecting production-grade React, Next.js, Node.js, and database platforms engineered for speed, security, and effortless scale.',
    image: '/images/fullstack.png',
    href: '/services',
    glyph: 'code',
  },
  {
    num: '02',
    title: 'UI/UX Design',
    tags: ['DIGITAL', 'PRODUCT'],
    description:
      'Crafting crisp editorial interfaces, modular design systems, and responsive interactions that turn complex workflows into intuitive products.',
    image: '/images/uiux.png',
    href: '/services',
    glyph: 'ui',
  },
  {
    num: '03',
    title: 'AI & ML Systems',
    tags: ['APPLIED AI', 'AUTOMATION'],
    description:
      'Building machine learning microservices, explainable prediction pipelines, and intelligent web workflows powered by Python and modern APIs.',
    image: '/images/robot_hero.png',
    href: '/services',
    glyph: 'ai',
  },
  {
    num: '04',
    title: 'Digital Growth',
    tags: ['SEO', 'STRATEGY'],
    description:
      'Combining technical SEO, high-converting brand visuals, and performance campaigns to grow organic reach and measurable revenue.',
    image: '/images/digitalmarketing.png',
    href: '/services',
    glyph: 'growth',
  },
];

function ServiceGlyph({ type }: { type: ServiceRowItem['glyph'] }) {
  switch (type) {
    case 'code':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M9 8L3 14L9 20M19 8L25 14L19 20M16 5L12 23" />
        </svg>
      );
    case 'ui':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2">
          <rect x="3" y="3" width="9" height="9" />
          <rect x="16" y="3" width="9" height="9" />
          <rect x="3" y="16" width="9" height="9" />
          <circle cx="20.5" cy="20.5" r="4.5" />
        </svg>
      );
    case 'ai':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M14 2L17 11L26 14L17 17L14 26L11 17L2 14L11 11L14 2Z" />
        </svg>
      );
    case 'growth':
      return (
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M4 22L11 15L16 19L24 8M18 8H24V14" />
        </svg>
      );
  }
}

export default function ServicesEditorial() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ctx: { revert: () => void } | null = null;
    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const rows = sectionRef.current?.querySelectorAll('.svc-row');
          rows?.forEach((row) => {
            const line = row.querySelector('.svc-line');
            const copy = row.querySelectorAll('.svc-reveal');
            const art = row.querySelector('.svc-art-tile');
            const img = row.querySelector('.svc-art-img');

            if (line) {
              gsap.fromTo(
                line,
                { scaleX: 0, transformOrigin: 'left center' },
                {
                  scaleX: 1,
                  duration: 0.9,
                  ease: 'expo.out',
                  scrollTrigger: {
                    trigger: row,
                    start: 'top 86%',
                  },
                }
              );
            }

            if (copy.length > 0) {
              gsap.fromTo(
                copy,
                { opacity: 0, y: 28 },
                {
                  opacity: 1,
                  y: 0,
                  duration: 0.85,
                  stagger: 0.08,
                  ease: 'expo.out',
                  scrollTrigger: {
                    trigger: row,
                    start: 'top 84%',
                  },
                }
              );
            }

            if (art) {
              gsap.fromTo(
                art,
                { clipPath: 'inset(100% 0% 0% 0%)' },
                {
                  clipPath: 'inset(0% 0% 0% 0%)',
                  duration: 0.95,
                  ease: 'power4.inOut',
                  scrollTrigger: {
                    trigger: row,
                    start: 'top 82%',
                  },
                }
              );
            }

            if (img && window.innerWidth >= 768) {
              gsap.fromTo(
                img,
                { y: -14 },
                {
                  y: 14,
                  ease: 'none',
                  scrollTrigger: {
                    trigger: row,
                    start: 'top bottom',
                    end: 'bottom top',
                    scrub: 0.9,
                  },
                }
              );
            }
          });
        }, sectionRef);
      }
    );

    return () => ctx?.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services-section"
      className="w-full bg-[#080808] text-white py-12 sm:py-20 select-none"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        {/* Top Meta Bar */}
        <div className="flex items-center justify-between font-mono text-[11px] tracking-[0.16em] uppercase text-zinc-400 pb-6 border-b border-white/[0.1]">
          <span>01 – 04</span>
          <span className="text-white">[MY SERVICES]</span>
          <span>METHMAL ©2026</span>
        </div>

        {/* Service Rows */}
        <div>
          {EDITORIAL_SERVICES.map((service) => (
            <div
              key={service.num}
              className="svc-row relative group grid grid-cols-1 lg:grid-cols-12 gap-8 py-12 sm:py-16 items-stretch transition-colors duration-300 hover:bg-white/[0.018]"
            >
              {/* Animated Bottom Hairline */}
              <div className="svc-line absolute bottom-0 left-0 right-0 h-px bg-white/[0.1]" />

              {/* Left Column: Giant Muted Numeral + Bottom Glyph */}
              <div className="lg:col-span-3 flex lg:flex-col justify-between items-center lg:items-start lg:pr-6">
                <span className="svc-reveal font-display font-light text-6xl sm:text-7xl lg:text-[6.25rem] leading-none tracking-[-0.04em] text-white/[0.16] group-hover:text-[#9CFF00]/85 transition-colors duration-300">
                  {service.num}
                </span>

                <div className="svc-reveal text-white/75 group-hover:text-[#9CFF00] group-hover:rotate-12 transition-all duration-300 lg:self-end">
                  <ServiceGlyph type={service.glyph} />
                </div>
              </div>

              {/* Middle Column: Title + Sharp Gray Tags + Bottom Description */}
              <div className="lg:col-span-5 lg:border-l lg:border-white/[0.1] lg:pl-8 flex flex-col justify-between gap-8">
                <div className="svc-reveal">
                  <h3 className="font-display font-normal text-3xl sm:text-4xl lg:text-5xl tracking-[-0.03em] text-white leading-tight mb-4 group-hover:text-[#9CFF00] transition-colors">
                    {service.title}
                  </h3>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-block bg-[#E5E5E5] text-black font-mono text-[10px] font-semibold tracking-[0.14em] uppercase px-2.5 py-1"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <p className="svc-reveal font-body text-sm sm:text-[15px] text-zinc-400 leading-relaxed max-w-md">
                  {service.description}
                </p>
              </div>

              {/* Right Column: Acid-Green Visual Card with Shutter Reveal + Scrub Parallax */}
              <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between gap-6">
                <div className="svc-art-tile relative w-full max-w-[260px] aspect-square bg-[#9CFF00] overflow-hidden p-5 flex items-center justify-center">
                  <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 halftone-dots opacity-35"
                  />

                  <div className="svc-art-img relative w-full h-full z-10 will-change-transform">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="260px"
                      className="object-contain grayscale contrast-125 mix-blend-multiply transition-transform duration-500 ease-out group-hover:scale-110"
                    />
                  </div>

                  {/* Signature Black Corner Pixel Notch */}
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 w-9 h-9 bg-[#080808] z-20"
                  />
                </div>

                <Magnetic strength={0.2}>
                  <Link
                    href="/contact"
                    className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-white hover:text-[#9CFF00] transition-colors py-1"
                  >
                    <span>START PROJECT</span>
                    <span className="text-[#9CFF00] transition-transform duration-200 group-hover:translate-x-1">
                      &gt;
                    </span>
                  </Link>
                </Magnetic>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
