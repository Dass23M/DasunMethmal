'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '@/components/ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

/**
 * About Me section with GSAP ScrollTrigger image reveal.
 */
export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const textColRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

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

      // Orange cover wipe
      if (coverRef.current) {
        tl.fromTo(
          coverRef.current,
          { x: '-102%' },
          { x: '102%', duration: 1.1, ease: 'power3.inOut' },
          0
        );
      }

      // Image scale down into position
      if (imgRef.current) {
        tl.fromTo(
          imgRef.current,
          { scale: 1.25 },
          { scale: 1, duration: 1.2, ease: 'power2.out' },
          0.2
        );
      }

      // Text column reveal
      if (textColRef.current) {
        tl.fromTo(
          textColRef.current.children,
          { y: 35, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
          0.4
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section id="about-section" ref={sectionRef} className="unslate-section">
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px' }}>
        <SectionHeading title="About Me" />

        <div className="about-grid">
          <div className="about-img-col">
            <figure className="dotted-bg" style={{ margin: 0 }}>
              <div style={{ position: 'relative', overflow: 'hidden', lineHeight: 0 }}>
                <div
                  ref={coverRef}
                  style={{
                    position: 'absolute',
                    top: 0, left: 0, width: '100%', height: '100%',
                    background: '#FF6B00',
                    zIndex: 9,
                    transform: 'translateX(-102%)',
                  }}
                />
                <Image
                  ref={imgRef}
                  src="/images/about_me_pic2.jpg"
                  alt="About Glenn Chapman Hoyer"
                  width={800}
                  height={600}
                  style={{
                    width: '100%',
                    height: 'auto',
                    display: 'block',
                    willChange: 'transform',
                  }}
                />
              </div>
            </figure>
          </div>

          <div ref={textColRef} className="about-text-col">
            <h3 className="heading-h3" style={{ marginBottom: '20px' }}>
              We can make it together
            </h3>
            <p className="lead" style={{ marginBottom: '20px' }}>
              Far far away, behind the word mountains, far from the countries Vokalia and Consonantia,
              there <a href="#" style={{ color: '#fff', textDecoration: 'underline' }}>live the blind</a> texts.
            </p>
            <p style={{ marginBottom: '30px', color: 'rgba(255,255,255,0.8)' }}>
              A small river named Duden flows by their place and supplies it with the necessary
              regelialia. It is a paradisematic country, in which roasted parts of sentences fly
              into your mouth.
            </p>
            <p>
              <a href="#" className="btn-outline-pill">
                Download my CV
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
