'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [showFullName, setShowFullName] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    let ctx: { revert: () => void } | null = null;
    let handleMouseMove: ((e: MouseEvent) => void) | null = null;

    Promise.all([import('gsap')]).then(([{ default: gsap }]) => {
      ctx = gsap.context(() => {
        // Mouse follower circle with mix-blend-mode difference
        handleMouseMove = (e: MouseEvent) => {
          if (!circleRef.current) return;
          gsap.to(circleRef.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.35,
            ease: 'power2.out',
          });
        };
        window.addEventListener('mousemove', handleMouseMove);

        // GSAP Timeline Reveal matching reference
        const tl = gsap.timeline({ defaults: { ease: 'expo.easeInOut' } });

        tl.from('#hero-wrapper', {
          duration: 3.5,
          scale: 0.75,
          opacity: 0,
        })
          .from(
            '#whitestrip',
            {
              duration: 2.0,
              width: 0,
            },
            '-=2.5'
          )
          .from(
            '#blackcard',
            {
              duration: 1.5,
              x: 50,
              opacity: 0,
            },
            '-=1.2'
          )
          .from(
            '#linelem',
            {
              duration: 1.5,
              x: 50,
              opacity: 0,
            },
            '-=1.2'
          )
          .from(
            '#linelem .hero-line',
            {
              duration: 2.0,
              width: 0,
              opacity: 0,
            },
            '-=1.2'
          )
          .from(
            '#blackcard p',
            {
              duration: 1.2,
              y: 30,
              opacity: 0,
            },
            '-=1.2'
          )
          .from(
            '#sideelem',
            {
              duration: 2.0,
              x: -30,
              opacity: 0,
            },
            '-=1.2'
          );
      }, containerRef);
    });

    return () => {
      ctx?.revert();
      if (handleMouseMove) window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mounted]);

  const toggleFullName = (e: React.MouseEvent) => {
    e.preventDefault();
    setShowFullName((prev) => !prev);
  };

  const handleScrollToPortfolio = (e: React.MouseEvent) => {
    e.preventDefault();
    const el = document.getElementById('portfolio-section');
    if (el) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(el, { offset: 0, duration: 1.4 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  if (!mounted) {
    return <section id="home-section" className="w-full h-screen bg-black" />;
  }

  return (
    <section
      id="home-section"
      ref={containerRef}
      className="hero-serif-rm-style relative w-full h-screen bg-black text-white overflow-hidden select-none"
    >
      {/* Import Playfair Display & Sora Google Fonts */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Sora:wght@700;800&display=swap');

        /* Custom Difference Cursor */
        #hero-circle {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          width: 54px;
          height: 54px;
          margin-top: -27px;
          margin-left: -27px;
          border-radius: 50%;
          border: 1.5px solid #ffffff;
          z-index: 999999999;
          mix-blend-mode: difference;
        }

        /* Hero Background Container */
        #hero-background {
          width: 100%;
          height: 100%;
          background-color: #000000;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        #hero-wrapper {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
        }

        /* Giant Serif DM Masked Typography */
        #hero-wrapper h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(200px, 36vw, 550px);
          font-weight: 700;
          letter-spacing: -0.02em;
          line-height: 0.9;
          margin: 0;
          padding: 0;
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          background-image: url("https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80");
          background-size: cover;
          background-position: 60% center;
        }

        /* Right White Strip */
        #whitestrip {
          display: flex;
          justify-content: center;
          align-items: center;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          width: 52%;
          height: 140px;
          background-color: #ffffff;
          z-index: 10;
          transition: all 0.5s ease;
        }

        /* Floating Black Card */
        #blackcard {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 30px;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translate(-50%, -50%);
          width: 240px;
          height: 330px;
          background-color: #000000;
          z-index: 20;
        }

        #blackcard p {
          color: #ffffff;
          font-family: 'Playfair Display', serif;
          text-align: center;
          font-size: 14px;
          line-height: 26px;
          font-weight: 400;
        }

        /* Line Element & CTA Link */
        #linelem {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: #000000;
          cursor: pointer;
        }

        #linelem .hero-line {
          width: 200px;
          height: 2px;
          background-color: #000000;
          margin: 0 30px;
          transition: width 0.3s ease;
        }

        #linelem h4 {
          font-family: 'Playfair Display', serif;
          font-size: 14px;
          font-weight: 600;
          color: #000000;
          white-space: nowrap;
          transition: color 0.3s ease;
        }

        /* Interactive Plus / Arrow Icon Circle */
        .hero-plus-icon-btn {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          border: 1.5px solid #000000;
          background: transparent;
          color: #000000;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 16px;
          font-weight: 600;
          line-height: 1;
          cursor: pointer;
          transition: transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.3s ease, color 0.3s ease;
        }

        .hero-plus-icon-btn.is-active {
          transform: rotate(45deg);
          background-color: #000000;
          color: #FF8A00;
        }

        #linelem:hover .hero-plus-icon-btn:not(.is-active) {
          transform: scale(1.12);
          background-color: #000000;
          color: #ffffff;
        }

        /* Revealed Name Overlay inside White Strip */
        .hero-revealed-name-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          animation: fadeInName 0.4s ease forwards;
        }

        @keyframes fadeInName {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-revealed-name {
          font-family: 'Sora', sans-serif;
          font-weight: 800;
          font-size: 18px;
          color: #000000;
          letter-spacing: -0.02em;
          line-height: 1.1;
        }

        .hero-revealed-name span {
          color: #FF8A00;
        }

        .hero-revealed-sub {
          font-family: var(--font-inter), 'Inter', sans-serif;
          font-size: 10px;
          font-weight: 700;
          letter-spacing: 0.12em;
          color: #666666;
          text-transform: uppercase;
          margin-top: 3px;
        }

        /* Side Vertical Rotated Text */
        #sideelem {
          position: absolute;
          top: 50%;
          left: 30px;
          color: #ffffff;
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 15px;
          font-size: 10px;
          transform: translateY(-50%) rotate(-90deg);
          transform-origin: center center;
          font-family: var(--font-inter), 'Inter', sans-serif;
          white-space: nowrap;
          z-index: 15;
        }

        /* Responsive Tweaks */
        @media (max-width: 1024px) {
          #whitestrip {
            width: 70%;
            height: 120px;
          }
          #blackcard {
            width: 200px;
            height: 280px;
            padding: 20px;
          }
          #blackcard p {
            font-size: 12px;
            line-height: 22px;
          }
          #linelem .hero-line {
            width: 100px;
            margin: 0 15px;
          }
          #sideelem {
            left: -50px;
            font-size: 8px;
            letter-spacing: 10px;
          }
        }

        @media (max-width: 640px) {
          #whitestrip {
            width: 100%;
            height: auto;
            position: absolute;
            bottom: 0;
            top: auto;
            right: 0;
            transform: none;
            flex-direction: column;
            padding: 24px 16px 20px;
            gap: 16px;
          }
          #blackcard {
            position: relative;
            transform: none;
            top: auto;
            left: auto;
            width: 100%;
            height: auto;
            padding: 16px 20px;
            border-radius: 8px;
          }
          #linelem {
            width: 100%;
            justify-content: space-between;
          }
          #linelem .hero-line {
            flex: 1;
            margin: 0 15px;
            width: auto;
          }
          #sideelem {
            display: none;
          }
          #hero-wrapper h1 {
            font-size: 42vw;
          }
        }
      `}</style>

      {/* Difference Mouse Follower Circle */}
      <div id="hero-circle" ref={circleRef} />

      <div id="hero-background">
        {/* Giant Serif Masked DM Text */}
        <div id="hero-wrapper">
          <h1>DM</h1>
        </div>

        {/* White Strip Container */}
        <div id="whitestrip">
          {/* Floating Black Card with Serif Intro Paragraph */}
          <div id="blackcard">
            <p>
              Dasun Methmal — Fullstack Software Engineer &amp; Digital Marketer. Engineering high-performance web applications, modern UI/UX platforms, and data-driven growth strategies.
            </p>
          </div>

          {/* Interactive Line & CTA Link */}
          <div id="linelem" onClick={toggleFullName}>
            {showFullName ? (
              <div className="hero-revealed-name-box" onClick={handleScrollToPortfolio}>
                <span className="hero-revealed-name">
                  DASUN METHMAL<span>.</span>
                </span>
                <span className="hero-revealed-sub">
                  FULL-STACK ENGINEER &amp; MARKETER ↗
                </span>
              </div>
            ) : (
              <h4 onClick={handleScrollToPortfolio}>View More</h4>
            )}

            <div className="hero-line" onClick={handleScrollToPortfolio} />

            <button
              type="button"
              onClick={toggleFullName}
              className={`hero-plus-icon-btn ${showFullName ? 'is-active' : ''}`}
              aria-label="Toggle full name reveal"
              title={showFullName ? 'Close' : 'Reveal full name'}
            >
              +
            </button>
          </div>
        </div>

        {/* Vertical Side Text */}
        <h5 id="sideelem">UNLEASH EXPERIENCE</h5>
      </div>
    </section>
  );
}
