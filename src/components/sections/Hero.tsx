'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const gridContainerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    let ctx: { revert: () => void } | null = null;

    Promise.all([import('gsap'), import('gsap/ScrollTrigger')]).then(
      ([{ default: gsap }, { ScrollTrigger }]) => {
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          // 1. Initial Staggered Entrance Animations
          const tl = gsap.timeline();

          // Center Tiles pop in
          tl.from('.tile', {
            y: 70,
            scale: 0.8,
            opacity: 0,
            duration: 1.1,
            stagger: {
              amount: 0.7,
              from: 'center',
              grid: 'auto',
            },
            ease: 'back.out(1.5)',
          })
            // Left Column slide in
            .from(
              '.gsap-fade-left',
              {
                x: -35,
                opacity: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power2.out',
              },
              '-=0.9'
            )
            // Right Column slide in
            .from(
              '.gsap-fade-right',
              {
                x: 35,
                opacity: 0,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power2.out',
              },
              '-=0.9'
            );

          // 2. Interactive 3D Hover on Tiles
          const tiles = containerRef.current?.querySelectorAll('.tile');
          tiles?.forEach((tile) => {
            const handleMouseEnter = () => {
              gsap.to(tile, {
                scale: 1.08,
                z: 25,
                zIndex: 10,
                duration: 0.35,
                ease: 'back.out(2)',
                borderColor: 'rgba(255, 138, 0, 0.6)',
                boxShadow:
                  '0 20px 40px rgba(255, 138, 0, 0.25), -10px -10px 25px rgba(255, 255, 255, 0.12)',
              });
            };

            const handleMouseLeave = () => {
              gsap.to(tile, {
                scale: 1,
                z: 0,
                zIndex: 1,
                duration: 0.35,
                ease: 'power2.out',
                borderColor: 'rgba(255, 138, 0, 0.25)',
                boxShadow:
                  '0 15px 30px rgba(0, 0, 0, 0.7), -6px -6px 15px rgba(255, 255, 255, 0.05)',
              });
            };

            tile.addEventListener('mouseenter', handleMouseEnter);
            tile.addEventListener('mouseleave', handleMouseLeave);
          });

          // 3. Scroll-Driven Parallax for Tile Columns
          if (gridContainerRef.current) {
            gsap.to('.col-0', {
              y: -35,
              ease: 'none',
              scrollTrigger: {
                trigger: gridContainerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            });

            gsap.to('.col-1', {
              y: 25,
              ease: 'none',
              scrollTrigger: {
                trigger: gridContainerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            });

            gsap.to('.col-2', {
              y: -20,
              ease: 'none',
              scrollTrigger: {
                trigger: gridContainerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            });

            gsap.to('.col-3', {
              y: 40,
              ease: 'none',
              scrollTrigger: {
                trigger: gridContainerRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            });

            // Gentle continuous floating animation
            gsap.to(gridContainerRef.current, {
              y: '-=8',
              duration: 3.2,
              repeat: -1,
              yoyo: true,
              ease: 'sine.inOut',
            });
          }
        }, containerRef);
      }
    );

    return () => ctx?.revert();
  }, [mounted]);

  if (!mounted) {
    return <section id="home-section" className="w-full min-h-screen bg-[#080808]" />;
  }

  return (
    <section
      id="home-section"
      ref={containerRef}
      className="hero-3d-clay-section relative w-full min-h-screen bg-[#080808] text-white flex items-center justify-center pt-24 pb-16 overflow-hidden select-none font-inter"
    >
      <style>{`
        /* ── Hero Custom Variables ── */
        .hero-3d-clay-section {
          --bg-color: #080808;
          --text-dark: #ffffff;
          --text-muted: rgba(255, 255, 255, 0.65);
          --accent-line: rgba(255, 138, 0, 0.25);
          --accent-orange: #FF8A00;
        }

        /* Container Grid Layout */
        .hero-clay-container {
          max-width: 1400px;
          width: 100%;
          margin: 0 auto;
          padding: 40px 24px;
          display: grid;
          grid-template-columns: 1fr auto 1fr;
          gap: 40px;
          align-items: center;
          position: relative;
          z-index: 2;
        }

        /* --- LEFT COLUMN --- */
        .col-left {
          display: flex;
          flex-direction: column;
          gap: 40px;
          max-width: 320px;
        }

        .stat-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .stat-number {
          font-family: var(--font-sora), 'Sora', sans-serif;
          font-size: 4.5rem;
          font-weight: 800;
          letter-spacing: -2px;
          color: #ffffff;
          line-height: 1;
        }

        .stat-number span {
          color: var(--accent-orange);
        }

        .stat-desc {
          font-size: 0.88rem;
          color: var(--text-muted);
          line-height: 1.55;
          letter-spacing: 0.02em;
        }

        .circle-widget {
          position: relative;
          width: 120px;
          height: 170px;
        }

        .circle-text {
          width: 120px;
          height: 120px;
          animation: spin 18s linear infinite;
        }

        .circle-widget svg text {
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 2.2px;
          fill: var(--accent-orange);
          text-transform: uppercase;
        }

        .vertical-line {
          position: absolute;
          left: 50%;
          top: 60px;
          transform: translateX(-50%);
          width: 1px;
          height: 95px;
          background: linear-gradient(to bottom, var(--accent-orange), transparent);
        }

        .vertical-line::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: -2px;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background-color: var(--accent-orange);
          box-shadow: 0 0 8px var(--accent-orange);
        }

        @keyframes spin {
          100% { transform: rotate(360deg); }
        }

        .bottom-text {
          font-size: 0.88rem;
          font-weight: 600;
          line-height: 1.6;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* --- CENTER COLUMN (3D CLAY GRID MOSAIC) --- */
        .col-center {
          position: relative;
          width: 430px;
          height: 580px;
          perspective: 1000px;
        }

        .grid-container {
          position: relative;
          width: 100%;
          height: 100%;
        }

        .tile {
          position: absolute;
          width: 100px;
          height: 130px;
          left: var(--x);
          top: var(--y);
          background-image: url("/images/cover_bg_2.png");
          background-size: 620px 800px;
          background-position: calc(-1 * var(--x) + 135px) calc(-1 * var(--y) - 15px);
          background-color: #12131A;
          border-radius: 16px;
          border: 3px solid rgba(255, 138, 0, 0.25);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.7), -6px -6px 15px rgba(255, 255, 255, 0.05);
          cursor: pointer;
          transform-style: preserve-3d;
          transition: border-color 0.35s ease, box-shadow 0.35s ease;
        }

        .tile::after {
          content: "";
          position: absolute;
          inset: 0;
          border-radius: 13px;
          box-shadow: inset 2px 2px 8px rgba(255, 255, 255, 0.1),
                      inset -2px -2px 8px rgba(0, 0, 0, 0.4);
          pointer-events: none;
          z-index: 2;
        }

        .tile::before {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(8, 8, 8, 0.1);
          border-radius: 13px;
          z-index: 1;
          pointer-events: none;
        }

        /* --- RIGHT COLUMN --- */
        .col-right {
          display: flex;
          flex-direction: column;
          gap: 36px;
          max-width: 340px;
          padding-left: 10px;
        }

        .discover-btn {
          display: inline-flex;
          align-items: center;
          gap: 15px;
          cursor: pointer;
          text-decoration: none;
          color: #ffffff;
        }

        .discover-circle {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          border: 1px solid var(--accent-line);
          background: rgba(255, 138, 0, 0.08);
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          transition: all 0.3s ease;
        }

        .discover-circle::after {
          content: "";
          width: 8px;
          height: 8px;
          background-color: var(--accent-orange);
          border-radius: 50%;
          box-shadow: 0 0 6px var(--accent-orange);
        }

        .discover-btn:hover .discover-circle {
          background: var(--accent-orange);
          transform: scale(1.08);
        }

        .discover-btn:hover .discover-circle::after {
          background-color: #000000;
          box-shadow: none;
        }

        .discover-text {
          font-family: var(--font-sora), 'Sora', sans-serif;
          font-size: 0.92rem;
          font-weight: 600;
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .participants-section h3 {
          font-family: var(--font-sora), 'Sora', sans-serif;
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 16px;
          color: #ffffff;
          letter-spacing: -0.02em;
        }

        .avatars-wrapper {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .avatars {
          display: flex;
        }

        .avatars img {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 2px solid #080808;
          margin-left: -12px;
          object-fit: cover;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.4);
        }
        .avatars img:first-child {
          margin-left: 0;
        }

        .more-text {
          font-size: 0.85rem;
          font-weight: 700;
          color: var(--accent-orange);
          line-height: 1.3;
        }

        .separator {
          width: 100%;
          height: 1px;
          background: var(--accent-line);
          border: none;
        }

        .quote-text {
          font-size: 0.92rem;
          color: var(--text-muted);
          line-height: 1.65;
        }

        .signature {
          font-family: var(--font-sora), 'Sora', sans-serif;
          font-size: 1.6rem;
          font-weight: 700;
          color: var(--accent-orange);
          letter-spacing: -0.02em;
          margin-top: -8px;
        }

        /* ── Mobile & Tablet Responsiveness ── */
        @media (max-width: 1180px) {
          .hero-clay-container {
            grid-template-columns: 1fr;
            justify-items: center;
            text-align: center;
            gap: 50px;
            padding-top: 20px;
          }
          .col-left,
          .col-right {
            max-width: 600px;
            align-items: center;
            padding: 0;
          }
          .vertical-line {
            display: none;
          }
          .circle-widget {
            height: 120px;
          }
          .avatars-wrapper {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .col-center {
            width: 320px;
            height: 440px;
            transform: scale(0.82);
            transform-origin: center center;
          }
          .tile {
            width: 75px;
            height: 98px;
            border-radius: 12px;
          }
          .stat-number {
            font-size: 3.5rem;
          }
        }
      `}</style>

      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#FF8A00]/10 rounded-full blur-[140px] pointer-events-none z-0" />

      <div className="hero-clay-container">
        {/* --- LEFT COLUMN --- */}
        <div className="col-left">
          <div className="stat-group gsap-fade-left">
            <div className="stat-number">
              100<span>%</span>
            </div>
            <div className="stat-desc">
              Full-Stack Engineering &amp; Digital Marketing Strategy
            </div>
          </div>

          <div className="circle-widget gsap-fade-left">
            <svg className="circle-text" viewBox="0 0 100 100">
              <path
                id="circlePath"
                d="M 50, 50 m -40, 0 a 40,40 0 1,1 80,0 a 40,40 0 1,1 -80,0"
                fill="none"
              />
              <text>
                <textPath href="#circlePath" startOffset="0%">
                  DASUN METHMAL • CREATIVE DEVELOPER •
                </textPath>
              </text>
            </svg>
            <div className="vertical-line" />
          </div>

          <div className="bottom-text gsap-fade-left">
            DASUN METHMAL<br />
            FULL-STACK DEV &amp;<br />
            DIGITAL MARKETER
          </div>
        </div>

        {/* --- CENTER COLUMN (3D CLAY GRID MOSAIC) --- */}
        <div className="col-center">
          <div ref={gridContainerRef} className="grid-container">
            <div className="tile col-0" style={{ '--x': '0px', '--y': '190px' } as React.CSSProperties} />
            <div className="tile col-0" style={{ '--x': '0px', '--y': '330px' } as React.CSSProperties} />

            <div className="tile col-1" style={{ '--x': '110px', '--y': '30px' } as React.CSSProperties} />
            <div className="tile col-1" style={{ '--x': '110px', '--y': '170px' } as React.CSSProperties} />
            <div className="tile col-1" style={{ '--x': '110px', '--y': '310px' } as React.CSSProperties} />
            <div className="tile col-1" style={{ '--x': '110px', '--y': '450px' } as React.CSSProperties} />

            <div className="tile col-2" style={{ '--x': '220px', '--y': '0px' } as React.CSSProperties} />
            <div className="tile col-2" style={{ '--x': '220px', '--y': '140px' } as React.CSSProperties} />
            <div className="tile col-2" style={{ '--x': '220px', '--y': '280px' } as React.CSSProperties} />
            <div className="tile col-2" style={{ '--x': '220px', '--y': '420px' } as React.CSSProperties} />

            <div className="tile col-3" style={{ '--x': '330px', '--y': '180px' } as React.CSSProperties} />
            <div className="tile col-3" style={{ '--x': '330px', '--y': '320px' } as React.CSSProperties} />
          </div>
        </div>

        {/* --- RIGHT COLUMN --- */}
        <div className="col-right">
          <Link href="#portfolio-section" className="discover-btn gsap-fade-right">
            <div className="discover-circle" />
            <div className="discover-text">Explore Portfolio</div>
          </Link>

          <div className="participants-section gsap-fade-right">
            <h3>Delivered Works</h3>
            <div className="avatars-wrapper">
              <div className="avatars">
                {/* Developer / Project Showcase avatars */}
                <img src="/images/developer-1.png" alt="Project Showcase 1" />
                <img src="/images/developer-3.png" alt="Project Showcase 2" />
                <img src="/images/developer-7.png" alt="Project Showcase 3" />
              </div>
              <div className="more-text">
                30+<br />Projects
              </div>
            </div>
          </div>

          <hr className="separator gsap-fade-right" />

          <div className="quote-text gsap-fade-right">
            &ldquo;Building high-performance web applications, scalable platforms, and targeted digital growth campaigns.&rdquo;
          </div>

          <div className="signature gsap-fade-right">
            Dasun Methmal
          </div>
        </div>
      </div>
    </section>
  );
}
