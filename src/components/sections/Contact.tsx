'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Magnetic from '@/components/ui/Magnetic';

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    botcheck: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [warning, setWarning] = useState('');

  const validate = () => {
    const newErrors: Record<string, string> = {};
    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || name.length < 2) newErrors.name = 'Please enter your name (at least 2 characters)';
    if (!email || !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!message || message.length < 5) {
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
      if (res.ok && data.ok) {
        setSuccess(true);
        setStatusMessage(data.message || 'Your message was sent successfully!');
        setFormData({ name: '', email: '', subject: '', message: '', botcheck: '' });
      } else {
        setWarning(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setWarning('Network error. Please check your connection and try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccess(false);
    setStatusMessage('');
    setWarning('');
    setErrors({});
  };

  useEffect(() => {
    if (!sectionRef.current) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.contact-reveal',
        { opacity: 0, y: 28 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 82%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="contact-section"
      className="w-full bg-[#080808] text-white py-20 sm:py-28 border-t border-dashed border-white/[0.12]"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Editorial Pitch & Direct Channels */}
          <div className="contact-reveal lg:col-span-5 space-y-8">
            <span className="font-mono text-xs tracking-[0.16em] uppercase text-zinc-400 block">
              [CONTACT]
            </span>

            <h2 className="font-display font-normal uppercase tracking-[-0.04em] leading-[0.9] text-[clamp(2.4rem,10.5vw,5.25rem)] text-white">
              Let&apos;s Build <br />
              <span className="text-[#9CFF00]">Together_</span>
            </h2>

            <p className="font-body text-sm sm:text-base text-zinc-400 leading-relaxed max-w-md">
              Available for full-stack web apps, AI integrations, UI/UX engineering, and growth-focused digital builds.
            </p>

            <div className="pt-6 border-t border-dashed border-white/[0.14] space-y-4 font-mono text-xs tracking-[0.12em]">
              <div>
                <span className="text-zinc-500 block uppercase mb-1">EMAIL</span>
                <a
                  href="mailto:methmal.liyanage23@gmail.com"
                  className="text-white hover:text-[#9CFF00] transition-colors"
                >
                  methmal.liyanage23@gmail.com
                </a>
              </div>
              <div>
                <span className="text-zinc-500 block uppercase mb-1">PHONE</span>
                <a
                  href="tel:+94703056192"
                  className="text-white hover:text-[#9CFF00] transition-colors"
                >
                  +94 70 3056 192
                </a>
              </div>
              <div>
                <span className="text-zinc-500 block uppercase mb-1">LOCATION</span>
                <span className="text-white uppercase">COLOMBO, SRI LANKA · WORLDWIDE</span>
              </div>
            </div>
          </div>

          {/* Right Brutalist Contact Form */}
          <div className="contact-reveal lg:col-span-7 bg-[#111111] border border-white/[0.1] p-6 sm:p-10">
            {!success ? (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <input
                  type="text"
                  name="botcheck"
                  value={formData.botcheck}
                  onChange={(e) => handleInput('botcheck', e.target.value)}
                  style={{ display: 'none' }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block font-mono text-[10px] tracking-[0.16em] uppercase text-zinc-400 mb-2"
                    >
                      NAME *
                    </label>
                    <input
                      type="text"
                      id="contact-name"
                      name="name"
                      autoComplete="name"
                      maxLength={100}
                      placeholder="Your name"
                      value={formData.name}
                      onChange={(e) => handleInput('name', e.target.value)}
                      className={`w-full bg-[#080808] border px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#9CFF00] transition-colors ${
                        errors.name ? 'border-red-500' : 'border-white/15'
                      }`}
                    />
                    {errors.name && (
                      <span className="font-mono text-[11px] text-red-400 mt-1.5 block">
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block font-mono text-[10px] tracking-[0.16em] uppercase text-zinc-400 mb-2"
                    >
                      EMAIL *
                    </label>
                    <input
                      type="email"
                      id="contact-email"
                      name="email"
                      autoComplete="email"
                      maxLength={254}
                      placeholder="you@company.com"
                      value={formData.email}
                      onChange={(e) => handleInput('email', e.target.value)}
                      className={`w-full bg-[#080808] border px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#9CFF00] transition-colors ${
                        errors.email ? 'border-red-500' : 'border-white/15'
                      }`}
                    />
                    {errors.email && (
                      <span className="font-mono text-[11px] text-red-400 mt-1.5 block">
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block font-mono text-[10px] tracking-[0.16em] uppercase text-zinc-400 mb-2"
                  >
                    SUBJECT (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    id="contact-subject"
                    name="subject"
                    maxLength={150}
                    placeholder="Web App / UI Design / AI System"
                    value={formData.subject}
                    onChange={(e) => handleInput('subject', e.target.value)}
                    className="w-full bg-[#080808] border border-white/15 px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#9CFF00] transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block font-mono text-[10px] tracking-[0.16em] uppercase text-zinc-400 mb-2"
                  >
                    PROJECT DETAILS *
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    maxLength={5000}
                    placeholder="Tell me about your timeline, goals, and what we're building..."
                    value={formData.message}
                    onChange={(e) => handleInput('message', e.target.value)}
                    className={`w-full bg-[#080808] border px-4 py-3.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#9CFF00] transition-colors resize-none ${
                      errors.message ? 'border-red-500' : 'border-white/15'
                    }`}
                  />
                  {errors.message && (
                    <span className="font-mono text-[11px] text-red-400 mt-1.5 block">
                      {errors.message}
                    </span>
                  )}
                </div>

                <div className="pt-2">
                  <Magnetic strength={0.18} className="w-full sm:w-auto">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="chamfer-btn w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#9CFF00] hover:bg-[#B4FF3D] text-black font-mono font-bold text-xs tracking-[0.16em] uppercase px-8 py-4 transition-colors disabled:opacity-60 cursor-pointer"
                    >
                      <span>{submitting ? 'SENDING...' : 'SEND MESSAGE'}</span>
                      <span>&gt;</span>
                    </button>
                  </Magnetic>
                </div>

                {warning && (
                  <div className="p-3 bg-red-950/50 border border-red-500/40 text-red-300 font-mono text-xs">
                    {warning}
                  </div>
                )}
              </form>
            ) : (
              <div className="py-12 text-center space-y-5">
                <div className="w-14 h-14 bg-[#9CFF00] text-black mx-auto flex items-center justify-center font-mono text-2xl font-bold">
                  ✓
                </div>
                <h3 className="font-display text-2xl font-medium text-white">
                  Message Received
                </h3>
                <p className="font-body text-sm text-zinc-400 max-w-sm mx-auto">
                  {statusMessage || 'Thanks for reaching out. I will get back to you shortly.'}
                </p>
                <button
                  type="button"
                  onClick={handleReset}
                  className="font-mono text-xs tracking-[0.14em] uppercase text-[#9CFF00] hover:underline cursor-pointer"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
