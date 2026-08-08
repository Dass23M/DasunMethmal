'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import { blogPosts } from '@/data/blog';

const POSTER_ITEMS = [
  { ...blogPosts[0], image: '/images/poster-5.png' },
  { ...blogPosts[1], image: '/images/poster-1.png' },
  { ...blogPosts[2], image: '/images/poster-2.png' },
  { ...blogPosts[3], image: '/images/poster-3.jpg' },
  { ...blogPosts[4], image: '/images/poster-4.png' },
  { ...blogPosts[5], image: '/images/fashion4.png' },
];

export default function PosterDesign() {
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !sectionRef.current) return;

    let ctx: { revert: () => void } | null = null;

    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        if (!sectionRef.current) return;

        ctx = gsap.context(() => {
          const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.pd-card');
          cards?.forEach((card, i) => {
            gsap.fromTo(
              card,
              { autoAlpha: 0, y: 40, scale: 0.96 },
              {
                autoAlpha: 1,
                y: 0,
                scale: 1,
                duration: 0.8,
                delay: (i % 3) * 0.08,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: card,
                  start: 'top 90%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          });
        }, sectionRef);
      });
    });

    return () => ctx?.revert();
  }, [mounted]);

  if (!mounted) {
    return <section id="poster-design-section" className="min-h-screen bg-black" />;
  }

  return (
    <section
      id="poster-design-section"
      ref={sectionRef}
      className="bg-black py-16 sm:py-24 overflow-hidden select-none"
    >
      {/* ── Section Header ─────────────────────────────────────────── */}
      <div className="w-full max-w-[1040px] mx-auto px-4 sm:px-6">
        <SectionHeading title="POSTER & SOCIAL POST DESIGN" theme="dark" />
      </div>

      {/* ── Card Showcase Grid ─────────────────────────────────────── */}
      <div className="w-full max-w-[1040px] mx-auto px-4 sm:px-6 space-y-4 sm:space-y-5">
        {/* 1. Featured Top Banner */}
        <div className="pd-card relative rounded-2xl sm:rounded-3xl overflow-hidden border border-white/10 bg-[#12131A] cursor-pointer group shadow-2xl">
          <FeaturedCard post={POSTER_ITEMS[0]} />
        </div>

        {/* 2. Middle 2-Column Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
          {POSTER_ITEMS.slice(1, 3).map((post) => (
            <div
              key={post.id}
              className="pd-card relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-[#12131A] cursor-pointer group shadow-xl"
            >
              <MediumCard post={post} />
            </div>
          ))}
        </div>

        {/* 3. Bottom 3-Column Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {POSTER_ITEMS.slice(3, 6).map((post) => (
            <div
              key={post.id}
              className="pd-card relative rounded-xl sm:rounded-2xl overflow-hidden border border-white/10 bg-[#12131A] cursor-pointer group shadow-xl"
            >
              <SmallCard post={post} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Navigation Dots ────────────────────────────────────────── */}
      <div className="flex justify-center items-center gap-2 mt-10 sm:mt-14">
        {POSTER_ITEMS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIdx ? 'w-6 bg-[#FF6B00]' : 'w-2 bg-white/20 hover:bg-white/40'
            }`}
            aria-label={`View poster slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}

// ── Shared Card Components with Clean Sora & Mono Typography ──────────────────

function FeaturedCard({ post }: { post: typeof POSTER_ITEMS[0] }) {
  return (
    <div className="relative w-full aspect-[16/10] sm:aspect-[21/8]">
      <Image
        src={post.image}
        alt={post.title}
        fill
        sizes="(max-width: 768px) 100vw, 1040px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        priority
      />
      {/* Dark overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-[#FF6B00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Card Content */}
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8 flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div className="space-y-1.5 sm:space-y-2">
          <span className="inline-block font-mono text-[10px] sm:text-xs font-bold text-[#FF6B00] uppercase tracking-widest bg-[#FF6B00]/10 border border-[#FF6B00]/30 px-3 py-1 rounded-full">
            {post.categoryLabel}
          </span>
          <h3 className="font-sora font-bold text-base sm:text-2xl md:text-3xl text-white tracking-tight leading-tight group-hover:text-[#FF6B00] transition-colors">
            {post.title}
          </h3>
        </div>
        <span className="font-mono text-[10px] sm:text-xs text-white/50 uppercase tracking-wider shrink-0">
          {post.date}
        </span>
      </div>
    </div>
  );
}

function MediumCard({ post }: { post: typeof POSTER_ITEMS[0] }) {
  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[3/2]">
      <Image
        src={post.image}
        alt={post.title}
        fill
        sizes="(max-width: 768px) 100vw, 500px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
      <div className="absolute inset-0 bg-[#FF6B00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6 space-y-1 sm:space-y-1.5">
        <span className="block font-mono text-[10px] sm:text-xs font-semibold text-[#FF6B00] uppercase tracking-widest">
          {post.readTime}
        </span>
        <h3 className="font-sora font-bold text-sm sm:text-lg text-white tracking-tight leading-snug group-hover:text-[#FF6B00] transition-colors">
          {post.title}
        </h3>
      </div>
    </div>
  );
}

function SmallCard({ post }: { post: typeof POSTER_ITEMS[0] }) {
  return (
    <div className="relative w-full aspect-[4/3] sm:aspect-[4/5]">
      <Image
        src={post.image}
        alt={post.title}
        fill
        sizes="(max-width: 768px) 100vw, 340px"
        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
      <div className="absolute inset-0 bg-[#FF6B00]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Top Category Badge */}
      <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md border border-white/10 px-2.5 py-0.5 rounded-full">
        <span className="font-mono text-[9px] font-bold text-white/70 uppercase tracking-widest">
          {post.categoryLabel}
        </span>
      </div>

      <div className="absolute inset-x-0 bottom-0 p-4 space-y-1">
        <span className="block font-mono text-[10px] text-[#FF6B00] uppercase tracking-wider">
          {post.date}
        </span>
        <h3 className="font-sora font-bold text-sm sm:text-base text-white tracking-tight leading-snug group-hover:text-[#FF6B00] transition-colors">
          {post.title}
        </h3>
      </div>
    </div>
  );
}
