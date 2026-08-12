'use client';

import { useEffect, useRef, useState } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

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

// Rotation stops for each scene face
const STOPS = [
  { rx: 90,  ry: 0 },      // Top
  { rx: 0,   ry: 0 },      // Front
  { rx: 0,   ry: -90 },    // Right
  { rx: 0,   ry: -180 },   // Back
  { rx: 0,   ry: -270 },   // Left
  { rx: -90, ry: -360 },   // Bottom
];

const easeIO = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

export default function PosterDesign() {
  const [mounted, setMounted]         = useState(false);
  const [activeTheme, setActiveTheme] = useState<'dark' | 'light'>('dark');
  const [activeSceneIdx, setActiveSceneIdx] = useState(0);
  const [progressPct, setProgressPct] = useState(0);

  // outerRef  → the full scrollable section wrapper (trigger + pin target)
  // stageRef  → the 100 vh visual stage that gets pinned by GSAP
  // cubeRef   → the 3-D cube element that GSAP rotates
  const outerRef   = useRef<HTMLDivElement>(null);
  const stageRef   = useRef<HTMLDivElement>(null);
  const cubeRef    = useRef<HTMLDivElement>(null);
  const textCardRef = useRef<HTMLDivElement>(null);
  const stInstance = useRef<ScrollTrigger | null>(null);

  useEffect(() => { setMounted(true); }, []);

  // ── GSAP: pin the stage, drive cube rotation + HUD on scroll ──
  useEffect(() => {
    if (!mounted || !outerRef.current || !stageRef.current || !cubeRef.current) return;

    const totalScenes = SCENE_DATA.length;
    // Each section occupies one viewport height of scroll
    const scrollLength = window.innerHeight * (totalScenes - 1);

    const ctx = gsap.context(() => {
      stInstance.current = ScrollTrigger.create({
        trigger: outerRef.current,
        start:   'top top',
        end:     `+=${scrollLength}`,
        pin:     stageRef.current,   // only pin the visual stage, not the heading
        pinSpacing: true,
        scrub:   0.6,
        onUpdate: (self) => {
          const p   = self.progress;
          const pct = Math.round(p * 100);
          setProgressPct(pct);

          // Interpolate rotation between adjacent stops
          const t = p * (totalScenes - 1);
          const i = Math.min(Math.floor(t), totalScenes - 2);
          const f = easeIO(t - i);

          const a  = STOPS[i];
          const b  = STOPS[i + 1];
          const rx = a.rx + (b.rx - a.rx) * f;
          const ry = a.ry + (b.ry - a.ry) * f;

          if (cubeRef.current) {
            cubeRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
          }

          // Scene index — slight offset so text updates just before face is centred
          const idx = Math.min(Math.round(p * (totalScenes - 1)), totalScenes - 1);
          setActiveSceneIdx(idx);
        },
      });
    }, outerRef);

    return () => ctx.revert();
  }, [mounted]);

  // ── Navigate to a specific scene by scrolling ──
  const scrollToScene = (idx: number) => {
    if (!stInstance.current) return;
    const st            = stInstance.current;
    const targetProgress = idx / (SCENE_DATA.length - 1);
    // st.start / st.end are scroll-y pixel values
    const targetY        = st.start + targetProgress * (st.end - st.start);
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  // GSAP text card cross-fade when scene changes
  useEffect(() => {
    if (!textCardRef.current) return;
    gsap.fromTo(
      textCardRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.45, ease: 'power2.out' }
    );
  }, [activeSceneIdx]);

  if (!mounted) {
    return <section id="poster-design-section" className="min-h-screen bg-[#1c1814]" />;
  }

  const currentScene = SCENE_DATA[activeSceneIdx];

  return (
    <div
      id="poster-design-section"
      ref={outerRef}
      className="pcg-wrapper relative font-mono select-none"
      data-theme={activeTheme}
    >
      <style>{`
        /* ── Design Tokens ── */
        .pcg-wrapper {
          --dark-bg:     #1c1814;
          --dark-fg:     #ede8df;
          --dark-muted:  #8a7b6e;
          --light-bg:    #f0ece3;
          --light-fg:    #0d0d14;
          --light-muted: #9a9aaa;
          --accent-dark: #FF6B00;
          --accent-lt:   #d95a00;

          --bg:     var(--dark-bg);
          --fg:     var(--dark-fg);
          --muted:  var(--dark-muted);
          --accent: var(--accent-dark);

          --font-display: 'Bebas Neue', sans-serif;
          --font-mono:    'DM Mono', monospace;
          --ui-inset:     2rem;
          --card-bg:      rgba(28, 24, 20, 0.88);
          --card-border:  rgba(255, 107, 0, 0.28);
          --z-ui: 20;

          background-color: var(--bg);
          color:            var(--fg);
          transition: background-color 0.4s ease, color 0.4s ease;
        }
        .pcg-wrapper[data-theme="light"] {
          --bg:          var(--light-bg);
          --fg:          var(--light-fg);
          --muted:       var(--light-muted);
          --accent:      var(--accent-lt);
          --card-bg:     rgba(240, 236, 227, 0.94);
          --card-border: rgba(217, 90, 0, 0.22);
        }

        /* ── Section header row ── */
        .pcg-header {
          position: relative;
          z-index: 30;
          padding: 3rem 0 1rem;
          width: 100%;
          max-width: 1140px;
          margin: 0 auto;
          padding-left: clamp(1rem, 4vw, 2rem);
          padding-right: clamp(1rem, 4vw, 2rem);
          background: var(--bg);   /* ensure header is NOT transparent over cube */
        }

        /* ── Pinned visual stage ── */
        .pcg-stage {
          position: relative;
          width: 100%;
          height: 100vh;
          overflow: hidden;
          background: var(--bg);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* ── 3-D perspective layer (fills stage, pointer-events off) ── */
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

        /* ── Cube ── */
        .pcg-cube {
          --s: min(62vw, 62vh, 460px);
          width:  var(--s);
          height: var(--s);
          position: relative;
          transform-style: preserve-3d;
          transform: rotateX(90deg) rotateY(0deg);
          will-change: transform;
        }

        .pcg-face {
          position: absolute;
          inset: 0;
          overflow: hidden;
          backface-visibility: hidden;
          border-radius: 12px;
          border: 1px solid rgba(255,255,255,0.08);
          background:
            repeating-linear-gradient(0deg,   rgba(255,255,255,.02) 0, rgba(255,255,255,.02) 1px, transparent 1px, transparent 48px),
            repeating-linear-gradient(90deg,  rgba(255,255,255,.02) 0, rgba(255,255,255,.02) 1px, transparent 1px, transparent 48px),
            #14100d;
          box-shadow: inset 0 0 30px rgba(0,0,0,.6);
        }
        .pcg-wrapper[data-theme="light"] .pcg-face {
          background:
            repeating-linear-gradient(0deg,  rgba(0,0,0,.04) 0, rgba(0,0,0,.04) 1px, transparent 1px, transparent 48px),
            repeating-linear-gradient(90deg, rgba(0,0,0,.04) 0, rgba(0,0,0,.04) 1px, transparent 1px, transparent 48px),
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
          letter-spacing: .04em;
          color: rgba(255,255,255,.1);
          pointer-events: none;
          user-select: none;
        }
        .pcg-wrapper[data-theme="light"] .pcg-face-ph {
          color: rgba(0,0,0,.1);
        }
        /* Face transforms */
        .pcg-face[data-face="front"]  { transform: translateZ(calc(var(--s)/2)); }
        .pcg-face[data-face="back"]   { transform: rotateY(180deg)  translateZ(calc(var(--s)/2)); }
        .pcg-face[data-face="right"]  { transform: rotateY(90deg)   translateZ(calc(var(--s)/2)); }
        .pcg-face[data-face="left"]   { transform: rotateY(-90deg)  translateZ(calc(var(--s)/2)); }
        .pcg-face[data-face="top"]    { transform: rotateX(-90deg)  translateZ(calc(var(--s)/2)); }
        .pcg-face[data-face="bottom"] { transform: rotateX(90deg)   translateZ(calc(var(--s)/2)); }

        /* ── Text card — absolutely positioned over the cube ── */
        .pcg-ui-layer {
          position: absolute;
          inset: 0;
          z-index: 10;
          display: flex;
          align-items: center;
          padding: 0 clamp(1rem, 5vw, 3rem);
          pointer-events: none;
        }

        .pcg-text-card {
          max-width: 24rem;
          width: 100%;
          padding: 2.25rem 2rem;
          background: var(--card-bg);
          border-left: 2px solid var(--accent);
          backdrop-filter: blur(14px) saturate(140%);
          -webkit-backdrop-filter: blur(14px) saturate(140%);
          border-radius: 4px;
          box-shadow: 0 24px 48px rgba(0,0,0,.45);
          pointer-events: all;
          transition: background .3s ease, border-color .3s ease;
        }
        .pcg-text-card.right {
          margin-inline-start: auto;
          border-left: none;
          border-right: 2px solid var(--accent);
          text-align: right;
        }

        .pcg-tag {
          font-size: .65rem;
          letter-spacing: .25em;
          text-transform: uppercase;
          color: var(--accent);
          margin-bottom: 1rem;
          font-weight: 700;
        }
        .pcg-title {
          font-family: var(--font-display);
          font-weight: 400;
          letter-spacing: .03em;
          line-height: .92;
          font-size: clamp(2.5rem, 6vw, 4.8rem);
          margin-bottom: 1rem;
        }
        .pcg-body {
          font-size: .8rem;
          line-height: 1.75;
          color: color-mix(in srgb, var(--fg) 75%, transparent);
          margin-top: .75rem;
        }
        .pcg-stat-row {
          display: flex;
          gap: 2rem;
          margin-top: 1.5rem;
          flex-wrap: wrap;
        }
        .pcg-text-card.right .pcg-stat-row { justify-content: flex-end; }
        .pcg-stat        { display: flex; flex-direction: column; gap: .15rem; }
        .pcg-stat-num    { font-family: var(--font-display); font-size: 2rem; color: var(--accent); line-height: 1; }
        .pcg-stat-label  { font-size: .58rem; letter-spacing: .2em; text-transform: uppercase; color: var(--muted); }

        .pcg-cta-row { display: flex; align-items: center; gap: .75rem; margin-top: 1.75rem; }
        .pcg-text-card.right .pcg-cta-row { justify-content: flex-end; }

        .pcg-cta {
          display: inline-flex; align-items: center; gap: .6rem;
          padding: .65rem 1.35rem;
          border: 1px solid var(--accent);
          color: var(--accent);
          font-family: var(--font-mono);
          font-size: .65rem;
          letter-spacing: .18em;
          text-transform: uppercase;
          background: transparent;
          cursor: pointer;
          border-radius: 2px;
          transition: background .2s, color .2s, transform .2s;
        }
        .pcg-cta:hover { background: var(--accent); color: #fff; transform: translateY(-2px); }

        .pcg-cta-back {
          display: inline-flex; align-items: center; gap: .6rem;
          padding: .65rem 1.35rem;
          border: 1px solid color-mix(in srgb, var(--muted) 45%, transparent);
          color: var(--muted);
          font-family: var(--font-mono);
          font-size: .65rem;
          letter-spacing: .18em;
          text-transform: uppercase;
          background: transparent;
          cursor: pointer;
          border-radius: 2px;
          transition: background .2s, color .2s, border-color .2s;
        }
        .pcg-cta-back:hover {
          background: color-mix(in srgb, var(--muted) 15%, transparent);
          border-color: var(--muted);
          color: var(--fg);
        }

        /* ── HUD ── */
        .pcg-hud {
          position: absolute;
          top: var(--ui-inset);
          right: var(--ui-inset);
          z-index: var(--z-ui);
          text-align: right;
          font-size: .68rem;
          letter-spacing: .15em;
          color: var(--muted);
          text-transform: uppercase;
          pointer-events: none;
        }
        .pcg-progress-bar {
          width: 7.5rem;
          height: 2px;
          background: color-mix(in srgb, var(--muted) 28%, transparent);
          margin-top: .5rem;
          margin-left: auto;
          position: relative;
          overflow: hidden;
        }
        .pcg-progress-fill {
          position: absolute;
          inset: 0;
          background: var(--accent);
          transition: width .1s linear;
        }
        .pcg-scene-label { font-size: .65rem; color: var(--accent); margin-top: .4rem; font-weight: 700; }

        /* ── Dot nav strip ── */
        .pcg-dot-strip {
          position: absolute;
          left: var(--ui-inset);
          top: 50%;
          transform: translateY(-50%);
          z-index: var(--z-ui);
          display: flex;
          flex-direction: column;
          gap: .85rem;
          pointer-events: all;
        }
        .pcg-dot {
          width: .35rem; height: .35rem;
          border-radius: 50%;
          background: var(--muted);
          border: none; padding: 0;
          cursor: pointer;
          transition: background .3s, transform .3s;
        }
        .pcg-dot.active { background: var(--accent); transform: scale(1.9); }

        /* ── Theme toggle ── */
        .pcg-theme-btn {
          position: absolute;
          bottom: var(--ui-inset);
          left: var(--ui-inset);
          z-index: var(--z-ui);
          width: 2.5rem; height: 2.5rem;
          border: 1px solid color-mix(in srgb, var(--muted) 35%, transparent);
          background: color-mix(in srgb, var(--muted) 15%, transparent);
          border-radius: 50%;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: background .3s, border-color .3s;
          color: var(--accent);
        }
        .pcg-theme-btn:hover { background: color-mix(in srgb, var(--muted) 30%, transparent); }

        /* ── Bottom face caption ── */
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
        .pcg-caption-num  { font-size: .6rem; letter-spacing: .28em; color: var(--accent); text-transform: uppercase; margin-bottom: .15rem; font-weight: 700; }
        .pcg-caption-name { font-family: var(--font-display); font-size: clamp(1.8rem, 5vw, 3.2rem); letter-spacing: .08em; color: var(--muted); opacity: .55; line-height: 1; }

        /* ── Credit ── */
        .pcg-credit {
          position: absolute;
          right: var(--ui-inset);
          top: 50%;
          transform: translateY(-50%) rotate(-90deg);
          transform-origin: right center;
          z-index: var(--z-ui);
          font-size: .65rem;
          letter-spacing: .15em;
          text-transform: uppercase;
          pointer-events: all;
        }
        .pcg-credit a { color: var(--muted); text-decoration: none; transition: color .2s; }
        .pcg-credit a:hover { color: var(--accent); }

        /* ── Scroll hint ── */
        .pcg-scroll-hint {
          position: absolute;
          bottom: calc(var(--ui-inset) * 1.5);
          right: var(--ui-inset);
          z-index: var(--z-ui);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: .4rem;
          pointer-events: none;
          opacity: 0.55;
        }
        .pcg-scroll-hint span {
          font-size: .55rem;
          letter-spacing: .22em;
          text-transform: uppercase;
          color: var(--muted);
          writing-mode: vertical-rl;
        }
        .pcg-scroll-line {
          width: 1px;
          height: 2.5rem;
          background: linear-gradient(to bottom, var(--accent), transparent);
          animation: scrollDrop 1.6s ease-in-out infinite;
        }
        @keyframes scrollDrop {
          0%   { transform: scaleY(0); transform-origin: top; opacity: 1; }
          50%  { transform: scaleY(1); transform-origin: top; opacity: 1; }
          100% { transform: scaleY(1); transform-origin: bottom; opacity: 0; }
        }

        /* ── Responsive ── */
        @media (max-width: 900px) {
          .pcg-dot-strip  { display: none; }
          .pcg-credit     { display: none; }
          .pcg-scroll-hint { display: none; }
          .pcg-text-card  { max-width: 90vw; padding: 1.5rem 1.25rem; }
          .pcg-ui-layer   { padding: 0 1rem; }
        }
        @media (max-width: 500px) {
          .pcg-hud        { top: 1rem; right: 1rem; }
          .pcg-theme-btn  { bottom: 1rem; left: 1rem; }
          .pcg-face-caption { bottom: 1rem; }
        }
      `}</style>

      {/* ── Section heading (above the pinned stage, scrolls away naturally) ── */}
      <div className="pcg-header">
        <SectionHeading title="POSTER & VISUAL DESIGN" theme="dark" />
      </div>

      {/* ── Pinned visual stage ── */}
      <div ref={stageRef} className="pcg-stage">

        {/* 3-D Cube */}
        <div className="pcg-scene">
          <div ref={cubeRef} className="pcg-cube">
            <div className="pcg-face" data-face="top">
              <img src={POSTER_IMAGES[0]} alt="Top face poster" />
              <span className="pcg-face-ph">TOP</span>
            </div>
            <div className="pcg-face" data-face="front">
              <img src={POSTER_IMAGES[1]} alt="Front face poster" />
              <span className="pcg-face-ph">FRONT</span>
            </div>
            <div className="pcg-face" data-face="right">
              <img src={POSTER_IMAGES[2]} alt="Right face poster" />
              <span className="pcg-face-ph">RIGHT</span>
            </div>
            <div className="pcg-face" data-face="back">
              <img src={POSTER_IMAGES[3]} alt="Back face poster" />
              <span className="pcg-face-ph">BACK</span>
            </div>
            <div className="pcg-face" data-face="left">
              <img src={POSTER_IMAGES[4]} alt="Left face poster" />
              <span className="pcg-face-ph">LEFT</span>
            </div>
            <div className="pcg-face" data-face="bottom">
              <img src={POSTER_IMAGES[5]} alt="Bottom face poster" />
              <span className="pcg-face-ph">BOTTOM</span>
            </div>
          </div>
        </div>

        {/* UI overlay — text card floats above the cube */}
        <div className="pcg-ui-layer">
          <div
            ref={textCardRef}
            className={`pcg-text-card ${currentScene.align === 'right' ? 'right' : ''}`}
          >
            <div className="pcg-tag">{currentScene.tag}</div>

            <h2 className="pcg-title">
              {currentScene.title.map((line, i) => (
                <span key={i} className="block">{line}</span>
              ))}
            </h2>

            <p className="pcg-body">{currentScene.body}</p>

            {'stats' in currentScene && currentScene.stats && (
              <div className="pcg-stat-row">
                {(currentScene.stats as { num: string; label: string }[]).map((stat, i) => (
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
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
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
                  <svg className="w-3 h-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 6h10M6 1l5 5-5 5" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* HUD — progress + scene label */}
        <div className="pcg-hud">
          <div>{String(progressPct).padStart(3, '0')}%</div>
          <div className="pcg-progress-bar">
            <div className="pcg-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <div className="pcg-scene-label">{currentScene.faceName}</div>
        </div>

        {/* Dot navigation strip */}
        <div className="pcg-dot-strip">
          {SCENE_DATA.map((scene, idx) => (
            <button
              key={scene.id}
              onClick={() => scrollToScene(idx)}
              aria-label={`Jump to scene ${idx + 1}`}
              className={`pcg-dot ${activeSceneIdx === idx ? 'active' : ''}`}
            />
          ))}
        </div>

        {/* Theme toggle */}
        <button
          onClick={() => setActiveTheme(p => p === 'dark' ? 'light' : 'dark')}
          className="pcg-theme-btn"
          aria-label="Toggle light/dark mode"
        >
          {activeTheme === 'dark' ? (
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="1.5">
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-none stroke-current" strokeWidth="1.5">
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
            </svg>
          )}
        </button>

        {/* Bottom face caption */}
        <div className="pcg-face-caption">
          <div className="pcg-caption-num">{String(activeSceneIdx + 1).padStart(2, '0')}</div>
          <div className="pcg-caption-name">{currentScene.faceName}</div>
        </div>

        {/* Scroll hint (visible on first scene) */}
        {activeSceneIdx === 0 && (
          <div className="pcg-scroll-hint">
            <span>Scroll</span>
            <div className="pcg-scroll-line" />
          </div>
        )}

        {/* Rotated credit link */}
        <div className="pcg-credit">
          <a
            href="https://www.linkedin.com/posts/luis-martinez-lr_ai-creativity-reversecreativity-activity-7366853269517651970-zeUD"
            target="_blank"
            rel="noopener noreferrer"
          >
            Reverse Creativity
          </a>
        </div>

      </div>{/* end .pcg-stage */}
    </div>
  );
}
