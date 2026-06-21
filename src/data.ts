import { Project, Education, Skill, Certification } from './types';

export const PERSONAL_INFO = {
  name: 'Tangadepelly Sai Varshith',
  title: 'CSE Undergraduate & Full-Stack Developer Candidate',
  tagline: 'Building intelligent waste classification, spreadsheet automation, and modern responsive UI solutions.',
  email: 'tangadepellysaivarshith@gmail.com',
  phone: '+91-9515103616',
  github: 'https://github.com/tangadepellysaivarshith', // hypothetical based on name
  linkedin: 'https://linkedin.com/in/tangadepelly-sai-varshith', // hypothetical based on name
  location: 'Hyderabad, India',
  summary: 'Computer Science undergraduate (2027) with strong foundations in Java, Python, and Object-Oriented Programming. Experienced in building web and automation projects using Flask and Pandas. Passionate about software development and eager to contribute to real-world application development.',
  avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200', // standard high-res friendly placeholder
  areasOfInterest: ['Web Development', 'Software Development', 'Artificial Intelligence', 'Data Engineering'],
  softSkills: ['Problem Solving', 'Adaptability', 'Communication', 'Self-learning']
};

export const PROJECTS: Project[] = [
  {
    id: 'greengrid',
    title: 'GreenGrid',
    description: 'AI-Powered Waste Management & Classification Platform.',
    category: 'ai',
    technologies: ['React.js', 'Vite', 'Gemini AI', 'Firebase', 'Tailwind', 'Motion'],
    details: [
      'Developed an AI-driven web application for waste classification and sustainable disposal recommendations.',
      'Integrated Gemini AI to generate intelligent recycling suggestions and waste management insights.',
      'Built responsive user interfaces using React.js and Vite, improving usability and application performance.',
      'Utilized Firebase for authentication, database management, and secure cloud storage.',
      'Implemented client-side routing and interactive animations for enhanced user experience.'
    ],
    stats: [
      { label: 'Inference Speed', value: '< 1.2s' },
      { label: 'Recycling Suggestions', value: 'Dynamic' },
      { label: 'UI Performance Score', value: '98%' }
    ]
  },
  {
    id: 'data-entry',
    title: 'Data Entry Sheet',
    description: 'A Python-based tool to automate data entry and management in spreadsheets.',
    category: 'python',
    technologies: ['Python', 'Pandas', 'OpenPyXL'],
    details: [
      'Automated data input, validation, and formatting to reduce manual effort.',
      'Used libraries to read/write Excel files and handle large datasets efficiently.',
      'Improved accuracy and reduced processing time for repetitive tasks.'
    ],
    stats: [
      { label: 'Automation Time', value: '-90% effort' },
      { label: 'Accuracy Rate', value: '99.9%' },
      { label: 'Max File Support', value: 'Unbounded' }
    ]
  },
  {
    id: 'url-shortener',
    title: 'URL Shortener using Python',
    description: 'A web application that converts long URLs into short, manageable links.',
    category: 'web',
    technologies: ['Python', 'Flask', 'HTML', 'CSS'],
    details: [
      'Designed backend logic to generate unique short URLs and map them to original links.',
      'Implemented redirection mechanism and basic analytics for tracking usage.',
      'Built a simple and user-friendly interface for quick URL generation.'
    ],
    stats: [
      { label: 'Shortening Action', value: 'Instant' },
      { label: 'Redirect Speed', value: '8ms' },
      { label: 'Analytics Modules', value: 'Clicks count' }
    ]
  }
];

export const EDUCATIONS: Education[] = [
  {
    degree: 'Bachelor of Technology in Computer Science and Engineering',
    institution: 'Malla Reddy Engineering College',
    location: 'Hyderabad, India',
    period: '2023 - 2027',
    performanceType: 'CGPA',
    performanceValue: '8.73',
    courses: ['Data Structures & Algorithms', 'Operating Systems', 'Object-Oriented Programming (OOPs)', 'Database Management Systems (DBMS)']
  },
  {
    degree: 'Intermediate (Mathematical Physical Sciences - MPC)',
    institution: 'Sri Chaitanya Junior College',
    location: 'Hyderabad, India',
    period: '2021 - 2023',
    performanceType: 'Percentage',
    performanceValue: '97.3%',
    courses: ['Mathematics A/B', 'Physics', 'Chemistry']
  }
];

export const SKILLS: Skill[] = [
  // Programming
  { name: 'Python', category: 'programming', level: 90, projectsUsed: ['greengrid', 'data-entry', 'url-shortener'] },
  { name: 'Java', category: 'programming', level: 80, projectsUsed: [] },
  { name: 'C Language', category: 'programming', level: 85, projectsUsed: ['url-shortener'] },
  
  // Front End
  { name: 'React.js', category: 'frontend', level: 88, projectsUsed: ['greengrid'] },
  { name: 'JavaScript', category: 'frontend', level: 90, projectsUsed: ['greengrid'] },
  { name: 'HTML5 & CSS3', category: 'frontend', level: 95, projectsUsed: ['greengrid', 'url-shortener'] },
  
  // Databases
  { name: 'MySQL', category: 'database', level: 80, projectsUsed: ['data-entry'] },
  
  // Tools
  { name: 'Git & GitHub', category: 'tool', level: 85, projectsUsed: ['greengrid', 'data-entry', 'url-shortener'] },
  { name: 'VS Code', category: 'tool', level: 90, projectsUsed: ['greengrid', 'data-entry', 'url-shortener'] },
  
  // Coursework / Theoretical
  { name: 'Data Structures & Algorithms', category: 'coursework', level: 85, projectsUsed: [] },
  { name: 'Operating Systems', category: 'coursework', level: 80, projectsUsed: [] },
  { name: 'OOPs Methodology', category: 'coursework', level: 85, projectsUsed: [] },
  { name: 'Database Management (DBMS)', category: 'coursework', level: 82, projectsUsed: [] }
];

export const CERTIFICATIONS: Certification[] = [
  {
    name: 'Azure AI Fundamentals',
    issuer: 'Microsoft',
    year: 2025,
    credentialId: 'MS-AI-900',
    color: 'from-blue-600 to-indigo-600',
    skillsCertified: ['Cloud AI Solutions', 'Generative AI Concepts', 'Computer Vision Basics', 'NLP Core']
  },
  {
    name: 'Python & Data Structures',
    issuer: 'Tech Augusta',
    year: 2024,
    credentialId: 'TA-PDS-809',
    color: 'from-amber-500 to-yellow-600',
    skillsCertified: ['Python Arrays', 'Dynamic Lists', 'Sorting Algorithms', 'Tree Traversal']
  },
  {
    name: 'Python Coder',
    issuer: 'Kaggle',
    year: 2023,
    credentialId: 'KAG-PY-7722',
    color: 'from-emerald-600 to-emerald-800',
    skillsCertified: ['List Comprehensions', 'Pandas Series', 'Dynamic Arrays', 'Data Preprocessing']
  },
  {
    name: 'C Programming',
    issuer: 'Skilltimate',
    year: 2023,
    credentialId: 'SKT-C-190',
    color: 'from-purple-600 to-indigo-700',
    skillsCertified: ['Memory Pointers', 'Array Offsets', 'Structures & Unions', 'File Streams']
  }
];
