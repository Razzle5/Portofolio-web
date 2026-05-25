/**
 * data.js — Static data store
 * Contains all portfolio content: skills, projects, social links, and personal info.
 */

// ── Skills ────────────────────────────────────────────────────────────────────
export const skills = [
  { name: 'JavaScript',  icon: 'braces',         category: 'Frontend' },
  { name: 'PHP',         icon: 'file-code-2',    category: 'Backend'  },
  { name: 'Laravel',     icon: 'blocks',         category: 'Backend'  },
  { name: 'Flutter',     icon: 'smartphone',     category: 'Mobile'   },
  { name: 'Dart',        icon: 'code',           category: 'Mobile'   },
  { name: 'MySQL',       icon: 'database',       category: 'Backend'  },
  { name: 'C++',         icon: 'cpu',            category: 'Backend'  },
  { name: 'React',       icon: 'atom',           category: 'Frontend' },
];

// ── Projects ──────────────────────────────────────────────────────────────────
export const projects = [
  {
    id: 1,
    title: 'Next Step',
    category: 'Mobile App',
    description:
      'Mobile job search application using Flutter and Dart with RESTful API integration.',
    longDescription:
      'Campus Project, January 2026. Developed a mobile job search application using Flutter and Dart. Implemented CRUD features, authentication, and database management. Integrated RESTful API for application data management and exchange. Developed application structure using Object-Oriented Programming (OOP) concepts.',
    thumbnail: '/assets/images/project-1.png',
    techStack: ['Flutter', 'Dart', 'REST API', 'OOP'],
    demoUrl: '#',
    sourceUrl: '#',
    icons: ['smartphone', 'code'],
  },
  {
    id: 2,
    title: 'GlucoGuide',
    category: 'Web App',
    description:
      'Smart Blood Sugar Management Web App with Gemini AI integration and image-based nutrition detection.',
    longDescription:
      'Competition Project, December 2025. Developed a blood sugar management web application using Laravel Blade, JavaScript, HTML, and CSS. Implemented CRUD features, authentication, and database management. Integrated Gemini AI to provide dietary recommendations based on user conditions. Developed image processing features to detect food nutritional content via images.',
    thumbnail: '/assets/images/project-2.png',
    techStack: ['Laravel', 'JavaScript', 'Gemini AI', 'Image Processing'],
    demoUrl: '#',
    sourceUrl: '#',
    icons: ['activity', 'bot'],
  },
  {
    id: 3,
    title: 'PropCentral',
    category: 'Web App',
    description:
      'Property Marketplace Web Application with real-time chat and smart chatbot integration.',
    longDescription:
      'Academic Project. Developed a web-based property marketplace application using Laravel Blade, JavaScript, HTML, and CSS. Implemented property listing management, user authentication, and database management. Developed chat and property bidding features to facilitate communication between buyers and sellers. Integrated a chatbot feature to assist users in searching and obtaining property information. Designed responsive and interactive web interfaces to enhance user experience.',
    thumbnail: '/assets/images/project-3.png',
    techStack: ['Laravel', 'JavaScript', 'Chat', 'Chatbot'],
    demoUrl: '#',
    sourceUrl: '#',
    icons: ['home', 'message-circle'],
  },
];

// ── Social Links ──────────────────────────────────────────────────────────────
export const socialLinks = [
  { name: 'GitHub',   url: 'https://github.com/Razzle5',   icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.2c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>'   },
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/farros-althaf/', icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>' },
];

// ── Personal Info ─────────────────────────────────────────────────────────────
export const personalInfo = {
  name: 'Farros',
  roles: ['Full-Stack Web Developer'],
  email: 'farros@email.com',
  location: 'Indonesia',
  aboutText:
    'A Full-Stack Web Developer passionate about developing responsive, interactive, and efficient web and mobile applications. Experienced in using modern technologies like Laravel, React, and Flutter to create comprehensive digital solutions from user interfaces to backend infrastructure.',
};
