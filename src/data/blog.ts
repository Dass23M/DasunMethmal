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
    slug: 'a-mountaineering-guide-for-beginners',
    title: 'A Mountaineering Guide For Beginners',
    author: 'Joefrey',
    readTime: '5 mins read',
    image: '/images/post_1.jpg',
    date: 'March 15, 2020',
    heroImage: '/images/work_1_full.jpg',
  },
  {
    id: 2,
    slug: 'a-mountaineering-guide-for-beginners-2',
    title: 'A Mountaineering Guide For Beginners',
    author: 'Joefrey',
    readTime: '5 mins read',
    image: '/images/post_2.jpg',
    date: 'March 15, 2020',
    heroImage: '/images/work_1_full.jpg',
  },
  {
    id: 3,
    slug: 'a-mountaineering-guide-for-beginners-3',
    title: 'A Mountaineering Guide For Beginners',
    author: 'Joefrey',
    readTime: '5 mins read',
    image: '/images/post_3.jpg',
    date: 'March 15, 2020',
    heroImage: '/images/work_1_full.jpg',
  },
  {
    id: 4,
    slug: 'a-mountaineering-guide-for-beginners-4',
    title: 'A Mountaineering Guide For Beginners',
    author: 'Joefrey',
    readTime: '5 mins read',
    image: '/images/post_4.jpg',
    date: 'March 15, 2020',
    heroImage: '/images/work_1_full.jpg',
  },
  {
    id: 5,
    slug: 'a-mountaineering-guide-for-beginners-5',
    title: 'A Mountaineering Guide For Beginners',
    author: 'Joefrey',
    readTime: '5 mins read',
    image: '/images/post_5.jpg',
    date: 'March 15, 2020',
    heroImage: '/images/work_1_full.jpg',
  },
];
