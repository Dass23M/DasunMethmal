'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const PAGES = [
  {
    id: '001',
    number: '/001',
    title: 'UI/UX Design',
    tags: [
      'Usability Testing',
      'User Research',
      'Wireframing',
      'Interface Design',
      'Interactive Prototyping',
    ],
    image: '/images/fashion1.png',
    activeDot: 0,
  },
  {
    id: '002',
    number: '/002',
    title: 'Mobile App Design',
    tags: [
      'User Research',
      'App Wireframing',
      'UI/UX Design',
      'Interactive Prototyping',
      'Usability Testing',
    ],
    image: '/images/fashion2.webp',
    activeDot: 1,
  },
  {
    id: '003',
    number: '/003',
    title: 'Brand Identity & Strategy',
    tags: [
      'Brand Architecture',
      'Visual Identity',
      'Design Systems',
      'Typography',
      'Digital Strategy',
    ],
    image: '/images/fashion3.jpg',
    activeDot: 2,
  },
  {
    id: '004',
    number: '/004',
    title: 'Web Development & Architecture',
    tags: [
      'Fullstack Development',
      'React.js & Next.js',
      'Node.js & Express',
      'GSAP 3D Animations',
      'Performance Tuning',
    ],
    image: '/images/fashion4.jpg',
    activeDot: 0,
  },
];

export default function ImageFanShowcase() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !wrapperRef.current || !bookRef.current) return;

    const wrapper = wrapperRef.current;
    const book = bookRef.current;
    const pageEls = gsap.utils.toArray<HTMLElement>(book.querySelectorAll('.book-page'));

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop & Tablet (≥768px): Pinned 3D Physical Book Page Turning Scrub
      mm.add('(min-width: 768px)', () => {
        // Set initial 3D stack positions: Page 1 on top, Page 2,3,4 flat underneath
        pageEls.forEach((page, idx) => {
          gsap.set(page, {
            transformOrigin: 'left center',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            rotateY: 0,
            rotateZ: 0,
            z: 0,
            opacity: 1,
          });

          // Initial shadow on pages underneath top page
          const shadowEl = page.querySelector('.page-shadow');
          if (shadowEl && idx > 0) {
            gsap.set(shadowEl, { opacity: 0.4 });
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: '+=3600',
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Loop through pages 0..N-2 (Page 1 -> Page 2 -> Page 3 -> Page 4)
        pageEls.forEach((page, i) => {
          if (i === pageEls.length - 1) return; // Last page stays flat as bottom base

          const shadowEl = page.querySelector('.page-shadow');
          const imgEl = page.querySelector('.page-image-wrap');
          const nextPage = pageEls[i + 1];
          const nextShadowEl = nextPage?.querySelector('.page-shadow');

          const startTime = i * 1.5;

          // 1. Shadow on the page directly underneath: gradually lifts/lightens as top page turns away
          if (nextShadowEl) {
            tl.fromTo(
              nextShadowEl,
              { opacity: 0.5 },
              { opacity: 0, duration: 1.2, ease: 'power1.inOut' },
              startTime
            );
          }

          // 2. Paper turn shadow on flipping page: ramps up mid-turn and clears as page folds
          if (shadowEl) {
            tl.fromTo(
              shadowEl,
              { opacity: 0 },
              { opacity: 0.7, duration: 0.75, ease: 'power2.in' },
              startTime
            ).to(
              shadowEl,
              { opacity: 0, duration: 0.75, ease: 'power2.out' },
              startTime + 0.75
            );
          }

          // 3. 3D Page Turn Motion: lifts from right edge, rotates around left spine, adds 3D arc lift
          tl.to(
            page,
            {
              rotateY: -160,
              rotateZ: -1.5,
              z: 35,
              duration: 1.5,
              ease: 'power2.inOut',
            },
            startTime
          );

          // 4. Subtle image zoom & 3D tilt during page lift
          if (imgEl) {
            tl.to(
              imgEl,
              { scale: 1.04, rotateY: 5, duration: 0.75, ease: 'power1.in' },
              startTime
            ).to(
              imgEl,
              { scale: 0.98, rotateY: 0, duration: 0.75, ease: 'power1.out' },
              startTime + 0.75
            );
          }

          // 5. Complete opacity transition at end of flip so folded page rests behind left spine cleanly
          tl.to(
            page,
            {
              opacity: 0,
              duration: 0.2,
              ease: 'power1.out',
            },
            startTime + 1.3
          );
        });
      });

      // Mobile (<768px): Responsive stacked cards with smooth scroll entrance
      mm.add('(max-width: 767px)', () => {
        pageEls.forEach((page) => {
          gsap.set(page, { clearProps: 'all' });
        });

        gsap.fromTo(
          pageEls,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 75%',
            },
          }
        );
      });
    }, wrapperRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return <section className="w-full h-screen bg-[#f8f8fa]" />;
  }

  return (
    <div ref={wrapperRef} className="w-full overflow-hidden bg-[#f8f8fa] text-black select-none">
      <section
        id="services-section"
        ref={sectionRef}
        className="relative w-full min-h-screen py-10 md:py-0 md:h-[100svh] md:h-screen bg-[#f8f8fa] flex items-center justify-center overflow-hidden"
      >
        {/* Left Book Spine Decor Binding Line */}
        <div className="absolute top-0 bottom-0 left-0 sm:left-4 md:left-8 w-1.5 sm:w-2.5 bg-gradient-to-r from-black/20 to-transparent z-40 pointer-events-none" />

        {/* 3D Book Stage Container */}
        <div
          ref={bookRef}
          className="relative w-full max-w-[1440px] h-[580px] sm:h-[640px] md:h-[680px] mx-auto px-4 sm:px-8 flex items-center justify-center"
          style={{ perspective: '2200px', transformStyle: 'preserve-3d' }}
        >
          {PAGES.map((page, idx) => (
            <div
              key={page.id}
              className="book-page absolute inset-0 bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-2xl p-6 sm:p-10 lg:p-14 flex flex-col justify-between overflow-hidden"
              style={{
                zIndex: (PAGES.length - idx) * 10,
                transformOrigin: 'left center',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.14), 0 0 30px rgba(0, 0, 0, 0.05)',
                willChange: 'transform, opacity',
              }}
            >
              {/* Dynamic Paper Turn Shadow Overlay */}
              <div className="page-shadow absolute inset-0 bg-gradient-to-r from-black/40 via-black/15 to-transparent pointer-events-none z-30 opacity-0" />

              {/* Page Spine Crease Gradient */}
              <div className="absolute top-0 bottom-0 left-0 w-10 bg-gradient-to-r from-black/6 to-transparent pointer-events-none z-20" />

              {/* Main Content Area */}
              <div className="page-content relative z-10 w-full h-full flex flex-col justify-between">
                
                {/* Top Section Number Header matching reference image (✳ /001) */}
                <div className="flex items-center gap-2 mb-4 sm:mb-6">
                  <span className="text-[#FF6B00] text-base sm:text-xl font-black">✳</span>
                  <span className="font-mono text-sm sm:text-base font-bold tracking-wider text-black">
                    {page.number}
                  </span>
                </div>

                {/* Main Content Grid: Title & Tags Left / Large Image Right */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center my-auto">
                  
                  {/* Left Column: Large Headline & Skill Tag Pills */}
                  <div className="lg:col-span-6 flex flex-col justify-center">
                    <h3 className="font-raleway font-black text-3xl xs:text-4xl sm:text-5xl lg:text-[4rem] xl:text-[4.4rem] leading-[1.02] text-black tracking-tight mb-6">
                      {page.title}
                    </h3>

                    {/* Skill / Technology Pills matching reference image */}
                    <div className="flex flex-wrap gap-2.5 sm:gap-3">
                      {page.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-arimo text-xs sm:text-sm font-medium text-gray-800 bg-[#EFEFEF] px-4 py-2 rounded-lg border border-gray-300/40 shadow-xs transition-colors hover:bg-black hover:text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Large Preview Image with 3-Dot Pagination Overlay */}
                  <div className="lg:col-span-6 flex justify-center lg:justify-end">
                    <div className="page-image-wrap relative w-full max-w-[540px] aspect-[4/3] sm:aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl border border-black/5 bg-gray-100 transition-transform duration-500">
                      <Image
                        src={page.image}
                        alt={page.title}
                        fill
                        priority={idx === 0}
                        sizes="(max-width: 1024px) 100vw, 540px"
                        className="object-cover rounded-2xl"
                      />

                      {/* 3-Dot Pagination Pill at Bottom Center (matching screenshot •••) */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2 border border-black/10 shadow-md">
                        <span
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            page.activeDot === 0 ? 'bg-black scale-110' : 'bg-gray-400'
                          }`}
                        />
                        <span
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            page.activeDot === 1 ? 'bg-black scale-110' : 'bg-gray-400'
                          }`}
                        />
                        <span
                          className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                            page.activeDot === 2 ? 'bg-black scale-110' : 'bg-gray-400'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Footer Spacing */}
                <div className="pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-mono text-gray-400 uppercase tracking-widest">
                  <span>EXCELLENCE IN DIGITAL CRAFT</span>
                  <span>BOOK PAGE TURNING INTERACTION</span>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
