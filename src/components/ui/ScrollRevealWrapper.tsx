'use client';

import React, { useEffect, useRef } from 'react';

export default function ScrollRevealWrapper({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx: { revert: () => void } | null = null;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          const sections = containerRef.current?.querySelectorAll('.scroll-reveal-section');
          sections?.forEach((sec) => {
            gsap.fromTo(
              sec,
              {
                y: 80,
                opacity: 0,
              },
              {
                y: 0,
                opacity: 1,
                duration: 1.0,
                ease: 'power3.out',
                scrollTrigger: {
                  trigger: sec,
                  start: 'top 88%',
                  toggleActions: 'play none none reverse',
                },
              }
            );
          });
        }, containerRef);
      }
    );

    return () => ctx?.revert();
  }, []);

  return (
    <div ref={containerRef} className="below-hero-reveal">
      {children}
    </div>
  );
}
