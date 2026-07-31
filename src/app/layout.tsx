import type { Metadata } from 'next';
import { Sora, Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import Loader from '@/components/layout/Loader';
import MobileMenu from '@/components/layout/MobileMenu';
import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import GSAPSectionAnimator from '@/components/providers/GSAPSectionAnimator';

const sora = Sora({
  subsets: ['latin'],
  weight: ['300', '400', '600', '700', '800'],
  variable: '--font-sora',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-mono',
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
      <body className={`${sora.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
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
