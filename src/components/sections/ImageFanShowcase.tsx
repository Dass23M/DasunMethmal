'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: 'web-dev',
    index: 4,
    header: 'Fullstack Web Development',
    category: 'WEB ENGINEERING',
    desc: 'Custom Next.js, React, Node.js, and MongoDB platforms. High-performance web applications built for speed, SEO, scalability, and seamless user experiences.',
    accent: '#FF6B00',
    image: '/images/post-1.png',
    tags: ['React.js', 'Next.js 14', 'Node.js', 'TypeScript', 'MongoDB'],
  },
  {
    id: 'poster-design',
    index: 3,
    header: 'Poster & Social Post Design',
    category: 'GRAPHIC & POST DESIGN',
    desc: 'Creative poster designs, social media post graphics, promotional banners, and visual branding assets crafted to capture attention and communicate strong brand narratives.',
    accent: '#FFA800',
    image: '/images/post-2.png',
    tags: ['Poster Design', 'Social Posts', 'Banner Design', 'Visual Branding', 'Photoshop'],
  },
  {
    id: 'digital-marketing',
    index: 2,
    header: 'Digital Growth & Marketing',
    category: 'MARKETING & SEO',
    desc: 'Data-driven growth marketing, technical SEO optimization, ad campaign architecture, and brand identity strategies engineered for maximum ROAS.',
    accent: '#FF8A00',
    image: '/images/post-3.png',
    tags: ['Technical SEO', 'Ad Campaigns', 'Conversion Rate', 'Brand Strategy'],
  },
  {
    id: 'ui-ux-motion',
    index: 1,
    header: 'UI/UX & Motion Design',
    category: 'CREATIVE DIRECTION',
    desc: 'Interactive 3D web motion graphics, GSAP animations, custom design systems, and user-centered interface design engineered for high engagement.',
    accent: '#FF6B00',
    image: '/images/post-4.png',
    tags: ['GSAP 3D', 'Design Systems', 'Interactive Motion', 'Figma'],
  },
];

export default function ImageFanShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const archRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);
  const mobileWrapperRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const ctx = gsap.context(() => {
      // ── 1. DESKTOP ANIMATION SETUP (≥769px) ──
      if (archRef.current && rightRef.current) {
        const arch = archRef.current;
        const right = rightRef.current;
        const leftItems = gsap.utils.toArray<HTMLElement>(arch.querySelectorAll('.arch__info'));
        const rightWrappers = gsap.utils.toArray<HTMLElement>(right.querySelectorAll('.img-wrapper'));

        ScrollTrigger.matchMedia({
          '(min-width: 769px)': function () {
            ScrollTrigger.create({
              trigger: arch,
              start: 'top top+=80',
              end: 'bottom bottom',
              pin: right,
              pinSpacing: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            });

            rightWrappers.forEach((wrapper, idx) => {
              gsap.set(wrapper, {
                opacity: idx === 0 ? 1 : 0,
                scale: idx === 0 ? 1 : 0.9,
                yPercent: -50,
              });
            });

            leftItems.forEach((leftItem, idx) => {
              const currentWrapper = rightWrappers[idx];
              const nextWrapper = rightWrappers[idx + 1];

              if (nextWrapper && currentWrapper) {
                const tl = gsap.timeline({
                  scrollTrigger: {
                    trigger: leftItem,
                    start: 'bottom 55%',
                    end: 'bottom 15%',
                    scrub: 0.5,
                  },
                });

                tl.to(
                  currentWrapper,
                  {
                    opacity: 0,
                    scale: 0.9,
                    ease: 'power2.inOut',
                  },
                  0
                ).to(
                  nextWrapper,
                  {
                    opacity: 1,
                    scale: 1,
                    ease: 'power2.inOut',
                  },
                  0
                );
              }
            });
          },
        });
      }

      // ── 2. LUXURY MOBILE CARD REVEAL ANIMATIONS (<769px) ──
      if (mobileWrapperRef.current) {
        const mobileCards = gsap.utils.toArray<HTMLElement>(
          mobileWrapperRef.current.querySelectorAll('.mobile-luxury-card')
        );

        mobileCards.forEach((card) => {
          const img = card.querySelector('.mobile-card-img');
          const badge = card.querySelector('.mobile-card-badge');

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: card,
              start: 'top 85%',
              end: 'top 35%',
              toggleActions: 'play none none reverse',
            },
          });

          tl.fromTo(
            card,
            { opacity: 0, y: 40, scale: 0.96 },
            { opacity: 1, y: 0, scale: 1, duration: 0.7, ease: 'power3.out' }
          );

          if (img) {
            tl.fromTo(
              img,
              { opacity: 0, scale: 0.88, y: 20 },
              { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: 'back.out(1.4)' },
              '-=0.4'
            );
          }

          if (badge) {
            tl.fromTo(
              badge,
              { opacity: 0, x: -15 },
              { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' },
              '-=0.6'
            );
          }
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return <section className="w-full h-screen bg-[#000000]" />;
  }

  return (
    <section
      ref={containerRef}
      id="capabilities-section"
      className="w-full bg-[#000000] text-white py-14 sm:py-24 select-none relative overflow-hidden font-inter border-y border-white/10"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">

        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-10 sm:mb-16">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-pulse" />
            <span className="font-sora font-bold text-xs sm:text-sm tracking-widest text-[#FF6B00] uppercase">
              {"// CORE CAPABILITIES & SERVICES"}
            </span>
          </div>
          <span className="font-mono text-xs text-white/50 uppercase tracking-widest hidden xs:inline">
            02 / EXPERTISE
          </span>
        </div>

        {/* ─── 1. DESKTOP VIEW (≥769px): PINNED SCROLL SHOWCASE ─── */}
        <div
          ref={archRef}
          className="arch hidden md:flex flex-row gap-8 lg:gap-16 justify-between max-w-[1180px] mx-auto relative"
        >
          {/* Left Column: Scrolling Text */}
          <div className="arch__left flex flex-col min-w-[340px] lg:min-w-[400px]">
            {SERVICES.map((item) => (
              <div
                key={item.id}
                className="arch__info max-w-[380px] h-screen flex flex-col justify-center"
              >
                <div className="content">
                  <span className="font-mono text-xs font-bold text-[#FF6B00] tracking-widest uppercase block mb-2">
                    {item.category}
                  </span>

                  <h2 className="header font-sora text-3xl sm:text-4xl lg:text-[2.6rem] font-extrabold tracking-tight text-white leading-[1.1] mb-4">
                    {item.header}
                  </h2>

                  <p className="desc text-white/80 font-normal text-sm sm:text-base leading-relaxed mb-6">
                    {item.desc}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-6">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 rounded-full bg-white/5 border border-white/15 text-xs font-mono text-white/80"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link
                    href="#contact-section"
                    style={{ backgroundColor: item.accent }}
                    className="link inline-flex items-center gap-2 px-5 py-3 rounded-full text-black font-sora font-extrabold text-xs tracking-wider uppercase transition-transform duration-300 hover:scale-105 shadow-lg"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" fill="none">
                      <path
                        fill="#121212"
                        d="M5 2c0 1.105-1.895 2-3 2a2 2 0 1 1 0-4c1.105 0 3 .895 3 2ZM11 3.5c0 1.105-.895 3-2 3s-2-1.895-2-3a2 2 0 1 1 4 0ZM6 9a2 2 0 1 1-4 0c0-1.105.895-3 2-3s2 1.895 2 3Z"
                      />
                    </svg>
                    <span>WORK WITH ME ↗</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Pinned Opacity Crossfade Stack */}
          <div
            ref={rightRef}
            className="arch__right shrink-0 h-screen w-full max-w-[520px] lg:max-w-[580px] relative flex flex-col justify-center"
          >
            {SERVICES.map((item, idx) => (
              <div
                key={item.id}
                data-index={item.index}
                style={{ zIndex: 10 + idx }}
                className="img-wrapper absolute top-1/2 left-0 h-[480px] w-full bg-transparent overflow-visible flex items-center justify-center pointer-events-none"
              >
                <Image
                  src={item.image}
                  alt={item.header}
                  fill
                  sizes="580px"
                  className="object-contain object-center filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.55)]"
                />
              </div>
            ))}
          </div>
        </div>

        {/* ─── 2. LUXURY MOBILE VIEW (<769px): INDIVIDUAL GLASS CARDS ─── */}
        <div
          ref={mobileWrapperRef}
          className="block md:hidden space-y-8"
        >
          {SERVICES.map((item, idx) => (
            <div
              key={item.id}
              className="mobile-luxury-card bg-[#12131A]/90 border border-white/12 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden flex flex-col justify-between"
            >
              {/* Background Glow Accent */}
              <div
                className="absolute -top-16 -right-16 w-36 h-36 rounded-full blur-3xl opacity-20 pointer-events-none"
                style={{ backgroundColor: item.accent }}
              />

              {/* Card Header & Badge */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="mobile-card-badge px-3 py-1 rounded-full bg-white/5 border border-white/10 font-mono text-[10px] font-bold text-[#FF6B00] tracking-widest uppercase">
                    0{idx + 1} / {item.category}
                  </span>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.accent }} />
                </div>

                <h3 className="font-sora text-2xl font-black text-white leading-tight tracking-tight mb-3">
                  {item.header}
                </h3>
              </div>

              {/* Central Transparent Illustration Stage */}
              <div className="mobile-card-img relative w-full h-[220px] xs:h-[260px] my-3 flex items-center justify-center">
                <Image
                  src={item.image}
                  alt={item.header}
                  fill
                  sizes="(max-width: 768px) 100vw, 400px"
                  className="object-contain object-center filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.6)]"
                />
              </div>

              {/* Card Content & Footer */}
              <div>
                <p className="text-white/75 font-normal text-xs leading-relaxed mb-5">
                  {item.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-[10px] font-mono text-white/70"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href="#contact-section"
                  style={{ backgroundColor: item.accent }}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-black font-sora font-extrabold text-xs tracking-wider uppercase shadow-lg active:scale-98 transition-transform"
                >
                  <span>WORK WITH ME ↗</span>
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
