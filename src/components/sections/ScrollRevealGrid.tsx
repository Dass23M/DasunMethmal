'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import SectionHeading from '@/components/ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollRevealGrid() {
    const sectionRef = useRef<HTMLElement>(null);
    const col1Ref = useRef<HTMLDivElement>(null);
    const col2Ref = useRef<HTMLDivElement>(null);
    const col3Ref = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !sectionRef.current) return;

        const section = sectionRef.current;
        const col1 = col1Ref.current;
        const col2 = col2Ref.current;
        const col3 = col3Ref.current;

        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia();

            // Desktop & Tablet (≥768px): Alternating Horizontal Scrub ScrollTrigger
            mm.add('(min-width: 768px)', () => {
                if (col1) {
                    gsap.fromTo(
                        col1,
                        { x: -45, y: 25, opacity: 0.3 },
                        {
                            x: 0,
                            y: 0,
                            opacity: 1,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: section,
                                start: 'top 92%',
                                end: 'top 35%',
                                scrub: 1.2,
                            },
                        }
                    );
                }

                if (col2) {
                    gsap.fromTo(
                        col2,
                        { x: 45, y: 25, opacity: 0.3 },
                        {
                            x: 0,
                            y: 0,
                            opacity: 1,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: section,
                                start: 'top 92%',
                                end: 'top 35%',
                                scrub: 1.2,
                            },
                        }
                    );
                }

                if (col3) {
                    gsap.fromTo(
                        col3,
                        { x: -45, y: 25, opacity: 0.3 },
                        {
                            x: 0,
                            y: 0,
                            opacity: 1,
                            ease: 'power2.out',
                            scrollTrigger: {
                                trigger: section,
                                start: 'top 92%',
                                end: 'top 35%',
                                scrub: 1.2,
                            },
                        }
                    );
                }
            });

            // Mobile (<768px): Clean entrance fade-in per column
            mm.add('(max-width: 767px)', () => {
                const cols = [col1, col2, col3].filter(Boolean);
                gsap.fromTo(
                    cols,
                    { y: 40, opacity: 0 },
                    {
                        y: 0,
                        opacity: 1,
                        duration: 0.8,
                        stagger: 0.15,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 80%',
                        },
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, [mounted]);

    if (!mounted) {
        return <section className="w-full min-h-[400px] bg-white" />;
    }

    return (
        <section id="skills-section" ref={sectionRef} className="w-full bg-white text-zinc-950 py-24 sm:py-32 overflow-hidden select-none border-y border-zinc-200/80">
            <div className="w-full max-w-[1240px] mx-auto px-5 sm:px-8">
                <SectionHeading title="Engineering" />

                {/* 3-Column Bento Metric Layout */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-stretch">

                    {/* ─── COLUMN 1 (LEFT) ─── */}
                    <div ref={col1Ref} className="lg:col-span-4 flex flex-col gap-6 justify-between will-change-transform">

                        {/* Top Tech Badge Card */}
                        <div className="bento-card bg-[#FAFAFA] rounded-2xl p-5 flex items-center justify-between border border-zinc-200/80">
                            <div className="flex items-center -space-x-3">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-xs">
                                    <Image src="/images/person_man_1.jpg" alt="Developer profile 1" fill sizes="40px" className="object-cover" />
                                </div>
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-xs">
                                    <Image src="/images/person_man_2.jpg" alt="Developer profile 2" fill sizes="40px" className="object-cover" />
                                </div>
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-xs">
                                    <Image src="/images/person_man_3.jpg" alt="Developer profile 3" fill sizes="40px" className="object-cover" />
                                </div>
                            </div>
                            <span className="font-display text-sm font-semibold text-zinc-900 tracking-tight">
                                Modern Web Stack
                            </span>
                        </div>

                        {/* Bottom Software Craft & Code Quality Card */}
                        <div className="bento-card bg-[#FAFAFA] rounded-2xl p-7 flex flex-col justify-between flex-1 min-h-[240px] sm:min-h-[340px] border border-zinc-200/80">
                            <div>
                                <p className="font-display font-medium text-lg text-zinc-900 leading-relaxed">
                                    Clean, modular TypeScript built for speed and reliability.
                                </p>
                            </div>

                            <div className="pt-6 border-t border-zinc-200">
                                <span className="font-display font-bold text-4xl sm:text-5xl text-zinc-950 tracking-tight block">
                                    100<span className="text-[#FF6B00] text-3xl sm:text-4xl">%</span>
                                </span>
                                <span className="font-body text-xs sm:text-sm text-zinc-500 block mt-1">
                                    Clean Architecture
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* ─── COLUMN 2 (MIDDLE WITH 3D IMAGE) ─── */}
                    <div ref={col2Ref} className="lg:col-span-4 flex flex-col gap-6 justify-between will-change-transform">

                        {/* Center 3D Showcase Card */}
                        <div className="bento-card bg-[#FAFAFA] rounded-2xl overflow-hidden relative h-[260px] sm:h-[380px] flex items-center justify-center p-4 group border border-zinc-200/80">
                            <Image
                                src="/images/orange1.png"
                                alt="3D Showcase"
                                fill
                                sizes="(max-width: 1024px) 100vw, 33vw"
                                className="object-contain p-2 transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                        </div>

                        {/* Bottom Accent Banner */}
                        <div className="bento-card bg-[#FF6B00] rounded-2xl p-6 text-white flex items-center justify-between">
                            <div>
                                <span className="font-display font-bold text-3xl text-white block leading-none">
                                    10+
                                </span>
                                <span className="font-display text-xs font-medium text-white/90 block mt-1.5">
                                    Projects Delivered
                                </span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white text-[#FF6B00] flex items-center justify-center flex-shrink-0">
                                <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                        </div>

                    </div>

                    {/* ─── COLUMN 3 (RIGHT) ─── */}
                    <div ref={col3Ref} className="lg:col-span-4 flex flex-col gap-6 justify-between will-change-transform">

                        {/* Top Software Engineering Focus Card */}
                        <div className="bento-card bg-[#FAFAFA] rounded-2xl p-7 flex flex-col justify-between flex-1 min-h-[240px] sm:min-h-[340px] border border-zinc-200/80">
                            <div>
                                <p className="font-display font-medium text-lg text-zinc-900 leading-relaxed">
                                    <span className="text-[#FF6B00] font-semibold">Next.js &amp; React</span> platforms, REST APIs, and responsive UI systems.
                                </p>
                            </div>

                            <div className="pt-6 border-t border-zinc-200">
                                <span className="font-display font-bold text-4xl sm:text-5xl text-zinc-950 tracking-tight block">
                                    15<span className="text-[#FF6B00]">+</span>
                                </span>
                                <span className="font-body text-xs sm:text-sm text-zinc-500 block mt-1">
                                    Builds &amp; Repositories
                                </span>
                            </div>
                        </div>

                        {/* Bottom Available Status Bar */}
                        <div className="bento-card bg-[#FAFAFA] rounded-2xl p-5 flex items-center justify-between border border-zinc-200/80">
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                                <span className="font-display font-medium text-sm text-zinc-900">
                                    Available for work
                                </span>
                            </div>
                            <a
                                href="#contact-section"
                                className="w-8 h-8 rounded-full border border-zinc-300 flex items-center justify-center text-zinc-900 text-sm hover:border-[#FF6B00] hover:text-[#FF6B00] transition-colors"
                                aria-label="Contact"
                            >
                                ↗
                            </a>
                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}
