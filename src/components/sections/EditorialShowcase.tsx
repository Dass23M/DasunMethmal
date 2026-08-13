'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MARKETING_METRICS = [
    { value: '100%', label: 'Dedicated Execution' },
    { value: 'SEO', label: 'Content Strategy' },
    { value: 'Growth', label: 'Mindset & Campaign Focus' },
];

export default function EditorialShowcase() {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const sectionRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const statsRef = useRef<HTMLDivElement>(null);

    const img1Ref = useRef<HTMLDivElement>(null);
    const img2Ref = useRef<HTMLDivElement>(null);
    const img3Ref = useRef<HTMLDivElement>(null);
    const img4Ref = useRef<HTMLDivElement>(null);

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

            // Desktop & Tablet (≥768px): Pinned Mask-Reveal Scrubbed Mosaic Timeline
            mm.add('(min-width: 768px)', () => {
                const images = [img1Ref.current, img2Ref.current, img3Ref.current, img4Ref.current].filter(
                    Boolean
                ) as HTMLDivElement[];

                // Initial setup for clip-path mask reveals and initial positioning
                gsap.set(images, {
                    clipPath: 'inset(100% 0% 0% 0%)',
                    y: 60,
                    scale: 1.05,
                    opacity: 0,
                });

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: wrapper,
                        start: 'top top',
                        end: '+=1000',
                        pin: true,
                        scrub: 1,
                        anticipatePin: 1,
                    },
                });

                // 1. Left column text reveal
                if (textRef.current) {
                    tl.fromTo(
                        textRef.current,
                        { y: 40, opacity: 0.1 },
                        { y: 0, opacity: 1, duration: 0.3, ease: 'power2.out' },
                        0
                    );
                }

                // 2. Stats entrance
                if (statsRef.current) {
                    tl.fromTo(
                        statsRef.current.children,
                        { y: 30, opacity: 0 },
                        { y: 0, opacity: 1, stagger: 0.06, duration: 0.3, ease: 'power2.out' },
                        0.1
                    );
                }

                // 3. Sequential Mask Reveal + Parallax position for each mosaic image
                if (img1Ref.current) {
                    tl.to(
                        img1Ref.current,
                        {
                            clipPath: 'inset(0% 0% 0% 0%)',
                            y: 0,
                            scale: 1,
                            opacity: 1,
                            duration: 0.35,
                            ease: 'power2.inOut',
                        },
                        0.15
                    );
                }

                if (img2Ref.current) {
                    tl.to(
                        img2Ref.current,
                        {
                            clipPath: 'inset(0% 0% 0% 0%)',
                            y: 0,
                            scale: 1,
                            opacity: 1,
                            duration: 0.35,
                            ease: 'power2.inOut',
                        },
                        0.35
                    );
                }

                if (img3Ref.current) {
                    tl.to(
                        img3Ref.current,
                        {
                            clipPath: 'inset(0% 0% 0% 0%)',
                            y: 0,
                            scale: 1,
                            opacity: 1,
                            duration: 0.35,
                            ease: 'power2.inOut',
                        },
                        0.55
                    );
                }

                if (img4Ref.current) {
                    tl.to(
                        img4Ref.current,
                        {
                            clipPath: 'inset(0% 0% 0% 0%)',
                            y: 0,
                            scale: 1,
                            opacity: 1,
                            duration: 0.35,
                            ease: 'power2.inOut',
                        },
                        0.75
                    );
                }
            });

            // Mobile (<768px): Unpinned entrance with smooth scroll reveal
            mm.add('(max-width: 767px)', () => {
                const images = [img1Ref.current, img2Ref.current, img3Ref.current, img4Ref.current].filter(
                    Boolean
                ) as HTMLDivElement[];

                gsap.set(images, { clearProps: 'clipPath,transform,opacity' });

                gsap.fromTo(
                    images,
                    { opacity: 0, y: 40 },
                    {
                        opacity: 1,
                        y: 0,
                        stagger: 0.15,
                        duration: 0.8,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: section,
                            start: 'top 75%',
                        },
                    }
                );
            });
        }, wrapper);

        return () => ctx.revert();
    }, [mounted]);

    if (!mounted) {
        return <section className="w-full min-h-screen bg-[#F5F5F7]" />;
    }

    return (
        <div ref={wrapperRef} className="w-full overflow-hidden bg-[#F5F5F7] text-black">
            <section
                ref={sectionRef}
                className="relative w-full h-auto py-12 sm:py-16 md:py-0 md:h-[100svh] md:h-screen bg-[#F5F5F7] flex items-center justify-center select-none overflow-hidden"
            >
                <div className="w-full max-w-[1550px] mx-auto px-5 sm:px-10 md:px-16 lg:px-20">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center">

                        {/* Left Content Column */}
                        <div className="lg:col-span-6 flex flex-col justify-between space-y-6 md:space-y-10">

                            {/* Header Divider Line */}
                            <div>
                                <div className="flex items-center justify-between text-xs sm:text-sm font-bold tracking-widest uppercase text-black/75 pb-3 border-b border-black/15">
                                    <span className="flex items-center gap-2">
                                        <span className="w-2 h-2 rounded-full bg-[#FF6B00]" />
                                        DIGITAL MARKETING &amp; STRATEGY
                                    </span>
                                    <span>©2026</span>
                                </div>

                                {/* Main Paragraph Text */}
                                <p
                                    ref={textRef}
                                    className="font-sora text-xl sm:text-2xl md:text-3xl lg:text-[2.05rem] font-medium leading-[1.4] tracking-tight text-black mt-6 will-change-transform"
                                >
                                    As an emerging digital marketer and web developer, I create targeted social media campaigns, SEO-optimized content, and engaging visual assets. I help growing brands establish a strong online presence through clean design, creative storytelling, and data-backed digital strategies.
                                </p>

                                {/* CTA Button */}
                                <div className="mt-8">
                                    <Link
                                        href="#poster-design-section"
                                        className="inline-flex items-center gap-3 bg-black text-white px-7 py-3.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase transition-all duration-300 hover:bg-black/85 hover:scale-105 shadow-xl group"
                                    >
                                        <span>EXPLORE MARKETING &amp; POST DESIGNS</span>
                                        <span className="text-base transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-45">⤵</span>
                                    </Link>
                                </div>
                            </div>

                            {/* Bottom Metrics Grid */}
                            <div ref={statsRef} className="grid grid-cols-3 gap-4 sm:gap-6 pt-6 border-t border-black/10">
                                {MARKETING_METRICS.map((metric, idx) => (
                                    <div key={idx} className="flex flex-col">
                                        <span className="font-sora text-2xl sm:text-4xl md:text-5xl font-black tracking-tight text-black">
                                            {metric.value}
                                        </span>
                                        <span className="text-xs sm:text-sm font-medium text-black/60 mt-1">
                                            {metric.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                        </div>

                        {/* Right Column: Staggered Mosaic Collage with Mask Reveals */}
                        <div className="lg:col-span-6 relative w-full h-[400px] sm:h-[500px] md:h-[580px] lg:h-[650px]">

                            {/* Image 1: Top Left */}
                            <div
                                ref={img1Ref}
                                className="absolute top-0 left-0 w-[42%] aspect-[3/4] rounded-lg overflow-hidden shadow-2xl z-10 will-change-[clip-path,transform,opacity]"
                            >
                                <Image
                                    src="/images/editorial_1.png"
                                    alt="Editorial portrait 1"
                                    fill
                                    priority
                                    sizes="(max-width: 1024px) 45vw, 25vw"
                                    className="object-cover"
                                />
                            </div>

                            {/* Image 2: Top Right */}
                            <div
                                ref={img2Ref}
                                className="absolute top-[8%] right-0 w-[52%] aspect-[4/3] rounded-lg overflow-hidden shadow-2xl z-20 will-change-[clip-path,transform,opacity]"
                            >
                                <Image
                                    src="/images/editorial_2.png"
                                    alt="Editorial portrait 2"
                                    fill
                                    sizes="(max-width: 1024px) 55vw, 30vw"
                                    className="object-cover"
                                />
                            </div>

                            {/* Image 3: Middle Right Offset */}
                            <div
                                ref={img3Ref}
                                className="absolute bottom-[5%] right-[5%] w-[44%] aspect-[3/4] rounded-lg overflow-hidden shadow-2xl z-30 will-change-[clip-path,transform,opacity]"
                            >
                                <Image
                                    src="/images/editorial_3.png"
                                    alt="Editorial portrait 3"
                                    fill
                                    sizes="(max-width: 1024px) 48vw, 26vw"
                                    className="object-cover"
                                />
                            </div>

                            {/* Image 4: Bottom Left Offset */}
                            <div
                                ref={img4Ref}
                                className="absolute bottom-0 left-[8%] w-[40%] aspect-[3/4] rounded-lg overflow-hidden shadow-2xl z-40 will-change-[clip-path,transform,opacity]"
                            >
                                <Image
                                    src="/images/editorial_4.png"
                                    alt="Editorial portrait 4"
                                    fill
                                    sizes="(max-width: 1024px) 45vw, 25vw"
                                    className="object-cover"
                                />
                            </div>

                        </div>

                    </div>
                </div>
            </section>
        </div>
    );
}
