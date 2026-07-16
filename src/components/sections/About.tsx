'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '@/components/ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const ABOUT_TEXT_PARTS = [
  { text: 'We can make it together. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there ' },
  { text: 'live the blind', isLink: true, href: '#' },
  { text: ' texts. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.' },
];

export default function About() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const animatedTextRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !wrapperRef.current || !sectionRef.current) return;

    const wrapper = wrapperRef.current;
    const section = sectionRef.current;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      // Desktop & Tablet (≥768px): Pinned Scrubbed ScrollTrigger Timeline
      mm.add('(min-width: 768px)', () => {
        const mainTl = gsap.timeline({
          scrollTrigger: {
            trigger: wrapper,
            start: 'top top',
            end: '+=1200',
            pin: true,
            scrub: 1.2,
            anticipatePin: 1,
          },
        });

        // 1. Orange wipe cover slide out
        if (coverRef.current) {
          mainTl.fromTo(
            coverRef.current,
            { x: '-102%' },
            { x: '102%', duration: 0.35, ease: 'power2.inOut' },
            0
          );
        }

        // 2. Image scale down
        if (imgRef.current) {
          mainTl.fromTo(
            imgRef.current,
            { scale: 1.25 },
            { scale: 1, duration: 0.45, ease: 'power2.out' },
            0.1
          );
        }

        // 3. Scrubbed word-by-word reveal while pinned
        if (animatedTextRef.current) {
          const words = animatedTextRef.current.querySelectorAll('.about-scrub-word');
          mainTl.fromTo(
            words,
            { opacity: 0.15, y: 10 },
            { opacity: 1, y: 0, stagger: 0.05, ease: 'power1.out', duration: 0.8 },
            0.2
          );
        }
      });

      // Mobile (<768px): Unpinned standard entrance
      mm.add('(max-width: 767px)', () => {
        const mobTl = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: 'top 80%',
          },
        });

        if (coverRef.current) {
          mobTl.fromTo(
            coverRef.current,
            { x: '-102%' },
            { x: '102%', duration: 1.1, ease: 'power3.inOut' },
            0
          );
        }

        if (animatedTextRef.current) {
          const words = animatedTextRef.current.querySelectorAll('.about-scrub-word');
          mobTl.fromTo(
            words,
            { opacity: 0.15, y: 10 },
            { opacity: 1, y: 0, stagger: 0.04, duration: 0.8, ease: 'power2.out' },
            0.3
          );
        }
      });
    }, wrapper);

    return () => ctx.revert();
  }, [mounted]);

  // Flatten text into array of word tokens for individual word animation
  const renderScrubText = () => {
    let wordIndex = 0;
    return ABOUT_TEXT_PARTS.flatMap((part) => {
      const words = part.text.split(' ');
      return words.map((word, idx) => {
        if (!word && idx === words.length - 1) return null;
        const key = `${wordIndex++}-${word}`;

        if (part.isLink) {
          return (
            <a
              key={key}
              href={part.href}
              className="about-scrub-word inline-block text-[#FF8A00] hover:underline underline-offset-4 font-semibold mr-[0.25em]"
            >
              {word}
            </a>
          );
        }

        return (
          <span key={key} className="about-scrub-word inline-block mr-[0.25em]">
            {word}
          </span>
        );
      });
    });
  };

  if (!mounted) {
    return <section className="w-full min-h-screen bg-black text-white" />;
  }

  return (
    <div ref={wrapperRef} className="w-full overflow-hidden">
      <section
        id="about-section"
        ref={sectionRef}
        className="relative w-full h-auto py-12 sm:py-16 md:py-0 md:h-[100svh] md:h-screen bg-black text-white flex items-center justify-center select-none overflow-hidden"
      >
        {/* Outer layout container: spans screen width with small side gaps (px-4 sm:px-8 md:px-12) */}
        <div className="relative z-[2] w-full max-w-[1550px] mx-auto px-4 sm:px-8 md:px-12">
          <SectionHeading title="About Me" />

          {/* Main About Card - Removed white border lines for clean seamless look */}
          <div className="w-full bg-white/[0.02] rounded-2xl sm:rounded-3xl md:rounded-[32px] p-5 sm:p-10 md:p-14 shadow-2xl backdrop-blur-md">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 lg:gap-12 items-center">
              {/* Image Column */}
              <div className="lg:col-span-5 w-full">
                <figure className="relative m-0 rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
                  <div className="relative overflow-hidden aspect-[4/3] sm:aspect-[1/1] w-full">
                    <div
                      ref={coverRef}
                      className="absolute inset-0 bg-[#FF6B00] z-10 will-change-transform"
                      style={{ transform: 'translateX(-102%)' }}
                    />
                    <Image
                      ref={imgRef}
                      src="/images/about_me_pic2.jpg"
                      alt="About Me Photo"
                      fill
                      sizes="(max-width: 1024px) 100vw, 40vw"
                      className="object-cover will-change-transform"
                    />
                  </div>
                </figure>
              </div>

              {/* Text Column */}
              <div className="lg:col-span-7 w-full flex flex-col justify-center">
                <h3 className="text-xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4 sm:mb-6 text-white">
                  We can make it together
                </h3>

                {/* Visually animated paragraph scrubbed on scroll down while pinned */}
                <div
                  ref={animatedTextRef}
                  className="animate-me font-raleway text-lg sm:text-2xl md:text-3xl lg:text-[2rem] font-medium leading-[1.38] tracking-tight text-white mb-6 sm:mb-8 perspective-[500px]"
                  aria-hidden="true"
                >
                  {renderScrubText()}
                </div>

                {/* Duplicate screenreader-only element preserving semantic accessibility & nested links */}
                <p className="sr-only">
                  We can make it together. Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there{' '}
                  <a href="#">live the blind</a> texts. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.
                </p>

                <div>
                  <a
                    href="#"
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-3.5 rounded-full border border-white/30 text-white font-medium text-sm sm:text-lg transition-all duration-300 hover:bg-white hover:text-black hover:border-white shadow-md hover:shadow-xl hover:scale-105"
                  >
                    Download my CV
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
