'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const brandLogos = [
  {
    name: 'React',
    svg: (
      <svg width="36" height="32" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="white" />
        <g stroke="white" strokeWidth="1.1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Next.js',
    svg: (
      <svg width="34" height="34" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="90" cy="90" r="88" stroke="white" strokeWidth="8" />
        <path d="M149.508 157.52L69.141 54H54V126H67.882V70.722L138.835 161.859C142.613 160.627 146.183 159.167 149.508 157.52Z" fill="white" />
        <rect x="115" y="54" width="14" height="72" fill="white" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    svg: (
      <svg width="32" height="32" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="14" fill="white" />
        <path d="M72.24 99.28c2.48 4.08 7.36 6.8 13.6 6.8 7.76 0 12.8-3.92 12.8-10.16 0-5.76-3.84-8.8-12.72-12.64l-4.48-1.92c-12.88-5.52-19.04-12.56-19.04-24.88 0-14 11.28-24.32 28.64-24.32 12.08 0 20.32 4.4 25.52 14.16l-10.96 7.04c-3.12-5.44-7.68-7.92-14.4-7.92-7.12 0-11.44 3.76-11.44 9.12 0 5.44 3.44 8.08 12.24 11.92l4.48 1.92c14.72 6.32 20 13.6 20 25.68 0 15.68-12.16 25.68-30.8 25.68-15.6 0-25.76-6.48-30.4-17.76l11.92-6.88zM14.64 43.12H58v13.68H43.2v59.52H29.44V56.8H14.64V43.12z" fill="#080808" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    svg: (
      <svg width="38" height="30" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="white" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    svg: (
      <svg width="32" height="30" viewBox="0 0 256 157" xmlns="http://www.w3.org/2000/svg">
        <path d="M128 0L0 73.9v74.2l128 73.9 128-73.9V73.9L128 0zm88.8 127.3l-88.8 51.3-88.8-51.3V50.7l88.8-51.3 88.8 51.3v76.6z" fill="white" />
      </svg>
    ),
  },
  {
    name: 'Google',
    img: '/images/logo-google.png',
  },
  {
    name: 'Adobe',
    img: '/images/logo-adobe.png',
  },
  {
    name: 'PayPal',
    img: '/images/logo-paypal.png',
  },
];

export default function LogoSlider() {
  const marqueeItems = [...brandLogos, ...brandLogos, ...brandLogos];
  const trackRef = useRef<HTMLDivElement>(null);
  const tweenRef = useRef<gsap.core.Tween | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !trackRef.current) return;
    const track = trackRef.current;
    const totalWidth = track.scrollWidth / 3;

    const ctx = gsap.context(() => {
      tweenRef.current = gsap.to(track, {
        x: -totalWidth,
        duration: 24,
        ease: 'none',
        repeat: -1,
      });
    }, trackRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <div className="relative bg-[#080808] border-y border-dashed border-white/[0.14] select-none py-8 sm:py-10">
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Status Copy matching Image 5 */}
        <div className="lg:col-span-4 font-mono text-[11px] tracking-[0.14em] uppercase leading-relaxed">
          <div className="flex items-center gap-2 text-white font-semibold">
            <span className="w-2 h-2 rounded-full bg-[#9CFF00]" />
            <span>OVER 15+ PROJECTS</span>
          </div>
          <p className="text-zinc-500 mt-1">
            ENGINEERED WITH MODERN WEB STACK
          </p>
        </div>

        {/* Right Scrolling Monochrome Tech Icons */}
        <div
          className="lg:col-span-8 relative overflow-hidden cursor-grab active:cursor-grabbing"
          onMouseEnter={() => tweenRef.current?.pause()}
          onMouseLeave={() => tweenRef.current?.play()}
        >
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

          <div
            ref={trackRef}
            className="flex items-center gap-14 sm:gap-16 w-max will-change-transform"
          >
            {marqueeItems.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                title={logo.name}
                className="flex items-center justify-center shrink-0 opacity-65 hover:opacity-100 transition-opacity duration-200"
              >
                {logo.svg ? (
                  logo.svg
                ) : (
                  <Image
                    src={logo.img!}
                    alt={logo.name}
                    width={96}
                    height={32}
                    style={{
                      width: 'auto',
                      height: '26px',
                      objectFit: 'contain',
                      filter: 'brightness(0) invert(1)',
                    }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
