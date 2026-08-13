'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function GSAPFlipSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const scanlinesRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const navStatusRef = useRef<HTMLDivElement>(null);
  const hudTLRef = useRef<HTMLDivElement>(null);
  const hudBRRef = useRef<HTMLDivElement>(null);
  const hudReadoutRef = useRef<HTMLDivElement>(null);
  const heroCoordsRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const isSectionVisible = useRef(true);
  const [activeSidebar, setActiveSidebar] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobileDevice(window.innerWidth < 768);
  }, []);

  useEffect(() => {
    if (!mounted || !canvasRef.current || !containerRef.current) return;

    let animFrameId: number;
    let threeCleanup: (() => void) | null = null;

    // Detect mobile for hardware scaling
    const isMobile = window.innerWidth < 768;

    // ── Custom cursor logic (desktop only) ──────────────────────
    const cur = cursorRef.current;
    const ring = cursorRingRef.current;
    let mx = 0, my = 0, rx = 0, ry = 0;
    let cursorAF: number;
    let isPointerActive = false;

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      isPointerActive = true;
      if ('touches' in e && e.touches.length > 0) {
        mx = e.touches[0].clientX;
        my = e.touches[0].clientY;
      } else if ('clientX' in e) {
        mx = (e as MouseEvent).clientX;
        my = (e as MouseEvent).clientY;
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    if (!isMobile && cur && ring) {
      (function loopCursor() {
        rx += (mx - rx) * 0.15;
        ry += (my - ry) * 0.15;
        cur.style.transform = `translate3d(${mx}px, ${my}px, 0) translate(-50%, -50%)`;
        ring.style.transform = `translate3d(${rx}px, ${ry}px, 0) translate(-50%, -50%)`;
        cursorAF = requestAnimationFrame(loopCursor);
      })();
    }

    // ── HUD readout update ──────────────────────────────────────
    let clientX = 0, clientY = 0;
    let winW = typeof window !== 'undefined' ? window.innerWidth : 1000;
    let winH = typeof window !== 'undefined' ? window.innerHeight : 800;
    let hudRaf: number | null = null;

    const onResizeWin = () => {
      winW = window.innerWidth;
      winH = window.innerHeight;
    };
    window.addEventListener('resize', onResizeWin, { passive: true });

    const updateHUD = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      if (hudRaf === null) {
        hudRaf = requestAnimationFrame(() => {
          hudRaf = null;
          const w = winW || 1;
          const h = winH || 1;
          const x = ((clientX / w) * 2 - 1).toFixed(3);
          const y = (-(clientY / h) * 2 + 1).toFixed(3);
          if (hudReadoutRef.current) {
            hudReadoutRef.current.innerHTML =
              `X: ${Number(x) > 0 ? '+' : ''}${x}<br />Y: ${Number(y) > 0 ? '+' : ''}${y}<br />Z: +7.000`;
          }
          const phi = ((clientX / w) * 360).toFixed(2).padStart(6, '0');
          const theta = ((clientY / h) * 180).toFixed(2).padStart(6, '0');
          if (heroCoordsRef.current) {
            heroCoordsRef.current.innerHTML = `φ ${phi}° · θ ${theta}°<br />FRAGMENTS: ${isMobile ? '350+' : '1500+'}`;
          }
        });
      }
    };

    window.addEventListener('mousemove', updateHUD, { passive: true });
    window.addEventListener('touchmove', updateHUD, { passive: true });

    // ── 3D GEOMETRIC RING BACKGROUND RENDERER (from Artifact3DSection) ──
    (() => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx2d = canvas.getContext('2d');
      if (!ctx2d) return;

      let ringAnimFrameId: number;
      let width = (canvas.width = window.innerWidth);
      let height = (canvas.height = window.innerHeight);
      let rotX = 0.45;
      let rotY = 0;
      let scrollRotY = 0;
      let isRunning = true;

      const handleCanvasResize = () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
      };
      window.addEventListener('resize', handleCanvasResize);

      // Slightly smaller scale for GSAPFlipSection
      const R = Math.min(width, height) * (isMobile ? 0.14 : 0.17);
      const r = Math.min(width, height) * (isMobile ? 0.045 : 0.06);
      const segMajor = isMobile ? 22 : 36;
      const segMinor = isMobile ? 12 : 18;

      const project3D = (x: number, y: number, z: number) => {
        const cosY = Math.cos(rotY + scrollRotY);
        const sinY = Math.sin(rotY + scrollRotY);
        const x1 = x * cosY - z * sinY;
        const z1 = x * sinY + z * cosY;
        const cosX = Math.cos(rotX);
        const sinX = Math.sin(rotX);
        const y2 = y * cosX - z1 * sinX;
        const z2 = y * sinX + z1 * cosX;
        const fov = 480;
        const dist = 620;
        const scale = fov / (dist + z2);
        return { px: width / 2 + x1 * scale, py: height / 2 + y2 * scale, scale };
      };

      let isLoopActive = false;

      const renderRing = () => {
        if (!isRunning || !isSectionVisible.current) {
          isLoopActive = false;
          return;
        }
        isLoopActive = true;
        ctx2d.clearRect(0, 0, width, height);
        rotY += 0.005;

        // Major torus rings — Brand Orange (#FF6B00)
        for (let i = 0; i < segMajor; i++) {
          const u = (i / segMajor) * Math.PI * 2;
          ctx2d.beginPath();
          for (let j = 0; j <= segMinor; j++) {
            const v = (j / segMinor) * Math.PI * 2;
            const x = (R + r * Math.cos(v)) * Math.cos(u);
            const y = (R + r * Math.cos(v)) * Math.sin(u);
            const z = r * Math.sin(v);
            const { px, py } = project3D(x, y, z);
            j === 0 ? ctx2d.moveTo(px, py) : ctx2d.lineTo(px, py);
          }
          ctx2d.strokeStyle = i % 2 === 0 ? 'rgba(255,107,0,0.42)' : 'rgba(255,140,0,0.24)';
          ctx2d.lineWidth = i % 2 === 0 ? 1.2 : 0.8;
          ctx2d.stroke();
        }

        // Minor cross-section rings — Warm Orange Glow
        for (let j = 0; j < segMinor; j += 2) {
          const v = (j / segMinor) * Math.PI * 2;
          ctx2d.beginPath();
          for (let i = 0; i <= segMajor; i++) {
            const u = (i / segMajor) * Math.PI * 2;
            const x = (R + r * Math.cos(v)) * Math.cos(u);
            const y = (R + r * Math.cos(v)) * Math.sin(u);
            const z = r * Math.sin(v);
            const { px, py } = project3D(x, y, z);
            i === 0 ? ctx2d.moveTo(px, py) : ctx2d.lineTo(px, py);
          }
          ctx2d.strokeStyle = 'rgba(255,170,40,0.22)';
          ctx2d.lineWidth = 0.8;
          ctx2d.stroke();
        }

        // Orbiting orange node dots
        const nodeCount = isMobile ? 12 : 22;
        for (let k = 0; k < nodeCount; k++) {
          const angle = (k / nodeCount) * Math.PI * 2 + rotY * 1.2;
          const cx = R * 0.45 * Math.cos(angle);
          const cy = R * 0.45 * Math.sin(angle);
          const cz = Math.sin(angle * 3) * 18;
          const { px, py, scale } = project3D(cx, cy, cz);
          ctx2d.beginPath();
          ctx2d.arc(px, py, Math.max(1, 2.8 * scale), 0, Math.PI * 2);
          ctx2d.fillStyle = '#FF6B00';
          ctx2d.fill();
        }

        ringAnimFrameId = requestAnimationFrame(renderRing);
      };

      // Expose start function for the visibility trigger to use
      (containerRef as any)._startFlipLoop = () => {
        if (!isLoopActive && isRunning) {
          renderRing();
        }
      };

      // Start immediately
      renderRing();

      // GSAP ScrollTrigger for smooth scroll rotation
      const scrollTriggerObj = ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          scrollRotY = self.progress * Math.PI * 2;
        },
      });

      threeCleanup = () => {
        isRunning = false;
        cancelAnimationFrame(ringAnimFrameId);
        window.removeEventListener('resize', handleCanvasResize);
        scrollTriggerObj.kill();
      };
    })();

    // ── GSAP HUD & Content Entrance Animations ───────────────
    const gsapCtx = gsap.context(() => {
      if (navStatusRef.current) gsap.to(navStatusRef.current, { opacity: 1, duration: 1, delay: 1.2 });
      gsap.to([hudTLRef.current, hudBRRef.current].filter(Boolean), { opacity: 1, duration: 1, delay: 1.0, stagger: 0.2 });

      const sidebarLabels = document.querySelectorAll('.gsapflip-sidebar-label');
      if (sidebarLabels.length > 0) {
        gsap.to(sidebarLabels, { opacity: 1, x: 0, duration: 0.6, delay: 1.2, stagger: 0.1 });
      }

      gsap.timeline({ delay: 0.3 })
        .to('.gsapflip-hero-title', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' })
        .to('.gsapflip-hero-meta', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .to('.gsapflip-hero-cta', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
        .to('.gsapflip-hero-coords', { opacity: 1, duration: 0.4 }, '-=0.2')
        .to('.gsapflip-hover-hint', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.1');

      gsap.timeline({ scrollTrigger: { trigger: '#gsapflip-section-2', start: 'top 75%' } })
        .to('#gsapflip-section-2 .sec-num', { opacity: 1, duration: 0.4 })
        .to('#gsapflip-section-2 .sec-tag', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.1')
        .to('#gsapflip-section-2 .sec-h2', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2')
        .to('#gsapflip-section-2 .sec-body', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .to('#gsapflip-section-2 .stats', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');

      gsap.timeline({ scrollTrigger: { trigger: '#gsapflip-section-3', start: 'top 75%' } })
        .to('#gsapflip-section-3 .sec-num', { opacity: 1, duration: 0.4 })
        .to('#gsapflip-section-3 .sec-tag', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.1')
        .to('#gsapflip-section-3 .sec-h2', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2')
        .to('#gsapflip-section-3 .sec-body', { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }, '-=0.3')
        .to('#gsapflip-section-3 .feat-list', { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '-=0.2');

      // Sidebar active state
      ['#gsapflip-section-1', '#gsapflip-section-2', '#gsapflip-section-3'].forEach((id, i) => {
        ScrollTrigger.create({
          trigger: id,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => { if (self.isActive) setActiveSidebar(i); },
        });
      });

      // Hide HUD elements when leaving hero section
      ScrollTrigger.create({
        trigger: '#gsapflip-section-2',
        start: 'top 85%',
        onEnter: () => {
          gsap.to('.gsapflip-hover-hint', { opacity: 0, duration: 0.3 });
          gsap.to([hudTLRef.current, hudBRRef.current, heroCoordsRef.current].filter(Boolean), { opacity: 0, duration: 0.3 });
          if (sidebarRef.current) gsap.to(sidebarRef.current, { opacity: 0, duration: 0.3 });
        },
        onLeaveBack: () => {
          gsap.to('.gsapflip-hover-hint', { opacity: 1, duration: 0.3 });
          gsap.to([hudTLRef.current, hudBRRef.current, heroCoordsRef.current].filter(Boolean), { opacity: 1, duration: 0.3 });
          if (sidebarRef.current) gsap.to(sidebarRef.current, { opacity: 1, duration: 0.3 });
        },
      });

      // Overlay visibility trigger — controls ring loop + canvas + HUD visibility
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top bottom',
        end: 'bottom top',
        onEnter: () => {
          isSectionVisible.current = true;
          (containerRef.current as any)?._startFlipLoop?.();
          gsap.to([canvasRef.current].filter(Boolean), { opacity: 1, duration: 0.4 });
        },
        onLeave: () => {
          isSectionVisible.current = false;
          gsap.to([canvasRef.current, navStatusRef.current, hudTLRef.current, hudBRRef.current, sidebarRef.current].filter(Boolean), { opacity: 0, duration: 0.3 });
        },
        onEnterBack: () => {
          isSectionVisible.current = true;
          (containerRef.current as any)?._startFlipLoop?.();
          gsap.to([canvasRef.current].filter(Boolean), { opacity: 1, duration: 0.3 });
        },
        onLeaveBack: () => {
          isSectionVisible.current = false;
          gsap.to([canvasRef.current, navStatusRef.current, hudTLRef.current, hudBRRef.current, sidebarRef.current].filter(Boolean), { opacity: 0, duration: 0.3 });
        },
      });
    }, containerRef);

    return () => {
      cancelAnimationFrame(cursorAF);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('mousemove', updateHUD);
      window.removeEventListener('touchmove', updateHUD);
      gsapCtx.revert();
      threeCleanup?.();
    };
  }, [mounted]);

  if (!mounted) return <section className="w-full h-screen" style={{ background: '#080808' }} />;

  return (
    <div
      ref={containerRef}
      id="services-section"
      className="relative w-full overflow-hidden"
      style={{ background: '#080808', color: '#eee8de', fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif' }}
    >
      {/* ── 3D Ring Canvas Background (fixed to viewport) ───── */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 pointer-events-none"
        style={{ width: '100vw', height: '100vh', zIndex: 0, opacity: 0 }}
      />

      {/* ── Scanlines (Disabled for clean layout) ── */}
      <div
        ref={scanlinesRef}
        className="fixed inset-0 pointer-events-none"
        style={{
          zIndex: 5,
          opacity: 0,
          background: 'none',
        }}
      />

      {/* ── Custom Cursor (Desktop Only) ──────────────────── */}
      <div
        ref={cursorRef}
        className="fixed pointer-events-none hidden md:block"
        style={{
          width: 10, height: 10, borderRadius: '50%', background: '#ff4d00',
          zIndex: 9999, transform: 'translate(-50%, -50%)', mixBlendMode: 'screen',
        }}
      />
      <div
        ref={cursorRingRef}
        className="fixed pointer-events-none hidden md:block"
        style={{
          width: 40, height: 40, borderRadius: '50%', border: '1px solid rgba(255,77,0,0.5)',
          zIndex: 9998, transform: 'translate(-50%, -50%)',
        }}
      />

      {/* ── Responsive Top Navigation Bar ──────────────────── */}
      <nav
        className="fixed top-0 left-0 right-0 flex justify-between items-center pointer-events-none px-5 md:px-12 py-4 md:py-7"
        style={{
          zIndex: 100,
          borderBottom: '1px solid rgba(255,255,255,0.04)',
        }}
      >
        <span style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '0.65rem', letterSpacing: '0.25em', color: '#eee8de', opacity: 0.6 }}>
        </span>
        <div
          ref={navStatusRef}
          className="flex items-center gap-2.5"
          style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '0.6rem', letterSpacing: '0.15em', color: '#ff4d00', opacity: 0 }}
        >
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff4d00', animation: 'gsapflip-blink 1.4s ease-in-out infinite' }} />
        </div>
      </nav>

      {/* ── Sidebar Progress (Desktop Only) ────────────────── */}
      <div
        ref={sidebarRef}
        className="fixed hidden md:flex flex-col gap-6 items-start pointer-events-none"
        style={{ left: '2.5rem', top: '50%', transform: 'translateY(-50%)', zIndex: 100, opacity: 0 }}
      >
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex items-center">
            <div style={{
              width: activeSidebar === i ? 32 : 20,
              height: 1,
              background: activeSidebar === i ? '#ff4d00' : 'rgba(255,255,255,0.15)',
              transition: 'width 0.4s, background 0.4s',
            }} />
          </div>
        ))}
      </div>

      {/* ── HUD Corner Decorations (Desktop & Tablet) ─────── */}
      <div
        ref={hudTLRef}
        className="fixed pointer-events-none hidden sm:block"
        style={{ top: '4.5rem', left: '2.5rem', zIndex: 100, opacity: 0 }}
      >
        <svg width="32" height="32" fill="none">
          <path d="M32 1H1v31" stroke="rgba(255,77,0,0.3)" strokeWidth="1" />
        </svg>
      </div>

      <div
        ref={hudBRRef}
        className="fixed pointer-events-none hidden sm:flex flex-col items-end"
        style={{ bottom: '2rem', right: '2.5rem', zIndex: 100, opacity: 0, gap: '0.5rem' }}
      >
        <div
          ref={hudReadoutRef}
          style={{
            fontFamily: '"Courier New", Courier, monospace',
            fontSize: '0.6rem',
            letterSpacing: '0.12em',
            color: 'rgba(255,255,255,0.2)',
            lineHeight: 1.8,
            textAlign: 'right',
          }}
        >
          X: +0.000<br />Y: +0.000<br />Z: +7.000
        </div>
        <svg width="32" height="32" fill="none" style={{ transform: 'rotate(180deg)' }}>
          <path d="M32 1H1v31" stroke="rgba(255,77,0,0.3)" strokeWidth="1" />
        </svg>
      </div>

      {/* ── Scrollable Sections Container ──────────────────── */}
      <div className="relative" style={{ zIndex: 10, pointerEvents: 'none' }}>

        {/* SECTION 1 — Hero */}
        <section
          id="gsapflip-section-1"
          className="min-h-screen mb-[30vh] md:mb-[60vh] flex flex-col justify-between px-5 sm:px-8 md:px-12 pt-24 md:pt-32 pb-12 relative"
        >
          <div className="flex flex-col items-center pt-4 md:pt-[4vh]">
            <h2
              className="gsapflip-hero-title text-[clamp(2.5rem,8vw,7.5rem)] font-extrabold leading-[0.95] tracking-tight text-center uppercase"
              style={{ opacity: 0, transform: 'translateY(30px)' }}
            >
              The future<br />is <span style={{ color: '#ff4d00' }}>fracture.</span>
            </h2>

            <div
              className="gsapflip-hero-meta text-center mt-6 md:mt-8"
              style={{ opacity: 0, transform: 'translateY(20px)' }}
            >
              <span style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '0.68rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: '#ff4d00', display: 'block', marginBottom: '0.8rem' }}>
                Fullstack &amp; Web Development
              </span>
              <span className="text-base sm:text-lg md:text-xl text-white/90 font-normal max-w-[38ch] md:max-w-[42ch] leading-relaxed mx-auto block">
                Crafting modern web applications, high-converting platforms, and seamless digital solutions.
              </span>
            </div>
          </div>

          <div
            className="gsapflip-hover-hint absolute bottom-36 md:bottom-60 left-1/2 -translate-x-1/2 whitespace-nowrap"
            style={{
              fontFamily: '"Courier New", Courier, monospace',
              fontSize: '0.58rem',
              letterSpacing: '0.22em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)',
              opacity: 0,
            }}
          >
            ↑ Touch / move over surface to interact ↑
          </div>

          <div className="flex justify-center items-end relative w-full">
            <div
              className="gsapflip-hero-cta flex flex-col items-center gap-4 pointer-events-auto cursor-pointer"
              style={{ opacity: 0, transform: 'translateY(20px)' }}
            >
              <span style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(238,232,222,0.4)' }}>
                Scroll to explore
              </span>
              <div style={{ width: 42, height: 42, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'gsapflip-float 2.5s ease-in-out infinite' }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2v12M3 9l5 5 5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            <div
              ref={heroCoordsRef}
              className="gsapflip-hero-coords hidden sm:block absolute bottom-0 right-0"
              style={{
                fontFamily: '"Courier New", Courier, monospace',
                fontSize: '0.58rem', letterSpacing: '0.12em',
                color: 'rgba(255,255,255,0.2)', textAlign: 'right',
                opacity: 0, lineHeight: 1.8,
              }}
              dangerouslySetInnerHTML={{ __html: 'φ 000.00° · θ 000.00°<br />FRAGMENTS: 350+ · CELLS: 22×22' }}
            />
          </div>
        </section>

        {/* Separator Divider */}
        <div className="w-full h-px bg-white/5" />

        {/* SECTION 2 — Architecture */}
        <section
          id="gsapflip-section-2"
          className="min-h-screen mb-[30vh] md:mb-[60vh] grid grid-cols-1 md:grid-cols-2"
        >
          <div className="hidden md:block min-h-screen" />
          <div className="flex flex-col justify-center px-6 sm:px-10 md:px-16 py-16 md:py-24 border-l-0 md:border-l border-white/5 bg-black/50 md:bg-transparent">
            <div className="sec-num" style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', marginBottom: '2rem', opacity: 0 }}>
              02 / 03
            </div>
            <p className="sec-tag" style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#ff4d00', marginBottom: '1.2rem', opacity: 0, transform: 'translateY(15px)' }}>
              {"// Development Approach"}
            </p>
            <h2 className="sec-h2 text-[clamp(2rem,4vw,3.8rem)] font-extrabold leading-[1.05] tracking-tight mb-6 text-white" style={{ opacity: 0, transform: 'translateY(25px)' }}>
              Clean Code.<br />Seamless Performance.
            </h2>
            <p className="sec-body text-base sm:text-lg leading-relaxed text-white/90 max-w-[42ch] mb-8 font-normal" style={{ opacity: 0, transform: 'translateY(15px)' }}>
              Every project is engineered for speed, responsiveness, and business growth. I combine clean Next.js architecture with modern UI interactions to turn your vision into a production-ready web application.
            </p>
            <div className="stats grid grid-cols-3 border-t border-white/10 pt-6" style={{ opacity: 0, transform: 'translateY(15px)' }}>
              {[{ n: '100%', l: 'Responsive' }, { n: '<1s', l: 'Fast Load' }, { n: 'SEO', l: 'Optimized' }].map((s) => (
                <div key={s.l}>
                  <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-[#ff4d00] leading-none">{s.n}</div>
                  <div style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginTop: '0.4rem' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Separator Divider */}
        <div className="w-full h-px bg-white/5" />

        {/* SECTION 3 — Interaction */}
        <section
          id="gsapflip-section-3"
          className="min-h-screen mb-[15vh] md:mb-[10vh] grid grid-cols-1 md:grid-cols-2"
        >
          <div className="flex flex-col justify-center px-6 sm:px-10 md:px-16 py-16 md:py-24 border-r-0 md:border-r border-white/5 bg-black/50 md:bg-transparent">
            <div className="sec-num" style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.2)', marginBottom: '2rem', opacity: 0 }}>
              03 / 03
            </div>
            <p className="sec-tag" style={{ fontFamily: '"Courier New", Courier, monospace', fontSize: '0.7rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#ff4d00', marginBottom: '1.2rem', opacity: 0, transform: 'translateY(15px)' }}>
              {"// Services & Value"}
            </p>
            <h2 className="sec-h2 text-[clamp(2rem,4vw,3.8rem)] font-extrabold leading-[1.05] tracking-tight mb-6 text-white" style={{ opacity: 0, transform: 'translateY(25px)' }}>
              Custom Web Solutions.<br />Built For Growth.
            </h2>
            <p className="sec-body text-base sm:text-lg leading-relaxed text-white/90 max-w-[42ch] mb-8 font-normal" style={{ opacity: 0, transform: 'translateY(15px)' }}>
              Whether you need a modern business website, custom web application, or high-converting landing page, I deliver scalable digital solutions crafted to attract and convert new clients.
            </p>
            <ul className="feat-list flex flex-col border-t border-white/10" style={{ opacity: 0, transform: 'translateY(15px)' }}>
              {[
                'Fullstack Web Apps · Next.js & React',
                'Responsive & Mobile-First UI/UX Design',
                'SEO Optimization & High Performance',
                'Fast Turnaround & Dedicated Support',
              ].map((feat, i) => (
                <li key={i} className="flex items-center gap-3 py-3.5 border-b border-white/10 text-sm sm:text-base text-white/90 font-medium" style={{ fontFamily: '"Courier New", Courier, monospace', letterSpacing: '0.05em' }}>
                  <span style={{ color: '#ff4d00' }}>→</span>
                  {feat}
                </li>
              ))}
            </ul>
          </div>
          <div className="hidden md:block min-h-screen" />
        </section>

      </div>

      {/* ── Keyframe Animations ────────────────────────────── */}
      <style>{`
        @keyframes gsapflip-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.2; }
        }
        @keyframes gsapflip-float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-6px); }
        }
      `}</style>
    </div>
  );
}
