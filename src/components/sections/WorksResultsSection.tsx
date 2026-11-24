'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { portfolioItems } from '@/data/portfolio';
import Magnetic from '@/components/ui/Magnetic';

interface WorksResultsSectionProps {
  limit?: number;
  showAllLink?: boolean;
}

export default function WorksResultsSection({
  limit,
  showAllLink = true,
}: WorksResultsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const items = limit ? portfolioItems.slice(0, limit) : portfolioItems;

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // 1. Giant THE / RESULTS masked reveal
      gsap.fromTo(
        '.wr-title-line',
        { yPercent: 105, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 0.95,
          stagger: 0.12,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.wr-heading',
            start: 'top 85%',
            once: true,
          },
        }
      );

      // 2. Staggered editorial curtain reveal on project cards
      const cards = sectionRef.current?.querySelectorAll('.wr-project-card');
      cards?.forEach((card, i) => {
        const media = card.querySelector('.wr-card-media');
        const img = card.querySelector('.wr-card-img');

        gsap.fromTo(
          card,
          { opacity: 0, y: 32 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            delay: (i % 2) * 0.1,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              once: true,
            },
          }
        );

        if (media) {
          gsap.fromTo(
            media,
            { clipPath: 'inset(0% 0% 100% 0%)' },
            {
              clipPath: 'inset(0% 0% 0% 0%)',
              duration: 0.95,
              delay: (i % 2) * 0.1,
              ease: 'power4.inOut',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                once: true,
              },
            }
          );
        }

        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.14 },
            {
              scale: 1,
              duration: 1.15,
              delay: (i % 2) * 0.1,
              ease: 'expo.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 88%',
                once: true,
              },
            }
          );
        }
      });

      // 3. Animated count-up metrics inside the acid-green [NUMBERS] panel
      const counters = sectionRef.current?.querySelectorAll<HTMLElement>('[data-count-to]');
      counters?.forEach((el) => {
        const target = parseFloat(el.dataset.countTo || '0');
        const suffix = el.dataset.suffix || '';
        const decimals = parseInt(el.dataset.decimals || '0', 10);
        const obj = { val: 0 };

        gsap.to(obj, {
          val: target,
          duration: 1.4,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: '.wr-numbers-card',
            start: 'top 82%',
            once: true,
          },
          onUpdate: () => {
            el.textContent = `${obj.val.toFixed(decimals)}${suffix}`;
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="portfolio-section"
      className="w-full bg-[#080808] text-white py-16 sm:py-28 select-none"
    >
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Giant Stacked Editorial Heading */}
        <div className="wr-heading flex flex-col md:flex-row md:items-end justify-between gap-6 pb-10 sm:pb-16">
          <h2 className="font-display font-normal uppercase tracking-[-0.04em] leading-[0.88] text-white text-[clamp(2.85rem,12vw,8rem)]">
            <span className="block overflow-hidden">
              <span className="wr-title-line block will-change-transform">THE</span>
            </span>
            <span className="block overflow-hidden">
              <span className="wr-title-line block will-change-transform">RESULTS</span>
            </span>
          </h2>

          {showAllLink && (
            <Magnetic strength={0.22}>
              <Link
                href="/works"
                className="chamfer-btn inline-flex items-center gap-2 bg-white hover:bg-[#9CFF00] text-black font-mono font-bold text-[11px] tracking-[0.14em] uppercase px-6 py-3.5 transition-colors self-start md:self-end"
              >
                <span>VIEW ALL WORKS</span>
                <span>&gt;</span>
              </Link>
            </Magnetic>
          )}
        </div>

        {/* Dashed Split Grid */}
        <div className="border-t border-dashed border-white/[0.15] pt-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-0 items-start">
          {/* Left Column (7 Cols): Real Portfolio Case Studies */}
          <div className="lg:col-span-7 lg:pr-10">
            <div className="flex items-center justify-between gap-4 mb-10">
              <div className="flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/30">
                    <Image src="/images/person_man_1.jpg" alt="Client 1" fill sizes="36px" className="object-cover grayscale" />
                  </div>
                  <div className="relative w-9 h-9 rounded-full overflow-hidden border border-white/30">
                    <Image src="/images/person_man_2.jpg" alt="Client 2" fill sizes="36px" className="object-cover grayscale" />
                  </div>
                </div>
                <div className="font-mono text-[10px] leading-tight tracking-[0.14em] uppercase">
                  <span className="block text-zinc-400">TRUSTED BY</span>
                  <span className="block text-white font-semibold">MODERN FOUNDERS.</span>
                </div>
              </div>

              <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-zinc-400">
                [SELECTED WORKS]
              </span>
            </div>

            {/* Sharp Editorial Works Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {items.map((item, idx) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className="wr-project-card group block bg-[#111111] border border-white/[0.1] hover:border-[#9CFF00] transition-colors duration-300"
                >
                  <div className="wr-card-media relative aspect-[16/11] w-full overflow-hidden bg-[#181818]">
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      quality={80}
                      sizes="(max-width: 640px) 360px, (max-width: 1024px) 46vw, 30vw"
                      className="wr-card-img object-cover grayscale-[35%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500 ease-out will-change-transform"
                    />
                    <span className="absolute top-3 left-3 bg-[#080808]/90 border border-white/15 text-[#9CFF00] font-mono text-[10px] font-bold tracking-[0.14em] px-2 py-0.5">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="p-5 flex flex-col justify-between gap-3">
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500 mb-1.5">
                        {item.categories}
                      </p>
                      <h3 className="font-display font-medium text-lg text-white group-hover:text-[#9CFF00] transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <div className="pt-3 border-t border-dashed border-white/[0.1] flex items-center justify-between font-mono text-[10px] tracking-[0.16em] uppercase text-zinc-400 group-hover:text-white">
                      <span>VIEW CASE STUDY</span>
                      <span className="text-[#9CFF00] transition-transform duration-200 group-hover:translate-x-1">&gt;</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right Column (5 Cols): Sticky Acid-Green [NUMBERS] Card with Count-Up */}
          <div className="lg:col-span-5 lg:border-l lg:border-dashed lg:border-white/[0.15] lg:pl-10">
            <div className="wr-numbers-card relative bg-[#9CFF00] text-black p-7 sm:p-10 overflow-hidden lg:sticky lg:top-28">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 halftone-dots opacity-35"
              />

              {/* Black Pixel Cutout Steps */}
              <div aria-hidden="true" className="pointer-events-none absolute top-0 left-0 flex">
                <div className="w-8 h-12 bg-[#080808] ml-6" />
                <div className="w-28 h-5 bg-[#080808]" />
              </div>
              <div aria-hidden="true" className="pointer-events-none absolute top-0 right-0 w-16 h-8 bg-[#080808]" />

              <div className="relative z-10 pt-10 space-y-8">
                <div>
                  <span className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-black/75 block mb-3">
                    [NUMBERS]
                  </span>
                  <h3 className="font-display font-medium text-2xl sm:text-3xl leading-[1.15] tracking-[-0.02em] text-black">
                    Distinctive systems engineered for real speed and measurable growth.
                  </h3>
                </div>

                {/* Animated Count-Up Metrics Grid */}
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/20">
                  <div className="bg-black/[0.06] p-4 border border-black/15">
                    <span
                      data-count-to="15"
                      data-suffix="+"
                      className="font-display font-bold text-3xl sm:text-4xl block leading-none tabular-nums"
                    >
                      15+
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/75 mt-2 block">
                      BUILDS &amp; REPOS
                    </span>
                  </div>
                  <div className="bg-black/[0.06] p-4 border border-black/15">
                    <span
                      data-count-to="100"
                      data-suffix="%"
                      className="font-display font-bold text-3xl sm:text-4xl block leading-none tabular-nums"
                    >
                      100%
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/75 mt-2 block">
                      CLEAN ARCHITECTURE
                    </span>
                  </div>
                  <div className="bg-black/[0.06] p-4 border border-black/15">
                    <span className="font-display font-bold text-3xl sm:text-4xl block leading-none tabular-nums">
                      &lt;1s
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/75 mt-2 block">
                      LOAD PERFORMANCE
                    </span>
                  </div>
                  <div className="bg-black/[0.06] p-4 border border-black/15">
                    <span
                      data-count-to="3.5"
                      data-suffix="x"
                      data-decimals="1"
                      className="font-display font-bold text-3xl sm:text-4xl block leading-none tabular-nums"
                    >
                      3.5x
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-black/75 mt-2 block">
                      AVG GROWTH ROAS
                    </span>
                  </div>
                </div>

                <Magnetic strength={0.14} className="w-full">
                  <Link
                    href="/contact"
                    className="chamfer-btn w-full inline-flex items-center justify-between bg-[#080808] hover:bg-black/85 text-white font-mono text-xs font-bold tracking-[0.14em] uppercase px-5 py-4 transition-colors"
                  >
                    <span>START YOUR PROJECT</span>
                    <span className="text-[#9CFF00]">↗</span>
                  </Link>
                </Magnetic>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
