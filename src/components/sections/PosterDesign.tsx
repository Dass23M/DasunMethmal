'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';

// ─── Constants ────────────────────────────────────────────────────────────────

const POSTER_IMAGES = [
  '/images/poster-5.png',    // face 0 → top
  '/images/poster-1.png',    // face 1 → front
  '/images/poster-2.png',    // face 2 → right
  '/images/poster-3.jpg',    // face 3 → back
  '/images/poster-4.png',    // face 4 → left
  '/images/editorial_1.png', // face 5 → bottom
];

const FACE_ORDER = ['top', 'front', 'right', 'back', 'left', 'bottom'] as const;

const FACE_NAMES = ['STRATEGY', 'BRANDING', 'CAMPAIGNS', 'PERFORMANCE', 'GROWTH', 'CONVERSION'];

// Cube rotation stops — one per scene
const STOPS = [
  { rx: 90,  ry: 0 },      // top face forward
  { rx: 0,   ry: 0 },      // front face
  { rx: 0,   ry: -90 },    // right face
  { rx: 0,   ry: -180 },   // back face
  { rx: 0,   ry: -270 },   // left face
  { rx: -90, ry: -360 },   // bottom face
];

const N = 6;

// Ease in-out quad for inter-stop interpolation
const easeIO = (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);

// ─── Scene data ───────────────────────────────────────────────────────────────

interface Scene {
  id: string;
  tag: string;
  heading: string[];
  isH1?: boolean;
  body: string;
  stats?: { num: string; label: string }[];
  ctaNext: { label: string; idx: number } | null;
  ctaBack: { label: string; idx: number } | null;
  align: 'left' | 'right';
}

const SCENES: Scene[] = [
  {
    id: 's0',
    tag: 'Digital Marketing — Visual Strategy',
    heading: ['STRATEGIC', 'DIGITAL', 'MARKETING'],
    isH1: true,
    body: 'High-converting ad creatives, viral social visuals, and data-driven brand campaigns. Combining high-impact visual design with targeted growth strategies to maximize reach, engagement, and ROI.',
    ctaNext: { label: 'Explore', idx: 1 },
    ctaBack: null,
    align: 'left',
  },
  {
    id: 's1',
    tag: '01 — Brand & Identity',
    heading: ['DISTINCT', 'VISUAL', 'IDENTITY'],
    body: 'Building unforgettable visual assets that command attention across channels. From social media posters to display ads, every graphic aligns with brand positioning and audience psychology.',
    ctaNext: { label: 'Turn', idx: 2 },
    ctaBack: { label: 'Back', idx: 0 },
    align: 'right',
  },
  {
    id: 's2',
    tag: '02 — Campaign Visuals',
    heading: ['MULTI-CHANNEL', 'CAMPAIGNS'],
    body: 'Targeted ad banners, promotional posters, and performance creatives crafted for Meta, Google, and LinkedIn ads. Engineered to capture attention and stop the scroll instantly.',
    ctaNext: { label: 'Turn', idx: 3 },
    ctaBack: { label: 'Back', idx: 1 },
    align: 'left',
  },
  {
    id: 's3',
    tag: '03 — Performance Marketing',
    heading: ['DATA-DRIVEN', 'CREATIVITY'],
    body: 'Combining creative storytelling with real-time analytics and audience targeting. Visual designs optimized for maximum click-through rates (CTR) and customer acquisition cost (CAC) efficiency.',
    stats: [
      { num: '3.5x', label: 'Avg ROAS' },
      { num: '45%', label: 'Higher CTR' },
      { num: '100+', label: 'Campaigns' },
    ],
    ctaNext: { label: 'Turn', idx: 4 },
    ctaBack: { label: 'Back', idx: 2 },
    align: 'right',
  },
  {
    id: 's4',
    tag: '04 — Social Media Growth',
    heading: ['CONTENT', 'THAT', 'ENGAGES'],
    body: 'Carousel ads, visual infographics, and promotional key visuals tailored for modern social algorithms. Transforming casual viewers into engaged followers and loyal brand advocates.',
    ctaNext: { label: 'Turn', idx: 5 },
    ctaBack: { label: 'Back', idx: 3 },
    align: 'left',
  },
  {
    id: 's5',
    tag: '05 — Conversion Optimization',
    heading: ['DESIGNED', 'FOR', 'REVENUE'],
    body: 'Every layout, color palette, and call-to-action is structured to drive user conversions. Turning creative poster visuals into scalable digital revenue for your business.',
    ctaNext: { label: 'Begin again', idx: 0 },
    ctaBack: { label: 'Back', idx: 4 },
    align: 'right',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ArrowRight() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="pcg-arrow">
      <path d="M1 6h10M6 1l5 5-5 5" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" className="pcg-arrow">
      <path d="M11 6H1M6 11L1 6l5-5" />
    </svg>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

export default function PosterDesign() {
  const [mounted, setMounted] = useState(false);
  // Only theme requires React re-renders; everything else is direct DOM
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  // Refs for RAF-driven DOM updates (no re-renders per frame)
  const outerRef       = useRef<HTMLDivElement>(null);
  const scrollAreaRef  = useRef<HTMLDivElement>(null);
  const cubeRef        = useRef<HTMLDivElement>(null);
  const hudPctRef      = useRef<HTMLDivElement>(null);
  const progFillRef    = useRef<HTMLDivElement>(null);
  const sceneLabelRef  = useRef<HTMLDivElement>(null);
  const captionNumRef  = useRef<HTMLDivElement>(null);
  const captionNameRef = useRef<HTMLDivElement>(null);
  const dotsRef        = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => { setMounted(true); }, []);

  // ── RAF loop: smooth-lerp scroll → cube rotation + HUD ─────────────────
  useEffect(() => {
    if (!mounted) return;

    let rafId: number;
    let smooth  = 0;
    let prevIdx = -1;
    let lastNow = performance.now();

    const getProgress = (): number => {
      const el = scrollAreaRef.current;
      if (!el) return 0;
      const areaTop   = el.getBoundingClientRect().top + window.scrollY;
      const maxScroll = el.offsetHeight - window.innerHeight;
      if (maxScroll <= 0) return 0;
      return Math.max(0, Math.min(1, (window.scrollY - areaTop) / maxScroll));
    };

    const frame = (now: number) => {
      const dt = Math.min((now - lastNow) / 1000, 0.05);
      lastNow  = now;

      // Exponential lerp toward target
      smooth += (getProgress() - smooth) * (1 - Math.exp(-dt * 8));
      smooth  = Math.max(0, Math.min(1, smooth));

      // Cube transform
      if (cubeRef.current) {
        const t = smooth * (N - 1);
        const i = Math.min(Math.floor(t), N - 2);
        const f = easeIO(t - i);
        const a = STOPS[i], b = STOPS[i + 1];
        cubeRef.current.style.transform =
          `rotateX(${a.rx + (b.rx - a.rx) * f}deg) rotateY(${a.ry + (b.ry - a.ry) * f}deg)`;
      }

      // HUD numbers
      const pct    = Math.round(smooth * 100);
      const newIdx = Math.min(Math.round(smooth * (N - 1)), N - 1);

      if (hudPctRef.current)
        hudPctRef.current.textContent = String(pct).padStart(3, '0') + '%';
      if (progFillRef.current)
        progFillRef.current.style.width = `${pct}%`;

      // Scene-change updates (throttled to actual changes)
      if (newIdx !== prevIdx) {
        prevIdx      = newIdx;
        const name   = FACE_NAMES[newIdx] ?? '';
        if (sceneLabelRef.current)  sceneLabelRef.current.textContent  = name;
        if (captionNumRef.current)  captionNumRef.current.textContent  = String(newIdx + 1).padStart(2, '0');
        if (captionNameRef.current) captionNameRef.current.textContent = name;
        dotsRef.current.forEach((d, i) => d?.classList.toggle('active', i === newIdx));
      }

      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, [mounted]);

  // ── IntersectionObserver: text reveal on scroll ─────────────────────────
  useEffect(() => {
    if (!mounted || !outerRef.current) return;

    const els = outerRef.current.querySelectorAll('[data-reveal]');
    const io  = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('pcg-visible');
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.1 }
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [mounted]);

  // ── Scene navigation ────────────────────────────────────────────────────
  const scrollToScene = (idx: number) => {
    const el = scrollAreaRef.current;
    if (!el) return;
    const areaTop   = el.getBoundingClientRect().top + window.scrollY;
    const maxScroll = el.offsetHeight - window.innerHeight;
    const targetY   = areaTop + (idx / (N - 1)) * maxScroll;
    window.scrollTo({ top: Math.max(0, targetY), behavior: 'smooth' });
  };

  // SSR / hydration guard
  if (!mounted) {
    return (
      <div
        id="poster-design-section"
        style={{ minHeight: '100vh', background: '#080808' }}
      />
    );
  }

  return (
    <div
      ref={outerRef}
      id="poster-design-section"
      className="pcg-outer"
      data-theme={theme}
    >
      <style>{STYLES}</style>

      {/* ── Section heading (scrolls away before cube sticks) ───────────── */}
      <div className="pcg-header">
        <SectionHeading title="DIGITAL MARKETING & POSTER DESIGN" theme="dark" />
      </div>

      {/* ── Scroll area ─────────────────────────────────────────────────── */}
      <div ref={scrollAreaRef} className="pcg-scroll-area">

        {/* ── Sticky cube stage ─────────────────────────────────────────── */}
        {/*
          IMPORTANT: no z-index on this element.
          Without a z-index the sticky element does NOT form its own stacking
          context, so its absolutely-positioned children (HUD z:20, dots z:20
          etc.) can stack above the text-sections (z:2) in the shared parent
          stacking context — while the cube (z:0) stays behind the cards.
        */}
        <div className="pcg-stage">

          {/* 3-D cube */}
          <div className="pcg-scene">
            <div ref={cubeRef} className="pcg-cube">
              {FACE_ORDER.map((face, i) => (
                <div key={face} className="pcg-face" data-face={face}>
                  <Image
                    src={POSTER_IMAGES[i]}
                    alt={`${FACE_NAMES[i]} poster`}
                    fill
                    sizes="(max-width: 900px) 74vw, 560px"
                    style={{ objectFit: 'cover' }}
                    priority={i === 0}
                  />
                  <span className="pcg-face-ph">{face.toUpperCase()}</span>
                </div>
              ))}
            </div>
          </div>

          {/* HUD — top-right */}
          <div className="pcg-hud" aria-hidden="true">
            <div ref={hudPctRef} className="pcg-hud-pct">000%</div>
            <div className="pcg-progress-bar">
              <div ref={progFillRef} className="pcg-progress-fill" />
            </div>
            <div ref={sceneLabelRef} className="pcg-scene-label">
              {FACE_NAMES[0]}
            </div>
          </div>

          {/* Dot navigation — left-center */}
          <div className="pcg-dot-strip">
            {SCENES.map((s, i) => (
              <button
                key={s.id}
                ref={(el) => { dotsRef.current[i] = el; }}
                className={`pcg-dot${i === 0 ? ' active' : ''}`}
                onClick={() => scrollToScene(i)}
                aria-label={`Jump to scene ${i + 1}`}
              />
            ))}
          </div>

          {/* Theme toggle — bottom-left */}
          <button
            className="pcg-theme-btn"
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            aria-label="Toggle light / dark"
          >
            {/* Sun icon (shown in dark mode) */}
            <svg
              className={`pcg-icon-sun${theme === 'dark' ? ' showing' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
            </svg>
            {/* Moon icon (shown in light mode) */}
            <svg
              className={`pcg-icon-moon${theme === 'light' ? ' showing' : ''}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
            </svg>
          </button>

          {/* Face caption — bottom-center */}
          <div className="pcg-face-caption" aria-hidden="true">
            <div ref={captionNumRef} className="pcg-caption-num">01</div>
            <div ref={captionNameRef} className="pcg-caption-name">
              {FACE_NAMES[0]}
            </div>
          </div>

          {/* Credit — right-center (rotated) */}
          <div className="pcg-credit">
            <a
              href="#contact-section"
            >
              Digital Marketing &amp; Strategy
            </a>
          </div>

        </div>{/* /pcg-stage */}

        {/* ── Text sections — scroll over the sticky cube ───────────────── */}
        {/*
          margin-top: -100vh pulls these sections back so section 0 overlaps
          the sticky stage from the very start. Each section is 100 vh tall so
          5 full-viewport scrolls drive all 6 scenes (exactly one per stop).
        */}
        <div className="pcg-text-sections">
          {SCENES.map((scene, i) => (
            <section
              key={scene.id}
              className={`pcg-section${i === 0 ? ' pcg-section--hero' : ''}`}
            >
              <div
                className={`pcg-text-card${scene.align === 'right' ? ' right' : ''}`}
              >
                {/* Horizontal accent line (all scenes except hero) */}
                {i > 0 && (
                  <div
                    className="pcg-h-line"
                    data-reveal
                    style={
                      scene.align === 'right'
                        ? { transformOrigin: 'right', marginLeft: 'auto' }
                        : undefined
                    }
                  />
                )}

                <div className="pcg-tag" data-reveal>
                  {scene.tag}
                </div>

                {scene.isH1 ? (
                  <h1 className="pcg-heading" data-reveal>
                    {scene.heading.map((line, j) => (
                      <span key={j} className="block">
                        {line}
                      </span>
                    ))}
                  </h1>
                ) : (
                  <h2 className="pcg-heading" data-reveal>
                    {scene.heading.map((line, j) => (
                      <span key={j} className="block">
                        {line}
                      </span>
                    ))}
                  </h2>
                )}

                <p className="pcg-body-text" data-reveal>
                  {scene.body}
                </p>

                {scene.stats && (
                  <div
                    className={`pcg-stat-row${
                      scene.align === 'right' ? ' right' : ''
                    }`}
                    data-reveal
                  >
                    {scene.stats.map((st, j) => (
                      <div key={j} className="pcg-stat">
                        <span className="pcg-stat-num">{st.num}</span>
                        <span className="pcg-stat-label">{st.label}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div
                  className={`pcg-cta-row${
                    scene.align === 'right' ? ' right' : ''
                  }`}
                >
                  {scene.ctaBack && (
                    <button
                      className="pcg-cta-back"
                      data-reveal
                      onClick={() => scrollToScene(scene.ctaBack!.idx)}
                    >
                      <ArrowLeft />
                      {scene.ctaBack.label}
                    </button>
                  )}
                  {scene.ctaNext && (
                    <button
                      className="pcg-cta"
                      data-reveal
                      onClick={() => scrollToScene(scene.ctaNext!.idx)}
                    >
                      {scene.ctaNext.label}
                      <ArrowRight />
                    </button>
                  )}
                </div>
              </div>
            </section>
          ))}
        </div>

      </div>{/* /pcg-scroll-area */}
    </div>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
// All rules are scoped under .pcg-outer to avoid bleeding into the rest of
// the portfolio page.

const STYLES = `
/* ── Tokens — Brand: Orange / White / Black ── */
.pcg-outer {
  --dark-bg:     #080808;
  --dark-fg:     #ffffff;
  --dark-muted:  #999999;
  --light-bg:    #f5f5f5;
  --light-fg:    #0a0a0a;
  --light-muted: #777777;
  --accent-dark: #FF8A00;
  --accent-lt:   #FF6B00;

  --bg:     var(--dark-bg);
  --fg:     var(--dark-fg);
  --muted:  var(--dark-muted);
  --accent: var(--accent-dark);

  --font-display: 'Sora', sans-serif;
  --font-body:    'Inter', sans-serif;
  --hairline:     0.0625rem;
  --ui-inset:     2rem;
  --nav-x:        calc(var(--ui-inset) + 0.125rem);
  --card-bg:      rgba(8, 8, 8, 0.78);
  --card-border:  rgba(255, 138, 0, 0.22);
  --z-ui:         20;

  position: relative;
  background: var(--bg);
  color:      var(--fg);
  font-family: var(--font-body);
  transition: background 0.3s ease, color 0.3s ease;
}

.pcg-outer[data-theme="light"] {
  --bg:          var(--light-bg);
  --fg:          var(--light-fg);
  --muted:       var(--light-muted);
  --accent:      var(--accent-lt);
  --card-bg:     rgba(255, 255, 255, 0.72);
  --card-border: rgba(255, 107, 0, 0.18);
}

/* ── Section heading row ── */
.pcg-outer .pcg-header {
  position: relative;
  z-index: 30;
  max-width: 1140px;
  margin: 0 auto;
  padding: 3rem clamp(1rem,4vw,2rem) 0;
  background: var(--bg);
  transition: background 0.3s ease;
}

/* ── Scroll area ── */
.pcg-outer .pcg-scroll-area {
  position: relative;
}

/* ── Sticky 3-D stage ── */
.pcg-outer .pcg-stage {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  background: var(--bg);
  transition: background 0.3s ease;
}

/* ── Perspective / cube container ── */
.pcg-outer .pcg-scene {
  position: absolute;
  inset: 0;
  z-index: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1100px;
  pointer-events: none;
}

/* ── Cube ── */
.pcg-outer .pcg-cube {
  --s: min(74vw, 74vh, 560px);
  width:  var(--s);
  height: var(--s);
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(90deg) rotateY(0deg);
  will-change: transform;
}

/* ── Cube faces ── */
.pcg-outer .pcg-face {
  position: absolute;
  inset: 0;
  overflow: hidden;
  backface-visibility: hidden;
  background:
    repeating-linear-gradient(0deg,   rgba(255,138,0,.04) 0, rgba(255,138,0,.04) 1px, transparent 1px, transparent 48px),
    repeating-linear-gradient(90deg,  rgba(255,138,0,.04) 0, rgba(255,138,0,.04) 1px, transparent 1px, transparent 48px),
    #0d0d0d;
}
.pcg-outer[data-theme="light"] .pcg-face {
  background:
    repeating-linear-gradient(0deg,  rgba(0,0,0,.05) 0, rgba(0,0,0,.05) 1px, transparent 1px, transparent 48px),
    repeating-linear-gradient(90deg, rgba(0,0,0,.05) 0, rgba(0,0,0,.05) 1px, transparent 1px, transparent 48px),
    #e8e8e8;
}

/* Face transforms — must match STOPS order */
.pcg-outer .pcg-face[data-face="front"]  { transform: translateZ(calc(var(--s)/2)); }
.pcg-outer .pcg-face[data-face="back"]   { transform: rotateY(180deg)  translateZ(calc(var(--s)/2)); }
.pcg-outer .pcg-face[data-face="right"]  { transform: rotateY(90deg)   translateZ(calc(var(--s)/2)); }
.pcg-outer .pcg-face[data-face="left"]   { transform: rotateY(-90deg)  translateZ(calc(var(--s)/2)); }
.pcg-outer .pcg-face[data-face="top"]    { transform: rotateX(-90deg)  translateZ(calc(var(--s)/2)); }
.pcg-outer .pcg-face[data-face="bottom"] { transform: rotateX(90deg)   translateZ(calc(var(--s)/2)); }

/* next/image renders a <span> wrapper + <img>; both need to fill the face */
.pcg-outer .pcg-face > span {
  position: absolute !important;
  inset: 0 !important;
}

.pcg-outer .pcg-face-ph {
  position: absolute;
  bottom: 1.5rem;
  left: 1.75rem;
  font-family: var(--font-display);
  font-size: clamp(2rem, 8vw, 5rem);
  font-weight: 700;
  letter-spacing: 0.04em;
  color: rgba(255,255,255,0.06);
  pointer-events: none;
  user-select: none;
  z-index: 1;
}
.pcg-outer[data-theme="light"] .pcg-face-ph { color: rgba(0,0,0,0.07); }

/* ── HUD ── */
.pcg-outer .pcg-hud {
  position: absolute;
  top:   var(--ui-inset);
  right: var(--ui-inset);
  z-index: var(--z-ui);
  text-align: right;
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  color: var(--muted);
  text-transform: uppercase;
  pointer-events: none;
  font-family: var(--font-body);
}
.pcg-outer .pcg-progress-bar {
  width: 7.5rem;
  height: var(--hairline);
  background: rgba(255,255,255,0.15);
  margin-top: 0.5rem;
  margin-left: auto;
  position: relative;
  overflow: hidden;
}
.pcg-outer[data-theme="light"] .pcg-progress-bar {
  background: rgba(0,0,0,0.12);
}
.pcg-outer .pcg-progress-fill {
  position: absolute;
  top: 0; bottom: 0; left: 0;
  width: 0%;
  background: var(--accent);
  transition: width 0.1s linear;
}
.pcg-outer .pcg-scene-label {
  font-size: 0.6rem;
  color: var(--accent);
  margin-top: 0.4rem;
  font-family: var(--font-body);
}

/* ── Dot navigation strip ── */
.pcg-outer .pcg-dot-strip {
  position: absolute;
  left:  var(--nav-x);
  top:   50%;
  transform: translate(-50%, -50%);
  z-index: var(--z-ui);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.pcg-outer .pcg-dot {
  display: block;
  width:  0.25rem;
  height: 0.25rem;
  border-radius: 50%;
  background: rgba(255,255,255,0.25);
  border: none;
  padding: 0;
  cursor: pointer;
  transition: background 0.3s, transform 0.3s;
}
.pcg-outer[data-theme="light"] .pcg-dot {
  background: rgba(0,0,0,0.2);
}
.pcg-outer .pcg-dot.active {
  background: var(--accent);
  transform: scale(1.8);
}

/* ── Theme toggle ── */
.pcg-outer .pcg-theme-btn {
  position: absolute;
  bottom: var(--ui-inset);
  left:   var(--nav-x);
  transform: translateX(-50%);
  z-index: var(--z-ui);
  width:  2rem;
  height: 2rem;
  border: none;
  background: rgba(255,138,0,0.12);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.3s;
}
.pcg-outer .pcg-theme-btn:hover {
  background: rgba(255,138,0,0.28);
}
.pcg-outer .pcg-theme-btn svg {
  width:  0.875rem;
  height: 0.875rem;
  position: absolute;
  color: var(--accent);
  transition: opacity 0.3s ease, rotate 0.3s ease;
}
.pcg-outer .pcg-icon-sun  { opacity: 0; rotate: 90deg; }
.pcg-outer .pcg-icon-moon { opacity: 0; rotate: 90deg; }
.pcg-outer .pcg-icon-sun.showing  { opacity: 1; rotate: 0deg; }
.pcg-outer .pcg-icon-moon.showing { opacity: 1; rotate: 0deg; }

/* ── Face caption ── */
.pcg-outer .pcg-face-caption {
  position: absolute;
  bottom: var(--ui-inset);
  left:   50%;
  transform: translateX(-50%);
  z-index: var(--z-ui);
  text-align: center;
  pointer-events: none;
  user-select: none;
}
.pcg-outer .pcg-caption-num {
  font-size: 0.58rem;
  letter-spacing: 0.28em;
  color: var(--accent);
  text-transform: uppercase;
  margin-bottom: 0.15rem;
  font-family: var(--font-body);
}
.pcg-outer .pcg-caption-name {
  font-family: var(--font-display);
  font-size: clamp(1.8rem, 5vw, 3.5rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  color: var(--muted);
  opacity: 0.35;
  line-height: 1;
}
.pcg-outer[data-theme="light"] .pcg-caption-name { opacity: 0.25; }

/* ── Credit (rotated, right-center) ── */
.pcg-outer .pcg-credit {
  position: absolute;
  right: var(--ui-inset);
  top:   50%;
  transform: translateY(-50%) rotate(-90deg);
  transform-origin: right center;
  z-index: var(--z-ui);
  font-family: var(--font-body);
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}
.pcg-outer .pcg-credit a {
  color: var(--muted);
  text-decoration: none;
  transition: color 0.2s;
}
.pcg-outer .pcg-credit a:hover { color: var(--accent); }

/* ── Text sections ── */
.pcg-outer .pcg-text-sections {
  position: relative;
  z-index: 2;
  margin-top: -100vh;
}

.pcg-outer .pcg-section {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 6rem calc(5rem + var(--ui-inset)) 6rem 5rem;
  background: transparent;
}

/* ── Text card ── */
.pcg-outer .pcg-text-card {
  max-width: 23.75rem;
  width: 100%;
  padding: 2.25rem 2rem;
  background: var(--card-bg);
  border-left: var(--hairline) solid var(--card-border);
  backdrop-filter: blur(12px) saturate(120%);
  -webkit-backdrop-filter: blur(12px) saturate(120%);
  overflow: hidden;
  transition: background 0.3s ease, border-color 0.3s ease;
  border-radius: 2px;
}
.pcg-outer .pcg-text-card.right {
  margin-left: auto;
  border-left: none;
  border-right: var(--hairline) solid var(--card-border);
  text-align: right;
}

/* ── Accent line ── */
.pcg-outer .pcg-h-line {
  width: 3.125rem;
  height: var(--hairline);
  background: var(--accent);
  margin-bottom: 1.2rem;
}

/* ── Tag ── */
.pcg-outer .pcg-tag {
  font-family: var(--font-body);
  font-size: 0.6rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--accent);
  margin-bottom: 1.1rem;
}

/* ── Heading ── */
.pcg-outer .pcg-heading {
  font-family: var(--font-display);
  font-weight: 700;
  letter-spacing: -0.01em;
  line-height: 0.95;
  color: var(--fg);
}
.pcg-outer h1.pcg-heading { font-size: clamp(2.8rem, 7vw, 5.5rem); }
.pcg-outer h2.pcg-heading { font-size: clamp(2rem, 4.5vw, 3.5rem); }

/* ── Body ── */
.pcg-outer .pcg-body-text {
  font-family: var(--font-body);
  font-size: 0.78rem;
  font-weight: 300;
  line-height: 1.8;
  color: color-mix(in srgb, var(--fg) 55%, transparent);
  margin-top: 1.25rem;
}

/* ── Stats ── */
.pcg-outer .pcg-stat-row {
  display: flex;
  gap: 2.5rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}
.pcg-outer .pcg-stat-row.right { justify-content: flex-end; }
.pcg-outer .pcg-stat           { display: flex; flex-direction: column; gap: 0.15rem; }
.pcg-outer .pcg-stat-num       { font-family: var(--font-display); font-size: 2.2rem; font-weight: 700; color: var(--accent); line-height: 1; }
.pcg-outer .pcg-stat-label     { font-family: var(--font-body); font-size: 0.58rem; font-weight: 400; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); }

/* ── CTA row ── */
.pcg-outer .pcg-cta-row       { display: flex; align-items: center; gap: 0.75rem; margin-top: 1.75rem; }
.pcg-outer .pcg-cta-row.right { justify-content: flex-end; }

.pcg-outer .pcg-cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.25rem;
  border: var(--hairline) solid var(--accent);
  color: var(--accent);
  font-family: var(--font-body);
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  background: transparent;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}
.pcg-outer .pcg-cta:hover {
  background: var(--accent);
  color: #000;
}

.pcg-outer .pcg-cta-back {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.6rem 1.25rem;
  border: var(--hairline) solid rgba(255,255,255,0.18);
  color: var(--muted);
  font-family: var(--font-body);
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  background: transparent;
  cursor: pointer;
  transition: background 0.2s, color 0.2s, border-color 0.2s;
}
.pcg-outer[data-theme="light"] .pcg-cta-back {
  border-color: rgba(0,0,0,0.15);
}
.pcg-outer .pcg-cta-back:hover {
  background: rgba(255,138,0,0.08);
  border-color: var(--accent);
  color: var(--accent);
}

.pcg-outer .pcg-arrow {
  width:  0.6875rem;
  height: 0.6875rem;
  flex-shrink: 0;
}

/* ── Reveal animations ── */
.pcg-outer [data-reveal] {
  opacity: 0;
  translate: 0 0.625rem;
}
.pcg-outer .pcg-tag[data-reveal] {
  transition: opacity 0.5s ease, translate 0.5s ease;
}
.pcg-outer .pcg-heading[data-reveal] {
  translate: 0 1.125rem;
  transition: opacity 0.5s ease 0.08s, translate 0.5s ease 0.08s;
}
.pcg-outer .pcg-body-text[data-reveal] {
  transition: opacity 0.5s ease 0.2s, translate 0.5s ease 0.2s;
}
.pcg-outer .pcg-stat-row[data-reveal] {
  transition: opacity 0.5s ease 0.3s, translate 0.5s ease 0.3s;
}
.pcg-outer .pcg-cta[data-reveal],
.pcg-outer .pcg-cta-back[data-reveal] {
  transition:
    opacity 0.5s ease 0.35s,
    translate 0.5s ease 0.35s,
    background 0.2s,
    color 0.2s,
    border-color 0.2s;
}
.pcg-outer .pcg-h-line[data-reveal] {
  translate: 0 0;
  opacity: 0;
  scale: 0 1;
  transition: opacity 0.4s ease, scale 0.4s ease;
}

.pcg-outer [data-reveal].pcg-visible {
  opacity: 1;
  translate: 0 0;
}
.pcg-outer .pcg-h-line[data-reveal].pcg-visible {
  opacity: 1;
  scale: 1 1;
}

/* ── Responsive ── */
@media (max-width: 56.25em) {
  .pcg-outer .pcg-dot-strip { display: none; }
  .pcg-outer .pcg-credit    { display: none; }
  .pcg-outer .pcg-hud           { top: 1rem; right: 1rem; font-size: 0.75rem; }
  .pcg-outer .pcg-scene-label   { font-size: 0.72rem; }
  .pcg-outer .pcg-theme-btn     { bottom: 1rem; left: 1.25rem; transform: none; }
  .pcg-outer .pcg-face-caption  { bottom: 1rem; }
  .pcg-outer .pcg-caption-num   { font-size: 0.72rem; }

  .pcg-outer .pcg-section {
    min-height: 150vh;
    align-items: flex-end;
    padding: 0 1.5rem 3.5rem;
  }
  .pcg-outer .pcg-section--hero {
    min-height: 100vh;
    align-items: center;
    padding: 4rem 1.5rem;
  }
  .pcg-outer .pcg-text-card,
  .pcg-outer .pcg-text-card.right {
    max-width: 100%;
    padding: 1.75rem 1.35rem;
  }
  .pcg-outer .pcg-tag       { font-size: 0.75rem; letter-spacing: 0.2em; }
  .pcg-outer .pcg-body-text { font-size: 0.92rem; line-height: 1.65; font-weight: 300; color: color-mix(in srgb, var(--fg) 80%, transparent); }
  .pcg-outer .pcg-stat-label{ font-size: 0.7rem; letter-spacing: 0.15em; }
  .pcg-outer .pcg-cta,
  .pcg-outer .pcg-cta-back  { font-size: 0.72rem; padding: 0.65rem 1.35rem; }
  .pcg-outer .pcg-stat-row  { gap: 1.5rem; margin-top: 1.25rem; }
  .pcg-outer .pcg-cta-row   { margin-top: 1.25rem; }
}
`;
