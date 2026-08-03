'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP ScrollTrigger section orchestrator.
 * - Desktop (≥992px): Smooth section reveals + parallax covers + hero pin
 * - Mobile (<992px): Luxury smooth entrance transition + scale-reveal
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
      const mm = gsap.matchMedia();

      // ── Desktop (≥992px): Smooth section reveal + parallax + hero pin ──
      mm.add('(min-width: 992px)', () => {
        const revealSections = gsap.utils.toArray<HTMLElement>('.scroll-reveal-section');

        revealSections.forEach((section) => {
          gsap.fromTo(
            section,
            { autoAlpha: 0, y: 35 },
            {
              autoAlpha: 1,
              y: 0,
              duration: 0.8,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 92%',
                toggleActions: 'play none none reverse',
                invalidateOnRefresh: true,
                onLeave: () => {
                  gsap.set(section, { clearProps: 'transform,opacity,visibility' });
                },
              },
            }
          );
        });

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

        if (document.querySelector('#home-section')) {
          gsap.to('.hero-title-meth, .hero-subtitle-meth', {
            yPercent: -20,
            opacity: 0.15,
            ease: 'none',
            scrollTrigger: {
              trigger: '#home-section',
              start: 'top top',
              end: 'bottom 20%',
              scrub: 1.2,
            },
          });

          ScrollTrigger.create({
            trigger: '#home-section',
            start: 'top top',
            end: 'bottom top',
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
          });
        }
      });

      // ── Mobile (<991px): Luxury smooth entrance transition + scale-reveal ──
      mm.add('(max-width: 991px)', () => {
        const revealSections = gsap.utils.toArray<HTMLElement>('.scroll-reveal-section');
        revealSections.forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0.2, y: 40, scale: 0.96 },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.0,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
                invalidateOnRefresh: true,
              },
            }
          );
        });
      });
    });

    return () => ctx.revert();
  }, []);

  return <>{children}</>;
}
