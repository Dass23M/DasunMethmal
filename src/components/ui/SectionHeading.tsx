'use client';

import Image from 'next/image';

/**
 * Reusable section heading with divider image.
 */
interface SectionHeadingProps {
  title: string;
}

export default function SectionHeading({ title }: SectionHeadingProps) {
  return (
    <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
      <h2 className="heading-h2" style={{ marginBottom: '16px' }}>{title}</h2>
      <div>
        <Image
          src="/images/divider.png"
          alt="divider"
          width={76}
          height={10}
          style={{ display: 'inline-block' }}
        />
      </div>
    </div>
  );
}
