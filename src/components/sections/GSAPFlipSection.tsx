'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Flip } from 'gsap/Flip';

gsap.registerPlugin(ScrollTrigger, Flip);

/**
 * GSAPFlipSection — WDSC Services
 * Scroll-driven GSAP Flip animation across 4 layouts:
 *   0–25%   → "final"   : centered row, letter + service name + tagline
 *  25–50%   → "plain"   : giant letters only, transparent bg
 *  50–75%   → "columns" : 4 full-height columns with label
 *  75–100%  → "grid"    : 2×2 grid with label
 *
 * Color palette: white · black · orange (#FF6B00)
 */

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Step 1: mark client-mounted to avoid SSR hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  // Step 2: run GSAP only after mount
  useEffect(() => {
    if (!mounted) return;

    const section = sectionRef.current;
    const container = containerRef.current;
    if (!section || !container) return;

    const LAYOUTS = ['final', 'plain', 'columns', 'grid'];
    let curLayoutIdx = 0;

    const applyLayout = (nextIdx: number) => {
      if (nextIdx === curLayoutIdx) return;

      const state = Flip.getState('.flip-card, .flip-letter, .flip-service-label', {
        props: 'color,backgroundColor,opacity',
        simple: true,
      });

      container.classList.remove(LAYOUTS[curLayoutIdx]);
      curLayoutIdx = nextIdx;
      container.classList.add(LAYOUTS[curLayoutIdx]);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      Flip.from(state as any, {
        absolute: true,
        stagger: 0.07,
        duration: 0.7,
        ease: 'power3.inOut',
        spin: curLayoutIdx === 0,
        simple: true,
        _onEnter: (elements: any[], _index: number, animation: any) => gsap.fromTo(
          elements,
          { opacity: 0, scale: 0.85 },
          { opacity: 1, scale: 1, duration: 0.5, delay: animation?.duration?.() ?? 0.1 }
        ),
        get onEnter() {
          return this._onEnter;
        },
        set onEnter(value) {
          this._onEnter = value;
        },
        _onLeave: (elements: any[], _index: number) => gsap.to(elements, { opacity: 0, scale: 0.85, duration: 0.3 }),
        get onLeave() {
          return this._onLeave;
        },
        set onLeave(value) {
          this._onLeave = value;
        },
      });
    };

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=2400',
        pin: true,
        pinSpacing: true,
        onUpdate: (self) => {
          const p = self.progress;
          let targetIdx = 0;
          if (p < 0.25) targetIdx = 0;
          else if (p < 0.5) targetIdx = 1;
          else if (p < 0.75) targetIdx = 2;
          else targetIdx = 3;
          applyLayout(targetIdx);
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  // SSR / pre-hydration placeholder — must match exactly what server renders
  if (!mounted) {
    return <section className="w-full h-screen bg-black" />;
  }

  return (
    <section
      ref={sectionRef}
      className="w-full h-screen bg-black overflow-hidden relative z-10 select-none"
    >
      <style>{`
        /* ── Base container ──────────────────────────────────── */
        .flip-container {
          display: flex;
          width: 100%;
          height: 100%;
          justify-content: center;
          align-items: center;
          overflow: hidden;
        }

        /* ── Shared card ─────────────────────────────────────── */
        .flip-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          position: relative;
          transition: background 0.4s;
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

        /* ── FINAL layout — row, card per service ────────────── */
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

        /* ── PLAIN layout — giant letters, no bg ─────────────── */
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

        /* ── COLUMNS layout — 4 equal full-height columns ────── */
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
        .flip-container.columns .flip-service-label {
          display: flex;
          align-items: center;
        }
        .flip-container.columns .flip-service-label .svc-name {
          font-size: clamp(0.65rem, 1.4vmax, 1.7rem);
        }
        .flip-container.columns .flip-service-label .svc-sub {
          font-size: clamp(0.45rem, 0.8vmax, 0.95rem);
        }

        /* ── GRID layout — 2×2 ───────────────────────────────── */
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
        .flip-container.grid .flip-service-label {
          display: flex;
          align-items: center;
        }
        .flip-container.grid .flip-service-label .svc-name {
          font-size: clamp(0.75rem, 1.7vmax, 2rem);
        }
        .flip-container.grid .flip-service-label .svc-sub {
          font-size: clamp(0.5rem, 0.85vmax, 1rem);
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
