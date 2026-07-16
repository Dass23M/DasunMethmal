'use client';

import { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FAQ_ITEMS = [
  {
    question: 'Can I update the site myself?',
    answer:
      'Yes, absolutely! We build completely custom, manageable websites with intuitive content management capabilities so you can easily update text, images, and content without technical hassle.',
  },
  {
    question: 'How long does a project take?',
    answer:
      'Most projects fall between 2 and 8 weeks, depending on complexity. A brand identity with a simple website might take closer to two weeks, while a larger project with UX, UI, and custom development takes longer.',
  },
  {
    question: 'Do I need to have a brand before starting?',
    answer:
      'Not at all! We provide end-to-end design solutions, including full brand strategy, logo creation, design systems, and web application development from scratch.',
  },
  {
    question: 'Do you offer support after launch?',
    answer:
      'Yes, we provide ongoing post-launch maintenance, continuous performance monitoring, updates, and dedicated technical support to ensure your product performs seamlessly.',
  },
  {
    question: 'What’s your typical process?',
    answer:
      'Our workflow spans 4 streamlined phases: Strategic Discovery & Planning, UI/UX Conceptual Design, High-Performance Development, and Thorough Quality Testing prior to deployment.',
  },
];

export default function FaqSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(2); // Item 3 open by default
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        sectionRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  if (!mounted) {
    return <section className="w-full min-h-screen bg-[#0d0e10]" />;
  }

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen h-auto py-16 lg:py-24 lg:min-h-screen bg-[#0d0e10] text-white flex items-center justify-center overflow-hidden select-none"
    >
      <div className="w-full max-w-[1550px] mx-auto px-5 sm:px-10 md:px-16 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 xl:gap-20 items-center">
          
          {/* Left Column: Stacked Display Title perfectly constrained within 5 columns */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <h2 className="font-raleway font-black uppercase tracking-tighter text-white text-[clamp(2.2rem,4.5vw,4.2rem)] xl:text-[4.5rem] leading-[0.88] text-left">
              <span className="block">FREQUENTLY</span>
              <span className="block mt-1">ASKED</span>
              <span className="block mt-1 text-transparent [-webkit-text-stroke:1.8px_rgba(255,255,255,0.85)]">
                QUESTIONS
              </span>
            </h2>
          </div>

          {/* Right Column: Clean Accordion List */}
          <div className="lg:col-span-7 w-full space-y-1">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  className="border-b border-white/12 py-3.5 sm:py-4.5 transition-colors duration-300"
                >
                  {/* Header Clickable Row */}
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between text-left group gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-raleway font-bold text-base sm:text-lg md:text-[1.15rem] tracking-tight transition-colors duration-300 ${
                        isOpen ? 'text-white' : 'text-white/85 group-hover:text-[#FF6B00]'
                      }`}
                    >
                      {item.question}
                    </span>

                    {/* Circular Action Toggle Button */}
                    <span
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0 transition-all duration-300 shadow-sm ${
                        isOpen
                          ? 'bg-[#FF6B00] text-white rotate-45'
                          : 'bg-white text-black group-hover:bg-[#FF6B00] group-hover:text-white'
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {/* Expandable Answer Box */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100 mt-3'
                        : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="font-arimo text-white/60 text-xs sm:text-sm leading-relaxed max-w-[620px]">
                        {item.answer}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
