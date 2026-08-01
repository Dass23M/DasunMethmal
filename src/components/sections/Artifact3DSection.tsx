'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Artifact3DSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scanlinesRef = useRef<HTMLDivElement>(null);
  const hudCornerTLRef = useRef<HTMLDivElement>(null);
  const hudCornerBRRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const hudReadoutRef = useRef<HTMLDivElement>(null);
  const heroCoordsRef = useRef<HTMLDivElement>(null);
  const [activeSidebar, setActiveSidebar] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Mouse HUD Tracking
  useEffect(() => {
    if (!mounted) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = ((e.clientX / window.innerWidth) * 2 - 1).toFixed(3);
      const y = (-(e.clientY / window.innerHeight) * 2 + 1).toFixed(3);

      if (hudReadoutRef.current) {
        hudReadoutRef.current.innerHTML =
          `X: ${Number(x) > 0 ? '+' : ''}${x}<br />Y: ${Number(y) > 0 ? '+' : ''}${y}<br />Z: +7.000`;
      }

      const phi = ((e.clientX / window.innerWidth) * 360).toFixed(2).padStart(6, '0');
      const theta = ((e.clientY / window.innerHeight) * 180).toFixed(2).padStart(6, '0');

      if (heroCoordsRef.current) {
        heroCoordsRef.current.innerHTML = `φ ${phi}° · θ ${theta}°<br />FRAGMENTS: 2500+ · CELLS: 50×50`;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
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

    // Torus parameters
    const R = Math.min(width, height) * 0.22;
    const r = Math.min(width, height) * 0.08;
    const segMajor = 32;
    const segMinor = 16;

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
      ctx.clearRect(0, 0, width, height);
      rotY += 0.006;

      // Major torus rings
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
        ctx.strokeStyle = `rgba(255, 107, 0, ${0.25 + (i % 2 === 0 ? 0.2 : 0)})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Cross-section tubes
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
        ctx.strokeStyle = 'rgba(255, 168, 0, 0.2)';
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }

      // Inner core nodes
      for (let k = 0; k < 20; k++) {
        const angle = (k / 20) * Math.PI * 2 + rotY;
        const cx = R * 0.4 * Math.cos(angle);
        const cy = R * 0.4 * Math.sin(angle);
        const cz = Math.sin(angle * 3) * 20;
        const { px, py, scale } = project3D(cx, cy, cz);
        ctx.beginPath();
        ctx.arc(px, py, Math.max(1, 2.5 * scale), 0, Math.PI * 2);
        ctx.fillStyle = '#FF6B00';
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // GSAP ScrollTrigger — show canvas & HUD only when inside this section
    const ctxGSAP = gsap.context(() => {
      // Fade in all fixed overlays when entering section
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        onEnter: () => {
          gsap.to([canvas, scanlinesRef.current], { opacity: 1, duration: 0.6 });
          gsap.to([hudCornerTLRef.current, hudCornerBRRef.current, sidebarRef.current], {
            opacity: 1, duration: 0.6, stagger: 0.1,
          });
        },
        onLeave: () => {
          gsap.to([canvas, scanlinesRef.current, hudCornerTLRef.current, hudCornerBRRef.current, sidebarRef.current], {
            opacity: 0, duration: 0.4,
          });
        },
        onEnterBack: () => {
          gsap.to([canvas, scanlinesRef.current], { opacity: 1, duration: 0.4 });
          gsap.to([hudCornerTLRef.current, hudCornerBRRef.current, sidebarRef.current], {
            opacity: 1, duration: 0.4,
          });
        },
        onLeaveBack: () => {
          gsap.to([canvas, scanlinesRef.current, hudCornerTLRef.current, hudCornerBRRef.current, sidebarRef.current], {
            opacity: 0, duration: 0.4,
          });
        },
        onUpdate: (self) => {
          scrollRotY = self.progress * Math.PI * 3;
        },
      });

      // Section 1 entrance
      gsap.timeline({ scrollTrigger: { trigger: '#artifact-section-1', start: 'top 80%' } })
        .to('.art-hero-title', { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' })
        .to('.art-hero-meta', { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, '-=0.5')
        .to('.art-hero-cta', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4');

      // Section 2 reveal
      gsap.timeline({ scrollTrigger: { trigger: '#artifact-section-2', start: 'top 65%' } })
        .to('#artifact-section-2 .sec-num', { opacity: 1, duration: 0.4 })
        .to('#artifact-section-2 .sec-tag', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.1')
        .to('#artifact-section-2 .sec-h2', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2')
        .to('#artifact-section-2 .sec-body', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .to('#artifact-section-2 .stats', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');

      // Section 3 reveal
      gsap.timeline({ scrollTrigger: { trigger: '#artifact-section-3', start: 'top 65%' } })
        .to('#artifact-section-3 .sec-num', { opacity: 1, duration: 0.4 })
        .to('#artifact-section-3 .sec-tag', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.1')
        .to('#artifact-section-3 .sec-h2', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2')
        .to('#artifact-section-3 .sec-body', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .to('#artifact-section-3 .feat-list', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');

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

  if (!mounted) return <section className="w-full h-screen bg-[#0A0B0E]" />;

  return (
    <div
      ref={containerRef}
      id="artifact-3d-section"
      className="relative w-full bg-[#0A0B0E] text-white font-inter select-none"
    >
      {/* ── FIXED FULL-SCREEN CANVAS (same pattern as original source) ── */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-[2] opacity-0"
        style={{ width: '100vw', height: '100vh' }}
      />

      {/* ── FIXED SCANLINES (same as original source) ── */}
      <div
        ref={scanlinesRef}
        className="fixed inset-0 pointer-events-none z-[3] opacity-0"
        style={{
          background: 'repeating-linear-gradient(to bottom, transparent 0px, transparent 3px, rgba(0,0,0,0.08) 3px, rgba(0,0,0,0.08) 4px)',
        }}
      />

      {/* ── FIXED HUD TOP-LEFT CORNER ── */}
      <div ref={hudCornerTLRef} className="fixed top-20 left-12 z-[10] pointer-events-none opacity-0 hidden md:block">
        <svg width="40" height="40" fill="none">
          <path d="M40 1H1v39" stroke="rgba(255,107,0,0.3)" strokeWidth="1" />
        </svg>
      </div>

      {/* ── FIXED HUD BOTTOM-RIGHT READOUT ── */}
      <div
        ref={hudCornerBRRef}
        className="fixed bottom-10 right-12 z-[10] pointer-events-none opacity-0 flex-col items-end gap-2 hidden md:flex"
      >
        <div ref={hudReadoutRef} className="font-mono text-[10px] text-white/40 leading-relaxed text-right">
          X: +0.000<br />Y: +0.000<br />Z: +7.000
        </div>
        <svg width="40" height="40" fill="none" className="rotate-180">
          <path d="M40 1H1v39" stroke="rgba(255,107,0,0.3)" strokeWidth="1" />
        </svg>
      </div>

      {/* ── FIXED SIDEBAR PROGRESS ── */}
      <div
        ref={sidebarRef}
        className="fixed left-10 top-1/2 -translate-y-1/2 z-[10] opacity-0 flex-col gap-5 hidden lg:flex"
      >
        {[
          { label: 'Hero', idx: 0 },
          { label: 'Architecture', idx: 1 },
          { label: 'Interaction', idx: 2 },
        ].map((item) => (
          <div key={item.idx} className="flex items-center gap-3">
            <div
              className={`h-[1px] transition-all duration-400 ${
                activeSidebar === item.idx ? 'w-8 bg-[#FF6B00]' : 'w-5 bg-white/20'
              }`}
            />
            <span className={`font-mono text-[10px] uppercase tracking-widest transition-colors duration-400 ${
              activeSidebar === item.idx ? 'text-[#FF6B00]' : 'text-white/25'
            }`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* ── SCROLLABLE CONTENT ── */}
      <div className="relative z-[5]">

        {/* SECTION 1 — Hero */}
        <section
          id="artifact-section-1"
          className="min-h-screen flex flex-col justify-between p-6 sm:p-12 lg:p-[3rem] pt-28 mb-[70vh]"
        >
          <div className="flex flex-col items-center text-center mt-[4vh]">
            <h1 className="art-hero-title font-sora font-extrabold text-[clamp(3rem,7vw,7.5rem)] uppercase leading-[0.92] tracking-[-0.02em] text-white opacity-0 translate-y-8">
              The future<br />is <span className="text-[#FF6B00]">digital craft.</span>
            </h1>

            <div className="art-hero-meta text-center opacity-0 translate-y-5 mt-8">
              <span className="font-mono text-xs tracking-[0.4em] uppercase text-[#FF6B00] block mb-3">
                Generative 3D · 2026
              </span>
              <p className="font-inter text-sm text-white/50 max-w-[40ch] leading-[1.6] mx-auto">
                Procedural code shell.<br />Wireframe engineering core.<br />Scroll to break open.
              </p>
            </div>
          </div>

          <div className="flex justify-center items-end relative">
            <div className="art-hero-cta flex flex-col items-center gap-6 opacity-0 translate-y-5">
              <span className="font-mono text-[0.68rem] tracking-[0.3em] uppercase text-white/50">
                Scroll to explore
              </span>
              <div className="w-12 h-12 rounded-full border border-white/15 flex items-center justify-center animate-bounce hover:border-[#FF6B00] transition-colors">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2v12M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div
              ref={heroCoordsRef}
              className="font-mono text-[0.6rem] text-white/20 text-right leading-[1.8] absolute right-0 bottom-0 hidden sm:block"
            >
              φ 000.00° · θ 000.00°<br />FRAGMENTS: 2500+ · CELLS: 50×50
            </div>
          </div>
        </section>

        <div className="w-full h-[1px] bg-white/[0.04]" />

        {/* SECTION 2 — Architecture */}
        <section
          id="artifact-section-2"
          className="min-h-screen mb-[70vh] grid grid-cols-1 lg:grid-cols-2"
        >
          <div className="hidden lg:block" />
          <div className="flex flex-col justify-center p-8 sm:p-14 lg:p-[clamp(4rem,8vh,7rem)] border-l border-white/[0.04]">
            <div className="sec-num font-mono text-[0.6rem] tracking-[0.2em] text-white/15 mb-12 opacity-0">
              02 / 03
            </div>
            <p className="sec-tag font-mono text-[0.65rem] tracking-[0.25em] uppercase text-[#FF6B00] mb-6 opacity-0 translate-y-4">
              {"// Architecture"}
            </p>
            <h2 className="sec-h2 font-sora font-bold text-[clamp(2.2rem,4vw,3.8rem)] leading-[1] tracking-[-0.03em] mb-7 opacity-0 translate-y-6">
              Two layers.<br />One truth.
            </h2>
            <p className="sec-body font-inter text-[0.88rem] leading-[1.8] text-white/50 max-w-[36ch] mb-10 opacity-0 translate-y-4">
              Hundreds of modular components form the frontend shell — each with TypeScript types and clean API contracts. Beneath it, a GSAP & WebGL layer renders every interaction in realtime fire.
            </p>

            <div className="stats grid grid-cols-3 border-t border-white/[0.06] pt-8 opacity-0 translate-y-4">
              <div>
                <div className="font-sora font-extrabold text-[2rem] text-[#FF6B00] leading-[1]">15+</div>
                <div className="font-mono text-[0.58rem] tracking-[0.18em] uppercase text-white/30 mt-1">Projects</div>
              </div>
              <div>
                <div className="font-sora font-extrabold text-[2rem] text-[#FF6B00] leading-[1]">60fps</div>
                <div className="font-mono text-[0.58rem] tracking-[0.18em] uppercase text-white/30 mt-1">Realtime</div>
              </div>
              <div>
                <div className="font-sora font-extrabold text-[2rem] text-[#FF6B00] leading-[1]">0</div>
                <div className="font-mono text-[0.58rem] tracking-[0.18em] uppercase text-white/30 mt-1">Lag</div>
              </div>
            </div>
          </div>
        </section>

        <div className="w-full h-[1px] bg-white/[0.04]" />

        {/* SECTION 3 — Interaction */}
        <section
          id="artifact-section-3"
          className="min-h-screen mb-[10vh] grid grid-cols-1 lg:grid-cols-2"
        >
          <div className="flex flex-col justify-center p-8 sm:p-14 lg:p-[clamp(4rem,8vh,7rem)] border-r border-white/[0.04]">
            <div className="sec-num font-mono text-[0.6rem] tracking-[0.2em] text-white/15 mb-12 opacity-0">
              03 / 03
            </div>
            <p className="sec-tag font-mono text-[0.65rem] tracking-[0.25em] uppercase text-[#FF6B00] mb-6 opacity-0 translate-y-4">
              {"// Interaction"}
            </p>
            <h2 className="sec-h2 font-sora font-bold text-[clamp(2.2rem,4vw,3.8rem)] leading-[1] tracking-[-0.03em] mb-7 opacity-0 translate-y-6">
              Touch it.<br />Break it open.
            </h2>
            <p className="sec-body font-inter text-[0.88rem] leading-[1.8] text-white/50 max-w-[36ch] mb-10 opacity-0 translate-y-4">
              Move your cursor across the surface. Every interface element responds independently — revealing the luminous engineering system within.
            </p>

            <ul className="feat-list flex flex-col border-t border-white/[0.06] opacity-0 translate-y-4">
              {[
                'Next.js 14 · TypeScript · Tailwind CSS',
                'GSAP ScrollTrigger · spring animation',
                'Realtime 3D canvas · math projection',
                'Lenis smooth scroll · 60fps lock',
              ].map((feat, i) => (
                <li key={i} className="flex items-center gap-4 font-mono text-[0.72rem] tracking-[0.05em] text-white/50 py-4 border-b border-white/[0.04]">
                  <span className="text-[#FF6B00] text-[0.7rem]">→</span>
                  {feat}
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Link
                href="#contact-section"
                className="inline-flex items-center gap-2 bg-[#FF6B00] text-black font-sora font-extrabold text-xs px-6 py-3.5 rounded-full uppercase tracking-wider hover:bg-white transition-all duration-300 shadow-xl"
              >
                <span>START A PROJECT</span>
                <span>↗</span>
              </Link>
            </div>
          </div>
          <div className="hidden lg:block" />
        </section>

      </div>
    </div>
  );
}
