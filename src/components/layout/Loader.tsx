'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

/**
 * Ultra-Minimalist Apple Luxury Preloader.
 * Displays ONLY the 3D Golden Torus Object and the name "Methmal" on a pure black background.
 */
export default function Loader() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const [hidden, setHidden] = useState(false);

  // ── 1. GSAP Exit Animation after 1.8 seconds ──
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo(0, 0);
    }

    const timer = setTimeout(() => {
      if (!overlayRef.current) return;

      const ctx = gsap.context(() => {
        const tl = gsap.timeline({
          onComplete: () => setHidden(true),
        });

        // Fade out name & canvas
        tl.to([canvasRef.current, nameRef.current], {
          opacity: 0,
          scale: 0.94,
          duration: 0.35,
          ease: 'power2.in',
        });

        // Slide up black preloader curtain seamlessly
        tl.to(
          overlayRef.current,
          {
            yPercent: -100,
            duration: 0.55,
            ease: 'power4.inOut',
          },
          '-=0.1'
        );
      }, overlayRef);

      return () => ctx.revert();
    }, 650);

    return () => clearTimeout(timer);
  }, []);

  // ── 2. 3D Golden Torus Ring Render Loop ──
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = 460);
    let height = (canvas.height = 460);

    const handleResize = () => {
      const size = Math.min(window.innerWidth - 32, 460);
      width = canvas.width = size;
      height = canvas.height = size;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const R = 115;
    const r = 42;
    const uSegments = 32;
    const vSegments = 16;

    let rotX = 0.65;
    let rotY = 0;
    let rotZ = 0.25;

    const coreDotsCount = 20;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      rotY += 0.014;
      rotX += 0.003;

      const cx = width / 2;
      const cy = height / 2;
      const focalLength = 390;

      const project = (x: number, y: number, z: number) => {
        let x1 = x * Math.cos(rotZ) - y * Math.sin(rotZ);
        let y1 = x * Math.sin(rotZ) + y * Math.cos(rotZ);
        let z1 = z;

        let x2 = x1;
        let y2 = y1 * Math.cos(rotX) - z1 * Math.sin(rotX);
        let z2 = y1 * Math.sin(rotX) + z1 * Math.cos(rotX);

        let x3 = x2 * Math.cos(rotY) + z2 * Math.sin(rotY);
        let y3 = y2;
        let z3 = -x2 * Math.sin(rotY) + z2 * Math.cos(rotY);

        const scale = focalLength / (focalLength + z3 + 180);
        return { px: cx + x3 * scale, py: cy + y3 * scale, scale, z: z3 };
      };

      // ── Draw Wireframe Torus Rings ──
      for (let i = 0; i < uSegments; i++) {
        const u = (i / uSegments) * Math.PI * 2;
        ctx.beginPath();

        for (let j = 0; j <= vSegments; j++) {
          const v = (j / vSegments) * Math.PI * 2;
          const x = (R + r * Math.cos(v)) * Math.cos(u);
          const y = (R + r * Math.cos(v)) * Math.sin(u);
          const z = r * Math.sin(v);

          const p = project(x, y, z);
          if (j === 0) ctx.moveTo(p.px, p.py);
          else ctx.lineTo(p.px, p.py);
        }

        const alpha = 0.3 + 0.3 * Math.sin(u + rotY * 2);
        ctx.strokeStyle = `rgba(255, 168, 0, ${alpha})`;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }

      // ── Draw Longitudinal Circles ──
      for (let j = 0; j < vSegments; j += 2) {
        const v = (j / vSegments) * Math.PI * 2;
        ctx.beginPath();

        for (let i = 0; i <= uSegments; i++) {
          const u = (i / uSegments) * Math.PI * 2;
          const x = (R + r * Math.cos(v)) * Math.cos(u);
          const y = (R + r * Math.cos(v)) * Math.sin(u);
          const z = r * Math.sin(v);

          const p = project(x, y, z);
          if (i === 0) ctx.moveTo(p.px, p.py);
          else ctx.lineTo(p.px, p.py);
        }

        ctx.strokeStyle = 'rgba(255, 107, 0, 0.22)';
        ctx.lineWidth = 1.0;
        ctx.stroke();
      }

      // ── Draw Inner Glowing Golden Particle Core Ring ──
      for (let i = 0; i < coreDotsCount; i++) {
        const angle = (i / coreDotsCount) * Math.PI * 2 + rotY * 1.5;
        const coreR = R * 0.42;
        const cx3d = coreR * Math.cos(angle);
        const cy3d = coreR * Math.sin(angle);
        const cz3d = Math.sin(angle * 3 + rotY) * 12;

        const p = project(cx3d, cy3d, cz3d);

        const grad = ctx.createRadialGradient(p.px, p.py, 0, p.px, p.py, 8 * p.scale);
        grad.addColorStop(0, 'rgba(255, 215, 0, 1)');
        grad.addColorStop(0.4, 'rgba(255, 120, 0, 0.85)');
        grad.addColorStop(1, 'rgba(255, 107, 0, 0)');

        ctx.beginPath();
        ctx.arc(p.px, p.py, 8 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.px, p.py, 2.4 * p.scale, 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.fill();
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      ref={overlayRef}
      id="site-preloader"
      className="fixed inset-0 z-[9999] bg-[#000000] text-white flex flex-col items-center justify-center overflow-hidden select-none font-sora"
    >
      {/* Ambient Gold Radial Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 flex items-center justify-center">
        <div className="w-[450px] h-[450px] rounded-full bg-[radial-gradient(circle,rgba(255,168,0,0.16)_0%,rgba(255,107,0,0.05)_50%,transparent_75%)] blur-3xl animate-pulse" />
      </div>

      {/* Center 3D Golden Torus Object */}
      <div className="relative z-10 flex flex-col items-center justify-center">
        <canvas
          ref={canvasRef}
          className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] filter drop-shadow-[0_0_35px_rgba(255,168,0,0.35)]"
        />

        {/* Minimalist Name Only */}
        <h1
          ref={nameRef}
          className="font-sora font-black text-2xl sm:text-3xl tracking-[0.3em] uppercase text-white mt-4 drop-shadow-md"
        >
          Methmal
        </h1>
      </div>
    </div>
  );
}
