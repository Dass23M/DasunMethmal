'use client';

import Link from 'next/link';

export default function ImpactSection() {
  return (
    <section
      id="impact-section"
      className="relative w-full min-h-[580px] lg:min-h-[640px] bg-[#000000] text-white overflow-hidden select-none py-16 lg:py-24 flex flex-col justify-center"
    >
      {/* ─── MAIN NARRATIVE CONTENT GRID ─── */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 my-auto">
        <div className="max-w-[920px]">

          {/* LARGE BOLD DISPLAY HEADLINE */}
          <h2 className="font-sora font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-[4rem] text-white tracking-tight leading-[1.08] mb-8">
            Every line of code crafted with purpose. So your vision scales without limits.
          </h2>

          {/* MAIN NARRATIVE JOURNEY PARAGRAPH */}
          <p className="font-inter text-sm sm:text-base md:text-lg text-white/80 leading-relaxed font-normal max-w-[780px] mb-8">
            My journey began 2+ years ago with a single goal: bridging the gap between high-performance software engineering and data-driven growth marketing. Hundreds of architectural decisions, component patterns, API structures, and SEO optimizations—built once and refined continuously. Not a quick starter template, but production-grade digital craft engineered to deliver measurable impact.
          </p>

          {/* BOTTOM 2-SUBCOLUMN GRID WITH INDEX HEADINGS */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-16 pt-8 items-end">
            
            {/* SUBCOLUMN 1: 001 / MY JOURNEY */}
            <div>
              <span className="font-mono text-xs font-bold text-[#FF6B00] tracking-widest uppercase block mb-2">
                001 / MY JOURNEY
              </span>
              <p className="font-inter text-xs sm:text-sm text-white/70 leading-relaxed font-normal">
                From building my first React interface to scaling fullstack Next.js applications and managing global marketing campaigns. Every project is executed with technical precision and strategic intent.
              </p>
            </div>

            {/* SUBCOLUMN 2: 002 / ARCHITECTURE + CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="font-mono text-xs font-bold text-white/60 tracking-widest uppercase block mb-2">
                  002 / ARCHITECTURE
                </span>
                <p className="font-inter text-xs sm:text-sm text-white/70 leading-relaxed font-normal max-w-[280px]">
                  Modular design systems, GSAP motion engineering, and REST/GraphQL APIs built for speed.
                </p>
              </div>

              {/* LEARN MORE + BUTTON */}
              <Link
                href="#about-section"
                className="shrink-0 inline-flex items-center gap-2 bg-[#FF6B00] hover:bg-[#FF8A00] text-black font-sora font-extrabold text-xs tracking-wider uppercase px-5 py-3 rounded-lg transition-all duration-300 shadow-lg hover:scale-105"
              >
                <span>LEARN MORE</span>
                <span className="text-sm">+</span>
              </Link>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
