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
    image: '/images/fashion4.jpg',
    tags: ['React.js', 'Next.js 14', 'Node.js', 'TypeScript', 'MongoDB'],
  },
  {
    id: 'mobile-dev',
    index: 3,
    header: 'Mobile App Engineering',
    category: 'CROSS-PLATFORM APPS',
    desc: 'Intuitive iOS & Android mobile applications. Responsive touch-first interfaces, real-time API integration, and buttery-smooth state management.',
    accent: '#FFA800',
    image: '/images/fashion1.png',
    tags: ['React Native', 'Mobile UI/UX', 'REST API', 'App Wireframing'],
  },
  {
    id: 'digital-marketing',
    index: 2,
    header: 'Digital Growth & Marketing',
    category: 'MARKETING & SEO',
    desc: 'Data-driven growth marketing, technical SEO optimization, ad campaign architecture, and brand identity strategies engineered for maximum ROAS.',
    accent: '#FF8A00',
    image: '/images/dm_1.png',
    tags: ['Technical SEO', 'Ad Campaigns', 'Conversion Rate', 'Brand Strategy'],
  },
  {
    id: 'ui-ux-motion',
    index: 1, // Bottom z-index in initial stack
    header: 'UI/UX & Motion Design',
    category: 'CREATIVE DIRECTION',
    desc: 'Interactive 3D web motion graphics, GSAP animations, custom design systems, and user-centered interface design engineered for high engagement.',
    accent: '#FF6B00',
    image: '/images/fashion3.jpg',
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
    const imgs = gsap.utils.toArray<HTMLImageElement>(right.querySelectorAll('.img-wrapper img'));

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

      // 2. Desktop Pinned Image Stack Swapping
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

          // Set initial full clip-path for all image wrappers
          gsap.set(rightWrappers, {
            clipPath: 'inset(0% 0% 0% 0%)',
          });

          gsap.set(imgs, {
            objectPosition: '0px 0%',
          });

          // Tie each wrapper's clip-path mask reveal directly to its left text card
          leftItems.forEach((leftItem, idx) => {
            const currentWrapper = rightWrappers[idx];
            const nextWrapper = rightWrappers[idx + 1];

            if (nextWrapper && currentWrapper) {
              const tl = gsap.timeline({
                scrollTrigger: {
                  trigger: leftItem,
                  start: 'bottom 60%',
                  end: 'bottom 10%',
                  scrub: 1,
                },
              });

              tl.to(currentWrapper, {
                clipPath: 'inset(0% 0% 100% 0%)',
                ease: 'power1.inOut',
              }).to(
                imgs[idx],
                {
                  objectPosition: '0px 60%',
                  ease: 'none',
                },
                0
              );
            }
          });
        },
        '(max-width: 768px)': function () {
          imgs.forEach((image) => {
            gsap.fromTo(
              image,
              { objectPosition: '0px 20%' },
              {
                objectPosition: '0px 70%',
                scrollTrigger: {
                  trigger: image,
                  start: 'top 85%',
                  end: 'bottom 20%',
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

          {/* ── RIGHT COLUMN: PINNED STACKED IMAGE MASK REVEAL ── */}
          <div
            ref={rightRef}
            className="arch__right shrink-0 h-auto md:h-screen w-full max-w-full md:max-w-[520px] lg:max-w-[580px] relative flex flex-col justify-center"
          >
            {SERVICES.map((item) => (
              <div
                key={item.id}
                data-index={item.index}
                style={{ zIndex: item.index }}
                className="img-wrapper relative md:absolute top-0 md:top-1/2 left-0 md:-translate-y-1/2 h-[280px] sm:h-[360px] md:h-[440px] w-full rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-[#14151C]"
              >
                <Image
                  src={item.image}
                  alt={item.header}
                  fill
                  sizes="(max-width: 768px) 100vw, 580px"
                  className="object-cover object-center filter brightness-95 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent pointer-events-none" />
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-mono text-xs z-10">
                  <span className="font-bold text-[#FF6B00]">{item.header}</span>
                  <span className="opacity-60">0{5 - item.index} / 04</span>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
