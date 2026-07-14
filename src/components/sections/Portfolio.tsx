'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Video from 'yet-another-react-lightbox/plugins/video';
import { portfolioItems, PortfolioItem } from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // ── Step 1: mark mounted (prevents SSR hydration mismatch) ──────────────
  useEffect(() => {
    setMounted(true);
  }, []);

  // ── Step 2: GSAP runs ONLY after mount so elements exist in the DOM ──────
  useEffect(() => {
    if (!mounted) return;

    const section = sectionRef.current;
    const heading = headingRef.current;
    const grid = gridRef.current;
    if (!section || !heading || !grid) return;

    const ctx = gsap.context(() => {

      // 1. Heading: slide up + fade in
      gsap.fromTo(
        heading,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: heading,
            start: 'top 90%',
            end: 'top 50%',
            scrub: 1,
          },
        }
      );

      // 2. Heading underline scale-in
      const line = section.querySelector<HTMLSpanElement>('.pf-heading-line');
      if (line) {
        gsap.fromTo(
          line,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: 'power2.inOut',
            scrollTrigger: {
              trigger: heading,
              start: 'top 80%',
              end: 'top 40%',
              scrub: 1.2,
            },
          }
        );
      }

      // 3. Per-card animations
      const cards = grid.querySelectorAll<HTMLDivElement>('.pf-card');
      cards.forEach((card, i) => {
        const cover = card.querySelector<HTMLDivElement>('.pf-cover');
        const img   = card.querySelector<HTMLImageElement>('img');

        // Alternate entry: odd cards from left, even from right
        const xFrom = i % 2 === 0 ? -40 : 40;

        // Card lifts in from below
        gsap.fromTo(
          card,
          { y: 70, x: xFrom, opacity: 0 },
          {
            y: 0, x: 0, opacity: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 92%',
              end: 'top 55%',
              scrub: 1,
            },
          }
        );

        // Orange cover wipes RIGHT (starts covering image, slides away)
        if (cover) {
          gsap.fromTo(
            cover,
            { x: '0%' },           // starts ON TOP of image
            {
              x: '102%',            // slides off to the right, revealing image
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 20%',
                scrub: 1.4,
              },
            }
          );
        }

        // Image zooms from 1.3 → 1 as cover slides away
        if (img) {
          gsap.fromTo(
            img,
            { scale: 1.3 },
            {
              scale: 1,
              ease: 'power2.out',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 20%',
                scrub: 1.6,
              },
            }
          );
        }
      });

    }, section);

    return () => ctx.revert();
  }, [mounted]); // re-run when mounted becomes true

  // Lightbox data
  const lightboxSlides = portfolioItems
    .filter((item) => item.type === 'lightbox' || item.type === 'video')
    .map((item) => {
      if (item.type === 'video') {
        return {
          type: 'video' as const,
          sources: [{ src: item.href, type: 'video/mp4' }],
          poster: item.image,
        };
      }
      return { src: item.href };
    });

  const getLightboxSlideIndex = (item: PortfolioItem) => {
    const lbItems = portfolioItems.filter(
      (i) => i.type === 'lightbox' || i.type === 'video'
    );
    return lbItems.findIndex((i) => i.id === item.id);
  };

  const handleItemClick = (e: React.MouseEvent, item: PortfolioItem) => {
    if (item.type === 'lightbox' || item.type === 'video') {
      e.preventDefault();
      setLightboxIndex(getLightboxSlideIndex(item));
      setLightboxOpen(true);
    }
  };

  // ── SSR placeholder — must exactly match what server outputs ─────────────
  if (!mounted) {
    return <section id="portfolio-section" className="unslate-section" />;
  }

  // ── Full client render ───────────────────────────────────────────────────
  return (
    <section
      id="portfolio-section"
      ref={sectionRef}
      className="unslate-section pf-section"
    >
      <style>{`
        .pf-section { position: relative; overflow: hidden; }

        /* Heading */
        .pf-heading-wrap {
          margin-bottom: 3.5rem;
          display: inline-block;
          position: relative;
        }
        .pf-heading-wrap h2 { margin-bottom: 0.4rem; }
        .pf-heading-line {
          display: block;
          height: 3px;
          width: 100%;
          background: #FF6B00;
          border-radius: 2px;
          transform-origin: left center;
        }

        /* Card wrapper */
        .pf-card {
          position: relative;
          will-change: transform, opacity;
          overflow: hidden;
        }

        /* Orange wipe cover — sits ON TOP of the image, z-index above img */
        .pf-cover {
          position: absolute;
          inset: 0;
          background: #FF6B00;
          z-index: 5;
          pointer-events: none;
        }

        /* Numbered badge */
        .pf-count {
          position: absolute;
          top: 12px;
          left: 12px;
          font-size: 0.68rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          color: #FF6B00;
          background: rgba(0,0,0,0.88);
          padding: 3px 8px;
          border-radius: 3px;
          z-index: 10;
          font-family: 'Raleway', sans-serif;
          text-transform: uppercase;
        }

        /* Overlay */
        .portfolio-item .portfolio-overlay {
          opacity: 0;
          transition: opacity 0.35s ease;
        }
        .portfolio-item:hover .portfolio-overlay { opacity: 1; }

        /* Image hover */
        .portfolio-item img {
          transition: transform 0.6s cubic-bezier(0.25,0.46,0.45,0.94) !important;
          transform-origin: center center;
        }
        .portfolio-item:hover img { transform: scale(1.06) !important; }

        /* Touch / mobile: always show titles (no hover) */
        @media (hover: none), (max-width: 991px) {
          .portfolio-item .portfolio-overlay {
            opacity: 1;
            background: linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.2) 55%, transparent 100%);
          }
          .portfolio-item:hover img { transform: none !important; }
        }

        .pf-portrait {
          height: min(500px, 72vw);
        }
        .pf-portrait img {
          height: 100% !important;
          width: 100%;
          object-fit: cover;
        }
        @media (min-width: 992px) {
          .pf-portrait { height: 500px; }
        }
      `}</style>

      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px' }}>

        {/* Heading */}
        <div className="pf-heading-wrap">
          <h2 ref={headingRef} className="heading-h2">Portfolio</h2>
          <span className="pf-heading-line" />
        </div>

        {/* Grid */}
        <div className="portfolio-grid" ref={gridRef}>
          {portfolioItems.map((item, idx) => (
            <div key={item.id} className="pf-card">

              {/* Orange wipe cover */}
              <div className="pf-cover" />

              {/* Count badge */}
              <span className="pf-count">{String(idx + 1).padStart(2, '0')}</span>

              {item.type === 'page' ? (
                <Link href={item.href} className="portfolio-item">
                  <PortfolioOverlay item={item} />
                  <PortfolioImage item={item} />
                </Link>
              ) : (
                <a
                  href={item.href}
                  className="portfolio-item"
                  onClick={(e) => handleItemClick(e, item)}
                  rel="noreferrer"
                >
                  <PortfolioOverlay item={item} isMedia />
                  <PortfolioImage item={item} />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        slides={lightboxSlides}
        index={lightboxIndex}
        plugins={[Video]}
      />
    </section>
  );
}

function PortfolioImage({ item }: { item: PortfolioItem }) {
  return (
    <div
      className={item.isPortrait ? 'pf-portrait' : undefined}
      style={{ position: 'relative', overflow: 'hidden', lineHeight: 0 }}
    >
      <img
        src={item.image}
        alt={item.title}
        style={{
          width: '100%',
          height: item.isPortrait ? '100%' : 'auto',
          objectFit: item.isPortrait ? 'cover' : 'unset',
          display: 'block',
        }}
      />
    </div>
  );
}

function PortfolioOverlay({ item, isMedia }: { item: PortfolioItem; isMedia?: boolean }) {
  return (
    <div className="portfolio-overlay">
      <div className="portfolio-overlay-icon">
        {isMedia ? (
          item.type === 'video' ? (
            <svg width="24" height="24" fill="white" viewBox="0 0 24 24"><path d="M8 5v14l11-7z" /></svg>
          ) : (
            <svg width="24" height="24" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
              <rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><path d="M21 15l-5-5L5 21" />
            </svg>
          )
        ) : (
          <svg width="20" height="20" fill="none" stroke="white" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
          </svg>
        )}
      </div>
      <div className="portfolio-overlay-content">
        <h3>{item.title}</h3>
        <p>{item.categories}</p>
      </div>
    </div>
  );
}
