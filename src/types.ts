export interface Project {
  id: string;
  title: string;
  description: string;
  details: string[];
  technologies: string[];
  category: 'web' | 'python' | 'ai';
  stats?: { label: string; value: string }[];
}

export interface Education {
  degree: string;
  institution: string;
  location: string;
  period: string;
  performanceType: 'CGPA' | 'Percentage';
  performanceValue: string;
  courses?: string[];
}

export interface Skill {
  name: string;
  category: 'programming' | 'frontend' | 'database' | 'tool' | 'coursework';
  level: number; // 1-100
  projectsUsed: string[]; // project ids
}

export interface Certification {
  name: string;
  issuer: string;
  year: number;
  credentialId?: string;
  color: string;
  skillsCertified: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  body: string;
  timestamp: string;
}
