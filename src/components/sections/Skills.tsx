'use client';

import { useRef, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SectionHeading from '@/components/ui/SectionHeading';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  { label: 'WordPress', value: 90 },
  { label: 'HTML/CSS', value: 99 },
  { label: 'jQuery', value: 95 },
  { label: 'Design', value: 100 },
];

export default function Skills() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      const counters = sectionRef.current?.querySelectorAll<HTMLSpanElement>('.counter-val');
      counters?.forEach((counter) => {
        const targetValue = parseInt(counter.getAttribute('data-target') || '0', 10);
        const counterObj = { val: 0 };

        gsap.to(counterObj, {
          val: targetValue,
          duration: 2.5,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: counter,
            start: 'top 90%',
          },
          onUpdate: () => {
            counter.textContent = Math.round(counterObj.val).toString();
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [mounted]);

  return (
    <section id="skills-section" className="unslate-section">
      <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px' }}>
        <SectionHeading title="My Skills" />

        <div ref={sectionRef} className="skills-grid">
          {skills.map((skill) => (
            <div key={skill.label} className="counter-v1" style={{ textAlign: 'center' }}>
              <span className="number-wrap">
                <span className="counter-number">
                  <span className="counter-val" data-target={skill.value}>0</span>
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
