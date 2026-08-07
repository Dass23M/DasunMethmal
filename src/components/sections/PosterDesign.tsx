'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import { posterItems, PosterItem } from '@/data/blog';

/* ─────────────────────────────────────────────────────────
   ULTRA-LUXURY EXHIBITION GALLERY — POSTER & SOCIAL DESIGN
───────────────────────────────────────────────────────── */
export default function PosterDesign() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'poster' | 'social' | 'campaign'>('all');
  const [selectedPoster, setSelectedPoster] = useState<PosterItem | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // GSAP reveal animation
  useEffect(() => {
    if (!mounted || !sectionRef.current) return;
    let ctx: { revert: () => void } | null = null;

    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        if (!sectionRef.current) return;
        ctx = gsap.context(() => {
          const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.luxury-poster-card');
          if (cards && cards.length > 0) {
            gsap.fromTo(
              cards,
              { y: 40, opacity: 0, scale: 0.96 },
              {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.7,
                stagger: 0.08,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: sectionRef.current,
                  start: 'top 85%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          }
        }, sectionRef);
      });
    });

    return () => ctx?.revert();
  }, [mounted, activeFilter]);

  // Handle ESC key for Lightbox modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setSelectedPoster(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredItems = activeFilter === 'all'
    ? posterItems
    : posterItems.filter((item) => item.category === activeFilter);

  if (!mounted) {
    return <section id="poster-design-section" className="unslate-section" />;
  }

  return (
    <section
      id="poster-design-section"
      ref={sectionRef}
      className="unslate-section relative select-none overflow-hidden"
      style={{ background: '#0A0B0E', padding: '6rem 0' }}
    >
      {/* Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(255,107,0,0.06)_0%,transparent_70%)] pointer-events-none blur-3xl" />

      <div className="relative z-10 max-w-[1140px] mx-auto px-4 sm:px-6">
        
        {/* Section Heading */}
        <SectionHeading title="POSTER & SOCIAL POST DESIGN" theme="dark" />

        {/* Filter Navigation Tabs */}
        <div className="flex items-center justify-center flex-wrap gap-2.5 sm:gap-4 mb-10 sm:mb-14">
          {[
            { id: 'all', label: 'ALL EXHIBITION WORKS' },
            { id: 'poster', label: 'BRAND POSTERS' },
            { id: 'social', label: 'SOCIAL POSTS' },
            { id: 'campaign', label: 'CAMPAIGN VISUALS' },
          ].map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-sora text-xs font-bold uppercase tracking-widest transition-all duration-300 ${
                  isActive
                    ? 'bg-[#FF6B00] text-white shadow-[0_0_20px_rgba(255,107,0,0.4)] scale-105'
                    : 'bg-[#14151D] text-white/60 hover:text-white hover:bg-[#1D1E2A] border border-white/10'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Luxury Poster Exhibition Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPoster(item)}
              className="luxury-poster-card group relative cursor-pointer rounded-2xl overflow-hidden bg-[#11121A] border border-white/10 hover:border-[#FF6B00]/40 transition-all duration-500 shadow-2xl hover:shadow-[0_12px_40px_rgba(255,107,0,0.18)]"
            >
              {/* Image Container Stage */}
              <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#07080B]">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                />

                {/* Gradient Shadow Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0E] via-transparent to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />

                {/* Top Category Badge */}
                <div className="absolute top-3 left-3 z-10">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/15 text-[#FF6B00] font-sora font-bold text-[10px] uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
                    {item.categoryLabel}
                  </span>
                </div>

                {/* Hover Preview Icon Button */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-black/40 backdrop-blur-[2px]">
                  <div className="w-12 h-12 rounded-full bg-[#FF6B00] text-white flex items-center justify-center shadow-lg transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300">
                    <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Card Footer Content */}
              <div className="p-5 bg-[#0E0F17] border-t border-white/10">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="font-sora font-bold text-sm sm:text-base text-white group-hover:text-[#FF6B00] transition-colors leading-tight line-clamp-1">
                    {item.title}
                  </h3>
                  <span className="font-mono text-[10px] text-white/40 shrink-0 uppercase tracking-wider">
                    {item.date}
                  </span>
                </div>

                {/* Tools Tags */}
                <div className="flex items-center gap-1.5 flex-wrap">
                  {item.tools.map((tool, idx) => (
                    <span
                      key={idx}
                      className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-white/60 border border-white/10"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          LUXURY LIGHTBOX PREVIEW MODAL
      ───────────────────────────────────────────────────────── */}
      {selectedPoster && (
        <div
          className="fixed inset-0 z-[99999] bg-black/92 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
          onClick={() => setSelectedPoster(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#12131C] border border-white/20 rounded-3xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedPoster(null)}
              className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/70 text-white hover:bg-[#FF6B00] transition-colors flex items-center justify-center border border-white/20"
              aria-label="Close modal"
            >
              ✕
            </button>

            {/* Modal Image Stage */}
            <div className="relative w-full md:w-3/5 bg-black flex items-center justify-center p-4 min-h-[300px] md:min-h-[480px]">
              <Image
                src={selectedPoster.image}
                alt={selectedPoster.title}
                fill
                className="object-contain"
                priority
              />
            </div>

            {/* Modal Details Panel */}
            <div className="w-full md:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-[#0E0F17] border-t md:border-t-0 md:border-l border-white/10 overflow-y-auto">
              <div>
                <span className="inline-block px-3 py-1 rounded-full bg-[#FF6B00]/15 text-[#FF6B00] border border-[#FF6B00]/30 font-sora font-bold text-xs uppercase tracking-widest mb-3">
                  {selectedPoster.categoryLabel}
                </span>

                <h2 className="font-sora font-bold text-xl sm:text-2xl text-white mb-3 leading-snug">
                  {selectedPoster.title}
                </h2>

                <p className="font-inter text-xs sm:text-sm text-white/70 leading-relaxed mb-6">
                  {selectedPoster.description}
                </p>

                {/* Metadata List */}
                <div className="space-y-3 border-t border-white/10 pt-4 mb-6">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-white/40 uppercase">Designer</span>
                    <span className="text-white font-bold">{selectedPoster.author}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-white/40 uppercase">Year</span>
                    <span className="text-white font-bold">{selectedPoster.date}</span>
                  </div>
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-white/40 uppercase">Category</span>
                    <span className="text-[#FF6B00] font-bold">{selectedPoster.readTime}</span>
                  </div>
                </div>

                {/* Software Used */}
                <div>
                  <span className="block text-[11px] font-mono text-white/40 uppercase mb-2 tracking-wider">
                    Tools &amp; Software Used
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {selectedPoster.tools.map((tool, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg bg-white/10 text-white font-mono text-xs border border-white/15"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Close Action Button */}
              <div className="pt-6 mt-6 border-t border-white/10">
                <button
                  onClick={() => setSelectedPoster(null)}
                  className="w-full py-3 rounded-xl bg-[#FF6B00] hover:bg-[#e55e00] text-white font-sora font-bold text-xs uppercase tracking-widest transition-all shadow-lg"
                >
                  Close Preview
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
