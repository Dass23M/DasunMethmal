export interface PortfolioItem {
  id: number;
  title: string;
  categories: string;
  image: string;
  type: 'page' | 'lightbox' | 'video';
  href: string;
  isPortrait?: boolean;
  caption?: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Shoe Rebranding',
    categories: 'web, branding',
    image: '/images/work_1_md.jpg',
    type: 'page',
    href: '/portfolio/1',
  },
  {
    id: 3,
    title: 'Reworking',
    categories: 'branding, packaging, illustration',
    image: '/images/work_2_md.jpg',
    type: 'page',
    href: '/portfolio/3',
    isPortrait: true,
  },
  {
    id: 4,
    title: 'Modern Building',
    categories: 'branding, packaging',
    image: '/images/work_3_md.jpg',
    type: 'page',
    href: '/portfolio/4',
  },
  {
    id: 5,
    title: 'Watch',
    categories: 'web, packaging',
    image: '/images/work_4_full.jpg',
    type: 'lightbox',
    href: '/images/work_4_full.jpg',
    caption: 'Watch',
  },
  {
    id: 6,
    title: 'Shoe Rebranding',
    categories: 'illustration, packaging',
    image: '/images/work_5_md.jpg',
    type: 'lightbox',
    href: '/images/work_5_md.jpg',
    caption: 'Shoe Rebranding',
  },
  {
    id: 2,
    title: 'Reshape',
    categories: 'web, branding',
    image: '/images/work_6_md.jpg',
    type: 'page',
    href: '/portfolio/2',
    isPortrait: true,
  },
  {
    id: 7,
    title: 'Modern Building',
    categories: 'branding, packaging',
    image: '/images/work_7_a_md.jpg',
    type: 'lightbox',
    href: '/images/work_7_a_md.jpg',
    caption: 'Modern Building',
    isPortrait: true,
  },
  {
    id: 8,
    title: 'Showreel 2019',
    categories: 'web, branding',
    image: '/images/work_8_md.jpg',
    type: 'video',
    href: 'https://www.youtube.com/watch?v=mwtbEGNABWU',
    caption: 'Showreel 2019',
  },
  {
    id: 9,
    title: 'Render Packaging',
    categories: 'web, illustration',
    image: '/images/work_9_a_md.jpg',
    type: 'lightbox',
    href: '/images/work_9_a_md.jpg',
    caption: 'Render Packaging',
  },
];

export interface PortfolioSingle {
  id: string;
  title: string;
  subtitle: string;
  images: string[];
  date: string;
  role: string;
  client: string;
  visitUrl: string;
  description1: string;
  description2: string;
}

export const portfolioSingles: PortfolioSingle[] = [
  {
    id: '1',
    title: 'Shoe Rebranding',
    subtitle: 'Far far away, behind the word mountains, far from the countries.',
    images: ['/images/work_1_full.jpg', '/images/work_1_a_full.jpg'],
    date: 'March 9th, 2020',
    role: 'Identity, Web Design',
    client: 'unslate',
    visitUrl: 'https://colorlib.com/',
    description1:
      'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean. A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.',
    description2:
      'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.',
  },
  {
    id: '2',
    title: 'Reshape',
    subtitle: 'Far far away, behind the word mountains, far from the countries.',
    images: ['/images/work_6_md.jpg', '/images/work_1_full.jpg'],
    date: 'April 15th, 2020',
    role: 'Web Design, Branding',
    client: 'unslate',
    visitUrl: 'https://colorlib.com/',
    description1:
      'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.',
    description2:
      'A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.',
  },
  {
    id: '3',
    title: 'Reworking',
    subtitle: 'Far far away, behind the word mountains, far from the countries.',
    images: ['/images/work_2_full.jpg', '/images/work_2_a_full.jpg', '/images/work_2_b_full.jpg'],
    date: 'May 20th, 2020',
    role: 'Branding, Packaging, Illustration',
    client: 'unslate',
    visitUrl: 'https://colorlib.com/',
    description1:
      'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.',
    description2:
      'Even the all-powerful Pointing has no control about the blind texts it is an almost unorthographic life One day however a small line of blind text by the name of Lorem Ipsum decided to leave for the far World of Grammar.',
  },
  {
    id: '4',
    title: 'Modern Building',
    subtitle: 'Far far away, behind the word mountains, far from the countries.',
    images: ['/images/work_3_full.jpg', '/images/work_3_a_full.jpg'],
    date: 'June 10th, 2020',
    role: 'Branding, Packaging',
    client: 'unslate',
    visitUrl: 'https://colorlib.com/',
    description1:
      'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts. Separated they live in Bookmarksgrove right at the coast of the Semantics, a large language ocean.',
    description2:
      'A small river named Duden flows by their place and supplies it with the necessary regelialia. It is a paradisematic country, in which roasted parts of sentences fly into your mouth.',
  },
];
