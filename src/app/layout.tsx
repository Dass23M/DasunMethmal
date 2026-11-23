import type { Metadata, Viewport } from 'next';
import './globals.css';

import SmoothScrollProvider from '@/components/providers/SmoothScrollProvider';
import MobileMenu from '@/components/layout/MobileMenu';
import LeftRail from '@/components/layout/LeftRail';
import Loader from '@/components/layout/Loader';
import CustomCursor from '@/components/ui/CustomCursor';
import ScrollToTop from '@/components/ui/ScrollToTop';
import { ThemeProvider } from '@/components/providers/ThemeProvider';

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://www.dasunmethmal.com';

const siteName = 'Dasun Methmal';

const siteTitle =
  'Dasun Methmal | Creative Engineer, Full-Stack & AI';

const siteDescription =
  'Dasun Methmal is a Sri Lanka-based Creative Engineer & Software Engineering graduate specializing in Full-Stack Development, UI/UX, AI Systems, and Digital Growth.';

export const viewport: Viewport = {
  themeColor: '#080808',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: '%s | Dasun Methmal',
  },
  description: siteDescription,
  keywords: [
    'Dasun Methmal',
    'Creative Engineer',
    'Full-Stack Developer',
    'AI Engineer',
    'UI/UX Designer',
    'Digital Marketing',
    'Next.js Developer',
    'React Developer',
    'Cardiff Metropolitan University',
  ],
  authors: [{ name: 'Dasun Methmal', url: 'https://github.com/Dass23M' }],
  creator: 'Dasun Methmal',
  publisher: 'Dasun Methmal',
  applicationName: 'Dasun Methmal Portfolio',
  category: 'technology',
  robots: { index: true, follow: true },
  alternates: { canonical: siteUrl },
  icons: { icon: '/icon.svg', shortcut: '/icon.svg', apple: '/icon.svg' },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName,
    title: siteTitle,
    description: siteDescription,
    images: [{ url: '/images/cover_bg_2.png', width: 1200, height: 630, alt: siteTitle }],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteTitle,
    description: siteDescription,
    images: ['/images/cover_bg_2.png'],
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      inLanguage: 'en-US',
      publisher: { '@id': `${siteUrl}/#person` },
    },
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Dasun Methmal',
      url: siteUrl,
      jobTitle: 'Creative Engineer & Full-Stack Developer',
      description: siteDescription,
      alumniOf: {
        '@type': 'CollegeOrUniversity',
        name: 'Cardiff Metropolitan University',
      },
      sameAs: [
        'https://www.linkedin.com/in/dasun-methmal-607333230',
        'https://github.com/Dass23M',
        'https://www.instagram.com/_dase23_',
        'https://www.tiktok.com/@dcode33',
        'https://www.facebook.com/share/19NZDkGEqc',
      ],
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600;700&family=Space+Grotesk:wght@300;400;500;600;700&display=swap"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>

      <body
        className="bg-[#080808] text-white font-sans antialiased selection:bg-[#9CFF00] selection:text-black"
        style={
          {
            '--font-display': '"Space Grotesk", sans-serif',
            '--font-body': '"IBM Plex Sans", sans-serif',
            '--font-mono': '"JetBrains Mono", monospace',
          } as React.CSSProperties
        }
      >
        <ThemeProvider attribute="class" defaultTheme="dark" forcedTheme="dark">
          <SmoothScrollProvider>
            <CustomCursor />
            <ScrollToTop />
            <Loader />
            <LeftRail />
            <MobileMenu />
            <div className="unslate_co--site-wrap md:pl-14 min-h-screen bg-[#080808] editorial-noise">
              {children}
            </div>
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
