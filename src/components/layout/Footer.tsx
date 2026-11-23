'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '@/components/ui/Magnetic';

export default function Footer() {
  const year = new Date().getFullYear();
  const footerRef = useRef<HTMLElement>(null);
  const marqueeRef = useRef<HTMLDivElement>(null);
  const marqueeTweenRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (!footerRef.current) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (marqueeRef.current && !reduced) {
        marqueeTweenRef.current = gsap.to(marqueeRef.current, {
          xPercent: -50,
          duration: 26,
          ease: 'none',
          repeat: -1,
        });
      }

      if (!reduced) {
        // Giant starburst rotates smoothly as footer enters viewport
        gsap.fromTo(
          '.footer-starburst-spin',
          { rotate: -65 },
          {
            rotate: 55,
            ease: 'none',
            scrollTrigger: {
              trigger: footerRef.current,
              start: 'top bottom',
              end: 'bottom bottom',
              scrub: 1,
            },
          }
        );
      }
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const scrollToTop = () => {
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(0, { duration: 1.2 });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer
      ref={footerRef}
      className="site-footer w-full bg-[#080808] text-white select-none border-t border-white/[0.1] overflow-hidden"
    >
      {/* Top Bar: Giant Starburst Left + Quick Contact Card Right */}
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 relative">
        <div className="flex items-start justify-between pt-0 pb-12 sm:pb-16">
          {/* Partial Giant White Starburst cutting from top edge */}
          <div aria-hidden="true" className="-mt-12 sm:-mt-16 text-white pointer-events-none">
            <svg
              width="150"
              height="150"
              viewBox="0 0 120 120"
              fill="currentColor"
              className="footer-starburst-spin w-28 h-28 sm:w-40 sm:h-40 will-change-transform"
            >
              <path d="M60 0L68 46L102 18L74 52L120 60L74 68L102 102L68 74L60 120L52 74L18 102L46 68L0 60L46 52L18 18L52 46L60 0Z" />
            </svg>
          </div>

          {/* Crisp White Quick Contact Badge */}
          <Link
            href="/contact"
            className="mt-4 bg-white hover:bg-[#9CFF00] text-black px-4 py-2.5 flex items-center gap-3.5 transition-colors duration-200"
          >
            <div className="font-mono leading-tight">
              <span className="block text-[11px] font-bold tracking-[0.12em] uppercase">
                DASUN METHMAL
              </span>
              <span className="block text-[9px] tracking-[0.12em] uppercase text-black/60">
                DIRECT INQUIRY
              </span>
            </div>
            <div className="relative w-9 h-9 rounded-full overflow-hidden border border-black/15 shrink-0">
              <Image
                src="/images/methmal1.png"
                alt="Dasun Methmal"
                fill
                sizes="36px"
                className="object-cover object-top grayscale"
              />
            </div>
          </Link>
        </div>

        {/* Middle Editorial Row (Divided by Dashed Line) */}
        <div className="border-t border-dashed border-white/[0.15] py-14 sm:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
          {/* Left Editorial Statement */}
          <div className="lg:col-span-6">
            <h2 className="font-display font-normal text-3xl sm:text-4xl lg:text-[2.75rem] leading-[1.12] tracking-[-0.03em] text-white max-w-lg">
              Dasun Methmal is a Sri Lanka-based{' '}
              <span className="text-[#9CFF00]">Creative Engineer,</span> building digital products.
            </h2>
          </div>

          {/* Right 2-Column Uppercase Sitemap + Circular Top Button */}
          <div className="lg:col-span-6 flex flex-col sm:flex-row items-start sm:items-start justify-between gap-10">
            <div className="grid grid-cols-2 gap-12 sm:gap-16 font-mono text-[11px] tracking-[0.16em] uppercase">
              <ul className="space-y-3.5 list-none m-0 p-0 text-zinc-300">
                <li>
                  <Link href="/about" className="hover:text-[#9CFF00] transition-colors">
                    ABOUT
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="hover:text-[#9CFF00] transition-colors">
                    SERVICES
                  </Link>
                </li>
                <li>
                  <Link href="/works" className="hover:text-[#9CFF00] transition-colors">
                    WORKS
                  </Link>
                </li>
                <li>
                  <Link href="/blog" className="hover:text-[#9CFF00] transition-colors">
                    BLOG
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:text-[#9CFF00] transition-colors">
                    CONTACT
                  </Link>
                </li>
              </ul>

              <ul className="space-y-3.5 list-none m-0 p-0 text-zinc-400">
                <li>
                  <a
                    href="https://www.linkedin.com/in/dasun-methmal-607333230"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#9CFF00] transition-colors"
                  >
                    LINKEDIN
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/Dass23M"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#9CFF00] transition-colors"
                  >
                    GITHUB
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/_dase23_"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#9CFF00] transition-colors"
                  >
                    INSTAGRAM
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tiktok.com/@dcode33"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#9CFF00] transition-colors"
                  >
                    TIKTOK
                  </a>
                </li>
              </ul>
            </div>

            {/* Circular Magnetic TOP Button */}
            <Magnetic strength={0.28} className="self-end sm:self-center">
              <button
                type="button"
                onClick={scrollToTop}
                aria-label="Back to top"
                className="w-20 h-20 rounded-full bg-[#1C1C1C] hover:bg-[#9CFF00] text-white hover:text-black border border-white/10 flex flex-col items-center justify-center gap-1 font-mono text-[10px] tracking-[0.16em] uppercase transition-colors cursor-pointer shrink-0"
              >
                <span className="text-sm leading-none">↑</span>
                <span>TOP</span>
              </button>
            </Magnetic>
          </div>
        </div>

        {/* Bottom Copyright Sharp Gray Tags */}
        <div className="pb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div className="flex flex-col items-start gap-1.5">
            <span className="inline-block bg-[#E5E5E5] text-black font-mono text-[10px] font-semibold tracking-[0.16em] uppercase px-2.5 py-1">
              METHMAL © {year}
            </span>
            <span className="inline-block bg-[#E5E5E5] text-black font-mono text-[10px] font-semibold tracking-[0.16em] uppercase px-2.5 py-1">
              ALL RIGHTS RESERVED.
            </span>
          </div>

          <a
            href="mailto:methmal.liyanage23@gmail.com"
            className="font-mono text-xs text-zinc-400 hover:text-[#9CFF00] transition-colors"
          >
            methmal.liyanage23@gmail.com
          </a>
        </div>
      </div>

      {/* Bottom Full-Width Solid Acid-Green Marquee Ticker (smoothly slows on hover) */}
      <div
        className="w-full bg-[#9CFF00] text-black py-3.5 sm:py-4 overflow-hidden"
        onMouseEnter={() => marqueeTweenRef.current?.timeScale(0.35)}
        onMouseLeave={() => marqueeTweenRef.current?.timeScale(1)}
      >
        <div ref={marqueeRef} className="inline-flex items-center whitespace-nowrap will-change-transform">
          {Array.from({ length: 8 }).map((_, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-6 sm:gap-8 px-4 sm:px-6 font-display font-medium uppercase tracking-[-0.02em] text-3xl sm:text-5xl leading-none"
            >
              <span>DASUN METHMAL</span>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 shrink-0">
                <path d="M16 0L18.2 12.2L27.3 4.7L19.8 13.8L32 16L19.8 18.2L27.3 27.3L18.2 19.8L16 32L13.8 19.8L4.7 27.3L12.2 18.2L0 16L12.2 13.8L4.7 4.7L13.8 12.2L16 0Z" />
              </svg>
              <span>CREATIVE ENGINEER</span>
              <svg width="32" height="32" viewBox="0 0 32 32" fill="currentColor" className="w-6 h-6 sm:w-8 sm:h-8 shrink-0">
                <path d="M16 0L18.2 12.2L27.3 4.7L19.8 13.8L32 16L19.8 18.2L27.3 27.3L18.2 19.8L16 32L13.8 19.8L4.7 27.3L12.2 18.2L0 16L12.2 13.8L4.7 4.7L13.8 12.2L16 0Z" />
              </svg>
            </span>
          ))}
        </div>
      </div>
    </footer>
  );
}
