import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Methmal — Fullstack & Digital Marketing Portfolio',
    short_name: 'Methmal',
    description: 'Fullstack Developer & AI Engineer portfolio showcasing modern web applications and growth strategy.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0B',
    theme_color: '#FF6B00',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
  };
}
