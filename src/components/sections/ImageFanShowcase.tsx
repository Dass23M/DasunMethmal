"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const CARDS_DATA = [
  { src: "/images/editorial_1.png", alt: "B&W editorial portrait" },
  { src: "/images/scroll1.png", alt: "Creative campaign board" },
  { src: "/images/scroll2.png", alt: "Colorful fashion portrait" },
  { src: "/images/scroll3.png", alt: "Digital growth analytics" },
  { src: "/images/editorial_3.png", alt: "B&W bob cut portrait" },
];

const SOCIAL_LINKS = [
  { label: "In", href: "#" },
  { label: "Fb", href: "#" },
  { label: "Tw", href: "#" },
  { label: "Yt", href: "#" },
];

export default function ImageFanShowcase() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const watermarkRef = useRef<HTMLSpanElement>(null);
  const cardsListRef = useRef<HTMLUListElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  const [mounted, setMounted] = useState(false);
  const stepNextRef = useRef<(() => void) | null>(null);
  const stepPrevRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (
      !mounted ||
      !wrapperRef.current ||
      !galleryRef.current ||
      !cardsListRef.current
    )
      return;

    const wrapper = wrapperRef.current;
    const cardElements = gsap.utils.toArray<HTMLElement>(
      cardsListRef.current.children,
    );

    const ctx = gsap.context(() => {
      const spacing = 0.2; // 5 cards -> 0.2 spacing
      const seamlessLoop = buildSeamlessLoop(cardElements, spacing);

      // Automatic seamless 3D transition loop without mouse/scroll dependence
      const autoTween = gsap.to(seamlessLoop, {
        time: seamlessLoop.duration(),
        duration: 28,
        ease: "none",
        repeat: -1,
      });

      // Stepped manual transition support
      stepNextRef.current = () => {
        autoTween.pause();
        const step = spacing * seamlessLoop.duration();
        gsap.to(seamlessLoop, {
          time: `+=${step}`,
          duration: 0.8,
          ease: "power2.inOut",
          onComplete: () => autoTween.play(),
        });
      };

      stepPrevRef.current = () => {
        autoTween.pause();
        const step = spacing * seamlessLoop.duration();
        gsap.to(seamlessLoop, {
          time: `-=${step}`,
          duration: 0.8,
          ease: "power2.inOut",
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
                ease: "power1.in",
                immediateRender: false,
              },
              time,
            )
            .fromTo(
              item,
              { xPercent: 350 },
              {
                xPercent: -350,
                duration: 1,
                ease: "none",
                immediateRender: false,
              },
              time,
            );

          if (i <= items.length) {
            loopTimeline.add("label" + i, time);
          }
        }

        rawSequence.time(startTime);
        loopTimeline
          .to(rawSequence, {
            time: loopTime,
            duration: loopTime - startTime,
            ease: "none",
          })
          .fromTo(
            rawSequence,
            { time: overlap * spacingVal + 1 },
            {
              time: startTime,
              duration: startTime - (overlap * spacingVal + 1),
              immediateRender: false,
              ease: "none",
            },
          );

        return loopTimeline;
      }
    }, wrapper);

    return () => ctx.revert();
  }, [mounted]);

  const handlePrev = () => {
    if (stepPrevRef.current) stepPrevRef.current();
  };

  const handleNext = () => {
    if (stepNextRef.current) stepNextRef.current();
  };

  if (!mounted) {
    return <section className="w-full min-h-screen bg-white" />;
  }

  return (
    <div
      ref={wrapperRef}
      className="w-full overflow-hidden bg-white py-12 md:py-20"
    >
      <section
        ref={galleryRef}
        className="relative w-full h-[550px] sm:h-[600px] md:h-[650px] bg-white flex flex-col items-center justify-center select-none overflow-hidden"
      >
        {/* ── Watermark Background Text ── */}
        <span
          ref={watermarkRef}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-raleway font-black text-[18vw] md:text-[22vw] tracking-[0.1em] text-black pointer-events-none select-none z-0 whitespace-nowrap opacity-[0.06]"
          aria-hidden="true"
        >
          ULTRA
        </span>

        {/* ── Left Social Links ── */}
        <div
          ref={socialRef}
          className="absolute left-4 sm:left-6 lg:left-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col gap-4"
        >
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-raleway font-bold text-xs tracking-widest text-black/50 hover:text-black transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* ── Right Auto Play Indicator ── */}
        <div
          ref={scrollIndicatorRef}
          className="absolute right-4 sm:right-6 lg:right-10 top-1/2 -translate-y-1/2 z-20 hidden md:flex flex-col items-center gap-3"
        >
          <span
            className="font-raleway font-bold text-[10px] tracking-[0.25em] text-black/40 uppercase"
            style={{ writingMode: "vertical-rl" }}
          >
            Auto Play
          </span>
          <span className="w-[1px] h-10 bg-black/20" />
        </div>

        {/* ── Headline ── */}
        <div className="absolute top-[4vh] sm:top-[6vh] z-10 w-full px-4 text-center">
          <h2
            ref={headlineRef}
            className="font-raleway font-black text-black tracking-[0.03em] leading-[1.1] md:leading-[0.92] text-[1.8rem] sm:text-[2.8rem] md:text-[4.5rem] lg:text-[6rem] xl:text-[7.2rem]"
          >
            We build the next
          </h2>
        </div>

        {/* ── Seamless 3D Looping Cards Container ── */}
        <div className="relative w-full h-[320px] sm:h-[380px] md:h-[420px] flex items-center justify-center z-10 mt-[10vh]">
          <ul
            ref={cardsListRef}
            className="relative w-[13rem] sm:w-[15rem] md:w-[17rem] h-[17rem] sm:h-[20rem] md:h-[22rem] list-none p-0 m-0"
          >
            {CARDS_DATA.map((card, idx) => (
              <li
                key={idx}
                className="absolute top-0 left-0 w-full h-full rounded-2xl overflow-hidden shadow-2xl bg-white border border-gray-150 flex items-center justify-center"
              >
                <Image
                  src={card.src}
                  alt={card.alt}
                  fill
                  priority={idx < 3}
                  sizes="(max-width: 768px) 15rem, 17rem"
                  className="object-cover rounded-2xl"
                />
              </li>
            ))}
          </ul>
        </div>

        {/* ── Prev / Next Action Control Buttons ── */}
        <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-4">
          <button
            onClick={handlePrev}
            className="px-6 py-2.5 bg-black text-white font-raleway font-bold text-xs uppercase tracking-widest rounded-full border border-black hover:bg-white hover:text-black transition-all duration-300 shadow-lg active:scale-95 cursor-pointer"
          >
            Prev
          </button>
          <button
            onClick={handleNext}
            className="px-6 py-2.5 bg-black text-white font-raleway font-bold text-xs uppercase tracking-widest rounded-full border border-black hover:bg-white hover:text-black transition-all duration-300 shadow-lg active:scale-95 cursor-pointer"
          >
            Next
          </button>
        </div>
      </section>
    </div>
  );
}
