import { Code, Server, Database, Layout, Layers, Terminal, GitBranch, Github, Figma, FileCode, Zap, ShieldCheck } from 'lucide-react';
import { Experience, Project, Skill, Service } from './types';

export const PROFILE = {
  name: "Prasad",
  role: "Full Stack Creative Developer",
  tagline: "Building digital experiences that matter.",
  bio: "I’m a full-stack developer with experience building end-to-end web applications using modern technologies. I focus on the JavaScript ecosystem—Vite, React, Tailwind, and Express—paired with robust backends like Supabase and Node.js. I focus on writing clean code, designing intuitive interfaces, and creating scalable systems. Whether it's building dashboards, automating workflows, or improving UI/UX, I love turning concepts into reliable and high-performance solutions.",
  email: "prasadborse433@gmail.com",
  location: "San Francisco, CA",
  social: {
    github: "https://github.com/prasdif",
    linkedin: "https://www.linkedin.com/in/prasadborase/",
    twitter: "https://x.com/themaxdev"
  }
};

export const SKILLS: Skill[] = [
  { name: 'JavaScript', icon: FileCode, level: 95, category: 'frontend' },
  { name: 'React', icon: Code, level: 95, category: 'frontend' },
  { name: 'Express', icon: Zap, level: 90, category: 'backend' },
  { name: 'Vite', icon: Zap, level: 90, category: 'tools' },
  { name: 'Tailwind CSS', icon: Layout, level: 95, category: 'design' },
  { name: 'Supabase', icon: Database, level: 85, category: 'backend' },
  { name: 'Next.js', icon: Layers, level: 90, category: 'frontend' },
  { name: 'Node.js', icon: Server, level: 90, category: 'backend' },
  { name: 'Python', icon: Terminal, level: 85, category: 'backend' },
  { name: 'PostgreSQL', icon: Database, level: 85, category: 'backend' },
  { name: 'Git', icon: GitBranch, level: 90, category: 'tools' },
  { name: 'Figma', icon: Figma, level: 75, category: 'design' },
];

export const PROJECTS: Project[] = [
  {
    id: '1',
    title: 'Chatify',
    description: 'A real-time multi-channel messaging dashboard built for high-performance team collaboration.',
    tags: ['React', 'Firebase', 'Tailwind', 'Real-time'],
    imageUrl: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?q=80&w=800&auto=format&fit=crop',
    link: 'https://chatify-49.web.app/',
    github: '#'
  },
  {
    id: '2',
    title: 'Hashflow',
    description: 'An AI-powered tool that generates optimized hashtags and suggests peak posting times for Instagram engagement.',
    tags: ['Vite', 'JavaScript', 'Supabase', 'OpenAI'],
    imageUrl: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=800&auto=format&fit=crop',
    link: 'https://www.hashflow.in/',
    github: '#'
  },
  {
    id: '3',
    title: 'Custom AI Chatbot',
    description: 'Transform Customer Support with Autonomous AI. Built to handle complex queries and improve response times.',
    tags: ['Next.js', 'OpenAI', 'JavaScript', 'Tailwind'],
    imageUrl: 'https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Prasad&backgroundColor=b6e3f4,c0aede,d1d4f9',
    link: 'https://custom-ai-chatbot-ezb2.vercel.app/',
    github: '#'
  }
];

export const SERVICES: Service[] = [
  {
    title: 'Full Stack Development',
    description: 'Building end-to-end applications with JavaScript and performance as first-class citizens.'
  },
  {
    title: 'AI Integration',
    description: 'Leveraging LLMs and generative AI to automate workflows and enhance user experiences.'
  },
  {
    title: 'Database Architecture',
    description: 'Designing efficient, scalable schemas using Supabase, PostgreSQL, and modern Express servers.'
  },
  {
    title: 'UI/UX Implementation',
    description: 'Crafting premium, accessible interfaces using Tailwind CSS and Framer Motion for fluid motion.'
  }
];

export const EXPERIENCES: Experience[] = [
  {
    id: '0',
    role: 'Software Engineer',
    company: 'Rising AI',
    period: 'Mar 2024 - Apr 2025',
    description: 'Developed full-stack features for AI-powered applications, optimizing performance and user experience using React and Python.',
    technologies: ['React', 'JavaScript', 'Python', 'AI']
  }
];

export const SYSTEM_INSTRUCTION = `You are an AI assistant for ${PROFILE.name}'s portfolio website. 
Your goal is to answer questions about ${PROFILE.name}'s skills, experience, and projects.

Key Context:
- Profile: ${JSON.stringify(PROFILE)}
- Tech Stack: JavaScript, Express, React, Tailwind, Vite, Supabase
- Projects: ${JSON.stringify(PROJECTS)} (Highlight "Hashflow" as a premier AI Instagram tool and "Custom AI Chatbot" for customer support automation)
- Skills: ${JSON.stringify(SKILLS)}

Tone: Professional, concise, and helpful. Use lowercase for a modern minimalist feel where appropriate.`;