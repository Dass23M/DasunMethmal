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

      // Mobile (<768px): Smooth Responsive Card Gallery with Staggered Scroll Reveal
      mm.add('(max-width: 767px)', () => {
        pageEls.forEach((page) => {
          gsap.set(page, { clearProps: 'all' });
        });

        gsap.fromTo(
          pageEls,
          { opacity: 0, y: 50, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 80%',
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
        id="vertical-book-section"
        ref={sectionRef}
        className="relative w-full min-h-screen py-12 md:py-0 md:h-[100svh] md:h-screen bg-[#f8f8fa] flex items-center justify-center overflow-hidden"
      >
        {/* Top Book Crease Decor Line */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-black/15 to-transparent z-40 pointer-events-none" />

        {/* ── DESKTOP 3D BOOK STAGE CONTAINER (≥768px) ── */}
        <div
          ref={bookRef}
          className="relative w-full max-w-[1440px] hidden md:flex h-[600px] md:h-[640px] max-h-[85vh] mx-auto px-6 lg:px-12 items-center justify-center"
          style={{ perspective: '2200px', transformStyle: 'preserve-3d' }}
        >
          {PAGES.map((page, idx) => (
            <div
              key={page.id}
              className="book-page absolute inset-x-6 lg:inset-x-12 top-0 bg-white rounded-3xl border border-gray-200/90 shadow-2xl p-8 lg:p-12 flex flex-col justify-between overflow-hidden"
              style={{
                zIndex: (PAGES.length - idx) * 10,
                transformOrigin: 'center top',
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.14), 0 0 30px rgba(0, 0, 0, 0.05)',
                willChange: 'transform, opacity',
              }}
            >
              {/* Dynamic Paper Turn Shadow Overlay */}
              <div className="page-shadow absolute inset-0 bg-gradient-to-b from-black/35 via-black/10 to-transparent pointer-events-none z-30 opacity-0" />

              {/* Page Top Crease Gradient */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/5 to-transparent pointer-events-none z-20" />

              {/* Main Content Area */}
              <div className="page-content relative z-10 w-full h-full flex flex-col justify-between">
                
                {/* Top Section Number Header matching reference image (✳ /001) */}
                <div className="flex items-center gap-2 mb-6">
                  <span className="text-[#FF6B00] text-xl font-black">✳</span>
                  <span className="font-mono text-base font-bold tracking-wider text-black">
                    {page.number}
                  </span>
                </div>

                {/* Main Content Grid: Title & Tags Left / Large Image Right */}
                <div className="grid grid-cols-12 gap-8 lg:gap-14 items-center my-auto">
                  
                  {/* Left Column: Large Headline & Skill Tag Pills */}
                  <div className="col-span-6 flex flex-col justify-center">
                    <h3 className="font-raleway font-black text-4xl lg:text-[4rem] xl:text-[4.4rem] leading-[1.02] text-black tracking-tight mb-6">
                      {page.title}
                    </h3>

                    {/* Skill / Technology Pills matching reference image */}
                    <div className="flex flex-wrap gap-3">
                      {page.tags.map((tag) => (
                        <span
                          key={tag}
                          className="font-arimo text-xs lg:text-sm font-medium text-gray-800 bg-[#EFEFEF] px-4 py-2 rounded-lg border border-gray-300/40 shadow-xs transition-colors hover:bg-black hover:text-white"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Column: Large Preview Image with 3-Dot Pagination Overlay */}
                  <div className="col-span-6 flex justify-end">
                    <div className="page-image-wrap relative w-full max-w-[540px] aspect-[16/11] rounded-2xl overflow-hidden shadow-2xl border border-black/5 bg-gray-100 transition-transform duration-500">
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
                  <span>VERTICAL BOOK FLIP INTERACTION</span>
                </div>

              </div>
            </div>
          ))}
        </div>

        {/* ── MOBILE RESPONSIVE CARD GALLERY CONTAINER (<768px) ── */}
        <div className="w-full max-w-[600px] mx-auto px-4 flex md:hidden flex-col gap-6 py-4">
          {PAGES.map((page, idx) => (
            <div
              key={`mob-${page.id}`}
              className="book-page w-full bg-white rounded-2xl border border-gray-200/90 shadow-xl p-5 flex flex-col gap-4 overflow-hidden"
            >
              {/* Header Number */}
              <div className="flex items-center gap-2">
                <span className="text-[#FF6B00] text-base font-black">✳</span>
                <span className="font-mono text-sm font-bold tracking-wider text-black">
                  {page.number}
                </span>
              </div>

              {/* Title */}
              <h3 className="font-raleway font-black text-2xl xs:text-3xl leading-tight text-black tracking-tight">
                {page.title}
              </h3>

              {/* Tag Pills */}
              <div className="flex flex-wrap gap-2">
                {page.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-arimo text-xs font-medium text-gray-800 bg-[#EFEFEF] px-3 py-1.5 rounded-md border border-gray-300/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Responsive Preview Image */}
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden border border-black/5 bg-gray-100 mt-1">
                <Image
                  src={page.image}
                  alt={page.title}
                  fill
                  sizes="(max-width: 767px) 100vw, 400px"
                  className="object-cover rounded-xl"
                />

                {/* 3-Dot Pagination Overlay */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full flex items-center gap-1.5 border border-black/10 shadow-sm">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      page.activeDot === 0 ? 'bg-black' : 'bg-gray-400'
                    }`}
                  />
                  <span
                    className={`w-2 h-2 rounded-full ${
                      page.activeDot === 1 ? 'bg-black' : 'bg-gray-400'
                    }`}
                  />
                  <span
                    className={`w-2 h-2 rounded-full ${
                      page.activeDot === 2 ? 'bg-black' : 'bg-gray-400'
                    }`}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-[10px] font-mono text-gray-400 uppercase tracking-widest">
                <span>EXCELLENCE IN DIGITAL CRAFT</span>
                <span>0{idx + 1} / 04</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
