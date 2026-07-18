'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
    const sectionRef = useRef<HTMLElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const [mounted, setMounted] = useState(false);

    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [submitting, setSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [warning, setWarning] = useState('');

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !sectionRef.current) return;

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: 'top 80%',
                },
            });

            if (cardRef.current) {
                tl.fromTo(
                    cardRef.current,
                    { y: 60, opacity: 0, scale: 0.95 },
                    { y: 0, opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' },
                    0
                );
            }

            if (contentRef.current) {
                tl.fromTo(
                    contentRef.current.children,
                    { y: 40, opacity: 0 },
                    { y: 0, opacity: 1, duration: 0.7, stagger: 0.15, ease: 'power3.out' },
                    0.2
                );
            }
        }, sectionRef);

        return () => ctx.revert();
    }, [mounted]);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.name.trim()) newErrors.name = 'Please enter your name';
        if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!formData.message.trim() || formData.message.trim().length < 5) {
            newErrors.message = 'Please enter a message (at least 5 characters)';
        }
        return newErrors;
    };

    const handleInput = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors((prev) => {
                const next = { ...prev };
                delete next[field];
                return next;
            });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validate();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setSubmitting(true);
        setWarning('');

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const data = await res.json();
            if (data.ok) {
                setSuccess(true);
            } else {
                setWarning(data.message || 'Something went wrong. Please try again.');
            }
        } catch {
            setWarning('Something went wrong. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    if (!mounted) {
        return <section className="w-full min-h-screen bg-white" />;
    }

    return (
        <section id="contact-section" ref={sectionRef} className="w-full bg-white py-12 md:py-20 overflow-hidden">
            <div className="w-full max-w-[1550px] mx-auto px-4 sm:px-8 md:px-12">

                {/* Main Hero Card Container with Artistic Sunset Gradient Background */}
                <div className="relative w-full rounded-[24px] sm:rounded-[36px] md:rounded-[44px] overflow-hidden p-5 sm:p-10 md:p-14 lg:p-16 flex items-center justify-between min-h-[640px] md:min-h-[720px] shadow-2xl border border-white/10">

                    {/* Background Sunset Graphic */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/images/contact_bg_sunset.png"
                            alt="Sunset silhouette background"
                            fill
                            priority
                            sizes="100vw"
                            className="object-cover object-center"
                        />
                        {/* Soft tint gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70 md:bg-gradient-to-r md:from-black/50 md:via-black/30 md:to-transparent z-[1]" />
                    </div>

                    {/* Grid Layout inside Sunset Banner */}
                    <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">

                        {/* Left Column: Floating White Contact Form Card */}
                        <div ref={cardRef} className="lg:col-span-5 w-full flex justify-center lg:justify-start order-2 lg:order-1">
                            <div className="bg-white text-black rounded-[24px] shadow-2xl p-5 sm:p-7 w-full max-w-[430px] border border-white/20 select-none">

                                {/* Embedded Header Banner Block */}
                                <div className="relative h-[95px] rounded-[16px] overflow-hidden flex items-center justify-center shadow-md">
                                    <Image
                                        src="/images/contact_bg_sunset.png"
                                        alt="Header Banner background"
                                        fill
                                        className="object-cover"
                                    />
                                    <div className="absolute inset-0 bg-black/30" />
                                    <span className="relative z-10 font-raleway font-black text-white text-xl sm:text-2xl tracking-widest uppercase drop-shadow-md">
                                        MICHAEL®
                                    </span>
                                </div>

                                {/* Card Title */}
                                <h3 className="font-raleway font-bold text-center text-xl text-black mt-5 mb-5 tracking-tight">
                                    Reach Out to Me
                                </h3>

                                {/* Form Elements */}
                                {!success ? (
                                    <form onSubmit={handleSubmit} noValidate className="space-y-4">

                                        {/* Name Input */}
                                        <div>
                                            <label htmlFor="name" className="block text-xs font-semibold text-gray-700 mb-1.5">
                                                Name
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                placeholder="Emily Johnson"
                                                value={formData.name}
                                                onChange={(e) => handleInput('name', e.target.value)}
                                                className="w-full bg-[#f4f4f5] rounded-xl px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                                            />
                                            {errors.name && (
                                                <span className="text-[11px] text-red-500 mt-1 block font-medium">
                                                    {errors.name}
                                                </span>
                                            )}
                                        </div>

                                        {/* Email Input */}
                                        <div>
                                            <label htmlFor="email" className="block text-xs font-semibold text-gray-700 mb-1.5">
                                                E-mail*
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                placeholder="emilyjohnson@gamil.com"
                                                value={formData.email}
                                                onChange={(e) => handleInput('email', e.target.value)}
                                                className="w-full bg-[#f4f4f5] rounded-xl px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all"
                                            />
                                            {errors.email && (
                                                <span className="text-[11px] text-red-500 mt-1 block font-medium">
                                                    {errors.email}
                                                </span>
                                            )}
                                        </div>

                                        {/* Message Input */}
                                        <div>
                                            <label htmlFor="message" className="block text-xs font-semibold text-gray-700 mb-1.5">
                                                Message*
                                            </label>
                                            <textarea
                                                id="message"
                                                name="message"
                                                rows={3}
                                                placeholder="Your message"
                                                value={formData.message}
                                                onChange={(e) => handleInput('message', e.target.value)}
                                                className="w-full bg-[#f4f4f5] rounded-xl px-4 py-3 text-sm text-black placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-black/20 transition-all resize-none h-[95px]"
                                            />
                                            {errors.message && (
                                                <span className="text-[11px] text-red-500 mt-1 block font-medium">
                                                    {errors.message}
                                                </span>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <div className="pt-2">
                                            <button
                                                type="submit"
                                                disabled={submitting}
                                                className="w-full bg-black text-white font-bold tracking-widest text-xs uppercase py-3.5 rounded-xl hover:bg-black/85 hover:scale-[1.01] active:scale-[0.99] transition-all shadow-md"
                                            >
                                                {submitting ? 'SENDING...' : 'YOUR MESSAGE'}
                                            </button>
                                        </div>

                                        {warning && (
                                            <p className="text-xs text-red-600 text-center mt-2 font-medium">
                                                {warning}
                                            </p>
                                        )}
                                    </form>
                                ) : (
                                    <div className="py-8 text-center">
                                        <p className="font-bold text-green-600 text-sm">
                                            Your message was sent successfully!
                                        </p>
                                    </div>
                                )}

                            </div>
                        </div>

                        {/* Right Column: Giant Typography & Subhead */}
                        <div ref={contentRef} className="lg:col-span-7 flex flex-col justify-between h-full space-y-8 lg:space-y-16 order-1 lg:order-2">

                            <div>
                                {/* Top Pill Badge */}
                                <div className="inline-flex items-center gap-2 bg-white/90 backdrop-blur-md text-black px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-md mb-6">
                                    <span className="text-[#FF6B00] text-sm">❇</span>
                                    <span>CONTACT ME</span>
                                </div>

                                {/* Giant Headline */}
                                <h2 className="font-raleway font-black text-white uppercase tracking-tight leading-[0.95] text-[clamp(2.5rem,6.5vw,5.5rem)] text-left drop-shadow-lg">
                                    LET’S CREATE <br />
                                    TOGETHER
                                </h2>
                            </div>

                            {/* Bottom Right Sub-section */}
                            <div className="flex items-start gap-3.5 max-w-[440px] pt-4">
                                <span className="text-[#FF6B00] text-xl mt-1 flex-shrink-0 animate-pulse">✦</span>
                                <div>
                                    <h4 className="font-raleway font-bold uppercase text-white tracking-wider text-sm sm:text-base mb-1.5">
                                        RESULTS-DRIVEN SOLUTIONS
                                    </h4>
                                    <p className="text-white/85 text-xs sm:text-sm leading-relaxed font-normal">
                                        Refining the design through feedback and testing to ensure the best user experience.
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>
        </section>
    );
}
