'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, Flip);

const LAYOUTS = ['final', 'plain', 'columns', 'grid'] as const;

const SERVICES = [
  {
    letter: 'W',
    label: 'Web Development',
    sublabel: 'Modern, blazing-fast websites',
    bg: '#FF6B00',
    fg: '#000000',
  },
  {
    letter: 'D',
    label: 'Digital Strategy',
    sublabel: 'Data-driven growth plans',
    bg: '#ffffff',
    fg: '#000000',
  },
  {
    letter: 'S',
    label: 'Social Media',
    sublabel: 'Engaging community presence',
    bg: '#000000',
    fg: '#FF6B00',
  },
  {
    letter: 'C',
    label: 'Content Creation',
    sublabel: 'Stories that convert',
    bg: '#FF6B00',
    fg: '#000000',
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
      container.querySelectorAll('.flip-card, .flip-letter, .flip-service-label');

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
        props: 'color,backgroundColor,opacity',
        simple: true,
      });

      container.classList.remove(LAYOUTS[curLayoutIdx]);
      curLayoutIdx = nextIdx;
      container.classList.add(LAYOUTS[curLayoutIdx]);

      flipTween = Flip.from(state, {
        absolute: true,
        nested: false,
        stagger: isMobile ? 0.04 : 0.07,
        duration: isMobile ? 0.45 : 0.7,
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
            { opacity: 0, scale: 0.9 },
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
            scale: 0.9,
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

      const setupPinnedFlip = (isMobile: boolean) => {
        container.classList.remove(...LAYOUTS);
        container.classList.add('final');
        curLayoutIdx = 0;
        activeTargetIdx = 0;

        gsap.set(getFlipTargets(), { clearProps: 'transform,opacity' });
        gsap.set(section, { clearProps: 'transform' });

        const pinDistance = isMobile
          ? () => `+=${Math.round(window.innerHeight * 2.8)}`
          : '+=2400';

        ScrollTrigger.create({
          trigger: section,
          start: 'top top',
          end: pinDistance,
          pin: section,
          pinSpacing: true,
          scrub: isMobile ? 1 : 1.2,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          ...(isMobile && {
            pinReparent: true,
            fastScrollEnd: true,
          }),
          onUpdate: (self) => {
            const targetIdx = layoutFromProgress(self.progress);
            if (targetIdx !== activeTargetIdx) {
              activeTargetIdx = targetIdx;
              applyLayout(targetIdx, isMobile);
            }
          },
        });
      };

      mm.add('(min-width: 992px)', () => setupPinnedFlip(false));
      mm.add('(max-width: 991px)', () => setupPinnedFlip(true));
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
      <section id="services-section" className="w-full h-[100svh] bg-black" />
    );
  }

  return (
    <section
      id="services-section"
      ref={sectionRef}
      className="flip-section w-full h-[100svh] lg:h-screen bg-black overflow-hidden relative z-10 select-none"
    >
      <style>{`
        .flip-section {
          height: 100svh;
          min-height: 100svh;
          padding: 0;
          touch-action: pan-y;
        }

        .flip-container {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          box-sizing: border-box;
        }

        .flip-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
        }

        .flip-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(255,255,255,0.07) 0%, transparent 55%);
          pointer-events: none;
        }

        .flip-letter {
          font-family: 'Raleway', sans-serif;
          font-weight: 900;
          line-height: 1;
          z-index: 1;
        }

        .flip-service-label {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.3em;
          z-index: 1;
        }

        .flip-service-label .svc-name {
          font-family: 'Raleway', sans-serif;
          font-weight: 700;
          letter-spacing: 0.04em;
          text-align: center;
          line-height: 1.2;
        }

        .flip-service-label .svc-sub {
          font-family: 'Raleway', sans-serif;
          font-weight: 300;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          text-align: center;
          opacity: 0.72;
        }

        /* ── Desktop layouts (≥992px) — unchanged ── */
        @media (min-width: 992px) {
          .flip-section {
            height: 100vh;
            min-height: 100vh;
          }

          .flip-container.final {
            flex-direction: row;
            gap: 0;
          }
          .flip-container.final .flip-card {
            flex-direction: row;
            gap: 1vmax;
            padding: 1.4vmax 2vmax;
            border-radius: 1.2vmax;
            margin: 0 0.5vmax;
          }
          .flip-container.final .flip-letter {
            font-size: clamp(3rem, 7.5vmax, 10rem);
          }
          .flip-container.final .flip-service-label {
            align-items: flex-start;
          }
          .flip-container.final .flip-service-label .svc-name {
            font-size: clamp(0.7rem, 1.6vmax, 2rem);
          }
          .flip-container.final .flip-service-label .svc-sub {
            font-size: clamp(0.5rem, 0.9vmax, 1rem);
          }

          .flip-container.plain {
            flex-direction: row;
            gap: 2vmax;
          }
          .flip-container.plain .flip-card {
            background: transparent !important;
            padding: 0.5vmax;
          }
          .flip-container.plain .flip-letter {
            font-size: clamp(5rem, 15vmax, 20rem);
            color: #FF6B00 !important;
            -webkit-text-stroke: 2px #FF6B00;
          }
          .flip-container.plain .flip-service-label {
            display: none;
          }

          .flip-container.columns {
            flex-direction: row;
            align-items: stretch;
          }
          .flip-container.columns .flip-card {
            flex: 1 1 25%;
            height: 100%;
            border-radius: 0;
            flex-direction: column;
            gap: 1.5vmax;
            padding: 2vmax;
          }
          .flip-container.columns .flip-letter {
            font-size: clamp(3.5rem, 9vmax, 12rem);
          }
          .flip-container.columns .flip-service-label .svc-name {
            font-size: clamp(0.65rem, 1.4vmax, 1.7rem);
          }
          .flip-container.columns .flip-service-label .svc-sub {
            font-size: clamp(0.45rem, 0.8vmax, 0.95rem);
          }

          .flip-container.grid {
            flex-wrap: wrap;
            align-content: stretch;
            align-items: stretch;
          }
          .flip-container.grid .flip-card {
            flex-basis: 50%;
            height: 50%;
            border-radius: 0;
            flex-direction: column;
            gap: 1.2vmax;
            padding: 2vmax;
          }
          .flip-container.grid .flip-letter {
            font-size: clamp(4rem, 10vmax, 13rem);
          }
          .flip-container.grid .flip-service-label .svc-name {
            font-size: clamp(0.75rem, 1.7vmax, 2rem);
          }
          .flip-container.grid .flip-service-label .svc-sub {
            font-size: clamp(0.5rem, 0.85vmax, 1rem);
          }
        }

        /* ── Mobile layouts (<992px) ── */
        @media (max-width: 991px) {
          .flip-container.final {
            flex-direction: column;
            flex-wrap: nowrap;
            align-content: stretch;
            align-items: stretch;
            padding: max(12px, env(safe-area-inset-top)) 16px max(12px, env(safe-area-inset-bottom));
            gap: 8px;
          }

          .flip-container.final .flip-card {
            flex: 1 1 0;
            min-height: 0;
            width: 100%;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            border-radius: 14px;
            padding: 0.75rem 1rem;
            gap: 0.85rem;
            margin: 0;
          }

          .flip-container.final .flip-letter {
            font-size: clamp(2rem, 9vw, 3rem);
            flex-shrink: 0;
          }

          .flip-container.final .flip-service-label {
            align-items: flex-start;
            min-width: 0;
          }

          .flip-container.final .flip-service-label .svc-name {
            font-size: clamp(0.68rem, 3vw, 0.88rem);
          }

          .flip-container.final .flip-service-label .svc-sub {
            font-size: clamp(0.5rem, 2.1vw, 0.62rem);
            letter-spacing: 0.06em;
          }

          .flip-container.plain {
            flex-wrap: wrap;
            align-content: center;
            align-items: center;
            padding: 16px;
            gap: 10px;
          }

          .flip-container.plain .flip-card {
            flex: 1 1 calc(50% - 10px);
            background: transparent !important;
            min-height: 0;
            height: calc(50% - 10px);
            padding: 0.5rem;
          }

          .flip-container.plain .flip-letter {
            font-size: clamp(2.5rem, 15vw, 4rem);
            color: #FF6B00 !important;
            -webkit-text-stroke: 1.5px #FF6B00;
          }

          .flip-container.plain .flip-service-label {
            display: none;
          }

          .flip-container.columns {
            flex-direction: column;
            flex-wrap: nowrap;
            align-items: stretch;
            padding: 0;
            gap: 0;
          }

          .flip-container.columns .flip-card {
            flex: 1 1 25%;
            width: 100%;
            min-height: 0;
            border-radius: 0;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            gap: 1rem;
            padding: 0.85rem 1.25rem;
          }

          .flip-container.columns .flip-letter {
            font-size: clamp(2.25rem, 10vw, 3.25rem);
            flex-shrink: 0;
          }

          .flip-container.columns .flip-service-label {
            align-items: flex-start;
            min-width: 0;
          }

          .flip-container.columns .flip-service-label .svc-name {
            font-size: clamp(0.68rem, 3vw, 0.88rem);
          }

          .flip-container.columns .flip-service-label .svc-sub {
            font-size: clamp(0.5rem, 2.1vw, 0.62rem);
          }

          .flip-container.grid {
            flex-wrap: wrap;
            align-content: stretch;
            align-items: stretch;
            padding: 0;
            gap: 0;
          }

          .flip-container.grid .flip-card {
            flex: 0 0 50%;
            width: 50%;
            height: 50%;
            min-height: 0;
            border-radius: 0;
            flex-direction: column;
            gap: 0.5rem;
            padding: 0.85rem 0.75rem;
          }

          .flip-container.grid .flip-letter {
            font-size: clamp(2.25rem, 11vw, 3.5rem);
          }

          .flip-container.grid .flip-service-label .svc-name {
            font-size: clamp(0.65rem, 2.8vw, 0.82rem);
          }

          .flip-container.grid .flip-service-label .svc-sub {
            font-size: clamp(0.48rem, 2vw, 0.6rem);
          }
        }

        @media (max-width: 420px) {
          .flip-container.final .flip-card,
          .flip-container.columns .flip-card {
            padding: 0.7rem 0.9rem;
            gap: 0.75rem;
          }

          .flip-container.final .flip-letter,
          .flip-container.columns .flip-letter {
            font-size: clamp(1.85rem, 8.5vw, 2.5rem);
          }

          .flip-container.plain .flip-letter {
            font-size: clamp(2.25rem, 14vw, 3.25rem);
          }

          .flip-container.grid .flip-card {
            padding: 0.65rem 0.5rem;
          }

          .flip-container.grid .flip-letter {
            font-size: clamp(2rem, 10vw, 2.75rem);
          }
        }
      `}</style>

      <div ref={containerRef} className="flip-container final">
        {SERVICES.map(({ letter, label, sublabel, bg, fg }) => (
          <div
            key={letter}
            className="flip-card"
            style={{ background: bg, color: fg }}
          >
            <div className="flip-letter">{letter}</div>
            <div className="flip-service-label">
              <span className="svc-name">{label}</span>
              <span className="svc-sub">{sublabel}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
