'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const N = 19;

const ROTS = [
  { ry: 270, a: 0.5 },
  { ry: 0, a: 0.85 },
  { ry: 90, a: 0.4 },
  { ry: 180, a: 0.0 },
];

const BRAND_COLORS = [
  [10, 10, 10],
  [60, 60, 60],
  [120, 120, 120],
  [255, 107, 0],
  [255, 160, 60],
  [255, 255, 255],
];

function getColor(cubeIdx: number, brightnessMultiplier: number): string {
  const t = cubeIdx / (N - 1);
  const palLen = BRAND_COLORS.length - 1;
  const pos = t * palLen;
  const lo = Math.floor(pos);
  const hi = Math.min(lo + 1, palLen);
  const frac = pos - lo;

  const r = Math.round(BRAND_COLORS[lo][0] + (BRAND_COLORS[hi][0] - BRAND_COLORS[lo][0]) * frac);
  const g = Math.round(BRAND_COLORS[lo][1] + (BRAND_COLORS[hi][1] - BRAND_COLORS[lo][1]) * frac);
  const b = Math.round(BRAND_COLORS[lo][2] + (BRAND_COLORS[hi][2] - BRAND_COLORS[lo][2]) * frac);

  const mr = Math.round(r * brightnessMultiplier);
  const mg = Math.round(g * brightnessMultiplier);
  const mb = Math.round(b * brightnessMultiplier);

  return `rgb(${Math.min(255, mr)}, ${Math.min(255, mg)}, ${Math.min(255, mb)})`;
}

/**
 * 3D Rotating Stacked Text Cubes Section ("CODE", "DRIVEN", "ANIMATION").
 * Uses website brand palette: white, orange (#FF6B00), gray, and black.
 * Mobile responsive: auto-scales vertically and horizontally to prevent scrollbar overflow.
 */
export default function ThreeDRotator() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      gsap.set('.face-3d', {
        z: 200,
        rotateY: (i) => ROTS[i % 4].ry,
        transformOrigin: '50% 50% -201px',
      });

      const cubes = container.querySelectorAll('.cube-3d');
      cubes.forEach((cube, i) => {
        const faces = cube.querySelectorAll('.face-3d');

        gsap.timeline({ repeat: -1, yoyo: true, defaults: { ease: 'power3.inOut', duration: 1 } })
          .fromTo(
            cube,
            { rotateY: -90 },
            { rotateY: 90, ease: 'power1.inOut', duration: 2 }
          )
          .fromTo(
            faces,
            { color: (j) => getColor(i, [ROTS[3].a, ROTS[0].a, ROTS[1].a][j % 3]) },
            { color: (j) => getColor(i, [ROTS[0].a, ROTS[1].a, ROTS[2].a][j % 3]) },
            0
          )
          .to(
            faces,
            { color: (j) => getColor(i, [ROTS[1].a, ROTS[2].a, ROTS[3].a][j % 3]) },
            1
          )
          .progress(i / N);
      });

      gsap.timeline()
        .from('.tray-3d', { yPercent: -3, duration: 2, ease: 'power1.inOut', yoyo: true, repeat: -1 }, 0)
        .fromTo('.tray-3d', { rotate: -15 }, { rotate: 15, duration: 4, ease: 'power1.inOut', yoyo: true, repeat: -1 }, 0)
        .from('.die-3d', { duration: 0.01, opacity: 0, stagger: { each: -0.05, ease: 'power1.in' } }, 0)
        .to('.tray-3d', { scale: 1.1, duration: 2, ease: 'power3.inOut', yoyo: true, repeat: -1 }, 0);

      const handleResize = () => {
        const h = N * 56;
        gsap.set('.tray-3d', { height: h });
        const wrapper = container.querySelector('.pov-3d');
        if (wrapper) {
          const wrapperHeight = wrapper.clientHeight || 500;
          const wrapperWidth = window.innerWidth;
          const widthScale = Math.min(1.0, (wrapperWidth - 30) / 420);
          const heightScale = wrapperHeight / h;
          const finalScale = Math.min(0.9, heightScale, widthScale);
          gsap.set('.pov-3d', { scale: finalScale });
        }
      };

      handleResize();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="w-full h-[380px] xs:h-[450px] sm:h-[550px] md:h-[650px] bg-black flex items-center justify-center overflow-hidden py-8 sm:py-12 relative z-20 select-none">
      <div className="pov-3d w-full h-full flex items-center justify-center">
        <div className="tray-3d flex flex-col items-center justify-center relative origin-center">
          {Array.from({ length: N }).map((_, i) => (
            <div key={i} className="die-3d w-[400px] h-[55px] pb-[9px] relative [perspective:999px]">
              <div className="cube-3d absolute w-full h-full [transform-style:preserve-3d]">
                <div className="face-3d absolute w-full h-full flex items-center justify-center [backface-visibility:hidden] font-raleway font-black text-[58px] tracking-tight">CODE</div>
                <div className="face-3d absolute w-full h-full flex items-center justify-center [backface-visibility:hidden] font-raleway font-black text-[56px] tracking-tight">DRIVEN</div>
                <div className="face-3d absolute w-full h-full flex items-center justify-center [backface-visibility:hidden] font-raleway font-black text-[54px] tracking-tight">ANIMATION</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
