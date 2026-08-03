'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
        return <section className="w-full min-h-[400px] bg-[#F5F5F7]" />;
    }

    return (
        <section ref={sectionRef} className="w-full bg-[#F5F5F7] py-12 sm:py-20 overflow-hidden select-none">
            <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-12">

                {/* 3-Column Bento Metric Layout with Software Development Focus */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">

                    {/* ─── COLUMN 1 (LEFT) ─── */}
                    <div ref={col1Ref} className="lg:col-span-4 flex flex-col gap-5 sm:gap-6 justify-between will-change-transform">

                        {/* Top Tech Badge Card */}
                        <div className="bento-card bg-white border border-gray-150 rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-sm flex items-center justify-between">
                            <div className="flex items-center -space-x-3">
                                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                    <Image src="/images/person_man_1.jpg" alt="Developer profile 1" fill className="object-cover" />
                                </div>
                                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                    <Image src="/images/person_man_2.jpg" alt="Developer profile 2" fill className="object-cover" />
                                </div>
                                <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-white shadow-sm">
                                    <Image src="/images/person_man_3.jpg" alt="Developer profile 3" fill className="object-cover" />
                                </div>
                            </div>
                            <span className="font-sora text-xs sm:text-sm font-semibold text-gray-700 tracking-tight">
                                Fullstack &amp; Modern Web Tech
                            </span>
                        </div>

                        {/* Bottom Software Craft & Code Quality Card */}
                        <div className="bento-card bg-white border border-gray-150 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm flex flex-col justify-between flex-1 min-h-[250px] sm:min-h-[380px]">
                            <div>
                                <svg className="w-8 h-8 text-black fill-current mb-4" viewBox="0 0 24 24">
                                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                                </svg>
                                <p className="font-sora font-bold text-base sm:text-lg text-black leading-snug">
                                    Writing clean, modular TypeScript code and building intuitive user interfaces engineered for speed, responsiveness, and seamless performance.
                                </p>
                            </div>

                            <div className="pt-6 border-t border-gray-100">
                                <span className="font-sora font-black text-4xl sm:text-5xl text-black tracking-tight block">
                                    100<span className="text-[#FF6B00] font-semibold text-3xl sm:text-4xl">%</span>
                                </span>
                                <span className="font-inter text-xs sm:text-sm font-medium text-gray-500 block mt-1">
                                    Clean Architecture &amp; Quality
                                </span>
                            </div>
                        </div>

                    </div>

                    {/* ─── COLUMN 2 (MIDDLE WITH 3D IMAGE) ─── */}
                    <div ref={col2Ref} className="lg:col-span-4 flex flex-col gap-5 sm:gap-6 justify-between will-change-transform">

                        {/* Center 3D Showcase Card */}
                        <div className="bento-card bg-[#f4f4f4] border border-gray-150 rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm relative h-[260px] sm:h-[400px] lg:h-[430px] flex items-center justify-center p-4">
                            <Image
                                src="/images/orange1.png"
                                alt="Futuristic 3D Showcase"
                                fill
                                sizes="(max-width: 1024px) 100vw, 33vw"
                                className="object-contain p-2 transition-transform duration-500 hover:scale-105"
                            />
                        </div>

                        {/* Bottom Vibrant Orange Software Banner */}
                        <div className="bento-card bg-[#FF6B00] rounded-2xl sm:rounded-3xl p-5 sm:p-6 text-white flex items-center justify-between shadow-md">
                            <div>
                                <span className="font-sora font-black text-2xl sm:text-3xl text-white block leading-none">
                                    10+
                                </span>
                                <span className="font-sora text-xs font-semibold text-white/95 block mt-1 tracking-tight">
                                    Project Deliveries &amp; Concepts
                                </span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-white text-[#FF6B00] flex items-center justify-center shadow-md flex-shrink-0">
                                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                </svg>
                            </div>
                        </div>

                    </div>

                    {/* ─── COLUMN 3 (RIGHT) ─── */}
                    <div ref={col3Ref} className="lg:col-span-4 flex flex-col gap-5 sm:gap-6 justify-between will-change-transform">

                        {/* Top Software Engineering Focus Card */}
                        <div className="bento-card bg-white border border-gray-150 rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-sm flex flex-col justify-between flex-1 min-h-[250px] sm:min-h-[380px]">
                            <div>
                                <p className="font-sora font-bold text-base sm:text-lg text-black leading-snug">
                                    Passionate about crafting <span className="text-[#FF6B00] font-black">Next.js &amp; React</span> web platforms, integrating REST APIs, and designing responsive UI design systems.
                                </p>
                            </div>

                            <div className="pt-6 border-t border-gray-100">
                                <span className="font-sora font-black text-4xl sm:text-5xl text-black tracking-tight block">
                                    15<span className="text-[#FF6B00]">+</span>
                                </span>
                                <span className="font-inter text-xs sm:text-sm font-medium text-gray-500 block mt-1">
                                    Web Builds &amp; Repositories
                                </span>
                            </div>
                        </div>

                        {/* Bottom Available For Work Status Bar */}
                        <div className="bento-card bg-white border border-gray-150 rounded-2xl sm:rounded-3xl p-4 sm:p-5 flex items-center justify-between shadow-sm">
                            <div className="flex items-center gap-3">
                                <span className="w-2.5 h-2.5 rounded-full bg-[#FF6B00] animate-pulse flex-shrink-0" />
                                <span className="font-sora font-semibold text-xs sm:text-sm text-gray-800 tracking-tight">
                                    Available For Work
                                </span>
                            </div>
                            <a
                                href="#contact-section"
                                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-blue-600 font-bold text-base hover:bg-gray-50 transition-colors shadow-xs"
                                aria-label="Contact Status"
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
