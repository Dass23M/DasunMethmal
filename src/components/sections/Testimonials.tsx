'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import SectionHeading from '@/components/ui/SectionHeading';
import { testimonials } from '@/data/testimonials';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [transitioning, setTransitioning] = useState(false);

  const goTo = useCallback(
    (index: number) => {
      if (transitioning) return;
      setTransitioning(true);
      setTimeout(() => {
        setCurrent(index);
        setTransitioning(false);
      }, 300);
    },
    [transitioning]
  );

  const prev = () => {
    goTo((current - 1 + testimonials.length) % testimonials.length);
  };

  const next = useCallback(() => {
    goTo((current + 1) % testimonials.length);
  }, [current, goTo]);

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
          style={{
            maxWidth: '900px',
            margin: '0 auto',
            padding: '0 40px',
            opacity: transitioning ? 0 : 1,
            transition: 'opacity 0.3s ease',
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
              onClick={() => goTo(i)}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
