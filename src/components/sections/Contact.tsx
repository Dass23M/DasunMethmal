'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '@/components/ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const formColRef = useRef<HTMLDivElement>(null);
  const infoColRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [warning, setWarning] = useState('');
  const [notEmpty, setNotEmpty] = useState<Record<string, boolean>>({});

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      });

      if (formColRef.current) {
        tl.fromTo(
          formColRef.current,
          { y: 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
          0
        );
      }

      if (infoColRef.current) {
        tl.fromTo(
          infoColRef.current.children,
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
    setNotEmpty((prev) => ({ ...prev, [field]: value.length > 0 }));
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

  return (
    <section id="contact-section" ref={sectionRef} className="unslate-section">
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px' }}>
        <SectionHeading title="Get In Touch" />

        <div className="contact-grid">
          <div ref={formColRef} className="contact-form-col">
            {!success ? (
              <form onSubmit={handleSubmit} noValidate className="form-outline" id="contactForm">
                <div className="contact-name-email-grid">
                  <div
                    className={`form-group ${notEmpty.name ? 'field--not-empty' : ''}`}
                    style={{ position: 'relative', marginBottom: '50px' }}
                  >
                    <label htmlFor="name">Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={formData.name}
                      onChange={(e) => handleInput('name', e.target.value)}
                    />
                    {errors.name && (
                      <span
                        style={{
                          color: 'rgba(255,255,255,0.5)',
                          fontSize: '12px',
                          position: 'absolute',
                          bottom: '-22px',
                          left: 0,
                        }}
                      >
                        {errors.name}
                      </span>
                    )}
                  </div>

                  <div
                    className={`form-group ${notEmpty.email ? 'field--not-empty' : ''}`}
                    style={{ position: 'relative', marginBottom: '50px' }}
                  >
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="form-control"
                      value={formData.email}
                      onChange={(e) => handleInput('email', e.target.value)}
                    />
                    {errors.email && (
                      <span
                        style={{
                          color: 'rgba(255,255,255,0.5)',
                          fontSize: '12px',
                          position: 'absolute',
                          bottom: '-22px',
                          left: 0,
                        }}
                      >
                        {errors.email}
                      </span>
                    )}
                  </div>
                </div>

                <div
                  className={`form-group ${notEmpty.message ? 'field--not-empty' : ''}`}
                  style={{ position: 'relative', marginBottom: '50px' }}
                >
                  <label htmlFor="message">Write your message...</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={7}
                    className="form-control"
                    value={formData.message}
                    onChange={(e) => handleInput('message', e.target.value)}
                  />
                  {errors.message && (
                    <span
                      style={{
                        color: 'rgba(255,255,255,0.5)',
                        fontSize: '12px',
                        position: 'absolute',
                        bottom: '-22px',
                        left: 0,
                      }}
                    >
                      {errors.message}
                    </span>
                  )}
                </div>

                <div>
                  <button type="submit" className="btn-outline-pill" disabled={submitting}>
                    {submitting ? 'Sending...' : 'Send Message'}
                  </button>
                </div>

                {warning && (
                  <p className="form-message-warning" style={{ marginTop: '12px' }}>
                    {warning}
                  </p>
                )}
              </form>
            ) : (
              <p className="form-message-success">Your message was sent, thank you!</p>
            )}
          </div>

          <div ref={infoColRef} className="contact-info-col">
            <div style={{ marginBottom: '30px' }}>
              <span className="contact-info-label">Email</span>
              <a
                href="mailto:info@yourdomain.com"
                className="contact-info-val"
                style={{ display: 'block' }}
              >
                info@yourdomain.com
              </a>
            </div>
            <div style={{ marginBottom: '30px' }}>
              <span className="contact-info-label">Phone</span>
              <a
                href="tel:+123456789012"
                className="contact-info-val"
                style={{ display: 'block' }}
              >
                +12 345 6789 012
              </a>
            </div>
            <div style={{ marginBottom: '30px' }}>
              <span className="contact-info-label">Address</span>
              <address className="contact-info-val" style={{ fontStyle: 'normal', lineHeight: '1.6' }}>
                273 South Riverview Rd.
                <br />
                New York, NY 10011
              </address>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
