'use client';

import { useEffect } from 'react';

/**
 * GSAP ScrollTrigger section orchestrator.
 * Uses dynamic import so GSAP is never part of the SSR/layout bundle,
 * preventing ChunkLoadError when the vendor chunk is missing or stale.
 *
 * - Desktop-only smooth section reveals + parallax covers + hero pin
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

    let ctx: { revert: () => void } | null = null;

    // Dynamic import – GSAP is loaded client-side only, never bundled into layout.js
    import('gsap').then(({ default: gsap }) =>
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          window.scrollTo(0, 0);
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

          // ── Mobile (<991px): Ensure all sections are 100% visible ──
          mm.add('(max-width: 991px)', () => {
            const revealSections = gsap.utils.toArray<HTMLElement>('.scroll-reveal-section');
            revealSections.forEach((section) => {
              gsap.set(section, { clearProps: 'all', opacity: 1, visibility: 'visible' });
            });
          });
        });
      })
    );

    return () => ctx?.revert();
  }, []);

  return <>{children}</>;
}
