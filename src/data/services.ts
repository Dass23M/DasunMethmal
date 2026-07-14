export interface Service {
  id: number;
  icon: string;
  title: string;
  titleLine2: string;
  description: string;
  delay: number;
}

export const services: Service[] = [
  {
    id: 1,
    icon: '/images/svg/001-options.svg',
    title: 'Digital',
    titleLine2: 'Strategy',
    description: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
    delay: 0,
  },
  {
    id: 2,
    icon: '/images/svg/002-chat.svg',
    title: 'Web',
    titleLine2: 'Design',
    description: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
    delay: 100,
  },
  {
    id: 3,
    icon: '/images/svg/003-contact-book.svg',
    title: 'User',
    titleLine2: 'Experience',
    description: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
    delay: 200,
  },
  {
    id: 4,
    icon: '/images/svg/004-percentage.svg',
    title: 'Web',
    titleLine2: 'Development',
    description: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
    delay: 0,
  },
  {
    id: 5,
    icon: '/images/svg/006-goal.svg',
    title: 'WordPress',
    titleLine2: 'Solutions',
    description: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
    delay: 100,
  },
  {
    id: 6,
    icon: '/images/svg/005-line-chart.svg',
    title: 'Mobile',
    titleLine2: 'Applications',
    description: 'A small river named Duden flows by their place and supplies it with the necessary regelialia.',
    delay: 200,
  },
];
