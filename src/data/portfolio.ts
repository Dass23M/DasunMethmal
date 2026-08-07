/* ─────────────────────────────────────────────────
   Portfolio data
   • portfolioItems  → grid cards on the home page
   • portfolioSingles → each project's detail page
───────────────────────────────────────────────── */

export interface PortfolioItem {
  id: number;
  title: string;
  categories: string;
  /** Path to the thumbnail shown in the grid */
  image: string;
  /** Route for the detail page */
  href: string;
}

export const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: 'Thyroid Cancer Risk Prediction',
    categories: 'machine learning, healthcare',
    image: '/images/work_1_md.jpg',
    href: '/portfolio/1',
  },
  {
    id: 2,
    title: 'CareerAI',
    categories: 'machine learning, web app',
    image: '/images/work_2_md.jpg',
    href: '/portfolio/2',
  },
  {
    id: 3,
    title: 'Lost & Found Platform',
    categories: 'web, full-stack',
    image: '/images/work_3_md.jpg',
    href: '/portfolio/3',
  },
  {
    id: 4,
    title: 'Talent Discovery Platform',
    categories: 'web, full-stack',
    image: '/images/work_4_full.jpg',
    href: '/portfolio/4',
  },
  {
    id: 5,
    title: 'Medical Center Management System',
    categories: 'web app, healthcare, full-stack',
    image: '/images/work_5_md.jpg',
    href: '/portfolio/5',
  },
  {
    id: 6,
    title: 'SaaS Marketing & Analytics Hub',
    categories: 'web, digital marketing, analytics',
    image: '/images/work_6_md.jpg',
    href: '/portfolio/6',
  },
];

/* ─────────────────────────────────────────────────
   Single project detail data
───────────────────────────────────────────────── */
export interface PortfolioSingle {
  id: string;
  title: string;
  subtitle: string;
  /** Up to 2 images for the slider on the detail page */
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
    title: 'Thyroid Cancer Risk Prediction',
    subtitle:
      'A machine learning system that predicts thyroid cancer risk from clinical and diagnostic data.',
    images: ['/images/work_1_full.jpg', '/images/work_1_a_full.jpg'],
    date: '2025',
    role: 'Machine Learning Engineer, Full-Stack Developer',
    client: 'Academic Project',
    visitUrl: 'https://github.com/Dass23M',
    description1:
      'Built an end-to-end ML pipeline to assess thyroid cancer risk from patient clinical and diagnostic features. The workflow covers EDA, feature engineering, class-imbalance handling, and training multiple classifiers to identify the best-performing model for risk prediction.',
    description2:
      'The trained model was wrapped in a clean web application so predictions can be generated from a simple input form, making the tool accessible to non-technical users while keeping evaluation rigorous and well-documented.',
  },
  {
    id: '2',
    title: 'CareerAI',
    subtitle:
      'A student career recommendation system that matches learners to suitable career paths.',
    images: ['/images/work_2_full.jpg', '/images/work_2_a_full.jpg'],
    date: '2025',
    role: 'Machine Learning Engineer, Full-Stack Developer',
    client: 'Personal Project',
    visitUrl: 'https://github.com/Dass23M',
    description1:
      'CareerAI recommends suitable career paths to students based on academic performance, skills, and interests. The system processes student input and applies a trained recommendation model to surface the most relevant career options, ranked by fit.',
    description2:
      'Paired with a clean, easy-to-navigate web interface so students can explore results, understand why a path was suggested, and refine inputs to see updated recommendations in real time.',
  },
  {
    id: '3',
    title: 'Lost & Found Platform',
    subtitle:
      'A full-stack platform for reporting, searching, and reuniting lost items with their owners.',
    images: ['/images/work_3_full.jpg', '/images/work_3_a_full.jpg'],
    date: '2025',
    role: 'Full-Stack Developer',
    client: 'Personal Project',
    visitUrl: 'https://github.com/Dass23M',
    description1:
      'A full-stack web application that lets users report lost items or post found items, then search and filter listings to find matches. Includes user accounts, item categorization, and status tracking from "lost" to "reunited."',
    description2:
      'Designed with a focus on straightforward, fast reporting and search, so users can quickly post an item or check for matches without unnecessary friction.',
  },
  {
    id: '4',
    title: 'Talent Discovery Platform',
    subtitle: 'A platform for discovering, showcasing, and connecting with talent.',
    images: ['/images/work_4_full.jpg', '/images/work_4_full.jpg'],
    date: '2025',
    role: 'Full-Stack Developer',
    client: 'Personal Project',
    visitUrl: 'https://github.com/Dass23M',
    description1:
      'A full-stack talent discovery and portfolio showcase platform for creators, developers, and professionals to highlight work, connect with recruiters, and manage project inquiries.',
    description2:
      'Features structured profile pages, project galleries, skill tags, and direct messaging workflows built with clean component architecture for a seamless user experience.',
  },
  {
    id: '5',
    title: 'Medical Center Management System',
    subtitle:
      'An ongoing comprehensive healthcare management system for patient records, appointments, and prescriptions.',
    images: ['/images/work_5_md.jpg', '/images/work_5_md.jpg'],
    date: '2025 – Ongoing',
    role: 'Full-Stack Lead Developer',
    client: 'Healthcare System (Ongoing)',
    visitUrl: 'https://github.com/Dass23M',
    description1:
      'Developing an end-to-end medical center platform to streamline clinical operations, EHR, and patient management. Enables real-time doctor appointment booking, patient history tracking, and automated prescription workflow generation.',
    description2:
      'Built with role-based access control (Admin, Doctor, Receptionist, Patient), ensuring HIPAA-compliant data security, fast query execution, and an intuitive dashboard interface for healthcare staff.',
  },
  {
    id: '6',
    title: 'SaaS Marketing & Analytics Hub',
    subtitle:
      'A high-converting SaaS landing engine and real-time marketing analytics dashboard.',
    images: ['/images/work_6_md.jpg', '/images/work_6_md.jpg'],
    date: '2025',
    role: 'Full-Stack Developer & Growth Marketer',
    client: 'SaaS Client Project',
    visitUrl: 'https://github.com/Dass23M',
    description1:
      'Engineered a modern web platform integrating dynamic marketing landing pages with a real-time analytics dashboard to monitor conversion funnels, ad performance, and user engagement metrics.',
    description2:
      'Leveraged Next.js server components and chart visualization libraries to deliver sub-second page loads, automated lead tracking, and technical SEO optimization for maximum organic reach.',
  },
];