'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    let ctx: { revert: () => void } | null = null;
    let handleMouseMove: ((e: MouseEvent) => void) | null = null;

    Promise.all([import('gsap')]).then(([{ default: gsap }]) => {
      ctx = gsap.context(() => {
        // Mouse follower circle tracking with smooth delay
        handleMouseMove = (e: MouseEvent) => {
          if (!circleRef.current) return;
          gsap.to(circleRef.current, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.4,
            ease: 'power2.out',
          });
        };
        window.addEventListener('mousemove', handleMouseMove);

        // GSAP Timeline Reveal
        const tl = gsap.timeline({ defaults: { ease: 'expo.easeInOut' } });

        tl.from('#hero-wrapper', {
          duration: 2.8,
          scale: 0.7,
          opacity: 0,
        })
          .from(
            '#whitestrip',
            {
              duration: 1.8,
              width: 0,
            },
            '-=2.0'
          )
          .from(
            '#blackcard',
            {
              duration: 1.4,
              x: 60,
              opacity: 0,
            },
            '-=1.2'
          )
          .from(
            '#linelem',
            {
              duration: 1.2,
              x: 40,
              opacity: 0,
            },
            '-=1.0'
          )
          .from(
            '#linelem .hero-line',
            {
              duration: 1.5,
              width: 0,
              opacity: 0,
            },
            '-=1.0'
          )
          .from(
            '#blackcard p',
            {
              duration: 1.1,
              y: 25,
              opacity: 0,
            },
            '-=0.9'
          )
          .from(
            '#sideelem',
            {
              duration: 1.6,
              x: -30,
              opacity: 0,
            },
            '-=1.0'
          );
      }, containerRef);
    });

    return () => {
      ctx?.revert();
      if (handleMouseMove) window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mounted]);

  if (!mounted) {
    return <section id="home-section" className="w-full h-screen bg-black" />;
  }

  return (
    <section
      id="home-section"
      ref={containerRef}
      className="hero-rm-style relative w-full h-screen bg-black text-white overflow-hidden select-none"
    >
      <style>{`
        /* Mouse follower circle */
        #hero-circle {
          position: fixed;
          top: 0;
          left: 0;
          pointer-events: none;
          width: 55px;
          height: 55px;
          margin-top: -27.5px;
          margin-left: -27.5px;
          border-radius: 50%;
          border: 1.8px solid #ffffff;
          z-index: 9999;
          mix-blend-mode: difference;
        }

        /* Background Wrapper with Giant DM Masked Text */
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
          overflow: hidden;
        }

        /* Giant DM Masked Typography */
        #hero-wrapper h1 {
          font-family: var(--font-sora), 'Sora', sans-serif;
          font-size: clamp(240px, 45vw, 650px);
          font-weight: 900;
          letter-spacing: -0.05em;
          line-height: 0.85;
          margin: 0;
          padding: 0;
          -webkit-text-fill-color: transparent;
          -webkit-background-clip: text;
          background-clip: text;
          background-image: url("/images/cover_bg_2.png");
          background-size: cover;
          background-position: center 30%;
          filter: contrast(1.15) brightness(1.05);
        }

        /* Right White Strip */
        #whitestrip {
          display: flex;
          justify-content: flex-end;
          align-items: center;
          position: absolute;
          top: 50%;
          right: 0;
          transform: translateY(-50%);
          width: 52%;
          height: 150px;
          background-color: #ffffff;
          z-index: 10;
          padding-right: clamp(20px, 5vw, 80px);
        }

        /* Floating Black Card */
        #blackcard {
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 28px 24px;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translate(-50%, -50%);
          width: 250px;
          height: 340px;
          background-color: #000000;
          border: 1px solid rgba(255, 255, 255, 0.15);
          box-shadow: 0 25px 50px rgba(0, 0, 0, 0.5);
          z-index: 20;
        }

        #blackcard p {
          color: #ffffff;
          font-family: var(--font-inter), 'Inter', sans-serif;
          text-align: center;
          font-size: 13.5px;
          line-height: 1.75;
          font-weight: 300;
        }

        /* Line Element & CTA */
        #linelem {
          display: flex;
          align-items: center;
          color: #000000;
          text-decoration: none;
        }

        #linelem .hero-line {
          width: clamp(60px, 12vw, 180px);
          height: 2px;
          background-color: #000000;
          margin: 0 24px;
          transition: width 0.3s ease;
        }

        #linelem h4 {
          font-family: var(--font-sora), 'Sora', sans-serif;
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #000000;
        }

        .hero-btn-arrow {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          background: #000000;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          transition: transform 0.3s ease, background-color 0.3s ease;
        }

        #linelem:hover .hero-btn-arrow {
          transform: translateX(6px) scale(1.08);
          background: #FF8A00;
        }

        /* Side Vertical Rotated Text */
        #sideelem {
          position: absolute;
          top: 50%;
          left: -40px;
          color: rgba(255, 255, 255, 0.85);
          text-transform: uppercase;
          font-weight: 600;
          letter-spacing: 12px;
          font-size: 10px;
          transform: translateY(-50%) rotate(-90deg);
          transform-origin: center center;
          font-family: var(--font-sora), 'Sora', sans-serif;
          white-space: nowrap;
          z-index: 15;
        }

        /* Mobile & Responsive Tweaks */
        @media (max-width: 900px) {
          #whitestrip {
            width: 85%;
            height: 120px;
          }
          #blackcard {
            width: 200px;
            height: 270px;
            padding: 20px 16px;
          }
          #blackcard p {
            font-size: 11.5px;
            line-height: 1.6;
          }
          #linelem .hero-line {
            width: 50px;
            margin: 0 12px;
          }
          #sideelem {
            left: -70px;
            font-size: 8px;
            letter-spacing: 8px;
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
            padding: 30px 20px 24px;
            gap: 16px;
          }
          #blackcard {
            position: relative;
            transform: none;
            top: auto;
            left: auto;
            width: 100%;
            height: auto;
            padding: 18px 20px;
            border-radius: 12px;
          }
          #linelem {
            width: 100%;
            justify-content: space-between;
          }
          #linelem .hero-line {
            flex: 1;
            margin: 0 15px;
          }
          #sideelem {
            display: none;
          }
          #hero-wrapper h1 {
            font-size: 40vw;
          }
        }
      `}</style>

      {/* Difference mouse follower circle */}
      <div id="hero-circle" ref={circleRef} />

      <div id="hero-background">
        {/* Giant Masked DM H1 */}
        <div id="hero-wrapper">
          <h1>DM</h1>
        </div>

        {/* White Strip Container */}
        <div id="whitestrip">
          {/* Floating Black Card with Intro Paragraph */}
          <div id="blackcard">
            <p>
              Dasun Methmal — Fullstack Software Engineer &amp; Digital Marketer. Engineering high-performance web applications, modern UI/UX platforms, and data-driven growth campaigns.
            </p>
          </div>

          {/* Interactive Line & CTA Link */}
          <Link href="#portfolio-section" id="linelem">
            <h4>View Portfolio</h4>
            <div className="hero-line" />
            <div className="hero-btn-arrow">➔</div>
          </Link>
        </div>

        {/* Vertical Side Text */}
        <h5 id="sideelem">UNLEASH EXPERIENCE — DASUN METHMAL</h5>
      </div>
    </section>
  );
}
