// Single source of truth for the portfolio. The UI components, JSON-LD, the /agent REST API,
// the MCP server and the agent manifest all read from here, so they can never drift apart.
// To update the site, edit this file only.

export const site = {
  url: 'https://rithikaramasamy.vercel.app',
  name: 'Rithika Ramasamy',
  // Bump when content changes; surfaced to agents as the freshness signal.
  updated: '2026-10-09',
} as const

export type Profile = {
  id: string
  name: string
  givenName: string
  familyName: string
  title: string
  headline: string
  summary: string
  background: string
  currentEmployer: { name: string; url: string }
  location: { city: string; country: string; remote: boolean }
  openTo: string[]
  focus: string[]
  email: string
  image: string
  links: { website: string; github: string; linkedin: string; leetcode: string }
  resume: { url: string; format: 'pdf' }
}

export const profile: Profile = {
  id: 'rithika-ramasamy',
  name: 'Rithika Ramasamy',
  givenName: 'Rithika',
  familyName: 'Ramasamy',
  title: 'Software Engineer I',
  headline: 'Backend and full-stack engineer building reliable systems and applied AI products.',
  summary:
    'Full-stack software engineer building high-throughput backend systems and full-stack applications with MERN, TypeScript and applied AI. ' +
    'Currently engineering payment infrastructure and microservices at Neokred, with a focus on reliability, clean architecture and measurable product impact.',
  background:
    'Trained as an architect before moving into software; that background shapes a focus on structure, scale and long-term maintainability. ' +
    'Enjoys end-to-end ownership and is currently deepening data structures, system design and AI deployment.',
  currentEmployer: { name: 'Neokred', url: 'https://neokred.tech' },
  location: { city: 'Bengaluru', country: 'IN', remote: true },
  openTo: ['Full-stack Developer', 'AI Roles'],
  focus: ['Full stack', 'Microservices', 'Applied AI'],
  email: 'rithikaram293@gmail.com',
  image: `${site.url}/og-image.jpg`,
  links: {
    website: site.url,
    github: 'https://github.com/Rithikaram29',
    linkedin: 'https://www.linkedin.com/in/rithika-r-0b0526213/',
    leetcode: 'https://leetcode.com/u/Rithika_29',
  },
  resume: { url: `${site.url}/Rithika-Ramasamy-Resume.pdf`, format: 'pdf' },
}

export type Experience = {
  id: string
  company: string
  title: string
  start: string
  /** null means the role is current */
  end: string | null
  highlights: string[]
}

export const experience: Experience[] = [
  {
    id: 'neokred-sde1',
    company: 'Neokred',
    title: 'Software Engineer I',
    start: '2025',
    end: null,
    highlights: [
      'Developing and scaling backend systems powering high-throughput payment infrastructure and microservices-driven financial workflows',
      'Engineered core backend components for merchant onboarding and settlement services, supporting 100+ merchants and processing $50M+ in monthly transaction volume',
      'Improved observability across microservices by integrating structured logging and monitoring, reducing production issue resolution time by 60%',
    ],
  },
  {
    id: 'cva-jr-architect',
    company: 'Center for Vernacular Architecture',
    title: 'Jr. Architect',
    start: '2023',
    end: '2024',
    highlights: [
      'Planned construction timelines and technical documentation for heritage conservation projects',
      'Managed client requirements, design iterations, and project payment milestones',
    ],
  },
  {
    id: 'midori-jr-architect',
    company: 'Midori Architects',
    title: 'Jr. Architect',
    start: '2023',
    end: '2023',
    highlights: [
      'Produced computational designs incorporating weather and environmental performance analysis',
    ],
  },
]

export type SkillCategory = { id: string; name: string; subtitle: string; skills: string[] }

export const skillCategories: SkillCategory[] = [
  {
    id: 'backend',
    name: 'Backend & Infrastructure',
    subtitle: 'Scalable Services',
    skills: ['Node.js', 'TypeScript', 'Express', 'Microservices', 'PostgreSQL', 'MongoDB', 'Redis', 'Kafka', 'GraphQL'],
  },
  {
    id: 'frontend',
    name: 'Frontend Engineering',
    subtitle: 'Interactive Systems',
    skills: ['React', 'Next.js', 'Tailwind CSS', 'State Management', 'Component Architecture', 'Responsive Design'],
  },
  {
    id: 'ai-ml',
    name: 'AI & Machine Learning',
    subtitle: 'Applied Intelligence',
    skills: ['Python', 'YOLOv8', 'LLM Integrations', 'RAG Workflows', 'Prompt Engineering', 'Agentic Flows'],
  },
  {
    id: 'tools',
    name: 'Tools & Practices',
    subtitle: 'Engineering Craft',
    skills: ['System Design', 'API Design', 'Supabase', 'Git', 'Docker', 'Vercel', 'Structured Logging'],
  },
]

export type Project = {
  /** URL-safe slug, used in /agent/projects/:id and the get_project tool */
  id: string
  name: string
  type: string
  description: string
  stack: string[]
  highlights: string[]
  /** true = shown as "Live" in the UI, false = "Archive" */
  live: boolean
  /** Primary link: a deployed app, store listing, or write-up (see urlKind). */
  url?: string
  urlKind?: 'demo' | 'store' | 'post'
  repoUrl?: string
  publisher?: string
}

export const projects: Project[] = [
  {
    id: 'go-boarding',
    name: 'Go Boarding',
    type: 'Full-stack web application',
    description: 'Dual-portal bus reservation platform with operator controls and end-to-end passenger booking.',
    stack: ['React', 'Node.js', 'Express', 'MongoDB'],
    highlights: [
      'Operator portal for route setup, scheduling, and seat layout configuration',
      'Full passenger booking flow: route search → seat selection → confirmation',
      'Separate admin and customer views with role-based access control',
    ],
    live: true,
    url: 'https://go-boarding-bus-app-yfk7.vercel.app/',
    urlKind: 'demo',
    repoUrl: 'https://github.com/Rithikaram29/go-boarding-bus-app',
  },
  {
    id: 'sugar-cosmetics-replica',
    name: 'Sugar Cosmetics — Replica',
    type: 'Front-end web application',
    description: 'High-fidelity product page replica with dynamic rendering, cart state management, and add-to-cart flow.',
    stack: ['React', 'JavaScript', 'CSS'],
    highlights: [
      'Reproduced complex product grid with category filters and dynamic data rendering',
      'State-driven cart with add/remove logic and persistent item count',
      'Pixel-accurate responsive layout matching original breakpoint behavior',
    ],
    live: false,
    url: 'https://sugar-cosmetics-replica-8w5sh1xx6-rithikaram29s-projects.vercel.app/',
    urlKind: 'demo',
    repoUrl: 'https://github.com/Rithikaram29/sugar-cosmetics-replica',
  },
  {
    id: 'indian-grocery-detection',
    name: 'Indian Grocery Detection',
    type: 'Machine learning application',
    description: 'ML-powered grocery detection with a human-in-the-loop correction system for continuous model improvement.',
    stack: ['Python', 'YOLOv8', 'Supabase', 'FastAPI'],
    highlights: [
      'Custom YOLOv8 model trained on an Indian grocery image dataset',
      'Human-in-the-loop: users draw bounding box corrections stored for retraining',
      'Supabase backend persists annotations and images for incremental fine-tuning',
    ],
    live: true,
    url: 'https://www.linkedin.com/posts/rithika-r-0b0526213_machinelearning-learninginpublic-yolov8-ugcPost-7364238199696576512',
    urlKind: 'post',
    repoUrl: 'https://github.com/Rithikaram29/indian-grocery-detection',
  },
  {
    id: 'eleven11-app',
    name: 'Eleven11 App',
    type: 'Mobile application',
    description: 'Mobile application live on the Google Play Store, developed at Eleven11 Studios.',
    stack: [],
    highlights: [
      'Published on Google Play Store with active users',
      'End-to-end mobile app development from design to deployment',
    ],
    live: true,
    url: 'https://play.google.com/store/apps/details?id=com.eleven11studios.eleven11',
    urlKind: 'store',
    publisher: 'Eleven11 Studios',
  },
]
