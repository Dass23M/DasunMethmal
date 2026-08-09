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
        image: '/images/thyrotrack.png',
        href: '/portfolio/1',
    },
    {
        id: 2,
        title: 'AI Career Path Recommendation System',
        categories: 'AI, machine learning, web app',
        image: '/images/aicareer.png',
        href: '/portfolio/2',
    },
    {
        id: 3,
        title: 'Lost & Found Community Platform',
        categories: 'web, full-stack, Next.js',
        image: '/images/lostfound.png',
        href: '/portfolio/3',
    },
    {
        id: 4,
        title: 'Talent Card – Digital Talent Management Platform',
        categories: 'web, full-stack, React, Node.js',
        image: '/images/talentcard.png',
        href: '/portfolio/4',
    },
    {
        id: 5,
        title: 'Clinic & Pharmacy Management System',
        categories: 'web app, healthcare, enterprise, full-stack',
        image: '/images/paramacy.png',
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
    myContributions?: string[];
    keyFeatures?: string[];
    highlights?: { number: string; title: string }[];
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
        title: 'Talent Card – Digital Talent Management Platform',
        subtitle:
            'A full-stack talent management and onboarding platform with role-based administration, employee management, multi-step onboarding, and document verification workflows.',
        images: ['/images/work_4_full.jpg', '/images/work_4_full.jpg'],
        date: '2025',
        role: 'Software Engineering Intern',
        client: 'Professional / Team Project (India)',
        visitUrl: 'https://github.com/Dass23M',
        githubUrl: 'https://github.com/Dass23M',
        techStack: [
            'React.js',
            'Node.js',
            'Express.js',
            'PostgreSQL',
            'TanStack Query',
            'Tailwind CSS',
            'Material UI',
            'JWT',
            'REST API',
            'GitFlow',
        ],
        description1:
            'Talent Card is a web-based digital talent management platform designed to streamline employee and candidate onboarding, document verification, talent-card management, administration, and role-based workflows. The system provides role-tailored dashboards and secure workflows for administrators, super admins, sales executives, and organizational roles.',
        description2:
            'Worked as part of a development team on the Talent Card platform, contributing to the React-based frontend and administrative workflows. Developed multi-step Sales Executive onboarding forms, implemented and reviewed Super Admin workflows, performed responsive UI testing, and worked on document-verification functionality. Collaborated with the development team using Git/GitFlow and PostgreSQL while integrating frontend components with backend APIs.',
        myContributions: [
            'Developed multi-step Sales Executive onboarding forms with dynamic data validation',
            'Implemented and reviewed Super Admin workflows and system-level administrative controls',
            'Built document verification submission flows and status tracking features',
            'Executed responsive UI implementation and testing across mobile and desktop layouts',
            'Integrated frontend React components with backend Express REST APIs using TanStack Query & Axios',
            'Configured PostgreSQL database environment and supported data structure setup',
        ],
        keyFeatures: [
            'JWT-based Authentication & Protected Dashboard Routes',
            'Role-Based Access Control (RBAC) for Admins, Super Admins & Employees',
            'Multi-step Sales Executive registration & onboarding forms',
            'Document submission, verification status tracking & admin approval pipeline',
            'User & Candidate Profile Management with administrative controls',
            'Mobile-responsive dashboards and consistent UI styling with Tailwind CSS & Material UI',
        ],
        highlights: [
            { number: '01', title: 'Multi-step onboarding' },
            { number: '02', title: 'Document verification' },
            { number: '03', title: 'Role-based administration' },
            { number: '04', title: 'Responsive dashboard' },
            { number: '05', title: 'REST API integration' },
            { number: '06', title: 'PostgreSQL database' },
        ],
    },
    {
        id: '5',
        title: 'Clinic & Pharmacy Management System',
        subtitle:
            'An enterprise software solution engineered for Serunuwara Medical Center to digitize patient care, pharmacy POS, laboratory workflows, smart billing, and financial analytics.',
        images: ['/images/work_5_md.jpg', '/images/work_5_md.jpg'],
        date: 'August 2026 – Ongoing',
        role: 'Full-Stack Software Engineer',
        client: 'Serunuwara Medical Center (ASI PVT Limited)',
        visitUrl: 'https://github.com/Dass23M',
        githubUrl: 'https://github.com/Dass23M',
        techStack: [
            'Next.js',
            'React.js',
            'Node.js',
            'Express.js',
            'MongoDB',
            'REST API',
            'RBAC',
            'Tailwind CSS',
            'PDF Generation',
            'Chart.js',
        ],
        description1:
            'The Clinic & Pharmacy Management System is a unified, cloud-ready enterprise healthcare platform designed for Serunuwara Medical Center by ASI PVT Limited. The system digitizes every clinical and administrative workflow from patient registration, live token queue management, and electronic prescriptions to pharmacy POS, laboratory diagnostics, and financial reporting.',
        description2:
            'Built with robust enterprise security featuring granular Role-Based Access Control (RBAC) across 6 distinct organizational roles (Super Admin, Doctor, Pharmacy, Receptionist, Lab Staff, Accounts). Features automated activity logging, session timeout controls, encrypted passwords, and daily automated backups to deliver operational excellence and 99.9% uptime reliability.',
        myContributions: [
            'Architected full-stack enterprise healthcare solution for Serunuwara Medical Center (ASI PVT Limited)',
            'Implemented Granular Role-Based Security (RBAC) across Super Admin, Doctors, Pharmacy, Reception, Lab & Accounts staff',
            'Developed Doctor Consultation workspace with digital prescriptions, diagnosis notes, and lab investigation requests',
            'Engineered Pharmacy & POS system supporting barcode scanning, batch tracking, expiry alerts, and GST/VAT tax breakdown',
            'Built Laboratory module managing blood, urine, X-Ray, ECG, ultrasound, MRI, CT scan tracking and PDF result uploads',
            'Created Smart Billing engine supporting multi-charge invoices (Doctor + Medicine + Lab + Misc) with reprint & refund flows',
            'Implemented Real-Time Financial Analytics dashboard featuring gross/net profit tracking and Excel/PDF export capabilities',
        ],
        keyFeatures: [
            'Patient Management: Auto patient numbering, medical history, allergies, visit tracking & NIC integration',
            'Appointment & Queue: Live token generation, doctor assignment & real-time queue status tracking',
            'Doctor Consultation: Digital prescription writing, diagnosis notes & lab investigation requests',
            'Pharmacy & POS: Barcode support, batch tracking, expiry alerts, inventory adjustments & supplier returns',
            'Laboratory Module: Test result uploads (PDF), technician assignment & electronic report distribution',
            'Billing & Financials: Multi-charge billing, tax/discounts, daily/weekly/monthly profit analysis & reports',
            'Staff & HR Management: Employee records, attendance, salary, leave tracking & role permissions',
            'Audit & Security: Session timeout, activity logs, encrypted passwords & automated daily backups',
        ],
        highlights: [
            { number: '01', title: 'Role-Based Security' },
            { number: '02', title: 'Real-Time Analytics' },
            { number: '03', title: 'Cloud Architecture' },
            { number: '04', title: 'Smart Billing & POS' },
            { number: '05', title: 'Laboratory Diagnostics' },
            { number: '06', title: 'Pharmacy & Inventory' },
        ],
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