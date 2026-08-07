export interface PosterItem {
  id: number;
  slug: string;
  title: string;
  category: 'poster' | 'social' | 'campaign';
  categoryLabel: string;
  author: string;
  readTime: string;
  image: string;
  date: string;
  tools: string[];
  description: string;
}

export const posterItems: PosterItem[] = [
  {
    id: 1,
    slug: 'creative-poster-brand-visuals',
    title: 'Creative Brand Visual Poster',
    category: 'poster',
    categoryLabel: 'Brand Poster',
    author: 'Methmal',
    readTime: 'Poster Design',
    image: '/images/poster-5.png',
    date: '2026 Showcase',
    tools: ['Adobe Photoshop', 'Illustrator'],
    description: 'High-impact brand poster engineered with bold typography and cinematic lighting.',
  },
  {
    id: 2,
    slug: 'social-media-promotional-banners',
    title: 'Social Media Promo Banner',
    category: 'social',
    categoryLabel: 'Social Post',
    author: 'Methmal',
    readTime: 'Social Post',
    image: '/images/poster-1.png',
    date: '2026 Showcase',
    tools: ['Photoshop', 'Figma'],
    description: 'Vibrant social media promotional post crafted for maximum feed engagement.',
  },
  {
    id: 3,
    slug: 'event-typography-poster-design',
    title: 'Event & Typography Poster',
    category: 'poster',
    categoryLabel: 'Typography',
    author: 'Methmal',
    readTime: 'Poster Design',
    image: '/images/poster-2.png',
    date: '2026 Showcase',
    tools: ['Adobe Illustrator', 'InDesign'],
    description: 'Experimental typographic poster balancing minimalism with geometric composition.',
  },
  {
    id: 4,
    slug: 'minimalist-brand-campaign-posts',
    title: 'Minimalist Campaign Visual',
    category: 'campaign',
    categoryLabel: 'Campaign Visual',
    author: 'Methmal',
    readTime: 'Campaign Post',
    image: '/images/poster-3.jpg',
    date: '2026 Showcase',
    tools: ['Photoshop', 'Lightroom'],
    description: 'Sleek luxury campaign artwork featuring subtle color gradients and crisp lines.',
  },
  {
    id: 5,
    slug: 'product-launch-social-graphics',
    title: 'Product Launch Graphics',
    category: 'social',
    categoryLabel: 'Launch Graphics',
    author: 'Methmal',
    readTime: 'Social Post',
    image: '/images/poster-4.png',
    date: '2026 Showcase',
    tools: ['Photoshop', 'Cinema 4D'],
    description: 'Dynamic product reveal graphics engineered for cross-platform social campaigns.',
  },
  {
    id: 6,
    slug: 'digital-marketing-ad-creative',
    title: 'Digital Marketing Ad Creative',
    category: 'social',
    categoryLabel: 'Ad Creative',
    author: 'Methmal',
    readTime: 'Ad Design',
    image: '/images/post-1.png',
    date: '2026 Showcase',
    tools: ['Photoshop', 'Canva Pro'],
    description: 'Conversion-optimized ad banner designed for high click-through rates.',
  },
];

export const blogPosts = posterItems;
