'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';

// Existing poster and visual design image assets
const POSTER_IMAGES = [
  '/images/poster-5.png',
  '/images/poster-1.png',
  '/images/poster-2.png',
  '/images/poster-3.jpg',
  '/images/poster-4.png',
  '/images/fashion4.png',
  '/images/poster.png',
  '/images/editorial_1.png',
  '/images/editorial_2.png',
  '/images/editorial_3.png',
  '/images/editorial_4.png',
  '/images/dm_1.png',
  '/images/dm_2.png',
  '/images/dm_3.png',
  '/images/dm_4.png',
];

// Duplicate images to create a dense 24-card 3D sphere
const GALLERY_ITEMS = [...POSTER_IMAGES, ...POSTER_IMAGES].slice(0, 24);

const TEXT_CONTENT = [
  {
    title: 'Poster & Visual Branding',
    desc: 'Capturing raw emotion, contrast, and visual harmony through custom poster design and creative brand storytelling.',
  },
  {
    title: 'Event & Typography Art',
    desc: 'Exploring bold typography, spatial hierarchy, and dynamic composition for high-impact print and digital displays.',
  },
  {
    title: 'Digital Marketing & Social Art',
    desc: 'High-converting social graphics, ad banners, and promotional artwork engineered for maximum engagement.',
  },
  {
    title: 'Creative Editorial Concepts',
    desc: 'Artistic visual storytelling blending modern aesthetics, vibrant accents, and timeless editorial styling.',
  },
];

const SCATTER_POSITIONS = [
  { top: '12%', left: '8%', rot: -15 },
  { top: '18%', left: '78%', rot: 22 },
  { top: '58%', left: '6%', rot: -28 },
  { top: '68%', left: '82%', rot: 18 },
  { top: '80%', left: '26%', rot: -12 },
  { top: '10%', left: '46%', rot: 14 },
];

export default function PosterDesign() {
  const [mounted, setMounted] = useState(false);
  const galleryRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const journeyRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const orbLeftRef = useRef<HTMLDivElement>(null);
  const orbMiddleRef = useRef<HTMLDivElement>(null);
  const orbRightRef = useRef<HTMLDivElement>(null);
  const currentTextIdxRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let ctx: { revert: () => void } | null = null;

    import('gsap').then(({ default: gsap }) => {
      import('gsap/ScrollTrigger').then(({ ScrollTrigger }) => {
        gsap.registerPlugin(ScrollTrigger);

        if (!galleryRef.current || !sphereRef.current) return;

        ctx = gsap.context(() => {
          // ── 1. Construct 3D Fibonacci Sphere Layout ──
          const sphere = sphereRef.current;
          if (!sphere) return;

          // Clear pre-existing children if any
          sphere.innerHTML = '';

          const total = GALLERY_ITEMS.length;
          const isMobile = window.innerWidth < 768;
          const radius = isMobile ? 180 : 360;

          const cards: HTMLDivElement[] = [];

          GALLERY_ITEMS.forEach((src, i) => {
            const card = document.createElement('div');
            card.className = 'pd-clay-card';

            const img = document.createElement('img');
            img.src = src;
            img.alt = `Poster Design ${i + 1}`;
            card.appendChild(img);

            // Fibonacci sphere mathematics
            const phi = Math.acos(1 - (2 * (i + 0.5)) / total);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;

            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            const rotY = Math.atan2(x, z) * (180 / Math.PI);
            const rotX = Math.asin(-y / radius) * (180 / Math.PI);

            card.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
            card.dataset.index = String(i);

            sphere.appendChild(card);
            cards.push(card);
          });

          // ── 2. Animate Main Sphere Rotation on Scroll ──
          gsap.to(sphere, {
            rotateY: 720, // 2 full 360deg rotations
            rotateX: 40,  // Slight 3D depth tilt
            ease: 'none',
            scrollTrigger: {
              trigger: galleryRef.current,
              start: 'top top',
              end: 'bottom bottom',
              scrub: 1,
              onUpdate: (self) => {
                const progress = self.progress;

                // Update text content on scroll
                const textIndex = Math.floor(progress * TEXT_CONTENT.length) % TEXT_CONTENT.length;
                if (
                  currentTextIdxRef.current !== textIndex &&
                  titleRef.current &&
                  descRef.current
                ) {
                  currentTextIdxRef.current = textIndex;
                  const newText = TEXT_CONTENT[textIndex];

                  gsap.to([titleRef.current, descRef.current], {
                    opacity: 0,
                    duration: 0.2,
                    onComplete: () => {
                      if (titleRef.current) titleRef.current.innerText = newText.title;
                      if (descRef.current) descRef.current.innerText = newText.desc;
                      gsap.to([titleRef.current, descRef.current], {
                        opacity: 1,
                        duration: 0.2,
                      });
                    },
                  });
                }

                // Highlight cards closest to the front only when focusIndex changes
                const focusIndex = Math.floor(progress * total);
                if ((cards as any)._lastFocus !== focusIndex) {
                  (cards as any)._lastFocus = focusIndex;
                  cards.forEach((card, idx) => {
                    if (Math.abs(idx - focusIndex) < 2) {
                      card.classList.add('active-card');
                    } else {
                      card.classList.remove('active-card');
                    }
                  });
                }
              },
            },
          });

          // ── 3. Construct & Animate 3 Satellite Miniature 3D Photo Globes ──
          const buildMiniGlobe = (
            container: HTMLDivElement,
            radius: number,
            isSmallType = false
          ) => {
            container.innerHTML = '';

            const sphere = document.createElement('div');
            sphere.className = isSmallType ? 'pd-mini-globe-sphere pd-globe-small' : 'pd-mini-globe-sphere pd-globe-medium';

            // On mobile, use 12 cards for ultra-smooth 60fps mobile GPU rendering
            const items = isMobile ? GALLERY_ITEMS.slice(0, 12) : GALLERY_ITEMS;
            const total = items.length;
            const miniCards: HTMLDivElement[] = [];

            items.forEach((src, i) => {
              const card = document.createElement('div');
              card.className = 'pd-mini-clay-card';

              const img = document.createElement('img');
              img.src = src;
              img.alt = `Mini Poster ${i + 1}`;
              card.appendChild(img);

              // 3D Fibonacci sphere mathematics identical to main globe
              const phi = Math.acos(1 - (2 * (i + 0.5)) / total);
              const theta = Math.PI * (1 + Math.sqrt(5)) * i;

              const x = radius * Math.cos(theta) * Math.sin(phi);
              const y = radius * Math.sin(theta) * Math.sin(phi);
              const z = radius * Math.cos(phi);

              const rotY = Math.atan2(x, z) * (180 / Math.PI);
              const rotX = Math.asin(-y / radius) * (180 / Math.PI);

              card.style.transform = `translate3d(${x}px, ${y}px, ${z}px) rotateY(${rotY}deg) rotateX(${rotX}deg)`;
              card.dataset.index = String(i);

              sphere.appendChild(card);
              miniCards.push(card);
            });

            container.appendChild(sphere);
            return { sphere, miniCards, total };
          };

          const scrubLeft = 1.1;
          const scrubMiddle = 1.3;
          const scrubRight = 1.5;

          // 1. Left Miniature Globe (Desktop only to prevent mobile DOM & network bloat)
          if (!isMobile && orbLeftRef.current) {
            const leftRadius = isMobile ? 42 : 95;
            const leftGlobe = buildMiniGlobe(orbLeftRef.current, leftRadius, false);

            gsap.fromTo(
              orbLeftRef.current,
              { y: '160vh', scale: isMobile ? 0.75 : 0.85 },
              {
                y: '-140vh',
                scale: isMobile ? 0.95 : 1.08,
                ease: 'none',
                scrollTrigger: {
                  trigger: galleryRef.current,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: scrubLeft,
                  fastScrollEnd: true,
                  preventOverlaps: true,
                  onUpdate: (self) => {
                    const p = self.progress;
                    let alpha = 1;
                    if (p < 0.1) alpha = p / 0.1;
                    else if (p > 0.9) alpha = (1 - p) / 0.1;
                    const cleanAlpha = Math.max(0, Math.min(1, alpha));
                    if (orbLeftRef.current && (orbLeftRef as any)._lastAlpha !== cleanAlpha) {
                      (orbLeftRef as any)._lastAlpha = cleanAlpha;
                      orbLeftRef.current.style.opacity = String(cleanAlpha);
                    }
                    const focusIndex = Math.floor(p * leftGlobe.total);
                    if ((leftGlobe as any)._lastFocus !== focusIndex) {
                      (leftGlobe as any)._lastFocus = focusIndex;
                      leftGlobe.miniCards.forEach((card, idx) => {
                        if (Math.abs(idx - focusIndex) < 2) card.classList.add('active-card');
                        else card.classList.remove('active-card');
                      });
                    }
                  },
                },
              }
            );

            gsap.to(leftGlobe.sphere, {
              rotateY: 540,
              rotateX: 50,
              rotateZ: 20,
              ease: 'none',
              scrollTrigger: {
                trigger: galleryRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: scrubLeft,
                fastScrollEnd: true,
                preventOverlaps: true,
              },
            });
          }

          // 2. Middle Miniature Globe (Desktop only)
          if (!isMobile && orbMiddleRef.current) {
            const middleRadius = 60;
            const middleGlobe = buildMiniGlobe(orbMiddleRef.current, middleRadius, true);

            gsap.fromTo(
              orbMiddleRef.current,
              { y: '190vh', scale: 0.8 },
              {
                y: '-165vh',
                scale: 1.05,
                ease: 'none',
                scrollTrigger: {
                  trigger: galleryRef.current,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: scrubMiddle,
                  fastScrollEnd: true,
                  preventOverlaps: true,
                  onUpdate: (self) => {
                    const p = self.progress;
                    let alpha = 1;
                    if (p < 0.1) alpha = p / 0.1;
                    else if (p > 0.9) alpha = (1 - p) / 0.1;
                    const cleanAlpha = Math.max(0, Math.min(1, alpha));
                    if (orbMiddleRef.current && (orbMiddleRef as any)._lastAlpha !== cleanAlpha) {
                      (orbMiddleRef as any)._lastAlpha = cleanAlpha;
                      orbMiddleRef.current.style.opacity = String(cleanAlpha);
                    }
                    const focusIndex = Math.floor(p * middleGlobe.total);
                    if ((middleGlobe as any)._lastFocus !== focusIndex) {
                      (middleGlobe as any)._lastFocus = focusIndex;
                      middleGlobe.miniCards.forEach((card, idx) => {
                        if (Math.abs(idx - focusIndex) < 2) card.classList.add('active-card');
                        else card.classList.remove('active-card');
                      });
                    }
                  },
                },
              }
            );

            gsap.to(middleGlobe.sphere, {
              rotateY: 640,
              rotateX: 60,
              rotateZ: -15,
              ease: 'none',
              scrollTrigger: {
                trigger: galleryRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: scrubMiddle,
                fastScrollEnd: true,
                preventOverlaps: true,
              },
            });
          }

          // 3. Right Miniature Globe (Desktop only)
          if (!isMobile && orbRightRef.current) {
            const rightRadius = isMobile ? 42 : 95;
            const rightGlobe = buildMiniGlobe(orbRightRef.current, rightRadius, false);

            gsap.fromTo(
              orbRightRef.current,
              { y: '175vh', scale: isMobile ? 0.72 : 0.82 },
              {
                y: '-150vh',
                scale: isMobile ? 0.92 : 1.1,
                ease: 'none',
                scrollTrigger: {
                  trigger: galleryRef.current,
                  start: 'top bottom',
                  end: 'bottom top',
                  scrub: scrubRight,
                  fastScrollEnd: true,
                  preventOverlaps: true,
                  onUpdate: (self) => {
                    const p = self.progress;
                    let alpha = 1;
                    if (p < 0.1) alpha = p / 0.1;
                    else if (p > 0.9) alpha = (1 - p) / 0.1;
                    const cleanAlpha = Math.max(0, Math.min(1, alpha));
                    if (orbRightRef.current && (orbRightRef as any)._lastAlpha !== cleanAlpha) {
                      (orbRightRef as any)._lastAlpha = cleanAlpha;
                      orbRightRef.current.style.opacity = String(cleanAlpha);
                    }
                    const focusIndex = Math.floor(p * rightGlobe.total);
                    if ((rightGlobe as any)._lastFocus !== focusIndex) {
                      (rightGlobe as any)._lastFocus = focusIndex;
                      rightGlobe.miniCards.forEach((card, idx) => {
                        if (Math.abs(idx - focusIndex) < 2) card.classList.add('active-card');
                        else card.classList.remove('active-card');
                      });
                    }
                  },
                },
              }
            );

            gsap.to(rightGlobe.sphere, {
              rotateY: -480,
              rotateX: -45,
              rotateZ: -30,
              ease: 'none',
              scrollTrigger: {
                trigger: galleryRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: scrubRight,
                fastScrollEnd: true,
                preventOverlaps: true,
              },
            });
          }

          // ── 4. Parallax Effect for Constellation Cards ──
          const constCards = journeyRef.current?.querySelectorAll('.pd-const-card');
          if (constCards && constCards.length > 0) {
            gsap.to(constCards, {
              y: -100,
              ease: 'none',
              stagger: 0.08,
              scrollTrigger: {
                trigger: journeyRef.current,
                start: 'top bottom',
                end: 'bottom top',
                scrub: true,
              },
            });
          }
        }, galleryRef);
      });
    });

    return () => ctx?.revert();
  }, [mounted]);

  if (!mounted) {
    return <section id="poster-design-section" className="min-h-screen bg-[#0A0A0B]" />;
  }

  return (
    <div id="poster-design-section" className="relative bg-[#0A0A0B] text-white select-none overflow-hidden">
      <style>{`
        /* ── Grid Overlay Background ── */
        .pd-grid-overlay {
          position: absolute;
          inset: 0;
          background-image: linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 40px 40px;
          z-index: 1;
          pointer-events: none;
        }

        /* ── 3D Gallery Container (Pinned Scroll Stage) ── */
        .pd-gallery-container {
          position: relative;
          height: 260vh;
          width: 100%;
        }

        .pd-scene {
          position: sticky;
          top: 0;
          height: 100vh;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          perspective: 1200px;
          overflow: hidden;
          z-index: 2;
        }

        .pd-sphere {
          position: relative;
          width: 0;
          height: 0;
          transform-style: preserve-3d;
        }

        /* ── Clay Card 3D Styling ── */
        .pd-clay-card {
          position: absolute;
          width: 150px;
          height: 210px;
          left: -75px;
          top: -105px;
          background: #12131A;
          border-radius: 16px;
          padding: 7px;
          transform-style: preserve-3d;
          backface-visibility: visible;
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 8px 8px 18px rgba(0, 0, 0, 0.9),
                      -2px -2px 8px rgba(255, 255, 255, 0.02),
                      inset 2px 2px 4px rgba(255, 255, 255, 0.05),
                      inset -2px -2px 4px rgba(0, 0, 0, 0.6);
          transition: filter 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease;
        }

        .pd-clay-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 10px;
          filter: grayscale(80%) brightness(0.55);
          transition: all 0.4s ease;
        }

        .pd-clay-card.active-card {
          border-color: rgba(255, 107, 0, 0.6);
          filter: drop-shadow(0 0 22px rgba(255, 107, 0, 0.45));
          box-shadow: 0 0 25px rgba(255, 107, 0, 0.3);
        }

        .pd-clay-card.active-card img {
          filter: grayscale(0%) brightness(1.05);
        }

        /* ── Dynamic Side Panel ── */
        .pd-floating-panel {
          position: absolute;
          left: 5%;
          top: 50%;
          transform: translateY(-50%);
          width: 320px;
          z-index: 10;
          pointer-events: none;
        }

        /* ── 3 Satellite Miniature 3D Photo Globes (Ultra-Smooth Hardware Accelerated) ── */
        .pd-mini-sphere-wrap {
          position: absolute;
          top: 50%;
          width: 0;
          height: 0;
          z-index: 6;
          pointer-events: none;
          perspective: 1100px;
          will-change: transform, opacity;
          -webkit-backface-visibility: hidden;
          backface-visibility: hidden;
          opacity: 0;
        }

        .pd-mini-orb-left {
          left: 4%;
        }

        .pd-mini-orb-middle {
          left: 50%;
          transform: translate(-50%, -50%) translateZ(-200px);
        }

        .pd-mini-orb-right {
          right: 4%;
        }

        .pd-mini-globe-sphere {
          position: relative;
          width: 0;
          height: 0;
          transform-style: preserve-3d;
          will-change: transform;
        }

        /* Medium Globe Cards (Left & Right - larger than middle) */
        .pd-globe-medium .pd-mini-clay-card {
          position: absolute;
          width: 40px;
          height: 56px;
          left: -20px;
          top: -28px;
          background: #12131A;
          border-radius: 6px;
          padding: 2.5px;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 4px 4px 12px rgba(0, 0, 0, 0.9),
                      inset 1px 1px 2px rgba(255, 255, 255, 0.05);
          transition: filter 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          will-change: transform, filter;
        }

        /* Small Globe Cards (Middle - smaller than left & right) */
        .pd-globe-small .pd-mini-clay-card {
          position: absolute;
          width: 28px;
          height: 38px;
          left: -14px;
          top: -19px;
          background: #12131A;
          border-radius: 5px;
          padding: 2px;
          transform-style: preserve-3d;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 3px 3px 10px rgba(0, 0, 0, 0.9),
                      inset 1px 1px 2px rgba(255, 255, 255, 0.05);
          transition: filter 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
          will-change: transform, filter;
        }

        .pd-mini-clay-card img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 4px;
          filter: grayscale(80%) brightness(0.55);
          transition: all 0.25s ease;
        }

        .pd-mini-clay-card.active-card {
          border-color: rgba(255, 107, 0, 0.7);
          filter: drop-shadow(0 0 12px rgba(255, 107, 0, 0.5));
          box-shadow: 0 0 14px rgba(255, 107, 0, 0.35);
        }

        .pd-mini-clay-card.active-card img {
          filter: grayscale(0%) brightness(1.05);
        }

        @media (max-width: 1200px) {
          .pd-mini-orb-left {
            left: 2%;
          }
          .pd-mini-orb-right {
            right: 2%;
          }
        }

        @media (max-width: 900px) {
          .pd-floating-panel {
            position: absolute;
            left: 5%;
            right: 5%;
            top: 15%;
            transform: none;
            width: 90%;
            text-align: center;
          }
          .pd-clay-card {
            width: 110px;
            height: 150px;
            left: -55px;
            top: -75px;
          }
          .pd-mini-orb-left {
            left: 1%;
          }
          .pd-mini-orb-right {
            right: 1%;
          }
          .pd-mini-orb-middle {
            transform: translate(-50%, -50%) translateZ(-130px);
          }
          .pd-globe-medium .pd-mini-clay-card {
            width: 24px;
            height: 34px;
            left: -12px;
            top: -17px;
            padding: 1.5px;
          }
          .pd-globe-small .pd-mini-clay-card {
            width: 18px;
            height: 25px;
            left: -9px;
            top: -12.5px;
            padding: 1px;
          }
        }

        /* ── Journey & Constellation Section ── */
        .pd-journey-section {
          position: relative;
          min-height: 90vh;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          background: radial-gradient(circle at center, #161722 0%, #0A0A0B 75%);
          border-t: 1px solid rgba(255, 255, 255, 0.08);
          z-index: 5;
        }

        .pd-journey-content {
          position: relative;
          text-align: center;
          z-index: 10;
          background: rgba(18, 19, 26, 0.85);
          padding: 3rem 2.5rem;
          border-radius: 24px;
          backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 107, 0, 0.25);
          box-shadow: 0 20px 50px rgba(0, 0, 0, 0.7),
                      inset 0 1px 2px rgba(255, 255, 255, 0.1);
          max-width: 580px;
          margin: 0 16px;
        }

        .pd-constellation {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .pd-const-card {
          position: absolute;
          width: 110px;
          height: 150px;
          opacity: 0.45;
        }

        /* ── Chunky Button Styling ── */
        .pd-chunky-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: #FF6B00;
          color: #FFFFFF;
          font-family: 'Sora', sans-serif;
          font-weight: 700;
          font-size: 1rem;
          padding: 0.9rem 2.2rem;
          border-radius: 40px;
          border: none;
          cursor: pointer;
          text-decoration: none;
          box-shadow: 0px 5px 0px #b34b00,
                      0px 8px 20px rgba(255, 107, 0, 0.35),
                      inset 0px 2px 4px rgba(255, 255, 255, 0.4);
          transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.2s ease;
        }

        .pd-chunky-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0px 7px 0px #b34b00,
                      0px 12px 25px rgba(255, 107, 0, 0.45),
                      inset 0px 2px 4px rgba(255, 255, 255, 0.5);
        }

        .pd-chunky-btn:active {
          transform: translateY(3px);
          box-shadow: 0px 2px 0px #b34b00,
                      0px 4px 10px rgba(0, 0, 0, 0.4);
        }
      `}</style>

      <div className="pd-grid-overlay" />

      {/* ── SECTION HEADER ── */}
      <div className="pt-16 sm:pt-20 pb-4 w-full max-w-[1140px] mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading title="POSTER & VISUAL DESIGN" theme="dark" />
      </div>

      {/* ── 1. 3D ROTATING FIBONACCI SPHERE GALLERY SECTION ── */}
      <section ref={galleryRef} className="pd-gallery-container">
        {/* Dynamic Side Text Panel */}
        <div className="pd-floating-panel space-y-4">
          <span className="inline-flex items-center gap-2 font-mono text-xs font-bold text-[#FF6B00] uppercase tracking-widest bg-[#FF6B00]/10 border border-[#FF6B00]/30 px-3.5 py-1.5 rounded-full">
            <span>✦</span> POSTER SHOWCASE
          </span>

          <h2
            ref={titleRef}
            className="font-sora font-extrabold text-2xl sm:text-4xl text-white tracking-tight leading-tight"
          >
            {TEXT_CONTENT[0].title}
          </h2>

          <p
            ref={descRef}
            className="font-inter font-normal text-sm sm:text-base text-white/75 leading-relaxed"
          >
            {TEXT_CONTENT[0].desc}
          </p>
        </div>

        {/* Left Miniature 3D Photo Globe (Medium) */}
        <div ref={orbLeftRef} className="pd-mini-sphere-wrap pd-mini-orb-left" />

        {/* Middle Miniature 3D Photo Globe (Small) */}
        <div ref={orbMiddleRef} className="pd-mini-sphere-wrap pd-mini-orb-middle" />

        {/* Right Miniature 3D Photo Globe (Medium) */}
        <div ref={orbRightRef} className="pd-mini-sphere-wrap pd-mini-orb-right" />

        {/* 3D Scene Viewport */}
        <div className="pd-scene">
          <div ref={sphereRef} className="pd-sphere" />
        </div>

        {/* Subtle Background Network Lines SVG */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-20"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,50 Q25,30 50,50 T100,50"
            stroke="#FF6B00"
            strokeWidth="0.15"
            fill="none"
          />
          <path
            d="M20,0 L80,100"
            stroke="#FF6B00"
            strokeWidth="0.1"
            fill="none"
          />
        </svg>
      </section>

      {/* ── 2. JOURNEY & CONSTELLATION SECTION DIRECTLY BELOW ── */}
      <section ref={journeyRef} className="pd-journey-section">
        {/* Scattered Constellation Background Cards */}
        <div className="pd-constellation">
          {SCATTER_POSITIONS.map((pos, i) => (
            <div
              key={i}
              className="pd-clay-card pd-const-card"
              style={{
                top: pos.top,
                left: pos.left,
                transform: `rotate(${pos.rot}deg) scale(0.85)`,
              }}
            >
              <Image
                src={POSTER_IMAGES[i % POSTER_IMAGES.length]}
                alt={`Constellation Artwork ${i + 1}`}
                width={110}
                height={150}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
          ))}
        </div>

        {/* Central Journey Card */}
        <div className="pd-journey-content space-y-5">
          <span className="inline-block font-mono text-xs font-bold text-[#FF6B00] uppercase tracking-widest bg-[#FF6B00]/10 border border-[#FF6B00]/30 px-4 py-1.5 rounded-full">
            {'// COLLABORATION & CREATIVE VISION'}
          </span>

          <h2 className="font-sora font-extrabold text-3xl sm:text-5xl text-white tracking-tight leading-tight">
            Start Your Journey
          </h2>

          <p className="font-inter text-base sm:text-lg text-white/80 max-w-md mx-auto leading-relaxed">
            We would like to bring your visual brand vision to life with custom poster art, editorial design, and impactful digital creative.
          </p>

          <div className="pt-2">
            <a href="#contact" className="pd-chunky-btn">
              <span>Start A Project</span>
              <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
