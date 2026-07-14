'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * RandomTextReveal Component.
 * Desktop: pinned scrub character reveal.
 * Mobile: unpinned entrance stagger — no long pin lock.
 */
export default function RandomTextReveal() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLHeadingElement>(null);
  const [mounted, setMounted] = useState(false);

  const textContent = "Create text animations that will have them hanging off your every word. GSAP's text plugins have your back—bringing words to life has never been this easy!";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const textEl = textRef.current;
    if (!textEl) return;

    const chars = textContent.split('').map((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.className = 'inline-block opacity-0';
      return span;
    });

    textEl.innerHTML = '';
    chars.forEach((span) => textEl.appendChild(span));

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      mm.add('(min-width: 992px)', () => {
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: 20,
          },
          {
            opacity: 1,
            y: 0,
            stagger: {
              from: 'random',
              each: 0.05,
            },
            ease: 'power1.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top top',
              end: '+=1200',
              pin: true,
              scrub: 1,
              anticipatePin: 1,
            },
          }
        );
      });

      mm.add('(max-width: 991px)', () => {
        gsap.fromTo(
          chars,
          {
            opacity: 0,
            y: 12,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            stagger: {
              from: 'random',
              each: 0.012,
            },
            ease: 'power1.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });
    }, containerRef);

    return () => ctx.revert();
  }, [mounted, textContent]);

  if (!mounted) {
    return <div className="w-full min-h-[50vh] lg:min-h-screen bg-white" />;
  }

  return (
    <div
      ref={containerRef}
      className="w-full min-h-[50vh] py-16 lg:py-0 lg:min-h-screen bg-white flex items-center justify-center select-none relative z-10 border-t border-b border-gray-200"
    >
      <h3
        ref={textRef}
        className="font-raleway text-black text-[clamp(1.35rem,5.5vw,2.2rem)] sm:text-[3.2rem] lg:text-[4.2rem] font-black leading-tight max-w-[38ch] text-center px-5 sm:px-6 md:px-12"
      >
        {textContent}
      </h3>
    </div>
  );
}
