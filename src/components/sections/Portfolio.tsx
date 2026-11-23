'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SectionHeading from '@/components/ui/SectionHeading';
import { portfolioItems } from '@/data/portfolio';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/* ─────────────────────────────────────────────
   Portfolio grid – 6 clickable project cards.
   Each card navigates to /portfolio/[id].
   No external lightbox dependency.
───────────────────────────────────────────── */
export default function Portfolio() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      router.push(href);
    }
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  /* Reveal animation for cards */
  useEffect(() => {
    if (!mounted) return;
    const section = sectionRef.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const cards = section.querySelectorAll<HTMLElement>('.pf-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 88%',
              toggleActions: 'play none none reverse',
            },
            delay: i * 0.06,
          }
        );
      });
    }, section);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return <section id="portfolio-section" className="unslate-section" />;
  }

  return (
    <section
      id="portfolio-section"
      ref={sectionRef}
      className="relative min-h-[90vh] md:min-h-[85vh] w-full flex items-center justify-center overflow-hidden bg-[#FAFAFA] py-24 lg:py-32 text-zinc-950"
    >
      <style>{`
        /* ── Portfolio grid ───────────────────── */
        .pf-section-inner {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 20px;
          width: 100%;
        }

        .pf-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 28px;
        }
        @media (max-width: 960px)  { .pf-grid { grid-template-columns: repeat(2, 1fr); gap: 20px; } }
        @media (max-width: 600px)  { .pf-grid { grid-template-columns: 1fr; gap: 24px; } }

        /* ── Individual card ──────────────────── */
        .pf-card {
          position: relative;
          display: block;
          overflow: hidden;
          cursor: pointer !important;
          text-decoration: none;
          color: inherit;
          border-radius: 18px;
          border: 1px solid rgba(0, 0, 0, 0.08);
          background: #FFFFFF;
          box-shadow: 0 2px 12px rgba(0, 0, 0, 0.04);
          will-change: transform, opacity;
          transform: translateZ(0);
          transition: border-color 0.35s ease, box-shadow 0.35s ease, transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .pf-card:hover {
          border-color: rgba(255, 107, 0, 0.45);
          box-shadow: 0 18px 40px -12px rgba(0, 0, 0, 0.12);
          transform: translateY(-5px);
        }

        .pf-card-img-wrap {
          position: relative;
          overflow: hidden;
          line-height: 0;
          border-radius: 17px;
        }

        .pf-card-img-wrap img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          pointer-events: none;
        }

        .pf-card:hover .pf-card-img-wrap img {
          transform: scale(1.05);
        }

        /* ── Hover overlay ─────────────────────── */
        .pf-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(9,9,11,0.86) 0%, rgba(9,9,11,0.28) 55%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px 24px 20px;
          opacity: 0;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }

        .pf-card:hover .pf-overlay {
          opacity: 1;
        }

        .pf-overlay-title {
          color: #fff;
          font-size: 16px;
          font-weight: 700;
          margin: 0 0 6px;
          font-family: var(--font-display), sans-serif;
          line-height: 1.3;
          letter-spacing: -0.01em;
        }

        .pf-overlay-cat {
          color: rgba(255, 255, 255, 0.72);
          font-size: 11px;
          font-family: var(--font-mono), monospace;
          margin: 0 0 14px;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* ── "View Project" button inside overlay ── */
        .pf-view-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #FF6B00;
          color: #fff;
          font-size: 11px;
          font-weight: 700;
          font-family: var(--font-display), sans-serif;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          padding: 8px 16px;
          border-radius: 9999px;
          width: fit-content;
          transform: translateY(8px);
          transition: transform 0.3s ease, background 0.2s ease;
        }

        .pf-card:hover .pf-view-btn {
          transform: translateY(0);
        }

        /* ── Count badge ──────────────────────── */
        .pf-badge {
          position: absolute;
          top: 14px;
          left: 14px;
          background: rgba(255, 255, 255, 0.92);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          border: 1px solid rgba(0, 0, 0, 0.08);
          color: #18181B;
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          padding: 4px 10px;
          border-radius: 9999px;
          font-family: var(--font-mono), monospace;
          pointer-events: none;
          z-index: 2;
        }
      `}</style>

      <div className="pf-section-inner">
        <SectionHeading title="Selected Works" />

        <div className="pf-grid">
          {portfolioItems.map((item, idx) => (
            <Link
              key={item.id}
              href={item.href}
              className="pf-card"
              prefetch={false}
              onClick={(e) => handleCardClick(e, item.href)}
            >
              {/* Number badge */}
              <span className="pf-badge">{String(idx + 1).padStart(2, '0')}</span>

              {/* Image */}
              <div className="pf-card-img-wrap">
                <Image
                  src={item.image}
                  alt={item.title}
                  width={760}
                  height={520}
                  style={{ width: '100%', height: 'auto' }}
                  loading="lazy"
                />

                {/* Hover overlay — pointer-events:none so link click always fires */}
                <div className="pf-overlay">
                  <h3 className="pf-overlay-title">{item.title}</h3>
                  <p className="pf-overlay-cat">{item.categories}</p>
                  <span className="pf-view-btn">
                    View Project
                    <svg width="11" height="11" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                      <path d="M7 17L17 7M7 7h10v10" />
                    </svg>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
