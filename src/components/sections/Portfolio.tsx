'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import SectionHeading from '@/components/ui/SectionHeading';
import { portfolioItems } from '@/data/portfolio';

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

  /* Lazy-load GSAP only for the reveal animation so the
     component never crashes if gsap vendor chunk is missing. */
  useEffect(() => {
    if (!mounted) return;
    let ctx: { revert: () => void } | null = null;

    import('gsap').then(({ default: gsap }) =>
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        const section = sectionRef.current;
        if (!section) return;

        ctx = gsap.context(() => {
          const cards = section.querySelectorAll<HTMLElement>('.pf-card');
          cards.forEach((card, i) => {
            gsap.fromTo(
              card,
              { y: 50, opacity: 0 },
              {
                y: 0,
                opacity: 1,
                duration: 0.7,
                ease: 'power3.out',
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
      })
    );

    return () => ctx?.revert();
  }, [mounted]);

  if (!mounted) {
    return <section id="portfolio-section" className="unslate-section" />;
  }

  return (
    <section
      id="portfolio-section"
      ref={sectionRef}
      className="unslate-section"
      style={{ background: '#111' }}
    >
      <style>{`
        /* ── Portfolio grid ───────────────────── */
        .pf-section-inner {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .pf-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }
        @media (max-width: 900px)  { .pf-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 560px)  { .pf-grid { grid-template-columns: 1fr; } }

        /* ── Individual card ──────────────────── */
        .pf-card {
          position: relative;
          display: block;
          overflow: hidden;
          cursor: pointer !important;
          text-decoration: none;
          color: inherit;
          border-radius: 4px;
          will-change: transform, opacity;
          transform: translateZ(0);
        }

        .pf-card-img-wrap {
          position: relative;
          overflow: hidden;
          line-height: 0;
        }

        .pf-card-img-wrap img {
          width: 100%;
          height: auto;
          display: block;
          transition: transform 0.45s ease;
          pointer-events: none;
        }

        .pf-card:hover .pf-card-img-wrap img {
          transform: scale(1.07);
        }

        /* ── Hover overlay ───────────────────────
           pointer-events: none → NEVER blocks clicks */
        .pf-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.18) 55%, transparent 100%);
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 24px 24px 16px;
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }

        .pf-card:hover .pf-overlay {
          opacity: 1;
        }

        .pf-overlay-title {
          color: #fff;
          font-size: 15px;
          font-weight: 700;
          margin: 0 0 4px;
          font-family: 'Sora', sans-serif;
          line-height: 1.3;
        }

        .pf-overlay-cat {
          color: rgba(255, 255, 255, 0.55);
          font-size: 11px;
          font-family: 'Inter', sans-serif;
          margin: 0 0 16px;
          text-transform: capitalize;
          letter-spacing: 0.04em;
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
          font-family: 'Sora', sans-serif;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          padding: 8px 16px;
          border-radius: 20px;
          width: fit-content;
          transform: translateY(8px);
          transition: transform 0.3s ease, background 0.2s ease;
        }

        .pf-card:hover .pf-view-btn {
          transform: translateY(0);
        }

        .pf-view-btn:hover {
          background: #e55e00;
        }

        /* ── Count badge ──────────────────────── */
        .pf-badge {
          position: absolute;
          top: 16px;
          left: 16px;
          background: rgba(0, 0, 0, 0.85);
          color: #FF6B00;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.12em;
          padding: 4px 8px;
          border-radius: 4px;
          font-family: 'Sora', sans-serif;
          pointer-events: none;
          z-index: 2;
        }
      `}</style>

      <div className="pf-section-inner">
        <SectionHeading title="WEB DEVELOPMENT WORKS" theme="dark" />

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
                  priority={idx < 3}
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
