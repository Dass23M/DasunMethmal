'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '@/components/ui/SectionHeading';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const SERVICES = [
  {
    id: 'web-dev',
    num: '01',
    header: 'Fullstack Web',
    desc: 'Fast, scalable Next.js, React, and Node.js applications.',
    image: '/images/post-1.png',
    tags: ['Next.js', 'TypeScript', 'Node.js'],
  },
  {
    id: 'poster-design',
    num: '02',
    header: 'Visual & Poster Design',
    desc: 'High-impact posters, social graphics, and brand visuals.',
    image: '/images/post-2.png',
    tags: ['Posters', 'Branding', 'Social'],
  },
  {
    id: 'digital-marketing',
    num: '03',
    header: 'Digital Growth',
    desc: 'Technical SEO and targeted ad campaigns built for ROI.',
    image: '/images/post-3.png',
    tags: ['SEO', 'Paid Ads', 'Strategy'],
  },
  {
    id: 'ui-ux-motion',
    num: '04',
    header: 'UI/UX & Motion',
    desc: 'Clean design systems and smooth interactive motion.',
    image: '/images/post-4.png',
    tags: ['Figma', 'GSAP', 'Design Systems'],
  },
];

export default function ImageFanShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll('.service-card');
        gsap.fromTo(
          cards,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.75,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: gridRef.current,
              start: 'top 82%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  if (!mounted) {
    return <section className="w-full min-h-[500px] bg-white" />;
  }

  return (
    <section
      ref={sectionRef}
      id="capabilities-section"
      className="w-full bg-white text-zinc-950 py-24 sm:py-32 select-none relative overflow-hidden font-body border-y border-zinc-200/80"
    >
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 relative z-10">
        <SectionHeading title="Services" />

        <div
          ref={gridRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {SERVICES.map((item) => (
            <div
              key={item.id}
              className="service-card group bg-[#FAFAFA] rounded-2xl p-6 flex flex-col justify-between border border-zinc-200/80 transition-all duration-300 hover:border-[#FF6B00]/45 hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(0,0,0,0.06)]"
            >
              <div>
                <span className="font-mono text-xs font-semibold text-[#FF6B00] block mb-4">
                  {item.num}
                </span>

                <h3 className="font-display text-xl font-bold text-zinc-950 leading-snug tracking-tight mb-2.5 group-hover:text-[#FF6B00] transition-colors">
                  {item.header}
                </h3>

                <p className="text-zinc-600 text-sm leading-relaxed mb-5">
                  {item.desc}
                </p>
              </div>

              <div className="relative w-full h-[185px] my-3 rounded-xl overflow-hidden bg-white border border-zinc-200/80 flex items-center justify-center p-2">
                <Image
                  src={item.image}
                  alt={item.header}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-contain object-center transition-transform duration-700 ease-out group-hover:scale-105"
                />
              </div>

              <div className="mt-4">
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-white border border-zinc-200 text-[11px] font-mono text-zinc-600"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href="#contact-section"
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-zinc-950 hover:bg-[#FF6B00] text-white font-display font-semibold text-xs tracking-wider uppercase transition-colors duration-200"
                >
                  <span>Get in touch ↗</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
