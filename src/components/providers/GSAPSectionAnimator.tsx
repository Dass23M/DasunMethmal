'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Advanced GSAP & ScrollTrigger Viewport Animator.
 * - Orchestrates elegant viewport reveal animations for headings, text columns, grids, and banners.
 * - Implements fluid scroll-synced background parallax.
 * - Staggers entry animations dynamically to construct a premium, award-winning visual flow.
 * - Cleans up GSAP animations and ScrollTrigger instances on unmount.
 */
export default function GSAPSectionAnimator({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // Check reduced motion accessibility
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop-only: parallax covers, hero scrub, and pin + clip-path reveal
      mm.add('(min-width: 992px)', () => {
        // 1. Full-Screen Parallax cover backgrounds (.cover-v1)
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

        // 2. Hero parallax scrolling effects (title & subtitle fading out and shifting)
        if (document.querySelector('#home-section')) {
          gsap.to('.hero-title-meth, .hero-subtitle-meth', {
            yPercent: -20,
            opacity: 0.15,
            ease: 'power1.out',
            scrollTrigger: {
              trigger: '#home-section',
              start: 'top top',
              end: 'bottom 20%',
              scrub: 1.2,
            },
          });
        }

        // 2b. Hero section mask reveal for below sections
        if (document.querySelector('#home-section') && document.querySelector('.below-hero-reveal')) {
          ScrollTrigger.create({
            trigger: '#home-section',
            start: 'top top',
            end: 'bottom top',
            pin: true,
            pinSpacing: false,
            anticipatePin: 1,
          });

          gsap.fromTo(
            '.below-hero-reveal',
            {
              clipPath: 'circle(0% at 50% 0%)',
            },
            {
              clipPath: 'circle(150% at 50% 0%)',
              ease: 'none',
              scrollTrigger: {
                trigger: '.below-hero-reveal',
                start: 'top bottom',
                end: 'top top',
                scrub: 1.2,
                invalidateOnRefresh: true,
              },
            }
          );
        }
      });

      // Mobile: ensure below-hero content is fully visible (no pin / no clip mask)
      mm.add('(max-width: 991px)', () => {
        const below = document.querySelector('.below-hero-reveal') as HTMLElement | null;
        if (below) {
          gsap.set(below, { clearProps: 'clipPath' });
        }
      });

      // 3. Section headings reveal (.heading-h2 and visual divider images)
      const headings = document.querySelectorAll('.heading-h2');
      headings.forEach((heading) => {
        // Wrap heading and divider in a container animation
        const parent = heading.parentElement;
        if (parent) {
          gsap.fromTo(
            [heading, parent.querySelector('img')],
            {
              y: 40,
              opacity: 0,
            },
            {
              y: 0,
              opacity: 1,
              duration: 1.1,
              stagger: 0.2,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: parent,
                start: 'top 88%',
                toggleActions: 'play none none reverse',
              },
            }
          );
        }
      });

      // 4. About Section stagger (left image column & right text column)
      const aboutImg = document.querySelector('.about-img-col');
      const aboutText = document.querySelector('.about-text-col');
      if (aboutImg && aboutText) {
        gsap.fromTo(
          aboutImg,
          { x: -50, opacity: 0, scale: 0.95 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '#about-section',
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );

        const textElements = aboutText.querySelectorAll('h3, p, a');
        gsap.fromTo(
          textElements,
          { y: 30, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: aboutText,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 5. Services grid cards staggered entrance (.gsap-reveal-card)
      const serviceCards = document.querySelectorAll('.gsap-reveal-card');
      if (serviceCards.length > 0) {
        gsap.fromTo(
          serviceCards,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.services-grid',
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 6. Skills grid stagger entrance (.counter-v1)
      const skillCounters = document.querySelectorAll('.skills-grid .counter-v1');
      if (skillCounters.length > 0) {
        gsap.fromTo(
          skillCounters,
          { y: 40, opacity: 0, scale: 0.9 },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.skills-grid',
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 7. Journal grid blog cards staggered reveal (.gsap-reveal-blog-card)
      const blogCards = document.querySelectorAll('.gsap-reveal-blog-card');
      if (blogCards.length > 0) {
        gsap.fromTo(
          blogCards,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#journal-section',
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }

      // 8. Contact section grid staggered reveal
      const contactForm = document.querySelector('.contact-form-col');
      const contactInfo = document.querySelector('.contact-info-col');
      if (contactForm && contactInfo) {
        gsap.fromTo(
          [contactForm, contactInfo],
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '#contact-section',
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return <>{children}</>;
}
