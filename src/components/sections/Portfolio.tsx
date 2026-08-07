'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import Video from 'yet-another-react-lightbox/plugins/video';
import SectionHeading from '@/components/ui/SectionHeading';
import { portfolioItems, PortfolioItem } from '@/data/portfolio';

gsap.registerPlugin(ScrollTrigger);

export default function Portfolio() {
  const router = useRouter();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

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

        const xFrom = i % 2 === 0 ? -40 : 40;

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

        if (cover) {
          gsap.fromTo(
            cover,
            { x: '0%' },
            {
              x: '102%',
              ease: 'power2.inOut',
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 30%',
                scrub: 1.4,
              },
            }
          );
        }

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
                end: 'top 30%',
                scrub: 1.6,
              },
            }
          );
        }
      });

    }, section);

    return () => ctx.revert();
  }, [mounted]);

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

  const handleCardClick = (e: React.MouseEvent, item: PortfolioItem) => {
    if (item.type === 'lightbox' || item.type === 'video') {
      e.preventDefault();
      setLightboxIndex(getLightboxSlideIndex(item));
      setLightboxOpen(true);
    } else {
      e.preventDefault();
      router.push(item.href);
    }
  };

  if (!mounted) {
    return <section id="portfolio-section" className="unslate-section" />;
  }

  return (
    <section
      id="portfolio-section"
      ref={sectionRef}
      className="unslate-section pf-section"
    >
      <style>{`
        .pf-section { position: relative; overflow: hidden; }

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

        .pf-card {
          position: relative;
          will-change: transform, opacity;
          overflow: hidden;
          cursor: pointer;
        }

        .pf-cover {
          position: absolute;
          inset: 0;
          background: #FF6B00;
          z-index: 5;
          pointer-events: none !important;
        }

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
          z-index: 15;
          font-family: 'Sora', sans-serif;
          text-transform: uppercase;
          pointer-events: none !important;
        }

        .portfolio-item {
          position: relative;
          z-index: 10;
          display: block;
          width: 100%;
          height: 100%;
          cursor: pointer;
        }

        .portfolio-overlay {
          pointer-events: none !important;
        }

        .portfolio-item img {
          pointer-events: none !important;
        }
      `}</style>

      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px' }}>

        <div ref={headingRef}>
          <SectionHeading title="WEB DEVELOPMENT WORKS" theme="dark" />
        </div>

        <div className="portfolio-grid" ref={gridRef}>
          {portfolioItems.map((item, idx) => (
            <div key={item.id} className="pf-card">

              {/* Orange wipe cover */}
              <div className="pf-cover" />

              {/* Count badge */}
              <span className="pf-count">{String(idx + 1).padStart(2, '0')}</span>

              <Link
                href={item.href}
                className="portfolio-item"
                onClick={(e) => handleCardClick(e, item)}
              >
                <PortfolioOverlay item={item} />
                <PortfolioImage item={item} />
              </Link>
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
      <Image
        src={item.image}
        alt={item.title}
        width={800}
        height={item.isPortrait ? 1000 : 600}
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
