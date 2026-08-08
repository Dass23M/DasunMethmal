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
    title: 'ThyroTrack – Thyroid Cancer Risk Prediction',
    categories: 'AI, healthcare, full-stack',
    image: '/images/work_1_md.jpg',
    href: '/portfolio/1',
  },
  {
    id: 2,
    title: 'AI Career Path Recommendation System',
    categories: 'AI, machine learning, web app',
    image: '/images/work_2_md.jpg',
    href: '/portfolio/2',
  },
  {
    id: 3,
    title: 'Lost & Found Community Platform',
    categories: 'web, full-stack, Next.js',
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
  githubUrl: string;
  techStack: string[];
  description1: string;
  description2: string;
}

export const portfolioSingles: PortfolioSingle[] = [
  {
    id: '1',
    title: 'ThyroTrack – Thyroid Cancer Risk Prediction',
    subtitle:
      'A full-stack AI-based healthcare platform for thyroid cancer risk prediction and patient management.',
    images: ['/images/work_1_full.jpg', '/images/work_1_a_full.jpg'],
    date: '2025',
    role: 'Full-Stack Developer & ML Engineer',
    client: 'Academic Project',
    visitUrl: 'https://github.com/Dass23M',
    githubUrl: 'https://github.com/Dass23M',
    techStack: ['React.js', 'Express.js', 'Flask', 'MySQL', 'Random Forest', 'SHAP'],
    description1:
      'Developed a full-stack AI-based healthcare platform for thyroid cancer risk prediction and patient management. Integrated a Random Forest model with SHAP-based explainability, providing transparent and interpretable predictions from clinical and diagnostic patient data.',
    description2:
      'The platform includes patient record management, progress tracking, and automated report generation. Built with React.js, Express.js, Flask, and MySQL to deliver a production-grade clinical decision support tool accessible to both healthcare professionals and non-technical users.',
  },
  {
    id: '2',
    title: 'AI Career Path Recommendation System',
    subtitle:
      'An AI-powered web application that recommends career paths using machine learning deployed through a Flask microservice.',
    images: ['/images/work_2_full.jpg', '/images/work_2_a_full.jpg'],
    date: '2025',
    role: 'Full-Stack Developer & ML Engineer',
    client: 'Personal Project',
    visitUrl: 'https://ai-career-path-recommendation-syste.vercel.app',
    githubUrl: 'https://github.com/Dass23M',
    techStack: ['Next.js', 'Express.js', 'Flask', 'MongoDB', 'Machine Learning'],
    description1:
      'Built an AI-powered web application that recommends personalized career paths to students based on academic performance, skills, and interests. The machine learning model is deployed through a Flask microservice, ensuring scalable and real-time predictions.',
    description2:
      'Implemented secure user authentication and user-based data tracking for personalized recommendations. Built with Next.js, Express.js, Flask, and MongoDB for a modern, responsive, and fast user experience across all devices.',
  },
  {
    id: '3',
    title: 'Lost & Found Community Platform',
    subtitle:
      'A full-stack community platform for reporting, searching, and reuniting lost items with their owners.',
    images: ['/images/work_3_full.jpg', '/images/work_3_a_full.jpg'],
    date: '2025',
    role: 'Full-Stack Developer',
    client: 'Personal Project',
    visitUrl: 'https://lost-and-found-frontend-phi.vercel.app',
    githubUrl: 'https://github.com/Dass23M/lost-and-found-frontend',
    techStack: ['Next.js', 'Express.js', 'MongoDB Atlas', 'Node.js', 'JWT', 'Cloudinary', 'Nodemailer'],
    description1:
      'A full-stack community platform for reporting, searching, and reuniting lost items with their owners. Key features include JWT authentication, Cloudinary image storage, claims management system, admin dashboard, Nodemailer email alerts, and a fully mobile-responsive UI.',
    description2:
      'Built with Next.js, Express.js, MongoDB Atlas, and Node.js. Deployed on Vercel (frontend) and Railway (backend) for reliable, scalable production hosting. Designed for fast reporting and intuitive search so users can quickly post items or find matches.',
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
    githubUrl: 'https://github.com/Dass23M',
    techStack: ['Next.js', 'Node.js', 'Express.js', 'MongoDB'],
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
    githubUrl: 'https://github.com/Dass23M',
    techStack: ['Next.js', 'Express.js', 'MongoDB', 'Node.js', 'RBAC'],
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
    githubUrl: 'https://github.com/Dass23M',
    techStack: ['Next.js', 'React.js', 'Chart.js', 'Node.js', 'SEO'],
    description1:
      'Engineered a modern web platform integrating dynamic marketing landing pages with a real-time analytics dashboard to monitor conversion funnels, ad performance, and user engagement metrics.',
    description2:
      'Leveraged Next.js server components and chart visualization libraries to deliver sub-second page loads, automated lead tracking, and technical SEO optimization for maximum organic reach.',
  },
];