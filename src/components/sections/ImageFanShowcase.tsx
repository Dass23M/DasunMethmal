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
    index: 4, // Top z-index in initial stack
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
    index: 1, // Bottom z-index in initial stack
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
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !archRef.current || !rightRef.current) return;

    const arch = archRef.current;
    const right = rightRef.current;
    const leftItems = gsap.utils.toArray<HTMLElement>(arch.querySelectorAll('.arch__info'));
    const rightWrappers = gsap.utils.toArray<HTMLElement>(right.querySelectorAll('.img-wrapper'));

    const ctx = gsap.context(() => {
      // 1. Mobile vs Desktop Order Interleaving
      const handleMobileLayout = () => {
        const isMobile = window.matchMedia('(max-width: 768px)').matches;
        if (isMobile) {
          leftItems.forEach((item, i) => {
            item.style.order = `${i * 2}`;
          });
          rightWrappers.forEach((item, i) => {
            item.style.order = `${i * 2 + 1}`;
          });
        } else {
          leftItems.forEach((item) => {
            item.style.order = '';
          });
          rightWrappers.forEach((item) => {
            item.style.order = '';
          });
        }
      };

      handleMobileLayout();
      window.addEventListener('resize', handleMobileLayout);

      // 2. Desktop Pinned Image Stack Swapping via Smooth Opacity Crossfade
      ScrollTrigger.matchMedia({
        '(min-width: 769px)': function () {
          // Pin the right image container while scrolling through left text cards
          ScrollTrigger.create({
            trigger: arch,
            start: 'top top+=80',
            end: 'bottom bottom',
            pin: right,
            pinSpacing: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          });

          // Set initial opacity: 1 for the first wrapper, opacity: 0 for all other wrappers
          rightWrappers.forEach((wrapper, idx) => {
            gsap.set(wrapper, {
              opacity: idx === 0 ? 1 : 0,
              scale: idx === 0 ? 1 : 0.9,
              yPercent: -50,
            });
          });

          // Tie each wrapper's opacity crossfade directly to its left text card scroll progress
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
        '(max-width: 768px)': function () {
          rightWrappers.forEach((wrapper) => {
            gsap.fromTo(
              wrapper,
              { opacity: 0, y: 30 },
              {
                opacity: 1,
                y: 0,
                scrollTrigger: {
                  trigger: wrapper,
                  start: 'top 85%',
                  end: 'top 50%',
                  scrub: true,
                },
              }
            );
          });
        },
      });
    }, archRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return <section className="w-full h-screen bg-[#0A0B0E]" />;
  }

  return (
    <section
      ref={containerRef}
      id="capabilities-section"
      className="w-full bg-[#0A0B0E] text-white py-16 sm:py-24 select-none relative overflow-hidden font-inter border-y border-white/10"
    >
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">

        {/* Section Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-12">
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

        {/* ─── MAIN ARCH CONTAINER ─── */}
        <div
          ref={archRef}
          className="arch flex flex-col md:flex-row gap-8 lg:gap-16 justify-between max-w-[1180px] mx-auto relative"
        >
          {/* ── LEFT COLUMN: SCROLLING SERVICE INFO CARDS ── */}
          <div className="arch__left flex flex-col min-w-full md:min-w-[340px] lg:min-w-[400px]">
            {SERVICES.map((item) => (
              <div
                key={item.id}
                className="arch__info max-w-full md:max-w-[380px] h-auto md:h-screen flex flex-col justify-center py-10 md:py-0"
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

                  {/* Skill Badges */}
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

                  {/* Action Link Button */}
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

          {/* ── RIGHT COLUMN: PINNED ILLUSTATION SHOWCASE (OPACITY CROSSFADE) ── */}
          <div
            ref={rightRef}
            className="arch__right shrink-0 h-auto md:h-screen w-full max-w-full md:max-w-[520px] lg:max-w-[580px] relative flex flex-col justify-center"
          >
            {SERVICES.map((item, idx) => (
              <div
                key={item.id}
                data-index={item.index}
                style={{ zIndex: 10 + idx }}
                className="img-wrapper relative md:absolute top-0 md:top-1/2 left-0 h-[280px] sm:h-[360px] md:h-[480px] w-full bg-transparent overflow-visible flex items-center justify-center pointer-events-none"
              >
                <Image
                  src={item.image}
                  alt={item.header}
                  fill
                  sizes="(max-width: 768px) 100vw, 580px"
                  className="object-contain object-center filter drop-shadow-[0_25px_35px_rgba(0,0,0,0.55)]"
                />
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
