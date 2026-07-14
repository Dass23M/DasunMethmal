'use client';

import { useRef, useState, useEffect } from 'react';
import SectionHeading from '@/components/ui/SectionHeading';

/**
 * About Me section.
 */
export default function About() {
    const imgRef = useRef<HTMLDivElement>(null);
    const [revealed, setRevealed] = useState(false);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setRevealed(true);
                    observer.disconnect();
                }
            },
            { threshold: 0.2 }
        );
        if (imgRef.current) observer.observe(imgRef.current);
        return () => observer.disconnect();
    }, []);

    return (
        <section id="about-section" className="unslate-section">
            <div style={{ maxWidth: '1140px', margin: '0 auto', padding: '0 15px' }}>
                <SectionHeading title="About Me" />

                <div className="about-grid">
                    <div className="about-img-col">
                        <figure className="dotted-bg" style={{ margin: 0 }}>
                            <div ref={imgRef} style={{ position: 'relative', overflow: 'hidden', lineHeight: 0 }}>
                                <div
                                    style={{
                                        position: 'absolute',
                                        top: 0, left: 0, width: '100%', height: '100%',
                                        background: '#FF6B00',
                                        zIndex: 9,
                                        transform: revealed ? 'translateX(102%)' : 'translateX(-102%)',
                                        transition: revealed
                                            ? 'transform 0.9s cubic-bezier(0.77, 0, 0.18, 1)'
                                            : 'none',
                                    }}
                                />
                                <img
                                    src="/images/about_me_pic2.jpg"
                                    alt="About Glenn Chapman Hoyer"
                                    style={{
                                        width: '100%',
                                        height: 'auto',
                                        display: 'block',
                                        transform: revealed ? 'scale(1)' : 'scale(1.1)',
                                        transition: revealed
                                            ? 'transform 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s'
                                            : 'none',
                                    }}
                                />
                            </div>
                        </figure>
                    </div>

                    <div className="about-text-col">
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
