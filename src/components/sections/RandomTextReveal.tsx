'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * RandomTextReveal Component.
 * Splits text into individual characters and animates them revealing randomly
 * fully synchronized to the scroll position (scrub) inside a pinned/scrubbed layout.
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

    // Split text content into character spans
    const chars = textContent.split('').map((char) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.className = 'inline-block opacity-0';
      return span;
    });

    textEl.innerHTML = '';
    chars.forEach((span) => textEl.appendChild(span));

    const ctx = gsap.context(() => {
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
    }, containerRef);

    return () => ctx.revert();
  }, [mounted, textContent]);

  if (!mounted) {
    return <div className="w-full h-screen bg-white" />;
  }

  return (
    <div
      ref={containerRef}
      className="w-full min-h-screen bg-white flex items-center justify-center select-none relative z-10 border-t border-b border-gray-200"
    >
      <h3
        ref={textRef}
        className="font-raleway text-black text-[2.2rem] sm:text-[3.2rem] lg:text-[4.2rem] font-black leading-tight max-w-[38ch] text-center px-6 md:px-12"
      >
        {textContent}
      </h3>
    </div>
  );
}
