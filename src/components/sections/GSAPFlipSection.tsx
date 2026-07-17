'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, Flip);

const LAYOUTS = ['final', 'plain', 'columns', 'grid'] as const;

const SERVICES = [
  {
    num: '01',
    letter: 'W',
    label: 'Web Development',
    sublabel: 'Modern, blazing-fast web applications',
    tag: 'FULLSTACK • PERFORMANCE',
    image: '/images/fashion1.png',
    accent: '#FF6B00',
  },
  {
    num: '02',
    letter: 'D',
    label: 'Digital Strategy',
    sublabel: 'Data-driven growth & scaling plans',
    tag: 'ANALYTICS • CAMPAIGNS',
    image: '/images/fashion2.webp',
    accent: '#FFA800',
  },
  {
    num: '03',
    letter: 'S',
    label: 'Social Media',
    sublabel: 'Engaging community & brand presence',
    tag: 'GROWTH • ENGAGEMENT',
    image: '/images/fashion3.jpg',
    accent: '#FF6B00',
  },
  {
    num: '04',
    letter: 'C',
    label: 'Content Creation',
    sublabel: 'High-converting stories & visuals',
    tag: 'CREATIVE • CONVERSION',
    image: '/images/fashion4.jpg',
    accent: '#FF9500',
  },
];

export default function GSAPFlipSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    let curLayoutIdx = 0;
    let activeTargetIdx = 0;
    let flipTween: gsap.core.Timeline | null = null;
    let isFlipping = false;
    let pendingIdx: number | null = null;

    const getFlipTargets = () =>
      container.querySelectorAll('.flip-card, .flip-letter, .flip-service-label, .flip-num-badge');

    const applyLayout = (nextIdx: number, isMobile: boolean) => {
      if (nextIdx === curLayoutIdx) return;

      if (isFlipping) {
        pendingIdx = nextIdx;
        return;
      }

      flipTween?.kill();
      isFlipping = true;
      pendingIdx = null;

      const state = Flip.getState(getFlipTargets(), {
        props: 'color,backgroundColor,borderColor,opacity',
        simple: true,
      });

      container.classList.remove(LAYOUTS[curLayoutIdx]);
      curLayoutIdx = nextIdx;
      container.classList.add(LAYOUTS[curLayoutIdx]);

      flipTween = Flip.from(state, {
        absolute: true,
        nested: false,
        stagger: isMobile ? 0.04 : 0.06,
        duration: isMobile ? 0.45 : 0.65,
        ease: 'power3.inOut',
        spin: !isMobile && curLayoutIdx === 0,
        simple: true,
        overwrite: 'auto',
        onComplete: () => {
          isFlipping = false;
          flipTween = null;
          if (pendingIdx !== null && pendingIdx !== curLayoutIdx) {
            const next = pendingIdx;
            pendingIdx = null;
            applyLayout(next, isMobile);
          }
        },
        onEnter: (elements) => {
          gsap.fromTo(
            elements,
            { opacity: 0, scale: 0.92 },
            {
              opacity: 1,
              scale: 1,
              duration: isMobile ? 0.3 : 0.4,
              ease: 'power2.out',
              overwrite: 'auto',
            }
          );
        },
        onLeave: (elements) => {
          gsap.to(elements, {
            opacity: 0,
            scale: 0.92,
            duration: isMobile ? 0.2 : 0.25,
            ease: 'power2.in',
            overwrite: 'auto',
          });
        },
      });
    };

    const layoutFromProgress = (progress: number) => {
      if (progress < 0.25) return 0;
      if (progress < 0.5) return 1;
      if (progress < 0.75) return 2;
      return 3;
    };

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // ── Desktop (≥992px): Pinned GSAP Flip Layout Scrub ──
      mm.add('(min-width: 992px)', () => {
        container.classList.remove(...LAYOUTS);
        container.classList.add('final');
        curLayoutIdx = 0;
        activeTargetIdx = 0;

        gsap.set(getFlipTargets(), { clearProps: 'transform,opacity' });
        gsap.set(section, { clearProps: 'transform' });

        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: '+=2400',
          pin: section,
          pinSpacing: true,
          scrub: 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const targetIdx = layoutFromProgress(self.progress);
            if (targetIdx !== activeTargetIdx) {
              activeTargetIdx = targetIdx;
              applyLayout(targetIdx, false);
            }
          },
        });
      });

      // ── Mobile (<992px): Smooth Staggered Scroll Reveal for Responsive Cards ──
      mm.add('(max-width: 991px)', () => {
        container.classList.remove(...LAYOUTS);
        container.classList.add('final');

        const cards = container.querySelectorAll('.flip-card');
        gsap.fromTo(
          cards,
          { opacity: 0, y: 40, scale: 0.96 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: section,
              start: 'top 80%',
            },
          }
        );
      });
    }, section);

    const refresh = () => ScrollTrigger.refresh();
    const t1 = window.setTimeout(refresh, 300);
    const t2 = window.setTimeout(refresh, 1000);

    const onLoad = () => refresh();
    const onResize = () => refresh();

    window.addEventListener('load', onLoad);
    window.addEventListener('orientationchange', onResize);
    window.visualViewport?.addEventListener('resize', onResize);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener('load', onLoad);
      window.removeEventListener('orientationchange', onResize);
      window.visualViewport?.removeEventListener('resize', onResize);
      flipTween?.kill();
      ctx.revert();
    };
  }, [mounted]);

  if (!mounted) {
    return (
      <section id="services-section" className="w-full h-[100svh] bg-white" />
    );
  }

  return (
    <section
      id="services-section"
      ref={sectionRef}
      className="flip-section w-full h-[100svh] lg:h-screen bg-white text-black overflow-hidden relative z-10 select-none flex flex-col justify-between"
    >
      {/* Editorial Section Header (Pinned at top) */}
      <div className="absolute top-5 sm:top-8 left-0 right-0 z-30 px-5 sm:px-10 lg:px-16 max-w-[1550px] mx-auto pointer-events-none">
        <div className="flex items-center justify-between text-xs sm:text-sm font-bold tracking-widest uppercase text-black/75 border-b border-black/15 pb-3">
          <span className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-pulse" />
            <span className="font-raleway tracking-widest text-black">SERVICES &amp; EXPERTISE</span>
          </span>
          <span className="font-mono text-xs opacity-65 text-black/60">03 / CAPABILITIES</span>
        </div>
      </div>

      <style>{`
        .flip-section {
          height: 100svh;
          min-height: 100svh;
          padding: 0;
          touch-action: pan-y;
          background: #ffffff;
        }

        .flip-container {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          box-sizing: border-box;
          padding-top: 4.5rem;
          padding-bottom: 2rem;
        }

        /* Luxury Glassmorphism Cards with Fashion Backgrounds on White Section */
        .flip-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          background: #111116;
          border: 1px solid rgba(0, 0, 0, 0.1);
          box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15), 0 5px 15px rgba(0, 0, 0, 0.08);
          transition: border-color 0.4s ease, box-shadow 0.4s ease;
        }

        .flip-card:hover {
          border-color: rgba(255, 107, 0, 0.6);
          box-shadow: 0 20px 45px rgba(0, 0, 0, 0.25), 0 0 25px rgba(255, 107, 0, 0.2);
        }

        /* Glass Overlay Layer */
        .flip-card-glass {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, rgba(0, 0, 0, 0.7) 65%, rgba(0, 0, 0, 0.9) 100%);
          backdrop-filter: blur(6px);
          transition: backdrop-filter 0.5s ease, background 0.5s ease;
        }

        .flip-card:hover .flip-card-glass {
          backdrop-filter: blur(2px);
          background: linear-gradient(180deg, rgba(0, 0, 0, 0.15) 0%, rgba(0, 0, 0, 0.55) 65%, rgba(0, 0, 0, 0.85) 100%);
        }

        /* Numbered Pill Badge */
        .flip-num-badge {
          font-family: 'Raleway', monospace;
          font-weight: 800;
          letter-spacing: 0.15em;
          font-size: 0.75rem;
          color: #FF6B00;
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 107, 0, 0.4);
          padding: 4px 12px;
          border-radius: 9999px;
          z-index: 2;
          margin-bottom: 0.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
        }

        /* Monogram Letter */
        .flip-letter {
          font-family: 'Raleway', sans-serif;
          font-weight: 900;
          line-height: 1;
          z-index: 2;
          background: linear-gradient(135deg, #ffffff 40%, rgba(255, 255, 255, 0.75) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          filter: drop-shadow(0 6px 16px rgba(0, 0, 0, 0.8));
        }

        /* Service Label */
        .flip-service-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3em;
          z-index: 2;
        }

        .flip-service-label .svc-name {
          font-family: 'Raleway', sans-serif;
          font-weight: 800;
          letter-spacing: 0.03em;
          text-align: center;
          line-height: 1.25;
          color: #FFFFFF;
          text-shadow: 0 2px 10px rgba(0,0,0,0.9);
        }

        .flip-service-label .svc-sub {
          font-family: 'Raleway', sans-serif;
          font-weight: 400;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          text-align: center;
          color: rgba(255, 255, 255, 0.85);
          text-shadow: 0 2px 8px rgba(0,0,0,0.9);
        }

        .flip-service-label .svc-tag {
          font-family: 'Raleway', monospace;
          font-weight: 700;
          font-size: 0.65rem;
          letter-spacing: 0.12em;
          color: #FF6B00;
          background: rgba(0, 0, 0, 0.65);
          padding: 3px 9px;
          border-radius: 4px;
          border: 1px solid rgba(255, 107, 0, 0.35);
          margin-top: 0.4rem;
        }

        /* ── Desktop layouts (≥992px) ── */
        @media (min-width: 992px) {
          .flip-section {
            height: 100vh;
            min-height: 100vh;
          }

          /* State 0: Final / Initial Hero view - 4 sleek horizontal luxury cards */
          .flip-container.final {
            flex-direction: row;
            gap: 1.2vmax;
            padding: 5.5rem 3vmax 3rem 3vmax;
          }
          .flip-container.final .flip-card {
            flex: 1 1 0;
            height: 70vh;
            max-height: 520px;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            padding: 2.2vmax 2vmax;
            border-radius: 1.5vmax;
          }
          .flip-container.final .flip-letter {
            font-size: clamp(3.5rem, 7vmax, 7.5rem);
            align-self: flex-start;
          }
          .flip-container.final .flip-service-label {
            align-items: flex-start;
            text-align: left;
          }
          .flip-container.final .flip-service-label .svc-name {
            font-size: clamp(1.1rem, 1.6vmax, 1.8rem);
            text-align: left;
          }
          .flip-container.final .flip-service-label .svc-sub {
            font-size: clamp(0.7rem, 0.85vmax, 0.95rem);
            text-align: left;
          }

          /* State 1: Plain / High-impact glowing typography */
          .flip-container.plain {
            flex-direction: row;
            gap: 2.5vmax;
            padding: 5rem 2vmax;
          }
          .flip-container.plain .flip-card {
            background: #ffffff !important;
            border: 1px solid rgba(255, 107, 0, 0.4) !important;
            border-radius: 2vmax;
            padding: 2vmax;
            flex: 1;
            height: 60vh;
          }
          .flip-container.plain .flip-card-glass {
            background: rgba(255, 255, 255, 0.92);
            backdrop-filter: blur(12px);
          }
          .flip-container.plain .flip-letter {
            font-size: clamp(6rem, 14vmax, 16rem);
            background: linear-gradient(135deg, #FF6B00 0%, #FF8A00 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            filter: drop-shadow(0 10px 25px rgba(255, 107, 0, 0.35));
          }
          .flip-container.plain .flip-service-label,
          .flip-container.plain .flip-num-badge {
            display: none;
          }

          /* State 2: Columns / Vertical Full-Height Pillars */
          .flip-container.columns {
            flex-direction: row;
            align-items: stretch;
            padding-top: 4.5rem;
            padding-bottom: 0;
          }
          .flip-container.columns .flip-card {
            flex: 1 1 25%;
            height: 100%;
            border-radius: 0;
            border-top: none;
            border-bottom: none;
            border-left: none;
            border-right: 1px solid rgba(0, 0, 0, 0.1);
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            padding: 3vmax 2.2vmax;
          }
          .flip-container.columns .flip-letter {
            font-size: clamp(3.5rem, 8vmax, 10rem);
          }
          .flip-container.columns .flip-service-label {
            align-items: flex-start;
          }
          .flip-container.columns .flip-service-label .svc-name {
            font-size: clamp(1rem, 1.5vmax, 1.7rem);
            text-align: left;
          }
          .flip-container.columns .flip-service-label .svc-sub {
            font-size: clamp(0.65rem, 0.8vmax, 0.9vmax);
            text-align: left;
          }

          /* State 3: Bento Grid / 2x2 Modern Grid */
          .flip-container.grid {
            flex-wrap: wrap;
            align-content: stretch;
            align-items: stretch;
            padding: 5rem 3vmax 2rem 3vmax;
            gap: 1.2vmax;
          }
          .flip-container.grid .flip-card {
            flex: 0 0 calc(50% - 0.6vmax);
            height: calc(50% - 0.6vmax);
            border-radius: 1.5vmax;
            flex-direction: row;
            justify-content: flex-start;
            gap: 2.5vmax;
            padding: 2.5vmax;
          }
          .flip-container.grid .flip-letter {
            font-size: clamp(4rem, 8.5vmax, 11rem);
          }
          .flip-container.grid .flip-service-label {
            align-items: flex-start;
          }
          .flip-container.grid .flip-service-label .svc-name {
            font-size: clamp(1.1rem, 1.8vmax, 2.1rem);
            text-align: left;
          }
          .flip-container.grid .flip-service-label .svc-sub {
            font-size: clamp(0.7rem, 0.9vmax, 1rem);
            text-align: left;
          }
        }

        /* ── Mobile layouts (<992px) ── */
        @media (max-width: 991px) {
          .flip-section {
            height: auto !important;
            min-height: auto !important;
            padding-top: 5rem;
            padding-bottom: 3rem;
          }

          .flip-container.final {
            flex-direction: column;
            justify-content: flex-start;
            align-items: stretch;
            height: auto;
            padding: 0 16px;
            gap: 16px;
          }

          .flip-container.final .flip-card {
            flex: none;
            height: 140px;
            width: 100%;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            border-radius: 20px;
            padding: 1.2rem 1.4rem;
            gap: 1.2rem;
          }

          .flip-container.final .flip-num-badge {
            margin-bottom: 0;
            font-size: 0.7rem;
            padding: 3px 9px;
          }

          .flip-container.final .flip-letter {
            font-size: clamp(2.4rem, 10vw, 3.5rem);
            flex-shrink: 0;
          }

          .flip-container.final .flip-service-label {
            align-items: flex-start;
            min-width: 0;
          }

          .flip-container.final .flip-service-label .svc-name {
            font-size: clamp(0.95rem, 4vw, 1.2rem);
            text-align: left;
          }

          .flip-container.final .flip-service-label .svc-sub {
            font-size: clamp(0.65rem, 2.8vw, 0.8rem);
            text-align: left;
          }

          .flip-container.plain {
            flex-wrap: wrap;
            align-content: center;
            align-items: center;
            padding: max(70px, env(safe-area-inset-top)) 16px 16px;
            gap: 12px;
          }

          .flip-container.plain .flip-card {
            flex: 1 1 calc(50% - 12px);
            background: #ffffff !important;
            border: 1px solid rgba(255, 107, 0, 0.4) !important;
            min-height: 0;
            height: calc(50% - 12px);
            padding: 1rem;
            border-radius: 16px;
          }

          .flip-container.plain .flip-letter {
            font-size: clamp(3rem, 16vw, 4.5rem);
            background: linear-gradient(135deg, #FF6B00 0%, #FFA800 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            filter: drop-shadow(0 0 20px rgba(255, 107, 0, 0.4));
          }

          .flip-container.plain .flip-service-label,
          .flip-container.plain .flip-num-badge {
            display: none;
          }

          .flip-container.columns {
            flex-direction: column;
            align-items: stretch;
            padding: max(60px, env(safe-area-inset-top)) 0 0;
            gap: 0;
          }

          .flip-container.columns .flip-card {
            flex: 1 1 25%;
            width: 100%;
            border-radius: 0;
            border-left: none;
            border-right: none;
            border-bottom: 1px solid rgba(0, 0, 0, 0.1);
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            gap: 1rem;
            padding: 0.85rem 1.25rem;
          }

          .flip-container.columns .flip-letter {
            font-size: clamp(2.2rem, 9vw, 3.2rem);
            flex-shrink: 0;
          }

          .flip-container.columns .flip-service-label {
            align-items: flex-start;
          }

          .flip-container.columns .flip-service-label .svc-name {
            font-size: clamp(0.75rem, 3.2vw, 0.95rem);
            text-align: left;
          }

          .flip-container.columns .flip-service-label .svc-sub {
            font-size: clamp(0.55rem, 2.3vw, 0.68rem);
            text-align: left;
          }

          .flip-container.grid {
            flex-wrap: wrap;
            align-content: stretch;
            align-items: stretch;
            padding: max(65px, env(safe-area-inset-top)) 10px 10px;
            gap: 10px;
          }

          .flip-container.grid .flip-card {
            flex: 0 0 calc(50% - 5px);
            width: calc(50% - 5px);
            height: calc(50% - 5px);
            border-radius: 14px;
            flex-direction: column;
            gap: 0.4rem;
            padding: 0.85rem 0.75rem;
          }

          .flip-container.grid .flip-letter {
            font-size: clamp(2.4rem, 11vw, 3.5rem);
          }

          .flip-container.grid .flip-service-label .svc-name {
            font-size: clamp(0.7rem, 3vw, 0.88rem);
          }

          .flip-container.grid .flip-service-label .svc-sub {
            font-size: clamp(0.52rem, 2.2vw, 0.65rem);
          }
        }
      `}</style>

      <div ref={containerRef} className="flip-container final">
        {SERVICES.map(({ num, letter, label, sublabel, tag, image }) => (
          <div key={letter} className="flip-card group">
            {/* Background Fashion Glass Image */}
            <div className="absolute inset-0 z-0 overflow-hidden">
              <Image
                src={image}
                alt={label}
                fill
                sizes="(max-width: 991px) 100vw, 25vw"
                className="object-cover object-center scale-105 group-hover:scale-110 transition-transform duration-700 ease-out"
              />
            </div>
            {/* Frosted Glass Overlay */}
            <div className="flip-card-glass" />

            <span className="flip-num-badge">{num}</span>
            <div className="flip-letter">{letter}</div>
            <div className="flip-service-label">
              <span className="svc-name">{label}</span>
              <span className="svc-sub">{sublabel}</span>
              <span className="svc-tag">{tag}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
