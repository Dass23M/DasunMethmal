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

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  if (!mounted) {
    return <section className="w-full min-h-[500px] bg-black" />;
  }

  return (
    <section
      ref={sectionRef}
      id="faq-section"
      className="w-full py-20 lg:py-28 bg-[#07080B] text-white flex items-center justify-center overflow-hidden select-none luxury-mesh-bg"
    >
      <div className="w-full max-w-[1550px] mx-auto px-4 sm:px-8 md:px-16 lg:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 xl:gap-24 items-start">
          
          {/* Left Column: Stacked Display Title */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-[#FF8A00] uppercase tracking-widest mb-4">
              <span className="w-2 h-2 rounded-full bg-[#FF8A00] radar-pulse" />
              <span>{"// FREQUENT INQUIRIES"}</span>
            </div>
            <h2 className="font-display font-black uppercase tracking-tighter text-white text-[clamp(2.4rem,4.5vw,4.5rem)] leading-[0.9] text-left">
              <span className="block">FREQUENTLY</span>
              <span className="block mt-1">ASKED</span>
              <span className="block mt-1 text-transparent [-webkit-text-stroke:1.8px_rgba(255,138,0,0.85)]">
                QUESTIONS
              </span>
            </h2>
            <p className="font-body text-sm sm:text-base text-zinc-400 mt-6 leading-relaxed max-w-md font-light">
              Clear answers regarding engagement models, design-to-production turnaround, post-launch scaling, and technology stack.
            </p>
          </div>

          {/* Right Column: Clean Glass Accordion List */}
          <div className="lg:col-span-7 w-full space-y-4">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  className={`obsidian-surface rounded-2xl p-5 sm:p-6 transition-all duration-300 border ${
                    isOpen ? 'border-[#FF8A00]/50 shadow-[0_4px_30px_rgba(255,138,0,0.12)] bg-[#12141F]' : 'border-white/10 hover:border-white/20'
                  }`}
                >
                  {/* Header Clickable Row */}
                  <button
                    onClick={() => toggleAccordion(idx)}
                    className="w-full flex items-center justify-between text-left group gap-4 focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <span
                      className={`font-display font-bold text-base sm:text-lg md:text-[1.1rem] tracking-tight transition-colors duration-300 ${
                        isOpen ? 'text-[#FF8A00]' : 'text-white group-hover:text-[#FF8A00]'
                      }`}
                    >
                      {item.question}
                    </span>

                    {/* Circular Action Toggle Button */}
                    <span
                      className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm sm:text-base flex-shrink-0 transition-all duration-300 border ${
                        isOpen
                          ? 'bg-[#FF8A00] text-black border-[#FF8A00] rotate-45'
                          : 'bg-white/5 text-white/80 border-white/10 group-hover:bg-[#FF8A00] group-hover:text-black group-hover:border-[#FF8A00]'
                      }`}
                    >
                      +
                    </span>
                  </button>

                  {/* Expandable Answer Box */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isOpen
                        ? 'grid-rows-[1fr] opacity-100 mt-4'
                        : 'grid-rows-[0fr] opacity-0 mt-0 pointer-events-none'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="font-body text-white/70 text-xs sm:text-sm leading-relaxed max-w-[620px] font-light">
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
