'use client';

import Link from 'next/link';

interface AboutProps {
  showMoreLink?: boolean;
}

export default function About({ showMoreLink = true }: AboutProps) {
  return (
    <section
      id="about-section"
      className="relative w-full bg-[#080808] text-white py-20 sm:py-28 lg:py-32 overflow-hidden border-t border-dashed border-white/[0.12]"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative z-10">
        {/* Top Meta Bar: Emblem + Live Availability Left / Giant ® 2026 Watermark Right */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 mb-16 sm:mb-24">
          <div className="space-y-6">
            {/* Circular Starburst Stamp */}
            <div className="w-12 h-12 border border-white/15 bg-[#121212] flex items-center justify-center">
              <div className="w-7 h-7 rounded-full bg-white text-black flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 32 32" fill="currentColor">
                  <path d="M16 0L18.2 12.2L27.3 4.7L19.8 13.8L32 16L19.8 18.2L27.3 27.3L18.2 19.8L16 32L13.8 19.8L4.7 27.3L12.2 18.2L0 16L12.2 13.8L4.7 4.7L13.8 12.2L16 0Z" />
                </svg>
              </div>
            </div>

            <div className="space-y-1.5 font-mono text-[11px] tracking-[0.14em] uppercase">
              <div className="flex items-center gap-2.5 text-white">
                <span className="w-2 h-2 rounded-full bg-[#9CFF00] shadow-[0_0_8px_#9CFF00]" />
                <span>OPEN FOR NEW PROJECTS</span>
              </div>
              <p className="text-zinc-500">
                LET&apos;S CREATE SOMETHING REMARKABLE TOGETHER.
              </p>
            </div>
          </div>

          {/* Giant ® 2026 Watermark */}
          <div
            aria-hidden="true"
            className="hidden sm:flex items-start font-display font-medium leading-none select-none text-white/[0.12] tracking-[-0.04em]"
          >
            <span className="text-4xl lg:text-6xl mr-2 mt-2">®</span>
            <span className="text-7xl lg:text-[9.5rem]">2026</span>
          </div>
        </div>

        {/* Main Editorial Statement Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Bracketed Label */}
          <div className="lg:col-span-3">
            <span className="font-mono text-xs tracking-[0.16em] uppercase text-zinc-400">
              [ABOUT ME]
            </span>
          </div>

          {/* Right Column: Oversized Editorial Paragraph with Neon Green Inline Badge */}
          <div className="lg:col-span-9">
            <h2 className="font-display font-normal text-2xl sm:text-4xl lg:text-[3.35rem] leading-[1.12] tracking-[-0.03em] text-white">
              <span className="hidden sm:inline-block w-20 lg:w-28" aria-hidden="true" />
              Dasun Methmal is a Sri Lanka-based Creative Engineer, building scalable web apps,{' '}
              <span
                aria-hidden="true"
                className="inline-flex items-center gap-2.5 bg-[#9CFF00] text-black px-3.5 py-1 align-middle text-lg sm:text-2xl lg:text-3xl font-mono font-normal mx-1"
              >
                <span>+</span>
                <span>×</span>
                <span>+</span>
              </span>{' '}
              digital products and AI-powered experiences for modern businesses.
            </h2>

            {/* Bottom Metadata & Link */}
            <div className="mt-14 sm:mt-20 pt-6 border-t border-dashed border-white/[0.12] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
              <div className="font-body text-sm">
                <p className="text-white font-medium">
                  Based in Sri Lanka · Worldwide
                </p>
                <p className="text-zinc-500 mt-0.5">
                  Cardiff Met Software Engineering Graduate · Building Since 2023
                </p>
              </div>

              {showMoreLink && (
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 font-mono text-xs tracking-[0.14em] uppercase text-white hover:text-[#9CFF00] transition-colors"
                >
                  <span>MORE ABOUT ME</span>
                  <span className="text-[#9CFF00]">&gt;</span>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
