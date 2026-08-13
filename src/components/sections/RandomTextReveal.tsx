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
    return <div className="w-full py-16 lg:py-24 bg-[#F5F5F7]" />;
  }

  return (
    <div
      ref={containerRef}
      className="w-full py-16 lg:py-24 bg-[#F5F5F7] flex items-center justify-center select-none relative z-10 border-t border-b border-gray-200/60"
    >
      <h3
        ref={textRef}
        className="font-sora text-black text-xl sm:text-3xl md:text-4xl lg:text-[2.4rem] font-medium leading-[1.38] tracking-tight max-w-[42ch] text-center px-5 sm:px-8 md:px-12"
      >
        {textContent}
      </h3>
    </div>
  );
}
