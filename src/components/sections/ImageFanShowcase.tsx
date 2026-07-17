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

      // Desktop & Tablet (≥768px): Vertical 3D Book Page Flip Scrub Timeline
      mm.add('(min-width: 768px)', () => {
        // Set initial 3D positions: Vertical stacking with slight peek offset
        pageEls.forEach((page, idx) => {
          gsap.set(page, {
            transformOrigin: 'center top',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            rotateX: 0,
            rotateY: 0,
            y: idx * 90, // Vertical peek offset matching reference layout
            scale: 1 - idx * 0.03,
            z: -idx * 15,
            opacity: 1,
          });

          const shadowEl = page.querySelector('.page-shadow');
          if (shadowEl && idx > 0) {
            gsap.set(shadowEl, { opacity: 0.3 });
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: '+=3800',
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        // Animate vertical page flip for each page (Page 1 -> Page 2 -> Page 3 -> Page 4)
        pageEls.forEach((page, i) => {
          if (i === pageEls.length - 1) return; // Last page remains flat as base

          const shadowEl = page.querySelector('.page-shadow');
          const imgEl = page.querySelector('.page-image-wrap');
          const startTime = i * 1.5;

          // 1. Next pages move up vertically to take top position
          for (let j = i + 1; j < pageEls.length; j++) {
            const targetPage = pageEls[j];
            const targetOffset = (j - i - 1) * 90;
            const targetScale = 1 - (j - i - 1) * 0.03;
            const targetZ = -(j - i - 1) * 15;
            const targetShadow = targetPage.querySelector('.page-shadow');

            tl.to(
              targetPage,
              {
                y: targetOffset,
                scale: targetScale,
                z: targetZ,
                duration: 1.5,
                ease: 'power2.inOut',
              },
              startTime
            );

            if (targetShadow && j === i + 1) {
              tl.to(
                targetShadow,
                { opacity: 0, duration: 1.2, ease: 'power1.inOut' },
                startTime
              );
            }
          }

          // 2. Paper turn shadow on current page flipping up
          if (shadowEl) {
            tl.fromTo(
              shadowEl,
              { opacity: 0 },
              { opacity: 0.6, duration: 0.75, ease: 'power2.in' },
              startTime
            ).to(
              shadowEl,
              { opacity: 0, duration: 0.75, ease: 'power2.out' },
              startTime + 0.75
            );
          }

          // 3. Vertical 3D Flip: Page lifts up from bottom and rotates backward around top edge
          tl.to(
            page,
            {
              rotateX: 105,
              y: '-=120',
              z: 50,
              duration: 1.5,
              ease: 'power2.inOut',
            },
            startTime
          );

          // 4. Subtle image tilt & scale during vertical flip
          if (imgEl) {
            tl.to(
              imgEl,
              { scale: 1.04, rotateX: -8, duration: 0.75, ease: 'power1.in' },
              startTime
            ).to(
              imgEl,
              { scale: 0.96, rotateX: 0, duration: 0.75, ease: 'power1.out' },
              startTime + 0.75
            );
          }

          // 5. Fade out flipped page as it completes vertical turn
          tl.to(
            page,
            {
              opacity: 0,
              duration: 0.25,
              ease: 'power1.out',
            },
            startTime + 1.25
          );
        });
      });

      // Mobile (<768px): Touch-optimized Vertical 3D Page Flip
      mm.add('(max-width: 767px)', () => {
        pageEls.forEach((page, idx) => {
          gsap.set(page, {
            transformOrigin: 'center top',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            rotateX: 0,
            rotateY: 0,
            y: idx * 40, // Compact peek offset for mobile viewports
            scale: 1 - idx * 0.025,
            z: -idx * 10,
            opacity: 1,
          });

          const shadowEl = page.querySelector('.page-shadow');
          if (shadowEl && idx > 0) {
            gsap.set(shadowEl, { opacity: 0.3 });
          }
        });

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: '+=2200',
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            fastScrollEnd: true,
            invalidateOnRefresh: true,
          },
        });

        pageEls.forEach((page, i) => {
          if (i === pageEls.length - 1) return;

          const shadowEl = page.querySelector('.page-shadow');
          const startTime = i * 1.2;

          for (let j = i + 1; j < pageEls.length; j++) {
            const targetPage = pageEls[j];
            const targetOffset = (j - i - 1) * 40;
            const targetScale = 1 - (j - i - 1) * 0.025;
            const targetShadow = targetPage.querySelector('.page-shadow');

            tl.to(
              targetPage,
              {
                y: targetOffset,
                scale: targetScale,
                duration: 1.2,
                ease: 'power2.inOut',
              },
              startTime
            );

            if (targetShadow && j === i + 1) {
              tl.to(
                targetShadow,
                { opacity: 0, duration: 1, ease: 'power1.inOut' },
                startTime
              );
            }
          }

          if (shadowEl) {
            tl.fromTo(
              shadowEl,
              { opacity: 0 },
              { opacity: 0.5, duration: 0.6, ease: 'power2.in' },
              startTime
            ).to(
              shadowEl,
              { opacity: 0, duration: 0.6, ease: 'power2.out' },
              startTime + 0.6
            );
          }

          tl.to(
            page,
            {
              rotateX: 100,
              y: '-=90',
              z: 30,
              duration: 1.2,
              ease: 'power2.inOut',
            },
            startTime
          );

          tl.to(
            page,
            {
              opacity: 0,
              duration: 0.2,
              ease: 'power1.out',
            },
            startTime + 1
          );
        });
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
        id="vertical-book-section"
        ref={sectionRef}
        className="relative w-full min-h-[100svh] py-6 sm:py-10 md:py-0 md:h-[100svh] md:h-screen bg-[#f8f8fa] flex items-center justify-center overflow-hidden"
      >
        {/* Top Book Crease Decor Line */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-black/15 to-transparent z-40 pointer-events-none" />

        {/* 3D Book Stage Container */}
        <div
          ref={bookRef}
          className="relative w-full max-w-[1440px] h-[500px] xs:h-[530px] sm:h-[600px] md:h-[640px] max-h-[85vh] mx-auto px-3 sm:px-8 flex items-center justify-center"
          style={{ perspective: '2200px', transformStyle: 'preserve-3d' }}
        >
          {PAGES.map((page, idx) => (
            <div
              key={page.id}
              className="book-page absolute inset-x-3 sm:inset-x-8 top-0 bg-white rounded-2xl sm:rounded-3xl border border-gray-200/90 shadow-2xl p-4 xs:p-6 sm:p-10 lg:p-12 flex flex-col justify-between overflow-hidden"
              style={{
                zIndex: (PAGES.length - idx) * 10,
                transformOrigin: 'center top',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                boxShadow: '0 20px 45px -10px rgba(0, 0, 0, 0.12), 0 0 25px rgba(0, 0, 0, 0.04)',
                willChange: 'transform, opacity',
              }}
            >
              {/* Dynamic Paper Turn Shadow Overlay */}
              <div className="page-shadow absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-transparent pointer-events-none z-30 opacity-0" />

              {/* Page Top Crease Gradient */}
              <div className="absolute top-0 left-0 right-0 h-6 sm:h-8 bg-gradient-to-b from-black/5 to-transparent pointer-events-none z-20" />

              {/* Main Content Area */}
              <div className="page-content relative z-10 w-full h-full flex flex-col justify-between">
                
                {/* Top Section Number Header matching reference image (✳ /001) */}
                <div className="flex items-center gap-2 mb-2 sm:mb-6">
                  <span className="text-[#FF6B00] text-sm sm:text-xl font-black">✳</span>
                  <span className="font-mono text-xs sm:text-base font-bold tracking-wider text-black">
                    {page.number}
                  </span>
                </div>

                {/* Main Content Grid: Title & Tags Left / Large Image Right */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-8 lg:gap-14 items-center my-auto">
                  
                  {/* Left Column: Large Headline & Skill Tag Pills */}
                  <div className="lg:col-span-6 flex flex-col justify-center">
                    <h3 className="font-raleway font-black text-2xl xs:text-3xl sm:text-5xl lg:text-[4rem] xl:text-[4.4rem] leading-[1.02] text-black tracking-tight mb-3 sm:mb-6">
                      {page.title}
                    </h3>

                    {/* Skill / Technology Pills matching reference image */}
                    <div className="flex flex-wrap gap-1.5 xs:gap-2 sm:gap-3">
                      {page.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-arimo text-[10px] xs:text-xs sm:text-sm font-medium text-gray-800 bg-[#EFEFEF] px-2.5 py-1 sm:px-4 sm:py-2 rounded-md sm:rounded-lg border border-gray-300/40 shadow-xs transition-colors hover:bg-black hover:text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Large Preview Image with 3-Dot Pagination Overlay */}
                  <div className="lg:col-span-6 flex justify-center lg:justify-end">
                    <div className="page-image-wrap relative w-full max-w-[540px] aspect-[16/10] sm:aspect-[16/11] rounded-xl sm:rounded-2xl overflow-hidden shadow-xl sm:shadow-2xl border border-black/5 bg-gray-100 transition-transform duration-500">
                      <Image
                        src={page.image}
                        alt={page.title}
                        fill
                        priority={idx === 0}
                        sizes="(max-width: 1024px) 100vw, 540px"
                        className="object-cover rounded-xl sm:rounded-2xl"
                      />

                      {/* 3-Dot Pagination Pill at Bottom Center (matching screenshot •••) */}
                      <div className="absolute bottom-3 sm:bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-2.5 py-1 sm:px-3.5 sm:py-1.5 rounded-full flex items-center gap-1.5 sm:gap-2 border border-black/10 shadow-md">
                        <span
                          className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                            page.activeDot === 0 ? 'bg-black scale-110' : 'bg-gray-400'
                          }`}
                        />
                        <span
                          className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                            page.activeDot === 1 ? 'bg-black scale-110' : 'bg-gray-400'
                          }`}
                        />
                        <span
                          className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full transition-all duration-300 ${
                            page.activeDot === 2 ? 'bg-black scale-110' : 'bg-gray-400'
                          }`}
                        />
                      </div>
                    </div>
                  </div>

                </div>

                {/* Bottom Footer Spacing */}
                <div className="pt-2 sm:pt-4 border-t border-gray-100 flex items-center justify-between text-[10px] sm:text-xs font-mono text-gray-400 uppercase tracking-widest">
                  <span>EXCELLENCE IN DIGITAL CRAFT</span>
                  <span className="hidden xs:inline">VERTICAL BOOK FLIP INTERACTION</span>
                </div>

              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
