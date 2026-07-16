'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

const CARDS_DATA = [
  {
    id: 'react',
    title: 'React.js Frontend',
    tag: 'UI Components • Hooks • Virtual DOM',
    accentColor: '#61DAFB',
    bgGradient: 'from-[#081826] via-[#0e273c] to-[#040e17]',
    renderIcon: () => (
      <svg className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_0_20px_rgba(97,218,251,0.6)]" viewBox="0 0 100 100" fill="none">
        <circle cx="50" cy="50" r="8" fill="#61DAFB" />
        <ellipse cx="50" cy="50" rx="36" ry="14" stroke="#61DAFB" strokeWidth="3" transform="rotate(0 50 50)" />
        <ellipse cx="50" cy="50" rx="36" ry="14" stroke="#61DAFB" strokeWidth="3" transform="rotate(60 50 50)" />
        <ellipse cx="50" cy="50" rx="36" ry="14" stroke="#61DAFB" strokeWidth="3" transform="rotate(120 50 50)" />
      </svg>
    ),
  },
  {
    id: 'express',
    title: 'Express.js Framework',
    tag: 'RESTful APIs • Middleware • Routing',
    accentColor: '#FF6B00',
    bgGradient: 'from-[#1a1816] via-[#2a241e] to-[#0d0c0a]',
    renderIcon: () => (
      <svg className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_0_20px_rgba(255,107,0,0.5)]" viewBox="0 0 100 100" fill="none">
        <rect x="20" y="25" width="60" height="50" rx="12" stroke="#FFFFFF" strokeWidth="3.5" fill="none" />
        <path d="M35 50 H65 M35 40 H50 M35 60 H58" stroke="#FF6B00" strokeWidth="4" strokeLinecap="round" />
        <circle cx="70" cy="35" r="4" fill="#FF6B00" />
      </svg>
    ),
  },
  {
    id: 'mongo',
    title: 'MongoDB Database',
    tag: 'NoSQL Schemas • Aggregation • Cloud',
    accentColor: '#47A248',
    bgGradient: 'from-[#091f14] via-[#113322] to-[#04120a]',
    renderIcon: () => (
      <svg className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_0_20px_rgba(71,162,72,0.6)]" viewBox="0 0 100 100" fill="none">
        <path d="M50 15 C50 15 25 35 25 60 C25 75 36 85 50 85 C64 85 75 75 75 60 C75 35 50 15 50 15 Z" stroke="#47A248" strokeWidth="3.5" fill="none" />
        <path d="M50 15 V85" stroke="#47A248" strokeWidth="3" />
        <path d="M38 52 C45 60 50 62 50 62 M62 52 C55 60 50 62 50 62" stroke="#68D391" strokeWidth="3" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'node',
    title: 'Node.js Runtime',
    tag: 'Event Loop • Non-Blocking • NPM',
    accentColor: '#5FA04E',
    bgGradient: 'from-[#0e2115] via-[#183623] to-[#06120b]',
    renderIcon: () => (
      <svg className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_0_20px_rgba(95,160,78,0.6)]" viewBox="0 0 100 100" fill="none">
        <polygon points="50,15 82,33 82,67 50,85 18,67 18,33" stroke="#5FA04E" strokeWidth="3.5" fill="none" />
        <polygon points="50,28 70,39 70,61 50,72 30,61 30,39" stroke="#68D391" strokeWidth="2.5" fill="none" />
        <circle cx="50" cy="50" r="7" fill="#5FA04E" />
      </svg>
    ),
  },
  {
    id: 'fullstack',
    title: 'MERN Fullstack Architecture',
    tag: 'End-to-End Apps • Security • Cloud',
    accentColor: '#FF6B00',
    bgGradient: 'from-[#19132b] via-[#271d45] to-[#0e091a]',
    renderIcon: () => (
      <svg className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-[0_0_20px_rgba(255,107,0,0.5)]" viewBox="0 0 100 100" fill="none">
        <circle cx="35" cy="35" r="16" stroke="#61DAFB" strokeWidth="3" />
        <circle cx="65" cy="35" r="16" stroke="#5FA04E" strokeWidth="3" />
        <circle cx="35" cy="65" r="16" stroke="#47A248" strokeWidth="3" />
        <circle cx="65" cy="65" r="16" stroke="#FF6B00" strokeWidth="3" />
        <path d="M35 35 L65 65 M65 35 L35 65" stroke="#FFFFFF" strokeWidth="2" opacity="0.6" />
      </svg>
    ),
  },
];

const MERN_STACK_TAGS = [
  { label: 'Mongo', href: '#' },
  { label: 'Express', href: '#' },
  { label: 'React', href: '#' },
  { label: 'Node', href: '#' },
];

export default function ImageFanShowcase() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const cardsListRef = useRef<HTMLUListElement>(null);
  const stepNextRef = useRef<(() => void) | null>(null);
  const stepPrevRef = useRef<(() => void) | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !wrapperRef.current || !galleryRef.current || !cardsListRef.current) return;

    const wrapper = wrapperRef.current;
    const cardElements = gsap.utils.toArray<HTMLElement>(cardsListRef.current.children);

    const ctx = gsap.context(() => {
      const spacing = 0.2;
      const seamlessLoop = buildSeamlessLoop(cardElements, spacing);

      const autoTween = gsap.to(seamlessLoop, {
        time: seamlessLoop.duration(),
        duration: 28,
        ease: 'none',
        repeat: -1,
      });

      stepNextRef.current = () => {
        autoTween.pause();
        const step = spacing * seamlessLoop.duration();
        gsap.to(seamlessLoop, {
          time: `+=${step}`,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => autoTween.play(),
        });
      };

      stepPrevRef.current = () => {
        autoTween.pause();
        const step = spacing * seamlessLoop.duration();
        gsap.to(seamlessLoop, {
          time: `-=${step}`,
          duration: 0.8,
          ease: 'power2.inOut',
          onComplete: () => autoTween.play(),
        });
      };

      function buildSeamlessLoop(items: HTMLElement[], spacingVal: number) {
        const overlap = Math.ceil(1 / spacingVal);
        const startTime = items.length * spacingVal + 0.5;
        const loopTime = (items.length + overlap) * spacingVal + 1;
        const rawSequence = gsap.timeline({ paused: true });
        const loopTimeline = gsap.timeline({
          paused: true,
          repeat: -1,
          onRepeat() {
            if ((this as any)._time === (this as any)._dur) {
              (this as any)._tTime += (this as any)._dur - 0.01;
            }
          },
        });

        const l = items.length + overlap * 2;
        let time = 0;
        let index = 0;
        let item: HTMLElement;

        gsap.set(items, { xPercent: 350, opacity: 0, scale: 0 });

        for (let i = 0; i < l; i++) {
          index = i % items.length;
          item = items[index];
          time = i * spacingVal;
          rawSequence
            .fromTo(
              item,
              { scale: 0, opacity: 0 },
              {
                scale: 1,
                opacity: 1,
                zIndex: 100,
                duration: 0.5,
                yoyo: true,
                repeat: 1,
                ease: 'power1.in',
                immediateRender: false,
              },
              time
            )
            .fromTo(
              item,
              { xPercent: 350 },
              { xPercent: -350, duration: 1, ease: 'none', immediateRender: false },
              time
            );

          if (i <= items.length) {
            loopTimeline.add('label' + i, time);
          }
        }

        rawSequence.time(startTime);
        loopTimeline
          .to(rawSequence, {
            time: loopTime,
            duration: loopTime - startTime,
            ease: 'none',
          })
          .fromTo(
            rawSequence,
            { time: overlap * spacingVal + 1 },
            {
              time: startTime,
              duration: startTime - (overlap * spacingVal + 1),
              immediateRender: false,
              ease: 'none',
            }
          );

        return loopTimeline;
      }
    }, wrapper);

    return () => ctx.revert();
  }, [mounted]);

  const handlePrev = () => stepPrevRef.current?.();
  const handleNext = () => stepNextRef.current?.();

  if (!mounted) return <section className="w-full min-h-screen bg-white" />;

  return (
    <div ref={wrapperRef} className="w-full overflow-hidden bg-white py-12 md:py-20">
      <section
        ref={galleryRef}
        className="relative w-full h-[550px] sm:h-[600px] md:h-[650px] bg-white flex flex-col items-center justify-center select-none overflow-hidden"
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-raleway font-black text-[18vw] md:text-[22vw] tracking-[0.1em] text-black pointer-events-none select-none z-0 whitespace-nowrap opacity-[0.05]">
          MERN
        </span>

        <div className="absolute left-4 sm:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-4">
          {MERN_STACK_TAGS.map((tag) => (
            <span key={tag.label} className="font-raleway font-bold text-xs tracking-widest text-black/50 uppercase">
              {tag.label}
            </span>
          ))}
        </div>

        <div className="absolute right-4 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-3">
          <span className="font-raleway font-bold text-[10px] tracking-[0.25em] text-black/40 uppercase" style={{ writingMode: 'vertical-rl' }}>
            Tech Stack Showcase
          </span>
          <span className="w-[1px] h-10 bg-black/20" />
        </div>

        <div className="absolute top-[4vh] sm:top-[6vh] z-10 w-full px-4 text-center">
          <h2 ref={headlineRef} className="font-raleway font-black text-black tracking-[0.03em] leading-[1.1] md:leading-[0.92] text-[1.8rem] sm:text-[2.8rem] md:text-[4.2rem] lg:text-[5.5rem] xl:text-[6.8rem]">
            Engineering MERN Apps
          </h2>
        </div>

        <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] flex items-center justify-center z-10 mt-[10vh]">
          <ul ref={cardsListRef} className="relative w-[14rem] sm:w-[16rem] md:w-[19rem] h-[17rem] sm:h-[20rem] md:h-[22rem] list-none p-0 m-0">
            {CARDS_DATA.map((card) => (
              <li
                key={card.id}
                className={`absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl border border-white/10 flex flex-col items-center justify-between p-6 bg-gradient-to-br ${card.bgGradient}`}
              >
                <div className="w-full flex justify-between items-center z-10">
                  <span className="font-raleway font-bold text-[10px] uppercase tracking-widest text-white/60">MERN STACK</span>
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: card.accentColor }} />
                </div>
                <div className="my-auto flex items-center justify-center z-10 transition-transform duration-500 hover:scale-110">
                  {card.renderIcon()}
                </div>
                <div className="w-full text-center z-10">
                  <h4 className="font-raleway font-bold text-base sm:text-lg text-white tracking-tight leading-tight">{card.title}</h4>
                  <span className="inline-block mt-1.5 font-arimo text-[10px] sm:text-[11px] font-medium text-white/80 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/15">
                    {card.tag}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
          <button onClick={handlePrev} className="px-6 py-2.5 bg-black text-white font-raleway font-bold text-xs uppercase tracking-widest rounded-full border border-black hover:bg-white hover:text-black transition-all duration-300 shadow-lg active:scale-95 cursor-pointer">
            Prev
          </button>
          <button onClick={handleNext} className="px-6 py-2.5 bg-black text-white font-raleway font-bold text-xs uppercase tracking-widest rounded-full border border-black hover:bg-white hover:text-black transition-all duration-300 shadow-lg active:scale-95 cursor-pointer">
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
