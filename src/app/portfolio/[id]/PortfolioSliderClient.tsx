'use client';

import { useState } from 'react';
import Image from 'next/image';

interface Props {
  images: string[];
}

/**
 * Client-side image slider for portfolio single pages.
 * Prev/next buttons, dot indicators.
 */
export default function PortfolioSliderClient({ images }: Props) {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + images.length) % images.length);
  const next = () => setCurrent((c) => (c + 1) % images.length);

  return (
    <div className="single-slider-wrap" style={{ position: 'relative', marginBottom: '50px' }}>
      {/* Image */}
      <div style={{ position: 'relative', lineHeight: 0, overflow: 'hidden' }}>
        <Image
          src={images[current]}
          alt={`Slide ${current + 1}`}
          width={1200}
          height={800}
          priority={current === 0}
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />

        {/* Prev / Next buttons */}
        {images.length > 1 && (
          <>
            <button className="slider-btn prev" onClick={prev} aria-label="Previous image">
              &#8249;
            </button>
            <button className="slider-btn next" onClick={next} aria-label="Next image">
              &#8250;
            </button>
          </>
        )}
      </div>

      {/* Dots */}
      {images.length > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px' }}>
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: current === i ? '#fff' : 'rgba(255,255,255,0.4)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: '0.3s',
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
