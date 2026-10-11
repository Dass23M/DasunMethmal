'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * GSAP ScrollTrigger section orchestrator.
 * - Smooth section entrance reveals with 3D depth and subtle easing
 * - Hero parallax depth scrub
 * - Parallax covers
 * - Mobile (<992px): Keeps all sections 100% visible, unblocked & responsive
 */
export default function GSAPSectionAnimator({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      window.scrollTo(0, 0);
      const mm = gsap.matchMedia();

      // ── Desktop (≥992px): Smooth section reveal + parallax depth ──
      mm.add('(min-width: 992px)', () => {
        const revealSections = gsap.utils.toArray<HTMLElement>('.scroll-reveal-section');

        revealSections.forEach((section) => {
          gsap.fromTo(
            section,
            { autoAlpha: 0, y: 32 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.9,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
                invalidateOnRefresh: true,
                onLeave: () => {
                  gsap.set(section, { clearProps: 'transform,opacity,visibility' });
                },
              },
            }
          );
        });

        // Parallax depth fade on Hero during scroll down
        const heroSection = document.querySelector('#home-section');
        if (heroSection) {
          gsap.to('.hero-perspective', {
            y: -50,
            opacity: 0.35,
            ease: 'none',
            scrollTrigger: {
              trigger: '#home-section',
              start: 'top top',
              end: 'bottom 10%',
              scrub: 1.2,
            },
          });
        }

        // Parallax covers
        const covers = document.querySelectorAll('.cover-v1');
        covers.forEach((cover) => {
          gsap.fromTo(
            cover,
            { backgroundPositionY: '30%' },
            {
              backgroundPositionY: '70%',
              ease: 'none',
              scrollTrigger: {
                trigger: cover,
                start: 'top top',
                end: 'bottom top',
                scrub: 1.2,
                invalidateOnRefresh: true,
              },
            }
          );
        });

        // Delayed refresh for dynamic components / images
        const refreshTimeout = setTimeout(() => {
          ScrollTrigger.refresh();
        }, 600);

        return () => clearTimeout(refreshTimeout);
      });

      // ── Mobile (<991px): Ensure all sections are 100% visible ──
      mm.add('(max-width: 991px)', () => {
        const revealSections = gsap.utils.toArray<HTMLElement>('.scroll-reveal-section');
        revealSections.forEach((section) => {
          gsap.set(section, { clearProps: 'all', opacity: 1, visibility: 'visible' });
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return <>{children}</>;
}
