'use client';

import Image from 'next/image';

/**
 * Pure Brand SVG Logo Slider.
 * All logos rendered in white via CSS filter / fill override.
 * Section has generous top/bottom padding to separate it from neighbours.
 */
const brandLogos = [
  {
    name: 'React',
    svg: (
      <svg width="45" height="40" viewBox="-11.5 -10.23174 23 20.46348" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="0" cy="0" r="2.05" fill="white" />
        <g stroke="white" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    ),
  },
  {
    name: 'Next.js',
    svg: (
      <svg width="45" height="40" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="mask0_next" maskUnits="userSpaceOnUse" x="0" y="0" width="180" height="180">
          <circle cx="90" cy="90" r="90" fill="#fff" />
        </mask>
        <g mask="url(#mask0_next)">
          <circle cx="90" cy="90" r="90" fill="#333" />
          <path d="M149.508 157.52L69.141 54H54V126H67.882V70.722L138.835 161.859C142.613 160.627 146.183 159.167 149.508 157.52Z" fill="white" />
          <rect x="115" y="54" width="14" height="72" fill="white" />
        </g>
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    svg: (
      <svg width="40" height="40" viewBox="0 0 128 128" xmlns="http://www.w3.org/2000/svg">
        <rect width="128" height="128" rx="16" fill="rgba(255,255,255,0.12)" />
        <path d="M72.24 99.28c2.48 4.08 7.36 6.8 13.6 6.8 7.76 0 12.8-3.92 12.8-10.16 0-5.76-3.84-8.8-12.72-12.64l-4.48-1.92c-12.88-5.52-19.04-12.56-19.04-24.88 0-14 11.28-24.32 28.64-24.32 12.08 0 20.32 4.4 25.52 14.16l-10.96 7.04c-3.12-5.44-7.68-7.92-14.4-7.92-7.12 0-11.44 3.76-11.44 9.12 0 5.44 3.44 8.08 12.24 11.92l4.48 1.92c14.72 6.32 20 13.6 20 25.68 0 15.68-12.16 25.68-30.8 25.68-15.6 0-25.76-6.48-30.4-17.76l11.92-6.88zM14.64 43.12H58v13.68H43.2v59.52H29.44V56.8H14.64V43.12z" fill="white" />
      </svg>
    ),
  },
  {
    name: 'Tailwind CSS',
    svg: (
      <svg width="45" height="35" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.336 6.182 14.975 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C7.666 17.818 9.027 19.2 12.001 19.2c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.336 13.382 8.975 12 6.001 12z" fill="white" />
      </svg>
    ),
  },
  {
    name: 'Node.js',
    svg: (
      <svg width="40" height="35" viewBox="0 0 256 157" xmlns="http://www.w3.org/2000/svg">
        <path d="M128 0L0 73.9v74.2l128 73.9 128-73.9V73.9L128 0zm88.8 127.3l-88.8 51.3-88.8-51.3V50.7l88.8-51.3 88.8 51.3v76.6z" fill="white" />
      </svg>
    ),
  },
  {
    name: 'Meta',
    svg: (
      <svg width="55" height="30" viewBox="0 0 500 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M165.7 6.3C131 6.3 99.4 23.9 76.5 53 45.4 12.4 0 35.8 0 86.8c0 39.4 23.4 75.3 58.7 90.2 36.8 15.6 78.2 4.7 103.5-27.1 23 29.1 54.6 46.7 89.3 46.7 34.7 0 66.3-17.6 89.3-46.7 25.3 31.8 66.7 42.7 103.5 27.1 35.3-14.9 58.7-50.8 58.7-90.2 0-51-45.4-74.4-76.5-33.8C400.6 23.9 369 6.3 334.3 6.3z" fill="white" />
      </svg>
    ),
  },
  {
    name: 'Google',
    img: '/images/logo-google.png',
  },
  {
    name: 'Adobe',
    img: '/images/logo-adobe.png',
  },
  {
    name: 'PayPal',
    img: '/images/logo-paypal.png',
  },
];

export default function LogoSlider() {
  const marqueeItems = [...brandLogos, ...brandLogos, ...brandLogos];

  return (
    <div
      style={{
        padding: '5rem 0',           /* generous top/bottom gap */
        overflow: 'hidden',
        background: 'transparent',
        borderTop: '1px solid rgba(255,255,255,0.07)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
        userSelect: 'none',
        position: 'relative',
      }}
    >
      {/* Optional subtle label */}
      <p
        style={{
          textAlign: 'center',
          fontSize: '0.7rem',
          fontFamily: 'Raleway, sans-serif',
          fontWeight: 600,
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)',
          marginBottom: '2.5rem',
        }}
      >
        Technologies &amp; Partners
      </p>

      <div style={{ display: 'flex', overflow: 'hidden', width: '100%' }}
        className="group"
      >
        <div
          className="flex items-center gap-[80px] animate-[logoScroll_24s_linear_infinite] w-max group-hover:[animation-play-state:paused]"
        >
          {marqueeItems.map((logo, index) => (
            <div
              key={`${logo.name}-${index}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                opacity: 0.6,
                transition: 'opacity 0.3s ease, transform 0.3s ease',
              }}
              className="hover:!opacity-100 hover:scale-110"
            >
              {logo.svg ? (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {logo.svg}
                </div>
              ) : (
                <Image
                  src={logo.img!}
                  alt={logo.name}
                  width={110}
                  height={38}
                  style={{
                    objectFit: 'contain',
                    /* Force all raster logos to white */
                    filter: 'brightness(0) invert(1)',
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
