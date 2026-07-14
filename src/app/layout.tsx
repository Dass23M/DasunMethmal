import type { Metadata } from 'next';
import { Raleway, Arimo } from 'next/font/google';
import './globals.css';
import Loader from '@/components/layout/Loader';
import MobileMenu from '@/components/layout/MobileMenu';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import GSAPSectionAnimator from '@/components/providers/GSAPSectionAnimator';

const raleway = Raleway({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-raleway',
  display: 'swap',
});

const arimo = Arimo({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-arimo',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Methmal — Unfold Portfolio',
  description:
    'Methmal — Fullstack Developer, Digital Marketer & Tech Strategist. Portfolio showcasing web development, branding, and digital marketing.',
  keywords: ['portfolio', 'methmal', 'fullstack developer', 'digital marketing', 'web design', 'branding'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${raleway.variable} ${arimo.variable}`}>
        {/* Smooth weighted scroll & GSAP section animator providers */}
        <SmoothScrollProvider>
          <GSAPSectionAnimator>
            {/* Page loader */}
            <Loader />

            {/* Mobile slide-out menu */}
            <MobileMenu />

            {/* Main site wrapper */}
            <div className="unslate_co--site-wrap">
              {children}
            </div>
          </GSAPSectionAnimator>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
