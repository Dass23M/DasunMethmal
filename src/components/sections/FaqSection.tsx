'use client';

import { useState } from 'react';

const FAQ_ITEMS = [
  {
    question: 'Can I update the website myself after launch?',
    answer:
      'Yes. I build clean, modular architectures with structured data or CMS integrations so you can easily update content without touching core code.',
  },
  {
    question: 'How long does a typical project take?',
    answer:
      'Focused landing pages and brand websites take 1–2 weeks. Full-stack web applications and AI-integrated platforms typically span 3–8 weeks.',
  },
  {
    question: 'Do I need final designs before we start?',
    answer:
      'Not at all. I handle end-to-end product execution — from UX structure and visual direction to full-stack engineering and deployment.',
  },
  {
    question: 'Do you provide ongoing post-launch support?',
    answer:
      'Yes. I offer post-launch performance monitoring, feature iterations, SEO tuning, and technical support.',
  },
  {
    question: 'What is your primary engineering stack?',
    answer:
      'Next.js, React, TypeScript, Node.js, Express, Python/Flask for ML microservices, PostgreSQL, MongoDB, and Tailwind CSS.',
  },
];

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="faq-section"
      className="w-full py-20 sm:py-28 bg-[#080808] text-white border-t border-dashed border-white/[0.12] select-none"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-4 space-y-4">
            <span className="font-mono text-xs tracking-[0.16em] uppercase text-zinc-400 block">
              [FAQ]
            </span>
            <h2 className="font-display font-normal uppercase tracking-[-0.04em] leading-[0.92] text-4xl sm:text-5xl text-white">
              Common <br />
              <span className="text-[#9CFF00]">Questions_</span>
            </h2>
          </div>

          <div className="lg:col-span-8 divide-y divide-white/[0.1] border-y border-white/[0.1]">
            {FAQ_ITEMS.map((item, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div key={idx} className="py-5 sm:py-6">
                  <button
                    type="button"
                    onClick={() => setOpenIndex((prev) => (prev === idx ? null : idx))}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between text-left gap-4 group cursor-pointer"
                  >
                    <span className="flex items-center gap-4">
                      <span className="font-mono text-xs text-zinc-500">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <span
                        className={`font-display text-base sm:text-xl transition-colors ${
                          isOpen ? 'text-[#9CFF00]' : 'text-white group-hover:text-[#9CFF00]'
                        }`}
                      >
                        {item.question}
                      </span>
                    </span>
                    <span
                      className={`w-8 h-8 border flex items-center justify-center font-mono text-sm shrink-0 transition-colors ${
                        isOpen
                          ? 'bg-[#9CFF00] text-black border-[#9CFF00]'
                          : 'border-white/20 text-white group-hover:border-[#9CFF00]'
                      }`}
                    >
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  {isOpen && (
                    <p className="font-body text-sm sm:text-base text-zinc-400 leading-relaxed pt-4 pl-8 sm:pl-9 max-w-2xl">
                      {item.answer}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
