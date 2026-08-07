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
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://methmal.dev'),
  title: 'Methmal — Fullstack Developer & Digital Marketer Portfolio',
  description:
    'Methmal is a Fullstack Developer, AI Engineer & Tech Strategist building modern web applications, scalable platforms, and high-impact digital products.',
  keywords: [
    'Methmal',
    'Methmal Portfolio',
    'Fullstack Developer',
    'AI Engineer',
    'Machine Learning Engineer',
    'Next.js Developer',
    'React Developer',
    'Digital Marketer',
    'Web Development Portfolio',
  ],
  authors: [{ name: 'Methmal', url: 'https://github.com/Dass23M' }],
  creator: 'Methmal',
  publisher: 'Methmal',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://methmal.dev',
    title: 'Methmal — Fullstack Developer & Digital Marketer Portfolio',
    description:
      'Explore Methmal’s engineering portfolio featuring Web Development, Machine Learning, AI Applications, and High-Performance Web Architecture.',
    siteName: 'Methmal Portfolio',
    images: [
      {
        url: '/images/cover_bg_2.png',
        width: 1200,
        height: 630,
        alt: 'Methmal Fullstack Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Methmal — Fullstack Developer & Digital Marketer',
    description:
      'Fullstack Developer & AI Engineer portfolio showcasing web apps, predictive models, and growth solutions.',
    images: ['/images/cover_bg_2.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Methmal',
  jobTitle: 'Fullstack Developer & AI Engineer',
  url: 'https://methmal.dev',
  sameAs: ['https://github.com/Dass23M'],
  knowsAbout: [
    'Web Development',
    'Machine Learning',
    'Next.js',
    'TypeScript',
    'React',
    'Python',
    'Digital Marketing',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preload" as="image" href="/images/cover_bg_2.png" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
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
