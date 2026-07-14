'use client';

import { useRef, useState, useEffect } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';

const skills = [
  { label: 'WordPress', value: 90, delay: 0 },
  { label: 'HTML/CSS', value: 99, delay: 300 },
  { label: 'jQuery', value: 95, delay: 600 },
  { label: 'Design', value: 100, delay: 900 },
];

function AnimatedCounter({
  value,
  delay,
  started,
}: {
  value: number;
  delay: number;
  started: boolean;
}) {
  const [current, setCurrent] = useState(0);
  const rafRef = useRef<number>(0);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!started || startedRef.current) return;
    startedRef.current = true;

    const timer = setTimeout(() => {
      const duration = 3000;
      const startTime = performance.now();

      const animate = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setCurrent(Math.round(eased * value));

        if (progress < 1) {
          rafRef.current = requestAnimationFrame(animate);
        }
      };

      rafRef.current = requestAnimationFrame(animate);
    }, delay);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(rafRef.current);
    };
  }, [started, value, delay]);

  return <>{current}</>;
}

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills-section" className="unslate-section">
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px' }}>
        <SectionHeading title="My Skills" />

        <div ref={sectionRef} className="skills-grid">
          {skills.map((skill) => (
            <div key={skill.label} className="counter-v1" style={{ textAlign: 'center' }}>
              <span className="number-wrap">
                <span className="counter-number">
                  <AnimatedCounter value={skill.value} delay={skill.delay} started={started} />
                </span>
                <span className="counter-append">%</span>
              </span>
              <span className="counter-label">{skill.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
