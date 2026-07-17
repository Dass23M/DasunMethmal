'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * GSAP ScrollTrigger section orchestrator.
 * - Scroll-scrubbed bottom-up reveals for every `.scroll-reveal-section`
 * - Desktop-only hero pin + parallax (layout breakpoints unchanged)
 * - Syncs with Lenis via SmoothScrollProvider for momentum-based scrub
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

      // ── Slow, smooth cinematic GSAP section reveals (desktop + mobile) ──
      const revealSections = gsap.utils.toArray<HTMLElement>('.scroll-reveal-section');

      revealSections.forEach((section) => {
        gsap.set(section, { autoAlpha: 0, y: 90 });

        const innerChildren = section.querySelectorAll('h2, h3, p, img, .card, a, button, .reveal-child');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
            invalidateOnRefresh: true,
            onLeave: () => {
              gsap.set(section, { clearProps: 'transform' });
            },
          },
        });

        tl.to(section, {
          autoAlpha: 1,
          y: 0,
          duration: 1.4,
          ease: 'power4.out',
        });

        if (innerChildren.length > 0) {
          tl.to(
            innerChildren,
            {
              autoAlpha: 1,
              y: 0,
              duration: 1.2,
              stagger: 0.12,
              ease: 'power3.out',
            },
            '-=1.0'
          );
        }
      });

      // ── Desktop-only: parallax covers, hero scrub, hero pin ──
      mm.add('(min-width: 992px)', () => {
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
        }

        if (document.querySelector('#home-section')) {
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
    });

    const refresh = () => ScrollTrigger.refresh();
    const t1 = window.setTimeout(refresh, 400);
    const t2 = window.setTimeout(refresh, 1200);
    window.addEventListener('load', refresh);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.removeEventListener('load', refresh);
      ctx.revert();
    };
  }, []);

  return <>{children}</>;
}
