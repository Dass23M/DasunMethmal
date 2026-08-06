'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ─── Skill Data ───────────────────────────────────────────────────────────────
const webSkills = [
  { label: 'React / Next.js', pct: 95 },
  { label: 'TypeScript', pct: 90 },
  { label: 'Node.js / REST API', pct: 85 },
  { label: 'Tailwind / GSAP', pct: 92 },
];

const mktSkills = [
  { label: 'SEO & Technical Audit', pct: 88 },
  { label: 'Google Ads / Meta Ads', pct: 82 },
  { label: 'Conversion Rate Optim.', pct: 80 },
  { label: 'Content & Analytics', pct: 85 },
];

// ─── Global Reach Data ────────────────────────────────────────────────────────
// SVG viewBox is 1000 × 500  (equirectangular / plate carrée)
// x = (lon + 180) / 360 × 1000
// y = (90  − lat) / 180 × 500
const HOME = { name: 'Sri Lanka', x: 724, y: 228, flagSrc: '/images/Sri_Lanka.png', role: 'Home Base', color: '#FF8C00' };

const COUNTRIES = [
  {
    name: 'England',
    x: 487,
    y: 104,
    flagSrc: '/images/UK.png',
    role: 'Web Development',
    detail: 'E-commerce & SaaS platforms',
    color: '#FF8C00',
  },
  {
    name: 'Netherlands',
    x: 496,
    y: 100,
    flagSrc: '/images/Netherland.png',
    role: 'Digital Marketing',
    detail: 'Paid media & SEO campaigns',
    color: '#FFB347',
  },
  {
    name: 'India',
    x: 719,
    y: 193,
    flagSrc: '/images/India.png',
    role: 'Full-Stack Dev',
    detail: 'Enterprise web applications',
    color: '#FFA040',
  },
  {
    name: 'South Africa',
    x: 550,
    y: 335,
    flagSrc: '/images/SouthAfrica.png',
    role: 'UI/UX & Marketing',
    detail: 'Brand systems & growth',
    color: '#FF6B00',
  },
];

export default function Artifact3DSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scanlinesRef = useRef<HTMLDivElement>(null);
  const hudCornerTLRef = useRef<HTMLDivElement>(null);
  const hudCornerBRRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const hudReadoutRef = useRef<HTMLDivElement>(null);
  const heroCoordsRef = useRef<HTMLDivElement>(null);
  const isSectionVisible = useRef(false);
  const [activeSidebar, setActiveSidebar] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [activeCountry, setActiveCountry] = useState<number | null>(null);

  useEffect(() => { setMounted(true); }, []);

  // Mouse HUD Tracking
  useEffect(() => {
    if (!mounted) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!isSectionVisible.current) return;
      const x = ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3);
      const y = (-(e.clientY / window.innerHeight) * 2 + 1).toFixed(3);
      if (hudReadoutRef.current) {
        hudReadoutRef.current.innerHTML =
          `X: ${Number(x) > 0 ? '+' : ''}${x}<br />Y: ${Number(y) > 0 ? '+' : ''}${y}<br />Z: +7.000`;
      }
      const phi = ((e.clientX / window.innerWidth) * 360).toFixed(2).padStart(6, '0');
      const theta = ((e.clientY / window.innerHeight) * 180).toFixed(2).padStart(6, '0');
      if (heroCoordsRef.current) {
        heroCoordsRef.current.innerHTML = `φ ${phi}° · θ ${theta}°<br />NODES: 2500+ · CELLS: 50×50`;
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mounted]);

  // 3D Canvas + GSAP ScrollTrigger
  useEffect(() => {
    if (!mounted || !canvasRef.current || !containerRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let rotX = 0.4;
    let rotY = 0;
    let scrollRotY = 0;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const isMobile = window.innerWidth < 768;
    const R = Math.min(width, height) * (isMobile ? 0.18 : 0.22);
    const r = Math.min(width, height) * (isMobile ? 0.06 : 0.08);
    const segMajor = isMobile ? 20 : 32;
    const segMinor = isMobile ? 10 : 16;

    const project3D = (x: number, y: number, z: number) => {
      const cosY = Math.cos(rotY + scrollRotY);
      const sinY = Math.sin(rotY + scrollRotY);
      const x1 = x * cosY - z * sinY;
      const z1 = x * sinY + z * cosY;
      const cosX = Math.cos(rotX);
      const sinX = Math.sin(rotX);
      const y2 = y * cosX - z1 * sinX;
      const z2 = y * sinX + z1 * cosX;
      const fov = 450;
      const dist = 600;
      const scale = fov / (dist + z2);
      return { px: width / 2 + x1 * scale, py: height / 2 + y2 * scale, scale };
    };

    const render = () => {
      if (!isSectionVisible.current) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }
      ctx.clearRect(0, 0, width, height);
      rotY += 0.006;

      for (let i = 0; i < segMajor; i++) {
        const u = (i / segMajor) * Math.PI * 2;
        ctx.beginPath();
        for (let j = 0; j <= segMinor; j++) {
          const v = (j / segMinor) * Math.PI * 2;
          const x = (R + r * Math.cos(v)) * Math.cos(u);
          const y = (R + r * Math.cos(v)) * Math.sin(u);
          const z = r * Math.sin(v);
          const { px, py } = project3D(x, y, z);
          j === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.strokeStyle = `rgba(255,140,0,${0.28 + (i % 2 === 0 ? 0.18 : 0)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let j = 0; j < segMinor; j += 2) {
        const v = (j / segMinor) * Math.PI * 2;
        ctx.beginPath();
        for (let i = 0; i <= segMajor; i++) {
          const u = (i / segMajor) * Math.PI * 2;
          const x = (R + r * Math.cos(v)) * Math.cos(u);
          const y = (R + r * Math.cos(v)) * Math.sin(u);
          const z = r * Math.sin(v);
          const { px, py } = project3D(x, y, z);
          i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.strokeStyle = 'rgba(255,190,50,0.18)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      const nodeCount = isMobile ? 10 : 20;
      for (let k = 0; k < nodeCount; k++) {
        const angle = (k / nodeCount) * Math.PI * 2 + rotY;
        const cx = R * 0.4 * Math.cos(angle);
        const cy = R * 0.4 * Math.sin(angle);
        const cz = Math.sin(angle * 3) * 20;
        const { px, py, scale } = project3D(cx, cy, cz);
        ctx.beginPath();
        ctx.arc(px, py, Math.max(1, 2.5 * scale), 0, Math.PI * 2);
        ctx.fillStyle = '#FF8C00';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const ctxGSAP = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => {
          isSectionVisible.current = true;
          gsap.to([canvas, scanlinesRef.current], { opacity: 1, duration: 0.5 });
          gsap.to([hudCornerTLRef.current, hudCornerBRRef.current, sidebarRef.current], {
            opacity: 1, duration: 0.5, stagger: 0.1,
          });
        },
        onLeave: () => {
          isSectionVisible.current = false;
          gsap.to([canvas, scanlinesRef.current, hudCornerTLRef.current, hudCornerBRRef.current, sidebarRef.current], {
            opacity: 0, duration: 0.3,
          });
        },
        onEnterBack: () => {
          isSectionVisible.current = true;
          gsap.to([canvas, scanlinesRef.current], { opacity: 1, duration: 0.4 });
          gsap.to([hudCornerTLRef.current, hudCornerBRRef.current, sidebarRef.current], {
            opacity: 1, duration: 0.4,
          });
        },
        onLeaveBack: () => {
          isSectionVisible.current = false;
          gsap.to([canvas, scanlinesRef.current, hudCornerTLRef.current, hudCornerBRRef.current, sidebarRef.current], {
            opacity: 0, duration: 0.3,
          });
        },
        onUpdate: (self) => { scrollRotY = self.progress * Math.PI * 3; },
      });

      // Section 1 entrance
      gsap.timeline({ scrollTrigger: { trigger: '#artifact-section-1', start: 'top 80%' } })
        .to('.art-hero-title', { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' })
        .to('.art-hero-meta', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .to('.art-hero-kpis', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
        .to('.art-hero-cta', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');

      // Section 2 reveal
      gsap.timeline({ scrollTrigger: { trigger: '#artifact-section-2', start: 'top 65%' } })
        .to('#artifact-section-2 .sec-num', { opacity: 1, duration: 0.4 })
        .to('#artifact-section-2 .sec-tag', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.1')
        .to('#artifact-section-2 .sec-h2', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2')
        .to('#artifact-section-2 .sec-body', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .to('#artifact-section-2 .skill-bars', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');

      // Section 3 reveal
      gsap.timeline({ scrollTrigger: { trigger: '#artifact-section-3', start: 'top 65%', onEnter: () => setMapVisible(true) } })
        .to('#artifact-section-3 .sec-num', { opacity: 1, duration: 0.4 })
        .to('#artifact-section-3 .sec-tag', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.1')
        .to('#artifact-section-3 .sec-h2', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2')
        .to('#artifact-section-3 .map-reveal', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.4')
        .to('#artifact-section-3 .country-card', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1 }, '-=0.4');

      // Sidebar active states
      ['#artifact-section-1', '#artifact-section-2', '#artifact-section-3'].forEach((id, idx) => {
        ScrollTrigger.create({
          trigger: id,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => { if (self.isActive) setActiveSidebar(idx); },
        });
      });

      // Hide HUD readout when leaving hero
      ScrollTrigger.create({
        trigger: '#artifact-section-2',
        start: 'top 85%',
        onEnter: () => {
          if (heroCoordsRef.current) gsap.to(heroCoordsRef.current, { opacity: 0, duration: 0.4 });
        },
        onLeaveBack: () => {
          if (heroCoordsRef.current) gsap.to(heroCoordsRef.current, { opacity: 1, duration: 0.4 });
        },
      });
    }, containerRef);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      ctxGSAP.revert();
    };
  }, [mounted]);

  if (!mounted) return <section className="w-full h-screen bg-[#000000]" />;

  return (
    <div
      ref={containerRef}
      id="artifact-3d-section"
      className="relative w-full bg-[#000000] text-white font-inter select-none"
    >
      {/* ── FIXED CANVAS ── */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[2] opacity-0"
        style={{ width: '100vw', height: '100vh' }}
      />

      <div ref={scanlinesRef} className="fixed inset-0 pointer-events-none z-[3] opacity-0" />

      {/* ── HUD TOP-LEFT ── */}
      <div ref={hudCornerTLRef} className="fixed top-20 left-10 z-[10] pointer-events-none opacity-0 hidden md:block">
        <svg width="36" height="36" fill="none">
          <path d="M36 1H1v35" stroke="rgba(255,140,0,0.35)" strokeWidth="1" />
        </svg>
      </div>

      {/* ── HUD BOTTOM-RIGHT ── */}
      <div
        ref={hudCornerBRRef}
        className="fixed bottom-8 right-10 z-[10] pointer-events-none opacity-0 flex-col items-end gap-2 hidden md:flex"
      >
        <div ref={hudReadoutRef} className="font-mono text-[9px] text-white/40 leading-relaxed text-right">
          X: +0.000<br />Y: +0.000<br />Z: +7.000
        </div>
        <svg width="36" height="36" fill="none" className="rotate-180">
          <path d="M36 1H1v35" stroke="rgba(255,140,0,0.35)" strokeWidth="1" />
        </svg>
      </div>

      {/* ── SIDEBAR PROGRESS ── */}
      <div
        ref={sidebarRef}
        className="fixed left-8 top-1/2 -translate-y-1/2 z-[10] opacity-0 flex-col gap-4 hidden lg:flex"
      >
        {[
          { label: 'Intro', idx: 0 },
          { label: 'Skills', idx: 1 },
          { label: 'Services', idx: 2 },
        ].map((item) => (
          <div key={item.idx} className="flex items-center gap-2.5">
            <div
              className={`h-px transition-all duration-400 ${activeSidebar === item.idx ? 'w-7 bg-[#FF8C00]' : 'w-4 bg-white/20'}`}
            />
            <span className={`font-mono text-[9px] uppercase tracking-widest transition-colors duration-400 ${activeSidebar === item.idx ? 'text-[#FF8C00]' : 'text-white/25'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── SCROLLABLE CONTENT ── */}
      <div className="relative z-[5]">

        {/* ═══════════════════════════════════════════════
            SECTION 1 — Hero / Intro
        ═══════════════════════════════════════════════ */}
        <section
          id="artifact-section-1"
          className="min-h-screen flex flex-col justify-between px-5 py-8 sm:px-12 sm:py-12 lg:px-16 pt-24 mb-[35vh] md:mb-[65vh]"
        >
          <div className="flex flex-col items-center text-center mt-[3vh]">
            {/* eyebrow */}
            <p className="font-mono text-[9px] tracking-[0.45em] uppercase text-[#FF8C00] mb-4">
              Full-Stack Developer &amp; Digital Marketer · 2026
            </p>

            <h1 className="art-hero-title font-sora font-extrabold text-[clamp(2.4rem,6.5vw,7rem)] uppercase leading-[0.9] tracking-[-0.025em] text-white opacity-0 translate-y-8">
              Craft.&nbsp;Code.<br />
              <span className="text-[#FF8C00]">Convert.</span>
            </h1>

            <div className="art-hero-meta text-center opacity-0 translate-y-5 mt-6 max-w-[42ch] mx-auto">
              <p className="font-inter text-[11px] text-white/55 leading-[1.75]">
                I design and engineer digital products that look stunning and&nbsp;perform at scale —
                then drive real traffic, leads and revenue through data-backed marketing systems.
              </p>
            </div>

            {/* KPI strip */}
            <div className="art-hero-kpis opacity-0 translate-y-4 mt-8 grid grid-cols-2 sm:grid-cols-4 gap-px w-full max-w-xl border border-white/[0.07] rounded-xl overflow-hidden">
              {[
                { val: '50+', lbl: 'Projects Shipped' },
                { val: '3×', lbl: 'Avg. ROAS' },
                { val: '98', lbl: 'PageSpeed Score' },
                { val: '5⭑', lbl: 'Client Rating' },
              ].map((k) => (
                <div key={k.lbl} className="bg-white/[0.03] px-4 py-4 text-center">
                  <div className="font-sora font-extrabold text-[1.4rem] text-[#FF8C00] leading-none">{k.val}</div>
                  <div className="font-mono text-[8px] uppercase tracking-[0.18em] text-white/35 mt-1">{k.lbl}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center items-end relative mt-8">
            <div className="art-hero-cta flex flex-col items-center gap-5 opacity-0 translate-y-5">
              <span className="font-mono text-[8.5px] tracking-[0.32em] uppercase text-white/45">
                Scroll to explore
              </span>
              <div className="w-10 h-10 rounded-full border border-white/15 flex items-center justify-center animate-bounce hover:border-[#FF8C00] transition-colors">
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2v12M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div
              ref={heroCoordsRef}
              className="font-mono text-[8px] text-white/20 text-right leading-[1.8] absolute right-0 bottom-0 hidden sm:block"
            >
              φ 000.00° · θ 000.00°<br />NODES: 2500+ · CELLS: 50×50
            </div>
          </div>
        </section>

        <div className="w-full h-px bg-white/[0.04]" />

        {/* ═══════════════════════════════════════════════
            SECTION 2 — Skills / Expertise
        ═══════════════════════════════════════════════ */}
        <section
          id="artifact-section-2"
          className="min-h-screen mb-[35vh] md:mb-[65vh] grid grid-cols-1 lg:grid-cols-2"
        >
          {/* left spacer (canvas lives here) */}
          <div className="hidden lg:block" />

          <div className="flex flex-col justify-center px-6 py-10 sm:px-12 sm:py-14 lg:px-16 border-l border-white/[0.04] bg-black/40 lg:bg-transparent">
            <div className="sec-num font-mono text-[8px] tracking-[0.22em] text-white/15 mb-10 opacity-0">
              02 / 03
            </div>
            <p className="sec-tag font-mono text-[9px] tracking-[0.28em] uppercase text-[#FF8C00] mb-4 opacity-0 translate-y-4">
              {'// Technical Expertise'}
            </p>
            <h2 className="sec-h2 font-sora font-bold text-[clamp(2rem,3.8vw,3.4rem)] leading-[1.0] tracking-[-0.03em] mb-5 opacity-0 translate-y-6">
              Two disciplines.<br />One workflow.
            </h2>
            <p className="sec-body font-inter text-[11px] leading-[1.85] text-white/50 max-w-[38ch] mb-8 opacity-0 translate-y-4">
              From component architecture to paid media optimisation — I operate across the full
              stack of digital growth. Every pixel is intentional; every campaign is measurable.
            </p>

            <div className="skill-bars opacity-0 translate-y-4 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-7">
              {/* Web Dev */}
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#FF8C00] mb-4">Web Development</p>
                <div className="flex flex-col gap-3">
                  {webSkills.map((s) => (
                    <div key={s.label}>
                      <div className="flex justify-between mb-1">
                        <span className="font-mono text-[9px] text-white/60">{s.label}</span>
                        <span className="font-mono text-[9px] text-[#FF8C00]">{s.pct}%</span>
                      </div>
                      <div className="h-px bg-white/10 relative overflow-hidden rounded-full">
                        <div
                          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#FF8C00] to-[#FFB347] rounded-full"
                          style={{ width: `${s.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Digital Marketing */}
              <div>
                <p className="font-mono text-[8px] uppercase tracking-[0.22em] text-[#FF8C00] mb-4">Digital Marketing</p>
                <div className="flex flex-col gap-3">
                  {mktSkills.map((s) => (
                    <div key={s.label}>
                      <div className="flex justify-between mb-1">
                        <span className="font-mono text-[9px] text-white/60">{s.label}</span>
                        <span className="font-mono text-[9px] text-[#FF8C00]">{s.pct}%</span>
                      </div>
                      <div className="h-px bg-white/10 relative overflow-hidden rounded-full">
                        <div
                          className="absolute left-0 top-0 h-full bg-gradient-to-r from-[#FF8C00] to-[#FFB347] rounded-full"
                          style={{ width: `${s.pct}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* inline stat strip */}
            <div className="skill-bars grid grid-cols-3 border-t border-white/[0.06] pt-6 mt-8 opacity-0 translate-y-4">
              {[
                { val: '50+', lbl: 'Projects' },
                { val: '99%', lbl: 'On-time' },
                { val: '4yr+', lbl: 'Experience' },
              ].map((s) => (
                <div key={s.lbl}>
                  <div className="font-sora font-extrabold text-[1.55rem] text-[#FF8C00] leading-none">{s.val}</div>
                  <div className="font-mono text-[7.5px] tracking-[0.18em] uppercase text-white/30 mt-1">{s.lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div className="w-full h-px bg-white/[0.04]" />

        {/* ═══════════════════════════════════════════════
            SECTION 3 — Global Reach
        ═══════════════════════════════════════════════ */}
        <section
          id="artifact-section-3"
          className="min-h-screen mb-[8vh] px-5 py-10 sm:px-12 sm:py-16 lg:px-20"
        >
          {/* ─ Header ────────────────────────────────────────────── */}
          <div className="flex flex-col items-start mb-8">
            <div className="sec-num font-mono text-[8px] tracking-[0.22em] text-white/15 mb-8 opacity-0">
              03 / 03
            </div>
            <p className="sec-tag font-mono text-[9px] tracking-[0.28em] uppercase text-[#FF8C00] mb-3 opacity-0 translate-y-4">
              {'// Global Reach'}
            </p>
            <h2 className="sec-h2 font-sora font-bold text-[clamp(2rem,4vw,3.6rem)] leading-[1.0] tracking-[-0.03em] opacity-0 translate-y-6">
              Delivered across<br />
              <span className="text-[#FF8C00]">5 countries.</span>
            </h2>
            <p className="sec-h2 font-inter text-[11px] text-white/45 leading-[1.8] mt-4 max-w-[44ch] opacity-0 translate-y-6">
              From Sri Lanka to Europe and beyond — I&apos;ve partnered with clients across four
              continents, delivering web and marketing solutions that drive measurable growth.
            </p>
          </div>

          {/* ─ SVG World Map (Hidden on mobile) ──────────────────────── */}
          <div className="map-reveal hidden sm:block opacity-0 translate-y-8 relative w-full rounded-2xl border border-white/[0.07] bg-white/[0.015] overflow-hidden" style={{ aspectRatio: '1000/440' }}>

            {/* Grid background */}
            <svg
              className="absolute inset-0 w-full h-full"
              viewBox="0 0 1000 440"
              preserveAspectRatio="xMidYMid meet"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* lat/lon grid */}
              <defs>
                <pattern id="map-grid" x="0" y="0" width="55.55" height="44" patternUnits="userSpaceOnUse">
                  <path d="M 55.55 0 L 0 0 0 44" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.6" />
                </pattern>
                <radialGradient id="home-glow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FF8C00" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#FF8C00" stopOpacity="0" />
                </radialGradient>
                {COUNTRIES.map((c, i) => (
                  <radialGradient key={i} id={`glow-${i}`} cx="50%" cy="50%" r="50%">
                    <stop offset="0%" stopColor={c.color} stopOpacity="0.45" />
                    <stop offset="100%" stopColor={c.color} stopOpacity="0" />
                  </radialGradient>
                ))}
              </defs>

              <rect width="1000" height="440" fill="url(#map-grid)" />

              {/* Equator & Prime Meridian */}
              <line x1="0" y1="220" x2="1000" y2="220" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" strokeDasharray="4 8" />
              <line x1="500" y1="0" x2="500" y2="440" stroke="rgba(255,255,255,0.07)" strokeWidth="0.8" strokeDasharray="4 8" />

              {/* Continent silhouettes (simplified dot fills) */}
              {/* Europe dot-cluster */}
              {[[460,95],[470,98],[480,92],[490,96],[500,100],[510,94],[520,98],[475,105],[485,108],[495,112],[465,88],[478,85]].map(([dx,dy],i) => (
                <circle key={`eu${i}`} cx={dx} cy={dy} r="2" fill="rgba(255,255,255,0.07)" />
              ))}
              {/* Africa dot-cluster */}
              {[[505,200],[515,215],[520,230],[510,245],[505,260],[510,275],[520,290],[515,305],[505,318],[500,330],[510,340],[520,320],[530,300],[525,280],[530,265],[520,250],[525,235],[530,220],[535,208],[525,197],[515,188],[505,182],[495,188],[490,200],[490,215],[495,230],[490,245],[490,260],[495,275],[500,285]].map(([dx,dy],i) => (
                <circle key={`af${i}`} cx={dx} cy={dy} r="2" fill="rgba(255,255,255,0.06)" />
              ))}
              {/* South Asia dot-cluster */}
              {[[680,180],[690,185],[700,190],[710,195],[720,200],[730,190],[740,185],[720,210],[710,215],[700,205],[690,210],[710,220],[720,225],[730,220],[700,225]].map(([dx,dy],i) => (
                <circle key={`as${i}`} cx={dx} cy={dy} r="2" fill="rgba(255,255,255,0.06)" />
              ))}
              {/* Americas outline dots */}
              {[[200,100],[210,115],[205,130],[215,145],[210,160],[220,175],[215,190],[225,205],[230,220],[235,235],[240,250],[250,265],[255,280],[250,295],[245,310],[240,325],[245,340],[255,355],[250,370],[255,385]].map(([dx,dy],i) => (
                <circle key={`am${i}`} cx={dx} cy={dy} r="1.5" fill="rgba(255,255,255,0.05)" />
              ))}
              {/* Australia dots */}
              {[[810,310],[825,305],[840,310],[855,315],[840,325],[825,320],[810,325],[820,335],[835,330],[845,335]].map(([dx,dy],i) => (
                <circle key={`au${i}`} cx={dx} cy={dy} r="2" fill="rgba(255,255,255,0.06)" />
              ))}

              {/* Animated arcs from HOME to each country */}
              {mapVisible && COUNTRIES.map((c, i) => {
                // Arc control point: midpoint pulled toward equator line
                const mx = (HOME.x + c.x) / 2;
                const my = Math.min(HOME.y, c.y) - 60 - Math.abs(HOME.x - c.x) * 0.06;
                const pathD = `M${HOME.x},${HOME.y} Q${mx},${my} ${c.x},${c.y}`;
                return (
                  <g key={i}>
                    {/* glow arc */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={c.color}
                      strokeWidth="0.8"
                      strokeOpacity="0.18"
                      strokeDasharray="4 6"
                    />
                    {/* bright arc */}
                    <path
                      d={pathD}
                      fill="none"
                      stroke={c.color}
                      strokeWidth="1.2"
                      strokeOpacity="0.55"
                      strokeLinecap="round"
                      strokeDasharray="1000"
                      strokeDashoffset="0"
                      style={{
                        animation: `drawArc 1.6s ${0.3 + i * 0.25}s ease-out both`,
                      }}
                    />
                  </g>
                );
              })}

              {/* Home base glow */}
              <ellipse cx={HOME.x} cy={HOME.y} rx="28" ry="28" fill="url(#home-glow)" />

              {/* Country dots + glows */}
              {COUNTRIES.map((c, i) => (
                <g key={i}>
                  <ellipse cx={c.x} cy={c.y} rx="20" ry="20" fill={`url(#glow-${i})`} opacity={activeCountry === i ? 1 : 0.6} />
                  <circle
                    cx={c.x} cy={c.y} r="5"
                    fill={c.color}
                    opacity={mapVisible ? 1 : 0}
                    style={{ cursor: 'pointer', transition: 'r 0.2s', filter: activeCountry === i ? `drop-shadow(0 0 6px ${c.color})` : 'none' }}
                    onMouseEnter={() => setActiveCountry(i)}
                    onMouseLeave={() => setActiveCountry(null)}
                  />
                  <circle cx={c.x} cy={c.y} r="8" fill="none" stroke={c.color} strokeWidth="0.8" strokeOpacity="0.4"
                    style={{ animation: `ping 2s ${i * 0.4}s ease-out infinite` }}
                  />
                  {/* label */}
                  <text
                    x={c.x + (c.x > 600 ? -12 : 10)}
                    y={c.y - 10}
                    fill={c.color}
                    fontSize="7"
                    fontFamily="monospace"
                    opacity="0.8"
                    textAnchor={c.x > 600 ? 'end' : 'start'}
                  >
                    {c.name.toUpperCase()}
                  </text>
                </g>
              ))}

              {/* Home dot */}
              <circle cx={HOME.x} cy={HOME.y} r="6" fill="#FF8C00" />
              <circle cx={HOME.x} cy={HOME.y} r="10" fill="none" stroke="#FF8C00" strokeWidth="1" strokeOpacity="0.5"
                style={{ animation: 'ping 2s ease-out infinite' }}
              />
              <text x={HOME.x + 13} y={HOME.y + 3} fill="#FF8C00" fontSize="7.5" fontFamily="monospace" fontWeight="bold">
                {HOME.name.toUpperCase()} ● HOME
              </text>
            </svg>

            {/* Map legend */}
            <div className="absolute bottom-3 right-4 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#FF8C00] inline-block" />
                <span className="font-mono text-[7.5px] text-white/35 uppercase tracking-wider">Home Base</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-px bg-[#FFB347] inline-block" style={{ boxShadow: '0 0 4px #FFB347' }} />
                <span className="font-mono text-[7.5px] text-white/35 uppercase tracking-wider">Client Connection</span>
              </div>
            </div>

            {/* Coordinates overlay */}
            <div className="absolute top-3 left-4 font-mono text-[7.5px] text-white/20 leading-[1.7]">
              LAT 7.8731° N · LON 80.7718° E<br />
              ORIGIN: COLOMBO, SRI LANKA
            </div>
          </div>

          {/* CSS keyframes for animations */}
          <style>{`
            @keyframes drawArc {
              from { stroke-dashoffset: 1000; }
              to   { stroke-dashoffset: 0; }
            }
            @keyframes ping {
              0%   { transform-origin: center; transform: scale(1); opacity: 0.6; }
              70%  { transform: scale(1.8); opacity: 0; }
              100% { transform: scale(1.8); opacity: 0; }
            }
          `}</style>

          {/* ─ Flag Strip — Compact Luxury Auto-Scrolling Marquee ─────────────────────── */}
          <style>{`
            .flag-marquee-wrapper {
              mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
              -webkit-mask-image: linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%);
            }
            @keyframes flagMarquee {
              0% { transform: translateX(0); }
              100% { transform: translateX(-33.333333%); }
            }
            .flag-marquee-track {
              display: flex;
              gap: 12px;
              width: max-content;
              animation: flagMarquee 20s linear infinite;
            }
            .flag-marquee-wrapper:hover .flag-marquee-track {
              animation-play-state: paused;
            }
            .flag-card-inner { transition: transform 0.4s cubic-bezier(0.22,1,0.36,1); }
            .flag-card:hover .flag-card-inner { transform: scale(1.06); }
          `}</style>

          {/* Header & count */}
          <div className="mt-8 mb-4 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FF8C00] animate-pulse" />
              <span className="font-mono text-[8.5px] uppercase tracking-[0.25em] text-white/50">Global Work &amp; Partners</span>
            </div>
            <span className="font-mono text-[8px] text-[#FF8C00] tracking-[0.2em] bg-[#FF8C00]/10 border border-[#FF8C00]/25 rounded-full px-2.5 py-0.5">
              5 COUNTRIES
            </span>
          </div>

          {/* Continuous Auto-Scrolling Marquee Slider */}
          <div className="flag-marquee-wrapper relative w-full overflow-hidden py-2">
            <div className="flag-marquee-track">
              {/* Loop 3 times for seamless infinite scroll */}
              {[...Array(3)].flatMap((_, loopIdx) =>
                [HOME, ...COUNTRIES].map((item, i) => {
                  const isHome = 'flagSrc' in item && item.name === 'Sri Lanka';
                  const key = `flag-${loopIdx}-${i}`;
                  return (
                    <div
                      key={key}
                      className="flag-card country-card flex-shrink-0 relative w-[135px] sm:w-[170px] h-[95px] sm:h-[115px] rounded-xl overflow-hidden cursor-pointer group border border-white/10 hover:border-[#FF8C00]/60 transition-all duration-300 shadow-lg bg-black/60"
                      onMouseEnter={() => !isHome && setActiveCountry(i - 1)}
                      onMouseLeave={() => setActiveCountry(null)}
                    >
                      {/* Flag Image Background */}
                      <div className="flag-card-inner absolute inset-0">
                        <Image
                          src={item.flagSrc}
                          alt={`${item.name} flag`}
                          fill
                          className="object-cover opacity-75 group-hover:opacity-90 transition-opacity duration-300"
                          sizes="(max-width: 640px) 135px, 170px"
                        />
                      </div>

                      {/* Dark Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10 group-hover:from-black/95 transition-all duration-300" />

                      {/* Accent glow on hover */}
                      <div
                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                        style={{
                          background: `radial-gradient(circle at bottom, ${item.color}33 0%, transparent 70%)`,
                        }}
                      />

                      {/* Top Tag/Badge */}
                      <div className="absolute top-2 left-2.5 right-2.5 flex items-center justify-between z-10">
                        {isHome ? (
                          <span className="font-mono text-[6.5px] sm:text-[7px] tracking-[0.2em] uppercase bg-[#FF8C00] text-black px-1.5 py-0.5 rounded font-extrabold shadow">
                            ORIGIN
                          </span>
                        ) : (
                          <span className="font-mono text-[6.5px] sm:text-[7px] tracking-[0.15em] uppercase text-white/40">
                            PARTNER
                          </span>
                        )}
                        <span className="font-mono text-[6.5px] text-white/30">0{i + 1}</span>
                      </div>

                      {/* Bottom Info Text */}
                      <div className="absolute bottom-2 left-2.5 right-2.5 z-10">
                        <div className="font-sora font-bold text-[10px] sm:text-[11.5px] text-white leading-tight drop-shadow-sm group-hover:text-[#FF8C00] transition-colors duration-300">
                          {item.name}
                        </div>
                        <div className="font-mono text-[6.5px] sm:text-[7.5px] uppercase tracking-[0.15em] text-[#FF8C00]/80 mt-0.5 truncate">
                          {item.role}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Micro hint */}
          <div className="flex justify-center items-center gap-2 mt-2">
            <span className="font-mono text-[7px] text-white/25 uppercase tracking-[0.2em]">
              Auto-sliding · Hover to pause
            </span>
          </div>

          {/* ─ CTA ─────────────────────────────────────────────── */}
          <div className="mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              href="#contact-section"
              className="inline-flex items-center gap-2 bg-[#FF8C00] text-black font-sora font-extrabold text-[10px] px-6 py-3 rounded-full uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-[0_0_24px_rgba(255,140,0,0.35)]"
            >
              <span>Start a Project</span>
              <span>↗</span>
            </Link>
            <span className="font-mono text-[9px] text-white/30 tracking-[0.15em]">
              Worldwide remote · Free consultation
            </span>
          </div>
        </section>

      </div>
    </div>
  );
}
