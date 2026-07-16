'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Fan-spread image card data.
 * Each card has a source image, accent color for the shadow/glow, and
 * final rotation + translateX offsets for the spread position.
 */
const CARDS = [
  {
    src: '/images/editorial_1.png',
    alt: 'B&W editorial portrait',
    accent: 'rgba(120,200,220,0.35)',
    // Far left — rotated counter-clockwise
    rotation: -14,
    xPercent: -110,
    yPercent: 8,
  },
  {
    src: '/images/dm_2.png',
    alt: 'Creative campaign board',
    accent: 'rgba(255,140,0,0.35)',
    // Left-center
    rotation: -7,
    xPercent: -55,
    yPercent: 3,
  },
  {
    src: '/images/editorial_2.png',
    alt: 'Colorful fashion portrait',
    accent: 'rgba(220,40,120,0.4)',
    // Center card — no rotation
    rotation: 0,
    xPercent: 0,
    yPercent: 0,
  },
  {
    src: '/images/dm_1.png',
    alt: 'Digital growth analytics',
    accent: 'rgba(255,190,0,0.35)',
    // Right-center
    rotation: 7,
    xPercent: 55,
    yPercent: 3,
  },
  {
    src: '/images/editorial_3.png',
    alt: 'B&W bob cut portrait',
    accent: 'rgba(160,160,170,0.35)',
    // Far right — rotated clockwise
    rotation: 14,
    xPercent: 110,
    yPercent: 8,
  },
];

const SOCIAL_LINKS = [
  { label: 'In', href: '#' },
  { label: 'Fb', href: '#' },
  { label: 'Tw', href: '#' },
  { label: 'Yt', href: '#' },
];

export default function ImageFanShowcase() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !wrapperRef.current || !sectionRef.current) return;

    const wrapper = wrapperRef.current;
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── Desktop & Tablet (≥768px): Pinned scrub fan-out ──
      mm.add('(min-width: 768px)', () => {
        // Initial state: all cards stacked in center with no rotation
        gsap.set(cards, {
          rotation: 0,
          xPercent: 0,
          yPercent: 0,
          scale: 0.92,
          opacity: 0.5,
        });

        // Watermark hidden initially
        if (watermarkRef.current) {
          gsap.set(watermarkRef.current, { opacity: 0, scale: 0.85 });
        }

        // Headline starts slightly above
        if (headlineRef.current) {
          gsap.set(headlineRef.current, { y: -30, opacity: 0 });
        }

        // Social links
        if (socialRef.current) {
          gsap.set(socialRef.current.children, { x: -20, opacity: 0 });
        }

        // Scroll indicator
        if (scrollIndicatorRef.current) {
          gsap.set(scrollIndicatorRef.current, { x: 20, opacity: 0 });
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: '+=1500',
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
          },
        });

        // 1. Headline drops in
        if (headlineRef.current) {
          tl.to(
            headlineRef.current,
            { y: 0, opacity: 1, duration: 0.2, ease: 'power2.out' },
            0
          );
        }

        // 2. Watermark fades in
        if (watermarkRef.current) {
          tl.to(
            watermarkRef.current,
            { opacity: 0.06, scale: 1, duration: 0.4, ease: 'power1.out' },
            0.05
          );
        }

        // 3. Cards fan outward sequentially from center
        // Center card first (index 2), then outward pairs
        const fanOrder = [2, 1, 3, 0, 4]; // center → inner pair → outer pair
        fanOrder.forEach((cardIdx, seqIdx) => {
          const card = cards[cardIdx];
          if (!card) return;
          const data = CARDS[cardIdx];

          tl.to(
            card,
            {
              rotation: data.rotation,
              xPercent: data.xPercent,
              yPercent: data.yPercent,
              scale: 1,
              opacity: 1,
              duration: 0.35,
              ease: 'power2.out',
            },
            0.1 + seqIdx * 0.08
          );
        });

        // 4. Social links slide in
        if (socialRef.current) {
          tl.to(
            socialRef.current.children,
            { x: 0, opacity: 1, stagger: 0.04, duration: 0.2, ease: 'power2.out' },
            0.4
          );
        }

        // 5. Scroll indicator slides in
        if (scrollIndicatorRef.current) {
          tl.to(
            scrollIndicatorRef.current,
            { x: 0, opacity: 1, duration: 0.2, ease: 'power2.out' },
            0.45
          );
        }
      });

      // ── Mobile (<768px): Unpinned entrance ──
      mm.add('(max-width: 767px)', () => {
        // Clear any desktop transforms
        gsap.set(cards, { clearProps: 'all' });

        if (headlineRef.current) {
          gsap.fromTo(
            headlineRef.current,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
              },
            }
          );
        }

        gsap.fromTo(
          cards,
          { y: 40, opacity: 0, scale: 0.95 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            stagger: 0.12,
            duration: 0.7,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: cardsContainerRef.current,
              start: 'top 80%',
            },
          }
        );
      });
    }, wrapper);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return <section className="w-full min-h-screen bg-white" />;
  }

  return (
    <div ref={wrapperRef} className="w-full overflow-hidden bg-white">
      <section
        ref={sectionRef}
        className="relative w-full h-auto py-16 md:py-0 md:h-[100svh] md:h-screen bg-white flex flex-col items-center justify-center select-none overflow-hidden"
      >
        {/* ── Watermark Background Text ── */}
        <span
          ref={watermarkRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-raleway font-black text-[18vw] md:text-[22vw] tracking-[0.1em] text-black pointer-events-none select-none z-0 whitespace-nowrap hidden md:block"
          style={{ opacity: 0.06 }}
          aria-hidden="true"
        >
          ULTRA
        </span>

        {/* ── Left Social Links ── */}
        <div
          ref={socialRef}
          className="absolute left-4 sm:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-4"
        >
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-raleway font-bold text-xs tracking-widest text-black/50 hover:text-black transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* ── Right Scroll Indicator ── */}
        <div
          ref={scrollIndicatorRef}
          className="absolute right-4 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-3"
        >
          <span
            className="font-raleway font-bold text-[10px] tracking-[0.25em] text-black/40 uppercase"
            style={{ writingMode: 'vertical-rl' }}
          >
            Scroll
          </span>
          <span className="w-[1px] h-10 bg-black/20" />
        </div>

        {/* ── Headline ── */}
        <h2
          ref={headlineRef}
          className="relative z-10 font-raleway font-black text-black text-center tracking-[0.03em] leading-[1.1] md:leading-[0.92] text-[2.6rem] sm:text-[3.5rem] md:text-[5.5rem] lg:text-[7rem] xl:text-[8.5rem] mb-8 md:mb-0 will-change-transform"
        >
          We build the next
        </h2>

        {/* ── Fan Card Stack ── */}
        <div
          ref={cardsContainerRef}
          className="relative z-10 w-full flex items-center justify-center mt-8 md:mt-10"
        >
          {/* Desktop: absolute fan layout */}
          <div className="relative hidden md:block" style={{ width: '680px', height: '420px' }}>
            {CARDS.map((card, idx) => (
              <div
                key={idx}
                ref={(el) => { cardRefs.current[idx] = el; }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] lg:w-[230px] xl:w-[260px] aspect-[3/4] rounded-2xl overflow-hidden will-change-transform"
                style={{
                  boxShadow: `0 20px 60px -10px ${card.accent}, 0 8px 25px -5px rgba(0,0,0,0.15)`,
                  zIndex: idx === 2 ? 30 : idx === 1 || idx === 3 ? 20 : 10,
                }}
              >
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  sizes="(max-width: 1024px) 200px, 260px"
                  className="object-cover"
                />
              </div>
            ))}
          </div>

          {/* Mobile: horizontal scroll */}
          <div className="flex md:hidden gap-3 overflow-x-auto pb-4 px-4 snap-x snap-mandatory w-full max-w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
            {CARDS.map((card, idx) => (
              <div
                key={idx}
                ref={(el) => {
                  if (typeof window !== 'undefined' && window.innerWidth < 768) {
                    cardRefs.current[idx] = el;
                  }
                }}
                className="relative flex-shrink-0 w-[55vw] sm:w-[42vw] aspect-[3/4] rounded-xl overflow-hidden snap-center"
                style={{
                  boxShadow: `0 12px 35px -8px ${card.accent}, 0 4px 15px -3px rgba(0,0,0,0.12)`,
                }}
              >
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  sizes="55vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </div>

      </section>
    </div>
  );
}
