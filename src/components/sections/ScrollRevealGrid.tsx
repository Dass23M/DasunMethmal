'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * ScrollRevealGrid
 *
 * A pinned section where 4 service cards reveal one-by-one
 * synchronized to the scroll position (scrub).
 *
 * Scroll down → cards rise from below, images scale in, text fades in.
 * Scroll back up → everything smoothly reverses.
 * All animations are 1:1 tied to the scrollbar — no auto-play.
 */

const CARDS = [
  {
    id: 1,
    number: '01',
    title: 'Web Development',
    subtitle: 'Modern, performant sites',
    image: '/images/work_1_full.jpg',
  },
  {
    id: 2,
    number: '02',
    title: 'Digital Strategy',
    subtitle: 'Data-driven growth plans',
    image: '/images/work_2_full.jpg',
  },
  {
    id: 3,
    number: '03',
    title: 'Social Media',
    subtitle: 'Engaging audience presence',
    image: '/images/work_3_full.jpg',
  },
  {
    id: 4,
    number: '04',
    title: 'Content Creation',
    subtitle: 'Stories that convert',
    image: '/images/work_5_md.jpg',
  },
];

export default function ScrollRevealGrid() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;

    const wrapper = wrapperRef.current;
    const section = sectionRef.current;
    if (!wrapper || !section) return;

    const cards = section.querySelectorAll<HTMLDivElement>('.srg-card');
    const heading = section.querySelector<HTMLDivElement>('.srg-heading');

    const ctx = gsap.context(() => {

      // Master timeline — everything on one timeline, scrubbed by scroll
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: '+=2500',       // scroll distance that drives the entire animation
          pin: true,
          scrub: 1.5,          // smooth 1.5s lag behind scroll
          anticipatePin: 1,
        },
      });

      // 1. Heading fades + slides in
      if (heading) {
        tl.fromTo(
          heading,
          { y: 60, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
          0
        );
      }

      // 2. Each card reveals in staggered sequence
      cards.forEach((card, i) => {
        const imgWrap = card.querySelector<HTMLDivElement>('.srg-imgwrap');
        const img = card.querySelector<HTMLDivElement>('.srg-img');
        const number = card.querySelector<HTMLSpanElement>('.srg-number');
        const title = card.querySelector<HTMLSpanElement>('.srg-title');
        const meta = card.querySelector<HTMLDivElement>('.srg-meta');
        const line = card.querySelector<HTMLDivElement>('.srg-line');

        const offset = 0.15 + i * 0.2; // stagger start for each card

        // Card slides up from below
        tl.fromTo(
          card,
          { y: 200, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.35, ease: 'power3.out' },
          offset
        );

        // Image clip-path reveal (bottom to top wipe)
        if (imgWrap) {
          tl.fromTo(
            imgWrap,
            { clipPath: 'inset(100% 0% 0% 0%)' },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.3, ease: 'power2.inOut' },
            offset + 0.05
          );
        }

        // Image scale-in parallax
        if (img) {
          tl.fromTo(
            img,
            { scale: 1.3 },
            { scale: 1, duration: 0.4, ease: 'power2.out' },
            offset + 0.05
          );
        }

        // Number slides in
        if (number) {
          tl.fromTo(
            number,
            { y: 30, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.2, ease: 'power2.out' },
            offset + 0.15
          );
        }

        // Vertical title slides in
        if (title) {
          tl.fromTo(
            title,
            { y: 40, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.2, ease: 'power2.out' },
            offset + 0.18
          );
        }

        // Meta text below image
        if (meta) {
          tl.fromTo(
            meta,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.2, ease: 'power2.out' },
            offset + 0.2
          );
        }

        // Orange accent line
        if (line) {
          tl.fromTo(
            line,
            { scaleX: 0 },
            { scaleX: 1, duration: 0.2, ease: 'power2.inOut' },
            offset + 0.22
          );
        }
      });

    }, wrapper);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return <div style={{ height: '100vh', background: '#000' }} />;
  }

  return (
    <div ref={wrapperRef}>
      <section
        ref={sectionRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '100vh',
          background: '#000',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <style>{`
          /* ── Heading ───────────────────────────────────────── */
          .srg-heading {
            max-width: 1200px;
            margin: 0 auto 2.5rem;
            padding: 0 2rem;
            width: 100%;
          }
          .srg-heading .srg-eyebrow {
            font-family: 'Raleway', sans-serif;
            font-size: 0.72rem;
            font-weight: 600;
            letter-spacing: 0.24em;
            text-transform: uppercase;
            color: #FF6B00;
            margin-bottom: 0.5rem;
          }
          .srg-heading h2 {
            font-family: 'Raleway', sans-serif;
            font-size: clamp(1.5rem, 3.2vw, 2.6rem);
            font-weight: 800;
            color: #fff;
            margin: 0;
            line-height: 1.15;
          }

          /* ── Grid layout ──────────────────────────────────── */
          .srg-grid {
            display: flex;
            align-items: flex-end;
            justify-content: center;
            gap: 3%;
            max-width: 1200px;
            margin: 0 auto;
            padding: 0 2rem;
            width: 100%;
          }

          /* ── Card ──────────────────────────────────────────── */
          .srg-card {
            position: relative;
            width: 22%;
            will-change: transform, opacity;
          }

          /* Staggered heights for visual rhythm */
          .srg-card:nth-child(1) .srg-imgwrap { height: 380px; }
          .srg-card:nth-child(2) .srg-imgwrap { height: 460px; }
          .srg-card:nth-child(3) .srg-imgwrap { height: 320px; }
          .srg-card:nth-child(4) .srg-imgwrap { height: 400px; }

          .srg-imgwrap {
            width: 100%;
            overflow: hidden;
            border-radius: 4px;
            position: relative;
            clip-path: inset(100% 0% 0% 0%);
          }

          .srg-img {
            width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            will-change: transform;
          }

          /* Orange accent bar */
          .srg-line {
            height: 3px;
            background: #FF6B00;
            border-radius: 2px;
            transform-origin: left center;
            transform: scaleX(0);
            margin-top: 6px;
          }

          /* Number */
          .srg-number {
            position: absolute;
            top: -28px;
            right: 0;
            font-family: 'Raleway', sans-serif;
            font-size: 0.82rem;
            font-weight: 800;
            letter-spacing: 0.14em;
            color: #FF6B00;
            writing-mode: vertical-rl;
            will-change: transform, opacity;
          }

          /* Title (vertical) */
          .srg-title {
            position: absolute;
            right: -30px;
            top: 0;
            font-family: 'Raleway', sans-serif;
            font-size: 0.78rem;
            font-weight: 600;
            letter-spacing: 0.12em;
            color: rgba(255,255,255,0.45);
            writing-mode: vertical-rl;
            text-transform: uppercase;
            will-change: transform, opacity;
          }

          /* Meta (below image) */
          .srg-meta {
            padding-top: 1rem;
            will-change: transform, opacity;
          }
          .srg-meta h3 {
            font-family: 'Raleway', sans-serif;
            font-size: 1.05rem;
            font-weight: 700;
            color: #fff;
            margin: 0 0 0.25rem;
          }
          .srg-meta p {
            font-family: 'Raleway', sans-serif;
            font-size: 0.74rem;
            font-weight: 300;
            color: rgba(255,255,255,0.38);
            margin: 0;
            letter-spacing: 0.06em;
            text-transform: uppercase;
          }

          /* ── Responsive ────────────────────────────────────── */
          @media (max-width: 991px) {
            .srg-grid { flex-wrap: wrap; gap: 1.8rem; }
            .srg-card { width: 42%; }
            .srg-card:nth-child(1) .srg-imgwrap,
            .srg-card:nth-child(2) .srg-imgwrap,
            .srg-card:nth-child(3) .srg-imgwrap,
            .srg-card:nth-child(4) .srg-imgwrap { height: 280px; }
            .srg-title { right: -22px; font-size: 0.68rem; }
          }
          @media (max-width: 575px) {
            .srg-card { width: 85%; }
            .srg-card:nth-child(1) .srg-imgwrap,
            .srg-card:nth-child(2) .srg-imgwrap,
            .srg-card:nth-child(3) .srg-imgwrap,
            .srg-card:nth-child(4) .srg-imgwrap { height: 220px; }
          }
        `}</style>

        {/* Heading */}
        <div className="srg-heading">
          <p className="srg-eyebrow">What We Do</p>
          <h2>Our Services</h2>
        </div>

        {/* Grid */}
        <div className="srg-grid">
          {CARDS.map((card) => (
            <div key={card.id} className="srg-card">
              <span className="srg-number">{card.number}</span>
              <span className="srg-title">{card.title}</span>

              <div className="srg-imgwrap">
                <div
                  className="srg-img"
                  style={{ backgroundImage: `url(${card.image})` }}
                />
              </div>

              <div className="srg-line" />

              <div className="srg-meta">
                <h3>{card.title}</h3>
                <p>{card.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
