'use client';

import Link from 'next/link';

export default function BackButtonClient() {
  const handleBackClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey) {
      e.preventDefault();
      window.location.href = '/#portfolio-section';
    }
  };

  return (
    <Link
      href="/#portfolio-section"
      onClick={handleBackClick}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '10px 24px',
        background: '#212121',
        borderRadius: '30px',
        color: '#fff',
        fontSize: '14px',
        border: '2px solid transparent',
        transition: 'border-color 0.3s',
      }}
    >
      ← Back to Portfolio
    </Link>
  );
}
