'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import SectionHeading from '@/components/ui/SectionHeading';
import { testimonials } from '@/data/testimonials';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const slideRef = useRef<HTMLDivElement>(null);
  const isAnimatingRef = useRef(false);

  const animateToSlide = useCallback((nextIndex: number) => {
    if (isAnimatingRef.current || !slideRef.current) return;
    isAnimatingRef.current = true;

    // Fade out & slide current
    gsap.to(slideRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        setCurrent(nextIndex);
        // Prepare next slide position & animate in
        gsap.fromTo(
          slideRef.current,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.45,
            ease: 'power2.out',
            onComplete: () => {
              isAnimatingRef.current = false;
            },
          }
        );
      },
    });
  }, []);

  const prev = () => {
    const nextIdx = (current - 1 + testimonials.length) % testimonials.length;
    animateToSlide(nextIdx);
  };

  const next = useCallback(() => {
    const nextIdx = (current + 1) % testimonials.length;
    animateToSlide(nextIdx);
  }, [current, animateToSlide]);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  return (
    <section id="testimonial-section" className="unslate-section">
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px' }}>
        <SectionHeading title="My Happy Clients" />
      </div>

      <div style={{ position: 'relative', padding: '40px 0 100px', overflow: 'hidden' }}>
        <div
          ref={slideRef}
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '0 40px',
          }}
        >
          {testimonials.map((testimonial, i) => (
            <div
              key={testimonial.id}
              style={{
                display: current === i ? 'block' : 'none',
              }}
            >
              <div className="testimonial-v1">
                <div className="testimonial-inner-bg">
                  <span className="testimonial-quote">&ldquo;</span>
                  <blockquote style={{ margin: 0, padding: 0, border: 'none', color: '#fff' }}>
                    {testimonial.quote}
                  </blockquote>
                </div>

                <div className="testimonial-author">
                  <Image
                    src={testimonial.authorImage}
                    alt={testimonial.authorName}
                    width={90}
                    height={90}
                    style={{ borderRadius: '50%', objectFit: 'cover', margin: '0 auto 20px', display: 'block' }}
                  />
                  <h3>{testimonial.authorName}</h3>
                  <span className="position" style={{ display: 'block', fontSize: '12px', color: 'rgba(255,255,255,0.5)' }}>
                    {testimonial.authorPosition}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className="carousel-nav-btn prev"
          onClick={prev}
          aria-label="Previous testimonial"
          style={{ left: '10%' }}
        >
          &#8249;
        </button>
        <button
          className="carousel-nav-btn next"
          onClick={next}
          aria-label="Next testimonial"
          style={{ right: '10%' }}
        >
          &#8250;
        </button>

        <div className="carousel-dots">
          {testimonials.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${current === i ? 'active' : ''}`}
              onClick={() => animateToSlide(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
