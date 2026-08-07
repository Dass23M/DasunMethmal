'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import { blogPosts } from '@/data/blog';

const POSTER_ITEMS = [
  { ...blogPosts[0], image: '/images/poster-5.png' },
  { ...blogPosts[1], image: '/images/poster-1.png' },
  { ...blogPosts[2], image: '/images/poster-2.png' },
  { ...blogPosts[3], image: '/images/poster-3.jpg' },
  { ...blogPosts[4], image: '/images/poster-4.png' },
  { ...blogPosts[5], image: '/images/fashion4.png' },
];

export default function PosterDesign() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !sectionRef.current) return;

    let ctx: { revert: () => void } | null = null;

    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);
        if (!sectionRef.current) return;

        ctx = gsap.context(() => {
          // Headline word-by-word reveal
          const heading = sectionRef.current?.querySelector<HTMLElement>('.pd-headline');
          if (heading) {
            gsap.fromTo(heading, { autoAlpha: 0, y: 40 }, {
              autoAlpha: 1, y: 0, duration: 1.1, ease: 'power3.out',
              scrollTrigger: { trigger: heading, start: 'top 88%' },
            });
          }

          const sub = sectionRef.current?.querySelector<HTMLElement>('.pd-sub');
          if (sub) {
            gsap.fromTo(sub, { autoAlpha: 0, y: 24 }, {
              autoAlpha: 1, y: 0, duration: 0.85, delay: 0.2, ease: 'power3.out',
              scrollTrigger: { trigger: sub, start: 'top 90%' },
            });
          }

          // Cards stagger reveal
          const cards = sectionRef.current?.querySelectorAll<HTMLElement>('.pd-card');
          cards?.forEach((card, i) => {
            gsap.fromTo(card, { autoAlpha: 0, y: 55, scale: 0.96 }, {
              autoAlpha: 1, y: 0, scale: 1, duration: 0.9,
              delay: i * 0.1, ease: 'power3.out',
              scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none reverse' },
            });
          });
        }, sectionRef);
      });
    });

    return () => ctx?.revert();
  }, [mounted]);

  if (!mounted) {
    return <section id="poster-design-section" style={{ minHeight: '100vh', background: '#000' }} />;
  }

  return (
    <section
      id="poster-design-section"
      ref={sectionRef}
      style={{ background: '#000', padding: '72px 0 90px', overflow: 'hidden' }}
    >
      {/* ── Header ─────────────────────────────────────────────────── */}
      <div style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
        <SectionHeading title="POSTER &amp; SOCIAL POST DESIGN" theme="dark" />
      </div>

      {/* ── Featured Large Card ─────────────────────────────────────── */}
      <div style={{ maxWidth: '1040px', margin: '0 auto', padding: '0 24px' }}>
        <div className="pd-card" style={{
          position: 'relative',
          borderRadius: '22px',
          overflow: 'hidden',
          marginBottom: '16px',
          cursor: 'pointer',
          opacity: 0,
        }}>
          <FeaturedCard post={POSTER_ITEMS[0]} />
        </div>

        {/* ── Two-Column Row ─────────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
          {POSTER_ITEMS.slice(1, 3).map((post) => (
            <div key={post.id} className="pd-card" style={{ borderRadius: '18px', overflow: 'hidden', cursor: 'pointer', opacity: 0 }}>
              <MediumCard post={post} />
            </div>
          ))}
        </div>

        {/* ── Three-Column Row ────────────────────────────────────────────────── */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
          {POSTER_ITEMS.slice(3, 6).map((post) => (
            <div key={post.id} className="pd-card" style={{ borderRadius: '16px', overflow: 'hidden', cursor: 'pointer', opacity: 0 }}>
              <SmallCard post={post} />
            </div>
          ))}
        </div>
      </div>

      {/* ── Navigation dots ────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '60px' }}>
        {POSTER_ITEMS.map((_, i) => (
          <button
            key={i}
            onClick={() => setActiveIdx(i)}
            style={{
              width: i === activeIdx ? '24px' : '7px',
              height: '7px',
              borderRadius: '4px',
              background: i === activeIdx ? '#FF6B00' : 'rgba(255,255,255,0.25)',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.35s cubic-bezier(.4,0,.2,1)',
              padding: 0,
            }}
            aria-label={`View poster ${i + 1}`}
          />
        ))}
      </div>

      <style>{`
        #poster-design-section .pd-card:hover .pd-card-img {
          transform: scale(1.05);
        }
        #poster-design-section .pd-card:hover .pd-overlay {
          opacity: 1 !important;
        }
        #poster-design-section .pd-card:hover .pd-tag {
          transform: translateY(0);
          opacity: 1 !important;
        }
        @media (max-width: 767px) {
          #poster-design-section > div:last-of-type > div:nth-child(2) {
            grid-template-columns: 1fr !important;
          }
          #poster-design-section > div:last-of-type > div:nth-child(3) {
            grid-template-columns: 1fr 1fr !important;
          }
        }
        @media (max-width: 540px) {
          #poster-design-section > div:last-of-type > div:nth-child(3) {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}

// ── Card Variants ──────────────────────────────────────────────────────────────

function FeaturedCard({ post }: { post: typeof POSTER_ITEMS[0] }) {
  return (
    <div style={{ position: 'relative', aspectRatio: '21/8', width: '100%' }}>
      <Image
        src={post.image}
        alt={post.title}
        fill
        sizes="100vw"
        className="pd-card-img"
        style={{ objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(.4,0,.2,1)' }}
        priority
      />
      {/* Deep gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.78) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)',
      }} />
      {/* Hover overlay */}
      <div
        className="pd-overlay"
        style={{
          position: 'absolute', inset: 0,
          background: 'rgba(255,107,0,0.06)',
          opacity: 0,
          transition: 'opacity 0.4s ease',
        }}
      />
      {/* Content */}
      <div style={{
        position: 'absolute', left: 0, right: 0, bottom: 0,
        padding: '40px 44px',
        display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between',
      }}>
        <div>
          <span
            className="pd-tag"
            style={{
              display: 'inline-block',
              fontFamily: '-apple-system, BlinkMacSystemFont, Helvetica Neue, Arial, sans-serif',
              fontSize: '10px',
              fontWeight: 700,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: '#FF6B00',
              background: 'rgba(255,107,0,0.12)',
              border: '1px solid rgba(255,107,0,0.3)',
              borderRadius: '40px',
              padding: '5px 14px',
              marginBottom: '14px',
              opacity: 0.9,
              transform: 'translateY(6px)',
              transition: 'all 0.35s ease',
            }}
          >
            {post.categoryLabel}
          </span>
          <h3 style={{
            fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif',
            fontSize: 'clamp(1.4rem, 3vw, 2.4rem)',
            fontWeight: 700,
            letterSpacing: '-0.02em',
            color: '#fff',
            margin: 0,
            lineHeight: 1.1,
          }}>
            {post.title}
          </h3>
        </div>
        <div style={{
          fontFamily: '-apple-system, BlinkMacSystemFont, Helvetica Neue, sans-serif',
          fontSize: '12px',
          color: 'rgba(255,255,255,0.5)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
          paddingLeft: '24px',
        }}>
          {post.date}
        </div>
      </div>
    </div>
  );
}

function MediumCard({ post }: { post: typeof POSTER_ITEMS[0] }) {
  return (
    <div style={{ position: 'relative', aspectRatio: '3/2' }}>
      <Image
        src={post.image}
        alt={post.title}
        fill
        sizes="(max-width: 768px) 100vw, 50vw"
        className="pd-card-img"
        style={{ objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(.4,0,.2,1)' }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.10) 60%, transparent 100%)',
      }} />
      <div
        className="pd-overlay"
        style={{ position: 'absolute', inset: 0, background: 'rgba(255,107,0,0.06)', opacity: 0, transition: 'opacity 0.4s ease' }}
      />
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        padding: '28px 30px',
      }}>
        <span
          className="pd-tag"
          style={{
            display: 'inline-block',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '9px',
            fontWeight: 700,
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            color: '#FF8C00',
            marginBottom: '10px',
            opacity: 0.85,
            transform: 'translateY(5px)',
            transition: 'all 0.35s ease',
          }}
        >
          {post.readTime}
        </span>
        <h3 style={{
          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: 'clamp(1rem, 1.8vw, 1.35rem)',
          fontWeight: 700,
          letterSpacing: '-0.018em',
          color: '#fff',
          margin: 0,
          lineHeight: 1.2,
        }}>
          {post.title}
        </h3>
      </div>
    </div>
  );
}

function SmallCard({ post }: { post: typeof POSTER_ITEMS[0] }) {
  return (
    <div style={{ position: 'relative', aspectRatio: '4/5' }}>
      <Image
        src={post.image}
        alt={post.title}
        fill
        sizes="(max-width: 768px) 50vw, 33vw"
        className="pd-card-img"
        style={{ objectFit: 'cover', transition: 'transform 0.7s cubic-bezier(.4,0,.2,1)' }}
      />
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.08) 60%, transparent 100%)',
      }} />
      <div
        className="pd-overlay"
        style={{ position: 'absolute', inset: 0, background: 'rgba(255,107,0,0.06)', opacity: 0, transition: 'opacity 0.4s ease' }}
      />
      {/* Top badge */}
      <div style={{
        position: 'absolute', top: '16px', left: '16px',
        background: 'rgba(0,0,0,0.55)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderRadius: '20px',
        border: '1px solid rgba(255,255,255,0.12)',
        padding: '4px 12px',
        fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
        fontSize: '9px',
        fontWeight: 700,
        letterSpacing: '0.13em',
        textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.7)',
      }}>
        {post.categoryLabel}
      </div>
      <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '22px 22px' }}>
        <span
          className="pd-tag"
          style={{
            display: 'block',
            fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif',
            fontSize: '8.5px',
            fontWeight: 700,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#FF8C00',
            marginBottom: '8px',
            opacity: 0.85,
            transform: 'translateY(5px)',
            transition: 'all 0.35s ease',
          }}
        >
          {post.date}
        </span>
        <h3 style={{
          fontFamily: 'SF Pro Display, -apple-system, BlinkMacSystemFont, sans-serif',
          fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)',
          fontWeight: 700,
          letterSpacing: '-0.015em',
          color: '#fff',
          margin: 0,
          lineHeight: 1.25,
        }}>
          {post.title}
        </h3>
      </div>
    </div>
  );
}
