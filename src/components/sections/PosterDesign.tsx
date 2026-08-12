'use client';

import { useEffect, useRef, useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';

// High-resolution local poster & editorial artwork images
const POSTER_IMAGES = [
  '/images/poster-5.png',
  '/images/poster-1.png',
  '/images/poster-2.png',
  '/images/poster-3.jpg',
  '/images/poster-4.png',
  '/images/editorial_1.png',
];

const SCENE_DATA = [
  {
    id: 's0',
    tag: 'Cube Gallery — Bad Art',
    title: ['WORK', 'AGAINST', 'THE MODEL'],
    body: 'What happens when you ask AI to do the opposite of what it was built for? Break proportion. Flip symmetry. Leave the mistakes in place. Scroll to find out.',
    ctaNext: { label: 'Enter', targetIdx: 1 },
    ctaBack: null,
    align: 'left',
    faceName: 'DESCENT',
  },
  {
    id: 's1',
    tag: '01 — Art Rebellion',
    title: ['FLIP', 'THE', 'PROMPT'],
    body: 'A cow walking a monster instead of a monster walking a cow. That inversion is enough to break template thinking. The cape ends up on the wrong body.',
    ctaNext: { label: 'Turn', targetIdx: 2 },
    ctaBack: { label: 'Back', targetIdx: 0 },
    align: 'right',
    faceName: 'REBELLION',
  },
  {
    id: 's2',
    tag: '02 — Moo Walk',
    title: ['NEITHER', 'LEADS'],
    body: 'Clashing colors. No balance. A dance with no choreography. When the model works against itself something more genuine surfaces.',
    ctaNext: { label: 'Turn', targetIdx: 3 },
    ctaBack: { label: 'Back', targetIdx: 1 },
    align: 'left',
    faceName: 'MOO WALK',
  },
  {
    id: 's3',
    tag: '03 — Bad Art',
    title: ['REVERSE', 'CREATIVITY'],
    body: 'AI is trained to polish and regularize. The harder direction is unlearning that. A television for a head is not an error. It is the point.',
    stats: [
      { num: '6', label: 'Works' },
      { num: '360', label: 'Degrees' },
      { num: '1', label: 'Object' },
    ],
    ctaNext: { label: 'Turn', targetIdx: 4 },
    ctaBack: { label: 'Back', targetIdx: 2 },
    align: 'right',
    faceName: 'BAD ART',
  },
  {
    id: 's4',
    tag: '04 — No Rules',
    title: ['NONSENSE', 'AT THE', 'CENTER'],
    body: 'Dada and the surrealists knew this. Put the absurd at the center and the edges stop pretending. Nine heads in the branches. The sun has a face and it approves.',
    ctaNext: { label: 'Turn', targetIdx: 5 },
    ctaBack: { label: 'Back', targetIdx: 3 },
    align: 'left',
    faceName: 'NO RULES',
  },
  {
    id: 's5',
    tag: '05 — Super Monsters',
    title: ['RAW', 'NOT', 'POLISHED'],
    body: 'Forward creativity takes a sketch and makes it real. This goes the other way. Imperfection left in place is closer to something honest.',
    ctaNext: { label: 'Begin again', targetIdx: 0 },
    ctaBack: { label: 'Back', targetIdx: 4 },
    align: 'right',
    faceName: 'SUPER',
  },
];

const STOPS = [
  { rx: 90, ry: 0 },      // Top
  { rx: 0, ry: 0 },       // Front
  { rx: 0, ry: -90 },     // Right
  { rx: 0, ry: -180 },    // Back
  { rx: 0, ry: -270 },    // Left
  { rx: -90, ry: -360 },  // Bottom
];

// Easing function for smooth rotation interpolation between stops
const easeIO = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

export default function PosterDesign() {
  const [mounted, setMounted] = useState(false);
  const [activeTheme, setActiveTheme] = useState<'dark' | 'light'>('dark');
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const [progressPct, setProgressPct] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const cubeRef = useRef<HTMLDivElement>(null);
  const triggerInstanceRef = useRef<any>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Theme toggle helper
  const toggleTheme = () => {
    setActiveTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // GSAP ScrollTrigger Pinned Scrub Animation Setup
  useEffect(() => {
    if (!mounted || !containerRef.current || !cubeRef.current) return;

    let ctx: { revert: () => void } | null = null;

    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const totalScenes = SCENE_DATA.length;

          // Pinned ScrollTrigger driving 3D Cube rotation & HUD progress
          triggerInstanceRef.current = ScrollTrigger.create({
            trigger: containerRef.current,
            start: 'top top',
            end: () => `+=${window.innerHeight * 4}`, // 400vh scroll height for smooth pacing
            pin: true,
            scrub: 0.6,
            onUpdate: (self) => {
              const p = self.progress;
              const pct = Math.round(p * 100);
              setProgressPct(pct);

              // Calculate interpolated rotation angles (rx, ry)
              const t = p * (totalScenes - 1);
              const i = Math.min(Math.floor(t), totalScenes - 2);
              const f = easeIO(t - i);

              const a = STOPS[i];
              const b = STOPS[i + 1];

              const rx = a.rx + (b.rx - a.rx) * f;
              const ry = a.ry + (b.ry - a.ry) * f;

              if (cubeRef.current) {
                cubeRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
              }

              // Update active scene index
              const currentIdx = Math.min(
                Math.floor(p * totalScenes + 0.1),
                totalScenes - 1
              );
              setActiveSceneIdx(currentIdx);
            },
          });
        }, containerRef);
      });
    });

    return () => ctx?.revert();
  }, [mounted]);

  // Smooth scroll to specific scene index within pinned container
  const scrollToScene = (idx: number) => {
    if (!triggerInstanceRef.current) return;
    const st = triggerInstanceRef.current;
    const targetProgress = idx / (SCENE_DATA.length - 1);
    const targetY = st.start + targetProgress * (st.end - st.start);

    window.scrollTo({
      top: targetY,
      behavior: 'smooth',
    });
  };

  if (!mounted) {
    return <section id="poster-design-section" className="min-h-screen bg-[#1c1814]" />;
  }

  const currentScene = SCENE_DATA[activeSceneIdx];

  return (
    <div
      id="poster-design-section"
      className="poster-cube-gallery-wrapper relative text-[#ede8df] select-none font-mono"
      data-theme={activeTheme}
    >
      <style>{`
        /* ── Design System & CSS Variables ── */
        .poster-cube-gallery-wrapper {
          --dark-bg: #1c1814;
          --dark-fg: #ede8df;
          --dark-muted: #8a7b6e;
          --light-bg: #f0ece3;
          --light-fg: #0d0d14;
          --light-muted: #9a9aaa;
          --accent-dark: #FF6B00;
          --accent-light: #d95a00;

          --bg: var(--dark-bg);
          --fg: var(--dark-fg);
          --muted: var(--dark-muted);
          --accent: var(--accent-dark);

          --font-display: 'Bebas Neue', sans-serif, system-ui;
          --font-mono: 'DM Mono', monospace, sans-serif;
          --hairline: 1px;
          --ui-inset: 2rem;
          --card-bg: rgba(28, 24, 20, 0.86);
          --card-border: rgba(255, 107, 0, 0.25);
          --z-ui: 20;
          
          background-color: var(--bg);
          color: var(--fg);
          transition: background-color 0.4s ease, color 0.4s ease;
        }

        .poster-cube-gallery-wrapper[data-theme="light"] {
          --bg: var(--light-bg);
          --fg: var(--light-fg);
          --muted: var(--light-muted);
          --accent: var(--accent-light);
          --card-bg: rgba(240, 236, 227, 0.92);
          --card-border: rgba(217, 90, 0, 0.22);
        }

        /* ── 3D Scene Viewport ── */
        .pcg-pinned-stage {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pcg-scene {
          position: absolute;
          inset: 0;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1100px;
          pointer-events: none;
        }

        /* ── 3D Cube Element ── */
        .pcg-cube {
          --s: min(68vw, 68vh, 480px);
          width: var(--s);
          height: var(--s);
          position: relative;
          transform-style: preserve-3d;
          transform: rotateX(90deg) rotateY(0deg);
          will-change: transform;
          transition: transform 0.1s linear;
        }

        .pcg-face {
          position: absolute;
          inset: 0;
          overflow: hidden;
          backface-visibility: hidden;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background: repeating-linear-gradient(
              0deg,
              rgba(255, 255, 255, 0.02) 0,
              rgba(255, 255, 255, 0.02) 1px,
              transparent 1px,
              transparent 48px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(255, 255, 255, 0.02) 0,
              rgba(255, 255, 255, 0.02) 1px,
              transparent 1px,
              transparent 48px
            ),
            #14100d;
          box-shadow: inset 0 0 30px rgba(0,0,0,0.6);
        }

        .poster-cube-gallery-wrapper[data-theme="light"] .pcg-face {
          background: repeating-linear-gradient(
              0deg,
              rgba(0, 0, 0, 0.04) 0,
              rgba(0, 0, 0, 0.04) 1px,
              transparent 1px,
              transparent 48px
            ),
            repeating-linear-gradient(
              90deg,
              rgba(0, 0, 0, 0.04) 0,
              rgba(0, 0, 0, 0.04) 1px,
              transparent 1px,
              transparent 48px
            ),
            #ddd8cf;
        }

        .pcg-face img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }

        .pcg-face-ph {
          position: absolute;
          bottom: 1.5rem;
          left: 1.75rem;
          font-family: var(--font-display);
          font-size: clamp(2rem, 8vw, 5rem);
          letter-spacing: 0.04em;
          color: rgba(255, 255, 255, 0.12);
          pointer-events: none;
          user-select: none;
        }

        .poster-cube-gallery-wrapper[data-theme="light"] .pcg-face-ph {
          color: rgba(0, 0, 0, 0.12);
        }

        .pcg-face[data-face="front"]  { transform: translateZ(calc(var(--s) / 2)); }
        .pcg-face[data-face="back"]   { transform: rotateY(180deg) translateZ(calc(var(--s) / 2)); }
        .pcg-face[data-face="right"]  { transform: rotateY(90deg) translateZ(calc(var(--s) / 2)); }
        .pcg-face[data-face="left"]   { transform: rotateY(-90deg) translateZ(calc(var(--s) / 2)); }
        .pcg-face[data-face="top"]    { transform: rotateX(-90deg) translateZ(calc(var(--s) / 2)); }
        .pcg-face[data-face="bottom"] { transform: rotateX(90deg) translateZ(calc(var(--s) / 2)); }

        /* ── Floating Text Cards ── */
        .pcg-text-card {
          position: relative;
          z-index: 10;
          max-width: 25rem;
          width: 100%;
          padding: 2.25rem 2rem;
          background: var(--card-bg);
          border-left: 2px solid var(--accent);
          backdrop-filter: blur(12px) saturate(130%);
          -webkit-backdrop-filter: blur(12px) saturate(130%);
          border-radius: 4px;
          box-shadow: 0 20px 40px rgba(0,0,0,0.4);
          transition: background 0.3s ease, border-color 0.3s ease;
        }

        .pcg-text-card.right {
          margin-inline-start: auto;
          border-left: none;
          border-right: 2px solid var(--accent);
          text-align: right;
        }

        .pcg-tag {
          font-size: 0.65rem;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 1.1rem;
          font-weight: 700;
        }

        .pcg-title {
          font-family: var(--font-display);
          font-weight: 400;
          letter-spacing: 0.03em;
          line-height: 0.92;
          font-size: clamp(2.5rem, 6vw, 4.8rem);
          margin-bottom: 1rem;
        }

        .pcg-body {
          font-size: 0.8rem;
          line-height: 1.75;
          color: color-mix(in srgb, var(--fg) 80%, transparent);
          margin-top: 1rem;
        }

        .pcg-stat-row {
          display: flex;
          gap: 2rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }

        .pcg-text-card.right .pcg-stat-row {
          justify-content: flex-end;
        }

        .pcg-stat {
          display: flex;
          flex-direction: column;
          gap: 0.15rem;
        }

        .pcg-stat-num {
          font-family: var(--font-display);
          font-size: 2rem;
          color: var(--accent);
          line-height: 1;
        }

        .pcg-stat-label {
          font-size: 0.58rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          color: var(--muted);
        }

        .pcg-cta-row {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          margin-top: 1.75rem;
        }

        .pcg-text-card.right .pcg-cta-row {
          justify-content: flex-end;
        }

        .pcg-cta {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.65rem 1.35rem;
          border: 1px solid var(--accent);
          color: var(--accent);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          background: transparent;
          cursor: pointer;
          border-radius: 2px;
          transition: background 0.2s, color 0.2s, transform 0.2s;
        }

        .pcg-cta:hover {
          background: var(--accent);
          color: #ffffff;
          transform: translateY(-1px);
        }

        .pcg-cta-back {
          display: inline-flex;
          align-items: center;
          gap: 0.6rem;
          padding: 0.65rem 1.35rem;
          border: 1px solid color-mix(in srgb, var(--muted) 45%, transparent);
          color: var(--muted);
          font-family: var(--font-mono);
          font-size: 0.65rem;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          background: transparent;
          cursor: pointer;
          border-radius: 2px;
          transition: background 0.2s, color 0.2s, border-color 0.2s;
        }

        .pcg-cta-back:hover {
          background: color-mix(in srgb, var(--muted) 15%, transparent);
          border-color: var(--muted);
          color: var(--fg);
        }

        /* ── HUD Overlay Elements ── */
        .pcg-hud {
          position: absolute;
          top: var(--ui-inset);
          right: var(--ui-inset);
          z-index: var(--z-ui);
          text-align: right;
          font-size: 0.68rem;
          letter-spacing: 0.15em;
          color: var(--muted);
          text-transform: uppercase;
        }

        .pcg-progress-bar {
          width: 7.5rem;
          height: 2px;
          background: color-mix(in srgb, var(--muted) 30%, transparent);
          margin-top: 0.5rem;
          margin-left: auto;
          position: relative;
          overflow: hidden;
        }

        .pcg-progress-fill {
          position: absolute;
          inset: 0;
          width: 0%;
          background: var(--accent);
          transition: width 0.1s linear;
        }

        .pcg-scene-label {
          font-size: 0.65rem;
          color: var(--accent);
          margin-top: 0.4rem;
          font-weight: 700;
        }

        .pcg-scene-strip {
          position: absolute;
          left: var(--ui-inset);
          top: 50%;
          transform: translateY(-50%);
          z-index: var(--z-ui);
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
        }

        .pcg-scene-dot {
          width: 0.35rem;
          height: 0.35rem;
          border-radius: 50%;
          background: var(--muted);
          transition: background 0.3s, transform 0.3s;
          cursor: pointer;
          border: none;
          padding: 0;
        }

        .pcg-scene-dot.active {
          background: var(--accent);
          transform: scale(1.8);
        }

        .pcg-theme-toggle {
          position: absolute;
          bottom: var(--ui-inset);
          left: var(--ui-inset);
          z-index: var(--z-ui);
          width: 2.5rem;
          height: 2.5rem;
          border: 1px solid color-mix(in srgb, var(--muted) 35%, transparent);
          background: color-mix(in srgb, var(--muted) 15%, transparent);
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background 0.3s, border-color 0.3s;
          color: var(--accent);
        }

        .pcg-theme-toggle:hover {
          background: color-mix(in srgb, var(--muted) 30%, transparent);
        }

        .pcg-face-caption {
          position: absolute;
          bottom: var(--ui-inset);
          left: 50%;
          transform: translateX(-50%);
          z-index: var(--z-ui);
          text-align: center;
          pointer-events: none;
          user-select: none;
        }

        .pcg-face-caption-num {
          font-size: 0.6rem;
          letter-spacing: 0.28em;
          color: var(--accent);
          text-transform: uppercase;
          margin-bottom: 0.15rem;
          font-weight: 700;
        }

        .pcg-face-caption-name {
          font-family: var(--font-display);
          font-size: clamp(1.8rem, 5vw, 3.5rem);
          letter-spacing: 0.08em;
          color: var(--muted);
          opacity: 0.6;
          line-height: 1;
        }

        .pcg-credit {
          position: absolute;
          right: var(--ui-inset);
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          transform-origin: right center;
          z-index: var(--z-ui);
          font-size: 0.65rem;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }

        .pcg-credit a {
          color: var(--muted);
          text-decoration: none;
          transition: color 0.2s;
        }

        .pcg-credit a:hover {
          color: var(--accent);
        }

        @media (max-width: 900px) {
          .pcg-scene-strip {
            display: none;
          }
          .pcg-credit {
            display: none;
          }
          .pcg-text-card {
            max-width: 100%;
            padding: 1.5rem 1.25rem;
          }
        }
      `}</style>

      {/* Section Header */}
      <div className="pt-12 pb-4 w-full max-w-[1140px] mx-auto px-4 sm:px-6 relative z-20">
        <SectionHeading title="POSTER & VISUAL DESIGN" theme="dark" />
      </div>

      {/* Main Pinned Container */}
      <div ref={containerRef} className="pcg-pinned-stage">
        {/* HUD Stats & Progress Bar */}
        <div className="pcg-hud">
          <div>{String(progressPct).padStart(3, '0')}%</div>
          <div className="pcg-progress-bar">
            <div
              className="pcg-progress-fill"
              style={{ width: `${progressPct}%` }}
            />
          </div>
          <div className="pcg-scene-label">{currentScene.faceName}</div>
        </div>

        {/* Vertical Dot Navigation Strip */}
        <div className="pcg-scene-strip">
          {SCENE_DATA.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => scrollToScene(idx)}
              aria-label={`Jump to scene ${idx + 1}`}
              className={`pcg-scene-dot ${activeSceneIdx === idx ? 'active' : ''}`}
            />
          ))}
        </div>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="pcg-theme-toggle"
          aria-label="Toggle light/dark mode"
        >
          {activeTheme === 'dark' ? (
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.5]">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current stroke-[1.5]">
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
            </svg>
          )}
        </button>

        {/* Central 3D Cube Scene */}
        <div className="pcg-scene">
          <div ref={cubeRef} className="pcg-cube">
            {/* Top Face (0) */}
            <div className="pcg-face" data-face="top">
              <img src={POSTER_IMAGES[0]} alt="Top Face Poster" />
              <span className="pcg-face-ph">TOP</span>
            </div>
            {/* Front Face (1) */}
            <div className="pcg-face" data-face="front">
              <img src={POSTER_IMAGES[1]} alt="Front Face Poster" />
              <span className="pcg-face-ph">FRONT</span>
            </div>
            {/* Right Face (2) */}
            <div className="pcg-face" data-face="right">
              <img src={POSTER_IMAGES[2]} alt="Right Face Poster" />
              <span className="pcg-face-ph">RIGHT</span>
            </div>
            {/* Back Face (3) */}
            <div className="pcg-face" data-face="back">
              <img src={POSTER_IMAGES[3]} alt="Back Face Poster" />
              <span className="pcg-face-ph">BACK</span>
            </div>
            {/* Left Face (4) */}
            <div className="pcg-face" data-face="left">
              <img src={POSTER_IMAGES[4]} alt="Left Face Poster" />
              <span className="pcg-face-ph">LEFT</span>
            </div>
            {/* Bottom Face (5) */}
            <div className="pcg-face" data-face="bottom">
              <img src={POSTER_IMAGES[5]} alt="Bottom Face Poster" />
              <span className="pcg-face-ph">BOTTOM</span>
            </div>
          </div>
        </div>

        {/* Dynamic Floating Text Card */}
        <div className="w-full max-w-[1140px] mx-auto px-4 sm:px-6 relative z-10">
          <div
            className={`pcg-text-card ${
              currentScene.align === 'right' ? 'right' : ''
            }`}
          >
            <div className="pcg-tag">{currentScene.tag}</div>

            <h2 className="pcg-title">
              {currentScene.title.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </h2>

            <p className="pcg-body">{currentScene.body}</p>

            {currentScene.stats && (
              <div className="pcg-stat-row">
                {currentScene.stats.map((stat, i) => (
                  <div key={i} className="pcg-stat">
                    <span className="pcg-stat-num">{stat.num}</span>
                    <span className="pcg-stat-label">{stat.label}</span>
                  </div>
                ))}
              </div>
            )}

            <div className="pcg-cta-row">
              {currentScene.ctaBack && (
                <button
                  onClick={() => scrollToScene(currentScene.ctaBack!.targetIdx)}
                  className="pcg-cta-back"
                >
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M11 6H1M6 11L1 6l5-5" />
                  </svg>
                  {currentScene.ctaBack.label}
                </button>
              )}

              {currentScene.ctaNext && (
                <button
                  onClick={() => scrollToScene(currentScene.ctaNext!.targetIdx)}
                  className="pcg-cta"
                >
                  {currentScene.ctaNext.label}
                  <svg
                    className="w-3 h-3"
                    viewBox="0 0 12 12"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path d="M1 6h10M6 1l5 5-5 5" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Face Caption */}
        <div className="pcg-face-caption">
          <div className="pcg-face-caption-num">
            {String(activeSceneIdx + 1).padStart(2, '0')}
          </div>
          <div className="pcg-face-caption-name">{currentScene.faceName}</div>
        </div>

        {/* Credit Link */}
        <div className="pcg-credit">
          <a
            href="https://www.linkedin.com/posts/luis-martinez-lr_ai-creativity-reversecreativity-activity-7366853269517651970-zeUD"
            target="_blank"
            rel="noopener noreferrer"
          >
            Reverse Creativity
          </a>
        </div>
      </div>
    </div>
  );
}
