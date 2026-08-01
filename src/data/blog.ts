export interface BlogPost {
  id: number;
  slug: string;
  title: string;
  author: string;
  readTime: string;
  image: string;
  date: string;
  heroImage: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    slug: 'creative-poster-brand-visuals',
    title: 'Creative Poster & Brand Visuals',
    author: 'Methmal',
    readTime: 'Poster Design',
    image: '/images/poster-5.png',
    date: '2026 Showcase',
    heroImage: '/images/poster-5.png',
  },
  {
    id: 2,
    slug: 'social-media-promotional-banners',
    title: 'Social Media Promotional Banners',
    author: 'Methmal',
    readTime: 'Social Post',
    image: '/images/poster-1.png',
    date: '2026 Showcase',
    heroImage: '/images/poster-1.png',
  },
  {
    id: 3,
    slug: 'event-typography-poster-design',
    title: 'Event & Typography Poster Design',
    author: 'Methmal',
    readTime: 'Poster Design',
    image: '/images/poster-2.png',
    date: '2026 Showcase',
    heroImage: '/images/poster-2.png',
  },
  {
    id: 4,
    slug: 'minimalist-brand-campaign-posts',
    title: 'Minimalist Brand Campaign Posts',
    author: 'Methmal',
    readTime: 'Social Post',
    image: '/images/poster-3.png',
    date: '2026 Showcase',
    heroImage: '/images/poster-3.png',
  },
  {
    id: 5,
    slug: 'product-launch-social-graphics',
    title: 'Product Launch Social Graphics',
    author: 'Methmal',
    readTime: 'Poster Design',
    image: '/images/poster-4.png',
    date: '2026 Showcase',
    heroImage: '/images/poster-4.png',
  },
];
