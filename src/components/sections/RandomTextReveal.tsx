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

  const textContent = "Engineering high-performance web applications, custom digital platforms, and data-driven growth strategies that transform ambitious brands into industry leaders with speed, precision, and architectural excellence.";

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const textEl = textRef.current;
    if (!textEl) return;

    textEl.innerHTML = '';
    const words = textContent.split(' ');
    const chars: HTMLSpanElement[] = [];

    words.forEach((word, wordIdx) => {
      const wordSpan = document.createElement('span');
      wordSpan.className = 'inline-block whitespace-nowrap';

      word.split('').forEach((char) => {
        const charSpan = document.createElement('span');
        charSpan.textContent = char;
        charSpan.className = 'inline-block opacity-0';
        wordSpan.appendChild(charSpan);
        chars.push(charSpan);
      });

      textEl.appendChild(wordSpan);

      if (wordIdx < words.length - 1) {
        const spaceSpan = document.createElement('span');
        spaceSpan.textContent = '\u00A0';
        spaceSpan.className = 'inline-block';
        textEl.appendChild(spaceSpan);
      }
    });

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
              each: 0.03,
            },
            ease: 'power1.out',
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top 75%',
              end: 'bottom 25%',
              scrub: 1,
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
    return <div className="w-full py-20 lg:py-32 bg-[#07080B]" />;
  }

  return (
    <div
      ref={containerRef}
      className="w-full py-20 lg:py-32 bg-[#07080B] luxury-mesh-bg flex items-center justify-center select-none relative z-10 overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[250px] bg-[#FF8A00]/5 blur-[120px] pointer-events-none rounded-full" />

      <h3
        ref={textRef}
        className="font-display text-white text-xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-medium leading-[1.4] tracking-tight max-w-[44ch] text-center px-5 sm:px-8 md:px-12 relative z-10"
      >
        {textContent}
      </h3>
    </div>
  );
}
