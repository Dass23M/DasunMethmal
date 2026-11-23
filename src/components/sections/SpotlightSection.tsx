'use client';

import { useState } from 'react';
import Image from 'next/image';

const SPOTLIGHT_ITEMS = [
  {
    id: 1,
    title: 'DASUN METHMAL',
    role: 'Creative Engineer & Fullstack Developer',
    image: '/images/methmal1.png',
  },
  {
    id: 2,
    title: 'SYSTEM ARCHITECTURE',
    role: 'Next.js · Node.js · PostgreSQL · Cloud',
    image: '/images/developer-1.png',
  },
  {
    id: 3,
    title: 'PRODUCT & UI CRAFT',
    role: 'Editorial Design Systems & Motion',
    image: '/images/methmal2.png',
  },
  {
    id: 4,
    title: 'BRAND & POSTER ART',
    role: 'Campaign Visuals & Art Direction',
    image: '/images/poster-5.png',
  },
  {
    id: 5,
    title: 'AI & ML ENGINEERING',
    role: 'Predictive Models & Intelligent UX',
    image: '/images/robot_hero.png',
  },
];

export default function SpotlightSection() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = SPOTLIGHT_ITEMS[activeIdx];

  return (
    <section
      aria-label="Creative vision spotlight"
      className="relative w-full bg-[#080808] text-white py-20 sm:py-28 overflow-hidden border-t border-dashed border-white/[0.12] select-none"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative">
        {/* Top Architectural Frame & Neon-Green Geometric Cutout Block (Image 7) */}
        <div className="relative border border-white/[0.1] p-6 sm:p-10 lg:p-14 overflow-hidden bg-[#0C0C0C]">
          {/* Acid-Green Top-Right Cutout Accent */}
          <div
            aria-hidden="true"
            className="pointer-events-none hidden md:block absolute top-0 right-0 w-72 lg:w-96 h-44 bg-[#9CFF00] halftone-dots"
          >
            <div className="absolute top-12 right-10 w-16 h-16 bg-[#0C0C0C]" />
            <div className="absolute bottom-0 right-0 w-10 h-10 bg-[#0C0C0C]" />
          </div>

          {/* Top-Left Stacked Light-Gray Tags */}
          <div className="relative z-10 flex flex-col items-start gap-1.5 mb-8 lg:mb-4">
            <span className="inline-block bg-[#E5E5E5] text-black font-mono text-[10px] font-semibold tracking-[0.16em] uppercase px-2.5 py-1">
              LEADING EVERY
            </span>
            <span className="inline-block bg-[#E5E5E5] text-black font-mono text-[10px] font-semibold tracking-[0.16em] uppercase px-2.5 py-1">
              CREATIVE VISION
            </span>
          </div>

          {/* Center Large Portrait / Feature Frame */}
          <div className="relative z-10 flex flex-col items-center text-center mt-2">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] bg-[#161616] border border-white/15 overflow-hidden shadow-2xl">
              <Image
                src={current.image}
                alt={current.title}
                fill
                sizes="(max-width: 640px) 90vw, 380px"
                className="object-cover object-top transition-all duration-500"
              />
            </div>

            <div className="mt-6">
              <h3 className="font-display font-medium text-xl sm:text-2xl tracking-[0.04em] uppercase text-white">
                {current.title}
              </h3>
              <p className="font-body text-sm text-zinc-400 mt-1">
                {current.role}
              </p>
            </div>

            {/* 5-Thumbnail Selector Strip (Image 7) */}
            <div className="mt-10 grid grid-cols-5 gap-3 sm:gap-5 w-full max-w-2xl">
              {SPOTLIGHT_ITEMS.map((item, idx) => {
                const isActive = idx === activeIdx;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveIdx(idx)}
                    aria-label={`View ${item.title}`}
                    className={`relative aspect-square overflow-hidden border transition-all duration-300 cursor-pointer ${
                      isActive
                        ? 'border-[#9CFF00] scale-105'
                        : 'border-white/15 opacity-55 hover:opacity-90'
                    }`}
                  >
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="120px"
                      className={`object-cover object-top ${isActive ? '' : 'grayscale'}`}
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
